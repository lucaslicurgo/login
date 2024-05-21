import axios from 'axios';
import { useState } from "react";

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, senha);

        try {
            const response = await axios.post('http://localhost:3000/login', JSON.stringify({ email, senha }),
                {
                    headers: { 'Content-type': 'application/json' }
                });

            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            if (!error?.response) {
                setError('Erro interno do servirdor.')
            } else if (error.response.status === 401) {
                setError('Usuário ou senha inválidos')
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
    };

    return (

        <div className='login-form-wrap'>
            {user === null ? (
                <div>
                    <h2>Seja bem-vindo! </h2>
                    <hr/>
                    <h3>Login</h3>
                    <form className='login-form'>
                        <input type='email' name='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' name='password' placeholder='Senha' required onChange={(e) => setSenha(e.target.value)} />
                        <button type='submit' className='btn-login' onClick={(e) => handleLogin(e)}>Login</button>
                    </form>
                    {error && (
                        <div>
                            <p>{error}</p>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4ZDhocReAQDOFQPVYc4VX-yIByqUeEL3aMBkJPqpuw&s" alt="Error" />
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Olá, {user.nome}</h2>
                    <img src='https://pbs.twimg.com/media/E6TbwvbWQAAg8t2.jpg' />
                    <button type="button" 
                        className='btn-login'
                        onClick={(e) => handleLogout(e)}>Logout</button> 
                </div>
            )}

        </div>
    )
}

export default Login;