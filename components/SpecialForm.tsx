"use client";
import React, { useContext, useState } from "react";
import InputForm from "./InputForm";
import CustomButton from "./CustomButton";
import { loginUser, registerUser } from "@/utils";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/state";

export default function SpecialForm({ name }: { name: string }) {
  const { setupSocket } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const isRegister = name === "register";
  const router = useRouter();

  function validate() {
    const credentials = isRegister
      ? [username, email, password]
      : [email, password];
    credentials.map((input) => {
      if (!input) return false;
    });
    return true;
  }
  async function submitForm() {
    try {
      if (!validate()) throw new Error("Please fill all fields");
      const isSuccess = isRegister
        ? await registerUser(username, email, password)
        : await loginUser(email, password);
      if (isSuccess && isRegister) {
        router.push("/Login");
      } else if (isSuccess && !isRegister) {
        router.push("/Dashboard");
        setupSocket();
      }
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      alert(`${error}`);
    }
  }
  return (
    <div className="card-form">
      <h1 className="card-title">{name}</h1>
      {isRegister && (
        <InputForm
          type="text"
          name="username"
          placeholder="Your Username"
          labelText="Username:"
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      )}
      <InputForm
        type="text"
        name="email"
        placeholder="Your Email Address"
        labelText="Email:"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputForm
        type="password"
        name="password"
        placeholder="Your Password"
        labelText="Password:"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <CustomButton type="submit" handleClick={submitForm} label={name} />
    </div>
  );
}
