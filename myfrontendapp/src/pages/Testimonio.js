import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Testimonio({ rol }) {
  const [fecha_testimonio, setFechaTestimonio] = useState('');
  const [testimonio, setTestimonio] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar campos obligatorios antes de enviar la solicitud
    if (!fecha_testimonio || !testimonio || !puntuacion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const formData = {
        puntuacion,
        testimonio,
        fecha_testimonio,
      };

      const response = await fetch('http://localhost:5000/crud/createtestimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Testimonio registrado exitosamente');
        setPuntuacion(0);
        setFechaTestimonio('');
        setTestimonio('');
      } else {
        alert('Error al registrar el testimonio');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  function StarRating({ rating, onRatingChange }) {
    const maxRating = 5;
    const starSize = 30;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const isSolid = i <= rating;

      const starStyle = {
        fontSize: `${starSize}px`,
        cursor: 'pointer',
      };

      stars.push(
        <span
          key={i}
          onClick={() => onRatingChange(i)}
          style={starStyle}
        >
          {isSolid ? '★' : '☆'}
        </span>
      );
    }

    return (
      <div className="star-rating-container">
        <div className="star-rating">{stars}</div>
      </div>
    );
  }

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className="title">Registro de Testimonio</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="3">
                  <FloatingLabel controlId="puntuacion" label="">
                    <StarRating rating={puntuacion} onRatingChange={setPuntuacion} />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="9">
                  <FloatingLabel controlId="fecha_testimonio" label="Fecha del Testimonio">
                    <Form.Control
                      type="date"
                      value={fecha_testimonio}
                      onChange={(e) => setFechaTestimonio(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <FloatingLabel controlId="testimonio" label="Testimonio">
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese el testimonio"
                      value={testimonio}
                      onChange={(e) => setTestimonio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 register-button" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Testimonio;
