#!/usr/bin/env python3
"""Static server emulating firebase cleanUrls: /x -> x.html fallback."""
import sys, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os

class H(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path.split('?')[0])
        if (not os.path.isfile(path)) and os.path.isfile(path + '.html'):
            self.path = self.path.split('?')[0] + '.html'
        return super().send_head()
    def log_message(self, *a): pass

port, root = int(sys.argv[1]), sys.argv[2]
os.chdir(root)
print(f'serving {root} on :{port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
