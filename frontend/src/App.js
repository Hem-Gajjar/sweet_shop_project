import React, { useEffect, useState } from "react";
import axios from "axios";
import AddSweetForm from "./components/AddSweetForm"; // Component to handle sweet form and table UI


const App = () => {
  // State to store sweets fetched from the backend
  const [sweets, setSweets] = useState([]);

  // Function to fetch sweets from the server
  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:5000/api/sweets");
    setSweets(res.data); // Store fetched sweets in state
  };

  // Fetch sweets once when the component mounts
  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    // Main app container with light grey background
    <div style={{ backgroundColor: "#eeeeeeff" }}>
      
      {/* Pass fetched sweets and state updater to child component */}
      <AddSweetForm setSweets={setSweets} sweets={sweets} />
    </div>
  );
};

export default App;
