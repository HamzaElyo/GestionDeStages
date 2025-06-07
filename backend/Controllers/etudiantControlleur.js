// controllers/etudiantController.js
const db = require('../models/index');
const Etudiant = db.Etudiant;
const Candidature = db.Candidature;
const Stage = db.Stage;
const Entreprise = db.Entreprise;


exports.getCandidaturesByEtudiant = async (req, res) => {
  const userId = req.params.id; // id utilisateur connecté

  try {
    // Trouver l'étudiant correspondant au userId
    const etudiant = await Etudiant.findOne({ where: { userId } });
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé pour cet utilisateur." });
    }
    console.log(etudiant.etudiantId);
    // Récupérer les candidatures avec le bon etudiantId
    const candidatures = await Candidature.findAll({
      where: { etudiantId: etudiant.etudiantId },
      include: [
        { model: Stage, as: 'stage' },
        { model: Entreprise, as: 'entreprise' }
      ],
      order: [['datePostulation', 'DESC']]
    });

    if (!candidatures.length) {
      return res.status(500).json({ message: "Aucune candidature trouvée pour cet étudiant." });
    }

    res.status(200).json(candidatures);
  } catch (error) {
    console.error('Erreur récupération candidatures:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.getAll = async (req, res) => {
  try {
    const items = await Etudiant.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Etudiant.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Etudiant non trouvé' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Etudiant.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Etudiant.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Etudiant non trouvé' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Etudiant.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Etudiant non trouvé' });
    await item.destroy();
    res.status(200).json({ message: 'Etudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




