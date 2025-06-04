import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedUser = await adminService.updateUserStatus(userId, !currentStatus);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, actif: updatedUser.actif } : user
      ));
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Utilisateurs</h2>
      
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Inscription</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.nom} {user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.dateInscription).toLocaleDateString()}</td>
              <td>
                <span className={`badge bg-${user.actif ? 'success' : 'danger'}`}>
                  {user.actif ? 'Actif' : 'Désactivé'}
                </span>
              </td>
              <td>
                <Button
                  variant={user.actif ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => toggleUserStatus(user.id, user.actif)}
                >
                  {user.actif ? 'Désactiver' : 'Activer'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;