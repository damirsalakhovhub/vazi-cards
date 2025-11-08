const titleTemplates = [
  'Implement user authentication system',
  'Add new feature for task management',
  'Fix bug in data synchronization',
  'Create responsive design layout',
  'Optimize database queries performance',
  'Update API endpoints documentation',
  'Refactor legacy code components',
  'Add unit tests for core functionality',
  'Improve error handling mechanism',
  'Design new user interface components',
  'Integrate third-party payment service',
  'Enhance search functionality',
  'Update security protocols',
  'Create admin dashboard',
  'Implement real-time notifications'
];

const labelTypes = ['priority-high', 'priority-low', 'magenta', 'olive', 'mint', 'lavender', 'tangerine'];
const labelIcons = ['arrow-up', 'arrow-down', 'compress', 'smile', 'screen', 'human', 'send'];
const labelTexts = ['Sales', 'Feature', 'UI', 'Block', 'Bug', 'Enhancement', 'Documentation'];

const milestoneTemplates = [
  'Release #86',
  'Release #87',
  'Epic: Redesign Settings',
  'Epic: User Management',
  'Epic: Performance Optimization',
  'Sprint 12',
  'Sprint 13'
];

const subtaskTemplates = [
  'Review code changes',
  'Write unit tests',
  'Update documentation',
  'Fix linting errors',
  'Add error handling',
  'Optimize performance',
  'Update dependencies',
  'Create migration script',
  'Test integration',
  'Deploy to staging'
];

