// import jwt from 'jsonwebtoken';
// import User from '../models/auth.models.js';

// export const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;

//         if (!token) {
//             return res.status(401).json({
//                 message: "Unauthorized error"
//             });
//         }

//         // Verify the JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({
//                 message: "Unauthorized error"
//             });
//         }

//         // Fetch the user from the database using the decoded _id
//         const user = await User.findById(decoded._id);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         // If everything is fine, attach the userId to the request object
//         req.userId = decoded._id;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (err) {
//         console.log("Error in protect routes", err);
//         return res.status(500).json({
//             error: "Internal server error"
//         });
//     }
// };
