import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { addNewTodo } from "../redux/todos/todoSlide";

const ModalAddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const { isOpenModal, setIsOpenModal } = props;
  const dispatch = useAppDispatch();

  const handleAddNewTodo = () => {
    if (title.trim() === "") {
      alert("title can not be empty");
      return;
    }
    dispatch(addNewTodo({ title }));
    setIsOpenModal(false);
  };

  return (
    <div>
      {/* Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>

            <form className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block mb-1 font-medium">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
            </form>

            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setIsOpenModal(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={() => handleAddNewTodo()}
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAddTodo;
