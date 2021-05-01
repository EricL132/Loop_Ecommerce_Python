import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/HomePage/Homepage'
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
