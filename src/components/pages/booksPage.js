import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class BooksPage extends Component {

    gotService = new GotService();
    
    state = {
        selectedItemId: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItemId: id
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllBooks}
                        renderItem={(item) => item.name}
                    />
        )

        const charDetails = (
            <ItemDetails
                getItem={this.gotService.getBook}
                itemId={this.state.selectedItemId}>
                <Field field="numberOfPages" label="Pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}