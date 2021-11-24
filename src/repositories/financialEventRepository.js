import connection from '../database/database.js';

async function getEvents(user) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user.id]
  );

  return events.rows;
}

async function postEvents(value, type, user) {
  const events = await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user.id, value, type]
  );

  return events;
}

export { getEvents, postEvents };
