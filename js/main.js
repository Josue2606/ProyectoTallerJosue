// main.js - Código completo con semanas 1-8
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
        1: {
            title: `Contenido de la Semana 1: Introducción a Git y GitHub`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Ejemplos de Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>¿Qué es Git?</h3>
                    <p>Git es un sistema de control de versiones distribuido que permite gestionar y realizar un seguimiento de los cambios en el código fuente durante el desarrollo de software.</p>
                    
                    <h3>Crear una cuenta en GitHub</h3>
                    <p>GitHub es una plataforma de desarrollo colaborativo que utiliza Git para alojar proyectos. Para crear una cuenta:</p>
                    <ol>
                        <li>Ve a <a href="https://github.com" target="_blank">github.com</a></li>
                        <li>Haz clic en "Sign up"</li>
                        <li>Completa el formulario con tu información</li>
                        <li>Verifica tu dirección de correo electrónico</li>
                    </ol>
                    
                    <h3>Implementación paso a paso</h3>
                    <p>Para implementar Git en tu proyecto:</p>
                    <ol>
                        <li>Instala Git en tu sistema</li>
                        <li>Configura tu nombre y correo: 
                            <div class="code-container">
                                <pre><code>git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"</code></pre>
                            </div>
                        </li>
                        <li>Inicializa un repositorio: 
                            <div class="code-container">
                                <pre><code>git init</code></pre>
                            </div>
                        </li>
                        <li>Añade archivos al staging: 
                            <div class="code-container">
                                <pre><code>git add .</code></pre>
                            </div>
                        </li>
                        <li>Realiza tu primer commit: 
                            <div class="code-container">
                                <pre><code>git commit -m "Primer commit"</code></pre>
                            </div>
                        </li>
                    </ol>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Comandos Básicos de Git</h3>
                    <div class="code-container">
                        <pre><code class="language-bash"># Inicializar repositorio
git init

# Ver estado de los archivos
git status

# Añadir archivos al staging
git add nombre_archivo
git add .

# Realizar commit
git commit -m "Mensaje descriptivo"

# Conectar repositorio local con remoto
git remote add origin https://github.com/usuario/repositorio.git

# Subir cambios al repositorio remoto
git push -u origin main</code></pre>
                    </div>
                    
                    <h3>Configuración de Git</h3>
                    <div class="code-container">
                        <pre><code class="language-bash"># Configurar usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Configurar editor por defecto
git config --global core.editor "code --wait"

# Ver configuración
git config --list</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://git-scm.com/doc" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación Oficial de Git
                    </a>
                    <a href="https://guides.github.com/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Guías de GitHub
                    </a>
                    <a href="https://www.atlassian.com/git/tutorials" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Tutoriales de Git de Atlassian
                    </a>
                    <a href="https://github.com/" class="resource-link" target="_blank">
                        <i class="fab fa-github"></i> Página Principal de GitHub
                    </a>
                </div>
            `
        },
        2: {
            title: `Contenido de la Semana 2: Creación de Repositorio en GitHub`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Ejemplos de Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Crear un Repositorio en GitHub</h3>
                    <p>Un repositorio en GitHub es un espacio donde puedes almacenar tu proyecto. Puede contener carpetas, archivos, imágenes, videos, hojas de cálculo y conjuntos de datos, además del historial de revisiones de cada archivo.</p>
                    
                    <h3>Pasos para crear un repositorio:</h3>
                    <ol>
                        <li>Inicia sesión en tu cuenta de GitHub</li>
                        <li>Haz clic en el icono "+" en la esquina superior derecha y selecciona "New repository"</li>
                        <li>Asigna un nombre a tu repositorio</li>
                        <li>Agrega una descripción (opcional)</li>
                        <li>Elige si será público o privado</li>
                        <li>Inicializa con un README (recomendado para principiantes)</li>
                        <li>Haz clic en "Create repository"</li>
                    </ol>
                    
                    <h3>Estructura básica de un proyecto web</h3>
                    <p>Para un proyecto web básico, tu repositorio debería contener:</p>
                    <ul>
                        <li><strong>index.html</strong> - Archivo principal HTML</li>
                        <li><strong>css/</strong> - Carpeta para archivos CSS</li>
                        <li><strong>js/</strong> - Carpeta para archivos JavaScript</li>
                        <li><strong>images/</strong> - Carpeta para imágenes</li>
                        <li><strong>README.md</strong> - Documentación del proyecto</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Estructura de Archivos HTML, CSS y JS</h3>
                    
                    <h4>Ejemplo de index.html</h4>
                    <div class="code-container">
                        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi Proyecto Web&lt;/title&gt;
    &lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Mi Proyecto&lt;/h1&gt;
        &lt;nav&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href="#inicio"&gt;Inicio&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href="#sobre"&gt;Sobre Mí&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
        &lt;section id="inicio"&gt;
            &lt;h2&gt;Bienvenido&lt;/h2&gt;
            &lt;p&gt;Contenido principal de la página.&lt;/p&gt;
        &lt;/section&gt;
    &lt;/main&gt;
    
    &lt;script src="js/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                    </div>
                    
                    <h4>Ejemplo de styles.css</h4>
                    <div class="code-container">
                        <pre><code class="language-css">/* Variables CSS */
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
}

/* Estilos generales */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
}

header {
    background-color: var(--secondary-color);
    color: white;
    padding: 1rem 0;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
}

/* Responsive */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
    }
}</code></pre>
                    </div>
                    
                    <h4>Ejemplo de main.js</h4>
                    <div class="code-container">
                        <pre><code class="language-javascript">// Navegación suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carga de contenido dinámico
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
});</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://docs.github.com/es/github/creating-cloning-and-archiving-repositories/creating-a-new-repository" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Crear un repositorio - GitHub Docs
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/HTML" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación HTML - MDN
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/CSS" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación CSS - MDN
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación JavaScript - MDN
                    </a>
                </div>
            `
        },
        3: {
            title: `Contenido de la Semana 3: Tu Código Aquí`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Tu Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Semana 3 - Desarrollo de Aplicaciones</h3>
                    <p>En esta semana, trabajaremos en el desarrollo de componentes más avanzados para nuestras aplicaciones web.</p>
                    
                    <h3>Temas Cubiertos</h3>
                    <ul>
                        <li>Patrón Modelo-Vista-Controlador (MVC)</li>
                        <li>Manipulación avanzada del DOM</li>
                        <li>Eventos y manejo de formularios</li>
                        <li>Almacenamiento local (LocalStorage)</li>
                    </ul>
                    
                    <h3>Objetivos de Aprendizaje</h3>
                    <ul>
                        <li>Comprender y aplicar el patrón MVC en proyectos web</li>
                        <li>Implementar funcionalidades interactivas con JavaScript</li>
                        <li>Gestionar el estado de la aplicación</li>
                        <li>Persistir datos en el navegador</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Tu Código de la Semana 3</h3>
                    <p>Aquí puedes agregar el código que desarrollaste durante esta semana:</p>
                    
                    <div class="code-container">
                        <pre><code class="language-javascript">// Espacio para tu código de la semana 3
// Puedes reemplazar este contenido con tu código real

// Ejemplo de estructura MVC básica
class Model {
    constructor() {
        this.data = [];
    }
    
    addItem(item) {
        this.data.push(item);
        this.onDataChanged(this.data);
    }
    
    onDataChanged(data) {
        // Método para notificar cambios
    }
}

class View {
    constructor() {
        this.app = document.getElementById('app');
    }
    
    render(data) {
        this.app.innerHTML = data.map(item => 
            \`&lt;div class="item"&gt;\${item}&lt;/div&gt;\`
        ).join('');
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.model.onDataChanged = (data) => this.view.render(data);
    }
    
    init() {
        // Inicializar la aplicación
    }
}</code></pre>
                    </div>
                    
                    <p><strong>Instrucciones:</strong> Reemplaza el código de ejemplo con tu propio código desarrollado durante la semana.</p>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_Classes" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Clases en JavaScript - MDN
                    </a>
                    <a href="https://es.javascript.info/localstorage" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> LocalStorage - JavaScript.info
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Introducción al DOM - MDN
                    </a>
                </div>
            `
        },
        4: {
            title: `Contenido de la Semana 4: Tu Código Aquí`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Tu Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Semana 4 - Avanzando en el Desarrollo</h3>
                    <p>Continuamos con el desarrollo de 
                    
                    aplicaciones web, enfocándonos en aspectos más avanzados de JavaScript y la interacción con APIs.</p>
                    
                    <h3>Temas Cubiertos</h3>
                    <ul>
                        <li>Promesas y async/await</li>
                        <li>Consumo de APIs REST</li>
                        <li>Manejo de errores</li>
                        <li>Validación de formularios</li>
                    </ul>
                    
                    <h3>Objetivos de Aprendizaje</h3>
                    <ul>
                        <li>Comprender el funcionamiento de las promesas en JavaScript</li>
                        <li>Consumir APIs externas desde una aplicación web</li>
                        <li>Implementar validaciones robustas en formularios</li>
                        <li>Manejar errores de manera efectiva</li>
                    </ul>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Tu Código de la Semana 4</h3>
                    <p>Aquí puedes agregar el código que desarrollaste durante esta semana:</p>
                    
                    <div class="code-container">
                        <pre><code class="language-javascript">// Espacio para tu código de la semana 4
// Puedes reemplazar este contenido con tu código real

// Ejemplo de consumo de API con async/await
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async get(endpoint) {
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`);
            if (!response.ok) {
                throw new Error(\`Error: \${response.status}\`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    
    async post(endpoint, data) {
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(\`Error: \${response.status}\`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    }
}

// Ejemplo de validación de formulario
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = [];
    }
    
    validate() {
        this.errors = [];
        const inputs = this.form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.errors.push(\`El campo \${input.name} es requerido\`);
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return this.errors.length === 0;
    }
    
    showErrors() {
        // Mostrar errores al usuario
    }
}</code></pre>
                    </div>
                    
                    <p><strong>Instrucciones:</strong> Reemplaza el código de ejemplo con tu propio código desarrollado durante la semana.</p>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Promesas en JavaScript - MDN
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> async/await - MDN
                    </a>
                    <a href="https://developer.mozilla.org/es/docs/Web/API/Fetch_API" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Fetch API - MDN
                    </a>
                </div>
            `
        },
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
                </div>
            `
        },

// Reemplaza las semanas 9-15 con este contenido:

9: {
    title: `Semana ${week}: Diseño de la Interfaz Web`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Prototipos Figma</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Diseño UX/UI del Sistema de Gestión de Tesis</h3>
            <p>Diseño completo de la experiencia de usuario e interfaces para el sistema de gestión académica de tesis.</p>
            
            <h3>Objetivos del Diseño</h3>
            <ul>
                <li>Crear una interfaz intuitiva para 4 roles diferentes (Admin, Docente, Jurado, Estudiante)</li>
                <li>Establecer flujos de trabajo claros para el proceso de revisión de tesis</li>
                <li>Diseñar un sistema de notificaciones efectivo</li>
                <li>Crear dashboards específicos para cada tipo de usuario</li>
            </ul>
            
            <h3>Características del Diseño</h3>
            <ul>
                <li>Paleta de colores institucional (azul académico)</li>
                <li>Diseño responsivo para diferentes dispositivos</li>
                <li>Prototipos navegables con interacciones</li>
                <li>Wireframes de baja y alta fidelidad</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Prototipos en Figma</h3>
            <div class="alert alert-info">
                <i class="fas fa-external-link-alt"></i> Los prototipos completos están disponibles en Figma.
                <br>
                <strong>Estado del proyecto:</strong> En desarrollo - Fase de diseño inicial
            </div>
            
            <h4>Acceso a los Prototipos</h4>
            <div class="code-container">
                <pre><code class="language-markdown"># Enlace al proyecto Figma
https://www.figma.com/file/[TU_ID_DEL_PROYECTO]/Gestión-de-Tesis-Universitarias

# Credenciales de acceso (si aplica)
Usuario: ejemplo@universidad.edu
Contraseña: prototipo2024

# Estructura del proyecto Figma:
1. Login y Autenticación
2. Dashboard Administrativo
3. Panel del Docente/Asesor
4. Interfaz del Jurado
5. Portal del Estudiante
6. Sistema de Notificaciones
7. Flujo de Revisión Completo</code></pre>
            </div>
            
            <div class="text-center mt-4">
                <a href="https://www.figma.com/" target="_blank" class="btn btn-primary">
                    <i class="fab fa-figma"></i> Ver Prototipos en Figma
                </a>
                <p class="text-muted small mt-2">El proyecto está en desarrollo. Haz clic para ver los avances.</p>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos de Diseño UX/UI</h3>
            <a href="https://www.figma.com/community" class="resource-link" target="_blank">
                <i class="fab fa-figma"></i> Figma Community
            </a>
            <a href="https://material.io/design" class="resource-link" target="_blank">
                <i class="fas fa-palette"></i> Material Design
            </a>
        </div>
    `
},

10: {
    title: `Semana ${week}: Desarrollo de Interfaces JSP`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Código JSP</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Implementación de Interfaces Web con JSP</h3>
            <p>Desarrollo de las vistas JSP basadas en los diseños de Figma para cada rol del sistema.</p>
            
            <h3>Páginas Desarrolladas</h3>
            <ul>
                <li><strong>login.jsp</strong> - Autenticación de usuarios</li>
                <li><strong>admin.jsp</strong> - Panel de administración completo</li>
                <li><strong>docente.jsp</strong> - Interfaz para docentes (asesores y jurados)</li>
                <li><strong>alumno.jsp</strong> - Portal para estudiantes</li>
            </ul>
            
            <h3>Tecnologías Utilizadas</h3>
            <ul>
                <li>JSP (JavaServer Pages) con JSTL</li>
                <li>Bootstrap 5 para diseño responsivo</li>
                <li>JavaScript para interactividad</li>
                <li>AJAX para actualizaciones dinámicas</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Implementación de Vistas JSP</h3>
            
            <h4>Estructura de Archivos en GitHub</h4>
            <div class="code-container">
                <pre><code class="language-markdown">ProyectoTallerJosue/
└── FinalProyecto-1.0-SNAPSHOT/
    └── Web Pages/
        ├── admin.jsp            # Panel administrativo
        ├── alumno.jsp           # Portal estudiante
        ├── docente.jsp          # Panel docente/jurado
        └── login.jsp            # Página de autenticación</code></pre>
            </div>
            
            <h4>Ejemplo de login.jsp</h4>
            <div class="code-container">
                <pre><code class="language-jsp">&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Acceso Institucional - Gestión de Tesis&lt;/title&gt;
    &lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;
    &lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;div class="row justify-content-center mt-5"&gt;
            &lt;div class="col-md-6"&gt;
                &lt;div class="card shadow"&gt;
                    &lt;div class="card-body"&gt;
                        &lt;h3 class="text-center mb-4"&gt;&lt;i class="bi bi-mortarboard"&gt;&lt;/i&gt; Sistema de Tesis&lt;/h3&gt;
                        
                        &lt;% if (request.getParameter("error") != null) { %&gt;
                            &lt;div class="alert alert-danger"&gt;
                                &lt;%= request.getParameter("error") %&gt;
                            &lt;/div&gt;
                        &lt;% } %&gt;
                        
                        &lt;form action="LoginServlet" method="POST"&gt;
                            &lt;div class="mb-3"&gt;
                                &lt;input type="text" name="loginId" class="form-control" 
                                       placeholder="Código / DNI / Email" required&gt;
                            &lt;/div&gt;
                            &lt;div class="mb-3"&gt;
                                &lt;input type="password" name="loginPassword" class="form-control" 
                                       placeholder="Contraseña" required&gt;
                            &lt;/div&gt;
                            &lt;button type="submit" class="btn btn-primary w-100"&gt;
                                Ingresar
                            &lt;/button&gt;
                        &lt;/form&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>
            
            <h4>Vista en GitHub</h4>
            <div class="text-center mt-4">
                <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana10/Codigos"
                   target="_blank" class="btn btn-success">
                    <i class="fab fa-github"></i> Ver Interfaces JSP en GitHub
                </a>
                <p class="text-muted small mt-2">Revisa el código completo de todas las vistas</p>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos JSP y Bootstrap</h3>
            <a href="https://docs.oracle.com/javaee/5/tutorial/doc/bnagx.html" class="resource-link" target="_blank">
                <i class="fas fa-book"></i> Oracle JSP Tutorial
            </a>
            <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" class="resource-link" target="_blank">
                <i class="fab fa-bootstrap"></i> Bootstrap 5 Documentation
            </a>
        </div>
    `
},

11: {
    title: `Semana ${week}: Modelos de Datos Java`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Modelos Java</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Modelado de Entidades del Sistema</h3>
            <p>Implementación de las clases modelo que representan las entidades principales del sistema de gestión de tesis.</p>
            
            <h3>Entidades Principales</h3>
            <ul>
                <li><strong>Usuario</strong> - Clase base para autenticación</li>
                <li><strong>Admin</strong> - Administrador del sistema</li>
                <li><strong>Docente</strong> - Asesor o miembro de jurado</li>
                <li><strong>Alumno</strong> - Estudiante con proyecto de tesis</li>
                <li><strong>Tesis</strong> - Proyecto de investigación</li>
                <li><strong>HistorialRevision</strong> - Seguimiento de versiones</li>
                <li><strong>Notificacion</strong> - Sistema de alertas</li>
            </ul>
            
            <h3>Características de los Modelos</h3>
            <ul>
                <li>JavaBeans (POJOs) con getters y setters</li>
                <li>Mapeo 1:1 con tablas de base de datos</li>
                <li>Validación de datos básica</li>
                <li>Relaciones entre entidades</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Implementación de Modelos</h3>
            
            <h4>Estructura de Paquetes</h4>
            <div class="code-container">
                <pre><code class="language-markdown">src/
└── com.gestortes.modelo/
    ├── Admin.java
    ├── Alumno.java
    ├── Docente.java
    ├── HistorialRevision.java
    ├── Notificacion.java
    ├── Tesis.java
    └── Usuario.java</code></pre>
            </div>
            
            <h4>Ejemplo: Modelo Tesis</h4>
            <div class="code-container">
                <pre><code class="language-java">package com.gestortes.modelo;

import java.sql.Timestamp;
import java.sql.Date;

public class Tesis {
    private int id;
    private String titulo;
    private String descripcion;
    private String archivoActualUrl;
    private String estado;
    private Timestamp fechaUltimaModificacion;
    private Date fechaLimite;
    
    private String nombreAlumno;
    private String nombreDocente;
    private int alumnoId;
    private int docenteId;

    // Constructores
    public Tesis() {}

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Date getFechaLimite() { return fechaLimite; }
    public void setFechaLimite(Date fechaLimite) { this.fechaLimite = fechaLimite; }

    // ... más getters y setters
}</code></pre>
            </div>
            
            <h4>Ejemplo: Modelo HistorialRevision</h4>
            <div class="code-container">
                <pre><code class="language-java">package com.gestortes.modelo;

import java.sql.Timestamp;

public class HistorialRevision {
    private int id;
    private int tesisId;
    private int numeroVersion;
    private String archivoUrl;
    private String comentariosDocente;
    private String estadoVersion;
    private Timestamp fechaSubida;
    private double puntajeTotal;
    private String detalleRubrica;

    // Getters y Setters para rúbrica
    public double getPuntajeTotal() { return puntajeTotal; }
    public void setPuntajeTotal(double puntajeTotal) { this.puntajeTotal = puntajeTotal; }
    
    public String getDetalleRubrica() { return detalleRubrica; }
    public void setDetalleRubrica(String detalleRubrica) { this.detalleRubrica = detalleRubrica; }
}</code></pre>
            </div>
            
            <h4>Acceso a GitHub</h4>
            <div class="text-center mt-4">
                <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana11/Modelo"
                   target="_blank" class="btn btn-success">
                    <i class="fab fa-github"></i> Ver Modelos en GitHub
                </a>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos de Modelado</h3>
            <a href="https://www.oracle.com/java/technologies/javase/javabeans-spec.html" class="resource-link" target="_blank">
                <i class="fas fa-coffee"></i> JavaBeans Specification
            </a>
            <a href="https://en.wikipedia.org/wiki/Plain_old_Java_object" class="resource-link" target="_blank">
                <i class="fas fa-cube"></i> POJO Pattern
            </a>
        </div>
    `
},

12: {
    title: `Semana ${week}: Controladores y Servlets`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Servlets Java</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Lógica de Control con Servlets</h3>
            <p>Implementación de la capa de controladores que maneja las peticiones HTTP y coordina el flujo de la aplicación.</p>
            
            <h3>Servlets Implementados</h3>
            <ul>
                <li><strong>LoginServlet</strong> - Autenticación y recuperación de contraseña</li>
                <li><strong>AdminController</strong> - Gestión completa del administrador</li>
                <li><strong>DocenteController</strong> - Evaluaciones y revisiones</li>
                <li><strong>AlumnoController</strong> - Subida de archivos y seguimiento</li>
                <li><strong>DescargaServlet</strong> - Gestión de descargas seguras</li>
                <li><strong>LogoutServlet</strong> - Cierre de sesión</li>
            </ul>
            
            <h3>Características</h3>
            <ul>
                <li>Manejo de sesiones HTTP</li>
                <li>Validación de roles y permisos</li>
                <li>Upload de archivos PDF</li>
                <li>Comunicación AJAX para actualizaciones dinámicas</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Implementación de Servlets</h3>
            
            <h4>Estructura de Controladores</h4>
            <div class="code-container">
                <pre><code class="language-markdown">src/
└── com.gestortes.servlets/
    ├── AdminController.java      # CRUD completo
    ├── AlumnoController.java     # Gestión estudiante
    ├── DescargaServlet.java      # Descarga archivos
    ├── DocenteController.java    # Evaluación tesis
    ├── LoginServlet.java         # Autenticación
    └── LogoutServlet.java        # Cierre sesión</code></pre>
            </div>
            
            <h4>Ejemplo: LoginServlet</h4>
            <div class="code-container">
                <pre><code class="language-java">package com.gestortes.servlets;

import com.gestortes.dao.UsuarioDAO;
import com.gestortes.modelo.Usuario;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String loginId = request.getParameter("loginId");
        String loginPass = request.getParameter("loginPassword");
        
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        Usuario usuario = usuarioDAO.validarUsuario(loginId, loginPass);

        if (usuario != null) {
            HttpSession session = request.getSession(true);
            session.setAttribute("usuarioId", usuario.getId());
            session.setAttribute("nombre", usuario.getNombre());
            session.setAttribute("rol", usuario.getRol());
            
            // Redirigir según rol
            switch (usuario.getRol()) {
                case "admin": response.sendRedirect("AdminController"); break;
                case "docente": response.sendRedirect("DocenteController"); break;
                case "estudiante": response.sendRedirect("AlumnoController"); break;
            }
        } else {
            response.sendRedirect("login.jsp?error=Credenciales incorrectas");
        }
    }
}</code></pre>
            </div>
            
            <h4>Ejemplo: AdminController (Manejo de archivos)</h4>
            <div class="code-container">
                <pre><code class="language-java">@WebServlet("/AdminController")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024 * 2,
    maxFileSize = 1024 * 1024 * 50,
    maxRequestSize = 1024 * 1024 * 100
)
public class AdminController extends HttpServlet {
    
    private static final String UPLOAD_DIR = "C:\\arred";
    
    private String guardarArchivo(Part filePart) throws IOException {
        if (filePart != null && filePart.getSize() > 0) {
            String fileName = System.currentTimeMillis() + "_" + 
                Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
            filePart.write(UPLOAD_DIR + File.separator + fileName);
            return fileName;
        }
        return null;
    }
}</code></pre>
            </div>
            
            <h4>Acceso a GitHub</h4>
            <div class="text-center mt-4">
                <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana1/Controlador"
                   target="_blank" class="btn btn-success">
                    <i class="fab fa-github"></i> Ver Servlets en GitHub
                </a>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos Servlet</h3>
            <a href="https://jakarta.ee/specifications/servlet/" class="resource-link" target="_blank">
                <i class="fas fa-server"></i> Jakarta Servlet Specification
            </a>
        </div>
    `
},

13: {
    title: `Semana ${week}: Base de Datos MySQL`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">SQL y Conexión</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Base de Datos y Conexión JDBC</h3>
            <p>Diseño e implementación de la base de datos MySQL y la capa de conexión JDBC para el sistema de gestión de tesis.</p>
            
            <h3>Componentes de Base de Datos</h3>
            <ul>
                <li><strong>MySQL Workbench</strong> - Diseño del modelo entidad-relación</li>
                <li><strong>Scripts SQL</strong> - Creación de tablas y datos iniciales</li>
                <li><strong>ConexionDB.java</strong> - Clase de utilidad para conexiones JDBC</li>
                <li><strong>Vistas SQL</strong> - Para consultas complejas (vista_login_usuarios)</li>
            </ul>
            
            <h3>Tablas Principales</h3>
            <ul>
                <li>administradores, docentes, alumnos</li>
                <li>tesis (proyectos de investigación)</li>
                <li>historial_revisiones (seguimiento de versiones)</li>
                <li>notificaciones (sistema de alertas)</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Implementación de Base de Datos</h3>
            
            <h4>Conexión JDBC</h4>
            <div class="code-container">
                <pre><code class="language-java">package com.gestortes.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    private static final String JDBC_URL = 
        "jdbc:mysql://localhost:3306/gestion_tesis_db?useSSL=false&serverTimezone=UTC";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASS = "admin";
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Error al cargar el driver", e);
        }
        return DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
    }
}</code></pre>
            </div>
            
            <h4>Ejemplo de Script SQL</h4>
            <div class="code-container">
                <pre><code class="language-sql">-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS gestion_tesis_db;
USE gestion_tesis_db;

-- Tabla de administradores
CREATE TABLE administradores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Tabla de tesis con rúbrica
CREATE TABLE tesis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    alumno_id INT NOT NULL,
    docente_id INT NOT NULL,
    estado ENUM('Asignado', 'En Revisión', 'Observado', 'Aprobado', 'Rechazado'),
    fecha_limite DATE,
    archivo_actual_url VARCHAR(255),
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (docente_id) REFERENCES docentes(id)
);

-- Vista para login unificado
CREATE VIEW vista_login_usuarios AS
SELECT id, nombre, email, 'admin' as rol, email as codigo_usuario, password 
FROM administradores
UNION
SELECT id, nombre, email, 'docente' as rol, dni as codigo_usuario, password 
FROM docentes
UNION
SELECT id, nombre, email, 'estudiante' as rol, codigo as codigo_usuario, password 
FROM alumnos;</code></pre>
            </div>
            
            <h4>Acceso a GitHub</h4>
            <div class="text-center mt-4">
                <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana13" 
                   target="_blank" class="btn btn-success">
                    <i class="fab fa-github"></i> Ver Conexión JDBC en GitHub
                </a>
                <p class="text-muted small mt-2">Incluye scripts SQL completos</p>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos MySQL y JDBC</h3>
            <a href="https://dev.mysql.com/doc/" class="resource-link" target="_blank">
                <i class="fas fa-database"></i> MySQL Documentation
            </a>
            <a href="https://docs.oracle.com/javase/tutorial/jdbc/" class="resource-link" target="_blank">
                <i class="fas fa-plug"></i> JDBC Tutorial
            </a>
        </div>
    `
},

