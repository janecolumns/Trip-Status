import React, { Component } from 'react'; 
import{PassengerInfo} from './PassengerInfo';
import{DB_CONFIG} from './Config';
import firebase from 'firebase';
import 'firebase/database';
import 'antd/dist/antd.css';
import { Table } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import{Input,Popover} from 'antd';



const { Search } = Input;
export class TableStatus extends Component {
    constructor(props){
        super(props);
        this.app=firebase.initializeApp(DB_CONFIG);
        this.database=this.app.database().ref().child('Passengers');
        this.state={passengers:[],
                    visible:false,
                    search:""};       
        this.updateSearch=this.updateSearch.bind(this);                
        this.refreshPage=this.refreshPage.bind(this);
        this.options = {defaultSortName: 'name',defaultSortOrder: 'desc' };
    }
    
    
 
      componentDidMount(){ 
          const previousPassengers= this.getPassengers();
               
          this.database.on('child_added', snap => {
            previousPassengers.push({
              id: snap.key,
              RFID: snap.val().RFID,
              Name: snap.val().Name,
              Gender: snap.val().Gender,
              Age: snap.val().Age,
              Contact: snap.val().Contact,
              Address: snap.val().Address,
              Destination: snap.val().Destination,
              DeptTime: snap.val().DeptTime,
              Latitude: snap.val().Latitude,
              Longitude: snap.val().Longitude,
              PulseRate: snap.val().PulseRate,
              WaterSensor: snap.val().WaterSensor,
              LockStatus: snap.val().LockStatus,
              TripStatus: snap.val().TripStatus,
              ArrivalTime: snap.val().ArrivalTime
            })
          this.setState({
           passengers: previousPassengers
             })
          })
          this.database.on('child_removed',snap=>{
            for(var i=0; i<previousPassengers.length;i++){
              if(previousPassengers[i].id===snap.key){
                previousPassengers.splice(i,1);
              }
            }
            this.setState({
              passengers: previousPassengers
       
             })
          })
            console.log(this.state.passengers)
      } 

      getPassengers(){
        return this.state.passengers;
    
      }

      refreshPage() {
        window.location.reload(false);
      }

      updateSearch(event){
        this.setState({
            search:event.target.value.substr(0,20)
        });
    }
     

    render() {
    
      let filteredPassengers=this.state.passengers.filter(
        (passenger)=>{
          return passenger.Name.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1 ||
           passenger.RFID.indexOf(this.state.search)!==-1;
        }
      )
      
      return (
          <div>
      <h1><center>Trip Status</center></h1>

      <Search
            placeholder="input search text"
            value={this.state.search}
            onSearch={value => console.log(value)}
            onChange={this.updateSearch}
            style={{ width: 200 }}></Search>

      <Popover  content="Refresh" trigger="hover">
              <Button 
                    variant ='secondary'
                    size='sm'
                    onClick={this.refreshPage}
                    style={{  position:"relative", 
                    left:"20px",paddingtop:"200px"}}>
                <i class="fa fa-refresh"></i> </Button>
            </Popover>
                      
      <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>RFID#</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Address</th>                    
                    <th>Departure Time</th>
                    <th>Destination</th>                                                         
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Pulse Rate</th>
                    <th>Inflation Status</th>
                    <th>Buckle Status</th>
                    <th>Trip Status</th>
                    <th>Arrival Time</th>                     
                    </tr>
                </thead>
      
                     
          {
           filteredPassengers.map(passenger=>{
            return(
            <PassengerInfo
            
            key={passenger.id}
            passengerID={passenger.id}
            RFID={passenger.RFID}
            Name={passenger.Name} 
            Gender={passenger.Gender}
            Age={passenger.Age}
            Contact={passenger.Contact}
            Address={passenger.Address}
            Destination={passenger.Destination}
            DeptTime={passenger.DeptTime}
            ArrivalTime={passenger.ArrivalTime}
            Latitude={passenger.Latitude}
            Longitude={passenger.Longitude}
            PulseRate={passenger.PulseRate}
            WaterSensor={passenger.WaterSensor}
            LockStatus={passenger.LockStatus}
            TripStatus={passenger.TripStatus}
            
            
                />
              );
            })
          }   
          
      </Table>
      </div>
      )

    }
    
}





