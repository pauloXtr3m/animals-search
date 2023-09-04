import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: ReactNode;
};

function Button({
  children,
  loading = false,
  ...rest
}: ButtonProps): React.ReactElement {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Loading ...' : children}
    </Container>
  );
}

export default Button;
