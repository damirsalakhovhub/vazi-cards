export function createSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  
  const content = document.createElement('div');
  content.className = 'sidebar-content';
  
  const placeholder = document.createElement('div');
  placeholder.className = 'sidebar-placeholder';
  placeholder.textContent = 'Sidebar placeholder';
  
  content.appendChild(placeholder);
  sidebar.appendChild(content);
  
  return sidebar;
}

