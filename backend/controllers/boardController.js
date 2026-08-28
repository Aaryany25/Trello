const { organistions, Boards, issue, counters } = require('../models/data');

const createBoard = (req, res) => {
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
        id: counters.boardId++,
        title: title,
        organistions: Number(targetOrgId),
        orgId: Number(targetOrgId)
    };

    Boards.push(newBoard);

    res.status(201).json({
        message: "Board created successfully",
        board: newBoard
    });
};

const getBoards = (req, res) => {
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
};

const getBoardById = (req, res) => {
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
};

module.exports = {
    createBoard,
    getBoards,
    getBoardById
};
