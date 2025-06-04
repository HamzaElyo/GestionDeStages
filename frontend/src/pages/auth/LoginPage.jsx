import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Connexion</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;