import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import groupBy from "lodash/groupBy";
import some from "lodash/some";
import each from "lodash/each";
import sortBy from "lodash/sortBy";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import "./PostListing.scss";

class PostListing extends Component {
  getCategoriesMenu() {
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

    return {versions, menus: activeVersion ? activeVersion.items : []};
  }

  render() {

    function onSelect(data) {
      navigate(data.value);
    }

    const {versions, menus} = this.getCategoriesMenu();

    const defaultOption = versions.find(item => item.isActive);

    return (
      <div className="posts-menu">
        {versions.length > 1 && <Dropdown options={versions} onChange={onSelect} value={defaultOption} placeholder="Select an option" />}

        <div className="menu-body">
          {menus.map(menu => (
            <div key={menu.title} className={["item-container", menu.isActive ? "active open" : ""].join(" ")}>
              <Link to={menu.path} key={menu.title}>{menu.title}</Link>
              {menu.items &&
              <div className="sub-menu active">
                {menu.items.map(item => (
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
