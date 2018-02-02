const profileSchema = require('./profileSchema')

const profilesSchema = {
  type: 'array',
  minItems: 15,
  maxItems: 20,
  items: profileSchema
}

module.exports = profilesSchema
