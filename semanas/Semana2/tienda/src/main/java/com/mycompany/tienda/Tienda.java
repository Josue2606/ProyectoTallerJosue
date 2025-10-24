/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.tienda;

/**
 *
 * @author ASUS
 */
import java.util.Scanner;

public class Tienda {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double precio;
        while (true) {
            System.out.print("Precio por docena: ");
            precio = sc.nextDouble();
            if (precio >= 0) {
                break;
            }
            System.out.println("El precio no puede ser negativo. Intente de nuevo.");
        }

        int docenas;
        while (true) {
            System.out.print("Cantidad de docenas: ");
            docenas = sc.nextInt();
            if (docenas >= 0) {
                break;
            }
            System.out.println("La cantidad no puede ser negativa. Intente de nuevo.");
        }

        descuento descuento = new descuento(precio, docenas);

        System.out.println("Importe de la compra: S/." + descuento.calcularImporte());
        System.out.println("Descuento: S/." + descuento.calcularDescuento());
        System.out.println("Importe a pagar: S/." + descuento.calcularImportePagar());
        System.out.println("Lapiceros de obsequio: " + descuento.calcularLapiceros());

       
    }
}


