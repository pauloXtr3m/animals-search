import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import isMobile from '../../utils/isMobile';

const scale = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const Container = styled.div`
  flex: 2;
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 2px solid ${colors.greyLight};
  justify-content: flex-start;
  background: white;
  animation: ${fromRight} 1s;
  ${isMobile() &&
  css`
    flex: 1;
    margin: 0 8px 0 8px;
    padding: 12px;
    max-height: 100%;
    max-width: ${window.screen.height * 0.5 * 1.3}px;
    animation: ${scale} 1s;
  `}

  h3,
  h5,
  p {
    margin-top: 8px;
  }
`;

export const MobileContainer = styled.div`
  z-index: 1;
  left: 0;
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
  animation: ${scale} 1s;
  ${isMobile() &&
  css`
    width: 100%;
    height: 50%;
    max-width: ${window.screen.height * 0.5 * 1.3}px;
    max-height: 100%;
  `}

  background: ${colors.greyLight};
`;
