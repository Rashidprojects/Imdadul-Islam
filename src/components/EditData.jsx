import { useState, useEffect } from 'react';
import { useUserData } from '../lib/providers/UserDataContext';

const EditData = () => {
  const { state, updateUser } = useUserData();
  const [formData, setFormData] = useState(null);

  // Set form data when editingUser is available
  useEffect(() => {
    if (state.editingUser) {
      setFormData(state.editingUser);
    }
  }, [state.editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      await updateUser(formData.id, formData);
      alert('User updated successfully!');
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData?.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>House Number:</label>
        <input
          type="text"
          name="houseNumber"
          value={formData?.houseNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Area Code:</label>
        <input
          type="text"
          name="areaCode"
          value={formData?.areaCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData?.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData?.mobile}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          value={formData?.totalAmount}
          onChange={handleChange}
        />
      </div>

      <h3>Installments:</h3>
                <ul>
                {formData.installments.map((inst, index) => (
                    <li key={index}>{inst.name} - {inst.date} - {inst.receiptNo} - {inst.receivedAmount}</li>
                ))}
        </ul>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditData;
