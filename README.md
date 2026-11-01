# Afterglow

**Sunrise and sunset sky-quality forecasts, built for photographers and drone pilots.**

🔗 [afterglow.johnstonaerial.com](https://afterglow.johnstonaerial.com)

Afterglow predicts how good a sunrise or sunset is actually going to look — not just whether the sun is up, but whether the sky will put on a show. Built for planning drone shoots, timelapses, and just knowing when to grab a camera.

☕ **Free to use.** If it helped you catch an epic shot — sunrise, sunset, or a moon timelapse — you can [buy me a coffee](https://buymeacoffee.com/JohnstonAerial).

## Features

- **Sky quality scoring** — a heuristic model based on published sunset-photography guidance: mid/high cloud in the right range catches color, low cloud blocks it, haze flattens it. Scores are checked against real shoots and still being refined. Like any forecast, it can miss, especially on high cloud.
- **Golden & blue hour, precisely** — computed from actual solar angle (civil twilight math), not flat clock-time offsets. Nautical and astronomical twilight times shown when they fall that day.
- **7-day outlook** — the next seven sunrises and sunsets, each scored.
- **Any location** — search by city, state or ZIP, or use your current position, and switch any time with the location button. Your chosen location stays on your device. Opening Afterglow from the [Drone Preflight Checklist](https://checklist.johnstonaerial.com) weather card takes you straight to the flight site you were checking there.
- **Moon conditions** — phase, illumination, moonrise/moonset with compass headings, and a callout for the "big warm moon on the horizon" alignment window. Includes an hourly timelapse-conditions score.
- **Interactive sun map** — a free, keyless Leaflet/OpenStreetMap view showing the sun's compass direction and altitude at any point across the day.
- **Outlook tab** — a day-by-day agenda view of upcoming sunrises and sunsets, color-coded by score. The app has four views: Today, Outlook, Map and Plan.
- **Plan a shoot** — pick any date and any place in the world (search a town or paste coordinates from Google Maps, like `35.7672, -78.6631`) and see where the Sun and Moon rise and set on a map, with times in that place's own time zone and a sky-view dial. Drop a pin on a subject, such as a skyline or a tower, to see its direction and distance, the light on it at sunrise and sunset, and the dates the Sun or Moon lines up with it. A time slider moves the Sun and Moon through the day (a second one sits on the sky view, so you can watch the dial as you drag), the sky outlook scores dates inside the forecast window, and you can share the plan as a link or add the shoot to your calendar with the light times in the notes. Directions and times are calculated, so they are exact for any date; there is no sky forecast past about ten days, and the subject's height and anything in the way are not known. You can set whether you're viewing from the ground or a drone (and at what height), add trees, buildings or hills that are in the way, and see when the Sun is lost or clears them from each height. A one-page printable shoot card, with a QR code that reopens the plan, can be printed or saved as a PDF. Recent places are kept on your device, and a refresh returns you to the same tab and plan.
- **Installable app (PWA)** — add it to your Home Screen on iOS or Android for a real standalone app experience, with offline support for the app itself (forecast data always pulls fresh, never stale).
- **Push notifications** — optional alerts before sunrise, sunset, or golden hour (morning and evening), sent right to your phone. You choose which alerts you want and how far ahead: 15, 30, 60 or 90 minutes. Notifications need the app added to your Home Screen (see the [how-to](HOW-TO.md)).
- **Built-in resilience** — automatic retry with backoff, cached last-known data with a clear "stale" indicator, and plain-language error messages instead of raw failures.

## How it works

- New to Afterglow? The [how-to guide](HOW-TO.md) covers installing, notifications and reading the score.

- Forecast data comes from [Open-Meteo](https://open-meteo.com/) — free, no API key required.
- Moon phase, moonrise and moonset are calculated on your device with [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT licence, by Don Cross). Nothing about your location is sent anywhere for this, and it works offline. Checked against the US Naval Observatory, rise and set times agree to within a minute.
- Cloud cover is sampled along the sun's actual azimuth (not just overhead) using great-circle geometry, to judge whether direct light can actually reach the horizon.
- Notifications run on a Cloudflare Worker with a scheduled check every 5 minutes, using Web Push — no app store, no third-party notification service.

## Good to know

- Weather models update a few times a day, so a forecast can change when a new run arrives. Check again closer to the time, especially for sunsets more than a day out.
- Color often peaks a little after sunset (15–20 minutes) or just before sunrise, so Afterglow shows that window on the main card for Fair and better days.
- Scores run from Flat to Fair, Good, Great and Epic. Treat them as a guide to the odds, not a promise.

## Tech

Single-file HTML/CSS/JS front end, no build step. Notification backend is a standalone Cloudflare Worker (`worker.js`) using only the Web Crypto API — no external push libraries. Visits are counted with [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/).

## Status

Actively used and evolving. Scoring constants (cloud sweet-spot ranges, murk-penalty thresholds, sampling distance) are being refined against real shoot outcomes over time.

## Privacy

Afterglow has no accounts and no ads. Your chosen location, recent places and Plan stay on your device, except when you turn on notifications: then that location, your alert choices and your phone's push address are stored so the alerts can be sent, and they're removed when you turn notifications off. The page also uses Cloudflare Web Analytics, a privacy-focused visit counter. It counts visits and rough details like country and device type, with no cookies and no personal information, so I can see whether Afterglow is being used.

## Support this project

Afterglow is free. If it's saved you time, or helped you catch an epic sunset, sunrise, or moon shot you'd have otherwise missed, you can [buy me a coffee ☕](https://buymeacoffee.com/JohnstonAerial). It helps cover the time I put into keeping it accurate.

Thank you, and good light.
— Jim, Johnston Aerial
---

Built by [Johnston Aerial](https://johnstonaerial.com).
