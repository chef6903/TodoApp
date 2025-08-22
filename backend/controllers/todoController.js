import Todo from "../models/todoSchema.js";
import User from "../models/userModel.js";

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId; // lấy từ middleware userAuth

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // chỉ lấy todo thuộc về user này
    const todos = await Todo.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, todos });
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
  const { title, description, completed, dueDate } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, description, completed, dueDate },
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
