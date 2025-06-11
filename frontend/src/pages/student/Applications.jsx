import React, { useEffect, useState } from 'react';
import { Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const fetchApplications = async () => {
      try {
        const data = await studentService.getStudentApplications(user.id);
        console.log(data);
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des candidatures.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des candidatures...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Mes Candidatures</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Entreprise</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Commentaire</th> {/* Colonne Commentaire */}
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Aucune candidature trouvée.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.Stage?.titre || "Titre non défini"}</td>
                <td>{app.entreprise?.nom || "Entreprise non définie"}</td>
                <td>{new Date(app.datePostulation).toLocaleDateString('fr-FR')}</td>
                <td>
                  <Badge
                    bg={
                      app.status === 'validé'
                        ? 'success'
                        : app.status === 'refusé'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {app.status}
                  </Badge>
                </td>
                <td>{app.commentaireEntreprise || "Aucun commentaire"}</td> {/* Affichage commentaire */}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Applications;
