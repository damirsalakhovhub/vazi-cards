const arrowDownSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.03412 6.63446C5.34654 6.32204 5.85307 6.32204 6.16549 6.63446L7.99981 8.46878L9.83412 6.63446C10.1465 6.32204 10.6531 6.32204 10.9655 6.63446C11.2779 6.94688 11.2779 7.45341 10.9655 7.76583L8.56549 10.1658C8.25307 10.4783 7.74654 10.4783 7.43412 10.1658L5.03412 7.76583C4.7217 7.45341 4.7217 6.94688 5.03412 6.63446Z" fill="currentColor"/></svg>';

const checkboxCheckedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5677 6.64017L9.56771 14.6402C9.19673 15.0853 8.50214 15.1168 8.09238 14.7071L4.09238 10.7071C3.18043 9.79514 4.59464 8.38093 5.50659 9.29288L8.73229 12.5186L15.0313 5.3598C15.8569 4.36903 17.3933 5.6494 16.5677 6.64017Z" fill="currentColor"/></svg>';

export function createCardSubtasks(subtasksData, subtaskCards = null, allCards = []) {
  const container = document.createElement('div');
  container.className = 'card-subtasks';
  
  if (!subtasksData || subtasksData.total === 0) {
    return null;
  }
  
  const items = subtaskCards ? subtaskCards.map(card => {
    const subtaskItem = subtasksData.items.find(item => item.id === card.id);
    return {
      id: card.id,
      text: card.title,
      completed: subtaskItem ? subtaskItem.completed : false,
      card: card
    };
  }) : subtasksData.items;
  
  const completedCount = items.filter(item => item.completed).length;
  
  const counter = document.createElement('div');
  counter.className = 'card-subtasks-counter';
  counter.textContent = `${completedCount}/${items.length} subtasks`;
  
  const arrow = document.createElement('span');
  arrow.className = 'card-subtasks-arrow';
  arrow.setAttribute('data-state', 'closed');
  arrow.innerHTML = arrowDownSvg;
  
  counter.appendChild(arrow);
  
  const list = document.createElement('div');
  list.className = 'card-subtasks-list';
  list.style.display = 'none';
  
  items.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'card-subtasks-item';
    if (item.card) {
      itemEl.setAttribute('data-subtask-id', item.id);
    }
    
    const checkboxWrapper = document.createElement('label');
    checkboxWrapper.className = 'checkbox-wrapper';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = item.completed;
    
    if (item.card) {
      checkbox.addEventListener('change', () => {
        item.completed = checkbox.checked;
        
        const subtaskCardElement = document.querySelector(`[data-card-id="${item.id}"]`);
        if (subtaskCardElement) {
          const subtaskCheckbox = subtaskCardElement.querySelector('.checkbox');
          if (subtaskCheckbox) {
            subtaskCheckbox.checked = checkbox.checked;
            if (checkbox.checked) {
              subtaskCardElement.classList.add('card-checked');
            } else {
              subtaskCardElement.classList.remove('card-checked');
            }
          }
        }
        
        const completed = Array.from(list.querySelectorAll('.checkbox')).filter(cb => cb.checked).length;
        counter.textContent = `${completed}/${items.length} subtasks`;
      });
    } else {
      checkbox.addEventListener('change', () => {
        item.completed = checkbox.checked;
        const completed = Array.from(list.querySelectorAll('.checkbox')).filter(cb => cb.checked).length;
        counter.textContent = `${completed}/${items.length} subtasks`;
      });
    }
    
    const checkboxIcon = document.createElement('span');
    checkboxIcon.className = 'checkbox-icon';
    checkboxIcon.innerHTML = checkboxCheckedSvg;
    
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkboxIcon);
    
    const text = document.createElement('span');
    text.className = 'card-subtasks-text';
    text.textContent = item.text;
    if (item.card) {
      text.style.cursor = 'pointer';
      text.addEventListener('click', () => {
        const subtaskCardElement = document.querySelector(`[data-card-id="${item.id}"]`);
        if (subtaskCardElement) {
          subtaskCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          subtaskCardElement.style.outline = '2px solid var(--color-checkbox-checked-bg)';
          setTimeout(() => {
            subtaskCardElement.style.outline = 'none';
          }, 2000);
        }
      });
    }
    
    itemEl.appendChild(checkboxWrapper);
    itemEl.appendChild(text);
    list.appendChild(itemEl);
  });
  
  let isOpen = false;
  
  counter.addEventListener('click', () => {
    isOpen = !isOpen;
    list.style.display = isOpen ? 'block' : 'none';
    container.classList.toggle('card-subtasks-open', isOpen);
    if (isOpen) {
      container.classList.add('card-subtasks-hover');
    } else {
      container.classList.remove('card-subtasks-hover');
    }
    arrow.setAttribute('data-state', isOpen ? 'open' : 'closed');
    arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });
  
  container.addEventListener('mouseleave', () => {
    if (isOpen) {
      container.classList.remove('card-subtasks-hover');
    }
  });
  
  container.addEventListener('mouseenter', () => {
    if (isOpen) {
      container.classList.add('card-subtasks-hover');
    }
  });
  
  container.appendChild(counter);
  container.appendChild(list);
  
  return container;
}

