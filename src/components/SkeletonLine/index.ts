import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';

interface Props {
  width: string;
  height: string;
}

const loading = keyframes`
  to {
    background-position-x: -20%;
  }
`;

export const SkeletonLine = styled.div<Props>`
  background: ${colors.greyLight};
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    ${colors.greyLight};
  width: ${props => props.width};
  height: ${props => props.height};
  -webkit-animation: ${loading} 0.8s linear infinite; /* Safari */
  animation: ${loading} 0.8s linear infinite;
  background-size: 200% 100%;
  background-position-x: 180%;
  margin: 6px;
`;
