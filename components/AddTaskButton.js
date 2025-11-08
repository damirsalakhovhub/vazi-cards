export function createAddTaskButton() {
  const button = document.createElement('button');
  button.className = 'add-task-button';
  
  const icon = document.createElement('span');
  icon.className = 'add-task-icon';
  icon.textContent = '+';
  
  const text = document.createElement('span');
  text.className = 'add-task-text';
  text.textContent = 'Add task...';
  
  button.appendChild(icon);
  button.appendChild(text);
  
  return button;
}

