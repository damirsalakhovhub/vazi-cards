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
  wrapper.className = 'list-view-table-wrapper';
  
  const grouped = groupCardsByColumn(boardData.cards, boardData.columns);
  
  const table = document.createElement('table');
  table.className = 'list-view-table';
  
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.className = 'list-view-header-row';
  
  const headers = [
    { text: '', className: 'list-view-header-checkbox' },
    { text: 'Task ID', className: 'list-view-header-id' },
    { text: 'Task Title', className: 'list-view-header-title' },
    { text: 'Assignee', className: 'list-view-header-assignee' },
    { text: 'Due date', className: 'list-view-header-date' },
    { text: 'Priority', className: 'list-view-header-priority' },
    { text: 'Types', className: 'list-view-header-types' },
    { text: 'Milestone', className: 'list-view-header-milestone' }
  ];
  
  headers.forEach(header => {
    const th = document.createElement('th');
    th.className = header.className;
    th.textContent = header.text;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  tbody.className = 'list-view-body';
  
  Object.values(grouped).forEach(group => {
    if (group.cards.length === 0) return;
    
    const groupRow = document.createElement('tr');
    groupRow.className = 'list-view-group-row';
    groupRow.setAttribute('data-column-id', group.column.id);
    
    const groupCell = document.createElement('td');
    groupCell.className = 'list-view-group-cell';
    groupCell.colSpan = headers.length;
    
    const groupHeader = document.createElement('div');
    groupHeader.className = 'list-view-group-header';
    
    const groupTitle = document.createElement('span');
    groupTitle.className = 'list-view-group-title';
    groupTitle.textContent = group.column.name;
    
    const groupToggle = document.createElement('button');
    groupToggle.className = 'list-view-group-toggle';
    groupToggle.type = 'button';
    groupToggle.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    groupHeader.appendChild(groupToggle);
    groupHeader.appendChild(groupTitle);
    
    groupCell.appendChild(groupHeader);
    groupRow.appendChild(groupCell);
    tbody.appendChild(groupRow);
    
    const tasksContainer = document.createElement('tr');
    tasksContainer.className = 'list-view-tasks-container';
    tasksContainer.setAttribute('data-column-id', group.column.id);
    
    const tasksCell = document.createElement('td');
    tasksCell.className = 'list-view-tasks-cell';
    tasksCell.colSpan = headers.length;
    
    const tasksTable = document.createElement('table');
    tasksTable.className = 'list-view-tasks-table';
    
    const tasksTbody = document.createElement('tbody');
    
    group.cards.forEach(card => {
      const row = document.createElement('tr');
      row.className = 'list-view-task-row';
      row.setAttribute('data-card-id', card.id);
      
      const checkboxCell = document.createElement('td');
      checkboxCell.className = 'list-view-cell list-view-cell-checkbox';
      
      const idCell = document.createElement('td');
      idCell.className = 'list-view-cell list-view-cell-id';
      idCell.textContent = card.id;
      
      const titleCell = document.createElement('td');
      titleCell.className = 'list-view-cell list-view-cell-title';
      titleCell.textContent = card.title || '';
      
      const assigneeCell = document.createElement('td');
      assigneeCell.className = 'list-view-cell list-view-cell-assignee';
      
      const dateCell = document.createElement('td');
      dateCell.className = 'list-view-cell list-view-cell-date';
      
      const priorityCell = document.createElement('td');
      priorityCell.className = 'list-view-cell list-view-cell-priority';
      
      const typesCell = document.createElement('td');
      typesCell.className = 'list-view-cell list-view-cell-types';
      
      const milestoneCell = document.createElement('td');
      milestoneCell.className = 'list-view-cell list-view-cell-milestone';
      milestoneCell.textContent = card.release || '';
      
      row.appendChild(checkboxCell);
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(assigneeCell);
      row.appendChild(dateCell);
      row.appendChild(priorityCell);
      row.appendChild(typesCell);
      row.appendChild(milestoneCell);
      
      tasksTbody.appendChild(row);
    });
    
    tasksTable.appendChild(tasksTbody);
    tasksCell.appendChild(tasksTable);
    tasksContainer.appendChild(tasksCell);
    tbody.appendChild(tasksContainer);
  });
  
  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
  
  return container;
}

