import { InMemoryDbService } from 'angular-in-memory-web-api';
import { users } from 'src/app/models/mock-users';
import { of } from 'rxjs';


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return of({users});
    }
}