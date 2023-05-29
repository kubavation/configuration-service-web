import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContextModule} from "../model/context-module";
import {environment} from "../../../environments/environment";

@Injectable()
export class ContextModulesService {

  constructor(private http: HttpClient) { }

  public contextModules(context: string): Observable<ContextModule[]> {
    return this.http.get<ContextModule[]>(`${environment.url}/contexts/${context}/modules`);
  }
}
