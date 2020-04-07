const parsePayload = (payload) => {
  const { action } = payload
  const type = payload.pull_request === undefined ? 'pull_request' : 'issue'
  const properties = {
    type: type,
    url: payload['type'].html_url,
    repository_name: payload.repository.name,
    sender: {
      username: payload.sender.login,
      github_id: payload.sender.id
    }
  }
  switch (action) {
    case 'opened':
      properties.action = 'create'
      properties.title = payload.issue.title
      break
    case 'assigned':
      properties.action = 'assign_issue'
      properties.assignee.username = payload.assignee.login
      properties.assignee.github_id = payload.assignee.id
      break
    case 'review_requested':
      properties.action = 'review_pull'
      properties.reviewer.username = payload.requested_reviewer.login
      properties.reviewer.github_id = payload.requested_reviewer.id
      break
  }

  return properties
}

module.exports = {
  parsePayload
}
