import { useEffect, useState } from "react";

function RecruiterApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/recruiter/applications",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load applications");
                }

                const data = await response.json();
                setApplications(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const updateStatus = async (applicationId, status) => {
        try {
            setUpdatingId(applicationId);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/recruiter/applications/${applicationId}/status?status=${status}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to update application"
                );
            }

            setApplications((previousApplications) =>
                previousApplications.map((application) =>
                    application.id === applicationId
                        ? data
                        : application
                )
            );

            setMessage("Application status updated successfully!");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#111827",
                }}
            >
                Loading applications...
            </div>
        );
    }

    return (
        <div>
            <h2
                style={{
                    margin: "0 0 8px",
                    textAlign: "center",
                    fontSize: "30px",
                    color: "#111827",
                }}
            >
                Applications
            </h2>

            <p
                style={{
                    margin: "0 0 30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                Review and manage applications from students.
            </p>

            {message && (
                <div
                    style={{
                        marginBottom: "25px",
                        padding: "14px 18px",
                        borderRadius: "10px",
                        background: "#eef2ff",
                        color: "#4338ca",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    {message}
                </div>
            )}

            {applications.length === 0 ? (
                <div
                    style={{
                        padding: "40px",
                        textAlign: "center",
                        border: "1px solid #e2e8f0",
                        borderRadius: "18px",
                        background: "#ffffff",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 10px",
                            color: "#111827",
                        }}
                    >
                        No Applications Yet
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            color: "#64748b",
                        }}
                    >
                        Applications from students will appear here.
                    </p>
                </div>
            ) : (
                applications.map((application) => (
                    <div
                        key={application.id}
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "18px",
                            padding: "28px",
                            marginBottom: "20px",
                            background: "#ffffff",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        margin: "0 0 8px",
                                        fontSize: "23px",
                                        color: "#111827",
                                    }}
                                >
                                    {application.studentName}
                                </h3>

                                <p
                                    style={{
                                        margin: "0 0 8px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#334155",
                                    }}
                                >
                                    {application.jobTitle}
                                </p>

                                <p
                                    style={{
                                        margin: "0 0 8px",
                                        fontSize: "15px",
                                        color: "#64748b",
                                    }}
                                >
                                    {application.company}
                                </p>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        color: "#64748b",
                                    }}
                                >
                                    Application ID: #{application.id}
                                </p>
                            </div>

                            <div
                                style={{
                                    padding: "9px 16px",
                                    borderRadius: "10px",
                                    background:
                                        application.status === "SELECTED"
                                            ? "#dcfce7"
                                            : application.status === "REJECTED"
                                                ? "#fee2e2"
                                                : application.status === "SHORTLISTED"
                                                    ? "#fef3c7"
                                                    : "#eef2ff",
                                    color:
                                        application.status === "SELECTED"
                                            ? "#15803d"
                                            : application.status === "REJECTED"
                                                ? "#b91c1c"
                                                : application.status === "SHORTLISTED"
                                                    ? "#b45309"
                                                    : "#4338ca",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                }}
                            >
                                {application.status}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "25px",
                                paddingTop: "20px",
                                borderTop: "1px solid #e5e7eb",
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "SHORTLISTED"
                                    )
                                }
                                disabled={updatingId === application.id}
                                style={statusButtonStyle("#f59e0b")}
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "SELECTED"
                                    )
                                }
                                disabled={updatingId === application.id}
                                style={statusButtonStyle("#16a34a")}
                            >
                                Select
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        application.id,
                                        "REJECTED"
                                    )
                                }
                                disabled={updatingId === application.id}
                                style={statusButtonStyle("#dc2626")}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

const statusButtonStyle = (background) => ({
    padding: "10px 18px",
    border: "none",
    borderRadius: "9px",
    background,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    opacity: 1,
});

export default RecruiterApplications;