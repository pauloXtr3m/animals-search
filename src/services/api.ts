import data from '../data';

export interface Result {
  id: number;
  type: string;
  url: string;
  title: string;
  description: string;
  image: string;
}

function delay(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const api = {
  search: async (search: string): Promise<Result[]> => {
    const searchFormatted = search.toLowerCase();
    await delay(2000);
    return data.filter(
      a =>
        a.title.toLowerCase().includes(searchFormatted) ||
        a.type.toLowerCase().includes(searchFormatted),
    );
  },
};

export default api;
