import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";

const ADMIN_CREDENTIALS = {
  name: "Sreesoftwares",
  phone: "9500941142",
  email: "sreesoftwares5@gmail.com",
  place: "chennai",
  country: "india",
};

const WHATSAPP_NUMBER = "+919500941142";

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
    country: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // ✅ REMOVED id - Backend generates it!
    const submitData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      place: formData.place,
      country: formData.country,
      timestamp: new Date().toLocaleString(),
      // NO id field - backend handles it
    };

    try {
      // const response = await fetch("http://localhost:5000/api/register", {
      // Change this line in your React app:
      const response = await fetch(
        "https://register-form-2.onrender.com/api/register",
        {
          method: "POST",
          // Change this line in your React app:

          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Save failed");
      }

      // ✅ ADMIN LOGIN - Does NOT save to database
      if (
        formData.name === ADMIN_CREDENTIALS.name &&
        formData.phone === ADMIN_CREDENTIALS.phone
      ) {
        setStatus({
          type: "success",
          message: "🔐 Admin login successful! Redirecting...",
        });
        setTimeout(() => navigate("/admin-dashboard"), 1500);
        return; // Exit early - NO database save for admin
      }

      // ✅ REGULAR USER - Save to database + WhatsApp
      // const whatsappMessage = `New Registration!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPlace: ${formData.place}\nCountry: ${formData.country}`;
      const whatsappMessage = `I'm interested in the 2026 offer. How do I enroll?`;
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

      setStatus({
        type: "success",
        message: "✅ Registration successfully!",
      });
      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 1500);
    } catch (err) {
      setStatus({
        type: "danger",
        message: `❌ ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setStatus({ type: "", message: "" });

  //     const submitData = {
  //       ...formData,
  //       id: Date.now(),
  //       timestamp: new Date().toLocaleString(),
  //     };

  //     try {
  //       const response = await fetch("http://localhost:5000/api/register", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(submitData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Save failed");
  //       }

  //       // Check admin login
  //       if (
  //         formData.name === ADMIN_CREDENTIALS.name &&
  //         formData.phone === ADMIN_CREDENTIALS.phone
  //       ) {
  //         setStatus({
  //           type: "success",
  //           message: "Admin login successful! Redirecting...",
  //         });
  //         setTimeout(() => navigate("/admin-dashboard"), 1500);
  //       } else {
  //         // WhatsApp for regular users
  //         const whatsappMessage = `New Registration!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPlace: ${formData.place}\nCountry: ${formData.country}`;
  //         const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  //         setStatus({
  //           type: "success",
  //           message: "✅ Registration Successfullly!",
  //         });
  //         setTimeout(() => {
  //           window.open(whatsappURL, "_blank");
  //         }, 1500);
  //       }
  //     } catch (err) {
  //       setStatus({
  //         type: "danger",
  //         message: "❌ Failed to save. Check backend connection.",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="min-vh-100 bg-gradient-form">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden modern-form-card">
              <Card.Header className="bg-gradient-primary text-white text-center py-4 position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10"></div>
                <div className="position-relative">
                  <i className="bi bi-person-plus-fill fs-1 mb-3 d-block"></i>
                  <h2 className="mb-1 fw-bold lh-1">Register Form</h2>
                  <p className="mb-0 opacity-90">
                    Fill all details to register
                  </p>
                </div>
              </Card.Header>

              <Card.Body className="p-4 p-md-5">
                {status.message && (
                  <Alert
                    variant={status.type === "success" ? "success" : "danger"}
                    className={`border-0 rounded-3 shadow-sm mb-4 status-alert ${
                      status.type === "success"
                        ? "bg-success-gradient"
                        : "bg-danger-gradient"
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <i
                        className={`bi bi-check-circle-fill fs-4 me-3 text-white`}
                      ></i>
                      <div>
                        <strong>{status.message}</strong>
                      </div>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark fs-6 mb-2">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      Name *
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-control-modern"
                        placeholder="Enter your full name"
                      />
                      <i className="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark fs-6 mb-2">
                      <i className="bi bi-telephone-fill me-2 text-primary"></i>
                      Phone *
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-control-modern"
                        placeholder="1234567890"
                      />
                      <i className="bi bi-telephone position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark fs-6 mb-2">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      Email *
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control-modern"
                        placeholder="your@email.com"
                      />
                      <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark fs-6 mb-2">
                      <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                      Place *
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                        className="form-control-modern"
                        placeholder="City/Area"
                      />
                      <i className="bi bi-geo-alt position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-dark fs-6 mb-2">
                      <i className="bi bi-globe me-2 text-primary"></i>Country *
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="form-control-modern"
                        placeholder="India"
                      />
                      <i className="bi bi-globe position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 btn-modern-gradient py-3 fs-6 fw-bold mb-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Saving to Database...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>Register
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactForm;
