import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Result } from '../../services/api';
import { ResultList } from './index';

jest.setTimeout(30000);
describe('ResultList', () => {
  it('render skeleton when loading is true', () => {
    const data: Result[] = [];
    const loading = true;
    const searchText = 'cat';
    const result = render(
      <ResultList
        data={data}
        loading={loading}
        searchText={searchText}
        onSelectResult={() => ({})}
      />,
    );
    const skeleton = result.container.querySelector('#skeleton-result-list');
    expect(skeleton).not.toBeNull();
  });
  it('show message when results were not found', () => {
    const data: Result[] = [];
    const loading = false;
    const searchText = 'cat';
    const result = render(
      <ResultList
        data={data}
        loading={loading}
        searchText={searchText}
        onSelectResult={() => ({})}
      />,
    );
    const notFoundText = result.container.querySelector(
      '#not-found-result-for',
    );
    expect(notFoundText).not.toBeNull();

    const suggestionsText = result.container.querySelector('#suggestions-text');
    expect(suggestionsText).not.toBeNull();
  });

  it('show only suggestions message when results were not found and search text is empty', () => {
    const data: Result[] = [];
    const loading = false;
    const searchText = '';
    const result = render(
      <ResultList
        data={data}
        loading={loading}
        searchText={searchText}
        onSelectResult={() => ({})}
      />,
    );
    const notFoundText = result.container.querySelector(
      '#not-found-result-for',
    );
    expect(notFoundText).toBeNull();

    const suggestionsText = result.container.querySelector('#suggestions-text');
    expect(suggestionsText).not.toBeNull();
  });

  it('show all results from list', async () => {
    const data: Result[] = [
      {
        id: 1,
        title: 'Grey cat',
        type: 'cat',
        description: 'This cat is calm!',
        image: '',
        url: 'https://test1.com',
      },
      {
        id: 2,
        title: 'Orange cat',
        type: 'cat',
        description: 'This cat is very dangerours!',
        image: '',
        url: 'https://test2.com',
      },
    ];
    const loading = false;
    const searchText = 'cat';
    render(
      <ResultList
        data={data}
        loading={loading}
        searchText={searchText}
        onSelectResult={() => ({})}
      />,
    );

    await new Promise(r => {
      setTimeout(r, 2500);
    });

    data.forEach(cat => {
      const title = screen.getByText(cat.title);
      expect(title).toBeInTheDocument();

      const url = screen.getByText(cat.url);
      expect(url).toBeInTheDocument();

      const description = screen.getByText(cat.description);
      expect(description).toBeInTheDocument();
    });
  });
});
