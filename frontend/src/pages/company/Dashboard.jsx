import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // ✅ Ajouté
import companyService from '../../services/companyService';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ Ajouté
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user) {
          const data = await companyService.getCompanyApplications(user.id);
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

  const handleViewDetails = (applicationId) => {
    navigate(`/company/applications/${applicationId}`); // ✅ Fonctionnalité
  };

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
      <h2>Tableau de Bord Entreprise</h2>
      
      <div className="row mb-4">
        {['total', 'pending', 'accepted', 'rejected'].map((key, index) => (
          <div className="col-md-3" key={index}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{stats[key]}</Card.Title>
                <Card.Text>
                  {{
                    total: 'Candidatures',
                    pending: 'En attente',
                    accepted: 'Acceptées',
                    rejected: 'Refusées'
                  }[key]}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <h4>Dernières candidatures</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Stage</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.slice(0, 5).map(app => (
            <tr key={app.id}>
              <td>{app.etudiant.nom} {app.etudiant.prenom}</td>
              <td>{app.stage.titre}</td>
              <td>{new Date(app.datePostulation).toLocaleDateString()}</td>
              <td>
                <Badge bg={
                  app.status === 'validé' ? 'success' : 
                  app.status === 'refusé' ? 'danger' : 'warning'
                }>
                  {app.status}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => handleViewDetails(app.id)}
                >
                  Détails
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyDashboard;
