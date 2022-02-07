import { Component } from 'react';
import {
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
} from 'reactstrap';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../Helper/Api';


class SignUp extends Component {
    constructor() {
        super();
        
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            address: '',
            password: '',
            cpassword: '',
            contect: '',
            validate: {
                emailState: '',
                dbError: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    };

    validateEmail(e) {
        const { validate } = this.state;
        const emailRex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
        }
        this.setState({validate});
    }

    submitForm(e){
        e.preventDefault();
        const { validate } = this.state;
        if(this.state.password === this.state.cpassword){
        register(this.state).then(res => {
            // this.props.history.push(`/login`)
            this.props.navigate('/login')
            console.log(res);
          }).catch(error=>{
            const { validate } = this.state;
                validate.dbError=error.response.data;
                this.setState({ validate });
            })
        }
        else{
            validate.dbError="Passwords are not matching";
                this.setState({ validate });
        }
        console.log(`Email: ${this.state.email}`);
    }

    render() {
        const { email, password, cpassword, first_name, last_name, address, dob, contect } = this.state;

        return (
            <div className="App1">
                <h2>Sign Up</h2>
                <p>{this.state.validate.dbError}</p>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup>
                        <div className="inline-input">
                            <div className='left-div'>
                                <Label>First Name</Label>
                                <Input
                                    type="text"
                                    name="first_name"
                                    placeholder="John"
                                    value={first_name}
                                    required={true}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                            </div>
                            <div className='right-div'>
                                <Label>Last Name</Label>

                                <Input
                                    type="text"
                                    name="last_name"
                                    placeholder="Bravo"
                                    required={true}
                                    value={last_name}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                            </div>
                        </div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            required={true}
                            placeholder="example@example.com"
                            valid={this.state.validate.emailState === "has-success"}
                            invalid={this.state.validate.emailState === "has-danger"}
                            value={email}
                            onChange={(e) => {
                                this.validateEmail(e);
                                this.handleChange(e);
                            }}
                        />
                        {/* <FormText>Your username is most likely your email.</FormText> */}
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your email. Please input
                            a correct email.
                        </FormFeedback>
                        <FormFeedback valid>
                            That's a tasty looking email you've got there.
                         </FormFeedback>

                        <Label>Address</Label>
                        <Input
                            type="text"
                            name="address"
                            placeholder="1234 Main St Apartment, studio, or floor"
                            value={address}
                            required={true}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                        <div className="inline-input">
                            <div className='left-div'>
                                <Label>Dob</Label>
                                <Input
                                    type="date"
                                    name="dob"
                                    placeholder="01-Jan-2001"
                                    value={dob}
                                    required={true}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                            </div>
                            <div className='right-div'>
                                <Label>Contect</Label>

                                <Input
                                    type="text"
                                    name="contect"
                                    placeholder="+91 XX XXXX XXXX"
                                    value={contect}
                                    required={true}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                            </div>
                        </div>

                    </FormGroup>
                    <FormGroup>

                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            value={password}
                            required={true}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input
                            type="password"
                            name='cpassword'
                            id="confirmPassword"
                            placeholder="********"
                            value={cpassword}
                            required={true}
                            onChange={(e) => this.handleChange(e)}
                        />

                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <div className='signin-btn'>
                    Already have an account? <Link to={'/login'}>Go to SignIn Page</Link>
                </div>

            </div>
        );
    }
}

export default function(props) {
    const navigate = useNavigate();
  
    return <SignUp {...props} navigate={navigate} />;
  }

