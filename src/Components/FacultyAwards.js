import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyAwards = () => {
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        resourcePerson: "",
        yearClass: "",
        numStudent: "",
        image1: null,
        image2: null,
    });

    const [submittedData, setSubmittedData] = useState([]);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getUser");
                setSubmittedData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0], // Store the first selected file
        });
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }
        try {
            // Make POST request to submit form data
            const response = await axios.post("http://localhost:3000/api/newUser ", formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
              // Update submittedData with the new entry
            setSubmittedData([...submittedData, response.data]);
            // Reset form data
            setFormData({
                date: "",
                event: "",
                resourcePerson: "",
                yearClass: "",
                numStudent: "",
                image1: null,
                image2: null,
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Faculty Awards/Achievements Details</h4>
            <form onSubmit={handleSubmit}>
            {/* <h5 className="mt-3">Participation and Achievements</h5> */}
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Faculty Name & Designation:</label>
                            <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Title of Innovation:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Awardind Agency:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Catogory:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Event Name & Date:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo1/Certificate:</label>
                            <input type="file" id="imageInput1" name="image1" accept="image/*" onChange={handleFileChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo2/Certificate:</label>
                            <input type="file" id="imageInput2" name="image2" accept="image/*" onChange={handleFileChange} />
                            {/* <input type="file" id="imageInput1" name="image1" accept="image/*" onChange={handleFileChange} /> */}
                        </div>
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
              
            </form>
       </div>
    );
};

export default FacultyAwards;