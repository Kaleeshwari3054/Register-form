
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
  Dropdown,
  Modal,
  DropdownButton,
} from "react-bootstrap";
import "./AdminDashboard.css"
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, approved, rejected
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Ensure all users have status and id
    const usersWithStatus = storedUsers.map((user) => ({
      ...user,
      id: user.id || Date.now() + Math.random(),
      status: user.status || "pending",
    }));
    setUsers(usersWithStatus);
  }, []);

  const updateUserStatus = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    // Persist to localStorage
    localStorage.setItem(
      "users",
      JSON.stringify(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      )
    );
  };

  const deleteUser = () => {
    if (userToDelete) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete.id)
      );
      localStorage.setItem(
        "users",
        JSON.stringify(users.filter((user) => user.id !== userToDelete.id))
      );
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Combined filtering: search + status
  const filteredUsers = users.filter((user) => {
    const matchesSearch = (user[searchField]?.toLowerCase() || "").includes(
      searchTerm.toLowerCase()
    );
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status counts
  const statusCounts = {
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    rejected: users.filter((u) => u.status === "rejected").length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge bg="success" className="px-3 py-2 fs-6">
            <i className="bi bi-check-circle-fill me-1"></i>Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge bg="danger" className="px-3 py-2 fs-6">
            <i className="bi bi-x-circle-fill me-1"></i>Rejected
          </Badge>
        );
      default:
        return (
          <Badge bg="warning" className="px-3 py-2 fs-6">
            <i className="bi bi-clock-fill me-1"></i>Pending
          </Badge>
        );
    }
  };

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
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-lg">
              <h2 className="text-dark mb-0 fw-bold">
                <i className="bi bi-shield-check me-2 text-primary"></i>
                Admin Dashboard
              </h2>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="px-4 py-2 fs-6 fw-bold"
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </Button>
            </div>

            {/* Stats Cards */}
            <Row className="mb-4 g-3">
              <Col md={4} xs={12} sm={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-primary h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-people-fill fs-3 text-primary"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-primary">
                        {users.length}
                      </h5>
                      <small className="text-muted">Total Users</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} xs={12} sm={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-warning h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-clock-fill fs-3 text-warning"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-warning">
                        {statusCounts.pending}
                      </h5>
                      <small className="text-muted">Pending</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} xs={12} sm={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-success h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-check-circle-fill fs-3 text-success"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-success">
                        {statusCounts.approved}
                      </h5>
                      <small className="text-muted">Approved</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} xs={12} sm={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-danger h-100 w-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-danger bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-check-circle-fill fs-3 text-danger"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-danger">
                        {statusCounts.rejected}
                      </h5>
                      <small className="text-muted">Rejected</small>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-4 shadow-lg mb-4">
              <Row className="align-items-end g-3">
                <Col md={3} xs={12} sm={6}>
                  <Form.Label className="fw-bold mb-2">
                    Status Filter
                  </Form.Label>
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Col>
                <Col md={3} xs={12} sm={6}>
                  <Form.Label className="fw-bold mb-2">Search Field</Form.Label>
                  <Form.Select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="place">Place</option>
                    <option value="country">Country</option>
                  </Form.Select>
                </Col>
                <Col md={4} xs={12} sm={12}>
                  <Form.Label className="fw-bold mb-2">Search</Form.Label>
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
                <Col md={2} xs={12} sm={12}>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                  >
                    Show All
                  </Button>
                </Col>
              </Row>
              <Alert
                variant="info"
                className="mt-3 mb-0 bg-primary bg-opacity-10 border-0"
              >
                <strong>
                  Total: {users.length} | Filtered: {filteredUsers.length}
                </strong>
              </Alert>
            </div>

            {/* Users Table */}
            {filteredUsers.length === 0 ? (
              <Alert
                variant="warning"
                className="text-center bg-gradient shadow-lg border-0 py-5 rounded-4"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-search fs-1 me-3 opacity-75"></i>
                  <div>
                    <h4 className="mb-2 fw-bold">No Results Found</h4>
                    <p className="mb-0">
                      {searchTerm || statusFilter !== "all"
                        ? `No users match current filters.`
                        : "No registrations yet."}
                    </p>
                  </div>
                </div>
              </Alert>
            ) : (
              <div className="bg-white rounded-4 shadow-xl overflow-hidden border-0">
                <div className="p-4 bg-gradient-primary text-white">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h5 className="mb-0 fw-bold">
                      <i className="bi bi-people-fill me-2"></i>
                      Registered Users ({filteredUsers.length})
                    </h5>
                    <div className="d-flex gap-2 flex-wrap">
                      <Badge bg="warning" text-dark className="px-3 py-2">
                        Pending: {statusCounts.pending}
                      </Badge>
                      <Badge bg="success" className="px-3 py-2">
                        Approved: {statusCounts.approved}
                      </Badge>
                      <Badge bg="danger" className="px-3 py-2">
                        Rejected: {statusCounts.rejected}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="table-responsive admin-table-container">
                  <Table responsive hover className="mb-0 modern-table">
                    <thead className="table-header">
                      <tr>
                        <th className="ps-4 py-4">
                          <i className="bi bi-hash me-2"></i>ID
                        </th>
                        <th className="py-4">Name</th>
                        <th className="py-4">Phone</th>
                        <th className="py-4">Email</th>
                        <th className="py-4">Location</th>
                        <th className="py-4">Status</th>
                        <th className="pe-4 py-4 text-end">
                          <i className="bi bi-gear-fill me-2"></i>Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="user-row">
                          <td className="ps-4 align-middle">
                            <Badge
                              bg="primary"
                              className="fs-6 px-3 py-2 fw-bold"
                            >
                              #{index + 1}
                            </Badge>
                          </td>
                          <td className="align-middle fw-bold text-primary fs-6 py-4">
                            {user.name}
                          </td>
                          <td className="align-middle py-4">
                            <Badge className="px-4 py-2 fs-6 bg-light text-dark">
                              {user.phone}
                            </Badge>
                          </td>
                          <td className="align-middle py-4">
                            <span className="d-block text-muted fw-medium">
                              {user.email}
                            </span>
                          </td>
                          <td className="align-middle py-4">
                            <div>
                              <div className="fw-bold text-info">
                                {user.place}
                              </div>
                              <small className="text-muted">
                                {user.country}
                              </small>
                            </div>
                          </td>
                          <td className="align-middle py-4">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="pe-4 align-middle py-4 text-center">
                            <div className="dropdown-container">
                              <DropdownButton
                                align="end"
                                title={
                                  <i className="bi bi-three-dots-vertical fs-5"></i>
                                }
                                variant="light"
                                className="action-dropdown-btn"
                                drop="down"
                                size="sm"
                              >
                                <Dropdown.Item
                                  onClick={() =>
                                    updateUserStatus(user.id, "pending")
                                  }
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-clock-fill text-warning me-2"></i>
                                  Pending
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    updateUserStatus(user.id, "approved")
                                  }
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                                  Approved
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    updateUserStatus(user.id, "rejected")
                                  }
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                  Rejected
                                </Dropdown.Item>
                                <Dropdown.Divider className="dropdown-divider-custom" />
                                <Dropdown.Item
                                  onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                  }}
                                  className="dropdown-item-custom text-danger fw-bold"
                                >
                                  <i className="bi bi-trash3-fill text-danger me-2"></i>
                                  Delete
                                </Dropdown.Item>
                              </DropdownButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              centered
              size="sm"
            >
              <Modal.Header
                closeButton
                className="bg-danger bg-opacity-10 border-0"
              >
                <Modal.Title className="text-danger">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Confirm Delete
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center py-4">
                <i className="bi bi-person-x-fill fs-1 text-danger mb-3 opacity-75"></i>
                <h5 className="fw-bold mb-2">Delete {userToDelete?.name}?</h5>
                <p className="text-muted mb-0">This action cannot be undone.</p>
              </Modal.Body>
              <Modal.Footer className="border-0 justify-content-center pt-0">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                  <i className="bi bi-trash me-2"></i>Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }

        /* Gradient Backgrounds */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 50%, #004085 100%);
        }

        .bg-gradient {
          background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%);
        }

        /* Table Header Styling */
        .table-header {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);
          border-bottom: 4px solid #007bff !important;
        }

        .table-header th {
          color: #1e3a8a !important;
          font-weight: 700 !important;
          border: none !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.875rem;
        }

        /* Modern Table Styling */
        .modern-table {
          --bs-table-bg: #ffffff;
          --bs-table-striped-bg: rgba(0, 123, 255, 0.025);
          --bs-table-hover-bg: rgba(0, 123, 255, 0.05);
        }

        .modern-table tbody tr {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid #f8f9fa;
        }

        .modern-table tbody tr:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.12);
          background-color: rgba(0, 123, 255, 0.03);
        }

        .user-row {
          min-height: 80px;
        }

        .user-row td {
          border-color: transparent;
          padding: 1.5rem 1rem;
          vertical-align: middle;
          transition: all 0.2s ease;
        }

        /* Shadow Effects */
        .shadow-lg {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
        }

        .shadow-xl {
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.15) !important;
        }

        /* ===== ACTION DROPDOWN - PERFECT STYLING ===== */
        
        .dropdown-container {
          position: relative;
          display: inline-block;
          
        }

        .action-dropdown-btn {
          position: relative;
          z-index: 1;
        
        }

        .action-dropdown-btn .dropdown-toggle {
          // background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #000000;
          background: rgb(0, 0, 0) !important;
          padding: 8px;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .action-dropdown-btn .dropdown-toggle:hover {
          color: #007bff;
          background: rgba(0, 123, 255, 0.1) !important;
          border-radius: 50%;
        }

        .action-dropdown-btn .dropdown-toggle:active {
          color: #0056b3;
          background: rgba(0, 123, 255, 0.15) !important;
        }

        .action-dropdown-btn .dropdown-toggle::after {
          display: none;
        }

        /* Dropdown Menu - Fixed z-index */
        .action-dropdown-btn .dropdown-menu {
          z-index: 99999 !important;
          position: absolute !important;
          min-width: 180px;
          border-radius: 14px;
          padding: 8px;
          margin-right: 20px !important;
          background: #ffffff !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          animation: dropdownSlide 0.2s ease-out;
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Dropdown Items */
        .dropdown-item-custom {
          color: #374151 !important;
          font-weight: 500;
          border-radius: 8px;
          padding: 10px 14px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .dropdown-item-custom:hover {
          background: rgba(0, 123, 255, 0.08) !important;
          color: #007bff !important;
          transform: translateX(4px);
        }

        .dropdown-item-custom:active {
          background: rgba(0, 123, 255, 0.12) !important;
          color: #0056b3 !important;
        }

        /* Danger Dropdown Item */
        .dropdown-item-custom.text-danger:hover {
          background: rgba(220, 53, 69, 0.1) !important;
          color: #dc3545 !important;
        }

        .dropdown-item-custom.text-danger:active {
          background: rgba(220, 53, 69, 0.15) !important;
        }

        /* Dropdown Divider */
        .dropdown-divider-custom {
          border-color: rgba(0, 0, 0, 0.08);
          margin: 6px 0;
        }

        /* Table Container for Proper Overflow */
        .admin-table-container {
          position: relative;
          overflow-x: auto;
          overflow-y: visible;
        }

        /* Ensure table doesn't clip dropdowns */
        .admin-table-container .table-responsive {
          overflow: visible !important;
        }

        /* ===== PERFECT RESPONSIVE DESIGN ===== */

        /* Extra Large Devices (1200px and up) */
        @media (min-width: 1400px) {
          .user-row td {
            padding: 1.75rem 1.25rem;
          }

          .table-header th {
            font-size: 0.95rem;
            padding: 1.5rem 1.25rem;
          }
        }

        /* Large Devices (992px and up) */
        @media (min-width: 992px) and (max-width: 1199.98px) {
          .user-row td {
            padding: 1.25rem 0.75rem;
          }

          .table-header th {
            font-size: 0.85rem;
            padding: 1.25rem 0.75rem;
          }
        }

        /* Medium Devices (768px and up) */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .user-row td {
            padding: 1rem 0.5rem;
            font-size: 0.9rem;
          }

          .table-header th {
            font-size: 0.8rem;
            padding: 1rem 0.5rem;
          }

          .badge {
            font-size: 0.75rem !important;
            padding: 0.35rem 0.65rem;
          }

          .btn {
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
          }
        }

        /* Small Devices (576px and up) */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .user-row td {
            padding: 0.875rem 0.4rem;
            font-size: 0.85rem;
          }

          .table-header th {
            font-size: 0.75rem;
            padding: 0.875rem 0.4rem;
          }

          .badge {
            font-size: 0.7rem !important;
            padding: 0.3rem 0.5rem;
          }

          .action-dropdown-btn .dropdown-toggle {
            padding: 6px;
            font-size: 0.9rem;
          }

          .action-dropdown-btn .dropdown-menu {
            min-width: 160px;
          }

          .dropdown-item-custom {
            padding: 8px 12px;
            font-size: 0.875rem;
          }

          /* Stack badges on mobile */
          .badge {
            display: inline-block;
          }
        }

        /* Extra Small Devices (575.98px and down) */
        @media (max-width: 575.98px) {
          /* Header adjustments */
          .d-flex.justify-content-between {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          h2 {
            font-size: 1.5rem;
          }

          /* Stats cards */
          .bg-white.p-4 {
            padding: 1rem !important;
          }

          .bg-primary.bg-opacity-3,
          .bg-warning.bg-opacity-3,
          .bg-success.bg-opacity-3,
          .bg-danger.bg-opacity-3 {
            padding: 0.75rem !important;
          }

          .fs-3 {
            font-size: 1.75rem !important;
          }

          h5 {
            font-size: 1.1rem;
          }

          small {
            font-size: 0.8rem;
          }

          /* Filter section */
          .bg-white.p-4 {
            padding: 1rem !important;
          }

          .form-label {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
          }

          .form-select,
          .form-control {
            font-size: 0.875rem;
            padding: 0.625rem;
          }

          /* Table container */
          .admin-table-container {
            margin: 0 -0.75rem;
            border-radius: 0.75rem;
          }

          .modern-table {
            font-size: 0.75rem;
          }

          .user-row td {
            padding: 0.75rem 0.3rem;
            font-size: 0.75rem;
          }

          .table-header th {
            font-size: 0.7rem;
            padding: 0.75rem 0.3rem;
            white-space: nowrap;
          }

          /* Badges on mobile */
          .badge {
            font-size: 0.65rem !important;
            padding: 0.25rem 0.4rem;
          }

          /* Action button */
          .action-dropdown-btn .dropdown-toggle {
            padding: 5px;
            font-size: 0.85rem;
          }

          .action-dropdown-btn .dropdown-menu {
            min-width: 150px;
            right: -10px;
          }

          .dropdown-item-custom {
            padding: 7px 10px;
            font-size: 0.8rem;
          }

          .dropdown-item-custom i {
            font-size: 0.8rem;
          }

          /* Status badges in header */
          .d-flex.gap-2 {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          /* Modal adjustments */
          .modal-sm .modal-content {
            margin: 0.5rem;
          }

          .modal-body {
            padding: 1rem;
          }

          .fs-1 {
            font-size: 2rem !important;
          }

          h5.modal-title {
            font-size: 1rem;
          }
        }

        /* Ultra Small Devices (375px and down) */
        @media (max-width: 374.98px) {
          h2 {
            font-size: 1.25rem;
          }

          .user-row td {
            padding: 0.5rem 0.2rem;
            font-size: 0.7rem;
          }

          .table-header th {
            font-size: 0.65rem;
            padding: 0.5rem 0.2rem;
          }

          .badge {
            font-size: 0.6rem !important;
            padding: 0.2rem 0.35rem;
          }

          .action-dropdown-btn .dropdown-menu {
            min-width: 140px;
            right: -15px;
          }

          .dropdown-item-custom {
            padding: 6px 8px;
            font-size: 0.75rem;
          }
        }

        /* Tablet Landscape Mode */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .user-row td {
            padding: 1rem 0.5rem;
          }

          .table-header th {
            padding: 1rem 0.5rem;
          }
        }

        /* Print Styles */
        @media print {
          .action-dropdown-btn,
          .btn-danger,
          .btn-primary {
            display: none;
          }

          .shadow-lg,
          .shadow-xl {
            box-shadow: none !important;
          }

          .bg-gradient-primary {
            background: #007bff !important;
            color: white;
          }

          .user-row:hover {
            transform: none;
            box-shadow: none;
          }
        }

        /* Smooth Scrollbar */
        .admin-table-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .admin-table-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .admin-table-container::-webkit-scrollbar-thumb {
          background: #007bff;
          border-radius: 10px;
        }

        .admin-table-container::-webkit-scrollbar-thumb:hover {
          background: #0056b3;
        }

        /* Focus States for Accessibility */
        .action-dropdown-btn .dropdown-toggle:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25) !important;
        }

        .dropdown-item-custom:focus {
          background: rgba(0, 123, 255, 0.12) !important;
          outline: none;
        }

        /* Loading State Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modern-table tbody tr {
          animation: fadeIn 0.3s ease-out;
        }

        /* Prevent text selection on action buttons */
        .action-dropdown-btn {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
