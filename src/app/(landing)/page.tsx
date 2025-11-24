import { Dumbbell, Hand, Mail, MapPin, Phone, Stethoscope, ZapOff } from "lucide-react";

export default function Home() {
  return (
      <div className="bg-background-light dark:bg-background-dark font-display">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
              <div className="px-4 md:px-10 lg:px-20 mx-auto">
                <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 py-4">
                  <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div className="size-6 text-plantilla-primary">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">CAF Acámbaro</h2>
                  </div>
                  <div className="hidden lg:flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-9">
                      <a className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-plantilla-primary dark:hover:text-plantilla-primary" href="#">Inicio</a>
                      <a className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-plantilla-primary dark:hover:text-plantilla-primary" href="/dashboard">Administración</a>
                      <a className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-plantilla-primary dark:hover:text-plantilla-primary" href="#about">Nosotros</a>
                      <a className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-plantilla-primary dark:hover:text-plantilla-primary" href="#testimonials">Testimonios</a>
                      <a className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-plantilla-primary dark:hover:text-plantilla-primary" href="#contact">Contacto</a>
                    </nav>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-plantilla-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-plantilla-primary/90 transition-colors">
                      <span className="truncate">Agenda tu Cita</span>
                    </button>
                  </div>
                  <button className="lg:hidden text-gray-800 dark:text-gray-300">
                    <span className="material-symbols-outlined text-3xl">menu</span>
                  </button>
                </div>
              </div>
            </header>
            <main className="flex-1">
              <section className="px-4 md:px-10 lg:px-20 py-10 md:py-20">
                <div className="@container max-w-7xl mx-auto">
                  <div className="@[480px]:p-4">
                    <div
                      className="flex min-h-[480px] md:min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-6 pb-12 @[480px]:px-10"
                      data-alt="Fisioterapeuta asistiendo a un paciente con ejercicios de movilidad en una clínica moderna y luminosa."
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-2uR9gHuutPF6qeYhInXiXl8C4AgKqBRv8ZoQw9Xb6dTnnkAhrmkZwPJB2lhKVhFzX34BpSWXgXDvhWgH0whSlSp10b_9TBcOGseFVZmQhGiaq-fHvMk2O1OXGjEirAq-abhKEWwHcb3Sq4O9vxlHqyDuB8wWqUH9iOHj4VipTH9q3QITcB5Hra0j9RYcbqedYIoUQjzVuNIASOUTPyYXxT6VMrt_z1oz9nm-OI702qW__7BJ7VwUKXSS9HnP-ZukjPgTV-8HCSQ")',
                      }}
                    >
                      <div className="flex flex-col gap-4 text-left max-w-3xl">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[720px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                          Recupera tu Movilidad y Bienestar en Acámbaro
                        </h1>
                        <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                          Cuidado fisioterapéutico experto y dedicado a tu recuperación integral en el corazón de Acámbaro.
                        </h2>
                      </div>
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 @[480px]:h-14 @[480px]:px-6 bg-plantilla-primary text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg hover:bg-plantilla-primary/90 transition-colors">
                        <span className="truncate">Reserva tu Evaluación</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            <section className="px-4 md:px-10 lg:px-20 py-10 md:py-20 bg-white dark:bg-background-dark/50" id="services">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-10 @container">
                  {/* Títulos y descripción */}
                  <div className="flex flex-col gap-4 text-center items-center">
                    <h1 className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-2xl">
                      Tratamientos Integrales para tu Salud
                    </h1>
                    <p className="text-gray-800 dark:text-gray-300 text-base font-normal leading-normal max-w-3xl">
                      Ofrecemos una amplia gama de servicios especializados y personalizados para satisfacer tus necesidades individuales y ayudarte a alcanzar tus metas de recuperación.
                    </p>
                  </div>

                  {/* Grid de Servicios con Iconos de Lucide */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-0">

                    {/* 1. Rehabilitación Deportiva */}
                    <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                      <div className="text-plantilla-primary bg-plantilla-primary/10 rounded-full p-3 mb-2">
                        {/* 🚨 Icono: Dumbbell (Pesas) */}
                        <Dumbbell className="size-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Rehabilitación Deportiva</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Programas enfocados en atletas para volver al rendimiento máximo de forma segura y efectiva.</p>
                      </div>
                    </div>

                    {/* 2. Post-Operatorios y Lesiones */}
                    <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                      <div className="text-plantilla-primary bg-plantilla-primary/10 rounded-full p-3 mb-2">
                        {/* 🚨 Icono: Stethoscope (Estetoscopio) */}
                        <Stethoscope className="size-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Post-Operatorios y Lesiones</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Planes de rehabilitación estructurados para restaurar la función y movilidad después de cirugías o fracturas.</p>
                      </div>
                    </div>

                    {/* 3. Manejo de Dolor Crónico */}
                    <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                      <div className="text-plantilla-primary bg-plantilla-primary/10 rounded-full p-3 mb-2">
                        {/* 🚨 Icono: ZapOff (Sin Rayo) */}
                        <ZapOff className="size-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Manejo de Dolor Crónico</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Enfoques holísticos y terapias avanzadas para reducir el dolor a largo plazo y mejorar la calidad de vida.</p>
                      </div>
                    </div>

                    {/* 4. Terapia Manual y Masaje */}
                    <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 flex-col text-center items-center">
                      <div className="text-plantilla-primary bg-plantilla-primary/10 rounded-full p-3 mb-2">
                        {/* 🚨 Icono: Hand (Mano) */}
                        <Hand className="size-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Terapia Manual y Masaje</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Técnicas manuales especializadas para diagnosticar y tratar disfunciones musculoesqueléticas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
              <section className="px-4 md:px-10 lg:px-20 py-10 md:py-20" id="about">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Acerca de CAF Acámbaro
                      </h1>
                      <p className="text-gray-800 dark:text-gray-300 text-base font-normal leading-relaxed">
                        Nuestra misión es ofrecer atención fisioterapéutica de calidad, personalizada y con empatía, utilizando técnicas basadas en la evidencia científica para garantizar los mejores resultados para nuestros pacientes de Acámbaro y la región. Estamos comprometidos a acompañarte en tu camino hacia la recuperación en un ambiente moderno y diseñado para tu comodidad.
                      </p>
                    </div>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                      data-alt="Interior moderno y luminoso de la clínica CAF Acámbaro."
                      style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6S6nzRD8CVv02GEZA2fmacf5Iwe8VR48gEosW0qXQp8ZzkTz0ZO11Wf8KjlGOxD7S9umNdaC2jkcAE5nvvL6myHp7kGIcx5QfBbuAAv939Ir-xEa061h32dQUaJZlZO6QA_CGfJ9stbRSbM54DVBdQlOXPnw3oTSi1eeiZoufq2vbGd64h2h251n6SxISOaBfqydIQHGYa_UeR79cfRDI-wHzWi9h_WymVWPn27B0EfuvstOVFYBrengc2o3V2fl-aOerwdRiZvg")',
                      }}
                    >
                      {/* Contenido opcional dentro del div */}
                    </div>                  </div>
                </div>
              </section>
              <section className="px-4 md:px-10 lg:px-20 py-10 md:py-20 bg-white dark:bg-background-dark/50" id="testimonials">
                <div className="max-w-7xl mx-auto flex flex-col gap-10">
                  <div className="flex flex-col gap-4 text-center items-center">
                    <h1 className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-2xl">
                      Lo que Dicen Nuestros Pacientes
                    </h1>
                    <p className="text-gray-800 dark:text-gray-300 text-base font-normal leading-normal max-w-3xl">
                      Historias reales de personas de Acámbaro a las que hemos ayudado a recuperar su vida sin dolor.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
                      <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" data-alt="Foto de perfil de Juan D." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqROmvHaWe51DlAJs6XVR0L2aUmM59aVJy2pebMIDKnbHg8bSfj7ctCQE-_xas-S5F8E8gSUhxHJAjDCGUiHDlppLIn8ivDDhDeF7_Gb0qyTn6ZRukZZHVufnwrfG_QxomuDk7rA8XIzRtU0SEcBWlhIHVz0FToEvitC3dXMkH4HG3lU-7j3pm17k0lKRwq_crz57RIrN7X1rwlc3CM09I_rOwdOLHB4_RqoG-oPFjdAuxzDOsZzGvxQK1LGQLtJX5sPqk_18NWXM" />
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-bold">Juan D.</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Corredor</p>
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-300 text-sm font-normal leading-relaxed">"Después de mi lesión de rodilla, pensé que nunca volvería a correr. El equipo de CAF no solo me ayudó a recuperarme, sino que mejoró mi técnica. ¡Vuelvo a correr sin dolor!"</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
                      <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" data-alt="Foto de perfil de Sofía L." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1TAq1X1AC9tolnw4DrHowg6nxe5gp8Q3ccIdFGq5Sv2YLvB4E7_jRf38f9cajWM3BFqYp8cFtW60Y-BH5DhitrDDh5nXYdvr3qcrjgkreH-HPMh7Zo0Fu_jWmYKvFhyMiQhBsv868CTy1h-s_VweKWCEfR_6RN8zG45tCJ4aGjfq8wWEYpA0n-BzQ4ysbXXz-_eh_a37DvfNxA09-2rsGqzPM7M5_Yvt73llAxO-egoxQL-JeDuXdhxUJdeFRoRjgTK_am02RMrg" />
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-bold">Sofía L.</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Trabajadora de Oficina</p>
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-300 text-sm font-normal leading-relaxed">"El dolor crónico de espalda por pasar el día sentada era insoportable. CAF me brindó ejercicios y terapia manual que hicieron una gran diferencia. Su enfoque integral es fantástico."</p>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
                      <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" data-alt="Foto de perfil de Miguel B." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuFM7DMAdoOwbt5k7iGhE_Jdww61m1kDO-erAdE5GC6J4wML3CH9Y41esycER92Zn9_nVmB2rRXlejgL6XxS6YivcPoWjTdNV8dE1Six-L1fZ0ESmEgnEhNZuGczzGi2jVmmCvfnXn8FI3pspnfW0_8u5Z9atbFTp19K7odxlGIRsvm1PKtc71S7Vl9E1V1koz_BHA-Gemq2PLKCI-E7qvcG57h_e40LsKj6bgQWFPzrNFBD0_xGCoJOi9xbyN1Gq-YS8Bb4plRqM" />
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-bold">Miguel B.</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Post-Cirugía</p>
                        </div>
                      </div>
                      <p className="text-gray-800 dark:text-gray-300 text-sm font-normal leading-relaxed">"El plan de rehabilitación post-operatoria fue perfectamente adaptado. Los fisioterapeutas fueron increíblemente profesionales y me recuperé más rápido de lo que esperaba."</p>
                    </div>
                  </div>
                </div>
              </section>




            <section className="px-4 md:px-10 lg:px-20 py-10 md:py-20 " id="contact">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* Bloque de Información de Contacto */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      {/* 🚨 Corregido: h1 a h2 para jerarquía semántica */}
                      <h2 className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Contáctanos
                      </h2>
                      <p className="text-gray-800 dark:text-gray-300 text-base font-normal leading-relaxed">
                        ¿Listo para comenzar tu camino hacia la recuperación? Contáctanos para agendar una cita o resolver cualquier duda. Nuestro equipo en Acámbaro está aquí para ayudarte.
                      </p>
                    </div>

                    {/* 🚨 Contactos con enlaces (A11Y y usabilidad) */}
                    <div className="flex flex-col gap-4">
                      {/* Dirección */}
                      <div className="flex items-center gap-3">
                        <MapPin className="text-plantilla-primary size-6" /> {/* Icono Lucide */}
                        <p className="text-gray-800 dark:text-gray-300">Domicilio Conocido, Acámbaro, GTO, C.P. 38600</p>
                      </div>
                      {/* Teléfono Clicable */}
                      <div className="flex items-center gap-3">
                        <Phone className="text-plantilla-primary size-6" /> {/* Icono Lucide */}
                        <a href="tel:+524171234567" className="text-gray-800 dark:text-gray-300 hover:text-plantilla-primary transition-colors">
                          (417) 123-4567 (Número de ejemplo)
                        </a>
                      </div>
                      {/* Correo Clicable */}
                      <div className="flex items-center gap-3">
                        <Mail className="text-plantilla-primary size-6" /> {/* Icono Lucide */}
                        <a href="mailto:contacto@cafacambaro.com" className="text-gray-800 dark:text-gray-300 hover:text-plantilla-primary transition-colors">
                          contacto@cafacambaro.com
                        </a>
                      </div>
                    </div>

                    {/* 🚨 Componente de Mapa/Imagen de Next.js (mejor opción) */}
                    <div className="w-full h-64 bg-gray-200 rounded-xl mt-4 relative">
                      {/* Idealmente aquí usarías un componente de mapa interactivo (Google Maps/Leaflet)
                        o una imagen optimizada con Next/Image. */}
                      {/* Ejemplo usando un placeholder como fondo o un Image de Next.js */}
                      <img
                        src="images/maps.png"
                        alt="Un mapa que muestra la ubicación de CAF Acámbaro."
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Bloque de Formulario */}
                  <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    {/* 🚨 Agregar un handler para la funcionalidad del formulario */}
                    <form className="flex flex-col gap-6" >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Envíanos un mensaje</h2>

                      {/* Campos de Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Nombre Completo</label>
                        <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-plantilla-primary focus:ring-plantilla-primary text-gray-800 dark:text-gray-300" id="name" placeholder="Juan Pérez" type="text" name="name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Correo Electrónico</label>
                        <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-plantilla-primary focus:ring-plantilla-primary text-gray-800 dark:text-gray-300" id="email" placeholder="tucorreo@ejemplo.com" type="email" name="email" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Mensaje</label>
                        <textarea className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-plantilla-primary focus:ring-plantilla-primary text-gray-800 dark:text-gray-300" id="message" placeholder="Tu mensaje..." rows="4" name="message" required></textarea>
                      </div>

                      {/* Botón de Submit */}
                      <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-plantilla-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-plantilla-primary/90 transition-colors" type="submit">
                        <span className="truncate">Enviar Mensaje</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            </main>
            <footer className="bg-white dark:bg-background-dark/50 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div className="size-5 text-plantilla-primary">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold">CAF Acámbaro</h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 CAF Acámbaro. Todos los derechos reservados.</p>
                  <div className="flex gap-4">
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

  );
}