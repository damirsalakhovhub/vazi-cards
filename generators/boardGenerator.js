import { generateCard } from './cardGenerator.js';
import { columnsConfig } from '../data/columns.js';

const defaultConfig = {
  columnsCount: 3,
  cardsPerColumn: { min: 2, max: 8 },
  totalCards: null
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distributeCards(totalCards, columnsCount) {
  const distribution = [];
  let remaining = totalCards;
  
  for (let i = 0; i < columnsCount; i++) {
    if (i === columnsCount - 1) {
      distribution.push(remaining);
    } else {
      const maxForColumn = Math.ceil(remaining / (columnsCount - i));
      const cards = randomInt(1, Math.min(maxForColumn, remaining - (columnsCount - i - 1)));
      distribution.push(cards);
      remaining -= cards;
    }
  }
  
  return distribution;
}

export function generateBoard(config = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  
  let columns = [...columnsConfig];
  if (finalConfig.columnsCount && finalConfig.columnsCount !== columns.length) {
    if (finalConfig.columnsCount < columns.length) {
      columns = columns.slice(0, finalConfig.columnsCount);
    } else {
      const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
      const names = ['Backlog', 'In Progress', 'Review', 'Testing', 'Deployed'];
      for (let i = columns.length; i < finalConfig.columnsCount; i++) {
        columns.push({
          id: `column-${i + 1}`,
          name: names[i % names.length] || `Column ${i + 1}`,
          color: colors[i % colors.length]
        });
      }
    }
  }
  
  let totalCards;
  if (finalConfig.totalCards) {
    totalCards = finalConfig.totalCards;
  } else {
    const cardsPerColumn = finalConfig.cardsPerColumn || { min: 2, max: 8 };
    totalCards = columns.length * randomInt(cardsPerColumn.min, cardsPerColumn.max);
  }
  
  const distribution = distributeCards(totalCards, columns.length);
  
  const cards = [];
  const parentCards = [];
  
  columns.forEach((column, columnIndex) => {
    const cardsForColumn = distribution[columnIndex];
    for (let i = 0; i < cardsForColumn; i++) {
      const card = generateCard();
      card.columnId = column.id;
      cards.push(card);
      
      if (Math.random() < 0.3) {
        parentCards.push(card);
      }
    }
  });
  
  parentCards.forEach(parentCard => {
    if (Math.random() < 0.5 && parentCard.subtasks) {
      const subtasksCount = Math.min(parentCard.subtasks.total, randomInt(1, 4));
      const subtaskIds = [];
      
      for (let i = 0; i < subtasksCount; i++) {
        const subtaskCard = generateCard(parentCard.id);
        const randomColumn = columns[randomInt(0, columns.length - 1)];
        subtaskCard.columnId = randomColumn.id;
        
        if (parentCard.subtasks.items && parentCard.subtasks.items[i]) {
          subtaskCard.title = parentCard.subtasks.items[i].text;
          subtaskCard.subtasks = null;
        }
        
        cards.push(subtaskCard);
        subtaskIds.push(subtaskCard.id);
      }
      
      parentCard.subtaskIds = subtaskIds;
      parentCard.subtasks.total = subtasksCount;
      parentCard.subtasks.items = subtaskIds.map((id) => {
        const subtaskCard = cards.find(c => c.id === id);
        const completed = Math.random() < 0.5;
        return {
          id: id,
          text: subtaskCard.title,
          completed: completed
        };
      });
      parentCard.subtasks.completed = parentCard.subtasks.items.filter(item => item.completed).length;
    }
  });
  
  return {
    columns,
    cards
  };
}

