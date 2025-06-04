// src/utils/constants.js

// Rôles utilisateur
export const USER_ROLES = {
  STUDENT: 'etudiant',
  COMPANY: 'entreprise',
  ADMIN: 'admin',
};

// Statuts de candidature
export const APPLICATION_STATUS = {
  PENDING: 'en attente',
  ACCEPTED: 'validé',
  REJECTED: 'refusé',
};

// Options de durée de stage (en semaines)
export const DURATION_OPTIONS = [
  { value: 4, label: '1 mois' },
  { value: 8, label: '2 mois' },
  { value: 12, label: '3 mois' },
  { value: 16, label: '4 mois' },
  { value: 20, label: '5 mois' },
  { value: 24, label: '6 mois' },
];

// Messages d'erreur communs
export const ERROR_MESSAGES = {
  DEFAULT: 'Une erreur est survenue. Veuillez réessayer.',
  NETWORK: 'Erreur de connexion au serveur',
  AUTH: 'Authentification requise',
  PERMISSION: 'Permission refusée',
};

// Chemins d'API
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/signup',
  CURRENT_USER: '/auth/me',
  STUDENT_APPLICATIONS: '/etudiant/applications',
  COMPANY_APPLICATIONS: '/entreprise/applications',
  ADMIN_USERS: '/admin/users',
};

// Configuration UI
export const UI_CONFIG = {
  MAX_TABLE_ITEMS: 10,
  DATE_FORMAT: 'dd/MM/yyyy',
  DATE_TIME_FORMAT: 'dd/MM/yyyy HH:mm',
};

// Couleurs de statut
export const STATUS_COLORS = {
  [APPLICATION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [APPLICATION_STATUS.ACCEPTED]: 'bg-green-100 text-green-800',
  [APPLICATION_STATUS.REJECTED]: 'bg-red-100 text-red-800',
};

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_DASHBOARD: '/student/dashboard',
  // ... autres chemins
};