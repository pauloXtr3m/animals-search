import React, {
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  iconProps?: IconBaseProps;
  showClearButton?: boolean;
}

function Input({
  name,
  icon: Icon,
  iconProps,
  showClearButton = false,
  ...rest
}: InputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (!inputRef?.current) {
      return;
    }

    inputRef!.current!.value = '';
  }, []);

  const handleClearInput = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const haveValue: boolean = useMemo(() => {
    if (!inputRef.current) return false;

    return !!inputRef.current.value && showClearButton;
  }, [inputRef?.current?.value, showClearButton]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      onClick={handleInputFocus}
    >
      {Icon && <Icon size={20} {...iconProps} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {haveValue && (
        <FiX
          size={20}
          {...iconProps}
          style={{ cursor: 'pointer' }}
          onClick={handleClearInput}
        />
      )}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
}

export default Input;
