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
- **Colors and fonts:** the look (parchment, tooled leather and gold, after The Cluttered Mouth's logo) is set by the variables at the top of `assets/site.css`. The textures are `assets/parchment.jpg` and `assets/leather.jpg`; the ornament under page titles is `assets/flourish.svg` (and `flourish-gold.svg` in the footer). Fonts are Cinzel, IM Fell English and EB Garamond from Google Fonts, loaded in each page's `<head>`.
- **Newsletter signup button colors:** set on each Ghost signup `<script>` tag (`data-button-color` and `data-button-text-color`). On Home it's gold on the leather panel; on Writing and Subscribe it's leather with gold text.
- **The Cluttered Mouth logo:** `images/cluttered-mouth-logo-lg.webp` is a copy of the logo with its paper background made see-through, so it sits on the page texture without a box around it.
- **Share images and icons:** the pictures that show when a page is shared on social media are `assets/share-home.jpg` (Home, About, thank-you and 404), `share-direction.jpg`, `share-tarot.jpg` and `share-writing.jpg` (Writing and Subscribe), all 1200×630, set in each page's `og:image` tag. The browser-tab icons are `assets/icon.svg`, `favicon.ico` and `assets/apple-touch-icon.png`. If you replace one, give the new file a new name (or raise its `?v=` number) so browsers and social sites don't keep showing the old one.
- **After editing CSS or JS:** raise the `?v=` number (for example `?v=5` to `?v=6`) on the `site.css` and `site.js` tags in every HTML file, so browsers load the new version.

## Don't delete

- `CNAME`: it keeps the custom domain working.
- Your Bluesky account currently uses the handle @theclutteredmouth.com. There's still an `_atproto` DNS record on aaronjsmith.net pointing to the same account. It does no harm, and it lets you switch your handle back to @aaronjsmith.net in Bluesky settings if you ever want to.
