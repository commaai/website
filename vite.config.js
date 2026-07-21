import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const compatibilityPrompt = `You answer questions about openpilot vehicle compatibility using only the provided compatibility JSON.
Be concise and practical, and answer in plain text without Markdown. Ask for the year, make, model, and trim when needed. Photos may help identify visible badges or details, but clearly state uncertainty.
A vehicle is supported out of the box only when its exact year, make, and model are present in the JSON and its listed package/trim requirements are met.
Any other vehicle is unsupported out of the box. Never imply that a missing vehicle is supported. Mention relevant package requirements, footnotes, and harness connector when useful.`;

function compatibilityChat() {
  return {
    name: 'compatibility-chat-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/compatibility-chat', async (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: 'Method not allowed.' }));
          return;
        }

        try {
          const body = await new Promise((resolve, reject) => {
            let raw = '';
            request.on('data', chunk => {
              raw += chunk;
              if (raw.length > 30_000_000) reject(new Error('Request is too large.'));
            });
            request.on('end', () => resolve(JSON.parse(raw)));
            request.on('error', reject);
          });
          const apiKey = process.env.OPENAI_API_KEY;
          if (!apiKey) throw new Error('Set OPENAI_API_KEY before starting the local dev server.');

          const vehiclesPath = fileURLToPath(new URL('./src/lib/vehicles.json', import.meta.url));
          const vehicles = await readFile(vehiclesPath, 'utf8');
          const input = (body.messages || []).slice(-8).map(message => ({
            role: message.role,
            content: [
              ...(message.text ? [{ type: message.role === 'assistant' ? 'output_text' : 'input_text', text: message.text }] : []),
              ...((message.images || []).map(image => ({ type: 'input_image', image_url: image.url, detail: 'low' })))
            ]
          }));

          const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: process.env.OPENAI_COMPATIBILITY_MODEL || 'gpt-5.4-mini',
              instructions: `${compatibilityPrompt}\n\nCOMPATIBILITY JSON:\n${vehicles}`,
              input,
              max_output_tokens: 700
            })
          });
          const result = await openaiResponse.json();
          if (!openaiResponse.ok) throw new Error(result.error?.message || 'OpenAI request failed.');
          const answer = result.output_text || result.output?.flatMap(item => item.content || []).find(item => item.type === 'output_text')?.text;
          if (!answer) throw new Error('The model returned an empty response.');
          response.end(JSON.stringify({ answer }));
        } catch (error) {
          response.statusCode = 500;
          response.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  };
}

const filetypesToOptimize = ['jpg', 'jpeg', 'png', 'gif'];

export default defineConfig({
  plugins: [
    compatibilityChat(),
    imagetools({
      defaultDirectives: (url) => {
        let sourceFileType = url.pathname.split('.').pop();
        if (filetypesToOptimize.includes(sourceFileType)) {
          return new URLSearchParams({'format': `avif;webp;${sourceFileType}`, 'as': 'picture' });
        }
        return new URLSearchParams();
      },
      cache: {
        enabled: true,
        dir: './node_modules/.cache/imagetools'
      }
    }),
    sveltekit(),
  ]
});
