package Vista;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CuadradoVista extends javax.swing.JFrame {
    private String figuraSeleccionada;
    private PanelDibujo panelFigura;

    JButton btnCuadrado = new JButton("Cuadrado");
    JButton btnCirculo = new JButton("Círculo");
    JButton btnTriangulo = new JButton("Triángulo");
    JButton btnCalcular = new JButton("Calcular");
    JButton btnNuevo = new JButton("Nuevo");
    JButton btnSalir = new JButton("Salir");
    JTextField txtLado = new JTextField();
    JTextArea txtSalida = new JTextArea();
    JPanel panelSeleccionar = new JPanel();
    JPanel panelDatos = new JPanel();
    JPanel panelCalcular = new JPanel();

    public CuadradoVista() {
        initComponents();
        formulario();
        this.setTitle("Área y Perímetro de Figuras");
        setLocationRelativeTo(null);

        btnCalcular.setEnabled(false);
        btnNuevo.setEnabled(false);

        btnSalir.addActionListener(e -> System.exit(0));

        btnCuadrado.addActionListener(e -> seleccionarFigura("cuadrado"));
        btnCirculo.addActionListener(e -> seleccionarFigura("circulo"));
        btnTriangulo.addActionListener(e -> seleccionarFigura("triangulo"));

        txtLado.addKeyListener(new KeyAdapter() {
            @Override
            public void keyReleased(KeyEvent e) {
                habilitarBotones();
            }

            @Override
            public void keyTyped(KeyEvent evt) {
                char key = evt.getKeyChar();
                if (!Character.isDigit(key) && key != '.') {
                    evt.consume();
                }
            }
        });

        btnNuevo.addActionListener(e -> limpiarCampos());

        btnCalcular.addActionListener(e -> {
            double lado = obtenerLado();
            if (lado <= 0) {
                JOptionPane.showMessageDialog(this, "Ingrese un valor válido mayor que 0", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            double area = 0, perimetro = 0;
            switch (figuraSeleccionada) {
                case "cuadrado":
                    area = lado * lado;
                    perimetro = 4 * lado;
                    break;
                case "circulo":
                    area = Math.PI * lado * lado;
                    perimetro = 2 * Math.PI * lado;
                    break;
                case "triangulo":
                    double altura = Math.sqrt(3) * lado / 2;
                    area = (lado * altura) / 2;
                    perimetro = 3 * lado;
                    break;
            }
            mostrarResultados(area, perimetro);
        });
    }

    private void initComponents() {}

    private void formulario() {
        this.setSize(650, 450);
        this.setLayout(null);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);

        panelSeleccionar.setLayout(null);
        panelSeleccionar.setBounds(20, 20, 200, 150);

        btnCuadrado.setBounds(20, 10, 150, 30);
        btnCirculo.setBounds(20, 50, 150, 30);
        btnTriangulo.setBounds(20, 90, 150, 30);

        panelSeleccionar.add(btnCuadrado);
        panelSeleccionar.add(btnCirculo);
        panelSeleccionar.add(btnTriangulo);

        this.add(panelSeleccionar);

        panelDatos.setLayout(null);
        panelDatos.setBounds(250, 20, 350, 120);
        panelDatos.setVisible(false);

        txtLado.setBounds(10, 10, 100, 25);
        panelDatos.add(txtLado);

        JScrollPane scroll = new JScrollPane(txtSalida);
        scroll.setBounds(10, 50, 300, 60);
        panelDatos.add(scroll);

        this.add(panelDatos);

        panelCalcular.setLayout(null);
        panelCalcular.setBounds(250, 160, 350, 50);
        panelCalcular.setVisible(false);

        btnCalcular.setBounds(10, 10, 100, 30);
        btnNuevo.setBounds(120, 10, 100, 30);
        btnSalir.setBounds(230, 10, 100, 30);

        panelCalcular.add(btnCalcular);
        panelCalcular.add(btnNuevo);
        panelCalcular.add(btnSalir);

        this.add(panelCalcular);

        panelFigura = new PanelDibujo();
        panelFigura.setBounds(20, 220, 580, 180);
        panelFigura.setBackground(Color.LIGHT_GRAY);
        panelFigura.setVisible(false);

        this.add(panelFigura);
    }

    private void seleccionarFigura(String figura) {
        this.figuraSeleccionada = figura;
        panelDatos.setVisible(true);
        panelCalcular.setVisible(true);
        panelFigura.setVisible(true);
        limpiarCampos();
    }

    private void habilitarBotones() {
        boolean habilitar = !txtLado.getText().trim().isEmpty();
        btnCalcular.setEnabled(habilitar);
        btnNuevo.setEnabled(habilitar);
    }

    public double obtenerLado() {
        try {
            return Double.parseDouble(txtLado.getText());
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public void mostrarResultados(double area, double perimetro) {
        txtSalida.setText("Resultados:\n");
        txtSalida.append("Área: " + String.format("%.2f", area) + "\n");
        txtSalida.append("Perímetro: " + String.format("%.2f", perimetro));
        int ladoInt = (int) obtenerLado();
        panelFigura.setFigura(figuraSeleccionada);
        panelFigura.setLado(ladoInt);
    }

    public void limpiarCampos() {
        txtLado.setText("");
        txtSalida.setText("");
        panelFigura.setFigura("");
        panelFigura.setLado(0);
        btnCalcular.setEnabled(false);
        btnNuevo.setEnabled(false);
    }

    public void agregarCalcularListener(ActionListener listener) {
        btnCalcular.addActionListener(listener);
    }

    public void agregarNuevoListener(ActionListener listener) {
        btnNuevo.addActionListener(listener);
    }

    public void agregarSairListener(ActionListener listener) {
        btnSalir.addActionListener(listener);
    }

    private class PanelDibujo extends JPanel {
        private String figura = "";
        private int lado = 0;

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            if (lado <= 0) return;

            switch (figura) {
                case "cuadrado":
                    g.setColor(Color.BLUE);
                    g.fillRect(10, 10, lado, lado);
                    break;
                case "circulo":
                    g.setColor(Color.RED);
                    g.fillOval(10, 10, lado * 2, lado * 2);
                    break;
                case "triangulo":
                    g.setColor(Color.GREEN);
                    int altura = (int) (Math.sqrt(3) * lado / 2);
                    g.fillPolygon(
                        new int[]{10, 10 + lado / 2, 10 + lado},
                        new int[]{10 + altura, 10, 10 + altura},
                        3);
                    break;
            }
        }

        public void setFigura(String f) {
            this.figura = f;
            repaint();
        }

        public void setLado(int l) {
            this.lado = l;
            repaint();
        }
    }

    public String getFiguraSeleccionada() {
        return figuraSeleccionada;
    }
}