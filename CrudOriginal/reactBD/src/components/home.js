import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link,NavLink } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import { Redirect } from 'react-router';
class Home extends React.Component {

    
    state = {
        datos:[],status: false,
        redirect: false
    } 
    //Carga de lista json con todos los elementos de las preguntas existentes
    cargaDatos=()=>{
        axios.get("http://localhost:8080/Calculadora_Grafica/svLista").then(response => { 
            console.log(response.data);
            this.setState({
                datos:response.data
                ,status:true
            });
        });

    } 

    componentDidMount() {
        this.cargaDatos();
        
    }
   

    handleClick(id) {

        swal({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este ejercicio",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.get("http://localhost:8080/Calculadora_Grafica/svDelete?ID_Pregunta="+id).then(response => {  
                swal("Se ha eliminado tu ejercicio con éxito, refresca la página para ver los cambios", {
                icon: "success",
              });
            });
         

            } else {
              swal("Tu ejercicio está a salvo");
            }
          });




    } 

    render() {
        const { redirect } = this.state;

    if (redirect) {
    return <Redirect to='/Calculadora_Grafica/home'/>;
    }
        const { data, showAlert, alertText } = this.state;
        return (
            <Container className="MarginContainer" >
                <h1 className="AlignCenter" >CALCULADORA GRÁFICA DE LA INTERSECCIÓN ENTRE UNA RECTA Y UN CÍRCULO</h1>
                <hr style={{ width: "80%" }} />
                {
                    showAlert ?
                        <Alert variant="danger">
                            {alertText}
                        </Alert>
                        : null
                }
                <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/Calculadora_Grafica/formulario" className="CustomLink">Crear</Link>
                </Button>
                <Button variant="info" style={{ margin: "12px" }}>
                <Link to="/Calculadora_Grafica/" className="CustomLink"> Cerrar sesión</Link>
                </Button>
                <Table striped bordered >
                    <thead>
                        <tr>
                            <th>ID Ejercicio </th>
                            <th>Ejercicio </th>
                            <th>¿Qué quieres hacer?</th>
                        </tr>
                    </thead>
                    <tbody>
            {this.state.status===true &&
            (
            this.state.datos.map((preg,i)=>{
                return(
                <tr key={i}>
                    <td>{preg.ID}</td>
                    <td>{preg.TITLE}</td>
                    <td>
                    <Button variant="warning" style={{ margin: "12px" }}>
                        <NavLink to={"/Calculadora_Grafica/consultar/"+preg.ID} className="CustomLink">Ver</NavLink>
                    </Button>
                    <Button variant="danger" style={{ margin: "12px" }} onClick={this.handleClick.bind(this, preg.ID)}>
                    Eliminar
                    </Button>
                    <Button variant="warning" style={{ margin: "12px" }}>
                        <NavLink to={"/Calculadora_Grafica/modifica/"+preg.ID} className="CustomLink">Modificar</NavLink>
                    </Button>
                    <Button variant="success" style={{ margin: "12px" }}>    
                        <NavLink to={"/Calculadora_Grafica/pregunta/"+preg.ID} className="CustomLink">Probar</NavLink>
                    </Button>
                    </td>
                    </tr>
                );
        })
        )}
                    </tbody>
                </Table>
            </Container>
        )
    }

}

export default Home;