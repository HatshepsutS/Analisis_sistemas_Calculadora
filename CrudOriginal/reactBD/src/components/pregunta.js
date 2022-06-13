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
    validar=(Resultado,LaRespuesta) =>{
      var datos={
          Resultado:Resultado,
          RealAnswer:LaRespuesta
      }
      
      if(datos.Resultado==datos.RealAnswer){
        //uso de sweetalert para avisar al usuario si es correcta su respuesta o no
         return swal({
           title:"¡Eres un genio!",
           text:"La respuesta es correcta",
           icon:"success",
           button:"Continuar"
         });
      }
        else{
            return swal({
           title:"No te desanimes pero..",
           text:"Te equivocaste, la respuesta correcta es: "+datos.RealAnswer,
           icon:"error",
           button:"Continuar"
         });
        }
  }
      
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
            <label class="form-label"> Calcula la intersección entre la recta y el círculo dado, si no existe escribe "No tiene solución" de lo contrario introduce la respuesta en el siguiente formato (#,#), (#,#)  </label>      
            </div>
                <div class="form-group">
                <h3> Recta:  y= {preg.XRECTA}x{preg.SIGNORECTA}{preg.CONSRECTA}  </h3>                
                </div>               
                <div class="form-group">
                <h3> Círculo: (x{preg.CIRCXSIGNO}{preg.XCIRC})²+(y{preg.CIRCYSIGNO}{preg.YCIRC})²={preg.CIRCONS}</h3>          
                 </div>
                <div class="form-group">
                <div className=" flex align-middle items-center">
                    <Grafica a_circ={preg.XCIRC} a_csigno={preg.CIRCXSIGNO} b_circ={preg.YCIRC} b_csigno={preg.CIRCYSIGNO} radioc={preg.RADIO} a_rect={preg.XRECTA}  b_rect={preg.CONSRECTA}   signorecta={preg.SIGNORECTA}></Grafica>
                </div>
              </div>
              <div class="form-group"> 
              <label class="form-label" for="Answer">Respuesta</label>
                    <input placeholder="Ingrese la respuesta con un maximo de 2 decimales, en caso de ser entero escriba #.0" type="text" id="userAnswer"  />        
                    <input value= {preg.COORD} type="hidden" id="LaRespuesta" class="form-control" />
              </div>


                
            </div>
                 );
        })
        )}                 
            
              <Button className="btn btn-primary" style={{ margin: "12px" }}>
                        <NavLink to={"/Calculadora_Grafica/home"} className="CustomLink">Regresar</NavLink>
                    </Button>
                    <Button className="btn btn-primary" style={{ margin: "12px" }} onClick={() => this.validar(document.getElementById("userAnswer").value,document.getElementById("LaRespuesta").value)}>
                        Submit
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