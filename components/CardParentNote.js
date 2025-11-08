export function createCardParentNote(noteData) {
  if (!noteData) {
    return null;
  }
  
  const note = document.createElement('div');
  note.className = 'card-parent-note';
  
  const text = document.createElement('span');
  text.className = 'card-parent-note-text';
  text.textContent = noteData.text;
  
  note.appendChild(text);
  
  if (noteData.icon) {
    const icon = document.createElement('span');
    icon.className = `card-parent-note-icon card-parent-note-icon-${noteData.icon}`;
    note.appendChild(icon);
  }
  
  
  const tooltip = document.createElement('div');
  tooltip.className = 'card-parent-note-tooltip';
  tooltip.textContent = 'Parent';
  document.body.appendChild(tooltip);
  
  let tooltipTimeout;
  
  const updateTooltipPosition = () => {
    const rect = note.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 4}px`;
    tooltip.style.transform = 'translate(-50%, -100%)';
  };
  
  note.addEventListener('mouseenter', () => {
    tooltipTimeout = setTimeout(() => {
      updateTooltipPosition();
      tooltip.classList.add('card-parent-note-tooltip-visible');
    }, 400);
  });
  
  note.addEventListener('mouseleave', () => {
    clearTimeout(tooltipTimeout);
    tooltip.classList.remove('card-parent-note-tooltip-visible');
  });
  
  note.addEventListener('mousemove', () => {
    if (tooltip.classList.contains('card-parent-note-tooltip-visible')) {
      updateTooltipPosition();
    }
  });
  
  return note;
}

