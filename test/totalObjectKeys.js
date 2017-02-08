module.exports = (function () {
    let totalNoObjects = 0, totalNoKeys = 0;
  return {
    traverse: traverse
  }
  // Traverse expected json
  function traverse(obj) {
        if (obj instanceof Array) {
        totalNoObjects = totalNoKeys + 1;
            obj.forEach(function (value) {
            if (typeof value === 'object' && value) {
                traverse(value);
            } else {
              totalNoKeys = totalNoKeys + 1;
            }
          });
      } else {
          totalNoObjects = totalNoKeys + 1;
          for (let prop in obj) {
              if (typeof obj[prop] === 'object' && obj[prop]) {
                  traverse(obj[prop]);
              } else {
                totalNoKeys = totalNoKeys + 1;
              }
          }
      }
      return {
        totalNoObjects: totalNoObjects,
        totalNoKeys: totalNoKeys
      };
  }
})();
