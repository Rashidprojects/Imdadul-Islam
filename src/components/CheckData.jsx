import { useEffect } from 'react';
import { useForm } from '../lib/providers/FormContext';
import { useUserData } from '../lib/providers/UserDataContext';
import { useNavigate } from 'react-router-dom';

const CheckData = () => {
  const { state: formState } = useForm(); // Form state
  const { state: userState, fetchUsers, setEditingUser, deleteUser } = useUserData(); // User data context
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger fetchUsers when `formState` changes
    fetchUsers();
  }, [formState]); // Dependencies to monitor (adjust based on your requirement)

  if (userState.loading) return <p>Loading...</p>;
  if (userState.error) return <p style={{ color: 'red' }}>{userState.error}</p>;

  return (
    <div>
      <h2>Submitted Data</h2>
      {userState.users.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>SI No</th>
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
            {userState.users.map((user, index) => (
              <tr key={user.id}>
                <td>{user?.siNo}</td> {/* Display serial number */}
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
