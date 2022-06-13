import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css";
import Login from "./components/login";
import Formulario from "./components/formulario";
import Modifica from "./components/modifica";
import Pregunta from "./components/pregunta";
import Consultar from "./components/consultar";
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Calculadora_Grafica/">
                    <Login />
                </Route>
                <Route exact path="/Calculadora_Grafica/home">
                    <Home />
                </Route>
                <Route exact path="/Calculadora_Grafica/formulario">
                    <Formulario />
                </Route>
                <Route exact path="/Calculadora_Grafica/modifica/:ID" render={props=>{var ID=props.match.params.ID;
                return <Modifica ID={ID}/>
                }}/>
                <Route exact path="/Calculadora_Grafica/pregunta/:ID" render={props=>{var ID=props.match.params.ID;
                return <Pregunta ID={ID}/>
                }}/>
                <Route exact path="/Calculadora_Grafica/consultar/:ID" render={props=>{var ID=props.match.params.ID;
                return <Consultar ID={ID}/>
                }}/>

                <Route path="*" render={() => <Redirect to='/Calculadora_Grafica/'/>} />
            </Switch>
        </div>
    );
}
export default App;