"use client";

import { useState } from "react";

export default function ClientsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function addClient() {
    const res = await fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone_number: phone,
      }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) alert("Client added!");
    else alert("Error adding client");
  }

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addClient}>Add Client</button>
    </div>
  );
}
