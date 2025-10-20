// main.js - Actualizado con semanas 5-8
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación
    initNavigation();
    initWeekCards();
    initWeekOptions();
    
    // Resaltar código si hljs está disponible
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});

// Inicializar sistema de navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Cambiar página activa
    function setActivePage(pageId) {
        // Actualizar navegación
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Actualizar páginas
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Scroll to top cuando cambia de página
        window.scrollTo(0, 0);
    }
    
    // Eventos de clic en enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            setActivePage(pageId);
            
            // Actualizar URL sin recargar la página
            history.pushState(null, null, `#${pageId}`);
        });
    });
    
    // Toggle del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Manejar el botón de retroceso/avance del navegador
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        setActivePage(hash);
    });
    
    // Inicializar página según hash de URL
    const initialPage = window.location.hash.substring(1) || 'inicio';
    setActivePage(initialPage);
}

// Inicializar tarjetas de semana
function initWeekCards() {
    const weekHeaders = document.querySelectorAll('.week-header');
    
    weekHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const weekCard = this.parentElement;
            const isActive = weekCard.classList.contains('active');
            
            // Cerrar todas las tarjetas primero
            document.querySelectorAll('.week-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Abrir la tarjeta clickeada si no estaba activa
            if (!isActive) {
                weekCard.classList.add('active');
            }
        });
    });
}

// Inicializar opciones de semana
function initWeekOptions() {
    const weekOptions = document.querySelectorAll('.week-option');
    
    weekOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir que el evento se propague al header
            const action = this.getAttribute('data-action');
            const week = this.getAttribute('data-week');
            
            handleWeekAction(action, week);
        });
    });
}

// Manejar acciones de las semanas
function handleWeekAction(action, week) {
    switch(action) {
        case 'contenido':
            showWeekContent(week);
            break;
        case 'descargar':
            downloadWeek(week);
            break;
        case 'github':
            openGitHub(week);
            break;
        default:
            console.log('Acción no reconocida:', action);
    }
}

// Mostrar contenido de la semana en modal
function showWeekContent(week) {
    const modal = document.getElementById('contentModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Elementos del modal no encontrados');
        return;
    }
    
    // Obtener contenido según la semana
    const content = getWeekContent(week);
    
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    
    // Inicializar tabs
    initModalTabs();
    
    // Resaltar código si hljs está disponible
    if (typeof hljs !== 'undefined') {
        setTimeout(() => {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }, 100);
    }
    
    modal.style.display = 'flex';
}

