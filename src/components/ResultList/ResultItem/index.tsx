import React, { ReactElement } from 'react';
import { Result } from '../../../services/api';
import { Container, DescriptionText, Title, UrlText } from './styles';
import { useSearch } from '../../../hooks/search';

export function ResultItem({
  id,
  title,
  url,
  description,
}: Result): ReactElement {
  const { setSelectedResult } = useSearch();

  return (
    <Container onClick={() => setSelectedResult(id)}>
      <UrlText>{url}</UrlText>
      <Title>{title}</Title>
      <DescriptionText>{description}</DescriptionText>
    </Container>
  );
}
