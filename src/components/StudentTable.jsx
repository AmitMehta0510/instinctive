const StudentTable = ({ students }) => {
  if (!students || students.length === 0) {
    return <div>No students found for the selected filters.</div>;
  }

  return (
    <table className="w-full border-collapse border-t border-b border-gray-300">
      <thead>
        <tr>
          <th className="text-start border-t border-b border-gray-300 p-3">Student Name</th>
          <th className="text-start border-b border-gray-300 p-3">Cohort</th>
          <th className="text-start border-b border-gray-300 p-3">Courses</th>
          <th className="text-start border-b border-gray-300 p-3">Date Joined</th>
          <th className="text-start border-b border-gray-300 p-3">Last Login</th>
          <th className="text-start border-b border-gray-300 p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td className="border-b border-t border-gray-300 p-2">{student.name}</td>
            <td className="border-b border-gray-300 p-2">{student.cohort}</td>

            <td className="border-b border-gray-300 p-2 flex justify-start items-center gap-2"><img className="h-[22px] rounded-sm" src="https://tse2.mm.bing.net/th?id=OIP.Q0USHMHeQJR_VncTMkQU6gAAAA&pid=Api&P=0&h=180" alt="" />{student.courses}</td>


            <td className="border-b border-gray-300 p-2">{student.date_joined}</td>
            <td className="border-b border-gray-300 p-2">{student.last_login}</td>
            <td className="border-b border-gray-300 p-2 pl-[2%]">
              <div
                className={`h-[9px] w-[9px] md:h-[12px] md:w-[12px] lg:h-[13px] lg:w-[13px] ${
                  student.status === true ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
