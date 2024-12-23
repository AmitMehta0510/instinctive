import React, { useState } from 'react'
import supabase from '../superbase_client'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toast'
 
function AddStudentPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      name: '',
      cohort: '',
      courses: '',
      date_joined: '',
      last_login: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)
  
      try {
        const { error } = await supabase.from('students').insert([formData])
        if (error) throw error
        toast.success('Student added successfully!')
        navigate('/')
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <div className="max-w-lg mx-auto mt-8 p-4 border border-gray-300 rounded">
        <h1 className="text-2xl text-center font-bold mb-4">Add New Student</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded flex-1 py-2 outline-none "
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cohort</label>
            <input
              type="text"
              name="cohort"
              value={formData.cohort}
              onChange={handleInputChange}
              className="w-full p-2 border rounded flex-1 py-2 outline-none "
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Courses</label>
            <input
              type="text"
              name="courses"
              value={formData.courses}
              onChange={handleInputChange}
              className="w-full p-2 border rounded flex-1 py-2 outline-none "
              placeholder="Comma-separated"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date Joined</label>
            <input
              type="date"
              name="date_joined"
              value={formData.date_joined}
              onChange={handleInputChange}
              className="w-full p-2 border rounded flex-1 py-2  outline-none "
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Login</label>
            <input
              type="datetime-local"
              name="last_login"
              value={formData.last_login}
              onChange={handleInputChange}
              className="w-full p-2 border rounded flex-1 py-2  outline-none "
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-black text-white font-bold py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>
    )
}

export default AddStudentPage