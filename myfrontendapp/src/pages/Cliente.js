import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Cliente() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
 // Function to handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Create an object with the form data
  const formData = {
    nombre,
    correo,
    telefono
  };

  try {
    // Make an HTTP request to the backend to send the data
    const response = await fetch('http://localhost:5000/crud/createclientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // The record was created successfully
      alert('Cliente ingresado exitosamente');
      // Reset the form fields
      setNombre('');
      setCorreo('');
      setTelefono('');
    } else {
      alert('Error al registrar Cliente');
    }
  } catch (error) {
    console.error('Error in the request:', error);
    alert('Error in the server request');
  }
};
  return (
    <div>
      <Header />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese número de teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
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

export default Cliente;
