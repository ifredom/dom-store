export function withInstall(options) {
  options.install = function(app) {
    const { name } = options;
    app.component(name, options);
  };
  return options;
}
