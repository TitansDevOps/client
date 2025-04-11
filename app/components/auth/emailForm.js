import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onSubmit(newEmail);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        required
        value={email}
        onChange={handleChange}
      />
    </div>
  );
};
