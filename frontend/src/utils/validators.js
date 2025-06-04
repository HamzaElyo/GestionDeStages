export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateApplication = (data) => {
  const errors = {};
  if (!data.titre) errors.titre = 'Titre requis';
  if (!data.entrepriseId) errors.entreprise = 'Entreprise requise';
  if (!data.description || data.description.length < 20) {
    errors.description = 'Description trop courte (min 20 caractères)';
  }
  return errors;
};