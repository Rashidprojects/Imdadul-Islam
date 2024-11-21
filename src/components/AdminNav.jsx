import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../lib/providers/SigninContext";
import { useNavigate } from "react-router-dom";

const AdminNav = ({ currentSection }) => {

    const { handleLogout } = useAuth()
    const navigate = useNavigate()
  return (
    <div className="mb-4 border-b border-light">
      <div className="flex">
        {/* Icon Section */}
        <div className="w-[100px] flex justify-center items-start border-r border-light">
          <div className="pt-4 pb-4">
            <span className="text-light text-3xl">
              <i className="fa-solid fa-mosque"></i>
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-between items-center w-full px-7">
          <div className="flex justify-center items-center text-[18px] font-medium">
            <button className="text-light">Dashboard</button>

            {/* Render current section dynamically */}
            {currentSection && (
              <>
                <IoIosArrowForward className="text-table1" />
                <p className="text-dark">{currentSection}</p>
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="pr-3 bg-red-600 text-light px-3 py-1 rounded-lg text-[20px] font-medium">
            <button onClick={() => { handleLogout(); navigate('/admin-portal') }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
