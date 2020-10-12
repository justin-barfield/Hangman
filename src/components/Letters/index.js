import React from 'react';
import { Card, Row, CardGroup } from 'react-bootstrap';
import './style.css';


function Letters(props) {
    console.log("letters: ", props.propWord)
    var count = props.propWord.length
    console.log(count)
    var newObj = Object.assign({}, props.propWord);
    console.log("newObj: ", newObj)
    
    return (

        <Row>
            
            <CardGroup>

                {/* {this.props.propWord.map(prop => {
                    
                    <Card
                        key={prop}
                    >

                        <Card.Title>

                            Letters to be defined in a single card per letter

                        </Card.Title>

                    </Card>
            
                })} */}

            </CardGroup>

        </Row>
    )
}

export default Letters;