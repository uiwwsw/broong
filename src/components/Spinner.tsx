interface UseSpinnerProps {
  size?: number;
}
const Spinner = ({ size = 30 }: UseSpinnerProps) => {
  return (
    <svg className="spinner" viewBox="0 0 50 50" width={size} height={size}>
      <circle
        className="spinner__path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeLinecap="round"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};

export default Spinner;
