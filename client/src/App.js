import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views'
import NavBar from './components/NavBar/NavBar';

function App() {

  const {pathname} = useLocation();
  

  return (
    <div className="App">
    
      {pathname !== "/" && <NavBar/>}
      
        <Route exact path="/" >
          <Landing/>
        </Route>
        <Route path="/home" render= {() => <Home/>}/>
        <Route path="/detail" render= {() => <Detail/>}/>
        <Route path="/create" render= {() => <Form/>}/>
     
        
      
    </div>
  );
}

export default App;
