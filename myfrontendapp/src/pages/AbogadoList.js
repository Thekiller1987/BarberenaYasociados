import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbogado, setSelectedAbogado] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Función para abrir el modal y pasar los datos del abogado seleccionado
  const openModal = (abogado) => {
    setSelectedAbogado(abogado);

    setFormData({
      nombre: abogado.nombre,
      apellido: abogado.apellido,
      telefono: abogado.telefono,
      direccion: abogado.direccion,
    });
    setShowModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadAbogados = () => {
    const url = searchTerm
      ? `http://localhost:5000/crud/searchabogados?term=${encodeURIComponent(searchTerm)}`
      : 'http://localhost:5000/crud/readabogados';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setAbogados(data))
      .catch((error) => console.error('Error al obtener los abogados:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateabogados/${selectedAbogado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de abogados
          setShowModal(false);
          loadAbogados(); // Cargar la lista de abogados actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un abogado
  const handleDelete = (id) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este abogado?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el abogado
      fetch(`http://localhost:5000/crud/deleteabogados/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de abogados
            loadAbogados();
          }
        })
        .catch((error) => console.error('Error al eliminar el abogado:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los abogados
  useEffect(() => {
    loadAbogados();
  }, [searchTerm]);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6">Listado de Abogados</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar abogado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {abogados.map((abogado) => (
                <tr key={abogado.id}>
                  <td>{abogado.id}</td>
                  <td>{abogado.nombre}</td>
                  <td>{abogado.apellido}</td>
                  <td>{abogado.telefono}</td>
                  <td>{abogado.direccion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(abogado)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(abogado.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Abogado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Abogado</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los apellidos"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AbogadoList;
