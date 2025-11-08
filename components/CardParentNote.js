const parentNotePlusSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Property 1=Medium"><path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M10 4C10.5523 4 11 4.44772 11 5V9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H11V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V11H5C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H9V5C9 4.44772 9.44772 4 10 4Z" fill="currentColor"/></g></svg>';

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
  
  const plus = document.createElement('div');
  plus.className = 'card-parent-note-plus';
  plus.innerHTML = parentNotePlusSvg;
  note.appendChild(plus);
  
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

