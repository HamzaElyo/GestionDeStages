import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user) {
          // À remplacer par votre endpoint réel
          const data = await studentService.getStudentApplications(user.id);
          setApplications(data);
          setLoading(false);
        }
      } catch (err) {
        setError('Erreur lors du chargement des candidatures');
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  // Calculer les statistiques
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'en attente').length,
    accepted: applications.filter(app => app.status === 'validé').length,
    rejected: applications.filter(app => app.status === 'refusé').length,
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des candidatures...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Tableau de Bord Étudiant</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.total}</Card.Title>
              <Card.Text>Candidatures</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.pending}</Card.Title>
              <Card.Text>En attente</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.accepted}</Card.Title>
              <Card.Text>Acceptées</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{stats.rejected}</Card.Title>
              <Card.Text>Refusées</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <h4>Mes candidatures récentes</h4>
        <Button as={Link} to="/student/new-application" variant="primary">
          Nouvelle candidature
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Entreprise</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {applications.slice(0, 5).map(app => (
            <tr key={app.id}>
              <td>{app.stage.titre}</td>
              <td>{app.entreprise.nom}</td>
              <td>{new Date(app.datePostulation).toLocaleDateString()}</td>
              <td>
                <Badge bg={
                  app.status === 'validé' ? 'success' : 
                  app.status === 'refusé' ? 'danger' : 'warning'
                }>
                  {app.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center mt-4">
        <Button as={Link} to="/student/applications" variant="outline-primary">
          Voir toutes mes candidatures
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;