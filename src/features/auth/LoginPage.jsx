import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "./authSlice";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, status, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(form));
        }}
        className="space-y-4 bg-white p-8 rounded shadow w-96"
      >
        <h1 className="text-2xl font-bold text-center">Dental Center Login</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {status === "failed" && <p className="text-red-600">{error}</p>}

        <button
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
