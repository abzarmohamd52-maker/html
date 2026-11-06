/* فیلتر و جست‌وجوی مقالات — بدون وابستگی خارجی */
(function () {
  const searchInput = document.querySelector('#search');
  const categoryButtons = document.querySelectorAll('.categories button');
  const cards = document.querySelectorAll('.articles-grid .card');
  const emptyMessage = document.querySelector('#empty');

  if (!searchInput || !categoryButtons.length || !cards.length || !emptyMessage) return;

  let selectedCategory = 'all';

  function filterArticles() {
    const query = searchInput.value.trim().toLocaleLowerCase('fa');
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        card.dataset.category === selectedCategory;

      const matchesSearch =
        card.textContent.toLocaleLowerCase('fa').includes(query);

      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount !== 0;
  }

  categoryButtons.forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.category === 'all' ? 'true' : 'false');

    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;

      categoryButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      filterArticles();
    });
  });

  searchInput.addEventListener('input', filterArticles);

  // لینک‌های فوتر: maghalat.html?cat=seo
  const initialCat = new URLSearchParams(location.search).get('cat');
  if (initialCat) {
    const target = Array.from(categoryButtons).find((b) => b.dataset.category === initialCat);
    if (target) target.click();
  }
})();
