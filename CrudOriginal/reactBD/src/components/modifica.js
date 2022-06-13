import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import $ from "jquery"
import { BrowserRouter } from 'react-router-dom';
import { browserHistory, Redirect } from "react-router";
import ReactDOM from "react-dom"
import Select from "react-select";
import axios from "axios";
import Home from "./home"
class Modifica extends React.Component {
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
    validar=(Title,R_X,R_signo,R_constante,C_X,C_Y,C_Xsigno,C_Ysigno,C_constante)=>{
      

        axios.get("http://localhost:8080/Calculadora_Grafica/svUpdate?ID_Pregunta="+this.props.ID+"&Title="+Title+"&R_X="+R_X+"&R_signo="+R_signo+"&R_constante="+R_constante+"&C_X="+C_X+"&C_Xsigno="+C_Xsigno+"&C_Y="+C_Y+"&C_Ysigno="+C_Ysigno+"&C_constante="+C_constante)
          .then(() => this.setState({ redirect: true })).catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
     
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
                <h1 className="AlignCenter" > Modifica un ejercicio </h1>
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
        <div class="modify-form">
            <div class="form-group">
                <label class="form-label" for="Title">Titulo</label>
                 <label class="form-label">Titulo anterior: {preg.TITLE}</label>
                <input placeholder="Ingrese el titulo de la pregunta" type="text" id="Title" class="form-control"/>
            </div>
                <div class="form-group">
                <h2 className="AlignCenter" > Ingrese los datos de la recta</h2><h2 className="AlignCenter" > y= ax+b </h2>
                <label class="form-label" for="R_X">Valor de a  </label>
                <label class="form-label">Valor anterior: {preg.XRECTA}</label>
                <input placeholder="Ingrese el valor de a" type="number" id="R_X" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="R_signo">Signo de la constante </label>      
                <label class="form-label">Valor anterior: {preg.SIGNORECTA}</label>  
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="R_signo" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>               
                  </div>
                <div class="form-group">
                <label class="form-label" for="R_constante">Constante de la recta (b) </label>
                <label class="form-label">Valor anterior: {preg.CONSRECTA}</label>
                <input placeholder="Ingrese el valor de b " type="number" min="0" id="R_constante" class="form-control" />
                 </div>
                <div class="form-group">
                <h2 className="AlignCenter" > Ingrese los datos de la ecuación del círculo</h2>
                <h2 className="AlignCenter" >(x-a)²+(y-b)²=r²</h2>
                <label class="form-label" for="C_X">Valor de a   </label>
                <label class="form-label">Valor anterior: {preg.XCIRC}</label>
                <input placeholder="Ingrese el valor de a" type="number" min="0" id="C_X" class="form-control" />
                 </div>

                <div class="form-group">
                <label class="form-label" for="C_Xsigno">Signo de a </label>
                <label class="form-label">Valor anterior: {preg.CIRCXSIGNO}</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="C_Xsigno" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Y">Valor de b   </label>
                <label class="form-label">Valor anterior: {preg.YCIRC}</label>
                <input placeholder="Ingrese el valor de a" type="number" min="0" id="C_Y" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Ysigno">Signo de b </label>
                <label class="form-label">Valor anterior: {preg.CIRCYSIGNO}</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="C_Ysigno" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>
                </div>    
                <div class="form-group">

                <label class="form-label" for="C_constante">Valor de r   </label>
                <label class="form-label">Valor anterior: {preg.CIRCONS}</label>
                <input placeholder="Ingrese el valor de r" type="number" min="0" id="C_constante" class="form-control" />
                </div>

                <div class="form-group">

          
<label class="form-label">Coordenadas de instersección : {preg.COORD}</label>

</div>
                
            </div>
                 );
        })
        )}                 
           
           <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Title").value,document.getElementById("R_X").value,document.getElementById("R_signo").value,document.getElementById("R_constante").value,document.getElementById("C_X").value,document.getElementById("C_Y").value,document.getElementById("C_Xsigno").value,document.getElementById("C_Ysigno").value,document.getElementById("C_constante").value)}>
                Submit
              </button>
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

export default Modifica; 