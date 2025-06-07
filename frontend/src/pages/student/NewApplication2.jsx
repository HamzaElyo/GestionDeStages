import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';
import companyService from '../../services/companyService'; 

const NewApplication2 = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titre: '',
    entrepriseId: '',
    duree: '',
    tuteurId: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState([]); // À remplir avec les entreprises disponibles

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await studentService.createApplication({
        ...formData,
        etudiantId: user.id,
        datePostulation: new Date()
      });
      setSuccess(true);
    } catch (err) {
      setError('Erreur lors de la soumission de la candidature');
    } finally {
      setLoading(false);
    }
  };

  // Charger les entreprises (à implémenter)
 useEffect(() => {
  companyService.getCompanies()
    .then(response => {
      if (Array.isArray(response.data)) {
        setCompanies(response.data);
      } else {
        console.error("Réponse inattendue de getCompanies :", response.data);
        setCompanies([]); // valeur de secours
      }
    })
    .catch(err => {
      console.error("Erreur lors du chargement des entreprises :", err);
      setCompanies([]);
    });
}, []);


  return (
    <div className="container mt-4">
      <h2>Nouvelle Candidature de Stage</h2>
      
      {success && (
        <Alert variant="success" className="mt-3">
          Candidature soumise avec succès!
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Titre du stage</Form.Label>
          <Form.Control
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Entreprise</Form.Label>
          <Form.Select 
            name="entrepriseId" 
            value={formData.entrepriseId} 
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une entreprise</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.nom}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Durée (semaines)</Form.Label>
          <Form.Control
            type="number"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Soumettre la candidature'}
        </Button>
      </Form>
    </div>
  );
};

export default NewApplication2;