'use strict';
'require view';
'require form';

return view.extend({
	render: function () {
		var m, s, o;
		m = new form.Map('ipinfo', _('IP Information'), _('Shows public ip information in Overview LuCI with ifconfig.co. <br/><br/><a href="https://github.com/animegasan" target="_blank">Powered by animegasan</a>'));

		s = m.section(form.TypedSection, 'ipinfo');
		s.anonymous = true;

		// Provider information
		o = s.tab('isp', _('Provider Information'));
		o = s.taboption('isp', form.Flag, 'ip', _('Public IP'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('isp', form.Flag, 'asn_org', _('Provider'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('isp', form.Flag, 'asn', _('AS Number'));
		o.default = '1';
		o.rmempty = false;

		// Location information
		o = s.tab('loc', _('Location Information'));
		o = s.taboption('loc', form.Flag, 'city', _('City'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('loc', form.Flag, 'region_name', _('Region'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('loc', form.Flag, 'country', _('Country'));
		o.default = '1';
		o.rmempty = false;

		// Coordinate information
		o = s.tab('co', _('Coordinate Information'));
		o = s.taboption('co', form.Flag, 'latitude', _('Latitude'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('co', form.Flag, 'longitude', _('Longitude'));
		o.default = '1';
		o.rmempty = false;

		return m.render();
	},
});
