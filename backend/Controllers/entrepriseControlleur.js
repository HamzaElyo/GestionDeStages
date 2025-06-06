// controllers/entrepriseController.js
const db = require('../models/index');
const Entreprise = db.Entreprise;

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
