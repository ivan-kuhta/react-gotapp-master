import React, {Component} from 'react';
import './itemList.css';
// import GotService from '../../services/gotService';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

import GotService from '../../services/gotService';

class ItemList extends Component {

    // gotService = new GotService();

    // state = {
    //     itemList: null
    // }

    // static defaultProps = {
    //     onItemSelected: () => {}
    // }
    
    // static propTypes = {
    //     onItemSelected: PropTypes.func
    // }

    // componentDidMount() {
    //     const {getData} = this.props;

        
    //     getData()
    //         .then((itemList)=>{
    //             this.setState({
    //                 itemList
    //             })
    //         })
    // }

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
        // const {itemList} = this.state;

        // if(!itemList) {
        //     return <Spinner/>
        // }

        const {data} = this.props;
        const items = this.renderItem(data);

        // const items = this.renderItem(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }

// ItemList.propTypes = {
//     onItemSelected: PropTypes.func
// }


// Винесли логіку в окрему функцію
const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null
        }
    
        static defaultProps = {
            onItemSelected: () => {}
        }
        
        static propTypes = {
            onItemSelected: PropTypes.func
        }
    
        componentDidMount() {       
            getData()
                .then((data)=>{
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const {data} = this.state;

            if(!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data} />;
        }
    };
}

const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);