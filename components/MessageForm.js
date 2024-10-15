import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/messageSlice';

const MessageForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addMessage({ 
      id: Date.now(), 
      text: data.message, 
      user: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' } 
    }));
    reset();
  };

  return (
    <div className="border-t mt-4 pt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
        {/* Comment Input */}
        <input 
          {...register('message', { required: 'Message is required' })} 
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none" 
          placeholder="Add a comment..." 
        />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}

        {/* Send Button */}
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
