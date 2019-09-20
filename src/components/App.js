import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import styled from '@emotion/styled';
import PostDetail from 'components/Post/PostDetail';
import Login from 'components/Auth/Login';
import SignUp from 'components/Auth/SignUp';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from 'components/HomePage';
import { logout } from 'store/reducers/authReducer';

const Root = styled.main`
  display: grid;
  width: 100%;
  grid-template-areas: 'header' 'content';
  grid-template-rows: auto 1fr;
  grid-auto-columns: 1fr;
`;

const Title = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
  font-weight: bold;
`;

const Content = styled.section`
  grid-area: content;
  padding: 1rem;
`;

const ToolBar = styled.nav``;

const ToolBarLink = styled(Link)`
  display: inline-block;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 1rem;
`;

function App({ isLogged, logoutAction }) {
  return (
    <Root>
      <Header>
        <Container>
          <Title to="/">Mon blog de dingue</Title>
          <ToolBar>
            {isLogged ? (
              <>
                <ToolBarLink to="/posts">Créer Post</ToolBarLink>
                <ToolBarLink to="/" onClick={logoutAction}>
                  Logout
                </ToolBarLink>
              </>
            ) : (
              <ToolBarLink to="/login">Login</ToolBarLink>
            )}
          </ToolBar>
        </Container>
      </Header>
      <Content>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/posts"
            render={router =>
              isLogged && <PostDetail {...router} mode="create" />
            }
          />
          <Route
            exact
            path="/posts/:id"
            render={router => <PostDetail {...router} mode="edit" />}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/logout" component={Login} />
        </Switch>
      </Content>
    </Root>
  );
}

const mapStateToProps = ({ authReducer }) => ({
  isLogged: authReducer.isLogged,
});
const mapDispatchToProps = dispatch => ({
  logoutAction: () => {
    dispatch(logout());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
