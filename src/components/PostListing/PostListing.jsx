import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PostListing.scss";
import getCategoriesMenu from "../../helpers/index";

class PostListing extends Component {
  render() {
    function onSelect(data) {
      navigate(data.value);
    }

    const { versions, menus, activeVersion } = getCategoriesMenu(this.props.postEdges, this.props.activeLink);

    return (
      <div className="posts-menu">
        {versions.length > 1 &&
        <Dropdown options={versions} onChange={onSelect} value={activeVersion} placeholder="Select an option" />}

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
