# Asthra Senior Living

A responsive landing page inspired by the supplied reference, using navy blue, warm orange, rounded cards and a welcoming senior-care photograph.

## Run

Requires Python 3. No package installation or build is needed.

```sh
npm start
```

This serves the site on port 3000. Alternatively run `python3 -m http.server 3000 --bind 0.0.0.0` from this directory.

## Validate

`npm test` runs the browser smoke tests after installing Playwright in a separate tool directory (see tests). The tests use `PLAYWRIGHT_MODULE` to locate the installation. Start the web server first.

## Before public launch

- Confirm the phone number, service descriptions, locations and actual care availability with Asthra. The phone number and location names came from the supplied reference.
- Connect the enquiry form to an approved enquiry/booking service. Currently it prepares an SMS or lets the visitor copy the enquiry; it never claims a callback was requested successfully.
- Replace illustrative generated care photography and CSS room/building illustrations with approved facility photos if available.
- Add verified prices and testimonials only after receiving permission and accurate information.

No tracking, API keys or server-side storage are included. Google Fonts is optional; the page falls back to system fonts. All primary imagery is local.
