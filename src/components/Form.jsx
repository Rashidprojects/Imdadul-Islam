const Table = () => {
  return (
    <div className="bg-red-500">
        <div className="p-5 h-screen bg-gray-800">
            <h1 className="text-xl mb-2">Your orders</h1>

            <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Masjid No.</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Place</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Recieved</th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Pending</th>
                    </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10001</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">14501</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Kring New hello world welocme
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Padikkal
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10001</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">14501</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Kring New 
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Padikkal
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md bg-opacity-50">150000</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-base font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-md bg-opacity-50">100000</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md bg-opacity-50">50000</span>
                        </td>
                    </tr>

                    <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10001</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">14501</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Kring New 
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Padikkal
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">Delivered</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>

            
        </div>
    </div>
  )
}

export default Table