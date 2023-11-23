import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, Modal, FloatingLabel, Col } from 'react-bootstrap';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import {FaArrowsRotate } from 'react-icons/fa6';
import {FaArrowRightToBracket } from 'react-icons/fa6';
import Header from '../components/Header';

function AbogadoList({rol}) {
  const [abogados, setAbogados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbogado, setSelectedAbogado] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    area_especializacion: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    correo: '',
    num_carnet: '',
    imagen: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredAbogados = abogados.filter((abogado) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombre= abogado.nombre.toLowerCase();
    const apellido = abogado.apellido.toLowerCase();
    const Area_especializacion = abogado.area_especializacion.toLowerCase();
   

    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
      nombre.includes(search) ||
      apellido.includes(search) ||
      Area_especializacion.includes(search) 
   
    );
  });

  const openModal = (abogado) => {
    setSelectedAbogado(abogado);
    setFormData({
      nombre: abogado.nombre,
      apellido: abogado.apellido,
      area_especializacion: abogado.area_especializacion,
      correo: abogado.correo_electronico,
      num_carnet: abogado.num_carnet,
      fechaNacimiento: new Date(abogado.fecha_nacimiento).toISOString().slice(0, 10),
      genero: abogado.genero,
      direccion: abogado.direccion,
      telefono: abogado.telefono,
      imagen: abogado.imagen,
    });
    setShowModal(true);
  };
  

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setFormData({
        ...formData,
        imagen: base64String,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateabogado/${selectedAbogado.id_abogado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        apellido: formData.apellido,
        area_especializacion: formData.area_especializacion,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        num_carnet: formData.num_carnet,
        imagen: formData.imagen,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadAbogados();
        } else {
          console.error('Error en la respuesta:', response);
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para manejar la eliminación de una habitación
const handleDelete = (id_abogado) => {
  const confirmation = window.confirm('¿Seguro que deseas eliminar este abogado?');
  if (confirmation) {
    // Realiza una solicitud DELETE al servidor para eliminar la habitación
    fetch(`http://localhost:5000/crud/deleteAbogado/${id_abogado}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // La eliminación fue exitosa, refresca la lista de habitaciones
          loadAbogados();
          alert('abogados eliminada con éxito.');
        } else {
          alert('Error al eliminar la abogado, este abogado tiene un caso.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la abogado:', error);
        alert('Ocurrió un error al eliminar la habitación. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
      });
  }
};

  const loadAbogados = () => {
    fetch('http://localhost:5000/crud/readAbogado')
      .then((response) => response.json())
      .then((data) => setAbogados(data))
      .catch((error) => console.error('Error al obtener los abogados:', error));
  };

  
  useEffect(() => {
    loadAbogados();
  });

  return (
    <div>
       <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-6">Listado de Abogados</Card.Title>
          <Form.Control
            type="text"
            placeholder="Buscar abogado"
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-3"            
          />
          
          <Table striped bordered hover   responsive>  
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Área de Especialización</th>
                <th>Correo Electrónico</th>
                <th>Número de Carnet</th>
                <th>Fecha de Nacimiento</th>
                <th>Género</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Imágenes</th>
              </tr>
            </thead>
            <tbody>
              {filteredAbogados.map((abogado) => (
                <tr key={abogado.id_abogado}>
                  <td>{abogado.id_abogado}</td>
                  <td>{abogado.nombre}</td>
                  <td>{abogado.apellido}</td>
                  <td>{abogado.area_especializacion}</td>
                  <td>{abogado.correo_electronico}</td>
                  <td>{abogado.num_carnet}</td>
                  <td>
                    {new Date(abogado.fecha_nacimiento).toISOString().slice(0, 10)}
                  </td>
                  <td>{abogado.genero}</td>
                  <td>{abogado.direccion}</td>
                  <td>{abogado.telefono}</td>
                  <td>
                    <img src={abogado.imagen} alt={abogado.nombre} style={{ width: '150px' }} />
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(abogado)}><FaPencil /></Button>
                    <Button variant="danger" onClick={() => handleDelete(abogado.id_abogado)}><FaTrashCan /></Button>
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
                <FloatingLabel controlId="nombre" label="Nombres">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese los nombres"
                    name="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="apellido" label="Apellidos">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese los apellidos"
                    name="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="area_especializacion" label="Área de Especialización">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el área de especialización"
                    name="area_especializacion"
                    value={formData.area_especializacion}
                    onChange={(e) => setFormData({ ...formData, area_especializacion: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="correo_electronico" label="Correo Electrónico">
                  <Form.Control
                    type="email"
                    placeholder="Ingrese el correo electrónico"
                    name="correo"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="num_carnet" label="Número de Carnet">
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el número de carnet"
                    name="num_carnet"
                    value={formData.num_carnet}
                    onChange={(e) => setFormData({ ...formData, num_carnet: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="fecha_nacimiento" label="Fecha de Nacimiento">
                  <Form.Control
                    type="date"
                    name="fechaNacimiento" // Cambiado a fechaNacimiento
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="genero" label="Género">
                  <Form.Select
                    name="genero"
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="direccion" label="Dirección">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="telefono" label="Teléfono">
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </FloatingLabel>

                <Col sm="12" md="12" lg="12">
                  <Form.Group controlId="imagen" className="">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      name="imagen"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
                </Col>



              </Form>
            </Card.Body>
          </Card>
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

export default AbogadoList