import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import {
  Outlet
} from "react-router-dom";
import "./App.scss";
import NavBar from "./NavBar";
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
            <Outlet />
          </ErrorBoundary>
        </Container>
    </div>
  );
};

export default App;
