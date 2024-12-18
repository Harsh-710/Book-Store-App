import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdExitToApp } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";
import api from "../api";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    api
      .get("/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-7 m-7">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <div className="flex">
          <Link to="/books/create" data-tooltip-id="tooltip" data-tooltip-content="New Entry">
            <MdOutlineAddBox className="text-sky-800 m-2 text-4xl hover:text-sky-500 hover:scale-110 transition-all duration-300" />
          </Link>
          <ReactTooltip id="tooltip" place="bottom" type="dark" effect="solid" />
          <Link to="/" data-tooltip-id="tooltip" data-tooltip-content="Logout">
            <MdExitToApp className="text-sky-800 m-2 text-4xl hover:text-sky-500 hover:scale-110 transition-all duration-300" onClick= {() => localStorage.removeItem('token')} />
          </Link>
          <ReactTooltip id="tooltip" place="bottom" type="dark" effect="solid" />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Books;
