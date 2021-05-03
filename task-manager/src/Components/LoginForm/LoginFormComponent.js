import React from 'react';
import './LoginFormComponent.css'
import { Form, FormGroup, Label, Input, Row, Col, Button, CardTitle, FormText, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import GetName from '../GetName';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formError: false,
            userInfo: {}
        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // name = '';
    handleChange(event) {
        this.setState(prevState => {
            return {
                formError: false,
                userInfo: {
                    ...prevState.userInfo,
                    [event.target.id]: event.target.value
                }
            }
        });
    }

    redirectToMain = () => {
        const { history } = this.props;
        if(history) history.push('/create-task');
    }

    async onSubmit(e) {
        e.preventDefault();

        const user = await this.getValue();
        if (user) {
            localStorage.setItem('token', user.token);
            // console.log(user.user._id)
            localStorage.setItem('_id', user.user._id);
            this.redirectToMain();
        }
    }

    getValue = async () => {
        var content = undefined;
        await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.userInfo.email, password: this.state.userInfo.password })
        }).then(res => {
            if (res.status === 200) {
                content = res.json();
            } else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formError: true
                    }
                })
            }
        }).catch(err => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    formError: true
                }
            })
        });
        // content = await rawResponse.json();
        // alert("You have logged in succesfully!");
        // this.name = this.state.name;
        return content;
    }

    render() {
        return (
            <Row style={{"margin":"6% auto","width":'50%'}}>
                {/* <Col></Col> */}
                <Col className="card" style={{padding: 20}}>
                    <CardTitle><h1 className="text-primary">Login</h1></CardTitle>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="email" className="label">Email</Label>
                            <Input type="email" id="email" required
                            placeholder="Enter your email id..." 
                            onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className="label">Password</Label>
                            <Input type="password" id="password" required onChange={this.handleChange}></Input>
                        </FormGroup>
                        <Button type="submit" className="bg-primary btn-lg">Login</Button>
                        {this.state.formError ? <small className="form-text form__error">You have entered an invalid email or password!</small> : null}
                        {/* <GetName name = {this.name}></GetName> */}
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default withRouter(LoginForm);