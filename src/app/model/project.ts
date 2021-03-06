export class Project {
  id: number;
  title: string;
  name: string;
  description: string;
  tasks: object[];
  users: NamesAndIds[];
  messages: Message[];
}

export class ProjectsNames {
  id: number;
  name: string;
}

export class NamesAndIds {
  id: number;
  name: string;
}

export class Message {
  id: number;
  userName: string;
  content: string;
  date: number;
}

export class NewMessage {
  userId: number;
  targetId: number;
  content: string;

  constructor(userId: number, targetId: number, content: string) {
    this.userId = userId;
    this.targetId = targetId;
    this.content = content;
  }
}

