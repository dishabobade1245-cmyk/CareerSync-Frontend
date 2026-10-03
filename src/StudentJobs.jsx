import { useEffect, useState } from "react";

function StudentJobs() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyingJobId, setApplyingJobId] = useState(null);
    const [message, setMessage] = useState("");

    const fetchJobsAndApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            const jobsResponse = await fetch(
                "http://localhost:8080/api/jobs",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!jobsResponse.ok) {
                throw new Error("Unable to load jobs");
            }

            const jobsData = await jobsResponse.json();
            setJobs(jobsData);

            const applicationsResponse = await fetch(
                "http://localhost:8080/api/student/applications",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!applicationsResponse.ok) {
                throw new Error("Unable to load applications");
            }

            const applicationsData = await applicationsResponse.json();
            setApplications(applicationsData);

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobsAndApplications();
    }, []);

    const handleApply = async (jobId) => {
        try {
            setApplyingJobId(jobId);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/student/jobs/${jobId}/apply`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to apply for this job");
            }

            setApplications((previousApplications) => [
                ...previousApplications,
                data,
            ]);

            setMessage("Application submitted successfully!");

        } catch (error) {
            setMessage(error.message);
        } finally {
            setApplyingJobId(null);
        }
    };

    const getApplication = (jobId) => {
        return applications.find(
            (application) => application.jobId === jobId
        );
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
                Loading jobs...
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
                Available Jobs
            </h2>

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

            {jobs.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        color: "#475569",
                    }}
                >
                    No jobs available right now.
                </p>
            ) : (
                jobs.map((job) => {
                    const application = getApplication(job.id);
                    const isApplying = applyingJobId === job.id;

                    return (
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

                            <div
                                style={{
                                    marginTop: "25px",
                                    paddingTop: "20px",
                                    borderTop: "1px solid #e5e7eb",
                                }}
                            >
                                {application ? (
                                    <div
                                        style={{
                                            display: "inline-block",
                                            padding: "12px 22px",
                                            borderRadius: "10px",
                                            background: "#ecfdf5",
                                            color: "#047857",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        ✓ {application.status}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleApply(job.id)}
                                        disabled={isApplying}
                                        style={{
                                            padding: "12px 28px",
                                            border: "none",
                                            borderRadius: "10px",
                                            background:
                                                "linear-gradient(135deg, #6366f1, #5b5ce2)",
                                            color: "#ffffff",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            cursor: isApplying
                                                ? "not-allowed"
                                                : "pointer",
                                            opacity: isApplying ? 0.7 : 1,
                                            boxShadow:
                                                "0 8px 18px rgba(99, 102, 241, 0.2)",
                                        }}
                                    >
                                        {isApplying ? "Applying..." : "Apply Now"}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default StudentJobs;