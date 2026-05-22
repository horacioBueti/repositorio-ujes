const works = [
  {
    id: 1,
    title: 'Desenvolvimento de um Sistema de Gestão de Biblioteca Acadêmica',
    author: 'Ana Silva',
    year: 2024,
    category: 'Licenciatura',
    supervisor: 'Prof. Dr. Manuel Castro',
    area: 'Sistemas de Informação',
    summary: 'Este trabalho apresenta um sistema web para gerir empréstimos, devoluções e inventário de uma biblioteca.',
    link: 'https://example.com/trabalho-1.pdf'
  },
  {
    id: 2,
    title: 'Modelo de Previsão de Demanda Energética com Machine Learning',
    author: 'Carlos Mendes',
    year: 2025,
    category: 'MSc',
    supervisor: 'Dra. Isabel Pereira',
    area: 'Engenharia Elétrica',
    summary: 'Uma solução preditiva para demanda de energia elétrica baseada em dados históricos e redes neurais.',
    link: 'https://example.com/trabalho-2.pdf'
  },
  {
    id: 3,
    title: 'Análise de Impacto Ambiental de Novos Projetos Urbanos',
    author: 'Beatriz Costa',
    year: 2023,
    category: 'PhD',
    supervisor: 'Prof. Dr. João Furtado',
    area: 'Ciências Ambientais',
    summary: 'Estudo aprofundado sobre indicadores e políticas de sustentabilidade em ambientes urbanos.',
    link: 'https://example.com/trabalho-3.pdf'
  },
  {
    id: 4,
    title: 'Aplicação Móvel para Monitorização de Saúde Comunitária',
    author: 'Miguel Lopes',
    year: 2024,
    category: 'MSc',
    supervisor: 'Dra. Carla Fernandes',
    area: 'Saúde Pública',
    summary: 'Projeto de uma app que auxilia a recolha de dados de saúde e gestão de intervenções comunitárias.',
    link: 'https://example.com/trabalho-4.pdf'
  },
  {
    id: 5,
    title: 'Plataforma de Apoio à Escrita Científica',
    author: 'João Pereira',
    year: 2025,
    category: 'Licenciatura',
    supervisor: 'Prof. Dr. Ricardo Almeida',
    area: 'Educação',
    summary: 'Uma plataforma com recursos para ajudar estudantes na organização e formatação de trabalhos acadêmicos.',
    link: 'https://example.com/trabalho-5.pdf'
  }
];

const worksGrid = document.getElementById('works-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter');
const detailPanel = document.getElementById('detail-panel');
const closeDetail = document.getElementById('close-detail');

const detailTitle = document.getElementById('detail-title');
const detailMeta = document.getElementById('detail-meta');
const detailSummary = document.getElementById('detail-summary');
const detailSupervisor = document.getElementById('detail-supervisor');
const detailArea = document.getElementById('detail-area');
const detailYear = document.getElementById('detail-year');
const detailLink = document.getElementById('detail-link');

let activeCategory = 'all';
let activeQuery = '';

function renderWorks(list) {
  if (!list.length) {
    worksGrid.innerHTML = '<p class="empty-state">Nenhum trabalho encontrado. Ajuste os filtros ou a pesquisa.</p>';
    return;
  }

  worksGrid.innerHTML = list
    .map((work) => `
      <article class="work-card">
        <div class="badge">${work.category}</div>
        <h3>${work.title}</h3>
        <p class="work-meta">${work.author} • ${work.year} • ${work.area}</p>
        <p>${work.summary}</p>
        <div class="card-actions">
          <button class="button-primary" type="button" onclick="showDetail(${work.id})">Ver detalhes</button>
          <a class="button-secondary" href="${work.link}" target="_blank" rel="noopener">Acessar documento</a>
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

function showDetail(id) {
  const work = works.find((item) => item.id === id);
  if (!work) return;

  detailTitle.textContent = work.title;
  detailMeta.textContent = `${work.author} • ${work.category} • ${work.year}`;
  detailSummary.textContent = work.summary;
  detailSupervisor.textContent = work.supervisor;
  detailArea.textContent = work.area;
  detailYear.textContent = work.year;
  detailLink.href = work.link;
  detailPanel.hidden = false;
  detailPanel.focus();
}

function hideDetail() {
  detailPanel.hidden = true;
}

window.showDetail = showDetail;

searchInput.addEventListener('input', (event) => {
  activeQuery = event.target.value;
  filterWorks();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveCategory(button.dataset.category));
});

closeDetail.addEventListener('click', hideDetail);
detailPanel.addEventListener('click', (event) => {
  if (event.target === detailPanel) {
    hideDetail();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !detailPanel.hidden) {
    hideDetail();
  }
});

filterWorks();
