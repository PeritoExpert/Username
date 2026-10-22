// URL del backend (cámbiala por la de Render cuando lo subas)
const API_URL = 'http://localhost:3000/api';

// Si ya hay sesión activa, redirigir directo
if (localStorage.getItem('perito_user')) {
    window.location.href = 'index.html';
}

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    const btn = event.target.querySelector('.btn-login');

    errorEl.classList.remove('show');
    errorEl.textContent = '';

    if (!username || !password) {
        errorEl.textContent = 'Complete todos los campos';
        errorEl.classList.add('show');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.ok) {
            localStorage.setItem('perito_user', JSON.stringify({
                username: result.user.username,
                nombre: result.user.nombre,
                rol: result.user.rol,
                token: result.token
            }));
            window.location.href = 'index.html';
        } else {
            errorEl.textContent = result.error || 'Usuario o contraseña incorrectos';
            errorEl.classList.add('show');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingresar';
        }
    } catch (err) {
        console.error(err);
        errorEl.textContent = 'Error de conexión con el servidor';
        errorEl.classList.add('show');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingresar';
    }
}