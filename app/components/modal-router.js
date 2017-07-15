import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const modalPathName = '/popup';

class ModalSwitch extends Component {

    componentWillUpdate(nextProps) {
        const { location } = this.props;
        // set previousLocation if props.location is not modal
        if (nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        const { location, match } = this.props;
        const isModal = (location.state && location.state.modal
            && this.previousLocation !== location); // not initial render
        console.log(`The pop-up window is ${isModal ? 'open' : 'closed'}!`);
        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path={match.path} component={ModalHome}/>
                    <Route path={modalPathName} component={ModalInner}/>
                </Switch>
                {isModal ? <Route path={modalPathName} component={ModalWindow} /> : null}
            </div>
        )
    }
}

const ModalHome = () => {
    return (
        <div>
            <Link to={{
                    pathname: modalPathName,
                    state: { modal: true } }}>
                Open Popup
            </Link>
        </div>
    )
}

const ModalInner = (props) => {
    return (
        <div>
            {props.location ?
                <p>
                    {`(This view is accessed through direct url link: "${props.location.pathname}")`}
                </p>
                : null}
            <h1>Enter video url from youtube:</h1>
            <input type="text"/>
        </div>
    )
}

const ModalWindow = ({ history }) => {
    const back = (e) => {
        e.stopPropagation();
        history.goBack();
    }
    const stay = (e) => {
        e.stopPropagation();
    }
    return (
        <div onClick={back} className='modal-background'>
            <div className='modal' onClick={stay} >
                <ModalInner />
                <button type='button' onClick={back}>
                    Close
                </button>
            </div>
        </div>
    )
}

const ModalRouter = () => {
    return (
        <Router>
            <Route component={ModalSwitch} />
        </Router>
    )
}

export default ModalRouter;