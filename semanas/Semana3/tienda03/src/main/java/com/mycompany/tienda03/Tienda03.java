/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.mycompany.tienda03;

import java.util.Scanner;

/**
 *
 * @author ASUS
 */
public class Tienda03 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       
        
        Scanner tl = new Scanner(System.in);
        System.out.print("Ingrese el precio por docena: S/. ");
        double precio = tl.nextDouble();
        System.out.print("Ingrese la cantidad de docenas: ");
        int cantidad = tl.nextInt();
        
        TiendaDescuentos tienda = new TiendaDescuentos(precio, cantidad);
        tienda.mostrarResultados();
        
        
        
        
    }
    
}
