app.get(
  "/api/admin/messages",
  (req, res, next) => {
    const adminPassword = req.headers["x-admin-password"];
    if (adminPassword === process.env.ADMIN_PASS) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  },
  async (req, res) => {
    try {
      const messages = await Contact.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);
