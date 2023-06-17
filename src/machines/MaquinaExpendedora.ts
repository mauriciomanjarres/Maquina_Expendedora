import { Producto } from "../models/Producto";

abstract class AbstractMaquinaExpendedora {
  protected productos: Producto[];

  constructor() {
    this.productos = [];
  }

  public abstract agregarProducto(): void;

  public mostrarProductos(): void {
    console.log('Productos disponibles:');
    this.agregarProducto();
    this.productos.forEach((producto) => {
      console.log(`${producto.getNombre()} - Precio: $${producto.getPrecio()} - Cantidad: ${producto.getCantidad()}`);
    });
  }

  public abstract restarCantidadProducto(nombre: string, cantidad: number): void;

  public getProductos(): Producto[] {
    return this.productos;
  }

  public seleccionarProducto(nombre: string): Producto | null {
    const producto = this.productos.find((p) => p.getNombre() === nombre);
    if (producto) {
      return producto;
    }
    return null;
  }
}

export class MaquinaExpendedora extends AbstractMaquinaExpendedora {
  public agregarProducto(): void {
    this.productos = [];
    let p1 = new Producto("Gomita", 1000, 12);
    this.productos.push(p1);
    let p2 = new Producto("Coca-Cola", 3000, 24);
    this.productos.push(p2);
    let p3 = new Producto("Pepsi", 2000, 12);
    this.productos.push(p3);
    let p4 = new Producto("Galleta", 1000, 12);
    this.productos.push(p4);
    let p5 = new Producto("Chocolate", 1000, 12);
    this.productos.push(p5);
    let p6 = new Producto("Mecatos", 5000, 24);
    this.productos.push(p6);
  }

  public restarCantidadProducto(nombre: string, cantidad: number): void {
    const producto = this.productos.find((p) => p.getNombre() === nombre);

    if (producto && producto.getCantidad() >= cantidad) {
      producto.restarCantidad(cantidad);
    }
  }
}
