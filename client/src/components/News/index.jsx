import {Container,Row,Col,Button} from 'react-bootstrap';
import {Badge,Image} from 'react-bootstrap';
import './news.css';
const News=({logo, name, headline, body,author, prediction=true,report,share})=>{
return <Container className="news-container" fluid>
        <Row xs="auto" className="justify-content-start">
            <Col><Image roundedCircle width="35px" height="30px" src={logo}/></Col>
            <Col ><span className="name">{name}</span></Col>
            <Col   ml="auto" xs={{offset:7}}  ><h4><Badge bg={`${prediction?"primary":"danger"}`} className="prediction">{prediction?'True News':'Fake News'}</Badge></h4></Col>
        </Row>
        <Row className="mt-3">
            <Col><h3>{headline}</h3></Col>
        </Row>
        <Row>
            <Col><p className="body">{body}</p></Col>
        </Row>
        <Row  className="d-flex flex-row-reverse">
        <Col ml="auto" xs={{ span:1}} ><Button variant="secondary"  size="lg" className="btn-share" onClick={()=>share(author)}>Share</Button></Col>
        <Col ><Button variant="secondary"  size="lg" className="btn-share" onClick={()=>report(headline,body)}>Report</Button></Col>
        </Row>
    </Container>
}
export default News;