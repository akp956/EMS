// Instead of exporting the function directly
import axios from 'axios';
const URL="http://localhost:8080/EMS/employee";
const saveEmployee = (employee) => {
    return axios.post(URL, employee);
  };
  const getEmployee = () => {
    return axios.get(URL);
  };
  const deleteEmployee = (id) => {
    return axios.delete(URL+"/"+id);
  };
  const getEmployeeById = (id) => {
    return axios.get(URL+"/"+id);
  };
  const updateEmployee = (id,employee) => {
    return axios.put(URL+"/"+id,employee);
  };
  
  export default {
    saveEmployee,
    getEmployee,
    deleteEmployee,
    getEmployeeById,
    updateEmployee
  };
  