import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Factura } from 'src/app/Modelo/Factura';
import { FacturaService } from 'src/app/Servicios/Info/factura.service';
import { ItemService } from 'src/app/Servicios/Info/item.service';
import { ProductoService } from 'src/app/Servicios/Info/producto.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  Facturas: any = [];
  Tamano: number = 0;
  options: any = [];
  
  DatosAux = {
    Nombre: '',
    Cantidad: 0,
    Descuento: 0,
    Costo: 0
  }
  Factura = {
    ID_Receptor: '',
    IDs: [] as number[],
    Productos: [] as string[],
    Cantidades: [] as number[],
    Descuentos: [] as number[],
    Costos: [] as number[],
    Total: 0,
    Fecha: ''
  }
  Item = {
    Producto_Nombre: '',
    Cantidad: 0,
    Descuento: 0,
    Costo: 0,
    Fecha: ''
  };
  public Fecha = new Date();
  public FechaActual = this.Fecha.toLocaleDateString('es-ES');
  public sumatoria: number = 0;

  constructor(private dataService: FacturaService, private alertaC: AlertController, private router: Router, private data2Service: ProductoService, private data3Service: ItemService, private navC: NavController) { }

  ngOnInit() {
    this.MirarFacturas();
  }

  MirarFacturas(){
    this.dataService.showInfo().subscribe((dato)=>{
      this.Facturas = dato;
    })
  }

  getRange(count: number): number[] {
    return Array.from(Array(count).keys());
  }

  Drop(id:any){
    this.dataService.deleteInfo(id).subscribe(async (data)=>{
      const alert = await this.alertaC.create({
        header: 'Alert',
        message: '¡Factura eliminada! (Se requiere actualizar)',
        buttons: ['OK'],
      });
  
      await alert.present();
      this.navC.navigateForward('/Main/visualizacion/factura', { replaceUrl: true });
    })
  }

  async Retomar(id: any){
    const alert = await this.alertaC.create({
      header: 'Opciones',
      message: '¿Qué deseas hacer?',
      buttons: [
        {
          text: 'Agregar Producto',
          handler: () => {
            this.Agg(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          }
        }
      ]
    });
  
    await alert.present();
  }

  Agg(id: any){
    this.dataService.showOneInfo(id).subscribe((dato)=>{
      this.Factura = dato;
      this.data2Service.showInfo().subscribe(async (data)=>{
        for(var t=0; t<data.length; t++){
          this.options[t] = data[t].Nombre+' '+data[t].Detalle;
        }
        const alert = await this.alertaC.create({
          header: 'Ingrese un valor numérico',
          inputs: this.options.map((option: any, index: any) => ({
            name: `opcion${index}`,
            type: 'radio',
            label: option,
            value: option,
            checked: false
          })),
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Aceptar',
              handler: async (datap) => {
                this.Item.Producto_Nombre = datap;
                this.DatosAux.Nombre = datap;
                this.Factura.Productos.push(this.DatosAux.Nombre);
                const alert = await this.alertaC.create({
                  header: 'Ingrese un valor numérico',
                  inputs: [
                    {
                      name: 'Cantidad',
                      type: 'number',
                      placeholder: 'Ingrese Cantidad'
                    },
                    {
                      name: 'Descuento',
                      type: 'number',
                      placeholder: 'Ingrese Descuento'
                    }
                  ],
                  buttons: [
                    {
                      text: 'Cancelar',
                      role: 'cancel'
                    },
                    {
                      text: 'Aceptar',
                      handler: (datax) => {
                        this.Item.Cantidad = parseInt(datax.Cantidad);
                        this.Item.Descuento = parseInt(datax.Descuento);
                        this.Item.Fecha = this.FechaActual;
                        for(var ti=0; ti<data.length; ti++){
                          if(this.Item.Producto_Nombre == data[ti].Nombre+' '+data[ti].Detalle){
                            this.Item.Costo = this.Item.Cantidad * data[ti].Precio;
                            
                            this.data3Service.createInfo(this.Item).subscribe((dat)=>{
                              this.Factura.IDs.push(dat.id);
                              this.Factura.Cantidades.push(dat.Cantidad);
                              this.Factura.Descuentos.push(dat.Descuento);
                              this.Factura.Costos.push(dat.Costo);
                              for(var yu=0; yu<this.Factura.Costos.length; yu++){
                                this.sumatoria += this.Factura.Costos[yu];
                              }
                              this.Factura.Total = this.sumatoria;
                              this.dataService.editInfo(id, this.Factura).subscribe(async (datw)=>{
                                const alert = await this.alertaC.create({
                                  header: 'Alert',
                                  message: '¡Producto añadido! (Se requiere actualizar)',
                                  buttons: ['OK'],
                                });
                            
                                await alert.present();
                              })
                            })
                          }
                        }
                      }
                    }
                  ]
                });
            
                await alert.present();
              }
            }
          ]
        });
    
        await alert.present();
      })
    })
  }
}
