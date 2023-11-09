import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, Card } from 'react-bootstrap';
import Header from '../components/Header';

function Caso() {
  const [formData, setFormData] = useState({
    descripcion: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    costo_servicio: '',
    abogados_id_abogado: '', // Campo para el ID del abogado
    clientes_id_clientes: '', // Campo para el ID del cliente
    estado: 'Abierto',
  });

  const [abogados, setAbogados] = useState([]); // Lista de abogados
  const [clientes, setClientes] = useState([]); // Lista de clientes

  useEffect(() => {
    // Cargar la lista de abogados y clientes desde el servidor
    fetch('http://localhost:5000/crud/readAbogado') // Reemplaza con la URL correcta de tu servidor
      .then((response) => response.json())
      .then((data) => setAbogados(data))
      .catch((error) => console.error('Error al obtener la lista de abogados:', error));

    fetch('http://localhost:5000/crud/readclientes') // Reemplaza con la URL correcta de tu servidor
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener la lista de clientes:', error));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Si el nombre del campo es "abogados_id_abogado" o "clientes_id_clientes",
    // actualiza directamente el estado del formulario con el valor del campo seleccionado.
    if (name === 'abogados_id_abogado' || name === 'clientes_id_clientes') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // De lo contrario, actualiza otros campos como de costumbre.
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/crud/insertcasos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Caso insertado exitosamente');
        setFormData({
          descripcion: '',
          fecha_inicio: '',
          fecha_finalizacion: '',
          costo_servicio: '',
          abogados_id_abogado: '', // Restablece el campo de ID del abogado
          clientes_id_clientes: '', // Restablece el campo de ID del cliente
          estado: 'Abierto',
        });
      } else {
        alert('Error al registrar el caso');
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
            <Card.Title>Registro de Caso</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control
                      type="text"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="fecha_inicio" label="Fecha de Inicio">
                    <Form.Control
                      type="date"
                      name="fecha_inicio"
                      value={formData.fecha_inicio}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="fecha_finalizacion" label="Fecha de Finalización">
                    <Form.Control
                      type="date"
                      name="fecha_finalizacion"
                      value={formData.fecha_finalizacion}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="costo_servicio" label="Costo del Servicio">
                    <Form.Control
                      type="number"
                      name="costo_servicio"
                      value={formData.costo_servicio}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="abogados_id_abogado" label="Abogado">
                    <Form.Select
                      name="abogados_id_abogado"
                      value={formData.abogados_id_abogado}
                      onChange={handleFormChange}
                    >
                      <option value="">Seleccionar Abogado</option>
                      {abogados.map((abogado) => (
                        <option key={abogado.id_abogado} value={abogado.id_abogado}>
                          {abogado.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="clientes_id_clientes" label="Cliente">
                    <Form.Select
                      name="clientes_id_clientes"
                      value={formData.clientes_id_clientes}
                      onChange={handleFormChange}
                    >
                      <option value="">Seleccionar Cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.idClientes} value={cliente.idClientes}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="estado" label="Estado">
                    <Form.Select
                      name="estado"
                      value={formData.estado}
                      onChange={handleFormChange}
                    >
                      <option value="Abierto">Abierto</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Cerrado">Cerrado</option>
                    </Form.Select>
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

export default Caso;
