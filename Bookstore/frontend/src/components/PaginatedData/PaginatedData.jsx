import React, { useState } from "react";
import ReactPaginate from "react-paginate"; // or import { Pagination } from 'react-js-pagination';
import { Link, useNavigate } from "react-router-dom";

const PaginatedData = ({ data, itemsPerPage }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const navigateTo = (item) => {
    navigate(`/deleteBook/${item.id}`);
    console.log(item.id)
  };

  return (
    <div>
      {currentData.map((item, index) => (
        <div
          // to={`/deleteBook/${item.id}`}
          className="card text-center home-book"
          key={index}
          
        >
          <button onClick={navigateTo}>btn</button>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Author: {item.author}
            </h6>
            <p className="card-text">{item.description}</p>
            <pre className="card-text">{item.publish_date}</pre>
          </div>
        </div>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(data.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginatedData;
