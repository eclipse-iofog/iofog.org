exports.shouldUpdateScroll = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
  if (prevRouterProps) {
    const { location: oldLocation } = prevRouterProps;
    const { location: newLocation } = routerProps;
    // Gatsby's automatic scrolling behavior conflicts with Swagger UI
    // because it uses <a> anchors and Gatsby hijacks
    const isSwaggerChange = oldLocation.pathname === newLocation.pathname
      && newLocation.pathname.match(/\/rest-api-reference$/);

      return !isSwaggerChange;
  }

  return true;
};
