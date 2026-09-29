# aaronjsmith.net

Plain HTML and CSS hosted on GitHub Pages. There is no build step, so you can edit any file and push.

## Where things live

| Page | File |
|---|---|
| Home | `index.html` |
| Spiritual Direction | `spiritual-direction/index.html` |
| Curious Tarot | `tarot/index.html` |
| Writing | `writing/index.html` |
| About | `about/index.html` |
| Form "thank you" page | `thank-you.html` |
| Not-found page | `404.html` |
| All styles | `assets/site.css` |
| Menu, forms, typewriter | `assets/site.js` |

The header and footer are copied into every page. If you change them, change them in all seven HTML files.

## Common edits

- **Fees or session details:** search `spiritual-direction/index.html` for `$15–$100`. The price shows up in the at-a-glance box, the "What to expect" section and the FAQ.
- **Tarot prices:** in `tarot/index.html`, each price appears on its reading card and in the "Which reading?" dropdown.
- **Latest posts list:** the posts on Home and Writing are typed into the HTML. To keep them updated automatically:
  1. In Ghost admin, go to Settings → Integrations → Add custom integration.
  2. Copy the **Content API key**.
  3. Paste it into `data-ghost-key=""` on the `<ul class="posts">` in `index.html` and `writing/index.html`.
- **Forms:** all three forms send to Formspree (`https://formspree.io/f/xykpqvaz`). A hidden `_subject` field on each one says where the message came from ("Spiritual direction inquiry", "Tarot reading request", "Note from aaronjsmith.net").
- **After editing CSS or JS:** change `?v=2` to `?v=3` in the `<link>`/`<script>` tags so browsers load the new file.

## Don't delete

- `CNAME`: it keeps the custom domain working.
- The DNS record that verifies your Bluesky handle (@aaronjsmith.net) lives with your domain registrar, not in this repo. Leave it alone if you ever change hosts.
