import "./title.css";

// eslint-disable-next-line react/prop-types
const Title = ({ children, name }) => {
  return (
    <div className="title">
      {children}
      <span>{name}</span>
    </div>
  );
};

export default Title;
