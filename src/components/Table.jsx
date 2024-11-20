import { TableData } from "../Datas/TableData";

const Table = () => {
  return (
    <div className="">
      <div className="p-5 ">
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-primary text-light border-2 border-primary ">
              <tr>
                <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">No.</th>
                <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">House No.</th>
                <th className="w-20 p-3 text-xl font-semibold tracking-wide text-left">Area Code</th>
                <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Name</th>
                <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Place</th>
                <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Total</th>
                <th className="w-24 p-3 text-xl font-semibold tracking-wide text-left">Received</th>
                <th className="w-32 p-3 text-xl font-semibold tracking-wide text-left">Pending</th>
              </tr>
            </thead>
            <tbody className="border-2 border-primary">
              {TableData.map((item) => (
                <tr key={item.id} className={` ${item.id % 2 === 0 ? 'bg-dark' : 'bg-table1' } `}>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      {item.id}
                    </a>
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      {item.houseNo}
                    </a>
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      {item.areacode}
                    </a>
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    {item.place}
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-blue-800 rounded-lg bg-opacity-50">
                      {item.total}
                    </span>
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-green-800 rounded-lg bg-opacity-50">
                      {item.received}
                    </span>
                  </td>
                  <td className="p-3 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-[18px] font-medium uppercase tracking-wider text-red-800 rounded-lg bg-opacity-50">
                      {item.total - item.received}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
