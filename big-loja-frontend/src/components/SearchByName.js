import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';

const SearchByName = (props) => {
  const [result, setResult] = useState(null);

  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(false);
    
    const result = {
      list: []
    };

    setResult(result);
  }, [setResult]);

  useEffect(() => {
    if (result) {
      setResult(null);
      props.onEndSearch(result);
    }
  }, [props, result, setResult]);

  return (
    <Formik
      onSubmit={handleSubmit}
    >
    {({
      handleSubmit,
      handleChange,
    }) => (
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Control 
              type='text'
              name='searchBar'
              placeholder='Procurar por nome...'
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant='primary'
            name='searchButton'
            onClick={handleSubmit}
          >
            Procurar
          </Button>
        </Row>
      </Form>
    )}
    </Formik>
  );
};

export default SearchByName;