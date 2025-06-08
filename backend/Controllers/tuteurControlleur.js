const db = require('../models/index');
const Tuteur = db.Tuteur;
const User = db.User;
const Entreprise = db.Entreprise;
exports.getTuteursByEntreprise = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'userId requis en paramètre de requête.' });
  }

  try {
    // Récupération de l'entreprise associée au userId
    const entreprise = await Entreprise.findOne({ where: { userId } });

    if (!entreprise) {
      return res.status(404).json({ message: `Aucune entreprise trouvée pour userId ${userId}.` });
    }

    // Récupération des tuteurs liés à cette entreprise
    const tuteurs = await Tuteur.findAll({
      where: { entrepriseId: entreprise.entrepriseId },
      include: [{
        model: User,
        attributes: ['userId', 'nom', 'prenom', 'email']
      }]
    });

    return res.status(200).json(tuteurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des tuteurs :', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.getAll = async (req, res) => {
  try {
    const items = await Tuteur.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Tuteur.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tuteur non trouvé' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Tuteur.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Tuteur.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tuteur non trouvé' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Tuteur.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tuteur non trouvé' });
    await item.destroy();
    res.status(200).json({ message: 'Tuteur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
