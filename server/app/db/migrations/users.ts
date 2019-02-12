export function createUsersTable(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('role');
    table.string('password');
    table.string('products');
  });
}

export function dropUsersTable(knex) {
  return knex.schema.dropTable('users');
}