// Obtener contenido de la semana
function getWeekContent(week) {
    const weekContents = {
        // Semanas 1-4 existentes...
        
        5: {
            title: `Semana ${week}: Desarrollo de Interfaces Gráficas`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Ejemplos de Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Desarrollo de Interfaces Gráficas con Java Swing</h3>
                    <p>En esta semana nos enfocamos en el desarrollo de interfaces gráficas de usuario utilizando Java Swing, creando componentes visuales para nuestra aplicación de gestión financiera.</p>
                    
                    <h3>Temas Cubiertos</h3>
                    <ul>
                        <li>Fundamentos de Java Swing</li>
                        <li>Diseño de formularios y ventanas</li>
                        <li>Manejo de eventos y listeners</li>
                        <li>Organización de componentes con Layout Managers</li>
                    </ul>
                    
                    <h3>Componentes Desarrollados</h3>
                    <ul>
                        <li>Formulario de registro de usuarios</li>
                        <li>Interfaz de login</li>
                        <li>Ventana principal de la aplicación</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Código de la Semana 5</h3>
                    <p>Ejemplos de implementación de interfaces gráficas:</p>
                    
                    <div class="code-container">
                        <pre><code class="language-java">// Ejemplo de creación de ventana principal
public class MainFrame extends JFrame {
    public MainFrame() {
        setTitle("Aplicación de Gestión Financiera");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        // Configuración de componentes
        initComponents();
    }
    
    private void initComponents() {
        // Implementación de la interfaz
        JPanel mainPanel = new JPanel();
        // ... más código
    }
}</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://docs.oracle.com/javase/tutorial/uiswing/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Tutorial Oficial de Java Swing
                    </a>
                </div>
            `
        },
        6: {
            title: `Semana ${week}: Sistema de Login - Aplicativo NetBeans`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Código del Login</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Sistema de Autenticación y Login</h3>
                    <p>Implementación completa del sistema de login para la aplicación de gestión financiera desarrollada en NetBeans.</p>
                    
                    <h3>Características del Sistema</h3>
                    <ul>
                        <li>Registro de nuevos usuarios</li>
                        <li>Autenticación segura</li>
                        <li>Manejo de sesiones de usuario</li>
                        <li>Interfaz intuitiva y responsive</li>
                    </ul>
                    
                    <h3>Componentes Desarrollados</h3>
                    <ul>
                        <li><strong>LoginFrame</strong> - Ventana de inicio de sesión</li>
                        <li><strong>RegistroFrame</strong> - Formulario de registro</li>
                        <li><strong>DataStore</strong> - Gestión de datos en memoria</li>
                        <li><strong>Usuario</strong> - Modelo de datos de usuario</li>
                    </ul>
                    
                    <h3>Funcionalidades Implementadas</h3>
                    <ul>
                        <li>Validación de credenciales</li>
                        <li>Registro de nuevos usuarios</li>
                        <li>Navegación entre ventanas</li>
                        <li>Manejo de usuario activo</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Código del Sistema de Login</h3>
                    
                    <h4>LoginFrame.java - Ventana Principal de Login</h4>
                    <div class="code-container">
                        <pre><code class="language-java">package vista;

import modelo.DataStore;
import modelo.Usuario;
import javax.swing.*;

public class LoginFrame extends javax.swing.JFrame {
    
    public LoginFrame() {
        initComponents();
    }
    
    private void btnIniciarActionPerformed(java.awt.event.ActionEvent evt) {
        String correo = txtCorreo.getText();
        String contrasena = new String(txtContrasena.getPassword());
        boolean encontrado = false;

        for (Usuario u : DataStore.usuarios) {
            if (u.getCorreo().equals(correo) && u.getContrasena().equals(contrasena)) {
                DataStore.usuarioActivo = u;
                encontrado = true;
                break;
            }
        }

        if (encontrado) {
            JOptionPane.showMessageDialog(this, "Inicio de sesión exitoso");
            new InicioFrame().setVisible(true);
            this.dispose();
        } else {
            JOptionPane.showMessageDialog(this, "Correo o contraseña incorrectos");
        }
    }
    
    private void btnRegistrarActionPerformed(java.awt.event.ActionEvent evt) {
        RegistroFrame registro = new RegistroFrame();
        registro.setVisible(true);
        registro.setLocationRelativeTo(null);
        this.dispose();
    }
}</code></pre>
                    </div>
                    
                    <h4>RegistroFrame.java - Formulario de Registro</h4>
                    <div class="code-container">
                        <pre><code class="language-java">package vista;

import javax.swing.JOptionPane;
import modelo.DataStore;
import modelo.Usuario;

public class RegistroFrame extends javax.swing.JFrame {
    
    private void btnRegistrarActionPerformed(java.awt.event.ActionEvent evt) {
        String nombre = txtNombres.getText();
        String apellido = txtApellidos.getText();
        String correo = txtCorreo.getText();
        String contrasena = new String(txtContrasena.getPassword());

        if (nombre.isEmpty() || apellido.isEmpty() || correo.isEmpty() || contrasena.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Completa todos los campos.");
            return;
        }

        DataStore.usuarios.add(new Usuario(nombre, apellido, correo, contrasena));
        JOptionPane.showMessageDialog(this, "Usuario registrado correctamente.");
        new LoginFrame().setVisible(true);
        this.dispose();
    }
}</code></pre>
                    </div>
                    
                    <h4>Usuario.java - Modelo de Usuario</h4>
                    <div class="code-container">
                        <pre><code class="language-java">package modelo;

public class Usuario {
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasena;
    
    public Usuario(String nombre, String apellido, String correo, String contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
    }
    
    // Getters y Setters
    public String getCorreo() { return correo; }
    public String getContrasena() { return contrasena; }
    // ... otros métodos
}</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://netbeans.apache.org/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Apache NetBeans
                    </a>
                    <a href="https://docs.oracle.com/javase/tutorial/uiswing/components/dialog.html" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Diálogos en Java Swing
                    </a>
                </div>
            `
        },
        // En la función getWeekContent(week), actualiza la semana 7:
        7: {
            title: `Semana ${week}: Base de Datos MySQL - Esquema Completo`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="esquema">Esquema de BD</div>
                    <div class="week-tab" data-tab="consultas">Consultas SQL</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Base de Datos MySQL para Finanzas Personales</h3>
                    <p>Implementación completa del esquema de base de datos MySQL para la aplicación de gestión financiera.</p>
                    
                    <h3>Características de la Base de Datos</h3>
                    <ul>
                        <li><strong>Motor:</strong> MySQL 8.0.43</li>
                        <li><strong>Base de Datos:</strong> finanzas_personales</li>
                        <li><strong>Charset:</strong> utf8mb4</li>
                        <li><strong>Collation:</strong> utf8mb4_0900_ai_ci</li>
                    </ul>
                    
                    <h3>Tablas Implementadas</h3>
                    <ul>
                        <li><strong>usuarios</strong> - Registro de usuarios del sistema</li>
                        <li><strong>finanzas</strong> - Transacciones de ingresos y gastos</li>
                    </ul>
                    
                    <h3>Relaciones</h3>
                    <ul>
                        <li>Clave foránea: finanzas.id_usuario → usuarios.id</li>
                        <li>Relación: Uno a Muchos (Un usuario puede tener múltiples transacciones)</li>
                    </ul>
                </div>
                
                <div id="esquema" class="tab-content">
                    <h3>Script Completo de la Base de Datos</h3>
                    
                    <h4>Creación de la Base de Datos</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">CREATE DATABASE IF NOT EXISTS \`finanzas_personales\` 
        /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ 
        /*!80016 DEFAULT ENCRYPTION='N' */;
        USE \`finanzas_personales\`;</code></pre>
                    </div>
                    
                    <h4>Tabla: usuarios</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">DROP TABLE IF EXISTS \`usuarios\`;
        CREATE TABLE \`usuarios\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`nombre\` varchar(50) DEFAULT NULL,
        \`apellido\` varchar(50) DEFAULT NULL,
        \`correo\` varchar(100) DEFAULT NULL,
        \`contrasena\` varchar(100) DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`correo\` (\`correo\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;</code></pre>
                    </div>
                    
                    <h4>Tabla: finanzas</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">DROP TABLE IF EXISTS \`finanzas\`;
        CREATE TABLE \`finanzas\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`id_usuario\` int DEFAULT NULL,
        \`fecha\` date DEFAULT NULL,
        \`monto\` decimal(10,2) DEFAULT NULL,
        \`categoria\` varchar(50) DEFAULT NULL,
        \`descripcion\` text,
        \`tipo\` enum('Ingreso','Gasto') DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`id_usuario\` (\`id_usuario\`),
        CONSTRAINT \`finanzas_ibfk_1\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuarios\` (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;</code></pre>
                    </div>
                    
                    <h4>Datos de Ejemplo Insertados</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Usuarios de prueba
        INSERT INTO \`usuarios\` VALUES 
        (1,'Jhovany','Atequipa Porta','jhovany@.com','12345'),
        (2,'Stiven Yercy','Bustamante Atequipa','stiven@.com','54321');

        -- Transacciones de prueba
        INSERT INTO \`finanzas\` VALUES 
        (1,1,'2025-10-19',1000.00,'Sueldo','pago mensual','Ingreso'),
        (2,1,'2025-10-19',500.00,'Alimentacion','pollos','Gasto'),
        (3,1,'2025-10-20',1200.00,'Bonos','por fiestas Navideñas','Ingreso'),
        (4,1,'2025-10-21',1000.00,'Entretenimiento','salida familiar','Gasto'),
        (5,2,'2025-10-19',3000.00,'Prestamo','Caja Huancayo','Ingreso'),
        (6,2,'2025-10-19',500.00,'Entretenimiento','Salida en pareja','Gasto');</code></pre>
                    </div>
                </div>
                
                <div id="consultas" class="tab-content">
                    <h3>Consultas SQL para la Aplicación</h3>
                    
                    <h4>1. Autenticación de Usuario</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Verificar credenciales de login
        SELECT id, nombre, apellido, correo 
        FROM usuarios 
        WHERE correo = 'jhovany@.com' AND contrasena = '12345';</code></pre>
                    </div>
                    
                    <h4>2. Registrar Nuevo Usuario</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Insertar nuevo usuario
        INSERT INTO usuarios (nombre, apellido, correo, contrasena) 
        VALUES ('Juan', 'Pérez', 'juan@email.com', 'mi_password');</code></pre>
                    </div>
                    
                    <h4>3. Registrar Nueva Transacción</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Registrar un ingreso
        INSERT INTO finanzas (id_usuario, fecha, monto, categoria, descripcion, tipo) 
        VALUES (1, '2025-10-22', 1500.00, 'Sueldo', 'Pago quincenal', 'Ingreso');

        -- Registrar un gasto
        INSERT INTO finanzas (id_usuario, fecha, monto, categoria, descripcion, tipo) 
        VALUES (1, '2025-10-22', 200.00, 'Transporte', 'Pasajes', 'Gasto');</code></pre>
                    </div>
                    
                    <h4>4. Obtener Resumen Financiero por Usuario</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Total de ingresos y gastos por usuario
        SELECT 
            u.nombre,
            u.apellido,
            COALESCE(SUM(CASE WHEN f.tipo = 'Ingreso' THEN f.monto ELSE 0 END), 0) as total_ingresos,
            COALESCE(SUM(CASE WHEN f.tipo = 'Gasto' THEN f.monto ELSE 0 END), 0) as total_gastos,
            COALESCE(SUM(CASE WHEN f.tipo = 'Ingreso' THEN f.monto ELSE -f.monto END), 0) as saldo
        FROM usuarios u
        LEFT JOIN finanzas f ON u.id = f.id_usuario
        WHERE u.id = 1
        GROUP BY u.id, u.nombre, u.apellido;</code></pre>
                    </div>
                    
                    <h4>5. Obtener Historial de Transacciones</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Historial completo ordenado por fecha
        SELECT 
            f.fecha,
            f.tipo,
            f.categoria,
            f.monto,
            f.descripcion
        FROM finanzas f
        WHERE f.id_usuario = 1
        ORDER BY f.fecha DESC, f.id DESC;</code></pre>
                    </div>
                    
                    <h4>6. Resumen por Categoría</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Gastos agrupados por categoría
        SELECT 
            categoria,
            SUM(monto) as total,
            COUNT(*) as cantidad_transacciones
        FROM finanzas 
        WHERE id_usuario = 1 AND tipo = 'Gasto'
        GROUP BY categoria
        ORDER BY total DESC;</code></pre>
                    </div>
                    
                    <h4>7. Ingresos por Categoría</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Ingresos agrupados por categoría
        SELECT 
            categoria,
            SUM(monto) as total,
            COUNT(*) as cantidad_transacciones
        FROM finanzas 
        WHERE id_usuario = 1 AND tipo = 'Ingreso'
        GROUP BY categoria
        ORDER BY total DESC;</code></pre>
                    </div>
                    
                    <h4>8. Transacciones del Mes Actual</h4>
                    <div class="code-container">
                        <pre><code class="language-sql">-- Transacciones del mes en curso
        SELECT 
            f.fecha,
            f.tipo,
            f.categoria,
            f.monto,
            f.descripcion
        FROM finanzas f
        WHERE f.id_usuario = 1 
            AND YEAR(f.fecha) = YEAR(CURDATE()) 
            AND MONTH(f.fecha) = MONTH(CURDATE())
        ORDER BY f.fecha DESC;</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://dev.mysql.com/doc/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación Oficial de MySQL
                    </a>
                    <a href="https://www.mysqltutorial.org/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> MySQL Tutorial
                    </a>
                    <a href="https://dev.mysql.com/doc/connector-j/8.0/en/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> MySQL Connector/J para Java
                    </a>
                    <a href="https://downloads.mysql.com/archives/c-j/" class="resource-link" target="_blank">
                        <i class="fas fa-download"></i> Descargar MySQL Connector/J
                    </a>
                </div>
            `
        },
        8: {
            title: `Semana ${week}: Código Completo - Aplicación de Gestión Financiera`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Código Completo</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Aplicación Completa de Gestión Financiera</h3>
                    <p>Sistema integral desarrollado en Java Swing para la gestión de finanzas personales.</p>
                    
                    <h3>Módulos Implementados</h3>
                    <ul>
                        <li><strong>Autenticación</strong> - Login y registro de usuarios</li>
                        <li><strong>Gestión de Ingresos</strong> - Registro y consulta de ingresos</li>
                        <li><strong>Gestión de Gastos</strong> - Registro y consulta de gastos</li>
                        <li><strong>Reportes</strong> - Generación de reportes financieros</li>
                        <li><strong>Resumen</strong> - Dashboard con información consolidada</li>
                    </ul>
                    
                    <h3>Tecnologías Utilizadas</h3>
                    <ul>
                        <li>Java SE 8+</li>
                        <li>Java Swing para la interfaz gráfica</li>
                        <li>Arquitectura MVC (Modelo-Vista-Controlador)</li>
                        <li>Almacenamiento en memoria con Collections</li>
                    </ul>
                    
                    <h3>Características Destacadas</h3>
                    <ul>
                        <li>Interfaz intuitiva y fácil de usar</li>
                        <li>Validación de datos en tiempo real</li>
                        <li>Cálculos automáticos de saldos</li>
                        <li>Navegación fluida entre ventanas</li>
                        <li>Manejo seguro de sesiones</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Estructura Completa del Proyecto</h3>
                    
                    <h4>Estructura de Paquetes</h4>
                    <div class="code-container">
                        <pre><code>src/
├── modelo/
│   ├── DataStore.java
│   ├── Usuario.java
│   └── Finanza.java
├── vista/
│   ├── LoginFrame.java
│   ├── RegistroFrame.java
│   ├── InicioFrame.java
│   ├── IngresoFrame.java
│   ├── GastoFrame.java
│   └── ReporteFrame.java
└── controlador/
    └── (Lógica de negocio distribuida)</code></pre>
                    </div>
                    
                    <h4>Flujo Principal de la Aplicación</h4>
                    <div class="code-container">
                        <pre><code class="language-java">// Punto de entrada de la aplicación
public static void main(String[] args) {
    // Configurar look and feel
    try {
        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
    } catch (Exception e) {
        e.printStackTrace();
    }
    
    // Iniciar con la ventana de login
    java.awt.EventQueue.invokeLater(() -> {
        new LoginFrame().setVisible(true);
    });
}

// Flujo de navegación típico:
// 1. LoginFrame → Autenticación
// 2. LoginFrame → RegistroFrame (si el usuario no tiene cuenta)
// 3. LoginFrame → InicioFrame (autenticación exitosa)
// 4. InicioFrame → IngresoFrame/GastoFrame/ReporteFrame
// 5. Cualquier ventana → LoginFrame (al cerrar sesión)</code></pre>
                    </div>
                    
                    <h4>Ejemplo de Navegación entre Ventanas</h4>
                    <div class="code-container">
                        <pre><code class="language-java">// En LoginFrame.java - Navegación al registro
private void btnRegistrarActionPerformed(java.awt.event.ActionEvent evt) {
    RegistroFrame registro = new RegistroFrame();
    registro.setVisible(true);
    registro.setLocationRelativeTo(null);
    this.dispose(); // Cierra la ventana actual
}

// En cualquier ventana - Volver al inicio
private void btnInicioActionPerformed(java.awt.event.ActionEvent evt) {
    InicioFrame inicio = new InicioFrame();
    inicio.setVisible(true);
    inicio.setLocationRelativeTo(null);
    this.dispose();
}

// Cerrar sesión
private void btnCerrarSesionActionPerformed(java.awt.event.ActionEvent evt) {
    DataStore.usuarioActivo = null;
    JOptionPane.showMessageDialog(this, "Has cerrado sesión correctamente.");
    new LoginFrame().setVisible(true);
    this.dispose();
}</code></pre>
                    </div>
                    
                    <h4>Métodos de Utilidad Comunes</h4>
                    <div class="code-container">
                        <pre><code class="language-java">// Validación de formato de fecha
private Date validarFecha(String fechaTexto) {
    try {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        return sdf.parse(fechaTexto);
    } catch (ParseException e) {
        throw new IllegalArgumentException("Formato de fecha inválido. Use dd/MM/yyyy");
    }
}

// Formateo de montos monetarios
private String formatearMoneda(double monto) {
    return String.format("S/ %.2f", monto);
}

// Validación de campos requeridos
private boolean validarCamposRequeridos(JTextField... campos) {
    for (JTextField campo : campos) {
        if (campo.getText().trim().isEmpty()) {
            return false;
        }
    }
    return true;
}</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://docs.oracle.com/javase/8/docs/api/javax/swing/package-summary.html" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Java Swing API Documentation
                    </a>
                    <a href="https://www.oracle.com/java/technologies/javase-downloads.html" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Java SE Downloads
                    </a>
                    <a href="https://netbeans.apache.org/kb/docs/java/quickstart-gui.html" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> NetBeans GUI Builder
                    </a>
                </div>
            `
        }
    };
    
    return weekContents[week] || {
        title: `Semana ${week}`,
        body: `
            <div class="week-tabs">
                <div class="week-tab active" data-tab="presentacion">Presentación</div>
                <div class="week-tab" data-tab="ejemplos">Tu Código</div>
                <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
            </div>
            
            <div id="presentacion" class="tab-content active">
                <p>El contenido para esta semana estará disponible pronto.</p>
            </div>
            
            <div id="ejemplos" class="tab-content">
                <p>Aquí podrás agregar tu código cuando completes las tareas.</p>
            </div>
            
            <div id="referencias" class="tab-content">
                <p>Los enlaces de referencia se agregarán cuando el contenido esté disponible.</p>
            </div>
        `
    };
}

// También necesitas actualizar la función initModalTabs() para manejar 4 pestañas:
function initModalTabs() {
    const tabs = document.querySelectorAll('.week-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todos los tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase active al tab clickeado
            this.classList.add('active');
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Descargar archivo de la semana
function downloadWeek(week) {
    // Simulación de descarga
    alert(`Iniciando descarga de archivos de la semana ${week}`);
    
    // En un entorno real, descomenta la siguiente línea:
    // window.location.href = `archivos/semana${week}.rar`;
}

// Abrir GitHub
function openGitHub(week) {
    // En un entorno real, actualiza con tu URL de GitHub
    const githubUrls = {
        1: 'https://github.com/tuusuario/semana1',
        2: 'https://github.com/tuusuario/semana2',
        3: 'https://github.com/tuusuario/semana3',
        4: 'https://github.com/tuusuario/semana4',
        5: 'https://github.com/tuusuario/semana5',
        6: 'https://github.com/tuusuario/semana6',
        7: 'https://github.com/tuusuario/semana7',
        8: 'https://github.com/tuusuario/semana8'
    };
    
    const url = githubUrls[week] || 'https://github.com';
    window.open(url, '_blank');
}