import React, {useEffect, useState} from "react";
import {Card, Table} from "antd";
import axios from "axios";

const Emotions = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/emotions')
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])
    const columns = [{
        title: 'Text',
        dataIndex: 'text',
        key: 'text'
    },
        {
            title: 'Sentiment',
            dataIndex: 'sentiment',
            key: 'sentiment'
        },
        {
            title: 'Emotions',
            dataIndex: 'emotions',
            key: 'emotions'
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic'
        }
    ]
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Card title="Publicaciones" bordered={true} style={{width: '100%', height: '100%'}}>
                <Table dataSource={data} columns={columns} size={'small'} pagination={{pageSize:5}}/>
            </Card>
        </div>
    )
}


export default Emotions