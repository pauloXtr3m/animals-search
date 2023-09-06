import React, { ReactElement, useCallback, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  AnimationContainer,
  Logo,
  TopBar,
  ResultsContainer,
} from './styles';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useSearch } from '../../hooks/search';
import { colors } from '../../styles/colors';
import { ResultList } from '../../components/ResultList';
import isMobile from '../../utils/isMobile';
import { ResultCard } from '../../components/ResultCard';

interface SearchFormData {
  search: string;
}

function Results(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const {
    searchText,
    handleSearch,
    resultList,
    loading,
    selectedResult,
    setSelectedResult,
    clearResult,
  } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SearchFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Search required'),
        });

        await schema.validate(data, { abortEarly: false });
        await handleSearch(data.search);
        await navigate('/results');
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
    [handleSearch, addToast, navigate],
  );

  return (
    <Container>
      <AnimationContainer>
        <TopBar>
          <Logo
            src={logoImg}
            alt="animals_search_logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <Form ref={formRef} onSubmit={handleSubmit} style={{ margin: 0 }}>
            <Input
              name="search"
              icon={FiSearch}
              iconProps={{ color: colors.greyLight }}
              showClearButton
              style={{ maxWidth: isMobile() ? '80%' : '50%' }}
              defaultValue={searchText}
            />
          </Form>
        </TopBar>
        <ResultsContainer>
          <ResultList
            data={resultList}
            loading={loading}
            onSelectResult={setSelectedResult}
            searchText={searchText}
          />
          <ResultCard
            data={selectedResult}
            show={!!selectedResult && !loading}
            closeModal={() => clearResult()}
          />
        </ResultsContainer>
      </AnimationContainer>
    </Container>
  );
}

export default Results;
