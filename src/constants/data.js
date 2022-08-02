export const data = [
  {
    id: 0,
    type: 0,
    products: ["Table", "TV"],
  },
  {
    id: 1,
    type: 0,
    products: ["Freezer", "Chair"],
  },
  {
    id: 2,
    type: 1,
    products: ["T-shirt", "shose"],
  },
  {
    id: 3,
    type: 1,
    products: ["Shirt", "Pants"],
  },
];

const result = [
  {
    id: 0,
    type: 0,
    products: ["Table", "TV", "Freezer", "Chair"],
  },
  {
    id: 1,
    type: 1,
    products: ["T-shirt", "shose", "Shirt", "Pants"],
  },
];