14: {
    title: `Semana ${week}: Sistema de Reportes y Análisis`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Reportes</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Reportes y Análisis del Sistema</h3>
            <p>Implementación de funcionalidades de reporting y análisis de datos para la toma de decisiones académicas.</p>
            
            <h3>Tipos de Reportes Implementados</h3>
            <ul>
                <li><strong>Reportes Administrativos</strong> - Estadísticas generales del sistema</li>
                <li><strong>Reportes por Docente</strong> - Carga lectiva y desempeño</li>
                <li><strong>Reportes de Tesis</strong> - Estados, tiempos de revisión, aprobaciones</li>
                <li><strong>Actas de Evaluación</strong> - Documentos formales para impresión</li>
                <li><strong>Exportación a Excel/CSV</strong> - Para análisis externo</li>
            </ul>
            
            <h3>Métricas Clave</h3>
            <ul>
                <li>Tasa de aprobación por docente/área</li>
                <li>Tiempo promedio de revisión</li>
                <li>Distribución de estados de tesis</li>
                <li>Seguimiento de plazos y fechas límite</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Implementación de Reportes</h3>
            
            <h4>Dashboard Administrativo</h4>
            <div class="code-container">
                <pre><code class="language-java">// En AdminController.java - Método de estadísticas
private void cargarListas(HttpServletRequest request, HttpServletResponse response) {
    List<Tesis> listaTesis = new TesisDAO().listarTesisView();
    
    // Cálculo de estadísticas
    double total = listaTesis.size();
    long countAprobados = listaTesis.stream()
        .filter(t -> "Aprobado".equalsIgnoreCase(t.getEstado()))
        .count();
    
    long countObservados = listaTesis.stream()
        .filter(t -> "Observado".equalsIgnoreCase(t.getEstado()))
        .count();
    
    int pctAprob = (total > 0) ? (int)((countAprobados / total) * 100) : 0;
    int pctObs = (total > 0) ? (int)((countObservados / total) * 100) : 0;
    
    // Pasar estadísticas a la vista
    request.setAttribute("statsTotalTesis", (int)total);
    request.setAttribute("statsAprobados", countAprobados);
    request.setAttribute("pctAprob", pctAprob);
    request.setAttribute("pctObs", pctObs);
}</code></pre>
            </div>
            
            <h4>Exportación a CSV/Excel</h4>
            <div class="code-container">
                <pre><code class="language-javascript">// En admin.jsp - Exportación JavaScript
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let csvContent = [];
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        let rowData = [];
        cols.forEach((col, index) => {
            if (index < cols.length - 1) { // Ignorar columna acciones
                let text = col.innerText.replace(/(\r\n|\n|\r)/gm, " ")
                                        .replace(/"/g, '""');
                rowData.push('"' + text + '"');
            }
        });
        csvContent.push(rowData.join(","));
    });
    
    const csvFile = new Blob([csvContent.join("\n")], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.click();
}</code></pre>
            </div>
            
            <h4>Acta de Evaluación (HTML para impresión)</h4>
            <div class="code-container">
                <pre><code class="language-java">// En DocenteController.java - Generación de acta
