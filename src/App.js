import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Title from './components/Title';

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

                Scores
                
                </Col>

                <Col sm={10}>

                    <Row>

                        Hangman

                    </Row>

                    <Row>

                        Word

                    </Row>

                </Col>
                
            </Row>

        </Container>

    </>

    )
}

}

export default App;