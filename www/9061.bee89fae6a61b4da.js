"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9061],{9061:(s,r,n)=>{n.r(r),n.d(r,{ScreenOrientationWeb:()=>a});var t=n(467),o=n(5083);class a extends o.E_{constructor(){super(),typeof screen<"u"&&typeof screen.orientation<"u"&&screen.orientation.addEventListener("change",()=>{const e=screen.orientation.type;this.notifyListeners("screenOrientationChange",{type:e})})}orientation(){var e=this;return(0,t.A)(function*(){if(typeof screen>"u"||!screen.orientation)throw e.unavailable("ScreenOrientation API not available in this browser");return{type:screen.orientation.type}})()}lock(e){var i=this;return(0,t.A)(function*(){if(typeof screen>"u"||!screen.orientation||!screen.orientation.lock)throw i.unavailable("ScreenOrientation API not available in this browser");try{yield screen.orientation.lock(e.orientation)}catch{throw i.unavailable("ScreenOrientation API not available in this browser")}})()}unlock(){var e=this;return(0,t.A)(function*(){if(typeof screen>"u"||!screen.orientation||!screen.orientation.unlock)throw e.unavailable("ScreenOrientation API not available in this browser");try{screen.orientation.unlock()}catch{throw e.unavailable("ScreenOrientation API not available in this browser")}})()}}}}]);