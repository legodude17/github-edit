function github(path, method='GET', headers={}, body=null, respType='json') {
  var token = sessionStorage.getItem('token');
  var user = localStorage.getItem('github-username');
  if (!token) {
    {token} = getData();
  }
  if (!user) {
    {user} = getData();
  }
  sessionStorage.setItem('token', token);
  localStorage.setItem('github-username', user)
  return request('https://api.github.com/' + path, method, Object.assign(headers, {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': user + ':' + token
  }), body, respType);
}
function getData() {
  return {token: prompt('Please enter your github token'), user: prompt('Please enter you username')};
}
function request(url, method, headers, body, respType) {
  var xml = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xml.open(method.toUpperCase(), url);
    if (headers) {
      for (var i in headers) {
        var v = headers[i];
        xml.setRequestHeader(i, v);
      }
    }
    if (respType) {
      xml.responseType = respType;
    }
    xml.send(body);
    xml.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(xml);
      }
    };
    xml.onerror = reject;
  });
}
