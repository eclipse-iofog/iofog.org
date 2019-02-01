import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { MdArrowForward } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

import SearchInput from './SearchInput';
import config from '../../../data/SiteConfig';
import siteLogo from '../../../static/images/logos/iofog.svg';
import './Header.scss';

function toggleMenu() {
  const parent = document.getElementsByClassName('page-wrapper')[0];

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

function activeItem(e) {
  const menuOpened = document.getElementsByClassName('menu-opened');

  if (e.target.classList.contains('sub-menu__links') && menuOpened.length > 0) {
    e.preventDefault();

    e.target.nextElementSibling.classList.add('active');
  }

  if (e.target.classList.contains('back')) {
    e.target.parentElement.classList.remove('active');
  }
}

function isActiveLink(activeLink, topLink) {
  return activeLink ? activeLink.match(`/${topLink.title}/`) : false;
}

const pathForSubMenu = sub => sub.entry.childMarkdownRemark.fields.slug;

const Header = ({ menuLinks, activeLink, docsConfig }) => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-xl-3 col-lg-2 col-4 logo">
          <Link to="/">
            <img srcSet={siteLogo} alt="" />
          </Link>
        </div>

        <nav className="col-xl-6 col-lg-7 col-4 main-nav" id="nav">
          <button className="menu-opener" onClick={toggleMenu} />
          <div className="holder">
            <ul className="main-menu" onClickCapture={activeItem}>
              {menuLinks.map(topLink => (
                <li key={topLink.title}>
                  <Link
                    className={
                      isActiveLink(activeLink, topLink)
                        ? 'active sub-menu__links'
                        : 'sub-menu__links'
                    }
                    to={topLink.path}
                  >
                    {topLink.title}
                  </Link>
                  <ul
                    className={
                      topLink.activeVersion && topLink.activeVersion.isActive
                        ? 'active sub-menu'
                        : 'sub-menu'
                    }
                  >
                    <button className="back">back</button>
                    <li>
                      <strong>{topLink.title}</strong>
                    </li>
                    {topLink.menus.map(menu => (
                      <li
                        key={menu.title}
                        className={menu.isActive ? 'active' : ''}
                      >
                        <Link
                          className={menu.subMenus ? 'sub-menu__links' : ''}
                          to={menu.path}
                        >
                          {menu.title}
                        </Link>
                        {menu.subMenus && (
                          <ul
                            className={
                              menu.isActive ? 'active sub-menu' : ' sub-menu'
                            }
                          >
                            <button className="back">back</button>
                            <li>
                              <strong>{menu.title}</strong>
                            </li>
                            {menu.subMenus.map(subMenu => (
                              <li key={subMenu.title}>
                                <Link
                                  activeClassName="active"
                                  to={subMenu.path}
                                >
                                  {subMenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li>
                <Link
                  className={
                    activeLink.startsWith('/docs/')
                      ? 'active sub-menu__links'
                      : 'sub-menu__links'
                  }
                  to="/docs/"
                >
                  Documentation
                </Link>
                <ul
                  className={
                    activeLink.startsWith('/docs/')
                      ? 'active sub-menu'
                      : 'sub-menu'
                  }
                >
                  <button className="back">back</button>
                  <li>
                    <strong>Documentation</strong>
                  </li>
                  {docsConfig.menus.map(menu => {
                    const { isActive, subMenus } = menu.subMenus.reduce(
                      (acc, subMenu) => {
                        const path = pathForSubMenu(subMenu);
                        if (path === activeLink) {
                          acc.isActive = true;
                        }
                        acc.subMenus.push(
                          <li key={subMenu.title}>
                            <Link activeClassName="active" to={path}>
                              {subMenu.title}
                            </Link>
                          </li>
                        );
                        return acc;
                      },
                      { isActive: false, subMenus: [] }
                    );

                    return (
                      <li key={menu.title} className={isActive ? 'active' : ''}>
                        <Link
                          className="sub-menu__links"
                          to={pathForSubMenu(menu.subMenus[0])}
                        >
                          {menu.title}
                        </Link>
                        <ul
                          className={isActive ? 'active sub-menu' : ' sub-menu'}
                        >
                          <button className="back">back</button>
                          <li>
                            <strong>{menu.title}</strong>
                          </li>
                          {subMenus}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <Link activeClassName="active" to="/releases.html">
                  Releases
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/community.html">
                  Community
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/enterprise.html">
                  Enterprise
                </Link>
              </li>
            </ul>

            <Link
              to="/docs/getting-started/quick-start.html"
              className="start-guide"
            >
              <span>Quick Start Guide</span>
              <MdArrowForward />
            </Link>
          </div>
        </nav>

        <div className="col-xl-3 col-lg-3 col-4 search">
          <SearchInput />
          <a
            className="header__github"
            href={config.userLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery1234 {
        allConfigJson {
          edges {
            node {
              version
              menus {
                title
                subMenus {
                  title
                  entry {
                    ...menuEntry
                  }
                }
              }
              fields {
                path
              }
            }
          }
        }
      }

      fragment menuEntry on File {
        childMarkdownRemark {
          fields {
            slug
          }
        }
      }
    `}
    render={data => {
      const activeLink =
        typeof window !== 'undefined' ? window.location.pathname : '';
      const menuLinks = [];
      const allConfigEdges = data.allConfigJson.edges
        .slice()
        .sort((a, b) => b.node.version.localeCompare(a.node.version));
      const docsConfigEdge = allConfigEdges.find(({ node }) => {
        return activeLink.startsWith(node.fields.path);
      });
      let docsConfig;
      // If no config is active, provide the latest.
      if (docsConfigEdge) {
        docsConfig = docsConfigEdge.node;
      } else {
        docsConfig = allConfigEdges[0].node;
      }

      return (
        <Header
          menuLinks={menuLinks}
          activeLink={activeLink}
          docsConfig={docsConfig}
          {...props}
        />
      );
    }}
  />
);
