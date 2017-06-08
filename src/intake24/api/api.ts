import {DOM} from 'rx-dom';
import Observable = Rx.Observable;


interface LocaleInfo {
// case class Locale(id: String, englishName: String, localName: String, respondentLanguage: String, adminLanguage: String, flagCode: String, prototypeLocale: Option[String], textDirection: String)

    id: string,
    englishName: string,
    localName: string,
    respondentLanguage: string,
    adminLanguage: string,
    flagCode: string,
    prototypeLocale: [string],
    textDirection: string
}


export class EmailCredentials {
    constructor(readonly email: string, readonly password: string) {
    }
}

export class SigninResult {
    constructor (readonly refreshToken: string) { }
}

export class RefreshResult {
    constructor (readonly accessToken: string) { }
}

export class AuthenticationService {

    public static readonly REFRESH_TOKEN_KEY = "refreshToken";

    private cachedRefreshToken?: string;

    constructor(readonly apiBaseUrl: string) {
        this.cachedRefreshToken = localStorage.getItem(AuthenticationService.REFRESH_TOKEN_KEY);
    }

    public signin(credentials: EmailCredentials): Observable<SigninResult> {
        return DOM.ajax({
            method: "POST",
            url: this.apiBaseUrl + "/signin",
            body: JSON.stringify(credentials),
            responseType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        }).map(r => r.response);
    }

    public refresh(): Observable<RefreshResult> {
        return DOM.ajax({
            method: "POST",
            url: this.apiBaseUrl + "/refresh",
            responseType: "json",
            headers: {
                "X-Auth-Token": this.cachedRefreshToken
            }
        }).map(r => r.response).catch( function(e) { console.log(e); return Observable.of(new RefreshResult("kotakbas")) });
    }

}

class AuthenticationCache {

    private cachedAccessToken?: string;

    constructor(readonly apiBaseUrl: string) {
    }

    public get<T>(request: string, body?: any): Observable<T> {
        return DOM.ajax({
            method: "GET",
            url: this.apiBaseUrl + request,
            body: body,
            responseType: "json",
            headers: {
                "Content-Type": "application-json",
                "X-Auth-Token": this.cachedAccessToken
            }
        }).map(r => r.response);
    }
}


/*class AuthenticationCache {
 static readonly REFRESH_TOKEN_KEY = 'refreshToken';
 static readonly ACCESS_TOKEN_KEY = 'accessToken';


 private cachedAccessToken?: string;

 constructor(readonly getCredentials: () => Promise<EmailCredentials>) {
 this.cachedRefreshToken = localStorage.getItem(AuthenticationCache.REFRESH_TOKEN_KEY);
 this.cachedAccessToken = localStorage.getItem(AuthenticationCache.ACCESS_TOKEN_KEY);
 }

 withAuthToken<T>(request: (token: string) => Promise<T>): Promise<T> {
 if (this.cachedAccessToken)
 }
 }

 class LocalesService {

 constructor(readonly authCache: AuthenticationCache) {
 }

 public listLocales(): Promise<Map<string, LocaleInfo>> {
 //this.authCache.withAuthToken()
 return null;
 }
 }*/