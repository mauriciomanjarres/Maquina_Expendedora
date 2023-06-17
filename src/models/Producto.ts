export class Producto {
    private  nombre: string;
    private precio: number;
    private cantidad: number;

    constructor(nombre:string, precio: number, cantidad: number){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getPrecio(): number{
        return this.precio;
    }
    public getCantidad(): number{
        return this.cantidad;
    }
    public restarCantidad(cantidad: number): void {
        if(this.cantidad >= cantidad){
            this.cantidad -= cantidad;
        }
        
    }
}