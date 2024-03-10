import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Formulario({ addAlert }) {
  const [inputs, setInputs] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password1: '',
    showPassword: false,
    showPassword1: false,
  });

  function inputsHandler(e) {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  }

  function togglePasswordVisibility(field) {
    setInputs({ ...inputs, [field]: !inputs[field] });
  }

  function validacionInputs(e) {
    e.preventDefault();

    const isValidNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    const isValidApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

    if (
      inputs.nombre.trim() === '' ||
      inputs.apellido.trim() === '' ||
      inputs.email.trim() === '' ||
      inputs.password.trim() === '' ||
      inputs.password1.trim() === ''
    ) {
      addAlert({
        texto: 'Debes completar todos los campos!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!isValidNombre.test(inputs.nombre)) {
      addAlert({
        texto: 'El Nombre debe tener mínimo 4 caracteres y no se permiten caracteres especiales!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!isValidApellido.test(inputs.apellido)) {
      addAlert({
        texto: 'El Apellido debe tener mínimo 4 caracteres y no se permiten caracteres especiales!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!isValidEmail.test(inputs.email)) {
      addAlert({
        texto: 'Formato de email incorrecto!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!isValidPassword.test(inputs.password) || !isValidPassword.test(inputs.password1)) {
      addAlert({
        texto: 'La contraseña debe tener mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (inputs.password !== inputs.password1) {
      addAlert({
        texto: 'Las contraseñas no coinciden!',
        tipo: 'alert-danger',
        estado: true,
      });
    } else {
      addAlert({
        texto: 'Registro creado exitosamente!',
        tipo: 'alert-success',
        estado: true,
      });
    }
  }

  return (
    <>
      <Form onSubmit={(e) => validacionInputs(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={(e) => inputsHandler(e)}
            id="nombre"
            name="Nombre"
            type="text"
            placeholder="Nombre"
            className="text-blue"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={(e) => inputsHandler(e)}
            id="apellido"
            name="Apellido"
            type="text"
            placeholder="Apellido"
            className="text-blue"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            onChange={(e) => inputsHandler(e)}
            id="email"
            name="Email"
            type="email"
            placeholder="tu.email@ejemplo.com"
            className='text-blue'
          />
        </Form.Group>

        <Form.Group className="mb-3 position-relative">
          <Form.Control
            onChange={(e) => inputsHandler(e)}
            id="password"
            name="password"
            type={inputs.showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            className='text-blue'
          />
          <Button
            variant="light"
            onClick={() => togglePasswordVisibility('showPassword')}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <FontAwesomeIcon icon={inputs.showPassword ? faEyeSlash : faEye} />
          </Button>
        </Form.Group>

        <Form.Group className="mb-3 position-relative">
          <Form.Control
            onChange={(e) => inputsHandler(e)}
            id="password1"
            name="password1"
            type={inputs.showPassword1 ? 'text' : 'password'}
            placeholder="Confirme contraseña"
            className='text-blue'
          />
          <Button
            variant="light"
            onClick={() => togglePasswordVisibility('showPassword1')}
            style={{ position: 'absolute', right: '7px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <FontAwesomeIcon icon={inputs.showPassword1 ? faEyeSlash : faEye} />
          </Button>
        </Form.Group>

        <Button variant="warning w-100" type="submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
}

export default Formulario