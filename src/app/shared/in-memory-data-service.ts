import {InMemoryDbService} from 'angular-in-memory-web-api';
import {userDataMock} from './data-mock/user-data-mock';
import {projectDataMock} from './data-mock/project-data-mock';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const usersData = JSON.parse(userDataMock);
    const projectsData = JSON.parse(projectDataMock);

    return {usersData, projectsData};
  }

}
