import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Abogado() {
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [fechaNacimiento, setfechaNacimiento] = useState('');
  const [genero, setgenero] = useState('');
  const [direccion, setdireccion] = useState('');
  const [telefono, settelefono] = useState('');
  const [correo, setcorreo] = useState('');
  const [area_especializacion, setarea_especializacion] = useState('');
  const [imagen, setimagen] = useState('');
  const [num_carnet, setnum_carnet] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setimagen(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedFechaNacimiento = formatDate(fechaNacimiento);
  
    const formData = {
      nombre,
      apellido,
      fechaNacimiento: formattedFechaNacimiento,
      genero,
      direccion,
      telefono,
      correo,
      area_especializacion,
      imagen,
      num_carnet,
    };
  
    console.log('Datos a enviar al servidor:', formData);
  
    try {
      const response = await fetch('http://localhost:5000/crud/insertarabogado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Respuesta del servidor:', response);
        alert('Registro exitoso');
        setnombre('');
        setapellido('');
        setfechaNacimiento('');
        setgenero('');
        setdireccion('');
        settelefono('');
        setcorreo('');
        setarea_especializacion('');
        setnum_carnet('');
      } else {
        console.log('Error en la respuesta del servidor:', response.status);
        alert('Error al registrar el abogado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };
  
  
  return (
    <div>
      <Header />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Abogado</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setnombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellidos" label="Apellidos">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={(e) => setapellido(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fechaNacimiento" label="Fecha de nacimiento">
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la fecha de nacimiento"
                      value={fechaNacimiento}
                      onChange={(e) => setfechaNacimiento(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="genero" label="Género">
                    <Form.Select
                      value={genero}
                      onChange={(e) => setgenero(e.target.value)}
                    >
                      <option value="">Seleccionar Género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      value={direccion}
                      onChange={(e) => setdireccion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese número de teléfono"
                      value={telefono}
                      onChange={(e) => settelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el correo"
                      value={correo}
                      onChange={(e) => setcorreo(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="especialidad" label="Especialidad">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la especialidad"
                      value={area_especializacion}
                      onChange={(e) => setarea_especializacion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="carnet" label="Carnet">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el carnet"
                      value={num_carnet}
                      onChange={(e) => setnum_carnet(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
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

export default Abogado;