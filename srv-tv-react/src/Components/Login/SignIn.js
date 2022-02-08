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
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Helper/Api';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
        dbError: ''
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  submitForm(e) {
    e.preventDefault();
    var user = {};
    user.email = this.state.email
    user.password = this.state.password
    console.log(user);
    login(user).then(res => {
      if (!res.error) {
        this.props.navigate(`/home`);
      }
      else{
        console.error(res.error);
      }
    }).catch(error=>{
      const { validate } = this.state;
          validate.dbError=error.response.data;
          this.setState({ validate });
      })
    
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="App">
        <h2>Sign In</h2>
        <p>{this.state.validate.dbError}</p>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <FormGroup>
            <Label>User Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              value={email}
              onChange={(e) => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input
              a correct email.
            </FormFeedback>
            <FormFeedback valid>
              That's a tasty looking email you've got there.
            </FormFeedback>
            <FormText>Your username is most likely your email.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <div className='signup-btn'>
       Not have an account? <Link to={'/register'} > Go to SignUp page</Link>
                </div>
      </div>
    );
  }
}

export default function(props) {
  const navigate = useNavigate();

  return <SignIn {...props} navigate={navigate} />;
}
