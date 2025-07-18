import React from "react";
import { Link, useLocation } from "react-router-dom";

const Banner: React.FC = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean); 

  const buildBreadcrumbs = () => {
    const breadcrumbs = [];

    breadcrumbs.push(
      <Link key="home" className="breadcrumb-item nav-link" to="/">
        Home
      </Link>
    );

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      if (isLast) {
        breadcrumbs.push(
          <span key={path} className="breadcrumb-item active" aria-current="page">
            {decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1))}
          </span>
        );
      } else {
        breadcrumbs.push(
          <Link key={path} className="breadcrumb-item nav-link" to={path}>
            {decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1))}
          </Link>
        );
      }
    });

    return breadcrumbs;
  };

  return (
    <section id="banner" className="py-3" style={{ background: "#F9F3EC" }}>
      <div className="container">
        <div className="hero-content py-5 my-3">
          <h2 className="display-1 mt-3 mb-0">
            {pathSegments.length > 0
              ? decodeURIComponent(pathSegments[pathSegments.length - 1])
                  .charAt(0)
                  .toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
              : "Home"}
          </h2>
          <nav className="breadcrumb">{buildBreadcrumbs()}</nav>
        </div>
      </div>
    </section>
  );
};

export default Banner;