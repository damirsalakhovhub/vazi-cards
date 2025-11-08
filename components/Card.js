import { createCardHeader } from './CardHeader.js';
import { createCardBody } from './CardBody.js';
import { createCardAvatars } from './CardAvatars.js';
import { createCardLabels } from './CardLabels.js';
import { createCardDate } from './CardDate.js';
import { createCardSubtasks } from './CardSubtasks.js';
import { createCardParentNote } from './CardParentNote.js';

export function createCard(cardData, allCards = []) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-card-id', cardData.id);
  
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

