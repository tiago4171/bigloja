import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { RecordList } from './RecordList';
import url from '../_services/url.service';
import authService from '../_services/auth.service';

export const EditRegister = (props) => {
  const history = useHistory();
  const [registers, setRegisters] = useState(null);

  const onEdit = useCallback((record) => {
    console.log('Estamos editando arquivo', record);
  }, []);

  const onDelete = useCallback((record) => {
    if (window.confirm('Desja deletar o registro?')) {
      const currentUser = authService.getCurrentUser();
      const payload = {
        _id: record._id,
        email: currentUser.email,
        accessToken: currentUser.accessToken,
      };
      axios.post(url.RECORD_DELETE, payload)
        .then(() => {
          alert('Registro deletado com sucesso!');
          let aux = [];
          registers.forEach((r) => {
            if (record._id !== r._id)
              aux.push(r);
          });
          setRegisters(aux.length === 0? null: aux);
        })
        .catch((error) => alert(error));
    }
    console.log('Estamos deletando arquivo', record);
  }, [registers, setRegisters]);

  const listAll = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    const payload = {
      email: currentUser.email,
      accessToken: currentUser.accessToken
    };
    console.log(payload);
    // get não tem parâmetros
    axios.post(url.RECORD_ALL, payload)
      .then((response) => {
        // data aqui é um array
        if (response.data && response.data.length)
          setRegisters(response.data);
        else
          setRegisters(null);
        console.log('Baixado '+response.data.length+' registros');
        console.log(response.data[0]);
      })
  }, [setRegisters]);
  
  return (
    <div>
      <Row>
        <Col>
          <Button
            variant='primary'
            size='large'
            onClick={listAll}
          >
            {!registers ?
              `Carregar Registros`  
              :
              `Recarregar`
            }
          </Button>
        </Col>

        <Col>
          <Button
            variant='primary'
            size='large'
            onClick={() => history.push('upload')}
          >
            Novo Registro
          </Button>
        </Col>
      </Row>
      <Container>
        {registers && (
          <RecordList 
            registers={registers}
            onClickEdit={onEdit}
            onClickDelete={onDelete}
          />
        )}
      </Container>
    </div>
  );
}