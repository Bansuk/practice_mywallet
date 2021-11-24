import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';

async function createUser({ name, email, password }) {
  const hashedPassword = bcrypt.hashSync(password, 12);

  const isEmailAlreadyInUse = await userRepository.existingUserWithGivenEmail(
    email
  );

  if (isEmailAlreadyInUse) return null;

  const user = await userRepository.createUser({ name, email, hashedPassword });

  return user;
}

export { createUser };
