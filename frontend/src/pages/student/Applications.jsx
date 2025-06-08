import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        const data = await studentService.getStudentApplications(user.id);
        setApplications(data);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Mes Candidatures</h2>
      
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Entreprise</th>
            <th>Date de candidature</th>
            <th>Statut</th>
            <th>Commentaires</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.Stage.titre}</td>
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
              <td>{app.commentaireEntreprise || 'Aucun commentaire'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Applications;