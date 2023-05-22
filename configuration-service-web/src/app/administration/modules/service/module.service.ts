import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../model/module";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ModuleService {

  public modules$: Observable<Module[]> = this.http.get<Module[]>(`${environment.url}/modules`);

  constructor(private http: HttpClient) { }
}
