import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
 import { AuthService } from 'src/Shared/Services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class basic implements CanActivate {
  constructor(private authService: AuthService,private router : Router,private messageService: MessageService)
  {}
   canActivate():boolean
   {
     if(this.authService.loggedIn())
     {
       return true;
     }      
     else
     {
      this.router.navigate(['']);
       return false;
     }
   }
}
