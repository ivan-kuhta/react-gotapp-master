// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import './itemList.css';
// import GotService from '../../services/gotService';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(()=>{
        getData()
        .then((data)=>{
            updateList(data);
        })
    }, [])

    function renderItems(arr) {
        return arr.map((item, i) => 
            {
                const {id} = item;
                const label = renderItem(item);
                return (
                    <li key={i}
                        className="list-group-item"
                        onClick={() => onItemSelected(id)}>
                        {label}
                    </li>
                )
            });
    }

    if(!itemList) {
        return <Spinner/>
    }

    // const {data} = this.props;
    // const items = this.renderItem(data);

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }

// ItemList.propTypes = {
//     onItemSelected: PropTypes.func
// }


// Винесли логіку в окрему функцію
// const withData = (View, getData) => {
//     return class extends Component {

//         state = {
//             data: null
//         }
    
//         static defaultProps = {
//             onItemSelected: () => {}
//         }
        
//         static propTypes = {
//             onItemSelected: PropTypes.func
//         }
    
//         componentDidMount() {       
//             getData()
//                 .then((data)=>{
//                     this.setState({
//                         data
//                     })
//                 })
//         }

//         render() {
//             const {data} = this.state;

//             if(!data) {
//                 return <Spinner/>
//             }
//             return <View {...this.props} data={data} />;
//         }
//     };
// }

// const {getAllCharacters} = new GotService();
// export default withData(ItemList, getAllCharacters);

export default ItemList;