private void generarActaAjax(HttpServletRequest request, HttpServletResponse response) {
    int tesisId = Integer.parseInt(request.getParameter("tesisId"));
    TesisDAO dao = new TesisDAO();
    Tesis tesis = dao.buscarPorId(tesisId);
    
    // Generar HTML formateado para impresión
    out.println("<div class='p-5' style='font-family: \"Times New Roman\", serif;'>");
    out.println("<h3 class='text-center'>ACTA DE EVALUACIÓN DE TESIS</h3>");
    out.println("<p><strong>Título:</strong> " + tesis.getTitulo() + "</p>");
    out.println("<p><strong>Estudiante:</strong> " + tesis.getNombreAlumno() + "</p>");
    out.println("<p><strong>Docente Revisor:</strong> " + tesis.getNombreDocente() + "</p>");
    out.println("<div class='text-center no-print'>");
    out.println("<button onclick='window.print()' class='btn btn-dark'>");
    out.println("<i class='bi bi-printer'></i> Imprimir Acta");
    out.println("</button></div>");
    out.println("</div>");
}</code></pre>
            </div>
            
            <h4>Ideas Adicionales para Reportes</h4>
            <div class="alert alert-info">
                <h5><i class="fas fa-lightbulb"></i> Reportes que podrías implementar:</h5>
                <ul>
                    <li><strong>Reporte de Plazos Vencidos</strong> - Alertas automáticas por email</li>
                    <li><strong>Gráficos de Progreso</strong> - Chart.js para visualización</li>
                    <li><strong>Reporte de Productividad por Docente</strong> - Tesis revisadas por periodo</li>
                    <li><strong>Estadísticas por Facultad/Departamento</strong> - Análisis institucional</li>
                    <li><strong>Reporte de Calidad</strong> - Puntajes promedio de rúbrica</li>
                </ul>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos de Reporting</h3>
            <a href="https://www.chartjs.org/" class="resource-link" target="_blank">
                <i class="fas fa-chart-bar"></i> Chart.js - Gráficos JavaScript
            </a>
            <a href="https://github.com/SheetJS/sheetjs" class="resource-link" target="_blank">
                <i class="fas fa-file-excel"></i> SheetJS - Excel en JavaScript
            </a>
        </div>
    `
},

15: {
    title: `Semana ${week}: Proyecto Final Integrado`,
    body: `
        <div class="week-tabs">
            <div class="week-tab active" data-tab="presentacion">Presentación</div>
            <div class="week-tab" data-tab="ejemplos">Proyecto Completo</div>
            <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
        </div>
        
        <div id="presentacion" class="tab-content active">
            <h3>Sistema Completo de Gestión de Tesis</h3>
            <p>Integración final de todos los módulos desarrollados en un sistema funcional para la gestión del proceso de tesis universitarias.</p>
            
            <h3>Características Principales</h3>
            <ul>
                <li><strong>Cuatro Roles Complejos</strong> - Admin, Docente/Asesor, Jurado, Estudiante</li>
                <li><strong>Flujo de Trabajo Definido</strong> - Asignación → Revisión → Evaluación → Aprobación</li>
                <li><strong>Sistema de Rúbrica</strong> - 38 criterios de evaluación con puntuación</li>
                <li><strong>Gestión de Documentos</strong> - Upload, versionado y descarga segura de PDF</li>
                <li><strong>Sistema de Notificaciones</strong> - Alertas en tiempo real para todos los usuarios</li>
                <li><strong>Reportes y Dashboard</strong> - Análisis y estadísticas del sistema</li>
            </ul>
            
            <h3>Tecnologías Integradas</h3>
            <ul>
                <li>Frontend: JSP, Bootstrap 5, JavaScript, AJAX</li>
                <li>Backend: Java Servlets, JDBC, DAO Pattern</li>
                <li>Base de Datos: MySQL 8.0</li>
                <li>Servidor: Apache Tomcat 10+</li>
                <li>Herramientas: NetBeans, MySQL Workbench, Figma</li>
            </ul>
        </div>
        
        <div id="ejemplos" class="tab-content">
            <h3>Proyecto Final - Estructura Completa</h3>
            
            <h4>Arquitectura del Sistema</h4>
            <div class="code-container">
                <pre><code class="language-markdown">ProyectoTallerJosue/
