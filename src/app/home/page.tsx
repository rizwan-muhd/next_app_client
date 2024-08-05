// src/pages/MobileTable.tsx (or app/MobileTable/page.tsx for Next.js 13+ with App Router)

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    name: string;
    mobileNumber: string;
}

const HomePage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPAge] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    // Sample data

    console.log(users)

    const token = localStorage.getItem('token')
    if (!token) {
        router.push("/login");
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/login");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push("/login");
        } else {
            getUsers(token);
        }
    }, [router, page]);

    const getUsers = async (token: string) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user/get-user?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });
            setUsers(res.data.results)
            setTotalPages(res.data.totalPages)
        } catch (error) {

        }
    }



    return (
        <div>
            <h1>Users</h1>
            <button style={{ width: "100px", position: "absolute", top: "20px", right: "10px" }} onClick={handleLogout}>Logout</button>
            <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {/* <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th> */}
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((item, index) => (
                        <tr key={users._id}>
                            {/* <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td> */}
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.mobileNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {page > 1 && <button style={{ width: "100px" }} onClick={() => setPAge(page - 1)}>pre</button>}
            {page < totalPages && <button style={{ width: "100px" }} onClick={() => setPAge(page + 1)}>next</button>}
        </div>
    );
};

export default HomePage;
