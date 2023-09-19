local a, t, e
a = Map("ipinfo", translate("IP Information Service"))
a.description = translate(
    "Shows public ip information in Overview LuCI with IP Geolocation API") ..
                    [[<br/><br/><a href="https://github.com/animegasan" target="_blank">Powered by animegasan</a>]]

t = a:section(NamedSection, "config", "ipinfo")
t.anonymous = true
t.addremove = false
--- provider information
t:tab("isp", translate("Provider Information"))
---- ip
e = t:taboption("isp", Flag, "query", translate("Public IP"))
e.default = 0
e.rmempty = false
---- isp
e = t:taboption("isp", Flag, "isp", translate("Provider"))
e.default = 0
e.rmempty = false
---- asname
e = t:taboption("isp", Flag, "asname", translate("AS Name"))
e.default = 0
e.rmempty = false
---- as
e = t:taboption("isp", Flag, "as", translate("AS Number"))
e.default = 0
e.rmempty = false
--- location information
t:tab("loc", translate("Location Information"))
---- city
e = t:taboption("loc", Flag, "city", translate("City"))
e.default = 0
e.rmempty = false
---- regionName
e = t:taboption("loc", Flag, "regionName", translate("Region"))
e.default = 0
e.rmempty = false
---- country
e = t:taboption("loc", Flag, "country", translate("Country"))
e.default = 0
e.rmempty = false
---- continent
e = t:taboption("loc", Flag, "continent", translate("Continent"))
e.default = 0
e.rmempty = false
--- coordinate information
t:tab("co", translate("Coordinate Information"))
---- lat
e = t:taboption("co", Flag, "lat", translate("Latitude"))
e.default = 0
e.rmempty = false
---- lon
e = t:taboption("co", Flag, "lon", translate("Longitude"))
e.default = 0
e.rmempty = false
---- offset
e = t:taboption("co", Flag, "offset", translate("Offset"))
e.default = 0
e.rmempty = false
return a
