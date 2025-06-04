export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export const statusToBadge = (status) => {
  const variants = {
    'validé': 'success',
    'refusé': 'danger',
    'en attente': 'warning'
  };
  return variants[status] || 'secondary';
};