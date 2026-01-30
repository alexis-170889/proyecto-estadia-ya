// ===== SCRIPT COMPLETO PARA ESTADIAYA =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Cambiar ícono del menú
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ===== FORMULARIO DE CAPTURA DE LEADS =====
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const terms = document.getElementById('terms').checked;
            
            if (!email || !terms) {
                alert('Por favor completa todos los campos y acepta los términos.');
                return;
            }
            
            // Simular envío a servidor
            const leadCount = document.getElementById('leadCount');
            const currentCount = parseInt(leadCount.textContent.replace(',', ''));
            leadCount.textContent = (currentCount + 1).toLocaleString();
            
            // Mostrar confirmación
            mostrarNotificacion('¡Gracias! Te avisaremos cuando lancemos la app.', 'success');
            
            // Resetear formulario
            leadForm.reset();
            
            // Enviar datos a servidor (simulado)
            console.log('Lead capturado:', email);
            
            // Aquí iría el código real para enviar a tu backend
            // fetch('/api/leads', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({email: email})
            // });
        });
    }
    
    // ===== BOTONES DE DESCARGA =====
    const appStoreBtn = document.getElementById('appStoreBtn');
    const playStoreBtn = document.getElementById('playStoreBtn');
    
    [appStoreBtn, playStoreBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const store = btn.querySelector('.store-name').textContent;
                mostrarModalDescarga(store);
            });
        }
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!name || !email || !subject || !message) {
                mostrarNotificacion('Por favor completa todos los campos.', 'error');
                return;
            }
            
            // Simular envío
            mostrarNotificacion('¡Mensaje enviado! Te responderemos pronto.', 'success');
            contactForm.reset();
            
            // Aquí iría el código real para enviar el formulario
            console.log('Mensaje de contacto:', {name, email, subject, message});
        });
    }
    
    // ===== CHAT WIDGET =====
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const openChatBtn = document.getElementById('openChat');
    
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
        });
        
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatContainer.classList.remove('active');
            });
        }
        
        // Cerrar chat al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!chatToggle.contains(e.target) && !chatContainer.contains(e.target)) {
                chatContainer.classList.remove('active');
            }
        });
        
        // Botón "Abrir chat" en la sección de contacto
        if (openChatBtn) {
            openChatBtn.addEventListener('click', function(e) {
                e.preventDefault();
                chatContainer.classList.add('active');
            });
        }
        
        // Funcionalidad del chat
        const chatInput = chatContainer?.querySelector('.chat-input input');
        const chatSend = chatContainer?.querySelector('.chat-input .btn');
        const chatBody = chatContainer?.querySelector('.chat-body');
        
        if (chatSend && chatInput && chatBody) {
            chatSend.addEventListener('click', enviarMensajeChat);
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    enviarMensajeChat();
                }
            });
            
            function enviarMensajeChat() {
                const message = chatInput.value.trim();
                if (!message) return;
                
                // Agregar mensaje del usuario
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message';
                userMessage.style.cssText = `
                    background: linear-gradient(135deg, var(--mandarina), var(--lavanda));
                    color: white;
                    align-self: flex-end;
                    margin-left: auto;
                `;
                userMessage.innerHTML = `<p>${message}</p>`;
                chatBody.appendChild(userMessage);
                
                // Limpiar input
                chatInput.value = '';
                
                // Scroll al final
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Respuesta automática después de 1 segundo
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot';
                    botMessage.innerHTML = `<p>Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. ¿Hay algo más en lo que pueda ayudarte?</p>`;
                    chatBody.appendChild(botMessage);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
    }
    
    // ===== CONTADOR PARA DÍAS HASTA LANZAMIENTO =====
    function actualizarContadorLanzamiento() {
        const daysLeftElement = document.getElementById('daysLeft');
        if (!daysLeftElement) return;
        
        // Fecha objetivo de lanzamiento (15 días desde hoy)
        const fechaLanzamiento = new Date();
        fechaLanzamiento.setDate(fechaLanzamiento.getDate() + 15);
        
        // Calcular días restantes
        const hoy = new Date();
        const diffTime = fechaLanzamiento - hoy;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        daysLeftElement.textContent = diffDays > 0 ? diffDays : 0;
    }
    
    actualizarContadorLanzamiento();
    
    // ===== ANIMACIONES AL SCROLL =====
    function observarElementos() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos para animar
        document.querySelectorAll('.feature-card, .news-card, .contact-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    observarElementos();
    
    // ===== FUNCIONES DE UTILIDAD =====
    function mostrarModalDescarga(store) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>¡Gracias por tu interés!</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <p>La app de <strong>EstadiaYa</strong> estará disponible pronto en ${store}.</p>
                    <p>Mientras tanto, podés registrarte para ser de los primeros en probarla.</p>
                    
                    <div class="modal-actions">
                        <a href="#newsletter" class="btn btn-primary">
                            <i class="fas fa-bell"></i> Notificarme al lanzar
                        </a>
                        <button class="btn btn-outline modal-close-btn">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos del modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalElement = modal.querySelector('.modal');
        modalElement.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            animation: slideUp 0.3s ease;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        `;
        
        // Estilos para animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Funcionalidad de cierre
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    function mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear notificación
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        
        // Estilos de la notificación
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 2000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 3s forwards;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        if (tipo === 'success') {
            notificacion.style.background = 'linear-gradient(135deg, #52D1A6, #46c095)';
        } else if (tipo === 'error') {
            notificacion.style.background = 'linear-gradient(135deg, #FF6F4A, #ff5a30)';
        } else {
            notificacion.style.background = 'linear-gradient(135deg, #A78DED, #9675e0)';
        }
        
        // Animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3.5 segundos
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 3500);
    }
    
    // ===== SCROLL SUAVE PARA ANCLAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTUALIZAR AÑO EN FOOTER =====
    const yearSpan = document.querySelector('footer .footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
    }
});