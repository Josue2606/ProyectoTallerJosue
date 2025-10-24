package Modelo;

public class Cuadrado extends Figura {

    public Cuadrado(double lado) {
        super(lado);
    }

    @Override
    public double calcularArea() {
        return lado * lado;
    }

    @Override
    public double calcularPerimetro() {
        return 4 * lado;
    }
}