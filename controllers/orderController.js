// orderController.js

// Place new order (Customer)
exports.createOrder = async (req, res) => {
  // TODO:
  // 1. Get user's cart
  // 2. Save order with shipping & payment details
  // 3. Clear cart
};

// Get my orders (Customer)
exports.getOrders = async (req, res) => {
  // TODO:
  // - If customer: return only their orders
  // - If admin: return all orders
};

// Get order details (Customer)
exports.getOrderById = async (req, res) => {
  // TODO: Return single order by ID (must belong to customer)
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  // TODO: Change status (Pending → Shipped → Delivered)
};
