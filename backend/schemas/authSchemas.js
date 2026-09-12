const { z } = require('zod');

const signupSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(1, "Username cannot be empty"),
    password: z.union([z.string().min(1, "Password cannot be empty"), z.number()]),
    name: z.string().optional()
});

const signinSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(1, "Username cannot be empty"),
    password: z.union([z.string().min(1, "Password cannot be empty"), z.number()])
});

module.exports = {
    signupSchema,
    signinSchema
};
