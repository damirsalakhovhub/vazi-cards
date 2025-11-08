export function createCardBody(data) {
  const body = document.createElement('div');
  body.className = 'card-body';
  
  const titleLink = document.createElement('a');
  titleLink.href = '#';
  titleLink.className = 'card-title';
  titleLink.textContent = data.title;
  
  body.appendChild(titleLink);
  return body;
}

