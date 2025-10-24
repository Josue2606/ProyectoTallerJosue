/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.empresa;

/**
 *
 * @author ASUS
 */
public class Empleado {
    private char categoria;
    private double horasTrabajadas;
    private int numeroHijos;

    public Empleado(char categoria, double horasTrabajadas, int numeroHijos) {
        this.categoria = Character.toUpperCase(categoria);
        this.horasTrabajadas = horasTrabajadas;
        this.numeroHijos = numeroHijos;
    }

    public double tarifaHoraria() {
        if (categoria == 'A') {
            return 45.0;
        } else if (categoria == 'B') {
            return 37.5;
        } else {
            return 0;
        }
    }

    public double sueldoBasico() {
        return horasTrabajadas * tarifaHoraria();
    }

    public double bonificacionPorHijos() {
        if (numeroHijos <= 3) {
            return numeroHijos * 40.5;
        } else {
            return numeroHijos * 35.0;
        }
    }

    public double sueldoBruto() {
        return sueldoBasico() + bonificacionPorHijos();
    }

    public double descuento() {
        double bruto = sueldoBruto();
        if (bruto >= 3500) {
            return bruto * 0.135;
        } else {
            return bruto * 0.10;
        }
    }

    public double sueldoNeto() {
        return sueldoBruto() - descuento();
    }
}
