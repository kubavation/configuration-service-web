import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Context} from "../../../../shared/context/model/context";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class ContextService {

  constructor(private http: HttpClient) { }

  public contexts$: Observable<Context[]> = this.http.get<Context[]>(`${environment.url}/contexts`)

  public addContext(context: Context): Observable<void> {
    return this.http.post<void>(`${environment.url}/contexts`, context);
  }

  public editContext(contextName: string, context: Context): Observable<void> {
    return this.http.put<void>(`${environment.url}/contexts/${contextName}`, context);
  }

  public deleteContext(contextName: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/contexts/${contextName}`);
  }

}
