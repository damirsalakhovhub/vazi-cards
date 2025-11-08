export function createCardDate(dateData) {
  if (!dateData) {
    return null;
  }
  
  const date = document.createElement('div');
  date.className = `card-date card-date-${dateData.type}`;
  
  if (dateData.overdue) {
    date.className += ' card-date-overdue';
  }
  
  const arrow = document.createElement('span');
  arrow.textContent = '→ ';
  
  const value = document.createElement('span');
  value.textContent = dateData.value;
  
  date.appendChild(arrow);
  date.appendChild(value);
  
  return date;
}

