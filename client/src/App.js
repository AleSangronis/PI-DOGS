import './App.css';
import { Route, Switch } from "react-router-dom"
import DogsHome from "./react/components/dogs-home/dogs-home.js" 
import DetailsDogs from "./react/components/raza-details/raza.js"
import { BrowserRouter as Router } from 'react-router-dom';
import createdHome from "./react/components/create/createdHome.js"
import DogsSearchs from './react/components/search-home/dogsSearch.js';
import Favorites from './react/components/favorites-home/favorites';
import LandingPage from './react/components/home';
import PaginaDefault from './react/components/404/404.js'; 


function App() {

  return (
    <Router>
    <div className="App">
     <Switch> 
     <Route exact path="/" component={LandingPage} />
     <Route exact path="/dogs" component={DogsHome}/>
     <Route exact path="/dogs/:idRaza" component={DetailsDogs}/>
     <Route exact path="/dogs/created/new" component={createdHome}/>  
     <Route exact path="/dogs/result/search"><DogsSearchs/></Route>

     <Route exact path="/dogs/select/favs" component={Favorites} />
     <Route path="/"><PaginaDefault/></Route>  
     </Switch> 
   </div>
    </Router>
  );
}

export default App;
