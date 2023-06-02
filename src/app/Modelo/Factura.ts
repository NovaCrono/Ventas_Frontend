export class Factura {
    id?: number;
    ID_Receptor: string;
    Productos: [ string ];
    Descuentos: [ number ];
    Costos: [ number ];
    Total: number;
    Fecha: string;

    constructor(ID_Receptor: string, Productos: [string], Descuentos:[number], Costos:[number], Total: number, Fecha: string){
        this.ID_Receptor = ID_Receptor;
        this.Productos = Productos;
        this.Descuentos = Descuentos;
        this.Costos = Costos;
        this.Total = Total;
        this.Fecha = Fecha;
    }
}