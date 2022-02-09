import React, {Component} from 'react';
import {Table} from 'reactstrap';
import { Button } from 'reactstrap';
import {getAll, getAllSub, getBill} from '../../Helper/Api';

export default class home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       channels: '',
       error: '',
       email: JSON.parse(localStorage.getItem('user')).email,
       bill_aount: ''
    }
  }

  billCalculate = () =>{
    getBill(this.state.email)
    .then((response)=>{
      this.setState({bill_amount: response.data.result})
    })
    .catch(error=>this.setState({error: error.reponse.data}))
  }
  
 
  componentDidMount(){
      getAllSub(this.state.email)
      .then((response)=>{
          this.setState({channels: response.data});        
      }).catch((error)=>{
        this.setState({error: error.response.data})
      })    
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
          </tr>
        </thead>
        <tbody>
          {
            this.state.channels && this.state.channels.map((item,index)=>{
              return (<tr scope="row" key={index}><th >{index+1}</th> <td>{item.channel_name} </td>
              <td>{item.owner} </td>
              <td>{item.price} </td>
            <td>{Date(item.paused_on).toString().substring(4,15)} </td>
              <td>{Date(item.subcribed_on).toString().substring(4, 15)}</td>    
               </tr>)
            })
          }

        </tbody>
      </Table>
        <Button onClick={()=>this.billCalculate}>calculate bill</Button>
    </div>;
  }
}
