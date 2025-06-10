import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';
import stageService from '../../services/stageService';
import { useNavigate } from 'react-router-dom';

const NewApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stages, setStages] = useState([]);
  const [submittedStageIds, setSubmittedStageIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stagesRes, candidaturesRes] = await Promise.all([
          stageService.getAll(),
          studentService.getStudentApplications(user.id)
        ]);

        setStages(Array.isArray(stagesRes.data) ? stagesRes.data : []);
        const ids = candidaturesRes.map(c => c.stageId);
        setSubmittedStageIds(ids);
      } catch (err) {
        console.error('Erreur lors du chargement :', err);
        setError('Erreur lors du chargement des données');
      }
    };

    fetchData();
  }, [user.id]);

  const postuler = async (stage) => {
    setLoading(true);
    setError('');
    setSuccessId(null);

    try {
      await studentService.createApplication({
        stageId: stage.stageId,
        entrepriseId: stage.entrepriseId,
        userId: user.id,
        status: "en attente",
        datePostulation: new Date()
      });
      setSuccessId(stage.id);
      setSubmittedStageIds([...submittedStageIds, stage.stageId]);

      setTimeout(() => navigate('/student/dashboard'), 1500);
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
      {successId && (
        <Alert variant="success">
          Candidature soumise avec succès pour le stage #{successId} !
        </Alert>
      )}

      {stages.map((stage) =>
        stage.status === true ? (
          <Card key={stage.id} className="mb-3">
            <Card.Body>
              <Card.Title>{stage.titre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <strong>Entreprise :</strong> {stage.entreprise?.nom || ""}
              </Card.Subtitle>
              <Card.Text as="div">
                <p><strong>Date Début :</strong> {new Date(stage.dateDebut).toLocaleDateString('fr-FR')}</p>
                <p><strong>Date Fin :</strong> {new Date(stage.dateFin).toLocaleDateString('fr-FR')}</p>
                <p><strong>Description :</strong> {stage.description}</p>
                {stage.commentaire && (
                  <p><strong>Commentaire :</strong> {stage.commentaire}</p>
                )}
              </Card.Text>

              {submittedStageIds.includes(stage.stageId) ? (
                <Button variant="secondary" disabled>
                  Candidature déjà soumise
                </Button>
              ) : (
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => postuler(stage)}
                >
                  {loading ? <Spinner size="sm" /> : 'Soumettre la candidature'}
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : null
      )}
    </div>
  );
};

export default NewApplication;
