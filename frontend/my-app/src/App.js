import logo from './logo.svg';
import './App.css';
import {Col, Row} from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Kpi from "./components/Kpi";
import Publicaciones from "./components/Publicaciones";
import Sentiments from "./components/Sentiments";
import Timeline from "./components/Timeline";
import Influencers from "./components/Influencers";
import Emotions from "./components/Emotions";
function App() {
    return (
        <div style={{background:'#f0f2f5'}}>
            <Row>
                <Col span={24} style={{background: 'orange'}}>
                    <Header/>
                </Col>
            </Row>
            <Row style={{padding:'20px'}}>
                <Col span={8} >
                    <Kpi/>
                </Col>
                <Col span={16} >
                    <Publicaciones />
                </Col>
            </Row>
            <Row style={{padding:'20px'}}>
                <Col span={10} >
                    <Sentiments/>
                </Col>
                <Col span={14} >
                    <Timeline/>
                </Col>
            </Row>
            <Row style={{padding:'20px'}}>
                <Col span={12} >
                    <Influencers/>
                </Col>
                <Col span={12} >
                    <Emotions/>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{background: 'orange'}}>
                    <Footer/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
