"use client";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/context/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();

  const navigateToCenters = () => {
    router.push("/adoption-centers");
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1>Dashboard de Adopción</h1>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-4">
            <Card title="Centros de Adopción" className="shadow-3">
              <p>Gestiona los centros registrados.</p>
              <Button
                label="Ver Centros"
                icon="pi pi-list"
                onClick={navigateToCenters}
              />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
