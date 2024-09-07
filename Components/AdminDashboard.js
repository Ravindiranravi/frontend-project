import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interests: '' });
    const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

    useEffect(() => {
        fetchStudents();
        fetchUsers();
    }, []);

    const API_URL = 'https://localhost:5001/api/admin';  // Adjust according to your backend

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${API_URL}/students`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`${API_URL}/students/${id}`);
            fetchStudents(); // Refresh the student list
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/users/${id}`);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddStudent = async () => {
        try {
            await axios.post(`${API_URL}/students`, newStudent);
            setNewStudent({ name: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interests: '' });
            fetchStudents(); // Refresh the student list
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post(`${API_URL}/users`, newUser);
            setNewUser({ username: '', password: '', role: '' });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <h2>Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Qualification</th>
                        <th>Interests</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.contact}</td>
                            <td>{student.gender}</td>
                            <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                            <td>{student.address}</td>
                            <td>{student.qualification}</td>
                            <td>{student.interests}</td>
                            <td>
                                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Student</h2>
            <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
            <input type="text" placeholder="Contact" value={newStudent.contact} onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })} />
            <input type="text" placeholder="Gender" value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} />
            <input type="date" value={newStudent.dateOfBirth} onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })} />
            <input type="text" placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} />
            <input type="text" placeholder="Qualification" value={newStudent.qualification} onChange={(e) => setNewStudent({ ...newStudent, qualification: e.target.value })} />
            <input type="text" placeholder="Interests" value={newStudent.interests} onChange={(e) => setNewStudent({ ...newStudent, interests: e.target.value })} />
            <button onClick={handleAddStudent}>Add Student</button>

            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New User</h2>
            <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <input type="text" placeholder="Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default AdminDashboard;
