import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

// Main component for managing sweet inventory
const AddSweetForm = () => {
  // State to manage form input values
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });

  // State to hold all sweets fetched from backend
  const [sweets, setSweets] = useState([]);

  // State for filtered sweets to be shown in table
  const [filteredSweets, setFilteredSweets] = useState([]);

  // State for handling filter inputs
  const [filters, setFilters] = useState({ name: "", category: "", minPrice: "", maxPrice: "" });

  // Handles input change for add sweet form
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handles input change for search and filter
  const handleFilterChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    applyFilter(updated);
  };

  // Handles submission of Add Sweet form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(form.price);
    const quantity = Number(form.quantity);

    // Validation for non-negative price and quantity
    if (price < 0 ) {
      alert("Price cannot be negative!");
      return;
    }
    if (quantity < 0) {
      alert("Quantity cannot be negative!");
      return;
    }

    // Send POST request to backend
    await axios.post("http://localhost:5000/api/sweets", form);
    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  // Fetches all sweets from backend
  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:5000/api/sweets");
    setSweets(res.data);
    setFilteredSweets(res.data);
  };

  // Deletes a sweet by ID
  const deleteSweet = async (id) => {
    await axios.delete(`http://localhost:5000/api/sweets/${id}`);
    fetchSweets();
  };

  // Applies filters based on name, category, price range
  const applyFilter = (filters) => {
    let result = sweets;
    if (filters.name.trim()) result = result.filter(s => s.name.toLowerCase().includes(filters.name.toLowerCase()));
    if (filters.category.trim()) result = result.filter(s => s.category.toLowerCase().includes(filters.category.toLowerCase()));
    if (filters.minPrice) result = result.filter(s => s.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter(s => s.price <= Number(filters.maxPrice));
    setFilteredSweets(result);
  };

  // Handles purchasing sweets (decreases quantity)
  const handlePurchase = async (sweet) => {
    const qty = parseInt(prompt(`Enter quantity to purchase (Available: ${sweet.quantity})`));
    if (!qty || qty <= 0) return alert("Invalid quantity!");
    if (qty > sweet.quantity) return alert("Not enough stock!");

    try {
      await axios.put(`http://localhost:5000/api/sweets/purchase/${sweet._id}`, {
        quantity: sweet.quantity - qty
      });
      fetchSweets();
      alert("Purchase successful!");
    } catch (err) {
      alert("Purchase failed.");
    }
  };

  // Handles restocking sweets (increases quantity)
  const handleRestock = async (sweet) => {
    const qty = parseInt(prompt("Enter quantity to restock:"));
    if (!qty || qty <= 0) return alert("Invalid quantity!");

    try {
      await axios.put(`http://localhost:5000/api/sweets/restock/${sweet._id}`, {
        quantity: qty
      });
      fetchSweets();
      alert("Restock successful!");
    } catch (err) {
      alert("Restock failed.");
    }
  };

  // Fetch sweets when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      await fetchSweets();
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar bg-dark border-5 border-bottom border-body border-secondary py-3 mb-5" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fs-2 m-auto">Sweet Shop Management</span>
        </div>
      </nav>

      {/* Add New Sweet Form */}
      <div className="card p-4 shadow-lg mb-5 mx-auto border border-2 border-dark " style={{ maxWidth: "700px" }}>
        <h3 className="text-center mb-4">Add New Sweet</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input name="name" className="form-control rounded-pill border border-dark" placeholder="E.g. Kaju Katli" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <input name="category" className="form-control rounded-pill border border-dark" placeholder="E.g. Milk-Based" value={form.category} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price (₹)</label>
              <input name="price" type="number" className="form-control rounded-pill border border-dark" placeholder="E.g. 50" value={form.price} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input name="quantity" type="number" className="form-control rounded-pill border border-dark" placeholder="E.g. 20" value={form.quantity} onChange={handleChange} required />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-warning fw-bold rounded-pill px-5 shadow">
              <i className="bi bi-plus-circle me-2"></i> Add Sweet
            </button>
          </div>
        </form>
      </div>

      {/* Filters Section */}
      <div className="card shadow-lg p-4 mb-4 mx-5 border border-2 border-dark">
        <h4 className="mb-3 h3 m-auto">Search & Filter</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="name" className="form-control rounded-pill border border-dark" placeholder="Search by name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input type="text" name="category" className="form-control rounded-pill border border-dark" placeholder="Search by category" value={filters.category} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input type="number" name="minPrice" className="form-control rounded-pill border border-dark" placeholder="Min ₹" value={filters.minPrice} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input type="number" name="maxPrice" className="form-control rounded-pill border border-dark" placeholder="Max ₹" value={filters.maxPrice} onChange={handleFilterChange} />
          </div>
        </div>
      </div>

      {/* Sweets Table */}
      <div className="card shadow-lg p-4 mb-4 mx-5 border border-2 border-dark">

       <h3 className="text-center mb-4">View Sweets</h3>
      <div className="table-responsive mx-5 rounded rounded-3">
        <table className="table table-bordered text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSweets.map((sweet) => (
              <tr key={sweet._id}>
                <td className="border border-dark ">{sweet.name}</td>
                <td className="border border-dark ">{sweet.category}</td>
                <td className="border border-dark ">{sweet.price}</td>
                <td className="border border-dark ">{sweet.quantity}</td>
                <td className="border border-dark ">
                  <div className="d-flex justify-content-around">
                    <button className="btn btn-outline-danger border border-danger border-2 fw-bold btn-sm  rounded-pill " onClick={() => deleteSweet(sweet._id)}>
                      Delete
                    </button>
                    <button className="btn btn-outline-success border border-success border-2 fw-bold btn-sm rounded-pill " onClick={() => handlePurchase(sweet)}>
                      Purchase
                    </button>
                    <button className="btn btn-outline-info border border-info border-2 fw-bold btn-sm rounded-pill " onClick={() => handleRestock(sweet)}>
                      Restock
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSweets.length === 0 && (
              <tr>
                <td colSpan="5" className="text-muted">No sweets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </div>
  );
};

export default AddSweetForm;
