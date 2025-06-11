import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login({ email, password });
      

      if (user.role === 'etudiant') navigate('/student/dashboard');
      else if (user.role === 'entreprise') navigate('/company/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'tutuer') navigate('/');
      else navigate('/');
    } catch (err) {
  // Si err.msg n'existe pas, essaie err.message, sinon stringify l'erreur
  const errorMessage = err?.msg || err?.message || JSON.stringify(err);
  setError(errorMessage);
}

  };



  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Se connecter</button>
    </form>
  );
};

export default LoginForm;