import crypto from 'crypto';

export const random = length => {
  return crypto.randomBytes(length).toString('hex');
};

export const redirect = url => (window.location.href = url);
