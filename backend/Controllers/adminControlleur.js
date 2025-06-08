// controllers/adminController.js
const {Sequelize } = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Etudiant = db.Etudiant;
const Entreprise = db.Entreprise;
const Tuteur = db.Tuteur;
const Candidature =db.Candidature;

exports.getStats = async (req, res) => {
  try {
    const [ users,userActifs, candidatures, entreprises] = await Promise.all([
      User.count(),
      User.count({where : {actif : true}}),
      Candidature.count({ where: { status: 'en attente' } }),
      Entreprise.count()
    ]);

    res.status(200).json({
      users,
      userActifs, 
      candidatures, 
      entreprises
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['dateInscription', 'DESC']],
      limit: 10,
     // attributes: ['userId', 'nom', 'prenom', 'email', 'role', 'dateInscription', 'actif']
    });

    res.json(users);
  } catch (error) {
    console.error('Erreur getRecentUsers:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs récents' });
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
exports.getDetailedStats = async (req, res) => {
  try {
    // 1. Répartition des candidatures par statut
    const statusCounts = await Candidature.findAll({
      attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
      group: ['status'],
    });

    const statusDistribution = statusCounts.map(item => ({
      status: item.status,
      count: parseInt(item.get('count')),
    }));

    // 2. Nombre de candidatures par entreprise
    const applicationsByCompanyRaw = await Candidature.findAll({
      attributes: ['entrepriseId', [Sequelize.fn('COUNT', Sequelize.col('candidature.entrepriseId')), 'applications']],
      group: ['entrepriseId'],
      include: [{ model: Entreprise, attributes: ['nom'], as: 'entreprise' }],
    });

    const applicationsByCompany = applicationsByCompanyRaw.map(item => ({
      company: item.entreprise ? item.entreprise.nom : 'Inconnue',
      applications: parseInt(item.get('applications')),
    }));

    // 3. Répartition des étudiants par filière
    const studentsByFieldRaw = await Etudiant.findAll({
      attributes: ['filiere', [Sequelize.fn('COUNT', Sequelize.col('filiere')), 'count']],
      group: ['filiere'],
    });

    const studentsByField = studentsByFieldRaw.map(item => ({
      field: item.filiere,
      count: parseInt(item.get('count')),
    }));

    res.json({
      statusDistribution,
      applicationsByCompany,
      studentsByField
    });

  } catch (err) {
    console.error('Erreur récupération statistiques détaillées :', err);
    res.status(500).json({ message: "Erreur serveur lors du calcul des statistiques." });
  }
};

exports.updateUserStatus = async (req, res) => {
  const userId = req.params.userId;
  const { active } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log('letat courant :', active);
    user.actif = active;
    await user.save();

    res.status(200).json({ message: 'Statut de l’utilisateur mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur mise à jour statut utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
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
