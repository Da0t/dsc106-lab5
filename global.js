/** Shared project helpers for the DSC 106 portfolio. */
export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load ${url}: HTTP ${response.status}`);
  return response.json();
}
export function renderProjects(projects, container, headingTag = 'h2') {
  container.replaceChildren();
  if (!projects.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No projects match your filters. Try another search or year.';
    container.append(empty);
    return;
  }
  for (const project of projects) {
    const article = document.createElement('article');
    article.className = 'project-card';
    const eyebrow = document.createElement('div');
    eyebrow.className = 'project-meta';
    eyebrow.textContent = `${project.year} · ${project.category ?? 'Project'}`;
    const heading = document.createElement(headingTag);
    heading.textContent = project.title;
    const description = document.createElement('p');
    description.textContent = project.description;
    const footer = document.createElement('p');
    footer.className = 'project-year';
    footer.textContent = `Built in ${project.year}`;
    article.append(eyebrow, heading, description, footer);
    if (project.url) {
      const link = document.createElement('a');
      link.href = project.url;
      link.textContent = 'View project ↗';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      article.append(link);
    }
    container.append(article);
  }
}