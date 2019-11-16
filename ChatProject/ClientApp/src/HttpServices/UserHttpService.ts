import { HttpService } from './HttpService';
import { Injectable, Inject } from '@angular/core';
import { UserDto } from '../dto/user/UserDto';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserHttpService {
    private readonly _httpService: HttpService;

    public constructor(httpService: HttpService) {
        this._httpService = httpService;
    }

    public getUsers(): Observable<UserDto[]> {
        return this._httpService.get<UserDto[]>('api/Users/users');
    }

    public removeUser(_userId: number): Observable<void> {
        const params: HttpParams = new HttpParams()
            .set('userId', _userId.toString());
        return this._httpService.post('api/User/remove', params);
    }
}
