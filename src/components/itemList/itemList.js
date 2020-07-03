import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        
        this.gotService.getAllCharacters()
            .then((charList)=>{
                this.setState({
                    charList
                })
            })
    }

    renderItem(arr) {
        return arr.map((item, i) => 
            {
                return (
                    <li key={i}
                        className="list-group-item"
                        onClick={() => this.props.onCharSelected(item.id)}>
                        {item.name}
                    </li>
                )
            });
    }

    render() {
        const {charList} = this.state;

        if(!charList) {
            return <Spinner/>
        }

        const items = this.renderItem(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}