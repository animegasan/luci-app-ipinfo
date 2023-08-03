'use strict';
'require uci';
'require view';

return view.extend({
  title:_('IP Information'),
  handleSaveApply: null,
  handleSave: null,
  handleReset: null,
  load: function() {
    return Promise.all([
      uci.load('ipinfo')
    ]);
  },
  render: function(data) {
    var sections = uci.sections('ipinfo');
    var table = E('table',{'class':'table'});
    table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width':'33%' }, ['IP Public']), E('td', { 'class': 'td left' }, [sections[0].ip])]));
    table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width':'33%' }, ['Provider']), E('td', { 'class': 'td left' }, [sections[0].isp])]));
    table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width':'33%' }, ['Region']), E('td', { 'class': 'td left' }, [sections[0].city])]));
    table.appendChild(E('tr', { 'class': 'tr' }, [E('td', { 'class': 'td left', 'width':'33%' }, ['Country']), E('td', { 'class': 'td left' }, [sections[0].country])]));
    console.log(sections);
    return table;
  }
  });


