import { useUserData } from '../lib/providers/UserDataContext';
import { useNavigate } from 'react-router-dom';

const CheckData = () => {
  const { state, setEditingUser, deleteUser } = useUserData(); // Make sure deleteUser is retrieved from context
  const navigate = useNavigate();

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p style={{ color: 'red' }}>{state.error}</p>;

  return (
    <div>
      <h2>Submitted Data</h2>
      {state.users.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Username</th>
              <th>House Number</th>
              <th>Area Code</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => (
              <tr key={user.id}>
                <td>{user?.username}</td>
                <td>{user?.houseNumber}</td>
                <td>{user?.areaCode}</td>
                <td>{user?.address}</td>
                <td>{user.mobile}</td>
                <td>{user.totalAmount}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingUser(user); // Set the selected user in the context
                      navigate('/edit'); // Navigate to the edit page
                    }}
                  >
                    Edit
                  </button>
                  <br />
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckData;
