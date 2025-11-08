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
  
  return note;
}