const assigneeTypes = ['avatar-vaiz', 'blacky', 'jessica', 'james'];
const assigneeNames = ['Alex', 'Sam', 'Jessica', 'James', 'Mike', 'Sarah', 'Tom', 'Emma'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomItems(array, min, max) {
  const count = randomInt(min, max);
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateId() {
  const prefixes = ['DSGN', 'APP', 'MRKT', 'DEV', 'QA', 'UI', 'API', 'DB'];
  const numbers = randomInt(1000, 9999);
  return `${randomItem(prefixes)}-${numbers}`;
}

function generateTitle() {
  const base = randomItem(titleTemplates);
  const length = randomInt(10, 100);
  if (base.length >= length) {
    return base.substring(0, length);
  }
  const additions = [
    ' with advanced features',
    ' for better user experience',
    ' to improve performance',
    ' using modern technologies',
    ' with comprehensive testing',
    ' following best practices',
    ' with proper error handling'
  ];
  let result = base;
  while (result.length < length && additions.length > 0) {
    const addition = randomItem(additions);
    if (result.length + addition.length <= length) {
      result += addition;
    } else {
      break;
    }
  }
  return result.substring(0, length);
}

function generateAssignees() {
  const random = Math.random();
  let count;
  
  if (random < 0.3) {
    count = 0; // 30% chance of no assignees
  } else if (random < 0.6) {
    count = 1; // 30% chance of one assignee
  } else if (random < 0.8) {
    count = 2; // 20% chance of two assignees
  } else if (random < 0.87) {
    count = 3; // 7% chance of three assignees
  } else {
    count = 4; // 3% chance of four assignees
  }
  
  if (count === 0) return [];
  
  const assignees = [];
  const usedTypes = new Set();
  
  for (let i = 0; i < count; i++) {
    let type;
    do {
      type = randomItem(assigneeTypes);
    } while (usedTypes.has(type) && usedTypes.size < assigneeTypes.length);
    usedTypes.add(type);
    
    const name = randomItem(assigneeNames);
    const initials = name.substring(0, 2).toUpperCase();
    const photo = `https://i.pravatar.cc/40?img=${randomInt(1, 70)}`;
    
    assignees.push({ type, name, initials, photo });
  }
  
  return assignees;
}

function generateLabels() {
  if (Math.random() > 0.5) return [];
  
  const count = randomInt(1, 4);
  const labels = [];
  const usedTypes = new Set();
  
  for (let i = 0; i < count; i++) {
    let type;
    do {
      type = randomItem(labelTypes);
    } while (usedTypes.has(type) && usedTypes.size < labelTypes.length);
    usedTypes.add(type);
    
    const label = { type };
    
    if (type === 'priority-high' || type === 'priority-low') {
      label.icon = type === 'priority-high' ? 'arrow-up' : 'arrow-down';
    } else {
      const hasText = Math.random() > 0.3;
      const hasIcon = Math.random() > 0.3;
      
      if (hasText) {
        label.text = randomItem(labelTexts);
      }
      if (hasIcon) {
        label.icon = randomItem(labelIcons);
      }
      
      if (!hasText && !hasIcon) {
        label.text = randomItem(labelTexts);
      }
    }
    
    labels.push(label);
  }
  
  return labels;
}

function generateDate(rangeType = null) {
  // If rangeType is specified, always generate date. Otherwise random chance
  if (!rangeType && Math.random() > 0.4) return null;
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  
  const overdue = Math.random() < 0.2;
  
  // If rangeType is specified, generate that specific type
  if (rangeType === 'same-month-year') {
    // Same month and year: "10 → 16 Jan 2025"
    const startDay = randomInt(1, 15);
    const endDay = randomInt(startDay + 1, 28);
    const monthIndex = randomInt(0, 11);
    const year = randomInt(2024, 2025);
    
    return {
      type: 'range',
      start: {
        day: startDay,
        month: months[monthIndex],
        year: year
      },
      end: {
        day: endDay,
        month: months[monthIndex],
        year: year
      },
      overdue
    };
  } else if (rangeType === 'different-month') {
    // Different month, same year: "10 Jan → 16 Feb 2025"
    const startDay = randomInt(1, 20);
    const startMonthIndex = randomInt(0, 10);
    const year = randomInt(2024, 2025);
    
    const endMonthIndex = startMonthIndex + 1;
    const endDay = randomInt(1, 28);
    
    return {
      type: 'range',
      start: {
        day: startDay,
        month: months[startMonthIndex],
        year: year
      },
      end: {
        day: endDay,
        month: months[endMonthIndex],
        year: year
      },
      overdue
    };
  } else if (rangeType === 'different-year') {
    // Different year: "10 Dec 2025 → 05 Jan 2026"
    const startDay = randomInt(10, 28);
    const startMonthIndex = 11; // December
    const startYear = 2025;
    
    const endDay = randomInt(1, 10);
    const endMonthIndex = 0; // January
    const endYear = 2026;
    
    return {
      type: 'range',
      start: {
        day: startDay,
        month: months[startMonthIndex],
        year: startYear
      },
      end: {
        day: endDay,
        month: months[endMonthIndex],
        year: endYear
      },
      overdue
    };
  } else {
    // Single end date
    const day = randomInt(1, 28);
    const month = randomItem(months);
    const year = randomInt(2024, 2025);
    
    return {
      type: 'end',
      value: `${day} ${month} ${year}`,
      overdue
    };
  }
}

function generateRelease() {
  if (Math.random() > 0.5) return null;
  return randomItem(milestoneTemplates);
}

export function generateSubtasks() {
  if (Math.random() > 0.3) return null;
  
  const count = randomInt(1, 20);
  const items = [];
  
  for (let i = 0; i < count; i++) {
    const text = randomItem(subtaskTemplates) + (i > 0 ? ` ${i + 1}` : '');
    const completed = Math.random() > 0.5;
    items.push({ text, completed });
  }
  
  const completed = items.filter(item => item.completed).length;
  
  return {
    total: count,
    completed,
    items
  };
}

function generateParentNote() {
  if (Math.random() > 0.6) return null;
  
  const notes = [
    'Time zone. It can cause issues if you set different time zones on two devices while using the same account.',
    'Board. Tasks are duplicated on the board',
    'Editor. Comments are not syncing properly',
    'Settings. User preferences are not saved',
    'Notifications. Some alerts are missing'
  ];
  
  const icons = ['leaf', null];
  const icon = Math.random() > 0.5 ? randomItem(icons) : null;
  
  return {
    text: randomItem(notes),
    icon
  };
}

export function generateCard(parentId = null, dateRangeType = null) {
  return {
    id: generateId(),
    release: generateRelease(),
    title: generateTitle(),
    assignees: generateAssignees(),
    labels: generateLabels(),
    date: generateDate(dateRangeType),
    subtasks: generateSubtasks(),
    parentNote: null,
    parentId: parentId || null,
    subtaskIds: []
  };
}

