import { useState } from "react";
function Academico({persona, setPersona, anterior, siguiente}){
    
    const [formación, setFormación] = useState("");
    const [titulo, setTitulo] = useState("");
    const [cursos, setCursos] = useState("");
    const [institución, setInstitución] = useState("");
    const [año, setAño] = useState("");

    //Definir el estado de los cursos
    const [nuevoCurso, setNuevoCurso] = useState("");

    const AgregarCursos = () => {
        if(nuevoCurso.trim() === ""){
            alert("Ingrese el nombre del curso");
            return;
        }

        setPersona({...persona,cursos:[...persona.cursos,nuevoCurso]});

        //Limpiar el campo
        setNuevoCurso("");
    }

    //Eliminar curso
    const eliminarCurso = (indice) => {
        const cursosActualizados = persona.cursos.filter(
            (_, i) => i !== indice
        );

        setPersona({...persona,cursos: cursosActualizados});
    }

    const continuar = (e) => {

        e.preventDefault();
        if(persona.nivel.trim() === ""){
            alert("Ingrese el nivel de su formación")
            return;
        }

        if(persona.titulo.trim() === ""){
            alert("Ingrese su título obtenido")
            return;
        }

        if(persona.cursos.length === 0){
            alert("El campo no puede estar vacío")
            return;
        }
        
        if(persona.institución.trim() === ""){
            alert("Ingrese el nombre de la institución educativa")
            return;
        }

        if(persona.anio.trim() === ""){
            alert("Ingrese el año de graduación")
        }
        
        if(siguiente){
            siguiente();
        }
    }
    return (
        <div className="academico">
            <h2>DATOS ACADEMICOS</h2>

            <form onSubmit={continuar}>
                <div className="Grupo">
                    <label>Nivel de formación</label>
                    <select
                    value={persona.nivel}
                    onChange={(e) =>
                        setPersona({...persona,nivel:e.target.value})}>
                        <option>Técnico</option>
                        <option>Tecnólogo</option>
                        <option>Profesional</option>
                        <option>Maestría</option>
                    </select>
                </div>

                <div className="Grupo">
                    <label>Titulo Obtenido</label>
                    <input type="text" placeholder="Ingrese el titulo"
                    value={persona.titulo}
                    onChange={(e) => setPersona({...persona,titulo:e.target.value})}/>
                </div>

                <div className="Grupo Completo">
                    <label>Cursos Realizados</label>
                    <div className="curso-agregar">
                        <input type="text" placeholder="Ejemplo: React"
                        value={nuevoCurso}
                        onChange={(e) => setNuevoCurso(e.target.value)}/>

                        <button type="button" onClick={AgregarCursos}>
                            Agregar
                        </button>
                    </div>
                    <div className="lista-cursos">
                        {
                            persona.cursos.map(
                                (curso, indice) => (
                                    <div className="curso" key={indice}>
                                        <span>
                                            {curso}
                                        </span>

                                        <button type="button" onClick={() => eliminarCurso(indice)}>
                                            Eliminar
                                        </button>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>

                <div className="Grupo">
                    <label>Institución Educativa</label>
                    <input type="text" placeholder="Ingrese la institución"
                    value={persona.institución}
                    onChange={(e) => setPersona({...persona,institución:e.target.value})}/>
                </div>

                <div className="Grupo">
                    <label>Año de Graduación</label>
                    <input type="text" placeholder="Ejemplo: 2025"
                    value={persona.anio}
                    onChange={(e) => setPersona({...persona,anio:e.target.value})}/>
                </div>

                <button type="button" onClick={anterior}> ← Anterior </button>
                <button type="submit"> Continuar → </button>
            </form>
        </div>
    )
}

export default Academico