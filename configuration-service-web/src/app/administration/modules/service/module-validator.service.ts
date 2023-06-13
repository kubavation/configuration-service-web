import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {AlreadyExistsValidation} from "../../../shared/validation/already-exists-validation";

@Injectable()
export class ModuleValidatorService implements AlreadyExistsValidation {

  constructor(private http: HttpClient) { }

  alreadyExists(property: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.url}/modules/${property}/validation/name-exists`);
  }

}
