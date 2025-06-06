const db = require('../models/index');
const Candidature = db.Candidature;

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

exports.create = async (req, res) => {
  try {
    const item = await Candidature.create(req.body);
    res.status(201).json(item);
  } catch (err) {
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
