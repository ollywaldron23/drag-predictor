export const CircleShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <circle cx="50" cy="50" r="40" fill="#00bfff" />
  </svg>
);

export const FlatPlateShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="xMidYMid meet">
    <rect x="0" y="0" width="100" height="20" fill="#00bfff" />
  </svg>
);

export const EllipseShape = ({ aspectRatio }) => {
  const rx = 45;
  const ry = 45 / aspectRatio;

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="50" rx={rx} ry={ry} fill="#00bfff" />
    </svg>
  );
};
