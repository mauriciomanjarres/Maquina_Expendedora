"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaquinaExpendedora = void 0;
var Producto_1 = require("../models/Producto");
var MaquinaExpendedora = /** @class */ (function () {
    function MaquinaExpendedora() {
        this.productos = [];
    }
    MaquinaExpendedora.prototype.getProductos = function () {
        return this.productos;
    };
    MaquinaExpendedora.prototype.agregarProducto = function () {
        this.productos = [];
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
        this.agregarProducto();
        this.productos.forEach(function (producto) {
            console.log("".concat(producto.getNombre(), " - Precio: $").concat(producto.getPrecio(), " -  Cantidad:").concat(producto.getCantidad()));
        });
    };
    MaquinaExpendedora.prototype.selecionarProducto = function (nombre) {
        var producto = this.productos.find(function (p) { return p.getNombre() === nombre; });
        if (producto) {
            return producto;
        }
        return null;
    };
    MaquinaExpendedora.prototype.restarCantidadProducto = function (nombre, cantidad) {
        var producto = this.productos.find(function (p) { return p.getNombre() === nombre; });
        if (producto && producto.getCantidad() >= cantidad) {
            producto.restarCantidad(cantidad);
        }
    };
    return MaquinaExpendedora;
}());
exports.MaquinaExpendedora = MaquinaExpendedora;
