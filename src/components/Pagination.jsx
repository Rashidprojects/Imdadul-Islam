import { usePagination } from "../lib/providers/PaginationContext";

const Pagination = () => {
  const { state, setPage, setItemsPerPage } = usePagination();
  const { totalItems, itemsPerPage, currentPage } = state;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle previous and next page buttons
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="p-2 border border-primary">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span className="ml-2">items per page</span>
      </div>

      <div className="flex items-center">
        <button onClick={handlePrev} className="p-2 bg-primary text-light rounded-lg" disabled={currentPage === 1}>
          Prev
        </button>
        <span className="mx-4 text-lg">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} className="p-2 bg-primary text-light rounded-lg" disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
