import React, { useState, useEffect } from "react";
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { useMealContext } from "../../context/mealContext";
import { useNavigate } from "react-router-dom";
import { startFetchMealsBySearch } from "../../actions/mealsActions";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch, meals } = useMealContext();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchResult = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setErrorMsg("");
      // You can navigate to a search results page or handle search results here
      // For example, navigate(`/search-results?query=${searchTerm}`);
      startFetchMealsBySearch(dispatch, searchTerm);
    } else {
      setErrorMsg("Invalid search term ...");
    }
  };

  useEffect(() => {
    // Dynamic search functionality
    const fetchSearchResults = async () => {
      if (searchTerm.trim() !== "") {
        setErrorMsg("");
        // You can navigate to a search results page or handle search results here
        // For example, navigate(`/search-results?query=${searchTerm}`);
        startFetchMealsBySearch(dispatch, searchTerm);
      } else {
        setErrorMsg("Invalid search term ...");
      }
    };

    const delayTimer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [searchTerm, dispatch]);

  return (
    <form
      className="search-form flex align-center"
      onSubmit={(e) => handleSearchResult(e)}
    >
      <input
        type="text"
        className="form-control-input text-dark-gray fs-15"
        placeholder="Search recipes here ..."
        value={searchTerm}
        onChange={(e) => handleSearchTerm(e)}
      />
      <button
        type="submit"
        className="form-submit-btn text-white text-uppercase fs-14"
      >
        <BsSearch className="btn-icon" size={20} />
      </button>
    </form>
  );
};

export default SearchForm;
