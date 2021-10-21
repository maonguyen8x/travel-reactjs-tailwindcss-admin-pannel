import React from "react";

interface IProps {
  total: number,
  itemPerPage: number,
  currentPage: number,
  onNavigationClick: any
}

const SimplePaginator : React.FunctionComponent<IProps> = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.total / props.itemPerPage); i +=1) {
    pageNumbers.push(i);
  }

  const handleNavigate = (pageNumber: number) => {
    props.onNavigationClick(pageNumber);
  }

  const renderedPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number.toString()} className={"page-item" + (props.currentPage == number ? " active" : "")}>
        <a className="page-link" href="#" onClick={() => {handleNavigate(number)}}>{number}</a>
      </li>
    );
  });

  const hasPagination = pageNumbers.length > 1;
  return (
    <>
      { hasPagination && 
      <div className="bg-white pb-3">
        <nav aria-label="Page navigation example d-block clearfix w-100">
          <ul className="pagination justify-content-center">
            <li className="page-item"><a className="page-link" href="#" onClick={() => {handleNavigate(props.currentPage - 1)}} >Previous</a></li>
            {renderedPageNumbers}
            <li className="page-item"><a className="page-link" href="#" onClick={() => {handleNavigate(props.currentPage + 1)}} >Next</a></li>
          </ul>
        </nav>
      </div>}
    </>
  )
}

export default SimplePaginator;