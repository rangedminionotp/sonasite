import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

const AbilityBreadcrumb = () => {
  const breadcrumbList = ["Overview", "Player Tips", "Add Tips"];
  return (
    <Breadcrumbs aria-label="breadcrumbs">
      {breadcrumbList.map((item: string) => (
        <Link key={item} color="neutral" href="#basics">
          {item}
        </Link>
      ))}
      <Typography>Dr. Zoidberg</Typography>
    </Breadcrumbs>
  );
};

export default AbilityBreadcrumb;
