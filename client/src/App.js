import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {

  const {pathname} = useLocation();
  

  return (
    <div className="App">
    
      {pathname !== "/" && <NavBar/>}
      
        <Route exact path="/" >
          <Landing/>
        </Route>
        <Route path="/home" render= {() => <Home/>}/>
        <Route path="/detail/:id" render= {() => <Detail />}/>
        <Route path="/create" render= {() => <Form/>}/>

      {pathname !== "/" && <Footer/>}      
    </div>
  );
}

export default App;
