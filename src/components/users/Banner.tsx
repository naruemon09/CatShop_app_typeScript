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
      <Link key="หน้าหลัก" className="breadcrumb-item nav-link" to="/">
        หน้าหลัก
      </Link>
    );

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      if (isLast) {
        breadcrumbs.push(
          <span key={path} className="breadcrumb-item active" aria-current="page">
            {decodeURIComponent(segment)}
          </span>
        );
      } else {
        breadcrumbs.push(
          <Link key={path} className="breadcrumb-item nav-link" to={path}>
            {decodeURIComponent(segment)}
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
              : "หน้าหลัก"}
          </h2>
          <nav className="breadcrumb">{buildBreadcrumbs()}</nav>
        </div>
      </div>
    </section>
  );
};

export default Banner;
