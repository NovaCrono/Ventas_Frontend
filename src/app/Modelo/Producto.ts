export class Producto {
    id?: number;
    Nombre: string;
    Detalle: string;
    Precio: number;
    Categoria_Nombre: string;

    constructor(Nombre: string, Detalle: string, Precio: number, Categoria_Nombre: string){
        this.Nombre = Nombre;
        this.Detalle = Detalle;
        this.Precio = Precio;
        this.Categoria_Nombre = Categoria_Nombre;
    }
}