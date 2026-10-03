import { useState } from "react";

function RecruiterPostJob() {
    const [form, setForm] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        employmentType: "Full Time",
        salary: "",
        requiredSkills: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setSubmitting(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/recruiter/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: form.title,
                        company: form.company,
                        description: form.description,
                        location: form.location,
                        employmentType: form.employmentType,
                        salary: Number(form.salary),
                        requiredSkills: form.requiredSkills,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to create job"
                );
            }

            setMessage("Job posted successfully!");

            setForm({
                title: "",
                company: "",
                description: "",
                location: "",
                employmentType: "Full Time",
                salary: "",
                requiredSkills: "",
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

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
                Post a Job
            </h2>

            <p
                style={{
                    margin: "0 0 30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                Create and publish a new job opportunity.
            </p>

            {message && (
                <div
                    style={{
                        marginBottom: "25px",
                        padding: "14px 18px",
                        borderRadius: "10px",
                        background: "#ecfdf5",
                        color: "#047857",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    {message}
                </div>
            )}

            {error && (
                <div
                    style={{
                        marginBottom: "25px",
                        padding: "14px 18px",
                        borderRadius: "10px",
                        background: "#fef2f2",
                        color: "#b91c1c",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                    }}
                >
                    <FormField
                        label="Job Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Java Backend Developer"
                        required
                    />

                    <FormField
                        label="Company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="e.g. TechNova Solutions"
                        required
                    />

                    <FormField
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Pune"
                        required
                    />

                    <div>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#111827",
                                fontWeight: "600",
                            }}
                        >
                            Employment Type
                        </label>

                        <select
                            name="employmentType"
                            value={form.employmentType}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <FormField
                        label="Annual CTC (₹)"
                        name="salary"
                        type="number"
                        value={form.salary}
                        onChange={handleChange}
                        placeholder="e.g. 600000"
                        required
                    />

                    <FormField
                        label="Required Skills"
                        name="requiredSkills"
                        value={form.requiredSkills}
                        onChange={handleChange}
                        placeholder="Java, Spring Boot, SQL, REST API"
                        required
                    />
                </div>

                <div style={{ marginTop: "20px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#111827",
                            fontWeight: "600",
                        }}
                    >
                        Job Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter the job description..."
                        required
                        rows="6"
                        style={{
                            ...inputStyle,
                            resize: "vertical",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        marginTop: "25px",
                        padding: "13px 30px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(135deg, #6366f1, #5b5ce2)",
                        color: "#ffffff",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                        boxShadow:
                            "0 8px 18px rgba(99, 102, 241, 0.2)",
                    }}
                >
                    {submitting ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
    );
}

function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required,
}) {
    return (
        <div>
            <label
                style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#111827",
                    fontWeight: "600",
                }}
            >
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={inputStyle}
            />
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    color: "#111827",
    background: "#ffffff",
};

export default RecruiterPostJob;