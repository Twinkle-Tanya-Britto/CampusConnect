export default function Login({ setActive }) {
  const login = () => {
    const email = document.getElementById("email").value;
    if (email.endsWith("@cmrit.ac.in")) {
      localStorage.setItem("campusUser", email.split("@")[0]);
      setActive("home");
    } else alert("Please use your college email");
  };

  return (
    <section className="login">
      <h2>Login with College Email</h2>
      <input type="email" id="email" placeholder="Enter college email" />
      <button onClick={login}>Login</button>
    </section>
  );
}