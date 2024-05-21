export const validateEmail = (email: string): string => {
  const emailPattern = /^\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}\s*$/;

  if (!emailPattern.test(email)) {
    return `Invalid email address. Ensure it's properly formatted, without leading or trailing whitespace, with a valid domain and '@' symbol.`;
  }

  return '';
};

export const validatePassword = (password: string): string => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordPattern.test(password)
    ? ''
    : 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
};
