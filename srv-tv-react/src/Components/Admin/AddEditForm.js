import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ChannelServices from '../../Helper/Api';

class AddEditForm extends React.Component {
  state = {
    email: JSON.parse(localStorage.getItem('user')).email,
    channel_id: '', 
    channel_name: '',
    owner: '',
    price: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    ChannelServices.create(this.state)   
      .then(item => {
        if(item.data) {
          console.log(item.data.data)
          this.props.addItemToState(item.data.data)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    ChannelServices.update(this.state.channel_id, 
      {
        channel_id: this.state.channel_id, 
        channel_name: this.state.channel_name,
        owner: this.state.owner,
        status: this.state.status,
        price: this.state.price
      })
      .then(item => {
        if(item.data) {
          console.log(item.data.data)
          this.props.addItemToState(item.data.data)
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
          <Input type="text" name="channel_id" id="last" onChange={this.onChange} value={this.state.channel_id === null ? '' : this.state.channel_id}  disabled={this.props.item?true:false}/>
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
          <Input type="select" name="status" id="exampleSelect"  onChange={this.onChange}>
            <option value="subcribed" >Subcribed</option>
            <option selected value="unsubcribed" >Unsubcribed</option>
            <option value="paused">Paused</option>
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm