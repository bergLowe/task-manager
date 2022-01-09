import React from 'react';
// import { Form, FormGroup, Label, Input, Row, Col, Button, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './RegisterFormComponent.css';
import './RegisterFormComponentQueries.css';
import paulimg from './img/paulj.jpg';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formError: {
                formError: false,
                formErrorMsg: ''
            },
            userInfo: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(prevState => {
            return {
                formError: {
                    formError: false,
                    formErrorMsg: ''
                },
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

    validateForm = async () => {
        if (this.state.userInfo.password.toLowerCase().includes('password')) {
            await this.setState(prevState => {
                return {
                    ...prevState,
                    formError: {
                        formError: true,
                        formErrorMsg: 'Password cannot contain word "password"!'
                    }
                }
            })
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        e.preventDefault();
        var content;
        await this.validateForm();
        if (!(this.state.formError.formError)) {
            await (async () => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        name: this.state.userInfo.name, 
                        email: this.state.userInfo.email, 
                        password: this.state.userInfo.password, 
                        age: this.state.userInfo.age 
                    })
                }).then(async (res) => {
                    // console.log(res.json())
                    if (res.status === 201) {
                        content = await res.json();
                    } else {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                formError: {
                                    formError: true,
                                    formErrorMsg: 'Email address may already exist or something else. Please Check Again!'
                                }
                            }
                        })
                    }
                }).catch(err => {
                    // console.log(err)
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            formError: {
                                formError: true,
                                formErrorMsg: `There's some issue. Please Try Again!`
                            }
                        }
                    })
                });
                // const content = await rawResponse.json();
                // alert("You have registred succesfully!");
                // console.log(content)
            })();
            if (content) {
                localStorage.setItem("token", content.token);
                this.redirectToMain();
            }
        }
        // await (async () => {
        //     const rawResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
        //         method: 'GET',
        //         headers: new Headers({
        //             'Authorization': `Bearer ${res.token}`
        //         })
        //         // body: JSON.stringify({ email: this.state.email, password: this.state.password })
        //     });
        //     const content = await rawResponse.json();
        //     res = content;
           
        // })();
        // console.log(res);
    }

    render() {
        return (
            <section id='signup_section_body'>
                <section class="signup_section">
                    <div class="upper_part">
                        <p id="ask_login_text" class="small_text">Already have an account? <button>Sign In</button></p>
                    </div>

                    <div class="lower_part">
                        <img class="logo_img" src={process.env.PUBLIC_URL + '/img/logo.png'} alt='Task Manager Logo' />
                        <h1 class="welcome_text">Welcome to Task Manager</h1>
                        <form>
                            <fieldset>
                                <legend>Name</legend>
                                {/* <!-- <label for="name">Name</label> --> */}
                                <input type="text" id="name" placeholder="Your name" required />
                            </fieldset>

                            <fieldset>
                                <legend>E-mail</legend>
                                {/* <!-- <label for="email">E-mail</label> --> */}
                                <input type="email" id="email" placeholder="Email address" required />
                            </fieldset>

                            <fieldset>
                                <legend>Password</legend>
                                {/* <!-- <label for="password">Password</label> --> */}
                                <input type="password" id="password" minlength="7" placeholder="Password" required />
                            </fieldset>
                            <button type="submit">Create an account</button>
                        </form>
                    </div>
                </section>

                <section class="image_section">
                    <div class="inverted_comma_div">
                        <span class="inverted_comma">
                            &#10077;
                        </span>
                    </div>
                    <div class="vertical_line"></div>
                    <div class="horizontal_line"></div>
                    <div class="content_div">
                        <h1 class="content_title">Manage your Tasks.</h1>
                    </div>
                    <div class="qoute_div">
                        <q class="qoute">Productivity is never an accident. It is always the result of a commitment to
                            excellence, intelligent planning, and focused effort.</q>
                        <div class="qoute_author_div">
                            <img src={paulimg} class="author_img" alt='Paul J. Meyer' />
                            <div class="author_info">
                                <p class="qoute_author">Paul J. Meyer</p>
                                <p class="qoute_author_des">Author</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            // <Row style={{"margin":"0.75% auto","width":'50%'}}>
            //     {/* <Col></Col> */}
            //     <Col className="card" style={{"padding": "17px"}}>
            //         <CardTitle><h1 style={{'color': '#F85797'}}>Register</h1></CardTitle>
            //         <Form onSubmit={this.onSubmit}>
            //             <FormGroup>
            //                 <Label for="name" className="label">Name</Label>
            //                 <Input type="text" id="name" placeholder="Write Your Full Name" required
            //                     onChange={this.handleChange}></Input>
            //             </FormGroup>
            //             <FormGroup>
            //                 <Label for="email" className="label">Email</Label>
            //                 <Input type="email" id="email" required onChange={this.handleChange}
            //                 placeholder="ex: abc@gmail.com"></Input>
            //             </FormGroup>
            //             <FormGroup>
            //                 <Label for="password" className="label">Password</Label>
            //                 <Input type="password" id="password" minLength="7" required onChange={this.handleChange}></Input>
            //             </FormGroup>
            //             <FormGroup>
            //                 <Label for="age" className="label">Age</Label>
            //                 <Input type="number" id="age" min='0' onChange={this.handleChange}></Input>
            //             </FormGroup>
            //             <Button className="btn-lg" style={{backgroundColor: '#F85797'}}>Register</Button>
            //             {this.state.formError.formError ? <small className="form-text form__error">{ this.state.formError.formErrorMsg }</small> : null}
            //         </Form>
            //     </Col>
            // </Row>
        );
    }
}

export default withRouter(RegisterForm);