import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { BrowserRouter } from 'react-router-dom';
import { browserHistory, Redirect } from "react-router";
import ReactDOM from "react-dom"
import Select from "react-select";
import { Link,NavLink } from "react-router-dom";
import axios from "axios";
import Home from "./home"
import Grafica from "./graficar";

class Pregunta extends React.Component {
  state={
    val: false,
    redirect: false,
    pregunta:{}
  }

  cargaDatos=()=>{
    axios.get("http://localhost:8080/Calculadora_Grafica/svCharge?ID_Modificar="+this.props.ID).then(response => { 
        this.setState({
            datos:response.data
            ,status:true
        });
    });

}
//funciones y componentes cargados al iniciar
componentDidMount() {
    this.cargaDatos();
    
}
    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
    //Funcion de validacion y realizacion de envio de informacion a nuestro servlet
      
      handleChange(event) {    
          this.setState({value: event.target.value});  
      }

    render() {
      
      const styles = {
          padding : '5px'
      }
      const { redirect } = this.state;
// funcion para redireccionar al menu del crud
     if (redirect) {
        return <Redirect to='/Calculadora_Grafica/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
               
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
        <div class="modify-form">
            <div class="form-group">
            <h1 className="AlignCenter" > Probando {preg.TITLE} </h1>
                
            </div>
                <div class="form-group">
                <label class="form-label"> Recta:  y= {preg.XRECTA}x{preg.SIGNORECTA}{preg.CONSRECTA}  </label>                
                </div>               
                <div class="form-group">
                <label class="form-label"> Círculo: (x{preg.CIRCXSIGNO}{preg.XCIRC})²+(y{preg.CIRCYSIGNO}{preg.YCIRC})²={preg.CIRCONS}²</label>          
                 </div>
                <div class="form-group">
                <label class="form-label">Coordenadas de instersección : {preg.COORD}</label>
                <div className=" flex align-middle items-center">
                    <Grafica H={preg.XRECTA} K={preg.CONSRECTA} a={preg.XCIRC} b={preg.YCIRC}></Grafica>
              
                </div>
              </div>
                
            </div>
                 );
        })
        )}                 
            
              <Button className="btn btn-primary" style={{ margin: "12px" }}>
                        <NavLink to={"/Calculadora_Grafica/home"} className="CustomLink">Regresar</NavLink>
                    </Button>
            </div>
        
       const esValido = (this.state.val) || qId?<Home></Home>: undiv
        return(
          <div>
            {esValido}
            {console.log(esValido)}
          </div>
        )    
  }
}

export default Pregunta; 