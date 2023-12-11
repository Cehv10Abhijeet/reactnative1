import React from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

import NavigationBar from "./components/Navbar";
import Report from "./components/Report";
import Pay from "./components/Pay";
import ReportSettlement from "./components/Report Settlement";
import SettlementProcess from "./components/SettlementProcess";
import SettlementPay from "./components/SettlementPay";
import LoadRequest from "./components/LoadRequest";
import Home from "./components/Home";

const App = () => {
  const { user, login } = useAuth();

  console.log(user);

  return (
    <BrowserRouter>
      {user ? (
        <>
          <NavigationBar />

          <Switch>
            <Route path="/Report" component={Report} />
            <Route path="/Home" component={Home} />
            <Route path="/Pay" component={Pay} />
            <Route path="/ReportSettlement" component={ReportSettlement} />
            <Route
              path="/SettlementProcess"
              component={SettlementProcess}
            />
            <Route path="/SettlementPay" component={SettlementPay} />
            <Route path="/LoadRequest" component={LoadRequest} />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
