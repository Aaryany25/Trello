const { Boards, issue, counters } = require('../models/data');

const createIssue = (req, res) => {
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
        id: counters.issueId++,
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
};

const getIssues = (req, res) => {
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
};

const getIssueById = (req, res) => {
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
};

const updateIssue = (req, res) => {
    const id = req.params.id ? Number(req.params.id) : Number(req.body.id);
    const { title, description, dec, status, board, boardId: bId } = req.body;

    if (!id) {
        return res.status(400).json({
            message: "Issue id is required in body or params"
        });
    }

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
};

const deleteIssue = (req, res) => {
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
};

module.exports = {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue
};
