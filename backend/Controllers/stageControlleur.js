const db = require('../models');
const Stage = db.Stage;
const Entreprise = db.Entreprise;
const Tuteur = db.Tuteur;
const User = db.User;

// Récupérer tous les stages d'une entreprise via l'userId
exports.getStagesByEntreprise = async (req, res) => {
  try {
    const { userId } = req.params;

    const entreprise = await Entreprise.findOne({ where: { userId } });

    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée pour cet utilisateur.' });
    }

    const stages = await Stage.findAll({
      where: { entrepriseId: entreprise.entrepriseId },
      include: [
        {
          model: Entreprise,
          attributes: ['nom'],
        },
        {
          model: Tuteur,
          attributes: ['fonction'],
          include: [
            {
              model: User,
              attributes: ['nom', 'prenom'],
            },
          ],
        },
      ],
    });

    res.status(200).json(stages);
  } catch (error) {
    console.error('Erreur lors de la récupération des stages :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer tous les stages (avec entreprise liée)
exports.getAll = async (req, res) => {
  try {
    const items = await Stage.findAll({
      include: {
        model: Entreprise,
        attributes: ['entrepriseId', 'nom', 'description'],
      },
    });
    res.status(200).json(items);
  } catch (err) {
    console.error('Erreur lors de la récupération des stages :', err);
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un stage par ID
exports.getById = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Stage non trouvé' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un stage
exports.create = async (req, res) => {
  try {
   
    const { userId, tuteurId, ...stageData } = req.body;
    console.log('uerId : ', req.body);
    // Trouver l'entreprise à partir du userId
    const entreprise = await Entreprise.findOne({ where: { userId } });

    if (!entreprise) {
      return res.status(400).json({ message: `Entreprise pour userId ${userId} non trouvée.` });
    }

    // Mettre à jour stageData avec l'entrepriseId récupéré
    stageData.entrepriseId = entreprise.entrepriseId;

    // Vérifier tuteurId s'il existe
    if (tuteurId) {
      const tuteur = await Tuteur.findByPk(tuteurId);
      if (!tuteur) {
        return res.status(400).json({ message: `Tuteur avec ID ${tuteurId} inexistant.` });
      }
      stageData.tuteurId = tuteurId;
    }

    const stage = await Stage.create(stageData);
    res.status(201).json(stage);
  } catch (err) {
    console.error('Erreur lors de la création du stage :', err);
    res.status(500).json({ message: 'Erreur serveur lors de la création du stage.' });
  }
};
// Mettre à jour un stage
exports.update = async (req, res) => {
  try {
    const { tuteurId, entrepriseId, ...updateData } = req.body;
    console.log('update tutuerId',tuteurId);
    // Récupérer le stage à modifier
    const stage = await Stage.findByPk(req.params.id);
    if (!stage) return res.status(404).json({ message: 'Stage non trouvé' });

    // Vérifier si l'entreprise existe si entrepriseId est fourni
    if (entrepriseId) {
      const entreprise = await Entreprise.findByPk(entrepriseId);
      if (!entreprise) {
        return res.status(400).json({ message: `Entreprise avec ID ${entrepriseId} inexistante.` });
      }
      updateData.entrepriseId = entrepriseId;
    }

    // Vérifier si le tuteur existe si tuteurId est fourni
    if (tuteurId) {
      const tuteur = await Tuteur.findByPk(tuteurId);
      if (!tuteur) {
        return res.status(400).json({ message: `Tuteur avec ID ${tuteurId} inexistant.` });
      }
      updateData.tuteurId = tuteurId;
    }

    // Mettre à jour le stage
    await stage.update(updateData);
    res.status(200).json(stage);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du stage :', err);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du stage.' });
  }
};


// Supprimer un stage
exports.delete = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Stage non trouvé' });

    await item.destroy();
    res.status(200).json({ message: 'Stage supprimé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la suppression du stage :', err);
    res.status(500).json({ message: err.message });
  }
};
