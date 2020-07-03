import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';


const Field = ({item, field, label}) => {
    // console.log(item);
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }

    updateItem = () => {
        const {itemId, getItem} = this.props;
        if(!itemId) {
            return;
        }

        getItem(itemId)
            .then((item)=>{
                this.setState({item})
            })
        // this.foo.bar = 0;
    }


    render() {
        const {item} = this.state; 

        if(!item) {
            return <span className="select-error">Please select a item</span>
        }

        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {/* {this.props.children} */}
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {item})
                        })
                    }
                    {/* <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li> */}
                </ul>
            </div>
        );
    }
}