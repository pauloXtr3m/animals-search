import styled, { keyframes } from 'styled-components';

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
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${fromRight} 1s;
`;
