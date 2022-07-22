import { useEffect,useState } from 'react';
import News from '../../components/News';
import logo from '../../assets/cnn_logo.jpg';
import {Container,Spinner} from 'react-bootstrap';
import axios from "../../api";
import ipfs from '../../ipfs/ipfs';
import useEth from "../../contexts/EthContext/useEth";

const NEWS=[
    {
        logo:logo,
        name:"CNN",
        headline:"Heat waves in UK",
        body:"Climate change resulted into extreme heat in UK. Due to usual cold weather there , houses and cars usually don't have Air conditioners. This has made lives of people miserable. "
    }
]

const Users=()=>{
    const { state: { accounts,contract} } = useEth();  
   const [news,setNews]=useState([]);
   const [prediction,setPrediction]=useState(true);
    useEffect(()=>{
        const test=async()=>{
            try{
           const result=await contract?.methods?.getNewsIpfs()?.call({from:accounts[0]});
           console.log(result)
                // const res= await axios.get("/");
                // console.log(res,"response")
            const hash=await ipfs.cat(result);
            console.log(JSON.parse(hash))
            setNews([{...JSON.parse(hash),logo,name:"CNN"}])
            }
            catch(err){
              console.log(err)
            }
        }
        if(accounts)
         test();
    
    },[accounts])
    const report=async(headline,body)=>{
         try{
         const res=await axios.post('/publish',JSON.stringify({headline,body}))
         const {data}=res
         if(data.prediction=="True News"){
            setPrediction(true)
         }
         else
          setPrediction(false)
        }
        catch(err){console.log(err)}
    }
    const share=async(author)=>{
        try{
            const result=await contract?.methods?.shareNews(author)?.send({from:accounts[0]});
           console.log(result);
        }
        catch(err){
            console.log(err)
        }
        
    }
    return news.length>0 ?news.map((news,i)=>{
       return <Container className="mt-5" fluid>
        <News key={i} report={report} share={share}prediction={prediction} author={news.author} logo={news.logo} name={news.name} headline={news.headline} body={news.body}/>
        <hr />
        </Container>}):<Spinner/>
}
export default Users;