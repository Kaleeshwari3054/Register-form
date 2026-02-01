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
import { db } from "../firebase/firebase-config";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  addDoc 
} from "firebase/firestore";

const Adminpage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FIREBASE REALTIME DATA FETCHING
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "pending", // Default status
      }));
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Update user status in Firebase
  const updateUserStatus = async (userId, newStatus) => {
    try {
      await updateDoc(doc(db, "registrations", userId), {
        status: newStatus,
        statusUpdatedAt: new Date().toISOString(),
      });
      // Data updates automatically via onSnapshot
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update status');
    }
  };

  // Delete user from Firebase
  const deleteUser = async () => {
    if (userToDelete?.id) {
      try {
        await deleteDoc(doc(db, "registrations", userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete user');
      }
    }
  };

  // Filtering logic (client-side)
  const filteredUsers = users.filter((user) => {
    const matchesSearch = (user[searchField]?.toLowerCase() || "").includes(
      searchTerm.toLowerCase()
    );
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
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

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <h4>Loading registrations from Firebase...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-lg">
              <h2 className="text-dark mb-0 fw-bold">
                <i className="bi bi-shield-check me-2 text-primary"></i>
                Admin Dashboard (Firebase)
              </h2>
              <div className="d-flex gap-2">
                <Button
                  variant="success"
                  className="px-4 py-2 fs-6 fw-bold"
                  onClick={() => window.location.reload()}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>Refresh
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="px-4 py-2 fs-6 fw-bold"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <Row className="mb-4 g-3">
              <Col md={3} xs={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-primary h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-people-fill fs-3 text-primary"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-primary">{users.length}</h5>
                      <small className="text-muted">Total Registrations</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-warning h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-clock-fill fs-3 text-warning"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-warning">{statusCounts.pending}</h5>
                      <small className="text-muted">Pending</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-success h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-check-circle-fill fs-3 text-success"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-success">{statusCounts.approved}</h5>
                      <small className="text-muted">Approved</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-danger h-100">
                  <div className="d-flex align-items-center">
                    <div className="bg-danger bg-opacity-3 p-3 rounded-3 me-3">
                      <i className="bi bi-x-circle-fill fs-3 text-danger"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-danger">{statusCounts.rejected}</h5>
                      <small className="text-muted">Rejected</small>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Filters & Search - SAME AS BEFORE */}
            <div className="bg-white p-4 rounded-4 shadow-lg mb-4">
              <Row className="align-items-end g-3">
                <Col md={3}>
                  <Form.Label className="fw-bold mb-2">Status Filter</Form.Label>
                  <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label className="fw-bold mb-2">Search Field</Form.Label>
                  <Form.Select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="place">Place</option>
                    <option value="country">Country</option>
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Label className="fw-bold mb-2">Search</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder={`Search ${searchField}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
                      Clear
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={2}>
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
              <Alert variant="info" className="mt-3 mb-0 bg-primary bg-opacity-10 border-0">
                <strong>Total: {users.length} | Filtered: {filteredUsers.length}</strong>
              </Alert>
            </div>

            {/* Users Table - SAME UI, FIREBASE DATA */}
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
                        : "No registrations yet. Submit from ContactForm!"}
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
                      Firebase Registrations ({filteredUsers.length})
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
                            <Badge bg="primary" className="fs-6 px-3 py-2 fw-bold">
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
                            <span className="d-block text-muted fw-medium">{user.email}</span>
                          </td>
                          <td className="align-middle py-4">
                            <div>
                              <div className="fw-bold text-info">{user.place}</div>
                              <small className="text-muted">{user.country}</small>
                            </div>
                          </td>
                          <td className="align-middle py-4">{getStatusBadge(user.status)}</td>
                          <td className="pe-4 align-middle py-4 text-center">
                            <div className="dropdown-container">
                              <DropdownButton
                                align="end"
                                title={<i className="bi bi-three-dots-vertical fs-5"></i>}
                                variant="light"
                                className="action-dropdown-btn"
                                drop="down"
                                size="sm"
                              >
                                <Dropdown.Item
                                  onClick={() => updateUserStatus(user.id, "pending")}
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-clock-fill text-warning me-2"></i>Pending
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => updateUserStatus(user.id, "approved")}
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-check-circle-fill text-success me-2"></i>Approved
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => updateUserStatus(user.id, "rejected")}
                                  className="dropdown-item-custom"
                                >
                                  <i className="bi bi-x-circle-fill text-danger me-2"></i>Rejected
                                </Dropdown.Item>
                                <Dropdown.Divider className="dropdown-divider-custom" />
                                <Dropdown.Item
                                  onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                  }}
                                  className="dropdown-item-custom text-danger fw-bold"
                                >
                                  <i className="bi bi-trash3-fill text-danger me-2"></i>Delete
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
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered size="sm">
              <Modal.Header closeButton className="bg-danger bg-opacity-10 border-0">
                <Modal.Title className="text-danger">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>Confirm Delete
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center py-4">
                <i className="bi bi-person-x-fill fs-1 text-danger mb-3 opacity-75"></i>
                <h5 className="fw-bold mb-2">Delete {userToDelete?.name}?</h5>
                <p className="text-muted mb-0">This action cannot be undone.</p>
              </Modal.Body>
              <Modal.Footer className="border-0 justify-content-center pt-0">
                <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
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
    </div>
  );
};

export default Adminpage;
