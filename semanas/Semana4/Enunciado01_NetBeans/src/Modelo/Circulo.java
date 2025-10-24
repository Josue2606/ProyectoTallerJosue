package Modelo;

public class Circulo extends Figura {

    public Circulo(double radio) {
        super(radio);
    }

    @Override
    public double calcularArea() {
        return Math.PI * lado * lado;
    }

    @Override
    public double calcularPerimetro() {
        return 2 * Math.PI * lado;
    }
}