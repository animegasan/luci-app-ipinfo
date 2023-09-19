'use strict';
'require view';
'require uci';

return view.extend({
  title: _('IP Information'),
  handleSaveApply: null,
  handleSave: null,
  handleReset: null,
  load: function () {
    // Initialize the 'this' variable for access within promises
    var self = this;

    // List of properties to fetch from the API
    var propertiesToFetch = [
      'query',
      'isp',
      'asname',
      'as',
      'city',
      'regionName',
      'country',
      'continent',
      'lat',
      'lon',
      'offset'
    ];

    // Create a URL with the desired fields
    var apiUrl = 'http://ip-api.com/json/?fields=' + propertiesToFetch.join(',');

    // Fetch IP data from ip-api.com using HTTP
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        self.ipData = data; // Save IP data to the 'ipData' variable
      })
      .then(function () {
        // Use UCI to fetch the 'ipinfo' configuration from OpenWrt or LEDE system
        return uci.load('ipinfo').then(function () {
          self.ipInfoConfig = uci.get('ipinfo', 'config');
        });
      });
  },
  render: function (data) {
    if (!this.ipData || !this.ipInfoConfig) {
      // If IP data or 'ipinfo' configuration is not available yet, display a loading message or other content
      return 'Loading IP information...';
    }

    // Create a table with selected information from ip-api.com
    var table = E('table', { 'class': 'table' });
    
    // List of properties to display with corresponding labels
    var propertiesToShow = {
      'Public IP': 'query',
      'Provider': 'isp',
      'AS Name': 'asname',
      'AS Number': 'as',
      'City' : 'city',
      'Region' : 'regionName',
      'Country' : 'country',
      'Continent': 'continent',
      'Latitude': 'lat',
      'Longitude': 'lon',
      'Offset': 'offset'
    };

    // Iterate through properties to display
    for (var label in propertiesToShow) {
      if (propertiesToShow.hasOwnProperty(label)) {
        var key = propertiesToShow[label];
        var value = this.ipData[key];

        // Check 'ipinfo' configuration to determine if this value should be printed
        if (value !== undefined && this.ipInfoConfig[key] === '1') {
          table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width': '33%' }, [label]), E('td', { 'class': 'td left' }, [value])]));
        }
      }
    }

    return table;
  }
});
