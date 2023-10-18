import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Abogado() {

  // Crear un estado para cada campo del formulario
  const [nombre, setNombres] = useState('');
  const [apellido, setApellidos] = useState('');
  const [fecha_de_nacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      apellido,
      fecha_de_nacimiento,
      direccion,
      genero,
      telefono,
      correo,
      especialidad,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createabog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setNombres('');
        setApellidos('');
        setFechaNacimiento('');
        setDireccion('');
        setGenero('');
        setTelefono('');
        setCorreo('');
        setEspecialidad('');
      } else {
        alert('Error al registrar el abogado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de abogados</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre" label="Nombres">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los nombres"
                      value={nombre}
                      onChange={(e) => setNombres(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellido" label="Apellidos">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los apellidos"
                      value={apellido}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="fecha_de_nacimiendo" label="Fecha de nacimiento">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione la fecha de nacimiento"
                      value={fecha_de_nacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="genero" label="Género">
                    <Form.Select 
                      aria-label="Genero"
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                    >
                      <option>Seleccione el género</option>
                      <option value="M">Mujer</option>
                      <option value="H">Hombre</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="8">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese la dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese el teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control 
                      type="email" 
                      placeholder="Ingrese el correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>  

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="especialidad" label="Especialidad">
                    <Form.Select 
                      aria-label="Especialidad"
                      value={especialidad}
                      onChange={(e) => setEspecialidad(e.target.value)}
                    >
                      <option>Seleccione la especialidad</option>
                      <option value="divorcio">divorcio</option>
                      <option value="juici">Juicios</option>
                      <option value="papl">papeleria</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
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

export default Abogado;