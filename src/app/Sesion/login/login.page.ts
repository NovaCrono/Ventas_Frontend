import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogService } from 'src/app/Servicios/log.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  FormRegister: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private route: Router, private logService: LogService) { 
    this.FormRegister = this.fb.group({
      'Email': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.FormRegister.value;

    if(this.FormRegister.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Por favor, llenar todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
    else{
      this.logService.LogIn(f.Email, f.Password).then( async (dato)=>{
        if(dato.data.token){
          console.log(dato.data.token);
          await Preferences.set({
            key: 'token',
            value: dato.data.token
          })
          this.route.navigate(['/Main']);
        }else{
          const alert = await this.alertController.create({
            header: 'ERROR',
            message: 'El usuario designado no existe',
            buttons: ['OK'],
          });
      
          await alert.present();
          return;
        }
      })      
    }
  }
}
