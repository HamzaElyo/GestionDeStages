import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import companyService from '../../services/companyService';

const CompanyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          const data = await companyService.getCompanyApplications(user.id);
          console.log(data.data);
          setApplications(data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    };
    
    fetchApplications();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des candidatures...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">Candidatures Reçues</h2>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Stage</th>
            <th>Date candidature</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.CandidatureId}>
              <td>{app.etudiant.User.nom} {app.etudiant.User.prenom}</td>
              <td>{app.Stage.titre}</td>
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
                <a 
                  href={`/company/application/${app.CandidatureId}`} 
                  className="btn btn-sm btn-outline-primary"
                >
                  Voir détails 
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyApplications;