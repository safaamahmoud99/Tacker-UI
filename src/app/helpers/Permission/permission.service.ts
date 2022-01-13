import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/Shared/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService) { }

//   hasPermission(component): Observable<boolean> {
//     return this.authService.isLoggedIn().map(res => {
// // Get permissions from user object.
//         this.permissions = this.getPermissions();
// // Check if user object has permissions to access the current component.
//         return this.checkPermission(component.data.permission);
//     });
// }
}
