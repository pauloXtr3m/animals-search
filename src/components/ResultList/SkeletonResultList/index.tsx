import React, { ReactElement } from 'react';
import { SkeletonListItem } from './SkeletonListItem';
import { ListContainer } from './styles';

export function SkeletonResultList(): ReactElement {
  return (
    <ListContainer id="skeleton-result-list">
      {[...new Array(4)].map(value => (
        <SkeletonListItem key={`Skeleton-list-item-${value}`} />
      ))}
    </ListContainer>
  );
}
