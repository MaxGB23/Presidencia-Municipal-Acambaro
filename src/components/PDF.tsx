import React from "react";

type Props = {
  nombre: string;
  domicilio: string;
  solicitud: string | null;
  telefono: string | null;
  id: string
};

const documentos_pdf = {
  presidente: "LIC. CLAUDIA SILVA CAMPOS",
  sexo_presidente: "MUJER",
  atencion_ciudadana: "LIC. PATRICIA ORTIZ VÁZQUEZ",
  sexo_atencion_ciudadana: "MUJER",
  hay_jefe: true,
  img: "/images/Logo4k.jpg",
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEzqfXSO4HCa7FamTkgqKhra4O7kV-e7atA&s"
};


const PDF: React.FC<Props> = ({ nombre, domicilio, solicitud, telefono, id }) => {
  return (
    <div 
      className="w-[8.5in] h-[11in] pt-0 p-24 border border-black mx-auto dark:bg-white dark:text-black" 
      id={id}>
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        {/* <Image src="/images/logo4k.jpg" className="mt-20 ml-[58px] rounded-t-full " alt="Logo" width={120} height={120} />         */}
        {/* <img src="/images/logo4k.jpg" alt="Logo" className="size-32 mt-20 ml-14 rounded-t-full " /> */}
        <img src={documentos_pdf.img} alt="Logo" className="size-32 mt-20 ml-14 rounded-t-full " />
        <div className="text-right pt-28 space-y-8">
          <p><span className="font-bold">Acámbaro, Gto.</span>, a {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          <p className="font-bold">Asunto: Solicitud de Apoyo.</p>
        </div>
      </div>

      {/* Destinatario */}
      <div className="mt-6 font-bold font-serif text-[17px]">
        <p>{documentos_pdf.presidente} <br /> {documentos_pdf.sexo_presidente === "MUJER" ? "PRESIDENTA" : "PRESIDENTE"} MUNICIPAL <br /> P R E S E N T E.</p>
      </div>
      {documentos_pdf.hay_jefe && (
        <div className="mt-5 text-right text-[17px]">
          <p className="font-bold">AT’N. {documentos_pdf.atencion_ciudadana} <br /> {documentos_pdf.sexo_atencion_ciudadana === "MUJER" ? "JEFA" : "JEFE"} DE ATENCIÓN CIUDADANA</p>
        </div>        
      )}

      {/* Cuerpo */}
      <div className="mt-20 mb-16 text-justify">
        <p>
          ㅤㅤQuien suscribe, C. <span className=" font-bold">{nombre}</span>, residente de <span className="font-bold">{domicilio}</span>,
          perteneciente al Municipio de Acámbaro, Guanajuato, comparezco ante usted con el
          fin de exponer lo siguiente:
        </p>
        <br />
        <p>
          ㅤㅤPor medio de la presente, le envío un cordial saludo y, al mismo tiempo, le
          solicito de la manera más atenta su valioso <span className=" font-bold">{solicitud}</span>
          , debido a que soy una persona de escasos recursos, acudo a su buena voluntad con la
          esperanza de ser apoyado.
        </p>
        <br />
        <p>
          ㅤㅤSin otro particular de momento, le agradezco de antemano la atención que sirva
          brindar a la presente.
        </p>
      </div>

      {/* Firma */}      
      <div className="mt-8 space-y-2">
        <p className="font-bold mb-2 text-lg">ATENTAMENTE</p>
        <p>C. <span className="">{nombre}</span></p>
        <p>TEL: <span className="">{telefono}</span></p>
      </div>
    </div>
  );
};

export default PDF;
