const ENCRYPTION_KEY = 'your-secret-key'; // Change this to something unique

const encrypt = (text) => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(ENCRYPTION_KEY).reduce((a,b) => a ^ b, code);

  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

const decrypt = (encoded) => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(ENCRYPTION_KEY).reduce((a,b) => a ^ b, code);
  
  return encoded
    .match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
};

export const setSecureItem = (key, value) => {
  const encrypted = encrypt(JSON.stringify(value));
  localStorage.setItem(key, encrypted);
};

export const getSecureItem = (key, defaultValue = null) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return defaultValue;
  try {
    return JSON.parse(decrypt(encrypted));
  } catch {
    return defaultValue;
  }
};
