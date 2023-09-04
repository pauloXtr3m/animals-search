import data from '../data';
import { Animal } from '../hooks/search';

function delay(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const api = {
  search: async (search: string): Promise<Animal[]> => {
    const searchFormatted = search.toLowerCase();
    await delay(2000);
    return data.filter(
      a =>
        a.title.toLowerCase().includes(searchFormatted) ||
        a.description.toLowerCase().includes(searchFormatted),
    );
  },
};

export default api;
