// Welcome Back Login Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginModalOverlay = document.getElementById('loginModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const loginForm = document.getElementById('loginForm');
    const googleBtn = document.querySelector('.gsi-material-button');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordToggleIcon = document.getElementById('passwordToggleIcon');

    // Show modal function
    function showModal() {
        loginModalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            loginModalOverlay.style.opacity = '1';
        }, 10);
    }

    // Hide modal function
    function hideModal() {
        loginModalOverlay.style.opacity = '0';
        setTimeout(() => {
            loginModalOverlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close modal events
    modalCloseBtn.addEventListener('click', hideModal);
    
    loginModalOverlay.addEventListener('click', function(e) {
        if (e.target === loginModalOverlay) {
            hideModal();
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Enhanced validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        // Simulate login with loading state
        const signinBtn = document.querySelector('.signin-button');
        const originalText = signinBtn.textContent;
        signinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        signinBtn.disabled = true;

        setTimeout(() => {
            showNotification('Login successful! Welcome back!', 'success');
            setTimeout(() => {
                hideModal();
                signinBtn.innerHTML = originalText;
                signinBtn.disabled = false;
                loginForm.reset();
            }, 1000);
        }, 2000);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.modal-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `modal-notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            padding: 16px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${message}
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        
        if (isPassword) {
            passwordInput.type = 'text';
            passwordToggleIcon.classList.remove('fa-eye');
            passwordToggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordToggleIcon.classList.remove('fa-eye-slash');
            passwordToggleIcon.classList.add('fa-eye');
        }
    });

    // Google Sign-In button with enhanced feedback
    googleBtn.addEventListener('click', function() {
        showNotification('Google sign in successful!', 'success');
    });

    // Forgot password - will be handled by forgot modal

    // Sign up link
    document.querySelector('.signup-text').addEventListener('click', function(e) {
        e.preventDefault();
        // Modal will open directly
    });

    // Make showModal available globally
    window.showAuthModal = showModal;
});

// Register Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const registerModalOverlay = document.getElementById('registerModalOverlay');
    const registerModalCloseBtn = document.getElementById('registerModalCloseBtn');
    const registerForm = document.getElementById('registerForm');
    const showRegisterModalBtn = document.getElementById('showRegisterModal');
    const showLoginModalBtn = document.getElementById('showLoginModal');
    
    // Password inputs and toggles
    const registerPasswordInput = document.getElementById('registerPassword');
    const registerPasswordToggle = document.getElementById('registerPasswordToggle');
    const registerPasswordToggleIcon = document.getElementById('registerPasswordToggleIcon');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const confirmPasswordToggleIcon = document.getElementById('confirmPasswordToggleIcon');
    
    // Password requirements
    const passwordRequirements = document.getElementById('passwordRequirements');
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number')
    };

    // Show register modal function
    function showRegisterModal() {
        registerModalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            registerModalOverlay.style.opacity = '1';
        }, 10);
        
        // Enhanced scrolling for the modal container
        const modalContainer = document.querySelector('.register-modal-container');
        if (modalContainer) {
            // Add momentum scrolling for iOS
            modalContainer.style.webkitOverflowScrolling = 'touch';
            // Smooth scroll to top when modal opens
            modalContainer.scrollTop = 0;
            
            // Mobile-specific optimizations
            if (window.innerWidth <= 768) {
                // Adjust modal height for mobile
                const viewportHeight = window.innerHeight;
                modalContainer.style.maxHeight = `${viewportHeight - 20}px`;
                
                // Prevent body scroll on mobile
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = '0';
            }
        }
    }

    // Hide register modal function
    function hideRegisterModal() {
        registerModalOverlay.style.opacity = '0';
        setTimeout(() => {
            registerModalOverlay.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            // Reset mobile-specific styles
            if (window.innerWidth <= 768) {
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
            }
        }, 300);
    }

    // Show login modal function
    function showLoginModal() {
        hideRegisterModal();
        setTimeout(() => {
            window.showAuthModal();
        }, 300);
    }

    // Close modal events
    registerModalCloseBtn.addEventListener('click', hideRegisterModal);
    
    registerModalOverlay.addEventListener('click', function(e) {
        if (e.target === registerModalOverlay) {
            hideRegisterModal();
        }
    });

    // Show register modal when signup link is clicked
    showRegisterModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterModal();
    });

    // Show login modal when signin link is clicked
    showLoginModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginModal();
    });

    // Password toggle functionality for register password
    registerPasswordToggle.addEventListener('click', function() {
        const isPassword = registerPasswordInput.type === 'password';
        
        if (isPassword) {
            registerPasswordInput.type = 'text';
            registerPasswordToggleIcon.classList.remove('fa-eye');
            registerPasswordToggleIcon.classList.add('fa-eye-slash');
        } else {
            registerPasswordInput.type = 'password';
            registerPasswordToggleIcon.classList.remove('fa-eye-slash');
            registerPasswordToggleIcon.classList.add('fa-eye');
        }
    });

    // Password toggle functionality for confirm password
    confirmPasswordToggle.addEventListener('click', function() {
        const isPassword = confirmPasswordInput.type === 'password';
        
        if (isPassword) {
            confirmPasswordInput.type = 'text';
            confirmPasswordToggleIcon.classList.remove('fa-eye');
            confirmPasswordToggleIcon.classList.add('fa-eye-slash');
        } else {
            confirmPasswordInput.type = 'password';
            confirmPasswordToggleIcon.classList.remove('fa-eye-slash');
            confirmPasswordToggleIcon.classList.add('fa-eye');
        }
    });

    // Password requirements validation
    function validatePasswordRequirements(password) {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        };

        Object.keys(checks).forEach(key => {
            const requirement = requirements[key];
            const icon = requirement.querySelector('i');
            
            if (checks[key]) {
                requirement.classList.add('valid');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-check');
            } else {
                requirement.classList.remove('valid');
                icon.classList.remove('fa-check');
                icon.classList.add('fa-times');
            }
        });

        return Object.values(checks).every(check => check);
    }

    // Real-time password validation
    registerPasswordInput.addEventListener('input', function() {
        const password = this.value;
        validatePasswordRequirements(password);
    });

    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!validatePasswordRequirements(password)) {
            showNotification('Password does not meet requirements', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (!agreeTerms) {
            showNotification('Please agree to the Terms and Conditions', 'error');
            return;
        }

        // Simulate registration
        const createBtn = document.querySelector('.create-button');
        const originalText = createBtn.textContent;
        createBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        createBtn.disabled = true;

        setTimeout(() => {
            showNotification('Account created successfully! Welcome!', 'success');
            setTimeout(() => {
                hideRegisterModal();
                createBtn.innerHTML = originalText;
                createBtn.disabled = false;
                registerForm.reset();
                // Reset password requirements
                Object.values(requirements).forEach(req => {
                    req.classList.remove('valid');
                    const icon = req.querySelector('i');
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-times');
                });
            }, 1000);
        }, 2000);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system (reuse from login modal)
    function showNotification(message, type) {
        const existingNotifications = document.querySelectorAll('.modal-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `modal-notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            padding: 16px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else if (type === 'info') {
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Make functions available globally
    window.showRegisterModal = showRegisterModal;
    window.showLoginModal = showLoginModal;
});

// Forgot Password Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const forgotModalOverlay = document.getElementById('forgotModalOverlay');
    const forgotModalCloseBtn = document.getElementById('forgotModalCloseBtn');
    const forgotForm = document.getElementById('forgotForm');
    const showForgotModalBtn = document.getElementById('showForgotModal');
    const backToSignInBtn = document.getElementById('backToSignIn');

    // Show forgot password modal function
    function showForgotModal() {
        forgotModalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            forgotModalOverlay.style.opacity = '1';
        }, 10);
    }

    // Hide forgot password modal function
    function hideForgotModal() {
        forgotModalOverlay.style.opacity = '0';
        setTimeout(() => {
            forgotModalOverlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Show login modal function
    function showLoginModalFromForgot() {
        hideForgotModal();
        setTimeout(() => {
            window.showAuthModal();
        }, 300);
    }

    // Close modal events
    forgotModalCloseBtn.addEventListener('click', hideForgotModal);
    
    forgotModalOverlay.addEventListener('click', function(e) {
        if (e.target === forgotModalOverlay) {
            hideForgotModal();
        }
    });

    // Show forgot modal when forgot password link is clicked
    showForgotModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showForgotModal();
    });

    // Back to sign in
    backToSignInBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginModalFromForgot();
    });

    // Form submission
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value;

        // Validation
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate sending reset code
        const resetBtn = document.querySelector('.reset-button');
        const originalText = resetBtn.textContent;
        resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        resetBtn.disabled = true;

        setTimeout(() => {
            showNotification('Reset code sent to your email!', 'success');
            setTimeout(() => {
                hideForgotModal();
                resetBtn.innerHTML = originalText;
                resetBtn.disabled = false;
                forgotForm.reset();
            }, 1000);
        }, 2000);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system (reuse from other modals)
    function showNotification(message, type) {
        const existingNotifications = document.querySelectorAll('.modal-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `modal-notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            padding: 16px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else if (type === 'info') {
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Make functions available globally
    window.showForgotModal = showForgotModal;
});

// Add click handlers for login buttons
document.addEventListener('DOMContentLoaded', function() {
    // Handle existing login buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('login-btn') || 
            e.target.classList.contains('sign-in-btn') ||
            e.target.closest('.login-btn') ||
            e.target.closest('.sign-in-btn')) {
            e.preventDefault();
            window.showAuthModal();
        }
    });
});