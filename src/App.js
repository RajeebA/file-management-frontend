import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import mainRoutes from "./routes/mainRoutes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Layout.Content style={{ margin: "16px" }}>
          <Switch>
            {mainRoutes.map((route) =>
              route.auth ? <PrivateRoute {...route} /> : <Route {...route} />
            )}
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>Rajeeb A</Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
