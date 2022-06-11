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
class Consultar extends React.Component {
  state={
    val: false,
    redirect: false,
    pregunta:{}
  }

  cargaDatos=()=>{
    axios.get("http://localhost:8080/ProyectoWebServlet/svCharge?ID_Modificar="+this.props.ID).then(response => { 
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
        return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
                <h1 className="AlignCenter" > Modifica una nueva pregunta </h1>
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
        <div class="modify-form">
            <div class="form-group">
                
                 <label class="form-label">Titulo: {preg.TITLE}</label>
                         </div>
                <div class="form-group">
                <h2 className="AlignCenter" > Datos de la recta</h2><h2 className="AlignCenter" > y= ax+b </h2>
                <label class="form-label">Valor de a {preg.XRECTA}</label>
                  </div>
                <div class="form-group">
                <label class="form-label">Signo de la constante {preg.SIGNORECTA}</label>            
                  </div>
                <div class="form-group">
        
                <label class="form-label">Constante de la recta (b)  {preg.CONSRECTA}</label>
               
                 </div>
                <div class="form-group">
                <h2 className="AlignCenter" > Datos de la ecuación del círculo</h2>
                <h2 className="AlignCenter" >(x-a)²+(y-b)²=r²</h2>
                <label class="form-label">Valor de a {preg.XCIRC}</label>
                </div>
                <div class="form-group">
                <label class="form-label" for="C_Xsigno">Signo de a </label>
                <label class="form-label">Signo de a {preg.CIRCXSIGNO}</label>
                
                </div>
                <div class="form-group">

                <label class="form-label">Valor de b {preg.YCIRC}</label>
                </div>
                <div class="form-group">
                <label class="form-label">Signo de b {preg.CIRCYSIGNO}</label>
                </div>    
                <div class="form-group">

                <label class="form-label">Valor de r  {preg.CIRCONS}</label>
                  </div>

                <div class="form-group">

          
<label class="form-label">Coordenadas de instersección : {preg.COORD}</label>

</div>
                
            </div>
                 );
        })
        )}                 
            
              <Button className="btn btn-primary" style={{ margin: "12px" }}>
                        <NavLink to={"/ProyectoWebServlet/home"} className="CustomLink">Regresar</NavLink>
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

export default Consultar; 