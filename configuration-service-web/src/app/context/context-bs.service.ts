import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Context} from "./model/context";

@Injectable({
  providedIn: 'root'
})
export class ContextBsService {

  private contextSubject = new BehaviorSubject<Context>(null);
  public context$ = this.contextSubject.asObservable();

  constructor() { }

  public set(context: Context): void {
    this.contextSubject.next(context);
  }

  public value(): Context {
    return this.contextSubject.value;
  }

}
