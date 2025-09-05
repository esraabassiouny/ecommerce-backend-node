// User.js
// ----------------------------
// Fields:
// - name: String, required
// - email: String, required, unique
// - password: String, required (hashed)
// - role: enum ["customer", "admin"], default "customer"
// - timestamps
//
// TODO:
// - Add pre-save hook to hash password
// - Add method to compare passwords (bcrypt)
