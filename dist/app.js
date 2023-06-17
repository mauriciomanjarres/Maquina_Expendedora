"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaquinaExpendedora_1 = require("./machines/MaquinaExpendedora");
var readline = require("readline");
var Main = /** @class */ (function () {
    function Main() {
        this.maquina = new MaquinaExpendedora_1.MaquinaExpendedora();
    }
    Main.prototype.ejecutar = function () {
        this.mostrarMenu();
        this.leerOpcion();
    };
    Main.prototype.mostrarMenu = function () {
        console.log('\nMi Máquina\n');
        console.log('1. Ver productos');
        console.log('2. Seleccionar');
        console.log('3. Ingresar Billete');
        console.log('4. Salir');
        console.log('\nSelecciona una opción:');
    };
    Main.prototype.leerOpcion = function () {
        var _this = this;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Opción seleccionada: ', function (opcion) {
            switch (opcion) {
                case '1':
                    _this.maquina.mostrarProductos();
                    _this.volverAlMenu();
                    break;
                case '2':
                    _this.seleccionarProducto();
                    break;
                case '3':
                    _this.ingresarBillete();
                    break;
                case '4':
                    console.log('¡Hasta luego!');
                    rl.close();
                    break;
                default:
                    console.log('Opción inválida. Por favor, selecciona una opción válida.');
                    _this.volverAlMenu();
                    break;
            }
        });
    };
    Main.prototype.seleccionarProducto = function () {
        var _this = this;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Ingresa el nombre del producto: ', function (nombreProducto) {
            var productoSeleccionado = _this.maquina.selecionarProducto(nombreProducto);
            if (productoSeleccionado) {
                console.log("Has seleccionado: ".concat(productoSeleccionado.getNombre(), " - Precio: $").concat(productoSeleccionado.getPrecio()));
            }
            else {
                console.log('El producto seleccionado no está disponible o no existe.');
            }
            _this.volverAlMenu();
            rl.close();
        });
    };
    Main.prototype.ingresarBillete = function () {
        var _this = this;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Ingresa el valor del billete: ', function (valorBillete) {
            // Aquí puedes implementar la lógica para ingresar el billete en la máquina
            console.log("Has ingresado un billete de $".concat(valorBillete));
            _this.volverAlMenu();
            rl.close();
        });
    };
    Main.prototype.volverAlMenu = function () {
        var _this = this;
        console.log('\nPresiona cualquier tecla para volver al menú...');
        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.once('data', function () {
            _this.mostrarMenu();
            _this.leerOpcion();
        });
    };
    return Main;
}());
// Punto de entrada de la aplicación
var app = new Main();
app.ejecutar();
