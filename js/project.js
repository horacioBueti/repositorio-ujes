document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.getElementById('work-title');
  const subtitleEl = document.getElementById('work-subtitle');
  const categoryEl = document.getElementById('work-category');
  const nameEl = document.getElementById('work-name');
  const metaEl = document.getElementById('work-meta');
  const summaryEl = document.getElementById('work-summary');
  const authorEl = document.getElementById('work-author');
  const supervisorEl = document.getElementById('work-supervisor');
  const yearEl = document.getElementById('work-year');
  const areaEl = document.getElementById('work-area');
  const linkEl = document.getElementById('work-link');
  const relatedList = document.getElementById('related-list');

  const params = new URLSearchParams(window.location.search);
  const workId = Number(params.get('id'));
  const work = works.find((item) => item.id === workId);

  if (!work) {
    titleEl.textContent = 'Trabalho não encontrado';
    subtitleEl.textContent = 'Verifique o link e tente novamente.';
    document.getElementById('work-card').innerHTML = '<p class="empty-state">O trabalho solicitado não existe ou foi removido.</p>';
    return;
  }

  titleEl.textContent = work.title;
  subtitleEl.textContent = `${work.category} • ${work.year}`;
  categoryEl.textContent = work.category;
  nameEl.textContent = work.title;
  metaEl.textContent = `${work.author} • ${work.area}`;
  summaryEl.textContent = work.summary;
  authorEl.textContent = work.author;
  supervisorEl.textContent = work.supervisor;
  yearEl.textContent = work.year;
  areaEl.textContent = work.area;
  linkEl.href = work.link;

  const relatedWorks = works.filter((item) => item.category === work.category && item.id !== work.id).slice(0, 3);
  if (!relatedWorks.length) {
    relatedList.innerHTML = '<p class="empty-state">Sem trabalhos relacionados nesta categoria.</p>';
    return;
  }

  relatedList.innerHTML = relatedWorks
    .map((item) => `
      <article class="related-item">
        <h5>${item.title}</h5>
        <p>${item.author} • ${item.year}</p>
        <a class="button-secondary small" href="project.html?id=${item.id}">Ver detalhe</a>
      </article>
    `)
    .join('');
});
