import React from 'react';
import Input from '../../components/ui/login/Input';
import Button from '../../components/ui/login/Button';
import LoginSide from '../../components/ui/login/LoginSide';

const Login: React.FC = () => (
  <div className='flex justify-center items-center min-h-screen bg-gray-100 p-6'>
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col lg:flex-row w-full max-w-[1100px] lg:h-[550px] rounded-lg shadow-lg overflow-hidden">
        {/* Parte izquierda del formulario */}
        <div className="w-full lg:w-1/2 bg-white text-black p-10 flex flex-col justify-center gap-8 lg:gap-12">
          <h2 className="pl-1 text-3xl lg:text-4xl font-bold text-gray-800 text-center lg:text-left">
            Iniciar Sesión
          </h2>
          <Input
            type="email"
            id="email"
            label="Correo Electrónico"
            placeholder="Ingresa tu correo"
          />
          <Input
            type="password"
            id="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
          />
          <Button text="Iniciar Sesión" />
        </div>

        {/* Parte derecha del formulario */}
        <LoginSide />
      </div>
    </div>
  </div>
);

export default Login;
