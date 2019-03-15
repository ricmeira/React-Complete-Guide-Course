import React, {Component} from 'react';

//import Auxiliary from '../../../hoc/Auxiliary'
import classes from './Person.css'

class Person extends Component{
    render(){
        console.log('[Person.js] rendering');

        //React.Fragment === Auxiliary
        return (
            <React.Fragment>
                <div className={classes.Person}>
                    <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
                    <p>{this.props.children}</p>
                    <input type="text" onChange={this.props.changed} value={this.props.name}/>
                </div>
            </React.Fragment>
        )
    }
};

export default Person;