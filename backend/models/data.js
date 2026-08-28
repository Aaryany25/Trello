const JWT_SECRET = "harkirat123";

let counters = {
    userId: 3,
    orgId: 3,
    boardId: 2,
    issueId: 2
};

const users = [
    {
        id: 1,
        name: "Aryan",
        username: "aryan",
        password: 123,
    },
    {
        id: 2,
        name: "Avni",
        username: "avni",
        password: 123
    }
];

const organistions = [
    {
        id: 1,
        title: "Organization 1",
        dec: "Main workspace",
        admin: 1,
        amin: 1,
        members: [1, 2]
    },
    {
        id: 2,
        title: "Organization 2",
        dec: "Secondary workspace",
        admin: 2,
        amin: 2,
        members: [2]
    }
];

const Boards = [
    {
        id: 1,
        title: "Aryan fullstack",
        organistions: 1,
        orgId: 1
    }
];

const issue = [
    {
        id: 1,
        title: "Learn full stack",
        description: "Cover frontend, backend, and database",
        board: 1,
        status: "inProcess" // todo, inProcess, done
    }
];

module.exports = {
    JWT_SECRET,
    counters,
    users,
    organistions,
    Boards,
    issue
};
