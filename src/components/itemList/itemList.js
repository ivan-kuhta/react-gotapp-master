import React, {Component} from 'react';
import './itemList.css';
// import GotService from '../../services/gotService';
import Spinner from '../spinner';
export default class ItemList extends Component {

    // gotService = new GotService();

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        
        getData()
            .then((itemList)=>{
                this.setState({
                    itemList
                })
            })
    }

    renderItem(arr) {
        return arr.map((item, i) => 
            {
                const {id} = item;
                const label = this.props.renderItem(item);
                return (
                    <li key={i}
                        className="list-group-item"
                        onClick={() => this.props.onItemSelected(id)}>
                        {label}
                    </li>
                )
            });
    }

    render() {
        const {itemList} = this.state;

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItem(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}