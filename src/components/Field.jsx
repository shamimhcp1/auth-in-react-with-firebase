import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);

  return (
    <div className="flex flex-col items-start justify-start m-2">
      {label && (
        <label  htmlFor={id} className="mb-1">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div className="mt-2 text-sm text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}

function getChildId(children) {
  const child = React.Children.only(children);

  if("id" in child?.props) {
    return child.props.id;
  }
}
