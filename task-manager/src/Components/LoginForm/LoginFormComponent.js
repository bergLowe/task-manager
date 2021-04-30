import React from 'react';
import './LoginFormComponent.css'
import { Form, FormGroup, Label, Input, Row, Col, Button, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import GetName from '../GetName';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    name = '';
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    redirectToMain = () => {
        const { history } = this.props;
        if(history) history.push('/create-task');
    }

    async onSubmit(e) {
        e.preventDefault();
        let res = {};
        await (async () => {
            const rawResponse = await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            });
            const content = await rawResponse.json();
            console.log("res:");
            res = content;
            alert("You have registred succesfully!");
            this.name=this.state.name;
            this.redirectToMain();
        })();
        await (async () => {
            const rawResponse = await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/users/me', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${res.token}`
                })
                // body: JSON.stringify({ email: this.state.email, password: this.state.password })
            });
            const content = await rawResponse.json();
            res = content;
           
        })();
        
        console.log(res);
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
                        <GetName name = {this.name}></GetName>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default withRouter(LoginForm);