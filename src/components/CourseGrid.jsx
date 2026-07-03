const courses = [
  { id: 1, title: "Antincendio" },
  { id: 2, title: "Primo Soccorso" },
  { id: 3, title: "Sicurezza Lavoro" }
];

export default function CourseGrid() {
  return (
    <div className="grid">
      {courses.map(course => (
        <div key={course.id} className="card">
          {course.title}
        </div>
      ))}
    </div>
  );
}