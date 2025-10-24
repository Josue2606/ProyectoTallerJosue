
package com.mycompany.enunciad2;
import java.util.Scanner;

public class PresupuestoFeria {
    
    // Constantes para los porcentajes de cada rubro
    private static final double PORC_ALQUILER = 0.23;
    private static final double PORC_PUBLICIDAD = 0.07;
    private static final double PORC_TRANSPORTE = 0.26;
    private static final double PORC_SERVICIOS = 0.12;
    private static final double PORC_DECORACION = 0.21;
    private static final double PORC_GASTOS_VARIOS = 0.11;
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== SISTEMA DE PRESUPUESTO PARA FERIA ===");
        
        // Solicitar monto total
        System.out.print("Ingrese el monto total a invertir: ");
        double montoTotal = scanner.nextDouble();
        
        // Calcular montos por rubro
        double alquiler = montoTotal * PORC_ALQUILER;
        double publicidad = montoTotal * PORC_PUBLICIDAD;
        double transporte = montoTotal * PORC_TRANSPORTE;
        double servicios = montoTotal * PORC_SERVICIOS;
        double decoracion = montoTotal * PORC_DECORACION;
        double gastosVarios = montoTotal * PORC_GASTOS_VARIOS;
        
        // Verificar que la suma sea 100%
        double sumaPorcentajes = (PORC_ALQUILER + PORC_PUBLICIDAD + PORC_TRANSPORTE + 
                                 PORC_SERVICIOS + PORC_DECORACION + PORC_GASTOS_VARIOS) * 100;
        
        // Mostrar resultados
        System.out.println("\n=== DISTRIBUCIÓN DEL PRESUPUESTO ===");
        System.out.printf("Monto total: S/ %.2f%n", montoTotal);
        System.out.println("-----------------------------------");
        System.out.printf("Alquiler de espacio (23%%): S/ %.2f%n", alquiler);
        System.out.printf("Publicidad (7%%): S/ %.2f%n", publicidad);
        System.out.printf("Transporte (26%%): S/ %.2f%n", transporte);
        System.out.printf("Servicios feriales (12%%): S/ %.2f%n", servicios);
        System.out.printf("Decoración (21%%): S/ %.2f%n", decoracion);
        System.out.printf("Gastos varios (11%%): S/ %.2f%n", gastosVarios);
        System.out.println("-----------------------------------");
        System.out.printf("Suma de porcentajes: %.0f%%%n", sumaPorcentajes);
        
        scanner.close();
    }
}