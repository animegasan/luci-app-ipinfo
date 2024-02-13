/* This is free software, licensed under the Apache License, Version 2.0
 *
 * Copyright (C) 2024 Hilman Maulana <hilman0.0maulana@gmail.com>
 */

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
		return fs.exec('curl', ['-s', '-m', '5', '-o', '/dev/null', 'https://www.google.com'])
			.then(function (result) {
				if (result.code === 0) {
					return fs.exec('curl', ['-sL', 'ip.guide'])
						.then(function (result) {
							var data = JSON.parse(result.stdout);
							self.ipData = data;
						})
						.then(function () {
							return uci.load('ipinfo').then(function () {
								self.ipInfoConfig = uci.get('ipinfo', 'config');
							});
						});
				} else {
					return 'No internet connection.';
				}
			});
	},
	render: function (data) {
		if (this.ipData === undefined || this.ipInfoConfig === undefined) {
			return 'No internet connection.';
		}
		var table = E('table', { 'class': 'table' });
		var uciget = {
			'ip': 'ip',
			'network.autonomous_system.name': 'name',
			'network.autonomous_system.organization': 'organization',
			'network.autonomous_system.asn': 'asn',
			'location.city': 'city',
			'location.country': 'country',
			'location.timezone': 'timezone',
			'location.latitude': 'latitude',
			'location.longitude': 'longitude'
		};
		var propertiesToShow = {
			'Public IP': 'ip',
			'Provider': 'network.autonomous_system.name',
			'Organization': 'network.autonomous_system.organization',
			'ASN Number': 'network.autonomous_system.asn',
			'City': 'location.city',
			'Country': 'location.country',
			'Timezone': 'location.timezone',
			'Latitude': 'location.latitude',
			'Longitude': 'location.longitude'
		};
		for (var key in propertiesToShow) {
			if (propertiesToShow.hasOwnProperty(key)) {
				var value = this.ipData;
				var keyParts = propertiesToShow[key].split('.');
				for (var i = 0; i < keyParts.length; i++) {
					value = value[keyParts[i]];
				}
				if (value !== undefined && this.ipInfoConfig[uciget[propertiesToShow[key]]] === '1') {
					table.appendChild(E('tr', { 'class': 'tr' }, [
						E('td', { 'class': 'td left', 'width': '33%' }, [key]),
						E('td', { 'class': 'td left' }, [value])
					]));
				}
			}
		}
		return table;
	}
});
