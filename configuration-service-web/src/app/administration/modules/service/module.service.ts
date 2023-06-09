import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../model/module";
import {environment} from "../../../../environments/environment";
import {ConfigPattern} from "../model/config-pattern";
import {ConfigurationGroup} from "../configuration-group/model/configuration-group";

@Injectable()
export class ModuleService {

  public modules$: Observable<Module[]> = this.http.get<Module[]>(`${environment.url}/modules`);

  constructor(private http: HttpClient) { }

  public addModule(module: Module): Observable<void> {
    return this.http.post<void>(`${environment.url}/modules/`, module);
  }

  public editModule(moduleName: string, module: Module): Observable<void> {
    return this.http.patch<void>(`${environment.url}/modules/${moduleName}`, module);
  }

  public deleteModule(moduleName: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/modules/${moduleName}`);
  }

  public configurationPatterns(module: string): Observable<ConfigPattern[]> {
    return this.http.get<ConfigPattern[]>(`${environment.url}/modules/${module}/configuration-pattern`);
  }

  public addConfigurationPattern(module: string, pattern: ConfigPattern): Observable<void> {
    return this.http.patch<void>(`${environment.url}/modules/${module}/configuration-pattern`, [pattern]);
  }

  public editConfigurationPattern(module: string, configName: string, pattern: ConfigPattern): Observable<void> {
    return this.http.patch<void>(`${environment.url}/modules/${module}/configuration-pattern/${configName}`, pattern);
  }

  public deleteConfigurationPattern(module: string, configName: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/modules/${module}/configuration-pattern/${configName}`);
  }

  public configurationGroups(module: string): Observable<ConfigurationGroup[]> {
    return this.http.get<ConfigurationGroup[]>(`${environment.url}/modules/${module}/configuration-groups`);
  }

  public addConfigurationGroup(module: string, configurationGroup: ConfigurationGroup): Observable<void> {
    return this.http.post<void>(`${environment.url}/modules/${module}/configuration-groups`, configurationGroup);
  }

  public editConfigurationGroup(module: string, configGroupName: string, configurationGroup: ConfigurationGroup): Observable<void> {
    return this.http.put<void>(`${environment.url}/modules/${module}/configuration-groups/${configGroupName}`, configurationGroup);
  }

  public deleteConfigurationGroup(module: string, configGroup: string): Observable<void> {
    return this.http.delete<void>(`${environment.url}/modules/${module}/configuration-groups/${configGroup}`);
  }

  public configurationGroupPatterns(module: string, configGroup: string): Observable<ConfigPattern[]> {
    return this.http.get<ConfigPattern[]>(`${environment.url}/modules/${module}/configuration-groups/${configGroup}/patterns`);
  }

}
