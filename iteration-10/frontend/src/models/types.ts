
export interface user {
    email:      string,
    id:         string,
    name:       string,
    picture:    string,
}

export interface category {
    id: string,
    name: string,
    channels: [channel]
}

export interface channel {
    id: string,
    name: string,
}

export interface message {
    id: string,
    createdAt:  string,
    sender: user,
    content: string,
    edited: boolean,
  }

export interface channelInfo {
    id: string,
    name: string,
    messages: [message],
}