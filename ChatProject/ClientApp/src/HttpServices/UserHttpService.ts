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

    public getUsersByLogin( login: string ): Observable<UserDto[]> {
        const params: HttpParams = new HttpParams()
            .set('login', login);
        return this._httpService.get('api/user/users-by-login', params);
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

    public isFriend( login: string, friend: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', login)
            .set('friend', friend);
        return this._httpService.get('api/user/is-friend', params);
    }

    public addFriend( userLogin: string, friendLogin: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', userLogin)
            .set('friend', friendLogin);
        return this._httpService.post<HttpParams, boolean>('api/user/add-friend', params);
    }

    public removeFriend( userLogin: string, friendLogin: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', userLogin)
            .set('friend', friendLogin);
        return this._httpService.post<HttpParams, boolean>('api/user/remove-friend', params);
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

    public changeName( login: string, name: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', login)
            .set('name', name);
        return this._httpService.post<HttpParams, boolean>('api/user/name', params);
    }

    public changePassword( login: string, password: string ): Observable<boolean> {
        const params: HttpParams = new HttpParams()
            .set('login', login)
            .set('password', password);
        return this._httpService.post<HttpParams, boolean>('api/user/password', params);
    }
}
