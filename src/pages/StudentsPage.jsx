import { useEffect, useState } from "react";
import supabase from "../superbase_client";
import Dropdown from "../components/Dropdown";
import StudentTable from "../components/StudentTable";
import AddnewStudent from "../components/AddnewStudent";

const StudentsPage = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch unique cohorts and courses dynamically
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch cohorts and courses from Supabase
        const { data, error } = await supabase.from("students").select("cohort, courses");

        if (error) throw error;

        // Extract unique values for cohorts and courses
        const uniqueCohorts = [...new Set(data.map((item) => item.cohort))].sort(
          (a, b) => a.localeCompare(b)
        );
        const uniqueCourses = [...new Set(data.map((item) => item.courses))].sort(
          (a, b) => a.localeCompare(b)
        );

        setAcademicYears(uniqueCohorts);
        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Error fetching dropdown data:", error.message);
      }
    };

    fetchDropdownData();
  }, []); 

  // Fetch students based on selected filters
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        let query = supabase.from("students").select("*");

        if (selectedYear) {
          query = query.eq("cohort", selectedYear);
        }
        if (selectedCourse) {
          query = query.ilike("courses", `%${selectedCourse}%`); // Partial match for courses
        }

        const { data, error } = await query;

        if (error) throw error;

        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedYear, selectedCourse]);

  return (
    <div className="flex">
     
      <div className="flex-1">
        <div className="p-4">
          <div className="flex flex-row justify-between items-end space-x-4 mb-4">
            <div className="flex flex-row gap-4 text-[#3F526E]">
              <Dropdown
                options={academicYears}
                label=""
                onChange={(value) => setSelectedYear(value)}
              />
              <Dropdown
                options={courses}
                label=""
                onChange={(value) => setSelectedCourse(value)}
              />
            </div>
            
            <AddnewStudent />
           
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <StudentTable students={students} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
