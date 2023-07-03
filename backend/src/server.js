const express = require('express')
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const cors = require('cors')
const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/golden');
    console.log('connected')
}


connectDB()
    .catch(err => console.log(err))

const emotionsSchema = new Schema({}, {strict: false})
const emotionModel = mongoose.model('Emotions', emotionsSchema)
const influencerSchema = new Schema({}, {strict: false})
const influencersModel = mongoose.model('Influencers', influencerSchema)
const publicacionesSchema = new Schema({}, {strict: false})
const publicacionesnModel = mongoose.model('Publicaciones', publicacionesSchema)


const app = express()
app.use(cors())
app.use(express.json());
const PORT = 3000


app.get('/publicaciones', async (req, res) => {
    const publicaciones = await publicacionesnModel.aggregate([
        {
            $project: {
                text: 1,
                username: 1,
                _id: 0,
                key: "$_id"
            }
        }
    ])
    res.send(publicaciones)
})

app.get('/sentiments', async (req, res) => {
    const sentiments = await publicacionesnModel.aggregate([
        {
            $group: {_id: "$sentiment", total: {$sum: 1}}
        }
    ])
    res.send(sentiments)
})

app.get('/timeline', async (req, res) => {

    const timeline = await publicacionesnModel.aggregate([
        {
            $project: {
                date: 1,
                dayOfYear: {$dayOfYear: {$dateFromString: {dateString: "$date"}}},
                month: {$month: {$dateFromString: {dateString: "$date"}}}
            }
        },
        {
            $group: {
                _id: {day: "$dayOfYear", month: "$month"},
                total: {$sum: 1}
            }
        }, {
            $sort: {
                "_id.day": 1
            }

        }
    ])
    res.send(timeline)
})


app.get('/kpi', async (req, res) => {
    const users = await publicacionesnModel.distinct('username')
    const shareAndLikes = await publicacionesnModel.aggregate([
        {
            $match: {}
        },
        {
            $project: {
                likes: 1,
                shares: 1,
                total: {$add: ['$likes', '$shares']}
            }
        }, {
            $group: {
                _id: null,
                total: {$sum: "$total"}
            }


        }
    ])
    const comments = await publicacionesnModel.aggregate([
        {
            $group: {
                _id: null,
                total: {$sum: '$comments'}
            }
        }
    ])
    const count = await influencersModel.aggregate([
        {
            $group: {
                _id: null,
                total: {$sum: '$count'}
            }
        }

    ])

    const kpi = {
        shareAndLikes: shareAndLikes[0].total,
        comments: comments[0].total,
        count: count[0].total,
        users: users.length
    }
    res.send(kpi)
})

app.get('/influencers', async (req, res) => {
    const influencers = await influencersModel.aggregate([
        {
            $project: {
                edad: 1,
                count: 1,
                likes: 1,
                shares: 1,
                audiencia: 1,
                interaccion: 1,
                comments: 1,
                _id: 0,
                key: "$_id"
            }
        }
    ])
    res.send(influencers)
})
app.get('/influencers/:id', async (req, res) => {
    const influencer = await influencersModel.findById(req.params.id)
    res.send(influencer)
})

app.get('/emotions', async (req, res) => {
    const emotions = await emotionModel.aggregate([
        {
            $project: {
                text: 1,
                sentiment: 1,
                emotions: 1,
                topic: 1,
                _id: 0,
                key: "$_id"
            }
        }
    ])
    res.send(emotions)
})


app.listen(PORT, () => {
    console.log(`App running in PORT ${PORT}`)
})