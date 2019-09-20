import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import storage from 'services/storage';
import { fetchLoggedUser } from 'store/reducers/authReducer';
import { useTranslation } from 'react-i18next';
import { FlexBox } from 'components/commons/Flex';

const Title = styled.h1``;
const Text = styled.p``;
const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  margin-top: 5rem;
  justify-content: center;
`;

function withAuth(WrappedComponent) {
  const WrappedComponentContainer = ({
    isLogged,
    loggedUser,
    fetchLoggedUserAction,
    ...rest
  }) => {
    const { t } = useTranslation();
    const [isLogging, setLogging] = useState(true);
    let timer = null;
    useEffect(() => {
      setLogging(true);
      if (!isLogged && storage.get('token')) {
        fetchLoggedUserAction();
      }
      timer = window.setTimeout(() => {
        setLogging(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }, [isLogged]);
    if (isLogging && !isLogged)
      return (
        <LoaderContainer>
          <Text>Let's load few things</Text>
        </LoaderContainer>
      );

    if (!isLogged && !isLogging)
      return (
        <FlexBox direction="column" css={{ padding: '2rem' }}>
          <Title>{t('notAllowed')}</Title>
          <Text>{t('notAllowedMessage')}</Text>
          <FlexBox
            css={{
              '& > *': {
                marginRight: '1rem',
                marginTop: '1rem',
              },
            }}
          >
            <Link to="/signin#signIn">{t('actions.signIn')}</Link>
            <Link to="/signin#signUp">{t('actions.signUp')}</Link>
          </FlexBox>
        </FlexBox>
      );

    return <WrappedComponent {...rest} loggedUser={loggedUser} />;
  };

  const mapStateToProps = ({ authReducer }) => ({
    isLogged: authReducer.isLogged,
    loggedUser: authReducer.loggedUser,
    loading: authReducer.loading,
  });

  const mapDispatchToProps = dispatch => ({
    fetchLoggedUserAction: () => {
      dispatch(fetchLoggedUser());
    },
  });

  WrappedComponentContainer.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    loggedUser: PropTypes.shape({
      fullName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
    fetchLoggedUserAction: PropTypes.func.isRequired,
  };

  WrappedComponentContainer.defaultProps = {
    loggedUser: null,
  };

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(WrappedComponentContainer);
}

export default withAuth;
