# Security policy

## Supported version

Only the latest version, the one running at https://afterglow.johnstonaerial.com, is supported. Fixes are released there.

## What is in scope

- The app itself (`index.html`, `sw.js`).
- The notification backend (`worker.js`), a Cloudflare Worker that stores a push subscription, the chosen location and the alert choices for people who turn on notifications.

Afterglow has no accounts and no passwords. Nothing is stored about you unless you turn on notifications (see the Privacy section of the README).

## Reporting a problem

Please report security problems privately, not in a public issue.

1. Open the **Security** tab of this repository and choose **Report a vulnerability**.
2. Say what you found, how to reproduce it, and which version you saw it in.

If you can't use that, open a public issue that says only that you have a security report, with no details, and I will arrange a private way to send it.

I will answer as soon as I can and credit you in the fix if you'd like.
