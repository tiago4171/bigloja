import { Formik } from 'formik';
import { useState } from 'react';
import { Form, Container, Row, Button, Image, Col } from 'react-bootstrap';
import { fileToImageBase64 } from '../utils/Util';
import '../App.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import url from '../_services/url.service';
import authService from '../_services/auth.service';

const initialValues = {
  name: '',
  description:'',
  screenshot:{},
};

export const UploadScreenshot = (props) => {
  const history = useHistory();
  const [fileImage, setFileImage] = useState(null);


const handleSubmit = (values, actions) => {
  const currentUser = authService.getCurrentUser();
  fileToImageBase64(values.screenshots)
    .then((file) => {
      const payload = {
        email: currentUser.email,
        accessToken: currentUser.accessToken,
        title: values.title,
        description: values.description,
        screenshots: [file],
      };

      actions.setSubmitting(true);
      axios.post(url.UPLOAD_DATA, payload)
        .then(() => {
          actions.setSubmitting(false);
          history.push('editor');
        })
        .catch((error) => {
          console.log(error);
          actions.setSubmitting(false);
        });
    })
    .catch((error) => {
      console.log(error);
      actions.setSubmitting(false);
    });
  };

  // NOTA: tem que inserir com crase os estilos do css
  return (
    <div>
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({
        setFieldValue,
        handleSubmit,
      }) => (
        <Form>
        <Container className={`registerUpload`} md={8} as={Col}>
          <Row>
            <Col>
              <Form.Group controlId='name' md={4}>
                <Form.Label>
                  Nome:
                </Form.Label>
                <Form.Control 
                  type='text'
                  name='title'
                  placeholder='Digite o title...'
                  onChange={e => setFieldValue('title', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId={'description'} md={4}>
                <Form.Label>
                  Descrição:
                </Form.Label>
                <Form.Control
                  as='textarea' 
                  rows={6}
                  type='text'
                  name='description'
                  placeholder='Digite a descrição...'
                  onChange={e => setFieldValue('description', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group>
              <Form.File 
                name='screenshots'
                label='Fazer upload de screenshot'
                onChange={e => {
                  const fileURL = URL.createObjectURL(e.currentTarget.files[0]);
                  setFieldValue('screenshots', e.currentTarget.files[0]);
                  setFileImage(fileURL);
                }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              {fileImage && (
                <Image
                  src={fileImage}
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Button 
                variant='primary'
                size='large'
                type='submit'
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Col>

            <Col>
              <Button 
                variant='danger'
                size='large'
                onClick={() => history.push('editor')}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      )}
    </Formik>
    </div>
  );
}