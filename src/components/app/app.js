import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends Component{
    state = {
        randomChar: true,
        selectedChar: 130,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    toggleRandomChar = () => {
        this.setState(({randomChar})=>{
            return {
                randomChar: !randomChar
            }
        })
    }

    render() {
        const randomChar = this.state.randomChar ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                        {randomChar}
                        <button type="button" className="btn btn-primary mb-4" onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.onCharSelected}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.onCharSelected}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};