# See /LICENSE for more information.
# This is free software, licensed under the GNU General Public License v2.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-ipinfo
PKG_VERSION:=1.0.3-20230919
PKG_MAINTAINER:=<https://github.com/animegasan>

LUCI_TITLE:=LuCI for IP Geolocation API
LUCI_PKGARCH:=all
LUCI_DESCRIPTION:=LuCI support for IP Geolocation API

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
