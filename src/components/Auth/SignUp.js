import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { signUp } from 'store/reducers/authReducer';
import { connect } from 'react-redux';

const Root = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const FormItem = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  transition: all 100ms ease-in-out;
  background-color: #5d9cbe;
  border: none;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1.5rem;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #93bdd3;
  }
`;

const SignUp = ({ signUpAction, isLogged, history }) => {
  const [form, setForm] = useState({ password: '', email: '' });

  useEffect(() => {
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged, history]);

  const handleInputChange = ({ target }) => {
    setForm(prevForm => ({ ...prevForm, [target.name]: target.value }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    signUpAction(form);
  };
  return (
    <Root onSubmit={handleSubmit}>
      <FormItem>
        <Label>Email</Label>
        <Input value={form.email} name="email" onChange={handleInputChange} />
      </FormItem>
      <FormItem>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
        />
      </FormItem>
      <Button type="submit">Connexion</Button>
    </Root>
  );
};

SignUp.propTypes = {};

const mapStateToProps = ({ authReducer }) => ({
  isLogged: authReducer.isLogged,
});
const mapDispatchToProps = dispatch => ({
  signUpAction: values => {
    dispatch(signUp(values));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
