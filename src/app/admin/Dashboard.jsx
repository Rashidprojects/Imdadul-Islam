import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import Table from "../../components/Table"
import CheckData from "../../components/CheckData"
import { useState } from "react"
import MainTable from "../../components/MainTable"
import CustomSelect from "../../components/Dashboard/CustomSelect"

const Dashboard = () => {
    const navigate = useNavigate()
    const [isArea, setIsArea] = useState('')
    const [selectedValue, setSelectedValue] = useState("");

    console.log('selected area is : ', isArea);
    console.log('prop passed value : ', selectedValue);

    // Callback function to update the selected value
  const handleSelectionChange = (value) => {
    setIsArea(value);
  };
    
  return (
    <div className="bg-primary h-screen pt-7 px-2"> 
       <div className="bg-light h-screen rounded-xl">
        <h1 className="text-center text-2xl sm:text-3xl p-5 font-semibold">
            Welcome to Admin Dashboard!.
        </h1>  
            
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <div className="flex gap-3">
               <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium">All Area</button>
               <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium">Area 1</button>
               <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium">Area 2</button> 
            </div>
            
            <div className="flex gap-3">
                <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium">Area 3</button>
                <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium">Area 4</button>
            </div>
   
        </div>
        <div>
            <select name="areaFilter" id="" onChange={(e) => setIsArea(e.target.value) }>
                <option value="default">Filter users by area</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
            </select>

            <CustomSelect onSelectionChange={handleSelectionChange} />
        </div>
        <div className="flex justify-end pr-5 pt-5 pb-5">
            <button onClick={() => navigate('/add-user')}
                className="bg-secondary text-light w-[140px] sm:w-[160px] p-2 sm:p-2 rounded-md sm:text-[20px] font-semibold">Add new user</button>
        </div>

        <div>
            <MainTable isArea={isArea} />

            <Table isArea = {isArea} />
            <Pagination />
            <CheckData isArea = {isArea} />
        </div>

       </div>
    </div>
  )
}

export default Dashboard