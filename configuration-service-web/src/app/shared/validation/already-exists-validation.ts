import {Observable} from "rxjs";

export interface AlreadyExistsValidation {
  alreadyExists(property: string): Observable<boolean>;
}
