<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<jsp:useBean id="now" class="java.util.Date" />

<%
    String nombreUsuario = (String) session.getAttribute("nombre");
    if (nombreUsuario == null) { nombreUsuario = "Estudiante"; }
    
    com.gestortes.modelo.Tesis tesis = (com.gestortes.modelo.Tesis) request.getAttribute("tesis");
    int progreso = 0;
    String estadoClass = "secondary";
    String mensajeEstado = "Sin Asignación";
    
    if (tesis != null) {
        String est = tesis.getEstado();
        if ("Asignado".equals(est)) { progreso = 10; estadoClass = "info"; mensajeEstado = "Iniciado"; }
        else if ("En Revisión".equals(est)) { progreso = 50; estadoClass = "primary"; mensajeEstado = "En Revisión"; }
        else if ("Observado".equals(est)) { progreso = 30; estadoClass = "warning"; mensajeEstado = "Observado"; }
        else if ("Aprobado".equals(est)) { progreso = 100; estadoClass = "success"; mensajeEstado = "Aprobado"; }
        else if ("Rechazado".equals(est)) { progreso = 0; estadoClass = "danger"; mensajeEstado = "Rechazado"; }
    }
%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Estudiante</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:wght@300;700&display=swap" rel="stylesheet">
    
    <style>
        /* Palette Indigo */
        :root { --primary-bg: #4338ca; --sidebar-bg: #312e81; --accent: #8b5cf6; --text-dark: #1e293b; --bg-light: #f8fafc; --sidebar-width: 260px; }
        body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); }
        h1, h2, h3, h4, h5 { font-family: 'Merriweather', serif; }
        
        /* Sidebar */
        .sidebar { width: var(--sidebar-width); height: 100vh; position: fixed; top: 0; left: 0; background: var(--sidebar-bg); color: white; z-index: 1000; display: flex; flex-direction: column; box-shadow: 4px 0 10px rgba(0,0,0,0.1); }
        .sidebar-brand { padding: 1.5rem; font-size: 1.2rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px; color: #e0e7ff; text-decoration: none; }
        .nav-pills { flex-grow: 1; padding-top: 1rem; }
        .nav-link { color: rgba(255,255,255,0.7); padding: 0.9rem 1.5rem; font-weight: 500; display: flex; align-items: center; gap: 12px; border-radius: 0; border-left: 4px solid transparent; transition: all 0.2s; }
        .nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .nav-link.active { background: rgba(139, 92, 246, 0.2); color: #fff; border-left: 4px solid var(--accent); }
        .user-profile { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.15); }
        
        /* Content */
        .main-content { margin-left: var(--sidebar-width); padding: 2rem; transition: margin 0.3s; }
        
        /* Cards */
        .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); height: 100%; border-top: 4px solid transparent; }
        .content-box { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden; margin-bottom: 2rem; border: 1px solid #e2e8f0; }
        .box-header { padding: 1.2rem 1.5rem; background: white; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        
        /* Notificaciones */
        .notification-bell { position: relative; cursor: pointer; font-size: 1.4rem; color: #64748b; transition: color 0.2s; }
        .notification-bell:hover { color: var(--primary-bg); }
        .notification-badge { position: absolute; top: -2px; right: -2px; padding: 0.25em 0.5em; font-size: 0.65rem; }
        
        @media (max-width: 992px) { .sidebar { transform: translateX(-100%); } .sidebar.active { transform: translateX(0); } .main-content { margin-left: 0; } }
    </style>
</head>
<body>

<button class="btn btn-dark d-lg-none position-fixed bottom-0 end-0 m-3 rounded-circle shadow z-3" onclick="document.querySelector('.sidebar').classList.toggle('active')" style="width: 50px; height: 50px;"><i class="bi bi-list"></i></button>

<aside class="sidebar">
    <a href="#" class="sidebar-brand"><i class="bi bi-mortarboard-fill text-warning me-2"></i> Portal Estudiante</a>
    <div class="nav flex-column nav-pills pt-3" id="v-pills-tab" role="tablist">
        <small class="text-uppercase text-white-50 px-4 mb-2 mt-2" style="font-size:0.7rem;">Mi Proyecto</small>
        <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#dashboard-tab"><i class="bi bi-speedometer2 me-2"></i> Avance</button>
        <button class="nav-link" id="link-gestion" data-bs-toggle="pill" data-bs-target="#gestion-tab"><i class="bi bi-cloud-upload me-2"></i> Entregas</button>
        <button class="nav-link" data-bs-toggle="pill" data-bs-target="#historial-tab"><i class="bi bi-clock-history me-2"></i> Historial</button>
    </div>
    <div class="user-profile mt-auto p-4 bg-black bg-opacity-10 border-top border-white-10">
        <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold" style="width:40px; height:40px;"><%= nombreUsuario.substring(0, 1) %></div>
            <div class="overflow-hidden"><div class="text-white fw-bold text-truncate" style="max-width:130px;"><%= nombreUsuario %></div><div class="text-white-50 small">Estudiante</div></div>
            <a href="LogoutServlet" class="btn btn-sm btn-outline-light border-0 ms-auto"><i class="bi bi-box-arrow-right fs-5"></i></a>
        </div>
    </div>
</aside>

<main class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div><h3 class="fw-bold text-dark mb-0">Mi Tesis</h3><p class="text-muted small mb-0">Seguimiento de proyecto.</p></div>
        <div class="d-flex gap-3 align-items-center">
            <div class="bg-white px-3 py-2 rounded-pill shadow-sm small text-muted border me-2"><i class="bi bi-calendar3 text-primary me-2"></i> <fmt:formatDate value="<%= new java.util.Date() %>" pattern="dd/MM/yyyy" /></div>
            
            <!-- Campana Notificaciones -->
            <div class="dropdown">
                <div class="notification-bell" data-bs-toggle="dropdown">
                    <i class="bi bi-bell-fill"></i>
                    <c:if test="${countNotificaciones > 0}"><span class="badge rounded-pill bg-danger notification-badge">${countNotificaciones}</span></c:if>
                </div>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0" style="width: 300px;">
                    <li class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                        <h6 class="mb-0 fw-bold text-dark">Notificaciones</h6>
                        <c:if test="${countNotificaciones > 0}"><a href="AlumnoController?accion=marcarLeidas" class="small fw-bold text-decoration-none">Marcar leídas</a></c:if>
                    </li>
                    <div style="max-height: 250px; overflow-y: auto;">
                        <c:forEach var="n" items="${listaNotificaciones}">
                            <li class="dropdown-item p-3 border-bottom">
                                <p class="mb-1 small text-wrap lh-sm">${n.mensaje}</p>
                                <small class="text-muted" style="font-size: 0.65rem;"><fmt:formatDate value="${n.fecha}" pattern="dd MMM HH:mm"/></small>
                            </li>
                        </c:forEach>
                        <c:if test="${empty listaNotificaciones}"><li class="p-4 text-center text-muted small">Sin novedades.</li></c:if>
                    </div>
                </ul>
            </div>
        </div>
    </div>

    <c:if test="${not empty param.msg}"><div class="alert alert-success alert-dismissible fade show border-0 shadow-sm border-start border-success border-4 mb-4"><i class="bi bi-check-circle-fill me-2"></i> ${param.msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div></c:if>

    <div class="tab-content">
        
        <!-- DASHBOARD -->
        <div class="tab-pane fade show active" id="dashboard-tab">
            <c:choose>
                <c:when test="${not empty tesis}">
                    <div class="row g-4 mb-4">
                        <div class="col-md-8">
                            <div class="stat-card" style="border-top-color: var(--primary-bg); background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: white;">
                                <div class="d-flex flex-column justify-content-between h-100">
                                    <div><h6 class="text-white-50 text-uppercase small fw-bold mb-2">Proyecto Actual</h6><h3 class="fw-bold mb-1">${tesis.titulo}</h3></div>
                                    <div class="mt-4 d-flex align-items-center gap-2"><i class="bi bi-person-video3"></i> <span class="small">Revisor: ${tesis.nombreDocente}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-card" style="border-top-color: var(--accent);">
                                <h6 class="text-muted text-uppercase small fw-bold mb-3">Estado Actual</h6>
                                <div class="text-center py-2"><span class="badge bg-<%= estadoClass %> fs-5 px-4 py-2 rounded-pill text-uppercase shadow-sm"><%= mensajeEstado %></span></div>
                                <div class="mt-3 text-center"><small class="text-muted d-block">Progreso General</small><div class="progress mt-1" style="height: 8px;"><div class="progress-bar bg-<%= estadoClass %>" style="width: <%= progreso %>%"></div></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Alerta Plazos -->
                    <c:if test="${not empty tesis.fechaLimite && tesis.estado != 'Aprobado'}">
                        <c:set var="dias" value="${(tesis.fechaLimite.time - now.time) / (1000 * 60 * 60 * 24)}" />
                        <div class="alert ${dias < 0 ? 'alert-danger' : 'alert-info'} border-0 shadow-sm d-flex align-items-center mb-4">
                            <i class="bi bi-alarm-fill fs-4 me-3"></i>
                            <div><strong class="d-block text-uppercase small">Fecha Límite</strong><span class="fs-5 fw-bold"><fmt:formatDate value="${tesis.fechaLimite}" pattern="dd 'de' MMMM"/></span></div>
                        </div>
                    </c:if>

                    <div class="content-box p-4 text-center">
                        <h5 class="fw-bold text-dark">¿Nueva versión disponible?</h5>
                        <p class="text-muted">Sube tu documento PDF para revisión.</p>
                        <button class="btn btn-primary px-5 rounded-pill shadow-sm" onclick="document.getElementById('link-gestion').click()">Ir a Entregas</button>
                    </div>
                </c:when>
                <c:otherwise><div class="alert alert-info">No tienes proyecto asignado.</div></c:otherwise>
            </c:choose>
        </div>

        <!-- GESTIÓN (SUBIDA) -->
        <div class="tab-pane fade" id="gestion-tab">
            <div class="row">
                <div class="col-lg-5">
                    <div class="content-box p-4">
                        <h5 class="fw-bold text-dark mb-4">Subir Archivo</h5>
                        <form action="AlumnoController" method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="accion" value="subirVersion">
                            <input type="hidden" name="tesisId" value="${tesis.id}">
                            <div class="mb-4 text-center p-5 border border-2 border-dashed rounded bg-light">
                                <i class="bi bi-file-earmark-pdf display-4 text-secondary mb-3"></i>
                                <input type="file" name="archivoTesis" class="form-control" accept=".pdf" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Enviar a Revisión</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="content-box h-100">
                        <div class="box-header"><h6 class="mb-0 fw-bold">Entregas Recientes</h6></div>
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light"><tr><th>Versión</th><th>Fecha</th><th>Estado</th><th>Nota</th></tr></thead>
                                <tbody>
                                    <c:forEach var="h" items="${historial}">
                                        <tr>
                                            <td class="fw-bold">v${h.numeroVersion}</td>
                                            <td><fmt:formatDate value="${h.fechaSubida}" pattern="dd/MM HH:mm"/></td>
                                            <td><span class="badge bg-light text-dark border">${h.estadoVersion}</span></td>
                                            <td><c:if test="${h.puntajeTotal > 0}"><button class="btn btn-sm btn-outline-primary border-0 btn-ver-nota" data-id="${tesis.id}">Ver Nota</button></c:if></td>
                                        </tr>
                                    </c:forEach>
                                    <c:if test="${empty historial}"><tr><td colspan="4" class="text-center text-muted py-4">Sin historial.</td></tr></c:if>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- HISTORIAL -->
        <div class="tab-pane fade" id="historial-tab">
            <div class="content-box p-4">
                <h5 class="fw-bold mb-4">Línea de Tiempo</h5>
                <div class="ps-3 border-start border-2">
                    <c:forEach var="h" items="${historial}">
                        <div class="mb-4 ps-3 position-relative">
                            <div class="position-absolute top-0 start-0 translate-middle bg-white border border-2 border-primary rounded-circle" style="width:12px; height:12px; left:-1px;"></div>
                            <div class="d-flex justify-content-between">
                                <span class="fw-bold text-dark">Versión ${h.numeroVersion} - ${h.estadoVersion}</span>
                                <small class="text-muted"><fmt:formatDate value="${h.fechaSubida}" pattern="dd/MM HH:mm"/></small>
                            </div>
                            <c:if test="${not empty h.comentariosDocente}">
                                <div class="bg-light border rounded p-3 mt-2 fst-italic text-muted">"${h.comentariosDocente}"</div>
                            </c:if>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>

    </div>
</main>

<!-- Modal Nota -->
<div class="modal fade" id="modalNota" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 shadow"><div class="modal-header border-bottom-0"><h5 class="modal-title fw-bold">Calificación</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body p-0" id="notaContent"></div></div></div></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    document.addEventListener('click', function(e) {
        if(e.target.closest('.btn-ver-nota')) {
            const id = e.target.closest('.btn-ver-nota').dataset.id;
            const modal = new bootstrap.Modal(document.getElementById('modalNota'));
            document.getElementById('notaContent').innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';
            modal.show();
            fetch('AlumnoController?accion=verDetalleRubrica&tesisId=' + id).then(r => r.text()).then(h => document.getElementById('notaContent').innerHTML = h);
        }
    });
</script>
</body>
</html>