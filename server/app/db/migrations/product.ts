export function createProdutsTable(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id');
    table.string('name');
    table.string('description');
    table.float('price');
  });
}

export function dropProductsTable(knex) {
  return knex.schema.dropTable('products');
}
