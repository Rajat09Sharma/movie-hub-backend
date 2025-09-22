
const adminRoleMiddleware = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            return next();
        }
        return res.status(403).json({ message: "Only admin can access this route. Unauthorized!" });
    } catch (error) {
        console.log("User role middleware error:", error.message);
        return res.status(403).json({ message: "Unauthorized access!" });
    }
};

module.exports =  adminRoleMiddleware ;
