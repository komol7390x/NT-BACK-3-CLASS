import express from 'express'

const server=express()
server.use(express.json())

server.use('/:url',async(req,res)=>{
    const task=req.params
    res.send(task.url)
})

server.listen(3030,()=>console.log('Server is running',3030))