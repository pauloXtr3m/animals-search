import React, { ReactElement } from 'react';
import { Result } from '../../services/api';
import { SkeletonResultList } from './SkeletonResultList';
import { ResultItem } from './ResultItem';
import { Container } from './styles';

interface Props {
  data: Result[];
  loading: boolean;
  searchText?: string;
  onSelectResult: (id: number) => void;
}
export function ResultList({ data, loading, searchText }: Props): ReactElement {
  if (loading) {
    return <SkeletonResultList />;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        {!!searchText && (
          <p id="not-found-result-for">
            Not found for <b>{`'${searchText}'`}</b>
          </p>
        )}
        <p id="suggestions-text" style={{ marginTop: 12 }}>
          Try looking for:{' '}
          <b>
            insect, fish, horse, bear, cetacean, cow, lion, rabbit, cat, snake,
            dog, bird.
          </b>
        </p>
      </div>
    );
  }

  return (
    <Container>
      {data.map(item => (
        <ResultItem key={`result-item-${item.id}`} {...item} />
      ))}
    </Container>
  );
}
