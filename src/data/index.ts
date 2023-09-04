import { AnimalModule, faker } from '@faker-js/faker';
import { Animal } from '../hooks/search';

function getImage(): string {
  return faker.image.urlLoremFlickr({
    category: 'animals',
    width: 644,
    height: 362,
  });
}

function getTitle(type: string): string {
  return faker.animal[type as keyof AnimalModule]();
}

const data: Animal[] = [...new Array(100)].map((item, index) => {
  const type = faker.animal.type();
  return {
    type,
    id: index + 1,
    url: faker.internet.url(),
    title: getTitle(type),
    description: faker.lorem.sentences(),
    image: getImage(),
  };
});
export default data;
