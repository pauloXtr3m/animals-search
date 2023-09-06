import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import isMobile from '../../utils/isMobile';

const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: translateY(1);
  }
`;
export const CardContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border: 2px solid ${colors.greyLight};
  justify-content: center;
  background: white;
  animation: ${scale} 1;
  max-height: 60%;
  ${isMobile() &&
  css`
    flex: 1;
    max-height: 50%;
    max-width: 90%;
    margin: 0 8px 0 8px;
    padding: 12px;
    justify-content: center;
  `}

  h3,
  h5,
  p {
    margin-top: 8px;
  }
`;

export const MobileContainer = styled.div`
  z-index: 1;
  left: -8px;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`;

export const Image = styled.img`
  max-width: 600px;
  max-height: 400px;
  ${isMobile() &&
  css`
    max-width: 100%;
    max-height: 50%;
  `}

  background: ${colors.greyLight};
`;
