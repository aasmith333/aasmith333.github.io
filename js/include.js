document.addEventListener("DOMContentLoaded", () => {
  // Prevent the browser from overriding our scroll (common on SPA-like pages)
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const includeEls = Array.from(document.querySelectorAll("[data-include]"));

  Promise.all(
    includeEls.map(el => {
      const path = el.getAttribute("data-include");
      return fetch(path)
        .then(res => res.text())
        .then(html => { el.innerHTML = html; })
        .catch(() => { el.innerHTML = ""; });
    })
  ).finally(() => {
    // Try immediately, then retry a few times as layout settles (images, fonts, etc.)
    scrollToHashWithRetries();
    window.addEventListener("load", scrollToHashWithRetries, { once: true });
  });

  function scrollToHashWithRetries() {
    if (!location.hash) return;

    const hash = location.hash; // e.g. "#believe"
    let attempts = 0;

    const tryScroll = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
      }

      attempts += 1;
      if (attempts < 10) {
        // Keep trying as the page reflows
        setTimeout(tryScroll, 120);
      }
    };

    // Kick off after one paint
    requestAnimationFrame(tryScroll);
  }
});
