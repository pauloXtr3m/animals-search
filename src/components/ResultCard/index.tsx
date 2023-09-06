import React, { ReactElement } from 'react';
import { Result } from '../../services/api';
import { CardContainer, Container, Image, MobileContainer } from './styles';
import isMobile from '../../utils/isMobile';

interface Props {
  data?: Result;
  show: boolean;
  closeModal: () => void;
}

export function ResultCard({ data, show, closeModal }: Props): ReactElement {
  if (!show || !data) {
    return <div />;
  }

  if (isMobile()) {
    return (
      <MobileContainer onClick={() => closeModal()}>
        <CardContainer>
          <Image src={data.image} alt="img_url" />
          <h5>{data.url}</h5>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </CardContainer>
      </MobileContainer>
    );
  }

  return (
    <Container>
      <CardContainer>
        <Image src={data.image} alt="img_url" />
        <h5>{data.url}</h5>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </CardContainer>
    </Container>
  );
}
