import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/Modelo/Producto';
import { ProductoService } from 'src/app/Servicios/Info/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  ListaProductos: Producto[] = [];
  constructor(private produc: ProductoService, private alertaC: AlertController) { }

  ngOnInit() {
    this.Productos();
  }

  Productos(){
    this.produc.showInfo().subscribe((data)=>{
      this.ListaProductos = data;
    })
  }

  async modal(Cat: string, Nom: string, Det: string, Pre: number){
    const alert = await this.alertaC.create({
      header: 'More Information',
      message: 'Categoria: '+Cat+
                ' *Producto: '+Nom+
                ' *Detalle: '+Det+
                ' *Precio: '+Pre,
      buttons: ['OK']
    });

    await alert.present();
  }
}
