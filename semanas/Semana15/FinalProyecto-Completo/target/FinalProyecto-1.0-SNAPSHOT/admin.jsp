<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<%
    String nombreUsuario = (String) session.getAttribute("nombre");
    if (nombreUsuario == null) { nombreUsuario = "Administrador"; }
    
    // Cálculos de seguridad para visualización
    Object totalObj = request.getAttribute("statsTotalTesis");
    double total = (totalObj != null) ? Double.parseDouble(totalObj.toString()) : 0;
    
    Object aprobObj = request.getAttribute("statsAprobados");
    double aprob = (aprobObj != null) ? Double.parseDouble(aprobObj.toString()) : 0;
    
    Object obsObj = request.getAttribute("statsObservados");
    double obs = (obsObj != null) ? Double.parseDouble(obsObj.toString()) : 0;
    
    int pctAprob = (total > 0) ? (int)((aprob/total)*100) : 0;
    int pctObs = (total > 0) ? (int)((obs/total)*100) : 0;
%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administrativo - Gestión Tesis</title>
    
    <!-- Bootstrap 5 y Google Fonts -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <style>
        :root { --sidebar-width: 260px; --primary-dark: #0f172a; --accent: #3b82f6; }
        body { font-family: 'Roboto', sans-serif; background: #f1f5f9; }
        
        /* --- Sidebar (Barra Lateral) --- */
        .sidebar { width: var(--sidebar-width); height: 100vh; position: fixed; top: 0; left: 0; background: var(--primary-dark); color: white; z-index: 1000; transition: transform 0.3s; display: flex; flex-direction: column; }
        .sidebar-brand { padding: 1.5rem; font-size: 1.3rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; }
        .nav-pills { flex-grow: 1; padding-top: 1rem; }
        .nav-link { color: rgba(255,255,255,0.75); padding: 0.9rem 1.5rem; font-weight: 500; display: flex; align-items: center; gap: 12px; border-radius: 0; border-left: 4px solid transparent; transition: all 0.2s; }
        .nav-link:hover { background: rgba(255,255,255,0.05); color: white; }
        .nav-link.active { background: rgba(59, 130, 246, 0.15); color: white; border-left-color: var(--accent); }
        .nav-link i { font-size: 1.1rem; }
        
        .user-profile { padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); }
        
        /* --- Contenido Principal --- */
        .main-content { margin-left: var(--sidebar-width); padding: 2rem; transition: margin 0.3s; }
        
        /* --- Tarjetas y Paneles --- */
        .stat-card { background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); height: 100%; border-left: 5px solid var(--accent); }
        .content-box { background: white; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 2rem; }
        .box-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; background: #fff; display: flex; justify-content: space-between; align-items: center; }
        
        /* --- Tablas --- */
        .table thead th { background: #f8fafc; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; padding: 1rem; border-bottom: 2px solid #e2e8f0; }
        .table tbody td { vertical-align: middle; padding: 0.8rem 1rem; color: #334155; }
        
        /* --- Botones CRUD --- */
        .btn-action { width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; margin-left: 4px; }
        
        /* --- Reportes --- */
        .report-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s; height: 100%; }
        .report-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-color: var(--accent); }
        
        /* --- Notificaciones --- */
        .notification-bell { position: relative; cursor: pointer; font-size: 1.4rem; color: #64748b; transition: color 0.2s; }
        .notification-bell:hover { color: var(--accent); }
        .notification-badge { position: absolute; top: -2px; right: -2px; padding: 0.25em 0.5em; font-size: 0.65rem; }

        /* Responsive */
        @media (max-width: 992px) { .sidebar { transform: translateX(-100%); } .sidebar.active { transform: translateX(0); } .main-content { margin-left: 0; } }
        @media print { .sidebar, .top-bar, .no-print { display: none !important; } .main-content { margin: 0; padding: 0; } .content-box { box-shadow: none; border: none; } }
    </style>
</head>
<body>

<!-- Botón Menú Móvil -->
<button class="btn btn-primary d-lg-none position-fixed bottom-0 end-0 m-3 rounded-circle shadow z-3 no-print" onclick="document.querySelector('.sidebar').classList.toggle('active')" style="width: 50px; height: 50px;"><i class="bi bi-list"></i></button>

<!-- 1. SIDEBAR IZQUIERDA -->
<aside class="sidebar">
    <a href="#" class="sidebar-brand"><i class="bi bi-mortarboard-fill text-primary"></i> Gestión Tesis</a>
    
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-2" style="font-size: 0.7rem; letter-spacing: 1px;">Principal</small>
        <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#dashboard-tab" type="button"><i class="bi bi-speedometer2"></i> Dashboard</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#reportes-tab" type="button"><i class="bi bi-file-earmark-bar-graph"></i> Reportes</button>
        
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-4" style="font-size: 0.7rem; letter-spacing: 1px;">Gestión</small>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#tesis-tab" type="button"><i class="bi bi-journal-text"></i> Tesis</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#docentes-tab" type="button"><i class="bi bi-person-video3"></i> Docentes</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#alumnos-tab" type="button"><i class="bi bi-mortarboard"></i> Alumnos</button>
        
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-4" style="font-size: 0.7rem; letter-spacing: 1px;">Sistema</small>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#admins-tab" type="button"><i class="bi bi-shield-lock"></i> Administradores</button>
    </div>
    
    <div class="user-profile">
        <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-white d-flex align-items-center justify-content-center text-primary" style="width: 38px; height: 38px; font-weight: bold;">
                <%= nombreUsuario.substring(0, 1) %>
            </div>
            <div class="overflow-hidden">
                <div class="text-white fw-bold text-truncate" style="max-width: 120px;"><%= nombreUsuario %></div>
                <div class="text-white-50 small">Administrador</div>
            </div>
            <a href="LogoutServlet" class="btn btn-sm btn-outline-danger ms-auto border-0" title="Cerrar Sesión"><i class="bi bi-box-arrow-right fs-5"></i></a>
        </div>
    </div>
</aside>

<!-- 2. CONTENIDO PRINCIPAL -->
<main class="main-content">
    
    <!-- Top Bar -->
    <div class="d-flex justify-content-between align-items-center mb-4 top-bar">
        <div>
            <h4 class="fw-bold text-dark mb-0">Panel de Control</h4>
            <p class="text-muted small mb-0">Bienvenido al sistema de gestión académica.</p>
        </div>
        
        <!-- Centro de Notificaciones -->
        <div class="dropdown">
            <div class="notification-bell" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell-fill"></i>
                <c:if test="${countNotificaciones > 0}">
                    <span class="badge rounded-pill bg-danger notification-badge">${countNotificaciones}</span>
                </c:if>
            </div>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0" style="width: 320px;">
                <li class="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                    <h6 class="mb-0 fw-bold text-dark">Notificaciones</h6>
                    <c:if test="${countNotificaciones > 0}">
                        <a href="AdminController?accion=marcarLeidas" class="small text-decoration-none fw-bold">Marcar leídas</a>
                    </c:if>
                </li>
                <div style="max-height: 300px; overflow-y: auto;">
                    <c:forEach var="n" items="${listaNotificaciones}">
                        <li class="dropdown-item p-3 border-bottom">
                            <div class="d-flex gap-2">
                                <i class="bi ${n.tipo == 'alerta' ? 'bi-exclamation-circle-fill text-danger' : 'bi-info-circle-fill text-primary'} fs-5 mt-1"></i>
                                <div>
                                    <p class="mb-1 small text-wrap lh-sm">${n.mensaje}</p>
                                    <small class="text-muted" style="font-size: 0.7rem;"><fmt:formatDate value="${n.fecha}" pattern="dd/MM HH:mm"/></small>
                                </div>
                            </div>
                        </li>
                    </c:forEach>
                    <c:if test="${empty listaNotificaciones}">
                        <li class="p-4 text-center text-muted small">No tienes notificaciones nuevas.</li>
                    </c:if>
                </div>
            </ul>
        </div>
    </div>

    <!-- Mensajes del Sistema -->
    <c:if test="${not empty param.msg}">
        <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm border-start border-success border-4 mb-4" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> ${param.msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </c:if>
    <c:if test="${not empty param.error}">
        <div class="alert alert-danger alert-dismissible fade show border-0 shadow-sm border-start border-danger border-4 mb-4" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i> ${param.error}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </c:if>

    <div class="tab-content" id="v-pills-tabContent">
        
        <!-- === PESTAÑA 1: DASHBOARD === -->
        <div class="tab-pane fade show active" id="dashboard-tab">
            <!-- Stats Row -->
            <div class="row g-4 mb-4">
                <div class="col-md-3"><div class="stat-card border-primary"><h2 class="fw-bold mb-0 text-primary">${statsTotalTesis}</h2><span class="text-muted small fw-bold text-uppercase">Total Tesis</span></div></div>
                <div class="col-md-3"><div class="stat-card border-success" style="border-left-color: #198754;"><h2 class="fw-bold mb-0 text-success">${statsAprobados}</h2><span class="text-muted small fw-bold text-uppercase">Aprobadas</span></div></div>
                <div class="col-md-3"><div class="stat-card border-warning" style="border-left-color: #ffc107;"><h2 class="fw-bold mb-0 text-warning">${statsObservados}</h2><span class="text-muted small fw-bold text-uppercase">Observadas</span></div></div>
                <div class="col-md-3"><div class="stat-card border-info" style="border-left-color: #0dcaf0;"><h2 class="fw-bold mb-0 text-info">${statsAlumnos}</h2><span class="text-muted small fw-bold text-uppercase">Alumnos</span></div></div>
            </div>
            
            <div class="row g-4">
                <!-- Gráficos -->
                <div class="col-lg-8">
                    <div class="content-box h-100">
                        <div class="box-header"><h6 class="mb-0 fw-bold">Resumen de Progreso</h6></div>
                        <div class="p-4">
                            <div class="mb-4">
                                <div class="d-flex justify-content-between mb-1"><span class="small fw-bold text-muted">Tasa de Aprobación</span><span class="small fw-bold text-success">${pctAprob}%</span></div>
                                <div class="progress" style="height: 10px;"><div class="progress-bar bg-success" role="progressbar" style="width: ${pctAprob}%"></div></div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between mb-1"><span class="small fw-bold text-muted">Tasa de Observación</span><span class="small fw-bold text-warning">${pctObs}%</span></div>
                                <div class="progress" style="height: 10px;"><div class="progress-bar bg-warning" role="progressbar" style="width: ${pctObs}%"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Accesos Rápidos (Restaurados y Destacados) -->
                <div class="col-lg-4">
                    <div class="content-box h-100">
                        <div class="box-header bg-light"><h6 class="mb-0 fw-bold">Accesos Rápidos</h6></div>
                        <div class="list-group list-group-flush">
                            <button class="list-group-item list-group-item-action py-3 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#adminAddTesisModal">
                                <span class="badge bg-primary rounded-circle p-2 me-3"><i class="bi bi-plus-lg"></i></span>
                                <div><h6 class="mb-0 text-dark">Asignar Tesis</h6><small class="text-muted">Registrar nuevo proyecto</small></div>
                            </button>
                            <button class="list-group-item list-group-item-action py-3 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#adminCrearDocenteModal">
                                <span class="badge bg-success rounded-circle p-2 me-3"><i class="bi bi-person-plus-fill"></i></span>
                                <div><h6 class="mb-0 text-dark">Nuevo Docente</h6><small class="text-muted">Dar de alta profesor</small></div>
                            </button>
                            <button class="list-group-item list-group-item-action py-3 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#adminCrearAlumnoModal">
                                <span class="badge bg-info rounded-circle p-2 me-3"><i class="bi bi-person-vcard"></i></span>
                                <div><h6 class="mb-0 text-dark">Nuevo Alumno</h6><small class="text-muted">Dar de alta estudiante</small></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- === PESTAÑA 2: REPORTES === -->
        <div class="tab-pane fade" id="reportes-tab">
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="report-card d-flex flex-column">
                        <div class="fs-1 text-primary mb-3"><i class="bi bi-file-earmark-spreadsheet"></i></div>
                        <h5 class="fw-bold">Reporte de Tesis</h5>
                        <p class="text-muted small mb-4">Listado completo de tesis con estados y asignaciones.</p>
                        <div class="mt-auto d-flex gap-2">
                            <button onclick="exportTableToCSV('tablaTesisCompleta', 'reporte_tesis.csv')" class="btn btn-outline-success w-100 btn-sm"><i class="bi bi-download me-2"></i>Excel/CSV</button>
                            <button onclick="printSection('tesis-tab')" class="btn btn-outline-dark btn-sm"><i class="bi bi-printer"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="report-card d-flex flex-column">
                        <div class="fs-1 text-success mb-3"><i class="bi bi-people"></i></div>
                        <h5 class="fw-bold">Directorio Docente</h5>
                        <p class="text-muted small mb-4">Información de contacto y registro de profesores.</p>
                        <div class="mt-auto d-flex gap-2">
                            <button onclick="exportTableToCSV('tablaDocentesCompleta', 'reporte_docentes.csv')" class="btn btn-outline-success w-100 btn-sm"><i class="bi bi-download me-2"></i>Excel/CSV</button>
                            <button onclick="printSection('docentes-tab')" class="btn btn-outline-dark btn-sm"><i class="bi bi-printer"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="report-card d-flex flex-column">
                        <div class="fs-1 text-info mb-3"><i class="bi bi-mortarboard"></i></div>
                        <h5 class="fw-bold">Padrón Alumnos</h5>
                        <p class="text-muted small mb-4">Lista de estudiantes activos en el sistema.</p>
                        <div class="mt-auto d-flex gap-2">
                            <button onclick="exportTableToCSV('tablaAlumnosCompleta', 'reporte_alumnos.csv')" class="btn btn-outline-success w-100 btn-sm"><i class="bi bi-download me-2"></i>Excel/CSV</button>
                            <button onclick="printSection('alumnos-tab')" class="btn btn-outline-dark btn-sm"><i class="bi bi-printer"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- === PESTAÑA 3: TESIS === -->
        <div class="tab-pane fade" id="tesis-tab">
            <div class="content-box">
                <div class="box-header">
                    <div><h5 class="mb-0 fw-bold">Listado de Tesis</h5></div>
                    <div class="d-flex gap-2">
                        <input type="text" class="form-control form-control-sm global-search" placeholder="Buscar tesis..." style="width: 200px;">
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#adminAddTesisModal"><i class="bi bi-plus-lg me-1"></i> Asignar</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="tablaTesisCompleta">
                        <thead><tr><th>Título</th><th>Archivo</th><th>Alumno</th><th>Docente</th><th>Estado</th><th class="text-end no-print">Acciones</th></tr></thead>
                        <tbody class="searchable-table" id="tesisTableBody">
                            <c:forEach var="t" items="${listaTesis}">
                                <tr data-id="${t.id}" data-titulo="${t.titulo}" data-estado="${t.estado}" data-alumno-id="${t.alumnoId}" data-docente-id="${t.docenteId}">
                                    <td class="fw-medium text-truncate" style="max-width: 250px;" title="${t.titulo}">${t.titulo}</td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${not empty t.archivoActualUrl}">
                                                <a href="DescargaServlet?archivo=${t.archivoActualUrl}" target="_blank" class="badge bg-danger text-decoration-none no-print"><i class="bi bi-file-pdf-fill"></i> PDF</a>
                                                <span class="d-none d-print-inline">Sí</span>
                                            </c:when>
                                            <c:otherwise><span class="badge bg-light text-secondary border">Vacío</span></c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>${t.nombreAlumno}</td>
                                    <td>${t.nombreDocente}</td>
                                    <td><span class="badge ${t.estado == 'Aprobado' ? 'bg-success' : t.estado == 'Observado' ? 'bg-warning text-dark' : t.estado == 'Rechazado' ? 'bg-danger' : 'bg-info text-dark'}">${t.estado}</span></td>
                                    <!-- BOTONES CRUD RESTAURADOS Y VISIBLES -->
                                    <td class="text-end no-print">
                                        <button class="btn btn-warning btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#adminEditarTesisModal" title="Editar"><i class="bi bi-pencil-fill"></i></button>
                                        <a href="AdminController?accion=eliminarTesis&id=${t.id}" class="btn btn-danger btn-action" onclick="return confirm('¿Eliminar tesis?')" title="Eliminar"><i class="bi bi-trash-fill"></i></a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- === PESTAÑA 4: DOCENTES === -->
        <div class="tab-pane fade" id="docentes-tab">
            <div class="content-box">
                <div class="box-header">
                    <div><h5 class="mb-0 fw-bold">Directorio Docentes</h5></div>
                    <div class="d-flex gap-2">
                        <input type="text" class="form-control form-control-sm global-search" placeholder="Buscar docente..." style="width: 200px;">
                        <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#adminCrearDocenteModal"><i class="bi bi-plus-lg me-1"></i> Crear</button>
                    </div>
                </div>
                <table class="table table-hover mb-0" id="tablaDocentesCompleta">
                    <thead><tr><th>Nombre</th><th>Email</th><th>DNI</th><th class="text-end no-print">Acciones</th></tr></thead>
                    <tbody class="searchable-table" id="docenteTableBody">
                        <c:forEach var="d" items="${listaDocentes}">
                            <tr data-id="${d.id}">
                                <td data-field="nombre" class="fw-medium">${d.nombre}</td>
                                <td data-field="email" class="text-muted">${d.email}</td>
                                <td data-field="dni">${d.dni}</td>
                                <td class="text-end no-print">
                                    <button class="btn btn-warning btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#adminEditarDocenteModal"><i class="bi bi-pencil-fill"></i></button>
                                    <a href="AdminController?accion=eliminarDocente&id=${d.id}" class="btn btn-danger btn-action" onclick="return confirm('¿Eliminar docente?')" title="Eliminar"><i class="bi bi-trash-fill"></i></a>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- === PESTAÑA 5: ALUMNOS === -->
        <div class="tab-pane fade" id="alumnos-tab">
            <div class="content-box">
                <div class="box-header">
                    <div><h5 class="mb-0 fw-bold">Directorio Alumnos</h5></div>
                    <div class="d-flex gap-2">
                        <input type="text" class="form-control form-control-sm global-search" placeholder="Buscar alumno..." style="width: 200px;">
                        <button class="btn btn-info btn-sm text-white" data-bs-toggle="modal" data-bs-target="#adminCrearAlumnoModal"><i class="bi bi-plus-lg me-1"></i> Crear</button>
                    </div>
                </div>
                <table class="table table-hover mb-0" id="tablaAlumnosCompleta">
                    <thead><tr><th>Nombre</th><th>Email</th><th>Código</th><th class="text-end no-print">Acciones</th></tr></thead>
                    <tbody class="searchable-table" id="alumnoTableBody">
                        <c:forEach var="a" items="${listaAlumnos}">
                            <tr data-id="${a.id}">
                                <td data-field="nombre" class="fw-medium">${a.nombre}</td>
                                <td data-field="email" class="text-muted">${a.email}</td>
                                <td data-field="codigo"><span class="badge bg-light text-dark border">${a.codigo}</span></td>
                                <td class="text-end no-print">
                                    <button class="btn btn-warning btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#adminEditarAlumnoModal"><i class="bi bi-pencil-fill"></i></button>
                                    <a href="AdminController?accion=eliminarAlumno&id=${a.id}" class="btn btn-danger btn-action" onclick="return confirm('¿Eliminar alumno?')" title="Eliminar"><i class="bi bi-trash-fill"></i></a>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- === PESTAÑA 6: ADMINS === -->
        <div class="tab-pane fade" id="admins-tab">
            <div class="content-box">
                <div class="box-header">
                    <div><h5 class="mb-0 fw-bold">Administradores</h5></div>
                    <button class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#adminCrearAdminModal"><i class="bi bi-plus-lg me-1"></i> Crear</button>
                </div>
                <table class="table table-hover mb-0">
                    <thead><tr><th>Nombre</th><th>Email</th><th class="text-end no-print">Acciones</th></tr></thead>
                    <tbody id="adminTableBody">
                        <c:forEach var="admin" items="${listaAdmins}">
                            <tr data-id="${admin.id}">
                                <td data-field="nombre" class="fw-medium">${admin.nombre}</td>
                                <td data-field="email" class="text-muted">${admin.email}</td>
                                <td class="text-end no-print">
                                    <button class="btn btn-warning btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#adminEditarAdminModal"><i class="bi bi-pencil-fill"></i></button>
                                    <a href="AdminController?accion=eliminarAdmin&id=${admin.id}" class="btn btn-danger btn-action" onclick="return confirm('¿Eliminar administrador?')" title="Eliminar"><i class="bi bi-trash-fill"></i></a>
                                </td>
                            </tr>
                        </c:forEach>
                        <c:if test="${empty listaAdmins}">
                            <tr><td colspan="3" class="text-center p-4 text-muted">No hay administradores registrados.</td></tr>
                        </c:if>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</main>

<!-- ================= MODALES DE CREACIÓN ================= -->

<!-- Crear Tesis -->
<div class="modal fade" id="adminAddTesisModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header bg-primary text-white"><h5 class="modal-title">Nueva Tesis</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="crearTesisForm" action="AdminController" method="POST" enctype="multipart/form-data"><input type="hidden" name="accion" value="crearTesis"><input class="form-control mb-2" name="tesisTitulo" placeholder="Título de Tesis" required><div class="mb-2"><label class="form-label small text-muted">Archivo PDF</label><input type="file" class="form-control" name="tesisArchivo" accept=".pdf"></div><select class="form-select mb-2" name="tesisAlumno" required><option value="">Seleccionar Alumno...</option><c:forEach var="a" items="${listaAlumnos}"><option value="${a.id}">${a.nombre}</option></c:forEach></select><select class="form-select" name="tesisDocente" required><option value="">Seleccionar Docente...</option><c:forEach var="d" items="${listaDocentes}"><option value="${d.id}">${d.nombre}</option></c:forEach></select></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" form="crearTesisForm" class="btn btn-primary">Guardar</button></div></div></div></div>

<!-- Crear Docente -->
<div class="modal fade" id="adminCrearDocenteModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header bg-success text-white"><h5 class="modal-title">Crear Docente</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="crearDocenteForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="crearDocente"><input class="form-control mb-2" name="docenteNombre" placeholder="Nombre Completo" required><input class="form-control mb-2" name="docenteEmail" type="email" placeholder="Email" required><input class="form-control mb-2" name="docenteDNI" placeholder="DNI" required><input class="form-control" name="docentePass" type="password" placeholder="Contraseña" required></form></div><div class="modal-footer"><button type="submit" form="crearDocenteForm" class="btn btn-success">Guardar</button></div></div></div></div>

<!-- Crear Alumno -->
<div class="modal fade" id="adminCrearAlumnoModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header bg-info text-white"><h5 class="modal-title">Crear Alumno</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="crearAlumnoForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="crearAlumno"><input class="form-control mb-2" name="alumnoNombre" placeholder="Nombre Completo" required><input class="form-control mb-2" name="alumnoEmail" type="email" placeholder="Email" required><input class="form-control mb-2" name="alumnoCodigo" placeholder="Código Estudiante" required><input class="form-control" name="alumnoPass" type="password" placeholder="Contraseña" required></form></div><div class="modal-footer"><button type="submit" form="crearAlumnoForm" class="btn btn-info text-white">Guardar</button></div></div></div></div>

<!-- Crear Admin -->
<div class="modal fade" id="adminCrearAdminModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header bg-secondary text-white"><h5 class="modal-title">Crear Admin</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="crearAdminForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="crearAdmin"><input class="form-control mb-2" name="adminNombre" placeholder="Nombre" required><input class="form-control mb-2" name="adminEmail" type="email" placeholder="Email" required><input class="form-control" name="adminPass" type="password" placeholder="Contraseña" required></form></div><div class="modal-footer"><button type="submit" form="crearAdminForm" class="btn btn-secondary">Guardar</button></div></div></div></div>

<!-- ================= MODALES DE EDICIÓN (Con campo contraseña) ================= -->

<!-- Editar Tesis -->
<div class="modal fade" id="adminEditarTesisModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header bg-warning text-dark"><h5 class="modal-title">Editar Tesis</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="editarTesisForm" action="AdminController" method="POST" enctype="multipart/form-data"><input type="hidden" name="accion" value="actualizarTesis"><input type="hidden" id="editarTesisId" name="editarTesisId"><label class="small fw-bold">Título</label><input class="form-control mb-2" id="editarTesisTitulo" name="editarTesisTitulo" required><div class="row"><div class="col-6"><label class="small fw-bold">Alumno</label><select class="form-select mb-2" id="editarTesisAlumno" name="editarTesisAlumno" required><c:forEach var="a" items="${listaAlumnos}"><option value="${a.id}">${a.nombre}</option></c:forEach></select></div><div class="col-6"><label class="small fw-bold">Docente</label><select class="form-select mb-2" id="editarTesisDocente" name="editarTesisDocente" required><c:forEach var="d" items="${listaDocentes}"><option value="${d.id}">${d.nombre}</option></c:forEach></select></div></div><label class="small fw-bold">Estado</label><select class="form-select mb-3" id="editarTesisEstado" name="editarTesisEstado" required><option value="Asignado">Asignado</option><option value="Observado">Observado</option><option value="Aprobado">Aprobado</option><option value="Rechazado">Rechazado</option></select><div class="p-2 bg-light border rounded"><label class="small text-primary fw-bold">Reemplazar Archivo (Opcional)</label><input type="file" name="editarTesisArchivo" class="form-control form-control-sm" accept=".pdf"></div></form></div><div class="modal-footer"><button type="submit" form="editarTesisForm" class="btn btn-primary">Actualizar</button></div></div></div></div>

<!-- Editar Docente (Con Cambio Password) -->
<div class="modal fade" id="adminEditarDocenteModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Editar Docente</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="editarDocenteForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="actualizarDocente"><input type="hidden" id="editarDocenteId" name="editarDocenteId"><label class="small text-muted">Nombre</label><input class="form-control mb-2" id="editarDocenteNombre" name="editarDocenteNombre" required><label class="small text-muted">Email</label><input class="form-control mb-2" id="editarDocenteEmail" name="editarDocenteEmail" required><label class="small text-muted">DNI</label><input class="form-control mb-3" id="editarDocenteDNI" name="editarDocenteDNI" required><div class="p-2 bg-light border rounded"><label class="small fw-bold text-primary">Cambiar Contraseña (Opcional)</label><input type="password" class="form-control form-control-sm" name="editarDocentePass" placeholder="Escriba para cambiar..."></div></form></div><div class="modal-footer"><button type="submit" form="editarDocenteForm" class="btn btn-success">Actualizar</button></div></div></div></div>

<!-- Editar Alumno (Con Cambio Password) -->
<div class="modal fade" id="adminEditarAlumnoModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Editar Alumno</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="editarAlumnoForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="actualizarAlumno"><input type="hidden" id="editarAlumnoId" name="editarAlumnoId"><label class="small text-muted">Nombre</label><input class="form-control mb-2" id="editarAlumnoNombre" name="editarAlumnoNombre" required><label class="small text-muted">Email</label><input class="form-control mb-2" id="editarAlumnoEmail" name="editarAlumnoEmail" required><label class="small text-muted">Código</label><input class="form-control mb-3" id="editarAlumnoCodigo" name="editarAlumnoCodigo" required><div class="p-2 bg-light border rounded"><label class="small fw-bold text-primary">Cambiar Contraseña (Opcional)</label><input type="password" class="form-control form-control-sm" name="editarAlumnoPass" placeholder="Escriba para cambiar..."></div></form></div><div class="modal-footer"><button type="submit" form="editarAlumnoForm" class="btn btn-info text-white">Actualizar</button></div></div></div></div>

<!-- Editar Admin -->
<div class="modal fade" id="adminEditarAdminModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Editar Admin</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="editarAdminForm" action="AdminController" method="POST"><input type="hidden" name="accion" value="actualizarAdmin"><input type="hidden" id="editarAdminId" name="editarAdminId"><label class="small text-muted">Nombre</label><input class="form-control mb-2" id="editarAdminNombre" name="editarAdminNombre" required><label class="small text-muted">Email</label><input class="form-control mb-2" id="editarAdminEmail" name="editarAdminEmail" required></form></div><div class="modal-footer"><button type="submit" form="editarAdminForm" class="btn btn-primary">Actualizar</button></div></div></div></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // --- Funciones de Reportes (CSV e Impresión) ---
    function exportTableToCSV(tableId, filename) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tr');
        let csvContent = [];
        rows.forEach(row => {
            const cols = row.querySelectorAll('td, th');
            let rowData = [];
            cols.forEach((col, index) => {
                if (index < cols.length - 1) { // Ignorar columna acciones
                    let text = col.innerText.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, '""');
                    rowData.push('"' + text + '"');
                }
            });
            csvContent.push(rowData.join(","));
        });
        const csvFile = new Blob([csvContent.join("\n")], { type: "text/csv" });
        const downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function printSection(tabId) {
        const tabContent = document.getElementById(tabId).innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = '<div style="padding:20px"><h2>Reporte Gestión Tesis</h2><hr>' + tabContent + '</div>';
        window.print();
        document.body.innerHTML = originalContent;
        location.reload();
    }

    // --- Lógica de Búsqueda y Modales ---
    (function () {
        document.querySelectorAll('.global-search').forEach(input => {
            input.addEventListener('keyup', function() {
                const term = this.value.toLowerCase();
                const tbody = this.closest('.content-box').querySelector('.searchable-table');
                if(tbody) tbody.querySelectorAll('tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(term) ? '' : 'none');
            });
        });
        
        document.querySelector('.main-content').addEventListener('click', function(e) {
            const btn = e.target.closest('.btn-edit');
            if(!btn) return;
            const row = btn.closest('tr');
            const id = row.closest('tbody').id;
            
            if(id === 'tesisTableBody') {
                document.getElementById('editarTesisId').value = row.dataset.id;
                document.getElementById('editarTesisTitulo').value = row.dataset.titulo;
                document.getElementById('editarTesisAlumno').value = row.dataset.alumnoId;
                document.getElementById('editarTesisDocente').value = row.dataset.docenteId;
                document.getElementById('editarTesisEstado').value = row.dataset.estado;
            } else if(id === 'docenteTableBody') {
                document.getElementById('editarDocenteId').value = row.dataset.id;
                document.getElementById('editarDocenteNombre').value = row.querySelector('[data-field="nombre"]').textContent;
                document.getElementById('editarDocenteEmail').value = row.querySelector('[data-field="email"]').textContent;
                document.getElementById('editarDocenteDNI').value = row.querySelector('[data-field="dni"]').textContent;
                document.querySelector('input[name="editarDocentePass"]').value = '';
            } else if(id === 'alumnoTableBody') {
                document.getElementById('editarAlumnoId').value = row.dataset.id;
                document.getElementById('editarAlumnoNombre').value = row.querySelector('[data-field="nombre"]').textContent;
                document.getElementById('editarAlumnoEmail').value = row.querySelector('[data-field="email"]').textContent;
                document.getElementById('editarAlumnoCodigo').value = row.querySelector('[data-field="codigo"]').textContent;
                document.querySelector('input[name="editarAlumnoPass"]').value = '';
            } else if(id === 'adminTableBody') {
                document.getElementById('editarAdminId').value = row.dataset.id;
                document.getElementById('editarAdminNombre').value = row.querySelector('[data-field="nombre"]').textContent;
                document.getElementById('editarAdminEmail').value = row.querySelector('[data-field="email"]').textContent;
            }
        });
    })();
</script>
</body>
</html>