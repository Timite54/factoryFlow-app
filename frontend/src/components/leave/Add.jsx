import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
    const {user} = useAuth()

    const [leave, setLeave] = useState({
        userId: user._id,
    })

    const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setLeave((prevState) => ({...prevState, [name] : value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          `https://factory-flow-app-weld.vercel.app//api/leave/add`,leave,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate(`/employee-dashboard/leaves/${user._id}`)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Demande de congé</h2>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type de congé
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Selectionner Le Type</option>
              <option value="Sick Leave">Congé de maladie</option>
              <option value="Casual Leave">Congé occasionnel</option>
              <option value="Annual Leave">Congé annuel</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* from date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date De Début
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* to date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date De Fin
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              placeholder="Raisons de la demande"
              onChange={handleChange}
              className="w-full border border-gray-300"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter La Demande
        </button>
      </form>
    </div>
  );
};

export default Add;
