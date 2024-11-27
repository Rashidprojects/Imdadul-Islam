import { useEffect, useState } from 'react';
import { useForm } from '../lib/providers/FormContext';
import { useUserData } from '../lib/providers/UserDataContext';
import { usePagination } from '../lib/providers/PaginationContext';

const MainTable = ({ isArea }) => {
  const { state: formState } = useForm();
  const { state: userState, fetchUsers } = useUserData();
  const { state, setTotalItems } = usePagination();
  const { currentPage, itemsPerPage } = state;

  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Effect to set the total number of items when filteredUsers changes
  useEffect(() => {
    const totalItems = filteredUsers.length;

    // Update context
    setTotalItems(totalItems);

    // Update local storage
    localStorage.setItem('filteredUsersCount', totalItems.toString());
  }, [filteredUsers.length]);

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  //   lastItem = 2 * 5 = 10
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // firstItem = 10 - 5 = 5
  const currentData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  // slice data => slice(5, 10) o/p => [6,7,8,9,10]

  // Function to filter users by area
  const filterByArea = (areaCode) => {
    const filtered = userState.users
      .filter((user) => user.areaCode == areaCode)
      .sort((a, b) => a.houseNumber - b.houseNumber);
    setFilteredUsers(filtered);
  };

  // Initialize filteredUsers with all users on initial load
  useEffect(() => {
    fetchUsers(); // Fetch user data
    setFilteredUsers(userState.users); // Set initial state
  }, []);

  // Trigger filter when `isArea` or `formState` changes
  useEffect(() => {
    fetchUsers(); // Fetch user data when formState changes
    if (isArea) {
      filterByArea(isArea); // Apply area filter
    } else {
      setFilteredUsers(userState.users); // Reset to all users if no filter
    }
  }, [formState, isArea]);

  // Ensure filteredUsers updates if userState.users changes
  useEffect(() => {
    if (!isArea) {
      setFilteredUsers(userState.users);
    }
  }, [userState.users]);


  return (
    <div className="overflow-auto rounded-lg shadow mx-5">
      {filteredUsers.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table className="w-full">
          <thead className="bg-primary text-light border-2 border-primary ">
            <tr>
              <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">No.</th>
              <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Name</th>
              <th className="w-32 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">House No.</th>
              <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Area Code</th>
              <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Address</th>
              <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Phone</th>
              <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Total</th>
              <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Received</th>
              <th className="w-32 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Pending</th>
            </tr>
          </thead>
          <tbody className="border-2 border-primary">
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`${(index + 1) % 2 === 0 ? 'bg-dark' : 'bg-table1'}`}
              >
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.username}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap w-[30] ">
                  {item.houseNumber}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.areaCode}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.address}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.mobile}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.totalAmount}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {item.received}
                </td>
                <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                  {/* Pending amount */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainTable;
