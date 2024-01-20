const Pagination = (props: {
  current: number;
  paginate: any;
}) => {
  const { current, paginate } = props;
  const totalPage = current + 5;

  const pageNumber = [];
  for (let idx = current; idx <= totalPage; idx++) {
    pageNumber.push(
      <button
        key={idx}
        className={`join-item btn ${current === idx ? "btn-primary" : ""}`}
        onClick={() => paginate(idx)}
      >
        {idx}
      </button>
    );
  }
  return (
    <div className="join">
      {current !== 1 && (
        <button
          className={`join-item btn`}
          onClick={() => paginate(current - 1)}
        >
          Prev
        </button>
      )}
      {pageNumber}
      {current && (
        <button
          className={`join-item btn`}
          onClick={() => paginate(current + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
