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

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/ProyectoWebServlet/">
                    <Login />
                </Route>
                <Route exact path="/ProyectoWebServlet/home">
                    <Home />
                </Route>
                <Route exact path="/ProyectoWebServlet/formulario">
                    <Formulario />
                </Route>
                <Route exact path="/ProyectoWebServlet/modifica/:ID" render={props=>{var ID=props.match.params.ID;
                return <Modifica ID={ID}/>
                }}/>
                <Route exact path="/ProyectoWebServlet/pregunta/:ID" render={props=>{var ID=props.match.params.ID;
                return <Pregunta ID={ID}/>
                }}/>

                <Route path="*" render={() => <Redirect to='/ProyectoWebServlet/'/>} />
            </Switch>
        </div>
    );
}
export default App;