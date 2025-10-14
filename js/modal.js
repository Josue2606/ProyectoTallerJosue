// Funcionalidad del modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contentModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});