import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  Logo,
  LoadingContainer,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useSearch } from '../../hooks/search';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { colors } from '../../styles/colors';

interface SearchFormData {
  search: string;
}

function Search(): ReactElement {
  const formRef = useRef<FormHandles>(null);

  const [searchText, setSearchText] = useState('');
  const { addToast } = useToast();
  const { handleSearch, loading } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SearchFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Search required'),
        });

        await schema.validate(data, { abortEarly: false });
        handleSearch(data.search);
        navigate('/results', { state: { searchText } });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error in search',
          description: 'An error occurred in search, try again',
        });
      }
    },
    [handleSearch, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo src={logoImg} alt="animals_search_logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Search for animals</h1>
            <Input
              name="search"
              icon={FiSearch}
              onChange={e => setSearchText(e.target.value)}
              iconProps={{ color: colors.greyLight }}
              showClearButton
            />
            <Button type="submit" loading={loading} disabled={!searchText}>
              Search
            </Button>
          </Form>
        </AnimationContainer>
        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        )}
      </Content>
    </Container>
  );
}

export default Search;
