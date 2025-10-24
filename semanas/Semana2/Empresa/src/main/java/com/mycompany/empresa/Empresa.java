/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.empresa;

/**
 *
 * @author ASUS
 */
import java.util.Scanner;

public class Empresa {
    public static void main(String[] args) {
        Scanner sb = new Scanner(System.in);

        char categoria;
        while (true) {
            System.out.print("Categoria (A o B): ");
            String input = sb.next();
            if (input.length() == 1) {
                categoria = Character.toUpperCase(input.charAt(0));
                if (categoria == 'A' || categoria == 'B') {
                    break;
                }
            }
            System.out.println("Categoria invalida. Por favor ingrese A o B.");
        }

        double horas;
        while (true) {
            System.out.print("Horas trabajadas: ");
            horas = sb.nextDouble();
            if (horas >= 0) {
                break;
            }
            System.out.println("Horas no pueden ser negativas. Intente de nuevo.");
        }

        int hijos;
        while (true) {
            System.out.print("Numero de hijos: ");
            hijos = sb.nextInt();
            if (hijos >= 0) {
                break;
            }
            System.out.println("Numero de hijos no puede ser negativo. Intente de nuevo.");
        }

        Empleado empleado = new Empleado(categoria, horas, hijos);

        System.out.println("Sueldo basico: S/." + empleado.sueldoBasico());
        System.out.println("Bonificacion: S/." + empleado.bonificacionPorHijos());
        System.out.println("Sueldo bruto: S/." + empleado.sueldoBruto());
        System.out.println("Descuento: S/." + empleado.descuento());
        System.out.println("Sueldo neto: S/." + empleado.sueldoNeto());

    }
}
