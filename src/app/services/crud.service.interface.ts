import {Observable} from 'rxjs/Observable';

export interface CRUDServiceInterface {
    getAll (): Promise<any>;
    add (item): Observable<any>;
    update (item): Observable<any>;
    remove (id): Observable<any>;
}
