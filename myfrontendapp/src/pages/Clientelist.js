import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, Modal, FloatingLabel, Col } from 'react-bootstrap';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import {FaArrowsRotate } from 'react-icons/fa6';
import {FaArrowRightToBracket } from 'react-icons/fa6';
import Header from '../components/Header';

function ClientList({rol}) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
  };
  const filteredClites = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const Nombre = cliente.nombre.toLowerCase();
    const Telefono = cliente.telefono.toLowerCase();
    

    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
      Nombre.includes(search) ||
      Telefono.includes(search)
   
    );
  });


  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    setFormData({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadClientes = () => {
    fetch('http://localhost:5000/crud/readclientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateclientes/${selectedCliente.idClientes}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadClientes();
        }
      })
      .catch((error) => console.error('Error al actualizar el cliente:', error));
  };

  const handleDelete = (idClientes) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteclientes/${idClientes}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadClientes();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div>
       <Header rol={rol} />

<Card className="m-3">
  <Card.Body>
    <Card.Title className="mb-6">Listado de Caso</Card.Title>
    <Form.Control
      type="text"
      placeholder="Buscar Caso"
      value={searchQuery}
      onChange={handleSearchChange}
      className="mb-3"
    />
    <Table striped bordered hover   responsive>  
    <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClites.map((cliente) => (
            <tr key={cliente.idClientes}>
              <td>{cliente.idClientes}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>
                <Button variant="primary" onClick={() => openModal(cliente)}>
                <FaPencil />
                 </Button>
                <Button variant="danger" onClick={() => handleDelete(cliente.idClientes)}>
                 <FaTrashCan />
                </Button>
              </td>
            </tr>
          ))}
       </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                type="text"
                className="form-control"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleFormChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='cerrar' variant="secondary" onClick={() => setShowModal(false)}>
           <FaArrowRightToBracket />
          </Button>
          <Button className='actu' variant="primary" onClick={handleUpdate} >
           <FaArrowsRotate />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientList;