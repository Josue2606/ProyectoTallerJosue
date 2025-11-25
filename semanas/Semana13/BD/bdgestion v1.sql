-- ==========================================================
-- 1. Tabla de Trámites (El proceso global)
-- ==========================================================
CREATE TABLE tramites (
    id_tramite INT AUTO_INCREMENT PRIMARY KEY,
    
    -- ADAPTACIÓN: Usamos VARCHAR(20) para coincidir con usuarios.codigo
    codigo_estudiante VARCHAR(20) NOT NULL, 
    
    estado_actual ENUM(
        'Iniciado', 
        'Revisión de Carpeta', 
        'Designación de Jurado', 
        'Apto para Sustentar', 
        'Sustentación Programada', 
        'Titulado'
    ) DEFAULT 'Iniciado',
    
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relación con tu tabla de usuarios existente
    CONSTRAINT fk_tramite_usuario FOREIGN KEY (codigo_estudiante) 
    REFERENCES usuarios(codigo) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ==========================================================
-- 2. Tabla de Documentos Requisito (Archivos subidos)
-- ==========================================================
CREATE TABLE documentos_requisito (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    id_tramite INT NOT NULL,
    
    tipo_documento ENUM(
        'Solicitud', 
        'DNI', 
        'Bachiller', 
        'Certificado_Idiomas', 
        'Constancia_Practicas', 
        'Foto'
    ) NOT NULL,
    
    ruta_archivo VARCHAR(255) NOT NULL, 
    estado_validacion ENUM('Pendiente', 'Validado', 'Rechazado') DEFAULT 'Pendiente',
    observacion_rechazo TEXT, 
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_documento_tramite FOREIGN KEY (id_tramite) 
    REFERENCES tramites(id_tramite) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ==========================================================
-- 3. Tabla de Notificaciones (Alertas)
-- ==========================================================
CREATE TABLE notificaciones (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    
    -- ADAPTACIÓN: Usamos VARCHAR(20) para el destinatario
    codigo_usuario_destino VARCHAR(20) NOT NULL, 
    
    mensaje TEXT NOT NULL,
    tipo ENUM('Sistema', 'Email_Simulado', 'SMS_Simulado') NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_notificacion_usuario FOREIGN KEY (codigo_usuario_destino) 
    REFERENCES usuarios(codigo) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;