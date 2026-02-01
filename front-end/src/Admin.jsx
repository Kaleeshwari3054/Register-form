// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Table,
// //   Button,
// //   Alert,
// //   Badge,
// //   Form,
// //   InputGroup,
// // } from "react-bootstrap";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searchField, setSearchField] = useState("name"); // name, phone, email, place, country

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
// //     setUsers(storedUsers);
// //   }, []);

// //   // Filter users based on search
// //   const filteredUsers = users.filter((user) => {
// //     const value = user[searchField]?.toLowerCase() || "";
// //     return value.includes(searchTerm.toLowerCase());
// //   });

// //   const handleLogout = () => {
// //     localStorage.removeItem("adminSession");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="min-vh-100 bg-light">
// //       <Container className="py-5">
// //         <Row className="justify-content-center">
// //           <Col lg={12}>
// //             {/* Header */}
// //             <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-3 shadow-sm">
// //               <h2 className="text-dark mb-0">Admin Dashboard</h2>
// //               <Button variant="danger" onClick={handleLogout} className="px-4">
// //                 Logout
// //               </Button>
// //             </div>

// //             {/* Stats */}
// //             <Alert variant="info" className="bg-primary text-white mb-4">
// //               <strong>
// //                 Total Users: {users.length} | Filtered: {filteredUsers.length}
// //               </strong>
// //             </Alert>

// //             {/* Search Bar */}
// //             <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
// //               <Row className="align-items-end">
// //                 <Col md={3}>
// //                   <Form.Label className="mb-2">Search Field</Form.Label>
// //                   <Form.Select
// //                     value={searchField}
// //                     onChange={(e) => setSearchField(e.target.value)}
// //                     className="mb-3"
// //                   >
// //                     <option value="name">Name</option>
// //                     <option value="phone">Phone</option>
// //                     <option value="email">Email</option>
// //                     <option value="place">Place</option>
// //                     <option value="country">Country</option>
// //                   </Form.Select>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Label className="mb-2">Search Term</Form.Label>
// //                   <InputGroup>
// //                     <Form.Control
// //                       type="text"
// //                       placeholder={`Search ${searchField}...`}
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                     />
// //                     <Button
// //                       variant="outline-secondary"
// //                       onClick={() => setSearchTerm("")}
// //                     >
// //                       Clear
// //                     </Button>
// //                   </InputGroup>
// //                 </Col>
// //                 <Col md={3}>
// //                   <Button
// //                     variant="primary"
// //                     className="w-100 mt-4"
// //                     onClick={() => setSearchTerm("")}
// //                   >
// //                     Show All
// //                   </Button>
// //                 </Col>
// //               </Row>
// //             </div>

