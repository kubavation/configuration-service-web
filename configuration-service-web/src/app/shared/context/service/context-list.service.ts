import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Context} from "../model/context";
import {environment} from "../../../../environments/environment";



@Injectable()
export class ContextListService {

  constructor(private http: HttpClient) { }

  public contexts$: Observable<Context[]> = this.http.get<Context[]>(`${environment.url}/contexts`)

}
