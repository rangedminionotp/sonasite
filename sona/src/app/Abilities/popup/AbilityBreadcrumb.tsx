import React from "react";
import AbilitiesContext from "../SharedContext";

const AbilityBreadcrumb = () => {
  const breadcrumbList = ["Overview", "Player Tips", "Add Tips"];
  const { breadcrumbs, setBreadcrumbs } = React.useContext(AbilitiesContext);

  const switchBreadcrumbs = (index) => {
    setBreadcrumbs((prevState) => {
      const newBreadcrumbs = prevState.map((breadcrumb, i) => ({
        ...breadcrumb,
        active: i === index,
      }));
      return newBreadcrumbs;
    });
  };

  return (
    <nav
      aria-label="breadcrumbs"
      className="text-3xl font-bold flex justify-center items-center"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.label}>
          <a
            href="#basics"
            onClick={(e) => {
              e.preventDefault();
              switchBreadcrumbs(index);
            }}
            className={`${
              breadcrumb.active ? "text-blue-300 font-bold" : "text-gray-400"
            } cursor-pointer hover:text-blue-300`}
          >
            {breadcrumb.label}
          </a>
          {index < breadcrumbs.length - 1 && (
            <span className="mx-2 text-pink-300">♡</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AbilityBreadcrumb;
