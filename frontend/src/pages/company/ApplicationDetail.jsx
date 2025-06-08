import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import companyService from '../../services/companyService';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await companyService.getApplicationDetails(id);
        const data = response.data;
        console.log(data);
        setApplication(data);
        setStatus(data.status || '');
        setComment(data.commentaireEntreprise || '');
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de la candidature');
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await companyService.updateApplicationStatus(id, status, comment);
      navigate('/company/dashboard');
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    }
  };

  const calculerDuree = () => {
    if (!application?.Stage?.dateDebut || !application?.Stage?.dateFin) return null;

    const debut = new Date(application.Stage.dateDebut);
    const fin = new Date(application.Stage.dateFin);

    if (isNaN(debut) || isNaN(fin)) return null;

    const diffTime = Math.abs(fin - debut);
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks >= 0 ? diffWeeks : null;
  };

  const duree = calculerDuree();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Retour
      </Button>

      <h2>
        Candidature de {application.etudiant?.user?.nom} {application.etudiant?.user?.prenom}
      </h2>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{application.Stage.titre}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {application.Stage.description}
          </Card.Text>
          <Card.Text>
            <strong>Durée:</strong> {duree !== null ? `${duree} semaines` : 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Date de début:</strong>{' '}
            {application.Stage.dateDebut
              ? new Date(application.Stage.dateDebut).toLocaleDateString()
              : 'N/A'}
          </Card.Text>
           <Card.Text>
            <strong> Tuteur :</strong> {application.Stage.tuteur.User.nom} {application.Stage.tuteur.User.prenom}
          </Card.Text>
          <Card.Text>
            <strong> Etudiant :</strong> {application.etudiant.User.nom} {application.etudiant.User.prenom}
          </Card.Text>
          <Card.Text>
            <strong> Filière :</strong> {application.etudiant.filiere} 
          </Card.Text>
          {application.etudiant?.cv && (
            <Card.Text>
              <strong>CV étudiant:</strong>{' '}
              <a href={application.etudiant.cv} target="_blank" rel="noreferrer" className="ms-2">
                Télécharger
              </a>
            </Card.Text>
          )}

          {application.etudiant?.lettreMotivation && (
            <Card.Text>
              <strong>Lettre de motivation:</strong>{' '}
              <a
                href={application.etudiant.lettreMotivation}
                target="_blank"
                rel="noreferrer"
                className="ms-2"
              >
                Télécharger
              </a>
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Statut</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="en attente">En attente</option>
            <option value="validé">Accepter</option>
            <option value="refusé">Refuser</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </Form>
    </div>
  );
};

export default ApplicationDetail;
