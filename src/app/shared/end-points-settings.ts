export class EndPointsSettings {
  // static PREFIX = 'api/';
  static PREFIX = 'http://localhost:8080/';
  //static END_POINT_PREFIX = 'http://localhost:3333/api/';
  // static USER = EndPointsSettings.PREFIX + 'usersData';
  static USER = EndPointsSettings.PREFIX + 'user';
  static LOGIN = EndPointsSettings.PREFIX + 'auth';
  static PROJECT = EndPointsSettings.PREFIX + 'project';
  static DOCUMENT = EndPointsSettings.PREFIX + 'document';
  static UPLOAD = EndPointsSettings.PREFIX + 'document/upload';
  static DOWNLOAD = EndPointsSettings.PREFIX + 'document/download/';
  static MAIL = EndPointsSettings.PREFIX + 'mail/send';
  static PUBLICATION = EndPointsSettings.PREFIX + 'publication';
  // static PROJECT = EndPointsSettings.PREFIX + 'projectsData';
}
