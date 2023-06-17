"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MaquinaExpendedora_1 = require("./machines/MaquinaExpendedora");
var readline = require("readline");
var AbstractMain = /** @class */ (function () {
    function AbstractMain() {
        this.maquina = new MaquinaExpendedora_1.MaquinaExpendedora();
        this.maquina.agregarProducto();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    AbstractMain.prototype.ejecutar = function () {
        this.mostrarMenu();
        this.leerOpcion();
    };
    AbstractMain.prototype.mostrarMenu = function () {
        console.log('\nMi Máquina\n');
        console.log('1. Ver productos');
        console.log('2. Seleccionar');
        console.log('3. Ingresar Billete');
        console.log('4. Salir');
        console.log('\nSelecciona una opción:');
    };
    AbstractMain.prototype.mostrarProductosDisponibles = function () {
        var productos = this.maquina.getProductos();
        console.log('\nProductos disponibles:');
        for (var i = 0; i < productos.length; i++) {
            var producto = productos[i];
            console.log("".concat(i + 1, ". ").concat(producto.getNombre(), " - Precio: $").concat(producto.getPrecio(), " - Cantidad: ").concat(producto.getCantidad()));
        }
    };
    AbstractMain.prototype.seleccionarProducto = function () {
        var _this = this;
        this.mostrarProductosDisponibles();
        this.rl.question('Selecciona el número del producto: ', function (numeroProducto) {
            var index = parseInt(numeroProducto) - 1;
            if (index >= 0 && index < _this.maquina.getProductos().length) {
                _this.productoSeleccionado = _this.maquina.getProductos()[index];
                console.log("Has seleccionado: ".concat(_this.productoSeleccionado.getNombre(), " - Precio: $").concat(_this.productoSeleccionado.getPrecio()));
                _this.ingresarBillete();
            }
            else {
                console.log('Número de producto inválido. Por favor, selecciona un número válido.');
                _this.volverAlMenu();
            }
        });
    };
    AbstractMain.prototype.ingresarBillete = function () {
        var _this = this;
        if (!this.productoSeleccionado) {
            console.error('Error: debes seleccionar primero un producto');
            this.volverAlMenu();
            return;
        }
        this.rl.question('Ingresa el valor del billete: ', function (valorBillete) {
            var valorIngresado = parseFloat(valorBillete);
            if (isNaN(valorIngresado) || valorIngresado <= 0) {
                console.log('Valor de billete inválido. Inténtalo de nuevo.');
                _this.ingresarBillete();
                return;
            }
            console.log("Has ingresado un billete de $".concat(valorBillete));
            if (valorIngresado >= _this.productoSeleccionado.getPrecio()) {
                var cambio = valorIngresado - _this.productoSeleccionado.getPrecio();
                console.log("Compra realizada. Producto: ".concat(_this.productoSeleccionado.getNombre(), ". Cambio: $").concat(cambio.toFixed(2)));
                _this.maquina.restarCantidadProducto(_this.productoSeleccionado.getNombre(), 1);
                _this.realizarOperacionAdicional(cambio);
            }
            else {
                console.log('El valor del billete es insuficiente.');
            }
            _this.volverAlMenu();
        });
    };
    AbstractMain.prototype.realizarOperacionAdicional = function (cambio) {
        console.log("Entrega de producto y vuelto: $".concat(cambio.toFixed(2)));
    };
    AbstractMain.prototype.volverAlMenu = function () {
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
    return AbstractMain;
}());
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.leerOpcion = function () {
        var _this = this;
        this.rl.question('Opción seleccionada: ', function (opcion) {
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
                    console.log('Gracias por usar la máquina expendedora. ¡Hasta luego!');
                    _this.rl.close();
                    break;
                default:
                    console.log('Opción inválida. Por favor, selecciona una opción válida.');
                    _this.volverAlMenu();
                    break;
            }
        });
    };
    return Main;
}(AbstractMain));
// Punto de entrada de la aplicación
var app = new Main();
app.ejecutar();
