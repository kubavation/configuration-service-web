import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class ContextValidatorService {

  constructor(private http: HttpClient) { }

  public contextAlreadyExists(context: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.url}/contexts/${context}/validation/name-exists`);
  }

}
