import React, {useEffect, useState} from "react";
import {Card, Divider, List, Steps, Typography} from 'antd';
import axios from "axios";

const Timeline = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const {data} = await axios.get('http://localhost:3000/timeline')
        const result=data.map(i=>({
            title:`Day ${i._id.day}`,
            description:`Total: ${i.total}`,
            status: 'finish'
        }))

        setData(result)
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
                <Steps
                    progressDot
                    items={data}
                />
            </Card>
        </div>
    )
}


export default Timeline