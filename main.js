import { cardsData, columnData } from './data/cards.js';
import { createColumnHeader } from './components/ColumnHeader.js';
import { createCard } from './components/Card.js';
import { createAddTaskButton } from './components/AddTaskButton.js';

function init() {
  const app = document.getElementById('app');
  
  const column = document.createElement('div');
  column.className = 'column';
  
  const header = createColumnHeader(columnData);
  column.appendChild(header);
  
  cardsData.forEach((cardData, index) => {
    if (index > 0) {
      const divider = document.createElement('div');
      divider.className = 'card-divider';
      column.appendChild(divider);
    }
    const card = createCard(cardData);
    column.appendChild(card);
  });
  
  const addButton = createAddTaskButton();
  column.appendChild(addButton);
  
  app.appendChild(column);
}

init();

