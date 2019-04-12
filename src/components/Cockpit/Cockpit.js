import React, {useEffect, useRef} from 'react';

import classes from './Cockpit.css';

const cockpit = ( props ) => {
    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] use effect');

        /*setTimeout(() => {
            alert('Save data to cloud!');
        }, 1000);*/
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in use effect');
        };
    }, []);//[props.persons]);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd use effect');

        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd use effect');
        };
    });

    const assignedClasses = [];

    let btnClass = '';
    if(props.showPerson){
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2){
      assignedClasses.push(classes.red);
      if(props.personsLength <= 1){
        assignedClasses.push(classes.bold);
      }
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button 
            ref={toggleBtnRef}
            className={btnClass}
            onClick={() => props.clicked()}>Switch Name</button>
            <button onClick={props.login}>Log In</button>
        </div>
    );
};

export default React.memo(cockpit);