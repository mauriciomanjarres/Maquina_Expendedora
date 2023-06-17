import { Producto } from "./models/Producto";
import { MaquinaExpendedora } from "./machines/MaquinaExpendedora";
import * as readline from 'readline';

abstract class AbstractMain {
  protected maquina: MaquinaExpendedora;
  protected productoSeleccionado: Producto;
  protected rl: readline.Interface;

  constructor() {
    this.maquina = new MaquinaExpendedora();
    this.maquina.agregarProducto();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public ejecutar(): void {
    this.mostrarMenu();
    this.leerOpcion();
  }

  protected mostrarMenu(): void {
    console.log('\nMi Máquina\n');
    console.log('1. Ver productos');
    console.log('2. Seleccionar');
    console.log('3. Ingresar Billete');
    console.log('4. Salir');
    console.log('\nSelecciona una opción:');
  }

  protected abstract leerOpcion(): void;

  protected mostrarProductosDisponibles(): void {
    const productos = this.maquina.getProductos();
    console.log('\nProductos disponibles:');
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      console.log(`${i + 1}. ${producto.getNombre()} - Precio: $${producto.getPrecio()} - Cantidad: ${producto.getCantidad()}`);
    }
  }

  protected seleccionarProducto(): void {
    this.mostrarProductosDisponibles();
    this.rl.question('Selecciona el número del producto: ', (numeroProducto) => {
      const index = parseInt(numeroProducto) - 1;
      if (index >= 0 && index < this.maquina.getProductos().length) {
        this.productoSeleccionado = this.maquina.getProductos()[index];
        console.log(`Has seleccionado: ${this.productoSeleccionado.getNombre()} - Precio: $${this.productoSeleccionado.getPrecio()}`);
        this.ingresarBillete();
      } else {
        console.log('Número de producto inválido. Por favor, selecciona un número válido.');
        this.volverAlMenu();
      }
    });
  }

  protected ingresarBillete(): void {
    if (!this.productoSeleccionado) {
      console.error('Error: debes seleccionar primero un producto');
      this.volverAlMenu();
      return;
    }

    this.rl.question('Ingresa el valor del billete: ', (valorBillete) => {
      const valorIngresado = parseFloat(valorBillete);
      if (isNaN(valorIngresado) || valorIngresado <= 0) {
        console.log('Valor de billete inválido. Inténtalo de nuevo.');
        this.ingresarBillete();
        return;
      }
      console.log(`Has ingresado un billete de $${valorBillete}`);

      if (valorIngresado >= this.productoSeleccionado.getPrecio()) {
        const cambio = valorIngresado - this.productoSeleccionado.getPrecio();
        console.log(`Compra realizada. Producto: ${this.productoSeleccionado.getNombre()}. Cambio: $${cambio.toFixed(2)}`);
        this.maquina.restarCantidadProducto(this.productoSeleccionado.getNombre(), 1);
        this.realizarOperacionAdicional(cambio);
      } else {
        console.log('El valor del billete es insuficiente.');
      }
      this.volverAlMenu();
    });
  }

  protected realizarOperacionAdicional(cambio: number): void {
    console.log(`Entrega de producto y vuelto: $${cambio.toFixed(2)}`);
  }

  protected volverAlMenu(): void {
    console.log('\nPresiona cualquier tecla para volver al menú...');
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.once('data', () => {
      this.mostrarMenu();
      this.leerOpcion();
    });
  }
}

class Main extends AbstractMain {
  protected leerOpcion(): void {
    this.rl.question('Opción seleccionada: ', (opcion) => {
      switch (opcion) {
        case '1':
          this.maquina.mostrarProductos();
          this.volverAlMenu();
          break;
        case '2':
          this.seleccionarProducto();
          break;
        case '3':
          this.ingresarBillete();
          break;
        case '4':
          console.log('Gracias por usar la máquina expendedora. ¡Hasta luego!');
          this.rl.close();
          break;
        default:
          console.log('Opción inválida. Por favor, selecciona una opción válida.');
          this.volverAlMenu();
          break;
      }
    });
  }
}

// Punto de entrada de la aplicación
const app = new Main();
app.ejecutar();
