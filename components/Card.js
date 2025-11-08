import { createCardHeader } from './CardHeader.js';
import { createCardBody } from './CardBody.js';
import { createCardAvatars } from './CardAvatars.js';
import { createCardLabels } from './CardLabels.js';
import { createCardDate } from './CardDate.js';
import { createCardSubtasks } from './CardSubtasks.js';
import { createCardParentNote } from './CardParentNote.js';

const dotsMenuSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 10C3.5 9.17157 4.17157 8.5 5 8.5C5.82843 8.5 6.5 9.17157 6.5 10C6.5 10.8284 5.82843 11.5 5 11.5C4.17157 11.5 3.5 10.8284 3.5 10Z" fill="currentColor"/><path d="M8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10Z" fill="currentColor"/><path d="M15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5Z" fill="currentColor"/></svg>';

export function createCard(cardData, allCards = []) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-card-id', cardData.id);
  
  const menuButton = document.createElement('button');
  menuButton.className = 'card-menu-button';
  menuButton.type = 'button';
  menuButton.innerHTML = dotsMenuSvg;
  card.appendChild(menuButton);
  
  const main = document.createElement('div');
  main.className = 'card-main';
  
  if (cardData.parentNote) {
    const note = createCardParentNote(cardData.parentNote);
    if (note) {
      card.appendChild(note);
    }
  }
  
  const header = createCardHeader(cardData);
  const body = createCardBody(cardData);
  
  const checkbox = header.querySelector('.checkbox');
  if (checkbox) {
    const updateCardOpacity = () => {
      const opacity = getComputedStyle(document.documentElement).getPropertyValue('--card-checked-opacity').trim();
      if (checkbox.checked && opacity !== '1') {
        card.classList.add('card-checked');
      } else {
        card.classList.remove('card-checked');
      }
    };
    
    updateCardOpacity();
    checkbox.addEventListener('change', () => {
      updateCardOpacity();
      
      if (cardData.parentId) {
        const parentCardElement = document.querySelector(`[data-card-id="${cardData.parentId}"]`);
        if (parentCardElement) {
          const parentSubtasksList = parentCardElement.querySelector('.card-subtasks-list');
          if (parentSubtasksList) {
            const subtaskItem = parentSubtasksList.querySelector(`[data-subtask-id="${cardData.id}"]`);
            if (subtaskItem) {
              const subtaskCheckbox = subtaskItem.querySelector('.checkbox');
              if (subtaskCheckbox) {
                subtaskCheckbox.checked = checkbox.checked;
                const counter = parentCardElement.querySelector('.card-subtasks-counter');
                if (counter) {
                  const allCheckboxes = Array.from(parentSubtasksList.querySelectorAll('.checkbox'));
                  const completed = allCheckboxes.filter(cb => cb.checked).length;
                  counter.textContent = `${completed}/${allCheckboxes.length} subtasks`;
                }
              }
            }
          }
        }
      }
    });
  }
  
  main.appendChild(header);
  main.appendChild(body);
  
  const parameters = document.createElement('div');
  parameters.className = 'card-parameters';
  
  const avatars = createCardAvatars(cardData.assignees);
  if (avatars) {
    parameters.appendChild(avatars);
  }
  
  const labels = createCardLabels(cardData.labels);
  if (labels) {
    parameters.appendChild(labels);
  }
  
  const date = createCardDate(cardData.date);
  if (date) {
    parameters.appendChild(date);
  }
  
  main.appendChild(parameters);
  card.appendChild(main);
  
  if (cardData.subtaskIds && cardData.subtaskIds.length > 0) {
    const subtaskCards = cardData.subtaskIds.map(id => allCards.find(c => c.id === id)).filter(Boolean);
    const subtasks = createCardSubtasks(cardData.subtasks, subtaskCards, allCards);
    if (subtasks) {
      card.appendChild(subtasks);
    }
  } else if (cardData.subtasks) {
    const subtasks = createCardSubtasks(cardData.subtasks);
    if (subtasks) {
      card.appendChild(subtasks);
    }
  }
  
  return card;
}

