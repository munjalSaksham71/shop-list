import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen'
import ShopDetailsScreen from './screens/ShopDetailsScreen'
import ShopEditScreen from './screens/ShopEditScreen';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Container>
        <Route path="/shop/:id/edit" component={ShopEditScreen} exact />
        <Route path="/shop/:id" component={ShopDetailsScreen} exact />
        <Route path="/" component={HomeScreen} exact />
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
