import { Formik } from 'formik';
import React, { useCallback } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { defaultColumn } from '../utils/Util';
import authService from '../_services/auth.service';
import '../App.css';


export const RegisterUser = (props) => {
  const handleSubmit = useCallback((values, actions) => {
    authService.register(values.name, values.email, values.password)
      .then((response) => console.log(response.data))
      .catch(err => console.log('error',err.response));
      actions.setSubmitting(false);
    // console.log('values', values);
  }, []);

  return (
    <Formik onSubmit={handleSubmit} initialValues={{name:'', email:'', password: ''}}>
      {({
        handleSubmit,
        setFieldValue,
      }) => (
        <Form>
          <Container className={`defaultStyle`} md={defaultColumn} as={Col}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Nome:
                  </Form.Label>
                  <Form.Control 
                    type='text'
                    name='name'
                    placeholder='Digite seu nome...'
                    onChange={(e) => setFieldValue('name', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Email:
                  </Form.Label>
                  <Form.Control 
                    type='email'
                    name='email'
                    placeholder='Digite seu email...'
                    onChange={(e) => setFieldValue('email', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
              <Form.Group>
                  <Form.Label>
                    Digite uma senha:
                  </Form.Label>
                  <Form.Control 
                    type='password'
                    name='password'
                    placeholder='Digite uma senha...'
                    onChange={(e) => setFieldValue('password', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='confirm'>
                  <Form.Control
                    type='password'
                    name='confirm'
                    placeholder='redigite a senha...'
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  type='submit'
                  name='register'
                  onClick={handleSubmit}
                >
                  Registrar
                </Button>
              </Col>

              <Col>
                <Button
                  name='register'
                  variant='danger'
                  onClick={() => props.history.push('login')}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};