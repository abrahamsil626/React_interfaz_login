// El saludo es el título de la franja (ver App.jsx); aquí solo va la acción de salir.
export default function WelcomeScreen({ onLogout }) {
  return (
    <div className="overlay overlay--welcome">
      <button type="button" className="btn" onClick={onLogout} autoFocus>
        Salir
      </button>
    </div>
  );
}
