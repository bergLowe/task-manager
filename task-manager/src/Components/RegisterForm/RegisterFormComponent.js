import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

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
        e.preventDefault();
        let res = {};
        await (async () => {
            const rawResponse = await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.state.name , email: this.state.email, password: this.state.password, age: this.state.age })
            });
            const content = await rawResponse.json();
            res = content;
            alert("You have registred succesfully!");
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
            <Row style={{"margin":"0.75% auto","width":'50%'}}>
                {/* <Col></Col> */}
                <Col className="card" style={{"padding": "17px"}}>
                    <CardTitle><h1 style={{'color': '#F85797'}}>Register</h1></CardTitle>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name" className="label">Name</Label>
                            <Input type="text" id="name" placeholder="Write Your Full Name" required
                                onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className="label">Email</Label>
                            <Input type="email" id="email" required onChange={this.handleChange}
                            placeholder="ex: abc@gmail.com"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className="label">Password</Label>
                            <Input type="password" id="password" required onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="age" className="label">Age</Label>
                            <Input type="number" id="age" min='0' onChange={this.handleChange}></Input>
                        </FormGroup>
                        <Button className="btn-lg" style={{backgroundColor: '#F85797'}}>Register</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default withRouter(RegisterForm);