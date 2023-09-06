import styled from 'styled-components';
import { colors } from '../../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px;
`;

export const UrlText = styled.h4`
  color: ${colors.textLight};
`;

export const Title = styled.h2`
  color: #247bff;
`;

export const DescriptionText = styled.p`
  color: ${colors.textLight};
`;
