const db = require('../models/index');
const User = db.User;

exports.getAll = async (req, res) => {
  try {
    const items = await User.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await User.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    await item.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
