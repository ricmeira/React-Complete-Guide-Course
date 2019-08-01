import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import Auxiliary from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/WithClass'
import classes from './Person.css'
import AuthContext from '../../../context/auth-context';

class Person extends Component{
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render(){
        console.log('[Person.js] rendering');

        //React.Fragment === Auxiliary
        return (
            <React.Fragment>
                <div>{this.context.authenticated ? <p>Authenticated</p> : <p>Please Log in</p>}
                    <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
                    <p>{this.props.children}</p>
                    <input 
                        //ref={(inputEl) => {this.inputElement = inputEl}}
                        ref={this.inputElementRef}
                        type="text" 
                        onChange={this.props.changed} 
                        value={this.props.name}
                    />
                </div>
            </React.Fragment>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);