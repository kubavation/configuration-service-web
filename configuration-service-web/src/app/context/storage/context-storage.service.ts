import { Injectable } from '@angular/core';
import {Context} from "../model/context";

@Injectable()
export class ContextStorageService {

  private readonly KEY = 'context';

  constructor() { }

  public store(context: Context): void {
    sessionStorage.setItem(this.KEY, context.name);
  }

  public storedValue(): Context | undefined {
    const contextName = sessionStorage.getItem(this.KEY);
    return contextName ? {name: contextName} : undefined;
  }

}
