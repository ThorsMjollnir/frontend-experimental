import Observable = Rx.Observable;

export class LocalesService {

    public listLocales(): Observable<string[]> { return Observable.of(["a", "b", "c"]); }
}