function groupCardsByColumn(cards, columns) {
  const grouped = {};
  
  columns.forEach(column => {
    grouped[column.id] = {
      column: column,
      cards: cards.filter(card => card.columnId === column.id)
    };
  });
  
  return grouped;
}

export function createListView(boardData) {
  const container = document.createElement('div');
  container.className = 'list-view';
  
  const wrapper = document.createElement('div');
  wrapper.className = 'list-view-wrapper';
  
  const grouped = groupCardsByColumn(boardData.cards, boardData.columns);
  
  const header = document.createElement('div');
  header.className = 'list-view-header';
  
  const headerTask = document.createElement('div');
  headerTask.className = 'list-view-header-cell list-view-header-task';
  headerTask.textContent = 'Task';
  
  const headerAssignee = document.createElement('div');
  headerAssignee.className = 'list-view-header-cell list-view-header-assignee';
  headerAssignee.textContent = 'Assignee';
  
  const headerDate = document.createElement('div');
  headerDate.className = 'list-view-header-cell list-view-header-date';
  headerDate.textContent = 'Due date';
  
  const headerPriority = document.createElement('div');
  headerPriority.className = 'list-view-header-cell list-view-header-priority';
  headerPriority.textContent = 'Priority';
  
  const headerTypes = document.createElement('div');
  headerTypes.className = 'list-view-header-cell list-view-header-types';
  headerTypes.textContent = 'Types';
  
  const headerMilestone = document.createElement('div');
  headerMilestone.className = 'list-view-header-cell list-view-header-milestone';
  headerMilestone.textContent = 'Milestone';
  
  header.appendChild(headerTask);
  header.appendChild(headerAssignee);
  header.appendChild(headerDate);
  header.appendChild(headerPriority);
  header.appendChild(headerTypes);
  header.appendChild(headerMilestone);
  
  wrapper.appendChild(header);
  
  const body = document.createElement('div');
  body.className = 'list-view-body';
  
  Object.values(grouped).forEach(group => {
    if (group.cards.length === 0) return;
    
    const groupSection = document.createElement('div');
    groupSection.className = 'list-view-group';
    groupSection.setAttribute('data-column-id', group.column.id);
    
    const groupHeader = document.createElement('div');
    groupHeader.className = 'list-view-group-header';
    
    const groupToggle = document.createElement('button');
    groupToggle.className = 'list-view-group-toggle';
    groupToggle.type = 'button';
    groupToggle.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    const groupTitle = document.createElement('span');
    groupTitle.className = 'list-view-group-title';
    groupTitle.textContent = group.column.name;
    
    groupHeader.appendChild(groupToggle);
    groupHeader.appendChild(groupTitle);
    groupSection.appendChild(groupHeader);
    
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'list-view-tasks-container';
    tasksContainer.setAttribute('data-column-id', group.column.id);
    
    group.cards.forEach(card => {
      const row = document.createElement('div');
      row.className = 'list-view-task-row';
      row.setAttribute('data-card-id', card.id);
      
      const taskCell = document.createElement('div');
      taskCell.className = 'list-view-cell list-view-cell-task';
      
      const checkbox = document.createElement('div');
      checkbox.className = 'list-view-checkbox';
      
      const taskContent = document.createElement('div');
      taskContent.className = 'list-view-task-content';
      
      const id = document.createElement('span');
      id.className = 'list-view-task-id';
      id.textContent = card.id;
      
      const title = document.createElement('span');
      title.className = 'list-view-task-title';
      title.textContent = card.title || '';
      
      taskContent.appendChild(id);
      taskContent.appendChild(title);
      taskCell.appendChild(checkbox);
      taskCell.appendChild(taskContent);
      
      const assigneeCell = document.createElement('div');
      assigneeCell.className = 'list-view-cell list-view-cell-assignee';
      
      const dateCell = document.createElement('div');
      dateCell.className = 'list-view-cell list-view-cell-date';
      
      const priorityCell = document.createElement('div');
      priorityCell.className = 'list-view-cell list-view-cell-priority';
      
      const typesCell = document.createElement('div');
      typesCell.className = 'list-view-cell list-view-cell-types';
      
      const milestoneCell = document.createElement('div');
      milestoneCell.className = 'list-view-cell list-view-cell-milestone';
      milestoneCell.textContent = card.release || '';
      
      row.appendChild(taskCell);
      row.appendChild(assigneeCell);
      row.appendChild(dateCell);
      row.appendChild(priorityCell);
      row.appendChild(typesCell);
      row.appendChild(milestoneCell);
      
      tasksContainer.appendChild(row);
    });
    
    groupSection.appendChild(tasksContainer);
    body.appendChild(groupSection);
  });
  
  wrapper.appendChild(body);
  container.appendChild(wrapper);
  
  return container;
}

