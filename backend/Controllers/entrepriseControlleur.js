// controllers/entrepriseController.js
const db = require('../models/index');
const Entreprise = db.Entreprise;
const Candidature = db.Candidature;
const Stage = db.Stage;
const Etudiant = db.Etudiant;
const User = db.User;
const Tuteur = db.Tuteur;


exports.getApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const entreprise = await Entreprise.findOne({ where: { userId } });
   
    if (!entreprise) {
      return res.status(404).json({ message: "Entreprise non trouvée pour ce userId." });
    }

   const applications = await Candidature.findAll({
      where: { entrepriseId: entreprise.entrepriseId },
      include: [
        { model: Stage },
        { 
          model: Etudiant,
          include: [
            { model: User }  // ici on inclut le user lié à l'étudiant
          ]
        }
      ]
    });

    res.json(applications.map(app => app.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures." });
  }
};

exports.getApplicationDetails = async (req, res) => {
  try {
    const { candidatureId } = req.params;
    const application = await Candidature.findByPk(candidatureId, {
      include: [
        { model: Stage,
          include: [
            { model: Tuteur,
              include: [
            { model: User, attributes: ['userId', 'nom', 'prenom', 'email'] }
          ]
            }
          ]
         },
        {
          model: Etudiant,
          include: [
            { model: User, attributes: ['userId', 'nom', 'prenom', 'email'] }
          ]
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée.' });
    }
    res.json(application.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de la candidature." });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, comment } = req.body;

    const application = await Candidature.findByPk(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Candidature non trouvée.' });
    }

    application.status = status;
    application.commentaireEntreprise = comment;
    await application.save();

    res.status(200).json({ message: 'Candidature mise à jour avec succès.' });
  } catch (err) {
    console.error('Erreur mise à jour candidature:', err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la candidature." });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await Entreprise.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Entreprise.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Entreprise non trouvée' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Entreprise.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Entreprise.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Entreprise non trouvée' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Entreprise.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Entreprise non trouvée' });
    await item.destroy();
    res.status(200).json({ message: 'Entreprise supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
