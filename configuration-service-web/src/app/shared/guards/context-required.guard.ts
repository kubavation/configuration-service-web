import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ContextBsService} from "../context/service/context-bs.service";

@Injectable({
  providedIn: 'root'
})
export class ContextRequiredGuard implements CanActivate {

  constructor(private contextBsService: ContextBsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this.contextBsService.value()
  }

}
