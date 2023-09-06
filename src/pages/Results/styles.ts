import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/colors';
import isMobile from '../../utils/isMobile';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  max-width: 700px;
`;

const fromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: solid ${colors.greyLight};
  animation: ${fromUp} 1s;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 60%;
  width: 100%;

  form {
    margin: 40px 0;
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

const toUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.6);
  }
`;

interface LogoProps {
  visible?: boolean;
}

export const Logo = styled.img<LogoProps>`
  max-height: 100px;
  animation: ${props => (props.visible ? fromUp : toUp)} 0.5s;
  ${props =>
    !props.visible &&
    css`
      transform: scale(0.6);
    `}
`;

const fromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 32px 100px 32px 100px;
  ${isMobile() &&
  css`
    padding: 8px 24px 8px 24px;
  `}
  height: 100%;
  width: 100%;
  animation: ${fromBottom} 1s;
`;
