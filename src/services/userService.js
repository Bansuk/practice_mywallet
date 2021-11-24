import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';

async function createUser({ name, email, password }) {
  const isEmailAlreadyInUse = await userRepository.existingUserWithGivenEmail(
    email
  );

  if (isEmailAlreadyInUse) return null;

  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = await userRepository.createUser({ name, email, hashedPassword });

  return user;
}

export { createUser };
