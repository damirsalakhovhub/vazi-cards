export function createCardAvatars(assignees) {
  if (!assignees || assignees.length === 0) {
    return null;
  }
  
  const container = document.createElement('div');
  container.className = 'card-avatars';
  
  assignees.forEach((assignee, index) => {
    const avatar = document.createElement('div');
    avatar.className = `card-avatar card-avatar-${assignee.type}`;
    avatar.setAttribute('data-type', assignee.type);
    
    if (assignee.photo) {
      const img = document.createElement('img');
      img.src = assignee.photo;
      img.alt = assignee.name || '';
      avatar.appendChild(img);
    } else {
      const initials = assignee.initials || assignee.name?.substring(0, 2).toUpperCase() || assignee.type.substring(0, 2).toUpperCase();
      avatar.textContent = initials;
    }
    
    if (index > 0) {
      avatar.style.marginLeft = '-11px';
    }
    
    container.appendChild(avatar);
  });
  
  return container;
}

