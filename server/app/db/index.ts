import * as knex from 'knex';
import database from './knexfile';
import Logger from '../lib/logger';
import {
  dropUsersTable,
  dropProductsTable,
  createUsersTable,
  createProdutsTable,
} from './migrations';
import { populateProducts, populateUsers } from './seeds';

const connection = knex(database);

export default connection;

export async function initDB() {
  try {
    Logger.info('Strat populating DB');

    const isProductsTableExists = await connection.schema.hasTable('products');
    if (isProductsTableExists) await dropProductsTable(connection);
    await createProdutsTable(connection);
    await populateProducts(connection);

    const isUsersTableExists = await connection.schema.hasTable('users');
    if (isUsersTableExists) await dropUsersTable(connection);
    await createUsersTable(connection);
    await populateUsers(connection);
    Logger.info('DB has been populated');
  } catch (error) {
    Logger.error('Something went wrong whit DB', error);
  }
}
