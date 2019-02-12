const products = [
  {
    name: 'Necronomicon',
    description:
      'Le fameux livre de Abdul al-Hazred enfin en version poche. Perdez enfin votre santé mentale.',
    price: 150.99,
  },
  {
    name: 'Mjolnir',
    description: 'Devenez le dieu du tonnerre. Livraison non comprise.',
    price: 2499.99,
  },
  {
    name: 'Le pull col roulé de Steve Jobs',
    description: 'Un style qui a fait ses preuves.',
    price: 200,
  },
  {
    name: 'Le rouleau à pâtisserie  de Maïté',
    description: 'Encore mieux que celui de Cyril Lignac et Mercotte',
    price: 200,
  },
  {
    name: 'Place pour le concert de Jimi Hendrix le 23 avril 2021',
    description: "Un concert qui s'annonce déjà mythique.",
    price: 49.45,
  },
];

export default async function(knex) {
  await knex('products').del();
  await knex('products').insert(products);
}
