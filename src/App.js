import Container from 'react-bootstrap/Container'
import Header from './Header'
import {Route} from "react-router-dom"

function App() {
  return (
    <Route exact path = "/">
      <Container fluid>
        <Header/>
      </Container>
    </Route>
  );
}

export default App;
