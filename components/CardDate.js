export function createCardDate(dateData) {
  if (!dateData) {
    return null;
  }
  
  const date = document.createElement('div');
  date.className = `card-date card-date-${dateData.type}`;
  
  if (dateData.overdue) {
    date.className += ' card-date-overdue';
  }
  
  const value = document.createElement('span');
  
  if (dateData.type === 'range') {
    const { start, end } = dateData;
    
    // Format start date
    let startStr = `${start.day}`;
    if (start.month !== end.month || start.year !== end.year) {
      startStr += ` ${start.month}`;
      if (start.year !== end.year) {
        const startYearShort = String(start.year).slice(-2);
        startStr += ` ${startYearShort}`;
      }
    }
    
    // Format end date
    const endYearShort = String(end.year).slice(-2);
    let endStr = `${end.day} ${end.month} ${endYearShort}`;
    
    value.textContent = `${startStr} – ${endStr}`;
  } else {
    value.textContent = dateData.value;
  }
  
  date.appendChild(value);
  
  return date;
}

