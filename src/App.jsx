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
    try{
      const datosapi = {
        nombre:persona.nombre,
        edad:persona.edad,
        ciudad:persona.ciudad,
        correo:persona.correo,
        programa:persona.programa,
        ficha:persona.ficha,
        jornada:persona.jornada,

        //Cursos

        nivel:persona.nivel,
        titulo:persona.titulo,
        cursos:persona.cursos,
        institución:persona.institución,
        anio:persona.anio,

        //Experiencia laboral
        Empresa:persona.Empresa,
        Cargo:persona.Cargo,
        Tiempo:persona.Tiempo,
        funciones:persona.funciones,



      };

      const respuesta = await fetch("http://127.0.0.1:5000/api/registrohv",
        {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosapi),
      });
      const resultado = await respuesta.json();

      console.log("Respuesta realizada", resultado);

      if (!respuesta.ok) {
        console.error("Error de Flask:", resultado);
        return;
  }
   console.log("Registro guardado correctamente");

    }catch(error){
      console.error(
        "error al conectar con flask",
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
      guardarhojavida = {guardarhojavida}
      />
    }
    <Footer/>
    </>
  )
}
export default App