import React from 'react';
import Image from 'next/image';

const LoginSide: React.FC = () => (
  <div className="w-full lg:w-1/2 pri-sec text-white flex flex-col justify-center items-center p-10 lg:p-12 text-center gap-6 lg:gap-8">
    <Image src="/images/logo.jpg" alt="LogoPresidenciaAcambaro " 
    width={400} height={400} priority={true} className="lg:w-44 w-36 mb-2 rounded-xl"/>
    <h2 className="text-2xl lg:text-4xl font-bold">
      Bienvenido
    </h2>
    <p className="text-base lg:text-xl">Inicia Sesión para continuar</p>
  </div>
);

export default LoginSide;
