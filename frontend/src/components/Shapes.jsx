export const CircleShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <circle cx="50" cy="50" r="40" fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
  </svg>
);

export const FlatPlateShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="xMidYMid meet">
    <rect x="0" y="0" width="100" height="20" fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
  </svg>
);

export const EllipseShape = ({ aspectRatio = 1 }) => {
  const rx = 45;
  const ry = 45 / aspectRatio;
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="50" cy="50" rx={rx} ry={ry} fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
    </svg>
  );
};

export const RectangleShape = ({ aspectRatio = 1 }) => {
  const width = 90 * aspectRatio;
  const height = 90;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width={width} height={height} fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
    </svg>
  );
};

export const ParallelogramShape = ({ aspectRatio = 1 }) => {
  const width = 90 * aspectRatio;
  const height = 60;
  // Points for a parallelogram with slant
  const points = `${15},0 ${width},0 ${width - 15},${height} 0,${height}`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <polygon points={points} fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
    </svg>
  );
};

export const TriangleShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
    <polygon points="50,5 95,85 5,85" fill="#c4c4c4" stroke="#989898" strokeWidth="2" />
  </svg>
);

export const HexagonShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 86" preserveAspectRatio="xMidYMid meet">
    <polygon
      points="50,5 90,25 90,61 50,81 10,61 10,25"
      fill="#c4c4c4"
      stroke="#989898"
      strokeWidth="2"
    />
  </svg>
);

export const StarShape = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <polygon
      points="50,5 61,39 98,39 68,59 79,91 50,70 21,91 32,59 2,39 39,39"
      fill="#c4c4c4"
      stroke="#989898"
      strokeWidth="2"
    />
  </svg>
);
