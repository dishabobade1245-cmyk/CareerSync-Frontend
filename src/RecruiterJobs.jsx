import { useEffect, useState } from "react";

function RecruiterJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/recruiter/jobs",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load your jobs");
                }

                const data = await response.json();
                setJobs(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
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
                Loading your jobs...
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
                My Jobs
            </h2>

            <p
                style={{
                    margin: "0 0 30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                Manage the job opportunities you have posted.
            </p>

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

            {jobs.length === 0 ? (
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
                        No Jobs Posted Yet
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            color: "#64748b",
                        }}
                    >
                        Post a job and it will appear here.
                    </p>
                </div>
            ) : (
                jobs.map((job) => (
                    <div
                        key={job.id}
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "18px",
                            padding: "30px",
                            marginBottom: "24px",
                            background: "#ffffff",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <h3
                            style={{
                                margin: "0 0 8px",
                                fontSize: "24px",
                                color: "#111827",
                            }}
                        >
                            {job.title}
                        </h3>

                        <p
                            style={{
                                margin: "0 0 20px",
                                fontSize: "17px",
                                fontWeight: "600",
                                color: "#334155",
                            }}
                        >
                            {job.company}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginBottom: "25px",
                            }}
                        >
                            <span
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    background: "#f1f5f9",
                                    color: "#334155",
                                    fontSize: "14px",
                                }}
                            >
                                📍 {job.location}
                            </span>

                            <span
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    background: "#f1f5f9",
                                    color: "#334155",
                                    fontSize: "14px",
                                }}
                            >
                                💼 {job.employmentType}
                            </span>

                            {job.salary && (
                                <span
                                    style={{
                                        padding: "8px 14px",
                                        borderRadius: "8px",
                                        background: "#f1f5f9",
                                        color: "#334155",
                                        fontSize: "14px",
                                    }}
                                >
                                    💰 ₹{job.salary.toLocaleString("en-IN")} / year
                                </span>
                            )}
                        </div>

                        <div style={{ marginBottom: "22px" }}>
                            <h4
                                style={{
                                    margin: "0 0 8px",
                                    fontSize: "17px",
                                    color: "#111827",
                                }}
                            >
                                Job Description
                            </h4>

                            <p
                                style={{
                                    margin: 0,
                                    lineHeight: "1.7",
                                    fontSize: "15px",
                                    color: "#475569",
                                }}
                            >
                                {job.description}
                            </p>
                        </div>

                        {job.requiredSkills && (
                            <div>
                                <h4
                                    style={{
                                        margin: "0 0 8px",
                                        fontSize: "17px",
                                        color: "#111827",
                                    }}
                                >
                                    Required Skills
                                </h4>

                                <p
                                    style={{
                                        margin: 0,
                                        lineHeight: "1.6",
                                        fontSize: "15px",
                                        color: "#475569",
                                    }}
                                >
                                    {job.requiredSkills}
                                </p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default RecruiterJobs;