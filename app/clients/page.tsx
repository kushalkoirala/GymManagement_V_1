"use client";

import { useState } from "react";

export default function ClientsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function addClient() {
    await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify({
        name,
        phone_number: phone,
      }),
    });
    alert("Client added");
  }

  return (
    <div>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <button onClick={addClient}>Add Client</button>
    </div>
  );
}
