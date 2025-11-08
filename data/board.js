import { columnsConfig } from './columns.js';
import { cardsData } from './cards.js';

export const boardConfig = {
  columns: columnsConfig,
  cards: cardsData.map((card, index) => {
    let columnId = 'doing';
    if (index === 0) columnId = 'todo';
    else if (index === 1) columnId = 'doing';
    else if (index === 2) columnId = 'done';
    
    return {
      ...card,
      columnId
    };
  })
};

