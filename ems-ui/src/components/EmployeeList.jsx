import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import EmployeeService from "../service/EmployeeService";

export const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployee();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await EmployeeService.deleteEmployee(id);
      // Refresh employee list after delete
      const response = await EmployeeService.getEmployee();
      setEmployees(response.data);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className=" container mx-auto my-8">
      <div className="h-12 mx-2 ">
        <button
          onClick={() => navigate("/addEmployee")}
          className="rounded bg-amber-400 text-white hover:cursor-pointer px-6 py-3 font-semibold"
        >
          Add Employee
        </button>
      </div>
      <div className="flex shadow border-b">
        <table className=" min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-gray-600 font-medium uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left text-gray-600 font-medium uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left text-gray-600 font-medium uppercase tracking-wider py-3 px-6">
                Email
              </th>
              <th className="text-right text-gray-600 font-medium uppercase tracking-wider py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6  py-4 text-left whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.firstName}
                    </div>
                  </td>
                  <td className="px-6  py-4 text-left whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.lastName}
                    </div>
                  </td>
                  <td className="px-6  py-4 text-left whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6  py-4 text-right whitespace-nowrap font-medium">
                    <a
                      onClick={() => navigate(`/editEmployee/${employee.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer px-4"
                    >
                      Edit
                    </a>

                    <a
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this employee?"
                          )
                        ) {
                          handleDelete(employee.id);
                        }
                      }}
                      className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
export default EmployeeList;
