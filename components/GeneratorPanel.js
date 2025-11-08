export function createGeneratorPanel(onGenerate) {
  const panel = document.createElement('div');
  panel.className = 'generator-panel';
  
  const toggleButton = document.createElement('button');
  toggleButton.className = 'generator-toggle';
  toggleButton.textContent = '⚙️';
  toggleButton.type = 'button';
  
  const form = document.createElement('div');
  form.className = 'generator-form';
  form.style.display = 'none';
  
  const columnsLabel = document.createElement('label');
  columnsLabel.textContent = 'Columns:';
  const columnsInput = document.createElement('input');
  columnsInput.type = 'number';
  columnsInput.min = '1';
  columnsInput.max = '10';
  columnsInput.value = '3';
  columnsInput.className = 'generator-input';
  
  const totalCardsLabel = document.createElement('label');
  totalCardsLabel.textContent = 'Total Cards:';
  const totalCardsInput = document.createElement('input');
  totalCardsInput.type = 'number';
  totalCardsInput.min = '1';
  totalCardsInput.max = '100';
  totalCardsInput.value = '15';
  totalCardsInput.className = 'generator-input';
  
  const generateButton = document.createElement('button');
  generateButton.className = 'generator-button';
  generateButton.textContent = 'Generate Board';
  generateButton.type = 'button';
  
  let isOpen = false;
  
  toggleButton.addEventListener('click', () => {
    isOpen = !isOpen;
    form.style.display = isOpen ? 'flex' : 'none';
    toggleButton.textContent = isOpen ? '✕' : '⚙️';
  });
  
  generateButton.addEventListener('click', () => {
    const config = {
      columnsCount: parseInt(columnsInput.value, 10),
      totalCards: parseInt(totalCardsInput.value, 10)
    };
    onGenerate(config);
  });
  
  columnsLabel.appendChild(columnsInput);
  totalCardsLabel.appendChild(totalCardsInput);
  
  form.appendChild(columnsLabel);
  form.appendChild(totalCardsLabel);
  form.appendChild(generateButton);
  
  panel.appendChild(toggleButton);
  panel.appendChild(form);
  
  return panel;
}

