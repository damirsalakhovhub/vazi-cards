export function createListView(boardData) {
  const container = document.createElement('div');
  container.className = 'list-view';
  
  const placeholder = document.createElement('div');
  placeholder.className = 'list-view-placeholder';
  placeholder.textContent = 'List view - данные будут добавлены позже';
  
  container.appendChild(placeholder);
  
  return container;
}

