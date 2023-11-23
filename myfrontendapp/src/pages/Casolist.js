import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, Modal, FloatingLabel, Col } from 'react-bootstrap';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import {FaArrowsRotate } from 'react-icons/fa6';
import {FaArrowRightToBracket } from 'react-icons/fa6';
import Header from '../components/Header';

function CasoList({rol}) {
  const [casos, setCasos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState({});
  const [formData, setFormData] = useState({
    descripcion: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    costo_servicio: '',
    abogados_id_abogado: '',
    clientes_id_clientes: '',
    estado: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCaso = casos.filter((caso) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const descripcion= caso.descripcion.toLowerCase();
    

    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
      descripcion.includes(search) 
   
    );
  });

  const openModal = (caso) => {
    setSelectedCaso(caso);

    

    // Formatea la fecha para el campo Fecha de inicio
    const formattedFechaInicio = formatDateForInput(caso.fecha_inicio);
    // Formatea la fecha para el campo Fecha de finalización
    const formattedFechaFinalizacion = formatDateForInput(caso.fecha_finalizacion);

    setFormData({
      descripcion: caso.descripcion,
      fecha_inicio: formattedFechaInicio,
      fecha_finalizacion: formattedFechaFinalizacion,
      costo_servicio: caso.costo_servicio,
      abogados_id_abogado: caso.abogados_id_abogado,
      clientes_id_clientes: caso.clientes_id_clientes,
      estado: caso.estado,
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

  const loadCasos = () => {
    fetch('http://localhost:5000/crud/readcasos')
      .then((response) => response.json())
      .then((data) => setCasos(data))
      .catch((error) => console.error('Error al obtener los casos:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updatecasos/${selectedCaso.idCasos}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        fecha_inicio: formData.fecha_inicio,
        fecha_finalizacion: formData.fecha_finalizacion,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadCasos();
        }
      })
      .catch((error) => console.error('Error al actualizar el caso:', error));
  };

  const handleDelete = (idCasos) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este caso?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deletecasos/${idCasos}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadCasos();
          }
        })
        .catch((error) => console.error('Error al eliminar el caso:', error));
    }
  };

  useEffect(() => {
    loadCasos();
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
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Finalización</th>
            <th>Costo de Servicio</th>
            <th>ID Abogado</th>
            <th>ID Cliente</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCaso.map((caso) => (
            <tr key={caso.idCasos}>
              <td>{caso.idCasos}</td>
              <td>{caso.descripcion}</td>
              <td>{formatDateForInput(caso.fecha_inicio)}</td>
              <td>{formatDateForInput(caso.fecha_finalizacion)}</td>
              <td>{caso.costo_servicio}</td>
              <td>{caso.abogados_id_abogado}</td>
              <td>{caso.clientes_id_clientes}</td>
              <td>{caso.estado}</td>
              <td>
                <Button variant="primary" onClick={() => openModal(caso)}><FaPencil /></Button>
                <Button variant="danger" onClick={() => handleDelete(caso.idCasos)}><FaTrashCan /></Button>
              </td>
            </tr>
          ))}
        </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Caso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha_inicio" className="form-label">
                Fecha de Inicio
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha_finalizacion" className="form-label">
                Fecha de Finalización
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_finalizacion"
                name="fecha_finalizacion"
                value={formData.fecha_finalizacion}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="costo_servicio" className="form-label">
                Costo de Servicio
              </label>
              <input
                type="number"
                className="form-control"
                id="costo_servicio"
                name="costo_servicio"
                value={formData.costo_servicio}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="abogados_id_abogado" className="form-label">
                ID Abogado
              </label>
              <input
                type="number"
                className="form-control"
                id="abogados_id_abogado"
                name="abogados_id_abogado"
                value={formData.abogados_id_abogado}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientes_id_clientes" className="form-label">
                ID Cliente
              </label>
              <input
                type="number"
                className="form-control"
                id="clientes_id_clientes"
                name="clientes_id_clientes"
                value={formData.clientes_id_clientes}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleFormChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='cerrar' variant="secondary" onClick={() => setShowModal(false)}>
          <FaArrowRightToBracket />
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
          <FaArrowsRotate />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CasoList;
