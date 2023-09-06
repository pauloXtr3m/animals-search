import React, { ReactElement } from 'react';
import { SkeletonLine } from '../../../SkeletonLine';
import { Container } from './styles';

export function SkeletonListItem(): ReactElement {
  return (
    <Container>
      <SkeletonLine height="12px" width="20%" />
      <SkeletonLine height="20px" width="18%" />
      <SkeletonLine height="12px" width="100%" />
      <SkeletonLine height="12px" width="60%" />
    </Container>
  );
}
