import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

const allProjects = await fetchJSON('../lib/projects.json');
const list = document.querySelector('.projects');
const search = document.querySelector('.searchBar');
const svg = d3.select('#projects-pie-plot');
const legend = d3.select('.legend');
const projectCount = document.querySelector('#project-count');
const clearButton = document.querySelector('#clear-filters');
const arcGenerator = d3.arc().innerRadius(0).outerRadius(48);
const palette = d3.scaleOrdinal(d3.schemeTableau10);
const years = [...new Set(allProjects.map(project => String(project.year)))].sort();
for (const year of years) palette(year);

let query = '';
let selectedYear = null;

function matchesQuery(project) {
  return JSON.stringify(project).toLowerCase().includes(query.trim().toLowerCase());
}
function toggleYear(year) {
  selectedYear = selectedYear === year ? null : year;
  updatePage();
}
function renderPieChart(searchedProjects) {
  const buckets = d3.rollups(searchedProjects, values => values.length, project => String(project.year));
  const data = buckets.map(([year, count]) => ({ label: year, value: count }))
    .sort((a, b) => a.label.localeCompare(b.label));
  const arcs = d3.pie().sort(null).value(d => d.value)(data);
  svg.selectAll('*').remove();
  legend.selectAll('*').remove();

  arcs.forEach(arc => {
    const { label: year, value } = arc.data;
    const selected = selectedYear === year;
    const path = svg.append('path')
      .attr('d', arcGenerator(arc))
      .attr('fill', palette(year))
      .attr('class', selected ? 'selected' : '')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', `${year}: ${value} projects; ${selected ? 'clear' : 'apply'} year filter`)
      .attr('aria-pressed', String(selected))
      .on('click', () => toggleYear(year))
      .on('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleYear(year);
        }
      });
    path.append('title').text(`${year}: ${value} project${value === 1 ? '' : 's'}`);

    const item = legend.append('li').attr('class', selected ? 'selected' : '')
      .style('--color', palette(year));
    item.append('button').attr('type', 'button').attr('aria-pressed', String(selected))
      .on('click', () => toggleYear(year));
    const button = item.select('button');
    button.append('span').attr('class', 'swatch').attr('aria-hidden', 'true');
    button.append('span').text(year);
    button.append('em').text(`(${value})`);
  });
  if (!data.length) {
    svg.append('text').attr('text-anchor', 'middle').attr('font-size', '5')
      .attr('fill', 'currentColor').text('No results');
  }
}
function updatePage() {
  const searched = allProjects.filter(matchesQuery);
  const visible = searched.filter(project => selectedYear === null || String(project.year) === selectedYear);
  renderProjects(visible, list, 'h3');
  renderPieChart(searched);
  projectCount.textContent = `${visible.length} of ${allProjects.length} projects`;
  clearButton.hidden = !(query || selectedYear);
}
search.addEventListener('input', event => {
  query = event.target.value;
  updatePage();
});
clearButton.addEventListener('click', () => {
  query = '';
  selectedYear = null;
  search.value = '';
  updatePage();
});
updatePage();