import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DocsSidebar.scss';

const pathForSubMenu = sub => sub.entry.childMarkdownRemark.fields.slug;

class DocsSidebar extends Component {
  state = {
    openMenu: null
  };
  render() {
    const { versions, activeVersion, activePath } = this.props;
    const { menus } = activeVersion.node;
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
            const indexPath = pathForSubMenu(subMenus[0]);
            const classNames = ['item-container'];
            const menuIsActive = subMenus.some(sub => {
              return activePath === pathForSubMenu(sub);
            });

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
                    {menu.subMenus.map((item, i) => (
                      <Link
                        activeClassName="active"
                        to={pathForSubMenu(item)}
                        key={i}
                      >
                        {item.title}
                      </Link>
                    ))}
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
