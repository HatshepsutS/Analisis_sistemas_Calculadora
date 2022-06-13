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
import swal from 'sweetalert';
class Formulario extends React.Component {
  state={
    val: false,
    redirect: false
  }
    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }
    
    validar=(Titulo,R_X,R_signo,R_constante,C_X,C_Y,C_Xsigno,C_Ysigno,C_constante) =>{ 
      
      console.log("Dios por favor funciona "+Titulo.value+'_'+R_X+'_'+R_signo+'_'+R_constante+'_'+C_X+'_'+C_Y+'_'+C_Xsigno+'_'+C_Ysigno+'_'+C_constante );
      axios.get("http://localhost:8080/Calculadora_Grafica/svInsert",{
       params:{
        TituloB:Titulo.value,
        R_XB:R_X,
        R_signoB:R_signo,
        R_constanteB:R_constante,
        C_XB:C_X,
        C_YB:C_Y,
        C_XsignoB:C_Xsigno,
        C_YsignoB:C_Ysigno,
        C_constanteB:C_constante
       } 
      
      
      })

      .then(() => this.setState({ redirect: true })).catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    })
       /*.then(function (response){
        console.log(response);
        
       })*/
       .catch(function (error){
        console.log(error);

       })
       

        

    }
  

      handleChange(event) {    
          this.setState({value: event.target.value});  
      }
  
 
    render() {

      const styles = {
          padding : '5px'
      }
      const { redirect } = this.state;

     if (redirect) {
       //return window.location.href = "http://localhost:8080/ProyectoWebServlet/home";
         return <Redirect to='/Calculadora_Grafica/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
               <h1 className="AlignCenter" > Crear un nuevo ejercicio  </h1>
               <div class="form-group">
                <label class="form-label" for="Titulo">Titulo del ejercicio </label>
                <input placeholder="Ingrese el titulo o alias para el ejercicio" type="text" id="Titulo" class="form-control" />
                    </div>
               
                <div class="form-group">
                <h2 className="AlignCenter" > Ingrese los datos de la recta</h2><h2 className="AlignCenter" > y= ax+b </h2>
                <label class="form-label" for="R_X">Valor de a  </label>
                <input placeholder="Ingrese el valor de a" type="number" id="R_X" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="R_signo">Signo de la constante </label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="R_signo" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>
                </div>
                <div class="form-group">
                <label class="form-label" for="R_constante">Constante de la recta (b) </label>
                <input placeholder="Ingrese el valor de b " type="number" min="0" id="R_constante" class="form-control" />
                </div>

                <div class="form-group">
                <h2 className="AlignCenter" > Ingrese los datos de la ecuación del círculo</h2>
                <h2 className="AlignCenter" >(x-a)²+(y-b)²=r²</h2>
              
                <label class="form-label" for="C_X">Valor de a   </label>
                <input placeholder="Ingrese el valor de a" type="number" min="0" id="C_X" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Xsigno">Signo de a </label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="C_Xsigno" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Y">Valor de b   </label>
                <input placeholder="Ingrese el valor de a" type="number" min="0" id="C_Y" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Ysigno">Signo de b </label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="C_Ysigno" class="form-select">            
                <option value="1">+</option>
                <option value="2">-</option>
                </select>
                </div>
                <div class="form-group">

            <label class="form-label" for="C_constante">Valor de r   </label>
            <input placeholder="Ingrese el valor de r" type="number" min="0" id="C_constante" class="form-control" />
            </div>

            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Titulo"),document.getElementById("R_X").value,document.getElementById("R_signo").value,document.getElementById("R_constante").value,document.getElementById("C_X").value,document.getElementById("C_Y").value,document.getElementById("C_Xsigno").value,document.getElementById("C_Ysigno").value,document.getElementById("C_constante").value)}>
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
export default Formulario; 