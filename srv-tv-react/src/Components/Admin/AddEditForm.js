import React from 'react';
import Select from 'react-select';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ChannelServices from '../../Helper/Api';

class AddEditForm extends React.Component {
  state = {
    email: JSON.parse(localStorage.getItem('user')).email,
    channel_id: '', 
    channel_name: '',
    owner: '',
    status: '',
    price: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value[0]})
  }

  submitFormAdd = e => {
    e.preventDefault()
    ChannelServices.create(this.state)   
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[item.length-1])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    ChannelServices.update({
        channel_id: this.state.channel_id, 
        channel_name: this.state.channel_name,
        owner: this.state.owner,
        status: this.state.status,
        price: this.state.price
      })
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[item.length-1])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { channel_id, channel_name, owner, status, price } = this.props.item
      this.setState({ channel_id, channel_name, owner, status, price })
    }
  }


  render() {
    const options = [
        { value: 'subcribed', label: 'Subcribed' },
        { value: 'unsubcribed', label: 'Unsubcribed' },
        { value: 'paused', label: 'Paused' }
      ]
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="channel_name">Channel Name</Label>
          <Input type="text" name="channel_name" id="first" onChange={this.onChange} value={this.state.channel_name === null ? '' : this.state.channel_name} />
        </FormGroup>
        <FormGroup>
          <Label for="channel_id">Channel Id</Label>
          <Input type="text" name="channel_id" id="last" onChange={this.onChange} value={this.state.channel_id === null ? '' : this.state.channel_id}  />
        </FormGroup>
        <FormGroup>
          <Label for="owner">Channel Owner</Label>
          <Input type="text" name="owner" id="email" onChange={this.onChange} value={this.state.owner === null ? '' : this.state.owner}  />
        </FormGroup>
        <FormGroup>
          <Label for="price">Channel Price</Label>
          <Input type="number" name="price" id="email" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  />
        </FormGroup>
        <FormGroup>
          <Label for="status">Channel Status</Label>
          <Select name="status" options={options} onChangeSlect={this.onChange} ></Select>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm