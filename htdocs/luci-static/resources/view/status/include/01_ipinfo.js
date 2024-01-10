'use strict';
'require view';
'require uci';
'require fs';

return view.extend({
title: _('IP Information'),
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
	load: function () {
		var self = this;
		var apiUrl = 'https://ifconfig.co/json';

		return fs.exec('curl', ['-s', apiUrl])
		.then(function (result) {
			var data = JSON.parse(result.stdout);
			self.ipData = data;
		})
		.then(function () {
			return uci.load('ipinfo').then(function () {
				self.ipInfoConfig = uci.get('ipinfo', 'config');
			});
		});
	},
	render: function (data) {
		if (!this.ipData || !this.ipInfoConfig) {
			return 'Loading IP information...';
		}

		var table = E('table', { 'class': 'table' });
		var propertiesToShow = {
			'Public IP': 'ip',
			'Provider': 'asn_org',
			'ASN Number': 'asn',
			'City' : 'city',
			'Region' : 'region_name',
			'Country' : 'country',
			'Latitude': 'latitude',
			'Longitude': 'longitude'
		};

		for (var label in propertiesToShow) {
			if (propertiesToShow.hasOwnProperty(label)) {
				var key = propertiesToShow[label];
				var value = this.ipData[key];
			if (value !== undefined && this.ipInfoConfig[key] === '1') {
				table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width': '33%' }, [label]), E('td', { 'class': 'td left' }, [value])]));
			}
		}
	}

	return table;
	}
});
