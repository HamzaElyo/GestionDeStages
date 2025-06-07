const db = require('../models/index');
const Stage = db.Stage;
const Entreprise = db.Entreprise;

exports.getAll = async (req, res) => {
  try {
    const items = await Stage.findAll({
      include: {
        model: Entreprise,
        as: 'entreprise', // Assure-toi que 'as' correspond à l'alias défini dans les associations
        attributes: ['entrepriseId', 'nom'] // On récupère uniquement ce qu’on veut afficher
      }
    });
    res.status(200).json(items);
  } catch (err) {
    console.error("Erreur lors de la récupération des stages avec entreprises :", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Stage non trouvé' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Stage.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Stage non trouvé' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Stage non trouvé' });
    await item.destroy();
    res.status(200).json({ message: 'Stage supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
