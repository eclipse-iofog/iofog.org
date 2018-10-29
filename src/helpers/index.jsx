import some from "lodash/some";

function formatSubMenu(items, path, activeLink) {
  if (!items || items.length === 0) {
    return [];
  }

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

export default function getCategoriesMenu(params, activeLink) {
  const { versions, type } = params;

  const newVersions = versions.map(version => {
    let path = `/${type}`;

    if (version.version || version.version === "0.0.0") {
      path = `/${type}/${version.version}`;
    }

    const newMenu = version.menus.map(menu => {
      const subMenus = formatSubMenu(menu.subMenus, path, activeLink);

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

  const lastVersion = newVersions[newVersions.length -1];
  const activeVersion = newVersions.find(version => version.isActive);

  return {
    title: type,
    path: activeVersion ? activeVersion.menus[0].path : lastVersion.menus[0].path,
    versions: newVersions,
    menus: activeVersion ? activeVersion.menus : lastVersion.menus,
    activeVersion
  };
}