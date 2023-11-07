import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function AbogadoList() {
  const [abogados, setAbogados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbogado, setSelectedAbogado] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    area_especializacion: '',
    correo_electronico: '',
    num_carnet: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    imagen: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (abogado) => {
    setSelectedAbogado(abogado);
    setFormData({
      nombre: abogado.nombre,
      apellido: abogado.apellido,
      area_especializacion: abogado.area_especializacion,
      correo_electronico: abogado.correo_electronico,
      num_carnet: abogado.num_carnet,
      fechaNacimiento: abogado.fechaNacimiento,
      genero: abogado.genero,
      direccion: abogado.direccion,
      telefono: abogado.telefono,
      imagen: abogado.imagen,
    });
    setShowModal(true);
  };


  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setFormData({
        ...formData,
        imagen: base64String, // Usa "Imagenes" en lugar de "imagen"
      });
    };
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };


  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/actualizarabogado/${selectedAbogado.id}`, {
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
          alert('Habitación eliminada con éxito.');
        } else {
          alert('Error al eliminar la habitación. Por favor, inténtalo de nuevo más tarde.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la habitación:', error);
        alert('Ocurrió un error al eliminar la habitación. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
      });
  }
};




  const loadAbogados = () => {
    // Realiza una solicitud GET al servidor para obtener la lista de habitaciones
    fetch('http://localhost:5000/crud/readAbogado')
      .then((response) => response.json())
      .then((data) => setAbogados(data))
      .catch((error) => console.error('Error al obtener las habitaciones:', error));
  };

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
                <th>Area_especializacion</th>
                <th>correo_electronico</th>
                <th>num_carnet</th>
                <th>fecha_nacimiento</th>
                <th>genero</th>
                <th>Dirección</th>        
                <th>Teléfono</th>
                <th>Imagenes</th>
              </tr>
            </thead>
            <tbody>
  {abogados.map((abogado) => (
    <tr key={abogado.id_abogado}>
      <td>{abogado.id_abogado}</td>
      <td>{abogado.nombre}</td>
      <td>{abogado.apellido}</td>
      <td>{abogado.area_especializacion}</td>
      <td>{abogado.correo_electronico}</td>
      <td>{abogado.num_carnet}</td>
      <td>
        {new Date(abogado.fecha_nacimiento).toISOString().slice(0, 10)}
      </td> {/* Formatear la fecha en "yyyy-mm-dd" */}
      <td>{abogado.genero}</td>
      <td>{abogado.direccion}</td>
      <td>{abogado.telefono}</td>
      <td>
        <img src={abogado.imagen} alt={abogado.nombre} style={{ width: '150px' }} />
      </td>
      
      <td>
        <Button variant="primary" onClick={() => openModal(abogado)}>Actualizar</Button>
        <Button variant="danger" onClick={() => handleDelete(abogado.id_abogado)}>Eliminar</Button>
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
          {/* Formulario para actualizar abogado */}
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
                    name="correo_electronico"
                    value={formData.correo_electronico}
                    onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="num_carnet" label="Número de Carnet">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el número de carnet"
                    name="num_carnet"
                    value={formData.num_carnet}
                    onChange={(e) => setFormData({ ...formData, num_carnet: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="fecha_nacimiento" label="Fecha de Nacimiento">
                  <Form.Control
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
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
                    type="text"
                    placeholder="Ingrese el teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="imagen" label="URL de la Imagen">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la URL de la imagen"
                    name="imagen"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                  />
                </FloatingLabel>
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