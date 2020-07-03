import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';


const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {Field};

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props

        if(!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char)=>{
                this.setState({char})
            })
        // this.foo.bar = 0;
    }


    render() {

        if(!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        const {char} = this.state; 
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {/* {this.props.children} */}
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {char})
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