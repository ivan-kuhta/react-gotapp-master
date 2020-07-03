import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {

    gotService = new GotService();
    
    state = {
        selectedItemId: 130,
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
                              getData={this.gotService.getAllCharacters}
                              renderItem={({name, gender}) => `${name} (${gender})`}
                    />
        )

        const charDetails = (
            <ItemDetails
                        getItem={this.gotService.getCharacter}
                        itemId={this.state.selectedItemId}>
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}