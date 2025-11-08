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
  
  const allCards = [];
  
  // Prepare date range types: one different-year, rest split between same-month-year and different-month
  // We need at least 3 cards with dates, but will use more if available
  const dateRangeTypes = ['different-year'];
  
  // Estimate how many cards will have dates (60% chance)
  const estimatedCardsWithDates = Math.max(3, Math.floor(totalCards * 0.6));
  const remainingWithDates = estimatedCardsWithDates - 1;
  const sameMonthCount = Math.floor(remainingWithDates / 2);
  const differentMonthCount = remainingWithDates - sameMonthCount;
  
  for (let i = 0; i < sameMonthCount; i++) {
    dateRangeTypes.push('same-month-year');
  }
  for (let i = 0; i < differentMonthCount; i++) {
    dateRangeTypes.push('different-month');
  }
  
  // Shuffle range types
  dateRangeTypes.sort(() => Math.random() - 0.5);
  
  let dateTypeIndex = 0;
  
  for (let i = 0; i < totalCards; i++) {
    // Assign date range type if available, otherwise null (will use random generation)
    const dateRangeType = dateTypeIndex < dateRangeTypes.length ? dateRangeTypes[dateTypeIndex++] : null;
    const card = generateCard(null, dateRangeType);
    card.subtasks = null;
    allCards.push(card);
  }
  
  const distribution = distributeCards(totalCards, columns.length);
  
  let cardIndex = 0;
  columns.forEach((column, columnIndex) => {
    const cardsForColumn = distribution[columnIndex];
    for (let i = 0; i < cardsForColumn; i++) {
      if (cardIndex < allCards.length) {
        allCards[cardIndex].columnId = column.id;
        cardIndex++;
      }
    }
  });
  
  const parentCardsCount = Math.max(1, Math.min(Math.floor(totalCards * 0.15), Math.floor(totalCards / 6)));
  const parentCards = [];
  const usedAsSubtasks = new Set();
  
  for (let i = 0; i < parentCardsCount; i++) {
    const randomIndex = randomInt(0, allCards.length - 1);
    const parentCard = allCards[randomIndex];
    
    if (!usedAsSubtasks.has(parentCard.id) && !parentCard.parentId) {
      const subtasksCount = randomInt(2, 4);
      const availableCards = allCards.filter(card => 
        card.id !== parentCard.id && 
        !usedAsSubtasks.has(card.id) && 
        !card.parentId
      );
      
      if (availableCards.length >= subtasksCount) {
        const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
        const selectedSubtasks = shuffled.slice(0, subtasksCount);
        const subtaskIds = [];
        
        selectedSubtasks.forEach(subtaskCard => {
          usedAsSubtasks.add(subtaskCard.id);
          subtaskCard.parentId = parentCard.id;
          subtaskCard.parentNote = {
            text: parentCard.title,
            parentId: parentCard.id
          };
          subtaskIds.push(subtaskCard.id);
        });
        
        parentCard.subtaskIds = subtaskIds;
        parentCard.subtasks = {
          total: subtasksCount,
          completed: 0,
          items: subtaskIds.map((id) => {
            const subtaskCard = allCards.find(c => c.id === id);
            const completed = Math.random() < 0.5;
            return {
              id: id,
              text: subtaskCard.title,
              completed: completed
            };
          })
        };
        parentCard.subtasks.completed = parentCard.subtasks.items.filter(item => item.completed).length;
        parentCards.push(parentCard);
      }
    }
  }
  
  return {
    columns,
    cards: allCards
  };
}

