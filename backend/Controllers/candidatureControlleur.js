const db = require('../models/index');
const Candidature = db.Candidature;
const Etudiant = db.Etudiant;


exports.getAll = async (req, res) => {
  try {
    const items = await Candidature.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Candidature.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function getEtudiantIdFromUserId(userId) {
  const etudiant = await Etudiant.findOne({ where: { userId } });
  if (!etudiant) {
    throw new Error('Etudiant not found for this user');
  }
  return etudiant.etudiantId;
}

exports.create = async (req, res) => {
  try {
    const userId = req.body.userId;  // supposé que tu as middleware d'auth avec req.user

    // Récupérer l'etudiantId associé à ce userId
    const etudiantId = await getEtudiantIdFromUserId(userId);

    // Compléter les données reçues avec l'etudiantId
    const candidatureData = {
      ...req.body,
      etudiantId,
      status: req.body.status || 'en attente',
      datePostulation: req.body.datePostulation || new Date(),
    };

    const newCandidature = await Candidature.create(candidatureData);

    res.status(201).json(newCandidature);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const item = await Candidature.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Candidature non trouvée' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Candidature.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Candidature non trouvée' });
    await item.destroy();
    res.status(200).json({ message: 'Candidature supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
