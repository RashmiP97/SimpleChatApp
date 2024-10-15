import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, deleteMessage, editMessage, addReply } from '../redux/messageSlice';

const MessageList = () => {
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [replyText, setReplyText] = useState({}); // Store reply texts for each message

  // Handle editing a message
  const handleEdit = (message) => {
    setEditId(message.id);
    setEditText(message.text);
  };

  // Update the edited message
  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(editMessage({ id: editId, text: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  // Handle deleting a message
  const handleDelete = (id) => {
    dispatch(deleteMessage(id));
  };

  // Handle replying to a message
  const handleReply = (messageId) => {
    if (replyText[messageId]) {
      dispatch(addReply({ messageId, reply: replyText[messageId] }));
      setReplyText((prev) => ({ ...prev, [messageId]: '' })); // Clear the reply input after sending
    }
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start space-x-4">
          <img src={message.user.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          <div className="bg-gray-100 p-4 rounded-lg w-full">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold">{message.user.name}</div>
              <div className="text-xs text-gray-500">just now</div>
            </div>
            {editId === message.id ? (
              <div className="flex space-x-4 mt-2">
                <input 
                  type="text" 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                  className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                  Update
                </button>
                <button onClick={() => setEditId(null)} className="text-red-500 hover:underline">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-800 mt-2">{message.text}</p>
                <div className="flex space-x-4 text-blue-500 text-sm mt-2">
                  <button onClick={() => handleEdit(message)} className="hover:underline">Edit</button>
                  <button onClick={() => handleDelete(message.id)} className="hover:underline text-red-500">Delete</button>
                  <button onClick={() => setReplyText((prev) => ({ ...prev, [message.id]: '' }))} className="hover:underline">Reply</button>
                </div>
              </>
            )}

            {/* Replies Section */}
            {message.replies && message.replies.map((reply, index) => (
              <div key={index} className="mt-2 pl-8 border-l-2 border-gray-300">
                <p className="text-gray-600">{reply}</p>
              </div>
            ))}

            {/* Reply Input */}
            <div className="flex space-x-4 mt-2">
              <input 
                type="text" 
                placeholder="Add a reply..." 
                value={replyText[message.id] || ''} 
                onChange={(e) => setReplyText({ ...replyText, [message.id]: e.target.value })} 
                className="flex-grow p-2 border border-gray-300 rounded-lg"
              />
              <button onClick={() => handleReply(message.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Reply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
