package Vista;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class LoginVista extends JFrame {
    private JTextField txtUsuario = new JTextField();
    private JPasswordField txtPassword = new JPasswordField();
    private JButton btnLogin = new JButton("Login");
    private JLabel lblMensaje = new JLabel();

    public LoginVista() {
        initComponents();
    }

    private void initComponents() {
        this.setSize(300, 200);
        this.setLayout(new GridLayout(4, 2));
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        this.add(new JLabel("Usuario:"));
        this.add(txtUsuario);
        this.add(new JLabel("Password:"));
        this.add(txtPassword);
        this.add(new JLabel(""));
        this.add(btnLogin);
        this.add(lblMensaje);
    }

    public String getUsuario() {
        return txtUsuario.getText().trim();
    }

    public String getPassword() {
        return new String(txtPassword.getPassword());
    }

    public void setMensaje(String mensaje) {
        lblMensaje.setText(mensaje);
    }

    public void agregarLoginListener(ActionListener listener) {
        btnLogin.addActionListener(listener);
    }
}