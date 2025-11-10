export function createNavigation(currentView, onViewChange) {
  const nav = document.createElement('nav');
  nav.className = 'navigation';
  
  const container = document.createElement('div');
  container.className = 'navigation-container';
  
  const product = document.createElement('div');
  product.className = 'navigation-product';
  product.textContent = 'Product';
  
  const views = document.createElement('div');
  views.className = 'navigation-views';
  
  const boardLink = document.createElement('button');
  boardLink.className = 'navigation-link';
  boardLink.textContent = 'Board';
  if (currentView === 'board') {
    boardLink.classList.add('navigation-link-active');
  }
  boardLink.addEventListener('click', () => onViewChange('board'));
  
  const listLink = document.createElement('button');
  listLink.className = 'navigation-link';
  listLink.textContent = 'List';
  if (currentView === 'list') {
    listLink.classList.add('navigation-link-active');
  }
  listLink.addEventListener('click', () => onViewChange('list'));
  
  const milestonesLink = document.createElement('button');
  milestonesLink.className = 'navigation-link';
  milestonesLink.textContent = 'Milestones';
  
  const ganttLink = document.createElement('button');
  ganttLink.className = 'navigation-link';
  ganttLink.textContent = 'Gantt';
  
  views.appendChild(boardLink);
  views.appendChild(listLink);
  views.appendChild(milestonesLink);
  views.appendChild(ganttLink);
  
  const filters = document.createElement('button');
  filters.className = 'navigation-filters';
  filters.textContent = 'Filters';
  
  container.appendChild(product);
  container.appendChild(views);
  container.appendChild(filters);
  
  nav.appendChild(container);
  
  return nav;
}

