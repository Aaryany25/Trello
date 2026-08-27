
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
let boardId = 2;
let issueId = 2;

const JWT_SECRET = "harkirat123";

const users = [{
    id: 1,
    name: "Aryan",
    username: "aryan",
    password: 123,
}, {
    id: 2,
    name: "Avni",
    username: "avni",
    password: 123
}];

const organistions = [{
    id: 1,
    title: "Organization 1",
    dec: "Main workspace",
    admin: 1,
    amin: 1,
    members: [1, 2]
}, {
    id: 2,
    title: "Organization 2",
    dec: "Secondary workspace",
    admin: 2,
    amin: 2,
    members: [2]
}];

const Boards = [
    {
        id: 1,
        title: "Aryan fullstack",
        organistions: 1,
        orgId: 1
    }
];

const issue = [{
    id: 1,
    title: "Learn full stack",
    description: "Cover frontend, backend, and database",
    board: 1,
    status: "inProcess" // todo, inProcess, done
}];

// Authentication Middleware (optional token validation helper)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

// -------------------------------------------------------------
// Root & Health Check
// -------------------------------------------------------------
app.get('/', (req, res) => {
    res.send("Server is Live!");
});

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------
app.post("/signup", (req, res) => {
    const { username, password, name } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(403).json({
            message: "User with this username already exists"
        });
    }

    const newUser = {
        id: userId++,
        name: name || username,
        username: username,
        password: password
    };
    users.push(newUser);

    res.status(201).json({
        message: "Signed up successfully",
        userId: newUser.id
    });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(user => user.username === username && String(user.password) === String(password));

    if (!userExists) {
        return res.status(403).json({
            message: "Incorrect credentials"
        });
    }

    const token = jwt.sign({
        id: userExists.id,
        username: username
    }, JWT_SECRET);

    res.json({
        message: "Signed in successfully",
        token: token,
        user: {
            id: userExists.id,
            name: userExists.name,
            username: userExists.username
        }
    });
});

// -------------------------------------------------------------
// Organization Endpoints
// -------------------------------------------------------------
app.get("/organizations", (req, res) => {
    res.json({
        organizations: organistions
    });
});

app.post("/organization", (req, res) => {
    const { title, dec, description, username, userId: uId } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: "Organization title is required" });
    }

    let userExists = null;
    if (username) {
        userExists = users.find(user => user.username === username);
    } else if (uId) {
        userExists = users.find(user => user.id === Number(uId));
    }

    if (!userExists && (username || uId)) {
        return res.status(404).json({
            message: "User Does Not Exist"
        });
    }

    const adminId = userExists ? userExists.id : 1;

    const newOrg = {
        id: OrgId++,
        title: title,
        dec: dec || description || "",
        admin: adminId,
        amin: adminId,
        members: [adminId]
    };

    organistions.push(newOrg);
    res.status(201).json({
        message: "Organization created successfully",
        organization: newOrg
    });
});

app.post("/member", (req, res) => {
    const orgId = req.body.orgId;
    const employee = req.body.employee || req.body.username || req.body.userId;

    if (!orgId || !employee) {
        return res.status(400).json({
            message: "orgId and employee (username or userId) are required"
        });
    }

    const org = organistions.find(o => o.id === Number(orgId));
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
});

app.get("/members", (req, res) => {
    const orgId = req.query.orgId || req.body.orgId;
    if (!orgId) {
        return res.status(400).json({
            message: "orgId query parameter is required"
        });
    }

    const org = organistions.find(o => o.id === Number(orgId));
    if (!org) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const memberDetails = users.filter(u => org.members.includes(u.id));
    res.json({
        orgId: org.id,
        members: memberDetails
    });
});

// -------------------------------------------------------------
// Board Endpoints
// -------------------------------------------------------------
app.post("/boards", (req, res) => {
    const { title, orgId, organistions: orgParam } = req.body;
    const targetOrgId = orgId || orgParam;

    if (!title || !targetOrgId) {
        return res.status(400).json({
            message: "title and orgId (or organistions) are required"
        });
    }

    const orgExists = organistions.find(o => o.id === Number(targetOrgId));
    if (!orgExists) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const newBoard = {
        id: boardId++,
        title: title,
        organistions: Number(targetOrgId),
        orgId: Number(targetOrgId)
    };

    Boards.push(newBoard);

    res.status(201).json({
        message: "Board created successfully",
        board: newBoard
    });
});

