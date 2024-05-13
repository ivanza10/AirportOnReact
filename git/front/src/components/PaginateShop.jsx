// eslint-disable-next-line react/prop-types
export default function Pagination({ shopPerPage, totalshop, paginate }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalshop / shopPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <ul className="pagination__ul">
          {pageNumbers.map((number) => (
            <li className="pagination__li" key={number}>
              {" "}
              <button href="#" onClick={() => paginate(number)}>
                {number}
              </button>{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  