import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../model/module";

@Injectable()
export class ModuleService {

  public modules$: Observable<Module[]> = this.http.get<Module[]>('/todo');

  constructor(private http: HttpClient) { }
}
