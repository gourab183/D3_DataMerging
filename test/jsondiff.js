module.exports = (function(){
  return {
    compareJSONStrings: function(expectedJSONStr, actualJSONStr) {
      if (!expectedJSON || !actualJSON) {
        return;
      }
      return compareObjects(JSON.parse(expectedJSONStr), JSON.parse(actualJSONStr));
    },
    compareJSONObjects:   function(expectedJSON, actualJSON) {
      if (!expectedJSON || !actualJSON) {
        return;
      }
      var expectedDataSet = new Set(toDataMap(expectedJSON));
      var actualJSONObjs = actualJSON;
      var diffs = [];
      var matched = [];
      actualJSONObjs.forEach(function(obj) {
        var actual = toObjValueHash(obj);
        if (expectedDataSet.has(actual)) {
          matched.push(obj);
        } else {
          diffs.push(obj);
        }
      });
      if (diffs.length > 0) {
        // console.log("Differs by ", diffs.length);
        // console.log("Differences: ", diffs);
        return {
          diffs: diffs.length,
          diffObjs : diffs
        }
      } else {
        // console.log("Data is Same");
        return {
          diffs: diffs.length,
          diffObjs : []
        }
      }
      function toDataMap(data) {
        return data.map(toObjValueHash);
      }
      function toObjValueHash(obj) {
        // return Object.values(obj).sort().join(';');
        return objValues(obj).sort().join(';')
      }
      function objValues(obj) {
        let keys = Object.keys(obj);
        let values = [];
        keys.forEach(function(keyName) {
          let val = obj[keyName];
          values.push(val);
        });
        return values;
      }
    }
  };
})();
