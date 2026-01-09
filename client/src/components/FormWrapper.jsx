const FormWrapper = ({ children, title }) => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      {children}
    </div>
  );
};

export default FormWrapper;
