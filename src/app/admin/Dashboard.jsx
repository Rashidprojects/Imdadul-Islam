import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import CheckData from "../../components/CheckData"
import { useState } from "react"
import MainTable from "../../components/MainTable"
import CustomSelect from "../../components/Dashboard/CustomSelect"
import { useUserData } from "../../lib/providers/UserDataContext"
import Loading from "../../components/Loading"

const Dashboard = () => {
    const { state: userState } = useUserData();
    const navigate = useNavigate()

    const [isArea, setIsArea] = useState('')
    const [resetSelect, setResetSelect] = useState(false);

    // Callback function to update the selected value
  const handleSelectionChange = (value) => {
    setIsArea(value);
  };

  const handleReset = () => {
    setIsArea("");
    setResetSelect(true); // Trigger reset
    setTimeout(() => setResetSelect(false), 0); // Clear reset after triggering
  };
    
  return (
    <div className={`bg-primary h-auto pt-7 px-2`}> 
       <div className="bg-light h-screen rounded-xl">
        <h1 className="text-center text-2xl sm:text-3xl p-5 font-semibold">
            Welcome to Admin Dashboard!.
        </h1>  
            
        <div className="flex justify-center items-center gap-3 ">
            <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium" 
                onClick={handleReset}
            >All Area</button>
            <CustomSelect onSelectionChange={handleSelectionChange} reset={resetSelect} />
        </div>
        
        <div className="flex justify-end pr-5 pt-5 pb-5">
            <button onClick={() => navigate('/add-user')}
                className="bg-light text-secondary border-2 border-secondary w-[140px] sm:w-[160px] p-2 sm:p-2 rounded-md sm:text-[20px] font-semibold">Add new user</button>
        </div>

        {
            useUserData.loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>
                    <MainTable isArea={isArea} />
                    <Pagination />
                    {/* <CheckData isArea = {isArea} /> */}
                </div>
            )
        }

       </div>
    </div>
  )
}

export default Dashboard