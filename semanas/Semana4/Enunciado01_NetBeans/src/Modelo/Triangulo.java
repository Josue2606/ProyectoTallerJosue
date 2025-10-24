package Modelo;

public class Triangulo extends Figura {

    public Triangulo(double lado) {
        super(lado);
    }

    @Override
    public double calcularArea() {
        return (Math.sqrt(3) / 4) * lado * lado;
    }

    @Override
    public double calcularPerimetro() {
        return 3 * lado;
    }
}