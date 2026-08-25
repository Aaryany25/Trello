
// Design the database,
// 2.backend
        // Design Routes
        // Implements the Routes
        // Protect the rigth routes(middleware)
// 3.test for backend ,
// 4.frontend
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json());

let userId = 3;
let OrgId = 3;
const users = [{
    id:1,
    name:"Aryan",
    username:"aryan",
    password:123,
    
},{
    id:2,
    name:"Avni",
    username:"avni",
    password:123
}];
const Users = users;

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
   users.push({
        id: userId++,
        username: username, 
        password: password
    })
    res.json({
        message: "Signed up successfully"
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
    const title = req.body.title;
    const dec = req.body.dec;
    const username=req.body.username;
     const userExists = users.find(user => user.username === username);
     if(!userExists){
        res.status(403).json({
            message: "User Does Not Exist"
        })
        return;
     }

    const newOrg = {
        id:OrgId++, 
        title:title,   
        dec:dec,
        amin:userExists.id,
        members:[userExists.id]
    };
    organistions.push(newOrg);
    res.json({
        message: "Organization created successfully",
        organization: newOrg
    });
})
app.post("/member",(req,res)=>{
    const orgId = req.body.orgId;
    const employee = req.body.employee || req.body.username || req.body.userId;

    if (!orgId || !employee) {
        return res.status(400).json({
            message: "orgId and employee (username or userId) are required"
        });
    }

    const org = organistions.find(o => o.id === Number(orgId) || o.id === orgId);
    if (!org) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const user = users.find(u => u.username === employee || u.name === employee || u.id === Number(employee));
    if (!user) {
        return res.status(404).json({
            message: "User does not exist"
        });
    }

    if (org.members.includes(user.id)) {
        return res.status(400).json({
            message: "User is already a member of this organization"
        });
    }

    org.members.push(user.id);

    res.json({
        message: "Member added successfully",
        members: org.members
    });
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
    const orgId = req.query.orgId || req.body.orgId;
    if (!orgId) {
        return res.status(400).json({
            message: "orgId is required"
        });
    }
    const org = organistions.find(o => o.id === Number(orgId) || o.id === orgId);
    if (!org) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }
    const memberDetails = users.filter(u => org.members.includes(u.id));
    res.json({
        members: memberDetails
    });
})
// Update endpoints 
app.put("/issues",(req,res)=>{

})
