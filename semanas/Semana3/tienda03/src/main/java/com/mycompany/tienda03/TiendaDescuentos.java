/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tienda03;

/**
 *
 * @author ASUS
 */
public class TiendaDescuentos {
    private double precioDocena;
    private int cantidadDocenas;
    
    
    public TiendaDescuentos(double precioDocena, int cantidadDocenas) {
        this.precioDocena = precioDocena;
        this.cantidadDocenas = cantidadDocenas;
    }
    
    public double calcularImporteCompra() {
        return precioDocena * cantidadDocenas;
    }
   
    public double calcularDescuento() {
        double importeCompra = calcularImporteCompra();
        double porcentaje = (cantidadDocenas >= 10) ? 0.20 : 0.10;
        return importeCompra * porcentaje;
    } 
 
    public double calcularImportePagar() {
        return calcularImporteCompra() - calcularDescuento();
    }
    
    public int calcularLapiceros() {
        double importePagar = calcularImportePagar();
        if (importePagar >= 200) {
            return 2 * cantidadDocenas;
        } else {
            return 0;
        }
    }

    public void mostrarResultados() {
        System.out.println("Importe de la compra: S/. " + calcularImporteCompra());
        System.out.println("Importe del descuento: S/. " + calcularDescuento());
        System.out.println("Importe a pagar: S/. " + calcularImportePagar());
        System.out.println("Cantidad de lapiceros: " + calcularLapiceros());
    }
}