import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Categoria } from 'src/app/Modelo/Categoria';
import { Producto } from 'src/app/Modelo/Producto';
import { CategoriaService } from 'src/app/Servicios/Info/categoria.service';
import { ProductoService } from 'src/app/Servicios/Info/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  FormProducto: FormGroup;
  InfoCategoria: Categoria[] = [];
  prod: Producto[] = [];

  constructor(public fb: FormBuilder, public alertController: AlertController, private route: Router, private catService: CategoriaService, private prodService: ProductoService) { 
    this.FormProducto = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'Detalle': new FormControl("", Validators.required),
      'Precio': new FormControl("", Validators.required),      
      'Categoria_Nombre': new FormControl("", Validators.required)
    })
  } 

  ngOnInit() { this.Categ() }  

  async Registrar() {
    var dataP = this.FormProducto.value;

    if(this.FormProducto.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Por favor, llenar todos los campos',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    else{
      this.prodService.createInfo(dataP).subscribe(async (data)=>{
        console.log(data);
        const alert = await this.alertController.create({
          header: 'OKAS',
          message: 'Producto Registrado',
          buttons: ['OK'],
        });
        await alert.present();
        this.route.navigate(['/Main/visualizacion/producto'])
      })
    }
  }

  Categ(){
    this.catService.showInfo().subscribe((data)=>{
      console.log(data);
      this.InfoCategoria = data;
    })
  }

  Muestreo(){
    console.log("Fuciona");
  }
}
