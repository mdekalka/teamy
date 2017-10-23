const tasksSchema = {
  type: 'array',
  minItems: 25,
  maxItems: 35,
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        unique: true,
        minimum: 0,
        maximum: 9999,
        exclusiveMinimum: true
      },
      name: {
        faker: 'hacker.phrase'
      },
      priority: {
        type: 'string',
        chance: {
          pickone: [
              ['minor', 'major', 'blocker', 'medium']
          ]
        }
      },
      type: {
        type: 'string',
        chance: {
          pickone: [
              ['bug', 'story', 'epic']
          ]
        }
      },
      status: {
        type: 'string',
        chance: {
          pickone: [
              ['Done', 'In Progress', 'QA', 'Done']
          ]
        }
      },
      sprint: {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: true
      },
      labels: {
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 2,
        uniqueItems: true
      },
      environment: {
        type: 'string'
      },
      assignee: null,
      dates: {
        type: 'object',
        properties: {
          created: {
            faker: 'date.past'
          },
          updated: {
            faker: 'date.future'
          }
        },
        required: ['created', 'updated']
      },
      time: {
        type: 'object',
        properties: {
          estimated: {
            type: 'number',
            minimum: 0,
            maximum: 10
          },
          logged: {
            type: 'number',
            minimum: 0,
            maximum: 10
          }
        },
        required: ['estimated', 'logged']
      },
      comments: {
        type: 'array'
      },
      history: {
        type: 'array'
      }
    },
    required: ['id', 'name', 'priority', 'type', 'status', 'sprint', 'labels', 'environment', 'assignee', 'dates', 'time', 'comments', 'history']
  }
}

module.exports = tasksSchema
