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
      validar=(Titulo,Tipo,X1,Y1,X2,Y2) =>{
        var datos={
            Titulo: Titulo,
            Type: Tipo,
            X1:X1,
            Y1:Y1,
            X2:X2,
            Y2:Y2
        }

        axios.get("http://localhost:8080/ProyectoWebServlet/svInsert?Titulo="+Titulo+"&Type="+Tipo+"&X1="+X1+"&Y1="+Y1+"&X2="+X2+"&Y2="+Y2)
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

     if (redirect) {
       return window.location.href = "http://localhost:8080/ProyectoWebServlet/subidaArchivo.html";
        //return <Redirect to='/ProyectoWebServlet/home'/>;
        }
        
      const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
      const undiv=  <div className = "registro-container" style={styles} id="equis">
               <h1 className="AlignCenter" > Crea una nueva pregunta </h1>
            <div class="form-group">
                <label class="form-label" for="Title">Titulo</label>
                <input placeholder="Ingrese el titulo de la pregunta" type="text" id="Title" class="form-control" />
                    </div>
            <div class="form-group"><label class="form-label" for="Type">Tipo de pregunta</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} id="Type" class="form-select">            
                <option value="1">Calculo de Pendiente</option>
                <option value="2">Calculo de la distancia</option>
                </select>
                </div>
                <div class="form-group">
                <label class="form-label" for="X1">Coordenada x1 </label>
                <input placeholder="Ingrese la coordenada x del primer punto" type="number" id="X1" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="Y1">Coordenada y1 </label>
                <input placeholder="Ingrese la coordenada y del primer punto" type="number" id="Y1" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="X2">Coordenada x2 </label>
                <input placeholder="Ingrese la coordenada x del segundo punto" type="number" id="X2" class="form-control" />
                </div>
                <div class="form-group">
                <label class="form-label" for="Y2">Coordenada y2 </label>
                <input placeholder="Ingrese la coordenada y del segundo punto" type="number" id="Y2" class="form-control" />
                </div>

            <button className="btn btn-primary" onClick={() => this.validar(document.getElementById("Title").value,document.getElementById("Type").value,document.getElementById("X1").value,document.getElementById("Y1").value,document.getElementById("X2").value,document.getElementById("Y2").value)}>
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