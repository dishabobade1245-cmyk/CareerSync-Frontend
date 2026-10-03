import { useEffect, useState } from "react";

function StudentProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/student/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load profile");
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
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
                Loading profile...
            </div>
        );
    }

    if (message) {
        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#b91c1c",
                }}
            >
                {message}
            </div>
        );
    }

    if (!profile) {
        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                Profile not found.
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
                My Profile
            </h2>

            <p
                style={{
                    margin: "0 0 30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                View your student profile and career information.
            </p>

            <div
                style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "18px",
                    padding: "30px",
                    background: "#ffffff",
                    boxShadow:
                        "0 8px 25px rgba(15, 23, 42, 0.06)",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "25px",
                    }}
                >
                    <ProfileItem
                        label="Name"
                        value={profile.name}
                    />

                    <ProfileItem
                        label="Email"
                        value={profile.email}
                    />

                    <ProfileItem
                        label="Phone"
                        value={profile.phone}
                    />

                    <ProfileItem
                        label="College"
                        value={profile.college}
                    />

                    <ProfileItem
                        label="Branch"
                        value={profile.branch}
                    />

                    <ProfileItem
                        label="Graduation Year"
                        value={profile.graduationYear}
                    />

                    <ProfileItem
                        label="CGPA"
                        value={profile.cgpa}
                    />

                    <ProfileItem
                        label="Skills"
                        value={profile.skills}
                    />
                </div>

                {profile.resumeUrl && (
                    <div
                        style={{
                            marginTop: "30px",
                            paddingTop: "25px",
                            borderTop: "1px solid #e5e7eb",
                        }}
                    >
                        <h3
                            style={{
                                margin: "0 0 10px",
                                fontSize: "17px",
                                color: "#111827",
                            }}
                        >
                            Resume
                        </h3>

                        <a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: "#4f46e5",
                                fontWeight: "600",
                                textDecoration: "none",
                            }}
                        >
                            View Resume →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileItem({ label, value }) {
    return (
        <div>
            <p
                style={{
                    margin: "0 0 6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#64748b",
                }}
            >
                {label}
            </p>

            <p
                style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#111827",
                    lineHeight: "1.5",
                }}
            >
                {value || "Not provided"}
            </p>
        </div>
    );
}

export default StudentProfile;