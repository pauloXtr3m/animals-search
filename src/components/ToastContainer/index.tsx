import React, { ReactElement } from 'react';

import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import { Toast } from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export function ToastContainer({
  messages,
}: ToastContainerProps): ReactElement {
  const messageswithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messageswithTransitions((style, item) => (
        <Toast style={style} message={item} />
      ))}
    </Container>
  );
}
