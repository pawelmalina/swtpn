import {InMemoryDbService} from 'angular-in-memory-web-api';
import {userDataMock} from './user-data-mock';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const heroes = JSON.parse(userDataMock);
    return {heroes};
  }

}
