// main.js - Código corregido y funcional
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
            title: `Semana ${week}: Introducción a Git y GitHub`,
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
                        <li>Configura tu nombre y correo</li>
                        <li>Inicializa un repositorio</li>
                        <li>Añade archivos al staging</li>
                        <li>Realiza tu primer commit</li>
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
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://git-scm.com/doc" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Documentación Oficial de Git
                    </a>
                    <a href="https://guides.github.com/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Guías de GitHub
                    </a>
                </div>
            `
        },
        2: {
            title: `Semana ${week}: Creación de Repositorio en GitHub`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Ejemplos de Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Crear un Repositorio en GitHub</h3>
                    <p>Un repositorio en GitHub es un espacio donde puedes almacenar tu proyecto.</p>
                    
                    <h3>Pasos para crear un repositorio:</h3>
                    <ol>
                        <li>Inicia sesión en tu cuenta de GitHub</li>
                        <li>Haz clic en el icono "+" y selecciona "New repository"</li>
                        <li>Asigna un nombre a tu repositorio</li>
                        <li>Elige si será público o privado</li>
                        <li>Inicializa con un README</li>
                        <li>Haz clic en "Create repository"</li>
                    </ol>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Estructura de Archivos</h3>
                    
                    <h4>Ejemplo de index.html</h4>
                    <div class="code-container">
                        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi Proyecto&lt;/title&gt;
    &lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Mi Proyecto Web&lt;/h1&gt;
    &lt;script src="js/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://docs.github.com/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> GitHub Docs
                    </a>
                </div>
            `
        },
        3: {
            title: `Semana ${week}: Tu Código Aquí`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Tu Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Semana 3 - Desarrollo de Aplicaciones</h3>
                    <p>En esta semana, trabajaremos en el desarrollo de componentes más avanzados.</p>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Tu Código de la Semana 3</h3>
                    <p>Aquí puedes agregar el código que desarrollaste:</p>
                    
                    <div class="code-container">
                        <pre><code class="language-javascript">// Espacio para tu código de la semana 3
// Ejemplo de estructura básica

class MiClase {
    constructor() {
        this.nombre = "Mi Aplicación";
    }
    
    saludar() {
        return "Hola desde la semana 3!";
    }
}

const instancia = new MiClase();
console.log(instancia.saludar());</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://developer.mozilla.org/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> MDN Web Docs
                    </a>
                </div>
            `
        },
        4: {
            title: `Semana ${week}: Tu Código Aquí`,
            body: `
                <div class="week-tabs">
                    <div class="week-tab active" data-tab="presentacion">Presentación</div>
                    <div class="week-tab" data-tab="ejemplos">Tu Código</div>
                    <div class="week-tab" data-tab="referencias">Enlaces de Referencia</div>
                </div>
                
                <div id="presentacion" class="tab-content active">
                    <h3>Semana 4 - Avanzando en el Desarrollo</h3>
                    <p>Continuamos con el desarrollo de aplicaciones web.</p>
                </div>
                
                <div id="ejemplos" class="tab-content">
                    <h3>Tu Código de la Semana 4</h3>
                    <p>Aquí puedes agregar el código que desarrollaste:</p>
                    
                    <div class="code-container">
                        <pre><code class="language-javascript">// Espacio para tu código de la semana 4
// Ejemplo de función avanzada

function procesarDatos(datos) {
    return datos
        .filter(item => item.activo)
        .map(item => ({
            ...item,
            procesado: true
        }));
}

const resultado = procesarDatos([
    { id: 1, activo: true, nombre: "Item 1" },
    { id: 2, activo: false, nombre: "Item 2" }
]);</code></pre>
                    </div>
                </div>
                
                <div id="referencias" class="tab-content">
                    <h3>Enlaces de Referencia</h3>
                    <a href="https://developer.mozilla.org/" class="resource-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> MDN Web Docs
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

// Abrir GitHub
function openGitHub(week) {
    // En un entorno real, actualiza con tu URL de GitHub
    const githubUrls = {
        1: 'https://github.com/tuusuario/semana1',
        2: 'https://github.com/tuusuario/semana2',
        3: 'https://github.com/tuusuario/semana3',
        4: 'https://github.com/tuusuario/semana4'
    };
    
    const url = githubUrls[week] || 'https://github.com';
    window.open(url, '_blank');
}