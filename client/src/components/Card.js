// components/Card.js
function Card({ title, level, desc }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span className={`badge ${level.toLowerCase()}`}>{level}</span>
      <p>{desc}</p>
    </div>
  );
}

export default Card;
