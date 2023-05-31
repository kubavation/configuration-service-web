import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModuleConfiguration} from "../model/module-configuration";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ContextModuleConfigurationService {

  constructor(private http: HttpClient) { }

  public moduleConfiguration(context: string, module: string): Observable<ModuleConfiguration> {
    return this.http.get<ModuleConfiguration>(`${environment.url}/module-configuration/${context}/${module}`)
  }

  public setModuleConfiguration(context: string, module: string, moduleConfig: ModuleConfiguration): Observable<void> {
    return this.http.patch<void>(`${environment.url}/module-configuration/${context}/${module}`, moduleConfig)
  }
}
