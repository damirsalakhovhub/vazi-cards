import { boardConfig } from './data/board.js';
import { createColumnHeader } from './components/ColumnHeader.js';
import { createCard } from './components/Card.js';
import { createAddTaskButton } from './components/AddTaskButton.js';

function init() {
  const app = document.getElementById('app');
  
  boardConfig.columns.forEach(columnConfig => {
    const column = document.createElement('div');
    column.className = 'column';
    
    const columnCards = boardConfig.cards.filter(card => card.columnId === columnConfig.id);
    
    const columnData = {
      title: columnConfig.name,
      showed: columnCards.length,
      total: columnCards.length
    };
    
    const header = createColumnHeader(columnData);
    column.appendChild(header);
    
    columnCards.forEach((cardData, index) => {
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
  });
}

init();

