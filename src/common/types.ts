interface Actor {
  username: String,
  github_id: String
}

interface OriginActor {
  login: String,
  id: String
}

export interface WebhookPayload {
  action: String,
  repository: {
    name: String
  },
  sender: OriginActor,
  pull_request?: WebhookPayloadDetail,
  issue?: WebhookPayloadDetail,
  assignee?: OriginActor,
  requested_reviewer?: OriginActor,
  review?: {
    state: String
  }
}

export interface WebhookPayloadDetail {
  html_url: String,
  title: String,
  number: String,
  state?: String,
  assignee?: OriginActor,
  assignees?: Array<OriginActor>
}

export interface Payload {
  action: String,
  type: String,
  url: String,
  repository_name: String,
  title: String,
  number: String,
  sender: Actor,
  assignee?: Actor,
  reviewer?: Actor,
  assignees?: Array<Actor>,
}

export type PayloadType = "issue" | "pull_request"