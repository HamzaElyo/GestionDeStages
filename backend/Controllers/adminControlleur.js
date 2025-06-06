// controllers/adminController.js
const db = require('../models/index');
const User = db.User;
const Etudiant = db.Etudiant;
const Entreprise = db.Entreprise;
const Tuteur = db.Tuteur;

exports.getStats = async (req, res) => {
  try {
    const [etudiants, entreprises, tuteurs, users] = await Promise.all([
      Etudiant.count(),
      Entreprise.count(),
      Tuteur.count(),
      User.count()
    ]);

    res.status(200).json({
      etudiants,
      entreprises,
      tuteurs,
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
