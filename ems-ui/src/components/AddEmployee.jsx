import React, { useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const navi = useNavigate();
  const [message, setMessage] = useState("");

  const [employee, setemployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setemployee({ ...employee, [e.target.name]: value });
  };
  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        setMessage("✅ Employee saved successfully!");
        setTimeout(() => {
          //setMessage("");
          navi("/employeeList");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("❌ Failed to save employee.");
        setTimeout(() => setMessage(""), 2000);
      });
  };
  const reset = (e) => {
    e.preventDefault();
    setemployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };
  return (
    <div className="flex max-w-2xl shadow border-b mx-auto ">
      <div className="px-8 py-8">
        {message && (
          <div className="text-green-600 text-lg font-medium mb-4">
            {message}
          </div>
        )}

        <div className="font-thin text-2xl tracking-wider underline ">
          <h1>Add New Employee</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-6">
          <label className="block font-normal text-2xl text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-6">
          <label className="block font-normal text-2xl text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-6">
          <label className="block font-normal text-2xl text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-6 space-x-4">
          <button
            onClick={saveEmployee}
            className="text-white bg-green-400 mt-4 px-4 py-2 rounded font-semibold hover:bg-green-700 hover:cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="text-white bg-red-400 mt-4 px-4 py-2 rounded font-semibold hover:bg-red-700 hover:cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddEmployee;
