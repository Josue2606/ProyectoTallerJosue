package Modelo;

import java.util.ArrayList;
import java.util.List;

public class RepositorioConversiones {
    public static List<Conversion> conversiones = new ArrayList<>();

    public static void guardar(Conversion c) {
        conversiones.add(c);
    }

    public static List<Conversion> obtenerConversiones() {
        return conversiones;
    }

    public static void limpiarConversiones() {
        conversiones.clear();
    }
}