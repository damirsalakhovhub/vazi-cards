import { boardConfig } from './data/board.js';
import { generateBoard } from './generators/boardGenerator.js';
import { createColumnHeader } from './components/ColumnHeader.js';
import { createCard } from './components/Card.js';
import { createAddTaskButton } from './components/AddTaskButton.js';
import { createGeneratorPanel } from './components/GeneratorPanel.js';

let currentBoardConfig = boardConfig;

function renderBoard(boardData) {
  const app = document.getElementById('app');
  app.innerHTML = '';
  
  boardData.columns.forEach(columnConfig => {
    const column = document.createElement('div');
    column.className = 'column';
    
    const columnCards = boardData.cards.filter(card => card.columnId === columnConfig.id);
    
    const columnData = {
      title: columnConfig.name,
      showed: columnCards.length,
      total: columnCards.length,
      color: columnConfig.color
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

function handleGenerate(config) {
  const newBoard = generateBoard(config);
  currentBoardConfig = newBoard;
  renderBoard(newBoard);
}

function init() {
  const app = document.getElementById('app');
  
  const generatorPanel = createGeneratorPanel(handleGenerate);
  document.body.insertBefore(generatorPanel, app);
  
  renderBoard(currentBoardConfig);
}

init();

