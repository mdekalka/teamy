class TaskProfileModel {
  constructor () {
    this.name = ''
    this.description = ''
    this.priority = ''
    this.type = ''
    this.status = ''
    this.sprint = ''
    this.environment = ''
    this.labels = []
    this.assignee = {
      picture: {},
      name: {}
    }
    this.reporter = ''
    this.dates = {}
    this.time = {}
    this.comments = []
    this.history = []
  }
}

export default TaskProfileModel
