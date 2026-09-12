const validate = (schemas) => {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            next();
        } catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            return res.status(500).json({ message: "Internal server error during validation" });
        }
    };
};

module.exports = { validate };
