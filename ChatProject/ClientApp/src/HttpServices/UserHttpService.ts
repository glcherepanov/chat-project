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
        return this._httpService.get<UserDto[]>('api/user/users');
    }

    public removeUser(userId: number): Observable<void> {
        const params: HttpParams = new HttpParams()
            .set('userId', userId.toString());
        return this._httpService.post('api/user/remove', params);
    }

    public add( user: UserDto ): Observable<boolean> {
        return this._httpService.post<UserDto, boolean>('api/user/add', user);
    }

    public login(login: string, password: string): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', login.toString())
            .set('password', password.toString());
        return this._httpService.get<boolean>('api/user/login', params);
    }
}
