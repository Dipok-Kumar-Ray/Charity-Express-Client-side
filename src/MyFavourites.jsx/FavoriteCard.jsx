import { Link } from 'react-router';
import { FaTrash } from 'react-icons/fa';

const FavoriteCard = ({ donation, handleRemove }) => {
  const { _id, image, title, restaurantName, location, status, quantity } = donation;

  return (
    <div className="card  shadow-md p-4 rounded-xl space-y-2">
      <img src={image} alt={title} className="rounded-xl w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{restaurantName}, {location}</p>
      <p>Status: <span className="font-semibold">{status}</span></p>
      <p>Quantity: {quantity}</p>
      <div className="flex justify-between items-center mt-2">
        <Link to={`/donation/${_id}`} className="btn btn-primary btn-sm">Details</Link>
        <button onClick={() => handleRemove(_id)} className="btn btn-error btn-sm flex items-center gap-1">
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;