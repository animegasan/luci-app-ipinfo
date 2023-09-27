module("luci.controller.ipinfo", package.seeall)

function index()
    entry({"admin", "services", "ipinfo"}, cbi("ipinfo"), _("IP Information"), 10)
    entry({"admin", "services", "ipinfo", "ipstatus"}, call("act_status"))
end

function act_status()
    local status = {}
    -- Define the properties to fetch from the IP API
    local propertiesToFetch = {
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
    }
    local api_url = "http://ip-api.com/json/?fields=" .. table.concat(propertiesToFetch, ',')
    local response = luci.sys.exec("curl -s " .. api_url)
    local json_decode = luci.jsonc.parse(response)
    
    -- Populate the status table with the fetched property values
    for _, property in ipairs(propertiesToFetch) do
        if json_decode[property] then
            status[property] = json_decode[property]
        else
            status[property] = "Not Available"
        end
    end
    
    luci.http.prepare_content("application/json")
    luci.http.write_json(status)
end
