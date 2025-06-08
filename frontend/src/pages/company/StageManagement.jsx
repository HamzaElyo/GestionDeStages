/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import stageService from '../../services/stageService';
import { useAuth } from '../../contexts/AuthContext';

const GestionStages = () => {
  const { user } = useAuth();
  const [stages, setStages] = useState([]);
  const [tuteurs, setTuteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    status: true,
    commentaire: '',
    tuteurId: '',
  });
  const [editingStageId, setEditingStageId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetchStages();
      fetchTuteurs();
    }
  }, [user]);

  const fetchStages = async () => {
    try {
      setLoading(true);
      const response = await stageService.getStagesByEntreprise(user.id);
      setStages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des stages.');
      setLoading(false);
    }
  };

  const fetchTuteurs = async () => {
    try {
      const response = await stageService.getTuteursByEntreprise(user.id);
      setTuteurs(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des tuteurs.', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;

    const stagePayload = { ...formData, userId };

    try {
      if (editingStageId) {
        await stageService.updateStage(editingStageId, stagePayload);
      } else {
        await stageService.createStage(stagePayload);
      }

      setShowModal(false);
      setFormData({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        status: true,
        commentaire: '',
        tuteurId: '',
      });
      setEditingStageId(null);
      fetchStages();
    } catch (err) {
      setError('Erreur lors de la sauvegarde du stage.');
    }
  };

  const handleEdit = (stage) => {
    setFormData({
      titre: stage.titre || '',
      description: stage.description || '',
      dateDebut: stage.dateDebut ? stage.dateDebut.slice(0, 10) : '',
      dateFin: stage.dateFin ? stage.dateFin.slice(0, 10) : '',
      status: stage.status ?? true,
      commentaire: stage.commentaire || '',
      tuteurId: stage.tuteurId || '',
    });
    setEditingStageId(stage.stageId);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      status: true,
      commentaire: '',
      tuteurId: '',
    });
    setEditingStageId(null);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Stages</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button onClick={handleAdd} className="mb-3">
        + Ajouter un stage
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Status</th>
            <th>Commentaire</th>
            <th>Tuteur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stages.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Aucun stage trouvé.
              </td>
            </tr>
          ) : (
            stages.map((stage) => (
              <tr key={stage.stageId}>
                <td>{stage.titre}</td>
                <td>{stage.description}</td>
                <td>{stage.dateDebut ? new Date(stage.dateDebut).toLocaleDateString() : ''}</td>
                <td>{stage.dateFin ? new Date(stage.dateFin).toLocaleDateString() : ''}</td>
                <td>{stage.status === true ? 'Disponible' : 'Non Disponible'}</td>
                <td>{stage.commentaire}</td>
                <td>{stage.tuteur?.User ? `${stage.tuteur.User.nom} ${stage.tuteur.User.prenom}` : ''}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(stage)}
                  >
                    Modifier
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal pour création/modification */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingStageId ? 'Modifier un stage' : 'Créer un stage'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date début</Form.Label>
              <Form.Control
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date fin</Form.Label>
              <Form.Control
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="true">Disponible</option>
                <option value="false">Non disponible</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Champ select tuteur */}
            <Form.Group className="mb-3">
              <Form.Label>Tuteur</Form.Label>
              <Form.Select
                name="tuteurId"
                value={formData.tuteurId}
                onChange={handleChange}
                required
                style={{ maxHeight: '150px', overflowY: 'auto' }}
              >
                <option value="">-- Sélectionner un tuteur --</option>
                {tuteurs.map((tuteur) => (
                  <option key={tuteur.tuteurId} value={tuteur.tuteurId}>
                    {tuteur.User.nom} {tuteur.User.prenom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              {editingStageId ? 'Mettre à jour' : 'Créer'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GestionStages;
