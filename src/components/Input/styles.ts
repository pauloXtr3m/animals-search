import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${colors.background};
  border-radius: 10px;
  cursor: text;

  padding: 16px;
  width: 100%;

  color: ${colors.text};
  border: 2px solid ${colors.greyLight};

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${colors.accent};
      border-color: ${colors.accent};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: ${colors.accent};
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${colors.text};

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${colors.error};
    color: #fff;

    &::before {
      border-color: ${colors.error} transparent;
    }
  }
`;
