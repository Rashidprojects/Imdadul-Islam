import { useState } from 'react';

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Car', 'Bike', 'Bus'];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative inline-block w-64">
      {/* Custom Select Button */}
      <button className="w-full bg-gray-200 p-2 rounded-md text-left">
        {selectedOption || 'Select an option'}
      </button>

      {/* Dropdown Options */}
      <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            className={`cursor-pointer px-4 py-2 text-gray-700 
              ${selectedOption === option ? 'bg-yellow-600 text-white' : ''}
              hover:bg-yellow-600 hover:text-white`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
