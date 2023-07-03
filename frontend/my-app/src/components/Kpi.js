import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import axios from "axios";

const Kpi = () => {
    const [data, setData] = useState({})

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/kpi')
        setData(data)
    }
    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Card title="KPI Users" bordered={true} style={{width: '100%'}}>
                        <h3 style={{textAlign:'center'}}>{data.users}</h3>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="KPI Count" bordered={true} style={{width: '100%'}}>
                        <h3 style={{textAlign:'center'}}>{data.count}</h3>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="KPI likes+shares" bordered={true} style={{width: '100%'}}>
                        <h3 style={{textAlign:'center'}}>{data.shareAndLikes}</h3>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="KPI comments" bordered={true} style={{width: '100%'}}>
                        <h3 style={{textAlign:'center'}}>{data.comments}</h3>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


export default Kpi