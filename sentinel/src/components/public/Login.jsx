import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error (show message to user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;