import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import some from "lodash/some";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PostListing.scss";

class PostListing extends Component {
  getCategoriesMenu() {
    const { versions, type } = this.props.postEdges;

    const mewVersions = versions.map(version => {
      let path = `/${type}`;

      if (version.version || version.version === 0) {
        path = `/${type}/${version.version === 0 ? "0.0" : version.version}`;
      }

      const newMenu = version.menus.map(menu => {
        const subMenus = this.formatSubMenu(menu.subMenus, path);

        const menuItem = {
          title: menu.title,
          path: subMenus[0].path,
          isActive: some(subMenus, ["isActive", true])
        };

        if (subMenus && subMenus.length > 1) {
          menuItem.subMenus = subMenus;
        }

        return menuItem;
      });

      return {
        label: version.title,
        menus: newMenu,
        value: newMenu[0].path,
        isActive: some(newMenu, ["isActive", true])
      };
    });

    const activeVersion = mewVersions.find(version => version.isActive);

    return { versions: mewVersions, menus: activeVersion ? activeVersion.menus : [], activeVersion };
  }

  formatSubMenu(items, path) {
    if (!items || items.length === 0) {
      return [];
    }

    const { activeLink } = this.props;

    return items.map(item => {
      const { frontmatter, fields } = item.entry.childMarkdownRemark;
      const fullPath = `${path}${fields.slug}`;

      return {
        title: frontmatter.title,
        path: `${path}${fields.slug}`,
        isActive: fullPath === activeLink
      };
    });
  }

  render() {
    function onSelect(data) {
      navigate(data.value);
    }

    const { versions, menus, activeVersion } = this.getCategoriesMenu();

    return (
      <div className="posts-menu">
        {versions.length > 1 &&
        <Dropdown options={versions} onChange={onSelect} value={activeVersion} placeholder="Select an option"/>}

        <div className="menu-body">
          {menus.map(menu => (
            <div key={menu.title} className={["item-container", menu.isActive ? "active open" : ""].join(" ")}>
              <Link to={menu.path} key={menu.title}>{menu.title}</Link>
              {menu.subMenus &&
              <div className="sub-menu active">
                {menu.subMenus.map(item => (
                  <Link activeClassName="active" to={item.path} key={item.title}>{item.title}</Link>
                ))}
              </div>
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PostListing;
