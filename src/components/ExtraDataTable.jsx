import { useForm } from "../lib/providers/FormContext";
import { FaEdit } from "react-icons/fa";

const ExtraDataTable = ({ onEditExtraUser }) => {
    const { state } = useForm();


  return (
    <div className="w-full  ">


        {/* Extra user table starts here */}
        {  <>
          <div className=" w-full ">
            <div className="rounded-lg shadow ">
                <table className="w-full">
                    <thead className="bg-primary text-light border-2 border-primary ">
                    <tr>
                        <th className="w-20 p-2 text-[14px] sm:text-[18px] font-semibold tracking-wide text-left">User</th>
                        <th className="w-20 p-2 text-[14px] sm:text-[18px] font-semibold tracking-wide text-left">Date</th>
                        <th className="w-20 p-2 text-[12px] sm:text-[18px] font-semibold tracking-wide text-left">Reciept no.</th>
                        <th className="w-24 p-2 text-[14px] sm:text-[18px] font-semibold tracking-wide text-left">Recieved </th>
                        <th className="w-24 p-2 text-[14px] sm:text-[18px] font-semibold tracking-wide text-left">Action </th>
                    </tr>
                    </thead>

                    <tbody className="border-2 border-primary">
                    {state.extraUsers.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? 'bg-dark' : 'bg-table1'}`}>
                        <td className="p-3 text-[14px] sm:text-xl text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-medium text-secondary hover:underline">{item.name}</a>
                        </td>
                        <td className="p-3 text-[14px] sm:text-xl text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-medium text-secondary hover:underline">{item.date}</a>
                        </td>
                        <td className="p-3 text-[14px] sm:text-xl text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-medium text-secondary hover:underline">{item.relation}</a>
                        </td>
                        <td className="p-3 text-[14px] sm:text-xl font-medium text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-medium text-secondary hover:underline">{item.receivedAmount}</a>
                        </td>
                        <td className="p-3 text-[14px] sm:text-xl font-medium text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-medium text-secondary hover:underline" onClick={() => onEditExtraUser(index)}><FaEdit /></a>
                        </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
          </div>
        </> }
        {/* Extra user table ends here */}

    </div>
  );
};

export default ExtraDataTable;
