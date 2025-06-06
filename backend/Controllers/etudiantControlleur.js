// controllers/etudiantController.js
const db = require('../models/index');
const Etudiant = db.Etudiant;

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




