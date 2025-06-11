import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    role: 'etudiant',
    photo: '', // auto-générée
    niveau: '',
    filiere: '',
    cv: null,
    lettreMotivation: null,
    nomEntreprise: '',
    secteur: '',
    adresse: '',
    siteWeb: '',
    description: '',
    fonction: ''
  });

  const [entreprises, setEntreprises] = useState([]);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Génère une photo de profil automatiquement
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get('https://randomuser.me/api/');
        const url = res.data.results[0].picture.large;
        setFormData(prev => ({ ...prev, photo: url }));
      } catch (err) {
        console.error('Erreur lors du chargement de la photo', err);
      }
    };
    fetchPhoto();
  }, []);

  // Charge la liste des entreprises si le rôle est "tuteur"
  useEffect(() => {
    if (formData.role === 'tuteur') {
      axios.get('http://localhost:5000/api/entreprises')
        .then(res => setEntreprises(res.data))
        .catch(err => console.error('Erreur chargement entreprises', err));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if ((key === 'cv' || key === 'lettreMotivation') && value instanceof File) {
          data.append(key, value);
        } else if (key === 'photo') {
          // photo est une URL string
          data.append(key, value);
        } else if (typeof value === 'string') {
          data.append(key, value);
        }
      }
    });

    try {
      await register(data);

      if (formData.role === 'etudiant') {
        navigate('/student/dashboard');
      } else if (formData.role === 'entreprise') {
        navigate('/company/dashboard');
      } else if (formData.role === 'tuteur') {
        navigate('/');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error("Erreur:", err.response?.data);
      setError(err?.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded bg-light">
      <h2 className="mb-4">Inscription</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <input type="text" className="form-control mb-3" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
      <input type="text" className="form-control mb-3" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
      <input type="email" className="form-control mb-3" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" className="form-control mb-3" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />

      <select className="form-select mb-3" name="role" value={formData.role} onChange={handleChange}>
        <option value="etudiant">Étudiant</option>
        <option value="entreprise">Entreprise</option>
        <option value="tuteur">Tuteur</option>
      </select>

      {formData.role === 'etudiant' && (
        <>
          <input type="text" className="form-control mb-3" name="niveau" placeholder="Niveau" value={formData.niveau} onChange={handleChange} required />
          <input type="text" className="form-control mb-3" name="filiere" placeholder="Filière" value={formData.filiere} onChange={handleChange} required />
          <label className="form-label">CV</label>
          <input type="file" className="form-control mb-3" name="cv" accept=".pdf" onChange={handleChange} required />
          <label className="form-label">Lettre de motivation</label>
          <input type="file" className="form-control mb-3" name="lettreMotivation" accept=".pdf" onChange={handleChange} required />
        </>
      )}

      {formData.role === 'entreprise' && (
        <>
          <input type="text" className="form-control mb-3" name="nomEntreprise" placeholder="Nom de l'entreprise" value={formData.nomEntreprise} onChange={handleChange} required />
          <input type="text" className="form-control mb-3" name="secteur" placeholder="Secteur" value={formData.secteur} onChange={handleChange} required />
          <input type="text" className="form-control mb-3" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required />
          <input type="url" className="form-control mb-3" name="siteWeb" placeholder="Site web" value={formData.siteWeb} onChange={handleChange} />
          <textarea className="form-control mb-3" name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        </>
      )}

      {formData.role === 'tuteur' && (
        <>
          <select className="form-select mb-3" name="nomEntreprise" value={formData.nomEntreprise} onChange={handleChange} required>
            <option value="">-- Sélectionner une entreprise --</option>
            {entreprises.map((e) => (
              <option key={e.id} value={e.nom}>{e.nom}</option>
            ))}
          </select>
          <input type="text" className="form-control mb-3" name="fonction" placeholder="Fonction" value={formData.fonction} onChange={handleChange} required />
        </>
      )}

      <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
