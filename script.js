document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form-box.login');
    const registerForm = document.querySelector('.form-box.register');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginFormEl = document.getElementById('loginForm');
    const registerFormEl = document.getElementById('registerForm');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm(loginForm, registerForm);
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm(registerForm, loginForm);
    });

    function switchForm(hide, show) {
        hide.style.opacity = '0';
        setTimeout(() => {
            hide.style.display = 'none';
            show.style.display = 'block';
            setTimeout(() => {
                show.style.opacity = '1';
            }, 50);
        }, 300);
    }

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Mock API Configuration
    const API_URL = 'https://api.example.com/v1'; // Placeholder

    // Login Handle
    loginFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btn = loginFormEl.querySelector('button');

        setLoading(btn, true);

        try {
      
            await mockDelay(1500);
            console.log('Login attempt:', { email, password });
            alert('Login successful! (This is a frontend demo)');
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(btn, false, 'Login');
        }
    });


    registerFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const btn = registerFormEl.querySelector('button');

        setLoading(btn, true);

        try {
         
            await mockDelay(1500);
            console.log('Register attempt:', { name, email, password });
            alert('Registration successful! Please login.');
            switchForm(registerForm, loginForm);

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(btn, false, 'Sign Up');
        }
    });


    function setLoading(btn, isLoading, text = '') {
        if (isLoading) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.style.opacity = '0.7';
        } else {
            btn.disabled = false;
            btn.innerHTML = text;
            btn.style.opacity = '1';
        }
    }

    function mockDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

 
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('click', createStars);
        input.addEventListener('focus', createStars);
    });

    function createStars(e) {
        const rect = e.target.getBoundingClientRect();
        const count = 5; 

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            star.innerHTML = '<i class="fas fa-star"></i>';
            
            // Random position near the input
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            
   
            const duration = 0.5 + Math.random() * 1;
            star.style.animationDuration = `${duration}s`;
            
            document.body.appendChild(star);


            setTimeout(() => {
                star.remove();
            }, duration * 1000);
        }
    }
});
