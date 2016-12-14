function github(path, method='GET', headers={}, body=null, json=true) {
  var token = sessionStorage.getItem('token');
  if (!token) {
    token = getToken();
  }
  sessionStorage.setItem('token', token);
  return request('https://api.github.com/' + path, method, Object.assign(headers, {
    'Accept': 'application/vnd.github.v3+json',
    'authorization':'token ' + token
  }), body, json);
}
function getToken() {
  return prompt('Please enter your github token');
}
function request(url, method, headers, body, json) {
  var xml = new XMLHttpRequest();
  if (headers) {
    for (var i in headers) {
      var v = headers[i];
      xml.setRequestHeader(i, v);
    }
  }
  if (json) {
    xml
  return new Promse(function (resolve, reject) {
    xml.open(method.toUpperCase(), url);
    xml.send(body);
    xml.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(xml);
      }
    };
    xml.onerror = reject;
  });
}
