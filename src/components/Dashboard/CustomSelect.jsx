import  { useState } from "react";

const CustomSelect = ({ onSelectionChange }) => {
  // State for options
  const [options, setOptions] = useState([
    { id: 0, value: "", name: "Filter users by area", status: true },
    { id: 1, value: "A1", name: "Area 1", status: false },
    { id: 2, value: "A2", name: "Area 2", status: false },
    { id: 3, value: "A3", name: "Area 3", status: false },
    { id: 4, value: "A4", name: "Area 4", status: false },
  ]);

  // Function to handle click on an option
  const handleOptionClick = (id) => {
    const updatedOptions = options.map((item) =>
      item.id === id ? { ...item, status: true } : { ...item, status: false }
    );
    setOptions(updatedOptions);

    // Find the clicked item's value and pass it to the parent
    if (id !== 0) {
        const selectedOption = updatedOptions.find((item) => item.id === id);
        if (onSelectionChange) {
        onSelectionChange(selectedOption.value); // Call the parent's callback
        }
    }

  };

  return (
    <div className="pl-7 w-[240px]">
      {/* Display the selected option */}
      <div className="border-2 border-primary hover:scale-105 cursor-pointer rounded-md p-1 sm:p-2">
        {options.map(
          (item) =>
            item.status && <p key={item.id} className="font-medium sm:text-[18px]" >{item.name}</p> // Only show the active option
        )}
      </div>

      {/* Display all options */}
      <div>
        {options.map((item) => (
          <p
            key={item.id}
            onClick={() => handleOptionClick(item.id)}
            className="cursor-pointer hover:text-primary "
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
