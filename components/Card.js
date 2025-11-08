import { createCardHeader } from './CardHeader.js';
import { createCardBody } from './CardBody.js';
import { createCardAvatars } from './CardAvatars.js';
import { createCardLabels } from './CardLabels.js';
import { createCardDate } from './CardDate.js';
import { createCardSubtasks } from './CardSubtasks.js';
import { createCardParentNote } from './CardParentNote.js';

export function createCard(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
  
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
    checkbox.addEventListener('change', updateCardOpacity);
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
  
  const subtasks = createCardSubtasks(cardData.subtasks);
  if (subtasks) {
    card.appendChild(subtasks);
  }
  
  return card;
}

