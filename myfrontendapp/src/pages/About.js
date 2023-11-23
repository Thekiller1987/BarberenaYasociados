// About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';

const About = ({rol}) => {

  
  return (

    <div>
   <Header rol={rol} />
    <Container>
      
      <Row className="mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Nuestra Empresa</Card.Title>
              <Card.Text>
                Somos una firma de abogados dedicada a proporcionar servicios legales de alta calidad.
                Nuestro equipo de abogados altamente capacitados está comprometido con la excelencia
                y la satisfacción del cliente.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Servicios</Card.Title>
              <Card.Text>
                Ofrecemos una amplia gama de servicios legales, incluyendo asesoramiento legal,
                representación en juicios, resolución de conflictos y más. Nuestra experiencia abarca
                diversas áreas del derecho para satisfacer las necesidades de nuestros clientes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Contacto</Card.Title>
              <Card.Text>
                Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia legal,
                no dudes en ponerte en contacto con nosotros.
                <br />
                <strong>Correo Electrónico:</strong> info@tuempresa.com
                <br />
                <strong>Teléfono:</strong> (123) 456-7890
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* Puedes agregar más secciones según sea necesario */}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default About;
