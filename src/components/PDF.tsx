import { useEffect, useState } from "react";

type Props = {
  nombre: string;
  domicilio: string;
  solicitud: string | null;
  telefono: string | null;
  id: string
};

interface Data {
  id: number;
  presidente: string;
  sexo_presidente: string;
  atencion_ciudadana: string;
  sexo_atencion_ciudadana: string;
  hay_jefe: boolean;
  img: string;
}

const PDF: React.FC<Props> = ({ nombre, domicilio, solicitud, telefono, id }) => {  

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/documentos-pdf"); 
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div className="text-center">Cargando...</div>;

  return (
    <div
      className="w-[8.5in] h-[11in] pt-0 p-24 border border-black mx-auto dark:bg-white dark:text-black"
      id={id}>
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        { data.img ? (
          <img src={data.img} alt=" " className="size-32 mt-20 ml-14 rounded-t-3xl " />
        ) : (
          <div className="size-32 mt-20 ml-14 rounded-t-full "></div>
        )}        

        <div className="text-right pt-28 space-y-8">
          <p><span className="font-bold">Acámbaro, Gto.</span>, a {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          <p className="font-bold">Asunto: Solicitud de Apoyo.</p>
        </div>
      </div>

      {/* Destinatario */}
      <div className="mt-6 font-bold font-serif text-[17px]">
        <p>{data.presidente} <br />
          {data.sexo_presidente === "MUJER" ? "PRESIDENTA" : "PRESIDENTE"} MUNICIPAL <br/> 
          P R E S E N T E.
        </p>
      </div>
      {data.hay_jefe && (
        <div className="mt-5 text-right text-[17px]">
          <p className="font-bold">AT’N. {data.atencion_ciudadana} <br /> 
          {data.sexo_atencion_ciudadana === "MUJER" ? "JEFA" : "JEFE"} DE ATENCIÓN CIUDADANA</p>
        </div>
      )}

      {/* Cuerpo */}
      <div className="mt-20 mb-16 text-justify">
        <p className="indent-8">
          Quien suscribe, C. <span className=" font-bold">{nombre}</span>, residente de <span className="font-bold">{domicilio}</span>,
          perteneciente al Municipio de Acámbaro, Guanajuato, comparezco ante usted con el
          fin de exponer lo siguiente:
        </p>
        <br />
        <p className="indent-8">
          Por medio de la presente, le envío un cordial saludo y, al mismo tiempo, le
          solicito de la manera más atenta su valioso <span className="font-bold">{solicitud}</span>,
          debido a que soy una persona de escasos recursos, acudo a su buena voluntad con la
          esperanza de ser apoyado.
        </p>

        <br />
        <p className="indent-8">
          Sin otro particular de momento, le agradezco de antemano la atención que sirva
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