import { HttpService } from './HttpService';
import { Injectable, Inject } from '@angular/core';
import { UserDto } from '../dto/user/UserDto';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/message/MessageDto';

@Injectable()
export class UserHttpService {
    private readonly _httpService: HttpService;

    public constructor(httpService: HttpService) {
        this._httpService = httpService;
    }

    public getUser( login: string ): Observable<UserDto> {
        const params: HttpParams = new HttpParams()
            .set('login', login.toString());
        return this._httpService.get<UserDto>( 'api/user/', params );
    }

    public getFriends( login: string ): Observable<UserDto[]> {
        const params: HttpParams = new HttpParams()
            .set('login', login.toString());
        return this._httpService.get<UserDto[]>( 'api/user/friends', params );
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

    public addFriend( userLogin: string, friendLogin: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('userLogin', userLogin.toString())
            .set('friendLogin', friendLogin.toString());
        return this._httpService.post<HttpParams, boolean>('api/user/add-friend', params);
    }

    public removeFriend( userLogin: string, friendLogin: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('userLogin', userLogin.toString())
            .set('friendLogin', friendLogin.toString());
        return this._httpService.post<HttpParams, boolean>('api/user/add-friend', params);
    }

    public login(login: string, password: string): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', login.toString())
            .set('password', password.toString());
        return this._httpService.get<boolean>('api/user/login', params);
    }

    public messages( login: string, start: Date, end: Date ): Observable<MessageDto[]> {
        const params: HttpParams = new HttpParams()
            .set('login', login )
            .set('start', start.toString())
            .set('end', end.toString());
        return this._httpService.get<MessageDto[]>('api/user/messages', params);
    }
}
