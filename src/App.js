import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Title from './components/Title';
import Attempts from './components/Attempts';
import GamesWon from './components/GamesWon';
import GamesLost from './components/GamesLost';
import Hangman from './components/Hangman';
import Letters from './components/Letters';

class App extends Component {

state={
    
}


componentDidMount() {
    
}

render(){
    return (

    <>

        <Container fluid={true}>

            <Row>

                <Title/>
                
            </Row>

            <Row>

                <Col sm={2}>

                    <Attempts/>

                    <GamesWon/>

                    <GamesLost/>

                
                </Col>

                <Col sm={10}>

                    <Row>

                        <Hangman/>

                    </Row>

                    <Row>

                        <Letters/>

                    </Row>

                </Col>
                
            </Row>

        </Container>

    </>

    )
}

}

export default App;