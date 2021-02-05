import React, { Fragment, useEffect, useState } from 'react' 
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Header from "./components/Header";
import Error from "./components/Error";


function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, guardarConsultar] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [error, guardarError] = useState(false)
  const { ciudad, pais } = busqueda


  useEffect(() => {
    const consultarAPI = async () => {

      if(consultarAPI){
        const appId = '0394d75f47e1b1cd306a509d5b88e427';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        guardarResultado(resultado)
        guardarConsultar(false)

        if(resultado.cod === "404"){
          guardarError(true)
        }else{
          guardarError(false)
        }
      }

    }
    consultarAPI()
  //eslint-disable-next-line
  },[consultar])

  let componente;
  if(error){
    componente = <Error mensaje="No hay Resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
        <Fragment>
          <Header
            titulo="Clima react APP"
          />
          <div className="contenedor-form">
              <div className="container">
                  <div className="row">
                    <div className="col m6 s12">
                      <Formulario 
                          busqueda={busqueda}
                          guardarBusqueda={guardarBusqueda}
                          guardarConsultar={guardarConsultar}
                      />
                    </div>
                    <div className="col m6 s12">
                        {componente}
                    </div>
                  </div>
              </div>
          </div>
        </Fragment>
        
  );
}

export default App;
