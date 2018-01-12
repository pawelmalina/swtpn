export class Project {
  id: number;
  title: string;
  name: string;
  description: string;
  tasks: object[];
  users: NamesAndIds[];
  documents: NamesAndIds[];
  messages: Message[];
}

export class Document {
  id: number;
  title: string;
  description: string;
  blocked: boolean;
  creationDate: number;
  blockedFromDate: number;
  blockedToDate: number;
  createdBy: string;
  blockedBy: string;

  currentVersion: UploadedFile;
  historicalFiles: UploadedFile[];
}

export class UploadedFile {
  id: number;
  uploadedDate: number;
  uploadedBy: NamesAndIds;
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

