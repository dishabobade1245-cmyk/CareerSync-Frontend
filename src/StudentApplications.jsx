import { useEffect, useState } from "react";

function StudentApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/student/applications",
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
                    margin: "0 0 30px",
                    textAlign: "center",
                    fontSize: "30px",
                    color: "#111827",
                }}
            >
                My Applications
            </h2>

            {message && (
                <div
                    style={{
                        padding: "14px 18px",
                        marginBottom: "25px",
                        borderRadius: "10px",
                        background: "#fef2f2",
                        color: "#b91c1c",
                        textAlign: "center",
                        fontWeight: "600",
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
                        Apply to a job from Browse Jobs and your application
                        will appear here.
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
                                    {application.jobTitle}
                                </h3>

                                <p
                                    style={{
                                        margin: "0 0 12px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#334155",
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
                    </div>
                ))
            )}
        </div>
    );
}

export default StudentApplications;