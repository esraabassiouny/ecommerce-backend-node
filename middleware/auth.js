// auth.js
// ----------------------------
// 1. Import jwt and User model
// 2. Create authMiddleware:
//    - Check for token in headers
//    - Verify token with JWT_SECRET
//    - Attach user to req.user (exclude password)
// 3. Create roleMiddleware(roles):
//    - Check if req.user.role is in roles[]
//    - If not, return 403 "Access denied"
// 4. Export both middlewares
