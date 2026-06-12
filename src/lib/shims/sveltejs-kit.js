// Shim for the parts of @sveltejs/kit used by this codebase
export function error(status, body) {
  const message = typeof body === 'string' ? body : body?.message ?? String(status);
  const err = new Error(message);
  err.status = status;
  err.body = typeof body === 'string' ? { message: body } : body;
  throw err;
}
