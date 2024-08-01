import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    age: '',
    class: '',
    subject: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    dalitChristian: false,
    fatherName: '',
    parentOccupation: '',
    parentAddress: '',
    parentMobileNo: '',
    studentMobileNo: '',
    pincode: '',
    previousSchool: '',
    residentLastYear: false,
    previousHostelName: '',
    previousHostelPlace: '',
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/submit-form`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Form submitted successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
      console.error('Error:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input required
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input required
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
      <input required
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input required
        type="text"
        name="class"
        value={formData.class}
        onChange={handleChange}
        placeholder="Class"
      />
      <input required
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
      />
      <input required
        type="text"
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
        placeholder="Blood Group"
      />
      
      <fieldset>
        <legend>Religion:</legend>
        {['RC', 'Hindu', 'Christian', 'Muslim'].map((religion) => (
          <label key={religion}>
            <input required
              type="radio"
              name="religion"
              value={religion}
              checked={formData.religion === religion}
              onChange={handleChange}
            />
            {religion}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Caste:</legend>
        {['SC/ST', 'MBC', 'BC', 'FC'].map((caste) => (
          <label key={caste}>
            <input required
              type="radio"
              name="caste"
              value={caste}
              checked={formData.caste === caste}
              onChange={handleChange}
            />
            {caste}
          </label>
        ))}
      </fieldset>

      <label>
        Dalit Christian:
        <input
          type="checkbox"
          name="dalitChristian"
          checked={formData.dalitChristian}
          onChange={handleChange}
        />
      </label>
      <input required
        type="text"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        placeholder="Father's Name"
      />
      <input required
        type="text"
        name="parentOccupation"
        value={formData.parentOccupation}
        onChange={handleChange}
        placeholder="Parent's Occupation"
      />
      <textarea required
        name="parentAddress"
        value={formData.parentAddress}
        onChange={handleChange}
        placeholder="Parent's Address"
      />
      <input required
        type="tel"
        name="parentMobileNo"
        value={formData.parentMobileNo}
        onChange={handleChange}
        placeholder="Parent's Mobile No."
      />
      <input required
        type="tel"
        name="studentMobileNo"
        value={formData.studentMobileNo}
        onChange={handleChange}
        placeholder="Student's Mobile No."
      />
      <input required
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
      />
      <input required
        type="text"
        name="previousSchool"
        value={formData.previousSchool}
        onChange={handleChange}
        placeholder="Previous School"
      />
      <label>
        Resident Last Year:
        <input
          type="checkbox"
          name="residentLastYear"
          checked={formData.residentLastYear}
          onChange={handleChange}
        />
      </label>
      <input
        type="text"
        name="previousHostelName"
        value={formData.previousHostelName}
        onChange={handleChange}
        placeholder="Previous Hostel Name"
      />
      <input
        type="text"
        name="previousHostelPlace"
        value={formData.previousHostelPlace}
        onChange={handleChange}
        placeholder="Previous Hostel Place"
      />
      
      <div>
        <label htmlFor="image">Upload Image(passport size):</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {previewUrl && (
        <div>
          <h4>Image Preview:</h4>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
      )}
      
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default MyForm;