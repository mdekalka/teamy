const taskList = [
  {
    id: 1,
    name: 'Array.prototype.find',
    description: 'The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned',
    priority: 'minor',
    type: 'bug',
    status: 'To Do',
    sprint: '',
    labels: ['JS documentation', 'MDN'],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 4,
      logged: 0
    },
    comments: [],
    history: []
  },
  {
    id: 2,
    name: 'Array.prototype.map',
    description: 'The map() method creates a new array with the results of calling a provided function on every element in the calling array',
    priority: 'major',
    type: 'story',
    status: 'In Progress',
    sprint: '',
    labels: ['JS documentation', 'MDN'],
    environment: '',
    assignee: 1,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 6,
      logged: 3
    },
    comments: [],
    history: []
  },
  {
    id: 3,
    name: 'Array.prototype.filter',
    description: 'The filter() method creates a new array with all elements that pass the test implemented by the provided function',
    priority: 'blocker',
    type: 'epic',
    status: 'QA',
    sprint: '',
    labels: ['JS documentation', 'MDN'],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 6,
      logged: 2
    },
    comments: [],
    history: []
  },
  {
    id: 4,
    name: 'Array.prototype.reduce',
    description: 'The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value',
    priority: 'medium',
    type: 'story',
    status: 'In Progress',
    sprint: '',
    labels: ['JS documentation', 'MDN'],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 6,
      logged: 4
    },
    comments: [],
    history: []
  },
  {
    id: 5,
    name: 'Array.prototype.every',
    description: 'The every() method tests whether all elements in the array pass the test implemented by the provided function',
    priority: 'minor',
    type: 'bug',
    status: 'Done',
    sprint: '',
    labels: [],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 8,
      logged: 2
    },
    comments: [],
    history: []
  },
  {
    id: 6,
    name: 'Array.prototype.some',
    description: 'The some() method tests whether at-least one element in the array passes the test implemented by the provided function',
    priority: 'blocker',
    type: 'story',
    status: 'In Progress',
    sprint: '',
    labels: [],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 4,
      logged: 1
    },
    comments: [],
    history: []
  },
  {
    id: 7,
    name: 'Array.prototype.sort',
    description: 'The sort() method sorts the elements of an array in place and returns the array',
    priority: 'minor',
    type: 'epic',
    status: 'QA',
    sprint: '',
    labels: [],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 45,
      logged: 12
    },
    comments: [],
    history: []
  },
  {
    id: 8,
    name: 'Array.prototype.forEach',
    description: 'The forEach() method executes a provided function once for each array element',
    priority: 'major',
    type: 'epic',
    status: 'Done',
    sprint: '',
    labels: [],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 34,
      logged: 11
    },
    comments: [],
    history: []
  },
  {
    id: 9,
    name: 'Array.prototype.reverse',
    description: 'The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first',
    priority: 'medium',
    type: 'bug',
    status: 'To Do',
    sprint: '',
    labels: [],
    environment: '',
    assignee: null,
    reporter: null,
    votes: 0,
    dates: {
      created: null,
      updated: null
    },
    time: {
      estimated: 5,
      logged: 2
    },
    comments: [],
    history: []
  }
]

export default taskList
