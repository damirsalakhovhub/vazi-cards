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
  
  views.appendChild(boardLink);
  views.appendChild(listLink);
  
  container.appendChild(product);
  container.appendChild(views);
  
  nav.appendChild(container);
  
  return nav;
}

