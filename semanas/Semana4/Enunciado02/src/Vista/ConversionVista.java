package Vista;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class ConversionVista extends JFrame {
    private JTextField txtValor = new JTextField();
    private JComboBox<String> cmbOrigen = new JComboBox<>();
    private JComboBox<String> cmbDestino = new JComboBox<>();
    private JButton btnCalcular = new JButton("Calcular");
    private JButton btnGuardarSalir = new JButton("Guardar y Salir");
    private JButton btnEliminarTodo = new JButton("Eliminar Todo");
    private JTextArea txtResultado = new JTextArea(5, 20);
    private JLabel lblRol = new JLabel();

    public ConversionVista() {
        initComponents();
        inicializarElementos();
    }

    private void initComponents() {
        this.setSize(400, 300);
        this.setLayout(new BorderLayout());
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JPanel panelTop = new JPanel(new GridLayout(3, 2));
        panelTop.add(new JLabel("Valor:"));
        panelTop.add(txtValor);
        panelTop.add(new JLabel("Origen:"));
        panelTop.add(cmbOrigen);
        panelTop.add(new JLabel("Destino:"));
        panelTop.add(cmbDestino);
        this.add(panelTop, BorderLayout.NORTH);

        JPanel panelCenter = new JPanel(new BorderLayout());
        txtResultado.setEditable(false);
        panelCenter.add(new JScrollPane(txtResultado), BorderLayout.CENTER);
        this.add(panelCenter, BorderLayout.CENTER);

        JPanel panelBottom = new JPanel();
        panelBottom.add(btnCalcular);
        panelBottom.add(btnGuardarSalir);
        panelBottom.add(btnEliminarTodo);
        panelBottom.add(lblRol);
        this.add(panelBottom, BorderLayout.SOUTH);
    }

    public String getValor() {
        return txtValor.getText().trim();
    }

    public String getUnidadOrigen() {
        return (String) cmbOrigen.getSelectedItem();
    }

    public String getUnidadDestino() {
        return (String) cmbDestino.getSelectedItem();
    }

    public void setResultado(String texto) {
        txtResultado.setText(texto);
    }

    public void setRol(String rol) {
        lblRol.setText("Rol: " + rol);
        if ("PROFESOR".equalsIgnoreCase(rol)) {
            txtValor.setEditable(false);
            btnCalcular.setEnabled(false);
            btnGuardarSalir.setVisible(false);
        } else {
            txtValor.setEditable(true);
            btnCalcular.setEnabled(true);
            btnGuardarSalir.setVisible(true);
        }
    }

    public void agregarCalcularListener(ActionListener listener) {
        btnCalcular.addActionListener(listener);
    }

    public void inicializarElementos() {
        DefaultListCellRenderer listRenderer = new DefaultListCellRenderer();
        listRenderer.setHorizontalAlignment(DefaultListCellRenderer.CENTER);

        cmbOrigen.setRenderer(listRenderer);
        cmbDestino.setRenderer(listRenderer);

        cmbOrigen.removeAllItems();
        cmbDestino.removeAllItems();

        String[] unidades = {"m", "cm", "mm", "km"};
        for (String unidad : unidades) {
            cmbOrigen.addItem(unidad);
            cmbDestino.addItem(unidad);
        }

        cmbOrigen.setSelectedIndex(0);
        cmbDestino.setSelectedIndex(1);
    }

    public void mostrarConversiones(String texto) {
        txtResultado.setText(texto);
    }

    public void agregarGuardarSalirListener(ActionListener listener) {
        btnGuardarSalir.addActionListener(listener);
    }

    public void agregarEliminarListener(ActionListener listener) {
        btnEliminarTodo.addActionListener(listener);
    }
}