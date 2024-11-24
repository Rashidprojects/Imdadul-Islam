import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import Table from "../../components/Table"
import CheckData from "../../components/CheckData"

const Dashboard = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-primary h-screen pt-7 px-7"> 
       <div className="bg-light h-screen rounded-xl">
        <h1 className="text-center text-3xl p-5 font-semibold">
            Welcome to Admin Dashboard!.
        </h1>  
            
        <div className="flex justify-center items-center gap-4">
            <button className="bg-secondary text-light w-[120px] p-2 rounded-md text-[20px] font-semibold">All Area</button>
            <button className="bg-secondary text-light w-[120px] p-2 rounded-md text-[20px] font-semibold">Area 1</button>
            <button className="bg-secondary text-light w-[120px] p-2 rounded-md text-[20px] font-semibold">Area 2</button>
            <button className="bg-secondary text-light w-[120px] p-2 rounded-md text-[20px] font-semibold">Area 3</button>
            <button className="bg-secondary text-light w-[120px] p-2 rounded-md text-[20px] font-semibold">Area 4</button>
        </div>
        <div className="flex justify-end pr-5 pt-5 pb-5">
            <button onClick={() => navigate('/add-user')}
                className="bg-secondary text-light w-[160px] p-2 rounded-md text-[20px] font-semibold">Add new user</button>
        </div>

        <div>
            <Table />
            <Pagination />
            <CheckData />
        </div>

       </div>
    </div>
  )
}

export default Dashboard