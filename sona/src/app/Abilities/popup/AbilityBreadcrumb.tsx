import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import AbilitiesContext from "../SharedContext";
const AbilityBreadcrumb = () => {
  const breadcrumbList = ["Overview", "Player Tips", "Add Tips", "Tutorials"];
  const { breadCrumb, setBreabcrumb } = React.useContext(AbilitiesContext);
  const switchBreadcrumb = (index: number) => {
    setBreabcrumb((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <Breadcrumbs aria-label="breadcrumbs" separator=" ♡ " size="lg">
      {breadcrumbList.map((index: number, item: string) => (
        <Link key={item} color="neutral" href="#basics">
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default AbilityBreadcrumb;
