import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';
import stageService from '../../services/stageService';

const NewApplication = () => {
  const { user } = useAuth();
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    stageService.getAll()
      .then(response => {
        if (Array.isArray(response.data)) {
          setStages(response.data);
        } else {
          console.error("Réponse inattendue :", response.data);
        }
      })
      .catch(err => {
        console.error("Erreur lors du chargement des stages :", err);
      });
  }, []);

  const postuler = async (stage) => {
    setLoading(true);
    setError('');
    setSuccessId(null);

    try {
      await studentService.createApplication({
        stageId: stage.stageId,
        entrepriseId: stage.entrepriseId,
        userId: user.id,
        status : "en attente",
        datePostulation: new Date()
      });
      setSuccessId(stage.id);
    } catch (err) {
      setError("Erreur lors de la soumission");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Stages Disponibles</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {successId && <Alert variant="success">Candidature soumise avec succès pour le stage #{successId}!</Alert>}

      {stages.map(stage => (
  stage.status === true ? (
    <Card key={stage.id} className="mb-3">
      <Card.Body>
        <Card.Title>{stage.titre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <strong>Nom de l'Entreprise : </strong>
          {stage.entreprise?.nom || ""}
        </Card.Subtitle>
        <Card.Text>
          <strong>Date Début :</strong> {new Date(stage.dateDebut).toLocaleDateString('fr-FR')} <br />
          <strong>Date Fin :</strong> {new Date(stage.dateFin).toLocaleDateString('fr-FR')} <br />
          <strong>Description :</strong> {stage.description} <br/>
          <p>{stage.commentaire}</p>
        </Card.Text>
        <Button 
          variant="primary" 
          disabled={loading}
          onClick={() => postuler(stage)}
        >
          {loading ? <Spinner size="sm" /> : 'Soumettre la candidature'}
        </Button>
      </Card.Body>
    </Card>
  ) : null
))}

    </div>
  );
};

export default NewApplication;
