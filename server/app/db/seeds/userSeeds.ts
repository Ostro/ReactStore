const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@yopmail.com',
    role: 'admin',
    password: 'pwd',
    products: '[1]',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@yopmail.com',
    role: 'client',
    password: 'pwd',
    products: '[]',
  },
];

export default async function(knex) {
  await knex('users').del();
  await knex('users').insert(users);
}
