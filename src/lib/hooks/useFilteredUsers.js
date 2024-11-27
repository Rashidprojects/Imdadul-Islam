import { useEffect, useState } from "react"

export const useFilteredUsers = (users, areaCode, currentPage, itemsPerPage) => {
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        let filtered = users;

        // Filter by area code if provided
        if (areaCode) {
            filtered = users
                .filter((user) => user.areaCode === areaCode )
                .sort((a,b) => a.houseNumber - b.houseNumber)
        }

        setFilteredUsers(filtered)
    }, [users, areaCode])

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    //   lastItem = 2 * 5 = 10
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // firstItem = 10 - 5 = 5
    const currentData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    // slice data => slice(5, 10) o/p => [6,7,8,9,10]

    return { filteredUsers, currentData, setFilteredUsers }
}
