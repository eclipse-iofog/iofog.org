import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import config from "../../../data/SiteConfig";

import "./Header.scss";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import each from "lodash/each";
import some from "lodash/some";

function activateMainMenu() {
  const menu = document.getElementById('nav');
  const selector = menu.getElementsByClassName('doc-menu')[0];

  const addActiveClass = () => {
    selector.classList.add('menu-active');
  };
  const removeActiveClass = () => {
    selector.classList.remove('menu-active');
  };

  if (!selector.classList.contains('active')) {
    addActiveClass()
  }

  return {
    removeClass: removeActiveClass
  };
}

function toggleMenu() {
  const parent = document.getElementsByClassName('wrapper')[0];

  const showMenu = () => {
    parent.classList.add('menu-opened');
    document.addEventListener('click', checkMenu);
  };
  const hideMenu = () => {
    parent.classList.remove('menu-opened');
    activateMainMenu().removeClass();
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

const Header = ({ menuLinks, addMenu, location }) => (
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
          <div className={location.match(/documentations|releases/) ? 'holder doc-menu' : 'holder'}>
            <div className="main-menu">
              {menuLinks.map(link => (
                <Link activeClassName="active" to={link.path} key={link.title}>{link.title}</Link>
              ))}
              <Link activeClassName="active" to="/community">Community</Link>
              <Link activeClassName="active" to="/enterprise">Enterprise</Link>
            </div>

            {location.match(/documentations|releases/) &&
              <ul className="add-menu">
                <button className="back" onClick={()=> activateMainMenu()}>back</button>

                {addMenu.map(menu => (
                  <li key={menu.title}>
                    <Link activeClassName="active" to={menu.path} key={menu.title}>{menu.title}</Link>
                    {menu.items &&
                    <div className="wrap">
                      {menu.items.map(item => (
                        <Link activeClassName="active" to={item.path} key={item.title}>{item.title}</Link>
                      ))}
                    </div>
                    }
                  </li>
                ))}
              </ul>
            }
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
                  title
                  type
                  category
                  version
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      function getCategoriesMenu(post) {
        const postList = [];
        const versions = [];

        const postEdges = post.edges;
        const activeLink = window.location.pathname;
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

        return versions;
      }

      let addMenu;
      switch(props.location) {
        case ('documentations'):
          addMenu = getCategoriesMenu(data.allMarkdownRemark.group[0])
            .filter((item) => item.isActive === true);
          break;
        case('releases'):
          addMenu = getCategoriesMenu(data.allMarkdownRemark.group[1]);
          break;
        default:
          addMenu = '';
      }
      if (addMenu && addMenu.length > 0) {
        addMenu = addMenu[0].items;
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

      return <Header menuLinks={menuLinks} addMenu={addMenu} location={props} {...props} />;
    }}
  />
)