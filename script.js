// ===== SCRIPT SIMPLIFICADO PARA ESTADIAYA =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FORMULARIO DE NEWSLETTER =====
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const termsCheckbox = document.getElementById('terms');
            
            if (!emailInput.value || !termsCheckbox.checked) {
                showAlert('Por favor completa todos los campos y acepta los términos.', 'warning');
                return;
            }
            
            // Actualizar contador
            const leadCount = document.getElementById('leadCount');
            const currentCount = parseInt(leadCount.textContent.replace(',', ''));
            leadCount.textContent = (currentCount + 1).toLocaleString();
            
            // Mostrar éxito
            showAlert('¡Gracias! Te avisaremos cuando lancemos la app.', 'success');
            
            // Resetear formulario
            leadForm.reset();
            
            // Simular envío
            console.log('Lead capturado:', emailInput.value);
        });
    }
    
    // ===== BOTONES DE DESCARGA =====
    const downloadButtons = ['appStoreBtn', 'playStoreBtn'];
    downloadButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const store = this.querySelector('.fw-bold').textContent;
                showDownloadModal(store);
            });
        }
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showAlert('Por favor completa todos los campos.', 'warning');
                return;
            }
            
            // Mostrar éxito
            showAlert('¡Mensaje enviado! Te responderemos pronto.', 'success');
            contactForm.reset();
            
            // Simular envío
            console.log('Mensaje de contacto:', {name, email, subject, message});
        });
    }
    
    // ===== CONTADOR DE DÍAS HASTA LANZAMIENTO =====
    function updateLaunchCounter() {
        const daysLeftElement = document.getElementById('daysLeft');
        if (!daysLeftElement) return;
        
        // Fecha objetivo de lanzamiento (15 días desde hoy)
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 15);
        
        // Calcular días restantes
        const today = new Date();
        const diffTime = launchDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        daysLeftElement.textContent = diffDays > 0 ? diffDays : 0;
    }
    
    updateLaunchCounter();
    
    // ===== ACTUALIZAR AÑO EN FOOTER =====
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ===== FUNCIONES DE UTILIDAD =====
    function showDownloadModal(store) {
        // Usar modal de Bootstrap
        const modalHTML = `
            <div class="modal fade" id="downloadModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title fw-bold">¡Gracias por tu interés!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <div class="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 mx-auto" style="width: 70px; height: 70px;">
                                <i class="bi bi-phone fs-3"></i>
                            </div>
                            <h5 class="fw-bold mb-3">EstadiaYa en ${store}</h5>
                            <p class="text-muted mb-4">
                                La app estará disponible pronto. Mientras tanto, podés registrarte para ser de los primeros en probarla.
                            </p>
                        </div>
                        <div class="modal-footer border-0 justify-content-center">
                            <a href="#newsletter" class="btn btn-primary px-4" data-bs-dismiss="modal">
                                <i class="bi bi-bell me-2"></i>Notificarme al lanzar
                            </a>
                            <button type="button" class="btn btn-outline-primary px-4" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Crear e insertar modal
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('downloadModal'));
        modal.show();
        
        // Remover modal después de cerrar
        document.getElementById('downloadModal').addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(modalContainer);
        });
    }
    
    function showAlert(message, type = 'info') {
        // Crear alerta de Bootstrap
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" 
                 style="z-index: 9999; min-width: 300px;" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        const alertContainer = document.createElement('div');
        alertContainer.innerHTML = alertHTML;
        document.body.appendChild(alertContainer);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertContainer.querySelector('.alert'));
            bsAlert.close();
        }, 5000);
    }
    
    // ===== ANIMACIONES AL SCROLL =====
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos para animar
        document.querySelectorAll('.card, .display-5, .lead').forEach(el => {
            observer.observe(el);
        });
    }
    
    initScrollAnimations();
    
    // ===== MEJORAR EXPERIENCIA DE FORMULARIOS =====
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Enviando...';
                submitBtn.disabled = true;
                
                // Restaurar después de 2 segundos (simulación)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
});