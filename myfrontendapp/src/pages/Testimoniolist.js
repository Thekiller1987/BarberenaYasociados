import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Form, Modal, FloatingLabel, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function TestimonioList({ rol }) {
  const [testimonios, setTestimonios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimonio, setSelectedTestimonio] = useState({});
  const [formData, setFormData] = useState({
    fecha_testimonio: '',
    testimonio: '',
    puntuacion: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (testimonio) => {
    setSelectedTestimonio(testimonio);

    const formattedFechaTestimonio = formatDateForInput(testimonio.fecha_testimonio);

    setFormData({
      fecha_testimonio: formattedFechaTestimonio,
      testimonio: testimonio.testimonio,
      puntuacion: testimonio.puntuacion,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadTestimonios = () => {
    fetch('http://localhost:5000/crud/readtestimonios')
      .then((response) => response.json())
      .then((data) => setTestimonios(data))
      .catch((error) => console.error('Error al obtener los testimonios:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/upgradetestimonios/${selectedTestimonio.id_testimonio}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadTestimonios();
        }
      })
      .catch((error) => console.error('Error al actualizar el testimonio:', error));
  };

  const handleDelete = (id_testimonio) => {
    setSelectedTestimonio({ id_testimonio }); // Guardamos el testimonio seleccionado para la confirmación
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const id_testimonio = selectedTestimonio.id_testimonio;
    fetch(`http://localhost:5000/crud/deletetestimonios/${id_testimonio}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          loadTestimonios();
          setShowDeleteModal(false);
        }
      })
      .catch((error) => console.error('Error al eliminar el testimonio:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    loadTestimonios();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6 title">Listado de Testimonios</Card.Title>
          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr className='centrado'>
                <th>ID Testimonio</th>
                <th>Fecha</th>
                <th>Puntuación</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testimonios.map((testimonio) => (
                <tr className='centrado' key={testimonio.id_testimonio}>
                  <td>{testimonio.id_testimonio}</td>
                  <td>{formatDateForInput(testimonio.fecha_testimonio)}</td>
                  <td>{testimonio.puntuacion}</td>
                  <td>{testimonio.testimonio}</td>
                  <td className='buttomsAE'>
                    <Button variant="primary" className='actualizar' onClick={() => openModal(testimonio)}><FaPencil /></Button>
                    <Button variant="danger" className='eliminar' onClick={() => handleDelete(testimonio.id_testimonio)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Testimonio</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="9">
                    <FloatingLabel controlId="testimonio" label="Testimonio">
                      <Form.Control
                        type="text"
                        name="testimonio"
                        value={formData.testimonio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="3">
                    <FloatingLabel controlId="puntuacion" label="Puntuación">
                      <Form.Control
                        type="number"
                        name="puntuacion"
                        value={formData.puntuacion}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Seguro que deseas eliminar este testimonio?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TestimonioList;
