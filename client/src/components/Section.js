// components/Section.js
import Card from "./Card";

function Section({ title, data, level }) {
  const filtered =
    level === "All" ? data : data.filter(item => item.level === level);

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="card-grid">
        {filtered.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Section;
