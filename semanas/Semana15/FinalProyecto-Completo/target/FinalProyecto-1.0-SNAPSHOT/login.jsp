<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Institucional - Gestión de Tesis</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Iconos -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Fuentes Académicas -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --academic-primary: #1a237e; /* Azul Oxford */
            --academic-gold: #ffd700;    /* Dorado Excelencia */
            --bg-light: #f8f9fa;
        }

        body {
            font-family: 'Roboto', sans-serif;
            height: 100vh;
            overflow: hidden;
        }

        .main-container {
            height: 100vh;
        }

        /* --- SECCIÓN IZQUIERDA (ARTÍSTICA/DIDÁCTICA) --- */
        .hero-section {
            background: linear-gradient(135deg, rgba(26, 35, 126, 0.95), rgba(13, 71, 161, 0.8)), 
                        url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 4rem;
            position: relative;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            animation: fadeInUp 1s ease-out;
        }

        .academic-title {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }
        
        .academic-title span {
            color: var(--academic-gold);
            position: relative;
        }

        .feature-list {
            list-style: none;
            padding: 0;
            margin-top: 2rem;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .feature-icon {
            background: rgba(255,255,255,0.1);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--academic-gold);
        }

        /* --- SECCIÓN DERECHA (LOGIN) --- */
        .login-section {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        /* Elementos decorativos de fondo */
        .bg-decoration-1 {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: var(--bg-light);
            border-radius: 50%;
            z-index: 0;
        }
        .bg-decoration-2 {
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 10rem;
            color: var(--bg-light);
            opacity: 0.5;
            z-index: 0;
            font-family: 'Playfair Display', serif;
        }

        .login-card {
            width: 100%;
            max-width: 420px;
            z-index: 1;
            padding: 2rem;
            animation: fadeIn 0.8s ease-out;
        }

        .form-floating > .form-control {
            border: none;
            border-bottom: 2px solid #e0e0e0;
            border-radius: 0;
            padding-left: 0;
            background: transparent;
        }

        .form-floating > .form-control:focus {
            box-shadow: none;
            border-color: var(--academic-primary);
        }

        .form-floating > label {
            padding-left: 0;
            color: #6c757d;
        }

        .btn-login {
            background: var(--academic-primary);
            color: white;
            border-radius: 50px;
            padding: 0.8rem 2rem;
            font-weight: 500;
            letter-spacing: 1px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(26, 35, 126, 0.3);
        }

        .btn-login:hover {
            background: #151b60;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(26, 35, 126, 0.4);
            color: var(--academic-gold);
        }

        .demo-panel {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px dashed #dee2e6;
            text-align: center;
        }
        
        .btn-demo {
            font-size: 0.75rem;
            border-radius: 20px;
            margin: 0 2px;
        }

        /* Animaciones */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @media (max-width: 992px) {
            .hero-section { display: none; }
            .login-section { height: 100vh; background: #f0f2f5; }
            .login-card { background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        }
    </style>
</head>
<body>

<div class="container-fluid main-container">
    <div class="row h-100">
        
        <!-- 1. COLUMNA IZQUIERDA: INSPIRACIÓN ACADÉMICA -->
        <div class="col-lg-7 hero-section">
            <div class="hero-content">
                <div class="mb-4">
                    <i class="bi bi-mortarboard-fill fs-1 text-warning"></i>
                    <span class="ms-2 text-uppercase tracking-wider small fw-bold">Sistema de Gestión Académica</span>
                </div>
                <h1 class="academic-title">Impulsando la<br><span>Investigación</span> y el<br>Conocimiento.</h1>
                <p class="lead mb-5" style="opacity: 0.8;">Plataforma centralizada para la gestión eficiente de proyectos de tesis, revisiones docentes y seguimiento estudiantil.</p>
                
                <ul class="feature-list">
                    <li class="feature-item">
                        <div class="feature-icon"><i class="bi bi-shield-check"></i></div>
                        <div>Seguridad y Confidencialidad de Datos</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon"><i class="bi bi-lightning-charge"></i></div>
                        <div>Revisiones y Feedback en Tiempo Real</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon"><i class="bi bi-archive"></i></div>
                        <div>Repositorio Digital Organizado</div>
                    </li>
                </ul>
            </div>
            
            <!-- Indicador de pie de página -->
            <div class="position-absolute bottom-0 start-0 p-5 text-white-50 small">
                &copy; 2025 Universidad - Departamento de Investigación
            </div>
        </div>

        <!-- 2. COLUMNA DERECHA: FORMULARIO INTERACTIVO -->
        <div class="col-lg-5 login-section">
            <div class="bg-decoration-1"></div>
            <div class="bg-decoration-2">“</div>
            
            <div class="login-card">
                <div class="text-center mb-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="Logo" style="width: 60px; margin-bottom: 1rem;">
                    <h3 class="fw-bold" style="color: var(--academic-primary);">Bienvenido</h3>
                    <p class="text-muted small">Ingrese sus credenciales institucionales</p>
                </div>

                <!-- Mensajes de Alerta -->
                <% if (request.getAttribute("error") != null) { %>
                    <div class="alert alert-danger border-0 shadow-sm d-flex align-items-center" role="alert">
                        <i class="bi bi-exclamation-circle-fill me-2"></i>
                        <div><%= request.getAttribute("error") %></div>
                    </div>
                <% } %>
                <% if (request.getParameter("msg") != null) { %>
                    <div class="alert alert-success border-0 shadow-sm d-flex align-items-center" role="alert">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        <div><%= request.getParameter("msg") %></div>
                    </div>
                <% } %>

                <!-- Formulario Principal -->
                <form id="loginForm" action="LoginServlet" method="POST" class="needs-validation" novalidate>
                    
                    <div class="form-floating mb-4">
                        <input type="text" class="form-control" id="loginId" name="loginId" placeholder="Usuario" required>
                        <label for="loginId"><i class="bi bi-person me-2"></i>Código / DNI / Email</label>
                        <div class="invalid-feedback">Por favor ingrese su identificador.</div>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" class="form-control" id="loginPassword" name="loginPassword" placeholder="Contraseña" required>
                        <label for="loginPassword"><i class="bi bi-lock me-2"></i>Contraseña</label>
                        <div class="invalid-feedback">La contraseña es requerida.</div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember">
                            <label class="form-check-label small text-muted" for="remember">Recordarme</label>
                        </div>
                        <a href="#" class="small text-decoration-none fw-bold" style="color: var(--academic-primary);" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">¿Olvidó su contraseña?</a>
                    </div>

                    <button type="submit" class="btn btn-login w-100 mb-3">
                        Ingresar al Sistema <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </form>

                <!-- Panel de Demo (Para desarrollo/pruebas) -->
                <div class="demo-panel">
                    <p class="text-muted" style="font-size: 0.7rem; margin-bottom: 0.5rem;">MODO DESARROLLADOR: ACCESO RÁPIDO</p>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-secondary btn-demo" onclick="fillLogin('admin@univ.edu','admin123')">Admin</button>
                        <button type="button" class="btn btn-outline-secondary btn-demo" onclick="fillLogin('12345678','docente456')">Docente</button>
                        <button type="button" class="btn btn-outline-secondary btn-demo" onclick="fillLogin('T01244A','T01244A')">Alumno</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL: RECUPERACIÓN DE CONTRASEÑA -->
<div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header text-white" style="background: var(--academic-primary);">
                <h5 class="modal-title fs-6 fw-bold"><i class="bi bi-shield-lock me-2"></i>Recuperación de Cuenta</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4 text-center">
                <div class="mb-3 text-warning">
                    <i class="bi bi-envelope-paper display-4"></i>
                </div>
                <h6 class="fw-bold mb-2">¿Problemas para acceder?</h6>
                <p class="text-muted small mb-4">
                    Ingrese su identificador (DNI, Código o Email). 
                    El sistema notificará automáticamente al Administrador para verificar su identidad y restablecer su acceso.
                </p>
                <form action="LoginServlet" method="POST">
                    <input type="hidden" name="accion" value="solicitarRecuperacion">
                    <div class="input-group mb-3">
                        <span class="input-group-text bg-light"><i class="bi bi-person-badge"></i></span>
                        <input type="text" name="recuperacionInput" class="form-control" placeholder="Ej: 20201234" required>
                    </div>
                    <button type="submit" class="btn w-100 text-white fw-bold" style="background: var(--academic-primary);">
                        Solicitar Restablecimiento
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Scripts JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Función para auto-llenado (Demo)
    function fillLogin(user, pass) {
        const idInput = document.getElementById('loginId');
        const passInput = document.getElementById('loginPassword');
        
        // Efecto visual de "escritura"
        idInput.value = user;
        passInput.value = pass;
        
        idInput.focus();
        passInput.focus();
        
        // Trigger Bootstrap floating label styles
        idInput.dispatchEvent(new Event('input'));
    }

    // Validación Bootstrap
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()
</script>

</body>
</html>