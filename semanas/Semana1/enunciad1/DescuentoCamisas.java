package com.mycompany.enunciad1;
import java.util.Scanner;

public class DescuentoCamisas {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== SISTEMA DE DESCUENTO DE CAMISAS ===");
        
        // Solicitar datos de entrada
        System.out.print("Ingrese el precio de la camisa: ");
        double precio = scanner.nextDouble();
        
        System.out.print("Ingrese la cantidad de unidades: ");
        int cantidad = scanner.nextInt();
        
        // Calcular importes
        double importeCompra = precio * cantidad;
        double primerDescuento = importeCompra * 0.07;
        double importeDespuesPrimerDesc = importeCompra - primerDescuento;
        double segundoDescuento = importeDespuesPrimerDesc * 0.07;
        double descuentoTotal = primerDescuento + segundoDescuento;
        double importePagar = importeCompra - descuentoTotal;
        
        // Mostrar resultados
        System.out.println("\n=== DETALLE DE LA COMPRA ===");
        System.out.printf("Importe de compra: S/ %.2f%n", importeCompra);
        System.out.printf("Primer descuento (7%%): S/ %.2f%n", primerDescuento);
        System.out.printf("Segundo descuento (7%%): S/ %.2f%n", segundoDescuento);
        System.out.printf("Descuento total: S/ %.2f%n", descuentoTotal);
        System.out.printf("Importe a pagar: S/ %.2f%n", importePagar);
        
        scanner.close();
    }
}
