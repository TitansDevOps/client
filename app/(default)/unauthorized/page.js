export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-extrabold text-gray-950 mb-4">
        ¿Estás perdido?
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        No tienes permisos para ver esta página.
      </p>
      <img
        src="https://st5.depositphotos.com/1024381/66563/v/450/depositphotos_665638466-stock-illustration-walking-cat-portrait-drawn-ink.jpg"
        alt="Gato"
        className="w-64 h-auto rounded-lg shadow-lg"
      />
      <p className="mt-8 text-sm text-gray-500">
        Si crees que esto es un error, contacta con el administrador.
      </p>
    </div>
  );
}
