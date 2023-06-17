"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaquinaExpendedora = void 0;
var Producto_1 = require("../models/Producto");
var MaquinaExpendedora = /** @class */ (function () {
    function MaquinaExpendedora() {
        this.productos = [];
    }
    MaquinaExpendedora.prototype.agregarProducto = function () {
        var p1 = new Producto_1.Producto("Gomita", 1000, 12);
        this.productos.push(p1);
        var p2 = new Producto_1.Producto("Coca-Cola", 3000, 24);
        this.productos.push(p2);
        var p3 = new Producto_1.Producto("Pepsi", 2000, 12);
        this.productos.push(p3);
        var p4 = new Producto_1.Producto("Galleta", 1000, 12);
        this.productos.push(p4);
        var p5 = new Producto_1.Producto("Chocolate", 1000, 12);
        this.productos.push(p5);
        var p6 = new Producto_1.Producto("Mecatos", 5000, 24);
        this.productos.push(p6);
    };
    MaquinaExpendedora.prototype.mostrarProductos = function () {
        console.log('Productos disponibles:');
        for (var _i = 0, _a = this.productos; _i < _a.length; _i++) {
            var producto = _a[_i];
            console.log('${producto.getNombre()} - Precio: $${producto.getPrecio} -  Cantidad:${producto.getCantidad()}');
        }
    };
    MaquinaExpendedora.prototype.selecionarProducto = function (nombre) {
        var producto = this.productos.find(function (p) { return p.getNombre() === nombre; });
        if (producto && producto.getCantidad() > 0) {
            producto.restarCantidad();
            return producto;
        }
        return null;
    };
    return MaquinaExpendedora;
}());
exports.MaquinaExpendedora = MaquinaExpendedora;
