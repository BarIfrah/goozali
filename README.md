# Goozali Frontend (Static)

Landing + clean tabs. Each tab embeds Airtable/Google content; legacy "add +" actions open forms in a themed modal.

## Run locally
- Open `index.html` directly (double-click) or via WebStorm → Open in Browser.

## Edit tabs
- File: `assets/app.js` → the `TABS` array.
- Keep `key` values stable: `jobs`, `candidates`, `companies`, `salary`, `groups`, `help`.
- Add/replace multiple views per tab by pushing additional `{label, url}` items into `embeds`.

## Legacy actions / forms
- File: `assets/app.js` → `HASH_FORMS`. Keys are legacy anchors (e.g., `headdjobopening`, `addcandidate`).
- Clicking `<a href="#theanchor">` will open the mapped URL in the modal (and keep the hash for compatibility).
- You can also add direct external links (Google Forms / Typeform / Airtable) anywhere — they'll open in the modal.

## Layout
- Tabs section breaks out of the 1100px container and centers at 1280px max.
- iFrames are full width, 82vh tall (70vh on small screens).

## Notes
- We can't style the internals of an embedded Airtable view/form, but the wrapper (modal/panel) is themed.
