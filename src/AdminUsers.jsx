import { useEffect, useState } from "react";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/api/admin/users",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
                Loading users...
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
                Manage Users
            </h2>

            <p
                style={{
                    margin: "0 0 30px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                View students, recruiters and administrators.
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

            {users.length === 0 ? (
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
                        No Users Found
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            color: "#64748b",
                        }}
                    >
                        There are no registered users yet.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {users.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "18px",
                                padding: "25px",
                                background: "#ffffff",
                                boxShadow:
                                    "0 8px 25px rgba(15, 23, 42, 0.06)",
                            }}
                        >
                            <h3
                                style={{
                                    margin: "0 0 8px",
                                    fontSize: "21px",
                                    color: "#111827",
                                }}
                            >
                                {user.name}
                            </h3>

                            <p
                                style={{
                                    margin: "0 0 18px",
                                    color: "#64748b",
                                    fontSize: "15px",
                                }}
                            >
                                {user.email}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingTop: "15px",
                                    borderTop: "1px solid #e5e7eb",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "#64748b",
                                    }}
                                >
                                    User ID: #{user.id}
                                </span>

                                <span
                                    style={{
                                        padding: "7px 12px",
                                        borderRadius: "8px",
                                        background:
                                            user.role === "ADMIN"
                                                ? "#f3e8ff"
                                                : user.role === "RECRUITER"
                                                    ? "#e0f2fe"
                                                    : "#eef2ff",
                                        color:
                                            user.role === "ADMIN"
                                                ? "#7e22ce"
                                                : user.role === "RECRUITER"
                                                    ? "#0369a1"
                                                    : "#4338ca",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                    }}
                                >
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminUsers;