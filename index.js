
// Design the database,
// 2.backend
        // Design Routes
        // Implements the Routes
        // Protect the rigth routes(middleware)
// 3.test for backend ,
// 4.frontend
const express = require('express')
app.use(express.json());
const app = express()
const userId =1;
const OrgId=1
const Users =[{
    id:1,
    name:"Aryan",
    passord:123,
    
},{
    id:2,
    name:"Avni",
    password:123
}];
const organistions=[{
    id:1,
    title:"Organization",
    dec:"little escription",
    amin:1,
    members:[2,3,4,5]
},{
    id:2,
    title:"Organization",
    dec:"little escription",
    amin:2,
    members:[]
}];
const Boards =[
    {
        id:1,
        title:"Aryan fullstack",
        organistions:1,

    }
]
const issue=[{
    id:1,
    title:"Learn full stack",
    board:1,
    status:"inProcess"
}]
app.listen(3000,()=>{
    console.log("Server is Started")
})
app.get('/',(req,res)=>{
    res.send("Server is Live Bitach!")
})
// Create Endpoints
app.post("/signup",(req,res)=>{
const username = req.body.username;
const password=req.body.password;
  const userExists = users.find(user => user.username === username);
  if(userExists){
     return res.status(403).json({
            message: "User with this username already exists"
        })
  }
   Users.push({
        username: username, 
        password: password
    })

})
app.post("/signin",(req,res)=>{
      const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password);

    if (!userExists) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;
    }
    
    // json web tokens
    const token = jwt.sign({
        username: username
    }, "harkirat123");

    res.json({
        token: token
    })
})
app.post("/organization",(req,res)=>{
    
})
app.post("/member",(req,res)=>{
    
})
app.post("/boards",(req,res)=>{
    
})
app.post("/issue",(req,res)=>{
    
})

// Get Enpoints
app.get("/boards",(req,res)=>{
    
})
app.get("/issue",(req,res)=>{
    
})
app.get("/members",(req,res)=>{
    
})
// Update endpoints 
app.put("/issues",(req,res)=>{

})
