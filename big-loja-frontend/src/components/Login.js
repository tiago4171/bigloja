import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { defaultColumn } from '../utils/Util';
import '../App.css';
import authService from '../_services/auth.service';

export const Login = (props) => {

  const handleSubmit = useCallback((values, actions) => {
    console.log('login values = ',values);
    authService.login(values.email, values.password)
      .then(() => {
        props.history.push('editor');
      })
      .catch((error) => console.log(error.response));
    
  }, [props]);

  return (
    <div>
    <Formik onSubmit={handleSubmit} initialValues={{email: '', password: ''}}>
      {({
        handleSubmit,
        setFieldValue
      }) => (
        <Form>
        <Container className={`defaultStyle`} md={defaultColumn} as={Col}>
          <Row>
            <Col>
              <Form.Label>
                Login para edição.
              </Form.Label>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group md='4'>
                <Form.Control
                  type='text'
                  name='email'
                  placeholder='Email...'
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Senha...'
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                name='login'
                onClick={handleSubmit}
              >
                Entrar
              </Button>
            </Col>

            <Col>
              <Link to='/register'>
                <Button
                  variant='danger'
                  name='register'
                  type='button'
                >
                  Registrar
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        </Form>
      )}
    </Formik>
    </div>
  );
};