import { Button, Container, Row, Col } from "react-bootstrap";

export const RecordList = (props) => {
  const list = props.registers.map((e, i) => {
    
    return (
      <Container key={i}>
        <Row>
          <Container>
            <label>{e.title}</label>
          </Container>
        </Row>
        <Row>
          <Container>
            <p>{e.description}</p>
          </Container>
        </Row>

        <Row>
          <Container>
            {e.screenshots && (
              <img src={e.screenshots[0]} alt={i+'screenshot'} />
            )}
          </Container>

          <Col>
            <Button
              onClick={() => props.onClickEdit(e)}
            >
              Editar
            </Button>
          </Col>

          <Col>
            <Button
              onClick={() => props.onClickDelete(e)}
            >
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <span>___________________________________________________________</span>
        </Row>
      </Container>
    );
  });

  return list || (<div>NENHUM registro</div>);
};