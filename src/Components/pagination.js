import React from 'react'

const Pagination = ({ postPerPage, totalPost, paginate }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav>

            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} herf="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Pagination
