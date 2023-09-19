module("luci.controller.ipinfo", package.seeall)
function index()
    entry({"admin", "services", "ipinfo"}, cbi("ipinfo"), _("IP Information"),10)
end
