import React, { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword?.trim()) {
      history.push(`/menu/search/${keyword}`);
    } else {
      history.push("/menu");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="q"
        value={keyword}
        placeholder="Search..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
