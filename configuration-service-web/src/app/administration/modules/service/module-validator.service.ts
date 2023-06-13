import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ModuleValidatorService {

  constructor(private http: HttpClient) { }

  public moduleAlreadyExists(module: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.url}/modules/${module}/validation/name-exists`);
  }

}
