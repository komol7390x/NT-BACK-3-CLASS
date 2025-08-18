import express from 'express'
import Router from './routers/user.route'

const server=express()
server.use(express.json())

server.use('/api',Router)

const PORT:number=3030
server.listen(PORT,()=>console.log('Server is runing',PORT))
