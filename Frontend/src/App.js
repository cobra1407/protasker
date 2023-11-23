import './App.css';
import Task from "./Page/Tasks/Task";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import {UsersProvider} from "./Context/UsersContext";
import {TasksProvider} from "./Context/TasksContext";
import {StatusesProvider} from "./Context/StatusesContext";
import Dashboard from "./Page/Dashboard/Dashboard";

function App() {
  return (
      <TasksProvider>
          <StatusesProvider>
              <UsersProvider>
                  <BrowserRouter>
                      <NavBar/>
                      <Routes>
                          <Route path="/taches" Component={Task}/>
                          <Route path="/tableau-de-bord" Component={Dashboard}/>
                          <Route path="/" element={<Navigate to="/tableau-de-bord" />}/>
                      </Routes>
                  </BrowserRouter>
              </UsersProvider>
          </StatusesProvider>
      </TasksProvider>
      );
}

export default App;
