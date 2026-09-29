# aaronjsmith.net

Plain HTML and CSS hosted on GitHub Pages. There is no build step, so you can edit any file and push.

## Where things live

| Page | File |
|---|---|
| Home | `index.html` |
| Spiritual Direction | `spiritual-direction/index.html` |
| Curious Tarot | `tarot/index.html` |
| Writing | `writing/index.html` |
| Subscribe | `subscribe/index.html` |
| About | `about/index.html` |
| Form "thank you" page | `thank-you.html` |
| Not-found page | `404.html` |
| All styles | `assets/site.css` |
| Menu, forms, typewriter | `assets/site.js` |

The header and footer are copied into every page. If you change them, change them in all eight HTML files.

## Common edits

- **Fees or session details:** search `spiritual-direction/index.html` for `$15–$100`. The price shows up in the at-a-glance box, the "What to expect" section and the FAQ.
- **Tarot prices:** in `tarot/index.html`, each price appears on its reading card and in the "Which reading?" dropdown.
- **Posts lists** (latest posts on Home and Subscribe; Poetry and Essay lists on Writing): these update themselves from Ghost's Content API. The Poetry and Essay lists pull whatever you tag `Poetry` or `Essay` in Ghost. The key is in `data-ghost-key` on each `<ul class="posts">`, and the API address is at the top of the Ghost section in `assets/site.js`. The posts typed into the HTML are a backup that shows if Ghost can't be reached.
- **Forms:** all three forms send to Formspree (`https://formspree.io/f/xykpqvaz`). A hidden `_subject` field on each one says where the message came from ("Spiritual direction inquiry", "Tarot reading request", "Note from aaronjsmith.net").
- **After editing CSS or JS:** raise the `?v=` number (for example `?v=4` to `?v=5`) on the `site.css` and `site.js` tags in every HTML file, so browsers load the new version.

## Don't delete

- `CNAME`: it keeps the custom domain working.
- Your Bluesky account currently uses the handle @theclutteredmouth.com. There's still an `_atproto` DNS record on aaronjsmith.net pointing to the same account. It does no harm, and it lets you switch your handle back to @aaronjsmith.net in Bluesky settings if you ever want to.
