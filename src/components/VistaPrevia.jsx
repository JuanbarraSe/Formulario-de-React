function VistaPrevia({persona, anterior ,guardarhojavida}){
    return (
        <div className="formulario">
            <h2>Vista Previa</h2>
            {persona.foto && (
                <div className="foto-preview">
                    <img src={persona.foto} alt="foto de perfil"/>
                </div>
            )}
            <h3>Datos Personales</h3>

            <p>Nombre: {persona.nombre}</p>
            <p>Edad: {persona.edad}</p>
            <p>Ciudad: {persona.ciudad}</p>
            <p>Programa: {persona.programa}</p>
            <p>Correo: {persona.correo}</p>
            <p>Ficha: {persona.ficha}</p>
            <p>Jornada: {persona.jornada}</p>

            <h3>Información Academica</h3>

            <p>Nivel de formación:{persona.nivel}</p>
            <p>Título Obtenido:{persona.titulo}</p>
            <p>Institución:{persona.institución}</p>
            <p>Año de Graduación:{persona.anio}</p>

            <div className="detalle">
                <span>Cursos</span>
                <div>
                    {persona.cursos.map((curso,indice) => (
                        <p key={indice}>
                            {curso}
                        </p>
                    ))}
                </div>
            </div>

            <h3>Experiencia Laboral</h3>
            {persona.experiencias.map((experiencias, indice) => (
                <div className="detalle" key={indice}>
                    <p>Empresa:{experiencias.empresa}</p>
                    <p>Tiempo de Experiencia:{experiencias.tiempo}</p>
                    <p>Cargo:{experiencias.cargo}</p>
                    <p>Funciones:{experiencias.funciones}</p>
                </div>
            ))}

            <button type="button" onClick={anterior}>
                Anterior
            </button>
            <button type="button" onClick={guardarhojavida}>
                Confirmar registro
            </button>
        </div>
    )
}

export default VistaPrevia