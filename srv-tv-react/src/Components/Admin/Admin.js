import React, {Component} from 'react';
import {Table} from 'reactstrap';
import { Button } from 'reactstrap';
import {getAll, getBill} from '../../Helper/Api';
import  ModalForm from './Modal';

class Admin extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       arr: [],
       email: JSON.parse(localStorage.getItem('user')).email,
    }

  }
  
  updateState = (item) => {
    const itemIndex = this.state.arr.findIndex(data => data.channel_id === item.channel_id)
    var {arr} = this.state
    arr = [ ...arr.slice(0, itemIndex), item, ...arr.slice(itemIndex+1)]
    this.setState({ arr })
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      arr: [...prevState.arr, item]
    }))
  }

  componentDidMount(){
    getAll(this.state.email)
    .then((response)=>{
        this.setState({arr: response.data});        
    }).catch((error)=>{
      this.setState({error: error.response.data})
    })   
  }
render(){
   return <div className='container mt-5 pt-5'>
      <Table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Channel Name</th>
            <th>Channel Owner</th>
            <th>Channel Price</th>
            <th>Last Paused Date</th>
            <th>subscrition Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.arr && this.state.arr.map((item,index)=>{
              return(<tr scope="row" key={index}><th >{index+1}</th> <td>{item.channel_name} </td>
              <td>{item.owner} </td>
              <td>{item.price} </td>
              <td>{Date(item.paused_on).toString().substring(4,15)} </td>
              <td>{Date(item.subcribed_on).toString().substring(4, 15)}</td>        
                <td> <Button color="success" disabled={item.disbale}>{item.status}</Button></td >
                <th> <ModalForm buttonLabel="Edit" item={item} updateState={this.updateState} addItemToState={this.addItemToState}/> </th> </tr>)
            })
          }
 
        </tbody>
      </Table>
      <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
     
      
  </div>};
}


export default Admin;
