import React, { useState } from 'react';
import { Form, Container, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Abogado() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [numCarnet, setNumCarnet] = useState('');
  const [rutaImagen, setRutaImagen] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre,
      apellido,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      correo,
      especialidad,
      numCarnet,
      rutaImagen,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createabogados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        // Limpiar los estados después de un registro exitoso si es necesario
        setNombre('');
        setApellido('');
        setFechaNacimiento('');
        setGenero('Masculino');
        setDireccion('');
        setTelefono('');
        setCorreo('');
        setEspecialidad('');
        setNumCarnet('');
        setRutaImagen('');
      } else {
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
            <Card.Title>Registro de Abogados</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="genero">
                <Form.Label>Género</Form.Label>
                <Form.Select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingrese el correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="especialidad">
                <Form.Label>Especialidad</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="numCarnet">
                <Form.Label>Número de Carnet</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el número de carnet" value={numCarnet} onChange={(e) => setNumCarnet(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="rutaImagen">
                <Form.Label>Ruta de la Imagen</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la ruta de la imagen" value={rutaImagen} onChange={(e) => setRutaImagen(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Registrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Abogado;
