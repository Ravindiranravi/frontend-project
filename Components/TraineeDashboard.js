import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TraineeDashboard = () => {
    const { id } = useParams(); // Getting the trainee ID from the URL
    const [trainee, setTrainee] = useState(null);

    useEffect(() => {
        // Fetching trainee details using the trainee ID
        const fetchTraineeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5078/api/Trainee/Details/${id}`);
                setTrainee(response.data); // Set the trainee details
            } catch (error) {
                console.error('Error fetching trainee details:', error);
            }
        };

        fetchTraineeDetails();
    }, [id]);

    if (!trainee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trainee-dashboard">
            <h1>Welcome, {trainee.Username}</h1>
            <p>Email: {trainee.Email}</p>
            <p>Contact: {trainee.Contact}</p>
            <p>Training Program: {trainee.TrainingProgram}</p>
        </div>
    );
};

export default TraineeDashboard;
