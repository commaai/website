import MagicString from 'magic-string';
import { walk, compile } from 'svelte/compiler';

const processMarkup = async ({ content, filename }) => {
  const { ast } = compile(content, { filename });
  const s = new MagicString(content);

  walk(ast.html, {
    enter(node) {
      if (node.type === 'Element' && node.name === 'img') {
        const srcAttr = node.attributes.find(attr => attr.name === 'src');
        if (srcAttr && srcAttr.value) {
            const srcValue = srcAttr.value[0].type === 'MustacheTag'
              ? content.slice(srcAttr.value[0].expression.start, srcAttr.value[0].expression.end)
              : JSON.stringify(srcAttr.value[0].data);

          const otherAttributes = node.attributes
            .filter(attr => attr.name !== 'src')
            .map(attr => processAttribute(attr, content))
            .filter(Boolean)
            .join(' ');

          const pictureHtml = `
            <picture>
              {#if typeof ${srcValue} === 'object' && (${srcValue}).sources}
                {#each Object.entries((${srcValue}).sources) as [filetype, src]}
                  <source srcset={src.split(' ')[0]} type={'image/' + filetype} />
                {/each}
                <img src={(${srcValue}).img.src} ${otherAttributes} />
              {:else}
                <img src={${srcValue}} ${otherAttributes} />
              {/if}
            </picture>
          `;

          s.overwrite(node.start, node.end, pictureHtml);
        }
      }
    }
  });

  return {
    code: s.toString(),
    map: s.generateMap({ source: filename }),
  };
};

const processAttribute = (attr, content) => {
  if (attr.value === true) {
    return attr.name;
  } else if (attr.value.length === 1) {
    if (attr.value[0].type === 'Text') {
      return `${attr.name}="${attr.value[0].data}"`;
    } else if (attr.value[0].type === 'MustacheTag') {
      return `${attr.name}={${content.slice(attr.value[0].expression.start, attr.value[0].expression.end)}}`;
    } else if (attr.value[0].type === 'AttributeExpression') {
      return `${attr.name}={${content.slice(attr.value[0].start + 1, attr.value[0].end - 1)}}`;
    }
  } else {
    const attrValue = attr.value.map(chunk => {
      if (chunk.type === 'Text') {
        return chunk.data;
      } else if (chunk.type === 'MustacheTag') {
        return `{${content.slice(chunk.expression.start, chunk.expression.end)}}`;
      }
      return '';
    }).join('');
    return `${attr.name}="${attrValue}"`;
  }
  return '';
}

export const optimizeImagePreprocess = () => {
  return {
    name: 'svelte-preprocessor-optimize-image',
    markup: ({ content, filename }) => {
      if (filename.endsWith('.svelte')) {
        return processMarkup({ content, filename });
      }
    },
  };
};
