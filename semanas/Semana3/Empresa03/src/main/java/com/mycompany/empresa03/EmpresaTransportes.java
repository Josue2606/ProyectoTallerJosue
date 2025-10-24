/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.empresa03;

public class EmpresaTransportes {
    private String turno;
    private int cantidadPasajes;
    private double PRECIO_PASAJE = 37.5;
    
    public EmpresaTransportes(String turno, int cantidadPasajes) {
        this.turno = turno;
        this.cantidadPasajes = cantidadPasajes;
    }
    
    public double calcularImporteCompra() {
        return PRECIO_PASAJE * cantidadPasajes;
    }
    
    public double calcularDescuento() {
        double importeCompra = calcularImporteCompra();
        double porcentaje = (cantidadPasajes >= 15) ? 0.08 : 0.05;
        return importeCompra * porcentaje;
    }
    
    public double calcularImportePagar() {
        return calcularImporteCompra() - calcularDescuento();
    }
    
    public int calcularCaramelos() {
        double importePagar = calcularImportePagar();
        if (importePagar > 200) {
            return 2 * cantidadPasajes;
        } else {
            return 0;
        }
    }
    
    public void mostrarResultados() {
        System.out.println("Turno: " + turno);
        System.out.println("Importe de la compra: S/. " + calcularImporteCompra());
        System.out.println("Importe del descuento: S/. " + calcularDescuento());
        System.out.println("Importe a pagar: S/. " + calcularImportePagar());
        System.out.println("Cantidad de caramelos: " + calcularCaramelos());
    }
}