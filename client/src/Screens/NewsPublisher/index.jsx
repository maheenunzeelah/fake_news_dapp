import {useEffect, useState} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from '../../api';
import './newsPublisher.css';
import ipfs from '../../ipfs/ipfs';
import useEth from "../../contexts/EthContext/useEth";

const NewsPublisher=()=>{
    const { state: { accounts,contract} } = useEth();  
    const [headline,setHeadline]=useState('');
    const [body,setBody]=useState('');
    const [logo,setLogo]=useState('');
    const [author,setAuthor]=useState(null);
    const [showLoader,setShowLoader]=useState(false);
    const handleSubmit=async(e)=>{
      e.preventDefault();
      setShowLoader(true)
      try{
         
        const hashObj=await ipfs.add(Buffer.from(JSON.stringify({headline,body,author:accounts[0]})));
        console.log(hashObj,contract.methods)
        const {hash}=hashObj[0]
        const result=await contract?.methods?.setNewsIpfs(hash)?.send({from:accounts[0]});
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
       <h4 className='mb-5 pt-5'>News Publisher Address: {accounts && 
            accounts[0]}</h4>
      {/* <Row className="mb-3">

<Form.Group as={Col} className="mb-3" controlId="formBasicAuthor">
   <Form.Label>Author Name</Form.Label>
   <Form.Control className="input_news" value={author} type="text"placeholder="Enter New Body" onChange={(e)=>setAuthor(e.target.value)} />
   
</Form.Group>
<Form.Group  as={Col} controlId="formFile" className="mb-3 ">
  <Form.Label>Upload Logo</Form.Label>
    <Form.Control  onChange={(e)=>setLogo(e.target.value)}className="input_news" type="file" />
</Form.Group>
</Row> */}
            <Form.Group className="mb-3 " controlId="formBasicHead">
           
               <Form.Label>News Headline</Form.Label>
               <Form.Control className="input_news" value={headline} type="text" onChange={(e)=>setHeadline(e.target.value)} placeholder="Enter News Headline" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBody">
               <Form.Label>News Body</Form.Label>
               <Form.Control as="textarea" rows={5} className="input_news" value={body} type="text"placeholder="Enter New Body" onChange={(e)=>setBody(e.target.value)} />
            </Form.Group>
            
            <Button variant="dark" className={`${showLoader && "sub_btn"}`} size='lg' type="submit">
           {showLoader && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            <span>Publish</span>
            </Button>
          </Form>
}

export default NewsPublisher;