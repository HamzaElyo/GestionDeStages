const db = require('../models/index');
const Stage = db.Stage;

exports.getAll = async (req, res) => {
  try {
    const items = await Stage.findAll();
    res.status(200).json(items);
  } catch (err) {
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
