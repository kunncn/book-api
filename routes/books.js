const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management API
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  res.json(book);
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book added successfully
 *       403:
 *         description: Access denied
 */
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Access denied" });

  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Book not found
 */
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Access denied" });

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return res.status(404).json({ msg: "Book not found" });
  res.json(book);
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Book not found
 */
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Access denied" });

  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
