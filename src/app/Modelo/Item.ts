export class Item {
    _id?: number;
    Producto_Nombre: string;
    Cantidad: number;
    Descuento: number;
    Costo: number;
    Fecha: string;

    constructor(Producto_Nombre: string, Cantidad: number, Descuento: number, Fecha: string, Costo: number){
        this.Cantidad = Cantidad;
        this.Producto_Nombre = Producto_Nombre;
        this.Descuento = Descuento;
        this.Costo = Costo;
        this.Fecha = Fecha;
    }
}