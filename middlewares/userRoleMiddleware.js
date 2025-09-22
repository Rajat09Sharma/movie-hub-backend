
const userRoleMiddleware = (req, res, next) => {
    try {
        if (req.user && req.user.role === "user") {
            return next();
        }
        return res.status(403).json({ message: "Only users can access this route. Unauthorized!" });
    } catch (error) {
        console.log("User role middleware error:", error.message);
        return res.status(403).json({ message: "Unauthorized access!" });
    }
};

module.exports = userRoleMiddleware ;
