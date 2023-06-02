import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Servicios/log.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private logService: LogService) { }

  ngOnInit() {
  }

  LogOut(){
    this.logService.LogOut();
  }
}
