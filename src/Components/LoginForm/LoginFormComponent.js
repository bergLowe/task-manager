import React from 'react';
import './LoginFormComponent.css'
// import { Form, FormGroup, Label, Input, Row, Col, Button, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formError: false,
            userInfo: {}
        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.formErrorDetected = this.formErrorDetected.bind(this);
    }
    // name = '';
    handleChange(event) {
        this.setState(prevState => {
            return {
                formError: false,
                userInfo: {
                    ...prevState.userInfo,
                    [event.target.type]: event.target.value
                }
            }
        });
    }

    redirectToMain = () => {
        const { history } = this.props;
        if(history) history.push('/create-task');
    }

    redirectToCreateAcc = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }

    async onSubmit(e) {
        e.preventDefault();

        const user = await this.getValue();

        if (this.state.formError) {

        }

        if (user) {
            localStorage.setItem('token', user.token);
            // console.log(user.user._id);
            // localStorage.setItem('_id', user.user._id);
            this.redirectToMain();
        }
    }

    getValue = async () => {
        var content = undefined;
        console.log(this.state.userInfo);
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: this.state.userInfo.email, 
                password: this.state.userInfo.password 
            })
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

    formErrorDetected() {
        return (<small className="form_error">Invalid Email or Password!</small>);
    }

    render() {
        return (
            <section id='login_form_section_body'>
                <section className="login_form_section">
                    <img className="logo_img" src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Task Manager Logo" />
                    <div className="login_form_div">
                        <h1 className="welcome_back_text">Welcome Back</h1>
                        <p className="enter_cred_text">Enter your credentials to access your account.</p>
                        <form onSubmit={this.onSubmit}>
                            <input type="email" className={this.state.formError ? 'not-valid' : 'valid'} placeholder="Enter your email" onChange={this.handleChange} required />
                            <input type="password" className={this.state.formError ? 'not-valid' : 'valid'} placeholder="Enter your password" onChange={this.handleChange} required />
                            <button type="submit">Sign In</button>
                        </form>
                        {this.state.formError ? this.formErrorDetected() : null}
                    </div>
                    <p id="ask_signup_text" className="small_text">Don't have an account? <button onClick={this.redirectToCreateAcc}>Sign Up</button></p>
                </section>
            </section>


            // <Row style={{"margin":"6% auto","width":'50%'}}>
            //     <Col className="card" style={{padding: 20}}>
            //         <CardTitle><h1 className="text-primary">Login</h1></CardTitle>
            //         <Form onSubmit={this.onSubmit}>
            //             <FormGroup>
            //                 <Label for="email" className="label">Email</Label>
            //                 <Input type="email" id="email" required
            //                 placeholder="Enter your email id..." 
            //                 onChange={this.handleChange}></Input>
            //             </FormGroup>
            //             <FormGroup>
            //                 <Label for="password" className="label">Password</Label>
            //                 <Input type="password" id="password" required onChange={this.handleChange}></Input>
            //             </FormGroup>
            //             <Button type="submit" className="bg-primary btn-lg">Login</Button>
            //             {this.state.formError ? <small className="form-text form__error">You have entered an invalid email or password!</small> : null}
            //             {/* <GetName name = {this.name}></GetName> */}
            //         </Form>
            //     </Col>
            // </Row>
        );
    }
}

export default withRouter(LoginForm);