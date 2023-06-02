import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/Modelo/Producto';
import { FacturaService } from 'src/app/Servicios/Info/factura.service';
import { ItemService } from 'src/app/Servicios/Info/item.service';
import { ProductoService } from 'src/app/Servicios/Info/producto.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  Numero: any; 
  Productos: any = [];
  options: any = [];
  public Fecha = new Date();
  public FechaActual = this.Fecha.toLocaleDateString('es-ES');
  Item = {
    Producto_Nombre: '',
    Cantidad: 0,
    Descuento: 0,
    Costo: 0,
    Fecha: ''
  };
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
  public cedula: any;
  public costoAux: any;
  public sumatoria: number = 0;
  public iteracion: number = 0;
  public NombreProductos: any = [];
  public Descuentos: any = [];
  public Costos: any = [];
  public numerox: number = 1;

  constructor(private alertaC: AlertController, private ServicioProducto: ProductoService, private ServicioItem: ItemService, private ServicioFactura: FacturaService, private router: Router) { }

  ngOnInit() {
  }

  async Continue(){
    const alert = await this.alertaC.create({
      header: 'Ingrese un valor numérico',
      inputs: [
        {
          name: 'Cedula',
          type: 'text',
          placeholder: 'La Cédula del Comptrador'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.cedula = data.Cedula;
            this.RegistroExtendido();
          }
        }
      ]
    });

    await alert.present();
  }

  RegistroExtendido(){
    this.iteracion = 0;
    for(var cont=this.Numero; cont>0; cont--){
      this.selectProducto(cont);
    }
  }

  async selectProducto(Numb: number){
    this.ServicioProducto.showInfo().subscribe(async (datax)=>{
      for(var t=0; t<datax.length; t++){
        this.options[t] = datax[t].Nombre+' '+datax[t].Detalle;
      }
      const alert = await this.alertaC.create({
        header: 'Selecciona una opción',
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
            handler: async (data) => {
              
              this.Item.Producto_Nombre = data;
              
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

                      this.ServicioProducto.showInfo().subscribe((tetrax)=>{
                        for(var o=0; o<tetrax.length; o++){
                          if(this.Item.Producto_Nombre === tetrax[o].Nombre+' '+tetrax[o].Detalle){
                            this.Item.Costo = (tetrax[o].Precio * this.Item.Cantidad )- ((tetrax[o].Precio * this.Item.Cantidad)*(parseInt(datax.Descuento)/100));
                            
                            this.ServicioItem.createInfo(this.Item).subscribe((data2)=>{
                              this.Factura.IDs.push(data2.id);
                              this.Factura.Productos.push(data2.Producto_Nombre);
                              this.Factura.Cantidades.push(data2.Cantidad);
                              this.Factura.Descuentos.push(data2.Descuento);
                              this.Factura.Costos.push(data2.Costo);
                              this.sumatoria += data2.Costo;
                              this.iteracion++;

                              if(this.iteracion == this.Numero){
                                this.Factura.ID_Receptor = this.cedula;
                                this.Factura.Total = this.sumatoria;
                                this.Factura.Fecha = this.FechaActual;
                                                              
                                this.ServicioFactura.createInfo(this.Factura).subscribe(async (iox)=>{
                                  console.log(iox);
                                  const alert = await this.alertaC.create({
                                    header: 'Alert',
                                    message: '¡Factura registrada!',
                                    buttons: ['OK'],
                                  });
                              
                                  await alert.present();
                                  this.router.navigate(['/Main/visualizacion/factura']);
                                })
                              }
                              
                            })
                          }
                        }
                      })
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
    
  }

  async Registro(Num: number){
    const alert = await this.alertaC.create({
      header: 'Ingrese un valor numérico',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Ingrese aquí #'+Num
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Valor ingresado:', data.valor);
            // Aquí puedes realizar cualquier acción con el valor ingresado
          }
        }
      ]
    });

    await alert.present();
  }
}
