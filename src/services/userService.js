import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

async function authenticate({ email, password }) {
  const user = await userRepository.existingUserWithGivenEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

export { createUser, authenticate };
