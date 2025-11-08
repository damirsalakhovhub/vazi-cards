export const cardsData = [
  {
    id: 'DSGN',
    release: 'Release #86',
    title: 'Add the ability to create invite links to invite users to the space.',
    assignees: [{ 
      type: 'avatar-vaiz', 
      name: 'Alex',
      initials: 'AL',
      photo: 'https://i.pravatar.cc/40?img=1'
    }],
    labels: [
      { type: 'magenta', text: 'Sales', icon: 'human' }
    ],
    subtasks: {
      total: 3,
      completed: 2,
      items: [
        { text: 'Implement a new user authentication system that supports multi-factor authentication and integrates with existing databases. Ensure that the user experience remains seamless and intuitive.', completed: false },
        { text: 'HRID has been added to the event text for all events related to tasks.', completed: true },
        { text: 'Create a comprehensive testing suite for the new payment processing feature, including unit tests, integration tests, and end-to-end tests. Document the testing process and results.', completed: false }
      ]
    },
    parentNote: null
  },
  {
    id: 'APP-1331',
    release: null,
    title: 'When copying a drawing from the very beginning of the document/task, a blank widget appears after pasting.',
    assignees: [{ 
      type: 'blacky',
      name: 'Sam',
      initials: 'SM',
      photo: 'https://i.pravatar.cc/40?img=12'
    }],
    labels: [
      { type: 'priority-high', icon: 'arrow-up' },
      { type: 'olive', text: 'Sales', icon: 'compress' },
      { type: 'mint', text: 'Feature', icon: 'smile' },
      { type: 'lavender', text: 'UI', icon: 'screen' }
    ],
    date: { type: 'end', value: '30 Sept 2025' },
    subtasks: {
      total: 3,
      completed: 2,
      items: [
        { text: 'Task 1', completed: true },
        { text: 'Task 2', completed: true },
        { text: 'Task 3', completed: false }
      ]
    },
    parentNote: {
      text: 'Time zone. It can cause issues if you set different time zones on two devices while using the same account.'
    }
  },
  {
    id: 'MRKT-1331',
    release: 'Epic: Redesign Settings',
    title: 'Display of removed users in the Editor Comments Notifications center Deleted member.',
    assignees: [
      { 
        type: 'jessica',
        name: 'Jessica',
        initials: 'JS',
        photo: 'https://i.pravatar.cc/40?img=47'
      },
      { 
        type: 'james',
        name: 'James',
        initials: 'JM',
        photo: 'https://i.pravatar.cc/40?img=33'
      }
    ],
    labels: [
      { type: 'priority-low', icon: 'arrow-down' },
      { type: 'tangerine', text: 'Block', icon: 'send' }
    ],
    date: { type: 'end', value: '05 Sept 2024', overdue: true },
    subtasks: {
      total: 0,
      completed: 0,
      items: []
    },
    parentNote: {
      text: 'Board. Tasks are duplicated on the board',
      icon: 'leaf'
    }
  }
];

export const columnData = {
  title: 'Doing',
  showed: 3,
  total: 14
};

