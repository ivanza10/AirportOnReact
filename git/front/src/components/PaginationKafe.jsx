// eslint-disable-next-line react/prop-types
export default function Pagination({ kafePerPage, totalKafe, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalKafe / kafePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__ul">
        {pageNumbers.map((number) => (
          <li className="pagination__li" key={number}>
            {" "}
            <button
              aria-label={`Страница`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