// //             {/* Users Table */}
// //             {/* Advanced Styles - Blue/White Theme (No Black) */}
// //             {filteredUsers.length === 0 ? (
// //               <Alert
// //                 variant="warning"
// //                 className="text-center bg-gradient shadow-lg border-0 py-4"
// //               >
// //                 <div className="d-flex align-items-center justify-content-center">
// //                   <i className="bi bi-search fs-3 me-3 opacity-75"></i>
// //                   <div>
// //                     <h5 className="mb-1 fw-bold">No Results Found</h5>
// //                     <small>
// //                       {searchTerm
// //                         ? `No users found for "${searchTerm}"`
// //                         : "No registrations yet."}
// //                     </small>
// //                   </div>
// //                 </div>
// //               </Alert>
// //             ) : (
// //               <div className="bg-white rounded-4 shadow-lg overflow-hidden border-0">
// //                 <div className="p-3 bg-gradient-primary text-white">
// //                   <div className="d-flex justify-content-between align-items-center">
// //                     <h5 className="mb-0 fw-bold">
// //                       <i className="bi bi-people-fill me-2"></i>
// //                       Registered Users ({filteredUsers.length})
// //                     </h5>
// //                     <Badge pill text-dark className="fs-6 px-3 py-2">
// //                       Total: {users.length}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 <div className="table-responsive">
// //                   <Table responsive hover className="mb-0 modern-table">
// //                     <thead>
// //                       <tr className="table-header-gradient">
// //                         <th className="ps-4 py-3">
// //                           <i className="bi bi-hash me-2"></i>ID
// //                         </th>
// //                         <th className="py-3">
// //                           <i className="bi bi-person-fill me-2"></i>Name
// //                         </th>
// //                         <th className="py-3">
// //                           <i className="bi bi-telephone-fill me-2"></i>Phone
// //                         </th>
// //                         <th className="py-3">
// //                           <i className="bi bi-envelope-fill me-2"></i>Email
// //                         </th>
// //                         <th className="py-3">
// //                           <i className="bi bi-geo-alt-fill me-2"></i>Place
// //                         </th>
// //                         <th className="py-3">
// //                           <i className="bi bi-globe me-2"></i>Country
// //                         </th>
// //                         <th className="pe-4 py-3">
// //                           <i className="bi bi-clock-fill me-2"></i>Date
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredUsers.map((user, index) => (
// //                         <tr key={user.id} className="user-row h-100">
// //                           <td className="ps-4 align-middle">
// //                             <Badge pill bg="primary" className="fs-6 px-3">
// //                               {index + 1}
// //                             </Badge>
// //                           </td>
// //                           <td className="align-middle fw-bold text-primary fs-6">
// //                             {user.name}
// //                           </td>
// //                           <td className="align-middle">
// //                             <span className="badge bg-light text-dark px-3 py-2">
// //                               {user.phone}
// //                             </span>
// //                           </td>
// //                           <td className="align-middle">
// //                             <small className="d-block text-muted mb-1">
// //                               {user.email}
// //                             </small>
// //                           </td>
// //                           <td className="align-middle">
// //                             <span className="px-3 py-2 bg-info bg-opacity-10 text-info rounded-pill small">
// //                               {user.place}
// //                             </span>
// //                           </td>
// //                           <td className="align-middle">
// //                             <Badge bg="success" className="px-3">
// //                               {user.country}
// //                             </Badge>
// //                           </td>
// //                           <td className="pe-4 align-middle">
// //                             <small className="text-muted">
// //                               {user.timestamp}
// //                             </small>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </Table>
// //                 </div>
// //               </div>
// //             )}

// //             <style jsx>{`
// //               .bg-gradient-primary {
// //                 background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
// //               }

// //               .table-header-gradient {
// //                 background: linear-gradient(
// //                   135deg,
// //                   #e3f2fd 0%,
// //                   #bbdefb 100%
// //                 ) !important;
// //                 border-bottom: 3px solid #007bff !important;
// //               }

// //               .table-header-gradient th {
// //                 color: #1e3a8a !important;
// //                 font-weight: 700 !important;
// //                 border: none !important;
// //                 text-transform: uppercase;
// //                 letter-spacing: 0.5px;
// //                 font-size: 0.85rem;
// //               }

// //               .modern-table {
// //                 --bs-table-bg: #ffffff;
// //                 --bs-table-striped-bg: rgba(0, 123, 255, 0.03);
// //                 --bs-table-hover-bg: rgba(0, 123, 255, 0.06);
// //               }

// //               .modern-table tbody tr {
// //                 transition: all 0.2s ease;
// //                 border-bottom: 1px solid #e9ecef;
// //               }

// //               .modern-table tbody tr:hover {
// //                 transform: translateY(-1px);
// //                 box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
// //               }

// //               .user-row td {
// //                 border-color: transparent;
// //                 padding: 1.2rem 0.75rem;
// //                 vertical-align: middle;
// //               }

// //               .shadow-lg {
// //                 box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
// //               }

// //               @media (max-width: 768px) {
// //                 .user-row td {
// //                   padding: 0.75rem 0.5rem;
// //                   font-size: 0.9rem;
// //                 }
// //               }
// //             `}</style>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Button,
//   Alert,
//   Badge,
//   Form,
//   InputGroup,
//   Dropdown,
//   Modal,
//   DropdownButton,
// } from "react-bootstrap";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchField, setSearchField] = useState("name");
//   const [statusFilter, setStatusFilter] = useState("all"); // all, pending, approved, rejected
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     // Ensure all users have status and id
//     const usersWithStatus = storedUsers.map((user) => ({
//       ...user,
//       id: user.id || Date.now() + Math.random(),
//       status: user.status || "pending",
//     }));
//     setUsers(usersWithStatus);
//   }, []);

//   const updateUserStatus = (userId, newStatus) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, status: newStatus } : user
//       )
//     );
//     // Persist to localStorage
//     localStorage.setItem(
//       "users",
//       JSON.stringify(
//         users.map((user) =>
//           user.id === userId ? { ...user, status: newStatus } : user
//         )
//       )
//     );
//   };

//   const deleteUser = () => {
//     if (userToDelete) {
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => user.id !== userToDelete.id)
//       );
//       localStorage.setItem(
//         "users",
//         JSON.stringify(users.filter((user) => user.id !== userToDelete.id))
//       );
//       setShowDeleteModal(false);
//       setUserToDelete(null);
//     }
//   };

//   // Combined filtering: search + status
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = (user[searchField]?.toLowerCase() || "").includes(
//       searchTerm.toLowerCase()
//     );
//     const matchesStatus =
//       statusFilter === "all" || user.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Status counts
//   const statusCounts = {
//     pending: users.filter((u) => u.status === "pending").length,
//     approved: users.filter((u) => u.status === "approved").length,
//     rejected: users.filter((u) => u.status === "rejected").length,
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "approved":
//         return (
//           <Badge bg="success" className="px-3 py-2 fs-6">
//             <i className="bi bi-check-circle-fill me-1"></i>Approved
//           </Badge>
//         );
//       case "rejected":
//         return (
//           <Badge bg="danger" className="px-3 py-2 fs-6">
//             <i className="bi bi-x-circle-fill me-1"></i>Rejected
//           </Badge>
//         );
//       default:
//         return (
//           <Badge bg="warning" className="px-3 py-2 fs-6">
//             <i className="bi bi-clock-fill me-1"></i>Pending
//           </Badge>
//         );
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminSession");
//     navigate("/");
//   };

//   return (
//     <div className="min-vh-100 bg-light">
//       <Container className="py-5">
//         <Row className="justify-content-center">
//           <Col lg={12}>
//             {/* Header */}
//             <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-lg">
//               <h2 className="text-dark mb-0 fw-bold">
//                 <i className="bi bi-shield-check me-2 text-primary"></i>
//                 Admin Dashboard
//               </h2>
//               <Button
//                 variant="danger"
//                 onClick={handleLogout}
//                 className="px-4 py-2 fs-6 fw-bold"
//               >
//                 <i className="bi bi-box-arrow-right me-2"></i>Logout
//               </Button>
//             </div>

//             {/* Stats Cards */}
//             <Row className="mb-4 g-3">
//               <Col md={4}>
//                 <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-primary h-100">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-primary bg-opacity-3 p-3 rounded-3 me-3">
//                       <i className="bi bi-people-fill fs-3 text-primary"></i>
//                     </div>
//                     <div>
//                       <h5 className="mb-1 fw-bold text-primary">
//                         {users.length}
//                       </h5>
//                       <small className="text-muted">Total Users</small>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//               <Col md={4}>
//                 <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-warning h-100">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-warning bg-opacity-3 p-3 rounded-3 me-3">
//                       <i className="bi bi-clock-fill fs-3 text-warning"></i>
//                     </div>
//                     <div>
//                       <h5 className="mb-1 fw-bold text-warning">
//                         {statusCounts.pending}
//                       </h5>
//                       <small className="text-muted">Pending</small>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//               <Col md={4}>
//                 <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-success h-100">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-success bg-opacity-3 p-3 rounded-3 me-3">
//                       <i className="bi bi-check-circle-fill fs-3 text-success"></i>
//                     </div>
//                     <div>
//                       <h5 className="mb-1 fw-bold text-success">
//                         {statusCounts.approved}
//                       </h5>
//                       <small className="text-muted">Approved</small>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//               <Col md={4}>
//                 <div className="bg-white p-4 rounded-4 shadow-sm border-start border-5 border-danger h-100 w-100">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-danger bg-opacity-3 p-3 rounded-3 me-3">
//                       <i className="bi bi-check-circle-fill fs-3 text-danger"></i>
//                     </div>
//                     <div>
//                       <h5 className="mb-1 fw-bold text-danger">
//                         {statusCounts.rejected}
//                       </h5>
//                       <small className="text-muted">Rejected</small>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </Row>

//             {/* Filters & Search */}
//             <div className="bg-white p-4 rounded-4 shadow-lg mb-4">
//               <Row className="align-items-end g-3">
//                 <Col md={3}>
//                   <Form.Label className="fw-bold mb-2">
//                     Status Filter
//                   </Form.Label>
//                   <Form.Select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                   >
//                     <option value="all">All Status</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                   </Form.Select>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Label className="fw-bold mb-2">Search Field</Form.Label>
//                   <Form.Select
//                     value={searchField}
//                     onChange={(e) => setSearchField(e.target.value)}
//                   >
//                     <option value="name">Name</option>
//                     <option value="phone">Phone</option>
//                     <option value="email">Email</option>
//                     <option value="place">Place</option>
//                     <option value="country">Country</option>
//                   </Form.Select>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Label className="fw-bold mb-2">Search</Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type="text"
//                       placeholder={`Search ${searchField}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <Button
//                       variant="outline-secondary"
//                       onClick={() => setSearchTerm("")}
//                     >
//                       Clear
//                     </Button>
//                   </InputGroup>
//                 </Col>
//                 <Col md={2}>
//                   <Button
//                     variant="primary"
//                     className="w-100"
//                     onClick={() => {
//                       setSearchTerm("");
//                       setStatusFilter("all");
//                     }}
//                   >
//                     Show All
//                   </Button>
//                 </Col>
//               </Row>
//               <Alert
//                 variant="info"
//                 className="mt-3 mb-0 bg-primary bg-opacity-10 border-0"
//               >
//                 <strong>
//                   Total: {users.length} | Filtered: {filteredUsers.length}
//                 </strong>
//               </Alert>
//             </div>

//             {/* Users Table */}
//             {filteredUsers.length === 0 ? (
//               <Alert
//                 variant="warning"
//                 className="text-center bg-gradient shadow-lg border-0 py-5 rounded-4"
//               >
//                 <div className="d-flex align-items-center justify-content-center">
//                   <i className="bi bi-search fs-1 me-3 opacity-75"></i>
//                   <div>
//                     <h4 className="mb-2 fw-bold">No Results Found</h4>
//                     <p className="mb-0">
//                       {searchTerm || statusFilter !== "all"
//                         ? `No users match current filters.`
//                         : "No registrations yet."}
//                     </p>
//                   </div>
//                 </div>
//               </Alert>
//             ) : (
//               <div className="bg-white rounded-4 shadow-xl overflow-hidden border-0">
//                 <div className="p-4 bg-gradient-primary text-white">
//                   <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//                     <h5 className="mb-0 fw-bold">
//                       <i className="bi bi-people-fill me-2"></i>
//                       Registered Users ({filteredUsers.length})
//                     </h5>
//                     <div className="d-flex gap-2">
//                       <Badge bg="warning" text-dark className="px-3 py-2">
//                         Pending: {statusCounts.pending}
//                       </Badge>
//                       <Badge bg="success" className="px-3 py-2">
//                         Approved: {statusCounts.approved}
//                       </Badge>
//                       <Badge bg="danger" className="px-3 py-2">
//                         Rejected: {statusCounts.rejected}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="table-responsive position-relative"
//                   style={{ zIndex: 1 }}
//                 >
//                   <Table
//                     responsive
//                     hover
//                     className="mb-0 modern-table"
//                     style={{ zIndex: 1 }}
//                   >
//                     <thead>
//                       <tr className="table-header-gradient">
//                         <th className="ps-4 py-4" style={{ zIndex: 2 }}>
//                           <i className="bi bi-hash me-2"></i>ID
//                         </th>
//                         <th className="py-4" style={{ zIndex: 2 }}>
//                           Name
//                         </th>
//                         <th className="py-4" style={{ zIndex: 2 }}>
//                           Phone
//                         </th>
//                         <th className="py-4" style={{ zIndex: 2 }}>
//                           Email
//                         </th>
//                         <th className="py-4" style={{ zIndex: 2 }}>
//                           Location
//                         </th>
//                         <th className="py-4" style={{ zIndex: 2 }}>
//                           Status
//                         </th>
//                         <th className="pe-4 py-4" style={{ zIndex: 2 }}>
//                           <i className="bi bi-gear-fill me-2"></i>Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredUsers.map((user, index) => (
//                         <tr
//                           key={user.id}
//                           className="user-row position-relative"
//                           style={{ zIndex: 3 }}
//                         >
//                           {/* Your existing TDs stay same until Actions */}
//                           <td className="ps-4 align-middle">
//                             <Badge
//                               bg="primary"
//                               className="fs-6 px-3 py-2 fw-bold"
//                             >
//                               #{index + 1}
//                             </Badge>
//                           </td>
//                           <td className="align-middle fw-bold text-primary fs-6 py-4">
//                             {user.name}
//                           </td>
//                           <td className="align-middle py-4">
//                             <Badge className="px-4 py-2 fs-6 bg-light text-dark">
//                               {user.phone}
//                             </Badge>
//                           </td>
//                           <td className="align-middle py-4">
//                             <span className="d-block text-muted fw-medium">
//                               {user.email}
//                             </span>
//                           </td>
//                           <td className="align-middle py-4">
//                             <div>
//                               <div className="fw-bold text-info">
//                                 {user.place}
//                               </div>
//                               <small className="text-muted">
//                                 {user.country}
//                               </small>
//                             </div>
//                           </td>
//                           <td className="align-middle py-4">
//                             <div
//                               className="position-relative"
//                               style={{ zIndex: 4 }}
//                             >
//                               {getStatusBadge(user.status)}
//                             </div>
//                           </td>

//                           <td
//                             className="pe-4 align-middle py-4 position-relative"
//                             style={{ zIndex: 1050 }}
//                           >
//                             {/* <DropdownButton
//                               title={
//                                 <span className="dropdown-toggle-compact">
//                                   <i className="bi bi-three-dots-vertical text-dark fs-4 fw-bold"></i>
//                                 </span>
//                               }
//                               variant="dark"
//                               className="dropdown-compact shadow-sm border-0"
//                               drop={index < 2 ? "down" : "up"} // SMART: Top rows down, bottom rows up
//                               menuVariant="dark"
//                               size="sm"
//                               style={{ width: "44px", height: "44px" }}
//                             > */}

//                             <DropdownButton
//                               container="body"
//                               align="end"
//                               title={
//                                 <i className="bi bi-three-dots-vertical fs-5"></i>
//                               }
//                               variant="light"
//                               className="action-dropdown"
//                               drop={index < 3 ? "down" : "up"}
//                               size="sm"
//                             >
//                               {/* Your existing dropdown items stay same */}
//                               <Dropdown.Item
//                                 onClick={() =>
//                                   updateUserStatus(user.id, "pending")
//                                 }
//                                 className="px-3 py-2 dropdown-item-compact"
//                               >
//                                 <i className="bi bi-clock-fill text-warning me-2"></i>
//                                 Pending
//                               </Dropdown.Item>
//                               <Dropdown.Item
//                                 onClick={() =>
//                                   updateUserStatus(user.id, "approved")
//                                 }
//                                 className="px-3 py-2 dropdown-item-compact"
//                               >
//                                 <i className="bi bi-check-circle-fill text-success me-2"></i>
//                                 Approved
//                               </Dropdown.Item>
//                               <Dropdown.Item
//                                 onClick={() =>
//                                   updateUserStatus(user.id, "rejected")
//                                 }
//                                 className="px-3 py-2 dropdown-item-compact"
//                               >
//                                 <i className="bi bi-x-circle-fill text-danger me-2"></i>
//                                 Rejected
//                               </Dropdown.Item>
//                               <Dropdown.Divider />
//                               <Dropdown.Item
//                                 onClick={() => {
//                                   setUserToDelete(user);
//                                   setShowDeleteModal(true);
//                                 }}
//                                 className="px-3 py-2 text-danger fw-bold dropdown-item-compact"
//                               >
//                                 <i className="bi bi-trash3-fill text-danger me-2"></i>
//                                 Delete
//                               </Dropdown.Item>
//                             </DropdownButton>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             <Modal
//               show={showDeleteModal}
//               onHide={() => setShowDeleteModal(false)}
//               centered
//               size="sm"
//             >
//               <Modal.Header
//                 closeButton
//                 className="bg-danger bg-opacity-10 border-0"
//               >
//                 <Modal.Title className="text-danger">
//                   <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                   Confirm Delete
//                 </Modal.Title>
//               </Modal.Header>
//               <Modal.Body className="text-center py-4">
//                 <i className="bi bi-person-x-fill fs-1 text-danger mb-3 opacity-75"></i>
//                 <h5 className="fw-bold mb-2">Delete {userToDelete?.name}?</h5>
//                 <p className="text-muted mb-0">This action cannot be undone.</p>
//               </Modal.Body>
//               <Modal.Footer className="border-0 justify-content-center pt-0">
//                 <Button
//                   variant="outline-secondary"
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button variant="danger" onClick={deleteUser}>
//                   <i className="bi bi-trash me-2"></i>Delete
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </Col>
//         </Row>
//       </Container>

//       <style jsx>{`
//         .bg-gradient-primary {
//           background: linear-gradient(
//             135deg,
//             #007bff 0%,
//             #0056b3 50%,
//             #004085 100%
//           );
//         }

//         .table-header-gradient {
//           background: linear-gradient(
//             135deg,
//             #e3f2fd 0%,
//             #bbdefb 50%,
//             #90caf9 100%
//           ) !important;
//           border-bottom: 4px solid #007bff !important;
//         }

//         .table-header-gradient th {
//           color: #1e3a8a !important;
//           font-weight: 700 !important;
//           border: none !important;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           font-size: 0.875rem;
//         }

//         .modern-table {
//           --bs-table-bg: #ffffff;
//           --bs-table-striped-bg: rgba(0, 123, 255, 0.025);
//           --bs-table-hover-bg: rgba(0, 123, 255, 0.05);
//         }

//         .modern-table tbody tr {
//           transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
//           border-bottom: 1px solid #f8f9fa;
//         }

//         .modern-table tbody tr:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(0, 123, 255, 0.12);
//         }

//         .user-row td {
//           border-color: transparent;
//           padding: 1.5rem 1rem;
//           vertical-align: middle;
//           transition: all 0.2s ease;
//         }

//         .shadow-lg {
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
//         }

//         .shadow-xl {
//           box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.15) !important;
//         }

//         /* ===== ACTION DROPDOWN – SAFE ZONE ===== */

//         .action-dropdown {
//           position: relative;
//           z-index: 1;
//         }

//         .action-dropdown .dropdown-toggle {
//           background: transparent !important;
//           border: none !important;
//           box-shadow: none !important;
//         }

//         .action-dropdown .dropdown-menu {
//           z-index: 99999 !important;
//           position: absolute !important;
//           min-width: 180px;
//           border-radius: 14px;
//           padding: 6px;
//           background: #1f2937; /* dark slate */
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
//           border: none;
//         }

//         /* Dropdown items */
//         .action-dropdown .dropdown-item {
//           color: #f9fafb;
//           font-weight: 500;
//           border-radius: 10px;
//           padding: 10px 14px;
//           transition: all 0.2s ease;
//         }

//         /* Hover effect */
//         .action-dropdown .dropdown-item:hover {
//           background: rgba(255, 255, 255, 0.12);
//           transform: translateX(4px);
//         }

//         /* Divider */
//         .action-dropdown .dropdown-divider {
//           border-color: rgba(255, 255, 255, 0.15);
//         }

//         /* Danger item */
//         .action-dropdown .dropdown-item.text-danger:hover {
//           background: rgba(220, 53, 69, 0.15);
//         }

//         /* Fix table row height consistency */
//         .user-row {
//           min-height: 80px;
//         }

//         /* Perfect Mobile Responsiveness */
//         @media (max-width: 768px) {
//           .user-row td {
//             padding: 1rem 0.75rem;
//             font-size: 0.925rem;
//           }

//           .table-responsive {
//             border-radius: 1rem;
//           }

//           .stats-card {
//             margin-bottom: 1rem;
//           }
//         }

//         @media (max-width: 576px) {
//           .d-flex.flex-wrap.gap-2 {
//             flex-direction: column;
//             gap: 0.5rem;
//           }

//           .user-row td {
//             padding: 0.875rem 0.5rem;
//           }
//         }

//         /* Smooth animations */
//         * {
//           scrollbar-width: thin;
//           scrollbar-color: #007bff #f1f5f9;
//         }

//         // .dropdown-menu {
//         //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//         //   border: 1px solid rgba(0, 123, 255, 0.2);
//         // }

//         // .dropdown-item:hover {
//         //   background-color: rgba(0, 123, 255, 0.1) !important;
//         //   color: #007bff !important;
//         // }
//       `}</style>
//     </div>
//   );
// };

// export default AdminDashboard;

// // import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Badge,
// //   Form,
// //   InputGroup,
// //   Dropdown,
// //   Card,
// //   Button,
// //   ProgressBar,
// //   OverlayTrigger,
// //   Tooltip,
// // } from "react-bootstrap";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searchField, setSearchField] = useState("name");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [hoveredCard, setHoveredCard] = useState(null);
// //   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
// //     const realUsers = storedUsers.filter(
// //       (user) => !(user.name === "sasiraja" && user.phone === "1234567890")
// //     );
// //     setUsers(realUsers);
// //   }, []);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext('2d');
// //     let animationId;
// //     const particles = [];

// //     const resizeCanvas = () => {
// //       canvas.width = window.innerWidth;
// //       canvas.height = window.innerHeight;
// //     };
// //     resizeCanvas();

// //     class Particle {
// //       constructor() {
// //         this.x = Math.random() * canvas.width;
// //         this.y = Math.random() * canvas.height;
// //         this.size = Math.random() * 2 + 1;
// //         this.speedX = Math.random() * 0.5 - 0.25;
// //         this.speedY = Math.random() * 0.5 - 0.25;
// //         this.vx = 0;
// //         this.vy = 0;
// //       }

// //       update() {
// //         const dx = mousePos.x - this.x;
// //         const dy = mousePos.y - this.y;
// //         const distance = Math.sqrt(dx * dx + dy * dy);

// //         if (distance < 100) {
// //           this.vx = (dx / distance) * 2;
// //           this.vy = (dy / distance) * 2;
// //         } else {
// //           this.vx *= 0.95;
// //           this.vy *= 0.95;
// //         }

// //         this.x += this.speedX + this.vx;
// //         this.y += this.speedY + this.vy;

// //         if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
// //         if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
// //       }

// //       draw() {
// //         ctx.save();
// //         ctx.globalAlpha = 0.6;
// //         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
// //         ctx.shadowColor = 'rgba(102, 126, 234, 0.8)';
// //         ctx.shadowBlur = 10;
// //         ctx.beginPath();
// //         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.restore();
// //       }
// //     }

// //     for (let i = 0; i < 100; i++) {
// //       particles.push(new Particle());
// //     }

// //     const animate = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);

// //       particles.forEach(particle => {
// //         particle.update();
// //         particle.draw();
// //       });

// //       // Connect nearby particles
// //       for (let i = 0; i < particles.length; i++) {
// //         for (let j = i; j < particles.length; j++) {
// //           const dx = particles[i].x - particles[j].x;
// //           const dy = particles[i].y - particles[j].y;
// //           const distance = Math.sqrt(dx * dx + dy * dy);

// //           if (distance < 80) {
// //             ctx.strokeStyle = `rgba(102, 126, 234, ${1 - distance / 80})`;
// //             ctx.lineWidth = 1;
// //             ctx.shadowBlur = 5;
// //             ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
// //             ctx.beginPath();
// //             ctx.moveTo(particles[i].x, particles[i].y);
// //             ctx.lineTo(particles[j].x, particles[j].y);
// //             ctx.stroke();
// //           }
// //         }
// //       }

// //       animationId = requestAnimationFrame(animate);
// //     };
// //     animate();

// //     const handleMouseMove = (e) => {
// //       setMousePos({ x: e.clientX, y: e.clientY });
// //     };

// //     window.addEventListener('mousemove', handleMouseMove);
// //     window.addEventListener('resize', resizeCanvas);

// //     return () => {
// //       window.removeEventListener('mousemove', handleMouseMove);
// //       window.removeEventListener('resize', resizeCanvas);
// //       cancelAnimationFrame(animationId);
// //     };
// //   }, [mousePos]);

// //   const filteredUsers = useMemo(() => {
// //     return users.filter((user) => {
// //       if (statusFilter !== "all" && user.status !== statusFilter) return false;
// //       const value = user[searchField]?.toLowerCase() || "";
// //       return value.includes(searchTerm.toLowerCase());
// //     });
// //   }, [users, searchTerm, searchField, statusFilter]);

// //   const updateStatus = useCallback((userId, newStatus) => {
// //     const updatedUsers = users.map((user) =>
// //       user.id === userId ? { ...user, status: newStatus } : user
// //     );
// //     setUsers(updatedUsers);
// //     localStorage.setItem("users", JSON.stringify(updatedUsers));
// //   }, [users]);

// //   const deleteUser = useCallback((userId) => {
// //     if (window.confirm("Delete this user permanently?")) {
// //       const updatedUsers = users.filter((user) => user.id !== userId);
// //       setUsers(updatedUsers);
// //       localStorage.setItem("users", JSON.stringify(updatedUsers));
// //     }
// //   }, [users]);

// //   const handleLogout = useCallback(() => {
// //     localStorage.removeItem("adminSession");
// //     navigate("/");
// //   }, [navigate]);

// //   const getStatusConfig = (status) => {
// //     const configs = {
// //       approved: {
// //         gradient: '135deg, #00b09b, #96c93d',
// //         glow: '#00b09b',
// //         icon: 'bi-check-circle-fill',
// //         text: 'APPROVED'
// //       },
// //       rejected: {
// //         gradient: '135deg, #f093fb, #f5576c',
// //         glow: '#f5576c',
// //         icon: 'bi-x-circle-fill',
// //         text: 'REJECTED'
// //       },
// //       pending: {
// //         gradient: '135deg, #667eea, #764ba2',
// //         glow: '#667eea',
// //         icon: 'bi-clock-fill',
// //         text: 'PENDING'
// //       }
// //     };
// //     return configs[status] || configs.pending;
// //   };

// //   const getStatusCount = (status) => {
// //     return users.filter((u) =>
// //       (status === 'pending' ? (!u.status || u.status === status) : u.status === status)
// //     ).length;
// //   };

// //   return (
// //     <>
// //       <canvas
// //         ref={canvasRef}
// //         className="particles-canvas"
// //         style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
// //       />
// //       <div className="admin-dashboard-ultimate">
// //         {/* HERO HEADER WITH PARALLAX */}
// //         <div className="hero-header-ultimate">
// //           <div className="hero-overlay"></div>
// //           <div className="hero-content">
// //             <Container>
// //               <Row className="align-items-center">
// //                 <Col lg={8}>
// //                   <div className="hero-text">
// //                     <div className="badge-hero mb-3">ULTIMATE ADMIN v3.0</div>
// //                     <h1 className="hero-title">
// //                       Advanced User<br />
// //                       <span className="gradient-text">Management</span> System
// //                     </h1>
// //                     <p className="hero-subtitle">
// //                       Enterprise-grade dashboard with real-time analytics and intelligent user insights
// //                     </p>
// //                   </div>
// //                 </Col>
// //                 <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
// //                   <div className="stats-metrics">
// //                     <div className="metric-item">
// //                       <span className="metric-number">{users.length}</span>
// //                       <span>Total Users</span>
// //                     </div>
// //                     <div className="metric-item">
// //                       <span className="metric-number success">{getStatusCount('approved')}</span>
// //                       <span>Approved</span>
// //                     </div>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Container>
// //           </div>
// //         </div>

// //         <Container className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
// //           {/* ADVANCED STAT WIDGETS */}
// //           <Row className="mb-6 g-4">
// //             {[
// //               { count: users.length, label: 'Total Users', icon: 'bi-people-fill', type: 'total' },
// //               { count: getStatusCount('pending'), label: 'Pending Review', icon: 'bi-clock-history', type: 'pending' },
// //               { count: getStatusCount('approved'), label: 'Active Users', icon: 'bi-check-circle-fill', type: 'success' },
// //               { count: getStatusCount('rejected'), label: 'Declined', icon: 'bi-x-circle-fill', type: 'danger' },
// //             ].map(({ count, label, icon, type }, index) => (
// //               <Col lg={3} key={index}>
// //                 <div className={`widget-premium ${type} floating-widget`}>
// //                   <div className="widget-inner">
// //                     <div className="widget-icon">
// //                       <i className={`bi ${icon}`}></i>
// //                     </div>
// //                     <div className="widget-content">
// //                       <div className="count-animated" data-target={count}>
// //                         {count.toLocaleString()}
// //                       </div>
// //                       <div className="widget-label">{label}</div>
// //                     </div>
// //                   </div>
// //                   <div className="widget-glow-ring"></div>
// //                 </div>
// //               </Col>
// //             ))}
// //           </Row>

// //           {/* COMMAND CENTER */}
// //           <Card className="command-center shadow-4xl mb-6">
// //             <Card.Body className="p-5">
// //               <div className="command-header d-flex justify-content-between align-items-center mb-4">
// //                 <h4 className="command-title">
// //                   <i className="bi bi-command me-2"></i>Command Center
// //                 </h4>
// //                 <div className="command-stats">
// //                   <span className="live-indicator"></span>
// //                   Live: {filteredUsers.length}/{users.length} users
// //                 </div>
// //               </div>
// //               <Row className="g-4 align-items-end">
// //                 <Col md={2}>
// //                   <label className="form-label-ultimate">Status Filter</label>
// //                   <div className="select-wrapper">
// //                     <Form.Select
// //                       value={statusFilter}
// //                       onChange={(e) => setStatusFilter(e.target.value)}
// //                       className="select-ultimate"
// //                     >
// //                       <option value="all">All Status ({users.length})</option>
// //                       <option value="pending">⏳ Pending ({getStatusCount('pending')})</option>
// //                       <option value="approved">✅ Approved ({getStatusCount('approved')})</option>
// //                       <option value="rejected">❌ Rejected ({getStatusCount('rejected')})</option>
// //                     </Form.Select>
// //                   </div>
// //                 </Col>
// //                 <Col md={2}>
// //                   <label className="form-label-ultimate">Search Field</label>
// //                   <div className="select-wrapper">
// //                     <Form.Select
// //                       value={searchField}
// //                       onChange={(e) => setSearchField(e.target.value)}
// //                       className="select-ultimate"
// //                     >
// //                       <option value="name">👤 Name</option>
// //                       <option value="phone">📱 Phone</option>
// //                       <option value="email">✉️ Email</option>
// //                       <option value="place">📍 Location</option>
// //                       <option value="country">🌍 Country</option>
// //                     </Form.Select>
// //                   </div>
// //                 </Col>
// //                 <Col md={6}>
// //                   <label className="form-label-ultimate">Global Search</label>
// //                   <InputGroup className="input-group-ultimate">
// //                     <Form.Control
// //                       type="text"
// //                       placeholder={`Search ${searchField.toUpperCase()} across ${users.length} records...`}
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                       className="input-ultimate"
// //                     />
// //                     {searchTerm && (
// //                       <Button className="clear-btn-ultimate" onClick={() => setSearchTerm("")}>
// //                         <i className="bi bi-x-circle-fill"></i>
// //                       </Button>
// //                     )}
// //                   </InputGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                   <Button className="reset-btn-ultimate w-100" onClick={() => {
// //                     setSearchTerm("");
// //                     setStatusFilter("all");
// //                   }}>
// //                     <i className="bi bi-arrow-repeat me-2"></i>Reset All
// //                   </Button>
// //                 </Col>
// //               </Row>
// //               <div className="metrics-footer mt-4 pt-4">
// //                 <div className="progress-metrics">
// //                   <ProgressBar
// //                     now={(getStatusCount('approved')/users.length)*100 || 0}
// //                     className="progress-ultimate"
// //                     label={`Approval Rate: ${Math.round((getStatusCount('approved')/users.length)*100)}%`}
// //                   />
// //                 </div>
// //               </div>
// //             </Card.Body>
// //           </Card>

// //           {/* ULTIMATE USER CARDS */}
// //           {filteredUsers.length === 0 ? (
// //             <div className="empty-state-ultimate text-center py-8">
// //               <div className="empty-icon">
// //                 <i className="bi bi-people-fill"></i>
// //               </div>
// //               <h3 className="empty-title">No Users Found</h3>
// //               <p className="empty-subtitle">Try adjusting your filters or search terms</p>
// //               <Button className="empty-action-btn" onClick={() => {
// //                 setSearchTerm("");
// //                 setStatusFilter("all");
// //               }}>
// //                 Clear Filters & Search
// //               </Button>
// //             </div>
// //           ) : (
// //             <Row className="g-5 user-grid-ultimate">
// //               {filteredUsers.map((user) => {
// //                 const statusConfig = getStatusConfig(user.status || 'pending');
// //                 return (
// //                   <Col lg={6} xl={4} xxl={3} key={user.id}>
// //                     <div
// //                       className={`user-card-ultimate-wrapper ${hoveredCard === user.id ? 'elevated' : ''}`}
// //                       onMouseEnter={() => setHoveredCard(user.id)}
// //                       onMouseLeave={() => setHoveredCard(null)}
// //                     >
// //                       <Card className={`user-card-ultimate ${user.status || 'pending'}`}>
// //                         <div className="card-shine"></div>
// //                         <Card.Header className="header-gradient" style={{
// //                           background: `linear-gradient(${statusConfig.gradient})`
// //                         }}>
// //                           <div className="user-header-content">
// //                             <div className="avatar-premium">
// //                               <i className="bi bi-person-circle"></i>
// //                               <div className="avatar-glow"></div>
// //                             </div>
// //                             <div className="user-header-text">
// //                               <h5>{user.name}</h5>
// //                               <div className="user-meta">{user.email}</div>
// //                             </div>
// //                           </div>
// //                           <div className={`status-badge-ultimate ${user.status || 'pending'}`}>
// //                             <i className={statusConfig.icon}></i>
// //                             {statusConfig.text}
// //                           </div>
// //                         </Card.Header>

// //                         <Card.Body className="body-neomorphic">
// //                           <div className="info-matrix">
// //                             <div className="info-row">
// //                               <div className="info-cell">
// //                                 <i className="bi bi-telephone-fill"></i>
// //                                 <span>{user.phone}</span>
// //                               </div>
// //                               <div className="info-cell">
// //                                 <i className="bi bi-geo-alt-fill"></i>
// //                                 <span>{user.place}</span>
// //                               </div>
// //                             </div>
// //                             <div className="info-row">
// //                               <div className="info-cell">
// //                                 <i className="bi bi-globe2"></i>
// //                                 <span>{user.country}</span>
// //                               </div>
// //                               <div className="info-cell">
// //                                 <i className="bi bi-calendar-check-fill"></i>
// //                                 <span>{user.timestamp}</span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </Card.Body>

// //                         <Card.Footer className="footer-controls">
// //                           <div className="control-group">
// //                             <select
// //                               className="status-switcher"
// //                               value={user.status || "pending"}
// //                               onChange={(e) => updateStatus(user.id, e.target.value)}
// //                             >
// //                               <option value="pending">⏳ Pending</option>
// //                               <option value="approved">✅ Approved</option>
// //                               <option value="rejected">❌ Rejected</option>
// //                             </select>
// //                             <Button
// //                               className="delete-btn-ultimate"
// //                               onClick={() => deleteUser(user.id)}
// //                             >
// //                               <i className="bi bi-trash3-fill"></i>
// //                             </Button>
// //                           </div>
// //                         </Card.Footer>
// //                       </Card>
// //                     </div>
// //                   </Col>
// //                 );
// //               })}
// //             </Row>
// //           )}
// //         </Container>
// //       </div>

// //       <style jsx>{`
// //         :global(.admin-dashboard-ultimate) {
// //           min-height: 100vh;
// //           font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
// //           overflow-x: hidden;
// //         }

// //         /* PARTICLE SYSTEM */
// //         :global(.particles-canvas) {
// //           pointer-events: none;
// //         }

// //         /* HERO HEADER */
// //         :global(.hero-header-ultimate) {
// //           position: relative;
// //           height: 400px;
// //           display: flex;
// //           align-items: center;
// //           background: linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #667eea 100%);
// //           overflow: hidden;
// //         }

// //         :global(.hero-overlay) {
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background:
// //             radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%),
// //             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
// //             radial-gradient(circle at 40% 40%, rgba(120,219,255,0.2) 0%, transparent 50%);
// //           animation: heroFloat 20s ease-in-out infinite;
// //         }

// //         @keyframes heroFloat {
// //           0%, 100% { transform: translateY(0px) rotate(0deg); }
// //           33% { transform: translateY(-30px) rotate(1deg); }
// //           66% { transform: translateY(-10px) rotate(-1deg); }
// //         }

// //         :global(.hero-title) {
// //           font-size: clamp(2.5rem, 5vw, 4.5rem);
// //           font-weight: 900;
// //           background: linear-gradient(135deg, #fff, rgba(255,255,255,0.8));
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //           background-clip: text;
// //           line-height: 1.1;
// //           margin-bottom: 1.5rem;
// //         }

// //         :global(.badge-hero) {
// //           display: inline-flex;
// //           padding: 8px 20px;
// //           background: linear-gradient(135deg, #667eea, #764ba2);
// //           color: white;
// //           border-radius: 50px;
// //           font-weight: 700;
// //           font-size: 0.85rem;
// //           box-shadow: 0 10px 30px rgba(102,126,234,0.4);
// //         }

// //         /* WIDGETS */
// //         :global(.widget-premium) {
// //           position: relative;
// //           height: 160px;
// //           border-radius: 28px;
// //           padding: 2.5rem 2rem;
// //           cursor: pointer;
// //           transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
// //           overflow: hidden;
// //         }

// //         :global(.floating-widget) {
// //           background: rgba(255,255,255,0.1);
// //           backdrop-filter: blur(30px);
// //           border: 1px solid rgba(255,255,255,0.2);
// //         }

// //         :global(.floating-widget::before) {
// //           content: '';
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           height: 1px;
// //           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
// //         }

// //         :global(.widget-premium.total:hover) { background: rgba(102,126,234,0.3); }
// //         :global(.widget-premium.pending:hover) { background: rgba(255,193,7,0.3); }
// //         :global(.widget-premium.success:hover) { background: rgba(40,167,69,0.3); }
// //         :global(.widget-premium.danger:hover) { background: rgba(220,53,69,0.3); }

// //         :global(.widget-premium:hover) {
// //           transform: translateY(-15px) scale(1.03);
// //           box-shadow: 0 40px 100px rgba(0,0,0,0.4);
// //         }

// //         :global(.widget-icon i) {
// //           font-size: 2.5rem;
// //           color: white;
// //           filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
// //         }

// //         :global(.count-animated) {
// //           font-size: 3rem;
// //           font-weight: 900;
// //           background: linear-gradient(135deg, #fff, rgba(255,255,255,0.8));
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //           line-height: 1;
// //         }

// //         /* COMMAND CENTER */
// //         :global(.command-center) {
// //           border-radius: 32px !important;
// //           border: none !important;
// //           background: rgba(255,255,255,0.95) !important;
// //           backdrop-filter: blur(40px) !important;
// //           box-shadow:
// //             0 50px 100px rgba(0,0,0,0.25),
// //             inset 0 1px 0 rgba(255,255,255,0.8) !important;
// //         }

// //         :global(.live-indicator) {
// //           display: inline-block;
// //           width: 12px;
// //           height: 12px;
// //           background: #00ff88;
// //           border-radius: 50%;
// //           animation: pulse 2s infinite;
// //           margin-right: 8px;
// //         }

// //         @keyframes pulse {
// //           0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.7); }
// //           70% { box-shadow: 0 0 0 10px rgba(0,255,136,0); }
// //           100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); }
// //         }

// //         /* USER CARDS ULTIMATE */
// //         :global(.user-card-ultimate-wrapper) {
// //           perspective: 1000px;
// //         }

// //         :global(.user-card-ultimate) {
// //           height: 100%;
// //           border-radius: 32px;
// //           border: none;
// //           background: rgba(255,255,255,0.95);
// //           backdrop-filter: blur(40px);
// //           box-shadow:
// //             0 35px 80px rgba(0,0,0,0.25),
// //             inset 0 1px 0 rgba(255,255,255,0.8);
// //           transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         :global(.user-card-ultimate-wrapper.elevated .user-card-ultimate) {
// //           transform: translateY(-25px) rotateX(5deg) scale(1.02);
// //           box-shadow: 0 60px 150px rgba(0,0,0,0.4);
// //           z-index: 20;
// //         }

// //         :global(.card-shine) {
// //           position: absolute;
// //           top: -100%;
// //           left: -100%;
// //           width: 200%;
// //           height: 200%;
// //           background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4), transparent 70%);
// //           transition: all 0.6s ease;
// //         }

// //         :global(.user-card-ultimate-wrapper:hover .card-shine) {
// //           top: -50%;
// //           left: -50%;
// //         }

// //         :global(.header-gradient) {
// //           padding: 2rem;
// //           border-radius: 32px 32px 0 0;
// //           position: relative;
// //           overflow: hidden;
// //         }

// //         :global(.avatar-premium) {
// //           position: relative;
// //           width: 64px;
// //           height: 64px;
// //           margin-right: 1.5rem;
// //         }

// //         :global(.avatar-premium i) {
// //           font-size: 2.2rem;
// //           color: white;
// //         }

// //         :global(.avatar-glow) {
// //           position: absolute;
// //           top: -8px;
// //           left: -8px;
// //           right: -8px;
// //           bottom: -8px;
// //           background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
// //           border-radius: 50%;
// //           z-index: -1;
// //           animation: avatarPulse 3s infinite;
// //         }

// //         @keyframes avatarPulse {
// //           0%, 100% { opacity: 0.7; transform: scale(1); }
// //           50% { opacity: 1; transform: scale(1.05); }
// //         }

// //         /* INFO MATRIX */
// //         :global(.info-matrix) {
// //           padding: 2rem;
// //         }

// //         :global(.info-row) {
// //           display: flex;
// //           gap: 1.5rem;
// //           margin-bottom: 1.5rem;
// //         }

// //         :global(.info-row:last-child) {
// //           margin-bottom: 0;
// //         }

// //         :global(.info-cell) {
// //           flex: 1;
// //           display: flex;
// //           align-items: center;
// //           gap: 1rem;
// //           padding: 1.5rem;
// //           background: rgba(255,255,255,0.5);
// //           border-radius: 20px;
// //           transition: all 0.4s ease;
// //           border: 1px solid rgba(255,255,255,0.3);
// //         }

// //         :global(.info-cell:hover) {
// //           background: rgba(255,255,255,0.8);
// //           transform: translateY(-5px);
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.15);
// //         }

// //         :global(.info-cell i) {
// //           font-size: 1.5rem;
// //           color: #667eea;
// //           width: 40px;
// //           text-align: center;
// //         }

// //         :global(.info-cell span) {
// //           font-weight: 700;
// //           font-size: 1rem;
// //           color: #2c3e50;
// //         }

// //         /* STATUS BADGE ULTIMATE */
// //         :global(.status-badge-ultimate) {
// //           padding: 12px 24px;
// //           border-radius: 50px;
// //           font-weight: 800;
// //           font-size: 0.85rem;
// //           text-transform: uppercase;
// //           letter-spacing: 1px;
// //           box-shadow: 0 15px 40px rgba(0,0,0,0.3);
// //           backdrop-filter: blur(15px);
// //           border: 2px solid rgba(255,255,255,0.4);
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //         }

// //         /* FOOTER CONTROLS */
// //         :global(.footer-controls) {
// //           padding: 2rem;
// //           background: rgba(255,255,255,0.5);
// //           border-top: 1px solid rgba(255,255,255,0.4);
// //           backdrop-filter: blur(15px);
// //           border-radius: 0 0 32px 32px;
// //         }

// //         :global(.control-group) {
// //           display: flex;
// //           gap: 1.5rem;
// //           align-items: center;
// //         }

// //         :global(.status-switcher) {
// //           flex: 1;
// //           padding: 16px 20px;
// //           border: 2px solid rgba(102,126,234,0.3);
// //           border-radius: 20px;
// //           font-weight: 700;
// //           background: rgba(255,255,255,0.8);
// //           transition: all 0.4s ease;
// //           appearance: none;
// //         }

// //         :global(.status-switcher:focus) {
// //           border-color: #667eea;
// //           box-shadow: 0 0 0 4px rgba(102,126,234,0.2);
// //           transform: translateY(-3px);
// //         }

// //         :global(.delete-btn-ultimate) {
// //           width: 60px;
// //           height: 60px;
// //           border-radius: 20px;
// //           background: rgba(220,53,69,0.2) !important;
// //           border: none !important;
// //           color: #dc3545 !important;
// //           font-size: 1.4rem;
// //           transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
// //         }

// //         :global(.delete-btn-ultimate:hover) {
// //           background: rgba(220,53,69,0.4) !important;
// //           transform: translateY(-8px) scale(1.1) !important;
// //           box-shadow: 0 25px 50px rgba(220,53,69,0.4) !important;
// //         }

// //         /* RESPONSIVE PERFECTION */
// //         @media (max-width: 992px) {
// //           :global(.info-row) { flex-direction: column; }
// //           :global(.control-group) { flex-direction: column; }
// //           :global(.hero-header-ultimate) { height: 300px; }
// //         }

// //         @media (max-width: 768px) {
// //           :global(.hero-title) { font-size: 2.5rem !important; }
// //           :global(.user-grid-ultimate) { g-3 !important; }
// //         }

// //         /* UTILITY CLASSES */
// //         :global(.shadow-4xl) {
// //           box-shadow: 0 50px 100px rgba(0,0,0,0.25) !important;
// //         }

// //         :global(.select-wrapper) {
// //           position: relative;
// //         }

// //         :global(.select-ultimate) {
// //           padding: 16px 20px;
// //           border: 2px solid rgba(102,126,234,0.3);
// //           border-radius: 20px;
// //           background: rgba(255,255,255,0.9);
// //           font-weight: 700;
// //           transition: all 0.4s ease;
// //         }

// //         :global(.input-ultimate) {
// //           padding: 16px 20px;
// //           border: 2px solid rgba(102,126,234,0.3);
// //           border-radius: 20px;
// //           background: rgba(255,255,255,0.9);
// //           font-weight: 600;
// //           transition: all 0.4s ease;
// //         }

// //         :global(.progress-ultimate) {
// //           height: 40px;
// //           border-radius: 25px;
// //           background: rgba(255,255,255,0.3);
// //           backdrop-filter: blur(10px);
// //         }
// //       `}</style>
// //     </>
// //   );
// // };
//efkjiotrjmrfeiogh95rjgimio6jhoi//
// // export default AdminDashboard;
