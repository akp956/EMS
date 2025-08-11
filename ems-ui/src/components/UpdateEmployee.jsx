import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";

export const UpdateEmployee = () => {
  const { id } = useParams(); // get employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(id, employee)
      .then(() => {
        setMessage("✅ Employee updated successfully!");
        setTimeout(() => {
          navigate("/employeeList");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        setMessage("❌ Failed to update employee.");
      });
  };

  return (
    <div className="flex max-w-2xl shadow border-b mx-auto">
      <div className="px-8 py-8">
        {message && (
          <div className="text-green-600 text-lg font-medium mb-4">{message}</div>
        )}
        <div className="font-thin text-2xl tracking-wider underline mb-4">
          <h1>Edit Employee</h1>
        </div>
        <div className="my-4">
          <label className="block text-lg text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="my-4">
          <label className="block text-lg text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="my-4">
          <label className="block text-lg text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={updateEmployee}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
