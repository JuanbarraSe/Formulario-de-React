function Formulario({persona, setPersona, siguiente}){

    const continuar = (e) => {

        e.preventDefault();
        if(persona.nombre.trim() === ""){
            alert("Ingresar nombre completo")
            return;
        }

        if(persona.ciudad.trim() === ""){
            alert("Ingresar nombre de la ciudad")
            return;
        }

        if(persona.edad.trim() ===  ""){
            alert("Ingrese su edad")
            return;
        }

        if(persona.edad < 1 || persona.edad >=100){
            alert("Edad no válida")
            return;
        }

        if(persona.programa.trim() === ""){
            alert("Ingrese su programa de formación")
        }

        if(persona.correo.trim() === ""){
            alert("Ingrese su correo")
            return;
        }
        const excorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!excorreo.test(persona.correo.trim())){
            alert("Ingresar un correo electrónico válido")
        }

        if(persona.ficha.trim() === ""){
            alert("Ingrese el número de ficha")
        }

        if(persona.jornada.trim() === ""){
            alert("Ingrese su jornada")
        }

        if(siguiente){
            siguiente();
            alert("Los datos fueron capturados correctamente")
        }
    }
    return (
        <div className="formulario">
            <h2>Registro de Aprendices</h2>

            <form onSubmit={continuar}>

                <div className="Grupo">
                    <label>Fotografia</label>
                    <input type="file" accept="image/*"
                    onChange={(e) => {
                        const archivo = e.target.files[0]

                        
                        if(archivo){
                            setPersona({...persona,foto:URL.createObjectURL(archivo)})
                        }
                    }}
                    />
                </div>

                <div className="Grupo">
                    <label>Nombre Completo</label>
                    <input type="text" placeholder="Ingrese su nombre"
                    value={persona.nombre}
                    onChange = {(e) => setPersona({...persona,nombre:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Ciudad</label>
                    <input type="text" placeholder="Ingrese su ciudad"
                    value={persona.ciudad} 
                    onChange={(e) => setPersona({...persona,ciudad:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Edad</label>
                    <input type="number" placeholder="Ingrese su edad"
                    value={persona.edad}
                    onChange={(e) => setPersona({...persona,edad:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Programa de formación</label>
                    <input type="text" placeholder="Ejemplo: ADSO"
                    value={persona.programa}
                    onChange={(e) => setPersona({...persona,programa:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Correo Electrónico</label>
                    <input type="email" placeholder="correo@misena.edu.co"
                    value={persona.correo}
                    onChange={(e) => setPersona({...persona,correo:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Número de ficha</label>
                    <input type="number" placeholder="Ingrese su ficha"
                    value={persona.ficha}
                    onChange={(e) => setPersona({...persona,ficha:e.target.value})}
                    />
                </div>

                <div className="Grupo">
                    <label>Jornada</label>
                    <select value={persona.jornada}
                    onChange={(e) => setPersona({...persona,jornada:e.target.value})}>
                        <option>Mañana</option>
                        <option>Tarde</option>
                        <option>Noche</option>
                        <option>Mixta</option>
                    </select>
                </div>

                <button type="submit">
                    Continuar Registro
                </button>
            </form>
        </div>
    )
}
export default Formulario