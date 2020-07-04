import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousePage, BooksItem} from '../pages';

import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component{

    gotService = new GotService();

    state = {
        randomChar: true,
        selectedItemId: null,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItemId: id
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
        const randomChar = this.state.randomChar ? <RandomChar /> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 7, offset: 0}}>
                            {randomChar}
                            <button type="button" className="btn btn-primary mb-4" onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>

                        <Route path="/" exact>
                            <div className="text-white text-center">
                                <h1>Welcome to GOT DB</h1>
                            </div>
                        </Route>
                        <Route path="/characters"><CharacterPage/></Route>
                        <Route path="/houses"><HousePage/></Route>
                        <Route path="/books" exact><BooksPage/></Route>
                        <Route path='/books/:id' render={
                            ({match, location, history}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id} />
                            }
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};