app.get("/boards", (req, res) => {
    const orgId = req.query.orgId || req.query.organistions;

    if (orgId) {
        const filteredBoards = Boards.filter(b => b.orgId === Number(orgId) || b.organistions === Number(orgId));
        return res.json({
            boards: filteredBoards
        });
    }

    res.json({
        boards: Boards
    });
});

app.get("/boards/:id", (req, res) => {
    const id = Number(req.params.id);
    const targetBoard = Boards.find(b => b.id === id);

    if (!targetBoard) {
        return res.status(404).json({
            message: "Board not found"
        });
    }

    const boardIssues = issue.filter(i => i.board === id);

    res.json({
        board: targetBoard,
        issues: boardIssues
    });
});

// -------------------------------------------------------------
// Issue / Task Endpoints
// -------------------------------------------------------------
app.post("/issue", (req, res) => {
    const { title, description, dec, board, boardId: bId, status } = req.body;
    const targetBoardId = board || bId;

    if (!title || !targetBoardId) {
        return res.status(400).json({
            message: "title and board ID are required"
        });
    }

    const boardExists = Boards.find(b => b.id === Number(targetBoardId));
    if (!boardExists) {
        return res.status(404).json({
            message: "Board not found"
        });
    }

    const newIssue = {
        id: issueId++,
        title: title,
        description: description || dec || "",
        board: Number(targetBoardId),
        status: status || "todo" // e.g., 'todo', 'inProcess', 'done'
    };

    issue.push(newIssue);

    res.status(201).json({
        message: "Issue created successfully",
        issue: newIssue
    });
});

app.get("/issue", (req, res) => {
    const boardParam = req.query.board || req.query.boardId;

    if (boardParam) {
        const filteredIssues = issue.filter(i => i.board === Number(boardParam));
        return res.json({
            issues: filteredIssues
        });
    }

    res.json({
        issues: issue
    });
});

app.get("/issue/:id", (req, res) => {
    const id = Number(req.params.id);
    const targetIssue = issue.find(i => i.id === id);

    if (!targetIssue) {
        return res.status(404).json({
            message: "Issue not found"
        });
    }

    res.json({
        issue: targetIssue
    });
});

// Update an Issue
app.put("/issues", (req, res) => {
    const { id, title, description, dec, status, board, boardId: bId } = req.body;

    if (!id) {
        return res.status(400).json({
            message: "Issue id is required in body"
        });
    }

    const targetIssue = issue.find(i => i.id === Number(id));
    if (!targetIssue) {
        return res.status(404).json({
            message: "Issue not found"
        });
    }

    if (title !== undefined) targetIssue.title = title;
    if (description !== undefined) targetIssue.description = description;
    if (dec !== undefined) targetIssue.description = dec;
    if (status !== undefined) targetIssue.status = status;
    if (board !== undefined) targetIssue.board = Number(board);
    if (bId !== undefined) targetIssue.board = Number(bId);

    res.json({
        message: "Issue updated successfully",
        issue: targetIssue
    });
});

app.put("/issues/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, description, dec, status, board, boardId: bId } = req.body;

    const targetIssue = issue.find(i => i.id === id);
    if (!targetIssue) {
        return res.status(404).json({
            message: "Issue not found"
        });
    }

    if (title !== undefined) targetIssue.title = title;
    if (description !== undefined) targetIssue.description = description;
    if (dec !== undefined) targetIssue.description = dec;
    if (status !== undefined) targetIssue.status = status;
    if (board !== undefined) targetIssue.board = Number(board);
    if (bId !== undefined) targetIssue.board = Number(bId);

    res.json({
        message: "Issue updated successfully",
        issue: targetIssue
    });
});

// Delete an Issue
app.delete("/issues/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = issue.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Issue not found"
        });
    }

    const deleted = issue.splice(index, 1);
    res.json({
        message: "Issue deleted successfully",
        issue: deleted[0]
    });
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

