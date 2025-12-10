<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<jsp:useBean id="now" class="java.util.Date" />
<c:set var="limitMillis" value="${7 * 24 * 60 * 60 * 1000}" />

<%
    String nombreUsuario = (String) session.getAttribute("nombre");
    if (nombreUsuario == null) { nombreUsuario = "Docente"; }
    
    java.util.List<com.gestortes.modelo.Tesis> lista = (java.util.List) request.getAttribute("listaTesis");
    int pendientes = 0, total = (lista != null) ? lista.size() : 0, aprobados = 0, observados = 0;
    
    if (lista != null) {
        for (com.gestortes.modelo.Tesis t : lista) {
            if ("En Revisión".equals(t.getEstado())) pendientes++;
            if ("Aprobado".equals(t.getEstado())) aprobados++;
            if ("Observado".equals(t.getEstado())) observados++;
        }
    }
    
    int pctPendiente = (total > 0) ? (int)((double)pendientes/total * 100) : 0;
    int pctAvance = (total > 0) ? (int)((double)aprobados/total * 100) : 0;
%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Académico - Docente</title>
    
    <!-- Bootstrap 5 & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Fuentes Académicas -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:wght@300;700&display=swap" rel="stylesheet">
    
    <style>
        /* --- PALETA DE COLORES TEAL & SLATE --- */
        :root { 
            --primary-bg: #0f766e; /* Teal 700 */
            --sidebar-bg: #115e59; /* Teal 800 */
            --accent: #f59e0b; /* Amber 500 */
            --text-dark: #334155; /* Slate 700 */
            --bg-light: #f0f9ff; /* Sky 50 */
            --sidebar-width: 260px;
        }
        
        body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); }
        h1, h2, h3, h4, h5, .brand-text { font-family: 'Merriweather', serif; }
        
        /* Sidebar */
        .sidebar { width: var(--sidebar-width); height: 100vh; position: fixed; top: 0; left: 0; background: var(--sidebar-bg); color: white; z-index: 1000; display: flex; flex-direction: column; box-shadow: 4px 0 10px rgba(0,0,0,0.1); }
        .sidebar-brand { padding: 1.5rem; font-size: 1.2rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px; color: #ccfbf1; text-decoration: none; }
        .nav-pills { flex-grow: 1; padding-top: 1rem; }
        .nav-link { color: rgba(255,255,255,0.8); padding: 0.9rem 1.5rem; font-weight: 500; display: flex; align-items: center; gap: 12px; border-radius: 0; border-left: 4px solid transparent; transition: all 0.2s; }
        .nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .nav-link.active { background: rgba(20, 184, 166, 0.2); color: #fff; border-left-color: #2dd4bf; } /* Teal 400 */
        .nav-link i { font-size: 1.2rem; }
        
        .user-profile { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.15); }
        
        /* Content */
        .main-content { margin-left: var(--sidebar-width); padding: 2rem; transition: margin 0.3s; }
        
        /* Cards & Panels */
        .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border-top: 4px solid transparent; height: 100%; transition: transform 0.2s; }
        .stat-card:hover { transform: translateY(-3px); }
        .border-teal { border-top-color: #0d9488; }
        .border-emerald { border-top-color: #10b981; }
        .border-slate { border-top-color: #64748b; }
        
        .content-box { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); overflow: hidden; margin-bottom: 2rem; border: 1px solid #e2e8f0; }
        .box-header { padding: 1.2rem 1.5rem; background: white; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        
        /* Tables */
        .table thead th { background: #f8fafc; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; padding: 1rem; border-bottom: 2px solid #e2e8f0; font-family: 'Inter', sans-serif; }
        .table tbody td { vertical-align: middle; padding: 1rem; color: #334155; }
        
        /* Badges & Buttons */
        .status-badge { padding: 0.4em 0.8em; font-size: 0.75em; font-weight: 600; border-radius: 20px; letter-spacing: 0.5px; }
        .st-revision { background: #e0f2fe; color: #0369a1; } 
        .st-aprobado { background: #dcfce7; color: #15803d; } 
        .st-observado { background: #fef9c3; color: #a16207; }
        .st-rechazado { background: #fef2f2; color: #b91c1c; } 
        .st-asignado { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
        
        .btn-action { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; transition: all 0.2s; }
        .btn-action:hover { transform: scale(1.1); }
        
        /* Semáforo */
        .traffic-light { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .light-green { background: #22c55e; box-shadow: 0 0 0 2px rgba(34,197,94,0.2); } 
        .light-red { background: #ef4444; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

        /* Rúbrica Styles */
        .rubric-container { height: 100%; overflow-y: auto; background: #f8fafc; border-right: 1px solid #e2e8f0; }
        .rubric-table th { position: sticky; top: 0; background: #fff; z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .section-header td { background: #e2e8f0; color: #1e293b; font-weight: 700; font-size: 0.85rem; padding-top: 1rem; }
        
        /* Chart CSS */
        .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }
        .circle-bg { fill: none; stroke: #eee; stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 2.8; stroke-linecap: round; animation: progress 1s ease-out forwards; }
        @keyframes progress { 0% { stroke-dasharray: 0 100; } }
        
        /* Notificaciones */
        .notification-bell { position: relative; cursor: pointer; font-size: 1.4rem; color: #64748b; transition: color 0.2s; }
        .notification-bell:hover { color: var(--primary-bg); }
        .notification-badge { position: absolute; top: -2px; right: -2px; padding: 0.25em 0.5em; font-size: 0.65rem; }

        /* Fix de Z-Index Reportes */
        .report-card-content { position: relative; z-index: 2; }
        .report-bg-icon { position: absolute; top: 0; end: 0; padding: 1rem; opacity: 0.1; z-index: 1; font-size: 5rem; }

        /* Responsive */
        @media (max-width: 992px) { .sidebar { transform: translateX(-100%); } .sidebar.active { transform: translateX(0); } .main-content { margin-left: 0; } }
        @media print { .sidebar, .no-print, .box-header input, .btn { display: none !important; } .main-content { margin: 0; padding: 0; } .content-box { border: none; box-shadow: none; } }
    </style>
</head>
<body>

<!-- Botón Móvil -->
<button class="btn btn-dark d-lg-none position-fixed bottom-0 end-0 m-3 rounded-circle shadow z-3 no-print" onclick="document.querySelector('.sidebar').classList.toggle('active')" style="width: 50px; height: 50px;"><i class="bi bi-list"></i></button>

<!-- 1. SIDEBAR -->
<aside class="sidebar">
    <a href="#" class="sidebar-brand" style="padding:1.5rem; color:#ccfbf1; text-decoration:none; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.1);"><i class="bi bi-mortarboard-fill text-warning me-2"></i> Portal Docente</a>
    <div class="nav flex-column nav-pills pt-3" id="v-pills-tab" role="tablist">
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-2" style="font-size:0.7rem;">Resumen</small>
        <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#dashboard-tab"><i class="bi bi-grid-1x2 me-2"></i> Dashboard</button>
        
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-4" style="font-size:0.7rem;">Académico</small>
        <button class="nav-link" id="link-mis-tesis" data-bs-toggle="pill" data-bs-target="#tesis-tab"><i class="bi bi-journal-bookmark-fill me-2"></i> Mis Tesis</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#estudiantes-tab"><i class="bi bi-people-fill me-2"></i> Estudiantes</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#historial-tab"><i class="bi bi-clock-history me-2"></i> Historial</button>
        
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-4" style="font-size:0.7rem;">Admin</small>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#reportes-tab"><i class="bi bi-file-earmark-bar-graph me-2"></i> Reportes</button>
    </div>
    
    <div class="user-profile mt-auto p-4 bg-black bg-opacity-10 border-top border-white-10">
        <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-white text-success d-flex align-items-center justify-content-center fw-bold" style="width:40px; height:40px;"><%= nombreUsuario.substring(0, 1) %></div>
            <div class="overflow-hidden">
                <div class="text-white fw-bold text-truncate" style="max-width:130px;"><%= nombreUsuario %></div>
                <div class="text-white-50 small">Docente</div>
            </div>
            <a href="LogoutServlet" class="btn btn-sm btn-outline-light border-0 ms-auto" title="Cerrar Sesión"><i class="bi bi-box-arrow-right fs-5"></i></a>
        </div>
    </div>
</aside>

<!-- 2. MAIN CONTENT -->
<main class="main-content">
    
    <!-- Top Bar & Notifications -->
    <div class="d-flex justify-content-between align-items-center mb-4 no-print">
        <div><h3 class="fw-bold text-dark mb-0">Panel Académico</h3><p class="text-muted small mb-0">Gestión de revisiones.</p></div>
        <div class="d-flex gap-3 align-items-center">
            <div class="bg-white px-3 py-2 rounded-pill shadow-sm small text-muted border me-2"><i class="bi bi-calendar3 text-primary me-2"></i> <fmt:formatDate value="<%= new java.util.Date() %>" pattern="dd/MM/yyyy" /></div>
            
            <!-- NOTIFICACIONES -->
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
                            <a href="DocenteController?accion=marcarLeidas" class="small fw-bold text-decoration-none">Marcar leídas</a>
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
                            <li class="p-4 text-center text-muted small">Sin notificaciones.</li>
                        </c:if>
                    </div>
                </ul>
            </div>
        </div>
    </div>

    <c:if test="${not empty param.msg}">
        <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm border-start border-success border-4 mb-4 no-print">
            <i class="bi bi-check-circle-fill me-2"></i> ${param.msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </c:if>

    <div class="tab-content">
        
        <!-- === 1. DASHBOARD === -->
        <div class="tab-pane fade show active" id="dashboard-tab">
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="stat-card border-teal">
                        <div class="d-flex justify-content-between align-items-center">
                            <div><h2 class="fw-bold mb-0 text-dark"><%= pendientes %></h2><span class="text-muted small fw-bold text-uppercase">Por Revisar</span></div>
                            <div class="bg-info bg-opacity-10 p-3 rounded-circle text-info"><i class="bi bi-hourglass-split fs-4"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card border-emerald">
                        <div class="d-flex justify-content-between align-items-center">
                            <div><h2 class="fw-bold mb-0 text-dark"><%= aprobados %></h2><span class="text-muted small fw-bold text-uppercase">Aprobadas</span></div>
                            <div class="bg-success bg-opacity-10 p-3 rounded-circle text-success"><i class="bi bi-check-lg fs-4"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card border-slate">
                        <div class="d-flex justify-content-between align-items-center">
                            <div><h2 class="fw-bold mb-0 text-dark"><%= total %></h2><span class="text-muted small fw-bold text-uppercase">Total Alumnos</span></div>
                            <div class="bg-secondary bg-opacity-10 p-3 rounded-circle text-secondary"><i class="bi bi-people fs-4"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-8">
                    <div class="content-box h-100">
                        <div class="box-header"><h6 class="mb-0 fw-bold text-dark">Progreso de Carga Lectiva</h6></div>
                        <div class="p-4">
                            <label class="small fw-bold text-muted mb-1">Tasa de Finalización</label>
                            <div class="progress mb-4" style="height: 20px; border-radius: 10px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: <%= pctAvance %>%;"><%= pctAvance %>%</div>
                            </div>
                            <label class="small fw-bold text-muted mb-1">Pendiente</label>
                            <div class="progress" style="height: 20px; border-radius: 10px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: <%= pctPendiente %>%;"><%= pctPendiente %>%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="content-box h-100">
                        <div class="box-header bg-light"><h6 class="mb-0 fw-bold">Accesos</h6></div>
                        <div class="list-group list-group-flush">
                            <button class="list-group-item list-group-item-action py-3 d-flex align-items-center gap-3" onclick="document.getElementById('link-mis-tesis').click()">
                                <div class="bg-primary bg-opacity-10 p-2 rounded text-primary"><i class="bi bi-pencil-square"></i></div>
                                <div><h6 class="mb-0">Evaluar Pendientes</h6><small class="text-muted">Ir a gestión</small></div>
                            </button>
                            <button class="list-group-item list-group-item-action py-3 d-flex align-items-center gap-3" onclick="document.querySelector('[data-bs-target=\'#reportes-tab\']').click()">
                                <div class="bg-success bg-opacity-10 p-2 rounded text-success"><i class="bi bi-file-earmark-arrow-down"></i></div>
                                <div><h6 class="mb-0">Descargar Reporte</h6><small class="text-muted">Exportar Excel</small></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- === 2. MIS TESIS === -->
        <div class="tab-pane fade" id="tesis-tab">
            <div class="content-box">
                <div class="box-header no-print">
                    <h5 class="mb-0 fw-bold text-dark">Gestión</h5>
                    <input type="text" class="form-control form-control-sm global-search" placeholder="Buscar..." style="width: 250px;">
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead><tr><th class="ps-4">Estado</th><th>Proyecto</th><th>Alumno</th><th>Archivo</th><th class="text-end pe-4 no-print">Acciones</th></tr></thead>
                        <tbody class="searchable-table" id="docenteTableBody">
                            <c:forEach var="t" items="${listaTesis}">
                                <!-- Semáforo -->
                                <c:set var="semaforo" value="#10b981" /> 
                                <c:if test="${t.estado == 'En Revisión' && not empty t.fechaUltimaModificacion}">
                                    <c:set var="diff" value="${now.time - t.fechaUltimaModificacion.time}" />
                                    <c:if test="${diff > limitMillis}"><c:set var="semaforo" value="#ef4444" /></c:if>
                                </c:if>

                                <tr data-id="${t.id}" data-titulo="${t.titulo}" data-alumno="${t.nombreAlumno}">
                                    <td class="ps-4">
                                        <c:choose>
                                            <c:when test="${t.estado == 'En Revisión'}"><span class="status-badge st-revision"><span style="color:${semaforo}; font-size:1.2rem;">●</span> En Revisión</span></c:when>
                                            <c:when test="${t.estado == 'Aprobado'}"><span class="status-badge st-aprobado">Aprobado</span></c:when>
                                            <c:when test="${t.estado == 'Observado'}"><span class="status-badge st-observado">Observado</span></c:when>
                                            <c:otherwise><span class="badge bg-light text-secondary border">Asignado</span></c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td><div class="fw-bold text-dark text-wrap" style="max-width: 300px;">${t.titulo}</div><small class="text-muted">Ult. Mod: <fmt:formatDate value="${t.fechaUltimaModificacion}" pattern="dd/MM/yyyy"/></small></td>
                                    <td>${t.nombreAlumno}</td>
                                    <td><c:if test="${not empty t.archivoActualUrl}"><a href="DescargaServlet?archivo=${t.archivoActualUrl}" target="_blank" class="btn btn-sm btn-light border text-danger no-print"><i class="bi bi-file-pdf-fill"></i> PDF</a></c:if></td>
                                    <td class="text-end pe-4 no-print">
                                        <button class="btn btn-light btn-action btn-historial text-secondary border" title="Historial" data-bs-toggle="modal" data-bs-target="#modalHistorial"><i class="bi bi-clock-history"></i></button>
                                        <c:if test="${t.estado != 'Asignado'}"><button class="btn btn-light btn-action btn-acta text-dark border" title="Acta" data-bs-toggle="modal" data-bs-target="#modalActa"><i class="bi bi-printer"></i></button></c:if>
                                        <button class="btn btn-primary btn-action btn-revisar ms-1" title="Evaluar" data-bs-toggle="modal" data-bs-target="#modalRubrica"><i class="bi bi-pencil-square"></i></button>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- === 3. ESTUDIANTES === -->
        <div class="tab-pane fade" id="estudiantes-tab">
            <div class="content-box">
                <div class="box-header">
                    <h5 class="mb-0 fw-bold text-dark">Directorio</h5>
                    <input type="text" class="form-control form-control-sm global-search" placeholder="Buscar..." style="width: 250px;">
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead><tr><th class="ps-4">Estudiante</th><th>Proyecto</th><th>Estado</th><th class="text-end pe-4">Detalles</th></tr></thead>
                        <tbody class="searchable-table">
                            <c:forEach var="t" items="${listaTesis}">
                                <tr data-id="${t.id}">
                                    <td class="ps-4 fw-medium"><div class="d-flex align-items-center gap-2"><div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary" style="width: 32px; height: 32px;"><i class="bi bi-person-fill"></i></div>${t.nombreAlumno}</div></td>
                                    <td class="text-muted small text-truncate" style="max-width: 250px;">${t.titulo}</td>
                                    <td><span class="badge bg-light text-dark border">${t.estado}</span></td>
                                    <td class="text-end pe-4">
                                        <button class="btn btn-sm btn-outline-info border-0 btn-detalle-alumno" data-bs-toggle="modal" data-bs-target="#modalDetalleAlumno">
                                            <i class="bi bi-eye-fill me-1"></i> Ver Calificación
                                        </button>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- === 4. REPORTES (FIXED) === -->
        <div class="tab-pane fade" id="reportes-tab">
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="report-card h-100 bg-white border rounded-3 p-4 shadow-sm position-relative overflow-hidden">
                        <div class="report-bg-icon text-success"><i class="bi bi-file-earmark-spreadsheet"></i></div>
                        <div class="report-card-content">
                            <h4 class="fw-bold text-dark mb-2">Carga Lectiva</h4>
                            <p class="text-muted mb-4">Exporte el listado completo de sus estudiantes asignados.</p>
                            <button onclick="exportTableToCSV('docenteTableBody', 'carga_lectiva.csv')" class="btn btn-success"><i class="bi bi-download me-2"></i> Descargar Excel</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="report-card h-100 bg-white border rounded-3 p-4 shadow-sm position-relative overflow-hidden">
                        <div class="report-bg-icon text-dark"><i class="bi bi-printer"></i></div>
                        <div class="report-card-content">
                            <h4 class="fw-bold text-dark mb-2">Actas de Evaluación</h4>
                            <p class="text-muted mb-4">Para imprimir actas, vaya a "Mis Tesis" y use el botón de impresora.</p>
                            <button onclick="document.getElementById('link-mis-tesis').click()" class="btn btn-outline-dark">Ir a Mis Tesis</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab-pane fade" id="historial-tab"><div class="alert alert-info border-0 shadow-sm"><i class="bi bi-info-circle-fill me-2"></i> Seleccione una tesis en la pestaña <strong>"Mis Tesis"</strong>.</div></div>
    </div>
</main>

<!-- MODALES -->
<div class="modal fade" id="modalRubrica" tabindex="-1" aria-hidden="true" data-bs-backdrop="static"><div class="modal-dialog modal-fullscreen"><div class="modal-content border-0"><div class="modal-header bg-primary text-white py-2 no-print" style="background-color:#0f766e!important;"><div class="d-flex align-items-center gap-3"><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button><h5 class="modal-title fw-bold mb-0">Evaluación Académica</h5><div class="vr opacity-50 mx-2"></div><div class="small opacity-75" id="rubricaTitulo">...</div></div><div class="d-flex align-items-center gap-4"><div class="text-end"><div class="small opacity-75 text-uppercase" style="font-size:0.7rem;">Puntaje</div><div class="d-flex align-items-center gap-2"><div class="h3 fw-bold mb-0" id="displayPuntaje">0.0</div></div></div><div class="text-end"><div class="small opacity-75 text-uppercase" style="font-size:0.7rem;">Condición</div><div class="badge bg-danger" id="displayCondicion">RECHAZADO</div></div></div></div><form id="formRubrica" action="DocenteController" method="POST" class="d-flex flex-column h-100"><input type="hidden" name="accion" value="guardarRevision"><input type="hidden" id="rubricaTesisId" name="tesisId"><div class="modal-body bg-light p-0"><div class="container-fluid h-100 d-flex flex-column p-0"><div class="bg-white border-bottom p-2 px-4 d-flex justify-content-between align-items-center shadow-sm z-1"><div class="small text-muted"><i class="bi bi-info-circle me-1"></i> Complete 38 criterios.</div><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-success" id="btnFillAll">Todo Cumple</button><button type="button" class="btn btn-sm btn-outline-secondary" id="btnClearAll">Limpiar</button></div></div><div class="row g-0 flex-grow-1 overflow-hidden"><div class="col-lg-8 h-100 position-relative"><div class="rubric-container p-4"><table class="table table-bordered table-hover mb-0 rubric-table"><thead><tr><th style="width:50px;" class="text-center">#</th><th>Criterio</th><th style="width:70px;" class="text-center text-success bg-success bg-opacity-10">C (1)</th><th style="width:70px;" class="text-center text-warning bg-warning bg-opacity-10">CP (0.5)</th><th style="width:70px;" class="text-center text-danger bg-danger bg-opacity-10">NC (0)</th></tr></thead><tbody id="cuerpoRubrica"></tbody></table></div></div><div class="col-lg-4 h-100 bg-white border-start p-4 d-flex flex-column shadow-sm"><div class="mb-4 p-3 bg-light rounded border"><label class="fw-bold text-dark mb-1 small text-uppercase">Plazo</label><input type="date" name="fechaLimite" class="form-control"></div><h6 class="fw-bold text-dark mb-2">Feedback</h6><div class="flex-grow-1 mb-3"><textarea class="form-control h-100 p-3" name="comentarios" placeholder="Observaciones..." required style="resize:none; background-color:#f8fafc;"></textarea></div><button type="submit" class="btn btn-primary w-100 py-3 fw-bold shadow-sm" style="background-color:#0f766e; border:none;">GUARDAR</button></div></div></div></div></form></div></div></div>
<div class="modal fade" id="modalDetalleAlumno" tabindex="-1"><div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content border-0 shadow-lg"><div class="modal-header bg-white border-bottom-0"><h5 class="modal-title fw-bold text-dark">Detalle de Calificación</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body p-0" id="detalleAlumnoContent"></div></div></div></div>
<div class="modal fade" id="modalActa" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content border-0"><div class="modal-header no-print"><h5 class="modal-title">Vista Previa Acta</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body p-0" id="actaContent"></div></div></div></div>
<div class="modal fade" id="modalHistorial" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 shadow"><div class="modal-header bg-light"><h5 class="modal-title fw-bold text-dark">Historial</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body p-4" id="historialContent"></div></div></div></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    function exportTableToCSV(tableId, filename) { let csv = []; let rows = document.querySelectorAll('#' + tableId + ' tr'); rows.forEach(function(row) { let cols = row.querySelectorAll('td, th'); let data = []; for (let i=0; i<cols.length-1; i++) data.push('"' + cols[i].innerText.replace(/"/g, '""') + '"'); csv.push(data.join(",")); }); let blob = new Blob([csv.join("\n")], { type: "text/csv" }); let url = window.URL.createObjectURL(blob); let a = document.createElement("a"); a.href = url; a.download = filename; a.click(); }
    document.querySelectorAll('.global-search').forEach(function(input) { input.addEventListener('keyup', function() { let term = this.value.toLowerCase(); let tbody = this.closest('.content-box').querySelector('.searchable-table'); if(tbody) { tbody.querySelectorAll('tr').forEach(function(r) { r.style.display = r.innerText.toLowerCase().includes(term) ? '' : 'none'; }); } }); });
    document.addEventListener('click', function(e) {
        const row = e.target.closest('tr'); if (!row) return;
        if (e.target.closest('.btn-revisar')) { document.getElementById('rubricaTesisId').value = row.dataset.id; document.getElementById('rubricaTitulo').textContent = row.dataset.titulo + " | " + row.dataset.alumno; document.getElementById('formRubrica').reset(); updateScore(); }
        if (e.target.closest('.btn-historial')) { const c = document.getElementById('historialContent'); c.innerHTML = '<div class="text-center py-3"><div class="spinner-border text-primary"></div></div>'; fetch('DocenteController?accion=verHistorial&tesisId=' + row.dataset.id).then(function(r){return r.text()}).then(function(h){c.innerHTML=h}); }
        if (e.target.closest('.btn-acta')) { const c = document.getElementById('actaContent'); c.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-secondary"></div></div>'; fetch('DocenteController?accion=verActa&tesisId=' + row.dataset.id).then(function(r){return r.text()}).then(function(h){c.innerHTML=h}); }
        if (e.target.closest('.btn-detalle-alumno')) { const c = document.getElementById('detalleAlumnoContent'); c.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-info"></div></div>'; fetch('DocenteController?accion=verDetalleRubrica&tesisId=' + row.dataset.id).then(function(r){return r.text()}).then(function(h){c.innerHTML=h}); }
    });
    // Items Rubrica (COMPLETOS)
    const itemsRubrica = [
        { t: "I. Título", c: "1. Es concordante con las variables de estudio, nivel y alcance de la investigación." },
        { t: "II. Resumen", c: "2. El resumen contempla, objetivo, metodología, resultado principal y conclusión general." }, { t: "", c: "3. El resumen no excede las 250 palabras con presenta entre 4 a 6 palabras claves." },
        { t: "III. Introducción", c: "4. Sintetiza el tema de investigación de forma clara y resumida." },
        { t: "IV. Problema", c: "5. Describe el problema desde el punto de vista científico considerando causas, síntomas y pronósticos." }, { t: "", c: "6. La formulación del problema considera variables y dimensiones." },
        { t: "V. Justificación", c: "7. La justificación social determina la contribución hacia la sociedad." }, { t: "", c: "8. La justificación teórica determina la generalización de los resultados." }, { t: "", c: "9. La justificación metodológica considera las razones de los métodos planteados." },
        { t: "VI. Objetivos", c: "10. El objetivo general tiene relación con el problema y el título." }, { t: "", c: "11. Los objetivos específicos están en relación con los problemas específicos." },
        { t: "VII. Ética", c: "12. Describe las implicancias éticas del estudio basado en principios y normas." },
        { t: "VIII. Marco Teórico", c: "13. Los antecedentes consideran objetivo, metodología, variables, resultados y conclusión." }, { t: "", c: "14. Los antecedentes son artículos y tesis < 5 años antigüedad." }, { t: "", c: "15. Las bases teóricas consideran información de las variables y dimensiones." }, { t: "", c: "16. El marco conceptual considera una descripción breve de variables y términos." },
        { t: "IX. Hipótesis", c: "17. Las hipótesis son claras, dan respuesta a problemas y relación con objetivos." },
        { t: "X. Variables", c: "18. Identifica, clasifica y describe las variables del estudio." }, { t: "", c: "19. Operacionaliza las variables (def. conceptual, operacional, dimensiones, indicadores)." },
        { t: "XI. Metodología", c: "20. Identifica y describe método general y específico." }, { t: "", c: "21. Identifica y describe el tipo de investigación." }, { t: "", c: "22. Identifica y describe el nivel de investigación." }, { t: "", c: "23. Describe el diseño de investigación (manipulación y alcance)." }, { t: "", c: "24. Identifica y describe características de la población." }, { t: "", c: "25. Identifica la muestra, cálculo muestral y criterios inclusión/exclusión." }, { t: "", c: "26. Describe técnica e instrumento, confiabilidad y validez." }, { t: "", c: "27. Establece técnicas de procesamiento de datos." }, { t: "", c: "28. Establece procedimiento de contrastación de hipótesis." },
        { t: "XII. Resultados", c: "29. Resultados presentados en tablas/gráficos, explicados e interpretados." }, { t: "", c: "30. Presenta contrastación de hipótesis e interpretación estadística." },
        { t: "XIII. Análisis", c: "31. Se establece y redacta ordenadamente por objetivo/variable." }, { t: "", c: "32. Contrasta similitud/discrepancias con antecedentes." },
        { t: "XIV. Conclusiones", c: "33. Establece nivel de alcance hallado en relación a objetivos." },
        { t: "XV. Recomendaciones", c: "34. Derivadas de conclusiones, propuestas de mejora." },
        { t: "XVI. Referencias", c: "35. Establecidas de acuerdo a norma bibliográfica." },
        { t: "XVII. Anexos", c: "36. Considera anexos exigidos ordenadamente." },
        { t: "XVIII. Forma", c: "37. Considera formato señalado por reglamento." }, { t: "", c: "38. Documento ordenado, ortografía, redacción, formato adecuado." }
    ];
    const tbody = document.getElementById('cuerpoRubrica'); let html = "";
    itemsRubrica.forEach(function(item, index) { let i = index + 1; let header = item.t ? ('<tr class="section-header"><td colspan="5">' + item.t + '</td></tr>') : ""; html += header; html += '<tr><td class="text-center fw-bold text-secondary">' + i + '</td><td>' + item.c + '</td><td class="text-center"><input type="radio" class="form-check-input score-radio" name="criterio_' + i + '" value="1.0" required></td><td class="text-center"><input type="radio" class="form-check-input score-radio" name="criterio_' + i + '" value="0.5"></td><td class="text-center"><input type="radio" class="form-check-input score-radio" name="criterio_' + i + '" value="0.0"></td></tr>'; });
    tbody.innerHTML = html;
    function updateScore() { let total = 0; document.querySelectorAll('.score-radio:checked').forEach(function(r) { total += parseFloat(r.value); }); document.getElementById('displayPuntaje').textContent = total.toFixed(1); let badge = document.getElementById('displayCondicion'); if (total >= 25) { badge.textContent = "APROBADO"; badge.className = "badge bg-success"; } else if (total >= 13) { badge.textContent = "OBSERVADO"; badge.className = "badge bg-warning text-dark"; } else { badge.textContent = "RECHAZADO"; badge.className = "badge bg-danger"; } }
    document.getElementById('formRubrica').addEventListener('change', function(e) { if(e.target.classList.contains('score-radio')) updateScore(); });
    document.getElementById('btnFillAll').addEventListener('click', function() { document.querySelectorAll('input[value="1.0"]').forEach(function(r){r.checked=true}); updateScore(); });
    document.getElementById('btnClearAll').addEventListener('click', function() { document.querySelectorAll('.score-radio').forEach(function(r){r.checked=false}); updateScore(); });
</script>
</body>
</html>