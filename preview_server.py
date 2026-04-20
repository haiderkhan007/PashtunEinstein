#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import os


ROOT = Path(__file__).resolve().parent


class ExtensionlessHandler(SimpleHTTPRequestHandler):
    def _candidate_path(self):
        raw_path = unquote(urlsplit(self.path).path)
        relative = raw_path.lstrip("/")
        requested = (ROOT / relative).resolve()

        if relative == "":
            return ROOT / "index.html"

        if ROOT not in requested.parents and requested != ROOT:
            return None

        candidates = [requested]

        if requested.is_dir():
            candidates.insert(0, requested / "index.html")
        elif requested.suffix == "":
            candidates.extend([
                requested / "index.html",
                requested.with_suffix(".html"),
            ])

        for candidate in candidates:
            if candidate.exists() and candidate.is_file():
                return candidate

        return None

    def send_head(self):
        candidate = self._candidate_path()
        if candidate is None:
            self.send_error(404, "File not found")
            return None

        content_type = self.guess_type(str(candidate))
        file_handle = open(candidate, "rb")
        fs = os.fstat(file_handle.fileno())
        self.send_response(200)
        self.send_header("Content-type", content_type)
        self.send_header("Content-Length", str(fs.st_size))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.end_headers()
        return file_handle


def main():
    parser = argparse.ArgumentParser(description="Preview PashtunEinstein with extensionless routes.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=8123, type=int)
    args = parser.parse_args()

    os.chdir(ROOT)
    server = ThreadingHTTPServer((args.host, args.port), ExtensionlessHandler)
    print(f"Serving {ROOT} at http://{args.host}:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
