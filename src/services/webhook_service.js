const parsePayload = (payload) => {
  const { action } = payload
  const properties = {}
  switch (action) {
    case 'opened':
      properties.type = 'issue'
      properties.url = payload.issue.url
      properties.sender.username = payload.sender.login
      properties.sender.github_id = payload.sender.id
      properties.assignees = payload.assignees.map(assignee => ({ username: asignee.login, github_id: asignee.id }))
      break
    case 'assigned':
      properties.type = 'issue'
      properties.url = payload.issue.url
      properties.sender.username = payload.sender.login
      properties.sender.github_id = payload.sender.id
      properties.assignees = payload.assignees.map(assignee => ({ username: asignee.login, github_id: asignee.id }))
      break
  }
}

module.exports = {
  parsePayload
}
