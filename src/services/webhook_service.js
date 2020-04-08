const parsePayload = (payload) => {
  const { action } = payload
  const type = payload.pull_request === undefined ? 'issue' : 'pull_request'
  const properties = {
    type: type,
    url: payload[type].html_url,
    repository_name: payload.repository.name,
    title: payload[type].title,
    sender: {
      username: payload.sender.login,
      github_id: payload.sender.id
    }
  }
  switch (action) {
    case 'opened':
      properties.action = 'create'
      break
    case 'closed':
      properties.action = payload.pull_request.state
      break
    case 'assigned':
      properties.action = 'assign_issue'
      properties.assignee = {}
      properties.assignee.username = payload.assignee.login
      properties.assignee.github_id = payload.assignee.id
      break
    case 'review_requested':
      properties.action = 'review_pull'
      properties.reviewer = {}
      properties.reviewer.username = payload.requested_reviewer.login
      properties.reviewer.github_id = payload.requested_reviewer.id
      break
    case 'submitted':
      properties.action = payload.review.state
      properties.assignees = payload.pull_request.assignees.map(({ login: username, id: github_id}) => ({ username, github_id }))
  }

  return properties
}

module.exports = {
  parsePayload
}
