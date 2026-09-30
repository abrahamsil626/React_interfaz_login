import users from '../data/users.json';

export const LOGIN_DELAY_MS = 1500;
export const INVALID_CREDENTIALS_MESSAGE = 'Correo o contraseña incorrectos';

export const getTestUser = () => users[0];

const findUser = (email, password) =>
  users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  );

export function authenticate(email, password) {
  const user = findUser(email, password);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user) {
        resolve({ id: user.id, name: user.name, email: user.email });
      } else {
        reject(new Error(INVALID_CREDENTIALS_MESSAGE));
      }
    }, LOGIN_DELAY_MS);
  });
}
