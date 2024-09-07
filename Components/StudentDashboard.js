import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
    const { id } = useParams(); // Getting the student ID from the URL
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Fetching student details using the student ID
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5078/api/Student/Details/${id}`);
                setStudent(response.data); // Set the student details
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-dashboard">
            <h1>Welcome, {student.name}</h1>
            <p>Email: {student.email}</p>
            <p>Contact: {student.contact}</p>
            <p>Gender: {student.gender}</p>
            <p>Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            <p>Address: {student.address}</p>
            <p>Qualification: {student.qualification}</p>
            <p>Interests: {student.interests}</p>
        </div>
    );
};

export default StudentDashboard