import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import PilotStandings from "../PilotStandings/PilotStandings";
import ListOnePilot from "../ListOnePilot/ListOnePilot";

import PilotCreate from "../PilotCreate/PilotCreate";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import RaceCreate from "../RaceCreate/RaceCreate";
import RaceEdit from "../RaceEdit/RaceEdit";
import ListRaces from "../ListRaces/ListRaces";
import ListPilots from "../ListPilots/ListPilots";
import PilotEdit from "../PilotEdit/PilotEdit";
import PilotDelete from "../PilotDelete";
import CircuitCreate from "../CircuitCreate/CircuitCreate";
import CircuitEdit from "../CircuitEdit/CircuitEdit";
import RaceDelete from "../RaceDelete";
import TeamStandings from "../TeamStandings/TeamStandings";
import TableOfPoints from "../TableOfPoints/TableOfPoints";
import TableOfPointsEdit from "../TableOfPointsEdit/TableOfPointsEdit";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import AdminRoute from "../auth/AdminRoute";
import ProtectedRoute from "../auth/ProtectedRoute";
import Users from "../Users/Users";

import { AuthContextComponent } from "../../contexts/authContext";

function App() {
  return (
    <BrowserRouter className="">
      
        <AuthContextComponent>
      <NavbarComponent />
          <div className=" mother-div">
            <div className="wrap container">
              <Switch >
                <Route exact path="/" component={PilotStandings} />
                <Route exact path="/team-standings" component={TeamStandings} />
                <Route exact path="/races" component={ListRaces} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/pilots" component={ListPilots} />
                <Route exact path="/pilot/:id" component={ListOnePilot} />
                <AdminRoute exact path="/add-pilot" component={PilotCreate} />
                <AdminRoute exact path="/add-race" component={RaceCreate} />
                <AdminRoute exact path="/edit-race/:id" component={RaceEdit} />
                <AdminRoute exact path="/pilot/edit/:id" component={PilotEdit} />
                <AdminRoute
                  exact
                  path="/pilot/delete/:id"
                  component={PilotDelete}
                />
                <AdminRoute exact path="/add-circuit" component={CircuitCreate} />
                <AdminRoute
                  exact
                  path="/circuit/edit/:id"
                  component={CircuitEdit}
                />
                <AdminRoute exact path="/race/delete/:id" component={RaceDelete} />
                <AdminRoute exact path="/points-table" component={TableOfPoints} />
                <AdminRoute
                  exact
                  path="/points-table-edit"
                  component={TableOfPointsEdit}
                />
                <AdminRoute exact path="/users" component={Users} />
              </Switch>
            </div>
          </div>
        </AuthContextComponent>
      
    </BrowserRouter>
  );
}

export default App;
