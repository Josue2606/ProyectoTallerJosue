package Modelo;

public class Conversion {
    private double valor;
    private String unidadOrigen;
    private String unidadDestino;
    private double resultado;

    public Conversion(double valor, String unidadOrigen, String unidadDestino, double resultado) {
        this.valor = valor;
        this.unidadOrigen = unidadOrigen;
        this.unidadDestino = unidadDestino;
        this.resultado = resultado;
    }

    @Override
    public String toString() {
        return valor + " " + unidadOrigen + " = " + resultado + " " + unidadDestino;
    }
}