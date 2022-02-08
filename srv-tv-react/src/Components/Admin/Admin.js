import React from 'react';
import {Table} from 'reactstrap';
import { Button } from 'reactstrap';
import ChannelServices from '../../Helper/Api';
import  ModalForm from './Modal';

const Admin = () => {
  const [state,setState] = React.useState({
    arr:[]})
  const updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  const addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  const handleClick = (value) => {
    var arr = [];
   arr =  state.arr.filter(
      (item,index)=>{
          if(index === value){
            item.Status = "subscribe"
            item.disbale = true
          }
          return item
        }
    )
    setState({arr:arr})
  }

  const getItems = () => {
    ChannelServices.getAll(JSON.parse(localStorage.getItem('user')).email)
    .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  getItems();

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
            state.arr && state.arr.map((item,index)=>{
              return(<tr scope="row" key={index}><th >{index+1}</th> <td>{item.channel_name} </td>
              <td>{item.owner} </td>
              <td>{item.paused_on} </td>
              <td>{item.subcribed_on} </td>        
                <td> <Button color="success" disabled={item.disbale}>{item.status}</Button></td >
                <th> <ModalForm buttonLabel="Edit" item={item} updateState={updateState} addItemToState={addItemToState}/> </th> </tr>)
            })
          }
 
        </tbody>
      </Table>
      <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
  </div>;
};

export default Admin;
