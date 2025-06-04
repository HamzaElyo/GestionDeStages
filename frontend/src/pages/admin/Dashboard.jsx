import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          adminService.getStats(),
          adminService.getRecentUsers()
        ]);
        
        setStats(statsData);
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Tableau de Bord Administrateur</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.totalUsers}</Card.Title>
              <Card.Text>Utilisateurs</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.activeUsers}</Card.Title>
              <Card.Text>Utilisateurs actifs</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.pendingApplications}</Card.Title>
              <Card.Text>Candidatures en attente</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.companies}</Card.Title>
              <Card.Text>Entreprises</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <h4>Derniers utilisateurs inscrits</h4>
        <Button as={Link} to="/admin/users" variant="outline-primary">
          Gérer les utilisateurs
        </Button>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Inscription</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;