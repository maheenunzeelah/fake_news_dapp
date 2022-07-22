import {useEffect, useState} from 'react';
import {Form,Button,Container} from 'react-bootstrap';
import "../NewsPublisher/newsPublisher.css";
import axios from '../../api';
import ipfs from '../../ipfs/ipfs';
import useEth from "../../contexts/EthContext/useEth";

const Admin=()=>{
    const { state: { accounts,contract} } = useEth();  
    const [publisher,setPublisher]=useState('');
    const [showLoader,setShowLoader]=useState(false);
    const handleSubmit=async(e)=>{
      e.preventDefault();
      setShowLoader(true)
      try{
        const result=await contract?.methods?.addPublisher(publisher)?.send({from:accounts[0]});
        console.log(result)
        if(result){
         setShowLoader(false)
        }
      }
      catch(err){
         setShowLoader(false)
         console.log(err);
      
      }
      //   e.preventDefault();
      //   try{
      //    const res=await axios.post('/publish',JSON.stringify({headline,body}))
      //    const {data}=res
      //    if(data.prediction=="True News"){
      //       alert("True News")
      //    }
      //   }
      //   catch(err){console.log(err)}
    }
    return  <Form onSubmit={(e)=>handleSubmit(e)}>
            <Form.Group className="mb-3 pt-5" controlId="formBasicHead">
            <h4 className='mb-5'>Admin Address: {accounts && accounts[0]}</h4>
               <Form.Label>Register News Publisher</Form.Label>
               <Form.Control className="input_news" value={publisher} type="text" onChange={(e)=>setPublisher(e.target.value)} placeholder="Enter Publisher Address" />
            </Form.Group>
            <Button variant="dark" className={`${showLoader && "sub_btn"}`} size='lg' type="submit">
           {showLoader && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            <span>Register</span>
            </Button>
          </Form>
}

export default Admin;