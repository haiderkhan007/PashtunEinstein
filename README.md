# PashtunEinstein

PashtunEinstein is a static website with educational pages and small browser-based tools focused on science, technology, language learning, and practical utilities.

Public pages use extensionless routes such as `/academy/` and `/webscience/`, while legacy `.html` URLs redirect for compatibility.

## Main Pages and Apps

- `/`: main landing page for PashtunEinstein.
- `/webscience/`: SciPashtuUrdu Explorer.
- `/language_tutor/`: Pashto and Urdu language tutor.
- `/quiz/`: science mastery quiz.
- `/ai/`: AI Academy page.
- `/academy/`: academy page.
- `/comm1/`: SpeakWise communication page.
- `/aijobchecker/`: AI Job Impact Analyzer.
- `/encryptdoc/`: SecureText AES cipher tool.
- `/privacy_policy/`: site privacy policy.

## Hosting

This repo is the site. It is a static, file-based website hosted directly from the repository contents with no build step required.

## Local Preview

Open any page directly in a browser, or run a simple local server from the repo root for a better preview experience, for example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing

Edit the HTML, CSS, image, or manifest files in place. Route pages live in folders such as `academy/index.html` so the published site can use extensionless URLs.

Legacy root `.html` files are redirect stubs and should only be changed if you need to preserve or update old links.
