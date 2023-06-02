import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoriaService } from 'src/app/Servicios/Info/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  FormCategoria: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private route: Router, private cateService: CategoriaService) { 
    this.FormCategoria = this.fb.group({ 
      'Nombre': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {  }  

  async Registrar() {
    var dataC = this.FormCategoria.value;

    if(this.FormCategoria.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Por favor, llenar todos los campos',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    else{
      this.cateService.createInfo(dataC).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
