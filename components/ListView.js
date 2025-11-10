import { createCardAvatars } from './CardAvatars.js';
import { createCardDate } from './CardDate.js';
import { createCardLabels } from './CardLabels.js';

const checkboxCheckedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5677 6.64017L9.56771 14.6402C9.19673 15.0853 8.50214 15.1168 8.09238 14.7071L4.09238 10.7071C3.18043 9.79514 4.59464 8.38093 5.50659 9.29288L8.73229 12.5186L15.0313 5.3598C15.8569 4.36903 17.3933 5.6494 16.5677 6.64017Z" fill="#ffffff"/></svg>';

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
  
  const grouped = groupCardsByColumn(boardData.cards, boardData.columns);
  
  const header = document.createElement('div');
  header.className = 'list-view-header';
  
  const headerTask = document.createElement('div');
  headerTask.className = 'list-view-header-cell list-view-header-task';
  headerTask.textContent = 'Groups and Tasks';
  
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
  
  container.appendChild(header);
  
  const body = document.createElement('div');
  body.className = 'list-view-body';
  
  Object.values(grouped).forEach(group => {
    if (group.cards.length === 0) return;
    
    const groupSection = document.createElement('div');
    groupSection.className = 'list-view-group';
    groupSection.setAttribute('data-column-id', group.column.id);
    
    const groupHeader = document.createElement('div');
    groupHeader.className = 'list-view-group-header';
    
    const groupTitle = document.createElement('span');
    groupTitle.className = 'list-view-group-title';
    groupTitle.textContent = group.column.name;
    
    const groupToggle = document.createElement('button');
    groupToggle.className = 'list-view-group-toggle';
    groupToggle.type = 'button';
    groupToggle.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    groupHeader.appendChild(groupTitle);
    groupHeader.appendChild(groupToggle);
    groupSection.appendChild(groupHeader);
    
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'list-view-tasks-container';
    tasksContainer.setAttribute('data-column-id', group.column.id);
    
    groupHeader.addEventListener('click', () => {
      const isHidden = tasksContainer.style.display === 'none';
      tasksContainer.style.display = isHidden ? '' : 'none';
      groupToggle.classList.toggle('list-view-group-toggle-collapsed', !isHidden);
    });
    
    group.cards.forEach(card => {
      const row = document.createElement('div');
      row.className = 'list-view-task-row';
      row.setAttribute('data-card-id', card.id);
      
      const taskCell = document.createElement('div');
      taskCell.className = 'list-view-cell list-view-cell-task';
      
      const checkboxWrapper = document.createElement('label');
      checkboxWrapper.className = 'checkbox-wrapper';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      
      const checkboxIcon = document.createElement('span');
      checkboxIcon.className = 'checkbox-icon';
      checkboxIcon.innerHTML = checkboxCheckedSvg;
      
      const id = document.createElement('span');
      id.className = 'checkbox-label';
      id.textContent = card.id;
      
      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(checkboxIcon);
      checkboxWrapper.appendChild(id);
      
      const taskContent = document.createElement('div');
      taskContent.className = 'list-view-task-content';
      
      const title = document.createElement('span');
      title.className = 'list-view-task-title';
      title.textContent = card.title || '';
      
      taskContent.appendChild(title);
      taskCell.appendChild(checkboxWrapper);
      taskCell.appendChild(taskContent);
      
      const assigneeCell = document.createElement('div');
      assigneeCell.className = 'list-view-cell list-view-cell-assignee';
      
      const avatars = createCardAvatars(card.assignees);
      assigneeCell.appendChild(avatars);
      
      const dateCell = document.createElement('div');
      dateCell.className = 'list-view-cell list-view-cell-date';
      
      if (card.date) {
        const dateElement = createCardDate(card.date);
        if (dateElement) {
          dateCell.appendChild(dateElement);
        }
      }
      
      const priorityCell = document.createElement('div');
      priorityCell.className = 'list-view-cell list-view-cell-priority';
      
      if (card.labels && card.labels.length > 0) {
        const priorityLabels = card.labels.filter(label => label.type === 'priority-high' || label.type === 'priority-low');
        if (priorityLabels.length > 0) {
          const priorityLabelsElement = createCardLabels(priorityLabels);
          if (priorityLabelsElement) {
            priorityCell.appendChild(priorityLabelsElement);
          }
        }
      }
      
      const typesCell = document.createElement('div');
      typesCell.className = 'list-view-cell list-view-cell-types';
      
      if (card.labels && card.labels.length > 0) {
        const typeLabels = card.labels.filter(label => label.type !== 'priority-high' && label.type !== 'priority-low');
        if (typeLabels.length > 0) {
          const typeLabelsElement = createCardLabels(typeLabels);
          if (typeLabelsElement) {
            typesCell.appendChild(typeLabelsElement);
          }
        }
      }
      
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
  
  const wrapper = document.createElement('div');
  wrapper.className = 'list-view-wrapper';
  wrapper.appendChild(body);
  container.appendChild(wrapper);
  
  return container;
}

