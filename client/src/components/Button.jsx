const Button = ({ children, onClick, type="button", disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;
