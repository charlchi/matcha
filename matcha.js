
function parseCookies (cstr) {
	var list = {};
	var rc = cstr;
	rc && rc.split(';').forEach((cookie) => {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
	});
	return list;
}

function log_out() {
	document.cookie = "login=";
	location.href = "/";
}