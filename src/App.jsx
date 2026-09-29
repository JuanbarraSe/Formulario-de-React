import { useState } from "react";
import Header from './components/header'
import Formulario from './components/FormularioDatos'
import Footer from './components/footer'
import Academico from "./components/FormularioAcademico";
import Experiencia from "./components/FormularioExperiencia";
import VistaPrevia from "./components/VistaPrevia";
import './App.css'

function App() {

  const[paso, setPaso] = useState(1);

  const [persona, setPersona] = useState({
    foto: null,
    nombre: "",
    ciudad: "",
    edad: "",
    programa: "",
    correo:"",
    ficha:"",
    jornada:"Mañana",

    //Informacion de estudios
    nivel:"",
    titulo:"",
    cursos: [],
    institución:"",
    anio:"",


    //Experiencia laborales
    experiencias:[]
  })
  const guardarhojavida = async () => {
  try {
    const datosapi = {
      nombre: persona.nombre,
      edad: persona.edad,
      ciudad: persona.ciudad,
      correo: persona.correo,
      programa: persona.programa,
      ficha: persona.ficha,
      jornada: persona.jornada,
    };

    const respuesta = await fetch("http://127.0.0.1:5000/api/registrohv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosapi),
      }
    );

    const resultado = await respuesta.json();

    console.log("Respuesta realizada:", resultado);

    if (!respuesta.ok) {
      console.error("Error de Flask:", resultado);
      return;
    }

    console.log("Registro guardado correctamente");

    const hoja_vida_id = resultado.id;

    console.log("ID de la hoja de vida:", hoja_vida_id);

    const respuestaestudio = await fetch(`http://127.0.0.1:5000/api/registrarestudios/${hoja_vida_id}/estudios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nivel: persona.nivel,
          Titulo: persona.titulo,
          Institucion: persona.institución,
          Anio_graduacion: persona.anio,
        }),
      }
    );

    const resultadoestudio = await respuestaestudio.json();

    console.log("Respuesta estudios:", resultadoestudio);

    for (const curso of persona.cursos) {

      const respuestacurso = await fetch(`http://127.0.0.1:5000/api/registrarcurso/${hoja_vida_id}/cursos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nombre: curso,
          }),
        }
      );

      const resultadocurso = await respuestacurso.json();

      console.log("Respuesta curso:", resultadocurso);
    }
      for (const experiencia of persona.experiencias) {

  const respuestaexperiencia = await fetch(
    `http://127.0.0.1:5000/api/registrarexperiencia/${hoja_vida_id}/experiencias`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Empresa: experiencia.empresa,
        Cargo: experiencia.cargo,
        Tiempo: experiencia.tiempo,
        Funciones: experiencia.funciones,
      }),
    }
  );

  const resultadoexperiencia = await respuestaexperiencia.json();
  
  console.log("Respuesta experiencia COMPLETA:", resultadoexperiencia);
  console.log("ID de experiencia:", resultadoexperiencia.id);

  const experiencia_id = resultadoexperiencia.id;

  if (!experiencia_id) {
    console.error("❌ Flask no devolvió el ID de la experiencia");
    continue;
  }

  const respuestahabilidad = await fetch(
    `http://127.0.0.1:5000/api/registrarhabilidad/${experiencia_id}/habilidades`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: experiencia.habilidad,
      }),
    }
  );

  const resultadohabilidad = await respuestahabilidad.json();

  console.log("Respuesta habilidad:", resultadohabilidad);
}
      } catch (error) {
        console.error(
          "Error al conectar con Flask:",
          error
        );
      }

  };

  return (
    <>
    <Header/>
    {
      paso == 1 && <Formulario
        persona = {persona}
        setPersona = {setPersona}
        siguiente = {() => setPaso(2)}
        />
    }

    {
      paso == 2 && <Academico
      persona={persona}
      setPersona={setPersona}
      anterior = {() => setPaso(1)}
      siguiente={() => setPaso(3)}
      />
    }

    {
      paso == 3 && <Experiencia
      persona={persona}
      setPersona={setPersona}
      anterior={() => setPaso(2)}
      siguiente={() => setPaso(4)}
      />
    }

    {
  paso == 4 && <VistaPrevia
    datos={persona}
    persona={persona}
    anterior={() => setPaso(3)}
    guardarhojavida={guardarhojavida}
  />
}
    <Footer/>
    </>
  )
}
export default App