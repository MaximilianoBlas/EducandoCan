require('dotenv').config();
const express = require("express")
const app = express()
const sequelize = require('./db')
const PORT = 4000
const cors = require("cors")
const routerApi = require('./routes/index')

sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => {
//       console.log('Server is running on port 3000');
//     });
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });
app.use(express.json())
// // IMPORTANTE APLICAR CUANDO FUNCIONE LA BASE DE DATOS
// // parece que esto hace el parse

app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE' )
    next()
})



app.use(cors())

app.use('/api/v1', routerApi)

app.get("/api/home", (req, res) => {
    res.json({message:"Hello World!"})
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})