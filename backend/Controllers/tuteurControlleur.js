const db = require('../models/index');
const Tuteur = db.Tuteur;

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
