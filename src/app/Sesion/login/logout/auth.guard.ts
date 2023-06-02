import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LogService } from 'src/app/Servicios/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private logueoService: LogService, private router: Router){

  }

  canActivate(): boolean{
    if(this.logueoService.Logged()){
      return true;
    }
    this.router.navigate(['/logIn']);
    return false;
  }
}
