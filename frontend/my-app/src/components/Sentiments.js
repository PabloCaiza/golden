import React, {useEffect, useState} from "react";
import {Card, Divider, List, Typography} from 'antd';
import axios from "axios";

const Sentiments = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/sentiments')
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        }
    ]
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Card title="Sentiment" bordered={true} style={{width: '100%'}}>
                <List
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark> Sentimiento {item._id}</Typography.Text> total es {item.total}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}


export default Sentiments