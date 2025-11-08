const dotsMenuSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 10C3.5 9.17157 4.17157 8.5 5 8.5C5.82843 8.5 6.5 9.17157 6.5 10C6.5 10.8284 5.82843 11.5 5 11.5C4.17157 11.5 3.5 10.8284 3.5 10Z" fill="currentColor"/><path d="M8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10Z" fill="currentColor"/><path d="M15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5Z" fill="currentColor"/></svg>';

export function createColumnHeader(columnData) {
  const header = document.createElement('div');
  header.className = 'column-header';
  
  const title = document.createElement('h2');
  title.className = 'column-title';
  title.textContent = columnData.title;
  
  const info = document.createElement('div');
  info.className = 'column-info';
  
  const counter = document.createElement('span');
  counter.className = 'column-counter';
  counter.textContent = `Showed ${columnData.showed}/${columnData.total}`;
  
  const menuButton = document.createElement('button');
  menuButton.className = 'column-menu-button';
  menuButton.innerHTML = dotsMenuSvg;
  
  info.appendChild(counter);
  info.appendChild(menuButton);
  
  header.appendChild(title);
  header.appendChild(info);
  
  return header;
}

