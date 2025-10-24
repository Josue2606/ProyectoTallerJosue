/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.mycompany.empresa03;

import java.util.Scanner;

/**
 *
 * @author ASUS
 */
public class Empresa03 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        
        Scanner tl = new Scanner(System.in);
        System.out.print("Ingrese el turno mañana o noche: ");
        String turno = tl.nextLine();
        System.out.print("Ingrese la cantidad de pasajes: ");
        int cantidad = tl.nextInt();
        
        EmpresaTransportes empresa = new EmpresaTransportes(turno, cantidad);
        empresa.mostrarResultados();
        
        
    }
    
}
