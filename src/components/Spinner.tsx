interface UseSpinnerProps {
  size?: number;
}
const Spinner = ({ size = 30 }: UseSpinnerProps) => {
  return (
    <svg className="animate-rotate absolute left-1/2 top-1/2 z-10" viewBox="0 0 50 50" width={size} height={size}>
      <circle
        className="animate-dash stroke-cyan-500"
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
