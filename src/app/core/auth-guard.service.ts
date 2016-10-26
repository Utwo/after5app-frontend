import {Injectable}       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {StateService} from "../shared/state.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private state: StateService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.state.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
