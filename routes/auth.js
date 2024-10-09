const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *                 example: testpassword
 *               role:
 *                 type: string
 *                 description: The role of the user (admin/user)
 *                 example: user
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      role,
    });
    await user.save();

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).send("Server error");
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the login
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: The password for the login
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
