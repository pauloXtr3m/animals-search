import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from './index';

describe('Input', () => {
  it('should use initial value if provided', () => {
    const formRef = renderHook(() => useRef<FormHandles>(null));

    const initialValue = 'dog';
    render(
      <div>
        <Form ref={formRef.result.current} onSubmit={() => ({})}>
          <Input name="search" icon={FiSearch} initialValue={initialValue} />
        </Form>
      </div>,
    );

    const input = screen.getByDisplayValue(initialValue);
    expect(input).toBeInTheDocument();

    const wrongInput = (): void => {
      screen.getByDisplayValue('cat');
    };

    expect(wrongInput).toThrowError(
      'Unable to find an element with the display value: cat.',
    );
  });
});
