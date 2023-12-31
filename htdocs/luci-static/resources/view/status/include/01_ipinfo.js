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

    // Create a URL with the desired fields
    var apiUrl = '/cgi-bin/luci/admin/services/ipinfo/ipstatus';

    // Create a new XHR object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('GET', apiUrl, true);

    // Set up an event listener for when the request is complete
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        self.ipData = data; // Save IP data to the 'ipData' variable
      } else {
        // Handle error
        console.error('Failed to fetch IP data:', xhr.status, xhr.statusText);
      }
    };

    // Send the request
    xhr.send();

    // Use UCI to fetch the 'ipinfo' configuration from OpenWrt or LEDE system
    return uci.load('ipinfo').then(function () {
      self.ipInfoConfig = uci.get('ipinfo', 'config');
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
      'City': 'city',
      'Region': 'regionName',
      'Country': 'country',
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
