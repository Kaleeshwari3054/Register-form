import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Alert,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // name, phone, email, place, country

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const value = user[searchField]?.toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    navigate("/");
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-3 shadow-sm">
              <h2 className="text-dark mb-0">Admin Dashboard</h2>
              <Button variant="danger" onClick={handleLogout} className="px-4">
                Logout
              </Button>
            </div>

            {/* Stats */}
            <Alert variant="info" className="bg-primary text-white mb-4">
              <strong>
                Total Users: {users.length} | Filtered: {filteredUsers.length}
              </strong>
            </Alert>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <Row className="align-items-end">
                <Col md={3}>
                  <Form.Label className="mb-2">Search Field</Form.Label>
                  <Form.Select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="mb-3"
                  >
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="place">Place</option>
                    <option value="country">Country</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label className="mb-2">Search Term</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder={`Search ${searchField}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Button
                    variant="primary"
                    className="w-100 mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Show All
                  </Button>
                </Col>
              </Row>
            </div>

            {/* Users Table */}
            {/* Advanced Styles - Blue/White Theme (No Black) */}
            {filteredUsers.length === 0 ? (
              <Alert
                variant="warning"
                className="text-center bg-gradient shadow-lg border-0 py-4"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-search fs-3 me-3 opacity-75"></i>
                  <div>
                    <h5 className="mb-1 fw-bold">No Results Found</h5>
                    <small>
                      {searchTerm
                        ? `No users found for "${searchTerm}"`
                        : "No registrations yet."}
                    </small>
                  </div>
                </div>
              </Alert>
            ) : (
              <div className="bg-white rounded-4 shadow-lg overflow-hidden border-0">
                <div className="p-3 bg-gradient-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">
                      <i className="bi bi-people-fill me-2"></i>
                      Registered Users ({filteredUsers.length})
                    </h5>
                    <Badge pill text-dark className="fs-6 px-3 py-2">
                      Total: {users.length}
                    </Badge>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table responsive hover className="mb-0 modern-table">
                    <thead>
                      <tr className="table-header-gradient">
                        <th className="ps-4 py-3">
                          <i className="bi bi-hash me-2"></i>ID
                        </th>
                        <th className="py-3">
                          <i className="bi bi-person-fill me-2"></i>Name
                        </th>
                        <th className="py-3">
                          <i className="bi bi-telephone-fill me-2"></i>Phone
                        </th>
                        <th className="py-3">
                          <i className="bi bi-envelope-fill me-2"></i>Email
                        </th>
                        <th className="py-3">
                          <i className="bi bi-geo-alt-fill me-2"></i>Place
                        </th>
                        <th className="py-3">
                          <i className="bi bi-globe me-2"></i>Country
                        </th>
                        <th className="pe-4 py-3">
                          <i className="bi bi-clock-fill me-2"></i>Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="user-row h-100">
                          <td className="ps-4 align-middle">
                            <Badge pill bg="primary" className="fs-6 px-3">
                              {index + 1}
                            </Badge>
                          </td>
                          <td className="align-middle fw-bold text-primary fs-6">
                            {user.name}
                          </td>
                          <td className="align-middle">
                            <span className="badge bg-light text-dark px-3 py-2">
                              {user.phone}
                            </span>
                          </td>
                          <td className="align-middle">
                            <small className="d-block text-muted mb-1">
                              {user.email}
                            </small>
                          </td>
                          <td className="align-middle">
                            <span className="px-3 py-2 bg-info bg-opacity-10 text-info rounded-pill small">
                              {user.place}
                            </span>
                          </td>
                          <td className="align-middle">
                            <Badge bg="success" className="px-3">
                              {user.country}
                            </Badge>
                          </td>
                          <td className="pe-4 align-middle">
                            <small className="text-muted">
                              {user.timestamp}
                            </small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            <style jsx>{`
              .bg-gradient-primary {
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
              }

              .table-header-gradient {
                background: linear-gradient(
                  135deg,
                  #e3f2fd 0%,
                  #bbdefb 100%
                ) !important;
                border-bottom: 3px solid #007bff !important;
              }

              .table-header-gradient th {
                color: #1e3a8a !important;
                font-weight: 700 !important;
                border: none !important;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 0.85rem;
              }

              .modern-table {
                --bs-table-bg: #ffffff;
                --bs-table-striped-bg: rgba(0, 123, 255, 0.03);
                --bs-table-hover-bg: rgba(0, 123, 255, 0.06);
              }

              .modern-table tbody tr {
                transition: all 0.2s ease;
                border-bottom: 1px solid #e9ecef;
              }

              .modern-table tbody tr:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
              }

              .user-row td {
                border-color: transparent;
                padding: 1.2rem 0.75rem;
                vertical-align: middle;
              }

              .shadow-lg {
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
              }

              @media (max-width: 768px) {
                .user-row td {
                  padding: 0.75rem 0.5rem;
                  font-size: 0.9rem;
                }
              }
            `}</style>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
