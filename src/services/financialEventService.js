import * as financialEventRepository from '../repositories/financialEventRepository.js';

async function sumEvents(user) {
  const events = await financialEventRepository.getEvents(user);

  const sum = events.rows.reduce(
    (total, event) =>
      event.type === 'INCOME' ? total + event.value : total - event.value,
    0
  );

  return sum;
}

async function postEvents(value, type, user) {
  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return null;
  }

  if (value < 0) {
    return null;
  }

  const events = await financialEventRepository.postEvents(value, type, user);

  return events;
}

export { sumEvents, postEvents };
