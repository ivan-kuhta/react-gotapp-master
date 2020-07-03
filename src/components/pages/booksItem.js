import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return(
            <ItemDetails
                getItem={this.gotService.getBook}
                itemId={this.props.bookId}>
                <Field field="numberOfPages" label="Pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        )
    }
}