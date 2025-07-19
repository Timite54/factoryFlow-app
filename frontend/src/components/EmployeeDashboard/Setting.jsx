// src/components/forms/DepartmentForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth()
    const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:8000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
            setError("")
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error)
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Changer Mot De Passe</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        {/* Department Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Ancien Mot De Passe
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="CChanger Mot De Passe"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Nouveau Mot De Pass
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau Mot De Pass"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirmer Mot De Pass
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer Mot De Pass"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Changer
        </button>
      </form>
    </div>
  );
};

export default Setting;
