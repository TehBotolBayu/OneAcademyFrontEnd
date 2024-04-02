export const encryptValue = (value) => (value ? btoa("true") : null);

export const decryptValue = (encryptedValue) =>
  encryptedValue ? atob(encryptedValue) : null;
