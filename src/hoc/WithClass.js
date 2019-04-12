import React from 'react';

/*const WithClass = props => {
    return <div className = {props.classes}>
        {props.children}
    </div>
};*/

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};

export default withClass;