/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tienda;

/**
 *
 * @author ASUS
 */
public class descuento {
    private double precioDocena;
    private int cantidadDocenas;

    public descuento(double precioDocena, int cantidadDocenas) {
        this.precioDocena = precioDocena;
        this.cantidadDocenas = cantidadDocenas;
    }

    public double calcularImporte() {
        return precioDocena * cantidadDocenas;
    }

    public double calcularDescuento() {
        double importe = calcularImporte();
        if (cantidadDocenas >= 10) {
            return importe * 0.20;
        } else {
            return importe * 0.10;
        }
    }

    public double calcularImportePagar() {
        return calcularImporte() - calcularDescuento();
    }

    public int calcularLapiceros() {
        if (calcularImportePagar() >= 200) {
            return 2 * cantidadDocenas;
        } else {
            return 0;
        }
    }
}
