import React, { Component } from "react";
import { Link, navigate } from "gatsby";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PostListing.scss";
import getCategoriesMenu from "../../helpers/index";

class PostListing extends Component {
  state = {
    openMenu: null
  };
  render() {
    function onSelect(data) {
      navigate(data.value);
    }

    const { versions, menus, activeVersion } = getCategoriesMenu(this.props.postEdges, this.props.activeLink);
    const { openMenu } = this.state;

    return (
      <div className="posts-menu">
        {versions.length > 1 &&
        <Dropdown options={versions} onChange={onSelect} value={activeVersion} placeholder="Select an option" />}

        <div className="menu-body">
          {menus.map(menu => {
            const classNames = ["item-container"];
            if (menu.isActive) {
              classNames.push("active");
            }

            if (menu.isActive || openMenu === menu.path) {
              classNames.push("open");
            }

            return (
              <div
                key={menu.title}
                className={classNames.join(" ")}
              >
                <button onClick={() => {
                  if (openMenu === menu.path) {
                    this.setState({ openMenu: null });
                  } else {
                    this.setState({ openMenu: menu.path });
                  }
                }}>
                  {menu.title}
                </button>
                {menu.subMenus &&
                  <div className="sub-menu active">
                    {menu.subMenus.map(item => (
                      <Link activeClassName="active" to={item.path} key={item.title}>{item.title}</Link>
                    ))}
                  </div>
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostListing;
