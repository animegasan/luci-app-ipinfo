# See /LICENSE for more information.
# This is free software, licensed under the GNU General Public License v3.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-ipinfo
PKG_VERSION:=2.0.1-20240110
PKG_MAINTAINER:=<https://github.com/animegasan>

LUCI_TITLE:=LuCI for ifconfig.co
LUCI_DEPENDS:=+curl
LUCI_PKGARCH:=all
LUCI_DESCRIPTION:=Displays IP address information in overview via ifconfig.co

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
