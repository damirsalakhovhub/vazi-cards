const noAssigneeIconSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_22837_111563)"><circle cx="10" cy="10" r="10" fill="#E2E5E8"/><g opacity="0.7"><path d="M10.0006 14C12.839 14.0001 14.7108 14.6449 15.7985 15.2021C16.5686 15.5969 16.9265 16.43 16.8463 17.2842C15.0569 18.9667 12.6497 20 9.99965 20C7.35008 19.9999 4.94322 18.9672 3.15394 17.2852C3.07337 16.4307 3.43147 15.5971 4.20179 15.2021C5.28954 14.6448 7.16207 14 10.0006 14Z" fill="#B6BEC9"/><path d="M10.0006 5.5C11.9332 5.50027 13.5003 7.06745 13.5006 9C13.5006 10.9328 11.9334 12.4997 10.0006 12.5C8.06763 12.5 6.50062 10.933 6.50062 9C6.50096 7.06729 8.06783 5.5 10.0006 5.5Z" fill="#B6BEC9"/></g></g><defs><clipPath id="clip0_22837_111563"><rect width="20" height="20" rx="10" fill="white"/></clipPath></defs></svg>';

export function createCardAvatars(assignees) {
  const container = document.createElement('div');
  container.className = 'card-avatars';
  
  if (!assignees || assignees.length === 0) {
    const noAssigneeIcon = document.createElement('div');
    noAssigneeIcon.className = 'card-avatar-no-assignee';
    noAssigneeIcon.innerHTML = noAssigneeIconSvg;
    container.appendChild(noAssigneeIcon);
    return container;
  }
  
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

