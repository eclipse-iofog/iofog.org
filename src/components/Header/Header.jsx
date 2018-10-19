import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import config from "../../../data/SiteConfig";

import "./Header.scss";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import each from "lodash/each";
import some from "lodash/some";

function toggleMenu() {
  const parent = document.getElementsByClassName('wrapper')[0];

  const showMenu = () => {
    parent.classList.add('menu-opened');
    document.addEventListener('click', checkMenu);
  };
  const hideMenu = () => {
    parent.classList.remove('menu-opened');
    document.removeEventListener('click', checkMenu);
  };

  if (!parent.classList.contains('menu-opened')) {
    showMenu();
  } else {
    hideMenu();
  }

  return {
    hide: hideMenu,
    show: showMenu
  };
}

function checkMenu(e) {
  const menu = document.getElementById('nav');
  let targetElement = e.target;

  do {
    if (targetElement === menu) {
      return;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement);

  toggleMenu().hide();
}

const Header = ({ menuLinks }) => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-xl-3 col-lg-2 col-4 logo">
          <Link to="/">
            <img srcSet={config.siteLogo} alt="" />
          </Link>
        </div>

        <nav className="col-xl-6 col-lg-7 col-4 main-nav" id="nav">
          <button className="menu-opener" onClick={()=> toggleMenu()} />
          <div className="holder">
            {menuLinks.map(link => (
              <Link activeClassName="active" to={link.path} key={link.title}>{link.title}</Link>
            ))}
            <Link activeClassName="active" to="/community">Community</Link>
            <Link activeClassName="active" to="/enterprise">Enterprise</Link>
          </div>
        </nav>

        <div className="col-xl-3 col-lg-3 col-4 search">
          <div className="search__wrapper">
            <button type="submit">submit</button>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery1234 {
        allMarkdownRemark{
          group(field: frontmatter___type) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  type
                  version
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      function getCategoriesMenu() {
        const postList = [];
        const versions = [];
        const { activeLink, postEdges } = this.props;

        postEdges.forEach(postEdge => {
          const { type, version, title, category } = postEdge.node.frontmatter;
          const { slug } = postEdge.node.fields;
          let path = `/${type}${slug}`;

          if (version) {
            path = `/${type}/${version}${slug}`;
          }

          const list = {
            path,
            title,
            category,
            version
          };

          if (versions) {
            list.isActive = path === activeLink;
          }

          postList.push(list);
        });

        const versionsSort = sortBy(postList, "version");
        const versionsGroup = groupBy(versionsSort, "version");

        each(versionsGroup, (versionItems, version) => {
          const menus = [];

          each(groupBy(versionItems, "category"), (items, category) => {
            if (category === "null") {
              menus.push(...items);

              return;
            }

            if (items.length === 1) {
              menus.push({
                title: category,
                path: items[0].path,
                isActive: items[0].isActive
              });

              return;
            }

            menus.push({
              title: category,
              path: items[0].path,
              isActive: some(items, ["isActive", true]),
              items
            });
          });

          versions.push({
            label: `Version ${version}`,
            value: menus[0].path,
            isActive: some(menus, ["isActive", true]),
            items: menus
          });
        });

        const activeVersion = versions.find(version => version.isActive);

        return {versions, menus: activeVersion.items};
      }
      
      const { group } = data.allMarkdownRemark;

      const menuLinks = group.map(item => {
        const { type, version } = item.edges[0].node.frontmatter;

        let path = `${type}${item.edges[0].node.fields.slug}`;

        if (version) {
          path = `${type}/${version}${item.edges[0].node.fields.slug}`;
        }

        return {
          title: type,
          path
        }
      });

      return <Header menuLinks={menuLinks} {...props} />;
    }}
  />
)
