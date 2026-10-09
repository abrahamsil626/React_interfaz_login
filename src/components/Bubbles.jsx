const BUBBLE_COUNT = 10;

// Cuadrados decorativos del fondo; tamaño, posición y ritmo se definen en styles.css.
export default function Bubbles() {
  return (
    <ul className="bg-bubbles" aria-hidden="true">
      {Array.from({ length: BUBBLE_COUNT }, (_, index) => (
        <li key={index} />
      ))}
    </ul>
  );
}
