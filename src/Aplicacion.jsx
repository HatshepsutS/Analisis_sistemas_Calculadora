import React, { Component } from 'react';
import ReactDOM from "react-dom";
// Importamos el componente
import Hola from './Hola.jsx';
 
class Aplicacion extends React.Component {
  render() {
    return (
    // Componente
    <div>
    <Hola />
    <Hola />
    <Hola />
    <Hola />
    <Hola />
    <Hola />
    <Hola />                    
    </div>    
    );
  }
}
 
export default Aplicacion;

const wrapper = document.getElementById("contenedor");
wrapper ? ReactDOM.render(<Aplicacion />, wrapper) : false;