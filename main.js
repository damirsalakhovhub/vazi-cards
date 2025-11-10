import { generateBoard } from './generators/boardGenerator.js';
import { createColumnHeader } from './components/ColumnHeader.js';
import { createCard } from './components/Card.js';
import { createAddTaskButton } from './components/AddTaskButton.js';
import { createGeneratorPanel } from './components/GeneratorPanel.js';
import { createNavigation } from './components/Navigation.js';
import { createListView } from './components/ListView.js';
import { createSidebar } from './components/Sidebar.js';

let currentBoardConfig = generateBoard({ columnsCount: 5, totalCards: 50 });
let currentView = 'board';

function renderBoard(boardData) {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.className = '';
  
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
    
    const columnContent = document.createElement('div');
    columnContent.className = 'column-content';
    
    columnCards.forEach((cardData, index) => {
      if (index > 0) {
        const divider = document.createElement('div');
        divider.className = 'card-divider';
        columnContent.appendChild(divider);
      }
      const card = createCard(cardData, boardData.cards);
      columnContent.appendChild(card);
    });
    
    column.appendChild(columnContent);
    
    const addButton = createAddTaskButton();
    column.appendChild(addButton);
    
    app.appendChild(column);
  });
}

function renderListView(boardData) {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.className = 'list-view-container';
  
  const listView = createListView(boardData);
  app.appendChild(listView);
}

function handleViewChange(view) {
  currentView = view;
  
  const contentWrapper = document.querySelector('.content-wrapper');
  const navigation = document.querySelector('.navigation');
  if (navigation) {
    navigation.remove();
  }
  
  const newNavigation = createNavigation(currentView, handleViewChange);
  const app = document.getElementById('app');
  contentWrapper.insertBefore(newNavigation, app);
  
  if (view === 'board') {
    renderBoard(currentBoardConfig);
  } else if (view === 'list') {
    renderListView(currentBoardConfig);
  }
}

function handleGenerate(config) {
  const newBoard = generateBoard(config);
  currentBoardConfig = newBoard;
  
  if (currentView === 'board') {
    renderBoard(newBoard);
  } else if (currentView === 'list') {
    renderListView(newBoard);
  }
}

function init() {
  const app = document.getElementById('app');
  
  const sidebar = createSidebar();
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';
  
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';
  
  const navigation = createNavigation(currentView, handleViewChange);
  
  mainContainer.appendChild(sidebar);
  contentWrapper.appendChild(navigation);
  contentWrapper.appendChild(app);
  mainContainer.appendChild(contentWrapper);
  
  document.body.appendChild(mainContainer);
  
  const generatorPanel = createGeneratorPanel(handleGenerate);
  document.body.insertBefore(generatorPanel, mainContainer);
  
  renderBoard(currentBoardConfig);
}

init();

