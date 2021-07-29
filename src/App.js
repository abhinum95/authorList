import React, { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [authorName, setAuthorName] = useState("");

  useEffect(async () => {
    const url = "https://jsonmock.hackerrank.com/api/articles";
    await fetch(url)
      .then(async (res) => await res.json())
      .then((res) => {
        setList(res.data);
        getautocompleteList();
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   getautocompleteList();
  };

  const getautocompleteList = () => {
    if (authorName === "") return []; // If no input show empty list

    let filtered = list.filter((item) => {
      console.log(item.author.indexOf(authorName) === 0);
      return item.author.indexOf(authorName) === 0;
    });
    setFilteredList(() => filtered);
  };

  const handleChange = (e) => {
    setAuthorName(() => e.target.value);
    if (e.target.value === "") {
      setFilteredList(() => []);
    } else {
      getautocompleteList();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <div className="autosuggest">
          {filteredList.map((item) => (
            <div key={item.created_at}>{item.author}</div>
          ))}
        </div>
        <button type="submit">Search</button>
      </form>
      {list.map((item) => (
        <div key={item.created_at}>{item.author}</div>
      ))}
    </div>
  );
}

export default App;
