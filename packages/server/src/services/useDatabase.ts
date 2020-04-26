import { Pool } from 'pg';

const database = new Pool();

const createDatabaseConnection = async () => {
  await database
    .connect()
    .then(() => console.log('📚 Connected to database!'))
    .catch((err) => console.error('Connection Error: ', err.stack));
};

createDatabaseConnection();

export { database };
