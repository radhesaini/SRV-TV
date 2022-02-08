import React, {Component} from 'react';
import {Table} from 'reactstrap';
import { Button } from 'reactstrap';
import ChannelServices from '../../Helper/Api';

export default class home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       channels: '',
       error: ''
    }
  }
  
 
  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'))
      ChannelServices.get(user.email).then((response)=>{
          this.setState({channels: response.data});        
      }).catch((error)=>{
        this.setState({error: error.response.data})
      }
      )    
  }
  render() {
    return <div className='container mt-5 pt-5'>
       <p style={{color: 'red', textAlign: 'center'}}>{this.state.error}</p>
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
            this.state.channels && this.state.channels.map((item,index)=>{
              return (<tr scope="row" key={index}><th >{index+1}</th> <td>{item.channel_name} </td>
              <td>{item.owner} </td>
              <td>{item.price} </td>
              <td>{item.paused_on} </td>
              <td>{item.subcribed_on} </td>        
                <td> <Button color="success" disabled={item.disbale}>{item.status}</Button></td >
               </tr>)
            })
          }

        </tbody>
      </Table>

    </div>;
  }
}
