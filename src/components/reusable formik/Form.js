const Form1 = {
  input: ({ label, ...rest }) => {
    return (
      <div className="mb-3">
        {label && <label className="form-label">{label}</label>}
        <input {...rest} className="form-control" />
      </div>
    );
  },
  textarea: ({ label, ...rest }) => {
    return (
      <div className="mb-3">
        {label && <label className="form-label">{label}</label>}
        <textarea {...rest} className="form-control" />
      </div>
    );
  },
};

export { Form1 };
