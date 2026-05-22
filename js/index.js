document.addEventListener('DOMContentLoaded', () => {
  const worksGrid = document.getElementById('works-grid');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter');

  let activeCategory = 'all';
  let activeQuery = '';

  function renderWorks(list) {
    if (!list.length) {
      worksGrid.innerHTML = '<p class="empty-state">Nenhum trabalho encontrado. Ajuste a pesquisa ou os filtros.</p>';
      return;
    }

    worksGrid.innerHTML = list
      .map((work) => `
        <article class="work-card card-glass">
          <div class="card-head">
            <span class="badge">${work.category}</span>
            <p class="work-year">${work.year}</p>
          </div>
          <h3>${work.title}</h3>
          <p class="work-meta">${work.author} • ${work.area}</p>
          <p>${work.summary}</p>
          <div class="card-actions">
            <a class="button-primary" href="project.html?id=${work.id}">Ver detalhes</a>
            <a class="button-secondary" href="${work.link}" target="_blank" rel="noopener">Download</a>
          </div>
        </article>
      `)
      .join('');
  }

  function filterWorks() {
    const query = activeQuery.trim().toLowerCase();
    const filtered = works.filter((work) => {
      const matchesCategory = activeCategory === 'all' || work.category === activeCategory;
      const matchesQuery = [work.title, work.author, work.area, work.year.toString(), work.category]
        .some((field) => field.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    renderWorks(filtered);
  }

  function setActiveCategory(category) {
    activeCategory = category;
    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.category === category);
    });
    filterWorks();
  }

  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  if (categoryParam) {
    activeCategory = categoryParam;
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveCategory(button.dataset.category));
  });

  searchInput.addEventListener('input', (event) => {
    activeQuery = event.target.value;
    filterWorks();
  });

  if (activeCategory !== 'all') {
    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.category === activeCategory);
    });
  }

  filterWorks();
});
