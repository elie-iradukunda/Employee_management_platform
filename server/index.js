import express from 'express'
import cors from 'cors'
import router from './UserRoutes/AdminRoute.js';
import router2 from './UserRoutes/EmployeeRoute.js';




const app=express()
app.use(express.json())
app.use(cors())
app.use('/',router)
app.use('/',router2)



app.listen(5000,()=>{
    console.log(`server is running on http://localhost:5000`)
})