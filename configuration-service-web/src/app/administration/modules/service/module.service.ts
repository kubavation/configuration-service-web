import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../model/module";
import {environment} from "../../../../environments/environment";
import {ConfigPattern} from "../model/config-pattern";

@Injectable()
export class ModuleService {

  public modules$: Observable<Module[]> = this.http.get<Module[]>(`${environment.url}/modules`);

  constructor(private http: HttpClient) { }

  public configurationPatterns(module: string): Observable<ConfigPattern[]> {
    return this.http.get<ConfigPattern[]>(`${environment.url}/modules/${module}/configuration-pattern`);
  }

  public addConfigurationPattern(module: string, pattern: ConfigPattern): Observable<void> {
    return this.http.patch<void>(`${environment.url}/modules/${module}/configuration-pattern`, [pattern]);
  }

}
