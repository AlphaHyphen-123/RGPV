"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  // ✅ Safely parse user data
  let userData = null
  try {
    const userString = localStorage.getItem("user")
    userData = userString ? JSON.parse(userString) : null
  } catch (error) {
    console.error("Failed to parse userData from localStorage:", error)
    userData = null
  }

  const isLoggedIn = userData && userData.token

  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [branch, setBranch] = useState("")
  const [subject, setSubject] = useState("")

  const [subjects, setSubjects] = useState([])
  const [subjectsLoading, setSubjectsLoading] = useState(false)
  const [subjectsError, setSubjectsError] = useState(null)

  const [resources, setResources] = useState({
    notesUrl: [],
    playlistUrls: [],
    tutorialLinks: [],
    pyqLinks: [],
    pyqBookUrl: "",
    subjectName: "",
    yearWisePYQs: [],
  })

  const [resourcesLoading, setResourcesLoading] = useState(false)
  const [resourcesError, setResourcesError] = useState(null)

  const [showFinder, setShowFinder] = useState(true)
  const dropdownRef = useRef(null)

  const [showUserInfo, setShowUserInfo] = useState(false)

  useEffect(() => {
    if (year && semester && branch) {
      setSubjectsLoading(true)
      setSubjectsError(null)

      fetch(`https://rgpvpathsala.onrender.com/api/subjects?year=${year}&semester=${semester}&branch=${branch}`)
        .then((res) => res.json())
        .then((data) => {
          setSubjects(Array.isArray(data.subjects) ? data.subjects : [])
          setSubject("")
          setResources({
            notesUrl: [],
            playlistUrls: [],
            tutorialLinks: [],
            pyqLinks: [],
            pyqBookUrl: "",
            subjectName: "",
            yearWisePYQs: [],
          })
          setSubjectsLoading(false)
        })
        .catch(() => {
          setSubjects([])
          setSubjectsError("Failed to load subjects")
          setSubjectsLoading(false)
          setSubject("")
          setResources({
            notesUrl: [],
            playlistUrls: [],
            tutorialLinks: [],
            pyqLinks: [],
            pyqBookUrl: "",
            subjectName: "",
            yearWisePYQs: [],
          })
        })
    } else {
      setSubjects([])
      setSubject("")
      setResources({
        notesUrl: [],
        playlistUrls: [],
        tutorialLinks: [],
        pyqLinks: [],
        pyqBookUrl: "",
        subjectName: "",
        yearWisePYQs: [],
      })
    }
  }, [year, semester, branch])

  useEffect(() => {
    if (subject) {
      setResourcesLoading(true)
      setResourcesError(null)

      fetch(`https://rgpvpathsala.onrender.com/api/resources?subject=${encodeURIComponent(subject)}&branch=${branch}`)
        .then((res) => res.json())
        .then((data) => {
          setResources({
            notesUrl: Array.isArray(data.notesUrl) ? data.notesUrl : [],
            playlistUrls: Array.isArray(data.playlistUrls) ? data.playlistUrls : [],
            tutorialLinks: Array.isArray(data.tutorialLinks) ? data.tutorialLinks : [],
            pyqLinks: Array.isArray(data.pyqLinks) ? data.pyqLinks : [],
            pyqBookUrl: data.pyqBookUrl || "",
            subjectName: data.subjectName || "",
            yearWisePYQs: Array.isArray(data.yearWisePYQs) ? data.yearWisePYQs : [],
          })
          setResourcesLoading(false)
        })
        .catch(() => {
          setResourcesError("Failed to load resources")
          setResourcesLoading(false)
        })
    } else {
      setResources({
        notesUrl: [],
        playlistUrls: [],
        tutorialLinks: [],
        pyqLinks: [],
        pyqBookUrl: "",
        subjectName: "",
        yearWisePYQs: [],
      })
    }
  }, [subject])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  // ✅ Safely parse user for display
  let user = {}
  try {
    const userString = localStorage.getItem("user")
    user = userString ? JSON.parse(userString) : {}
  } catch (err) {
    console.error("Error parsing user:", err)
    user = {}
  }

  const hasUser = user && user.name

  const initials = hasUser
    ? user.name
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .join("")
    : ""

  return (
    <nav
      className="navbar navbar-expand-lg navbar-custom"
      style={{
        padding: "15px 30px",
        background: "linear-gradient(135deg, #2832C2 0%, #4A5FC1 100%)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "24px",
            fontFamily: "'Poppins', sans-serif",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          RgpvPathshala
        </Link>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            transition: "color 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#FFD700"
            e.target.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white"
            e.target.style.transform = "scale(1)"
          }}
        >
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#FFD700"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white"
                e.target.style.transform = "scale(1)"
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#FFD700"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white"
                e.target.style.transform = "scale(1)"
              }}
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/contact"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#FFD700"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white"
                e.target.style.transform = "scale(1)"
              }}
            >
              Contacts
            </Link>
            <Link
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#FFD700"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white"
                e.target.style.transform = "scale(1)"
              }}
            >
              About
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px 12px",
                font: "inherit",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: "6px",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent"
                e.target.style.transform = "scale(1)"
              }}
            >
              Logout
            </button>

            {isLoggedIn && (
              <>
                <button
                  onClick={() => setShowFinder(!showFinder)}
                  className="btn btn-sm"
                  style={{
                    background: showFinder ? "#FFD700" : "#4CAF50",
                    color: showFinder ? "#2832C2" : "white",
                    border: "none",
                    borderRadius: "25px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  {showFinder ? "Close Resource Finder" : "Find Resources"}
                </button>

                {showFinder && (
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "absolute",
                      top: "70px",
                      left: "30px",
                      background: "white",
                      color: "black",
                      padding: "25px",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      minWidth: "350px",
                      maxHeight: "70vh",
                      overflowY: "auto",
                      zIndex: 10,
                      animation: "slideIn 0.3s ease-out",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <style>
                      {`
                        @keyframes slideIn {
                          from { opacity: 0; transform: translateY(-10px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                      `}
                    </style>
                    <h5 style={{ marginBottom: "20px", color: "#2832C2", fontWeight: "bold" }}>Filter Resources</h5>

                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="form-select mb-3"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        fontSize: "14px",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2832C2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    >
                      <option value="">Select year</option>
                      {[1, 2, 3, 4].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>

                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="form-select mb-3"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        fontSize: "14px",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2832C2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    >
                      <option value="">Select semester</option>
                      {[...Array(8)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="form-select mb-3"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        fontSize: "14px",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2832C2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    >
                      <option value="">Select branch</option>
                      {["CSE", "ECE", "ME", "CE", "EE"].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>

                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-select mb-4"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        fontSize: "14px",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2832C2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    >
                      <option value="">Select subject</option>
                      {subjects.map((sub, i) => (
                        <option key={i} value={sub.subjectName}>
                          {sub.subjectName}
                        </option>
                      ))}
                    </select>

                    {resources.subjectName && (
                      <h6 style={{ color: "#2832C2", marginBottom: "15px", fontWeight: "bold" }}>
                        Resources for {resources.subjectName}
                      </h6>
                    )}

                    {resources.notesUrl.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <h6 style={{ color: "#333", fontWeight: "600" }}>Notes:</h6>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {resources.notesUrl.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>
                              <a
                                href={item}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#007BFF",
                                  textDecoration: "none",
                                  transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                                onMouseLeave={(e) => (e.target.style.color = "#007BFF")}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resources.pyqBookUrl && (
                      <div style={{ marginBottom: "15px" }}>
                        <h6 style={{ color: "#333", fontWeight: "600" }}>PYQ Book:</h6>
                        <a
                          href={resources.pyqBookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#28a745",
                            textDecoration: "none",
                            fontWeight: "500",
                            transition: "color 0.3s ease",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#1e7e34")}
                          onMouseLeave={(e) => (e.target.style.color = "#28a745")}
                        >
                          Download PYQ Book
                        </a>
                      </div>
                    )}

                    {resources.playlistUrls.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <h6 style={{ color: "#333", fontWeight: "600" }}>YouTube Playlists:</h6>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {resources.playlistUrls.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#FF0000",
                                  textDecoration: "none",
                                  transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.color = "#CC0000")}
                                onMouseLeave={(e) => (e.target.style.color = "#FF0000")}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resources.tutorialLinks.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <h6 style={{ color: "#333", fontWeight: "600" }}>Tutorial Links:</h6>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {resources.tutorialLinks.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#17a2b8",
                                  textDecoration: "none",
                                  transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.color = "#138496")}
                                onMouseLeave={(e) => (e.target.style.color = "#17a2b8")}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resources.yearWisePYQs.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <h6 style={{ color: "#333", fontWeight: "600" }}>Year Wise PYQs:</h6>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {resources.yearWisePYQs.map((pyq, idx) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>
                              <a
                                href={pyq.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#dc3545",
                                  textDecoration: "none",
                                  transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.color = "#c82333")}
                                onMouseLeave={(e) => (e.target.style.color = "#dc3545")}
                              >
                                {pyq.year}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {subjectsLoading && <p style={{ color: "#007BFF", fontWeight: "500" }}>Loading subjects...</p>}
                    {subjectsError && <p style={{ color: "#dc3545", fontWeight: "500" }}>{subjectsError}</p>}
                    {resourcesLoading && <p style={{ color: "#007BFF", fontWeight: "500" }}>Loading resources...</p>}
                    {resourcesError && <p style={{ color: "#dc3545", fontWeight: "500" }}>{resourcesError}</p>}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {hasUser && (
        <div
          className="user-info"
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            textAlign: "center",
            lineHeight: "40px",
            color: "#2832C2",
            fontWeight: "bold",
            userSelect: "none",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => setShowUserInfo(!showUserInfo)}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)"
            e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"
            e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          {initials}
          {showUserInfo && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "30px",
                background: "white",
                color: "black",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                minWidth: "150px",
                animation: "fadeIn 0.3s ease-out",
                border: "1px solid #e0e0e0",
              }}
            >
              <style>
                {`
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                `}
              </style>
              <p style={{ margin: "5px 0", fontWeight: "600" }}>{user.name}</p>
              <p style={{ margin: "5px 0", color: "#666" }}>{user.email}</p>
              <p style={{ margin: "5px 0", color: "#666" }}>{user.college}</p>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
