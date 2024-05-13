import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import AbilitiesContext from "../SharedContext";
const AbilityBreadcrumb = () => {
  const breadcrumbList = ["Overview", "Player Tips", "Add Tips", "Tutorials"];
  const { breadCrumbs, setBreadcrumbs } = React.useContext(AbilitiesContext);
  const switchBreadcrumbs = (index: number) => {
    setBreadcrumbs((prevState) => {
      const breadcrumbPrev = [...prevState];
      // for some reason !breadcrumbPrev[index].active doesnt work :thinking:
      breadcrumbPrev[0].active = false;
      breadcrumbPrev[index].active = true;
      return breadcrumbPrev;
    });
  };
  return (
    <Breadcrumbs aria-label="breadcrumbs" separator=" ♡ " size="lg">
      {breadcrumbList.map((item, index) => (
        <Link
          // key={item}
          color="neutral"
          href="#basics"
          onClick={() => switchBreadcrumbs(index)}
        >
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default AbilityBreadcrumb;
