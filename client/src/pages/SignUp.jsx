import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");

    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-50">SignUp</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-transparent text-slate-400 p-3 rounded-lg border-2 border-slate-300 focus:text-slate-50"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-transparent text-slate-400 p-3 rounded-lg border-2 border-slate-300 focus:text-slate-50"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-transparent text-slate-400 p-3 rounded-lg border-2 border-slate-300 focus:text-slate-50"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-white border-2 border-slate-50 text-black font-medium mt-5 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>

      <div className=" flex gap-2 mt-5 text-slate-50">
        <p> Have an account?</p>
        <Link to="/sign-in">
          <span className="text-cyan-300">Sign in</span>
        </Link>
      </div>
      <p className="text-red-500  mt-5">
        {error ? "Something went wrong, please try again" : ""}
      </p>
    </div>
  );
}
