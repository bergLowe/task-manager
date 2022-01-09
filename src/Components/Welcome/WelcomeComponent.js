import React from 'react';
// import './WelcomeComponent.css';
import { Row, Col, Container, ButtonGroup } from 'reactstrap';
import LoginForm from '../LoginForm/LoginFormComponent';
import RegisterForm from '../RegisterForm/RegisterFormComponent';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogin: true };
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm = e => {
        // console.log(e.target.id);
        if (e.target.id === 'register') {
            this.setState({
                isLogin: false
            });
        } else {
            this.setState({
                isLogin: true
            });
        }
    }
    
    render() {

        return (
            <Container className="homepage">
                <Row className="top">
                    <Col>
                        <h1 className="title">
                            Task Manager
                        </h1>
                    </Col>
                    <Col className="buttons">
                        <ButtonGroup>
                            <Link to='/'id="login" className="loginBtn home-btn" onClick={e => this.toggleForm(e)}>
                                <span id="login" className="loginText text">LOGIN</span>
                            </Link>
                            <Link to='/' id="register" className="createBtn home-btn" onClick={e => this.toggleForm(e)}>
                                <span id="register" className="createText text">REGISTER</span>
                            </Link>
                        </ButtonGroup>
                    </Col>
                </Row>
                {this.state.isLogin ? <LoginForm/> : <RegisterForm />}
            </Container>
        );
    }
}

export default Welcome;