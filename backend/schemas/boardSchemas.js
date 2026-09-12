const { z } = require('zod');

const createBoardSchema = z.object({
    title: z.string({ required_error: "Board title is required" }).min(1, "Title cannot be empty"),
    orgId: z.union([z.number(), z.string().regex(/^\d+$/, "orgId must be a valid number")]).transform(val => Number(val)).optional(),
    organistions: z.union([z.number(), z.string().regex(/^\d+$/, "organistions must be a valid number")]).transform(val => Number(val)).optional()
}).refine(data => data.orgId !== undefined || data.organistions !== undefined, {
    message: "orgId (or organistions) is required"
});

const getBoardsQuerySchema = z.object({
    orgId: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional(),
    organistions: z.union([z.number(), z.string().regex(/^\d+$/)]).transform(val => Number(val)).optional()
});

const boardIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "Board ID must be a valid number").transform(val => Number(val))
});

module.exports = {
    createBoardSchema,
    getBoardsQuerySchema,
    boardIdParamSchema
};
