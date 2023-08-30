export interface Issue {
  url: string; // issue url (specific page)
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number; // issue number
  title: string; // issue title
  user: {
    login: string; // author
    id: number;
    node_id: string;
    avatar_url: string; // author profile image (specific page)
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: 'User';
    site_admin: boolean;
  };
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: 'CLA Signed';
    color: string;
    default: boolean;
    description: null;
  }[];
  state: 'open';
  locked: boolean;
  assignee: null;
  assignees: [];
  milestone: null;
  comments: number; // comment count
  created_at: string; // created date
  updated_at: string;
  closed_at: null;
  author_association: 'NONE';
  active_lock_reason: null;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: null;
  };
  body: string; // body
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}
