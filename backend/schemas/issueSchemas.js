const { z } = require('zod');

const createIssueSchema = z.object({
    title: z.string({ required_error: "Issue title is required" }).min(1, "Title cannot be empty"),
    description: z.string().optional(),
    dec: z.string().optional(),
    board: z.union([z.number(), z.string().regex(/^\d+$/, "board must be a valid number")]).transform(val => Number(val)).optional(),
    boardId: z.union([z.number(), z.string().regex(/^\d+$/, "boardId must be a valid number")]).transform(val => Number(val)).optional(),
    status: z.string().optional()
}).refine(data => data.board !== undefined || data.boardId !== undefined, {
    message: "board or boardId is required"
});

const getIssuesQuerySchema = z.object({
    board: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional(),
    boardId: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional()
});

const updateIssueSchema = z.object({
    id: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dec: z.string().optional(),
    status: z.string().optional(),
    board: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional(),
    boardId: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional()
});

const issueIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "Issue ID must be a valid number").transform(val => Number(val))
});

module.exports = {
    createIssueSchema,
    getIssuesQuerySchema,
    updateIssueSchema,
    issueIdParamSchema
};