├── FinalProyecto-1.0-SNAPSHOT/
│   ├── Web Pages/                  # Vistas JSP
│   │   ├── login.jsp
│   │   ├── admin.jsp
│   │   ├── docente.jsp
│   │   └── alumno.jsp
│   ├── src/
│   │   ├── com.gestortes.conexion/ # Conexión BD
│   │   │   └── ConexionDB.java
│   │   ├── com.gestortes.dao/      # Data Access Objects
│   │   │   ├── AdminDAO.java
│   │   │   ├── AlumnoDAO.java
│   │   │   ├── DocenteDAO.java
│   │   │   ├── NotificacionDAO.java
│   │   │   ├── TesisDAO.java
│   │   │   └── UsuarioDAO.java
│   │   ├── com.gestortes.modelo/   # Modelos/Entidades
│   │   │   ├── Admin.java
│   │   │   ├── Alumno.java
│   │   │   ├── Docente.java
│   │   │   ├── HistorialRevision.java
│   │   │   ├── Notificacion.java
│   │   │   ├── Tesis.java
│   │   │   └── Usuario.java
│   │   └── com.gestortes.servlets/ # Controladores
│   │       ├── AdminController.java
│   │       ├── AlumnoController.java
│   │       ├── DescargaServlet.java
│   │       ├── DocenteController.java
│   │       ├── LoginServlet.java
│   │       └── LogoutServlet.java
│   ├── web/
│   │   ├── WEB-INF/
│   │   └── META-INF/
│   └── build/                      # Archivos compilados
├── database/                       # Scripts SQL
│   ├── schema.sql                  # Estructura de BD
│   └── data.sql                    # Datos iniciales
├── docs/                           # Documentación
│   ├── ManualUsuario.md
│   ├── ManualTecnico.md
│   └── Diagramas/
├── README.md                       # Documentación principal
└── .gitignore</code></pre>
            </div>
            
            <h4>Main Application - Punto de Entrada</h4>
            <div class="code-container">
                <pre><code class="language-java">/*
 * Sistema de Gestión de Tesis Universitarias
 * Universidad: UPLA
 * Curso: Taller VII
 * Desarrollador: Josue Anthony Arredondo Condor
 * Año: 2024
 * 
 * Arquitectura MVC con Java EE
 * - Capa Vista: JSP + Bootstrap
 * - Capa Controlador: Servlets
 * - Capa Modelo: JavaBeans + DAO Pattern
 * - Base de Datos: MySQL + JDBC
 */

