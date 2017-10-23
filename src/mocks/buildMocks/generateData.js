const jsf = require('json-schema-faker')
const fs = require('fs')

const profilesSchema = require('./profilesSchema')
const tasksSchema = require('./tasksSchema')

const profiles = jsf(profilesSchema)
const tasks = jsf(tasksSchema)

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

tasks.forEach(task => {
  const index = randomBetween(0, profiles.length - 1)

  task.assignee = profiles[index].id

  profiles[index].tasks.push(task.id)
})

fs.writeFile('./src/db.json', JSON.stringify({ profiles, tasks }), function (err) {
  if (err) {
    return console.log(err)
  } else {
    console.log('Mock data generated.')
  }
})
