const { z } = require('zod');

const createOrgSchema = z.object({
    title: z.string({ required_error: "Organization title is required" }).min(1, "Title cannot be empty"),
    dec: z.string().optional(),
    description: z.string().optional(),
    username: z.string().optional(),
    userId: z.union([z.string(), z.number()]).optional()
});

const addMemberSchema = z.object({
    orgId: z.union([z.number(), z.string().regex(/^\d+$/, "orgId must be a valid number")]).transform(val => Number(val)),
    employee: z.union([z.string(), z.number()]).optional(),
    username: z.union([z.string(), z.number()]).optional(),
    userId: z.union([z.string(), z.number()]).optional()
}).refine(data => data.employee !== undefined || data.username !== undefined || data.userId !== undefined, {
    message: "employee, username, or userId is required"
});

const getMembersQuerySchema = z.object({
    orgId: z.union([z.number(), z.string().regex(/^\d+$/, "orgId must be a valid number")]).transform(val => Number(val))
});

module.exports = {
    createOrgSchema,
    addMemberSchema,
    getMembersQuerySchema
};
