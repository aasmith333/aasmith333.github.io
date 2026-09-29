/* aaronjsmith.net — small enhancements. The site works without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Typewriter (home page quote) ----------
     The full quote is already in the HTML, so search engines, link previews
     and screen readers always get it. The typing effect runs once per visit,
     and never for people who have turned on "reduce motion". */
  var tw = document.querySelector('[data-typewriter]');
  if (tw && !reduceMotion) {
    var seen = false;
    try { seen = sessionStorage.getItem('typed') === '1'; } catch (e) {}
    if (!seen) {
      try { sessionStorage.setItem('typed', '1'); } catch (e) {}
      typeOut(tw);
    }
  }

  function typeOut(box) {
    var full = box.querySelector('.tw-full');
    if (!full) return;
    // Turn the quote into a list of characters and line breaks
    var tokens = [];
    Array.prototype.forEach.call(full.childNodes, function (node) {
      if (node.nodeType === 3) {
        Array.prototype.forEach.call(node.textContent, function (ch) { tokens.push(ch); });
      } else if (node.nodeName === 'BR') {
        tokens.push('\n');
      }
    });

    var typed = document.createElement('span');
    typed.className = 'tw-typed';
    typed.setAttribute('aria-hidden', 'true');
    var text = document.createElement('span');
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '▌';
    typed.appendChild(text);
    typed.appendChild(cursor);
    box.appendChild(typed);
    box.classList.add('is-typing');

    var i = 0;
    var speed = 42; // milliseconds per character
    function next() {
      if (i >= tokens.length) {
        setTimeout(finish, 900);
        return;
      }
      var t = tokens[i++];
      if (t === '\n') {
        text.appendChild(document.createElement('br'));
      } else {
        text.appendChild(document.createTextNode(t));
      }
      setTimeout(next, t === '\n' ? speed * 6 : speed);
    }
    function finish() {
      box.classList.remove('is-typing');
      if (typed.parentNode) typed.parentNode.removeChild(typed);
    }
    // Let people skip it
    box.addEventListener('click', function () { i = tokens.length; finish(); });
    next();
  }

  /* ---------- Contact forms (Formspree) ----------
     Each form sends in the background and shows a thank-you message.
     If JavaScript is off, the form still posts to Formspree normally. */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-ajax]'), function (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('[type="submit"]');
    var label = button ? button.textContent : '';

    form.addEventListener('submit', function (event) {
      if (!window.fetch || !window.FormData) return;
      event.preventDefault();

      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) { status.className = 'form-status'; status.textContent = ''; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('Form error');
        form.reset();
        if (status) {
          status.className = 'form-status is-success';
          status.textContent = form.getAttribute('data-success') ||
            'Thank you. I’ll be in touch within a few days.';
        }
        if (button) button.textContent = 'Sent';
        var after = form.querySelector('.form-after');
        if (after) after.hidden = false;
      }).catch(function () {
        if (status) {
          status.className = 'form-status is-error';
          status.innerHTML = 'Something went wrong. Please try again, or email me at ' +
            '<a href="mailto:contact@aaronjsmith.net">contact@aaronjsmith.net</a>.';
        }
        if (button) { button.disabled = false; button.textContent = label; }
      });
    });
  });

  /* ---------- Tarot: "Request this reading" buttons ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-reading]'), function (link) {
    link.addEventListener('click', function () {
      var select = document.getElementById('tarot-reading');
      if (select) select.value = link.getAttribute('data-reading');
      var name = document.getElementById('tarot-name');
      if (name) setTimeout(function () { name.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
    });
  });

  /* ---------- Latest posts from The Cluttered Mouth (optional) ----------
     The lists on the Home and Writing pages are written into the HTML.
     To keep them updated automatically, create a Content API key in Ghost
     (Settings > Integrations > Add custom integration) and paste it into
     the data-ghost-key="" attribute on the list.
     Ghost's API answers at the ghost.io address, not theclutteredmouth.com. */
  var GHOST_API = 'https://the-cluttered-mouth.ghost.io/ghost/api/content/posts/';
  Array.prototype.forEach.call(document.querySelectorAll('[data-ghost-key]'), function (list) {
    var key = list.getAttribute('data-ghost-key');
    if (!key || !window.fetch) return;
    var limit = list.getAttribute('data-limit') || '3';
    var url = GHOST_API + '?key=' +
      encodeURIComponent(key) + '&limit=' + encodeURIComponent(limit) +
      '&fields=title,url,published_at,custom_excerpt';
    var filter = list.getAttribute('data-ghost-filter');   // e.g. "tag:poetry"
    if (filter) url += '&filter=' + encodeURIComponent(filter);

    fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Ghost error');
      return r.json();
    }).then(function (data) {
      if (!data || !data.posts || !data.posts.length) return;
      var frag = document.createDocumentFragment();
      data.posts.forEach(function (post) {
        var li = document.createElement('li');
        var date = document.createElement('span');
        date.className = 'post-date';
        date.textContent = new Date(post.published_at).toLocaleDateString('en-US',
          { month: 'short', day: 'numeric', year: 'numeric' });
        var a = document.createElement('a');
        a.className = 'post-title';
        a.href = post.url;
        a.textContent = post.title;
        li.appendChild(date);
        li.appendChild(a);
        if (post.custom_excerpt) {
          var dek = document.createElement('span');
          dek.className = 'post-dek';
          dek.textContent = post.custom_excerpt;
          li.appendChild(dek);
        }
        frag.appendChild(li);
      });
      list.innerHTML = '';
      list.appendChild(frag);
    }).catch(function () { /* keep the list that's already in the page */ });
  });

  /* ---------- "Copy" buttons (fediverse handle) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    if (!navigator.clipboard) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });
})();
