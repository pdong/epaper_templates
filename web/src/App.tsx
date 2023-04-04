import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import NavBar from "./NavBar";
import SettingsForm from "./settings/SettingsForm";
import TemplatesIndex from "./templates/TemplatesIndex";
import VariablesIndex from "./variables/VariablesIndex";
import Dashboard from "./dashboard/Dashboard";
import BitmapsIndex from "./bitmaps/BitmapsIndex";
import useGlobalState from "./state/global_state";
import ErrorBoundary from "./util/ErrorBoundary";
import { Alert } from "react-bootstrap";

const App = () => {
  const [globalState, globalActions] = useGlobalState();

  useEffect(() => {
    globalActions.loadInitialState();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />

        <Container className="main-content">
          <ErrorBoundary>
            {globalState.errors.map((msg: string, i: number) => {
              return (
                <Alert
                  variant="danger"
                  onClose={() => globalActions.dismissError(i)}
                  dismissible
                >
                  {msg}
                </Alert>
              );
            })}
            <Routes>
              <Route path="templates/*" element={<TemplatesIndex />} />
              <Route path="settings/*" element={<SettingsForm />} />
              <Route path="variables/*" element={<VariablesIndex />} />
              <Route path="bitmaps/*" element={<BitmapsIndex />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </ErrorBoundary>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
