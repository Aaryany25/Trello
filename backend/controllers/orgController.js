const { users, organistions, counters } = require('../models/data');

const getOrganizations = (req, res) => {
    res.json({
        organizations: organistions
    });
};

const createOrganization = (req, res) => {
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
        id: counters.orgId++,
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
};

const addMember = (req, res) => {
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
};

const getMembers = (req, res) => {
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
};

module.exports = {
    getOrganizations,
    createOrganization,
    addMember,
    getMembers
};
