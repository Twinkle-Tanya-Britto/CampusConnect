export default function Navbar({ active, setActive }) {
  const items = ["home", "forum", "events", "market", "clubs", "polls"]; 

  return (
    <nav className="navbar">
      {items.map((item) => (
        <button
          key={item}
          className={active === item ? "active" : ""}
          onClick={() => setActive(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </nav>
  );
}
