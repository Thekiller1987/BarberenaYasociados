import React, { useState } from 'react';
import { Form, Container, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Abogado() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellidos', apellidos);
    formData.append('fechaNacimiento', fechaNacimiento);
    formData.append('genero', genero);
    formData.append('direccion', direccion);
    formData.append('telefono', telefono);
    formData.append('correo', correo);
    formData.append('especialidad', especialidad);
    formData.append('imagen', imagen);

    try {
      const response = await fetch('http://localhost:5000/crud/insertarabogado', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Registro exitoso');
        setNombre('');
        setApellidos('');
        setFechaNacimiento('');
        setGenero('Masculino');
        setDireccion('');
        setTelefono('');
        setCorreo('');
        setEspecialidad('');
        setImagen(null);
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
              <Form.Group className="mb-3" controlId="apellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Ingrese los apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
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
                  <option value="Otro">Otro</option>
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
              <Form.Group className="mb-3" controlId="imagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
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
