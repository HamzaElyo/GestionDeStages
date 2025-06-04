import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    'en attente': {
      color: 'bg-yellow-100 text-yellow-800',
      text: 'En attente'
    },
    'validé': {
      color: 'bg-green-100 text-green-800',
      text: 'Validé'
    },
    'refusé': {
      color: 'bg-red-100 text-red-800',
      text: 'Refusé'
    },
    'actif': {
      color: 'bg-green-100 text-green-800',
      text: 'Actif'
    },
    'désactivé': {
      color: 'bg-gray-100 text-gray-800',
      text: 'Désactivé'
    }
  };
  
  const config = statusConfig[status] || {
    color: 'bg-gray-100 text-gray-800',
    text: status
  };
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.text}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StatusBadge;