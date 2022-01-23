import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
 import { AuthService } from 'src/Shared/Services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class basic implements CanActivate {
  constructor(private authService: AuthService,private router : Router,
    private messageService: MessageService,private rr:ActivatedRoute)
  {}
   canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean
   {
     console.log("llllllllllllllllllllllllllllllllllllllllllllll")
    const currentUser = this.authService.currentUserValue;
    console.log("canActivate current",currentUser)
    if (currentUser) 
    {
      console.log("data",route.data)
      if (route.data.roles && route.data.roles.indexOf(currentUser.roles[0]) === -1) {
        console.log("if (currentUser)")
        this.router.navigate(['/']);
         return false;
      }
      return true;
    }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    //  if(this.authService.loggedIn())
    //  {
    //    return true;
    //  }      
    //  else
    //  {
    //   this.router.navigate(['']);
    //    return false;
    //  }
   }
}
