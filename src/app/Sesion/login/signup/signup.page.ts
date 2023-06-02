import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogService } from 'src/app/Servicios/log.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  FormSignUp: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private route: Router, private logService: LogService) { 
    this.FormSignUp = this.fb.group({
      'Email': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.FormSignUp.value;

    if(this.FormSignUp.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Por favor, llenar todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
    else{
      this.logService.SignUp(f.Email, f.Password).then(async ()=>{
        const alert = await this.alertController.create({
          header: 'Registro Completado',
          buttons: ['OK'],
        });
    
        await alert.present();
        return;      
      })      
      this.route.navigate(['/LogIn']);
    }
  }
}
