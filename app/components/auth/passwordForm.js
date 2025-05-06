import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import styles from "../../../styles/globals.css";

export const PasswordForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    if (password.length === 0) return;
    setIsPasswordValid(passwordRegex.test(password) && password.length >= 8);
    setIsPasswordMatch(password === confirmPassword);
    if (
      password &&
      confirmPassword &&
      passwordRegex.test(password) &&
      password === confirmPassword
    ) {
      onSubmit(password);
    }
  }, [password, confirmPassword]);

  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
          >
            {showPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
        {!isPasswordValid && (
          <p className="text-red-500 text-xs">
            La contraseña debe tener al menos 8 caracteres, incluyendo
            mayúsculas, minúsculas, números y caracteres especiales.
          </p>
        )}
      </div>
      <div className="grid gap-2 pt-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
          >
            {showConfirmPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
        {!isPasswordMatch && (
          <p className="text-red-500 text-xs">Las contraseñas no coinciden.</p>
        )}
      </div>
    </div>
  );
};
