export default function LoadingScreen() {
  return (
    <div className="overlay" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>Cargando...</p>
    </div>
  );
}
