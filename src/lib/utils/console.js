import { dev } from '$app/environment';

export function printConsoleBanner() {
  if (!dev) {
    console.log(`
                          .~ssos+.
                        +8888888888i,
                      {888888888888o.
                      h8888888888888k
                      t888888888s888k
                        \`t88888d/ h88k
                          \`\`\`    h88l
                                ,88k\`
                                .d8h\`
                              +d8h
                            _+d8h\`
                          ;y8h+\`
                          |-\`

                    https://comma.ai/jobs
    `);
  }
}
