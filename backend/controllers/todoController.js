import Todo from "../models/todoSchema.js";
import User from "../models/userModel.js";

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId; // từ middleware userAuth
    const { page = 1, limit = 5, status = "all" } = req.query;

    const query = { userId };
    if (status === "pending") query.completed = false;
    if (status === "completed") query.completed = true;

    const total = await Todo.countDocuments(query);

    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      todos,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newTodo = await Todo.create({
      title,
      description,
      dueDate,
      userId: userId, // gắn userId vào todo
    });

    return res.status(201).json({ success: true, todo: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, description, dueDate },
      { new: true }
    );

    if (!todo)
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFinishTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.userId; // lấy từ middleware userAuth

    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    // cập nhật completed = true
    todo.completed = !todo.completed;
    await todo.save();

    return res.json({ success: true, todo });
  } catch (error) {
    console.error("Finish todo error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!todo)
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
