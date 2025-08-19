import Todo from "../models/todoSchema.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const todo = await Todo.create({
      userId: req.user.userId,
      title,
      description,
      dueDate,
    });
    res.status(201).json({ success: true, todo });
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
