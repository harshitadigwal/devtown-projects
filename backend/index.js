// Backend
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 8080

//Mongodb Connection
console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("Connected to Database") })
    .catch((err) => console.log(err))


//User Schema
const userSchema = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
});


//User Model
const userModel = mongoose.model("user", userSchema);


//API
app.get("/", (req, res) => {
    res.send("Server is running")
});


//SignUp
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body

    userModel.findOne({ email: email }, (err, result) => {
        console.log(result)
        console.log(err)
        if (result) {
            res.send({ message: "Email is already registered.", alert: false })
        }
        else {
            const data = userModel(req.body)
            const save = data.save()
            res.send({ message: "Successfully Registered.", alert: true })
        }
    })
});


//Login
app.post("/login", async (req, res) => {
    console.log(req.body)
    const { email } = req.body
    userModel.findOne({ email: email }, (err, result) => {
        if (result) {
            const dataSend = {
                _id: result.id,
                fullName: result.fullName,
                email: result.email,
                image: result.image,
            }
            console.log(dataSend)
            res.send({ messege: "Log In Successful", alert: true, data: dataSend })
        }
        else {
            res.send({ messege: "Email is not available. Go to signup.", alert: false })
        }
    })
});


//Product Schema
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String
});

//Product Model
const productModel = mongoose.model("product", schemaProduct)



//Create / Upload Product
app.post("/uploadProduct", async (req, res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({ message: "Product Uploaded Successfully" })
});



//API
app.get("/product", async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

//Server
app.listen(PORT, () => console.log("Server is running at PORT:" + PORT))