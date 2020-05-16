import { Payload, WebhookPayload, WebhookPayloadDetail, PayloadType } from "../common/types.ts"

export function parsePayload (payload: WebhookPayload): Payload {
  const { action } = payload
  const type: PayloadType = payload.pull_request === undefined ? 'issue' : 'pull_request'
  const payloadTypeDetail: WebhookPayloadDetail = payload.pull_request! ?? payload.issue!
  const properties: Payload = {
    action: '',
    type: type,
    url: payloadTypeDetail.html_url,
    repository_name: payload.repository.name,
    title: payloadTypeDetail.title,
    number: payloadTypeDetail.number,
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
      properties.action = payloadTypeDetail.state!
      break
    case 'assigned':
      properties.action = `assigned_${type}`
      properties.assignee!.username = payload.assignee!.login
      properties.assignee!.github_id = payload.assignee!.id
      break
    case 'review_requested':
      properties.action = 'review_pull'
      properties.reviewer!.username = payload.requested_reviewer!.login
      properties.reviewer!.github_id = payload.requested_reviewer!.id
      break
    case 'submitted':
      properties.action = payload.review!.state
      // eslint-disable-next-line camelcase
      properties.assignees = payload.pull_request!.assignees!.map(({ login: username, id: github_id }) => ({ username, github_id }))
  }

  return properties
}