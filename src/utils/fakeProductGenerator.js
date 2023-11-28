import { faker } from "@faker-js/faker";

 const generateProduct = () => {
    return {
      productId: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      code: faker.commerce.isbn(10),
      stock: faker.number.int(100),
      status: faker.datatype.boolean()
    };

  }
export default generateProduct;
  