const Button = ({ onClick, label, variant = 'primary', className = '', children }) => {
    const baseStyles = 'px-4 py-2 rounded focus:outline-none transition duration-300';
    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700',
      danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
      outline: 'bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-100 active:bg-gray-200',
      success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700',
    };
  
    // Dynamically combine base styles with the variant styles
    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
    return (
      <button onClick={onClick} className={buttonStyles}>
        {children || label}
      </button>
    );
  };
  
  export default Button;
  