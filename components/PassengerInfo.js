import React, { Component } from 'react';


export class PassengerInfo extends Component{
    constructor(props){
        super(props);
        this.Name=props.Name;
        this.Address=props.Address;
        this.Contact=props.Contact;
        this.Gender=props.Gender;
        this.DeptTime=props.DeptTime;
        this.ArrivalTime=props.ArrivalTime;
        this.Destination=props.Destination;
        this.Age=props.Age;
        this.RFID=props.RFID;
        this.Latitude=props.Latitude;
        this.Longitude=props.Longitude;
        this.PulseRate=props.PulseRate;
        this.WaterSensor=props.WaterSensor;
        this.LockStatus=props.LockStatus;
        this.TripStatus=props.TripStatus;       
        this.passengerID=props.passengerID;         
    }     
    
    
    render(){
      const {RFID,Name,Address,Gender,Contact,Age,DeptTime,Destination,Latitude,Longitude,PulseRate,WaterSensor,LockStatus,TripStatus,ArrivalTime} =this.props;  
      
      const checkStatus = ()=>{
        if(TripStatus==="Arrived"){
          return <font color="green">Arrived</font>
        } 
        else if(TripStatus==="Waiting"){
          return <font color="orange">Waiting</font>
        } 
        else if(TripStatus==="Departed"){
          return <font color="blue">Departed</font>
        } 

      }
      
      
      const checkPulse = ()=>{
        if(PulseRate>180){
          return <font color="red">ABOVE NORMAL</font>
        } 
        
        else if(PulseRate<75){
          return <font color="blue">BELOW NORMAL</font>
          
        }
        else {
          return <font color="green">NORMAL</font>
          }

      }
      
      const checkWaterSensor = ()=>{
        if(WaterSensor>0){
          return <font color="red">SUBMERGED</font>
        } 
        else {
          return <font color="green">NOT SUBMERGED</font>
          }

      }
      
      const checkLock = ()=>{
        if(LockStatus>0){
          return <font color="orange">UNLOCKED</font>
        } 
        else {
          return <font color="green">OK</font>
          }

      }

        
        
        return(
           
                <tbody>
                    <tr>
                    <td>{RFID}</td>
                    <td>{Name}</td>
                    <td>{Gender}</td>
                    <td>{Age}</td>
                    <td>{Contact}</td>
                    <td>{Address}</td>                    
                    <td>{DeptTime}</td> 
                    <td>{Destination}</td>                                                         
                    <td>{Latitude}</td>
                    <td>{Longitude}</td>
                    <td>{checkPulse()}</td>
                    <td>{checkWaterSensor()}</td>
                    <td>{checkLock()}</td>
                    <td>{checkStatus()}</td>
                    <td>{ArrivalTime}</td>
                    </tr>
                    
                </tbody>
                
        
            ); 
    }
}
