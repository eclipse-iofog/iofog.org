import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DocsSidebar.scss';

const pathForSubMenu = (sub, versionPath) => {
  if (!sub || !sub.entry) {
    return null;
  }

  if (
    typeof sub.entry === 'object' &&
    sub.entry.childMarkdownRemark &&
    sub.entry.childMarkdownRemark.fields
  ) {
    return sub.entry.childMarkdownRemark.fields.slug;
  }

  if (typeof sub.entry === 'string') {
    const normalizedVersionPath = versionPath.endsWith('/')
      ? versionPath
      : `${versionPath}/`;
    const relativePath = sub.entry.replace(/^\.\//, '');
    return `${normalizedVersionPath}${relativePath.replace(/\.md$/, '.html')}`;
  }

  return null;
};

const submenuIsActive = (sub, activePath, versionPath) => {
  const ownPath = pathForSubMenu(sub, versionPath);
  if (ownPath && ownPath === activePath) {
    return true;
  }
  if (!sub || !sub.subMenus) {
    return false;
  }
  return sub.subMenus.some(item => submenuIsActive(item, activePath, versionPath));
};

class DocsSidebar extends Component {
  state = {
    openMenu: null
  };

  renderSubMenus(items, activePath, versionPath, level = 0) {
    if (!items || !items.length) {
      return null;
    }

    return items.map((item, i) => {
      const itemPath = pathForSubMenu(item, versionPath);
      const hasChildren = item.subMenus && item.subMenus.length > 0;
      const itemIsActive = submenuIsActive(item, activePath, versionPath);

      if (!hasChildren) {
        if (!itemPath) {
          return null;
        }
        return (
          <Link
            activeClassName="active"
            to={itemPath}
            key={`${level}-${i}-${item.title}`}
            className={level > 0 ? 'nested-link' : ''}
          >
            {item.title}
          </Link>
        );
      }

      return (
        <div
          key={`${level}-${i}-${item.title}`}
          className={`sub-menu-group ${itemIsActive ? 'active' : ''}`}
        >
          {itemPath ? (
            <Link
              activeClassName="active"
              to={itemPath}
              className={`group-link ${level > 0 ? 'nested-link' : ''}`}
            >
              {item.title}
            </Link>
          ) : (
            <span className={`group-link ${level > 0 ? 'nested-link' : ''}`}>
              {item.title}
            </span>
          )}
          <div className="sub-menu nested">
            {this.renderSubMenus(item.subMenus, activePath, versionPath, level + 1)}
          </div>
        </div>
      );
    });
  }

  render() {
    const { versions, activeVersion, activePath } = this.props;
    const { menus } = activeVersion.node;
    const versionPath = activeVersion.node.fields.path;
    const { openMenu } = this.state;

    return (
      <div className="posts-menu">
        {versions.length > 1 && (
          <Dropdown
            options={versions.map(edge => ({
              label: edge.node.version,
              value: edge.node.fields.path
            }))}
            onChange={data => {
              // We want version switching to go back to default page
              const path = data.value;
              navigate(path);
            }}
            value={{
              label: activeVersion.node.version,
              value: activeVersion.node.fields.path
            }}
            placeholder="Select an option"
          />
        )}

        <div className="menu-body">
          {menus.map(menu => {
            const { subMenus } = menu;
            const indexPath =
              pathForSubMenu(subMenus[0], versionPath) || `menu-${menu.title}`;
            const classNames = ['item-container'];
            const menuIsActive = subMenus.some(sub =>
              submenuIsActive(sub, activePath, versionPath)
            );

            if (menuIsActive) {
              classNames.push('active');
            }

            if (menuIsActive || openMenu === indexPath) {
              classNames.push('open');
            }

            return (
              <div key={menu.title} className={classNames.join(' ')}>
                <button
                  onClick={() => {
                    if (openMenu === indexPath) {
                      this.setState({ openMenu: null });
                    } else {
                      this.setState({ openMenu: indexPath });
                    }
                  }}
                >
                  {menu.title}
                </button>
                {menu.subMenus && (
                  <div className="sub-menu active">
                    {this.renderSubMenus(menu.subMenus, activePath, versionPath)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DocsSidebar;