// El sistema se despliega en Apache Tomcat
// URL de acceso: http://localhost:8080/ProyectoTallerJosue/</code></pre>
            </div>
            
            <h4>Flujo de Trabajo del Sistema</h4>
            <div class="code-container">
                <pre><code class="language-markdown">1. ADMINISTRADOR
   ├── Crea usuarios (docentes, estudiantes)
   ├── Asigna tesis a estudiantes
   ├── Monitorea progreso general
   └── Genera reportes institucionales

2. ESTUDIANTE
   ├── Sube versiones de su tesis
   ├── Recibe feedback del asesor
   ├── Consulta calificaciones
   └── Sigue plazos establecidos

3. DOCENTE/ASESOR
   ├── Revisa tesis asignadas
   ├── Aplica rúbrica de 38 puntos
   ├── Proporciona feedback detallado
   ├── Establece plazos de corrección
   └── Aprueba/observa/rechaza

4. JURADO
   ├── Evalúa tesis finales
   ├── Asigna calificación final
   └── Genera actas de evaluación</code></pre>
            </div>
            
            <h4>Acceso al Proyecto Completo</h4>
            <div class="text-center mt-4">
                <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana15/FinalProyecto-Completo"
                   target="_blank" class="btn btn-success btn-lg">
                    <i class="fab fa-github"></i> Repositorio Completo en GitHub
                </a>
                <p class="mt-3">
                    <strong>Instrucciones de despliegue:</strong>
                    <br>
                    1. Clonar repositorio<br>
                    2. Importar en NetBeans como proyecto web<br>
                    3. Ejecutar scripts SQL en MySQL Workbench<br>
                    4. Configurar conexión en ConexionDB.java<br>
                    5. Desplegar en Apache Tomcat
                </p>
            </div>
        </div>
        
        <div id="referencias" class="tab-content">
            <h3>Recursos y Documentación</h3>
            <a href="https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana15" class="resource-link" target="_blank">
                <i class="fab fa-github"></i> Repositorio Oficial del Proyecto
            </a>
            <a href="https://tomcat.apache.org/tomcat-10.0-doc/" class="resource-link" target="_blank">
                <i class="fas fa-server"></i> Apache Tomcat Documentation
            </a>
            <a href="https://netbeans.apache.org/" class="resource-link" target="_blank">
                <i class="fas fa-code"></i> Apache NetBeans IDE
            </a>
        </div>
    `
}

// ... (el resto del código permanece igual)

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

// Inicializar tabs del modal
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

// Abrir en tu repositorio específico de GitHub - CORREGIDO
function openGitHub(week) {
    // URLs directas al árbol de tu repositorio
    const githubUrls = {
        1: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana1',
        2: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana2',
        3: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana3',
        4: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana4',
        5: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana5',
        6: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana6',
        7: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana7',
        8: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana8',
        9: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana9',
        10: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana10',
        11: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana11',
        12: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana12',
        13: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana13',
        14: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana14',
        15: 'https://github.com/Josue2606/ProyectoTallerJosue/tree/main/semanas/Semana15'
    };
    
    const url = githubUrls[week] || 'https://github.com/Josue2606/ProyectoTallerJosue';
    
    console.log('Abriendo URL:', url); // Para debugging
    window.open(url, '_blank');
}