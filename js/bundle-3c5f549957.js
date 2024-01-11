! function () {
	"use strict";
	class e {
		static getOrAddComponent(e, t) {
			let i = e.getComponent(t);
			return null == i && (i = e.addComponent(t)), i
		}
		static removeComponent(e, t) {
			let i = e.getComponent(t);
			null != i && i.destroy()
		}
		static isNullOrEmpty(e) {
			return null == e || "string" == typeof e && "" === e
		}
		static getChildByName(e, t) {
			if (!t || 0 == t.length) return null;
			let i = e,
				n = null;
			for (let e = 0; e < t.length; e++) {
				let a = t[e];
				if (null == (n = i.getChildByName(a))) return null;
				i = n
			}
			return n
		}
	}
	class t {
		constructor() {
			this.D = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "S"], this.DLen = {
				K: 3,
				M: 6,
				B: 9,
				T: 12,
				P: 15,
				E: 18,
				Z: 21,
				Y: 24,
				S: 27
			}, this.arr = [], this.len = 0
		}
		setByShortString(e) {
			let t, i = e.length,
				n = i - 1,
				a = 0;
			if (this.arr = [], e.charCodeAt(n) > 57) {
				for (t = e.charAt(n), n = 0, a = this.DLen[t]; n < a; n++) this.arr.push(0);
				if (n = i - 3, 46 == e.charCodeAt(n))
					for (this.arr[a - 1] = parseInt(e.charAt(i - 2)); n--;) this.arr.push(parseInt(e.charAt(n)));
				else
					for (n = i - 1; n--;) this.arr.push(parseInt(e.charAt(n)))
			} else if (n = i - 2, 46 == e.charCodeAt(n))
				for (; n--;) this.arr.push(parseInt(e.charAt(n)));
			else
				for (n = i; n--;) this.arr.push(parseInt(e.charAt(n)));
			return this.len = this.arr.length, this
		}
		plus(e) {
			let t = [],
				i = 0,
				n = Math.max(e.len, this.len),
				a = 0,
				o = 0;
			for (; o < n; o++) a = i, o < this.len && (a += this.arr[o]), o < e.len && (a += e.arr[o]), a > 9 ? (i = 1, a -= 10) : i = 0, t.push(a);
			return 0 != i && t.push(i), this.arr = t, this.len = this.arr.length, this
		}
		minus(e) {
			let t = [],
				i = 0;
			if (e.len > this.len || e.len == this.len && this.arr[this.len - 1] < e.arr[this.len - 1]) t.push(0);
			else {
				let n = 0,
					a = this.len,
					o = 0;
				for (; i < a && (o = this.arr[i], o -= n, i < e.len && (o -= e.arr[i]), o < 0 ? (n = 1, o += 10) : n = 0, !(o < 0)); i++) t.push(o);
				0 != n && (t = [0])
			}
			i = this.len = t.length;
			let n = -1;
			for (; i-- && 0 == t[i];) n = Math.max(1, i);
			return n >= 0 && t.splice(n, this.len - n), this.arr = t, this.len = this.arr.length, this
		}
		multBigUInt(e) {
			t.biR.zero();
			let i = 0;
			for (; i < e.len; i++) t.bi1.copy(this), t.bi1.mult(e.arr[i]), t.bi1.mult10(i), t.biR.plus(t.bi1);
			return this.copy(t.biR), this
		}
		mult2(e) {
			let i = e + "",
				n = i.length,
				a = 0;
			for (t.biR.zero(); n--;) t.bi1.copy(this), t.bi1.mult(parseInt(i.charAt(n))), t.bi1.mult10(a++), t.biR.plus(t.bi1);
			return this.copy(t.biR), this
		}
		mult(e) {
			let t = [],
				i = 0,
				n = 0,
				a = 0;
			for (a = 0; a < this.len; a++)(n = this.arr[a] * e + i) > 9 ? (i = Math.floor(n / 10), n %= 10) : i = 0, t.push(n);
			return 0 != i && t.push(i), this.arr = t, this.len = this.arr.length, this
		}
		mult10(e) {
			for (void 0 === e && (e = 1); e--;) this.arr.unshift(0);
			return this.len = this.arr.length, this
		}
		present100(e) {
			return this.mult2(e).div10(2), this
		}
		div10(e) {
			for (void 0 === e && (e = 1); e--;) this.arr.shift();
			return this.len = this.arr.length, this.len <= 0 && this.zero(), this
		}
		div(e) {
			let t = !1,
				i = [],
				n = 0,
				a = 0,
				o = this.len,
				s = 0;
			for (; o--;) s = 10 * n + this.arr[o], a = Math.floor(s / e), (t || a > 0) && (i.push(a), t = !0), n = s % e;
			return this.len = i.length, 0 == this.len ? (this.arr = [0], this.len = 1) : (this.arr = i, this.arr.reverse()), this
		}
		divPresent(e) {
			let t = this.len - e.len;
			if (t >= 3) return 0;
			if (t < -3) return 10;
			let i = Math.max(this.len, e.len),
				n = "",
				a = "";
			for (t = Math.min(3, i); t--;) --i < this.len && (n += this.arr[i]), i < e.len && (a += e.arr[i]);
			return parseFloat(a) / parseFloat(n)
		}
		bigger(e) {
			if (this.len > e.len) return !0;
			if (this.len < e.len) return !1;
			let t = this.len;
			for (; t--;) {
				if (this.arr[t] > e.arr[t]) return !0;
				if (this.arr[t] < e.arr[t]) return !1
			}
			return !1
		}
		equal(e) {
			if (this.len != e.len) return !1;
			let t = this.len;
			for (; t--;)
				if (this.arr[t] != e.arr[t]) return !1;
			return !0
		}
		isZero() {
			return 1 == this.len && 0 == this.arr[0]
		}
		zero() {
			return this.arr = [0], this.len = 1, this
		}
		one() {
			return this.arr = [1], this.len = 1, this
		}
		getString(e) {
			void 0 === e && (e = "");
			let t = this.arr.concat();
			return t.reverse(), t.join(e)
		}
		getShortString() {
			let e = 0,
				t = 0,
				i = "",
				n = 0;
			if (1 == (e = this.len) && 0 == this.arr[0]) return "0";
			for (t = e % 3, n = Math.floor(e / 3), 0 == t && (t = 3, n--), t = e - t; e-- > t;) i += this.arr[e];
			return n > 0 && this.arr[e] > 0 && (i = i + "." + this.arr[e]), i + this.D[n]
		}
		getShortString2() {
			let e = 0,
				t = 0,
				i = "",
				n = 0;
			if (1 == (e = this.len) && 0 == this.arr[0]) return "0";
			for (t = e % 3, n = Math.floor(e / 3), 0 == t && (t = 3, n--), t = e - t; e-- > t;) i += this.arr[e];
			return n > 0 && (this.arr[e] > 0 ? (i = i + "." + this.arr[e], this.arr[e - 1] > 0 && (i += this.arr[e - 1])) : this.arr[e - 1] > 0 && (i = i + "." + this.arr[e] + this.arr[e - 1])), i + this.D[n]
		}
		clone() {
			let e = new t;
			return e.arr = this.arr.concat(), e.len = this.len, e
		}
		copy(e) {
			return this.arr = e.arr.concat(), this.len = e.len, this
		}
	}
	t.bi1 = new t, t.biR = new t, t.tmp = new t;
	class i {
		static getTimer() {
			return (new Date).getTime()
		}
	}
	i.formatTimeMS = (e => {
		let t = "",
			i = Math.floor(e / 60);
		return i < 10 && (t += "0"), t += i + ":", (e %= 60) < 10 && (t += "0"), t + Math.floor(e)
	}), i.get24 = (() => {
		let e = new Date;
		return e.setHours(23), e.setMinutes(59), e.setSeconds(59), e.getTime()
	}), i.getTimerOffset = (e => {
		let t = new Date;
		return t.setDate(t.getDate() + e), t.getTime()
	});
	class n {
		constructor() {
			this.mTable = {}, this.mCount = 0
		}
		get table() {
			return this.mTable
		}
		add(e, t) {
			return !this.containsKey(e) && (this.mCount++, this.mTable[e] = t, !0)
		}
		remove(e) {
			return !!this.containsKey(e) && (this.mCount--, delete this.mTable[e], !0)
		}
		keys() {
			let e = new Array;
			for (let t in this.mTable) e.push(t);
			return e
		}
		containsKey(e) {
			return this.mTable.hasOwnProperty(e)
		}
		values() {
			let e = new Array;
			for (let t in this.mTable) e.push(this.mTable[t]);
			return e
		}
		containesValue(e) {
			for (let t in this.mTable)
				if (this.mTable[t] == e) return !0;
			return !1
		}
		get count() {
			return this.mCount
		}
		get(e) {
			return this.mTable[e]
		}
		set(e, t) {
			this.mTable[e] = t
		}
		clear() {
			this.mTable = {}, this.mCount = 0
		}
		toString() {
			let e = "{";
			for (let t in this.mTable) e += `\n\t${t} : ${this.mTable[t]}`;
			return e + "\n}"
		}
	}
	class a {
		constructor() {
			this.mArray = []
		}
		get array() {
			return this.mArray
		}
		get count() {
			return this.mArray.length
		}
		add(e) {
			this.mArray.push(e)
		}
		unshift(e) {
			this.mArray.unshift(e)
		}
		addRange(e) {
			if (e)
				for (let t of e) this.mArray.push(t)
		}
		remove(e) {
			let t = this.mArray.indexOf(e);
			return t >= 0 && this.mArray.splice(t, 1), !1
		}
		removeAt(e) {
			return e < 0 || e >= this.mArray.length ? (console.error("list removeAt error, index:", e, "this.mArray.length:", this.mArray.length), !1) : (this.mArray.splice(e, 1), !0)
		}
		removeRange(e, t) {
			if (e < 0 || e >= this.mArray.length) return !1;
			let i = t + e;
			return i < 0 || i > this.mArray.length ? (console.error("list removerange error,startIndex:", e, "removeCount:", t, "endIndex:", i), !1) : (this.mArray.splice(e, t), !0)
		}
		indexOf(e) {
			return this.mArray.indexOf(e)
		}
		lastIndexOf(e, t) {
			return this.mArray.lastIndexOf(e, t)
		}
		get(e) {
			if (!(e < 0 || e >= this.mArray.length)) return this.mArray[e]
		}
		pop() {
			if (0 != this.mArray.length) return this.mArray.pop()
		}
		popFront() {
			if (0 != this.mArray.length) return this.mArray.shift()
		}
		contains(e) {
			return this.mArray.indexOf(e) >= 0
		}
		sort(e) {
			e && this.mArray.sort(e)
		}
		clear() {
			this.mArray.splice(0)
		}
		reverse() {
			this.mArray.reverse()
		}
		toString() {
			return "[" + this.mArray.join(",") + "]"
		}
		toStringSymbol(e) {
			return this.mArray.join(e)
		}
		removeFrom(e, t) {
			this.mArray.splice(e, t)
		}
		length() {
			return this.mArray.length
		}
	}
	class o {
		constructor(e, t) {
			this.eAction = t, this.eCaller = e
		}
		invoke(e) {
			this.eAction && this.eAction.call(this.eCaller, e)
		}
		equal(e, t) {
			return this.eCaller == e && this.eAction == t
		}
	}
	class s {
		constructor() {
			this.events = new a
		}
		indexOf(e, t) {
			for (let i = 0; i < this.events.count; i++) {
				if (this.events.get(i).equal(e, t)) return i
			}
			return -1
		}
		addEntity(e) {
			this.events.add(e)
		}
		add(e, t) {
			let i = new o(e, t);
			this.events.add(i)
		}
		remove(e, t) {
			let i = this.indexOf(e, t);
			i >= 0 && this.events.removeAt(i)
		}
		invoke(e) {
			this.events.array.forEach((t, i) => {
				t.invoke(e)
			})
		}
		Clear() {
			this.events.clear()
		}
		Dispose() {
			this.events = null
		}
	}
	class r {
		constructor() {
			this.dicEvent = new n
		}
		addEntityListener(e) {
			let t = this.dicEvent.get(e.stringID);
			null == t && (t = new s, this.dicEvent.add(e.stringID, t)), t.addEntity(e)
		}
		addListener(e, t, i) {
			let n = this.dicEvent.get(e);
			null == n && (n = new s, this.dicEvent.add(e, n)), n.add(t, i)
		}
		removeListener(e, t, i) {
			let n = this.dicEvent.get(e);
			null != n && n.remove(t, i)
		}
		triggerListener(e, t) {
			let i = this.dicEvent.get(e);
			null != i && i.invoke(t)
		}
		clearListener(e) {
			let t = this.dicEvent.get(e);
			null != t && t.Dispose(), this.dicEvent.remove(e)
		}
		clearAllListener() {
			for (let e in this.dicEvent.table) this.dicEvent.table[e].Clear();
			this.dicEvent.clear()
		}
	}
	class l { }
	class d {
		constructor() {
			this.TimeOut = 5e3, this.httpEventId = "HttpMgr_Event_Result", this.event = new r
		}
		static get instance() {
			return d.getInstance()
		}
		static getInstance() {
			return null == d.mInstance && (d.mInstance = new d), d.mInstance
		}
		post(e, t, i = "json") {
			this.createHttpRequest(e).send(e, JSON.stringify(t), "post", i, ["Content-Type", "application/json"])
		}
		get(e, t = "json", i) {
			Laya.Browser.onVVMiniGame ? window.qg.request({
				url: e,
				dataType: t,
				method: "GET",
				success: t => {
					this.onComplete(e, t.data)
				},
				fail: (t, i) => {
					let n = {
						error: t,
						code: i
					};
					this.onError(e, n)
				}
			}) : i ? this.createHttpRequest(e).send(e, void 0, "get", t, i) : this.createHttpRequest(e).send(e, void 0, "get", t)
		}
		createHttpRequest(e) {
			let t = new Laya.HttpRequest;
			return t.http.timeout = this.TimeOut, t.once(Laya.Event.COMPLETE, this, this.onComplete, [e]), t.once(Laya.Event.ERROR, this, this.onError, [e]), t
		}
		onComplete(e, t) {
			this.triggerListener(e, !0, t)
		}
		onError(e, t) {
			this.triggerListener(e, !1, t)
		}
		triggerListener(e, t, i) {
			let n = new l;
			n.url = e, n.result = t, n.data = i, this.event.triggerListener(this.httpEventId, n)
		}
		addListener(e, t) {
			this.event.addListener(this.httpEventId, e, t)
		}
		removeListener(e, t) {
			this.event.removeListener(this.httpEventId, e, t)
		}
	}
	class h {
		static get(e) {
			let t = this.pool.get(e);
			return null == t && (t = new e, this.pool.set(e, t)), t
		}
		static contains(e) {
			return -1 != this.pool.indexOf(e)
		}
		static remove(e) {
			return this.pool.remove(e)
		}
		static clear() {
			this.pool.clear()
		}
	}
	h.pool = new class {
		constructor() {
			this.mValues = [], this.mKeys = []
		}
		set(e, t) {
			let i = this.indexOf(e);
			i >= 0 ? this.mValues[i] = t : (this.mKeys.push(e), this.mValues.push(t))
		}
		indexOf(e) {
			let t = this.mKeys.indexOf(e);
			return t >= 0 ? t : (e = "string" == typeof e ? Number(e) : "number" == typeof e ? e.toString() : e, this.mKeys.indexOf(e))
		}
		get(e) {
			let t = this.indexOf(e);
			return t < 0 ? null : this.mValues[t]
		}
		remove(e) {
			let t = this.indexOf(e);
			return t >= 0 && (this.mKeys.splice(t, 1), this.mValues.splice(t, 1), !0)
		}
		clear() {
			this.mValues.length = 0, this.mKeys.length = 0
		}
		values() {
			return this.mValues
		}
		keys() {
			return this.mKeys
		}
	};
	class c {
		constructor() {
			this.uid = "", this.encryptedData = "", this.iv = "", this.openid = "", this.ip = "", this.inviter_gid = "", this.oToken = ""
		}
		static get instance() {
			return h.get(c)
		}
	}
	class p {
		static serialize(e, t) {
			let i = [];
			for (let n in e) {
				if (!e.hasOwnProperty(n)) continue;
				let a = t ? `${t}[${n}]` : n,
					o = e[n];
				"object" == typeof o ? i.push(this.serialize(o, a)) : i.push(encodeURIComponent(a) + "=" + encodeURIComponent(o))
			}
			return i.join("&")
		}
		static appendParams(e, t) {
			if (0 === Object.keys(t).length) return e;
			let i = e.match(/\?/) ? "&" : "?";
			return `${e}${i}${this.serialize(t)}`
		}
		static protocol() {
			return location.protocol.match(/^https/) ? "wss" : "ws"
		}
		static converGSSocket(e) {
			return "/" !== e.charAt(0) ? e : "/" === e.charAt(1) ? `${p.protocol()}:${e}` : `${p.protocol()}://${location.host}${e}`
		}
		static initArgs(e) {
			this.ucenter = e.ucenter, this.appId = e.appId, this.gsUrl = e.gsUrl, this.version = e.version, this.gamekey = e.gamekey
		}
	}
	class g { }
	var m, u, f, _, y, I, w, S, v, E, L, A, T, x, b, C, R, M, O;
	g.LANG_DEFAULT = "zh_cn", g.LANG_ZH_CN = "zh_cn", g.LANG_ZH_TW = "zh_tw", g.LANG_EN_US = "en_us", g.LANG_HI_IN = "hi_in",
		function (e) {
			e[e.debug = 0] = "debug", e[e.log = 1] = "log", e[e.info = 2] = "info", e[e.warn = 3] = "warn", e[e.error = 4] = "error", e[e.none = 5] = "none"
		}(m || (m = {})),
		function (e) {
			e[e.dont = 0] = "dont", e[e.need = 1] = "need", e[e.must = 2] = "must"
		}(u || (u = {}));
	class D {
		constructor() {
			this.video = [], this.banner = [], this.box = [], this.interstitial = [], this.gameportal = [], this.gameicon = [], this.gamebanner = [], this.custom = []
		}
	}
	class N {
		constructor() {
			this.gamesBasePath = "https://upcdn.ouku3.com/jumpto", this.basePath = [], this.ucenter = "", this.matrixUrl = "", this.reportUrl = "", this.gms = "", this.version = 0, this.appId = "", this.gamekey = "", this.ad = null, this.jumptoGameList = [], this.lang = g.LANG_ZH_CN, this.needGetGamelist = !1, this.needGetSwitchList = !1, this.needOKStatis = !1, this.pkg = "", this.app_key = "", this.needAdConfFromServer = !1, this.api_gamelist = "", this.logLevel = m.info, this.games_ald_ouku = !0, this.bbbsReportItemMap = {}, this.reportAld = !0, this.showVideo = !0, this.gamePortalAd = "", this.ucenter = "https://ucenter.ouku3.com", this.matrixUrl = "https://taurus2.ouku3.com", this.reportUrl = "https://taurus2-server.uc10d.com", this.gms = "wss://party-server.ouku3.com", this.api_gamelist = "/api/games/list", this.version = 100, this.ad = new D, this.needAdConfFromServer = !1, this.loginLevel = u.need, this.needGetGamelist = !0, this.logLevel = m.info, this.games_ald_ouku = !0
		}
	}
	class P {
		constructor() {
			this.mIsDebug = !1, this.mIsGetAdConf = !1
		}
		get IsDebug() {
			return this.mIsDebug
		}
		getConf() {
			let e = this.mConfWeb;
			return Laya.Browser.onMiniGame ? "object" == typeof tt ? e = this.mConfTT : (e = this.mConfWX).needGetGamelist : Laya.Browser.onQQMiniGame ? e = this.mConfQQ : Laya.Browser.onVVMiniGame ? e = this.mConfVV : Laya.Browser.onQGMiniGame ? e = this.mConfQG : Laya.Browser.onTTMiniGame ? e = this.mConfTT : "object" == typeof OPPO ? e = this.mConfOPPOH5 : "object" == typeof FBInstant ? e = "undefined" != typeof minigame ? this.mConfWeiyou : this.mConfFB : Laya.Render.isConchApp && (Laya.Browser.onAndroid ? e = this.mConfAndroid : Laya.Browser.onIOS && (e = this.mConfiOS)), e ? e.needAdConfFromServer && !this.mIsGetAdConf && this.getAdFromServer(e) : console.error("conf is not init!"), e
		}
		getAdFromServer(e) {
			d.instance.addListener(this, this.onSynCompleteAd);
			let t = {
				action: 9e3,
				gamekey: e.gamekey
			};
			d.instance.post(e.ucenter, t)
		}
		onSynCompleteAd(e) {
			if (e.result && 0 === e.data.code) {
				this.mIsGetAdConf = !0;
				let t = e.data.adverts;
				this.setAdConfFromServer(t)
			}
			d.instance.removeListener(this, this.onSynCompleteAd)
		}
		setAdConfFromServer(e) {
			e && (e.video && e.video.length > 0 && 0 == this.getConf().ad.video.length && (this.getConf().ad.video = e.video), e.banner && e.banner.length > 0 && 0 == this.getConf().ad.banner.length && (this.getConf().ad.banner = e.banner), e.interstitial && e.interstitial.length > 0 && 0 == this.getConf().ad.interstitial.length && (this.getConf().ad.interstitial = e.interstitial))
		}
	}
	class V { }
	V.ConfOK = new class extends N {
		constructor() {
			super(), this.basePath = [], this.version = 102, this.gamekey = "41-299-299-100-1", this.needOKStatis = !0, this.loginLevel = u.dont, window.gamekey && (this.gamekey = window.gamekey)
		}
	};
	class k { }
	k.ConfOK = new class extends N {
		constructor() {
			super(), this.ad.video = ["314395", "314395", "314395", "314395"]
		}
	};
	class B { }
	B.ConfOK = new class extends N {
		constructor() {
			super()
		}
	};
	class G { }
	G.ConfOK = new class extends N {
		constructor() {
			super()
		}
	};
	class F { }
	F.ConfOK = new class extends N {
		constructor() {
			super(), this.ad.video = ["6499e15ec85f4bd6995e9259a03614c6", "6499e15ec85f4bd6995e9259a03614c6", "6499e15ec85f4bd6995e9259a03614c6", "6499e15ec85f4bd6995e9259a03614c6"]
		}
	};
	class z { }
	z.ConfOK = new class extends N {
		constructor() {
			super(), this.basePath = [], this.version = 100, this.gamekey = "41-299-299-100-1", this.logLevel = m.debug, this.needGetGamelist = !1, this.needOKStatis = !0, this.loginLevel = u.dont
		}
	};
	class X { }
	X.ConfOK = new class extends N {
		constructor() {
			super(), this.basePath = [], this.version = 100, this.gamekey = "56-309-309-100-1", this.needOKStatis = !1, this.loginLevel = u.dont
		}
	};
	class Y { }
	Y.ConfOK = new class extends N {
		constructor() {
			super(), this.basePath = [], this.version = 115, this.appId = "wx001898ac7e53a465", this.gamekey = "41-1-1-1-1", this.ad.video = ["adunit-14a4db0fe502d916"], this.ad.banner = ["adunit-f13ac112ca668198"], this.ad.interstitial = ["adunit-455b12f43548567b"], this.ad.custom = ["adunit-1688e2ca25008ac5", "adunit-c067ea8b44a2107d", "adunit-c067ea8b44a2107d", "adunit-1688e2ca25008ac5", "adunit-b70875a571cfc1d7", "adunit-2f6daeda6c92d121", "adunit-c558dce3016bab2d", "adunit-c067ea8b44a2107d"], this.needGetGamelist = !0, this.needGetSwitchList = !0, this.needOKStatis = !0, this.logLevel = m.debug
		}
	};
	class U extends P {
		static get I() {
			return h.get(U)
		}
		constructor() {
			super(), this.mConfWeb = z.ConfOK, this.mConfWX = Y.ConfOK, this.mConfQQ = B.ConfOK, this.mConfTT = G.ConfOK, this.mConfVV = F.ConfOK, this.mConfQG = k.ConfOK, this.mConfAndroid = V.ConfOK, this.mConfWeiyou = X.ConfOK
		}
	}
	class H {
		constructor() {
			this.report = !1
		}
		static get I() {
			return h.get(H)
		}
		init() {
			U.I.getConf().reportAld && (Laya.Browser.onMiniGame && window.wx.aldSendEvent || Laya.Browser.onQQMiniGame && window.qq.aldSendEvent || (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && window.qg.aldSendEvent) ? this.report = !0 : this.report = !1
		}
		sendOpenid(e) {
			this.report && this.aldSendOpenid(e)
		}
		sendEvent(e, t) {
			this.report && this.aldSendEvent(e, t)
		}
		onStartLv(e, t) {
			this.report && this.aldOnStartLv(e, t)
		}
		onRunningLv(e, t, i, n) {
			this.report && this.aldOnRunningLv(e, t, i, n)
		}
		onEndLv(e, t) {
			this.report && this.aldOnEndLv(e, t)
		}
		onInitLevel(e, t, i) {
			this.report && this.aldOnInitLevel(e, t, i)
		}
		onSetLevel(e, t, i) {
			this.report && this.aldOnSetLevel(e, t, i)
		}
		aldSendOpenid(e) {
			window.wx.aldSendOpenid(e)
		}
		aldSendEvent(e, t) {
			window.wx.aldSendEvent(e, t)
		}
		aldOnStartLv(e, t) {
			window.wx.aldStage.onStart({
				stageId: e,
				stageName: `第${e}关`,
				userId: t
			})
		}
		aldOnEndLv(e, t) {
			window.wx.aldStage.onEnd({
				stageId: e,
				stageName: `第${e}关`,
				userId: t,
				event: "complete",
				params: {
					desc: "end"
				}
			})
		}
		aldOnRunningLv(e, t, i, n) {
			window.wx.aldStage.onRunning({
				stageId: e,
				stageName: `第${e}关`,
				userId: n,
				event: t,
				params: {
					itemName: i
				}
			})
		}
		aldOnInitLevel(e, t, i) {
			window.wx.aldLevel.onInitLevel({
				levelId: e,
				levelName: `第${e}级`,
				userId: i,
				userName: t
			})
		}
		aldOnSetLevel(e, t, i) {
			window.wx.aldLevel.onSetLevel({
				levelId: e,
				levelName: `第${e}级`,
				userId: i,
				userName: t
			})
		}
	}
	H.RUNEVENT_RELIFE = "复活", H.RELIFETYPE_VIDEO = "视频复活", H.RELIFETYPE_SHARE = "分享复活", H.RELIFETYPE_DIAMOND = "钻石复活";
	class W { }
	W.INDEX_SHOW = "首页曝光", W.LUCKYDRAW_SHOW = "幸运转盘-弹窗曝光", W.LUCKYDRAW_CLICK = "幸运转盘-抽奖按钮点击", W.GAME_SHOW = "新游试玩-弹窗曝光", W.GAME_PLAY = "新游试玩-", W.SIGNIN_SHOW = "每日签到-弹窗曝光", W.SIGNIN_VIDEO = "每日签到-视频领取", W.SIGNIN_CLICK = "每日签到-直接领取", W.SERVICE_SHOW = "每日钻石-弹窗曝光", W.SERVICE_BACKFLOW = "每日钻石-用户回流", W.SERVICE_CLICK = "每日钻石-领钻石按钮点击", W.INVITE_SHOW = "邀请好礼-弹窗曝光", W.INVITE_CLICK = "邀请好礼-邀请按钮点击", W.COLLECT_SHOW = "收藏有礼-弹窗曝光", W.COLLECT_PROVIDE = "收藏有礼-奖励发放", W.SUPPLY_VIDEO_COMPLETE = "补给宝箱-激励视频播放成功", W.DAYCOIN_SHOW = "每日金币-弹窗曝光", W.DAYCOIN_CLICK = "每日金币-普通领取", W.DAYCOIN_SHARE = "每日金币-分享领取", W.DAYCOIN_VIDEO = "每日金币-视频领取", W.RANK_SHOW = "好友排行-弹窗曝光", W.RANK_INVITE = "好友排行-邀请好友按钮点击", W.RELIFE_SHOW = "复活页-曝光", W.RELIFE_CLICK = "复活页-复活按钮点击", W.RELIFE_GIVEUP = "复活页-放弃复活按钮点击", W.RESULT_SHOW = "结算页-曝光", W.RESULT_SUCCESS_CLICK = "成功结算页-金币领取", W.RESULT_SUCCESS_GAME_SHOW = "成功结算页-游戏推荐-大弹窗曝光", W.RESULT_SUCCESS_GAME_CLICK = "成功结算页-游戏推荐-游戏名点击", W.RESULT_FAIL_CLICK = "失败结算页-金币领取", W.RESULT_FAIL_SKIP = "失败结算页-跳过本关", W.RESULT_FAIL_GAME_SHOW = "失败结算页-游戏推荐-大弹窗曝光", W.RESULT_FAIL_GAME_CLICK = "失败结算页-游戏推荐-游戏名点击", W.OFFLINE_SHOW = "离线收益-弹窗曝光", W.OFFLINE_CLICK = "离线收益-按钮点击", W.EXCHANGE_SHOW = "兑换金币-弹窗曝光", W.EXCHANGE_CLICK = "兑换金币-兑换按钮点击", W.EXCHANGE_CLICKALL = "兑换金币-全部兑换按钮点击", W.GAME_BAT_BTN_FIREST_CLICK = "进入游戏战斗按钮点击-等级1", W.GAME_BAT_BTN_CLICK = "进入游戏战斗按钮点击", W.GAME_BAT_FIREST_SHOW = "进入游戏战斗页面-等级1", W.GAME_BAT_SHOW = "进入游戏战斗页面", W.COIN_GET = "金币获得", W.COIN_USE = "金币消耗", W.DIAMOND_GET = "钻石获得", W.DIAMOND_USE = "钻石消耗", W.MAID_AD_SHOW = "导量位—首页跑马灯—曝光", W.MAID_AD_CLIK = "导量位—首页跑马灯—点击", W.MAID_AD_ACT = "导量位—首页跑马灯—促活", W.GAMEBOX_SHOW = "导量位—新游试玩—曝光", W.GAMEBOX_CLIK = "导量位—新游试玩—点击", W.GAMEBOX_ACT = "导量位—新游试玩—促活", W.PASSLEVEL_SHOW = "导量位—通关导量位—曝光", W.PASSLEVEL_CLICK = "导量位—通关导量位—点击", W.PASSLEVEL_ACT = "导量位—通关导量位—促活", W.RESAULT2_SHOW = "导量位—插屏导量位—曝光", W.RESAULT2_CLICK = "导量位—插屏导量位—点击", W.RESAULT2_ACT = "导量位—插屏导量位—促活";
	class K {
		constructor() {
			this.mSaveKey = "", this.mDataLocal = null, this.isSoundMute = !0, this.isMusicMute = !0, this.isVibrateMute = !0, this.coin = new t, this.diamond = 20, this.name = "", this.level = 1, this.logoutTime = 0, this.offlineTime = -1, this.mSaveKey = K.ProductName, this.coin.setByShortString("0")
		}
		addCoinNum(e, i = !0) {
			return t.tmp.setByShortString(e.toString()), this.addCoin(t.tmp, i)
		}
		addCoin(e, t = !0) {
			return this.coin.plus(e), t && this.save(), H.I.sendEvent(W.COIN_GET, e.getShortString()), !0
		}
		subCoinNum(e, i = !0) {
			return t.tmp.setByShortString(e.toString()), this.subCoin(t.tmp, i)
		}
		subCoin(e, t = !0) {
			return !(!this.coin.bigger(e) && !this.coin.equal(e)) && (this.coin.minus(e), t && this.save(), H.I.sendEvent(W.COIN_USE, e.getShortString()), !0)
		}
		addDiamondNum(e, t = !0) {
			this.diamond += e, t && this.save(), H.I.sendEvent(W.DIAMOND_GET, e)
		}
		subDiamondNum(e, t = !0) {
			return this.diamond >= e && (this.diamond -= e, t && this.save(), H.I.sendEvent(W.DIAMOND_USE, e), !0)
		}
		readLocal(t) {
			let n = "",
				a = null;
			Laya.LocalStorage.support && (n += Laya.LocalStorage.getItem(this.mSaveKey)), "{" == (n = unescape(n)).charAt(0) ? this.mDataLocal = JSON.parse(n) : this.mDataLocal = {}, e.isNullOrEmpty(t) || (a = JSON.parse(t), e.isNullOrEmpty(this.mDataLocal) ? this.mDataLocal = a : !e.isNullOrEmpty(this.mDataLocal.logoutTime) && !e.isNullOrEmpty(a.logoutTime) && a.logoutTime > this.mDataLocal.logoutTime && (this.mDataLocal = a)), this.applyLocal(), -1 == this.offlineTime && (this.offlineTime = i.getTimer() - this.mDataLocal.logoutTime)
		}
		save() {
			this.mDataLocal = {}, this.saveLocal();
			let e = JSON.stringify(this.mDataLocal);
			Laya.LocalStorage.support && Laya.LocalStorage.setItem(this.mSaveKey, e)
		}
		getLevel() {
			return this.level
		}
		getCurLevel() {
			return this.level - 1
		}
		getCoin() {
			return this.coin.getString()
		}
		saveLocal() {
			this.mDataLocal.isSoundMute = this.isSoundMute, this.mDataLocal.isMusicMute = this.isMusicMute, this.mDataLocal.isVibrateMute = this.isVibrateMute, this.mDataLocal.logoutTime = i.getTimer(), this.mDataLocal.coin = this.coin.getString(), this.mDataLocal.diamond = this.diamond, this.mDataLocal.name = this.name, this.mDataLocal.level = this.level
		}
		applyLocal() {
			e.isNullOrEmpty(this.mDataLocal.isSoundMute) || (this.isSoundMute = this.mDataLocal.isSoundMute), e.isNullOrEmpty(this.mDataLocal.isMusicMute) || (this.isMusicMute = this.mDataLocal.isMusicMute), e.isNullOrEmpty(this.mDataLocal.isVibrateMute) || (this.isVibrateMute = this.mDataLocal.isVibrateMute), e.isNullOrEmpty(this.mDataLocal.logoutTime) || (this.logoutTime = this.mDataLocal.logoutTime), e.isNullOrEmpty(this.mDataLocal.coin) || this.coin.setByShortString(this.mDataLocal.coin), e.isNullOrEmpty(this.mDataLocal.diamond) || (this.diamond = this.mDataLocal.diamond), e.isNullOrEmpty(this.mDataLocal.name) || (this.name = this.mDataLocal.name), e.isNullOrEmpty(this.mDataLocal.level) ? this.level = 1 : this.level = this.mDataLocal.level
		}
		synService() {
			d.instance.addListener(this, this.onSynComplete);
			let e = {
				action: 1002,
				gamekey: p.gamekey,
				uid: c.instance.uid,
				data: JSON.stringify(this.mDataLocal)
			};
			d.instance.post(p.ucenter, e)
		}
		onSynComplete(e) {
			e.data.code, d.instance.removeListener(this, this.onSynComplete)
		}
	}
	K.ProductName = "moon";
	class Z {
		constructor() {
			this.mBridge = null, this.mIsRVideoUseAble = !1, this.mIsBannerUseAble = !1, this.mIsNativeUseAble = !1, this.mIsInterstitialUseAble = !1, this.onVideoSuccess = null, this.onVideoFail = null, this.onVideoLoadedFail = null, Laya.Render.isConchApp && (Laya.Browser.onAndroid ? this.mBridge = window.PlatformClass.createClass("com.base.SDKHelper") : Laya.Browser.onIOS, Laya.Browser.window.callJs = (e => {
				Z.I.callJs(e)
			})), this.onVideoSuccess = null, this.onVideoFail = null, this.onVideoLoadedFail = null
		}
		static get I() {
			return h.get(Z)
		}
		callNative(e) {
			if (!Laya.Render.isConchApp) return;
			let t = JSON.stringify(e);
			Laya.Browser.onAndroid ? this.mBridge.call("callAndroid", t) : Laya.Browser.onIOS && this.mBridge.call("calliOS:", t)
		}
		callJs(e) {
			let t = JSON.parse(e);
			switch (t.action) {
				case Z.ACTION_ADS:
					switch ((t = t.data).type) {
						case Z.ADS_BANNER:
							switch (t.event) {
								case "loaded":
									this.mIsBannerUseAble = !0
							}
							break;
						case Z.ADS_INTERSTITIAL:
							switch (t.event) {
								case "loaded":
									this.mIsInterstitialUseAble = !0
							}
							break;
						case Z.ADS_NATIVE:
							switch (t.event) {
								case "loaded":
									this.mIsNativeUseAble = !0
							}
							break;
						case Z.ADS_REWARDVIDEO:
							switch (t.event) {
								case "error":
									this.mIsRVideoUseAble = !1;
									break;
								case Z.ADS_EVENT_LOADED:
									this.mIsRVideoUseAble = !0;
									break;
								case Z.ADS_EVENT_LOADED_FAILED:
									this.mIsRVideoUseAble = !1, this.onVideoLoadedFail && this.onVideoLoadedFail();
									break;
								case Z.ADS_EVENT_FINISH:
									1 == t.complete ? this.onVideoSuccess && this.onVideoSuccess() : this.onVideoFail && this.onVideoFail()
							}
					}
			}
		}
		vibrate(e) {
			this.callNative({
				action: "system",
				data: {
					method: "shake",
					duration: e
				}
			})
		}
		log(e) {
			this.callNative({
				action: "log",
				data: {
					msg: e
				}
			})
		}
		logEvent(e, t) {
			this.callNative({
				action: "event",
				data: {
					event_id: e,
					msg: t
				}
			})
		}
		initNative() {
			this.callNative({
				action: "init",
				data: {}
			})
		}
		preloadRewardAD() {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_REWARDVIDEO,
					event: Z.ADS_EVENT_LOAD
				}
			})
		}
		isRewardADLoaded() {
			return this.mIsRVideoUseAble || this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_REWARDVIDEO,
					event: Z.ADS_EVENT_LOADED
				}
			}), this.mIsRVideoUseAble
		}
		playRewardAD() {
			this.isRewardADLoaded() && this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_REWARDVIDEO,
					event: Z.ADS_EVENT_SHOW
				}
			})
		}
		preloadInterstitialAD(e) {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_INTERSTITIAL,
					event: Z.ADS_EVENT_LOAD
				}
			})
		}
		isInterstitialADLoaded() {
			return this.mIsInterstitialUseAble || this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_INTERSTITIAL,
					event: Z.ADS_EVENT_LOADED
				}
			}), this.mIsInterstitialUseAble
		}
		playInterstitialAD() {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_INTERSTITIAL,
					event: Z.ADS_EVENT_SHOW
				}
			})
		}
		isBannerUseAble() {
			return this.mIsBannerUseAble || this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_BANNER,
					event: Z.ADS_EVENT_LOADED
				}
			}), this.mIsBannerUseAble
		}
		playBannerAD(e) {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_BANNER,
					event: Z.ADS_EVENT_SHOW
				}
			})
		}
		removeBannerAD(e) {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_BANNER,
					event: Z.ADS_EVENT_HIDE
				}
			})
		}
		preloadNativeAD() {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_NATIVE,
					event: Z.ADS_EVENT_LOAD
				}
			})
		}
		isNativeADLoaded() {
			return this.mIsNativeUseAble || this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_NATIVE,
					event: Z.ADS_EVENT_LOADED
				}
			}), this.mIsNativeUseAble
		}
		playNativeAD(e) {
			this.callNative({
				action: Z.ACTION_ADS,
				data: {
					type: Z.ADS_NATIVE,
					event: Z.ADS_EVENT_SHOW,
					click: e
				}
			})
		}
	}
	Z.ACTION_ADS = "ads", Z.ADS_BANNER = "Banner", Z.ADS_INTERSTITIAL = "Interstitial", Z.ADS_REWARDVIDEO = "RewardVideo", Z.ADS_NATIVE = "Native", Z.ADS_EVENT_LOAD = "load", Z.ADS_EVENT_LOADED = "loaded", Z.ADS_EVENT_LOADED_FAILED = "loaded_failed", Z.ADS_EVENT_FINISH = "finish", Z.ADS_EVENT_SHOW = "show", Z.ADS_EVENT_HIDE = "hide";
	class j extends Laya.Script {
		constructor() {
			super()
		}
	}
	j.MAX_WIDTH = 4.7, j.MAX_LIFE = 3, j.SPEED_INIT = .005, j.SPEED_BASE = .02, j.SPEED_MAX = .04, j.SPEED_ADD = .01, j.SPEED_X = .001, j.ATTACK_DIS_START = 1.2, j.ATTACK_DIS_AI_START = 1, j.ATTACK_DIS_END = 1.5, j.ATTACK_DIS_Z = 2, j.ATTACK_DIS_Z_END = 2.5, j.PENG_DIS = .65, j.PENG_DIS_Z = 2.5, j.SLOW_BEI = .1, j.ATTACK_SPEED = .4, j.ACTION_STAND = 0, j.ACTION_RUN = 1, j.ACTION_TURN = 2, j.ACTION_HURT = 3, j.ACTION_ATTACK1 = 5, j.ACTION_ATTACK2 = 6, j.ACTION_ATTACK5 = 7, j.ACTION_ATTACK6 = 8, j.ACTION_ATTACK3_0 = 9, j.ACTION_ATTACK3_1 = 10, j.ACTION_ACCELERATE = 11, j.ACTION_DIE = 12, j.TYPE_WEAPON = 0, j.TYPE_MOTO = 1, j.MONEY_TYPE_GOLD = 0, j.MONEY_TYPE_DIAMOND = 1, j.ATTACK_DELAY_SET = {
		5: [.3, .5],
		6: [.23, .833],
		7: [.24, .5],
		8: [.25, .667]
	}, j.ROCKET_ID = 9, j.WeaponTemp = [{
		id: 1,
		name: "树枝",
		price: 0,
		priceType: 0,
		icon: "gongyong/store_arms1.png",
		prefabPath: "weapon01.lh",
		motion: [5],
		hitEffect: "hit"
	}, {
		id: 2,
		name: "皮搋子",
		price: 2e3,
		priceType: 0,
		icon: "gongyong/store_arms2.png",
		prefabPath: "weapon02.lh",
		motion: [7],
		hitEffect: "hit"
	}, {
		id: 3,
		name: "平底锅",
		price: 2e3,
		priceType: 0,
		icon: "gongyong/store_arms3.png",
		prefabPath: "weapon03.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 4,
		name: "平底锅",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_arms4.png",
		prefabPath: "weapon04.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 5,
		name: "平底锅",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_arms5.png",
		prefabPath: "weapon05.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 6,
		name: "平底锅",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_arms6.png",
		prefabPath: "weapon06.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 7,
		name: "平底锅",
		price: -1,
		priceType: 0,
		icon: "gongyong/store_arms7.png",
		prefabPath: "weapon07.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 8,
		name: "平底锅",
		price: -1,
		priceType: 0,
		icon: "gongyong/store_arms8.png",
		prefabPath: "weapon08.lh",
		motion: [8],
		hitEffect: "hit"
	}, {
		id: 9,
		name: "",
		price: -1,
		priceType: 0,
		icon: "gongyong/rocket.png",
		prefabPath: "rocket.lh",
		motion: [9],
		hitEffect: "hit"
	}], j.MotoTemp = [{
		id: 1,
		name: "先锋",
		price: 0,
		priceType: 0,
		icon: "gongyong/store_motor1.png",
		prefabPath: "motor01.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 2,
		name: "青峰",
		price: 2e3,
		priceType: 0,
		icon: "gongyong/store_motor2.png",
		prefabPath: "motor02.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 3,
		name: "青峰",
		price: 2e3,
		priceType: 0,
		icon: "gongyong/store_motor3.png",
		prefabPath: "motor03.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 4,
		name: "青峰",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_motor4.png",
		prefabPath: "motor04.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 5,
		name: "青峰",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_motor5.png",
		prefabPath: "motor05.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 6,
		name: "青峰",
		price: 5e3,
		priceType: 0,
		icon: "gongyong/store_motor6.png",
		prefabPath: "motor06.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 7,
		name: "青峰",
		price: -1,
		priceType: 0,
		icon: "gongyong/store_motor7.png",
		prefabPath: "motor07.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}, {
		id: 8,
		name: "青峰",
		price: -1,
		priceType: 0,
		icon: "gongyong/store_motor8.png",
		prefabPath: "motor08.lh",
		accelerateEffect: "penhuo",
		enableTireTrace: !0
	}], j.SuitTemp = [{
		id: 1,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit01.png"
	}, {
		id: 2,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit02.png"
	}, {
		id: 3,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit03.png"
	}, {
		id: 4,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit04.png"
	}, {
		id: 5,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit05.png"
	}, {
		id: 6,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit06.png"
	}, {
		id: 7,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit07.png"
	}, {
		id: 8,
		texPath: "Assets/Game/Resources/Entities/Dress/Suit/suit08.png"
	}], j.HatTemp = [{
		id: 1,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat01.png"
	}, {
		id: 2,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat02.png"
	}, {
		id: 3,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat03.png"
	}, {
		id: 4,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat04.png"
	}, {
		id: 5,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat05.png"
	}, {
		id: 6,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat06.png"
	}, {
		id: 7,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat07.png"
	}, {
		id: 8,
		texPath: "Assets/Game/Resources/Entities/Dress/Hat/Texture/hat08.png"
	}], j.LevelTemp = [{
		id: 1,
		flag: 1001,
		recommend: 0,
		resPath: "data/map/1001.txt",
		ai: [1, 2, 3],
		boss: 0
	}, {
		id: 2,
		flag: 1002,
		recommend: 0,
		resPath: "data/map/1002.txt",
		ai: [1, 2, 3],
		boss: 0
	}, {
		id: 3,
		flag: 1003,
		recommend: 0,
		resPath: "data/map/1003.txt",
		ai: [1, 2, 3, 4],
		boss: 0
	}, {
		id: 4,
		flag: 1004,
		recommend: 0,
		resPath: "data/map/1004.txt",
		ai: [1, 2, 3, 4],
		boss: 0
	}, {
		id: 5,
		flag: 1005,
		recommend: 0,
		resPath: "data/map/1005.txt",
		ai: [5, 6, 7, 8],
		boss: 0
	}, {
		id: 6,
		flag: 1006,
		recommend: 0,
		resPath: "data/map/1006.txt",
		ai: [5, 6, 7, 8],
		boss: 0
	}, {
		id: 7,
		flag: 1007,
		recommend: 0,
		resPath: "data/map/1007.txt",
		ai: [9, 10, 11, 12, 13],
		boss: 0
	}, {
		id: 8,
		flag: 1008,
		recommend: 0,
		resPath: "data/map/1008.txt",
		ai: [9, 10, 11, 12, 13],
		boss: 0
	}, {
		id: 9,
		flag: 1009,
		recommend: 0,
		resPath: "data/map/1009.txt",
		ai: [14, 15, 16, 17, 18, 19],
		boss: 0
	}, {
		id: 10,
		flag: 1010,
		recommend: 0,
		resPath: "data/map/1010.txt",
		ai: [14, 15, 16, 17, 18, 19],
		boss: 0
	}, {
		id: 11,
		flag: 2001,
		recommend: 0,
		resPath: "data/map/2001.txt",
		ai: [20, 21, 22, 23, 24, 25],
		boss: 0
	}, {
		id: 12,
		flag: 2002,
		recommend: 0,
		resPath: "data/map/2002.txt",
		ai: [20, 21, 22, 23, 24, 25],
		boss: 0
	}, {
		id: 13,
		flag: 2003,
		recommend: 0,
		resPath: "data/map/2003.txt",
		ai: [26, 27, 28, 29, 30, 31],
		boss: 0
	}, {
		id: 14,
		flag: 2004,
		recommend: 0,
		resPath: "data/map/2004.txt",
		ai: [26, 27, 28, 29, 30, 31],
		boss: 0
	}, {
		id: 15,
		flag: 2005,
		recommend: 0,
		resPath: "data/map/2005.txt",
		ai: [32, 33, 34, 35, 36, 37],
		boss: 0
	}, {
		id: 16,
		flag: 2006,
		recommend: 0,
		resPath: "data/map/2006.txt",
		ai: [32, 33, 34, 35, 36, 37],
		boss: 0
	}, {
		id: 17,
		flag: 2007,
		recommend: 0,
		resPath: "data/map/2007.txt",
		ai: [26, 27, 28, 29, 30, 31],
		boss: 0
	}, {
		id: 18,
		flag: 2008,
		recommend: 0,
		resPath: "data/map/2008.txt",
		ai: [26, 27, 28, 29, 30, 31],
		boss: 0
	}, {
		id: 19,
		flag: 2009,
		recommend: 0,
		resPath: "data/map/2009.txt",
		ai: [32, 33, 34, 35, 36, 37],
		boss: 0
	}, {
		id: 20,
		flag: 2010,
		recommend: 0,
		resPath: "data/map/2010.txt",
		ai: [38, 39, 40, 41, 42, 43, 44],
		boss: 0
	}], j.AI_DIS_A = 20, j.AI_DIS_B = 25, j.BOSS_DIS = 45, j.MAX_BOSS_HP = 10, j.AITemp = [{
		id: 1,
		motor: [1],
		weapon: [1],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 2,
		motor: [1],
		weapon: [1],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 3,
		motor: [1],
		weapon: [1],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 4,
		motor: [1],
		weapon: [1],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 5,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 6,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 7,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 8,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 9,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 10,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 11,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 12,
		motor: [1, 2, 3],
		weapon: [1],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 13,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .8
	}, {
		id: 14,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 15,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 16,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 17,
		motor: [1, 2, 30],
		weapon: [1, 2, 3],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 18,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .8
	}, {
		id: 19,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 20,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 21,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 22,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .78
	}, {
		id: 23,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [7],
		suit: [7],
		speedScale: .78
	}, {
		id: 24,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .78
	}, {
		id: 25,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .78
	}, {
		id: 26,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 27,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 28,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .78
	}, {
		id: 29,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [7],
		suit: [7],
		speedScale: .78
	}, {
		id: 30,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .78
	}, {
		id: 31,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .78
	}, {
		id: 32,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 33,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 34,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 35,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 36,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .8
	}, {
		id: 37,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 38,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}, {
		id: 39,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [3],
		suit: [3],
		speedScale: .8
	}, {
		id: 40,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 41,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [7],
		suit: [7],
		speedScale: .8
	}, {
		id: 42,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [8],
		suit: [8],
		speedScale: .8
	}, {
		id: 43,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [6],
		suit: [6],
		speedScale: .8
	}, {
		id: 44,
		motor: [1, 2, 3],
		weapon: [1, 2, 3],
		hat: [2],
		suit: [2],
		speedScale: .8
	}], j.ConfigTemp = [{
		id: 1,
		initialCoin: 200,
		Home_Weapon_OpenLevel: 3,
		Home_Motor_OpenLevel: 3,
		Motorcycle_BrokenEffect_HP_Ratio: .3,
		DefeatPlayerCoinReward: 50
	}], j.ObstacleSizeTem = {
		terminal: [14, 6, .72],
		accelerator01: [1.3, 2, 4],
		accelerator03: [1.9, 4, 2],
		accelerator04: [11, 4, 2],
		accelerator05: [1.9, 2, 2],
		accelerator06: [11, 2, 2],
		obstacle10: [.5, .8, .6, 12, 0, .05, 1, 0, .5],
		obstacle04: [.7, .5, .54, 14, 0, .05, 1, 0, .5],
		car01: [2, 2, 4, 2e4, 0, .05, 1, 1, 1],
		car02: [2, 1.6, 4.5, 2e4, 0, .05, 1, 1, .9],
		car03: [2, 2, 4.5, 2e4, 0, .05, 1, 1, 1],
		car04: [2, 2, 4, 2e4, 0, .05, 1, 1, 1],
		walker01: [1.57, .8, .8, 1, 0, .05, 0, 1, .2, 1.57, .8],
		walker02: [1.49, .8, .8, 1, 0, .05, 0, 1, .2, 1.49, .8],
		walker03: [1.45, .8, .8, 1, 0, .05, 0, 1, .2, 1.45, .8],
		walker04: [1.56, .8, .8, 1, 0, .05, 0, 1, .2, 1.56, .8],
		rocket: [1, 3, .8, 1, 0, .05, 0, 1, .2, 1, 3]
	};
	class q {
		static substitute(e, ...t) {
			if (null == e) return "";
			var i, n = t.length;
			1 == n && t[0] instanceof Array ? n = (i = t[0]).length : i = t;
			for (var a = 0; a < n; a++) e = e.replace(new RegExp("\\{" + a + "\\}", "g"), i[a]);
			return e
		}
		static isEmpty(e) {
			return null == e || 0 == e.length
		}
		static trim(e) {
			return null == e ? null : this.rtrim(this.ltrim(e))
		}
		static ltrim(e) {
			if (null == e) return null;
			return e.replace(/^\s*/, "")
		}
		static rtrim(e) {
			if (null == e) return null;
			return e.replace(/\s*$/, "")
		}
		static beginsWith(e, t) {
			return t == e.substring(0, t.length)
		}
		static endsWith(e, t) {
			return t == e.substring(e.length - t.length)
		}
		static getParameter(e, t) {
			if (!e || 0 == e.length) return "";
			let i = e.substring(e.indexOf("?") + 1, e.length).split("&"),
				n = {};
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				n[t.substring(0, t.indexOf("=")).toLowerCase()] = t.substring(t.indexOf("=") + 1, t.length)
			}
			var a = n[t.toLowerCase()];
			return a && void 0 !== a ? a : ""
		}
		static paddingLeft(e, t, i) {
			var n = i - e.length;
			if (n <= 0) return e;
			e = String(e);
			for (var a = 0; a < n; a++) e = t + e;
			return e
		}
		static formatDate(e, t) {
			if (!e) return null;
			let i = {
				"y+": e.getFullYear(),
				"M+": e.getMonth() + 1,
				"d+": e.getDate(),
				"h+": e.getHours(),
				"m+": e.getMinutes(),
				"s+": e.getSeconds(),
				"q+": Math.floor((e.getMonth() + 3) / 3),
				"S+": e.getMilliseconds()
			};
			for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}
		static sampleNum(e) {
			return e <= 99999 ? e.toString() : (e = Math.floor(e / 1e4)) <= 99999 ? e + "万" : (e = Math.floor(e / 1e4)) + "亿"
		}
		static substituteByIndex(e, t, i) {
			return null == e ? "" : e = e.replace(new RegExp("\\{" + t + "\\}", "g"), i)
		}
	}
	class Q {
		constructor() { }
		static randomRange(e, t) {
			return Math.floor((t - e + 1) * Math.random()) + e
		}
		static randomFloatRange(e, t) {
			return (t - e) * Math.random() + e
		}
		static randomPointInCicle(e, t, i) {
			let n = Q.randomRange(t, i),
				a = 360 * Math.random(),
				o = new Laya.Point;
			return o.x = e.x + Math.sin(a * Math.PI / 180) * n, o.y = e.y + Math.cos(a * Math.PI / 180) * n, o
		}
		static parseInt(e) {
			return e >= 0 ? Math.floor(e) : Math.ceil(e)
		}
		static getDistance(e, t, i, n) {
			var a = e - i,
				o = t - n;
			return Math.sqrt(a * a + o * o)
		}
		static getAngleTimeT(e) {
			return Number(Laya.timer.currTimer % e / e) * Math.PI
		}
		static getAngleByRotaion(e) {
			return e %= e, Math.PI * Number(e / 180)
		}
		static getAngle(e, t, i, n) {
			i -= e, n -= t;
			var a = Math.atan2(n, i);
			return a = a >= 0 ? a : 2 * Math.PI + a
		}
		static getRotation(e) {
			return Math.round(180 * Number(e / Math.PI))
		}
		static randomBoolen() {
			return 0 == Math.round(Math.random())
		}
		static colorMatrix_adjust(e, t) {
			let i = e + 1,
				n = 128 * (1 - i),
				a = [i, 0, 0, 0, n, 0, i, 0, 0, n, 0, 0, i, 0, n, 0, 0, 0, 1, 0],
				o = [1, 0, 0, 0, t *= 255, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0];
			return Q.colorMatrix_concat(a, o)
		}
		static colorMatrix_concat(e, t) {
			let i = new Array(20);
			for (var n = 0, a = 0; a < 4; ++a) {
				for (var o = 0; o < 5; ++o) i[n + o] = e[n] * t[o] + e[n + 1] * t[o + 5] + e[n + 2] * t[o + 10] + e[n + 3] * t[o + 15] + (4 == o ? e[n + 4] : 0);
				n += 5
			}
			return i
		}
	}
	Q.kTowardCount = 8;
	class $ {
		constructor() { }
		static getTime(e = !1) {
			return e ? (new Date).getTime() : this._date.getTime()
		}
		static getHours(e) {
			return this._date.setTime(e), this._date.getHours()
		}
		static getTimeStr(e) {
			return this._date.setTime(e), q.substitute("{0}-{1}-{2} {3}:{4}:{5}", this._date.getFullYear(), this._date.getMonth() + 1, this._date.getDate(), q.paddingLeft(this._date.getHours().toString(), "0", 2), q.paddingLeft(this._date.getMinutes().toString(), "0", 2), q.paddingLeft(this._date.getSeconds().toString(), "0", 2))
		}
		static getTimeStr1(e) {
			return this._date.setTime(e), q.substitute("{0}年{1}月{2}日 {3}:{4}:{5}", this._date.getFullYear(), this._date.getMonth() + 1, this._date.getDate(), q.paddingLeft(this._date.getHours().toString(), "0", 2), q.paddingLeft(this._date.getMinutes().toString(), "0", 2), q.paddingLeft(this._date.getSeconds().toString(), "0", 2))
		}
		static getTimeStr2(e) {
			return this._date.setTime(e), q.substitute("{0}年{1}月{2}日 星期{3}", this._date.getFullYear(), this._date.getMonth() + 1, this._date.getDate(), $.DAY_CHAR[this._date.getDay()])
		}
		static getTimeWeekDay(e) {
			return this._date.setTime(e), this._date.getDay()
		}
		static getWeekDayTime(e, t, i) {
			this._date.setTime(e);
			let n = this._date.getDay();
			t <= n && (t += 7), this._date.setTime(e + 1e3 * $.DAY_SECONDS * (t - n)), i || (i = "00:00:00");
			let a = i.split(":");
			return this._date.setHours(Number(a[0]), Number(a[1]), Number(a[2])), this._date.getTime()
		}
		static getDayTime(e) {
			return this._date.setTime(e), 60 * this._date.getHours() * 60 + 60 * this._date.getMinutes() + this._date.getSeconds()
		}
		static getDayTime1(e) {
			this._date.setTime(e);
			let t = 60 * this._date.getHours() * 60 + 60 * this._date.getMinutes() + this._date.getSeconds();
			return Math.floor(e / 1e3) - t
		}
		static getTimeShortStr(e) {
			return this._date.setTime(e), q.substitute("{0}:{1}:{2}", this._date.getHours(), this._date.getMinutes(), this._date.getSeconds())
		}
		static getTimeShortStr2(e) {
			let t = Q.parseInt(e / 3600);
			e = Q.parseInt(e % 3600);
			let i = Q.parseInt(e / 60),
				n = Q.parseInt(e % 60);
			return q.substitute("{0}:{1}:{2}", q.paddingLeft(t.toString(), "0", 2), q.paddingLeft(i.toString(), "0", 2), q.paddingLeft(n.toString(), "0", 2))
		}
		static getTimeShortStr3(e) {
			let t = Q.parseInt(e / 60),
				i = Q.parseInt(e % 60);
			return q.substitute("{0}:{1}", q.paddingLeft(t.toString(), "0", 2), q.paddingLeft(i.toString(), "0", 2))
		}
		static getTimeShortStr4(e) {
			return e < 60 ? "刚刚" : (e = Q.parseInt(e / 60)) < 60 ? e + "分钟前" : (e = Q.parseInt(e / 60)) < 24 ? e + "小时前" : (e = Q.parseInt(e / 24)) + "天前"
		}
		static getTimeShortStr5(e) {
			let t = Q.parseInt(e / $.DAY_SECONDS);
			e = Q.parseInt(e % $.DAY_SECONDS);
			let i = Q.parseInt(e / 3600);
			e = Q.parseInt(e % 3600);
			let n = Q.parseInt(e / 60),
				a = Q.parseInt(e % 60),
				o = q.substitute("{0}:{1}:{2}", q.paddingLeft(i.toString(), "0", 2), q.paddingLeft(n.toString(), "0", 2), q.paddingLeft(a.toString(), "0", 2));
			return t > 0 && (o = t + "天 " + o), o
		}
		static getTimeShortStr6(e) {
			if (e < 60) return "0分钟";
			let t = (e = Q.parseInt(e / 60)) % 60 + "分钟";
			return (e = Q.parseInt(e / 60)) ? (t = e % 24 + "小时" + t, (e = Q.parseInt(e / 60)) ? t = e + "天" + t : t) : t
		}
		static getDayByTime(e) {
			if (!e) return "0";
			e *= 1e3, this._date.setTime(e);
			let t = this._date.getFullYear(),
				i = this._date.getMonth() + 1,
				n = this._date.getDate();
			return t.toString() + "-" + i.toString() + "-" + n.toString()
		}
		dispose() { }
	}
	$.SUNDAY = 0, $.MONDAY = 1, $.TUESDAY = 2, $.WEDNESDAY = 3, $.THURSDAY = 4, $.FRIDAY = 5, $.SATURDAY = 6, $.DAY_SECONDS = 86400, $.UTC_SECONDS = 28800, $._date = new Date, $.DAY_CHAR = ["日", "一", "二", "三", "四", "五", "六"];
	class J extends K {
		constructor() {
			super(...arguments), this.money = 100, this.makemoney = 0, this.moto = 1, this.weapon = 1, this.freeType = 0, this.freeMoto = 0, this.freeWeapon = 0, this.bossState = 0, this.zhangai = 0, this.bgm = 1, this.effect = 1, this.shake = 1, this.right_left = 1, this.guide = 1, this.gameTimes = 0, this.nextChaPinTime = 0, this.CHAPIN_PER_TIME = 6e4, this._curMusicBg = ""
		}
		gameStart() {
			this.gameTimes++
		}
		static get I() {
			return h.get(J)
		}
		applyLocal() {
			super.applyLocal(), e.isNullOrEmpty(this.mDataLocal.money) ? this.money = 100 : this.money = this.mDataLocal.money, e.isNullOrEmpty(this.mDataLocal.makemoney) ? this.makemoney = 0 : this.makemoney = this.mDataLocal.makemoney, e.isNullOrEmpty(this.mDataLocal.moto) ? this.moto = 1 : this.moto = this.mDataLocal.moto, e.isNullOrEmpty(this.mDataLocal.weapon) ? this.weapon = 1 : this.weapon = this.mDataLocal.weapon, e.isNullOrEmpty(this.mDataLocal.freeType) ? this.freeType = 0 : this.freeType = this.mDataLocal.freeType, e.isNullOrEmpty(this.mDataLocal.freeMoto) ? this.freeMoto = 0 : this.freeMoto = this.mDataLocal.freeMoto, e.isNullOrEmpty(this.mDataLocal.freeWeapon) ? this.freeWeapon = 0 : this.freeWeapon = this.mDataLocal.freeWeapon, e.isNullOrEmpty(this.mDataLocal.weapons) ? this.weapons = [-1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : this.weapons = this.mDataLocal.weapons, e.isNullOrEmpty(this.mDataLocal.motos) ? this.motos = [-1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : this.motos = this.mDataLocal.motos, e.isNullOrEmpty(this.mDataLocal.failTimes) ? this.failTimes = [] : this.failTimes = this.mDataLocal.failTimes, e.isNullOrEmpty(this.mDataLocal.adTimes) ? this.adTimes = [] : this.adTimes = this.mDataLocal.adTimes, e.isNullOrEmpty(this.mDataLocal.bossState) ? this.bossState = 0 : this.bossState = this.mDataLocal.bossState, e.isNullOrEmpty(this.mDataLocal.zhangai) ? this.zhangai = 0 : this.zhangai = this.mDataLocal.zhangai, e.isNullOrEmpty(this.mDataLocal.bgm) ? this.bgm = 1 : this.bgm = this.mDataLocal.bgm, e.isNullOrEmpty(this.mDataLocal.effect) ? this.effect = 1 : this.effect = this.mDataLocal.effect, e.isNullOrEmpty(this.mDataLocal.shake) ? this.shake = 1 : this.shake = this.mDataLocal.shake, e.isNullOrEmpty(this.mDataLocal.right_left) ? this.right_left = 1 : this.right_left = this.mDataLocal.right_left, e.isNullOrEmpty(this.mDataLocal.guide) ? this.guide = 0 : this.guide = this.mDataLocal.guide
		}
		saveLocal() {
			super.saveLocal(), this.mDataLocal.money = this.money, this.mDataLocal.makemoney = this.makemoney, this.mDataLocal.moto = this.moto, this.mDataLocal.weapon = this.weapon, this.mDataLocal.freeType = this.freeType, this.mDataLocal.freeMoto = this.freeMoto, this.mDataLocal.freeWeapon = this.freeWeapon, this.mDataLocal.weapons = this.weapons, this.mDataLocal.motos = this.motos, this.mDataLocal.failTimes = this.failTimes, this.mDataLocal.adTimes = this.adTimes, this.mDataLocal.bossState = this.bossState, this.mDataLocal.zhangai = this.zhangai, this.mDataLocal.bgm = this.bgm, this.mDataLocal.effect = this.effect, this.mDataLocal.shake = this.shake, this.mDataLocal.right_left = this.right_left, this.mDataLocal.guide = this.guide
		}
		canShowChaPin() {
			return this.level >= 5 && this.nextChaPinTime <= $.getTime(!0)
		}
		isBossGuan(e) {
			return e >= 5 && e % 5 == 0 && this.bossState != e
		}
		getCoin() {
			return this.money.toString()
		}
		getUnLock(e) {
			var t = [];
			switch (e) {
				case j.TYPE_WEAPON:
					j.WeaponTemp.forEach((e, i, n) => {
						-1 == e.price && e.prefabPath.length && t.push(e)
					});
					break;
				case j.TYPE_MOTO:
					j.MotoTemp.forEach((e, i, n) => {
						-1 == e.price && e.prefabPath.length && t.push(e)
					})
			}
			return t
		}
		playMusic(e = "mainbg.mp3") {
			Laya.SoundManager.playMusic("sounds/" + e, 0), this._curMusicBg = e
		}
		playMusicContinue() {
			this._curMusicBg && this._curMusicBg.length && Laya.stage.once(Laya.Event.CLICK, this, () => {
				Laya.SoundManager.playMusic("sounds/" + this._curMusicBg, 0)
			})
		}
		playSound(e = "button1.mp3") {
			this.isSoundMute && 1 == this.effect && (Laya.Render.isConchApp && (e = e.replace("mp3", "wav")), Laya.SoundManager.playSound("sounds/" + e, 1))
		}
		stopSound(e) {
			e && e.length ? Laya.SoundManager.stopSound("sounds/" + e) : Laya.SoundManager.stopAllSound()
		}
		shock() {
			1 == this.shake && (Laya.Browser.onMiniGame ? wx.vibrateLong({
				success: () => { },
				fail: () => { },
				complete: () => { }
			}) : Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame ? qg.vibrateLong({
				success: () => { },
				fail: () => { },
				complete: () => { }
			}) : Laya.Render.isConchApp && Z.I.vibrate(500))
		}
		setMakemoney(e) {
			this.money += e * this.makemoney, this.makemoney = 0
		}
		static showLoading(e) {
			this.isShowLoading = !0, this.sdk.showLoading({
				title: e,
				success(e) {
					console.log(`${e}`)
				},
				fail(e) {
					console.log("showLoading调用失败")
				}
			})
		}
		static hideLoading() {
			this.isShowLoading && (this.isShowLoading = !1, this.sdk.hideLoading({
				success(e) {
					console.log(`${e}`)
				},
				fail(e) {
					console.log("hideLoading调用失败")
				}
			}))
		}
	}
	J.reliveTimes = 0, J.isExit = !1, J.user = {
		openid: "1",
		token: "2.0xxxxx",
		timestamp: "1510001111",
		sign: "xxxxxxxxxxxx",
		avatarUrl: "comp/head.jpg",
		nickname: "玩家"
	}, J.isShowLoading = !1;
	class ee {
		constructor() { }
		init(e) {
			this.owner = e, this.owner.owner = this
		}
		updateOwner(e, t) {
			if (!this.owner) return;
			let i = e._components;
			this.owner = e, this.owner.owner = this;
			let n = !1,
				a = i.length;
			for (let e = 0; e < a; e++)
				if (i[e] instanceof Laya.Rigidbody3D) {
					n = !0;
					break
				} n || (this.createBoxCollider(), this.boxCollider.enabled = !0)
		}
		destroy() {
			this.owner && !this.owner.destroyed && (this.removeBoxCollider(), this.owner.parent && (this.owner.parent.destroy(), this.owner.removeSelf()), this.owner.destroy(), this.owner = null)
		}
		createBoxCollider() { }
		get width() {
			return .2
		}
		get height() {
			return 1.8
		}
		removeBoxCollider() {
			this.boxCollider && (this.boxCollider.enabled = !1)
		}
		set boxColliderEnable(e) {
			e ? this.createBoxCollider() : this.boxCollider && (this.boxCollider.enabled = !1)
		}
		get transform() {
			return this.owner.transform
		}
		set active(e) {
			this.owner && (this.owner.active = e)
		}
		get active() {
			return !!this.owner && this.owner.active
		}
	}
	class te {
		static initPreloads() {
			for (let e = 1; e <= 5; e++) this.preloads.push(q.substitute("{0}map{1}.lh", te.scpath, q.paddingLeft(e.toString(), "0", 2)));
			for (let e = 1; e <= 3; e++) this.preloads.push(q.substitute("{0}barral0{1}.lh", te.scpath, e));
			for (let e = 1; e <= 4; e++) this.preloads.push(q.substitute("{0}boxwall0{1}.lh", te.scpath, e));
			for (let e = 1; e <= 4; e++) this.preloads.push(q.substitute("{0}car0{1}.lh", te.scpath, e))
		}
	}
	te.scpath = "scenes/Conventional/", te.scene = te.scpath + "mainscene.ls", te.scene_effect = te.scpath + "Assets/effect/Materials/", te.TEMPDATA_MAP = "data/mapdata.txt", te.fireworks = te.scpath + "fireworks.lh", te.wudi = te.scpath + "wudi.lh", te.prePlayBaoZha = !1, te.preWalker = !1, te.preloads = ["res/atlas/gongyong.atlas", te.TEMPDATA_MAP, te.scene, te.scpath + "baozha.lh", te.scpath + "baozha02.lh", te.scpath + "weapon03.lh", te.scpath + "motor05.lh", te.scpath + "accelerator01.lh", te.scpath + "accelerator03.lh", te.scpath + "accelerator04.lh", te.scpath + "accelerator05.lh", te.scpath + "accelerator06.lh", te.scpath + "boss01.lh"];
	class ie {
		constructor(e) {
			this._speedX = 0, this._speedZ = 0, this.speedY = 0, this.speedAddY = 0, this.posY = 0, this.offsetX = 0, this.offsetZ = 0, this.isJumpTop = !1, this.isJumping = !1, this._startY = 99999, this._startX = 99999, this._startZ = 99999, this._owner = e
		}
		get speedZ() {
			return this._speedZ
		}
		setOwner(e) {
			this._owner = e
		}
		expoInOut(e, t, i, n) {
			return 0 == e ? t : e == n ? t + i : (e /= .5 * n) < 1 ? .5 * i * Math.pow(2, 10 * (e - 1)) + t : .5 * i * (2 - Math.pow(2, -10 * --e)) + t
		}
		update(e, t) {
			if (this._owner) {
				if (this.offsetX = 0, this.offsetZ = 0, this.isJumping) {
					if (this.posY = t, this.speedY) {
						this.speedY += this.speedAddY * e;
						let t = this.speedY * e;
						if (this.posY += t, this._targetY > this._startY && this.posY >= this._targetY) {
							this.isJumpTop = !0, this._targetY = this._startY;
							let e = 600 * Math.ceil(this.posY);
							Laya.Tween.to(this, {
								speedAddY: -5e-5
							}, e, Laya.Ease.sineOut)
						} else this.posY < this._startY && (this.posY = this._startY, this.speedY = 0, this.isJumping = !1)
					}
				} else this.posY = t;
				return this.posY
			}
		}
		gotoJump(e, t = 0, i) {
			this.speedY = i, this.isJumpTop = !1, this.isJumping = !0, this._targetY = t, this._startY = e, this.speedAddY = -5e-5
		}
		stop(e = !0) {
			this.speedY = 0, this._speedX = 0, this._speedZ = 0, this.isJumpTop = !1, this.isJumping = !1, this._owner && e && (99999 != this._startY && (this._owner.transform.position.y = this._startY), 99999 != this._startZ && (this._owner.transform.position.z = this._startZ), 99999 != this._startX && (this._owner.transform.position.x = this._startX), this._owner.transform.position = this._owner.transform.position)
		}
	}
	class ne extends Laya.BlinnPhongMaterial {
		constructor() {
			super()
		}
		_getNumber(e) {
			return this._shaderValues.getNumber(e)
		}
		_setNumber(e, t) {
			this._shaderValues.setNumber(e, t)
		}
		_setColor(e, t) {
			this._shaderValues.setVector(e, t)
		}
		_getColor(e) {
			return this._shaderValues.getVector(e)
		}
		_setTexture(e, t) {
			var i = this._getTexture(e);
			this._shaderValues.setTexture(e, t), this.referenceCount > 0 && (i && i._removeReference(), t && t._addReference())
		}
		_getTexture(e) {
			return this._shaderValues.getTexture(e)
		}
		_addShaderDefine(e) {
			this._shaderValues.addDefine(e)
		}
		_removeShaderDefine(e) {
			this._shaderValues.removeDefine(e)
		}
	}
	class ae extends ne {
		constructor(e) {
			super(), this.initShader1(), this.setShaderName("BLINNPHONGEXP"), this.setBendDistance(50), this._setColor(ae.ALBEDOCOLOR, new Laya.Vector4(1, 1, 1, 1)), this._setColor(ae.MATERIALSPECULAR, new Laya.Vector3(1, 1, 1)), this._setNumber(ae.SHININESS, .078125), this._setColor(ae.MATERIALREFLECT, new Laya.Vector3(1, 1, 1)), this._setNumber(ae.ALPHATESTVALUE, .5), this._setColor(ae.TILINGOFFSET, new Laya.Vector4(1, 1, 0, 0)), this.renderMode = ae.RENDERMODE_OPAQUE, this._setColor(ae.GLOWINGEDGECOLOR, new Laya.Vector4(1, 1, 1, 1))
		}
		static __init__() { }
		get normalTexture() {
			return this._getTexture(ae.NORMALTEXTURE)
		}
		set normalTexture(e) {
			e ? this._addShaderDefine(ae.SHADERDEFINE_NORMALMAP) : this._removeShaderDefine(ae.SHADERDEFINE_NORMALMAP), this._setTexture(ae.NORMALTEXTURE, e)
		}
		get specularTexture() {
			return this._getTexture(ae.SPECULARTEXTURE)
		}
		set specularTexture(e) {
			e ? this._addShaderDefine(ae.SHADERDEFINE_SPECULARMAP) : this._removeShaderDefine(ae.SHADERDEFINE_SPECULARMAP), this._setTexture(ae.SPECULARTEXTURE, e)
		}
		get reflectTexture() {
			return this._getTexture(ae.REFLECTTEXTURE)
		}
		set reflectTexture(e) {
			e ? this._addShaderDefine(ae.SHADERDEFINE_REFLECTMAP) : this._removeShaderDefine(ae.SHADERDEFINE_REFLECTMAP), this._setTexture(ae.REFLECTTEXTURE, e)
		}
		get tilingOffset() {
			return this._getColor(ae.TILINGOFFSET)
		}
		set tilingOffset(e) {
			e && (1 != e.x || 1 != e.y || 0 != e.z || 0 != e.w) ? this._addShaderDefine(ae.SHADERDEFINE_TILINGOFFSET) : this._removeShaderDefine(ae.SHADERDEFINE_TILINGOFFSET), this._setColor(ae.TILINGOFFSET, e)
		}
		get reflectColor() {
			return this._getColor(ae.MATERIALREFLECT)
		}
		set reflectColor(e) {
			this._setColor(ae.MATERIALREFLECT, e)
		}
		set enableGlowingEdge(e) {
			e ? this._addShaderDefine(ae.SHADERDEFINE_GLOWINGEDGE) : this._removeShaderDefine(ae.SHADERDEFINE_GLOWINGEDGE)
		}
		get glowingEdgeColor() {
			return this._getColor(ae.GLOWINGEDGECOLOR)
		}
		set glowingEdgeColor(e) {
			this._setColor(ae.GLOWINGEDGECOLOR, e)
		}
		get specularColor() {
			return this._getColor(ae.MATERIALSPECULAR)
		}
		set specularColor(e) {
			this._setColor(ae.MATERIALSPECULAR, e)
		}
		cloneMat(e) {
			if (e)
				for (let t in this)
					if ("_shader" != t)
						if ("_shaderValues" == t)
							for (let i in e[t]._data) this[t]._data[i] = e[t]._data[i];
						else this[t] = e[t]
		}
		disableFog() { }
		cloneTo(e) {
			super.cloneTo(e);
			var t = e;
			t.albedoIntensity = this.albedoIntensity, this.albedoColor && this.albedoColor.cloneTo(t.albedoColor)
		}
		getBendOffset() {
			return this._getColor(ae.BENDANGLE)
		}
		setBendOffset(e) {
			this._setColor(ae.BENDANGLE, e)
		}
		setBendDistance(e) {
			this._setNumber(ae.BENDDISTANCE, e)
		}
		initShader1() {
			if (ae.isInit) return;
			let e, t;
			ae.isInit = !0, ae.BENDANGLE = Laya.Shader3D.propertyNameToID("_QOffset"), ae.BENDDISTANCE = Laya.Shader3D.propertyNameToID("_Dist");
			let i = {
				a_Position: Laya.VertexMesh.MESH_POSITION0,
				a_Color: Laya.VertexMesh.MESH_COLOR0,
				a_Normal: Laya.VertexMesh.MESH_NORMAL0,
				a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
				a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
				a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
				a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
				a_Tangent0: Laya.VertexMesh.MESH_TANGENT0,
				a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
				a_WorldMat: Laya.VertexMesh.MESH_WORLDMATRIX_ROW0
			},
				n = {
					u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
					u_DiffuseTexture: Laya.Shader3D.PERIOD_MATERIAL,
					u_SpecularTexture: Laya.Shader3D.PERIOD_MATERIAL,
					u_NormalTexture: Laya.Shader3D.PERIOD_MATERIAL,
					u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
					u_DiffuseColor: Laya.Shader3D.PERIOD_MATERIAL,
					u_MaterialSpecular: Laya.Shader3D.PERIOD_MATERIAL,
					u_Shininess: Laya.Shader3D.PERIOD_MATERIAL,
					u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
					u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
					u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
					u_LightmapScaleOffset: Laya.Shader3D.PERIOD_SPRITE,
					u_LightMap: Laya.Shader3D.PERIOD_SPRITE,
					u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
					u_Viewport: Laya.Shader3D.PERIOD_CAMERA,
					u_ProjectionParams: Laya.Shader3D.PERIOD_CAMERA,
					u_View: Laya.Shader3D.PERIOD_CAMERA,
					u_ReflectTexture: Laya.Shader3D.PERIOD_SCENE,
					u_ReflectIntensity: Laya.Shader3D.PERIOD_SCENE,
					u_FogStart: Laya.Shader3D.PERIOD_SCENE,
					u_FogRange: Laya.Shader3D.PERIOD_SCENE,
					u_FogColor: Laya.Shader3D.PERIOD_SCENE,
					u_DirationLightCount: Laya.Shader3D.PERIOD_SCENE,
					u_LightBuffer: Laya.Shader3D.PERIOD_SCENE,
					u_LightClusterBuffer: Laya.Shader3D.PERIOD_SCENE,
					u_AmbientColor: Laya.Shader3D.PERIOD_SCENE,
					u_shadowMap1: Laya.Shader3D.PERIOD_SCENE,
					u_shadowMap2: Laya.Shader3D.PERIOD_SCENE,
					u_shadowMap3: Laya.Shader3D.PERIOD_SCENE,
					u_shadowPSSMDistance: Laya.Shader3D.PERIOD_SCENE,
					u_lightShadowVP: Laya.Shader3D.PERIOD_SCENE,
					u_shadowPCFoffset: Laya.Shader3D.PERIOD_SCENE,
					"u_DirectionLight.color": Laya.Shader3D.PERIOD_SCENE,
					"u_DirectionLight.direction": Laya.Shader3D.PERIOD_SCENE,
					"u_PointLight.position": Laya.Shader3D.PERIOD_SCENE,
					"u_PointLight.range": Laya.Shader3D.PERIOD_SCENE,
					"u_PointLight.color": Laya.Shader3D.PERIOD_SCENE,
					"u_SpotLight.position": Laya.Shader3D.PERIOD_SCENE,
					"u_SpotLight.direction": Laya.Shader3D.PERIOD_SCENE,
					"u_SpotLight.range": Laya.Shader3D.PERIOD_SCENE,
					"u_SpotLight.spot": Laya.Shader3D.PERIOD_SCENE,
					"u_SpotLight.color": Laya.Shader3D.PERIOD_SCENE,
					_QOffset: Laya.Shader3D.PERIOD_MATERIAL,
					_Dist: Laya.Shader3D.PERIOD_MATERIAL
				};
			var a = {
				s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
				s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
				s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
				s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
				s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
				s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
			};
			let o = Laya.Shader3D.add("BLINNPHONGEXP");
			e = 'uniform vec4 _QOffset;\nuniform float _Dist;\nattribute vec4 a_Position;\nuniform mat4 u_MvpMatrix;\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))||(defined(LIGHTMAP)&&defined(UV))\n\tattribute vec2 a_Texcoord0;\n\tvarying vec2 v_Texcoord0;\n#endif\n\n#if defined(LIGHTMAP)&&defined(UV1)\n\tattribute vec2 a_Texcoord1;\n#endif\n\n#ifdef LIGHTMAP\n\tuniform vec4 u_LightmapScaleOffset;\n\tvarying vec2 v_LightMapUV;\n#endif\n\n#ifdef COLOR\n\tattribute vec4 a_Color;\n\tvarying vec4 v_Color;\n#endif\n\n#ifdef BONE\n\tconst int c_MaxBoneCount = 24;\n\tattribute vec4 a_BoneIndices;\n\tattribute vec4 a_BoneWeights;\n\tuniform mat4 u_Bones[c_MaxBoneCount];\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\tattribute vec3 a_Normal;\n\tvarying vec3 v_Normal; \n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\tuniform vec3 u_CameraPos;\n\tvarying vec3 v_ViewDir; \n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP))&&defined(NORMALMAP)\n\tattribute vec4 a_Tangent0;\n\tvarying vec3 v_Tangent;\n\tvarying vec3 v_Binormal;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n\tuniform mat4 u_WorldMat;\n\tvarying vec3 v_PositionWorld;\n#endif\n\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n  #ifdef SHADOWMAP_PSSM1 \n  varying vec4 v_lightMVPPos;\n  uniform mat4 u_lightShadowVP[4];\n  #endif\n#endif\n\n#ifdef TILINGOFFSET\n\tuniform vec4 u_TilingOffset;\n#endif\n\nvoid main_castShadow()\n{\n\t#ifdef BONE\n\t\tmat4 skinTransform=mat4(0.0);\n\t\tskinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n\t\tvec4 position=skinTransform*a_Position;\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#else\n\t\thighp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#endif\n\t \n\t//TODO没考虑UV动画呢\n\t#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n\t\tv_Texcoord0=a_Texcoord0;\n\t#endif\n\t\tv_posViewZ = gl_Position.z;\n}\n\nvoid main_normal()\n{\n\t#ifdef BONE\n\t\tmat4 skinTransform=mat4(0.0);\n\t\tskinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n\t\tvec4 position=skinTransform*a_Position;\n\t\t\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#else\n\t\thighp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#endif\n\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\t\tmat3 worldMat;\n\t\t#ifdef BONE\n\t\t\tworldMat=mat3(u_WorldMat*skinTransform);\n\t\t#else\n\t\t\tworldMat=mat3(u_WorldMat);\n\t\t#endif  \n\t\tv_Normal=worldMat*a_Normal;//TODO:法线可以用"魔法"矩阵\n\t\t#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n\t\t\tv_Tangent=worldMat*a_Tangent0.xyz;\n\t\t\tv_Binormal=cross(v_Normal,v_Tangent)*a_Tangent0.w;\n\t\t#endif\n\t#endif\n\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n\t\t#ifdef BONE\n\t\t\tv_PositionWorld=(u_WorldMat*position).xyz;\n\t\t#else\n\t\t\tv_PositionWorld=(u_WorldMat*a_Position).xyz;\n\t\t#endif\n\t#endif\n\t\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\t\tv_ViewDir=u_CameraPos-v_PositionWorld;\n\t#endif\n\n\t#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n\t\tv_Texcoord0=a_Texcoord0;\n\t\t#ifdef TILINGOFFSET\n\t\t\tv_Texcoord0=(vec2(v_Texcoord0.x,v_Texcoord0.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;\n\t\t\tv_Texcoord0=vec2(v_Texcoord0.x,1.0+v_Texcoord0.y);\n\t\t#endif\n\t#endif\n\n\t#ifdef LIGHTMAP\n\t\t#ifdef SCALEOFFSETLIGHTINGMAPUV\n\t\t\t#ifdef UV1\n\t\t\t\tv_LightMapUV=vec2(a_Texcoord1.x*u_LightmapScaleOffset.x+u_LightmapScaleOffset.z,1.0+a_Texcoord1.y*u_LightmapScaleOffset.y+u_LightmapScaleOffset.w);\n\t\t\t#else\n\t\t\t\tv_LightMapUV=vec2(a_Texcoord0.x,a_Texcoord0.y-1.0)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n\t\t\t#endif \n\t\t#else\n\t\t\t#ifdef UV1\n\t\t\t\tv_LightMapUV=a_Texcoord1;\n\t\t\t#else\n\t\t\t\tv_LightMapUV=a_Texcoord0;\n\t\t\t#endif \n\t\t#endif \n\t#endif\n\n\t#ifdef COLOR\n\t\tv_Color=a_Color;\n\t#endif\n\n\t#ifdef RECEIVESHADOW\n\t\tv_posViewZ = gl_Position.w;\n\t\t#ifdef SHADOWMAP_PSSM1 \n\t\t\tv_lightMVPPos = u_lightShadowVP[0] * vec4(v_PositionWorld,1.0);\n\t\t#endif\n\t#endif\n}\n\nvoid main()\n{\n\t#ifdef CASTSHADOW\n\t\tmain_castShadow();\n\t#else\n\t\tmain_normal();\n\t#endif\n}', t = '#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n\tprecision highp float;\r\n\tprecision highp int;\r\n#else\r\n\tprecision mediump float;\r\n\tprecision mediump int;\r\n#endif\r\n\r\n#include "Lighting.glsl";\r\n#include "Shadow.glsl"\r\n\r\nuniform vec4 u_DiffuseColor;\r\n\r\n#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\r\n\tvarying vec4 v_Color;\r\n#endif\r\n\r\n#ifdef ALPHATEST\r\n\tuniform float u_AlphaTestValue;\r\n#endif\r\n\r\n#ifdef DIFFUSEMAP\r\n\tuniform sampler2D u_DiffuseTexture;\r\n#endif\r\n\r\n\r\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\r\n\tvarying vec2 v_Texcoord0;\r\n#endif\r\n\r\n#ifdef LIGHTMAP\r\n\tvarying vec2 v_LightMapUV;\r\n\tuniform sampler2D u_LightMap;\r\n#endif\r\n\r\nvarying vec3 v_Normal;\r\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\tvarying vec3 v_ViewDir; \r\n\r\n\tuniform vec3 u_MaterialSpecular;\r\n\tuniform float u_Shininess;\r\n\r\n\t#ifdef LEGACYSINGLELIGHTING\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tuniform DirectionLight u_DirectionLight;\r\n\t\t#endif\r\n\t\t#ifdef POINTLIGHT\r\n\t\t\tuniform PointLight u_PointLight;\r\n\t\t#endif\r\n\t\t#ifdef SPOTLIGHT\r\n\t\t\tuniform SpotLight u_SpotLight;\r\n\t\t#endif\r\n\t#else\r\n\t\tuniform mat4 u_View;\r\n\t\tuniform vec4 u_ProjectionParams;\r\n\t\tuniform vec4 u_Viewport;\r\n\t\tuniform int u_DirationLightCount;\r\n\t\tuniform sampler2D u_LightBuffer;\r\n\t\tuniform sampler2D u_LightClusterBuffer;\r\n\t#endif\r\n\r\n\t#ifdef SPECULARMAP \r\n\t\tuniform sampler2D u_SpecularTexture;\r\n\t#endif\r\n#endif\r\n\r\n#ifdef NORMALMAP \r\n\tuniform sampler2D u_NormalTexture;\r\n\tvarying vec3 v_Tangent;\r\n\tvarying vec3 v_Binormal;\r\n#endif\r\n\r\n#ifdef FOG\r\n\tuniform float u_FogStart;\r\n\tuniform float u_FogRange;\r\n\tuniform vec3 u_FogColor;\r\n#endif\r\n\r\n#if defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\r\n\tvarying vec3 v_PositionWorld;\r\n#endif\r\n\r\n\r\n#include "GlobalIllumination.glsl";//"GlobalIllumination.glsl use uniform should at front of this\r\n\r\n#if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)\r\n\tvarying vec4 v_ShadowCoord;\r\n#endif\r\n\r\n#ifdef CALCULATE_SPOTSHADOWS\r\n\tvarying vec4 v_SpotShadowCoord;\r\n#endif\r\n\r\n\r\nvoid main()\r\n{\r\n\tvec3 normal;//light and SH maybe use normal\r\n\t#if defined(NORMALMAP)\r\n\t\tvec3 normalMapSample = texture2D(u_NormalTexture, v_Texcoord0).rgb;\r\n\t\tnormal = normalize(NormalSampleToWorldSpace(normalMapSample, v_Normal, v_Tangent,v_Binormal));\r\n\t#else\r\n\t\tnormal = normalize(v_Normal);\r\n\t#endif\r\n\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tvec3 viewDir= normalize(v_ViewDir);\r\n\t#endif\r\n\r\n\tLayaGIInput giInput;\r\n\t#ifdef LIGHTMAP\t\r\n\t\tgiInput.lightmapUV=v_LightMapUV;\r\n\t#endif\r\n\tvec3 globalDiffuse=layaGIBase(giInput,1.0,normal);\r\n\t\r\n\tvec4 mainColor=u_DiffuseColor;\r\n\t#ifdef DIFFUSEMAP\r\n\t\tvec4 difTexColor=texture2D(u_DiffuseTexture, v_Texcoord0);\r\n\t\tmainColor=mainColor*difTexColor;\r\n\t#endif \r\n\t#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\r\n\t\tmainColor=mainColor*v_Color;\r\n\t#endif \r\n    \r\n\t#ifdef ALPHATEST\r\n\t\tif(mainColor.a<u_AlphaTestValue)\r\n\t\t\tdiscard;\r\n\t#endif\r\n  \r\n\t\r\n\tvec3 diffuse = vec3(0.0);\r\n\tvec3 specular= vec3(0.0);\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tvec3 dif,spe;\r\n\t\t#ifdef SPECULARMAP\r\n\t\t\tvec3 gloss=texture2D(u_SpecularTexture, v_Texcoord0).rgb;\r\n\t\t#else\r\n\t\t\t#ifdef DIFFUSEMAP\r\n\t\t\t\tvec3 gloss=vec3(difTexColor.a);\r\n\t\t\t#else\r\n\t\t\t\tvec3 gloss=vec3(1.0);\r\n\t\t\t#endif\r\n\t\t#endif\r\n\t#endif\r\n\r\n\t\r\n\t\r\n\t#ifdef LEGACYSINGLELIGHTING\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tLayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_DirectionLight,dif,spe);\r\n\t\t\t#ifdef CALCULATE_SHADOWS\r\n\t\t\t\t#ifdef SHADOW_CASCADE\r\n\t\t\t\t\tvec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\r\n\t\t\t\t#else\r\n\t\t\t\t\tvec4 shadowCoord = v_ShadowCoord;\r\n\t\t\t\t#endif\r\n\t\t\t\tfloat shadowAttenuation=sampleShadowmap(shadowCoord);\r\n\t\t\t\tdif *= shadowAttenuation;\r\n\t\t\t\tspe *= shadowAttenuation;\r\n\t\t\t#endif\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef POINTLIGHT\r\n\t\t\tLayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_PointLight,dif,spe);\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\r\n\t\t#ifdef SPOTLIGHT\r\n\t\t\tLayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_SpotLight,dif,spe);\r\n\t\t\t#ifdef CALCULATE_SPOTSHADOWS\r\n\t\t\t\tvec4 spotShadowcoord = v_SpotShadowCoord;\r\n\t\t\t\tfloat spotShadowAttenuation = sampleSpotShadowmap(spotShadowcoord);\r\n\t\t\t\tdif *= shadowAttenuation;\r\n\t\t\t\tspe *= shadowAttenuation;\r\n\t\t\t#endif\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\t#else\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t{\r\n\t\t\t\tif(i >= u_DirationLightCount)\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tDirectionLight directionLight = getDirectionLight(u_LightBuffer,i);\r\n\t\t\t\t#ifdef CALCULATE_SHADOWS\r\n\t\t\t\t\tif(i == 0)\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t#ifdef SHADOW_CASCADE\r\n\t\t\t\t\t\t\tvec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\r\n\t\t\t\t\t\t#else\r\n\t\t\t\t\t\t\tvec4 shadowCoord = v_ShadowCoord;\r\n\t\t\t\t\t\t#endif\r\n\t\t\t\t\t\tdirectionLight.color *= sampleShadowmap(shadowCoord);\r\n\t\t\t\t\t}\r\n\t\t\t\t#endif\r\n\t\t\t\tLayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,directionLight,dif,spe);\r\n\t\t\t\tdiffuse+=dif;\r\n\t\t\t\tspecular+=spe;\r\n\t\t\t}\r\n\t\t#endif\r\n\t\t#if defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\t\tivec4 clusterInfo =getClusterInfo(u_LightClusterBuffer,u_View,u_Viewport, v_PositionWorld,gl_FragCoord,u_ProjectionParams);\r\n\t\t\t#ifdef POINTLIGHT\r\n\t\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t\t{\r\n\t\t\t\t\tif(i >= clusterInfo.x)//PointLightCount\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tPointLight pointLight = getPointLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\r\n\t\t\t\t\tLayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,pointLight,dif,spe);\r\n\t\t\t\t\tdiffuse+=dif;\r\n\t\t\t\t\tspecular+=spe;\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t\t#ifdef SPOTLIGHT\r\n\t\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t\t{\r\n\t\t\t\t\tif(i >= clusterInfo.y)//SpotLightCount\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tSpotLight spotLight = getSpotLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\r\n\t\t\t\t\t#ifdef CALCULATE_SPOTSHADOWS\r\n\t\t\t\t\t\tif(i == 0)\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\tvec4 spotShadowcoord = v_SpotShadowCoord;\r\n\t\t\t\t\t\t\tspotLight.color *= sampleSpotShadowmap(spotShadowcoord);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t#endif\r\n\t\t\t\t\tLayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,spotLight,dif,spe);\r\n\t\t\t\t\tdiffuse+=dif;\r\n\t\t\t\t\tspecular+=spe;\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t#endif\r\n\t#endif\r\n\r\n\tgl_FragColor =vec4(mainColor.rgb*(globalDiffuse + diffuse),mainColor.a);\r\n\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tgl_FragColor.rgb+=specular;\r\n\t#endif\r\n\t  \r\n\t#ifdef FOG\r\n\t\tfloat lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\r\n\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\r\n\t#endif\r\n}\r\n\r\n';
			let s = new Laya.SubShader(i, n);
			o.addSubShader(s), s.addShaderPass('uniform vec4 _QOffset;\nuniform float _Dist;\nattribute vec4 a_Position;\nuniform mat4 u_MvpMatrix;\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))||(defined(LIGHTMAP)&&defined(UV))\n\tattribute vec2 a_Texcoord0;\n\tvarying vec2 v_Texcoord0;\n#endif\n\n#if defined(LIGHTMAP)&&defined(UV1)\n\tattribute vec2 a_Texcoord1;\n#endif\n\n#ifdef LIGHTMAP\n\tuniform vec4 u_LightmapScaleOffset;\n\tvarying vec2 v_LightMapUV;\n#endif\n\n#ifdef COLOR\n\tattribute vec4 a_Color;\n\tvarying vec4 v_Color;\n#endif\n\n#ifdef BONE\n\tconst int c_MaxBoneCount = 24;\n\tattribute vec4 a_BoneIndices;\n\tattribute vec4 a_BoneWeights;\n\tuniform mat4 u_Bones[c_MaxBoneCount];\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\tattribute vec3 a_Normal;\n\tvarying vec3 v_Normal; \n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\tuniform vec3 u_CameraPos;\n\tvarying vec3 v_ViewDir; \n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP))&&defined(NORMALMAP)\n\tattribute vec4 a_Tangent0;\n\tvarying vec3 v_Tangent;\n\tvarying vec3 v_Binormal;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n\tuniform mat4 u_WorldMat;\n\tvarying vec3 v_PositionWorld;\n#endif\n\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n  #ifdef SHADOWMAP_PSSM1 \n  varying vec4 v_lightMVPPos;\n  uniform mat4 u_lightShadowVP[4];\n  #endif\n#endif\n\n#ifdef TILINGOFFSET\n\tuniform vec4 u_TilingOffset;\n#endif\n\nvoid main_castShadow()\n{\n\t#ifdef BONE\n\t\tmat4 skinTransform=mat4(0.0);\n\t\tskinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n\t\tvec4 position=skinTransform*a_Position;\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#else\n\t\thighp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#endif\n\t \n\t//TODO没考虑UV动画呢\n\t#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n\t\tv_Texcoord0=a_Texcoord0;\n\t#endif\n\t\tv_posViewZ = gl_Position.z;\n}\n\nvoid main_normal()\n{\n\t#ifdef BONE\n\t\tmat4 skinTransform=mat4(0.0);\n\t\tskinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n\t\tskinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n\t\tvec4 position=skinTransform*a_Position;\n\t\t\n highp vec4 vPos = u_MvpMatrix * position;\n float zOff = vPos.z / _Dist;\n  vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#else\n\t\thighp vec4 vPos = u_MvpMatrix * a_Position;\n float zOff = vPos.z / _Dist;\n vPos += _QOffset * zOff * zOff;\n gl_Position = vPos;\n\t#endif\n\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\t\tmat3 worldMat;\n\t\t#ifdef BONE\n\t\t\tworldMat=mat3(u_WorldMat*skinTransform);\n\t\t#else\n\t\t\tworldMat=mat3(u_WorldMat);\n\t\t#endif  \n\t\tv_Normal=worldMat*a_Normal;//TODO:法线可以用"魔法"矩阵\n\t\t#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n\t\t\tv_Tangent=worldMat*a_Tangent0.xyz;\n\t\t\tv_Binormal=cross(v_Normal,v_Tangent)*a_Tangent0.w;\n\t\t#endif\n\t#endif\n\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n\t\t#ifdef BONE\n\t\t\tv_PositionWorld=(u_WorldMat*position).xyz;\n\t\t#else\n\t\t\tv_PositionWorld=(u_WorldMat*a_Position).xyz;\n\t\t#endif\n\t#endif\n\t\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n\t\tv_ViewDir=u_CameraPos-v_PositionWorld;\n\t#endif\n\n\t#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n\t\tv_Texcoord0=a_Texcoord0;\n\t\t#ifdef TILINGOFFSET\n\t\t\tv_Texcoord0=(vec2(v_Texcoord0.x,v_Texcoord0.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;\n\t\t\tv_Texcoord0=vec2(v_Texcoord0.x,1.0+v_Texcoord0.y);\n\t\t#endif\n\t#endif\n\n\t#ifdef LIGHTMAP\n\t\t#ifdef SCALEOFFSETLIGHTINGMAPUV\n\t\t\t#ifdef UV1\n\t\t\t\tv_LightMapUV=vec2(a_Texcoord1.x*u_LightmapScaleOffset.x+u_LightmapScaleOffset.z,1.0+a_Texcoord1.y*u_LightmapScaleOffset.y+u_LightmapScaleOffset.w);\n\t\t\t#else\n\t\t\t\tv_LightMapUV=vec2(a_Texcoord0.x,a_Texcoord0.y-1.0)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n\t\t\t#endif \n\t\t#else\n\t\t\t#ifdef UV1\n\t\t\t\tv_LightMapUV=a_Texcoord1;\n\t\t\t#else\n\t\t\t\tv_LightMapUV=a_Texcoord0;\n\t\t\t#endif \n\t\t#endif \n\t#endif\n\n\t#ifdef COLOR\n\t\tv_Color=a_Color;\n\t#endif\n\n\t#ifdef RECEIVESHADOW\n\t\tv_posViewZ = gl_Position.w;\n\t\t#ifdef SHADOWMAP_PSSM1 \n\t\t\tv_lightMVPPos = u_lightShadowVP[0] * vec4(v_PositionWorld,1.0);\n\t\t#endif\n\t#endif\n}\n\nvoid main()\n{\n\t#ifdef CASTSHADOW\n\t\tmain_castShadow();\n\t#else\n\t\tmain_normal();\n\t#endif\n}', '#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n\tprecision highp float;\r\n\tprecision highp int;\r\n#else\r\n\tprecision mediump float;\r\n\tprecision mediump int;\r\n#endif\r\n\r\n#include "Lighting.glsl";\r\n#include "Shadow.glsl"\r\n\r\nuniform vec4 u_DiffuseColor;\r\n\r\n#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\r\n\tvarying vec4 v_Color;\r\n#endif\r\n\r\n#ifdef ALPHATEST\r\n\tuniform float u_AlphaTestValue;\r\n#endif\r\n\r\n#ifdef DIFFUSEMAP\r\n\tuniform sampler2D u_DiffuseTexture;\r\n#endif\r\n\r\n\r\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\r\n\tvarying vec2 v_Texcoord0;\r\n#endif\r\n\r\n#ifdef LIGHTMAP\r\n\tvarying vec2 v_LightMapUV;\r\n\tuniform sampler2D u_LightMap;\r\n#endif\r\n\r\nvarying vec3 v_Normal;\r\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\tvarying vec3 v_ViewDir; \r\n\r\n\tuniform vec3 u_MaterialSpecular;\r\n\tuniform float u_Shininess;\r\n\r\n\t#ifdef LEGACYSINGLELIGHTING\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tuniform DirectionLight u_DirectionLight;\r\n\t\t#endif\r\n\t\t#ifdef POINTLIGHT\r\n\t\t\tuniform PointLight u_PointLight;\r\n\t\t#endif\r\n\t\t#ifdef SPOTLIGHT\r\n\t\t\tuniform SpotLight u_SpotLight;\r\n\t\t#endif\r\n\t#else\r\n\t\tuniform mat4 u_View;\r\n\t\tuniform vec4 u_ProjectionParams;\r\n\t\tuniform vec4 u_Viewport;\r\n\t\tuniform int u_DirationLightCount;\r\n\t\tuniform sampler2D u_LightBuffer;\r\n\t\tuniform sampler2D u_LightClusterBuffer;\r\n\t#endif\r\n\r\n\t#ifdef SPECULARMAP \r\n\t\tuniform sampler2D u_SpecularTexture;\r\n\t#endif\r\n#endif\r\n\r\n#ifdef NORMALMAP \r\n\tuniform sampler2D u_NormalTexture;\r\n\tvarying vec3 v_Tangent;\r\n\tvarying vec3 v_Binormal;\r\n#endif\r\n\r\n#ifdef FOG\r\n\tuniform float u_FogStart;\r\n\tuniform float u_FogRange;\r\n\tuniform vec3 u_FogColor;\r\n#endif\r\n\r\n#if defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\r\n\tvarying vec3 v_PositionWorld;\r\n#endif\r\n\r\n\r\n#include "GlobalIllumination.glsl";//"GlobalIllumination.glsl use uniform should at front of this\r\n\r\n#if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)\r\n\tvarying vec4 v_ShadowCoord;\r\n#endif\r\n\r\n#ifdef CALCULATE_SPOTSHADOWS\r\n\tvarying vec4 v_SpotShadowCoord;\r\n#endif\r\n\r\n\r\nvoid main()\r\n{\r\n\tvec3 normal;//light and SH maybe use normal\r\n\t#if defined(NORMALMAP)\r\n\t\tvec3 normalMapSample = texture2D(u_NormalTexture, v_Texcoord0).rgb;\r\n\t\tnormal = normalize(NormalSampleToWorldSpace(normalMapSample, v_Normal, v_Tangent,v_Binormal));\r\n\t#else\r\n\t\tnormal = normalize(v_Normal);\r\n\t#endif\r\n\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tvec3 viewDir= normalize(v_ViewDir);\r\n\t#endif\r\n\r\n\tLayaGIInput giInput;\r\n\t#ifdef LIGHTMAP\t\r\n\t\tgiInput.lightmapUV=v_LightMapUV;\r\n\t#endif\r\n\tvec3 globalDiffuse=layaGIBase(giInput,1.0,normal);\r\n\t\r\n\tvec4 mainColor=u_DiffuseColor;\r\n\t#ifdef DIFFUSEMAP\r\n\t\tvec4 difTexColor=texture2D(u_DiffuseTexture, v_Texcoord0);\r\n\t\tmainColor=mainColor*difTexColor;\r\n\t#endif \r\n\t#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\r\n\t\tmainColor=mainColor*v_Color;\r\n\t#endif \r\n    \r\n\t#ifdef ALPHATEST\r\n\t\tif(mainColor.a<u_AlphaTestValue)\r\n\t\t\tdiscard;\r\n\t#endif\r\n  \r\n\t\r\n\tvec3 diffuse = vec3(0.0);\r\n\tvec3 specular= vec3(0.0);\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tvec3 dif,spe;\r\n\t\t#ifdef SPECULARMAP\r\n\t\t\tvec3 gloss=texture2D(u_SpecularTexture, v_Texcoord0).rgb;\r\n\t\t#else\r\n\t\t\t#ifdef DIFFUSEMAP\r\n\t\t\t\tvec3 gloss=vec3(difTexColor.a);\r\n\t\t\t#else\r\n\t\t\t\tvec3 gloss=vec3(1.0);\r\n\t\t\t#endif\r\n\t\t#endif\r\n\t#endif\r\n\r\n\t\r\n\t\r\n\t#ifdef LEGACYSINGLELIGHTING\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tLayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_DirectionLight,dif,spe);\r\n\t\t\t#ifdef CALCULATE_SHADOWS\r\n\t\t\t\t#ifdef SHADOW_CASCADE\r\n\t\t\t\t\tvec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\r\n\t\t\t\t#else\r\n\t\t\t\t\tvec4 shadowCoord = v_ShadowCoord;\r\n\t\t\t\t#endif\r\n\t\t\t\tfloat shadowAttenuation=sampleShadowmap(shadowCoord);\r\n\t\t\t\tdif *= shadowAttenuation;\r\n\t\t\t\tspe *= shadowAttenuation;\r\n\t\t\t#endif\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef POINTLIGHT\r\n\t\t\tLayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_PointLight,dif,spe);\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\r\n\t\t#ifdef SPOTLIGHT\r\n\t\t\tLayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_SpotLight,dif,spe);\r\n\t\t\t#ifdef CALCULATE_SPOTSHADOWS\r\n\t\t\t\tvec4 spotShadowcoord = v_SpotShadowCoord;\r\n\t\t\t\tfloat spotShadowAttenuation = sampleSpotShadowmap(spotShadowcoord);\r\n\t\t\t\tdif *= shadowAttenuation;\r\n\t\t\t\tspe *= shadowAttenuation;\r\n\t\t\t#endif\r\n\t\t\tdiffuse+=dif;\r\n\t\t\tspecular+=spe;\r\n\t\t#endif\r\n\t#else\r\n\t\t#ifdef DIRECTIONLIGHT\r\n\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t{\r\n\t\t\t\tif(i >= u_DirationLightCount)\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tDirectionLight directionLight = getDirectionLight(u_LightBuffer,i);\r\n\t\t\t\t#ifdef CALCULATE_SHADOWS\r\n\t\t\t\t\tif(i == 0)\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t#ifdef SHADOW_CASCADE\r\n\t\t\t\t\t\t\tvec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\r\n\t\t\t\t\t\t#else\r\n\t\t\t\t\t\t\tvec4 shadowCoord = v_ShadowCoord;\r\n\t\t\t\t\t\t#endif\r\n\t\t\t\t\t\tdirectionLight.color *= sampleShadowmap(shadowCoord);\r\n\t\t\t\t\t}\r\n\t\t\t\t#endif\r\n\t\t\t\tLayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,directionLight,dif,spe);\r\n\t\t\t\tdiffuse+=dif;\r\n\t\t\t\tspecular+=spe;\r\n\t\t\t}\r\n\t\t#endif\r\n\t\t#if defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\t\tivec4 clusterInfo =getClusterInfo(u_LightClusterBuffer,u_View,u_Viewport, v_PositionWorld,gl_FragCoord,u_ProjectionParams);\r\n\t\t\t#ifdef POINTLIGHT\r\n\t\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t\t{\r\n\t\t\t\t\tif(i >= clusterInfo.x)//PointLightCount\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tPointLight pointLight = getPointLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\r\n\t\t\t\t\tLayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,pointLight,dif,spe);\r\n\t\t\t\t\tdiffuse+=dif;\r\n\t\t\t\t\tspecular+=spe;\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t\t#ifdef SPOTLIGHT\r\n\t\t\t\tfor (int i = 0; i < MAX_LIGHT_COUNT; i++) \r\n\t\t\t\t{\r\n\t\t\t\t\tif(i >= clusterInfo.y)//SpotLightCount\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tSpotLight spotLight = getSpotLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\r\n\t\t\t\t\t#ifdef CALCULATE_SPOTSHADOWS\r\n\t\t\t\t\t\tif(i == 0)\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\tvec4 spotShadowcoord = v_SpotShadowCoord;\r\n\t\t\t\t\t\t\tspotLight.color *= sampleSpotShadowmap(spotShadowcoord);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t#endif\r\n\t\t\t\t\tLayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,spotLight,dif,spe);\r\n\t\t\t\t\tdiffuse+=dif;\r\n\t\t\t\t\tspecular+=spe;\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t#endif\r\n\t#endif\r\n\r\n\tgl_FragColor =vec4(mainColor.rgb*(globalDiffuse + diffuse),mainColor.a);\r\n\r\n\t#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\r\n\t\tgl_FragColor.rgb+=specular;\r\n\t#endif\r\n\t  \r\n\t#ifdef FOG\r\n\t\tfloat lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\r\n\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\r\n\t#endif\r\n}\r\n\r\n', a, "Forward"), ae.SHADERDEFINE_DIFFUSEMAP = Laya.Shader3D.getDefineByName("DIFFUSEMAP"), ae.SHADERDEFINE_NORMALMAP = Laya.Shader3D.getDefineByName("NORMALMAP"), ae.SHADERDEFINE_SPECULARMAP = Laya.Shader3D.getDefineByName("SPECULARMAP"), ae.SHADERDEFINE_REFLECTMAP = Laya.Shader3D.getDefineByName("REFLECTMAP"), ae.SHADERDEFINE_TILINGOFFSET = Laya.Shader3D.getDefineByName("TILINGOFFSET"), ae.SHADERDEFINE_ADDTIVEFOG = Laya.Shader3D.getDefineByName("ADDTIVEFOG")
		}
	}
	ae.RENDERMODE_OPAQUE = 0, ae.RENDERMODE_CUTOUT = 1, ae.RENDERMODE_TRANSPARENT = 2, ae.RENDERMODE_ADDTIVE = 3, ae.EMISSIVETEXTURE = 4, ae.REFLECTTEXTURE = 5, ae.MATERIALREFLECT = 10, ae.GLOWINGEDGECOLOR = 12, ae.BENDANGLE = 164, ae.BENDDISTANCE = 165, ae.isInit = !1;
	class oe extends Laya.ShurikenParticleMaterial {
		constructor() {
			super(), this.initShader1(), this.setShaderName("PARTICLESHURIKENEXP"), this.setBendDistance(50)
		}
		get tintColor() {
			return this._getColor(oe.TINTCOLOR)
		}
		set tintColor(e) {
			e ? this._addShaderDefine(oe.SHADERDEFINE_TINTCOLOR) : this._removeShaderDefine(oe.SHADERDEFINE_TINTCOLOR), this._setColor(oe.TINTCOLOR, e)
		}
		getBendOffset() {
			return this._getColor(oe.BENDANGLE)
		}
		setBendOffset(e) {
			this._setColor(oe.BENDANGLE, e)
		}
		setBendDistance(e) {
			this._setNumber(oe.BENDDISTANCE, e)
		}
		get texture() {
			return this._shaderValues.getTexture(oe.DIFFUSETEXTURE)
		}
		set texture(e) {
			e ? this._shaderValues.addDefine(oe.SHADERDEFINE_DIFFUSEMAP) : this._shaderValues.removeDefine(oe.SHADERDEFINE_DIFFUSEMAP), this._setTexture(oe.DIFFUSETEXTURE, e)
		}
		cloneMat(e) {
			if (e)
				for (let t in this)
					if ("_shader" != t)
						if ("_shaderValues" == t)
							for (let i in e[t]._data) this[t]._data[i] = e[t]._data[i];
						else this[t] = e[t]
		}
		initShader1() {
			if (oe.isInit) return;
			let e, t;
			oe.isInit = !0, oe.BENDANGLE = Laya.Shader3D.propertyNameToID("_QOffset"), oe.BENDDISTANCE = Laya.Shader3D.propertyNameToID("_Dist");
			let i = {
				a_CornerTextureCoordinate: Laya.VertexShuriKenParticle.PARTICLE_CORNERTEXTURECOORDINATE0,
				a_MeshPosition: Laya.VertexShuriKenParticle.PARTICLE_POSITION0,
				a_MeshColor: Laya.VertexShuriKenParticle.PARTICLE_COLOR0,
				a_MeshTextureCoordinate: Laya.VertexShuriKenParticle.PARTICLE_TEXTURECOORDINATE0,
				a_ShapePositionStartLifeTime: Laya.VertexShuriKenParticle.PARTICLE_SHAPEPOSITIONSTARTLIFETIME,
				a_DirectionTime: Laya.VertexShuriKenParticle.PARTICLE_DIRECTIONTIME,
				a_StartColor: Laya.VertexShuriKenParticle.PARTICLE_STARTCOLOR0,
				a_EndColor: Laya.VertexShuriKenParticle.PARTICLE_ENDCOLOR0,
				a_StartSize: Laya.VertexShuriKenParticle.PARTICLE_STARTSIZE,
				a_StartRotation0: Laya.VertexShuriKenParticle.PARTICLE_STARTROTATION,
				a_StartSpeed: Laya.VertexShuriKenParticle.PARTICLE_STARTSPEED,
				a_Random0: Laya.VertexShuriKenParticle.PARTICLE_RANDOM0,
				a_Random1: Laya.VertexShuriKenParticle.PARTICLE_RANDOM1,
				a_SimulationWorldPostion: Laya.VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDPOSTION,
				a_SimulationWorldRotation: Laya.VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDROTATION
			},
				n = {
					u_Tintcolor: Laya.Shader3D.PERIOD_MATERIAL,
					u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
					u_texture: Laya.Shader3D.PERIOD_MATERIAL,
					_QOffset: Laya.Shader3D.PERIOD_MATERIAL,
					_Dist: Laya.Shader3D.PERIOD_MATERIAL,
					u_WorldPosition: Laya.Shader3D.PERIOD_SPRITE,
					u_WorldRotation: Laya.Shader3D.PERIOD_SPRITE,
					u_PositionScale: Laya.Shader3D.PERIOD_SPRITE,
					u_SizeScale: Laya.Shader3D.PERIOD_SPRITE,
					u_ScalingMode: Laya.Shader3D.PERIOD_SPRITE,
					u_Gravity: Laya.Shader3D.PERIOD_SPRITE,
					u_ThreeDStartRotation: Laya.Shader3D.PERIOD_SPRITE,
					u_StretchedBillboardLengthScale: Laya.Shader3D.PERIOD_SPRITE,
					u_StretchedBillboardSpeedScale: Laya.Shader3D.PERIOD_SPRITE,
					u_SimulationSpace: Laya.Shader3D.PERIOD_SPRITE,
					u_CurrentTime: Laya.Shader3D.PERIOD_SPRITE,
					u_ColorOverLifeGradientAlphas: Laya.Shader3D.PERIOD_SPRITE,
					u_ColorOverLifeGradientColors: Laya.Shader3D.PERIOD_SPRITE,
					u_MaxColorOverLifeGradientAlphas: Laya.Shader3D.PERIOD_SPRITE,
					u_MaxColorOverLifeGradientColors: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityConst: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientX: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientY: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientZ: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityConstMax: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientMaxX: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientMaxY: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLVelocityGradientMaxZ: Laya.Shader3D.PERIOD_SPRITE,
					u_VOLSpaceType: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradient: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientX: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientY: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientZ: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientMax: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientMaxX: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientMaxY: Laya.Shader3D.PERIOD_SPRITE,
					u_SOLSizeGradientMaxZ: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityConst: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityConstSeprarate: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradient: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientX: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientY: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientZ: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientW: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityConstMax: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityConstMaxSeprarate: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientMax: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientMaxX: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientMaxY: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientMaxZ: Laya.Shader3D.PERIOD_SPRITE,
					u_ROLAngularVelocityGradientMaxW: Laya.Shader3D.PERIOD_SPRITE,
					u_TSACycles: Laya.Shader3D.PERIOD_SPRITE,
					u_TSASubUVLength: Laya.Shader3D.PERIOD_SPRITE,
					u_TSAGradientUVs: Laya.Shader3D.PERIOD_SPRITE,
					u_TSAMaxGradientUVs: Laya.Shader3D.PERIOD_SPRITE,
					u_CameraPosition: Laya.Shader3D.PERIOD_CAMERA,
					u_CameraDirection: Laya.Shader3D.PERIOD_CAMERA,
					u_CameraUp: Laya.Shader3D.PERIOD_CAMERA,
					u_View: Laya.Shader3D.PERIOD_CAMERA,
					u_Projection: Laya.Shader3D.PERIOD_CAMERA,
					u_FogStart: Laya.Shader3D.PERIOD_SCENE,
					u_FogRange: Laya.Shader3D.PERIOD_SCENE,
					u_FogColor: Laya.Shader3D.PERIOD_SCENE
				},
				a = Laya.Shader3D.add("PARTICLESHURIKENEXP");
			e = "#ifdef HIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n\n#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\nattribute vec4 a_CornerTextureCoordinate;\n#endif\n#ifdef RENDERMODE_MESH\nattribute vec3 a_MeshPosition;\nattribute vec4 a_MeshColor;\nattribute vec2 a_MeshTextureCoordinate;\nvarying vec4 v_MeshColor;\n#endif\n\nattribute vec4 a_ShapePositionStartLifeTime;\nattribute vec4 a_DirectionTime;\nattribute vec4 a_StartColor;\nattribute vec3 a_StartSize;\nattribute vec3 a_StartRotation0;\nattribute float a_StartSpeed;\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\nattribute vec4 a_Random0;\n#endif\n#if defined(TEXTURESHEETANIMATIONRANDOMCURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\nattribute vec4 a_Random1;\n#endif\nattribute vec3 a_SimulationWorldPostion;\nattribute vec4 a_SimulationWorldRotation;\n\nvarying float v_Discard;\nvarying vec4 v_Color;\n#ifdef DIFFUSEMAP\nvarying vec2 v_TextureCoordinate;\n#endif\n\nuniform float u_CurrentTime;\nuniform vec3 u_Gravity;\n\nuniform vec3 u_WorldPosition;\nuniform vec4 u_WorldRotation;\nuniform bool u_ThreeDStartRotation;\nuniform int u_ScalingMode;\nuniform vec3 u_PositionScale;\nuniform vec3 u_SizeScale;\nuniform mat4 u_View;\nuniform mat4 u_Projection;\n\n#ifdef STRETCHEDBILLBOARD\nuniform vec3 u_CameraPosition;\n#endif\nuniform vec3 u_CameraDirection;//TODO:只有几种广告牌模式需要用\nuniform vec3 u_CameraUp;\n\nuniform  float u_StretchedBillboardLengthScale;\nuniform  float u_StretchedBillboardSpeedScale;\nuniform int u_SimulationSpace;\n\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\nuniform  int  u_VOLSpaceType;\n#endif\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)\nuniform  vec3 u_VOLVelocityConst;\n#endif\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\nuniform  vec2 u_VOLVelocityGradientX[4];//x为key,y为速度\nuniform  vec2 u_VOLVelocityGradientY[4];//x为key,y为速度\nuniform  vec2 u_VOLVelocityGradientZ[4];//x为key,y为速度\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\nuniform  vec3 u_VOLVelocityConstMax;\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\nuniform  vec2 u_VOLVelocityGradientMaxX[4];//x为key,y为速度\nuniform  vec2 u_VOLVelocityGradientMaxY[4];//x为key,y为速度\nuniform  vec2 u_VOLVelocityGradientMaxZ[4];//x为key,y为速度\n#endif\n\n#ifdef COLOROVERLIFETIME\nuniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\nuniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\n#endif\n#ifdef RANDOMCOLOROVERLIFETIME\nuniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\nuniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\nuniform  vec4 u_MaxColorOverLifeGradientColors[4];//x为key,yzw为Color\nuniform  vec2 u_MaxColorOverLifeGradientAlphas[4];//x为key,y为Alpha\n#endif\n\n\n#if defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMERANDOMCURVES)\nuniform  vec2 u_SOLSizeGradient[4];//x为key,y为尺寸\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVES\nuniform  vec2 u_SOLSizeGradientMax[4];//x为key,y为尺寸\n#endif\n#if defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\nuniform  vec2 u_SOLSizeGradientX[4];//x为key,y为尺寸\nuniform  vec2 u_SOLSizeGradientY[4];//x为key,y为尺寸\nuniform  vec2 u_SOLSizeGradientZ[4];//x为key,y为尺寸\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\nuniform  vec2 u_SOLSizeGradientMaxX[4];//x为key,y为尺寸\nuniform  vec2 u_SOLSizeGradientMaxY[4];//x为key,y为尺寸\nuniform  vec2 u_SOLSizeGradientMaxZ[4];//x为key,y为尺寸\n#endif\n\n\n#ifdef ROTATIONOVERLIFETIME\n#if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\nuniform  float u_ROLAngularVelocityConst;\n#endif\n#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\nuniform  float u_ROLAngularVelocityConstMax;\n#endif\n#if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\nuniform  vec2 u_ROLAngularVelocityGradient[4];//x为key,y为旋转\n#endif\n#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\nuniform  vec2 u_ROLAngularVelocityGradientMax[4];//x为key,y为旋转\n#endif\n#endif\n#ifdef ROTATIONOVERLIFETIMESEPERATE\n#if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\nuniform  vec3 u_ROLAngularVelocityConstSeprarate;\n#endif\n#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\nuniform  vec3 u_ROLAngularVelocityConstMaxSeprarate;\n#endif\n#if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\nuniform  vec2 u_ROLAngularVelocityGradientX[4];\nuniform  vec2 u_ROLAngularVelocityGradientY[4];\nuniform  vec2 u_ROLAngularVelocityGradientZ[4];\nuniform  vec2 u_ROLAngularVelocityGradientW[4];\n#endif\n#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\nuniform  vec2 u_ROLAngularVelocityGradientMaxX[4];\nuniform  vec2 u_ROLAngularVelocityGradientMaxY[4];\nuniform  vec2 u_ROLAngularVelocityGradientMaxZ[4];\nuniform  vec2 u_ROLAngularVelocityGradientMaxW[4];\n#endif\n#endif\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\nuniform  float u_TSACycles;\nuniform  vec2 u_TSASubUVLength;\nuniform  vec2 u_TSAGradientUVs[4];//x为key,y为frame\n#endif\n#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\nuniform  vec2 u_TSAMaxGradientUVs[4];//x为key,y为frame\n#endif\n\n#ifdef FOG\nvarying vec3 v_PositionWorld;\n#endif\n\n#ifdef TILINGOFFSET\nuniform vec4 u_TilingOffset;\n#endif\nuniform vec4 _QOffset;\nuniform float _Dist;\n\nvec3 rotationByEuler(in vec3 vector,in vec3 rot)\n{\nfloat halfRoll = rot.z * 0.5;\nfloat halfPitch = rot.x * 0.5;\nfloat halfYaw = rot.y * 0.5;\n\nfloat sinRoll = sin(halfRoll);\nfloat cosRoll = cos(halfRoll);\nfloat sinPitch = sin(halfPitch);\nfloat cosPitch = cos(halfPitch);\nfloat sinYaw = sin(halfYaw);\nfloat cosYaw = cos(halfYaw);\n\nfloat quaX = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);\nfloat quaY = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);\nfloat quaZ = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);\nfloat quaW = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);\n\n//vec4 q=vec4(quaX,quaY,quaZ,quaW);\n//vec3 temp = cross(q.xyz, vector) + q.w * vector;\n//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\n\nfloat x = quaX + quaX;\nfloat y = quaY + quaY;\nfloat z = quaZ + quaZ;\nfloat wx = quaW * x;\nfloat wy = quaW * y;\nfloat wz = quaW * z;\nfloat xx = quaX * x;\nfloat xy = quaX * y;\nfloat xz = quaX * z;\nfloat yy = quaY * y;\nfloat yz = quaY * z;\nfloat zz = quaZ * z;\n\nreturn vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n            ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n            ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n\n}\n\n//假定axis已经归一化\nvec3 rotationByAxis(in vec3 vector,in vec3 axis, in float angle)\n{\nfloat halfAngle = angle * 0.5;\nfloat sin = sin(halfAngle);\n\nfloat quaX = axis.x * sin;\nfloat quaY = axis.y * sin;\nfloat quaZ = axis.z * sin;\nfloat quaW = cos(halfAngle);\n\n//vec4 q=vec4(quaX,quaY,quaZ,quaW);\n//vec3 temp = cross(q.xyz, vector) + q.w * vector;\n//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\n\nfloat x = quaX + quaX;\nfloat y = quaY + quaY;\nfloat z = quaZ + quaZ;\nfloat wx = quaW * x;\nfloat wy = quaW * y;\nfloat wz = quaW * z;\nfloat xx = quaX * x;\nfloat xy = quaX * y;\nfloat xz = quaX * z;\nfloat yy = quaY * y;\nfloat yz = quaY * z;\nfloat zz = quaZ * z;\n\nreturn vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n            ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n            ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n\n}\n\nvec3 rotationByQuaternions(in vec3 v,in vec4 q) \n{\nreturn v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\n\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\nfloat getCurValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\n{\nfloat curValue;\nfor(int i=1;i<4;i++)\n{\n    vec2 gradientNumber=gradientNumbers[i];\n    float key=gradientNumber.x;\n    if(key>=normalizedAge)\n    {\n        vec2 lastGradientNumber=gradientNumbers[i-1];\n        float lastKey=lastGradientNumber.x;\n        float age=(normalizedAge-lastKey)/(key-lastKey);\n        curValue=mix(lastGradientNumber.y,gradientNumber.y,age);\n        break;\n    }\n}\nreturn curValue;\n}\n#endif\n\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\nfloat getTotalValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\n{\nfloat totalValue=0.0;\nfor(int i=1;i<4;i++)\n{\n    vec2 gradientNumber=gradientNumbers[i];\n    float key=gradientNumber.x;\n    vec2 lastGradientNumber=gradientNumbers[i-1];\n    float lastValue=lastGradientNumber.y;\n    \n    if(key>=normalizedAge){\n        float lastKey=lastGradientNumber.x;\n        float age=(normalizedAge-lastKey)/(key-lastKey);\n        totalValue+=(lastValue+mix(lastValue,gradientNumber.y,age))/2.0*a_ShapePositionStartLifeTime.w*(normalizedAge-lastKey);\n        break;\n    }\n    else{\n        totalValue+=(lastValue+gradientNumber.y)/2.0*a_ShapePositionStartLifeTime.w*(key-lastGradientNumber.x);\n    }\n}\nreturn totalValue;\n}\n#endif\n\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)\nvec4 getColorFromGradient(in vec2 gradientAlphas[4],in vec4 gradientColors[4],in float normalizedAge)\n{\nvec4 overTimeColor;\nfor(int i=1;i<4;i++)\n{\n    vec2 gradientAlpha=gradientAlphas[i];\n    float alphaKey=gradientAlpha.x;\n    if(alphaKey>=normalizedAge)\n    {\n        vec2 lastGradientAlpha=gradientAlphas[i-1];\n        float lastAlphaKey=lastGradientAlpha.x;\n        float age=(normalizedAge-lastAlphaKey)/(alphaKey-lastAlphaKey);\n        overTimeColor.a=mix(lastGradientAlpha.y,gradientAlpha.y,age);\n        break;\n    }\n}\n\nfor(int i=1;i<4;i++)\n{\n    vec4 gradientColor=gradientColors[i];\n    float colorKey=gradientColor.x;\n    if(colorKey>=normalizedAge)\n    {\n        vec4 lastGradientColor=gradientColors[i-1];\n        float lastColorKey=lastGradientColor.x;\n        float age=(normalizedAge-lastColorKey)/(colorKey-lastColorKey);\n        overTimeColor.rgb=mix(gradientColors[i-1].yzw,gradientColor.yzw,age);\n        break;\n    }\n}\nreturn overTimeColor;\n}\n#endif\n\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\nfloat getFrameFromGradient(in vec2 gradientFrames[4],in float normalizedAge)\n{\nfloat overTimeFrame;\nfor(int i=1;i<4;i++)\n{\n    vec2 gradientFrame=gradientFrames[i];\n    float key=gradientFrame.x;\n    if(key>=normalizedAge)\n    {\n        vec2 lastGradientFrame=gradientFrames[i-1];\n        float lastKey=lastGradientFrame.x;\n        float age=(normalizedAge-lastKey)/(key-lastKey);\n        overTimeFrame=mix(lastGradientFrame.y,gradientFrame.y,age);\n        break;\n    }\n}\nreturn floor(overTimeFrame);\n}\n#endif\n\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\nvec3 computeParticleLifeVelocity(in float normalizedAge)\n{\nvec3 outLifeVelocity;\n#ifdef VELOCITYOVERLIFETIMECONSTANT\n    outLifeVelocity=u_VOLVelocityConst; \n#endif\n#ifdef VELOCITYOVERLIFETIMECURVE\n    outLifeVelocity= vec3(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\n    outLifeVelocity=mix(u_VOLVelocityConst,u_VOLVelocityConstMax,vec3(a_Random1.y,a_Random1.z,a_Random1.w)); \n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\n    outLifeVelocity=vec3(mix(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y),\n                    mix(getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z),\n                    mix(getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\n#endif\n                \nreturn outLifeVelocity;\n} \n#endif\n\nvec3 computeParticlePosition(in vec3 startVelocity, in vec3 lifeVelocity,in float age,in float normalizedAge,vec3 gravityVelocity,vec4 worldRotation)\n{\nvec3 startPosition;\nvec3 lifePosition;\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n#ifdef VELOCITYOVERLIFETIMECONSTANT\n        startPosition=startVelocity*age;\n        lifePosition=lifeVelocity*age;\n#endif\n#ifdef VELOCITYOVERLIFETIMECURVE\n        startPosition=startVelocity*age;\n        lifePosition=vec3(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\n        startPosition=startVelocity*age;\n        lifePosition=lifeVelocity*age;\n#endif\n#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\n        startPosition=startVelocity*age;\n        lifePosition=vec3(mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y)\n        ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z)\n        ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\n#endif\n\nvec3 finalPosition;\nif(u_VOLSpaceType==0){\n    if(u_ScalingMode!=2)\n    finalPosition =rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition),worldRotation);\n    else\n    finalPosition =rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition,worldRotation);\n}\nelse{\n    if(u_ScalingMode!=2)\n    finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation)+lifePosition;\n    else\n    finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation)+lifePosition;\n}\n#else\n    startPosition=startVelocity*age;\n    vec3 finalPosition;\n    if(u_ScalingMode!=2)\n    finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation);\n    else\n    finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation);\n#endif\n\nif(u_SimulationSpace==0)\nfinalPosition=finalPosition+a_SimulationWorldPostion;\nelse if(u_SimulationSpace==1) \nfinalPosition=finalPosition+u_WorldPosition;\n\nfinalPosition+=0.5*gravityVelocity*age;\n\nreturn  finalPosition;\n}\n\n\nvec4 computeParticleColor(in vec4 color,in float normalizedAge)\n{\n#ifdef COLOROVERLIFETIME\n    color*=getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge);\n#endif\n\n#ifdef RANDOMCOLOROVERLIFETIME\n    color*=mix(getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge),getColorFromGradient(u_MaxColorOverLifeGradientAlphas,u_MaxColorOverLifeGradientColors,normalizedAge),a_Random0.y);\n#endif\n\nreturn color;\n}\n\nvec2 computeParticleSizeBillbard(in vec2 size,in float normalizedAge)\n{\n#ifdef SIZEOVERLIFETIMECURVE\n    size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVES\n    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \n#endif\n#ifdef SIZEOVERLIFETIMECURVESEPERATE\n    size*=vec2(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge));\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\n    size*=vec2(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\n    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z));\n#endif\nreturn size;\n}\n\n#ifdef RENDERMODE_MESH\nvec3 computeParticleSizeMesh(in vec3 size,in float normalizedAge)\n{\n#ifdef SIZEOVERLIFETIMECURVE\n    size*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVES\n    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \n#endif\n#ifdef SIZEOVERLIFETIMECURVESEPERATE\n    size*=vec3(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge));\n#endif\n#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\n    size*=vec3(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\n    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z)\n    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxZ,normalizedAge),a_Random0.z));\n#endif\nreturn size;\n}\n#endif\n\nfloat computeParticleRotationFloat(in float rotation,in float age,in float normalizedAge)\n{ \n#ifdef ROTATIONOVERLIFETIME\n    #ifdef ROTATIONOVERLIFETIMECONSTANT\n        float ageRot=u_ROLAngularVelocityConst*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMECURVE\n        rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n        float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n        rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\n    #endif\n#endif\n#ifdef ROTATIONOVERLIFETIMESEPERATE\n    #ifdef ROTATIONOVERLIFETIMECONSTANT\n        float ageRot=u_ROLAngularVelocityConstSeprarate.z*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMECURVE\n        rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge);\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n        float ageRot=mix(u_ROLAngularVelocityConstSeprarate.z,u_ROLAngularVelocityConstMaxSeprarate.z,a_Random0.w)*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n        rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\n    #endif\n#endif\nreturn rotation;\n}\n\n\n#if defined(RENDERMODE_MESH)&&(defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE))\nvec3 computeParticleRotationVec3(in vec3 rotation,in float age,in float normalizedAge)\n{ \n#ifdef ROTATIONOVERLIFETIME\n#ifdef ROTATIONOVERLIFETIMECONSTANT\n        float ageRot=u_ROLAngularVelocityConst*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMECURVE\n        rotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n        float ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n        rotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\n    #endif\n#endif\n#ifdef ROTATIONOVERLIFETIMESEPERATE\n#ifdef ROTATIONOVERLIFETIMECONSTANT\n        vec3 ageRot=u_ROLAngularVelocityConstSeprarate*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMECURVE\n        rotation+=vec3(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge));\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\n        vec3 ageRot=mix(u_ROLAngularVelocityConstSeprarate,u_ROLAngularVelocityConstMaxSeprarate,a_Random0.w)*age;\n        rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\n        rotation+=vec3(mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxX,normalizedAge),a_Random0.w)\n        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxY,normalizedAge),a_Random0.w)\n        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\n    #endif\n#endif\nreturn rotation;\n}\n#endif\n\nvec2 computeParticleUV(in vec2 uv,in float normalizedAge)\n{ \n#ifdef TEXTURESHEETANIMATIONCURVE\n    float cycleNormalizedAge=normalizedAge*u_TSACycles;\n    float frame=getFrameFromGradient(u_TSAGradientUVs,cycleNormalizedAge-floor(cycleNormalizedAge));\n    float totalULength=frame*u_TSASubUVLength.x;\n    float floorTotalULength=floor(totalULength);\n    uv.x+=totalULength-floorTotalULength;\n    uv.y+=floorTotalULength*u_TSASubUVLength.y;\n#endif\n#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\n    float cycleNormalizedAge=normalizedAge*u_TSACycles;\n    float uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);\n    float frame=floor(mix(getFrameFromGradient(u_TSAGradientUVs,uvNormalizedAge),getFrameFromGradient(u_TSAMaxGradientUVs,uvNormalizedAge),a_Random1.x));\n    float totalULength=frame*u_TSASubUVLength.x;\n    float floorTotalULength=floor(totalULength);\n    uv.x+=totalULength-floorTotalULength;\n    uv.y+=floorTotalULength*u_TSASubUVLength.y;\n#endif\nreturn uv;\n}\n\nvoid main()\n{\nfloat age = u_CurrentTime - a_DirectionTime.w;\nfloat normalizedAge = age/a_ShapePositionStartLifeTime.w;\nvec3 lifeVelocity;\nif(normalizedAge<1.0){ \nvec3 startVelocity=a_DirectionTime.xyz*a_StartSpeed;\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n    lifeVelocity= computeParticleLifeVelocity(normalizedAge);//计算粒子生命周期速度\n#endif \nvec3 gravityVelocity=u_Gravity*age;\n\nvec4 worldRotation;\nif(u_SimulationSpace==0)\n    worldRotation=a_SimulationWorldRotation;\nelse\n    worldRotation=u_WorldRotation;\n\nvec3 center=computeParticlePosition(startVelocity, lifeVelocity, age, normalizedAge,gravityVelocity,worldRotation);//计算粒子位置\n\n\n#ifdef SPHERHBILLBOARD\n    vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n    vec3 cameraUpVector =normalize(u_CameraUp);//TODO:是否外面归一化\n    vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\n    vec3 upVector = normalize(cross(sideVector,u_CameraDirection));\n    corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n    #if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\n        if(u_ThreeDStartRotation){\n            vec3 rotation=vec3(a_StartRotation0.xy,computeParticleRotationFloat(a_StartRotation0.z,age,normalizedAge));\n            center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,rotation);\n        }\n        else{\n            float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n            float c = cos(rot);\n            float s = sin(rot);\n            mat2 rotation= mat2(c, -s, s, c);\n            corner=rotation*corner;\n            center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n        }\n    #else\n        if(u_ThreeDStartRotation){\n            center += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,a_StartRotation0);\n        }\n        else{\n            float c = cos(a_StartRotation0.x);\n            float s = sin(a_StartRotation0.x);\n            mat2 rotation= mat2(c, -s, s, c);\n            corner=rotation*corner;\n            center += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n        }\n    #endif\n#endif\n\n#ifdef STRETCHEDBILLBOARD\nvec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\nvec3 velocity;\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\n    if(u_VOLSpaceType==0)\n        velocity=rotationByQuaternions(u_SizeScale*(startVelocity+lifeVelocity),worldRotation)+gravityVelocity;\n    else\n        velocity=rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+lifeVelocity+gravityVelocity;\n#else\n    velocity= rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+gravityVelocity;\n#endif\t\n    vec3 cameraUpVector = normalize(velocity);\n    vec3 direction = normalize(center-u_CameraPosition);\n    vec3 sideVector = normalize(cross(direction,normalize(velocity)));\n    \n    sideVector=u_SizeScale.xzy*sideVector;\n    cameraUpVector=length(vec3(u_SizeScale.x,0.0,0.0))*cameraUpVector;\n    \n    vec2 size=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n    \n    const mat2 rotaionZHalfPI=mat2(0.0, -1.0, 1.0, 0.0);\n    corner=rotaionZHalfPI*corner;\n    corner.y=corner.y-abs(corner.y);\n    \n    float speed=length(velocity);//TODO:\n    center +=sign(u_SizeScale.x)*(sign(u_StretchedBillboardLengthScale)*size.x*corner.x*sideVector+(speed*u_StretchedBillboardSpeedScale+size.y*u_StretchedBillboardLengthScale)*corner.y*cameraUpVector);\n#endif\n\n#ifdef HORIZONTALBILLBOARD\n    vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n    const vec3 cameraUpVector=vec3(0.0,0.0,1.0);\n    const vec3 sideVector = vec3(-1.0,0.0,0.0);\n    \n    float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n    float c = cos(rot);\n    float s = sin(rot);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\n    corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n    center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n#endif\n\n#ifdef VERTICALBILLBOARD\n    vec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\n    const vec3 cameraUpVector =vec3(0.0,1.0,0.0);\n    vec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\n    \n    float rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n    float c = cos(rot);\n    float s = sin(rot);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\n    corner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\n    center +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n#endif\n\n#ifdef RENDERMODE_MESH\n    vec3 size=computeParticleSizeMesh(a_StartSize,normalizedAge);\n    #if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\n        if(u_ThreeDStartRotation){\n            vec3 rotation=vec3(a_StartRotation0.xy,-computeParticleRotationFloat(a_StartRotation0.z, age,normalizedAge));\n            center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,rotation),worldRotation);\n        }\n        else{\n            #ifdef ROTATIONOVERLIFETIME\n                float angle=computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\n                if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\n                    center+= (rotationByQuaternions(rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),angle),worldRotation));//已验证\n                }\n                else{\n                    #ifdef SHAPE\n                        center+= u_SizeScale.xzy*(rotationByQuaternions(rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),angle),worldRotation));\n                    #else\n                        if(u_SimulationSpace==0)\n                            center+=rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle);//已验证\n                        else if(u_SimulationSpace==1)\n                            center+=rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle),worldRotation);//已验证\n                    #endif\n                }\n            #endif\n            #ifdef ROTATIONOVERLIFETIMESEPERATE\n                //TODO:是否应合并if(u_ThreeDStartRotation)分支代码,待测试\n                vec3 angle=computeParticleRotationVec3(vec3(0.0,0.0,a_StartRotation0.z), age,normalizedAge);\n                center+= (rotationByQuaternions(rotationByEuler(u_SizeScale*a_MeshPosition*size,vec3(angle.x,angle.y,angle.z)),worldRotation));//已验证\n            #endif\t\n        }\n    #else\n        if(u_ThreeDStartRotation){\n            center+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,a_StartRotation0),worldRotation);//已验证\n        }\n        else{\n            if(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\n                if(u_SimulationSpace==0)\n                    center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x);\n                else if(u_SimulationSpace==1)\n                    center+= (rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x),worldRotation));//已验证\n            }\n            else{\n                #ifdef SHAPE\n                    if(u_SimulationSpace==0)\n                        center+= u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x);\n                    else if(u_SimulationSpace==1)\n                        center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x),worldRotation);\t\n                #else\n                    if(u_SimulationSpace==0)\n                        center+= rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x);\n                    else if(u_SimulationSpace==1)\n                        center+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x),worldRotation);//已验证\n                #endif\n            }\n        }\n    #endif\n    v_MeshColor=a_MeshColor;\n#endif\n\nhighp vec4 vPos = u_Projection*u_View*vec4(center,1.0);\nfloat zOff = vPos.z / _Dist;\nvPos += _QOffset * zOff * zOff;\ngl_Position = vPos;\nv_Color = computeParticleColor(a_StartColor, normalizedAge);\n#ifdef DIFFUSEMAP\n    #if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\n        v_TextureCoordinate =computeParticleUV(a_CornerTextureCoordinate.zw, normalizedAge);\n    #endif\n    #ifdef RENDERMODE_MESH\n        v_TextureCoordinate =computeParticleUV(a_MeshTextureCoordinate, normalizedAge);\n    #endif\n    \n    #ifdef TILINGOFFSET\n        v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y)*u_TilingOffset.xy+vec2(u_TilingOffset.z,-u_TilingOffset.w);//需要特殊处理\n        v_TextureCoordinate=vec2(v_TextureCoordinate.x,1.0-v_TextureCoordinate.y);//需要特殊处理\n    #endif\n#endif\nv_Discard=0.0;\n    \n#ifdef FOG\n    v_PositionWorld=center;\n#endif\n}\nelse\n{\n    v_Discard=1.0;\n}\n}\n\n", t = "#ifdef HIGHPRECISION\n  precision highp float;\n#else\n  precision mediump float;\n#endif\n\nvarying float v_Discard;\nvarying vec4 v_Color;\nvarying vec2 v_TextureCoordinate;\nuniform sampler2D u_texture;\nuniform vec4 u_Tintcolor;\n\n#ifdef RENDERMODE_MESH\n\tvarying vec4 v_MeshColor;\n#endif\n\n#ifdef FOG\n\tvarying vec3 v_PositionWorld;\n\tuniform vec3 u_CameraPosition;\n\tuniform float u_FogStart;\n\tuniform float u_FogRange;\n\t#ifdef ADDTIVEFOG\n\t#else\n\t\tuniform vec3 u_FogColor;\n\t#endif\n#endif\n\n\nvoid main()\n{\t\n\t#ifdef RENDERMODE_MESH\n\t\tgl_FragColor=v_MeshColor;\n\t#else\n\t\tgl_FragColor=vec4(1.0);\t\n\t#endif\n\t\t\n\t#ifdef DIFFUSEMAP\n\t\tif(v_Discard!=0.0)\n\t\t\tdiscard;\n\t\t#ifdef TINTCOLOR\n\t\t\tgl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*u_Tintcolor*2.0*v_Color;\n\t\t#else\n\t\t\tgl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*v_Color;\n\t\t#endif\n\t#else\n\t\t#ifdef TINTCOLOR\n\t\t\tgl_FragColor*=u_Tintcolor*2.0*v_Color;\n\t\t#else\n\t\t\tgl_FragColor*=v_Color;\n\t\t#endif\n\t#endif\n\t\n\t#ifdef FOG\n\t\tvec3 toEye=u_CameraPosition-v_PositionWorld;\n\t\tfloat toEyeLength=length(toEye);\n\t\ttoEye/=toEyeLength;\n\t\t\n\t\tfloat lerpFact=clamp((toEyeLength-u_FogStart)/u_FogRange,0.0,1.0);\n\t\t#ifdef ADDTIVEFOG\n\t\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n\t\t#else\n\t\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n\t\t#endif\n\t#endif\n}";
			let o = new Laya.SubShader(i, n);
			a.addSubShader(o);
			let s = {
				s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
				s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
				s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
				s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
				s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
				s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
			};
			o.addShaderPass('#include "Lighting.glsl";\r\n\r\n#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n  precision highp float;\r\n#else\r\n  precision mediump float;\r\n#endif\r\n\r\n#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\r\n\tattribute vec4 a_CornerTextureCoordinate;\r\n#endif\r\n#ifdef RENDERMODE_MESH\r\n\tattribute vec3 a_MeshPosition;\r\n\tattribute vec4 a_MeshColor;\r\n\tattribute vec2 a_MeshTextureCoordinate;\r\n\tvarying vec4 v_MeshColor;\r\n#endif\r\n\r\nattribute vec4 a_ShapePositionStartLifeTime;\r\nattribute vec4 a_DirectionTime;\r\nattribute vec4 a_StartColor;\r\nattribute vec3 a_StartSize;\r\nattribute vec3 a_StartRotation0;\r\nattribute float a_StartSpeed;\r\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\r\n  attribute vec4 a_Random0;\r\n#endif\r\n#if defined(TEXTURESHEETANIMATIONRANDOMCURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n  attribute vec4 a_Random1;\r\n#endif\r\nattribute vec3 a_SimulationWorldPostion;\r\nattribute vec4 a_SimulationWorldRotation;\r\n\r\nvarying vec4 v_Color;\r\n#ifdef DIFFUSEMAP\r\n\tvarying vec2 v_TextureCoordinate;\r\n#endif\r\n\r\nuniform float u_CurrentTime;\r\nuniform vec3 u_Gravity;\r\n\r\nuniform vec3 u_WorldPosition;\r\nuniform vec4 u_WorldRotation;\r\nuniform bool u_ThreeDStartRotation;\r\nuniform int u_ScalingMode;\r\nuniform vec3 u_PositionScale;\r\nuniform vec3 u_SizeScale;\r\nuniform mat4 u_View;\r\nuniform mat4 u_Projection;\r\n\r\n#ifdef STRETCHEDBILLBOARD\r\n\tuniform vec3 u_CameraPos;\r\n#endif\r\nuniform vec3 u_CameraDirection;//TODO:只有几种广告牌模式需要用\r\nuniform vec3 u_CameraUp;\r\n\r\nuniform  float u_StretchedBillboardLengthScale;\r\nuniform  float u_StretchedBillboardSpeedScale;\r\nuniform int u_SimulationSpace;\r\n\r\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n  uniform  int  u_VOLSpaceType;\r\n#endif\r\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)\r\n  uniform  vec3 u_VOLVelocityConst;\r\n#endif\r\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n  uniform  vec2 u_VOLVelocityGradientX[4];//x为key,y为速度\r\n  uniform  vec2 u_VOLVelocityGradientY[4];//x为key,y为速度\r\n  uniform  vec2 u_VOLVelocityGradientZ[4];//x为key,y为速度\r\n#endif\r\n#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\r\n  uniform  vec3 u_VOLVelocityConstMax;\r\n#endif\r\n#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\r\n  uniform  vec2 u_VOLVelocityGradientMaxX[4];//x为key,y为速度\r\n  uniform  vec2 u_VOLVelocityGradientMaxY[4];//x为key,y为速度\r\n  uniform  vec2 u_VOLVelocityGradientMaxZ[4];//x为key,y为速度\r\n#endif\r\n\r\n#ifdef COLOROVERLIFETIME\r\n  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\r\n  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\r\n#endif\r\n#ifdef RANDOMCOLOROVERLIFETIME\r\n  uniform  vec4 u_ColorOverLifeGradientColors[4];//x为key,yzw为Color\r\n  uniform  vec2 u_ColorOverLifeGradientAlphas[4];//x为key,y为Alpha\r\n  uniform  vec4 u_MaxColorOverLifeGradientColors[4];//x为key,yzw为Color\r\n  uniform  vec2 u_MaxColorOverLifeGradientAlphas[4];//x为key,y为Alpha\r\n#endif\r\n\r\n\r\n#if defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMERANDOMCURVES)\r\n  uniform  vec2 u_SOLSizeGradient[4];//x为key,y为尺寸\r\n#endif\r\n#ifdef SIZEOVERLIFETIMERANDOMCURVES\r\n  uniform  vec2 u_SOLSizeGradientMax[4];//x为key,y为尺寸\r\n#endif\r\n#if defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\r\n  uniform  vec2 u_SOLSizeGradientX[4];//x为key,y为尺寸\r\n  uniform  vec2 u_SOLSizeGradientY[4];//x为key,y为尺寸\r\n  uniform  vec2 u_SOLSizeGradientZ[4];//x为key,y为尺寸\r\n#endif\r\n#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\r\n  uniform  vec2 u_SOLSizeGradientMaxX[4];//x为key,y为尺寸\r\n  uniform  vec2 u_SOLSizeGradientMaxY[4];//x为key,y为尺寸\r\n  uniform  vec2 u_SOLSizeGradientMaxZ[4];//x为key,y为尺寸\r\n#endif\r\n\r\n\r\n#ifdef ROTATIONOVERLIFETIME\r\n  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\r\n    uniform  float u_ROLAngularVelocityConst;\r\n  #endif\r\n  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n    uniform  float u_ROLAngularVelocityConstMax;\r\n  #endif\r\n  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\r\n    uniform  vec2 u_ROLAngularVelocityGradient[4];//x为key,y为旋转\r\n  #endif\r\n  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n    uniform  vec2 u_ROLAngularVelocityGradientMax[4];//x为key,y为旋转\r\n  #endif\r\n#endif\r\n#ifdef ROTATIONOVERLIFETIMESEPERATE\r\n  #if defined(ROTATIONOVERLIFETIMECONSTANT)||defined(ROTATIONOVERLIFETIMERANDOMCONSTANTS)\r\n    uniform  vec3 u_ROLAngularVelocityConstSeprarate;\r\n  #endif\r\n  #ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n    uniform  vec3 u_ROLAngularVelocityConstMaxSeprarate;\r\n  #endif\r\n  #if defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\r\n    uniform  vec2 u_ROLAngularVelocityGradientX[4];\r\n    uniform  vec2 u_ROLAngularVelocityGradientY[4];\r\n    uniform  vec2 u_ROLAngularVelocityGradientZ[4];\r\n  #endif\r\n  #ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n    uniform  vec2 u_ROLAngularVelocityGradientMaxX[4];\r\n    uniform  vec2 u_ROLAngularVelocityGradientMaxY[4];\r\n    uniform  vec2 u_ROLAngularVelocityGradientMaxZ[4];\r\n\tuniform  vec2 u_ROLAngularVelocityGradientMaxW[4];\r\n  #endif\r\n#endif\r\n\r\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\r\n  uniform  float u_TSACycles;\r\n  uniform  vec2 u_TSASubUVLength;\r\n  uniform  vec2 u_TSAGradientUVs[4];//x为key,y为frame\r\n#endif\r\n#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\r\n  uniform  vec2 u_TSAMaxGradientUVs[4];//x为key,y为frame\r\n#endif\r\n\r\n#ifdef TILINGOFFSET\r\n\tuniform vec4 u_TilingOffset;\r\n#endif\r\n\r\nuniform float _Dist;\r\nuniform vec4 _QOffset;\r\n\r\nvec3 rotationByEuler(in vec3 vector,in vec3 rot)\r\n{\r\n\tfloat halfRoll = rot.z * 0.5;\r\n    float halfPitch = rot.x * 0.5;\r\n\tfloat halfYaw = rot.y * 0.5;\r\n\r\n\tfloat sinRoll = sin(halfRoll);\r\n\tfloat cosRoll = cos(halfRoll);\r\n\tfloat sinPitch = sin(halfPitch);\r\n\tfloat cosPitch = cos(halfPitch);\r\n\tfloat sinYaw = sin(halfYaw);\r\n\tfloat cosYaw = cos(halfYaw);\r\n\r\n\tfloat quaX = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);\r\n\tfloat quaY = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);\r\n\tfloat quaZ = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);\r\n\tfloat quaW = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);\r\n\t\r\n\t//vec4 q=vec4(quaX,quaY,quaZ,quaW);\r\n\t//vec3 temp = cross(q.xyz, vector) + q.w * vector;\r\n\t//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\r\n\t\r\n\tfloat x = quaX + quaX;\r\n    float y = quaY + quaY;\r\n    float z = quaZ + quaZ;\r\n    float wx = quaW * x;\r\n    float wy = quaW * y;\r\n    float wz = quaW * z;\r\n\tfloat xx = quaX * x;\r\n    float xy = quaX * y;\r\n\tfloat xz = quaX * z;\r\n    float yy = quaY * y;\r\n    float yz = quaY * z;\r\n    float zz = quaZ * z;\r\n\r\n    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\r\n                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\r\n                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\r\n\t\r\n}\r\n\r\n//假定axis已经归一化\r\nvec3 rotationByAxis(in vec3 vector,in vec3 axis, in float angle)\r\n{\r\n\tfloat halfAngle = angle * 0.5;\r\n\tfloat sin = sin(halfAngle);\r\n\t\r\n\tfloat quaX = axis.x * sin;\r\n\tfloat quaY = axis.y * sin;\r\n\tfloat quaZ = axis.z * sin;\r\n\tfloat quaW = cos(halfAngle);\r\n\t\r\n\t//vec4 q=vec4(quaX,quaY,quaZ,quaW);\r\n\t//vec3 temp = cross(q.xyz, vector) + q.w * vector;\r\n\t//return (cross(temp, -q.xyz) + dot(q.xyz,vector) * q.xyz + q.w * temp);\r\n\t\r\n\tfloat x = quaX + quaX;\r\n    float y = quaY + quaY;\r\n    float z = quaZ + quaZ;\r\n    float wx = quaW * x;\r\n    float wy = quaW * y;\r\n    float wz = quaW * z;\r\n\tfloat xx = quaX * x;\r\n    float xy = quaX * y;\r\n\tfloat xz = quaX * z;\r\n    float yy = quaY * y;\r\n    float yz = quaY * z;\r\n    float zz = quaZ * z;\r\n\r\n    return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\r\n                ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\r\n                ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\r\n\t\r\n}\r\n\r\nvec3 rotationByQuaternions(in vec3 v,in vec4 q) \r\n{\r\n\treturn v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\r\n}\r\n\r\n \r\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(SIZEOVERLIFETIMECURVE)||defined(SIZEOVERLIFETIMECURVESEPERATE)||defined(SIZEOVERLIFETIMERANDOMCURVES)||defined(SIZEOVERLIFETIMERANDOMCURVESSEPERATE)\r\nfloat getCurValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\r\n{\r\n\tfloat curValue;\r\n\tfor(int i=1;i<4;i++)\r\n\t{\r\n\t\tvec2 gradientNumber=gradientNumbers[i];\r\n\t\tfloat key=gradientNumber.x;\r\n\t\tif(key>=normalizedAge)\r\n\t\t{\r\n\t\t\tvec2 lastGradientNumber=gradientNumbers[i-1];\r\n\t\t\tfloat lastKey=lastGradientNumber.x;\r\n\t\t\tfloat age=(normalizedAge-lastKey)/(key-lastKey);\r\n\t\t\tcurValue=mix(lastGradientNumber.y,gradientNumber.y,age);\r\n\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn curValue;\r\n}\r\n#endif\r\n\r\n#if defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)||defined(ROTATIONOVERLIFETIMECURVE)||defined(ROTATIONOVERLIFETIMERANDOMCURVES)\r\nfloat getTotalValueFromGradientFloat(in vec2 gradientNumbers[4],in float normalizedAge)\r\n{\r\n\tfloat totalValue=0.0;\r\n\tfor(int i=1;i<4;i++)\r\n\t{\r\n\t\tvec2 gradientNumber=gradientNumbers[i];\r\n\t\tfloat key=gradientNumber.x;\r\n\t\tvec2 lastGradientNumber=gradientNumbers[i-1];\r\n\t\tfloat lastValue=lastGradientNumber.y;\r\n\t\t\r\n\t\tif(key>=normalizedAge){\r\n\t\t\tfloat lastKey=lastGradientNumber.x;\r\n\t\t\tfloat age=(normalizedAge-lastKey)/(key-lastKey);\r\n\t\t\ttotalValue+=(lastValue+mix(lastValue,gradientNumber.y,age))/2.0*a_ShapePositionStartLifeTime.w*(normalizedAge-lastKey);\r\n\t\t\tbreak;\r\n\t\t}\r\n\t\telse{\r\n\t\t\ttotalValue+=(lastValue+gradientNumber.y)/2.0*a_ShapePositionStartLifeTime.w*(key-lastGradientNumber.x);\r\n\t\t}\r\n\t}\r\n\treturn totalValue;\r\n}\r\n#endif\r\n\r\n#if defined(COLOROVERLIFETIME)||defined(RANDOMCOLOROVERLIFETIME)\r\nvec4 getColorFromGradient(in vec2 gradientAlphas[4],in vec4 gradientColors[4],in float normalizedAge)\r\n{\r\n\tvec4 overTimeColor;\r\n\tfor(int i=1;i<4;i++)\r\n\t{\r\n\t\tvec2 gradientAlpha=gradientAlphas[i];\r\n\t\tfloat alphaKey=gradientAlpha.x;\r\n\t\tif(alphaKey>=normalizedAge)\r\n\t\t{\r\n\t\t\tvec2 lastGradientAlpha=gradientAlphas[i-1];\r\n\t\t\tfloat lastAlphaKey=lastGradientAlpha.x;\r\n\t\t\tfloat age=(normalizedAge-lastAlphaKey)/(alphaKey-lastAlphaKey);\r\n\t\t\toverTimeColor.a=mix(lastGradientAlpha.y,gradientAlpha.y,age);\r\n\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\t\r\n\tfor(int i=1;i<4;i++)\r\n\t{\r\n\t\tvec4 gradientColor=gradientColors[i];\r\n\t\tfloat colorKey=gradientColor.x;\r\n\t\tif(colorKey>=normalizedAge)\r\n\t\t{\r\n\t\t\tvec4 lastGradientColor=gradientColors[i-1];\r\n\t\t\tfloat lastColorKey=lastGradientColor.x;\r\n\t\t\tfloat age=(normalizedAge-lastColorKey)/(colorKey-lastColorKey);\r\n\t\t\toverTimeColor.rgb=mix(gradientColors[i-1].yzw,gradientColor.yzw,age);\r\n\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn overTimeColor;\r\n}\r\n#endif\r\n\r\n\r\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONRANDOMCURVE)\r\nfloat getFrameFromGradient(in vec2 gradientFrames[4],in float normalizedAge)\r\n{\r\n\tfloat overTimeFrame;\r\n\tfor(int i=1;i<4;i++)\r\n\t{\r\n\t\tvec2 gradientFrame=gradientFrames[i];\r\n\t\tfloat key=gradientFrame.x;\r\n\t\tif(key>=normalizedAge)\r\n\t\t{\r\n\t\t\tvec2 lastGradientFrame=gradientFrames[i-1];\r\n\t\t\tfloat lastKey=lastGradientFrame.x;\r\n\t\t\tfloat age=(normalizedAge-lastKey)/(key-lastKey);\r\n\t\t\toverTimeFrame=mix(lastGradientFrame.y,gradientFrame.y,age);\r\n\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn floor(overTimeFrame);\r\n}\r\n#endif\r\n\r\n#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\nvec3 computeParticleLifeVelocity(in float normalizedAge)\r\n{\r\n  vec3 outLifeVelocity;\r\n  #ifdef VELOCITYOVERLIFETIMECONSTANT\r\n\t outLifeVelocity=u_VOLVelocityConst; \r\n  #endif\r\n  #ifdef VELOCITYOVERLIFETIMECURVE\r\n     outLifeVelocity= vec3(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\r\n  #endif\r\n  #ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\r\n\t outLifeVelocity=mix(u_VOLVelocityConst,u_VOLVelocityConstMax,vec3(a_Random1.y,a_Random1.z,a_Random1.w)); \r\n  #endif\r\n  #ifdef VELOCITYOVERLIFETIMERANDOMCURVE\r\n     outLifeVelocity=vec3(mix(getCurValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y),\r\n\t                 mix(getCurValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z),\r\n\t\t\t\t\t mix(getCurValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getCurValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\r\n  #endif\r\n\t\t\t\t\t\r\n  return outLifeVelocity;\r\n} \r\n#endif\r\n\r\nvec3 computeParticlePosition(in vec3 startVelocity, in vec3 lifeVelocity,in float age,in float normalizedAge,vec3 gravityVelocity,vec4 worldRotation)\r\n{\r\n   vec3 startPosition;\r\n   vec3 lifePosition;\r\n   #if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n\t#ifdef VELOCITYOVERLIFETIMECONSTANT\r\n\t\t  startPosition=startVelocity*age;\r\n\t\t  lifePosition=lifeVelocity*age;\r\n\t#endif\r\n\t#ifdef VELOCITYOVERLIFETIMECURVE\r\n\t\t  startPosition=startVelocity*age;\r\n\t\t  lifePosition=vec3(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge));\r\n\t#endif\r\n\t#ifdef VELOCITYOVERLIFETIMERANDOMCONSTANT\r\n\t\t  startPosition=startVelocity*age;\r\n\t\t  lifePosition=lifeVelocity*age;\r\n\t#endif\r\n\t#ifdef VELOCITYOVERLIFETIMERANDOMCURVE\r\n\t\t  startPosition=startVelocity*age;\r\n\t\t  lifePosition=vec3(mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxX,normalizedAge),a_Random1.y)\r\n\t      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxY,normalizedAge),a_Random1.z)\r\n\t      ,mix(getTotalValueFromGradientFloat(u_VOLVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_VOLVelocityGradientMaxZ,normalizedAge),a_Random1.w));\r\n\t#endif\r\n\t\r\n\tvec3 finalPosition;\r\n\tif(u_VOLSpaceType==0){\r\n\t  if(u_ScalingMode!=2)\r\n\t   finalPosition =rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition),worldRotation);\r\n\t  else\r\n\t   finalPosition =rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition+lifePosition,worldRotation);\r\n\t}\r\n\telse{\r\n\t  if(u_ScalingMode!=2)\r\n\t    finalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation)+lifePosition;\r\n\t  else\r\n\t    finalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation)+lifePosition;\r\n\t}\r\n  #else\r\n\t startPosition=startVelocity*age;\r\n\t vec3 finalPosition;\r\n\t if(u_ScalingMode!=2)\r\n\t\t\tfinalPosition = rotationByQuaternions(u_PositionScale*(a_ShapePositionStartLifeTime.xyz+startPosition),worldRotation);\r\n\t else\r\n\t   \tfinalPosition = rotationByQuaternions(u_PositionScale*a_ShapePositionStartLifeTime.xyz+startPosition,worldRotation);\r\n  #endif\r\n  \r\n  if(u_SimulationSpace==0)\r\n    finalPosition=finalPosition+a_SimulationWorldPostion;\r\n  else if(u_SimulationSpace==1) \r\n    finalPosition=finalPosition+u_WorldPosition;\r\n  \r\n  finalPosition+=0.5*gravityVelocity*age;\r\n \r\n  return  finalPosition;\r\n}\r\n\r\n\r\nvec4 computeParticleColor(in vec4 color,in float normalizedAge)\r\n{\r\n\t#ifdef COLOROVERLIFETIME\r\n\t  color*=getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge);\r\n\t#endif\r\n\t\r\n\t#ifdef RANDOMCOLOROVERLIFETIME\r\n\t  color*=mix(getColorFromGradient(u_ColorOverLifeGradientAlphas,u_ColorOverLifeGradientColors,normalizedAge),getColorFromGradient(u_MaxColorOverLifeGradientAlphas,u_MaxColorOverLifeGradientColors,normalizedAge),a_Random0.y);\r\n\t#endif\r\n\r\n    return color;\r\n}\r\n\r\nvec2 computeParticleSizeBillbard(in vec2 size,in float normalizedAge)\r\n{\r\n\t#ifdef SIZEOVERLIFETIMECURVE\r\n\t\tsize*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMERANDOMCURVES\r\n\t    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMECURVESEPERATE\r\n\t\tsize*=vec2(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge));\r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\r\n\t    size*=vec2(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\r\n\t    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z));\r\n\t#endif\r\n\treturn size;\r\n}\r\n\r\n#ifdef RENDERMODE_MESH\r\nvec3 computeParticleSizeMesh(in vec3 size,in float normalizedAge)\r\n{\r\n\t#ifdef SIZEOVERLIFETIMECURVE\r\n\t\tsize*=getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge);\r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMERANDOMCURVES\r\n\t    size*=mix(getCurValueFromGradientFloat(u_SOLSizeGradient,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMax,normalizedAge),a_Random0.z); \r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMECURVESEPERATE\r\n\t\tsize*=vec3(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge));\r\n\t#endif\r\n\t#ifdef SIZEOVERLIFETIMERANDOMCURVESSEPERATE\r\n\t    size*=vec3(mix(getCurValueFromGradientFloat(u_SOLSizeGradientX,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxX,normalizedAge),a_Random0.z)\r\n\t    ,mix(getCurValueFromGradientFloat(u_SOLSizeGradientY,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxY,normalizedAge),a_Random0.z)\r\n\t\t,mix(getCurValueFromGradientFloat(u_SOLSizeGradientZ,normalizedAge),getCurValueFromGradientFloat(u_SOLSizeGradientMaxZ,normalizedAge),a_Random0.z));\r\n\t#endif\r\n\treturn size;\r\n}\r\n#endif\r\n\r\nfloat computeParticleRotationFloat(in float rotation,in float age,in float normalizedAge)\r\n{ \r\n\t#ifdef ROTATIONOVERLIFETIME\r\n\t\t#ifdef ROTATIONOVERLIFETIMECONSTANT\r\n\t\t\tfloat ageRot=u_ROLAngularVelocityConst*age;\r\n\t        rotation+=ageRot;\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMECURVE\r\n\t\t\trotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n\t\t\tfloat ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\r\n\t        rotation+=ageRot;\r\n\t    #endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n\t\t\trotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\r\n\t\t#endif\r\n\t#endif\r\n\t#ifdef ROTATIONOVERLIFETIMESEPERATE\r\n\t\t#ifdef ROTATIONOVERLIFETIMECONSTANT\r\n\t\t\tfloat ageRot=u_ROLAngularVelocityConstSeprarate.z*age;\r\n\t        rotation+=ageRot;\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMECURVE\r\n\t\t\trotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge);\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n\t\t\tfloat ageRot=mix(u_ROLAngularVelocityConstSeprarate.z,u_ROLAngularVelocityConstMaxSeprarate.z,a_Random0.w)*age;\r\n\t        rotation+=ageRot;\r\n\t    #endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n\t\t\trotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\r\n\t\t#endif\r\n\t#endif\r\n\treturn rotation;\r\n}\r\n\r\n#if defined(RENDERMODE_MESH)&&(defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE))\r\nvec3 computeParticleRotationVec3(in vec3 rotation,in float age,in float normalizedAge)\r\n{ \r\n\t#ifdef ROTATIONOVERLIFETIME\r\n\t#ifdef ROTATIONOVERLIFETIMECONSTANT\r\n\t\t\tfloat ageRot=u_ROLAngularVelocityConst*age;\r\n\t        rotation+=ageRot;\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMECURVE\r\n\t\t\trotation+=getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge);\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n\t\t\tfloat ageRot=mix(u_ROLAngularVelocityConst,u_ROLAngularVelocityConstMax,a_Random0.w)*age;\r\n\t        rotation+=ageRot;\r\n\t    #endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n\t\t\trotation+=mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradient,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMax,normalizedAge),a_Random0.w);\r\n\t\t#endif\r\n\t#endif\r\n\t#ifdef ROTATIONOVERLIFETIMESEPERATE\r\n\t\t#ifdef ROTATIONOVERLIFETIMECONSTANT\r\n\t\t\tvec3 ageRot=u_ROLAngularVelocityConstSeprarate*age;\r\n\t        rotation+=ageRot;\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMECURVE\r\n\t\t\trotation+=vec3(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge));\r\n\t\t#endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCONSTANTS\r\n\t\t\tvec3 ageRot=mix(u_ROLAngularVelocityConstSeprarate,u_ROLAngularVelocityConstMaxSeprarate,a_Random0.w)*age;\r\n\t        rotation+=ageRot;\r\n\t    #endif\r\n\t\t#ifdef ROTATIONOVERLIFETIMERANDOMCURVES\r\n\t\t\trotation+=vec3(mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientX,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxX,normalizedAge),a_Random0.w)\r\n\t        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientY,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxY,normalizedAge),a_Random0.w)\r\n\t        ,mix(getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientZ,normalizedAge),getTotalValueFromGradientFloat(u_ROLAngularVelocityGradientMaxZ,normalizedAge),a_Random0.w));\r\n\t\t#endif\r\n\t#endif\r\n\treturn rotation;\r\n}\r\n#endif\r\n\r\nvec2 computeParticleUV(in vec2 uv,in float normalizedAge)\r\n{ \r\n\t#ifdef TEXTURESHEETANIMATIONCURVE\r\n\t\tfloat cycleNormalizedAge=normalizedAge*u_TSACycles;\r\n\t\tfloat frame=getFrameFromGradient(u_TSAGradientUVs,cycleNormalizedAge-floor(cycleNormalizedAge));\r\n\t\tfloat totalULength=frame*u_TSASubUVLength.x;\r\n\t\tfloat floorTotalULength=floor(totalULength);\r\n\t    uv.x+=totalULength-floorTotalULength;\r\n\t\tuv.y+=floorTotalULength*u_TSASubUVLength.y;\r\n    #endif\r\n\t#ifdef TEXTURESHEETANIMATIONRANDOMCURVE\r\n\t\tfloat cycleNormalizedAge=normalizedAge*u_TSACycles;\r\n\t\tfloat uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);\r\n\t    float frame=floor(mix(getFrameFromGradient(u_TSAGradientUVs,uvNormalizedAge),getFrameFromGradient(u_TSAMaxGradientUVs,uvNormalizedAge),a_Random1.x));\r\n\t\tfloat totalULength=frame*u_TSASubUVLength.x;\r\n\t\tfloat floorTotalULength=floor(totalULength);\r\n\t    uv.x+=totalULength-floorTotalULength;\r\n\t\tuv.y+=floorTotalULength*u_TSASubUVLength.y;\r\n    #endif\r\n\treturn uv;\r\n}\r\n\r\nvoid main()\r\n{\r\n\tfloat age = u_CurrentTime - a_DirectionTime.w;\r\n\tfloat normalizedAge = age/a_ShapePositionStartLifeTime.w;\r\n\tvec3 lifeVelocity;\r\n\tif(normalizedAge<1.0)\r\n\t{ \r\n\t\tvec3 startVelocity=a_DirectionTime.xyz*a_StartSpeed;\r\n\t\t#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n\t\t\tlifeVelocity= computeParticleLifeVelocity(normalizedAge);//计算粒子生命周期速度\r\n\t\t#endif \r\n\t\tvec3 gravityVelocity=u_Gravity*age;\r\n\t\t\r\n\t\tvec4 worldRotation;\r\n\t\tif(u_SimulationSpace==0)\r\n\t\t\tworldRotation=a_SimulationWorldRotation;\r\n\t\telse\r\n\t\t\tworldRotation=u_WorldRotation;\r\n\t\t\r\n\t\tvec3 center=computeParticlePosition(startVelocity, lifeVelocity, age, normalizedAge,gravityVelocity,worldRotation);//计算粒子位置\r\n\t\r\n\t\r\n\t\t#ifdef SPHERHBILLBOARD\r\n\t\t\tvec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\r\n\t\t\tvec3 cameraUpVector =normalize(u_CameraUp);//TODO:是否外面归一化\r\n\t\t\tvec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\r\n\t\t\tvec3 upVector = normalize(cross(sideVector,u_CameraDirection));\r\n\t\t\tcorner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\r\n\t\t\t#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\r\n\t\t\t\tif(u_ThreeDStartRotation){\r\n\t\t\t\t\tvec3 rotation=vec3(a_StartRotation0.xy,computeParticleRotationFloat(a_StartRotation0.z,age,normalizedAge));\r\n\t\t\t\t\tcenter += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,rotation);\r\n\t\t\t\t}\r\n\t\t\t\telse{\r\n\t\t\t\t\tfloat rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\r\n\t\t\t\t\tfloat c = cos(rot);\r\n\t\t\t\t\tfloat s = sin(rot);\r\n\t\t\t\t\tmat2 rotation= mat2(c, -s, s, c);\r\n\t\t\t\t\tcorner=rotation*corner;\r\n\t\t\t\t\tcenter += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\r\n\t\t\t\t}\r\n\t\t\t#else\r\n\t\t\t\tif(u_ThreeDStartRotation){\r\n\t\t\t\t\tcenter += u_SizeScale.xzy*rotationByEuler(corner.x*sideVector+corner.y*upVector,a_StartRotation0);\r\n\t\t\t\t}\r\n\t\t\t\telse{\r\n\t\t\t\t\tfloat c = cos(a_StartRotation0.x);\r\n\t\t\t\t\tfloat s = sin(a_StartRotation0.x);\r\n\t\t\t\t\tmat2 rotation= mat2(c, -s, s, c);\r\n\t\t\t\t\tcorner=rotation*corner;\r\n\t\t\t\t\tcenter += u_SizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef STRETCHEDBILLBOARD\r\n\t\tvec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\r\n\t\tvec3 velocity;\r\n\t\t#if defined(VELOCITYOVERLIFETIMECONSTANT)||defined(VELOCITYOVERLIFETIMECURVE)||defined(VELOCITYOVERLIFETIMERANDOMCONSTANT)||defined(VELOCITYOVERLIFETIMERANDOMCURVE)\r\n\t\t\tif(u_VOLSpaceType==0)\r\n\t\t\tvelocity=rotationByQuaternions(u_SizeScale*(startVelocity+lifeVelocity),worldRotation)+gravityVelocity;\r\n\t\t\telse\r\n\t\t\tvelocity=rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+lifeVelocity+gravityVelocity;\r\n\t\t#else\r\n\t\t\tvelocity= rotationByQuaternions(u_SizeScale*startVelocity,worldRotation)+gravityVelocity;\r\n\t\t#endif\t\r\n\t\t\tvec3 cameraUpVector = normalize(velocity);\r\n\t\t\tvec3 direction = normalize(center-u_CameraPos);\r\n\t\t\tvec3 sideVector = normalize(cross(direction,normalize(velocity)));\r\n\t\t\t\r\n\t\t\tsideVector=u_SizeScale.xzy*sideVector;\r\n\t\t\tcameraUpVector=length(vec3(u_SizeScale.x,0.0,0.0))*cameraUpVector;\r\n\t\t\t\r\n\t\t\tvec2 size=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\r\n\t\t\t\r\n\t\t\tconst mat2 rotaionZHalfPI=mat2(0.0, -1.0, 1.0, 0.0);\r\n\t\t\tcorner=rotaionZHalfPI*corner;\r\n\t\t\tcorner.y=corner.y-abs(corner.y);\r\n\t\t\t\r\n\t\t\tfloat speed=length(velocity);//TODO:\r\n\t\t\tcenter +=sign(u_SizeScale.x)*(sign(u_StretchedBillboardLengthScale)*size.x*corner.x*sideVector+(speed*u_StretchedBillboardSpeedScale+size.y*u_StretchedBillboardLengthScale)*corner.y*cameraUpVector);\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef HORIZONTALBILLBOARD\r\n\t\t\tvec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\r\n\t\t\tconst vec3 cameraUpVector=vec3(0.0,0.0,1.0);\r\n\t\t\tconst vec3 sideVector = vec3(-1.0,0.0,0.0);\r\n\t\t\t\r\n\t\t\tfloat rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\r\n\t\t\tfloat c = cos(rot);\r\n\t\t\tfloat s = sin(rot);\r\n\t\t\tmat2 rotation= mat2(c, -s, s, c);\r\n\t\t\tcorner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\r\n\t\t\tcorner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\r\n\t\t\tcenter +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef VERTICALBILLBOARD\r\n\t\t\tvec2 corner=a_CornerTextureCoordinate.xy;//Billboard模式z轴无效\r\n\t\t\tconst vec3 cameraUpVector =vec3(0.0,1.0,0.0);\r\n\t\t\tvec3 sideVector = normalize(cross(u_CameraDirection,cameraUpVector));\r\n\t\t\t\r\n\t\t\tfloat rot = computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\r\n\t\t\tfloat c = cos(rot);\r\n\t\t\tfloat s = sin(rot);\r\n\t\t\tmat2 rotation= mat2(c, -s, s, c);\r\n\t\t\tcorner=rotation*corner*cos(0.78539816339744830961566084581988);//TODO:临时缩小cos45,不确定U3D原因\r\n\t\t\tcorner*=computeParticleSizeBillbard(a_StartSize.xy,normalizedAge);\r\n\t\t\tcenter +=u_SizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\r\n\t\t#endif\r\n\t\r\n\t\t#ifdef RENDERMODE_MESH\r\n\t\t\tvec3 size=computeParticleSizeMesh(a_StartSize,normalizedAge);\r\n\t\t\t#if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONOVERLIFETIMESEPERATE)\r\n\t\t\t\tif(u_ThreeDStartRotation){\r\n\t\t\t\t\tvec3 rotation=vec3(a_StartRotation0.xy,computeParticleRotationFloat(a_StartRotation0.z, age,normalizedAge));\r\n\t\t\t\t\tcenter+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,rotation),worldRotation);\r\n\t\t\t\t}\r\n\t\t\t\telse{\r\n\t\t\t\t\t#ifdef ROTATIONOVERLIFETIME\r\n\t\t\t\t\t\tfloat angle=computeParticleRotationFloat(a_StartRotation0.x, age,normalizedAge);\r\n\t\t\t\t\t\tif(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\r\n\t\t\t\t\t\t\tcenter+= (rotationByQuaternions(rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),angle),worldRotation));//已验证\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\telse{\r\n\t\t\t\t\t\t\t#ifdef SHAPE\r\n\t\t\t\t\t\t\t\tcenter+= u_SizeScale.xzy*(rotationByQuaternions(rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),angle),worldRotation));\r\n\t\t\t\t\t\t\t#else\r\n\t\t\t\t\t\t\t\tif(u_SimulationSpace==0)\r\n\t\t\t\t\t\t\t\t\tcenter+=rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle);//已验证\r\n\t\t\t\t\t\t\t\telse if(u_SimulationSpace==1)\r\n\t\t\t\t\t\t\t\t\tcenter+=rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),angle),worldRotation);//已验证\r\n\t\t\t\t\t\t\t#endif\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t#endif\r\n\t\t\t\t\t#ifdef ROTATIONOVERLIFETIMESEPERATE\r\n\t\t\t\t\t\t//TODO:是否应合并if(u_ThreeDStartRotation)分支代码,待测试\r\n\t\t\t\t\t\tvec3 angle=computeParticleRotationVec3(vec3(0.0,0.0,-a_StartRotation0.x), age,normalizedAge);\r\n\t\t\t\t\t\tcenter+= (rotationByQuaternions(rotationByEuler(u_SizeScale*a_MeshPosition*size,vec3(angle.x,angle.y,angle.z)),worldRotation));//已验证\r\n\t\t\t\t\t#endif\t\t\r\n\t\t\t\t}\r\n\t\t\t#else\r\n\t\t\t\tif(u_ThreeDStartRotation){\r\n\t\t\t\t\tcenter+= rotationByQuaternions(u_SizeScale*rotationByEuler(a_MeshPosition*size,a_StartRotation0),worldRotation);//已验证\r\n\t\t\t\t}\r\n\t\t\t\telse{\r\n\t\t\t\t\tif(a_ShapePositionStartLifeTime.x!=0.0||a_ShapePositionStartLifeTime.y!=0.0){\r\n\t\t\t\t\t\tif(u_SimulationSpace==0)\r\n\t\t\t\t\t\t\tcenter+= rotationByAxis(u_SizeScale*a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x);\r\n\t\t\t\t\t\telse if(u_SimulationSpace==1)\r\n\t\t\t\t\t\t\tcenter+= (rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(a_ShapePositionStartLifeTime.xy,0.0))),a_StartRotation0.x),worldRotation));//已验证\r\n\t\t\t\t\t}\r\n\t\t\t\t\telse{\r\n\t\t\t\t\t\t#ifdef SHAPE\r\n\t\t\t\t\t\t\tif(u_SimulationSpace==0)\r\n\t\t\t\t\t\t\t\tcenter+= u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x);\r\n\t\t\t\t\t\t\telse if(u_SimulationSpace==1)\r\n\t\t\t\t\t\t\t\tcenter+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,-1.0,0.0),a_StartRotation0.x),worldRotation);\t\r\n\t\t\t\t\t\t#else\r\n\t\t\t\t\t\t\tif(u_SimulationSpace==0)\r\n\t\t\t\t\t\t\t\tcenter+= rotationByAxis(u_SizeScale*a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x);\r\n\t\t\t\t\t\t\telse if(u_SimulationSpace==1)\r\n\t\t\t\t\t\t\t\tcenter+= rotationByQuaternions(u_SizeScale*rotationByAxis(a_MeshPosition*size,vec3(0.0,0.0,-1.0),a_StartRotation0.x),worldRotation);//已验证\r\n\t\t\t\t\t\t#endif\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t#endif\r\n\t\t\tv_MeshColor=a_MeshColor;\r\n\t\t#endif\r\n\t\r\n\t\thighp vec4 vPos = u_Projection*u_View*vec4(center,1.0);\r\n\tfloat zOff = vPos.z / _Dist;\r\n\tvPos += _QOffset * zOff * zOff;\r\n\tgl_Position=vPos;\r\n\t\tv_Color = computeParticleColor(a_StartColor, normalizedAge);\r\n\t\t#ifdef DIFFUSEMAP\r\n\t\t\t#if defined(SPHERHBILLBOARD)||defined(STRETCHEDBILLBOARD)||defined(HORIZONTALBILLBOARD)||defined(VERTICALBILLBOARD)\r\n\t\t\t\tv_TextureCoordinate =computeParticleUV(a_CornerTextureCoordinate.zw, normalizedAge);\r\n\t\t\t#endif\r\n\t\t\t#ifdef RENDERMODE_MESH\r\n\t\t\t\tv_TextureCoordinate =computeParticleUV(a_MeshTextureCoordinate, normalizedAge);\r\n\t\t\t#endif\r\n\t\t\t\r\n\t\t\t#ifdef TILINGOFFSET\r\n\t\t\t\tv_TextureCoordinate=TransformUV(v_TextureCoordinate,u_TilingOffset);\r\n\t\t\t#endif\r\n\t\t#endif\r\n   \t}\r\n   \telse\r\n\t{\r\n\t\tgl_Position=vec4(2.0,2.0,2.0,1.0);//Discard use out of X(-1,1),Y(-1,1),Z(0,1)\r\n\t}\r\n\tgl_Position=remapGLPositionZ(gl_Position);\r\n}\r\n\r\n', "#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n  precision highp float;\r\n#else\r\n  precision mediump float;\r\n#endif\r\n\r\nvarying vec4 v_Color;\r\nvarying vec2 v_TextureCoordinate;\r\nuniform sampler2D u_texture;\r\nuniform vec4 u_Tintcolor;\r\n\r\n#ifdef RENDERMODE_MESH\r\n\tvarying vec4 v_MeshColor;\r\n#endif\r\n\r\n#ifdef FOG\r\n\tuniform float u_FogStart;\r\n\tuniform float u_FogRange;\r\n\t#ifdef ADDTIVEFOG\r\n\t#else\r\n\t\tuniform vec3 u_FogColor;\r\n\t#endif\r\n#endif\r\n\r\n\r\nvoid main()\r\n{\t\r\n\t#ifdef RENDERMODE_MESH\r\n\t\tgl_FragColor=v_MeshColor;\r\n\t#else\r\n\t\tgl_FragColor=vec4(1.0);\t\r\n\t#endif\r\n\t\t\r\n\t#ifdef DIFFUSEMAP\r\n\t\t#ifdef TINTCOLOR\r\n\t\t\tgl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*u_Tintcolor*2.0*v_Color;\r\n\t\t#else\r\n\t\t\tgl_FragColor*=texture2D(u_texture,v_TextureCoordinate)*v_Color;\r\n\t\t#endif\r\n\t#else\r\n\t\t#ifdef TINTCOLOR\r\n\t\t\tgl_FragColor*=u_Tintcolor*2.0*v_Color;\r\n\t\t#else\r\n\t\t\tgl_FragColor*=v_Color;\r\n\t\t#endif\r\n\t#endif\r\n\t\r\n\t#ifdef FOG\r\n\t\tfloat lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\r\n\t\t#ifdef ADDTIVEFOG\r\n\t\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\r\n\t\t#else\r\n\t\t\tgl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\r\n\t\t#endif\r\n\t#endif\r\n}", s), oe.SHADERDEFINE_DIFFUSEMAP = Laya.Shader3D.getDefineByName("DIFFUSEMAP"), oe.SHADERDEFINE_TINTCOLOR = Laya.Shader3D.getDefineByName("TINTCOLOR"), oe.SHADERDEFINE_ADDTIVEFOG = Laya.Shader3D.getDefineByName("ADDTIVEFOG"), oe.SHADERDEFINE_TILINGOFFSET = Laya.Shader3D.getDefineByName("TILINGOFFSET"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD = Laya.Shader3D.getDefineByName("SPHERHBILLBOARD"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD = Laya.Shader3D.getDefineByName("STRETCHEDBILLBOARD"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD = Laya.Shader3D.getDefineByName("HORIZONTALBILLBOARD"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD = Laya.Shader3D.getDefineByName("VERTICALBILLBOARD"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLOROVERLIFETIME = Laya.Shader3D.getDefineByName("COLOROVERLIFETIME"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RANDOMCOLOROVERLIFETIME = Laya.Shader3D.getDefineByName("RANDOMCOLOROVERLIFETIME"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECONSTANT = Laya.Shader3D.getDefineByName("VELOCITYOVERLIFETIMECONSTANT"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECURVE = Laya.Shader3D.getDefineByName("VELOCITYOVERLIFETIMECURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCONSTANT = Laya.Shader3D.getDefineByName("VELOCITYOVERLIFETIMERANDOMCONSTANT"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCURVE = Laya.Shader3D.getDefineByName("VELOCITYOVERLIFETIMERANDOMCURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONCURVE = Laya.Shader3D.getDefineByName("TEXTURESHEETANIMATIONCURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONRANDOMCURVE = Laya.Shader3D.getDefineByName("TEXTURESHEETANIMATIONRANDOMCURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIME = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIME"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMESEPERATE = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIMESEPERATE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECONSTANT = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIMECONSTANT"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECURVE = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIMECURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCONSTANTS = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIMERANDOMCONSTANTS"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCURVES = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIMERANDOMCURVES"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVE = Laya.Shader3D.getDefineByName("SIZEOVERLIFETIMECURVE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVESEPERATE = Laya.Shader3D.getDefineByName("SIZEOVERLIFETIMECURVESEPERATE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVES = Laya.Shader3D.getDefineByName("SIZEOVERLIFETIMERANDOMCURVES"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVESSEPERATE = Laya.Shader3D.getDefineByName("SIZEOVERLIFETIMERANDOMCURVESSEPERATE"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH = Laya.Shader3D.getDefineByName("RENDERMODE_MESH"), Laya.ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SHAPE = Laya.Shader3D.getDefineByName("SHAPE")
		}
		_getNumber(e) {
			return this._shaderValues.getNumber(e)
		}
		_setNumber(e, t) {
			this._shaderValues.setNumber(e, t)
		}
		_setColor(e, t) {
			this._shaderValues.setVector(e, t)
		}
		_getColor(e) {
			return this._shaderValues.getVector(e)
		}
		_setTexture(e, t) {
			this._getTexture(e);
			this._shaderValues.setTexture(e, t)
		}
		_getTexture(e) {
			return this._shaderValues.getTexture(e)
		}
		_addShaderDefine(e) {
			this._shaderValues.addDefine(e)
		}
		_removeShaderDefine(e) {
			this._shaderValues.removeDefine(e)
		}
	}
	oe.RENDERMODE_OPAQUE = 1, oe.RENDERMODE_OPAQUEDOUBLEFACE = 2, oe.RENDERMODE_CUTOUT = 3, oe.RENDERMODE_CUTOUTDOUBLEFACE = 4, oe.RENDERMODE_TRANSPARENT = 13, oe.RENDERMODE_TRANSPARENTDOUBLEFACE = 14, oe.RENDERMODE_ADDTIVE = 15, oe.RENDERMODE_ADDTIVEDOUBLEFACE = 16, oe.RENDERMODE_DEPTHREAD_TRANSPARENT = 5, oe.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE = 6, oe.RENDERMODE_DEPTHREAD_ADDTIVE = 7, oe.RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE = 8, oe.RENDERMODE_NONDEPTH_TRANSPARENT = 9, oe.RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE = 10, oe.RENDERMODE_NONDEPTH_ADDTIVE = 11, oe.RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE = 12, oe.BENDANGLE = 164, oe.BENDDISTANCE = 165, oe.isInit = !1;
	class se extends Laya.TrailMaterial {
		constructor() {
			super(), this.initShader1(), this.setShaderName("TrailExp"), this.setBendDistance(50)
		}
		cloneTo(e) {
			super.cloneTo(e);
			var t = e;
			this.color && this.color.cloneTo(t.color)
		}
		getBendOffset() {
			return this._getColor(se.BENDANGLE)
		}
		setBendOffset(e) {
			this._setColor(se.BENDANGLE, e)
		}
		setBendDistance(e) {
			this._setNumber(se.BENDDISTANCE, e)
		}
		cloneMat(e) {
			if (e)
				for (let t in this)
					if ("_shader" != t)
						if ("_shaderValues" == t)
							for (let i in e[t]._data) this[t]._data[i] = e[t]._data[i];
						else this[t] = e[t]
		}
		initShader1() {
			if (se.isInit) return;
			se.isInit = !0, se.BENDANGLE = Laya.Shader3D.propertyNameToID("_QOffset"), se.BENDDISTANCE = Laya.Shader3D.propertyNameToID("_Dist");
			let e = {
				a_Position: Laya.VertexTrail.TRAIL_POSITION0,
				a_OffsetVector: Laya.VertexTrail.TRAIL_OFFSETVECTOR,
				a_Texcoord0X: Laya.VertexTrail.TRAIL_TEXTURECOORDINATE0X,
				a_Texcoord0Y: Laya.VertexTrail.TRAIL_TEXTURECOORDINATE0Y,
				a_BirthTime: Laya.VertexTrail.TRAIL_TIME0,
				a_Color: Laya.VertexTrail.TRAIL_COLOR
			},
				t = {
					u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
					u_View: Laya.Shader3D.PERIOD_CAMERA,
					u_Projection: Laya.Shader3D.PERIOD_CAMERA,
					u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
					u_MainTexture: Laya.Shader3D.PERIOD_MATERIAL,
					u_MainColor: Laya.Shader3D.PERIOD_MATERIAL,
					u_CurTime: Laya.Shader3D.PERIOD_SPRITE,
					u_LifeTime: Laya.Shader3D.PERIOD_SPRITE,
					u_WidthCurve: Laya.Shader3D.PERIOD_SPRITE,
					u_WidthCurveKeyLength: Laya.Shader3D.PERIOD_SPRITE,
					u_GradientColorkey: Laya.Shader3D.PERIOD_SPRITE,
					u_GradientAlphakey: Laya.Shader3D.PERIOD_SPRITE,
					_QOffset: Laya.Shader3D.PERIOD_MATERIAL,
					_Dist: Laya.Shader3D.PERIOD_MATERIAL
				},
				i = {
					s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
					s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
					s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
					s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
					s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
					s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
				},
				n = Laya.Shader3D.add("TrailExp"),
				a = new Laya.SubShader(e, t);
			n.addSubShader(a), a.addShaderPass('#include "Lighting.glsl";\r\n\r\nattribute vec3 a_Position;\r\nattribute vec3 a_OffsetVector;\r\nattribute vec4 a_Color;\r\nattribute float a_Texcoord0X;\r\nattribute float a_Texcoord0Y;\r\nattribute float a_BirthTime;\r\n\r\nuniform mat4 u_View;\r\nuniform mat4 u_Projection;\r\n\r\nuniform vec4 u_TilingOffset;\r\n\r\nuniform vec4 _QOffset\r\n\r\n;uniform float _Dist;\r\n\r\nuniform float u_CurTime;\r\nuniform float u_LifeTime;\r\nuniform vec4 u_WidthCurve[10];\r\nuniform int u_WidthCurveKeyLength;\r\n\r\nvarying vec2 v_Texcoord0;\r\nvarying vec4 v_Color;\r\n\r\nfloat hermiteInterpolate(float t, float outTangent, float inTangent, float duration, float value1, float value2)\r\n{\r\n\tfloat t2 = t * t;\r\n\tfloat t3 = t2 * t;\r\n\tfloat a = 2.0 * t3 - 3.0 * t2 + 1.0;\r\n\tfloat b = t3 - 2.0 * t2 + t;\r\n\tfloat c = t3 - t2;\r\n\tfloat d = -2.0 * t3 + 3.0 * t2;\r\n\treturn a * value1 + b * outTangent * duration + c * inTangent * duration + d * value2;\r\n}\r\n\r\nfloat getCurWidth(in float normalizeTime)\r\n{\r\n\tfloat width;\r\n\tif(normalizeTime == 0.0){\r\n\t\twidth=u_WidthCurve[0].w;\r\n\t}\r\n\telse if(normalizeTime >= 1.0){\r\n\t\twidth=u_WidthCurve[u_WidthCurveKeyLength - 1].w;\r\n\t}\r\n\telse{\r\n\t\tfor(int i = 0; i < 10; i ++ )\r\n\t\t{\r\n\t\t\tif(normalizeTime == u_WidthCurve[i].x){\r\n\t\t\t\twidth=u_WidthCurve[i].w;\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tvec4 lastFrame = u_WidthCurve[i];\r\n\t\t\tvec4 nextFrame = u_WidthCurve[i + 1];\r\n\t\t\tif(normalizeTime > lastFrame.x && normalizeTime < nextFrame.x)\r\n\t\t\t{\r\n\t\t\t\tfloat duration = nextFrame.x - lastFrame.x;\r\n\t\t\t\tfloat t = (normalizeTime - lastFrame.x) / duration;\r\n\t\t\t\tfloat outTangent = lastFrame.z;\r\n\t\t\t\tfloat inTangent = nextFrame.y;\r\n\t\t\t\tfloat value1 = lastFrame.w;\r\n\t\t\t\tfloat value2 = nextFrame.w;\r\n\t\t\t\twidth=hermiteInterpolate(t, outTangent, inTangent, duration, value1, value2);\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\treturn width;\r\n}\t\r\n\r\nvoid main()\r\n{\r\n\tfloat normalizeTime = (u_CurTime - a_BirthTime) / u_LifeTime;\r\n\t\r\n\t#ifdef TILINGOFFSET\r\n\t\tv_Texcoord0 = vec2(a_Texcoord0X, 1.0 - a_Texcoord0Y) * u_TilingOffset.xy + u_TilingOffset.zw;\r\n\t#else\r\n\t\tv_Texcoord0 = vec2(a_Texcoord0X, a_Texcoord0Y);\r\n\t#endif\r\n\t\r\n\tv_Color = a_Color;\r\n\t\r\n\thighp vec4 vPos = u_Projection * u_View * vec4(a_Position + a_OffsetVector * getCurWidth(normalizeTime),1.0);\r\n\tfloat zOff = vPos.z / _Dist;\r\n\tvPos += _QOffset * zOff * zOff;\r\n\tgl_Position =vPos  ;\r\n\tgl_Position=remapGLPositionZ(gl_Position);\r\n}\r\n', "#ifdef GL_FRAGMENT_PRECISION_HIGH\r\n\tprecision highp float;\r\n#else\r\n\tprecision mediump float;\r\n#endif\r\n\r\nuniform sampler2D u_MainTexture;\r\nuniform vec4 u_MainColor;\r\n\r\nvarying vec2 v_Texcoord0;\r\nvarying vec4 v_Color;\r\n\r\nvoid main()\r\n{\r\n\tvec4 color = 2.0 * u_MainColor * v_Color;\r\n\t#ifdef MAINTEXTURE\r\n\t\tvec4 mainTextureColor = texture2D(u_MainTexture, v_Texcoord0);\r\n\t\tcolor *= mainTextureColor;\r\n\t#endif\r\n\tgl_FragColor = color;\r\n}\r\n\r\n     ", i), se.SHADERDEFINE_DIFFUSEMAP = Laya.Shader3D.getDefineByName("DIFFUSEMAP"), se.SHADERDEFINE_NORMALMAP = Laya.Shader3D.getDefineByName("NORMALMAP"), se.SHADERDEFINE_SPECULARMAP = Laya.Shader3D.getDefineByName("SPECULARMAP"), se.SHADERDEFINE_REFLECTMAP = Laya.Shader3D.getDefineByName("REFLECTMAP"), se.SHADERDEFINE_TILINGOFFSET = Laya.Shader3D.getDefineByName("TILINGOFFSET"), se.SHADERDEFINE_ADDTIVEFOG = Laya.Shader3D.getDefineByName("ADDTIVEFOG")
		}
		_getNumber(e) {
			return this._shaderValues.getNumber(e)
		}
		_setNumber(e, t) {
			this._shaderValues.setNumber(e, t)
		}
		_setColor(e, t) {
			this._shaderValues.setVector(e, t)
		}
		_getColor(e) {
			return this._shaderValues.getVector(e)
		}
		_setTexture(e, t) {
			this._shaderValues.getTexture(e);
			this._shaderValues.setTexture(e, t)
		}
		_getTexture(e) {
			return this._shaderValues.getTexture(e)
		}
		_addShaderDefine(e) {
			this._shaderValues.addDefine(e)
		}
		_removeShaderDefine(e) {
			this._shaderValues.removeDefine(e)
		}
	}
	se.BENDANGLE = 164, se.BENDDISTANCE = 165, se.isInit = !1;
	class re {
		constructor(e, t = !1) {
			this._x = 0, this._y = 0, this._z = 0, this._initX = 0, this._initY = 0, this._initZ = 0, this.chaX = 0, this.chaY = 0, this.chaZ = 0, this._roateZ = 0, this._roateX = 0, this._roateY = 0, this.isPlaying = !1, this.needRoate = !1, this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.speedAddX = 0, this.speedAddY = 0, this.speedAddZ = 0, this.targetX = 0, this.targetY = 0, this.targetMinY = 0, this.targetZ = 0, this.targetRX = 0, this.targetRY = 0, this.targetRZ = 0, this.speedSubY = 0, this.speedSubY1 = 0, this._isLocal = !1, this._needRoateZ = !1, this._maxRoateZ = 0, this._isLocal = t, this._target = e, this._isLocal ? (this._initX = this._x = this._target.transform.localPosition.x, this._initY = this._y = this._target.transform.localPosition.y, this._initZ = this._z = this._target.transform.localPosition.z) : (this._initX = this._x = this._target.transform.position.x, this._initY = this._y = this._target.transform.position.y, this._initZ = this._z = this._target.transform.position.z), this._roateX = this._target.transform.localRotationEulerX, this._roateY = this._target.transform.localRotationEulerY, this._roateZ = this._target.transform.localRotationEulerZ
		}
		get initY() {
			return this._initY
		}
		get x() {
			return this._x
		}
		set x(e) {
			this._x = e, this._isLocal ? (this._target.transform.localPosition.x = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.x = e, this._target.transform.position = this._target.transform.position)
		}
		get y() {
			return this._y
		}
		set y(e) {
			this._y = e, this._isLocal ? (this._target.transform.localPosition.y = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.y = e, this._target.transform.position = this._target.transform.position)
		}
		get z() {
			return this._z
		}
		set z(e) {
			this._z = e, this._isLocal ? (this._target.transform.localPosition.z = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.z = e, this._target.transform.position = this._target.transform.position)
		}
		get roateX() {
			return this._roateX
		}
		set roateX(e) {
			this._roateX = e, this._target.transform.localRotationEulerX = e
		}
		get roateZ() {
			return this._roateZ
		}
		set roateZ(e) {
			this._roateZ = e, this._target.transform.localRotationEulerZ = e
		}
		get roateY() {
			return this._roateY
		}
		set roateY(e) {
			this._roateY = e, this._target.transform.localRotationEulerY = e
		}
		setValue(e, t, i) {
			this._x = e, this._y = t, this._z = i, this._isLocal ? (this._target.transform.localPosition.x = this._x, this._target.transform.localPosition.y = this._y, this._target.transform.localPosition.z = this._z, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.x = this._x, this._target.transform.position.y = this._y, this._target.transform.position.z = this._z, this._target.transform.position = this._target.transform.position)
		}
		reset() {
			this.isPlaying = !1, this.needRoate = !1, this.setValue(this._initX, this._initY, this._initZ)
		}
		update(e) {
			if (this.isPlaying && this._target) {
				let t = 0 == this.speedZ,
					i = 0 == this.speedY,
					n = 0 == this.speedX;
				if (this.speedX) {
					let t = this.x;
					t += e * this.speedX, this.x = t, n = this.targetX < 0 ? t <= this.targetX : !(this.targetX > 0) || t >= this.targetX
				}
				if (this.speedZ) {
					let i = this.z;
					i += e * this.speedZ, this.z = i, t = i >= this.targetZ
				}
				if (this.speedY) {
					let t = this.y;
					this.speedAddY += this.speedSubY1 * e, this.speedY += this.speedAddY * e, t += e * this.speedY, this.targetY > 0 && t >= this.targetY ? (this.targetY = this.targetMinY, this.speedAddY = this.speedSubY, this.speedSubY1 = -25e-7) : this.targetY == this.targetMinY && t <= this.targetY && (this.y = t = this.targetMinY, i = !0), this.y = t
				}
				i && t && n && (this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.isPlaying = !1, this.needRoate = !1), this.needRoate && (0 == this.targetZ && (this._target.transform.localRotationEulerX += e / Q.randomRange(3, 10), this._target.transform.localRotationEulerZ += e / Q.randomRange(3, 10)), this._target.transform.localRotationEulerY += e / Q.randomRange(3, 6))
			}
			if (this._needRoateZ && this._target) {
				let t = this._target.transform.localRotationEulerZ;
				t < this._maxRoateZ ? (t += e / Q.randomRange(3, 6), this._target.transform.localRotationEulerZ = t, t >= this._maxRoateZ && (this._needRoateZ = !1)) : t > this._maxRoateZ && (t -= e / Q.randomRange(3, 6), this._target.transform.localRotationEulerZ = t, t <= this._maxRoateZ && (this._needRoateZ = !1))
			}
		}
		play(e = !0, t, i, n = .2) {
			this._target && (this.needRoate = e, this.isPlaying || (this.isPlaying = !0, this.speedAddY = -5e-6, this.targetX = this.x + Q.randomFloatRange(-3, 3), i ? (this.targetY = this.y, this.speedY = 0, this.targetZ = this.z + Q.randomRange(3, 6), this.speedZ = t * Q.randomFloatRange(2, 3)) : (t > 1.2 * j.SPEED_BASE ? (this.speedZ = t * Q.randomFloatRange(1.2, 1.5), this.targetY = this.y + Q.randomFloatRange(1.4, 1.8), this.speedY = Q.randomFloatRange(.015, .025), this.speedAddY = -1e-5 * (1 + this.speedY / .025)) : (this.speedZ = t * Q.randomFloatRange(.8, 1.1), this.targetY = this.y + Q.randomFloatRange(.5, 1.2), this.speedY = Q.randomFloatRange(.006, .012)), this.targetZ = 0), this.speedX = Q.randomFloatRange(.001, .006), this.speedX = this.targetX < this.x ? -this.speedX : this.speedX, this.targetX = 0, this.speedSubY = -1e-5, this.speedSubY1 = 0, this.targetMinY = n, this._needRoateZ = !1))
		}
		play1(e, t, i, n, a = !0, o = !1, s = .2) {
			this._target && (this.needRoate = a, this._needRoateZ = o, this.isPlaying || (this.isPlaying = !0, this.targetX = this.x + n, this.targetY = o ? .2 : 0, this.speedY = this.y > this.targetY ? -.001 : 0, this.targetZ = this.z + i, this.speedZ = e, this.speedX = t, this.speedX = this.targetX < this.x ? -this.speedX : this.speedX, this.speedAddY = -5e-6, this.speedSubY = -1e-5, this.speedSubY1 = 0, this.targetMinY = o ? s : 0, this._needRoateZ && (this._maxRoateZ = Q.randomBoolen() ? -90 : 90)))
		}
		play2(e = !0, t = 0) {
			this._target && (this.needRoate = e, this.isPlaying || (this.isPlaying = !0, this.targetX = this.x + Q.randomRange(-1, 1), this.targetY = this.y + Q.randomFloatRange(.5, .8), this.targetZ = this.z + Q.randomRange(-1, 1), this.speedX = Q.randomFloatRange(5e-4, .001), this.speedX = this.targetX < this.x ? -this.speedX : this.speedX, this.speedY = Q.randomFloatRange(.001, .003), this.speedZ = Q.randomFloatRange(5e-4, .001), this.speedZ = this.targetZ < this.z ? -this.speedZ : this.speedZ, this.speedAddY = -5e-6, this.speedSubY = -1e-5, this.targetMinY = .05))
		}
	}
	class le {
		constructor(e, t) {
			this.needPlayMusic = !1, this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.speedAddX = 0, this.speedAddY = 0, this.speedAddZ = 0, this.targetX = 0, this.targetY = 0, this.targetZ = 0, this._isFantan = !1, this._roating = !1, this.isStay = !1, this._minY = .1, this._maxRoate = 90, this._roateType = 0, this._curPosY = 0, this._needUpatePosY = !0, this.isStop = !1, this._app = e, this.owner = t, this.tweenPos = new re(this.owner), this._roateV = new Laya.Vector3
		}
		setPos(e, t, i) {
			this.clear(), this.owner.transform.position.x = e, this.owner.transform.position.y = t, this.owner.transform.position.z = i, this.owner.transform.position = this.owner.transform.position, this.tweenPos.setValue(e, t, i), this.isStop = !1
		}
		playDrop(e, t, i, n, a, o = 0, s = !0) {
			this._needUpatePosY = s, this.targetY = this.tweenPos.y + e, this.targetZ = this.tweenPos.z + Q.randomFloatRange(1, 3), this.speedX = i, this.speedX = 0 == o ? 0 : o < 0 ? -this.speedX : this.speedX, this.speedY = s ? .025 : .03, this.speedZ = t, this.speedAddY = s ? -25e-5 : -5e-5, this._isFantan = !1, this._roating = !0, this._roateV.setValue(0, 0, 0), this._maxRoate = a, this._roateType = n, this.owner.transform.localRotationEulerZ = 0, this.owner.transform.localRotationEulerX = 0, Laya.Tween.clearAll(this.owner.transform), 1 == n ? (this._roateV.x = this._maxRoate ? 1 : 0, Laya.Tween.to(this.owner.transform, {
				localRotationEulerX: this._maxRoate
			}, 500)) : 2 == n && (this._roateV.z = this._maxRoate ? 1 : 0, Laya.Tween.to(this.owner.transform, {
				localRotationEulerX: 360
			}, 800, null, Laya.Handler.create(this, () => {
				Laya.Tween.to(this.owner.transform, {
					localRotationEulerZ: this._maxRoate
				}, 250)
			}))), this._curPosY = this.tweenPos.y
		}
		update(e) {
			if (this.speedX && !this.isStop) {
				let t = this.tweenPos.x;
				t += e * this.speedX, this.tweenPos.x = t
			}
			if (this.speedZ && !this.isStop) {
				let t = this.tweenPos.z;
				t += e * this.speedZ, this.tweenPos.z = t
			}
			if (this.speedY) {
				let t = this._needUpatePosY ? this.tweenPos.y : this._curPosY;
				this.speedY += this.speedAddY * e, t += e * this.speedY, this.isStop ? this.stop() : this.targetY > 0 && t >= this.targetY ? (this.targetY = this._minY, this.speedAddY = this._needUpatePosY ? -3e-5 : -2e-4) : this.targetY == this._minY && t <= this.targetY && (this.tweenPos.y = t = this._minY, this.stop()), this._needUpatePosY ? this.tweenPos.y = t : this._curPosY = t
			}
		}
		stop() {
			this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.needPlayMusic = !1, this._roating = !1
		}
		clear() {
			Laya.Tween.clearAll(this.owner.transform), this.stop()
		}
	}
	class de {
		constructor() { }
		static send(e, t) { }
		static sendGameRunTime() { }
		static initInfo() {
			this.send("gt_init_info")
		}
		static adRequest(e) {
			this.send("gt_ad_request", {
				ad_type: e
			})
		}
		static adSend(e, t, i) {
			this.send("gt_ad_send", {
				ad_type: e,
				rit_id: t,
				ad_code: i
			})
		}
		static adButtonShow(e, t, i, n) {
			let a = de.AD_POS_TEMP[t - 1];
			if (!a) return;
			let o = a.ad_position[i],
				s = a.ad_position_type;
			this.send("gt_ad_button_show", {
				ad_type: e,
				ad_position: o,
				ad_position_type: s,
				rit_id: n
			})
		}
		static adButtonClick(e, t, i, n) {
			let a = de.AD_POS_TEMP[t - 1];
			if (!a) return;
			let o = a.ad_position[i],
				s = a.ad_position_type;
			this.send("gt_ad_button_click", {
				ad_type: e,
				ad_position: o,
				ad_position_type: s,
				rit_id: n
			})
		}
		static adClick(e, t, i, n) {
			let a = de.AD_POS_TEMP[t - 1];
			if (!a) return;
			let o = a.ad_position[i],
				s = a.ad_position_type;
			this.send("gt_ad_click", {
				ad_type: e,
				ad_position: o,
				ad_position_type: s,
				rit_id: n
			}), console.log("=========gt_ad_click=======", e, t, i)
		}
		static adShow(e, t, i, n) {
			let a = de.AD_POS_TEMP[t - 1];
			if (!a) return;
			let o = a.ad_position[i],
				s = a.ad_position_type;
			this.send("gt_ad_show", {
				ad_type: e,
				ad_position: o,
				ad_position_type: s,
				rit_id: n
			})
		}
		static adShowEnd(e, t, i, n, a) {
			let o = de.AD_POS_TEMP[t - 1];
			if (!o) return;
			let s = o.ad_position[i],
				r = o.ad_position_type;
			this.send("gt_ad_show_end", {
				ad_type: e,
				ad_position: s,
				ad_position_type: r,
				rit_id: a,
				result: n
			})
		}
		static startPlay(e) {
			this.send("gt_start_play", {
				play_type: e
			})
		}
		static endPlay(e, t, i, n, a, o, s, r, l, d, h) {
			this.send("gt_end_play", {
				play_type: e,
				result: t,
				duration: i,
				kill_num: n,
				percentage: a,
				rank: o,
				deathType: s,
				continueTimes: r,
				behavior: l,
				levelEndCoin: d,
				failTimes: h
			})
		}
		static revive(e, t) {
			this.send("gt_revive", {
				play_type: e,
				method: t
			})
		}
		static getEquip(e, t) {
			this.send("gt_get_equ", {
				equ_id: e,
				equ_position: t
			}), console.log("=========gt_get_equ=======", e, t)
		}
		static allBtnClick(e) {
			let t = de.BTN_NAMES[e];
			this.send("gt_all_button_click", {
				button_id: e,
				button_name: t
			})
		}
		static getCoins(e, t, i, n) {
			this.send("gt_get_coins", {
				coin_type: e,
				method: n,
				coin_num: t,
				coin_left: i
			})
		}
		static costCoins(e, t, i, n) {
			this.send("gt_cost_coins", {
				coin_type: e,
				method: n,
				coin_num: t,
				coin_left: i
			}), console.log("=========gt_cost_coins=======", e, t, i, n)
		}
		static gtDownload(e) {
			this.send("gt_download", {
				button_name: e
			}), console.log("=========gt_download=======", e)
		}
		static gtDownloadEnd(e, t) {
			this.send("gt_download_end", {
				button_name: e,
				result: t
			}), console.log("=========gtDownloadEnd=======", e, t)
		}
		static gtInstallEnd(e, t) {
			this.send("gt_install_end", {
				button_name: e,
				result: t
			}), console.log("=========gtDownloadEnd=======", e, t)
		}
	}
	de.LEVEL_TYPE_NORMAL = "normal", de.LEVEL_TYPE_BOSS = "boss", de.PLAY_RESULT_UNCOMPLETE = "incomplete", de.PLAY_RESULT_SUCC = "success", de.PLAY_RESULT_FAIL = "failed", de.DEATH_TYPE_CAR = "car", de.DEATH_TYPE_AI = "ai", de.DEATH_TYPE_BOSS = "boss", de.DEATH_TYPE_NONE = "none", de.BEHAVIOR_0 = "nothanks", de.BEHAVIOR_1 = "ads", de.BEHAVIOR_2 = "autoskip", de.BEHAVIOR_3 = "multiplecoin", de.BEHAVIOR_4 = "noads", de.BEHAVIOR_5 = "download", de.EQUIP_WEAPON = "weapon", de.EQUIP_MOTOR = "motor", de.BTN_WEAPON = 1, de.BTN_MOTOR = 2, de.BTN_HUDTIYAN = 3, de.BTN_FREETIYAN = 4, de.BTN_GUIDETIYAN = 5, de.BTN_NAMES = ["", "weapon", "motor", "homepagedownload", "levelendtrial", "levelendguide"], de.MONEY_TYPE_COIN = "coin", de.COIN_GET_TYPE_0 = "ad", de.COIN_GET_TYPE_1 = "normal_result_ad", de.COIN_GET_TYPE_2 = "normal_result", de.COIN_COST_TYPE_0 = "shop_buy_weapon", de.COIN_COST_TYPE_1 = "shop_buy_motor", de.AD_TYPE_0 = "rv", de.AD_TYPE_1 = "inter", de.AD_TYPE_2 = "banner", de.AD_WATCH_SKIP = "interrupt", de.AD_WATCH_SUCC = "success", de.AD_WATCH_FAIL = "failed", de.AD_POS_TEMP = [{
		rit_id: 1,
		ad_position_type: "抽奖",
		ad_position: []
	}, {
		rit_id: 2,
		ad_position_type: "复活",
		ad_position: ["reward_game_continue"]
	}, {
		rit_id: 3,
		ad_position_type: "多倍奖励",
		ad_position: ["reward_game_result_getfree"]
	}, {
		rit_id: 4,
		ad_position_type: "体力获取",
		ad_position: ["reward_coin_getfree"]
	}, {
		rit_id: 5,
		ad_position_type: "解锁物品",
		ad_position: ["reward_shop_motor", "reward_shop_weapon", "reward_trial_motor", "reward_trial_weapon"]
	}, {
		rit_id: 6,
		ad_position_type: "解锁关卡",
		ad_position: ["inter_end"]
	}];
	class he extends Laya.Script3D {
		constructor() {
			super(), this.weaponRoation = [-.2790507949998326, -.1968100964734613, .3509733937110886, .8719025843768269], this._aiId = 0, this._showSpeedAddEffectCount = 0, this._trailShowEndTime = 0, this.posZ = 0, this.posY = 0, this.posX = 0, this.posX1 = 0, this._moveDiffX = 0, this._moveDiffX1 = 0, this._isMainPlayer = !1, this.isPass = !1, this._wuDiTimeEnd = 0, this._addSpeedTimeEnd = 0, this._subSpeedTimeEnd = 0, this.baseSpeed = .006, this.maxSpeed = .014, this.speedAddPer = 15e-6, this.speedAddPer1 = 15e-6, this.speedJumpAddPer = 1e-7, this.speedRelasePer = 15e-6, this.speedRelasePer1 = 1e-5, this.curHp = 0, this.maxHp = 0, this._curSuitUrl = "", this._curSuitId = 1, this._curHatUrl = "", this._curHatId = 1, this._curMotoUrl = "", this._curMotoId = 1, this._weaponToward = 0, this._curWeaponUrl = "", this._curWeaponId = 1, this._curAction = -1, this._isArrived = !1, this._rank = 0, this.deathType = "", this.attackCount = 0, this._attackCD = 0, this.isAttacking = !1, this.isRocketing = !1, this.isRocketFlying = !1, this.attackTime = 500, this.beatenTime = 300, this.dieTime = 500, this.turnTime = 1500, this.isBeatening = !1, this._haveMoveTween = !1, this._haveRoateTween = !1, this.mouseDownX = 0, this._preMoveX = 0, this._isLoadWuDi = !1, this.touchAddSpeed = !1, this._speedRate = 0, this._speedZ = j.SPEED_INIT, this._speedAddX = 0, this._speedX = 0, this._speedX1 = 0, this._needShowSpeedEffect = !1, this._isBeiPush = !1, this._isPush = !1, this._curEmojiId = -1, this._emojiTimeEnd = 0, this._attackerToward = 0, this._runToward = 0, this._running = !1, this._isDie = !1
		}
		get aiId() {
			return this._aiId
		}
		get moveDiffX() {
			return this._moveDiffX
		}
		set moveDiffX(e) {
			this._moveDiffX = e
		}
		get moveDiffX1() {
			return this._moveDiffX1
		}
		set moveDiffX1(e) {
			this._moveDiffX1 = e
		}
		get curSuitId() {
			return this._curSuitId
		}
		get curHatId() {
			return this._curHatId
		}
		get curMotoId() {
			return this._curMotoId
		}
		get curWeaponId() {
			return this._curWeaponId
		}
		get isArrived() {
			return this._isArrived
		}
		get rank() {
			return this._rank
		}
		set rank(e) {
			this._rank = e, this._crown && (this._crown.active = !this.isDie && 1 == e)
		}
		init(e, t, i) {
			this._app || (this._app = e), this._isMainPlayer = i, this.initialize(t)
		}
		initialize(e) {
			this.baseSpeed = j.SPEED_BASE, this.maxSpeed = j.SPEED_MAX, this.maxHp = j.MAX_LIFE, this.owner = e, this.owner.script = this, this._startPos = this.owner.transform.position.clone(), this.posZ = this._startPos.z, this.posY = this._startPos.y, this.posX1 = this.posX = this._startPos.x, this._realDestX = this._moveDiffX1 = this._moveDiffX = this._startPos.x, this._player = this.owner.getChildByName("player"), this._startPlayerPos = new Laya.Vector3, Laya.Vector3.subtract(this._startPos, this._player.transform.position, this._startPlayerPos), this._animator = this._player.getComponent(Laya.Animator), this._hat = this.owner.getChildByName("hat"), this._motor = this.owner.getChildByName("motor"), this._startMotorPos = new Laya.Vector3, Laya.Vector3.subtract(this._startPos, this._motor.transform.position, this._startMotorPos), this._lunzis = [], this._lunzis.push(this.findChildByName(this._motor, "frontwheel")), this._lunzis.push(this.findChildByName(this._motor, "rearwheel")), this._weapon = this.owner.getChildByName("weapon01"), this._weapon && (this.weaponRoation[0] = this._weapon.transform.rotation.x, this.weaponRoation[1] = this._weapon.transform.rotation.y, this.weaponRoation[2] = this._weapon.transform.rotation.z, this.weaponRoation[3] = this._weapon.transform.rotation.w, this._weapon.active = !1), this._crown = this.owner.getChildByName("crown"), this._crown && (this._crown.active = !1), this._rankObj = this.owner.getChildByName("rank"), this._rankObj && (this._rankObj.active = !1), this._emoji = this.owner.getChildByName("emoji"), this._emoji && (this._emoji.active = !1), this._jumpCtrl ? this._jumpCtrl.setOwner(this.owner) : this._jumpCtrl = new ie(this.owner), this._wuDiTimeEnd = 0, this._addSpeedTimeEnd = 0, this._subSpeedTimeEnd = 0, this._speedAddEffects = [];
			let t = this.owner.getChildByName("penhuo");
			if (this.changeEffectMat(t), this._speedAddEffects.push(t), this._speedAddEffects.push(t.clone()), this._speedAddEffects.push(t.clone()), this._speedAddEffects.push(t.clone()), this._showSpeedAddEffectCount = 2, this.showSpeedAddEffect(!1), this._hitEffect = this.owner.getChildByName("hit"), this._hitEffect && (this._hitEffect.active = !1, this.changeEffectMat(this._hitEffect), this.playChildEffect(this._hitEffect, this._hitEffect.active)), this._pengEffect = this.owner.getChildByName("pengzhuang01"), this._pengEffect && (this._pengEffect.active = !1, this.changeEffectMat(this._pengEffect), this.playChildEffect(this._pengEffect, this._pengEffect.active)), this._trailEffect = this.owner.getChildByName("trail"), this._trailEffect) {
				this._trailEffect.removeSelf();
				let e = new se;
				e.texture = this._trailEffect.trailRenderer.material.texture, e.cloneMat(this._trailEffect.trailRenderer.material), this._trailEffect.trailRenderer.material = e
			}
			this.changeMat(this.owner), this._playerFly = new le(this._app, this._player), this._motorFly = new le(this._app, this._motor), this._hatFly = new le(this._app, this._hat), this._weaponFly = new le(this._app, this._weapon), this.updateAction()
		}
		reset() {
			this.isRocketFlying = !1, this.isRocketing = !1, this.deathType = "", this.attackCount = 0, this._emojiTimeEnd = 0, this.isAttacking = this.isBeatening = !1, this._attackObjs && (this._attackObjs.length = 0), this.rank = 0, this._isArrived = !1, this.running = !1, this._isBeiPush = this._isPush = !1, this._wuDiTimeEnd = 0, this._addSpeedTimeEnd = 0, this._subSpeedTimeEnd = 0, this.isDie = !1, this.curHp = this.maxHp, this._weaponToward = 0, this.showSpeedAddEffect(!1), this._runToward = he.TOWARD_UP, this._player.transform.localScaleX = 1, this.updateAction(), this._jumpCtrl && this._jumpCtrl.stop(!1), this.setOwnerPos(this._startPos.x, this._startPos.y, this._startPos.z), this.resetChildPos(), this.posX1 = this.posX = this._moveDiffX1 = this._moveDiffX = this._realDestX = this._startPos.x, this._speedZ = j.SPEED_INIT, this.touchAddSpeed = !1, this.speedAddPer1 = 15e-7, this._speedRate = 0, this.updateEquipPos(), this.rotateZ = 0
		}
		resetChildPos() {
			Laya.Vector3.subtract(this.owner.transform.position, this._startPlayerPos, this._player.transform.position), this._player.transform.position = this._player.transform.position, Laya.Vector3.subtract(this.owner.transform.position, this._startMotorPos, this._motor.transform.position), this._motor.transform.position = this._motor.transform.position, this._playerFly && this._playerFly.setPos(this._player.transform.position.x, this._player.transform.position.y, this._player.transform.position.z), this._motorFly && this._motorFly.setPos(this._motor.transform.position.x, this._motor.transform.position.y, this._motor.transform.position.z), this._hatFly && this._hatFly.setPos(this._hat.transform.position.x, this._hat.transform.position.y, this._hat.transform.position.z), this._weaponFly && this._weaponFly.setPos(this._weapon.transform.position.x, this._weapon.transform.position.y, this._weapon.transform.position.z), this.resetChildRoate(this._player), this.resetChildRoate(this._motor), this.resetChildRoate(this._hat), this.resetChildRoate(this._weapon)
		}
		resetChildRoate(e) {
			e && (e.transform.localRotationEulerX = 0, e.transform.localRotationEulerY = 0, e.transform.localRotationEulerZ = 0)
		}
		setSpeedEffectRenderSort(e) {
			if (!e) return;
			let t = e.numChildren;
			for (let i = 0; i < t; i++) {
				let t = e.getChildAt(i);
				if (!t) break;
				let n = t.particleRenderer.material;
				n.renderQueue = 2e3 + i + 1, t.particleRenderer.material = n
			}
		}
		updateSuit(e = 0) {
			if (!e || this._curSuitId == e || e > j.SuitTemp.length) return;
			let t = j.SuitTemp[e - 1];
			if (!t) return;
			this._curSuitId = e, this._curSuitUrl = te.scpath + t.texPath;
			let i = Laya.loader.getRes(this._curSuitUrl);
			i ? this.updateSuitEnd(i) : Laya.Texture2D.load(this._curSuitUrl, Laya.Handler.create(this, this.updateSuitEnd))
		}
		updateSuitEnd(e) {
			if (!e || !this._curSuitUrl || !this._curSuitUrl.length) return;
			let t = this._player.getChildByName("SkinMesh");
			t && (t.skinnedMeshRenderer.material.albedoTexture = e, this.changeMat(this._player))
		}
		updateHat(e = 0) {
			if (!e || this._curHatId == e || e > j.HatTemp.length) return void (this._hat && (this._hat.transform.localRotationEulerY = 0, this.updateEquipPos()));
			let t = j.HatTemp[e - 1];
			if (!t) return;
			this._curHatId = e, this._curHatUrl = te.scpath + t.texPath;
			let i = Laya.loader.getRes(this._curHatUrl);
			i ? this.updateSuitEnd(i) : Laya.Texture2D.load(this._curHatUrl, Laya.Handler.create(this, this.updateHatEnd))
		}
		updateHatEnd(e) {
			if (!(e && this._curHatUrl && this._curHatUrl.length && this._hat)) return;
			this._hat.meshRenderer.material.albedoTexture = e, this._hat.transform.localRotationEulerY = 0, this.updateEquipPos(), this.changeMat(this._hat)
		}
		updateMoto(e = 0) {
			if (!e || this._curMotoId == e || e > j.MotoTemp.length) return;
			let t = j.MotoTemp[e - 1];
			if (!t) return;
			this._curMotoId = e, this._curMotoUrl = te.scpath + t.prefabPath;
			let i = Laya.Loader.getRes(this._curMotoUrl);
			i ? this.updateMotoEnd(i) : Laya.Sprite3D.load(this._curMotoUrl, Laya.Handler.create(this, this.updateMotoEnd))
		}
		updateMotoEnd(e) {
			if (!(e && this._motor && this._curMotoUrl && this._curMotoUrl.length)) return;
			let t = e.clone().getChildByName("chassis");
			if (!t) return;
			t.removeSelf(), this._motor.removeChildren(), this._motor.addChild(t), this.changeMat(this._motor);
			let i = this.findChildByName(this._motor, "accelerate"),
				n = i ? i.numChildren : 0;
			this._showSpeedAddEffectCount = n
		}
		updateWeapon(e = 0) {
			if (this._curWeaponId == e || e > j.WeaponTemp.length) return;
			if (!e) return this._curWeaponId = e, this._weapon && (this._weapon.active = !1), void (this._weaponToward = 0);
			let t = j.WeaponTemp[e - 1];
			if (!t) return;
			this._curWeaponId = e, this._curWeaponUrl = te.scpath + t.prefabPath;
			let i = Laya.Loader.getRes(this._curWeaponUrl);
			i ? this.updateWeaponEnd(i) : Laya.Sprite3D.load(this._curWeaponUrl, Laya.Handler.create(this, this.updateWeaponEnd))
		}
		updateWeaponEnd(e) {
			if (!(e && this._weapon && this._curWeaponUrl && this._curWeaponUrl.length)) return;
			let t = this._weapon.parent;
			this._weapon.removeSelf();
			let i = e.clone();
			if (this._weapon = i, t && t.addChild(this._weapon), this.changeMat(this._weapon), this._curWeaponId == j.ROCKET_ID) {
				let e = this._weapon.getChildByName("rocket");
				if (e) {
					let t = e.getChildByName("trail");
					t && (this.changeEffectMat(t), t.particleSystem && t.particleSystem.stop(), t.active = !1, t.transform.localScaleX = t.transform.localScaleY = t.transform.localScaleZ = 3), e.transform.position.x = this._weapon.transform.position.x, e.transform.position.y = this._weapon.transform.position.y, e.transform.position.z = this._weapon.transform.position.z, e.transform.position = this._weapon.transform.position
				}
				this.updateWeaponPos(he.TOWARD_RIGHT), this._weapon.transform.localScaleX = this._weapon.transform.localScaleY = this._weapon.transform.localScaleZ = .8
			} else this._weaponToward = 0, this.updateWeaponPos(Q.randomBoolen() ? he.TOWARD_LEFT : he.TOWARD_RIGHT)
		}
		updateWeaponPos(e = 0) {
			if (!this._weapon || this.isRocketFlying) return;
			this._weaponToward = e;
			let t = this.weaponRoation[0],
				i = this.weaponRoation[1],
				n = this.weaponRoation[2],
				a = this.weaponRoation[3];
			this._curAction == j.ACTION_ATTACK5 ? (t = -.7648, i = -.037, n = .6383, a = .0783) : this._curAction != j.ACTION_ATTACK3_0 && this._curAction != j.ACTION_ATTACK3_1 || (i = n = 0, t = 1, a = 1), this._curWeaponId <= 0 ? this._weapon.active && (this._weapon.active = !1) : this._weaponToward == he.TOWARD_LEFT && this._weaponPosL ? (this._weapon.parent != this._weaponPosL && (this._weapon.removeSelf(), this._weaponPosL.addChild(this._weapon)), !this._weapon.active && (this._weapon.active = !0), this._weapon.transform.position = this._weaponPosL.transform.position, this._weapon.transform.rotation.x = t, this._weapon.transform.rotation.y = -i, this._weapon.transform.rotation.z = n, this._weapon.transform.rotation.w = a, this._weapon.transform.rotation = this._weapon.transform.rotation) : this._weaponToward == he.TOWARD_RIGHT && this._weaponPosR ? (this._weapon.parent != this._weaponPosR && (this._weapon.removeSelf(), this._weaponPosR.addChild(this._weapon)), this._weapon.transform.rotation.x = t, this._weapon.transform.rotation.y = i, this._weapon.transform.rotation.z = n, this._weapon.transform.rotation.w = a, !this._weapon.active && (this._weapon.active = !0), this._curWeaponId == j.ROCKET_ID ? (this._weapon.transform.position.x = this._weaponPosR.transform.position.x - .07, this._weapon.transform.position.y = this._weaponPosR.transform.position.y + .2, this._weapon.transform.position.z = this._weaponPosR.transform.position.z - .58, this._weapon.transform.position = this._weapon.transform.position) : this._weapon.transform.position = this._weaponPosR.transform.position, this._weapon.transform.rotation = this._weapon.transform.rotation) : this._weapon.active && (this._weapon.active = !1)
		}
		changeMat(e) {
			if (!e) return;
			if (e.meshRenderer) {
				let t = new ae(e.meshRenderer.material);
				t.albedoTexture = e.meshRenderer.material.albedoTexture, t.cloneMat(e.meshRenderer.material), e.meshRenderer.material = t
			} else if (e.skinnedMeshRenderer) {
				let t = new ae;
				t.albedoTexture = e.skinnedMeshRenderer.material.albedoTexture, t.cloneMat(e.skinnedMeshRenderer.material), e.skinnedMeshRenderer.material = t
			}
			let t = e.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = e.getChildAt(i);
					t && "penhuo" != t.name && this.changeMat(t)
				}
		}
		changeBend(e, t) {
			if (!e) return;
			if (e.meshRenderer) {
				let i = e.meshRenderer.sharedMaterial;
				i && i instanceof ae && i.setBendOffset(t)
			} else if (e.skinnedMeshRenderer) {
				let i = e.skinnedMeshRenderer.sharedMaterial;
				i && i instanceof ae && i.setBendOffset(t)
			}
			let i = e.numChildren;
			if (i)
				for (let n = 0; n < i; n++) {
					let i = e.getChildAt(n);
					i && this.changeBend(i, t)
				}
		}
		changeEffectMat(e) {
			if (!e) return;
			if (e.particleRenderer) {
				let t = new oe;
				t.texture = e.particleRenderer.material.texture, t.cloneMat(e.particleRenderer.material), e.particleRenderer.material = t
			}
			let t = e.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = e.getChildAt(i);
					t && this.changeEffectMat(t)
				}
		}
		changeEffectBend(e, t, i) {
			if (e && e.active) {
				if (e.particleRenderer) {
					let i = e.particleRenderer.sharedMaterial;
					i && i instanceof oe && i.setBendOffset(t)
				}
				if (i) {
					let n = e.numChildren;
					if (n)
						for (let a = 0; a < n; a++) {
							let n = e.getChildAt(a);
							n && this.changeEffectBend(n, t, i)
						}
				}
			}
		}
		playChildEffect(e, t, i) {
			if (!e) return;
			e.particleSystem && (t ? (!e.particleSystem.isPlaying && e.particleSystem.play(), i && this.changeEffectBend(e, i)) : e.particleSystem.isPlaying && e.particleSystem.stop());
			let n = e.numChildren;
			for (let a = 0; a < n; a++) {
				let n = e.getChildAt(a);
				n && n.particleSystem && (t ? (!n.particleSystem.isPlaying && n.particleSystem.play(), i && this.changeEffectBend(n, i)) : n.particleSystem.isPlaying && n.particleSystem.stop())
			}
		}
		showTrail(e) {
			this._trailEffect && this._trailEffect.active != e && (this._trailEffect.active = e)
		}
		inShowTrailTime() {
			return this._trailShowEndTime > 0 && this._trailShowEndTime > Laya.timer.currTimer
		}
		setShowTrailTime(e = 3e3) {
			this._trailShowEndTime = Laya.timer.currTimer + e
		}
		showSpeedEffect(e) {
			this._speedEffect && this._speedEffect.active != e && (this._speedEffect.active = e, this.playChildEffect(this._speedEffect, e))
		}
		showSpeedAddEffect(e, t) {
			if (!this._speedAddEffects) return;
			let i = this._speedAddEffects.length;
			for (let n = 0; n < i; n++) {
				let i = this._speedAddEffects[n];
				if (i) {
					if (e && n < this._showSpeedAddEffectCount) {
						let e = this.findChildByName(this._motor, "0" + (n + 1).toString());
						e ? (i.parent != e && (i.removeSelf(), e.addChild(i)), i.active = !0, i.transform.position = e.transform.position) : i.active = !1
					} else i.active = !1;
					this.playChildEffect(i, i.active, t)
				}
			}
		}
		showShadow(e) {
			this._shadowEffect && this._shadowEffect.active != e && (this._shadowEffect.active = e)
		}
		get destDiffX() {
			return this._desDiffX
		}
		get realDestX() {
			return this._realDestX
		}
		setMouseDownX() {
			this.mouseDownX = this._moveDiffX
		}
		setTowardAngle(e, t, i = 750, n = 1, a = 0) {
			if (!this.running || this._isArrived || this.isDie) return 0 == this.rotateZ || this._haveRoateTween || this.resetTowardAngle(), !1;
			let o = this._isMainPlayer,
				s = this._moveDiffX + t,
				r = j.MAX_WIDTH + a;
			if (s > r) {
				let t = s - this._realDestX;
				this._isMainPlayer && t < 0 ? (s = r - .2, e = -92, this._app.tc.setTouchX(), o = !1) : s = r
			} else if (s < -r) {
				let t = s - this._realDestX;
				this._isMainPlayer && t > 0 ? (s = .2 - r, e = -88, this._app.tc.setTouchX(), o = !1) : s = -r
			}
			if (o && 0 != this._preMoveX && (t < 0 && this._preMoveX < 0 && this._preMoveX < t ? (s = this._moveDiffX + t - this._preMoveX, e = -90, this._app.tc.setTouchX()) : t > 0 && this._preMoveX > 0 && this._preMoveX > t && (s = this._moveDiffX + t - this._preMoveX, e = -90, this._app.tc.setTouchX())), this._realDestX = this._moveDiffX + t, this._preMoveX = t, s == this._desDiffX || s == this._moveDiffX) return !1;
			this._desDiffX = s, this.clearMoveTween(!1, !0);
			let l = 5 * (90 - Math.abs(e)) * n,
				d = he.TOWARD_UP;
			l < 0 ? (d = he.TOWARD_RIGHT, l = l < -25 ? 25 : -l) : l > 0 ? (d = ge.TOWARD_LEFT, l = l > 25 ? -25 : -l) : t < 0 ? l = -5 : t > 0 && (l = 5), this._runToward = d, this._moveTween || (this._moveTween = new Laya.Tween), this._moveTween.to(this, {
				moveDiffX: this._desDiffX
			}, i, Laya.Ease.circOut);
			let h = .28 * i;
			this._roateTween || (this._roateTween = new Laya.Tween), this._roateTween.to(this, {
				rotateZ: l
			}, h, Laya.Ease.circOut, Laya.Handler.create(this, this.resetTowardAngle));
			let c = 4 * i;
			return this._moveTween1 || (this._moveTween1 = new Laya.Tween), this._moveTween1.to(this, {
				moveDiffX1: this._desDiffX
			}, c, Laya.Ease.circOut), this._haveMoveTween = !0, !0
		}
		resetTowardAngle(e = 150, t = !1) {
			this._runToward = he.TOWARD_UP, this._roateTween && this._roateTween.clear();
			let i = {
				rotateZ: 0
			};
			t && this._moveDiffX1 != this._moveDiffX && !this._moveTween1 && (i.moveDiffX1 = this._moveDiffX), this._roateTween1 || (this._roateTween1 = new Laya.Tween), this._roateTween1.clear(), this._roateTween1.to(this, i, e, null, Laya.Handler.create(this, this.clearMoveTween, [t, t])), this._haveRoateTween = !0
		}
		clearMoveTween(e = !1, t = !1) {
			this._moveTween && this._moveTween.clear(), e && (this._moveDiffX1 = this._moveDiffX), (e || t) && this._moveTween1 && (this._moveTween1.clear(), this._haveMoveTween = !1), this._roateTween && this._roateTween.clear(), this._roateTween1 && (this._roateTween1.clear(), this._haveRoateTween && e && (this.rotateZ = 0), this._haveRoateTween = !1)
		}
		set rotateZ(e) {
			this.owner.transform.localRotationEulerZ = e
		}
		get rotateZ() {
			return this.owner.transform.localRotationEulerZ
		}
		set localScaleX(e) {
			this._player.transform.localScaleX = e
		}
		get localScaleX() {
			return this._player.transform.localScaleX
		}
		get isJumping() {
			return this._jumpCtrl && this._jumpCtrl.isJumping
		}
		Update(e, t) {
			if (this.updateAction(), this.updateSpeed(e), this.isDie) this._playerFly && this._playerFly.update(e), this._motorFly && this._motorFly.update(e), this._hatFly && this._hatFly.update(e), this._weaponFly && this._weaponFly.update(e);
			else if (this.running) {
				this.updatePos(e);
				let t = this._lunzis ? this._lunzis.length : 0;
				for (let e = 0; e < t; e++) {
					let t = this._lunzis[e];
					t && (t.transform.localRotationEulerX += 500 * this._speedZ)
				}
			}
			this.posX1 = this._moveDiffX1, this.updateEquipPos(), this._player && (this._player.transform.localScaleZ = 1), this._emoji && (this._emoji.active = this._emojiTimeEnd > 0 && this._emojiTimeEnd > Laya.timer.currTimer, this._emoji.active && (this._emoji.transform.position.x = this.posX, this._emoji.transform.position.y = this.posY + 2.6, this._emoji.transform.position.z = this.posZ, this._emoji.transform.position = this._emoji.transform.position)), this.showShadow(!this.isJumping), this.showWuDiEffect();
			let i = this.running && !this.isDie && this.isInAddSpeedTime && this._needShowSpeedEffect;
			if (this.showSpeedAddEffect(i, t), this._trailEffect && this._trailEffect.active) {
				let e = this.findChildByName(this._motor, "rearwheel").transform.position;
				this._trailEffect.transform.position.x = e.x, this._trailEffect.transform.position.y = 0, this._trailEffect.transform.position.z = e.z + .2, this._trailEffect.transform.position = this._trailEffect.transform.position, this._trailEffect.trailRenderer.sharedMaterial instanceof se && this._trailEffect.trailRenderer.sharedMaterial.setBendOffset(t)
			}
			if (this.changeBend(this.owner, t), this.changeEffectBend(this._hitEffect, t, !0), this.changeEffectBend(this._pengEffect, t, !0), this.changeEffectBend(this._wudiEffect, t, !0), this._weapon && this._curWeaponId == j.ROCKET_ID) {
				let e = this._weapon.getChildByName("rocket");
				e && this.changeEffectBend(e.getChildByName("trail"), t, !0)
			}
		}
		showWuDiEffect() {
			var e = this.isWuDi;
			if (e && !this._wudiEffect) {
				let e = Laya.Loader.getRes(te.wudi);
				e ? (this._wudiEffect = e, this._wudiEffect.parent != this.owner && (this._wudiEffect.removeSelf(), this.owner.addChild(this._wudiEffect), this.changeEffectMat(this._wudiEffect))) : this._isLoadWuDi || (this._isLoadWuDi = !0, Laya.Sprite3D.load(te.wudi, Laya.Handler.create(this, this.loadWuDiEffectEnd)))
			}
			this._wudiEffect && (this._wudiEffect.active = e, e && (this._wudiEffect.transform.position.x = this.posX + .45, this._wudiEffect.transform.position.y = this.posY - 1.1, this._wudiEffect.transform.position.z = this.posZ + 3, this._wudiEffect.transform.position = this._wudiEffect.transform.position))
		}
		loadWuDiEffectEnd() { }
		set wudiEndTime(e) {
			this._wuDiTimeEnd = e
		}
		get isWuDi() {
			return this._wuDiTimeEnd > 0 && Laya.timer.currTimer <= this._wuDiTimeEnd
		}
		set addSpeedTime(e) {
			this._addSpeedTimeEnd = e
		}
		get isInAddSpeedTime() {
			return this._addSpeedTimeEnd > 0 && Laya.timer.currTimer <= this._addSpeedTimeEnd
		}
		set subSpeedTime(e) {
			this._subSpeedTimeEnd = e
		}
		get isInSubSpeedTime() {
			return this._subSpeedTimeEnd > 0 && Laya.timer.currTimer <= this._subSpeedTimeEnd
		}
		updatePos(e) {
			let t = this._speedZ * e,
				i = this.posY;
			if (this._jumpCtrl && (i = this._jumpCtrl.update(e, i)), this._speedX) {
				this._speedX += this._speedAddX * e;
				let t = this._speedX * e;
				this._moveDiffX += t, (this._desDiffX > 0 && this._moveDiffX > this._desDiffX || this._desDiffX < 0 && this._moveDiffX < this._desDiffX) && (this._moveDiffX = this._desDiffX, this._speedX = 0)
			}
			if (this._speedX1) {
				this._speedX1 += .5 * this._speedAddX * e;
				let t = this._speedX1 * e;
				this._moveDiffX1 += t, (this._desDiffX > 0 && this._moveDiffX1 > this._desDiffX || this._desDiffX < 0 && this._moveDiffX1 < this._desDiffX) && (this._moveDiffX1 = this._desDiffX, this._speedX1 = 0)
			}
			if (!this.isJumping) {
				let e = this._app.sceneRoot.mapMgr.getObstacle(this.posZ, this.posZ + t, this._moveDiffX, i);
				if (e) {
					let t = e.length;
					for (let i = 0; i < t; i++) this.doZhuang(e[i], !0)
				}
				this._app.sceneRoot.foreachPlayers(this, this.posZ, this.posZ + t) && (t = 0)
			}
			this.setOwnerPos(this._moveDiffX, i, this.posZ + t), 0 == this.rotateZ || this._haveRoateTween || this._moveDiffX != this._desDiffX || this.resetTowardAngle()
		}
		setOwnerPos(e, t, i) {
			this.posX = e, this.posY = t, this.posZ = i, this.owner.transform.position.x = this.posX, this.owner.transform.position.y = this.posY, this.owner.transform.position.z = this.posZ, this.owner.transform.position = this.owner.transform.position
		}
		get speedRate() {
			return this._speedRate
		}
		get speedZ() {
			return this._speedZ
		}
		set speedZ(e) {
			this._speedZ = e
		}
		get speedX() {
			return this._speedX
		}
		set speedX(e) {
			this._speedX = e
		}
		get speedX1() {
			return this._speedX1
		}
		set speedX1(e) {
			this._speedX1 = e
		}
		addSpeed(e = 2e3, t = !0) {
			this.addSpeedTime = Laya.timer.currTimer + e, this._needShowSpeedEffect = t
		}
		subSpeed(e = 2e3) {
			this.subSpeedTime = Laya.timer.currTimer + e
		}
		updateMaxSpeed() {
			this.maxSpeed = this.isInAddSpeedTime ? j.SPEED_MAX + j.SPEED_ADD : j.SPEED_MAX
		}
		updateSpeed(e) {
			if (this.updateMaxSpeed(), this._isArrived || this.isDie) {
				let t = this._isMainPlayer ? this._speedZ > this.baseSpeed ? 1.3 : .9 : .7;
				this._speedZ -= this.speedRelasePer1 * e * t, this._speedZ = this._speedZ < 0 ? 0 : this._speedZ
			} else this._jumpCtrl && this._jumpCtrl.isJumping ? this.isInAddSpeedTime && this._speedZ < this.maxSpeed && (this._speedZ += this.speedJumpAddPer * e, this._speedZ > this.maxSpeed && (this._speedZ = this.maxSpeed)) : this.isInAddSpeedTime ? (this._speedZ < this.maxSpeed && (this._speedZ += 3 * this.speedAddPer * e), this._speedZ > this.maxSpeed && (this._speedZ = this.maxSpeed)) : this.touchAddSpeed ? this._speedZ < this.maxSpeed ? (this._speedZ += this.speedAddPer * e, this._speedZ > this.maxSpeed && (this._speedZ = this.maxSpeed)) : this._speedZ > this.maxSpeed && (this._speedZ -= this.speedRelasePer * e, this._speedZ < this.maxSpeed && (this._speedZ = this.maxSpeed)) : this.isInSubSpeedTime ? (this._speedZ > j.SPEED_INIT && (this._speedZ -= this.speedRelasePer * e), this._speedZ < j.SPEED_INIT && (this._speedZ = j.SPEED_INIT)) : this._speedZ > this.baseSpeed ? (this._speedZ -= this.speedRelasePer * e, this._speedZ < this.baseSpeed && (this._speedZ = this.baseSpeed)) : this.running && this._speedZ < this.baseSpeed && (this.speedAddPer1 += this.speedAddPer1 * e / 1e3, this._speedZ += this.speedAddPer1 * e, this._speedZ > this.baseSpeed && (this._speedZ = this.baseSpeed));
			this._speedRate = (this._speedZ - j.SPEED_INIT) / (j.SPEED_MAX - j.SPEED_INIT), this._speedRate = this._speedRate < 0 ? 0 : this._speedRate
		}
		onCollisionEnter(e) {
			if (!e.other) return;
			let t = e.other.owner;
			this.doZhuang(t)
		}
		onTriggerEnter(e) {
			this.doZhuang(e.owner), super.onTriggerEnter(e)
		}
		doZhuang(e, t = !1) {
			if (!e || this._isDie) return;
			let i = e.name,
				n = e.script;
			(i.indexOf("obstacle") >= 0 || i.indexOf("barral") >= 0 || i.indexOf("boxwall") >= 0) && (n && n.fly(this._speedZ, e, 0, !1, i.indexOf("obstacle10") >= 0 ? .3 : .2), this.playCollisionSound()), this._isArrived || (i.indexOf("car") >= 0 ? n && !n.isDied && (this.subHp(!0, de.DEATH_TYPE_CAR), n.fly(this._speedZ, null, 1, !0), this.playCarBaoZhaSound(), this.shock()) : i.indexOf("walker") >= 0 ? n && !n.isDied && (this.subHp(!0, de.DEATH_TYPE_CAR), n.fly(this._speedZ, null, 0, !0), this.shock()) : i.indexOf("accelerator") >= 0 ? "accelerator03" == i || "accelerator04" == i || "accelerator05" == i || "accelerator06" == i ? (this.addSpeed(2e3), this.gotoJump()) : this.addSpeed(1500) : i.indexOf("terminal") >= 0 ? this.arrivalTerminal() : "robot" == i || "role" == i || ("gold" == i ? this.addGold(e) : "rocket" == i && n && n.pickUp()))
		}
		shock() {
			J.I.shock()
		}
		pushToGo(e, t = !0, i = 750) {
			if (this._isBeiPush) return !1;
			if (t && (this.playPengEffect(this._motor, "rearwheelCollider"), this.playCollisionSound()), this._isArrived) this.posZ = this.posZ + 1, e > 0 ? this._moveDiffX -= .1 : e < 0 && (this._moveDiffX += .1), this._moveDiffX > j.MAX_WIDTH ? this._moveDiffX = j.MAX_WIDTH : this._moveDiffX < -j.MAX_WIDTH && (this._moveDiffX = -j.MAX_WIDTH), this.updatePos(0);
			else {
				let t = 1,
					n = 3;
				this._app.sceneRoot.inSlowing && (i /= j.SLOW_BEI), e < 0 ? this.setTowardAngle(-86, t, i, 1, n) : e > 0 ? this.setTowardAngle(-94, -t, i, 1, n) : Q.randomBoolen() ? this.setTowardAngle(-86, t, i) : this.setTowardAngle(-94, -t, i)
			}
			this._isBeiPush = !0, Laya.timer.clear(this, this.reseBeitPushState);
			let n = 100;
			return this._app.sceneRoot.inSlowing && (n /= j.SLOW_BEI), Laya.timer.once(n, this, this.reseBeitPushState), !0
		}
		reseBeitPushState() {
			this._isBeiPush = !1
		}
		get isPush() {
			return this._isPush
		}
		toPush(e = !0) {
			if (this.isArrived) return;
			this._isPush || this.playCollisionSound(), this._isPush = !0, this.stopMoveTurn(), Laya.timer.clear(this, this.resetPushState);
			let t = 100;
			this._app.sceneRoot.inSlowing && (t /= j.SLOW_BEI), Laya.timer.once(t, this, this.resetPushState)
		}
		resetPushState() {
			this._isPush = !1
		}
		playHitEffect(e, t, i = 1e3) {
			if (!this._hitEffect) return;
			Laya.timer.clear(this, this.stopHitEffect);
			let n = this.findChildByName(e, t);
			n ? (this._hitEffect.active = !0, this._hitEffect.transform.position.x = n.transform.position.x, this._hitEffect.transform.position.y = n.transform.position.y, this._hitEffect.transform.position.z = n.transform.position.z, this._hitEffect.transform.position = n.transform.position) : this._hitEffect.active = !1, this.playChildEffect(this._hitEffect, this._hitEffect.active), Laya.timer.once(i, this, this.stopHitEffect)
		}
		stopHitEffect() {
			this._hitEffect && (this._hitEffect.active = !1, this.playChildEffect(this._hitEffect, this._hitEffect.active))
		}
		playPengEffect(e, t, i = 1e3) {
			if (!this._pengEffect) return;
			Laya.timer.clear(this, this.stopPengEffect);
			let n = this.findChildByName(e, t);
			n ? (this._pengEffect.active = !0, this._pengEffect.transform.position.x = n.transform.position.x, this._pengEffect.transform.position.y = n.transform.position.y, this._pengEffect.transform.position.z = n.transform.position.z, this._pengEffect.transform.position = n.transform.position) : this._pengEffect.active = !1, this.playChildEffect(this._pengEffect, this._pengEffect.active), Laya.timer.once(i, this, this.stopPengEffect)
		}
		stopPengEffect() {
			this._pengEffect && (this._pengEffect.active = !1, this.playChildEffect(this._pengEffect, this._pengEffect.active))
		}
		arrivalTerminal() {
			this._isArrived = !0, 0 == this.rotateZ || this._haveRoateTween || this.resetTowardAngle(), this.deathType = de.DEATH_TYPE_NONE
		}
		gotoJump() {
			if (!this._jumpCtrl) return;
			this._jumpCtrl.gotoJump(0, .8, .035)
		}
		addGold(e) { }
		canAttack() {
			return !this.isBeatening && !this._isArrived && (0 == this._attackCD || this._attackCD < Laya.timer.currTimer)
		}
		showEmoji(e) {
			if (this._emojiTimeEnd = Laya.timer.currTimer + 1e3, this._curEmojiId != e) {
				this._curEmojiId = e;
				let t = q.substitute("{0}Assets/Game/Resources/Entities/Information/Texture/emoji{1}.png", te.scpath, e),
					i = Laya.loader.getRes(t);
				i ? this.updateEmojiEnd(i) : Laya.Texture2D.load(t, Laya.Handler.create(this, this.updateEmojiEnd))
			}
		}
		updateEmojiEnd(e) {
			e && this._emoji && (this._emojiMat || (this._emojiMat = new ae(this._emoji.meshRenderer.material)), this._emojiMat.albedoTexture = e, this._emojiMat.cloneMat(this._emoji.meshRenderer.material), this._emojiMat.tilingOffsetX = 4, this._emojiMat.tilingOffsetY = 4, this._emoji.meshRenderer.material = this._emojiMat)
		}
		get isReadyAttack() {
			return this._curAction == j.ACTION_TURN
		}
		addAttackObj(e) {
			this.canAttack() && e && !e.isDie && (this._attackObjs || (this._attackObjs = []), this._attackObjs.push(e))
		}
		doAttack() {
			if (!this._attackObjs || this.isDie) return;
			if (!this.canAttack()) return void (this._attackObjs.length = 0);
			let e, t = this._attackObjs.length,
				i = 3;
			if (this._runToward == he.TOWARD_LEFT)
				for (let n = 0; n < t; n++) {
					let t = this._attackObjs[n];
					if (!t || !t.owner) continue;
					let a = this.posX - t.posX;
					a >= 0 && i > a && (i = a, e = t)
				} else if (this._runToward == he.TOWARD_RIGHT)
				for (let n = 0; n < t; n++) {
					let t = this._attackObjs[n];
					if (!t || !t.owner) continue;
					let a = this.posX - t.posX;
					a <= 0 && i > Math.abs(a) && (i = Math.abs(a), e = t)
				}
			if (!e)
				for (let n = 0; n < t; n++) {
					let t = this._attackObjs[n];
					if (!t || !t.owner) continue;
					let a = Math.abs(this.posX - t.posX);
					i > a && (i = a, e = t)
				}
			e && this.attackStart(e), this._attackObjs.length = 0
		}
		stopMoveTurn() {
			this.rotateZ = 0, this.clearMoveTween(!1, !0), this._moveDiffX != this._moveDiffX1 && !this._haveMoveTween && this._moveTween1 && this._moveTween1.to(this, {
				moveDiffX1: this._moveDiffX
			}, 200, Laya.Ease.circOut), this._isMainPlayer && this._app.tc.setTouchX()
		}
		attackStart(e) {
			if (!e || !this.canAttack() || this.isBeatening) return;
			Laya.timer.clear(this, this.attackEnd), Laya.timer.clear(this, this.playAttackActionEnd), this.stopMoveTurn(), this.isAttacking = !0;
			let t = this.posX - e.posX <= 0,
				i = j.WeaponTemp[this._curWeaponId - 1],
				n = i ? i.motion[Q.randomRange(0, i.motion.length - 1)] : j.ACTION_ATTACK2,
				a = !1;
			(t || n != j.ACTION_ATTACK1 && n != j.ACTION_ATTACK2) && (!t || n != j.ACTION_ATTACK5 && n != j.ACTION_ATTACK6) || (a = !0), a ? (t = !t, -1 != this._player.transform.localScaleX && (this._player.transform.localScaleX = -1)) : 1 != this._player.transform.localScaleX && (this._player.transform.localScaleX = 1), this.setAction(n), this.updateWeaponPos(t ? he.TOWARD_LEFT : he.TOWARD_RIGHT);
			let o = j.ATTACK_DELAY_SET[n],
				s = o[0];
			s = s ? 1e3 * s : 0, this.attackTime = (1e3 * o[1] - s) / j.ATTACK_SPEED + s, s ? Laya.timer.once(s, this, this.attackEnd, [e]) : this.attackEnd(e), Laya.timer.once(this.attackTime, this, this.playAttackActionEnd);
			let r = this._isMainPlayer ? 300 : Q.randomRange(1500, 3e3);
			this._attackCD = Laya.timer.currTimer + this.attackTime + r
		}
		attackEnd(e) {
			e && e.beaten(this.owner, this)
		}
		playAttackActionEnd() {
			this.isAttacking = !1
		}
		addAttackCount(e = 1, t = !1) {
			t && (this.setAniSpeed(j.ATTACK_SPEED), this._app.sceneRoot.slowTime = Laya.timer.currTimer + this.attackTime), this.attackCount++, this.showEmoji(Q.randomRange(8, 15));
			let i = j.ConfigTemp[0];
			this.addGold(i ? i.DefeatPlayerCoinReward : 0)
		}
		beaten(e, t) {
			if (!e || !t || this.isDie || this._isArrived) return;
			let i = e.transform.position.x - this.posX,
				n = e.transform.position.z - this.posZ;
			if (Math.abs(i) > j.ATTACK_DIS_END || Math.abs(n) > j.ATTACK_DIS_Z_END) return;
			i <= 0 ? (this._attackerToward, he.TOWARD_LEFT) : this._attackerToward = he.TOWARD_RIGHT, Laya.timer.clear(this, this.attackEnd), Laya.timer.clear(this, this.playBeatenActionEnd), Laya.timer.clear(this, this.playAttackActionEnd);
			let a = this.curHp <= 1;
			t.addAttackCount(1, a), this.showEmoji(Q.randomRange(0, 7)), this.playHitEffect(this._player, "Bip001 Neck"), this.isAttacking = !1, this._attackObjs && (this._attackObjs.length = 0), J.I.shock(), this._app.sceneRoot.cameraRoot.shock(), a ? this.subHp(!1, de.DEATH_TYPE_AI) : (this.isBeatening = !0, Laya.timer.once(this.beatenTime + 100, this, this.playBeatenActionEnd))
		}
		playBeatenActionEnd(e = de.DEATH_TYPE_AI) {
			this.isBeatening = !1, this.subHp(!1, e)
		}
		playCollisionSound() { }
		playCarBaoZhaSound() { }
		addHp(e = !1, t, i = !1) {
			i ? (this.curHp = this.maxHp, this.resetChildPos(), this.isDie = !1, this._weaponToward = 0, this._app.sceneRoot.slowTime = 0, this._attackObjs && (this._attackObjs.length = 0), this.updateWeaponPos(), this.rotateZ = 0, this.updateAction()) : (this.curHp++, this.curHp > this.maxHp && (this.curHp = this.maxHp))
		}
		subHp(e = !1, t = "none") {
			this.isWuDi || (this.curHp--, (this.curHp <= 0 || e) && (this.deathType = t, this.playDie()))
		}
		get running() {
			return this._running
		}
		set running(e) {
			this._running != e && (e ? (this._running = !0, this.speedAddPer1 = 15e-7) : this._running = !1)
		}
		get isDie() {
			return this._isDie
		}
		set isDie(e) {
			this._isDie = e, e && (this._running = !1)
		}
		findChildByName(e, t) {
			if (!e) return;
			let i;
			if (e.name == t) i = e;
			else {
				let n = e.numChildren;
				for (let a = 0; a < n; a++) {
					let n = e.getChildAt(a);
					if (n) {
						if (n.name == t) {
							i = n;
							break
						}
						if (i = this.findChildByName(n, t)) break
					}
				}
			}
			return i
		}
		updateAction() {
			this.isDie ? this.setAction(j.ACTION_DIE) : this.isBeatening ? this.setAction(j.ACTION_HURT) : this.isRocketFlying ? this.setAction(j.ACTION_ATTACK3_1) : this.isRocketing ? this.setAction(j.ACTION_ATTACK3_0) : this.isAttacking || (this.running ? this.isInAddSpeedTime || this.touchAddSpeed ? this.setAction(j.ACTION_ACCELERATE) : this.setAction(j.ACTION_RUN) : this.setAction(j.ACTION_STAND))
		}
		updateEquipPos() {
			this.isDie || (this._hatPos = this.findChildByName(this._player, "Hat"), this._hatPos ? (this._hat.parent != this._hatPos && (this._hat.removeSelf(), this._hatPos.addChild(this._hat)), this._hat.active = !0, this._hat.transform.position = this._hatPos.transform.position, this._crown && this._crown.active ? (this._crown.transform.position.x = this._hatPos.transform.position.x, this._crown.transform.position.y = this._hatPos.transform.position.y + .4, this._crown.transform.position.z = this._hatPos.transform.position.z - .2, this._crown.transform.position = this._crown.transform.position, this._crown.transform.localRotationEulerY = this._crown.transform.localRotationEulerY + 5) : this._rankObj && this._rankObj.active && (this._rankObj.transform.position.x = this._hatPos.transform.position.x, this._rankObj.transform.position.y = this._hatPos.transform.position.y + .5, this._rankObj.transform.position.z = this._hatPos.transform.position.z - .2, this._rankObj.transform.position = this._rankObj.transform.position)) : this._hat.active = !1, this._weapon && this._curWeaponId && (this._curWeaponId == j.ROCKET_ID ? (this._weaponPosR = this.findChildByName(this._player, "weaponR"), this.updateWeaponPos(he.TOWARD_RIGHT)) : (this._weaponPosL = this.findChildByName(this._player, "weaponL"), this._weaponPosR = this.findChildByName(this._player, "weaponR"), this.updateWeaponPos(this._weaponToward ? this._weaponToward : Q.randomRange(he.TOWARD_LEFT, he.TOWARD_RIGHT)))))
		}
		setAction(e) {
			if (this._curAction == e) return;
			let t = this._curAction;
			this._curAction = e;
			let i = "stand",
				n = .2,
				a = 1;
			switch (t == j.ACTION_TURN && (n = this.turnTime / 1e3), this._curAction) {
				case j.ACTION_RUN:
					i = "run", n = .5;
					break;
				case j.ACTION_ACCELERATE:
					i = "accelerated_run", n = .5;
					break;
				case j.ACTION_TURN:
					i = "turn";
					break;
				case j.ACTION_HURT:
					i = "hurt", a = .7;
					break;
				case j.ACTION_ATTACK1:
					i = "attack01";
					break;
				case j.ACTION_ATTACK2:
					i = "attack02";
					break;
				case j.ACTION_ATTACK5:
					i = "attack05";
					break;
				case j.ACTION_ATTACK6:
					i = "attack06";
					break;
				case j.ACTION_ATTACK3_0:
					i = "attack03_start";
					break;
				case j.ACTION_ATTACK3_1:
					i = "attack03_attack";
					break;
				case j.ACTION_DIE:
					i = "die", a = .5
			}
			this.playAnimation(i, n, a)
		}
		playAnimation(e, t = .2, i = 1) {
			this._animator && (this._animator.speed = i, this._animator.crossFade(e, t))
		}
		stopAnimation() {
			this._animator && (this._animator.speed = 0)
		}
		setAniSpeed(e) {
			this._animator && (this._animator.speed = e)
		}
		playDie() {
			this.isDie = !0, this.isAttacking = this.isBeatening = !1, this.stopMoveTurn(), this.updateAction(), this._crown && (this._crown.active = !1), this._rankObj && (this._rankObj.active = !1), this.resetChildPos();
			let e = this._speedZ * Q.randomFloatRange(.4, .7),
				t = Q.randomBoolen() ? -1 : 1;
			this._playerFly && this._playerFly.playDrop(1.5, e, Q.randomFloatRange(.002, .003), 0, 0, t, !1), t = 0 == t ? 0 : -t, this._motorFly && this._motorFly.playDrop(.8, Q.randomFloatRange(.004, .008), Q.randomFloatRange(0, .001), 2, t < 0 ? 50 : -50, t), this._hat.removeSelf(), this.owner.addChild(this._hat), this._hatFly && this._hatFly.playDrop(1, e, Q.randomFloatRange(.003, .004), 2, 50, Q.randomRange(-1, 1)), this._weapon.removeSelf(), this.owner.addChild(this._weapon), this._weapon.transform.position = this._weapon.transform.position, this._weaponFly && this._weaponFly.playDrop(1, e, Q.randomFloatRange(.003, .004), 2, 50, Q.randomRange(-1, 1)), this._speedZ = j.SPEED_INIT, Laya.timer.once(1500, this, () => {
				this._playerFly && (this._playerFly.isStop = !0)
			})
		}
		freeRotate(e, t) {
			if (!e || !t) return;
			let i = this.getRidFromBody(e),
				n = this.getRidFromBody(t);
			if (i && n) {
				var a = e.addComponent(Laya.ConfigurableConstraint);
				a.setConnectRigidBody(i, n), a.anchor = new Laya.Vector3(0, -1, 0), a.connectAnchor = new Laya.Vector3(0, 1, 0), a.XMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED, a.YMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED, a.ZMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED, a.angularXMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE, a.angularYMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE, a.angularZMotion = Laya.ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE, n.angularVelocity = new Laya.Vector3(20, 2, 10)
			}
		}
		getRidFromBody(e) {
			let t, i = e._components,
				n = i ? i.length : 0;
			for (let e = 0; e < n; e++) {
				let n = i[e];
				if (n && n instanceof Laya.Rigidbody3D) {
					t = n;
					break
				}
			}
			return t
		}
		destory() {
			this.running = !1, this.owner && (this.owner.active = !0)
		}
	}
	he.TOWARD_UP = 0, he.TOWARD_LEFT = 1, he.TOWARD_RIGHT = 2;
	class ce {
		constructor(e, t) {
			this.type = e, this.data = t
		}
	}
	ce.SPEED_CHANGE = "speedchange", ce.LIFE_CHANGE = "lifechange", ce.PASS_CHANGE = "passchang", ce.SCORE_CHANGE = "scorechang", ce.GAME_SCORE = "gamescore", ce.WEAPON_CHANGE = "weaponchange", ce.MOTO_CHANGE = "motochange", ce.MAP_CHANGE = "mapchange", ce.MONEY_CHANGE = "moneychange", ce.ATTACK_CHANGE = "attackchange", ce.BOSSHP_CHANGE = "bosshpchange", ce.GAME_START = "GAME_START";
	class pe {
		constructor(e, t = !1) {
			this._x = 0, this._y = 0, this._z = 0, this._initX = 0, this._initY = 0, this._initZ = 0, this.chaX = 0, this.chaY = 0, this.chaZ = 0, this._roateZ = 0, this._roateX = 0, this._roateY = 0, this.isPlaying = !1, this.needRoate = !1, this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.speedAddX = 0, this.speedAddY = 0, this.speedAddZ = 0, this.targetX = 0, this.targetY = 0, this.targetMinY = 0, this.targetZ = 0, this.targetRX = 0, this.targetRY = 0, this.targetRZ = 0, this.speedSubY = 0, this.speedSubY1 = 0, this._isLocal = !1, this._dz = 0, this._dx = 0, this._speedDx = 0, this._isLocal = t, this._target = e, this._isLocal ? (this._initX = this._x = this._target.transform.localPosition.x, this._initY = this._y = this._target.transform.localPosition.y, this._initZ = this._z = this._target.transform.localPosition.z) : (this._initX = this._x = this._target.transform.position.x, this._initY = this._y = this._target.transform.position.y, this._initZ = this._z = this._target.transform.position.z), this._roateX = this._target.transform.localRotationEulerX, this._roateY = this._target.transform.localRotationEulerY, this._roateZ = this._target.transform.localRotationEulerZ
		}
		get initY() {
			return this._initY
		}
		get x() {
			return this._x
		}
		set x(e) {
			this._x = e, this._isLocal ? (this._target.transform.localPosition.x = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.x = e, this._target.transform.position = this._target.transform.position)
		}
		get y() {
			return this._y
		}
		set y(e) {
			this._y = e, this._isLocal ? (this._target.transform.localPosition.y = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.y = e, this._target.transform.position = this._target.transform.position)
		}
		get z() {
			return this._z
		}
		set z(e) {
			this._z = e, this._isLocal ? (this._target.transform.localPosition.z = e, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.z = e, this._target.transform.position = this._target.transform.position)
		}
		get roateX() {
			return this._roateX
		}
		set roateX(e) {
			this._roateX = e, this._target.transform.localRotationEulerX = e
		}
		get roateZ() {
			return this._roateZ
		}
		set roateZ(e) {
			this._roateZ = e, this._target.transform.localRotationEulerZ = e
		}
		get roateY() {
			return this._roateY
		}
		set roateY(e) {
			this._roateY = e, this._target.transform.localRotationEulerY = e
		}
		setValue(e, t, i) {
			this._x = e, this._y = t, this._z = i, this._isLocal ? (this._target.transform.localPosition.x = this._x, this._target.transform.localPosition.y = this._y, this._target.transform.localPosition.z = this._z, this._target.transform.localPosition = this._target.transform.localPosition) : (this._target.transform.position.x = this._x, this._target.transform.position.y = this._y, this._target.transform.position.z = this._z, this._target.transform.position = this._target.transform.position)
		}
		reset() {
			this.isPlaying = !1, this.needRoate = !1, this.setValue(this._initX, this._initY, this._initZ)
		}
		update(e) {
			if (this.isPlaying && this._target) {
				let t = 0 == this.speedZ,
					i = 0 == this.speedY,
					n = 0 == this.speedX;
				if (this._follow && this.updateFllowPos(), this.speedX) {
					let t = this.x;
					if (t += e * this.speedX, this.x = t, this._follow) {
						(n = Math.abs(t - this.targetX) <= .8) && (this.speedX = 0)
					} else n = this.targetX < 0 ? t <= this.targetX : !(this.targetX > 0) || t >= this.targetX
				}
				if (this.speedZ) {
					let i = this.z;
					this._follow && i >= this.targetZ ? (this.z = this.targetZ, t = !0) : (i += e * this.speedZ, this.z = i, t = this.speedZ > 0 ? i >= this.targetZ : i <= this.targetZ)
				}
				if (this.speedY) {
					let t = this.y;
					this.speedAddY += this.speedSubY1 * e, this.speedY += this.speedAddY * e, t += e * this.speedY, this.targetY > 0 && t >= this.targetY ? (this.speedSubY1 = -3e-6, this.targetY = this.targetMinY, this.speedAddY = this.speedSubY) : this.targetY == this.targetMinY && t <= this.targetY && (this.y = t = this.targetMinY, i = !0), this.y = t
				}
				if (i && t && n && (this.speedX = 0, this.speedY = 0, this.speedZ = 0, this.isPlaying = !1, this.needRoate = !1, this._caller && this._callFun && this._callFun.call(this._caller, this._target)), this.needRoate)
					if (this._follow) {
						if (this._target.transform.localRotationEulerX += e, this._rocket) {
							let t = e * this._speedDx;
							this._dx += t, this._dx <= 5 && (this._rocket.transform.position.x = this._rocket.transform.position.x + t, this._rocket.transform.position = this._rocket.transform.position), this._speedDx += 1e-4 * e
						}
					} else this._roateTarget && (this._roateTarget.transform.localRotationEulerX += 5)
			}
		}
		play2(e, t, i, n = !0, a, o, s = 0) {
			this._target && i && (this.needRoate = !0, this._caller = a, this._callFun = o, this._follow = i, this.isPlaying || (this.isPlaying = !0, this._dz = s, this._dx = 0, this._speedDx = 0, this.speedY = t, this.speedZ = e, this.speedAddY = -5e-6, this.speedSubY = -1e-5, this.targetMinY = .05, this._rocket = this._target.getChildByName("rocket"), this.updateFllowPos()))
		}
		updateFllowPos() {
			if (!this._follow) return;
			this.targetX = this._follow.transform.position.x, this.targetY = this._follow.transform.position.y, this.targetZ = this._follow.transform.position.z + this._dz;
			let e = this.targetX - this.x;
			this.speedX = e / 500
		}
		play3(e, t = !0, i = null, n, a, o = !1) {
			if (!this._target) return;
			if (this.needRoate = t, this._caller = n, this._callFun = a, this.isPlaying) return;
			this.isPlaying = !0, this.targetX = e.x, this.targetY = e.y, this.targetZ = e.z, this.targetY = this.targetMinY = .45;
			let s = o ? 1200 : 1800;
			this.speedX = (this.targetX - this.x) / (s * (o ? .55 : .75)), this.speedY = (this.targetY - this.y) / (s * (o ? .25 : .5)), this.speedZ = (this.targetZ - this.z) / s, this.speedAddY = -9e-6, this.speedSubY = -9e-6, i && i.length ? this._roateTarget = this._target.getChildByName(i) : this._roateTarget = null
		}
	}
	class ge extends he {
		constructor() {
			super(), this._isLoadBaoZhaEffect = !1, this._isLoadSuccEffect = !1
		}
		initialize(e) {
			super.initialize(e), this.curHp = this.maxHp, Ni.evt.addEventListener(ce.MOTO_CHANGE, this.onUpdateMoto, this), Ni.evt.addEventListener(ce.WEAPON_CHANGE, this.onUpdateWeapon, this), this.updateMoto(), this.updateWeapon(), this.updateSuit(this._curSuitId), this.updateHat(this._curHatId), this.owner.addChild(this._trailEffect), this._hitEffect && (this.playHitEffect(this._player, "Bip001 Neck", 600), this._hitEffect.transform.position.x = 0, this._hitEffect.transform.position.y = 0, this._hitEffect.transform.position.z = -10, this._hitEffect.transform.position = this._hitEffect.transform.position), this._pengEffect && (this.playPengEffect(this._motor, "rearwheelCollider", 600), this._pengEffect.transform.position.x = 0, this._pengEffect.transform.position.y = 0, this._pengEffect.transform.position.z = -10, this._pengEffect.transform.position = this._pengEffect.transform.position)
		}
		destory() {
			Ni.evt.removeEventListener(ce.MOTO_CHANGE, this.onUpdateMoto, this), Ni.evt.removeEventListener(ce.WEAPON_CHANGE, this.onUpdateWeapon, this), super.destory()
		}
		onUpdateMoto(e) {
			let t = e.data.id;
			e.data.free || (J.I.moto = t), this.updateMoto(t)
		}
		updateMoto(e = 0) {
			e || (e = J.I.moto), super.updateMoto(e)
		}
		onUpdateWeapon(e) {
			let t = e.data.id;
			e.data.free || (J.I.weapon = t), this.updateWeapon(t)
		}
		updateWeapon(e = 0) {
			e || this._app.sceneRoot.isBossGuan || (e = J.I.weapon), super.updateWeapon(e)
		}
		pickUpRocket() {
			this.isRocketing || this.isRocketFlying || this.isBeatening || this.isDie || (this.isRocketing = !0, this.updateWeapon(j.ROCKET_ID), Laya.timer.once(800, this, this.sendRocket), J.I.playSound("getdiamond.mp3"))
		}
		sendRocket() {
			this.isRocketing = !1, this.isRocketFlying = !0, Laya.timer.once(200, this, this.rocketFlyStart), J.I.playSound("bazookashoot.mp3")
		}
		rocketFlyStart() {
			let e = this._weapon.getChildByName("rocket");
			if (e) {
				let t = e.getChildByName("trail");
				t && (t.active = !0, t.particleSystem && !t.particleSystem.isPlaying && t.particleSystem.play()), e.transform.position.x = this._weapon.transform.position.x, e.transform.position.y = this._weapon.transform.position.y, e.transform.position.z = this._weapon.transform.position.z, e.transform.position = e.transform.position
			}
			this._weapon.tweenPos ? this._weapon.tweenPos.setValue(this._weapon.transform.position.x, this._weapon.transform.position.y, this._weapon.transform.position.z) : this._weapon.tweenPos = new pe(this._weapon), this._weapon.tweenPos.play2(1.5 * this.maxSpeed, 0, this._app.sceneRoot.mapMgr.bossObj ? this._app.sceneRoot.mapMgr.bossObj.owner : null, !1, this, this.rocketFlyEnd, -4)
		}
		rocketFlyEnd(e = !0) {
			this.isRocketFlying = !1, this.isRocketing = !1;
			let t = this._weapon.getChildByName("rocket");
			if (t) {
				let e = t.getChildByName("trail");
				e && (e.particleSystem && e.particleSystem.stop(), e.active = !1), t.transform.position.x = this._weapon.transform.position.x, t.transform.position.y = this._weapon.transform.position.y, t.transform.position.z = this._weapon.transform.position.z, t.transform.position = this._weapon.transform.position
			}
			this.updateWeapon(0), e && this._app.sceneRoot.mapMgr.bossObj && this._app.sceneRoot.mapMgr.bossObj.hit()
		}
		updateWeaponPos(e = 0) {
			this._curAction == j.ROCKET_ID && this.isRocketFlying || super.updateWeaponPos(e)
		}
		beatenByBomb() {
			if (this.isWuDi) return;
			(this.isRocketing || this.isRocketFlying) && (Laya.timer.clear(this, this.sendRocket), Laya.timer.clear(this, this.rocketFlyStart), this.rocketFlyEnd(!1)), this.playBaoZhaEfffect(), J.I.shock(), this._app.sceneRoot.cameraRoot.shock(), this.curHp <= 1 ? this.subHp(!1, de.DEATH_TYPE_BOSS) : (this.isBeatening = !0, Laya.timer.once(this.beatenTime + 100, this, this.playBeatenActionEnd, [de.DEATH_TYPE_BOSS]))
		}
		playBaoZhaEfffect(e = !0) {
			this._baoZhaEffect ? (Laya.timer.clear(this, this.clearBaoZhaEffect), this.playChildEffect(this._baoZhaEffect, !0), this._baoZhaEffect.parent || this.owner.addChild(this._baoZhaEffect), this._baoZhaEffect.transform.position.x = this.owner.transform.position.x + .2, this._baoZhaEffect.transform.position.y = this.owner.transform.position.y + .3, this._baoZhaEffect.transform.position.z = this.owner.transform.position.z, this._baoZhaEffect.transform.position = this._baoZhaEffect.transform.position, Laya.timer.once(2e3, this, this.clearBaoZhaEffect)) : this._isLoadBaoZhaEffect || (this._isLoadBaoZhaEffect = !0, Laya.Sprite3D.load(te.scpath + "baozha02.lh", Laya.Handler.create(this, this.loadBaoZhaEffectEnd, [e])))
		}
		loadBaoZhaEffectEnd(e = !0) {
			this._baoZhaEffect = Laya.loader.getRes(te.scpath + "baozha02.lh"), this._baoZhaEffect && (this._baoZhaEffect.removeSelf(), this.playBaoZhaEfffect(e))
		}
		clearBaoZhaEffect() {
			this._baoZhaEffect && (this.playChildEffect(this._baoZhaEffect, !1), this._baoZhaEffect.removeSelf())
		}
		updateSpeed(e) {
			super.updateSpeed(e)
		}
		addSpeed(e = 2e3, t = !0) {
			super.addSpeed(e, t), t && J.I.playSound("accelerators.mp3")
		}
		addHp(e = !1, t, i = !1) {
			super.addHp(e, t, i), i && (this.isRocketFlying || this.isRocketing) && (Laya.timer.clear(this, this.sendRocket), Laya.timer.clear(this, this.rocketFlyStart), this.rocketFlyEnd(!1)), t && (t.active = !1);
			let n = new Laya.Vector4,
				a = this._app.sceneRoot.camera;
			a.viewport.project(this.owner.transform.position, a.projectionViewMatrix, n), Ni.evt.dispatchEvent(new ce(ce.LIFE_CHANGE, {
				hp: this.curHp,
				maxHp: this.maxHp,
				music: e,
				pos: n
			}))
		}
		relive(e, t) {
			let i = Laya.timer.currTimer;
			t && (this.wudiEndTime = i + t), e && (this.addSpeedTime = i + e), this._attackObjs && (this._attackObjs.length = 0), this.posZ += 2
		}
		subHp(e = !1, t = "none") {
			this._app.sceneRoot.isGameSucc || this.isWuDi || (super.subHp(e, t), this.isDie || J.I.playSound("hurt.mp3"), Ni.evt.dispatchEvent(new ce(ce.LIFE_CHANGE, {
				hp: this.curHp,
				maxHp: this.maxHp,
				music: !1
			})))
		}
		attackEnd(e) {
			e && (super.attackEnd(e), J.I.playSound("kick.mp3"))
		}
		addGold(e) {
			super.addGold(e), e instanceof Laya.Sprite3D ? (e.active = !1, this.eatGold(Q.randomRange(5, 10))) : e && this.eatGold(e)
		}
		eatGold(e) {
			if (!e) return;
			J.I.playSound("levelgetcoin.mp3"), J.I.makemoney += e;
			let t = new ce(ce.MONEY_CHANGE),
				i = this._app.sceneRoot.camera,
				n = new Laya.Vector4;
			i.viewport.project(this.owner.transform.position, i.projectionViewMatrix, n), t.data = {
				pos: n,
				add: e
			}, Ni.evt.dispatchEvent(t)
		}
		Update(e, t) {
			super.Update(e, t), this.showSpeedEffect(this.running && !this._app.sceneRoot.showAddEffect), this.showTrail(!this.isJumping && this.running && 0 != this.rotateZ), this._effectSucc && this._effectSucc.parent && (this._effectSucc.transform.position.x = this.posX, this._effectSucc.transform.position.y = this.posY - 1, this._effectSucc.transform.position.z = this.posZ - 1, this._effectSucc.transform.position = this._effectSucc.transform.position), this.isRocketFlying && this._curWeaponId == j.ROCKET_ID && this._weapon && this._weapon.tweenPos && this._weapon.tweenPos.update(e)
		}
		shock() {
			super.shock(), this._app.sceneRoot.cameraRoot.shock()
		}
		pushToGo(e, t = !0, i = 750) {
			return !this.isArrived && !this._isBeiPush && super.pushToGo(e, t, i)
		}
		arrivalTerminal() {
			this._isArrived || (super.arrivalTerminal(), J.I.playSound("blast.mp3"), Laya.timer.clear(this, this.playSuccEfffect), Laya.timer.once(1e3, this, this.playSuccEfffect), Laya.timer.clear(this, this.doGameEnd), Laya.timer.once(1500, this, this.doGameEnd, [!0]))
		}
		playSuccEfffect() {
			if (!this._effectSucc) return void (this._isLoadSuccEffect || (this._isLoadSuccEffect = !0, Laya.Sprite3D.load(te.scpath + "victory.lh", Laya.Handler.create(this, this.loadSuccEffectEnd))));
			Laya.timer.clear(this, this.clearSuccEffect), this._effectSucc.transform.position.x = this.posX, this._effectSucc.transform.position.y = this.posY - 1, this._effectSucc.transform.position.z = this.posZ - 1, this._effectSucc.transform.position = this._effectSucc.transform.position;
			let e = this._effectSucc.numChildren;
			for (let t = 0; t < e; t++) {
				let e = this._effectSucc.getChildAt(t);
				e && e.particleSystem.play()
			}
			this._effectSucc.parent || this._app.sceneRoot.obstacleLayer.addChild(this._effectSucc), Laya.timer.once(2e3, this, this.clearSuccEffect)
		}
		loadSuccEffectEnd() {
			this._effectSucc = Laya.loader.getRes(te.scpath + "victory.lh"), this._effectSucc && this.playSuccEfffect()
		}
		clearSuccEffect() {
			if (!this._effectSucc) return;
			let e = this._effectSucc.numChildren;
			for (let t = 0; t < e; t++) {
				let e = this._effectSucc.getChildAt(t);
				e && e.particleSystem.stop()
			}
			this._effectSucc.removeSelf()
		}
		playDie() {
			this.isDie || (this._app.sceneRoot.slowTime = Laya.timer.currTimer + 500, super.playDie(), Laya.timer.clear(this, this.doGameEnd), Laya.timer.once(1500, this, this.doGameEnd, [!1]), this.maxSpeed = j.SPEED_MAX, this._app.sceneRoot.showAddEffect = !1, this.showSpeedAddEffect(!1), J.I.playSound("dead.mp3"))
		}
		doGameEnd(e) {
			this._app.sceneRoot.gameEnd(e)
		}
		playCollisionSound() {
			J.I.playSound("motorcollision.mp3")
		}
		playCarBaoZhaSound() {
			J.I.playSound("carexplosion.mp3")
		}
		set rotateY(e) {
			this.owner.transform.localRotationEulerY = e
		}
		get rotateY() {
			return this.owner.transform.localRotationEulerY
		}
		reset() {
			(this.isRocketFlying || this.isRocketing) && (Laya.timer.clear(this, this.sendRocket), Laya.timer.clear(this, this.rocketFlyStart), this.rocketFlyEnd(!1)), super.reset(), this.updateMoto(J.I.moto), this.updateWeapon(J.I.weapon)
		}
	}
	class me extends ee {
		constructor() {
			super()
		}
		init(e) {
			super.init(e)
		}
		updateOwner(e, t) {
			if (super.updateOwner(e, t), !this.owner) return;
			let i = this.owner.getComponent(ge);
			this._playerScript && i ? this._playerScript = i : this._playerScript = this.owner.addComponent(ge);
			for (let e in t) this._playerScript[e] = t[e]
		}
		get playerScript() {
			return this._playerScript || (this._playerScript = this.owner.getComponent(ge), !this._playerScript && (this._playerScript = this.owner.addComponent(ge))), this._playerScript
		}
		destroy() {
			this._playerScript && (this.owner.destroyed, this._playerScript.destory(), this._playerScript = null), super.destroy()
		}
	}
	class ue extends Laya.Script3D {
		constructor() {
			super(), this._initFieldV = 0, this._initFieldVStart = 0, this._initFieldVEnd = 0, this.disPlayerZ = 0, this.disPlayerY = 0, this.disPlayerX = 0, this._roateStartX = 0, this._roateStartY = 0, this._roateStartZ = 0, this._roateEndX = 0, this._roateEndY = 0, this._roateEndZ = 0, this._roateX = 0, this._roateY = 0, this._roateZ = 0, this._isChangeState = 0, this.shockX = 0, this.shockY = 0, this._shockXCount = 0, this._shockYCount = 0
		}
		set targetPos(e) {
			this._targetPos = e, this.disPlayerY = this._targetPos.y - this._startPos.y, this.disPlayerZ = this._targetPos.z - this._startPos.z, this.disPlayerX = this._targetPos.x - this._startPos.x, this.changeCamera(!0)
		}
		get initFieldV() {
			return this._initFieldV
		}
		set initFieldV(e) {
			this._initFieldV = e, this._sceneRoot.app.isPause && this.update()
		}
		get roateX() {
			return this._roateX
		}
		set roateX(e) {
			this._owner && (this._roateX = e, this._owner.transform.localRotationEulerX = e)
		}
		get roateY() {
			return this._roateY
		}
		set roateY(e) {
			this._owner && (this._roateY = e, this._owner.transform.localRotationEulerY = e)
		}
		get roateZ() {
			return this._roateZ
		}
		set roateZ(e) {
			this._owner && (this._roateZ = e, this._owner.transform.localRotationEulerZ = e)
		}
		init(e, t, i) {
			this._sceneRoot || (this._sceneRoot = e), this._owner = t, i.removeSelf(), t.transform.localRotationEulerY = 195, t.transform.position.x = t.transform.position.x - 2.5, t.transform.position = t.transform.position, i.transform.localRotationEulerY = 184, i.transform.localRotationEulerX = -23, i.transform.position.x = i.transform.position.x - 1, i.transform.position.y = i.transform.position.y + 3.3, i.transform.position = i.transform.position, this._startPos = t.transform.position.clone(), this._endPos = i.transform.position.clone(), this._roateX = this._roateStartX = t.transform.localRotationEulerX, this._roateY = this._roateStartY = t.transform.localRotationEulerY, this._roateZ = this._roateStartZ = t.transform.localRotationEulerZ, this._roateEndX = i.transform.localRotationEulerX, this._roateEndY = i.transform.localRotationEulerY, this._roateEndZ = i.transform.localRotationEulerZ, this.initFieldV = this._initFieldVStart = t.fieldOfView, i.fieldOfView = 43, this._initFieldVEnd = i.fieldOfView, this.changeCamera(!0)
		}
		reset() {
			this.resetSubFieldV(), this.changeCamera(!0)
		}
		changeCamera(e, t, i) {
			if (this._owner && this._targetPos)
				if (Laya.Tween.clearAll(this), e) {
					if (this.initFieldV == this._initFieldVStart) return;
					this._isChangeState = 2;
					let e = this._targetPos.y - this._startPos.y,
						t = this._targetPos.z - this._startPos.z,
						i = this._targetPos.x - this._startPos.x,
						n = this._sceneRoot.app.isPause ? 200 : 250;
					Laya.Tween.to(this, {
						initFieldV: this._initFieldVStart,
						disPlayerY: e,
						disPlayerZ: t,
						disPlayerX: i,
						roateX: this._roateStartX,
						roateY: this._roateStartY,
						roateZ: this._roateStartZ
					}, n, null, Laya.Handler.create(this, this.update))
				} else {
					if (this.initFieldV == this._initFieldVEnd) return;
					this._isChangeState = 1
				}
		}
		update(e = 0) {
			if (!this._sceneRoot.mainPlayer || !this._owner || !this._targetPos) return;
			if (1 == this._isChangeState) {
				let t = this._targetPos.y - this._endPos.y,
					i = this._targetPos.z - this._endPos.z,
					n = this._targetPos.x - this._endPos.x,
					a = this._targetPos.y - this._startPos.y,
					o = this._targetPos.z - this._startPos.z,
					s = this._targetPos.x - this._startPos.x,
					r = this._roateEndX,
					l = this._roateEndY,
					d = this._roateEndZ,
					h = this._initFieldVEnd,
					c = 0,
					p = 1500,
					g = Math.abs(this._roateStartX - r) / p,
					m = this.roateX;
				m < r ? ((m += g * e) > r && (m = r, c++), this.roateX = m) : m > r && ((m -= g * e) < r && (m = r, c++), this.roateX = m);
				let u = Math.abs(this._roateStartY - l) / p,
					f = this.roateY;
				f < l ? ((f += u * e) > l && (f = l, c++), this.roateY = f) : f > l && ((f -= u * e) < l && (f = l, c++), this.roateY = f);
				let _ = Math.abs(this._roateStartZ - d) / p,
					y = this.roateZ;
				y < d ? ((y += _ * e) > d && (y = d, c++), this.roateZ = y) : y > d && ((y -= _ * e) < d && (y = d, c++), this.roateZ = y);
				let I = Math.abs(this._initFieldVStart - h) / p,
					w = this.initFieldV;
				w < h ? ((w += I * e) > h && (w = h, c++), this.initFieldV = w) : w > h && ((w -= I * e) < h && (w = h, c++), this.initFieldV = w);
				let S = Math.abs(s - n) / p;
				this.disPlayerX < n ? (this.disPlayerX += S * e, this.disPlayerX > n && (this.disPlayerX = n, c++)) : this.disPlayerX > n && (this.disPlayerX -= S * e, this.disPlayerX < n && (this.disPlayerX = n, c++));
				let v = Math.abs(a - t) / p;
				this.disPlayerY < t ? (this.disPlayerY += v * e, this.disPlayerY > t && (this.disPlayerY = t, c++)) : this.disPlayerY > t && (this.disPlayerY -= v * e, this.disPlayerY < t && (this.disPlayerY = t, c++));
				let E = Math.abs(o - i) / p;
				this.disPlayerZ < t ? (this.disPlayerZ += E * e, this.disPlayerZ > t && (this.disPlayerZ = t, c++)) : this.disPlayerZ > i && (this.disPlayerZ -= E * e, this.disPlayerZ < i && (this.disPlayerZ = i, c++)), c >= 7 && (this._isChangeState = 0)
			}
			let t = this._sceneRoot.mainPlayer.playerScript.speedRate;
			this._sceneRoot.app.tc.updateSmart(t), this._owner.fieldOfView = this.initFieldV + 30 * t;
			let i = this._sceneRoot.mainPlayer.playerScript.posX1 - this.disPlayerX + this.shockX,
				n = this._sceneRoot.mainPlayer.playerScript.posZ - this.disPlayerZ,
				a = this._sceneRoot.mainPlayer.playerScript.posY - this.disPlayerY + this.shockY;
			this.setOwnerPos(i, a, n)
		}
		resetSubFieldV() {
			this.clearShock(), this.update()
		}
		shock(e = 6, t = .1) {
			this._shockXCount = e, this.toShockX(Q.randomBoolen() ? -t : t);
			let i = .5 * t;
			this._shockYCount = e / 2, this.toShockY(Q.randomBoolen() ? -i : i)
		}
		toShockX(e) {
			this._shockXCount < 0 || (this._tweenX ? this._tweenX.clear() : this._tweenX = new Laya.Tween, 0 == this._shockXCount && (e = 0), this._tweenX.to(this, {
				shockX: e
			}, 50, null, Laya.Handler.create(this, this.toShockX, [-e])), this._shockXCount--)
		}
		toShockY(e) {
			this._shockYCount < 0 || (this._tweenY ? this._tweenY.clear() : this._tweenY = new Laya.Tween, 0 == this._shockYCount && (e = 0), this._tweenY.to(this, {
				shockY: e
			}, 100, null, Laya.Handler.create(this, this.toShockY, [-e])), this._shockYCount--)
		}
		clearShock() {
			this._shockXCount = this._shockYCount = 0, this._tweenX && this._tweenX.clear(), this._tweenY && this._tweenY.clear(), this.shockX = this.shockY = 0
		}
		setOwnerPos(e, t, i) {
			this._owner && (this._owner.transform.position.x = e, this._owner.transform.position.y = t, this._owner.transform.position.z = i, this._owner.transform.position = this._owner.transform.position)
		}
		destory() { }
	}
	class fe {
		constructor(e) {
			this._albedoColor = new Laya.Vector4, this._offsetX = 0, this._offsetY = 0, this._isLoad = !1, this.obstacleWidth = .3, this.obstacleHeight = .3, this.obstacleZ = .3, this._inpool = !1, this._isInit = !1, this._isShow = !1, this.poolName = "BaseBuilder", this._sceneRoot = e
		}
		get owner() {
			return this._owner
		}
		intoPool(...e) {
			this._owner && (this._owner.active = !1), this._inpool = !0, this.hide()
		}
		outPool(...e) {
			this._sceneRoot = e[0][0], this._owner && (this._owner.active = !0), this._inpool = !1
		}
		setOffset(e, t, i) {
			this._offsetX = e, this._offsetY = t, this._startZ = i, this.setPos(this._offsetX, this._offsetY, this._startZ)
		}
		set offsetX(e) {
			this._offsetX = e
		}
		get offsetX() {
			return this._offsetX
		}
		get startZ() {
			return this._startZ
		}
		show() {
			this._isShow = !0
		}
		hide() {
			this._owner && this._owner.removeSelf(), this._isShow = !1
		}
		setAlbedoColor(e) {
			e.cloneTo(this._albedoColor), this._owner && this._owner.meshRenderer.material instanceof ae && (this._owner.meshRenderer.material.albedoColor = this._albedoColor)
		}
		init(e) {
			let t = !1;
			this._url != e && (this._url = e, t = !0), this._owner && t && this._owner.removeSelf(), this.onCreate()
		}
		onCreate() {
			this._isLoad = !1, !this._url || "" == this._url || Laya.Loader.getRes(this._url) ? this.onLoad() : Laya.Sprite3D.load(this._url, Laya.Handler.create(this, this.onLoad))
		}
		onLoad() {
			this._isLoad = !0, this.builder(), this._isShow ? this.show() : this.hide()
		}
		builder() { }
		updateBlendOffset(e) {
			this._isShow && this.changeBend(this._owner, e)
		}
		changeMat(e) {
			if (e.meshRenderer) {
				let t = e.meshRenderer.material instanceof ae ? e.meshRenderer.material : new ae(e.meshRenderer.material);
				if (t.albedoTexture = e.meshRenderer.material.albedoTexture, t.cloneMat(e.meshRenderer.material), e.meshRenderer.material = t, e.meshRenderer.material1) {
					let t = e.meshRenderer.material1 instanceof ae ? e.meshRenderer.material1 : new ae(e.meshRenderer.material1);
					t.albedoTexture = e.meshRenderer.material1.albedoTexture, t.cloneMat(e.meshRenderer.material1), e.meshRenderer.material1 = t
				}
			} else if (e.skinnedMeshRenderer) {
				let t = e.skinnedMeshRenderer.material instanceof ae ? e.skinnedMeshRenderer.material : new ae;
				t.albedoTexture = e.skinnedMeshRenderer.material.albedoTexture, t.cloneMat(e.skinnedMeshRenderer.material), e.skinnedMeshRenderer.material = t
			} else if (e.particleRenderer) {
				let t = new oe;
				t.texture = e.particleRenderer.material.texture, t.cloneMat(e.particleRenderer.material), e.particleRenderer.material = t
			}
			let t = e.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = e.getChildAt(i);
					t && this.changeMat(t)
				}
		}
		changeBend(e, t) {
			if (!e) return;
			if (e.meshRenderer) {
				let i = e.meshRenderer.sharedMaterial;
				i && i instanceof ae && i.setBendOffset(t);
				let n = e.meshRenderer.sharedMaterial1;
				n && n instanceof ae && n.setBendOffset(t)
			} else if (e.skinnedMeshRenderer) {
				let i = e.skinnedMeshRenderer.sharedMaterial;
				i && i instanceof ae && i.setBendOffset(t)
			} else if (e.particleRenderer) {
				let i = e.particleRenderer.sharedMaterial;
				i && i instanceof oe && i.setBendOffset(t)
			}
			let i = e.numChildren;
			if (i)
				for (let n = 0; n < i; n++) {
					let i = e.getChildAt(n);
					i && this.changeBend(i, t)
				}
		}
		changeEffectMat(e) {
			if (e.particleRenderer) {
				let t = new oe;
				t.texture = e.particleRenderer.material.texture, t.cloneMat(e.particleRenderer.material), e.particleRenderer.material = t
			}
			let t = e.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = e.getChildAt(i);
					t && this.changeEffectMat(t)
				}
		}
		changeEffectBend(e, t, i) {
			if (e && e.active) {
				if (e.particleRenderer) {
					let i = e.particleRenderer.sharedMaterial;
					i && i instanceof oe && i.setBendOffset(t)
				}
				if (i) {
					let n = e.numChildren;
					if (n)
						for (let a = 0; a < n; a++) {
							let n = e.getChildAt(a);
							n && this.changeEffectBend(n, t, i)
						}
				}
			}
		}
		needRemove() {
			return this._sceneRoot.camera.transform.position.z - this._owner.transform.position.z > 1
		}
		destory() { }
		dispose() {
			this._owner && this._owner.destroy(!0)
		}
		get position() {
			return this._owner ? this._owner.transform.position : null
		}
		setPos(e, t, i) {
			this._owner && (this._owner.transform.position.x = e, this._owner.transform.position.y = t, this._owner.transform.position.z = i, this._owner.transform.position = this._owner.transform.position)
		}
		update(e) {
			if (this._isLoad) return !(!this._owner || !this.needRemove()) && (this.destory(), !0)
		}
		addColo(e, t, i, n) {
			if (!e) return;
			let a = e.addComponent(Laya.PhysicsCollider),
				o = new Laya.BoxColliderShape(t, i, n);
			return a.colliderShape = o, a.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3, a.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, a.friction = 0, a.restitution = 0, a.isTrigger = !0, a
		}
	}
	fe.poolName = "BaseBuilder";
	class _e extends fe {
		constructor(e) {
			super(e), this._haveColo = !1, this._sizeX = 0, this._sizeY = 0, this._sizeZ = 0, this.poolName = "Road"
		}
		builder() {
			super.builder(), this._owner && (this._owner.removeSelf(), this._owner = null), this._colo = null, this._haveColo = !1;
			let e = Laya.Loader.getRes(this._url);
			e && (this._owner = e.clone(), this.setPos(this._offsetX, this._offsetY, this._startZ), this.changeMat(this._owner))
		}
		show() {
			this._owner && !this._owner.parent && this._sceneRoot.mapLayer.addChild(this._owner), super.show()
		}
		changeMat(e) {
			if (e.meshRenderer) {
				let t = e.meshRenderer.material instanceof ae ? e.meshRenderer.material : new ae(e.meshRenderer.material);
				if (t.albedoTexture = e.meshRenderer.material.albedoTexture, t.cloneMat(e.meshRenderer.material), e.meshRenderer.material1) {
					let i = e.meshRenderer.material1 instanceof ae ? e.meshRenderer.material1 : new ae(e.meshRenderer.material1);
					i.albedoTexture = e.meshRenderer.material1.albedoTexture, i.cloneMat(e.meshRenderer.material1), this._sceneRoot.mapMgr.renderIdx = this._sceneRoot.mapMgr.renderIdx < 3e3 ? 3e3 : this._sceneRoot.mapMgr.renderIdx - 1, i.renderQueue = this._sceneRoot.mapMgr.renderIdx, e.meshRenderer.material1 = i, this._sceneRoot.mapMgr.renderIdx = this._sceneRoot.mapMgr.renderIdx < 3e3 ? 3e3 : this._sceneRoot.mapMgr.renderIdx - 1, t.renderQueue = this._sceneRoot.mapMgr.renderIdx
				}
				e.meshRenderer.material = t
			} else if (e.skinnedMeshRenderer) {
				let t = e.skinnedMeshRenderer.material instanceof ae ? e.skinnedMeshRenderer.material : new ae;
				t.albedoTexture = e.skinnedMeshRenderer.material.albedoTexture, t.cloneMat(e.skinnedMeshRenderer.material), e.skinnedMeshRenderer.material = t
			}
			let t = e.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = e.getChildAt(i);
					t && this.changeMat(t)
				}
		}
		setSize(e, t, i) {
			this._sizeX = e, this._sizeY = t, this._sizeZ = i, this.obstacleWidth = e / 2
		}
		get sizeZ() {
			return this._sizeZ
		}
		update(e) {
			if (this._isLoad && this._sceneRoot.mainPlayer && this._isShow) return super.update(e)
		}
		addColo(e, t, i, n) {
			if (!e) return;
			let a = e.getComponent(Laya.PhysicsCollider);
			a || (a = e.addComponent(Laya.PhysicsCollider));
			let o = new Laya.BoxColliderShape(2 * t, 2 * i, 2 * n);
			return a.colliderShape = o, a.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, a.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER6, a.friction = 2, a.restitution = 0, a
		}
		needRemove() {
			return this._sceneRoot.camera.transform.position.z - this._owner.transform.position.z > 50
		}
		setAlbedoColor(e) { }
		destory() {
			super.destory()
		}
	}
	_e.poolName = "Road";
	class ye {
		static malloc(e, t, ...i) {
			let n, a = this._pools[e.poolName];
			if (a && (n = a.pull()), !n)
				if (t) {
					switch (parseInt(t.length.toString())) {
						case 0:
							n = new e;
							break;
						case 1:
							n = new e(t[0]);
							break;
						case 2:
							n = new e(t[0], t[1]);
							break;
						case 3:
							n = new e(t[0], t[1], t[2]);
							break;
						case 4:
							n = new e(t[0], t[1], t[2], t[3]);
							break;
						case 5:
							n = new e(t[0], t[1], t[2], t[3], t[4]);
							break;
						case 6:
							n = new e(t[0], t[1], t[2], t[3], t[4], t[5]);
							break;
						case 7:
							n = new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
							break;
						case 8:
							n = new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]);
							break;
						case 9:
							n = new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
							break;
						case 10:
							n = new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9])
					}
				} else n = new e;
			return n.outPool.apply(n, i), n
		}
		static free(e) {
			let t = e.poolName,
				i = this._pools[t];
			i || (i = new Ie(t), this._pools[t] = i), e.intoPool(), i.push(e)
		}
		static clear() {
			for (let e in this._pools) {
				let t = this._pools[e];
				t && (t.destory && t.destory(), t.dispose && t.dispose())
			}
			this._pools = {}
		}
		static update(e) {
			if (this._nextUpdateTime > 0) this._nextUpdateTime -= e;
			else {
				this._nextUpdateTime = 2e4;
				for (let e in this._pools) this._pools[e].adaptSize()
			}
		}
	}
	ye.MOLD_DEBUG_STRICT = 0, ye.MOLD_RELEASE_FAIL_SAFE = 1, ye.mold = ye.MOLD_RELEASE_FAIL_SAFE, ye._pools = {}, ye._nextUpdateTime = 0;
	class Ie {
		constructor(e) {
			this._list = [], this._minSize = 0, this._maxSize = 0, this._mask = 0, this._key = e
		}
		push(e) {
			let t = this._list.length; - 1 == this._list.indexOf(e) ? this._list[t] = e : ye.mold == ye.MOLD_DEBUG_STRICT || (ye.mold, ye.MOLD_RELEASE_FAIL_SAFE)
		}
		pull() {
			let e, t = this._list.length - 1;
			return t >= 0 && (e = this._list[t], this._list.length = t, this._minSize = Math.min(this._minSize, t), this._maxSize = Math.max(this._maxSize, t), this._mask = 0), e
		}
		adaptSize() {
			this._mask++;
			let e = this._maxSize - this._minSize;
			this._mask < 3 && (e += 2), this._list.length > e && (this._list.length = e), this._minSize = this._maxSize = 0
		}
	}
	class we extends fe {
		constructor(e) {
			super(e), this._haveColo = !1, this._allowMove = !1, this.allowRoate = !1, this.gold = 0, this.meshCollisder = !1, this._builderName = "Obstacle", this._needAddColl = !1, this.isAccelerator = !1, this.isCar = !1, this.isWalker = !1, this._sizeX = 1, this._sizeY = 1, this._sizeZ = 10, this._baoZhaEffect = Laya.loader.getRes(te.scpath + "baozha.lh"), this.isDied = !1, this.needCheckChild = !1, this.poolName = "Obstacle"
		}
		get allowMove() {
			return this._allowMove
		}
		set allowMove(e) {
			this._allowMove = e
		}
		intoPool(...e) {
			this.allowRoate = !1, this.allowMove = !1, this._jumpCtrl && this._jumpCtrl.stop(), this.isDied = !1, super.intoPool(e)
		}
		setBuilderName(e = "") {
			this._builderName = e, this._owner && (this._owner.name = this._builderName)
		}
		builder() {
			super.builder(), this._owner && (this._owner.removeSelf(), this._owner = null), this._colos = null, this._haveColo = !1, this.isDied = !1;
			let e = Laya.Loader.getRes(this._url);
			e && (this._owner = e.clone(), this.setPos(this._offsetX, this._offsetY, this._startZ), this.isAccelerator = this._owner.name.indexOf("accelerator") >= 0, this.isCar = this._owner.name.indexOf("car") >= 0, this.isWalker = this._owner.name.indexOf("walker") >= 0, this._owner.script = this, this.changeMat(this._owner), this._jumpCtrl && this._jumpCtrl.setOwner(this._owner), this._needAddColl = !0, this.needCheckChild = this._owner.name.indexOf("boxwall") >= 0 || this._owner.name.indexOf("barral") >= 0, this.isCar && !te.prePlayBaoZha && (te.prePlayBaoZha = !0, this.playBaoZhaEfffect(!1)), this.isWalker && !te.preWalker && (this._isShow = !0, te.preWalker = !0))
		}
		show() {
			this._owner && !this._owner.parent && this._sceneRoot.obstacleLayer.addChild(this._owner), this._baoZhaEffect.transform.position.x = 999, this._baoZhaEffect.transform.position.y = 999, this._baoZhaEffect.transform.position.z = 999, this._baoZhaEffect.transform.position = this._baoZhaEffect.transform.position, this._baoZhaEffect.parent || this.owner.parent.addChild(this._baoZhaEffect), Laya.timer.once(2e3, this, this.clearBaoZhaEffect), super.show()
		}
		get bulideName() {
			return this._owner ? this._owner.name : this._builderName
		}
		updateRoate() {
			if (!this._owner) return;
			let e = this._sceneRoot.mainPlayer.transform.position.z - this._owner.transform.position.z;
			this._roateV || (this._roateV = new Laya.Vector3(0, 0, 0)), this._moveV || (this._moveV = new Laya.Vector3(0, 0, 0)), this._roateV.setValue(0, 0, 0);
			let t = 0,
				i = 0,
				n = 0;
			if (0 == this._offsetX) this._roateV.z = 1, i = -.2;
			else if (this._offsetX < 0) {
				if ((e = Math.abs(e)) > Q.randomRange(30, 40)) return;
				this._roateV.y = 1, t = .18, n = -.1
			} else if (this._offsetX > 0) {
				if ((e = Math.abs(e)) > Q.randomRange(30, 40)) return;
				this._roateV.y = 1, t = -.18, n = -.1
			}
			this._owner.transform.position.y <= .7 && (n = 0), this._owner.transform.rotate(this._roateV, !1, !1), this._moveV.setValue(t, n, i), this._owner.transform.translate(this._moveV, !1)
		}
		update(e) {
			if (this._isLoad && this._sceneRoot.mainPlayer && this._isShow) {
				if (this.allowMove && this.updateMove(e), this.allowRoate && this.updateRoate(), this._needAddColl && this._owner) {
					if (Math.abs(this._sceneRoot.mainPlayer.playerScript.posZ - this._owner.transform.position.z) < 80) {
						if (!this._haveColo) {
							if (this._colos) {
								let e = this._colos.length;
								for (let t = 0; t < e; t++) {
									let e = this._colos[t];
									e && (e.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3)
								}
							} else {
								this._colos = [];
								let e = this._owner.numChildren,
									t = j.ObstacleSizeTem[this._owner.name];
								if (t && t.length) this.obstacleWidth = t[0], this.obstacleHeight = t[1], this.obstacleZ = t[2];
								else if (e) {
									this.obstacleWidth = 0;
									let t = -33;
									for (let i = 0; i < e; i++) {
										let e = this._owner.getChildAt(i);
										if (!e) continue;
										e.script = this;
										let n = e.name,
											a = n.indexOf("(");
										a >= 0 && (n = q.trim(n.substring(0, a)));
										let o = j.ObstacleSizeTem[n];
										o && o.length && (e.width = 1.1 * o[0], e.height = o[1], this.obstacleWidth ? t != e.transform.position.x && (this.obstacleWidth += e.width, t = e.transform.position.x) : (this.obstacleWidth = e.width, t = e.transform.position.x))
									}
								}
							}
							this._haveColo = !0
						}
					} else if (this._haveColo) {
						this._haveColo = !1;
						let e = this._colos ? this._colos.length : 0;
						for (let t = 0; t < e; t++) {
							let e = this._colos[t];
							e && (e.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1)
						}
					}
				}
				return super.update(e)
			}
		}
		updateBlendOffset(e) {
			this._isShow && (super.updateBlendOffset(e), this.changeEffectBend(this._baoZhaEffect, e, !0))
		}
		addColo2(e, t) {
			if (!e || !t) return;
			let i, n = t.length;
			if (3 == n) {
				i = e.addComponent(Laya.PhysicsCollider);
				let n = new Laya.BoxColliderShape(t[0], t[1], t[2]);
				i.colliderShape = n
			} else if (9 == n) {
				i = e.addComponent(Laya.PhysicsCollider);
				let n = new Laya.BoxColliderShape(t[0], t[1], t[2]);
				i.colliderShape = n, n.localOffset = new Laya.Vector3(0, t[8], 0)
			} else if (11 == n) {
				i = e.addComponent(Laya.PhysicsCollider);
				let n = new Laya.CapsuleColliderShape(t[8], t[9], Laya.CapsuleColliderShape.SHAPEORIENTATION_UPY);
				n.localOffset = new Laya.Vector3(0, t[10], 0), i.colliderShape = n
			}
			return i && (i.isTrigger = !0, i.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3, i.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5 || Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER6), i
		}
		updateMove(e) {
			if (!this._owner || !this._owner.active) return;
			this._owner.tweenPos && this._owner.tweenPos.update(e);
			let t = this._owner.numChildren;
			if (t)
				for (let i = 0; i < t; i++) {
					let t = this._owner.getChildAt(i);
					if (t)
						if (this.isCar) {
							let i = t.numChildren;
							if (i)
								for (let n = 0; n < i; n++) {
									let i = t.getChildAt(n);
									i && i.tweenPos && i.tweenPos.update(e)
								} else t.tweenPos && t.tweenPos.update(e)
						} else t.tweenPos && t.tweenPos.update(e)
				}
		}
		fly(e, t, i = 0, n = !1, a = .2) {
			t || (t = this._owner);
			let o = t.numChildren;
			if (this._baoZhaEffect || (this._baoZhaEffect = Laya.loader.getRes(te.scpath + "baozha.lh")), o)
				if (this.isCar)
					for (let i = 0; i < o; i++) {
						let n = t.getChildAt(i);
						if (!n) continue;
						let a = n.numChildren;
						if (a)
							for (let e = 0; e < a; e++) {
								let t = n.getChildAt(e);
								t && (t.tweenPos ? t.tweenPos.setValue(t.transform.position.x, t.transform.position.y, t.transform.position.z) : t.tweenPos = new re(t), t.tweenPos.play1(0, .01, 0, Q.randomBoolen() ? -.001 : .001, !0, !0))
							} else n.tweenPos ? n.tweenPos.setValue(n.transform.position.x, n.transform.position.y, n.transform.position.z) : n.tweenPos = new re(n), n.tweenPos.play1(e * Q.randomFloatRange(2, 3), Q.randomFloatRange(.002, .005), Q.randomFloatRange(3, 6), Q.randomFloatRange(-3, 3), !0)
					} else
					for (let n = 0; n < o; n++) {
						let o = t.getChildAt(n);
						o && (o.tweenPos ? o.tweenPos.setValue(o.transform.position.x, o.transform.position.y, o.transform.position.z) : o.tweenPos = new re(o), o.tweenPos.play(!0, e, i, a))
					} else t.tweenPos ? t.tweenPos.setValue(t.transform.position.x, t.transform.position.y, t.transform.position.z) : t.tweenPos = new re(t), t.tweenPos.play(!0, e, i, a);
			n && this.goDie(), this.isDied = !0
		}
		goDie() {
			if (this.owner && this.owner.active && !this.isDied && (this.isDied = !0, this.isCar)) {
				this.playBaoZhaEfffect();
				let e = this._owner.numChildren;
				if (e)
					for (let t = 0; t < e; t++) {
						let e = this._owner.getChildAt(t);
						e && e.meshRenderer && (e.meshRenderer.material.albedoColor = new Laya.Vector3(0, 0, 0)), this.changeMat(e)
					}
			}
		}
		playBaoZhaEfffect(e = !0, t = 0) {
			if (!this.owner.parent) return;
			Laya.timer.clear(this, this.clearBaoZhaEffect);
			let i = e ? this.owner.transform.position.z : -50;
			this._baoZhaEffect.transform.position.x = this.owner.transform.position.x, this._baoZhaEffect.transform.position.y = this.owner.transform.position.y + 1 + t, this._baoZhaEffect.transform.position.z = i, this._baoZhaEffect.transform.position = this._baoZhaEffect.transform.position, this._baoZhaEffect.parent || this.owner.parent.addChild(this._baoZhaEffect), Laya.timer.once(2e3, this, this.clearBaoZhaEffect)
		}
		clearBaoZhaEffect() {
			this._baoZhaEffect && (this.playChildEffect(this._baoZhaEffect, !1), this._baoZhaEffect.removeSelf(), this._baoZhaEffect = Laya.loader.getRes(te.scpath + "baozha.lh"))
		}
		playChildEffect(e, t) {
			if (!e) return;
			e.particleSystem && (t ? e.particleSystem.play() : e.particleSystem.stop());
			let i = e.numChildren;
			for (let n = 0; n < i; n++) {
				let i = e.getChildAt(n);
				i && i.particleSystem && this.playChildEffect(i, t)
			}
		}
		needRemove() {
			let e = this._owner.numChildren,
				t = j.ObstacleSizeTem[this._owner.name];
			if (t && t.length) return this._sceneRoot.camera.transform.position.z - this._owner.transform.position.z > 2 * t[2];
			if (e) {
				let t = !0;
				for (let i = 0; i < e; i++) {
					let e = this._owner.getChildAt(i);
					if (e && this._sceneRoot.camera.transform.position.z - e.transform.position.z < 5) {
						t = !1;
						break
					}
				}
				return t
			}
			return !1
		}
		preCanFree() {
			return -100 == this._offsetX && this._isLoad
		}
	}
	we.poolName = "Obstacle";
	class Se extends we {
		constructor(e) {
			super(e), this._curHp = 0, this._speedZ = .01, this._nextTurnTime = 0, this._nextSendBombTime = 0, this.poolName = "Boss", this._hpEvent = new ce(ce.BOSSHP_CHANGE, new Object)
		}
		get curHp() {
			return this._curHp
		}
		intoPool(...e) {
			this._moveTween && this._moveTween.clear(), this._roateTween && this._roateTween.clear(), this.clearBombs(), super.intoPool(e)
		}
		clearBombs() {
			let e = this._bombList ? this._bombList.length : 0;
			for (let t = 0; t < e; t++) {
				let e = this._bombList[t];
				e && (e.active = !1, e.removeSelf())
			}
			e && (this._bombList.length = 0), this._waitBombObj && (this._waitBombObj.active = !1, this._waitBombObj.removeSelf(), this._waitBombObj = null)
		}
		builder() {
			super.builder(), this._curHp = j.MAX_BOSS_HP, this.isCar = !0, this._lunzis = [];
			let e = this._owner.getChildByName("wheel"),
				t = e.numChildren;
			for (let i = 0; i < t; i++) this._lunzis.push(e.getChildAt(i));
			this._nextTurnTime = Laya.timer.currTimer + Q.randomRange(2e3, 4e3), this._cannon = this._owner.getChildByName("body").getChildByName("cannon"), this._bombObj = this._cannon.getChildByName("grenade1"), this._bombObj.active = !1, this._bombList = [], this.addBomb(), this._nextSendBombTime = 0;
			let i = this._owner.getChildByName("SmokeDarkSoftTrail");
			i && (i.active = !1)
		}
		updateBlendOffset(e) {
			if (!this._isShow) return;
			super.updateBlendOffset(e);
			let t = this._bombList ? this._bombList.length : 0;
			for (let i = 0; i < t; i++) {
				let t = this._bombList[i];
				t && this.changeBend(t, e)
			}
		}
		updateMove(e) {
			if (this._owner && this._owner.active)
				if (this.isDied) {
					this._owner.tweenPos && this._owner.tweenPos.update(e);
					let t = this._owner.numChildren;
					if (t)
						for (let i = 0; i < t; i++) {
							let t = this._owner.getChildAt(i);
							if (t)
								if (this.isCar) {
									let i = t.numChildren;
									if (i && "body" != t.name)
										for (let n = 0; n < i; n++) {
											let i = t.getChildAt(n);
											i && i.tweenPos && i.tweenPos.update(e)
										} else t.tweenPos && t.tweenPos.update(e)
								} else t.tweenPos && t.tweenPos.update(e)
						}
				} else if (this._sceneRoot.mainPlayer.playerScript.running) {
					if (this._nextTurnTime < Laya.timer.currTimer) {
						let e = j.MAX_WIDTH - 1.8;
						this.turnMove(Q.randomFloatRange(-e, e))
					}
					this._speedZ = this._sceneRoot.mainPlayer.playerScript.speedZ;
					let t = this._speedZ * e,
						i = this._owner.transform.position;
					if (i.z = i.z + t, i.x = this._offsetX, this._owner.transform.position = i, this._cannon) {
						let e = this._sceneRoot.mainPlayer.playerScript.posX - this._offsetX,
							t = 20 * Math.abs(e) / (2 * j.MAX_WIDTH);
						t = e < 0 ? t : -t, this._cannon.transform.localRotationEulerY = 180 + t
					}
					let n = this._lunzis ? this._lunzis.length : 0;
					for (let e = 0; e < n; e++) {
						let t = this._lunzis[e];
						t && (t.transform.localRotationEulerX += 500 * this._speedZ)
					}
					if (this._bombList) {
						let t = this._bombList.length,
							i = this._sceneRoot.mainPlayer.owner.transform.position;
						for (let n = 0; n < t; n++) {
							let t = this._bombList[n];
							if (!t || !t.tweenPos) continue;
							let a = t.transform.position.x - i.x,
								o = t.transform.position.y - i.y,
								s = t.transform.position.z - i.z,
								r = Math.abs(a) <= .4,
								l = Math.abs(o) <= 2,
								d = Math.abs(s) <= .5,
								h = !1;
							if (r && l && d ? h = !0 : (t.tweenPos.update(e), s = t.transform.position.z - i.z, r && l && !d && Math.abs(s) <= .5 && (h = !0)), h) {
								this.sendBombEnd(t), this._sceneRoot.mainPlayer.playerScript.beatenByBomb();
								break
							}
						}
					}
					this._nextSendBombTime > 0 && this._nextSendBombTime < Laya.timer.currTimer ? (this.sendBomb(), this._nextSendBombTime = Laya.timer.currTimer + Q.randomRange(4e3, 7e3)) : 0 == this._nextSendBombTime && (this._nextSendBombTime = Laya.timer.currTimer + Q.randomRange(2e3, 5e3))
				}
		}
		turnMove(e) {
			this._moveTween ? this._moveTween.clear() : this._moveTween = new Laya.Tween;
			let t = e - this.offsetX,
				i = Math.abs(t) / j.MAX_WIDTH,
				n = t < 0 ? -10 * i : 10 * i;
			this._moveTween.to(this, {
				offsetX: e
			}, 750, Laya.Ease.circOut), this._roateTween ? this._roateTween.clear() : this._roateTween = new Laya.Tween, this._roateTween.to(this, {
				roateY: n
			}, 500, Laya.Ease.circOut, Laya.Handler.create(this, this.huizheng)), this._nextTurnTime = Laya.timer.currTimer + Q.randomRange(2e3, 4e3)
		}
		huizheng() {
			this._roateTween && (this._roateTween.clear(), this._roateTween.to(this, {
				roateY: 0
			}, 150))
		}
		get roateY() {
			return this._owner ? this._owner.transform.localRotationEulerY : 0
		}
		set roateY(e) {
			this._owner && (this._owner.transform.localRotationEulerY = e)
		}
		fly(e, t, i = 0, n = !1, a = .2) {
			t || (t = this._owner);
			let o = t.numChildren;
			if (o)
				if (this.isCar)
					for (let i = 0; i < o; i++) {
						let n = t.getChildAt(i);
						if (!n) continue;
						let a = n.numChildren;
						if (a && "body" != n.name)
							for (let e = 0; e < a; e++) {
								let t = n.getChildAt(e);
								t && (t.tweenPos ? t.tweenPos.setValue(t.transform.position.x, t.transform.position.y, t.transform.position.z) : t.tweenPos = new re(t), t.tweenPos.play1(0, .01, 0, Q.randomBoolen() ? -.001 : .001, !0, !0, .4))
							} else n.tweenPos ? n.tweenPos.setValue(n.transform.position.x, n.transform.position.y, n.transform.position.z) : n.tweenPos = new re(n), n.tweenPos.play1(e * Q.randomFloatRange(2, 3), Q.randomFloatRange(.002, .005), Q.randomFloatRange(3, 6), Q.randomFloatRange(-3, 3), !0)
					} else
					for (let n = 0; n < o; n++) {
						let o = t.getChildAt(n);
						o && (o.tweenPos ? o.tweenPos.setValue(o.transform.position.x, o.transform.position.y, o.transform.position.z) : o.tweenPos = new re(o), o.tweenPos.play(!0, e, i, a))
					} else t.tweenPos ? t.tweenPos.setValue(t.transform.position.x, t.transform.position.y, t.transform.position.z) : t.tweenPos = new re(t), t.tweenPos.play(!0, e, i, a);
			n && this.goDie(), this.isDied = !0
		}
		hit() {
			this._curHp--, this._hpEvent.data.hp = this._curHp, Ni.evt.dispatchEvent(this._hpEvent), this._curHp <= 0 ? this.fly(this._speedZ, this._owner, 1, !0) : this.playBaoZhaEfffect(), J.I.shock(), this._sceneRoot.cameraRoot.shock(), J.I.playSound("bazookahit.mp3")
		}
		playBaoZhaEfffect(e = !0, t = 0) {
			super.playBaoZhaEfffect(e, .5)
		}
		addBomb() {
			if (!this._bombObj) return;
			let e = this._bombObj.clone();
			e.parent != this._cannon && (e.removeSelf(), this._cannon.addChild(e)), e.active = !0;
			let t = e.getChildByName("trail_lizi");
			t && (t.particleSystem.isPlaying && t.particleSystem.stop(), t.active = !1), this.changeMat(e), this._waitBombObj = e
		}
		sendBomb() {
			if (!this._waitBombObj || this._waitBombObj.tweenPos) return;
			let e = this._waitBombObj;
			e.removeSelf(), this._sceneRoot.obstacleLayer.addChild(e), e.transform.position.x = this._cannon.transform.position.x, e.transform.position.y = this._cannon.transform.position.y, e.transform.position.z = this._cannon.transform.position.z, e.transform.position = e.transform.position, e.tweenPos ? e.tweenPos.setValue(e.transform.position.x, e.transform.position.y, e.transform.position.z) : e.tweenPos = new pe(e);
			let t = this._sceneRoot.mainPlayer ? this._sceneRoot.mainPlayer.owner.transform.position : null,
				i = this._sceneRoot.mainPlayer.playerScript.touchAddSpeed;
			e.tweenPos.play3(t, !0, "Sphere", this, this.sendBombEnd, i), this._bombList.push(e);
			let n = e.getChildByName("trail_lizi");
			n && (n.active = !0, !n.particleSystem.isPlaying && n.particleSystem.play()), J.I.playSound("fashepaodan.mp3"), Laya.timer.once(300, this, this.addBomb)
		}
		sendBombEnd(e) {
			if (!e) return;
			let t = e.getChildByName("trail_lizi");
			t && t.particleSystem.isPlaying && t.particleSystem.stop(), e.active = !1, e.removeSelf();
			let i = this._bombList.indexOf(e);
			i >= 0 && this._bombList.splice(i, 1)
		}
		needRemove() {
			return !1
		}
	}
	Se.poolName = "Boss";
	class ve extends we {
		constructor(e) {
			super(e), this._isLoadRingEffect = !1, this.poolName = "Gun"
		}
		intoPool(...e) {
			this.clearRingEffect(), super.intoPool(e)
		}
		builder() {
			super.builder();
			let e = this._owner ? this._owner.getChildByName("rocket") : null,
				t = e ? e.getChildByName("trail") : null;
			t && (t.particleSystem && t.particleSystem.stop(), t.active = !1)
		}
		show() {
			this._owner && !this._owner.parent && this._sceneRoot.obstacleLayer.addChild(this._owner), super.show(), this.playRingEfffect()
		}
		pickUp() {
			this._sceneRoot && this._sceneRoot.mapMgr && this._sceneRoot.mapMgr.bossObj && this._sceneRoot.mapMgr.bossObj.isDied || (this.clearRingEffect(), this.hide(), this._sceneRoot && this._sceneRoot.mainPlayer && this._sceneRoot.mainPlayer.playerScript.pickUpRocket())
		}
		updateBlendOffset(e) {
			this._isShow && (super.updateBlendOffset(e), this.changeEffectBend(this._ringEffect, e, !0))
		}
		playRingEfffect() {
			this.owner && (this._ringEffect ? (this._ringEffect.transform.position.x = this.owner.transform.position.x, this._ringEffect.transform.position.y = this.owner.transform.position.y, this._ringEffect.transform.position.z = this.owner.transform.position.z, this._ringEffect.transform.position = this._ringEffect.transform.position, this.playChildEffect(this._ringEffect, !0), this._ringEffect.parent || this._sceneRoot.obstacleLayer.addChild(this._ringEffect)) : this._isLoadRingEffect || (this._isLoadRingEffect = !0, Laya.Sprite3D.load(te.scpath + "daoju.lh", Laya.Handler.create(this, this.loadRingEffectEnd))))
		}
		loadRingEffectEnd() {
			let e = Laya.loader.getRes(te.scpath + "daoju.lh");
			this._ringEffect = e ? e.clone() : null, this._ringEffect && (this.changeEffectMat(this._ringEffect), this.playRingEfffect())
		}
		clearRingEffect() {
			this._ringEffect && (this.playChildEffect(this._ringEffect, !1), this._ringEffect.removeSelf())
		}
	}
	ve.poolName = "Gun";
	class Ee {
		constructor(e, t) {
			this._lenOfMap = 0, this._mapList = new Array, this._obstacleList = new Array, this._isUnlimit = !1, this._startZ = 0, this.renderIdx = 5e3, this._showMapIdx = 0, this._suportObsList = ["terminal", "accelerator01", "accelerator03", "accelerator04", "accelerator05", "accelerator06", "barral01", "barral02", "barral03", "boxwall01", "boxwall02", "boxwall03", "boxwall04", "car01", "car02", "car03", "car04", "boss01"], this._showObtIdx = 0, this._lenGun = 0, this._haveTerminal = !1, this._scene = e, this._app = t
		}
		reset(e, t, i = !1) {
			if (this.clear(), this._lenGun = 0, this._haveTerminal = !1, this._lenOfMap = 0, this._isUnlimit = i, this._mapSetArr = e.concat(), this._mapSetArrCopy = e.concat(), this._obstacleSetArr = t.concat(), te.preWalker = !1, this._showMapIdx = 0, this._showObtIdx = 0, this._startZ = this._mapSetArr && this._mapSetArr.length ? this._mapSetArr[0].posZ : -30, this._isUnlimit) {
				this.renderIdx = 6e3;
				for (let e = 0; e < 8; e++) this.addMap(!0);
				this.addBoss(), this.addGun(2 * j.BOSS_DIS)
			} else {
				let e = this._mapSetArr.length + 3;
				this.renderIdx = 3e3 + 10 * e;
				for (let t = 0; t < e; t++) this.addMap();
				this.showMap(7), this.addObstacle()
			}
		}
		addMap(e = !1) {
			let t;
			if (this._mapSetArr.length ? (t = this._mapSetArr.shift(), this._preMapObj = t) : this._mapSetArrCopy && this._mapSetArrCopy.length ? t = this._mapSetArrCopy[Q.randomRange(0, this._mapSetArrCopy.length - 1)] : this._preMapObj && (t = this._preMapObj), !t) return;
			let i = t.path,
				n = i.split("/"),
				a = n[n.length - 1];
			i = q.substitute("{0}{1}.lh", te.scpath, a);
			let o = ye.malloc(_e, [this._scene], [this._scene]),
				s = this._scene.mapObj.transform.position;
			o.setOffset(s.x, s.y, this._startZ), o.setSize(2 * j.MAX_WIDTH, .1, t.length), o.init(i), this._mapList.push(o), this._startZ += t.length, e && (o.show(), this._lenOfMap += t.length, this._showMapIdx++)
		}
		showMap(e = 1) {
			if (this._showMapIdx >= this._mapList.length) this.addMap(!0);
			else {
				let t = this._showMapIdx,
					i = t + e;
				for (let e = t; e < i; e++) {
					let t = this._mapList[e];
					t && (t.show(), this._lenOfMap += t.sizeZ, this._showMapIdx++)
				}
			}
		}
		addObstacle() {
			let e = this._obstacleSetArr.length;
			if (e)
				for (let t = 0; t < e; t++) {
					let e = this._obstacleSetArr[t];
					if (!e) continue;
					let i = e.path,
						n = i.split("/"),
						a = n[n.length - 1];
					if (this._suportObsList.indexOf(a) >= 0) {
						i = q.substitute("{0}{1}.lh", te.scpath, n[n.length - 1]);
						let t = ye.malloc(we, [this._scene], [this._scene]);
						t.init(i), t.setOffset(e.px, 0, e.pz), t.allowMove = !0, this._obstacleList.push(t)
					}
				}
		}
		showObstacle() {
			let e = this._obstacleList.length;
			if (!e) return;
			this._showMapIdx;
			for (let t = 0; t < e; t++) {
				let e = this._obstacleList[t];
				!e || e.startZ > this._lenOfMap || (e.show(), this._showObtIdx++)
			}
		}
		addBoss() {
			let e = q.substitute("{0}boss01.lh", te.scpath),
				t = ye.malloc(Se, [this._scene], [this._scene]);
			t.init(e);
			let i = j.MAX_WIDTH - 1.5;
			t.setOffset(Q.randomFloatRange(-i, i), 0, j.BOSS_DIS), t.allowMove = !0, t.show(), this._obstacleList.push(t), this.bossObj = t
		}
		addGun(e) {
			let t = q.substitute("{0}rocket.lh", te.scpath),
				i = ye.malloc(ve, [this._scene], [this._scene]);
			i.init(t);
			let n = j.MAX_WIDTH - .5,
				a = this._lenGun + e;
			i.setOffset(Q.randomFloatRange(-n, n), 0, a), i.show(), this._obstacleList.push(i), this._lenGun = a
		}
		addTerminal() {
			if (this._haveTerminal) return;
			let e = q.substitute("{0}terminal.lh", te.scpath),
				t = ye.malloc(we, [this._scene], [this._scene]);
			t.init(e);
			let i = this._scene.mainPlayer.playerScript.posZ + 180;
			t.setOffset(0, 0, i), t.show(), this._obstacleList.push(t), this._haveTerminal = !0
		}
		update(e, t) {
			if (this._lenOfMap <= 0) return;
			if (this._lenOfMap - this._scene.camera.transform.position.z < 200)
				if (this._isUnlimit) {
					if (this.addMap(!0), this.bossObj && this.bossObj.isDied) this.addTerminal();
					else if (this._lenGun - this._scene.camera.transform.position.z < 60) {
						!(!!this._scene.mainPlayer && (this._scene.mainPlayer.playerScript.isRocketing || this._scene.mainPlayer.playerScript.isRocketFlying)) && this.addGun(Q.randomRange(2 * j.BOSS_DIS, 3 * j.BOSS_DIS))
					}
				} else this.showMap(), this.showObstacle();
			let i = this._obstacleList.length;
			for (let n = 0; n < i; n++) {
				let i = this._obstacleList[n];
				i && (i.update(e) ? (ye.free(i), this._obstacleList.splice(n, 1), n = --n < 0 ? 0 : n, this._showObtIdx--, this._showObtIdx = this._showObtIdx < 0 ? 0 : this._showObtIdx) : i.updateBlendOffset(t))
			}
			let n = this._mapList.length;
			for (let i = 0; i < n; i++) {
				let n = this._mapList[i];
				n && (n.update(e) ? (ye.free(n), this._mapList.splice(i, 1), i = --i < 0 ? 0 : i, this._showMapIdx--, this._showMapIdx = this._showMapIdx < 0 ? 0 : this._showMapIdx) : n.updateBlendOffset(t))
			}
		}
		checkCanMove(e, t = !1, i) {
			let n = [],
				a = this._obstacleList.length;
			for (let t = 0; t < a; t++) {
				let a = this._obstacleList[t];
				if ((!i || i != a) && (a instanceof we && !a.isAccelerator)) {
					if (!a.position) continue;
					let t = a.position.z - e.z;
					t > Math.random() + 1 && t < Q.randomRange(3, 4) && n.push(a)
				}
			}
			let o = n.length;
			for (let t = 0; t < o; t++) {
				let i = n[t];
				if (!i || !i.owner) continue;
				let a = i.owner.numChildren;
				if (a)
					for (let t = 0; t < a; t++) {
						let n = i.owner.getChildAt(t);
						if (!n) continue;
						let a = n.transform.position.x - e.x,
							o = i.obstacleWidth + .15,
							s = Math.abs(a);
						if (s < o && Q.randomRange(0, 1e3) < 800) return [a < 0 ? 1 - (o - s) : o - s + 1, n]
					} else {
					let t = i.position.x - e.x,
						n = i.obstacleWidth + .15,
						a = Math.abs(t);
					if (a < n && Q.randomRange(0, 1e3) < 800) return [t < 0 ? 1 - (n - a) : n - a + 1, i]
				}
			}
			return [0, null]
		}
		getObstacle(e, t, i, n) {
			let a = this._obstacleList ? this._obstacleList.length : 0;
			for (let n = 0; n < a; n++) {
				let a = this._obstacleList[n];
				if (a && a.owner)
					if (a instanceof we && a.needCheckChild) {
						let n = a.owner.numChildren,
							o = [];
						for (let s = 0; s < n; s++) {
							let n = a.owner.getChildAt(s);
							if (!n) continue;
							let r = n.transform.position;
							if (r) {
								let a = r.x - i,
									s = (r.y, n.width / 2 + .2);
								n.height;
								e <= r.z && t >= r.z && Math.abs(a) <= s && o.push(n)
							}
						}
						if (o.length) return o
					} else {
						let n = a.position;
						if (n) {
							let o = n.x - i,
								s = (n.y, a.obstacleWidth / 2 + .2),
								r = (a.obstacleHeight, n.z - a.obstacleZ / 2),
								l = n.z + a.obstacleZ / 2;
							if ((r >= e && r <= t || l >= e && l <= t) && Math.abs(o) <= s) return [a.owner]
						}
					}
			}
			return null
		}
		clear() {
			let e = this._obstacleList.length;
			for (let t = 0; t < e; t++) ye.free(this._obstacleList[t]);
			this._obstacleList.length = 0, e = this._mapList.length;
			for (let t = 0; t < e; t++) ye.free(this._mapList[t]);
			this._mapList.length = 0
		}
	}
	class Le extends he {
		constructor() {
			super(), this._maxX = 0, this._nextUpdateNameTime = 0, this._changeTime = 0, this._maxX = .7 * j.MAX_WIDTH, this.speedRelasePer1 = 1.5 * this.speedRelasePer1, this.speedAddPer = 2e-5
		}
		init(e, t, i) {
			super.init(e, t, i), this.curHp = this.maxHp = 1
		}
		set rank(e) {
			if (super.rank = e, e <= 1) this._rankObj && (this._rankObj.active = !1);
			else if (this._rankObj) {
				let t = q.substitute("{0}Assets/Game/Resources/Entities/Information/Texture/rank{1}.png", te.scpath, e),
					i = Laya.loader.getRes(t);
				i ? this.updateRankEnd(i) : Laya.Texture2D.load(t, Laya.Handler.create(this, this.updateRankEnd))
			}
		}
		updateRankEnd(e) {
			e && this._rankObj && !this.isDie && (this._rankObj.active = !0, this._rankMat || (this._rankMat = new ae(this._rankObj.meshRenderer.material)), this._rankMat.albedoTexture = e, this._rankMat.cloneMat(this._rankObj.meshRenderer.material), this._rankMat.tilingOffsetX = 4, this._rankMat.tilingOffsetY = 4, this._rankObj.meshRenderer.material = this._rankMat)
		}
		get isJumping() {
			return this._jumpCtrl && this._jumpCtrl.isJumping
		}
		Update(e, t) {
			super.Update(e, t), this.showTrail(!1), this.running && !this._isArrived && this.autoMove()
		}
		autoMove() {
			let e = Laya.timer.currTimer,
				t = this._app.sceneRoot.mapMgr.checkCanMove(this.owner.transform.position)[0];
			if (t < 0) this.setTowardAngle(Q.randomRange(-70, -87), 2), this.touchAddSpeed = !0, this._changeTime = e + Q.randomRange(2e3, 5e3);
			else if (t > 0) this.setTowardAngle(Q.randomRange(-93, -100), -2), this.touchAddSpeed = !0, this._changeTime = e + Q.randomRange(2e3, 5e3);
			else {
				let e = this._app.sceneRoot.mainPlayer.playerScript.posZ;
				if (e / this._app.sceneRoot.goalScore < .8) {
					let t = this.posZ - e;
					!this.isJumping && t < -1 && Q.randomRange(0, 1e3) < 600 ? this.addSpeed(200, !1) : !this.isJumping && t <= -8 && this.addSpeed(500, !1)
				}
			}
			this._changeTime > 0 && this._changeTime < e && (this.touchAddSpeed = !1, this._changeTime = 0)
		}
		updateMaxSpeed() {
			this.maxSpeed = this.isInAddSpeedTime ? j.SPEED_MAX + j.SPEED_ADD / 2 : j.SPEED_MAX
		}
		get running() {
			return this._running
		}
		set running(e) {
			this._running != e && (e ? (this._running = !0, this.speedAddPer1 = 25e-7) : this._running = !1)
		}
		reset(e = 0, t = 0) {
			super.reset(), this.speedAddPer1 = 25e-7;
			let i = Q.randomFloatRange(-this._maxX, this._maxX);
			this.maxHp = 1, this._aiId = e, this.setOwnerPos(i, this.posY, t), this._moveDiffX = i, this.changeSkins()
		}
		changeSkins() {
			let e = j.AITemp[this._aiId - 1];
			if (!e) return;
			this.updateMoto(e.motor[Q.randomRange(0, e.motor.length - 1)]), this.updateWeapon(e.weapon[Q.randomRange(0, e.weapon.length - 1)]);
			let t = e.suit[Q.randomRange(0, e.suit.length - 1)];
			this.updateSuit(t), this.updateHat(t), this.baseSpeed = j.SPEED_MAX * e.speedScale, this.maxSpeed = j.SPEED_MAX
		}
		destory() {
			super.destory()
		}
	}
	class Ae extends ee {
		constructor() {
			super()
		}
		init(e) {
			super.init(e)
		}
		updateOwner(e, t) {
			super.updateOwner(e, t);
			let i = this.owner.getComponent(Le);
			this._robotScript = i || this.owner.addComponent(Le);
			for (let e in t) this._robotScript[e] = t[e]
		}
		get robotScript() {
			return this._robotScript || (this._robotScript = this.owner.addComponent(Le)), this._robotScript
		}
		destroy() {
			this._robotScript && (this.owner.destroyed, this._robotScript.destory(), this._robotScript = null), super.destroy()
		}
	} ! function (e) {
		e[e.INIT = 100] = "INIT", e[e.VIEW_LOADING = 101] = "VIEW_LOADING", e[e.VIEW_INDEX = 102] = "VIEW_INDEX", e[e.LOGIN_SUCCESS = 103] = "LOGIN_SUCCESS", e[e.LV_START = 200] = "LV_START", e[e.LV_END = 201] = "LV_END", e[e.LV_TIP = 202] = "LV_TIP", e[e.LV_START2 = 203] = "LV_START2", e[e.LV_END2 = 204] = "LV_END2", e[e.LV_SKIP = 205] = "LV_SKIP", e[e.LV_RELIVE = 206] = "LV_RELIVE", e[e.ONLINE_TIME = 300] = "ONLINE_TIME"
	}(f || (f = {}));
	class Te { }
	Te.MATRIX_LIST = "/matrix/matrix-list", Te.SKIP_STATISTICS = "/api/report/matrix-data", Te.AD_SWITCH_LIST = "/matrix/adSwitch/list", Te.DATA_STATISTICS = "/api/report/log";
	class xe {
		static debug(e, ...t) {
			U.I.getConf().logLevel <= m.debug && console.debug(e, ...t)
		}
		static log(e, ...t) {
			U.I.getConf().logLevel <= m.log && console.log(e, ...t)
		}
		static info(e, ...t) {
			U.I.getConf().logLevel <= m.info && console.info(e, ...t)
		}
		static warn(e, ...t) {
			U.I.getConf().logLevel <= m.warn && console.warn(e, ...t)
		}
		static error(e, ...t) {
			U.I.getConf().logLevel <= m.error && console.error(e, ...t)
		}
	}
	class be {
		constructor() {
			this.mCount = 0, this.mTable = {}
		}
		get table() {
			return this.mTable
		}
		add(e, t) {
			return this.containsKey(e) ? (xe.error("DictionaryNum Add error,same key already exist:", e), !1) : (this.mCount++, this.mTable[e] = t, !0)
		}
		remove(e) {
			return !!this.containsKey(e) && (this.mCount--, delete this.mTable[e], !0)
		}
		keys() {
			let e = new Array;
			for (let t in this.mTable) e.push(Number(t));
			return e
		}
		containsKey(e) {
			return this.mTable.hasOwnProperty(e.toString())
		}
		values() {
			let e = new Array;
			for (let t in this.mTable) e.push(this.mTable[t]);
			return e
		}
		containesValue(e) {
			for (let t in this.mTable)
				if (this.mTable[t] == e) return !0;
			return !1
		}
		get count() {
			return this.mCount
		}
		get(e) {
			return this.mTable[e]
		}
		set(e, t) {
			this.mTable[e] = t
		}
		clear() {
			this.mTable = {}, this.mCount = 0
		}
		toString() {
			let e = "{";
			for (let t in this.mTable) e += `\n\t${t} : ${this.mTable[t]}`;
			return e + "\n}"
		}
	}
	class Ce {
		constructor() {
			this.dicEvent = new be
		}
		addEntityListener(e) {
			let t = this.dicEvent.get(e.numberID);
			null == t && (t = new s, this.dicEvent.add(e.numberID, t)), t.addEntity(e)
		}
		addListener(e, t, i) {
			let n = this.dicEvent.get(e);
			null == n && (n = new s, this.dicEvent.add(e, n)), n.add(t, i)
		}
		removeListener(e, t, i) {
			let n = this.dicEvent.get(e);
			null != n && n.remove(t, i)
		}
		triggerListener(e, t) {
			let i = this.dicEvent.get(e);
			null != i && i.invoke(t)
		}
		clearListener(e) {
			let t = this.dicEvent.get(e);
			null != t && t.Dispose(), this.dicEvent.remove(e)
		}
		clearAllListener() {
			for (let e in this.dicEvent.table) this.dicEvent.table[e].Clear();
			this.dicEvent.clear()
		}
	}
	class Re {
		constructor() {
			this.triggerLock = !1, this.addList = new a, this.removeList = new a, this.triggerList = new a, this.numDispatcher = new Ce, this.strDispatcher = new r
		}
		static get instance() {
			return Re.getInstance()
		}
		static getInstance() {
			return null == Re.mInstance && (Re.mInstance = new Re), Re.mInstance
		}
		addListener(e, t, i) {
			if (this.triggerLock) {
				let n = new o(t, i);
				return "number" == typeof e ? n.numberID = e : "string" == typeof e && (n.stringID = e), void this.addList.add(n)
			}
			"number" == typeof e ? this.numDispatcher.addListener(e, t, i) : "string" == typeof e && this.strDispatcher.addListener(e, t, i)
		}
		removeListener(e, t, i) {
			if (this.triggerLock) {
				let n = new o(t, i);
				return "number" == typeof e ? n.numberID = e : "string" == typeof e && (n.stringID = e), void this.removeList.add(n)
			}
			"number" == typeof e ? this.numDispatcher.removeListener(e, t, i) : "string" == typeof e && this.strDispatcher.removeListener(e, t, i)
		}
		triggerListener(e, t) {
			if (this.triggerLock) {
				let i = new o(null, null);
				return i.args = t, "number" == typeof e ? i.numberID = e : "string" == typeof e && (i.stringID = e), void this.triggerList.add(i)
			}
			this.triggerLock = !0, "number" == typeof e ? this.numDispatcher.triggerListener(e, t) : "string" == typeof e && this.strDispatcher.triggerListener(e, t), this.triggerLock = !1, this.afterTrigger()
		}
		afterTrigger() {
			for (let e = 0; e < this.removeList.count; e++) {
				let t = this.removeList.get(e);
				t.stringID ? this.strDispatcher.removeListener(t.stringID, t.eCaller, t.eAction) : this.numDispatcher.removeListener(t.numberID, t.eCaller, t.eAction)
			}
			this.removeList.clear();
			for (let e = 0; e < this.addList.count; e++) {
				let t = this.addList.get(e);
				t.stringID ? this.strDispatcher.addEntityListener(t) : this.numDispatcher.addEntityListener(t)
			}
			this.addList.clear(), this.triggerLock = !0;
			let e = this.triggerList.count;
			for (let t = 0; t < e; t++) {
				let e = this.triggerList.get(t);
				e.stringID ? this.strDispatcher.triggerListener(e.stringID, e.args) : this.numDispatcher.triggerListener(e.numberID, e.args)
			}
			this.triggerList.removeFrom(0, e), this.triggerLock = !1, (this.triggerList.count > 0 || this.removeList.count > 0 || this.addList.count > 0) && this.afterTrigger()
		}
		clearListener(e) {
			"number" == typeof e ? this.numDispatcher.clearListener(e) : "string" == typeof e && this.strDispatcher.clearListener(e)
		}
	}
	class Me {
		constructor() {
			Laya.Browser.onMiniGame ? "object" == typeof tt ? this.mSdk = window.tt : this.mSdk = window.wx : Laya.Browser.onQQMiniGame ? this.mSdk = window.qq : (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && (this.mSdk = window.qg)
		}
		static get I() {
			return h.get(Me)
		}
		getSDK() {
			return this.mSdk
		}
		registerBGEvent() {
			this.mSdk ? (this.mSdk.onHide(e => {
				Re.instance.triggerListener(Me.GameOnHideEvent, e)
			}), this.mSdk.onShow(e => {
				Re.instance.triggerListener(Me.GameOnShowEvent, e)
			})) : Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.onVisiblityEvent)
		}
		onVisiblityEvent() {
			Laya.stage.isVisibility ? Re.instance.triggerListener(Me.GameOnShowEvent) : Re.instance.triggerListener(Me.GameOnHideEvent)
		}
	}
	Me.GameOnShowEvent = "GameOnShowEvent", Me.GameOnHideEvent = "GameOnHideEvent";
	class Oe {
		constructor() {
			if (this.platformVersionCodeNumber = 0, this.platformVersionCodeString = "", this.isDY = !1, this.isTT = !1, this.isWx = !1, this.hasScreenFringe = !1, this.isIphoneX = !1, this.mStatusBarHeight = 0, this.model = "", this.version = "", this.language = "", this.sdk = Me.I.getSDK(), null == this.sdk) return;
			if (!this.sdk.getSystemInfoSync) return;
			let e = this.sdk.getSystemInfoSync();
			this.mStatusBarHeight = e.statusBarHeight * Laya.stage.width / Laya.Browser.clientWidth, this.language = e.language, Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame ? (this.platformVersionCodeString = e.SDKVersion, this.model = e.model, this.version = e.version) : (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && (this.platformVersionCodeNumber = e.platformVersionCode), Laya.Browser.onMiniGame && ("object" == typeof tt ? (this.isTT = !0, "DOUYIN" === e.appName.toUpperCase() && (this.isDY = !0)) : this.isWx = !0), Laya.Browser.onMiniGame && "iPhone X" === e.model.substring(0, 8) && (this.isIphoneX = !0), Laya.Browser.onMiniGame && (e.windowWidth >= 800 || e.windowWidth / e.windowHeight > 2) && (this.hasScreenFringe = !0)
		}
		static get I() {
			return h.get(Oe)
		}
		compareVersion(e) {
			return Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame ? (xe.log("-------compareVersion------ wxqqtt version:", this.platformVersionCodeString), xe.log("-------compareVersion------ wxqqtt vv:", e), this.compareVersionWX(this.platformVersionCodeString, e)) : Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame ? (xe.log("-------compareVersion------ oppovivo version:", this.platformVersionCodeNumber), xe.log("-------compareVersion------ oppovivo vv:", e), this.platformVersionCodeNumber > Number(e) ? 1 : this.platformVersionCodeNumber == Number(e) ? 0 : -1) : void 0
		}
		compareVersionWX(e, t) {
			let i = e.split("."),
				n = t.split(".");
			for (var a = Math.max(i.length, n.length); i.length < a;) i.push("0");
			for (; n.length < a;) n.push("0");
			for (var o = 0; o < a; o++) {
				var s = parseInt(i[o]),
					r = parseInt(n[o]);
				if (s > r) return 1;
				if (s < r) return -1
			}
			return 0
		}
		isDOUYIN() {
			return this.isDY
		}
		isiPhoneX() {
			return this.isIphoneX
		}
		isScreenFringe() {
			return this.hasScreenFringe
		}
		isTTMiniGame() {
			return this.isTT
		}
		isWxMiniGame() {
			return this.isWx
		}
		isQQMiniGame() {
			return Laya.Browser.onQQMiniGame
		}
		isOPPOH5Game() {
			return "object" == typeof OPPO
		}
		statusBarHeight() {
			return this.mStatusBarHeight
		}
		getModel() {
			return this.model
		}
		getVersion() {
			return this.version
		}
		getLanguage() {
			return this.language
		}
	}
	class De { }
	class Ne {
		constructor() {
			this.TimeOut = 5e3, this.httpEventId = "HttpMgr_Event_Result", this.event = new r
		}
		static get instance() {
			return Ne.getInstance()
		}
		static getInstance() {
			return null == Ne.mInstance && (Ne.mInstance = new Ne), Ne.mInstance
		}
		post(e, t, i = "json") {
			this.createHttpRequest(e).send(e, JSON.stringify(t), "post", i, ["Content-Type", "application/json"])
		}
		get(e, t = "json", i) {
			Laya.Browser.onVVMiniGame ? window.qg.request({
				url: e,
				dataType: t,
				method: "GET",
				success: t => {
					this.onComplete(e, t.data)
				},
				fail: (t, i) => {
					let n = {
						error: t,
						code: i
					};
					this.onError(e, n)
				}
			}) : i ? this.createHttpRequest(e).send(e, void 0, "get", t, i) : this.createHttpRequest(e).send(e, void 0, "get", t)
		}
		createHttpRequest(e) {
			let t = new Laya.HttpRequest;
			return t.http.timeout = this.TimeOut, t.once(Laya.Event.COMPLETE, this, this.onComplete, [e]), t.once(Laya.Event.ERROR, this, this.onError, [e]), t
		}
		onComplete(e, t) {
			this.triggerListener(e, !0, t)
		}
		onError(e, t) {
			this.triggerListener(e, !1, t)
		}
		triggerListener(e, t, i) {
			let n = new De;
			n.url = e, n.result = t, n.data = i, this.event.triggerListener(this.httpEventId, n)
		}
		addListener(e, t) {
			this.event.addListener(this.httpEventId, e, t)
		}
		removeListener(e, t) {
			this.event.removeListener(this.httpEventId, e, t)
		}
	}
	class Pe {
		deleteAll() {
			Laya.LocalStorage.clear()
		}
		deleteKey(e) {
			Laya.LocalStorage.removeItem(e)
		}
		getNumber(e, t) {
			let i = Laya.LocalStorage.getItem(e);
			return i ? Number(i) : t
		}
		setNumber(e, t) {
			Laya.LocalStorage.setItem(e, t.toString())
		}
		getString(e, t) {
			let i = Laya.LocalStorage.getItem(e);
			return i || t
		}
		setString(e, t) {
			Laya.LocalStorage.setItem(e, t)
		}
		getBoolean(e, t) {
			let i = Laya.LocalStorage.getItem(e);
			return i ? "1" == i : t
		}
		setBoolean(e, t) {
			let i = t ? "1" : "0";
			Laya.LocalStorage.setItem(e, i)
		}
		getObject(e, t) {
			let i = Laya.LocalStorage.getJSON(e);
			return i || t
		}
		setObject(e, t) {
			Laya.LocalStorage.setJSON(e, t)
		}
	}
	class Ve {
		constructor() {
			this.storage = new Pe
		}
		static get instance() {
			return Ve.getInstance()
		}
		static getInstance() {
			return null == Ve.mInstance && (Ve.mInstance = new Ve), Ve.mInstance
		}
		deleteAll() {
			this.storage.deleteAll()
		}
		deleteKey(e) {
			this.storage.deleteKey(e)
		}
		getNumber(e, t) {
			return this.storage.getNumber(e, t)
		}
		setNumber(e, t) {
			return this.storage.setNumber(e, t)
		}
		getString(e, t) {
			return this.storage.getString(e, t)
		}
		setString(e, t) {
			this.storage.setString(e, t)
		}
		getBoolean(e, t) {
			return this.storage.getBoolean(e, t)
		}
		setBoolean(e, t) {
			this.storage.setBoolean(e, t)
		}
		getObject(e, t) {
			return this.storage.getObject(e, t)
		}
		setObject(e, t) {
			this.storage.setObject(e, t)
		}
	}
	class ke {
		constructor(e, t) {
			this.success = e, this.identity = t
		}
	}
	class Be {
		constructor(e, t, i = "", n = "", a = "", o = 0) {
			this.success = e, this.token = t, this.openid = i, this.unionid = n, this.name = a, this.res_version = o
		}
	}
	class Ge {
		constructor(e, t) {
			this.result = e, this.res = t
		}
	}
	class Fe {
		static isNullOrEmpty(e) {
			return !e || e == Fe.empty
		}
		static isNullOrWhiteSpace(e) {
			try {
				return null == e || "undefined" == e || e.toString().replace(/\s/g, "").length < 1
			} catch (e) {
				return xe.log(e), !1
			}
		}
		static join(e, ...t) {
			try {
				let i = t[0];
				if (Array.isArray(i) || i instanceof Array) {
					let t = Fe.empty;
					for (let n = 0; n < i.length; n++) {
						let a = i[n];
						n < i.length - 1 ? t += a + e : t += a
					}
					return t
				}
				if ("object" == typeof i) {
					let t = Fe.empty,
						n = i;
					return Object.keys(i).forEach(i => {
						t += n[i] + e
					}), t = t.slice(0, t.length - e.length)
				}
				let n = t;
				return Fe.joinString(e, ...n)
			} catch (e) {
				return xe.log(e), Fe.empty
			}
		}
		static format(e, ...t) {
			try {
				return e.match(Fe.regexNumber) ? Fe.formatString(Fe.regexNumber, e, t) : e.match(Fe.regexObject) ? Fe.formatString(Fe.regexObject, e, t, !0) : e
			} catch (e) {
				return xe.log(e), Fe.empty
			}
		}
		static formatString(e, t, i, n = !1) {
			return t.replace(e, (e, t) => {
				let a, o = e.split(":");
				return o.length > 1 && (t = o[0].replace("{", ""), e = o[1].replace("}", "")), null == (a = n ? i[0][t] : i[t]) || null == a || e.match(/{\d+}/) ? a : void 0 !== (a = Fe.parsePattern(e, a)) && null != a ? a : Fe.empty
			})
		}
		static parsePattern(e, t) {
			switch (e) {
				case "L":
					return t = t.toLowerCase();
				case "U":
					return t = t.toUpperCase();
				case "d":
					if ("string" == typeof t) return Fe.getDisplayDateFromString(t);
					if (t instanceof Date) return Fe.format("{0:00}.{1:00}.{2:0000}", t.getDate(), t.getMonth(), t.getFullYear());
					break;
				case "s":
					if ("string" == typeof t) return Fe.getSortableDateFromString(t);
					if (t instanceof Date) return Fe.format("{0:0000}-{1:00}-{2:00}", t.getFullYear(), t.getMonth(), t.getDate());
					break;
				case "n":
					"string" != typeof t && (t = t.toString());
					let i = t.replace(/,/g, ".");
					if (isNaN(parseFloat(i)) || i.length <= 3) break;
					let n = i.split(/[^0-9]+/g),
						a = n;
					n.length > 1 && (a = [Fe.joinString("", ...n.splice(0, n.length - 1)), n[n.length - 1]]);
					let o = a[0],
						s = o.length % 3,
						r = s > 0 ? o.substring(0, s) : Fe.empty,
						l = o.substring(s).match(/.{3}/g);
					return t = (r = r + "." + Fe.join(".", l)) + (a.length > 1 ? "," + a[1] : "")
			}
			return "number" != typeof t && isNaN(t) || isNaN(+e) || Fe.isNullOrWhiteSpace(t) ? t : Fe.formatNumber(t, e)
		}
		static getDisplayDateFromString(e) {
			let t;
			if ((t = e.split("-")).length <= 1) return e;
			let i = t[t.length - 1],
				n = t[t.length - 2],
				a = t[t.length - 3];
			return `${i = (i = i.split("T")[0]).split(" ")[0]}.${n}.${a}`
		}
		static getSortableDateFromString(e) {
			let t = e.replace(",", "").split(".");
			if (t.length <= 1) return e;
			let i = t[t.length - 1].split(" "),
				n = Fe.empty;
			i.length > 1 && (n = i[i.length - 1]);
			let a = `${t[t.length - 1].split(" ")[0]}-${t[t.length - 2]}-${t[t.length - 3]}`;
			return !Fe.isNullOrWhiteSpace(n) && n.length > 1 ? a += `T${n}` : a += "T00:00:00", a
		}
		static formatNumber(e, t) {
			let i = t.length,
				n = e.toString();
			if (i <= n.length) return n;
			let a = i - n.length;
			return new Array(a += 1).join("0") + n
		}
		static joinString(e, ...t) {
			let i = Fe.empty;
			for (let n = 0; n < t.length; n++) {
				if ("string" == typeof t[n] && Fe.isNullOrWhiteSpace(t[n]) || "number" != typeof t[n] && "string" != typeof t[n]) continue;
				i += "" + t[n];
				for (let a = n + 1; a < t.length; a++)
					if (!Fe.isNullOrWhiteSpace(t[a])) {
						i += e, n = a - 1;
						break
					}
			}
			return i
		}
		static strlen(e) {
			let t = 0;
			for (let i = 0; i < e.length; i++) {
				let n = e.charCodeAt(i);
				if (n <= 127) t++;
				else if (n <= 2047) t += 2;
				else if (n >= 55296 && n <= 56319) {
					i++;
					let n = e.charCodeAt(i);
					!Number.isNaN(n) && n >= 56320 && n <= 57343 && (t += 4)
				} else t += n <= 65535 ? 3 : 4
			}
			return t
		}
		static replaceStr(e, t) {
			if (t.length > 0)
				for (let i = 0, n = t.length; i < n; i++) e = e.split("{" + (i + 1) + "}").join(t[i]);
			return e
		}
	}
	Fe.regexNumber = /{(\d+(:\w*)?)}/g, Fe.regexObject = /{(\w+(:\w*)?)}/g, Fe.empty = "";
	class ze {
		constructor() {
			this.params = new n
		}
		get(e) {
			return this.params.get(e)
		}
		add(e, t) {
			if (this.params.containsKey(e)) return !1;
			let i = t;
			"object" == typeof t && (i = JSON.stringify(t)), this.params.add(e, i)
		}
		toMap(e) {
			if (!Fe.isNullOrEmpty(e)) {
				let t = e.split("&");
				for (let e in t) {
					let t = e.split("=");
					this.params.add(t[0], t[1])
				}
			}
		}
		ToString() {
			let e = "",
				t = 0;
			for (let i in this.params.table) {
				t++, e += `${i}=${this.params.get(i)}${t == this.params.count ? "" : "&"}`
			}
			return e
		}
	}
	class Xe {
		constructor() {
			this.name = "uc10d016", this.uuid = "uc10d016", Ne.instance.addListener(this, this.onLoginComplete), this.shareParam = Ve.instance.getString("H5Share_query"), Fe.isNullOrEmpty(this.shareParam) || Ve.instance.setString("H5Share_query", ""), this.name = Ve.instance.getString("H5Login_name", `${(new Date).getTime()}${Math.random()}`), this.uuid = Ve.instance.getString("H5Login_uuid", `${(new Date).getTime()}${Math.random()}`), Ve.instance.setString("H5Login_name", this.name), Ve.instance.setString("H5Login_uuid", this.uuid)
		}
		login(e, t) {
			this.caller = e, this.func = t;
			let i = new ze;
			i.toMap(Ve.instance.getString("H5Share_query"));
			let n = i.get("invite_token");
			n = n || "", this.url = `${p.ucenter}/api/user/login2`;
			let a = {
				uuid: this.uuid,
				gamekey: "0"
			};
			Ne.instance.post(this.url, a)
		}
		onLoginComplete(e) {
			if (e.url == this.url && (xe.log(e), this.caller && this.func)) {
				let t = e.data.data;
				c.instance.openid = t.union_id;
				let i = new Ge(e.result, new Be(e.data.message, t.token, t.union_id, t.union_id, this.name, e.data.res_version));
				this.func.call(this.caller, i)
			}
		}
		checkUserInfoAuthorize(e, t) {
			t.call(e, !0)
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			let r = new ke(!0, s);
			return o.call(a, !0, r), null
		}
		destroyAuthorizeBtn(e) { }
		getUserInfo() {
			return null
		}
		getArea() {
			return ""
		}
		getSex() {
			return 0
		}
		getLaunchShareQuery() {
			if (!Fe.isNullOrEmpty(this.shareParam)) {
				let e = {},
					t = this.shareParam.split("&");
				for (let i in t) {
					let t = i.split("=");
					e[t[0]] = t[1]
				}
				return e
			}
			return null
		}
		getLaunchReferrerInfo() {
			return null
		}
		getLaunchScene() {
			return null
		}
	}
	class Ye {
		constructor(e, t) {
			this.success = e, this.title = t
		}
	}
	class Ue {
		constructor() {
			Laya.stage.stage.on(Laya.Event.FOCUS, this, this.onFocus), Laya.stage.stage.on(Laya.Event.BLUR, this, this.onBLUR)
		}
		share(e, t, i, n, a) {
			this.caller = n, this.func = a, Ve.instance.setString("H5Share_query", i), this.OnShareComplete(!0, e)
		}
		OnShareComplete(e, t) {
			let i = new Ye(e, t);
			this.func.call(this.caller, i)
		}
		setDefaultShareContent(e, t, i) { }
		setDefaultShareHandler(e, t) { }
		setVisibleHandler(e, t) {
			this.visibleCaller = e, this.visibleFunc = t
		}
		onFocus() {
			this.visibleCaller && this.visibleFunc.call(this.visibleCaller, !0, null)
		}
		onBLUR() {
			this.visibleCaller && this.visibleFunc.call(this.visibleCaller, !1, null)
		}
	}
	class He {
		constructor() {
			this.group = 0, this.model = "", this.version = ""
		}
		initAnalysis() {
			this.gamekey = U.I.getConf().gamekey, this.url = `${U.I.getConf().ucenter}/api/logs/action`, "" != Ve.instance.getString(He.OK_ANALYSIS_OPENID, "") && (c.instance.openid = Ve.instance.getString(He.OK_ANALYSIS_OPENID, "")), this.group = Ve.instance.getNumber(He.OK_ANALYSIS_GROUP, -1), this.group++, Ve.instance.setNumber(He.OK_ANALYSIS_GROUP, this.group), this.model = Oe.I.getModel(), this.version = Oe.I.getVersion()
		}
		traceEvent(e, t) {
			let i = {
				action_id: e,
				gamekey: this.gamekey,
				openid: c.instance.openid,
				model: this.model,
				version: this.version,
				group: this.group,
				param: t
			};
			d.instance.post(this.url, i)
		}
		updateGroup() {
			this.group++, Ve.instance.setNumber(He.OK_ANALYSIS_GROUP, this.group)
		}
		traceNavigateEvent(e, t, i) { }
		traceCustomEvent(e, t) { }
	}
	He.OK_ANALYSIS_GROUP = "OK_ANALYSIS_GROUP", He.OK_ANALYSIS_OPENID = "OK_ANALYSIS_OPENID";
	class We {
		constructor() {
			this.wx = window.wx
		}
		login(e, t, i = !1) {
			this.loginCaller = e, this.loginFunc = t, this.wx.login({
				success: e => {
					e.code ? i ? this.refreshUserInfo(e.code) : this.requestToken(e.code) : this.onLoginComplete(!1, new Be(!1, `wx.login callback success but no code,errMsg:${e.errMsg}`))
				},
				fail: () => {
					this.onLoginComplete(!1, new Be(!1, "wx.login callback fail"))
				}
			})
		}
		requestToken(e) {
			let t = {};
			t = {
				appid: p.appId,
				code: e,
				gamekey: p.gamekey
			}, xe.log("requestToken loginData :", t);
			let i = `${p.ucenter}/api/user/login2`;
			this.wx.request({
				url: i,
				method: "POST",
				data: t,
				success: e => {
					xe.log("wx login request res:", e), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : (e && e.data && e.data.code && xe.log("wx login request failed code:", e.data.code), e && e.data && e.data.message && xe.log("wx login request failed message:", e.data.message), this.onLoginComplete(!1, new Be(!1, "wx.request callback success but request not success")))
				},
				fail: e => {
					xe.log("fail:", e), this.onLoginComplete(!1, new Be(!1, `wx.request callback fail,${e}`))
				}
			})
		}
		requestTokenWithInfo(e) {
			let t = this.wx.getLaunchOptionsSync(),
				i = "";
			for (let e in t.query) i = `&${e}=${t.query[e]}`;
			let n = {},
				a = "",
				o = "";
			t && t.query && t.query.oGamekey && (a = t.query.oGamekey), t && t.query && t.query.oUid && (o = t.query.oUid), n = {
				appid: p.appId,
				code: e,
				gamekey: p.gamekey,
				o_gamekey: a,
				o_uid: o,
				encrypted_data: c.instance.encryptedData,
				iv: c.instance.iv
			}, xe.log("requestToken loginData :", n);
			let s = `${p.ucenter}/api/user/login2`;
			this.wx.request({
				url: s,
				method: "POST",
				data: n,
				success: e => {
					xe.log("wx login request res:", e), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : (e && e.data && e.data.code && xe.log("wx login request failed code:", e.data.code), e && e.data && e.data.message && xe.log("wx login request failed message:", e.data.message), this.onLoginComplete(!1, new Be(!1, "wx.request callback success but request not success")))
				},
				fail: e => {
					xe.log("fail:", e), this.onLoginComplete(!1, new Be(!1, `wx.request callback fail,${e}`))
				}
			})
		}
		destroyAuthorizeBtn(e) {
			e && e.destroy()
		}
		onLoginComplete(e, t) {
			let i = new Ge(e, t);
			this.loginFunc.call(this.loginCaller, i)
		}
		checkUserInfoAuthorize(e, t) {
			this.userInfo ? t.call(e, !0) : this.wx.getSetting({
				success: i => {
					i.authSetting["scope.userInfo"] ? this.setUserInfo(e, t) : t.call(e, !1)
				},
				fail: i => {
					t.call(e, !1)
				}
			})
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			if (this.userInfo) {
				let e = new ke(!0, s);
				return void o.call(a, e)
			}
			let r = this.wx.createUserInfoButton({
				type: "text",
				text: "",
				style: {
					left: e,
					top: t,
					width: i,
					height: n,
					fontSize: 16,
					color: "#ffffff",
					borderRadius: 4
				}
			});
			return r.onTap(e => {
				"getUserInfo:ok" == e.errMsg ? (r.destroy(), this.setUserInfo(a, o, !0, s)) : this.wx.showModal({
					title: "提示",
					content: "授权失败,请重试!",
					showCancel: !1,
					complete() {
						let e = new ke(!1, s);
						o.call(a, e)
					}
				})
			}), r
		}
		getUserInfo() {
			return this.userInfo
		}
		getArea() {
			return this.userInfo ? this.userInfo.city : ""
		}
		getSex() {
			return this.userInfo ? this.userInfo.gender : 0
		}
		setUserInfo(e, t, i, n) {
			this.wx.getUserInfo({
				success: a => {
					if (this.userInfo = a.userInfo, c.instance.encryptedData = a.encryptedData, c.instance.iv = a.iv, xe.log("--- setUserInfo ---:", a), i) {
						let i = new ke(!0, n);
						t.call(e, i)
					} else t.call(e, !0)
				},
				fail: a => {
					if (i) {
						let i = new ke(!1, n);
						t.call(e, i)
					} else t.call(e, !1)
				}
			})
		}
		getLaunchShareQuery() {
			let e = this.wx.getLaunchOptionsSync();
			return e && e.query ? e.query : null
		}
		getLaunchReferrerInfo() {
			let e = this.wx.getLaunchOptionsSync();
			return e && e.referrerInfo ? e.referrerInfo : null
		}
		getLaunchScene() {
			let e = this.wx.getLaunchOptionsSync();
			return e && e.scene ? e.scene : null
		}
		refreshUserInfo(e) {
			this.wx.getSetting({
				success: t => {
					t.authSetting["scope.userInfo"] && this.wx.getUserInfo({
						success: t => {
							this.userInfo = t.userInfo, c.instance.encryptedData = t.encryptedData, c.instance.iv = t.iv, this.requestToken(e)
						},
						fail: e => { }
					})
				},
				fail: e => { }
			})
		}
	}
	class Ke {
		constructor() {
			this.wx = window.wx;
			let e = this.wx.getSystemInfoSync();
			this.platform = e.platform
		}
		pay(e, t, i) {
			this.payCaller = t, this.payFunc = i, this.requestAddOrder(e)
		}
		requestAddOrder(e) {
			let t = `${p.ucenter}/pay/add_wxmini_order`;
			this.wx.request({
				url: t,
				data: {
					game_id: p.appId,
					goods_id: e,
					platform: this.platform
				},
				method: "POST",
				header: {
					"Content-Type": "application/json"
				},
				success: e => {
					200 == e.statusCode ? this.onAddOrderComplete(!0, e.data) : this.onAddOrderComplete(!1, e)
				},
				fail: e => {
					this.onAddOrderComplete(!1, e)
				}
			})
		}
		onAddOrderComplete(e, t) {
			xe.log("OnAddOrderComplete:", e, ",res", t), e ? this.requestMidasPayment(t) : (xe.error("AddOrder fail:", t), this.invokePayResult(!1))
		}
		requestMidasPayment(e) {
			this.orderId = e.order_id, this.wx.requestMidasPayment({
				mode: "game",
				env: 0,
				offerId: e.offer_id,
				currencyType: "CNY",
				platform: this.platform,
				buyQuantity: e.buyQuantity,
				zoneId: "1",
				success: e => {
					this.onMidasPaymentComplete(!0, e)
				},
				fail: t => {
					this.onMidasPaymentComplete(!1, e)
				}
			})
		}
		onMidasPaymentComplete(e, t) {
			xe.log("OnMidasPaymentComplete:", e, ",res", t), e ? this.requestDeliverOrder(t) : (xe.error("MidasPayment fail:", t), this.invokePayResult(!1))
		}
		requestDeliverOrder(e) {
			let t = `${p.ucenter}/pay/deliver_wxmini_order`;
			this.wx.request({
				url: t,
				data: {
					order_id: this.orderId,
					platform: this.platform
				},
				method: "POST",
				header: {
					"Content-Type": "application/json"
				},
				success: e => {
					200 == e.statusCode ? this.onDeliverOrderComplete(!0, e.data) : this.onDeliverOrderComplete(!1, e)
				},
				fail: e => {
					this.onDeliverOrderComplete(!1, e)
				}
			})
		}
		onDeliverOrderComplete(e, t) {
			xe.log("OnDeliverOrderComplete:", e, ",res", t), e || xe.error("DeliverOrder fail:", t), this.invokePayResult(e)
		}
		invokePayResult(e) {
			this.payCaller && this.payFunc && this.payFunc.call(this.payCaller, e)
		}
	}
	class Ze {
		constructor() {
			let e = window.wx;
			e && (this.openContext = e.getOpenDataContext())
		}
		postGraphicsCmd(e, t, i) {
			if (!this.openContext) return;
			let n = e.width,
				a = e.height;
			this.openContext.canvas.width = 1 * n, this.openContext.canvas.height = 1 * a;
			let o = new Laya.Point;
			o = e.localToGlobal(o);
			let s = Laya.stage._canvasTransform,
				r = new Laya.Matrix(s.a, 0, 0, s.d, o.x * s.a, o.y * s.d);
			this.openContext.postMessage({
				eventId: t,
				canvasData: {
					scale: 1,
					matrix: r
				},
				extraData: i
			})
		}
		clearGraphicsCmd(e) {
			this.openContext && (this.openContext.postMessage({
				eventId: e
			}), this.shareTexture && this.shareTexture.destroy())
		}
		openRank(e) {
			this.postGraphicsCmd(e, _.openRank)
		}
		closeRank() {
			this.clearGraphicsCmd(_.closeRank)
		}
		requestRank(e, t) {
			this.openContext && this.openContext.postMessage({
				eventId: _.requestRank,
				requestData: {
					rankType: e,
					key: t
				}
			})
		}
		pushScore(e, t, i) {
			this.openContext && this.openContext.postMessage({
				eventId: _.pushScore,
				pushData: {
					key: e,
					score: t,
					unit: i
				}
			})
		}
		openSurpass(e, t) { }
		closeSurpass() { }
	} ! function (e) {
		e[e.pushOpenId = 1] = "pushOpenId", e[e.pushScore = 2] = "pushScore", e[e.openRank = 3] = "openRank", e[e.requestRank = 4] = "requestRank", e[e.closeRank = 5] = "closeRank"
	}(_ || (_ = {}));
	class je {
		constructor() {
			this.defTime = 3e3, this.curTime = 0, this.wx = window.wx, this.showShareMenu()
		}
		showShareMenu() {
			-1 != Oe.I.compareVersion("2.11.3") && Laya.Browser.onAndroid ? this.wx.showShareMenu({
				withShareTicket: !0,
				menus: ["shareAppMessage", "shareTimeline"]
			}) : this.wx.showShareMenu({
				withShareTicket: !0
			}), this.wx.aldOnShareAppMessage ? this.wx.aldOnShareAppMessage(() => (this.defaultCaller && this.defaultFunc && this.defaultFunc.call(this.defaultCaller), {
				title: this.defTitle,
				imageUrl: this.defImgUrl,
				query: this.defQuery
			})) : this.wx.onShareAppMessage(() => (this.defaultCaller && this.defaultFunc && this.defaultFunc.call(this.defaultCaller), {
				title: this.defTitle,
				imageUrl: this.defImgUrl,
				query: this.defQuery
			})), this.wx.updateShareMenu({
				withShareTicket: !0
			}), Re.instance.addListener(Me.GameOnShowEvent, this, this.onGameShowEvent), Re.instance.addListener(Me.GameOnHideEvent, this, this.onGameHideEvent)
		}
		onGameShowEvent(e) {
			this.resultTitle && (this.onShareComplete((new Date).getTime() - this.curTime >= this.defTime, this.resultTitle), this.curTime = 0, this.resultTitle = void 0), this.visibleFunc.call(this.visibleCaller, !0, e)
		}
		onGameHideEvent(e) {
			this.visibleFunc.call(this.visibleCaller, !1, e)
		}
		share(e, t, i, n, a) {
			this.resultCaller = n, this.resultFunc = a, this.resultTitle = e, this.curTime = (new Date).getTime(), this.wx.aldShareAppMessage ? this.wx.aldShareAppMessage({
				title: e,
				imageUrl: t,
				query: i
			}) : this.wx.shareAppMessage({
				title: e,
				imageUrl: t,
				query: i
			})
		}
		onShareComplete(e, t) {
			let i = new Ye(e, t);
			this.resultFunc.call(this.resultCaller, i)
		}
		setDefaultShareContent(e, t, i) {
			this.defTitle = e, this.defImgUrl = t, this.defQuery = i
		}
		setDefaultShareHandler(e, t) {
			this.defaultCaller = e, this.defaultFunc = t
		}
		setVisibleHandler(e, t) {
			this.visibleCaller = e, this.visibleFunc = t
		}
	}
	class qe extends We {
		constructor() {
			super(), this.wx = window.qq
		}
		requestToken(e) {
			let t = {};
			t = {
				appid: p.appId,
				code: e,
				gamekey: p.gamekey
			}, xe.log("loginData:", t);
			let i = `${p.ucenter}/api/user/login2`;
			this.wx.request({
				url: i,
				method: "POST",
				data: t,
				success: e => {
					xe.log("qq login request res:", e), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : this.onLoginComplete(!1, new Be(!1, "qq.request callback success but request not success"))
				},
				fail: e => {
					xe.log("fail:", e), this.onLoginComplete(!1, new Be(!1, `qq.request callback fail,${e}`))
				}
			})
		}
	}
	class Qe extends je {
		constructor() {
			super(), this.wx = window.qq, this.showShareMenu()
		}
	}
	class $e extends je {
		constructor() {
			super(), this.wx = window.tt, this.showShareMenu()
		}
	}
	class Je extends We {
		constructor() {
			super(), this.wx = window.tt
		}
		login(e, t) {
			this.loginCaller = e, this.loginFunc = t, this.wx.login({
				force: !1,
				success: e => {
					e ? this.requestTokenTT(e.code, e.anonymousCode) : this.onLoginComplete(!1, new Be(!1, `wx.login callback success but no code,errMsg:${e.errMsg}`))
				},
				fail: () => {
					this.onLoginComplete(!1, new Be(!1, "wx.login callback fail"))
				}
			})
		}
		requestTokenTT(e, t) {
			let i = {};
			i = e ? {
				appid: p.appId,
				code: e,
				anonymous_code: t,
				gamekey: p.gamekey
			} : {
				appid: p.appId,
				anonymous_code: t,
				gamekey: p.gamekey
			}, xe.log("loginData:", i);
			let n = `${p.ucenter}/api/user/login2`;
			this.wx.request({
				url: n,
				method: "POST",
				data: i,
				success: e => {
					xe.log("tt login request res:", e), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : this.onLoginComplete(!1, new Be(!1, "qq.request callback success but request not success"))
				},
				fail: e => {
					xe.log("fail:", e), this.onLoginComplete(!1, new Be(!1, `qq.request callback fail,${e}`))
				}
			})
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			if (this.userInfo) {
				let e = new ke(!0, s);
				return void o.call(a, e)
			}
			let r = this;
			this.wx.authorize({
				scope: "scope.userInfo",
				success(e) {
					r.wx.getUserInfo({
						withCredentials: !1,
						success(e) {
							r.userInfo = e.userInfo;
							let t = new ke(!0, s);
							o.call(a, t)
						},
						fail(e) {
							r.wx.showModal({
								title: "提示",
								content: "授权失败,请重试!",
								success() { },
								fail() { },
								complete() {
									let e = new ke(!1, s);
									o.call(a, e)
								}
							})
						}
					})
				},
				fail(e) {
					r.wx.showModal({
						title: "提示",
						content: "授权失败,请重试!",
						success() { },
						fail() { },
						complete() {
							let e = new ke(!1, s);
							o.call(a, e)
						}
					})
				},
				complete() { }
			})
		}
	}
	class et extends Ze {
		constructor() {
			super(), this.wx = window.tt, this.wx && (this.openContext = this.wx.getOpenDataContext())
		}
	}
	class it {
		constructor() {
			this.wx = window.qg
		}
		setDefaultShareContent(e, t, i) { }
		setDefaultShareHandler(e, t) { }
		setVisibleHandler(e, t) { }
		showShareMenu() { }
		share(e, t, i, n, a) {
			-1 != Oe.I.compareVersion("1056") ? this.wx.share({
				success: function () { },
				fail: function (e, t) { },
				cancel: function () { },
				complete: function () { }
			}) : this.wx.showToast({
				message: "该功能暂不支持, 请升级平台版本"
			})
		}
	}
	class nt extends We {
		constructor() {
			super(), this.wx = window.qg
		}
		login(e, t, i = !1) {
			this.loginCaller = e, this.loginFunc = t, this.wx.login({
				success: e => {
					e ? (this.userInfo = e.data, this.userInfo.gender = this.userInfo.sex, this.userInfo.avatarUrl = this.userInfo.avatar, "F" == this.userInfo.sex ? this.userInfo.gender = 2 : "M" == this.userInfo.sex ? this.userInfo.gender = 1 : this.userInfo.gender = 0, this.userInfo.location && (this.userInfo.city = this.userInfo.location), c.instance.oToken = e.token, e.data && e.data.uid ? this.requestToken(e.data) : this.onLoginComplete(!1, new Be(!1, "oppo id is null"))) : this.onLoginComplete(!1, new Be(!1, `wx.login callback success but no code,errMsg:${e.errMsg}`))
				},
				fail: e => {
					this.onLoginComplete(!1, new Be(!1, "wx.login callback fail"))
				}
			})
		}
		requestToken(e) {
			d.instance.addListener(this, this.onLoginUcenter);
			let t = {};
			t = {
				appid: p.appId,
				uuid: e.uid,
				gamekey: p.gamekey
			}, this.url = `${p.ucenter}/api/user/login2`, d.instance.post(this.url, t)
		}
		checkUserInfoAuthorize(e, t) {
			t.call(e, !0)
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			let r = new ke(!0, s);
			return o.call(a, !0, r), null
		}
		destroyAuthorizeBtn(e) { }
		getUserInfo() {
			return this.userInfo
		}
		onLoginUcenter(e) {
			e.url == this.url && (d.instance.removeListener(this, this.onLoginUcenter), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : this.onLoginComplete(!1, new Be(!1, "qg.request callback success but request not success")))
		}
	}
	class at extends We {
		constructor() {
			super(), this.wx = window.OPPO
		}
		login(e, t, i = !1) {
			this.loginCaller = e, this.loginFunc = t, this.wx.login({
				packageName: U.I.getConf().pkg,
				callback: e => {
					e ? (console.error("login:"), console.error(e), this.userInfo = e, this.userInfo.gender = this.userInfo.sex, this.userInfo.avatarUrl = this.userInfo.avatar, this.userInfo.nickName = this.userInfo.userName, "F" == this.userInfo.sex ? this.userInfo.gender = 2 : "M" == this.userInfo.sex ? this.userInfo.gender = 1 : this.userInfo.gender = 0, c.instance.oToken = e.token, this.requestToken(e)) : this.onLoginComplete(!1, new Be(!1, `oppo h5.login callback success but no code,errMsg:${e.errMsg}`))
				}
			})
		}
		requestToken(e) {
			d.instance.addListener(this, this.onLoginUcenter);
			let t = {};
			t = {
				appid: p.appId,
				uuid: e.userId,
				gamekey: p.gamekey
			}, this.url = `${p.ucenter}/api/user/login2`, d.instance.post(this.url, t)
		}
		checkUserInfoAuthorize(e, t) {
			t.call(e, !0)
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			let r = new ke(!0, s);
			return o.call(a, !0, r), null
		}
		destroyAuthorizeBtn(e) { }
		getUserInfo() {
			return this.userInfo
		}
		onLoginUcenter(e) {
			e.url == this.url && (console.log("onLoginUcenter"), console.log(e), d.instance.removeListener(this, this.onLoginUcenter), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : this.onLoginComplete(!1, new Be(!1, "oppo h5.request callback success but request not success")))
		}
		getLaunchShareQuery() {
			return null
		}
		getLaunchReferrerInfo() {
			return null
		}
		getLaunchScene() {
			return null
		}
	}
	class ot { }
	ot.GAME_SDK_CONFIG = "GAME_SDK_CONFIG";
	class st {
		constructor() {
			this.init = !1, "undefined" != typeof YDSDK && (this.init = !0)
		}
		static get I() {
			return h.get(st)
		}
		start() {
			this.init && YDSDK.start()
		}
		load() {
			this.init && YDSDK.load({
				onSuccess: e => {
					Re.instance.triggerListener(ot.GAME_SDK_CONFIG, e)
				}
			})
		}
		onGameShowEvent(e) {
			this.init && YDSDK.onShow()
		}
		onGameHideEvent(e) {
			this.init && YDSDK.onHide()
		}
		onShare() {
			this.init && YDSDK.onShare({})
		}
		onLevelStatistics(e) {
			this.init && YDSDK.onLevelStatistics({
				guanqia: e.guanqia,
				type: e.type
			})
		}
		onWeidu(e) {
			this.init && YDSDK.onWeidu({
				weidu: e.weidu
			})
		}
		onEvent(e) {
			this.init && YDSDK.onEvent(e)
		}
		getSaleData() {
			this.init && YDSDK.getSaleData((e, t) => {
				console.log("YDSDK.getSaleData"), console.log(e), console.log(t), console.log(t.isOpenSale), console.log(t.saleData);
				let i = U.I.getConf();
				if (i.jumptoGameList = [], e && t.isOpenSale)
					for (let e of t.saleData) {
						console.log(e);
						let t = {};
						t.appId = e.bAppid, t.appName = e.bName, e.piList[0].btitle && "" != e.piList[0].btitle && (t.appName = e.piList[0].btitle), t.icon = e.piList[0].bIcon, t.path = e.piList[0].bPath, t.page = e.lcList[0].p, t.grid = e.lcList[0].gList[0].g, t.iconId = e.lcList[0].gList[0].idx, i.jumptoGameList.push(t)
					}
			})
		}
		onSaleActionUpLoad(e, t) {
			this.init && YDSDK.onSaleActionUpLoad(e.page, e.grid, e.iconid, e.appid, t)
		}
	}
	class rt {
		static get I() {
			return h.get(rt)
		}
		constructor() {
			Re.instance.addListener(Me.GameOnShowEvent, this, this.onGameShowEvent), Re.instance.addListener(Me.GameOnHideEvent, this, this.onGameHideEvent)
		}
		start() {
			st.I.start(), this.onEvent({
				event: "game_start",
				time: Date.now(),
				scene: "load_scene"
			})
		}
		load() {
			st.I.load()
		}
		onGameShowEvent(e) {
			st.I.onGameShowEvent(e)
		}
		onGameHideEvent(e) {
			st.I.onGameHideEvent(e)
		}
		onShare() {
			st.I.onShare()
		}
		onLevelStatistics(e) {
			st.I.onLevelStatistics(e)
		}
		onWeidu(e) {
			st.I.onWeidu(e)
		}
		onEvent(e) {
			st.I.onEvent(e)
		}
		getSaleData() {
			st.I.getSaleData()
		}
		onSaleActionUpLoad(e, t) {
			st.I.onSaleActionUpLoad(e, t)
		}
	}
	class lt extends We {
		constructor() {
			super(), this.wx = window.qg
		}
		login(e, t, i = !1) {
			this.loginCaller = e, this.loginFunc = t, this.wx.login({
				success: e => {
					e ? (console.error("---login:", e), this.userInfo = e.data, this.userInfo.gender = this.userInfo.sex, this.userInfo.avatarUrl = this.userInfo.avatar, "F" == this.userInfo.sex ? this.userInfo.gender = 2 : "M" == this.userInfo.sex ? this.userInfo.gender = 1 : this.userInfo.gender = 0, this.userInfo.location && (this.userInfo.city = this.userInfo.location), c.instance.oToken = e.token, e.token ? this.requestToken(e.token) : (console.log("vivo id is null"), this.onLoginComplete(!1, new Be(!1, "oppo id is null")))) : this.onLoginComplete(!1, new Be(!1, `wx.login callback success but no code,errMsg:${e.errMsg}`))
				},
				fail: e => {
					console.log("fail:", e), this.onLoginComplete(!1, new Be(!1, "wx.login callback fail"))
				}
			})
		}
		requestToken(e) {
			d.instance.addListener(this, this.onLoginUcenter);
			let t = {};
			t = {
				appid: p.appId,
				gamekey: p.gamekey,
				password: e,
				app_key: U.I.getConf().app_key,
				pkg_name: U.I.getConf().pkg
			}, this.url = `${p.ucenter}/api/user/login2`, d.instance.post(this.url, t)
		}
		checkUserInfoAuthorize(e, t) {
			t.call(e, !0)
		}
		applyUserInfoAuthorize(e, t, i, n, a, o, s) {
			let r = new ke(!0, s);
			return o.call(a, !0, r), null
		}
		destroyAuthorizeBtn(e) { }
		getUserInfo() {
			return this.userInfo
		}
		onLoginUcenter(e) {
			e.url == this.url && (xe.log("--VIVO---LoginUcenter-----", e), d.instance.removeListener(this, this.onLoginUcenter), e && e.data && 200 == e.data.code && e.data.data && e.data.data.open_id ? (c.instance.openid = e.data.data.open_id, Ve.instance.setString(He.OK_ANALYSIS_OPENID, c.instance.openid), this.onLoginComplete(!0, new Be(!0, e.data.data.token, e.data.data.open_id, e.data.data.union_id))) : this.onLoginComplete(!1, new Be(!1, "vv.request callback success but request not success")))
		}
	}
	class dt {
		constructor() {
			this.buildSDK(), this.dispatcher = new r
		}
		static get I() {
			return h.get(dt)
		}
		addListener(e, t, i) {
			this.dispatcher.addListener(e, t, i)
		}
		removeListener(e, t, i) {
			this.dispatcher.removeListener(e, t, i)
		}
		buildSDK() {
			Laya.Browser.onMiniGame ? "object" == typeof tt ? (this.loginSDK = new Je, this.shareSDK = new $e, this.rankSDK = new et) : (this.loginSDK = new We, this.shareSDK = new je, this.paymentSDK = new Ke, this.rankSDK = new Ze) : Laya.Browser.onQQMiniGame ? (this.loginSDK = new qe, this.shareSDK = new Qe) : Laya.Browser.onVVMiniGame ? (this.loginSDK = new lt, this.shareSDK = new it) : Laya.Browser.onQGMiniGame ? this.loginSDK = new nt : Oe.I.isOPPOH5Game() ? this.loginSDK = new at : Laya.Browser.onTTMiniGame ? (this.loginSDK = new Je, this.shareSDK = new $e, this.rankSDK = new et) : window.FBInstant || (this.loginSDK = new Xe, this.shareSDK = new Ue), this.okAnalysis = new He, this.setVisibleHandler()
		}
		login(e = !1) {
			this.loginSDK && this.loginSDK.login(this, this.onLogin, e)
		}
		onLogin(e) {
			this.dispatcher.triggerListener(dt.LoginApp, e)
		}
		checkUserInfoAuthorize() {
			this.loginSDK && this.loginSDK.checkUserInfoAuthorize(this, this.onCheckUserInfoAuthorize)
		}
		onCheckUserInfoAuthorize(e) {
			this.dispatcher.triggerListener(dt.CheckUserInfoAuthorize, e)
		}
		applyUserInfoAuthorize(e, t = 0) {
			if (this.loginSDK) {
				let i = Laya.Browser.clientWidth / Laya.stage.width,
					n = new Laya.Point,
					a = (n = e.localToGlobal(n)).x * i,
					o = n.y * i,
					s = e.width * i,
					r = e.height * i;
				return this.loginSDK.applyUserInfoAuthorize(a, o, s, r, this, this.onApplyUserInfoAuthorize, t)
			}
			return null
		}
		onApplyUserInfoAuthorize(e) {
			this.dispatcher.triggerListener(dt.ApplyUserInfoAuthorize, e)
		}
		destroyAuthorizeBtn(e) {
			this.loginSDK && this.loginSDK.destroyAuthorizeBtn(e)
		}
		getUserInfo() {
			return this.loginSDK ? this.loginSDK.getUserInfo() : null
		}
		getArea() {
			return this.loginSDK ? this.loginSDK.getArea() : ""
		}
		getSex() {
			return this.loginSDK ? this.loginSDK.getSex() : 0
		}
		getLaunchShareQuery() {
			return this.loginSDK ? this.loginSDK.getLaunchShareQuery() : null
		}
		getLaunchReferrerInfo() {
			return this.loginSDK ? this.loginSDK.getLaunchReferrerInfo() : null
		}
		getLaunchScene() {
			return this.loginSDK ? this.loginSDK.getLaunchScene() : null
		}
		onVisible(e, t) {
			this.dispatcher.triggerListener(dt.VisibleChange, {
				isVisible: e,
				res: t
			})
		}
		share(e, t, i) {
			this.shareSDK && this.shareSDK.share(e, t, i, this, this.onShare), rt.I.onShare()
		}
		onShare(e) {
			this.dispatcher.triggerListener(dt.ShareApp, e)
		}
		setDefaultShareContent(e, t, i) {
			this.shareSDK && this.shareSDK.setDefaultShareContent(e, t, i)
		}
		setDefaultShareHandler(e, t) {
			this.shareSDK && this.shareSDK.setDefaultShareHandler(e, t)
		}
		setVisibleHandler() {
			this.shareSDK && this.shareSDK.setVisibleHandler(this, this.onVisible)
		}
		payment(e) {
			this.paymentSDK && this.paymentSDK.pay(e, this, this.onPayment)
		}
		onPayment(e) {
			this.dispatcher.triggerListener(dt.Payment, e)
		}
		openRank(e) {
			this.rankSDK && this.rankSDK.openRank(e)
		}
		closeRank() {
			this.rankSDK && this.rankSDK.closeRank()
		}
		requestRank(e = 1, t = "rank") {
			this.rankSDK && this.rankSDK.requestRank(e, t)
		}
		pushRank(e = "rank", t, i = "关") {
			this.rankSDK && this.rankSDK.pushScore(e, t, i)
		}
		openSurpass(e, t) {
			this.rankSDK && this.rankSDK.openSurpass(e, t)
		}
		closeSurpass() {
			this.rankSDK && this.rankSDK.closeSurpass()
		}
		initAnalysis() {
			this.okAnalysis && this.okAnalysis.initAnalysis()
		}
		traceEvent(e, t) {
			this.okAnalysis && this.okAnalysis.traceEvent(e, t)
		}
		traceNavigateEvent(e, t, i) {
			this.okAnalysis && this.okAnalysis.traceNavigateEvent(e, t, i)
		}
		traceCustomEvent(e, t) {
			this.okAnalysis && this.okAnalysis.traceCustomEvent(e, t)
		}
		updateGroup() {
			this.okAnalysis && this.okAnalysis.updateGroup()
		}
	}
	dt.ShareApp = "ShareApp", dt.LoginApp = "LoginApp", dt.Payment = "Payment", dt.CheckUserInfoAuthorize = "CheckUserInfoAuthorize", dt.ApplyUserInfoAuthorize = "ApplyUserInfoAuthorize", dt.VisibleChange = "VisibleChange";
	class ht {
		constructor() {
			if (this.deviceBrand = "", this.deviceModel = "", this.deviceSystem = "", this.onTimeLimit = 3e4, this.isOnShow = !0, this.isStartOn = !1, this.isBattle = !1, this.levelDuration = 0, this.isIgnore = !1, this.sdk = Me.I.getSDK(), Re.instance.addListener(Me.GameOnHideEvent, this, this.onGameHideEvent), Re.instance.addListener(Me.GameOnShowEvent, this, this.onGameShowEvent), d.instance.addListener(this, this.onGetConfComplete), ht.getLoalData(ht.localKey, t => {
				e.isNullOrEmpty(t) ? (console.log("没有数据没有数据"), ht.localData.guid = ht.uuid(), ht.localData.onTime = 0, ht.localData.city = "", ht.setLocalData(ht.localKey, ht.localData)) : (console.log("有数据了", t), "{" == (t = unescape(t)).charAt(0) && (t = JSON.parse(t)), e.isNullOrEmpty(t.guid) ? ht.localData.guid = ht.uuid() : ht.localData.guid = t.guid, e.isNullOrEmpty(t.onTime) ? ht.localData.onTime = 0 : ht.localData.onTime = t.onTime, e.isNullOrEmpty(t.city) ? ht.localData.city = "" : ht.localData.city = t.city, ht.localData.openid = t.openid)
			}), this.sdk && this.sdk.getSystemInfoSync) {
				let e = this.sdk.getSystemInfoSync();
				this.deviceBrand = e.brand, this.deviceModel = e.model, this.deviceSystem = e.system
			}
			if (Laya.timer.frameLoop(1, this, this.addOnTime), !Laya.Browser.onMiniGame) {
				if (Laya.Render.isConchApp) return;
				console.log("http://134.175.208.44:2440/ip2region"), d.instance.get("http://134.175.208.44:2440/ip2region")
			}
		}
		static get I() {
			return h.get(ht)
		}
		addOnTime() {
			if (this.isStartOn && ht.I.isOnShow) {
				if (this.isIgnore) return void (this.isIgnore = !1);
				ht.localData.onTime += Laya.timer.delta, ht.localData.onTime > this.onTimeLimit ? this.statisticsReport(f.ONLINE_TIME) : ht.setLocalData(ht.localKey, ht.localData), this.isBattle && (this.levelDuration += Laya.timer.delta)
			}
		}
		static getLoalData(e, t) {
			var i = Laya.LocalStorage.getItem(e);
			t && t(i)
		}
		static setLocalData(e, t) {
			try {
				let i = JSON.stringify(t);
				Laya.LocalStorage.setItem(e, i)
			} catch (e) {
				console.log(e)
			}
		}
		onGameHideEvent() {
			this.isOnShow = !1
		}
		onGameShowEvent() {
			this.isOnShow = !0, this.isIgnore = !0
		}
		statisticsReport(e, t = -1, i = -1, n = 0) {
			if (!U.I.getConf().needOKStatis) return;
			let a;
			e == f.VIEW_INDEX && (this.isStartOn = !0), e != f.LV_START && e != f.LV_START2 || (this.isBattle = !0, this.levelDuration = 0), null != ht.localData.openid && null != ht.localData.openid && "" != ht.localData.openid && "undefined" != ht.localData.openid || (ht.localData.openid = c.instance.openid, ht.setLocalData(ht.localKey, ht.localData));
			let o = Math.floor(ht.localData.onTime / 1e3);
			console.log("statisticsReport", ht.localData), a = {
				type: e,
				gamekey: U.I.getConf().gamekey,
				deviceModel: this.deviceModel,
				deviceSystem: this.deviceSystem,
				deviceBrand: this.deviceBrand,
				openid: ht.localData.openid,
				guid: ht.localData.guid,
				appVersion: U.I.getConf().version,
				appBuild: U.I.getConf().version,
				level: t > 0 ? t : J.I.getCurLevel(),
				levelDuration: e == f.LV_END || e == f.LV_END2 ? Math.floor(this.levelDuration / 1e3) : -1,
				mac: "",
				res: i,
				sex: dt.I.getSex(),
				city: Laya.Browser.onMiniGame ? dt.I.getArea() : ht.localData.city,
				phone: "",
				gold: J.I.getCoin(),
				score: n,
				net: -1,
				duration: o,
				timestamp: (new Date).getTime().toString().substr(0, 10)
			}, o > 0 && (ht.localData.onTime -= 1e3 * o, ht.setLocalData(ht.localKey, ht.localData));
			let s = {
				message: JSON.stringify(a),
				version: 1
			};
			this.statisticsUrl = `${U.I.getConf().reportUrl}${Te.DATA_STATISTICS}`, xe.log(this.statisticsUrl), xe.log(a), d.instance.post(this.statisticsUrl, s)
		}
		onGetConfComplete(e) {
			"http://134.175.208.44:2440/ip2region" == e.url && (console.log("onGetConfCompletehttp:", e), ht.localData.city = e.data.city_name, ht.setLocalData(ht.localKey, ht.localData))
		}
		static uuid() {
			for (var e = [], t = 0; t < 36; t++) e[t] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
			return e[14] = "4", e[19] = "0123456789abcdef".substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
		}
	}
	ht.localKey = "okInfo", ht.localData = {
		guid: "",
		openid: "",
		onTime: 0,
		city: ""
	},
		function (e) {
			e[e.AD_VIDEO_REWARD = 0] = "AD_VIDEO_REWARD"
		}(y || (y = {})),
		function (e) {
			e[e.AD_BANNER_BOX = 0] = "AD_BANNER_BOX"
		}(I || (I = {})),
		function (e) {
			e[e.AD_CUSTOM_PIFU = 7] = "AD_CUSTOM_PIFU"
		}(w || (w = {})),
		function (e) {
			e[e.AD_BOX_DEFAULT = 0] = "AD_BOX_DEFAULT"
		}(S || (S = {})),
		function (e) {
			e[e.AD_INTERSTITIAL_COMMON = 0] = "AD_INTERSTITIAL_COMMON"
		}(v || (v = {})),
		function (e) {
			e[e.AD_GameBanner_LEVEL = 0] = "AD_GameBanner_LEVEL"
		}(E || (E = {})),
		function (e) {
			e[e.AD_GamePortal_1 = 0] = "AD_GamePortal_1"
		}(L || (L = {})),
		function (e) {
			e[e.INDEX_RIGHT = 0] = "INDEX_RIGHT", e[e.BATTLE = 1] = "BATTLE", e[e.TRY_USE = 2] = "TRY_USE", e[e.REWARD = 3] = "REWARD", e[e.RELIFE = 4] = "RELIFE", e[e.SHOP = 5] = "SHOP", e[e.SHOP_ITEM = 6] = "SHOP_ITEM"
		}(A || (A = {}));
	class ct { }
	ct.MAIN_LEFT_AD = 1, ct.MAIN_RIGHT_AD = 2, ct.RESULT_PASS_AD = 3, ct.RESULT_FRIEND_AD = 4, ct.RESULT_HOT_AD = 5, ct.BOX_AD = 6, ct.SHIP_OTHER = 999;
	class pt { }
	pt.MAIN_TOP_AD = 1, pt.BATTLE_LEFT_AD = 2, pt.MAIN_RIGHT_AD = 3;
	class gt { }
	gt.SKIP_OTHER = 0, gt.MAIN_LEFT_AD = 1, gt.MAIN_RIGHT_AD = 2, gt.MAIN_ICON_AD = 3, gt.BATTLE_AD = 4, gt.RESULT_TOP_AD = 5, gt.RESULT_RIGHT_AD = 6,
		function (e) {
			e[e.Failed = 0] = "Failed", e[e.Normal = 1] = "Normal", e[e.Jump = 2] = "Jump"
		}(T || (T = {})),
		function (e) {
			e[e.AD_GAME_PORTAL_1 = 0] = "AD_GAME_PORTAL_1", e[e.AD_GAME_PORTAL_HENG = 1] = "AD_GAME_PORTAL_HENG", e[e.AD_GAME_NATIVE = 2] = "AD_GAME_NATIVE", e[e.AD_GAME_SINGLE_NATIVE = 3] = "AD_GAME_SINGLE_NATIVE"
		}(x || (x = {})),
		function (e) {
			e[e.AD_CUSTOM_MAIN = 0] = "AD_CUSTOM_MAIN", e[e.AD_CUSTOM_MAIN_SINGLE_LEFT = 1] = "AD_CUSTOM_MAIN_SINGLE_LEFT", e[e.AD_CUSTOM_SINGLE_RIFHT2 = 2] = "AD_CUSTOM_SINGLE_RIFHT2", e[e.AD_CUSTOM_SINGLE_LEFT = 3] = "AD_CUSTOM_SINGLE_LEFT", e[e.AD_CUSTOM_TOP = 4] = "AD_CUSTOM_TOP", e[e.AD_CUSTOM_MAIN_RIGHT = 5] = "AD_CUSTOM_MAIN_RIGHT", e[e.AD_CUSTOM_MAIN_MATRIX = 6] = "AD_CUSTOM_MAIN_MATRIX"
		}(b || (b = {})),
		function (e) {
			e[e.IMG = 0] = "IMG", e[e.ICON = 1] = "ICON"
		}(C || (C = {}));
	class mt {
		constructor() {
			this.initAdvert()
		}
		initAdvert() {
			this.initInterstitialAd(), this.mCloseVideoCallerInterstitial = null, this.mCloseVideoFuncInterstitial = null, this.mShowVideoCallerInterstitial = null, this.mShowVideoFuncInterstitial = null, this.mInterstitialCb = null
		}
		initInterstitialAd() {
			this.mAdInterstitialMap = {}, Z.I.preloadInterstitialAD(Z.ADS_INTERSTITIAL)
		}
		getInterstitialAd(e) {
			return Z.I.isInterstitialADLoaded()
		}
		showInterstitialAd(e, t, i, n, a) {
			this.mCloseVideoCallerInterstitial = t, this.mCloseVideoFuncInterstitial = i, this.mShowVideoCallerInterstitial = n, this.mShowVideoFuncInterstitial = a, Z.I.playInterstitialAD()
		}
		onCloseVideoInterstitial(e) {
			let t = !1;
			(e && e.isEnded || void 0 === e) && (t = !0), this.mCloseVideoCallerInterstitial && this.mCloseVideoFuncInterstitial && this.mCloseVideoFuncInterstitial.call(this.mCloseVideoCallerInterstitial, t)
		}
	}
	class ut {
		constructor() {
			this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initGameIconAd(), this.initGamePortalAd(), this.initGameBannerAd()
		}
		initGameIconAd() {
			this.mAdGameIconMap = {}
		}
		initGamePortalAd() {
			this.mAdGamePortalMap = {}
		}
		initGameBannerAd() {
			this.mAdGameBannerMap = {}
		}
		getGameBannerAd(e, t, i, n) {
			let a = Laya.Browser.clientWidth - 20,
				o = 100 * Laya.Browser.clientWidth / 320,
				s = this.sdk.getSystemInfoSync();
			i && (a = i), n && (o = n);
			let r = Laya.Browser.clientHeight - o - 10;
			t && (r = t);
			let l = U.I.getConf().ad.gamebanner[e];
			if (xe.log("getGameBannerAd adUnitId:", l), !this.mAdGameBannerMap[e.toString()] && l && "" != l) {
				let t = null;
				this.sdk.createGameBanner && ((t = this.sdk.createGameBanner({
					adUnitId: l,
					style: {
						left: .5 * (s.windowWidth - a),
						top: r,
						width: a,
						height: o
					}
				})) && (t.onLoad(() => {
					t.style.left = (Laya.Browser.clientWidth - t.style.width) / 2, t.style.top = r
				}), t.onResize(e => {
					t.style.top = r, t.style.left = (Laya.Browser.clientWidth - e.width) / 2
				}), t.onError(() => {
					xe.log("getGameBannerAd onError"), this.mAdGameBannerMap[e.toString()] = null
				})), this.mAdGameBannerMap[e.toString()] = t)
			} else this.mAdGameBannerMap[e.toString()] && (this.mAdGameBannerMap[e.toString()].style.top = t);
			return this.mAdGameBannerMap[e.toString()]
		}
		showGameBannerAd(e, t, i, n) {
			if (-1 == Oe.I.compareVersion("2.7.5")) return null;
			let a = this.getGameBannerAd(e, t, i, n);
			if (a && a) {
				a.show().catch(e => {
					xe.error(e)
				});
				let e = 100;
				t && (e = t), a.style.top = e, a.style.left = (Laya.Browser.clientWidth - a.style.width) / 2
			}
			return a
		}
		hideGameBannerAd(e) {
			let t = this.mAdGameBannerMap[e.toString()];
			t && t.hide()
		}
		getGamePortalAd(e, t) {
			let i = U.I.getConf().ad.gameportal[e];
			if (xe.log("getGamePortalAd adUnitId:", i), !this.mAdGamePortalMap[e.toString()] && i && "" != i) {
				let n = null;
				this.sdk.createGamePortal ? ((n = this.sdk.createGamePortal({
					adUnitId: i
				})) && (n.onLoad(() => { }), n.onError(() => {
					xe.log("getGamePortalAd onError"), this.mAdGamePortalMap[e.toString()] = null
				})), this.mAdGamePortalMap[e.toString()] = n) : this.mAdGamePortalMap[e.toString()] && (this.mAdGamePortalMap[e.toString()].style.top = t)
			}
			return this.mAdGamePortalMap[e.toString()]
		}
		showGamePortalAd(e, t) {
			if (-1 == Oe.I.compareVersion("2.7.5")) return null;
			let i = this.getGamePortalAd(e, t);
			return i && i && i.load().then(() => {
				i.show()
			}).catch(e => {
				xe.error(e)
			}), i
		}
		getGameIconAd(e, t) {
			let i = U.I.getConf().ad.gameicon[e];
			if (!this.mAdGameIconMap[e.toString()] && i && "" != i) {
				let t = null;
				this.sdk.createGameIcon && (t = this.sdk.createGameIcon({
					adUnitId: i,
					count: 3
				})), this.mAdGameIconMap[e.toString()] = t
			}
			return this.mAdGameIconMap[e.toString()]
		}
		showGameIconAd(e, t) {
			if (-1 == Oe.I.compareVersion("2.8.2")) return null;
			let i = this.getGameIconAd(e, t);
			i && i && i.load().then(() => {
				i.show()
			}).catch(e => {
				xe.error(e)
			})
		}
	}
	class ft {
		constructor() {
			this.mShowTTBanner = !0, this.mVVGreateBannerTime = 0, this.sdk = window.wx, this.mErrorVideoCaller = null, this.mErrorVideoFunc = null, this.initAdvert()
		}
		initAdvert() {
			this.initBannerAd()
		}
		initBannerAd() {
			this.mBannerAdMap = {}
		}
		setShowTTBanner(e) {
			this.mShowTTBanner = e
		}
		clearAllBannerKey() {
			this.mBannerAdMap = {}
		}
		clearBannerKey(e) {
			this.mBannerAdMap[e.toString()] = null
		}
		getBannerAd(e, t, i, n, a) {
			let o = U.I.getConf().ad.banner[e];
			if (xe.log("WX getBannerAd adUnitId:", o), !this.mBannerAdMap[e.toString()] && o && "" != o && this.sdk.createBannerAd) {
				let s = Laya.Browser.clientWidth - 20,
					r = 100 * Laya.Browser.clientWidth / 320,
					l = this.sdk.getSystemInfoSync(),
					d = null;
				n && (s = n), a && (r = a);
				let h = Laya.Browser.clientHeight - r - 10;
				t && (h = t / Laya.stage.height * l.windowHeight);
				let c = .5 * (l.windowWidth - s);
				i && (c = i / Laya.stage.width * l.windowWidth), -1 != Oe.I.compareVersion("2.0.4") && (d = this.sdk.createBannerAd({
					adUnitId: o,
					adIntervals: 30,
					style: {
						left: c,
						top: h,
						width: s,
						height: r
					}
				})), d && (d.onResize(e => {
					let n = this.sdk.getSystemInfoSync(),
						a = n.windowHeight - e.height - 10;
					t && (a = t / Laya.stage.height * n.windowHeight);
					let o = .5 * (n.windowWidth - e.width);
					i && (o = i / Laya.stage.width * n.windowWidth), d.style.top = a, d.style.left = o
				}), d.onError(() => {
					let o = {};
					o.adkey = e, o.mTop = t, o.mLeft = i, o.mWidht = n, o.mHeight = a, this.onErrorVideo(o), xe.log("getBannerAd onError")
				})), this.mBannerAdMap[e.toString()] = d
			} else this.mBannerAdMap[e.toString()] && (this.mBannerAdMap[e.toString()].style.top = t);
			return this.mBannerAdMap[e.toString()]
		}
		showBannerAd(e, t, i, n, a, o, s) {
			this.mErrorVideoCaller = o, this.mErrorVideoFunc = s;
			let r = this.getBannerAd(e, t, i, n, a);
			if (r) {
				let o = this.sdk.getSystemInfoSync(),
					s = Laya.Browser.clientHeight - r.style.height - 10;
				t && (s = t / Laya.stage.height * o.windowHeight);
				let d = (Laya.Browser.clientWidth - r.style.width) / 2;
				if (i && (d = i / Laya.stage.width * o.windowWidth), this.mBannerAdMap[e.toString()]) {
					var l = r.show();
					l && l.then(() => {
						xe.log("WX  banner广告显示成功")
					}).catch(o => {
						let s = {};
						s.adkey = e, s.mTop = t, s.mLeft = i, s.mWidht = n, s.mHeight = a, this.onErrorVideo(s), xe.log("WX  banner广告组件出现问题", o)
					}), r.style.top = s, r.style.left = d
				} else r.offLoad(), r.onLoad(() => {
					if (this.mShowTTBanner) {
						var o = r.show();
						o && o.then(() => {
							xe.log("@122222 广告显示成功")
						}).catch(o => {
							let s = {};
							s.adkey = e, s.mTop = t, s.mLeft = i, s.mWidht = n, s.mHeight = a, this.onErrorVideo(s), xe.log(" @122222 广告组件出现问题", o)
						})
					}
					r.style.top = s, r.style.left = d, this.mBannerAdMap[e.toString()] = r
				})
			}
			return r
		}
		hideBannerAd(e) {
			let t = this.mBannerAdMap[e.toString()];
			t && t.hide()
		}
		onErrorVideo(e) {
			this.mErrorVideoCaller && this.mErrorVideoFunc && this.mErrorVideoFunc.call(this.mErrorVideoCaller, e)
		}
	}
	class _t extends ft {
		constructor() {
			super(), this.sdk = window.tt
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("getBannerAd adUnitId:", a), !this.mBannerAdMap[e.toString()] && a && "" != a && this.sdk.createBannerAd) {
				let i = 320,
					n = 112,
					o = this.sdk.getSystemInfoSync(),
					s = null,
					r = Laya.Browser.clientHeight - n;
				t && (r = t), -1 != Oe.I.compareVersion("1.32.0") && (s = this.sdk.createBannerAd({
					adUnitId: a,
					adIntervals: 60,
					style: {
						left: .5 * (o.windowWidth - i),
						top: r,
						width: i,
						height: n
					}
				})), s && (s.onResize(e => {
					let i = this.sdk.getSystemInfoSync(),
						n = i.windowHeight - e.height;
					t && (n = t), s.style.top = n, s.style.left = (i.windowWidth - e.width) / 2
				}), s.onError(() => {
					xe.log("getBannerAd onError")
				})), this.mBannerAdMap[e.toString()] = s
			}
			return this.mBannerAdMap[e.toString()]
		}
		showBannerAd(e, t, i, n, a, o) {
			if (Oe.I.isDOUYIN()) return null;
			let s = this.getBannerAd(e, t);
			if (s) {
				let i = Laya.Browser.clientHeight - s.style.height;
				if (t && (i = t), this.mBannerAdMap[e.toString()]) {
					var r = s.show();
					r && r.then(() => {
						xe.log("@11111 广告显示成功")
					}).catch(e => {
						xe.log("@111 广告组件出现问题", e)
					})
				} else s.offLoad(), s.onLoad(() => {
					if (this.mShowTTBanner) {
						var t = s.show();
						t && t.then(() => {
							xe.log("@122222 广告显示成功")
						}).catch(e => {
							xe.log(" @122222 广告组件出现问题", e)
						})
					}
					s.style.top = i, s.style.left = (Laya.Browser.clientWidth - s.style.width) / 2, this.mBannerAdMap[e.toString()] = s
				})
			}
			return s
		}
	}
	class yt extends ft {
		constructor() {
			super(), this.sdk = window.qq
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("QQ getBannerAd adUnitId:", a), !this.mBannerAdMap[e.toString()] && a && "" != a && this.sdk.createBannerAd) {
				let i = 320,
					n = 112,
					o = Laya.Browser.clientHeight - n;
				t && (o = t);
				let s = this.sdk.getSystemInfoSync(),
					r = this.sdk.createBannerAd({
						adUnitId: a,
						style: {
							left: .5 * (s.windowWidth - i),
							top: o,
							width: i,
							height: n
						}
					});
				r && (r.onResize(e => {
					let i = this.sdk.getSystemInfoSync(),
						n = i.windowHeight - e.height;
					t && (n = t), r.style.top = n, r.style.left = (i.windowWidth - e.width) / 2
				}), r.onError(() => {
					xe.log("getBannerAd onError")
				})), this.mBannerAdMap[e.toString()] = r
			} else this.mBannerAdMap[e.toString()] && (this.mBannerAdMap[e.toString()].style.top = t);
			return this.mBannerAdMap[e.toString()]
		}
	}
	class It extends ft {
		constructor() {
			super(), this.sdk = window.qg
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("getBannerAd adUnitId:", a), !this.mBannerAdMap[e.toString()] && a && "" != a) {
				let i = null; - 1 != Oe.I.compareVersion("1031") && (t ? (xe.log("~~~~mTop  getBannerAd adUnitId:", a), i = this.sdk.createBannerAd({
					posId: a
				})) : (xe.log("~~~~no mTop  getBannerAd adUnitId:", a), i = this.sdk.createBannerAd({
					posId: a,
					style: {}
				})), i && (i.offClose(), i.onClose(() => {
					xe.log("getBannerAd onClose"), i = null, this.mBannerAdMap[e.toString()] = null
				}), i.offError(), i.onError(t => {
					xe.log(t), this.mBannerAdMap[e.toString()] = null
				}))), this.mBannerAdMap[e.toString()] = i
			}
			return this.mBannerAdMap[e.toString()]
		}
		showBannerAd(e, t, i, n, a, o) {
			if ((new Date).getTime() - this.mVVGreateBannerTime <= 3e3) return null;
			this.mVVGreateBannerTime = (new Date).getTime();
			let s = this.getBannerAd(e, t);
			if (s && this.mBannerAdMap[e.toString()]) {
				var r = s.show();
				r && r.then(() => {
					xe.log("@11111 广告显示成功")
				})
			}
			return s
		}
		hideBannerAd(e) {
			xe.log("banner广告");
			let t = this.mBannerAdMap[e.toString()];
			if (t) {
				xe.log("banner广告存在");
				var i = t.hide();
				i && i.then(() => {
					this.mBannerAdMap[e.toString()] = null, xe.log("banner广告隐藏成功")
				}).catch(e => {
					xe.log("banner广告销隐藏失败", e)
				})
			}
		}
	}
	class wt extends ft {
		constructor() {
			super(), this.sdk = window.qg
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("getBannerAd adUnitId:", a), !this.mBannerAdMap[e.toString()] && a && "" != a && this.sdk.createBannerAd) {
				let i = null; - 1 != Oe.I.compareVersion("1051") && ((i = this.sdk.createBannerAd({
					adUnitId: a
				})).offLoad(), i.onLoad(function () {
					console.log("banner 广告加载成功");
					let e = Laya.Browser.clientHeight - i.style.height;
					t && (e = t), i.style.top = e, i.style.left = (Laya.Browser.clientWidth - i.style.width) / 2
				}), i.offHide(), i.onHide(function () {
					console.log("banner 广告隐藏")
				}), i.offError(), i.onError(e => {
					console.log("banner 广告出错", e), i.destroy(), i = null, this.mBannerAdMap[a] = null
				}), i.offResize(), i.onResize(function (e) {
					console.log("banner 宽度：" + e.width + ", banner 高度：" + e.height)
				})), this.mBannerAdMap[e.toString()] = i
			} else this.mBannerAdMap[e.toString()] && (this.mBannerAdMap[e.toString()].style.top = t);
			return this.mBannerAdMap[e.toString()]
		}
		showBannerAd(e, t, i, n, a, o) {
			let s = this.getBannerAd(e, t);
			if (s && -1 != Oe.I.compareVersion("1051")) {
				var r = s.show();
				r && r.then(() => {
					xe.log("banner 广告显示成功")
				})
			}
			return s
		}
		hideBannerAd(e) {
			xe.log("banner广告");
			let t = this.mBannerAdMap[e.toString()];
			t && t.hide()
		}
		clearBannerKey(e) { }
	}
	class St {
		constructor() {
			if (this.mDestroyWhenStop = !1, Re.instance.addListener(Me.GameOnShowEvent, this, this.onGameShowEvent), Re.instance.addListener(Me.GameOnHideEvent, this, this.onGameHideEvent), Me.I.getSDK() && Me.I.getSDK().onAudioInterruptionEnd && Me.I.getSDK().onAudioInterruptionBegin) {
				let e = this;
				Me.I.getSDK().onAudioInterruptionEnd(function () {
					e.onAudioInterruptionEnd()
				}), Me.I.getSDK().onAudioInterruptionBegin(function () {
					e.onAudioInterruptionBegin()
				})
			}
		}
		static get I() {
			return St.getInstance()
		}
		static getInstance() {
			return null == St.instance && (St.instance = new St), St.instance
		}
		onGameShowEvent() {
			Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1
		}
		onGameHideEvent() {
			Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0
		}
		onAudioInterruptionBegin() {
			Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0
		}
		onAudioInterruptionEnd() {
			Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, this.playOldMusic()
		}
		playOldMusic() {
			St.mOldBgmName && (Laya.SoundManager.stopMusic(), Laya.SoundManager.playMusic(`music/${St.mOldBgmName}.mp3`, 0, null, null))
		}
		init(e, t = !1) {
			Laya.SoundManager.autoStopMusic = !0, this.mDestroyWhenStop = t, this.playBGM(e)
		}
		playBGM(e) {
			Laya.Browser.onVVMiniGame && Oe.I.compareVersion("1063") <= 0 ? console.log("VIVO低于1063屏蔽背景音乐") : J.I.isMusicMute && St.mOldBgmName != e && (Laya.SoundManager.playMusic(`music/${e}.mp3`, 0, null, null), this.mDestroyWhenStop && null != St.mOldBgmName && Laya.SoundManager.destroySound(`music/${St.mOldBgmName}.mp3`), St.mOldBgmName = e)
		}
		stopBGM() {
			Laya.SoundManager.stopMusic(), this.mDestroyWhenStop && null != St.mOldBgmName && Laya.SoundManager.destroySound(`music/${St.mOldBgmName}.mp3`), St.mOldBgmName = null
		}
		playSound(e, t, i, n, a, o) {
			if (J.I.isSoundMute) return Laya.Render.isConchApp && (t = ".wav"), null == t && (t = ".mp3"), e += t, e = Laya.Render.isConchApp ? `sound/native/${e}` : `sound/default/${e}`, Laya.SoundManager.playSound(e, i, n, a, o)
		}
		stopSound(e, t) {
			Laya.Render.isConchApp && (t = ".wav"), null == t && (t = ".mp3"), e += t, e = Laya.Render.isConchApp ? `sound/native/${e}` : `sound/default/${e}`, Laya.SoundManager.stopSound(e)
		}
		setMusicVolume(e) {
			Laya.SoundManager.setMusicVolume(e)
		}
		setSoundVolume(e) {
			Laya.SoundManager.setSoundVolume(e)
		}
	}
	St.mOldBgmName = null;
	class vt {
		static clamp(e, t, i) {
			return e > i ? i : e < t ? t : e
		}
		static clamp01(e) {
			return vt.clamp(e, 0, 1)
		}
		static lerp(e, t, i) {
			return i > 0 && i < 1 ? (t - e) * i + e : i <= 0 ? e : t
		}
		static random(e, t) {
			return Math.round(Math.random() * (t - e)) + e
		}
		static randomFloat(e, t) {
			return Math.random() * (t - e) + e
		}
		static similar(e, t, i = .1) {
			let n = e - t;
			return n > -i && n < i
		}
		static isInRegion(e, t) {
			let i, n, a, o, s, r, l = 0,
				d = t.length;
			for (let h = 0; h < d; h++) {
				if (e.x == t[h].x && e.y == t[h].y) return !0;
				if (i = t[h % d], n = t[(h + 1) % d], a = i.x, s = n.x, (o = i.y) == (r = n.y)) continue;
				if (e.y < Math.min(o, r)) continue;
				if (e.y > Math.max(o, r)) continue;
				s - (s - a) * (r - e.y) / (r - o) < e.x || l++
			}
			return l % 2 == 1
		}
		static get2VectorAngle(e, t) {
			let i = e.x * t.x + e.y * t.y,
				n = Math.sqrt(e.x * e.x + e.y * e.y) * Math.sqrt(t.x * t.x + t.y * t.y);
			return 0 != n ? i / n : 0
		}
		static getAngleByVector(e, t) {
			if (0 === t) {
				if (e < 0) return 270;
				if (e >= 0) return 90
			}
			if (0 === e) return t >= 0 ? 0 : 180;
			let i = Math.abs(t) / Math.abs(e),
				n = 0;
			return t > 0 && e < 0 ? n = 270 + 180 * Math.atan(i) / Math.PI : t > 0 && e > 0 ? n = 90 - 180 * Math.atan(i) / Math.PI : t < 0 && e < 0 ? n = 270 - 180 * Math.atan(i) / Math.PI : t < 0 && e > 0 && (n = 90 + 180 * Math.atan(i) / Math.PI), n
		}
		static changeAngle(e, t, i) {
			let n, a, o, s, r, l, d, h, c, p;
			return n = Math.cos(.5 * i), a = Math.sin(.5 * i), r = Math.cos(.5 * t), {
				qx: h = n * (l = Math.sin(.5 * t)) * (o = Math.cos(.5 * e)) + a * r * (s = Math.sin(.5 * e)),
				qy: c = n * r * s - a * l * o,
				qz: p = a * r * o - n * l * s,
				qw: d = n * r * o + a * l * s
			}
		}
		static getRandomArray(e, t, i) {
			const n = [];
			for (let i = e; i <= t; i++) n.push(i);
			const a = [],
				o = n.length >= i ? i : n.length;
			for (let e = 0; e <= o - 1; e++) {
				const e = Math.floor(Math.random() * n.length);
				a.push(n[e]), n.splice(e, 1)
			}
			return a
		}
		static randomArray(e, t = 5) {
			let i = e.length;
			for (; 0 != t;) {
				t--;
				let n = vt.random(0, i - 1),
					a = vt.random(0, i - 1),
					o = e[n];
				e[n] = e[a], e[a] = o
			}
		}
		static angle2rad(e) {
			return .017453293 * e
		}
		static rad2angle(e) {
			return e / .017453293
		}
		static get2DAngle(e, t, i, n) {
			let a = i - e,
				o = n - t;
			if (0 === o) {
				if (a < 0) return 270;
				if (a >= 0) return 90
			}
			if (0 === a) {
				if (o >= 0) return 0;
				if (o < 0) return 180
			}
			let s = 0;
			return 0 != a && (s = Math.atan(o / a) / Math.PI * 180), a < 0 && (s += 180), s < 0 && (s += 360), s
		}
		static getNewUuid() {
			return ++vt.globalId
		}
		static plucker(e, t) {
			return [e[0] * t[1] - t[0] * e[1], e[0] * t[2] - t[0] * e[2], e[0] - t[0], e[1] * t[2] - t[1] * e[2], e[2] - t[2], t[1] - e[1]]
		}
		static sideOp(e, t) {
			return e[0] * t[4] + e[1] * t[5] + e[2] * t[3] + e[3] * t[2] + e[4] * t[0] + e[5] * t[1]
		}
		static checkLineAndTriangle(e, t, i, n, a) {
			let o = this.plucker(n, i),
				s = this.plucker(a, n),
				r = this.plucker(i, a),
				l = this.plucker(e, t),
				d = this.sideOp(l, o),
				h = this.sideOp(l, s),
				c = this.sideOp(l, r);
			return 0 == d && 0 == h && 0 == c ? 1 : d > 0 && h > 0 && c > 0 || d < 0 && h < 0 && c < 0 ? 2 : 0 == d && h * c > 0 || 0 == h && d * c > 0 || 0 == c && d * h > 0 ? 3 : 0 == d && 0 == h || 0 == d && 0 == c || 0 == h && 0 == c ? 4 : 0
		}
		static CROSS(e, t, i) {
			e[0] = t[1] * i[2] - t[2] * i[1], e[1] = t[2] * i[0] - t[0] * i[2], e[2] = t[0] * i[1] - t[1] * i[0]
		}
		static DOT(e, t) {
			return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
		}
		static SUB(e, t, i) {
			e[0] = t[0] - i[0], e[1] = t[1] - i[1], e[2] = t[2] - i[2]
		}
		static intersect_triangle(e, t, i, n, a) {
			let o = [],
				s = [],
				r = [],
				l = [],
				d = [];
			this.SUB(o, n, i), this.SUB(s, a, i), this.CROSS(l, t, s);
			let h = this.DOT(o, l);
			if (h > -vt.EPSILON && h < vt.EPSILON) return [];
			let c = 1 / h;
			this.SUB(r, e, i);
			let p = this.DOT(r, l) * c;
			if (p < 0 || p > 1) return [];
			this.CROSS(d, r, o);
			let g = this.DOT(t, d) * c;
			return g < 0 || p + g > 1 ? [] : [this.DOT(s, d) * c, p, g]
		}
	}
	vt.globalId = Math.floor(516 * Math.random()), vt.EPSILON = 1e-10,
		function (e) {
			e[e.InviteFriend = 1e4] = "InviteFriend", e[e.DoubleCoin = 10001] = "DoubleCoin", e[e.Rank = 10002] = "Rank"
		}(R || (R = {}));
	class Et {
		constructor() {
			dt.I.addListener(dt.ShareApp, this, this.onShareApp)
		}
		static get I() {
			return h.get(Et)
		}
		initDefaultShare() {
			dt.I.setDefaultShareHandler(this, this.randomDefaultShareContent)
		}
		randomDefaultShareContent() {
			let e, t = Et.ShareList.length;
			if (t > 0) {
				let i = vt.random(1, t);
				e = Et.ShareList[i - 1]
			}
			let i = new ze;
			c.instance.uid && "" != c.instance.uid && i.add("inviter_gid", c.instance.uid), dt.I.setDefaultShareContent(e.des, this.toShareImgUrl(e.icon), i.ToString())
		}
		toShareImgUrl(e) {
			return Laya.ResourceVersion.manifest && Laya.ResourceVersion.manifest[e] && (e = Laya.ResourceVersion.manifest[e]), e
		}
		share(e, t, i, n) {
			if (Laya.Browser.onMiniGame);
			else if (Laya.Browser.onQQMiniGame);
			else if (!Laya.Browser.onVVMiniGame) return Laya.Browser.onQGMiniGame, !1;
			let a, o = Et.ShareList.length;
			if (o > 0) {
				let e = vt.random(1, o);
				a = Et.ShareList[e - 1]
			}
			t && (a.des = t), i && (a.icon = i);
			let s = new ze;
			return a.share_id ? s.add("share_id", a.share_id) : s.add("share_id", e), n && (n.room_id && s.add("room_id", n.room_id), n.port && s.add("port", n.port), n.room_index && s.add("room_index", n.room_index)), c.instance.uid && "" != c.instance.uid && s.add("inviter_gid", c.instance.uid), dt.I.share(a.des, this.toShareImgUrl(a.icon), s.ToString()), !0
		}
		onShareApp(e) {
			let t = new Ye;
			t.success = !1, e.success ? Laya.timer.once(this.getStayTime(), this, this.shareSuccess, [t]) : (t.success = !1, Re.instance.triggerListener("shareApp", t))
		}
		shareSuccess(e) {
			e.success = !0, Re.instance.triggerListener("shareApp", e)
		}
		getStayTime() {
			return Et.ShareTime
		}
	}
	Et.ShareList = [], Et.ShareTime = 1e3;
	class Lt {
		constructor() {
			this.mVidePlayTime = 0, this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null, this.mCb = null, this.mHideFlag = 0, this.mVidePlayTime = 0, Re.instance.addListener("shareApp", this, this.onShareResultEvent), Re.instance.addListener(Me.GameOnShowEvent, this, this.gameOnShowEvent), Re.instance.addListener(Me.GameOnHideEvent, this, this.gameOnHideEvent)
		}
		initVideoAd() {
			this.mAdVideoMap = {}
		}
		gameOnShowEvent(e) {
			2 == this.mHideFlag && (this.mHideFlag = 3)
		}
		gameOnHideEvent(e) {
			1 == this.mHideFlag && (this.mHideFlag = 2)
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("createVideoAd adkey:" + t);
				let i = this.sdk.createRewardedVideoAd({
					adUnitId: t
				});
				this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			o ? (o.onLoad(() => {
				xe.log("激励视频 广告加载成功")
			}), this.mCb && o.offClose(this.mCb), this.mCb = (e => {
				this.onCloseVideo(e)
			}), o.onClose(this.mCb), o.offError(), o.onError(e => {
				this.videoAdErrfun(e)
			}), this.mHideFlag = 1, o.show().then(() => {
				xe.log("激励视频 广告显示成功")
			}).catch(() => {
				o.load().then(() => o.show().catch(e => {
					this.mHideFlag = 0, this.onVideoLoadFail(), xe.log("激励视频 广告显示失败" + e)
				}))
			})) : (this.onVideoLoadFail(), this.mHideFlag = 0)
		}
		videoAdErrfun(e) {
			this.onVideoLoadFail(), this.mHideFlag = 0, xe.log("激励视频 报错 res:", e)
		}
		onVideoLoadFail() {
			this.mIsListenShare = !1, Et.I.share(R.InviteFriend) ? this.mIsListenShare = !0 : this.onCloseVideo({
				isEnded: !1
			})
		}
		onShareResultEvent(e) {
			this.mIsListenShare && (this.mIsListenShare = !1, this.onCloseVideo({
				isEnded: e.success
			}))
		}
		onCloseVideo(e) {
			let t = !1;
			(e && e.isEnded || void 0 === e) && (t = !0), Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, St.I.setSoundVolume(1), St.I.playBGM("bgm");
			let i = T.Failed;
			t && (i = 3 == this.mHideFlag ? T.Jump : T.Normal), this.mHideFlag = 0, this.mCloseVideoCaller && this.mCloseVideoFunc && this.mCloseVideoFunc.call(this.mCloseVideoCaller, i)
		}
	}
	class At extends Lt {
		constructor() {
			super(), this.sdk = window.tt
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			o ? (o.offError(this.videoAdErrfun.bind(this)), o.onError(this.videoAdErrfun.bind(this)), o.show().then(() => { }).catch(e => {
				o.load().then(() => {
					o.show()
				})
			})) : Et.I.share(R.InviteFriend) || this.onCloseVideo({
				isEnded: !0
			})
		}
	}
	class Tt extends Lt {
		constructor() {
			super(), this.sdk = window.qq
		}
	}
	class xt { }
	xt.MoonGameBoxPanel = "MoonGameBoxPanel", xt.MoonGuideGesturePanel = "MoonGuideGesturePanel", xt.MoonTipPanel = "MoonTipPanel", xt.MoonConfirmPanel = "MoonConfirmPanel", xt.MoonMainAdPanel = "MoonMainAdPanel", xt.MoonMainAd2Panel = "MoonMainAd2Panel", xt.MoonResultsPanel = "MoonResultsPanel", xt.MoonResults2Panel = "MoonResults2Panel";
	class bt extends xt { }
	bt.LoadingPanel = "LoadingPanel", bt.TopBarPanel = "TopBarPanel", bt.AddCoinPanel = "AddCoinPanel", bt.AddLevelPanel = "AddLevelPanel", bt.ShareRecPanel = "ShareRecPanel", bt.ContactGMPanel = "ContactGMPanel", bt.BattleFailPanel = "BattleFailPanel", bt.BattleMainPanel = "BattleMainPanel", bt.BattleSettingPanel = "BattleSettingPanel", bt.BattleOfflinePanel = "BattleOfflinePanel", bt.BattleInfiniteRankPanel = "BattleInfiniteRankPanel", bt.WaitingPanel = "WaitingPanel",
		function (e) {
			e[e.Normal = 0] = "Normal", e[e.Top = 1] = "Top", e[e.Dialog = 2] = "Dialog", e[e.Waiting = 3] = "Waiting", e[e.Last = 4] = "Last"
		}(M || (M = {}));
	class Ct {
		constructor() {
			this.dicLayerNode = new be
		}
		static get instance() {
			return Ct.getInstance()
		}
		static getInstance() {
			return null == Ct.mInstance && (Ct.mInstance = new Ct), Ct.mInstance
		}
		get uiRoot() {
			return this.mRoot
		}
		init(e) {
			this.mRoot = this.createNode("UIRoot"), e.addChild(this.mRoot);
			for (let e = 0; e < M.Last; e++) {
				let t = this.createNode(M[e]);
				this.uiRoot.addChild(t), this.dicLayerNode.add(e, t)
			}
		}
		createNode(e) {
			let t = new Laya.UIComponent;
			return t.mouseEnabled = !0, t.mouseThrough = !0, t.left = 0, t.right = 0, t.top = 0, t.bottom = 0, t.name = e, t
		}
		getLayer(e) {
			return this.dicLayerNode.get(e)
		}
		enableEvent(e) {
			for (let t in this.dicLayerNode.table) {
				this.dicLayerNode.get(t).mouseEnabled = e
			}
		}
	} ! function (e) {
		e[e.Idle = 0] = "Idle", e[e.Preparing = 1] = "Preparing", e[e.Success = 2] = "Success", e[e.Fail = 3] = "Fail"
	}(O || (O = {}));
	class Rt {
		constructor(e, t) {
			this.mPath = e, this.mCtrl = t, this.state = O.Idle, this.mIsShow = !1
		}
		get path() {
			return this.mPath
		}
		get ctrl() {
			return this.mCtrl
		}
		get view() {
			return this.mView
		}
		get isShow() {
			return this.mIsShow
		}
		initial() {
			this.mCtrl.initial(), this.prepareView()
		}
		dispose() {
			this.state == O.Success && this.mCtrl.end(), this.mCtrl.dispose(), this.mCtrl = null, this.state == O.Success && (this.viewParent.removeChild(this.mView), this.mView.destroy(), this.mView = null)
		}
		show(e) {
			if (this.args = e, this.mIsShow) {
				if (this.viewParent) {
					this.mView.visible || (this.mView.visible = !0);
					let e = this.viewParent.numChildren;
					e = e > 0 ? e - 1 : 0, this.viewParent.setChildIndex(this.mView, e)
				}
			} else this.mIsShow = !0, this.state == O.Success ? this.onShow() : this.prepareView()
		}
		hide() {
			this.mIsShow && (this.mIsShow = !1, this.state == O.Success && (this.mCtrl.hide(), this.viewParent.removeChild(this.mView)))
		}
		update(e) {
			this.state == O.Success && this.mIsShow && this.mCtrl.update(e)
		}
		visiable(e) {
			this.mView && this.mView.visible != e && this.mIsShow && (this.mView.visible = e)
		}
		resize() {
			this.state == O.Success && this.mCtrl.resize()
		}
		prepareView() {
			this.state != O.Idle && this.state != O.Fail || (this.state = O.Preparing, this.mCtrl.prepare(this, this.onViewComplete))
		}
		onViewComplete(e, t, i) {
			e ? (this.state = O.Success, this.mView = t, this.viewParent = Ct.instance.getLayer(i), this.mView.name = this.mPath, this.mCtrl.start(), this.mCtrl.resize(), this.mIsShow && this.onShow()) : this.state = O.Fail
		}
		onShow() {
			this.viewParent.addChild(this.mView), this.mCtrl.show(this.args), this.args = null
		}
	}
	class Mt {
		constructor() {
			this.PathPattern = /(?:\/)/g, this.dicPanels = new n
		}
		static get instance() {
			return Mt.getInstance()
		}
		static getInstance() {
			return null == Mt.mInstance && (Mt.mInstance = new Mt), Mt.mInstance
		}
		init(e) {
			this.panelCreator = e
		}
		show(e, t) {
			let i = this.dicPanels.get(e);
			null == i && (i = new Rt(e, this.panelCreator.createPanel(e)), this.dicPanels.add(e, i), i.initial()), i.show(t)
		}
		hide(e) {
			let t = this.dicPanels.get(e);
			null != t && t.hide()
		}
		destroy(e) {
			let t = this.dicPanels.get(e);
			null != t && (t.hide(), t.dispose(), this.dicPanels.remove(e))
		}
		update(e) {
			for (let t in this.dicPanels.table) this.dicPanels.table[t].update(e)
		}
		visiable(e, t) {
			let i = this.dicPanels.get(e);
			null != i && i.visiable(t)
		}
		resize() {
			for (let e in this.dicPanels.table) this.dicPanels.table[e].resize()
		}
		getPanel(e) {
			let t = this.dicPanels.get(e);
			return null != t ? t.ctrl : null
		}
		isShow(e) {
			return !!this.dicPanels.containsKey(e) && this.dicPanels.get(e).isShow
		}
		findChild(e, t) {
			if (!t) return null;
			let i = t.split(this.PathPattern),
				n = e,
				a = i.length;
			for (; a > 0 && n;) {
				let e = i[i.length - a];
				n = "." == e ? n.parent : n.getChildByName(e), a--
			}
			return n
		}
	}
	class Ot extends Lt {
		constructor() {
			super(), this.mVVGreateVideoTime = 0, this.sdk = window.qg
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("VVgetVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("VVcreateVideoAd adkey:" + t);
				let i = null; - 1 != Oe.I.compareVersion("1041") && (i = this.sdk.createRewardedVideoAd({
					posId: t
				})), this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			if (this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, (new Date).getTime() - this.mVVGreateVideoTime <= 3e3) return Mt.instance.show(bt.MoonTipPanel, "暂无视频, 请稍后再试!!!!!"), null;
			this.mVVGreateVideoTime = (new Date).getTime(), Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			if (o) {
				this.mKey = e, o.offError(this.videoAdErrfun.bind(this)), o.onError(this.videoAdErrfun.bind(this));
				const t = e => {
					this.onCloseVideo(e)
				};
				o.offClose(t), o.onClose(t), o.offLoad(), o.onLoad(() => {
					xe.log("VV激励视频加载完成");
					let e = o.show();
					e && e.then(() => {
						console.log("VV激励视频广告展示完成")
					}).catch(e => {
						this.videoAdErrfun(JSON.stringify(e)), xe.log("VV激励广告展示失败" + JSON.stringify(e))
					})
				});
				let i = o.load();
				i && i.catch(e => {
					xe.log("vv激励广告load失败" + JSON.stringify(e)), this.videoAdErrfun(JSON.stringify(e))
				})
			} else this.onCloseVideo({
				isEnded: !0
			})
		}
		videoAdErrfun(e) {
			Mt.instance.show(bt.MoonTipPanel, "暂无视频, 请稍后再试"), this.onVideoLoadFail(), this.mHideFlag = 0
		}
		onVideoLoadFail() {
			this.onCloseVideo({
				isEnded: !1
			})
		}
	}
	class Dt extends Lt {
		constructor() {
			super(), this.sdk = window.qg
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("createVideoAd adkey:" + t);
				let i = null; - 1 != Oe.I.compareVersion("1051") && (xe.log("onQGMiniGame createVideoAd adkey:" + t), i = this.sdk.createRewardedVideoAd({
					adUnitId: t
				})), i && (this.mCb && i.offClose(this.mCb), this.mCb = (e => {
					this.onCloseVideo(e), (e && e.isEnded || void 0 === e) && (i.offLoad(null), i.load())
				}), i.onClose(this.mCb), i.load()), this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			o ? (this.mKey = e, o.offError(this.videoAdErrfun.bind(this)), o.onError(this.videoAdErrfun.bind(this)), -1 != Oe.I.compareVersion("1051") && (o.load(), o.onLoad(() => {
				o.show()
			}))) : Et.I.share(R.InviteFriend) || this.onCloseVideo({
				isEnded: !0
			})
		}
		videoAdErrfun(e) {
			if (super.videoAdErrfun(e), Mt.instance.show(bt.MoonTipPanel, "暂无视频, 请稍后再试"), this.mAdVideoMap[this.mKey.toString()]) {
				let e = this.mAdVideoMap[this.mKey.toString()];
				e && (e.destroy(), e = null), this.mAdVideoMap[this.mKey.toString()] = null
			}
		}
	}
	class Nt {
		constructor() {
			this.sdk = window.wx, this.lastTime = 0, this.initAdvert()
		}
		initAdvert() {
			this.initInterstitialAd(), this.mCloseVideoCallerInterstitial = null, this.mCloseVideoFuncInterstitial = null, this.mShowVideoCallerInterstitial = null, this.mShowVideoFuncInterstitial = null, this.mInterstitialCb = null
		}
		initInterstitialAd() {
			this.mAdInterstitialMap = {}
		}
		getInterstitialAd(e) {
			let t = U.I.getConf().ad.interstitial[e];
			if (!this.mAdInterstitialMap[e.toString()] && t && "" != t) {
				xe.log("createInterstitialoAd key:" + t);
				let i = null;
				(i = this.sdk.createInterstitialAd({
					adUnitId: t
				})) && (i.onLoad(() => {
					xe.log("WX 插屏 广告加载成功")
				}), this.mInterstitialCb && i.offClose(this.mInterstitialCb), this.mInterstitialCb = (e => {
					this.onCloseVideoInterstitial(e)
				}), i.onClose(this.mInterstitialCb)), this.mAdInterstitialMap[e.toString()] = i
			}
			return this.mAdInterstitialMap[e.toString()]
		}
		showInterstitialAd(e, t, i, n, a) { }
		onCloseVideoInterstitial(e) {
			let t = !1;
			e && e.isEnded || void 0 === e ? (t = !0, xe.log("正常播放结束，可以下发游戏奖励")) : xe.log("关闭播放结束，不可以下发游戏奖励"), this.mCloseVideoCallerInterstitial && this.mCloseVideoFuncInterstitial && this.mCloseVideoFuncInterstitial.call(this.mCloseVideoCallerInterstitial, t)
		}
	}
	class Pt extends Nt {
		constructor() {
			super(), this.mVVGreateInterstitialTime = 0, this.sdk = window.qg
		}
		getInterstitialAd(e) {
			let t = U.I.getConf().ad.interstitial[e];
			if (!this.mAdInterstitialMap[e.toString()] && t && "" != t) {
				xe.log("createInterstitialoAd key:" + t);
				let i = null;
				this.sdk.createInterstitialAd && -1 != Oe.I.compareVersion("1031") && (i = this.sdk.createInterstitialAd({
					posId: t
				})), i && (i.onLoad(() => { }), this.mInterstitialCb && i.offClose(this.mInterstitialCb), this.mInterstitialCb = (e => {
					this.onCloseVideoInterstitial(e)
				}), i.onClose(this.mInterstitialCb)), this.mAdInterstitialMap[e.toString()] = i
			}
			return this.mAdInterstitialMap[e.toString()]
		}
		showInterstitialAd(e, t, i, n, a) {
			this.mCloseVideoCallerInterstitial = t, this.mCloseVideoFuncInterstitial = i, this.mShowVideoCallerInterstitial = n, this.mShowVideoFuncInterstitial = a;
			let o = this.getInterstitialAd(e),
				s = !0;
			if ((new Date).getTime() - this.mVVGreateInterstitialTime <= 3e3 && (s = !1), o && s) {
				o.offError(), o.onError(e => {
					this.onCloseVideoInterstitial({
						isEnded: !0
					})
				});
				let t = o.show();
				this.mVVGreateInterstitialTime = (new Date).getTime(), t && t.then(() => {
					xe.log("插屏广告展示成功")
				}).catch(t => {
					switch (this.mAdInterstitialMap[e.toString()] = null, t.code) {
						case 30003:
							xe.log("新用户1天内不能曝光Banner，请将手机时间调整为1天后，退出游戏重新进入");
							break;
						case 30009:
							xe.log("10秒内调用广告次数超过1次，10秒后再调用");
							break;
						case 30002:
							xe.log("load广告失败，重新加载广告"), this.vivoRetryShow(e);
							break;
						case 3e4:
							xe.log("广告对象长时间不用会被回收导致或者是创建初始化未完成或未初始化 (等待初始化首次加载完成)"), this.vivoRetryShow(e);
							break;
						default:
							xe.log("插屏广告展示失败"), xe.log(JSON.stringify(t))
					}
				})
			} else this.onCloseVideoInterstitial({
				isEnded: !0
			})
		}
		vivoRetryShow(e) {
			let t = U.I.getConf().ad.interstitial[e];
			if (!this.mAdInterstitialMap[e.toString()] && this.sdk.createInterstitialAd && t && "" != t) {
				let e = this.sdk.createInterstitialAd({
					posId: t
				}).show();
				e && e.then(() => {
					xe.log("插屏广告展示成功")
				}).catch(e => {
					xe.log("插屏广告展示失败-重试"), xe.log(JSON.stringify(e))
				})
			}
		}
	}
	class Vt extends Nt {
		constructor() {
			super(), this.sdk = window.qg
		}
		getInterstitialAd(e) {
			let t = U.I.getConf().ad.interstitial[e];
			if (!this.mAdInterstitialMap[e.toString()] && t && "" != t) {
				xe.log("createInterstitialoAd key:" + t);
				let i = null;
				this.sdk.createInsertAd && -1 != Oe.I.compareVersion("1051") && (xe.log("onQGMiniGame createInterstitialoAd key:" + t), i = this.sdk.createInsertAd({
					adUnitId: t
				})), i && (this.mInterstitialCb && i.offClose(this.mInterstitialCb), this.mInterstitialCb = (e => {
					this.onCloseVideoInterstitial(e)
				}), i.onClose(this.mInterstitialCb)), this.mAdInterstitialMap[e.toString()] = i
			}
			return this.mAdInterstitialMap[e.toString()]
		}
		showInterstitialAd(e, t, i, n, a) {
			this.mCloseVideoCallerInterstitial = t, this.mCloseVideoFuncInterstitial = i, this.mShowVideoCallerInterstitial = n, this.mShowVideoFuncInterstitial = a;
			let o = this.getInterstitialAd(e);
			o ? (o.offError(), o.onError(e => {
				this.onCloseVideoInterstitial({
					isEnded: !0
				})
			}), -1 != Oe.I.compareVersion("1051") && (o.load(), o.onLoad(() => {
				o.show()
			}))) : this.onCloseVideoInterstitial({
				isEnded: !0
			})
		}
	}
	class kt {
		constructor() {
			this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initBoxAd()
		}
		initBoxAd() {
			this.mAdBoxMap = {}
		}
		getBoxAd(e, t) {
			let i = U.I.getConf().ad.box[e];
			if (!this.mAdBoxMap[e.toString()] && i && "" != i) {
				let t = null;
				"function" == typeof this.sdk.createGridAd && ((t = this.sdk.createGridAd({
					adUnitId: U.I.getConf().ad.box[e],
					adTheme: "white",
					gridCount: 5,
					style: {
						left: (Laya.Browser.clientWidth - 330) / 2,
						top: (Laya.Browser.clientHeight - 100) / 2,
						width: 330,
						opacity: .8
					}
				})).style.left = (Laya.Browser.clientWidth - t.style.width) / 2, t.style.top = (Laya.Browser.clientHeight - 100) / 2), this.mAdBoxMap[e.toString()] = t
			}
			return this.mAdBoxMap[e.toString()]
		}
		showBox(e) {
			let t = this.getBoxAd(e);
			return t && (t.show(), t.style.top = 120), t
		}
		hideBox(e) {
			let t = this.getBoxAd(e);
			t && t.hide()
		}
	}
	class Bt extends kt {
		constructor() {
			super(), this.sdk = window.qq
		}
		getBoxAd(e, t) {
			let i = U.I.getConf().ad.box[e];
			if (!this.mAdBoxMap[e.toString()] && i && "" != i) {
				let t = this.sdk.createAppBox({
					adUnitId: U.I.getConf().ad.box[e]
				});
				this.mAdBoxMap[e.toString()] = t
			}
			return this.mAdBoxMap[e.toString()]
		}
		showBox(e) {
			let t = this.getBoxAd(e);
			return t && t.load().then(() => {
				t.show()
			}), t
		}
		hideBox(e) { }
	}
	class Gt extends Nt {
		constructor() {
			super(), this.sdk = window.qq
		}
		getInterstitialAd(e) {
			let t = U.I.getConf().ad.interstitial[e];
			if (!this.mAdInterstitialMap[e.toString()] && t && "" != t && -1 != Oe.I.compareVersion("1.12.0")) {
				xe.log("QQ createInterstitialoAd key:" + t);
				let i = null;
				(i = this.sdk.createInterstitialAd({
					adUnitId: t
				})) && (xe.log("QQ 222 createInterstitialoAd key:" + t), i.load().catch(e => {
					xe.error("QQ 222 createInterstitialoAd load error", e)
				}), i.onLoad(() => {
					xe.log("WX 插屏 广告加载成功")
				}), this.mInterstitialCb && i.offClose(this.mInterstitialCb), this.mInterstitialCb = (e => {
					this.onCloseVideoInterstitial(e)
				}), i.onClose(this.mInterstitialCb)), this.mAdInterstitialMap[e.toString()] = i
			}
			return this.mAdInterstitialMap[e.toString()]
		}
		showInterstitialAd(e, t, i, n, a) {
			this.mCloseVideoCallerInterstitial = t, this.mCloseVideoFuncInterstitial = i, this.mShowVideoCallerInterstitial = n, this.mShowVideoFuncInterstitial = a;
			let o = this.getInterstitialAd(e);
			o ? (o.offError(), o.onError(e => {
				this.onCloseVideoInterstitial({
					isEnded: !0
				}), xe.log("QQ插屏视频 广告加载失败 res:", e)
			}), o.show().catch(() => {
				o.load().then(() => o.show()).catch(e => {
					this.onCloseVideoInterstitial({
						isEnded: !0
					}), xe.log("QQ 插屏 广告显示失败" + e)
				})
			})) : this.onCloseVideoInterstitial({
				isEnded: !0
			})
		}
	}
	class Ft {
		constructor() {
			this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null, this.mCb = null
		}
		initVideoAd() {
			this.mAdVideoMap = {}, Z.I.preloadRewardAD()
		}
		getVideoAd(e) {
			return Z.I.isRewardADLoaded()
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Z.I.onVideoSuccess = (() => {
				this.onCloseVideo({
					isEnded: !0
				})
			}), Z.I.onVideoFail = (() => {
				this.videoAdErrfun(null)
			}), Z.I.onVideoLoadedFail = (() => {
				this.videoAdErrfun(null)
			}), Z.I.playRewardAD()
		}
		videoAdErrfun(e) {
			this.onCloseVideo({
				isEnded: !1
			})
		}
		onCloseVideo(e) {
			let t = !1;
			(e && e.isEnded || void 0 === e) && (t = !0), this.mCloseVideoCaller && this.mCloseVideoFunc && this.mCloseVideoFunc.call(this.mCloseVideoCaller, t)
		}
	}
	class zt {
		constructor() {
			this.mVidePlayTime = 0, this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null, this.mCb = null, this.mHideFlag = 0, this.mVidePlayTime = 0
		}
		initVideoAd() {
			if (this.mAdVideoMap = {}, U.I.getConf().ad.video.length > 0)
				for (let e = 0; e < U.I.getConf().ad.video.length; e++) {
					let t = U.I.getConf().ad.video[e];
					YDSDK.initShareVideo({
						moduleId: t,
						onUpdate: (e, t) => {
							console.error("YDSDK.initShareVideo"), console.error(e), console.error(t)
						}
					})
				}
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			return console.error("getVideoAd"), console.error("adkey:" + e), console.error("key:" + t), null
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = U.I.getConf().ad.video[e];
			console.error("showVideoAd"), console.error("adkey:" + e), console.error("videoAd:" + o), YDSDK.onShareVideo({
				moduleId: o,
				onFail: (e, t, i) => {
					console.log("===onFail=m===", e), console.log("===onFail=type===", t), console.log("===onFail=errCode===", i), this.onCloseVideo({
						isEnded: !1
					})
				},
				onSuccess: (e, t, i) => {
					console.log("===onSuccess=m===", e), console.log("===onSuccess=type===", t), console.log("===onSuccess=type===", i), this.onCloseVideo({
						isEnded: !0
					})
				}
			})
		}
		onCloseVideo(e) {
			let t = !1;
			(e && e.isEnded || void 0 === e) && (t = !0), Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, St.I.setSoundVolume(1), St.I.playBGM("bgm");
			let i = T.Failed;
			t && (i = 3 == this.mHideFlag ? T.Jump : T.Normal), this.mHideFlag = 0, this.mCloseVideoCaller && this.mCloseVideoFunc && this.mCloseVideoFunc.call(this.mCloseVideoCaller, i)
		}
	}
	class Xt {
		constructor() {
			this.mVidePlayTime = 0, this.gameGad = !1, this.timestamp = 0, this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null, this.mCb = null, this.mHideFlag = 0, this.mVidePlayTime = 0
		}
		initVideoAd() {
			this.mAdVideoMap = {}
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("createVideoAd adkey:" + t);
				let i = this.sdk.createRewardedVideoAd({
					adUnitId: t
				});
				i && (i.onLoad(() => {
					this.mVidePlayTime = (new Date).getTime(), console.log("激励视频 广告加载成功")
				}), i.onError(e => {
					console.log("激励视频 广告加载失败 res:", e)
				}), this.mCb && i.offClose(this.mCb), this.mCb = (e => {
					this.onCloseVideo(e), (e && e.isEnded || void 0 === e) && i.load()
				}), i.onClose(this.mCb), i.load()), this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			this.gameGad = !0, this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			o ? (o.offError(this.videoAdErrfun.bind(this)), o.onError(this.videoAdErrfun.bind(this)), this.mHideFlag = 1, o.show().catch(() => {
				o.load().then(() => o.show().catch(e => {
					this.mHideFlag = 0, this.onVideoLoadFail()
				}))
			})) : (this.onVideoLoadFail(), this.mHideFlag = 0)
		}
		videoAdErrfun(e) {
			this.onVideoLoadFail(), this.mHideFlag = 0
		}
		onVideoLoadFail() {
			this.mIsListenShare = !1;
			let e = this;
			this.gameGad && (this.gameGad = !1, wx.getGameGad(t => {
				"LOOKSUC" == t.msg ? (this.mHideFlag = 3, e.onCloseVideo({
					isEnded: !0
				})) : "LOOKFAIL" == t.msg ? e.onCloseVideo({
					isEnded: !1
				}) : "SHOWADFAIL" == t.msg ? e.onCloseVideo({
					isEnded: !1
				}) : "NAVIGATEFAIL" == t.msg && e.onCloseVideo({
					isEnded: !1
				})
			}))
		}
		onCloseVideo(e) {
			let t = !1;
			(e && e.isEnded || void 0 === e) && (t = !0), Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, St.I.setSoundVolume(1), St.I.playBGM("bgm");
			let i = T.Failed;
			t && (i = 3 == this.mHideFlag ? T.Jump : T.Normal), this.mHideFlag = 0, this.mCloseVideoCaller && this.mCloseVideoFunc && this.mCloseVideoFunc.call(this.mCloseVideoCaller, i)
		}
	}
	class Yt extends Nt {
		constructor() {
			super(), this.sdk = window.tt
		}
	}
	class Ut {
		constructor() {
			this.sdk = window.wx, this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null, Re.instance.addListener("shareApp", this, this.onShareResultEvent), Re.instance.addListener(Me.GameOnShowEvent, this, this.gameOnShowEvent), Re.instance.addListener(Me.GameOnHideEvent, this, this.gameOnHideEvent)
		}
		initVideoAd() {
			this.mAdVideoMap = {}
		}
		gameOnShowEvent(e) { }
		gameOnHideEvent(e) { }
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("createVideoAd adkey:" + t);
				let i = this.sdk.createRewardedVideoAd({
					adUnitId: t
				});
				this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			if (o) {
				o.onLoad(() => {
					console.log("激励视频 广告加载成功")
				});
				try {
					o.errorFunc && o.offError(o.errorFunc)
				} catch (e) {
					console.warn("--------------videoAd.errorFunc error:"), console.error(e)
				}
				o.errorFunc = (e => {
					this.videoAdErrorfun(e)
				}), o.onError(o.errorFunc);
				try {
					o.closeFunc && o.offClose(o.closeFunc)
				} catch (e) {
					console.warn("--------------videoAd.offClose error:"), console.error(e)
				}
				o.closeFunc = (e => {
					this.videoAdClosefun(e)
				}), o.onClose(o.closeFunc), o.show().catch(() => {
					o.load().then(() => o.show()).catch(e => {
						console.log("激励视频 广告显示失败")
					})
				})
			} else console.log("创建激励视频广告实例失败"), this.onVideoShowFail(null)
		}
		videoAdClosefun(e) {
			console.log("激励视频 广告关闭");
			let t = !1;
			e && e.isEnded || void 0 === e ? (t = !0, this.onVideoBack(t, e)) : this.onVideoBack(t, "closeAD")
		}
		videoAdErrorfun(e) {
			console.log("激励视频错误事件。", e), this.onVideoShowFail(e)
		}
		onVideoShowFail(e) {
			this.mIsListenShare = !1, Et.I.share(R.InviteFriend) ? (this.mIsListenShare = !0, this.ErrorRes = e) : this.onVideoBack(!1, e)
		}
		onShareResultEvent(e) {
			this.mIsListenShare && (this.mIsListenShare = !1, this.onVideoBack(e.success, this.ErrorRes))
		}
		onVideoBack(e, t) {
			Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, St.I.setSoundVolume(1), St.I.playBGM("bgm"), this.mCloseVideoCaller && this.mCloseVideoFunc && (console.log("回调参数", e, t), this.mCloseVideoFunc.call(this.mCloseVideoCaller, e, t))
		}
	}
	class Ht extends ft {
		constructor() {
			super(), this.sdk = window.qg
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("getBannerAd adUnitId:", a, "---", e), a && !this.mBannerAdMap[a] && "" != a) {
				let e = null; - 1 != Oe.I.compareVersion("1031") && (t ? (xe.log("~~~~mTop  getBannerAd adUnitId:", a), e = this.sdk.createBannerAd({
					posId: a,
					style: {
						left: 240,
						top: 850
					}
				})) : (xe.log("~~~~no mTop  getBannerAd adUnitId:", a), e = this.sdk.createBannerAd({
					posId: a,
					style: {}
				})), e && (this.mVVGreateBannerTime = (new Date).getTime(), e.offClose(), e.onClose(() => {
					xe.log("getBannerAd onClose"), e.destroy(), e = null, this.mBannerAdMap[a] = null
				}), e.offError(), e.onError(t => {
					xe.log(t), e.destroy(), e = null, this.mBannerAdMap[a] = null
				}))), this.mBannerAdMap[a] = e
			}
			return this.mBannerAdMap[a]
		}
		showBannerAd(e, t, i, n, a, o) {
			if ((new Date).getTime() - this.mVVGreateBannerTime <= 3e3) return null;
			this.mVVGreateBannerTime = (new Date).getTime();
			let s = U.I.getConf().ad.banner[e],
				r = this.getBannerAd(e, t);
			if (r && this.mBannerAdMap[s]) {
				var l = r.show();
				l && l.then(() => {
					xe.log("banner 广告显示成功")
				})
			}
			return r
		}
		hideBannerAd(e) {
			let t = U.I.getConf().ad.banner[e],
				i = this.mBannerAdMap[t];
			if (i) {
				var n = i.hide();
				n && n.then(() => {
					i.destroy(), this.mBannerAdMap[t] = null, xe.log("banner广告--隐藏成功--第一次")
				}).catch(e => {
					xe.log("banner广告销--隐藏失败--第一次", e);
					var n = i.hide();
					n && n.then(() => {
						i.destroy(), this.mBannerAdMap[t] = null, xe.log("banner广告--隐藏成功--第2次")
					}).catch(e => {
						xe.log("banner广告--隐藏失败----第2次", e), i.destroy(), this.mBannerAdMap[t] = null
					})
				})
			}
		}
	}
	class Wt { }
	Wt.UPDATE_COIN = 1001, Wt.UPDATE_DIAMOND = 1002, Wt.RED_POINT = 1003, Wt.MUSIC_ON = 1004, Wt.MUSIC_OFF = 1005, Wt.MUSIC_DOWN = 1006, Wt.LUCKY_DRAW = 1007, Wt.BOX_REWARD = 1008, Wt.UPDATE_TI = 1009, Wt.NEW_LEVEL = 2e3, Wt.START_LEVEL = 2001, Wt.GAME_OVER = 2002, Wt.REVIVE = 2003, Wt.BACK_MENU = 2004, Wt.LEVEL_INIT = 600, Wt.LEVEL_BEGIN = 601, Wt.LEVEL_GIVEUP = 602, Wt.LEVEL_FAILGET = 603, Wt.LEVEL_WINGET = 604, Wt.LEVEL_GAMEEND = 605, Wt.VIVO_AD_TOOMUCH = "VIVO_AD_TOOMUCH", Wt.MOOM_MAINAD_CLICK = "MOOM_MAINAD_CLICK";
	class Kt {
		constructor() {
			this.mVVGreateVideoTime = 0, this.sdk = window.qg, this.initAdvert()
		}
		initAdvert() {
			this.initVideoAd(), this.mCloseVideoCaller = null, this.mCloseVideoFunc = null, this.mShowVideoCaller = null, this.mShowVideoFunc = null
		}
		initVideoAd() {
			this.mAdVideoMap = {}
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			if (xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && this.sdk.createRewardedVideoAd) {
				xe.log("createVideoAd adkey:" + t);
				let i = null; - 1 != Oe.I.compareVersion("1041") && (i = this.sdk.createRewardedVideoAd({
					posId: t
				})), this.mAdVideoMap[e.toString()] = i
			}
			return this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			if (this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, (new Date).getTime() - this.mVVGreateVideoTime <= 1e3) return Mt.instance.show(bt.MoonTipPanel, "暂无视频, 请稍后再试"), Re.instance.triggerListener(Wt.VIVO_AD_TOOMUCH, this.mVVGreateVideoTime), null;
			this.mVVGreateVideoTime = (new Date).getTime(), Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM();
			let o = this.getVideoAd(e);
			if (o) {
				this.mKey = e, o.offError(this.videoAdErrorfun.bind(this)), o.onError(this.videoAdErrorfun.bind(this)), o.offClose(this.videoAdClosefun.bind(this)), o.onClose(this.videoAdClosefun.bind(this));
				let t = o.load();
				t && t.catch(e => {
					xe.log("激励广告load失败" + JSON.stringify(e))
				}), o.offLoad(), o.onLoad(() => {
					let e = o.show();
					e && e.catch(e => {
						xe.log("激励广告展示失败" + JSON.stringify(e))
					})
				})
			} else console.log("创建激励视频广告实例失败"), this.onVideoShowFail(null)
		}
		videoAdClosefun(e) {
			console.log("激励视频 广告关闭回调", e);
			let t = !1;
			e && e.isEnded || void 0 === e ? (t = !0, this.onVideoBack(t, e)) : this.onVideoBack(t, "closeAD")
		}
		videoAdErrorfun(e) {
			if (Mt.instance.show(bt.MoonTipPanel, "暂无视频, 请稍后再试"), this.mAdVideoMap[this.mKey.toString()]) {
				let e = this.mAdVideoMap[this.mKey.toString()];
				e && (e.destroy(), e = null), this.mAdVideoMap[this.mKey.toString()] = null
			}
			this.onVideoShowFail(e)
		}
		onVideoBack(e, t) {
			Laya.SoundManager.musicMuted = !1, Laya.SoundManager.soundMuted = !1, St.I.setSoundVolume(1), St.I.playBGM("MAINBG"), this.mCloseVideoCaller && this.mCloseVideoFunc && (console.log("回调参数", e, t), this.mCloseVideoFunc.call(this.mCloseVideoCaller, e, t))
		}
		onVideoShowFail(e) {
			this.onVideoBack(!1, e)
		}
	}

	function __awaiter(e, t, i, n) {
		return new (i || (i = Promise))(function (a, o) {
			function fulfilled(e) {
				try {
					step(n.next(e))
				} catch (e) {
					o(e)
				}
			}

			function rejected(e) {
				try {
					step(n.throw(e))
				} catch (e) {
					o(e)
				}
			}

			function step(e) {
				e.done ? a(e.value) : new i(function (t) {
					t(e.value)
				}).then(fulfilled, rejected)
			}
			step((n = n.apply(e, t || [])).next())
		})
	}
	class Zt {
		constructor(e, t) {
			this._lastShowTime = 0, this._refreshInterval = 0, this._refreshInterval = e > 0 ? e : 0, this._lastShowTime = 0, t > 0 && (this._lastShowTime = Date.now() + 1e3 * t - 1e3 * this._refreshInterval)
		}
		isReadyToRefresh() {
			return this.getNextRefreshInterval() <= 0
		}
		getNextRefreshInterval() {
			let e = 0;
			if (this._refreshInterval > 0 && this._lastShowTime > 0) {
				let t = Date.now();
				e = this._refreshInterval - (t - this._lastShowTime) / 1e3
			}
			return e
		}
		updateLastShowTime() {
			this._lastShowTime = Date.now()
		}
	}

	function getOption(e, t, i) {
		return e && void 0 !== e[t] ? e[t] : i
	}
	class jt {
		constructor(e, t, i, n) {
			this._maxLoadError = 0, this._errorCounter = 0, this._fatalError = !1, this._sharedTimer = null, this._adId = e, this._state = ai.NONE, this._type = t, this._sharedTimer = i, this._fatalError = !1, console.assert(!!i, "sharedTimer is invalid", i), this._maxLoadError = getOption(n, "maxLoadError", 0)
		}
		getStateName() {
			return function (e) {
				let t = "NONE";
				switch (e) {
					case ai.NEW:
						t = "NEW";
						break;
					case ai.LOADING:
						t = "LOADING";
						break;
					case ai.LOADED:
						t = "LOADED";
						break;
					case ai.PLAYING:
						t = "PLAYING"
				}
				return t
			}(this._state)
		}
		getAdTypeName() {
			return this._type == ni.INTERSTITIAL ? "插屏广告" : this._type == ni.REWARDED_VIDEO ? "激励视频广告" : this._type == ni.BANNER ? "Banner" : "UNKNOWN"
		}
		getInfo() {
			return `[${this.getAdTypeName()}:${this._adId}:${this.getStateName()}]`
		}
		isReadyToRefresh() {
			return this._sharedTimer.isReadyToRefresh()
		}
		getNextRefreshInterval() {
			return this._sharedTimer.getNextRefreshInterval()
		}
		updateLastShowTime() {
			this._sharedTimer.updateLastShowTime()
		}
		increaseErrorCounter() {
			this._errorCounter++
		}
		resetErrorCounter() {
			this._errorCounter = 0
		}
		setFatalError() {
			this._fatalError = !0
		}
		isErrorTooMany() {
			return this._fatalError || this._maxLoadError > 0 && this._errorCounter >= this._maxLoadError
		}
	}
	class qt extends jt {
		constructor(e, t, i) {
			super(e, ni.BANNER, t, i)
		}
		showAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (!this.isReadyToRefresh()) throw console.log("播放太频繁，还需间隔" + this.getNextRefreshInterval() + " 秒: " + this.getInfo()), gi;
				if (this.isErrorTooMany()) throw console.log("太多错误，停止加载: " + this.getInfo()), ui;
				try {
					this._state = ai.PLAYING, console.log("开始显示广告: " + this.getInfo()), yield FBInstant.loadBannerAdAsync(this._adId), console.log("显示广告成功: " + this.getInfo()), this.updateLastShowTime(), this.resetErrorCounter()
				} catch (e) {
					throw console.error("显示广告失败: " + this.getInfo(), e), e.code == _i || (e.code == yi ? (console.error("广告无法填充，不再继续请求: " + this.getInfo()), this.setFatalError()) : this.increaseErrorCounter()), e
				}
			})
		}
		hideAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (this._state != ai.PLAYING) throw console.log("广告没有在播放中: " + this.getInfo()), mi;
				try {
					console.log("隐藏广告: " + this.getInfo()), yield FBInstant.hideBannerAdAsync(), this._state = ai.NONE
				} catch (e) {
					throw console.error("隐藏广告失败: " + this.getInfo(), e), e
				}
			})
		}
	}
	class Qt extends jt {
		constructor(e, t, i, n) {
			super(e, t, i, n), this._adInstance = null, this._autoLoadOnPlay = getOption(n, "autoLoadOnPlay", !1)
		}
		loadAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (null == this._adInstance) {
					if (this._state != ai.NONE) return void console.log("当前状态未满足加载条件, 正在获取广告对象: " + this.getInfo());
					this._state = ai.NEW, console.log("获取广告对象: " + this.getInfo()), this._adInstance = yield this.createAdInstanceAsync(this._adId)
				}
				if (this._state != ai.NEW) throw console.log("当前状态未满足加载条件: " + this.getInfo()), this._state == ai.LOADING ? (console.log("广告正在加载中，不要重复加载" + this.getInfo()), li) : ri;
				if (this.isErrorTooMany()) throw console.log("太多错误，停止加载: " + this.getInfo()), ui;
				try {
					return this._state = ai.LOADING, console.log("开始加载广告: " + this.getInfo()), yield this._adInstance.loadAsync(), this._state = ai.LOADED, this.resetErrorCounter(), console.log("广告加载成功: " + this.getInfo()), !0
				} catch (e) {
					if (console.error("广告加载失败: " + this.getInfo(), e), e.code == yi) console.error("广告无法填充，不再继续请求: " + this.getInfo()), this.setFatalError();
					else {
						this.increaseErrorCounter(), this._state = ai.NEW;
						let e = 10 * this._errorCounter + ii;
						console.log("延迟" + e + "秒后, 自动重新加载: " + this.getInfo()), waitTimeSecond(e, this.loadAsync.bind(this))
					}
					throw e
				}
			})
		}
		isReady() {
			return null != this._adInstance && this._state == ai.LOADED
		}
		showAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (!this.isReady()) throw console.log("当前状态未满足播放条件: " + this.getInfo()), this._state == ai.PLAYING ? hi : di;
				if (!this.isReadyToRefresh()) throw console.log("播放太频繁，还需间隔" + this.getNextRefreshInterval() + " 秒: " + this.getInfo()), gi;
				try {
					return this._state = ai.PLAYING, console.log("开始播放广告: " + this.getInfo()), yield this._adInstance.showAsync(), console.log("播放广告完毕: " + this.getInfo()), this._adInstance = null, this._state = ai.NONE, this.updateLastShowTime(), this._autoLoadOnPlay && (console.log("延迟" + ii + "秒后, 自动重新加载: " + this.getInfo()), waitTimeSecond(ii, this.loadAsync.bind(this))), !0
				} catch (e) {
					throw console.log("播放广告失败: " + this.getInfo(), e), e.code == _i ? this._state = ai.LOADED : (this._adInstance = null, this._state = ai.NONE, this._autoLoadOnPlay && (console.log("延迟" + ii + "秒后, 自动重新加载: " + this.getInfo()), waitTimeSecond(ii, this.loadAsync.bind(this)))), e
				}
			})
		}
	}
	class $t extends Qt {
		constructor(e, t, i) {
			super(e, ni.INTERSTITIAL, t, i)
		}
		createAdInstanceAsync(e) {
			return __awaiter(this, void 0, void 0, function* () {
				return yield FBInstant.getInterstitialAdAsync(this._adId)
			})
		}
	}
	class Jt extends Qt {
		constructor(e, t, i) {
			super(e, ni.REWARDED_VIDEO, t, i)
		}
		createAdInstanceAsync(e) {
			return __awaiter(this, void 0, void 0, function* () {
				return yield FBInstant.getRewardedVideoAsync(this._adId)
			})
		}
	}
	const ei = 3,
		ti = 3,
		ii = 1;
	var ni, ai;

	function waitTimeSecond(e, t) {
		return __awaiter(this, void 0, void 0, function* () {
			return new Promise((i, n) => {
				setTimeout(() => {
					t && t(), i()
				}, 1e3 * e)
			})
		})
	} ! function (e) {
		e[e.INTERSTITIAL = 0] = "INTERSTITIAL", e[e.REWARDED_VIDEO = 1] = "REWARDED_VIDEO", e[e.BANNER = 2] = "BANNER"
	}(ni || (ni = {})),
		function (e) {
			e[e.NONE = 0] = "NONE", e[e.NEW = 1] = "NEW", e[e.LOADING = 2] = "LOADING", e[e.LOADED = 3] = "LOADED", e[e.PLAYING = 4] = "PLAYING"
		}(ai || (ai = {}));
	const oi = {
		code: "EXCEED_MAX_AD_INSTANCE",
		message: "广告对象不允许超过 " + ei
	},
		si = {
			code: "NO_READY_AD_INSTANCE",
			message: "没有加载完毕的广告，或者广告播放太频繁"
		},
		ri = {
			code: "NOT_READY_FOR_LOAD",
			message: "当前状态不允许再次加载"
		},
		li = {
			code: "AD_IS_LOADING",
			message: "广告正在加载"
		},
		di = {
			code: "NOT_READY_FOR_PLAYING",
			message: "没有可以播放的广告"
		},
		hi = {
			code: "AD_IS_PLAYING",
			message: "广告正在播放"
		},
		ci = {
			code: "NO_BANNER_AD",
			message: "没有添加Banner广告"
		},
		pi = {
			code: "API_NOT_SUPPORT",
			message: "广告接口不支持"
		},
		gi = {
			code: "TOO_FAST_SHOW",
			message: "广告播放太频繁"
		},
		mi = {
			code: "NOT_PLAYING",
			message: "广告没有播放"
		},
		ui = {
			code: "TOO_MANY_ERRORS",
			message: "太多错误, 停止操作"
		},
		fi = "loadBannerAdAsync",
		_i = "RATE_LIMITED",
		yi = "ADS_NO_FILL";
	class Ii {
		static getVersion() {
			return "1.0.2"
		}
		static addInterstitial(e, t = ti) {
			null == this._interstitialTimer && (this._interstitialTimer = new Zt(this.defaultInterstitialTimerOption.refreshInterval, this.defaultInterstitialTimerOption.delayForFirstAd));
			for (let i = 0; i < t; i++) {
				if (this._interstitialAds.length >= ei) throw console.log("添加插屏广告失败, 超出限制: " + this._interstitialAds.length, e), oi;
				let t = new $t(e, this._interstitialTimer, this.defaultInterstitialOption);
				this._interstitialAds.push(t), console.log("添加插屏广告: " + e, "count: " + this._interstitialAds.length)
			}
			return this._interstitialAds.length
		}
		static addRewardedVideo(e, t = ti) {
			null == this._rewardedVideoTimer && (this._rewardedVideoTimer = new Zt(this.defaultRewardedVideoTimerOption.refreshInterval, this.defaultRewardedVideoTimerOption.delayForFirstAd));
			for (let i = 0; i < t; i++) {
				if (this._rewardedVideos.length >= ei) throw console.log("添加激励视频广告失败, 超出限制: " + this._rewardedVideos.length, e), oi;
				let t = new Jt(e, this._rewardedVideoTimer, this.defaultRewardedVideoOption);
				this._rewardedVideos.push(t), console.log("添加激励视频广告: " + e, "count: " + this._rewardedVideos.length)
			}
			return this._rewardedVideos.length
		}
		static addBanner(e) {
			null == this._bannerTimer && (this._bannerTimer = new Zt(this.defaultBannerTimerOption.refreshInterval, this.defaultBannerTimerOption.delayForFirstAd));
			let t = new qt(e, this._bannerTimer, this.defaultBannerOption);
			return this._banners.push(t), console.log("添加Banner广告: " + e, "count: " + this._banners.length), t
		}
		static loadAll() {
			return __awaiter(this, void 0, void 0, function* () {
				return console.log("初始化广告队列"), yield this.loadAllAsync()
			})
		}
		static loadAllAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				console.log("FBAdManager Version: " + this.getVersion()), console.log("初始化广告队列");
				for (let e = 0; e < this._rewardedVideos.length; e++) {
					const t = this._rewardedVideos[e];
					e > 0 && (yield waitTimeSecond(.1));
					try {
						yield t.loadAsync()
					} catch (e) { }
				}
				for (let e = 0; e < this._interstitialAds.length; e++) {
					const t = this._interstitialAds[e];
					e > 0 && (yield waitTimeSecond(.1));
					try {
						yield t.loadAsync()
					} catch (e) { }
				}
			})
		}
		static _isAdReady(e) {
			let t = e == ni.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos,
				i = !1;
			for (let e = 0; e < t.length; e++) {
				const n = t[e];
				if (n.isReady() && n.isReadyToRefresh()) {
					i = !0;
					break
				}
			}
			return i
		}
		static _showAsync(e) {
			let t = e == ni.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos,
				i = null;
			for (let e = 0; e < t.length; e++) {
				const n = t[e];
				if (n.isReady() && n.isReadyToRefresh()) {
					i = n;
					break
				}
			}
			if (null != i) return i.showAsync();
			throw si
		}
		static _getAdTimer(e) {
			return e == ni.INTERSTITIAL ? this._interstitialTimer : e == ni.REWARDED_VIDEO ? this._rewardedVideoTimer : this._bannerTimer
		}
		static isInterstitialAdReady() {
			return this._isAdReady(ni.INTERSTITIAL)
		}
		static showInterstitialAd() {
			return __awaiter(this, void 0, void 0, function* () {
				return yield this._showAsync(ni.INTERSTITIAL)
			})
		}
		static isRewardedVideoReady() {
			return this._isAdReady(ni.REWARDED_VIDEO)
		}
		static showRewardedVideo() {
			return __awaiter(this, void 0, void 0, function* () {
				return yield this._showAsync(ni.REWARDED_VIDEO)
			})
		}
		static checkApiSupport(e) {
			return FBInstant.getSupportedAPIs().indexOf(e) >= 0
		}
		static isBannerSupport() {
			return void 0 === this._bannerSupport && (this._bannerSupport = this.checkApiSupport(fi)), this._bannerSupport
		}
		static isBannerReady() {
			if (this._banners.length <= 0) throw ci;
			return this._banners[0].isReadyToRefresh()
		}
		static showBannerAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (!this.isBannerSupport()) throw pi;
				if (this._banners.length <= 0) throw ci;
				let e = this._banners[0];
				return yield e.showAsync()
			})
		}
		static hideBannerAsync() {
			return __awaiter(this, void 0, void 0, function* () {
				if (!this.isBannerSupport()) throw pi;
				if (this._banners.length <= 0) throw ci;
				let e = this._banners[0];
				return yield e.hideAsync()
			})
		}
	}
	Ii._interstitialAds = [], Ii._rewardedVideos = [], Ii._banners = [], Ii._interstitialTimer = null, Ii._rewardedVideoTimer = null, Ii._bannerTimer = null, Ii._bannerSupport = void 0, Ii.defaultInterstitialOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 3
	}, Ii.defaultRewardedVideoOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 3
	}, Ii.defaultBannerOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 1
	}, Ii.defaultInterstitialTimerOption = {
		refreshInterval: 45,
		delayForFirstAd: 45
	}, Ii.defaultRewardedVideoTimerOption = {
		refreshInterval: 0,
		delayForFirstAd: 0
	}, Ii.defaultBannerTimerOption = {
		refreshInterval: 40,
		delayForFirstAd: 0
	};
	class wi extends ft {
		constructor() {
			super(), this.sdk = window.FBAdManager
		}
		getBannerAd(e, t, i, n) {
			let a = U.I.getConf().ad.banner[e];
			if (xe.log("getBannerAd adUnitId:", a), !this.mBannerAdMap[e.toString()] && a && "" != a) {
				let t = Ii.addBanner(a);
				this.mBannerAdMap[e.toString()] = t
			}
			return this.mBannerAdMap[e.toString()]
		}
		showBannerAd(e, t, i, n, a, o) {
			let s = this.getBannerAd(e, t);
			return s && Ii.isBannerReady() && Ii.showBannerAsync().then(() => { }).catch(e => {
				xe.log("显示Banner广告: 失败，原因: " + e.message)
			}), s
		}
		hideBannerAd(e) {
			xe.log("banner广告"), this.mBannerAdMap[e.toString()] && Ii.hideBannerAsync().then(() => { }).catch(e => {
				xe.log("隐藏Banner广告: 失败，原因: " + e.message)
			})
		}
	}
	class Si extends Nt {
		constructor() {
			super(), this.sdk = window.FBAdManager
		}
		getInterstitialAd(e) {
			let t = U.I.getConf().ad.interstitial[e];
			return !this.mAdInterstitialMap[e.toString()] && t && "" != t && (xe.log("createInterstitialoAd key:" + t), Ii.addInterstitial(t, 1), this.mAdInterstitialMap[e.toString()] = t), this.mAdInterstitialMap[e.toString()]
		}
		showInterstitialAd(e, t, i, n, a) {
			Ii.isInterstitialAdReady() && Ii.showInterstitialAd().then(() => { }).catch(e => { })
		}
	}
	class vi extends Lt {
		constructor() {
			super(), this.sdk = window.FBAdManager
		}
		getVideoAd(e) {
			let t = U.I.getConf().ad.video[e];
			return xe.log("getVideoAd key:", t), !this.mAdVideoMap[e.toString()] && t && "" != t && (xe.log("createVideoAd adkey:" + t), Ii.addRewardedVideo(t, 1), this.mAdVideoMap[e.toString()] = t), this.mAdVideoMap[e.toString()]
		}
		showVideoAd(e, t, i, n, a) {
			xe.log("show reward here")
			if (this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Ii.isRewardedVideoReady()) {
				let e = this;
				Ii.showRewardedVideo().then(() => {
					e.mCloseVideoCaller && e.mCloseVideoFunc && e.mCloseVideoFunc.call(e.mCloseVideoCaller, T.Normal)
				}).catch(t => {
					e.videoAdErrfun(null)
				})
			} else this.videoAdErrfun(null)
		}
		videoAdErrfun(e) {
			super.videoAdErrfun(e), Mt.instance.show(bt.MoonTipPanel, "ad load fail, wait a minute")
		}
	}
	class Ei {
		constructor() {
			this.mShowTTBanner = !0, this.mVVGreateBannerTime = 0, this.mErrorVideoCaller = null, this.mErrorVideoFunc = null, this.initAdvert()
		}
		initAdvert() {
			this.initBannerAd()
		}
		initBannerAd() {
			this.mBannerAdMap = {}
		}
		setShowTTBanner(e) {
			this.mShowTTBanner = e
		}
		clearAllBannerKey() {
			this.mBannerAdMap = {}
		}
		clearBannerKey(e) {
			this.mBannerAdMap[e.toString()] = null
		}
		getBannerAd(e, t, i, n, a) {
			return Z.I.isBannerUseAble()
		}
		showBannerAd(e, t, i, n, a, o, s) {
			return this.mErrorVideoCaller = o, this.mErrorVideoFunc = s, Z.I.playBannerAD("banner"), e
		}
		hideBannerAd(e) {
			Z.I.removeBannerAD("banner")
		}
		onErrorVideo(e) {
			this.mErrorVideoCaller && this.mErrorVideoFunc && this.mErrorVideoFunc.call(this.mErrorVideoCaller, e)
		}
	}
	class Li extends ft {
		constructor() {
			super(), this.sdk = typeof minigame
		}
		getBannerAd(e, t, i, n) { }
		showBannerAd(e, t, i, n, a, o) {
			MiniGameAds.isBannerReady() ? MiniGameAds.showBanner().then(() => {
				console.info("新接口播放横幅广告: 成功")
			}).catch(e => {
				console.error("新接口播放横幅广告: 失败，原因: " + e.message)
			}) : console.info("横幅广告没有加载成功，无法播放")
		}
		hideBannerAd(e) {
			MiniGameAds.hideBanner().then(() => {
				console.info("新接口隐藏激励广告: 成功")
			}).catch(e => {
				console.error("新接口隐藏激励广告: 失败，原因: " + e.message)
			})
		}
	}
	class Ai extends Lt {
		constructor() {
			super(), this.sdk = typeof minigame
		}
		getVideoAd(e) {
			return !0
		}
		showVideoAd(e, t, i, n, a) {
			console.info("show reward here")
			this.mCloseVideoCaller = t, this.mCloseVideoFunc = i, this.mShowVideoCaller = n, this.mShowVideoFunc = a, Laya.SoundManager.musicMuted = !0, Laya.SoundManager.soundMuted = !0, St.I.setSoundVolume(0), St.I.stopBGM(), MiniGameAds.isRewardvideoReady() ? MiniGameAds.showRewardedVideo().then(() => {
				console.info("新接口播放激励广告: 成功"), this.onCloseVideo({
					isEnded: !0
				})
			}).catch(e => {
				console.error("新接口播放激励广告: 失败，原因: " + e.message), this.onCloseVideo({
					isEnded: !1
				})
			}) : (console.info("激励视频没有加载成功，无法播放"), this.onCloseVideo({
				isEnded: !1
			}))
		}
		videoAdErrfun(e) { }
	}
	class Ti extends Nt {
		constructor() {
			super(), this.sdk = typeof minigame
		}
		getInterstitialAd(e) { }
		showInterstitialAd(e, t, i, n, a) {
			this.mCloseVideoCallerInterstitial = t, this.mCloseVideoFuncInterstitial = i, this.mShowVideoCallerInterstitial = n, this.mShowVideoFuncInterstitial = a, MiniGameAds.isInterstitialReady() ? MiniGameAds.showInterstitial().then(() => {
				console.info("新接口播放插屏广告: 成功")
			}).catch(e => {
				console.error("新接口播放插屏广告: 失败，原因: " + e.message)
			}) : console.info("插屏广告没有加载成功，无法播放")
		}
	}
	class xi {
		constructor() {
			this.gameAdvertSDK = null, this.bannerAdvertSDK = null, this.videoAdvertSDK = null, this.interstitialAdvertSDK = null, this.boxAdvertSDK = null, this.nativeAdvertSDK = null, Laya.Render.isConchApp ? (this.videoAdvertSDK = new Ft, this.interstitialAdvertSDK = new mt, this.bannerAdvertSDK = new Ei) : Laya.Browser.onMiniGame ? "object" == typeof tt ? (xe.log("init广告sdk 头条"), this.bannerAdvertSDK = new _t, this.videoAdvertSDK = new At) : (xe.log("init广告sdk 微信"), this.bannerAdvertSDK = new ft, "undefined" != typeof YDSDK ? this.videoAdvertSDK = new zt : wx.getGameGad ? this.videoAdvertSDK = new Xt : wx.leuok ? this.videoAdvertSDK = new Ut : this.videoAdvertSDK = new Lt, this.interstitialAdvertSDK = new Nt, this.gameAdvertSDK = new ut, this.boxAdvertSDK = new kt) : Laya.Browser.onQQMiniGame ? (xe.log("init广告sdk QQ"), this.bannerAdvertSDK = new yt, this.videoAdvertSDK = new Tt, this.interstitialAdvertSDK = new Gt, this.boxAdvertSDK = new Bt) : Laya.Browser.onVVMiniGame ? (xe.log("init广告sdk vivo"), qg.leuok ? (console.error("--=====-=--LYVVBannerAdvert=-==-=-=-=-=-"), this.videoAdvertSDK = new Kt, this.bannerAdvertSDK = new Ht) : (this.bannerAdvertSDK = new It, this.videoAdvertSDK = new Ot), this.interstitialAdvertSDK = new Pt) : Laya.Browser.onQGMiniGame ? (xe.log("init广告sdk oppo"), this.bannerAdvertSDK = new wt, this.videoAdvertSDK = new Dt, this.interstitialAdvertSDK = new Vt) : Laya.Browser.onTTMiniGame ? (xe.log("init广告sdk 头条"), this.bannerAdvertSDK = new _t, this.videoAdvertSDK = new At, this.interstitialAdvertSDK = new Yt) : "object" == typeof FBInstant ? "undefined" != typeof minigame ? (this.bannerAdvertSDK = new Li, this.videoAdvertSDK = new Ai, this.interstitialAdvertSDK = new Ti) : (this.bannerAdvertSDK = new wi, this.videoAdvertSDK = new vi, this.interstitialAdvertSDK = new Si) : xe.error("init广告sdk 错误!")
		}
		static get I() {
			return h.get(xi)
		}
		getGameBannerAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.getGameBannerAd(e, t) : null
		}
		showGameBannerAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.showGameBannerAd(e, t) : null
		}
		hideGameBannerAd(e) {
			this.gameAdvertSDK && this.gameAdvertSDK.hideGameBannerAd(e)
		}
		getGamePortalAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.getGamePortalAd(e, t) : null
		}
		showGamePortalAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.showGamePortalAd(e, t) : null
		}
		getGameIconAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.getGameIconAd(e, t) : null
		}
		showGameIconAd(e, t) {
			return this.gameAdvertSDK ? this.gameAdvertSDK.showGameIconAd(e, t) : null
		}
		setShowTTBanner(e) {
			if (this.bannerAdvertSDK) return this.bannerAdvertSDK.setShowTTBanner(e)
		}
		getBannerAd(e, t, i, n) {
			return this.bannerAdvertSDK ? this.bannerAdvertSDK.getBannerAd(e, t, i, n) : null
		}
		showBannerAd(e, t, i, n, a, o, s) {
			if (this.bannerAdvertSDK) {
				let r = null;
				return r = o && s ? this.bannerAdvertSDK.showBannerAd(e, t, i, n, a, o, s) : this.bannerAdvertSDK.showBannerAd(e, t, i, n, a, this, this.onBannerError)
			}
			return null
		}
		onBannerError(e) {
			if (this.gameAdvertSDK && e) return this.gameAdvertSDK.showGameBannerAd(e.adkey, e.mTop, e.mWidht, e.mHeight)
		}
		showBannerAdByPro(e, t, i, n) {
			if (this.bannerAdvertSDK) {
				let a = null,
					o = 0;
				n && (o = n);
				let s = Laya.Browser.clientWidth - o,
					r = Laya.Browser.clientWidth * t / i;
				return this.showBannerAd(e, a, s, r)
			}
			return null
		}
		hideBannerAd(e) {
			this.bannerAdvertSDK && this.bannerAdvertSDK.hideBannerAd(e), this.gameAdvertSDK && this.hideGameBannerAd(e)
		}
		clearBannerKey(e) {
			this.bannerAdvertSDK && this.bannerAdvertSDK.clearBannerKey(e)
		}
		clearAllBannerKey() {
			this.bannerAdvertSDK && this.bannerAdvertSDK.clearAllBannerKey()
		}
		getVideoAd(e) {
			return this.videoAdvertSDK ? this.videoAdvertSDK.getVideoAd(e) : null
		}
		showVideoAd(e, t, i, n, a) {
			if (U.I.getConf().showVideo) {
				if (this.videoAdvertSDK) return this.videoAdvertSDK.showVideoAd(e, t, i, n, a);
				null != t && null != i && i.call(t, !0)
			} else null != t && null != i && i.call(t, !0)
		}
		getInterstitialAd(e) {
			return this.interstitialAdvertSDK ? this.interstitialAdvertSDK.getInterstitialAd(e) : null
		}
		showInterstitialAd(e, t, i, n, a) {
			return this.interstitialAdvertSDK ? this.interstitialAdvertSDK.showInterstitialAd(e, t, i, n, a) : (null != t && null != i && i.call(t, !1), null)
		}
		existInterstitialAd() {
			return null != this.interstitialAdvertSDK
		}
		getBoxAd(e, t) {
			return this.boxAdvertSDK ? this.boxAdvertSDK.getBoxAd(e, t) : null
		}
		showBox(e) {
			return this.boxAdvertSDK ? this.boxAdvertSDK.showBox(e) : null
		}
		hideBox(e) {
			this.boxAdvertSDK && this.boxAdvertSDK.hideBox(e)
		}
		preloadNativeAD() {
			return this.nativeAdvertSDK ? this.nativeAdvertSDK.preloadNativeAD() : null
		}
		isNativeADLoaded() {
			return !!this.nativeAdvertSDK && this.nativeAdvertSDK.isNativeADLoaded()
		}
		playNativeAD(e) {
			return this.nativeAdvertSDK ? this.nativeAdvertSDK.playNativeAD(e) : null
		}
	}
	class bi { }
	bi.MATRIX_TYPE_SHOW = 1, bi.MATRIX_TYPE_CLIK = 2, bi.MATRIX_TYPE_ACT = 3, bi.MATRIX_TYPE_JUMP = 4;
	class Ci {
		constructor() {
			this.matrixList = {}, this.adSwitchList = {}, d.instance.addListener(this, this.onGetConfComplete)
		}
		static get I() {
			return h.get(Ci)
		}
		getMatrixList(e, t = -1, i = -1) {
			let n;
			this.appId = e.appId, n = {
				version: e.version,
				sgamekey: e.gamekey,
				position: t,
				index: i,
				city: ht.localData.city
			}, console.log("getMatrixList", n), this.mtrixListUrl = `${e.matrixUrl}${Te.MATRIX_LIST}`, d.instance.post(this.mtrixListUrl, n)
		}
		jumpStatistics(e, t, i, n, a, o = -1) {
			let s;
			s = {
				uid: t,
				type: i,
				sgamekey: e.gamekey,
				tgamekey: n,
				position: a,
				index: o,
				timestamp: (new Date).getTime().toString().substr(0, 10)
			};
			let r = {
				message: JSON.stringify(s)
			};
			this.skipStatisticsUrl = `${e.reportUrl}${Te.SKIP_STATISTICS}`, console.log(s), d.instance.post(this.skipStatisticsUrl, r)
		}
		getAdSwitchList(e) {
			let t;
			console.log("getAdSwitchList", ht.localData), console.log("getAdSwitchList", ht.localData.city), t = {
				version: e.version,
				gamekey: e.gamekey,
				city: ht.localData.city
			}, console.log("getAdSwitchList", t), this.adSwitchListUrl = `${e.matrixUrl}${Te.AD_SWITCH_LIST}`, d.instance.post(this.adSwitchListUrl, t)
		}
		getMatrixByPosition(e) {
			if (null == this.matrixList[e]) return null;
			let t = [];
			return Object.keys(this.matrixList[e]).forEach(i => {
				t.push(this.matrixList[e][i])
			}), this.sort(t, "index"), t
		}
		getAdSwitchByPosition(e) {
			return null == this.adSwitchList[e] ? null : this.adSwitchList[e]
		}
		onGetConfComplete(e) {
			if (e.url == this.mtrixListUrl) {
				if (console.log("http:", e), e.result && e.data && 200 == e.data.code && e.data.data)
					for (const t of e.data.data) {
						let e = {};
						for (const i of t.matrix) i.appid != this.appId && (e[i.index] = i);
						this.matrixList[t.position] = e
					}
			} else if (e.url == this.adSwitchListUrl) {
				if (console.log("http:", e), e.result && e.data && 200 == e.data.code && e.data.data)
					for (const t of e.data.data) this.adSwitchList[t.position] = t;
				console.log(this.adSwitchList)
			}
		}
		sort(e, t = null) {
			return e.sort((e, i) => {
				switch (typeof e) {
					case "number":
						return e < i ? -1 : e > i ? 1 : 0;
					case "string":
						return e.localeCompare(i);
					case "object":
						return "number" == typeof e[t] ? e[t] < i[t] ? -1 : e[t] > i[t] ? 1 : 0 : "string" == typeof e[t] ? e[t].localeCompare(i[t]) : 0;
					default:
						return 0
				}
			})
		}
		checkSkip() {
			let e = Ci.I.getAdSwitchByPosition(gt.SKIP_OTHER);
			if (null != e && 1 == e.state && e.pv > 0) {
				if (vt.random(0, 100) <= e.pv) {
					let e = Ci.I.getMatrixByPosition(ct.SHIP_OTHER);
					if (null != e && e.length > 0) {
						let t = 0;
						for (let i = 0; i < e.length; i++) {
							t += e[i].weight
						}
						if (t > 0) {
							let i = vt.random(0, t),
								n = 0;
							for (let t = 0; t < e.length; t++) {
								let a = e[t];
								if (i <= (n += a.weight)) {
									this.openGame(a, ct.SHIP_OTHER);
									break
								}
							}
						}
					}
				}
			}
		}
		openGame(e, t) {
			let i;
			Oe.I.isWxMiniGame() ? i = window.wx : Oe.I.isQQMiniGame() && (i = window.qq), null != i && (Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_CLIK, e.tgamekey, t, e.index), rt.I.onSaleActionUpLoad(e, 1), i.navigateToMiniProgram({
				appId: e.appid,
				path: e.path,
				success: function (i) {
					Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_ACT, e.tgamekey, t, e.index), rt.I.onSaleActionUpLoad(e, 2)
				},
				fail: function (t) {
					rt.I.onSaleActionUpLoad(e, 3)
				}
			}))
		}
	}
	class Ri {
		constructor() {
			this.isSupport = !1, this.mErrorCaller = {}, this.mHideCaller = {}, this.isSupport = Oe.I.isWxMiniGame(), this.isSupport && (this.sdk = window.wx, this.mErrorCaller = {}, this.mErrorFunc = {}, this.mHideCaller = {}, this.mHideFunc = {}, this.initAdvert())
		}
		static get I() {
			return h.get(Ri)
		}
		initAdvert() {
			this.initCustomAd()
		}
		initCustomAd() {
			this.mAdMap = {}
		}
		getCustomAd(e, t, i = 10) {
			if (!this.isSupport) return;
			let n = U.I.getConf().ad.custom[e];
			if (!this.mAdMap[e.toString()] && n && "" != n) {
				let a = null;
				if ("function" == typeof this.sdk.createCustomAd && -1 != Oe.I.compareVersion("2.11.1")) {
					let o = this.sdk.getSystemInfoSync(),
						s = 100;
					t && (s = t / Laya.stage.height * o.windowHeight);
					let r = 10;
					i && (r = i / Laya.stage.width * o.windowWidth), (a = this.sdk.createCustomAd({
						adUnitId: n,
						adIntervals: 30,
						style: {
							left: r,
							top: s,
							width: 375,
							fixed: !0
						}
					})).onError(e => {
						console.log("getCustomAd", n, e)
					}), a.onLoad(e => { });
					let l = this;
					a.onHide(t => {
						l.onHideAD(e, t)
					})
				}
				this.mAdMap[e.toString()] = a
			}
			return this.mAdMap[e.toString()]
		}
		showCustom(e, t, i, n, a, o, s) {
			if (!this.isSupport) return;
			this.mErrorCaller[e] = n, this.mErrorFunc[e] = a, this.mHideCaller[e] = o, this.mHideFunc[e] = s;
			let r = this.getCustomAd(e, t, i);
			if (r && !r.isShow()) {
				let t = this;
				r.show().then(() => {
					console.log("WX showCustom显示成功:", e)
				}).catch(i => {
					t.onErrorAD(e, i)
				})
			}
			return r
		}
		hideCustom(e) {
			if (!this.isSupport) return;
			let t = this.mAdMap[e.toString()];
			t && t.isShow() && t.hide()
		}
		onErrorAD(e, t) {
			this.mErrorCaller[e] && this.mErrorFunc[e] ? this.mErrorFunc[e].call(this.mErrorCaller[e], t) : console.log("onErrorAD:", t)
		}
		onHideAD(e, t) {
			this.mHideCaller[e] && this.mHideFunc[e] && this.mHideFunc[e].call(this.mHideCaller[e], t)
		}
	}
	class Mi extends Laya.Sprite {
		constructor(e) {
			super(), this.isDebug = !1, this.curBendAngle = new Laya.Vector4, this._isPlayJaSu = !1, this.robots = new Array, this.score = 0, this.goalScore = 0, this.state = 0, this.reliveCount = 0, this.is_relive = !1, this._startTime = 0, this.playTime = 0, this._isShow = !1, this.isBossGuan = !1, this._mapId = 0, this.isGameSucc = !1, this._level = 0, this.slowTime = 0, this.inSlowing = !1, this._app = e, this.mouseEnabled = !1, this._dstAngleV = new Laya.Vector4(0, 0, 0, 0), this._obstacleLayer = new Laya.Sprite3D, this._playerLayer = new Laya.Sprite3D, this._mapLayer = new Laya.Sprite3D, this.rankLayer = new Laya.Sprite
		}
		get mainPlayer() {
			return this._mainPlayer
		}
		get cameraRoot() {
			return this._cameraRoot
		}
		get mapMgr() {
			return this._mapMgr
		}
		get obstacleLayer() {
			return this._obstacleLayer
		}
		get mapLayer() {
			return this._mapLayer
		}
		get scene() {
			return this._scene
		}
		get mapId() {
			return this._mapId
		}
		get app() {
			return this._app
		}
		show() {
			this._isShow = !0, this._scene && this.addChildAt(this._scene, 0), this.rankLayer && Laya.stage.addChild(this.rankLayer)
		}
		hide() {
			this._isShow = !1, this._scene && this._scene.removeSelf(), this.rankLayer && this.rankLayer.removeSelf()
		}
		init() {
			this._url = te.scene, this.enterScene()
		}
		enterScene() {
			this.state = Mi.STATUS_LOAD, this.dispose();
			let e = [];
			this._url && this._url.length && !Laya.Loader.getRes(this._url) && e.push(this._url), e.length ? Laya.loader.create(e, Laya.Handler.create(this, this.onUpdateScene)) : this.onUpdateScene()
		}
		onUpdateScene() {
			if (this._scene = Laya.Loader.getRes(this._url), !this._scene) return void console.log("======找不到此场景===", this._url);
			console.log("==========SceneRoot.onUpdateMap=======", this._scene), this.show(), this._scene.addChild(this._mapLayer), this._scene.addChild(this._obstacleLayer), this._scene.addChild(this._playerLayer), this._scene.enableFog = !1, this.camera = this._scene.getChildByName("CameraStart"), this.camera.enableHDR = !1, this._cameraRoot = this.camera.getComponent(ue), !this._cameraRoot && (this._cameraRoot = this.camera.addComponent(ue)), this._cameraRoot.init(this, this.camera, this._scene.getChildByName("Main Camera"));
			let e = this._scene.getChildByName("role");
			if (!this._mainPlayer) {
				let t = e;
				this.playerClone = t.clone(), this._mainPlayer = new me, this._mainPlayer.init(t), this._mainPlayer.boxColliderEnable = !0, this.cameraRoot.targetPos = t.transform.position.clone(), this._mainPlayer.playerScript.init(this._app, t, !0)
			}
			this.mapObj = this._scene.getChildByName("map01"), this.mapObj && (this.mapObj.active = !1), this.level = J.I.getLevel(), this.state = Mi.STATUS_LOADED, this.freeRotate()
		}
		get level() {
			return this._level
		}
		set level(e) {
			if (!e) return;
			this._level = e, this.isBossGuan = J.I.isBossGuan(e);
			let t = j.LevelTemp.length,
				i = this._level % t;
			i = 0 == i ? t : i, this._levelTemp = j.LevelTemp[i - 1], this.loadLevelData(), this.isBossGuan && this._mainPlayer && this._mainPlayer.playerScript.updateWeapon(0)
		}
		loadLevelData() {
			if (!this._levelTemp) return;
			this._aiSetDatas = this._levelTemp.ai, this._mapUrl = this._levelTemp.resPath;
			let e = this._app.mapDatas[this._levelTemp.flag.toString()],
				t = e.MapElements.length;
			if (this.isBossGuan) this.goalScore = 0;
			else {
				this.goalScore = 1e3;
				for (let i = 0; i < t; i++) {
					let t = e.MapElements[i];
					if (t && t.path && t.path.indexOf("terminal") >= 0) {
						this.goalScore = t.pz;
						break
					}
				}
			}
			this._mapMgr || (this._mapMgr = new Ee(this, this._app)), this._mapMgr.reset(e.MapSegments, e.MapElements, this.isBossGuan), this.initRobot()
		}
		onLoadLevelDataOver() {
			if (!this._levelTemp) return;
			let e = Laya.loader.getRes(this._mapUrl && this._mapUrl.length ? this._mapUrl : this._levelTemp.resPath),
				t = JSON.parse(e),
				i = t.MapElements.length;
			if (this.isBossGuan) this.goalScore = 0;
			else {
				this.goalScore = 1e3;
				for (let e = 0; e < i; e++) {
					let i = t.MapElements[e];
					if (i && i.path && i.path.indexOf("terminal") >= 0) {
						this.goalScore = i.pz;
						break
					}
				}
			}
			this._mapMgr || (this._mapMgr = new Ee(this, this._app)), this._mapMgr.reset(t.MapSegments, t.MapElements, this.isBossGuan), this.initRobot()
		}
		onLoadLevelProgress(e) { }
		getTotalCount() {
			return this._aiSetDatas ? this._aiSetDatas.length + 1 : 1
		}
		readyGo() {
			J.I.playMusic("citybg.mp3"), Laya.SoundManager.soundMuted = !1, this.state == Mi.STATUS_END ? this.state = Mi.STATUS_RELIFE : (this.state = Mi.STATUS_START, this._startTime = Laya.timer.currTimer), this.mainPlayer && (this.mainPlayer.playerScript.isDie = !1, this.mainPlayer.playerScript.running = !0);
			let e = this.robots.length;
			for (let t = 0; t < e; t++) {
				let e = this.robots[t];
				e && (!e.robotScript.running && (e.robotScript.running = !0))
			}
			this.cameraRoot.changeCamera(!1), Ni.evt.dispatchEvent(new ce(ce.GAME_START, null))
		}
		initRobot() {
			let e = this.robots.length;
			for (let t = 0; t < e; t++) {
				let e = this.robots[t];
				e && (e.active = !1)
			}
			let t = this._aiSetDatas && !this.isBossGuan ? this._aiSetDatas.length : 0;
			if (t) {
				let e = this.mainPlayer.playerScript.posZ + j.AI_DIS_A;
				for (let i = 0; i < t; i++) {
					let t;
					if (i < this.robots.length && (t = this.robots[i]), !t) {
						t = new Ae;
						let e = this.playerClone.clone();
						e.name = "robot", this._playerLayer.addChild(e), t.init(e), t.boxColliderEnable = !0, t.robotScript.init(this._app, e, !1), this.robots[i] = t
					}
					t.active = !0, t.robotScript.reset(this._aiSetDatas[i], e + i * j.AI_DIS_B)
				}
			}
			this._app.uiMgr.hudView && this._app.uiMgr.hudView.setRank(t + 1)
		}
		resize(e, t) {
			this.size(e, t), this._scene && this._scene.size(e, t)
		}
		onUpdate(e) {
			if (this.inSlowing = this.slowTime > Laya.timer.currTimer, this.inSlowing && (e *= j.SLOW_BEI), this.isGamePlay()) {
				let e = Math.floor(this._mainPlayer.playerScript.posZ);
				this._mainPlayer.playerScript.running && this.updateScore(e)
			}
			if (this.curBendAngle.x = 0, this.curBendAngle.y = -5, this._mapMgr && this._mapMgr.update(e, this.curBendAngle), this._mainPlayer && (this._mainPlayer.playerScript.Update(e, this.curBendAngle), !this.isBossGuan)) {
				let t = this.mainPlayer.owner.transform.position,
					i = [{
						script: this._mainPlayer.playerScript,
						posz: t.z
					}],
					n = this._mainPlayer.playerScript.isArrived,
					a = !(this._mainPlayer.playerScript.isJumping || this._mainPlayer.playerScript.isBeatening || this._mainPlayer.playerScript.isAttacking || n),
					o = this.robots.length;
				for (let s = 0; s < o; s++) {
					let o = this.robots[s];
					if (!o || !o.active) continue;
					let r = o.robotScript;
					r.Update(e, this.curBendAngle);
					let l = r.owner.transform.position;
					i.push({
						script: r,
						posz: l.z
					});
					let d = !(r.isJumping || r.isBeatening || r.isAttacking || n),
						h = t.x - l.x,
						c = t.z - l.z;
					if (!this._mainPlayer.playerScript.isDie && Math.abs(h) <= j.PENG_DIS && Math.abs(c) <= j.PENG_DIS_Z)
						if (c < 0) {
							let e = r.pushToGo(h);
							this._mainPlayer.playerScript.toPush(e)
						} else c > 0 && (this._mainPlayer.playerScript.pushToGo(-h), r.toPush());
					else a && !r.isJumping && Math.abs(h) <= j.ATTACK_DIS_START && Math.abs(c) <= j.ATTACK_DIS_Z && this._mainPlayer.playerScript.addAttackObj(r), d && !this._mainPlayer.playerScript.isJumping && Math.abs(h) <= j.ATTACK_DIS_AI_START && Math.abs(c) <= j.ATTACK_DIS_Z && r.addAttackObj(this._mainPlayer.playerScript);
					!n && this.foreachRobots(r)
				}
				if (!n) {
					i.sort(this.soryByPosz);
					let e = i.length;
					for (let t = 0; t < e; t++) {
						let e = i[t];
						e && e.script && (e.script.rank = t + 1, e.script.doAttack())
					}
				}
			}
			this._cameraRoot && this._cameraRoot.update(e)
		}
		foreachRobots(e) {
			let t = this.robots.length,
				i = e.owner.transform.position;
			for (let n = 0; n < t; n++) {
				let t = this.robots[n].robotScript;
				if (!t || t.aiId == e.aiId) continue;
				let a = t.owner.transform.position,
					o = i.x - a.x,
					s = i.z - a.z,
					r = e.destDiffX - a.x,
					l = e.destDiffX - t.destDiffX,
					d = 1.5 * j.PENG_DIS;
				!e.isDie && (Math.abs(o) <= d || Math.abs(r) <= d || Math.abs(l) <= d) && Math.abs(s) <= j.PENG_DIS_Z && (s < 0 ? (e.toPush(), t.pushToGo(o, !1)) : s > 0 && (e.pushToGo(-o, !1), t.toPush()))
			}
		}
		foreachPlayers(e, t, i) {
			if (!e || e.isDie) return null;
			let n = this.robots.length,
				a = e.owner.transform.position;
			for (let o = 0; o < n; o++) {
				let n = this.robots[o].robotScript;
				if (!n || n.aiId == e.aiId || n.isDie || n.isArrived) continue;
				let s = n.owner.transform.position,
					r = a.x - s.x;
				if (Math.abs(r) <= .7 * j.PENG_DIS && t - s.z < 0 && i - s.z > 0) {
					n.pushToGo(r, !1, 100), n.addSpeed(500, !1);
					let t = Math.max(n.speedZ, e.speedZ);
					return n.speedZ = 1.2 * t, n
				}
			}
			let o = this._mainPlayer ? this._mainPlayer.playerScript : null;
			if (o && !o.isDie && !o.isArrived && o.aiId != e.aiId) {
				let n = this._mainPlayer.owner.transform.position,
					s = a.x - n.x;
				if (Math.abs(s) <= .7 * j.PENG_DIS && t - n.z < 0 && i - n.z > 0) {
					o.pushToGo(s, !0, 100), o.addSpeed(500, !1);
					let t = Math.max(o.speedZ, e.speedZ);
					return o.speedZ = 1.2 * t, o
				}
			}
			return null
		}
		soryByPosz(e, t) {
			return t.posz - e.posz
		}
		RandBlendIndex(e, t, i) {
			let n, a = 0;
			do {
				if (n = Q.randomRange(t, i), ++a >= 100) break
			} while (n == e);
			return n
		}
		gameEnd(e = !1) {
			if (this.state == Mi.STATUS_OVER || this.state == Mi.STATUS_END) return;
			this.isGameSucc = e, this.isGameSucc || this.state == Mi.STATUS_RELIFE || this.reliveCount >= 2 ? this.state = Mi.STATUS_OVER : this.state = Mi.STATUS_END, this.playTime = Laya.timer.currTimer - this._startTime;
			let t = this.isBossGuan ? ln.RELIVEBOSSVIEW : ln.RELIVEVIEW;
			if (e) {
				this._mainPlayer && this._mainPlayer.playerScript && (this._mainPlayer.playerScript.running = !1), t = ln.REWARDVIEW, this.isBossGuan ? (J.I.bossState = this.level, t = ln.REWARDBOSSVIEW) : J.I.level = this.level + 1, J.I.save();
				let e = Ni.app.sceneRoot.mainPlayer.playerScript.rank;
				ht.I.statisticsReport(f.LV_END, this.level, 1, e)
			}
			if (Laya.Browser.onMiniGame) {
				let e = Ci.I.getAdSwitchByPosition(gt.BATTLE_AD);
				null != e && 1 == e.state && Ri.I.hideCustom(b.AD_CUSTOM_SINGLE_LEFT)
			}
			xe.log("SceneRoot-close-hideBannerAd"), xi.I.hideBannerAd(I.AD_BANNER_BOX), ln.showDialog(t, !0, !0), Laya.SoundManager.stopMusic()
		}
		isGamePlay() {
			return this.state == Mi.STATUS_START || this.state == Mi.STATUS_RELIFE || this.state == Mi.STATUS_END
		}
		isGameReady() {
			return this.state == Mi.STATUS_LOADED
		}
		updateScore(e) {
			e < 0 && (e = 0), this.score = e;
			let t = new Object;
			t.score = e, t.goal = this.goalScore, this._scoreEvent ? this._scoreEvent.data = t : this._scoreEvent = new ce(ce.SCORE_CHANGE, t), Ni.evt.dispatchEvent(this._scoreEvent), this.goalScore > 0 && this.score >= this.goalScore && this._mainPlayer && this.mainPlayer.playerScript.arrivalTerminal()
		}
		relive(e = 0, t = 0) {
			this._mainPlayer && this._mainPlayer.playerScript.relive(e, t), this.readyGo()
		}
		addHpFull() {
			this._mainPlayer && (this._mainPlayer.playerScript.addHp(!1, null, !0), this._cameraRoot && this._cameraRoot.resetSubFieldV())
		}
		reset() {
			this.rankLayer && this.rankLayer.removeChildren(), this.is_relive = !1, this.isGameSucc = !1, this.updateScore(0), this.reliveCount = 0, this.state = Mi.STATUS_LOADED, this._isPlayJaSu = !1, this.curBendAngle.setValue(0, 0, 0, 0), this.mainPlayer.playerScript.reset(), this._cameraRoot.reset(), this.level = J.I.getLevel(), (Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame) && this.level % 3 == 0 && qg.hasShortcutInstalled({
				success: function (e) {
					0 == e && qg.installShortcut({
						success: function () { },
						fail: function (e) { },
						complete: function () { }
					})
				},
				fail: function (e) { },
				complete: function () { }
			})
		}
		clear() {
			this.removeSelf()
		}
		playFireworksEffect(e, t, i, n, a) {
			if (!this._effectFireworks) return;
			Laya.timer.clear(this, this.playFireworksEnd), this._effectFireworks.particleSystem.play();
			let o = this._effectFireworks.getChildByName("fireworks01");
			o && o.particleSystem.play(), this._effectFireworks.transform.position.x = e - n, this._effectFireworks.transform.position.y = t, this._effectFireworks.transform.position.z = i, this._effectFireworks.transform.position = this._effectFireworks.transform.position, this._effectFireworks.transform.localRotationEulerY = a, this._effectFireworks.parent || this._playerLayer.addChild(this._effectFireworks), this._effectFireworks1.particleSystem.play();
			let s = this._effectFireworks1.getChildByName("fireworks01");
			s && s.particleSystem.play(), this._effectFireworks1.transform.position.x = e + n, this._effectFireworks1.transform.position.y = t, this._effectFireworks1.transform.position.z = i, this._effectFireworks1.transform.position = this._effectFireworks1.transform.position, this._effectFireworks1.transform.localRotationEulerY = a, this._effectFireworks1.parent || this._playerLayer.addChild(this._effectFireworks1), Laya.timer.once(5e3, this, this.playFireworksEnd)
		}
		playFireworksEnd() {
			if (!this._effectFireworks) return;
			this._effectFireworks.particleSystem.stop();
			let e = this._effectFireworks.getChildByName("fireworks01");
			if (e && e.particleSystem.stop(), this._effectFireworks.removeSelf(), this._effectFireworks1) {
				this._effectFireworks1.particleSystem.stop(), this._effectFireworks1.getChildByName("fireworks01") && e.particleSystem.stop(), this._effectFireworks1.removeSelf()
			}
		}
		setSnowParEffect(e) {
			e && (this._effectSnowPars = e, this._effectSnowPars.removeSelf())
		}
		playSnowParEffect(e, t, i, n) {
			if (!this._effectSnowPars) return;
			Laya.timer.clear(this, this.playSnowParEnd), this._effectSnowPars.particleSystem.play();
			let a = this._effectSnowPars.getChildByName("qi");
			a && a.particleSystem.play(), this._effectSnowPars.transform.position.x = e, this._effectSnowPars.transform.position.y = t, this._effectSnowPars.transform.position.z = i, this._effectSnowPars.transform.position = this._effectSnowPars.transform.position, this._effectSnowPars.transform.localRotationEulerY = n, this._effectSnowPars.parent || this._playerLayer.addChild(this._effectSnowPars), Laya.timer.once(5e3, this, this.playSnowParEnd)
		}
		playSnowParEnd() {
			if (!this._effectSnowPars) return;
			this._effectSnowPars.particleSystem.stop();
			let e = this._effectSnowPars.getChildByName("qi");
			e && e.particleSystem.stop(), this._effectSnowPars.removeSelf()
		}
		dispose() {
			this._mapLayer && this._mapLayer.removeSelf(), this._obstacleLayer && this._obstacleLayer.removeSelf(), this._playerLayer && this._playerLayer.removeSelf(), this._mainPlayer && (this._mainPlayer.destroy(), this._mainPlayer = null), this._mapMgr && this._mapMgr.clear(), ye.clear(), this.hide(), Laya.SoundManager.stopAllSound()
		}
		test() {
			this.translateW = new Laya.Vector3(0, 0, -.2), this.translateS = new Laya.Vector3(0, 0, .2), this.translateA = new Laya.Vector3(-.2, 0, 0), this.translateD = new Laya.Vector3(.2, 0, 0), this.translateQ = new Laya.Vector3(-.01, 0, 0), this.translateE = new Laya.Vector3(.01, 0, 0), Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, function (e) {
				this.addBox()
			}))
		}
		addKinematicSphere() {
			let e = new Laya.BlinnPhongMaterial;
			e.albedoTexture = Laya.loader.getRes("res/wood.jpg");
			let t = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(.8)));
			t.meshRenderer.material = e;
			let i = this.mainPlayer.owner.transform.position.clone();
			i.x = 1, t.transform.position = i;
			let n = t.addComponent(Laya.Rigidbody3D),
				a = new Laya.SphereColliderShape(.8);
			n.colliderShape = a, n.mass = 60, n.isKinematic = !0, n.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2, n.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1, this.kinematicSphere = t, Laya.timer.frameLoop(1, this, this.onKeyDown)
		}
		onKeyDown() {
			Laya.KeyBoardManager.hasKeyDown(87) && this.kinematicSphere.transform.translate(this.translateW), Laya.KeyBoardManager.hasKeyDown(83) && this.kinematicSphere.transform.translate(this.translateS), Laya.KeyBoardManager.hasKeyDown(65) && this.kinematicSphere.transform.translate(this.translateA), Laya.KeyBoardManager.hasKeyDown(68) && this.kinematicSphere.transform.translate(this.translateD), Laya.KeyBoardManager.hasKeyDown(81) && this.kinematicSphere.transform.translate(this.translateQ), Laya.KeyBoardManager.hasKeyDown(69) && this.kinematicSphere.transform.translate(this.translateE)
		}
		addBox() {
			let e = new Laya.BlinnPhongMaterial;
			e.albedoTexture = Laya.loader.getRes("res/wood.jpg");
			var t = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.75, .5, .5)));
			t.meshRenderer.material = e;
			var i = t.transform,
				n = this.mainPlayer.owner.transform.position.clone();
			n.z = 10, i.position = n;
			var a = t.addComponent(Laya.Rigidbody3D),
				o = new Laya.BoxColliderShape(.75, .5, .5);
			a.colliderShape = o, a.mass = 10, a.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3, a.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1
		}
		freeRotate() { }
		addRigidBodyBox(e, t) {
			var i = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(t, t, t)));
			i.transform.position = e;
			var n = new Laya.BlinnPhongMaterial;
			i.meshRenderer.material = n;
			var a = i.addComponent(Laya.Rigidbody3D),
				o = new Laya.BoxColliderShape(t, t, t);
			return a.colliderShape = o, a.mass = 1, a.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3, i
		}
		addRigidBodySphere(e, t) {
			var i = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(.2)));
			i.transform.position = e;
			var n = new Laya.BlinnPhongMaterial;
			n.albedoColor = new Laya.Vector4(0, 1, 0, 1), i.meshRenderer.material = n;
			var a = i.addComponent(Laya.Rigidbody3D),
				o = new Laya.SphereColliderShape(.2);
			return a.colliderShape = o, a.mass = 1, a.friction = .5, a.restitution = 0, a.isKinematic = !0, i
		}
	}
	Mi.STATUS_NONE = 0, Mi.STATUS_LOAD = 1, Mi.STATUS_LOADED = 2, Mi.STATUS_START = 3, Mi.STATUS_END = 4, Mi.STATUS_RELIFE = 5, Mi.STATUS_OVER = 6;
	class Oi extends Laya.Image {
		constructor(e = null, t = "") {
			super(e), this.scaleTime = 100, this.initScaleX = 1, this.initScaleY = 1, this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmall), this.on(Laya.Event.MOUSE_UP, this, this.scaleBig), this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig), this.frameOnce(2, this, this.onDelay)
		}
		onDelay() {
			this.initScaleX = this.scaleX || 1, this.initScaleY = this.scaleY || 1
		}
		scaleSmall() {
			Laya.Tween.to(this, {
				scaleX: .9,
				scaleY: .9
			}, this.scaleTime), J.I.playSound()
		}
		scaleBig() {
			Laya.Tween.to(this, {
				scaleX: this.initScaleX,
				scaleY: this.initScaleY
			}, this.scaleTime)
		}
	}
	class Di {
		constructor() {
			this.smart = 4, this.moveSpeed = 10, this._moveTime = 750, this._roateVec3 = new Laya.Vector3, this._runVec3 = new Laya.Vector3, this._isMouseDown = !1, this._oldX = 0, this._maxX = 0, this._minX = 0, this._targetx = 0, this._targety = 0, this._angle = 0, this._canMove = !0, Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseEvent), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseEvent), Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseEvent)
		}
		initScene(e) {
			this.sceneRoot = e
		}
		mouseEvent(e) {
			this.sceneRoot && (e.type == Laya.Event.MOUSE_DOWN ? this.onMouseDown(e) : e.type == Laya.Event.MOUSE_UP || e.type == Laya.Event.MOUSE_OUT ? this.onMouseUp(e) : e.type == Laya.Event.MOUSE_MOVE && this.onMouseMove(e))
		}
		onMouseDown(e) {
			e.target instanceof Oi || !this.sceneRoot || !this.sceneRoot.app.uiMgr || this.sceneRoot.app.uiMgr.getLoadIdx() >= 0 || (Ni.app.uiMgr.hudView && Ni.app.uiMgr.hudView.isRelive && Ni.app.uiMgr.hudView.hideGuide(), this._oldPos || (this._oldPos = new Laya.Vector3), this._curPos || (this._curPos = new Laya.Vector3), this._targetx = this._oldX = this._oldPos.x = Laya.stage.mouseX, this._oldPos.z = Laya.stage.mouseY, this._isMouseDown = !0, this.sceneRoot && this.sceneRoot.mainPlayer && (this.sceneRoot.mainPlayer.playerScript.touchAddSpeed = !0))
		}
		onMouseUp(e) {
			e.target instanceof Oi || (this._isMouseDown = !1, this.sceneRoot && this.sceneRoot.mainPlayer && (this.sceneRoot.mainPlayer.playerScript.touchAddSpeed = !1))
		}
		updateSmart(e) {
			e = e < .2 ? .2 : e, this.smart = 4 * e, this.moveSpeed = 3 + 17 * e, this._moveTime = 1500 - 750 * e
		}
		onMouseMove(e) {
			if (!this._isMouseDown || !this.sceneRoot.isGamePlay() || !this._canMove) return;
			let t = Laya.stage.mouseX,
				i = Math.abs(t - this._targetx);
			Laya.Browser.onMobile && i < 2 || (this.sceneRoot.inSlowing && i >= 5 && (this.sceneRoot.slowTime = 0), this._targetx = t, this._targety = Laya.stage.mouseY, this.getAngleByMouseX(this._targetx, this._oldX), this.sceneRoot.mainPlayer.playerScript.setTowardAngle(this._angle, this._runVec3.x, this._moveTime))
		}
		setTouchX() {
			this._oldX = this._targetx
		}
		getAngleByMouseX(e, t) {
			let i = e;
			if (this._oldPos.x = t, e > this._oldPos.x ? i = this._oldPos.x + (e - this._oldPos.x) * this.smart : e < this._oldPos.x && (i = this._oldPos.x - (this._oldPos.x - e) * this.smart), this._targety > this._oldPos.y ? this._targety = this._oldPos.y + (this._targety - this._oldPos.y) * this.smart : this._targety < this._oldPos.y && (this._targety = this._oldPos.y - (this._oldPos.y - this._targety) * this.smart), this._curPos.x = i, this._curPos.z = this._targety, Laya.Vector3.subtract(this._oldPos, this._curPos, this._curPos), 0 == this._curPos.x && 0 == this._curPos.z) return void console.log("====不转向？", this._oldPos, this._curPos);
			Laya.Vector3.normalize(this._curPos, this._curPos), this._curPos.cloneTo(this._roateVec3);
			let n = 180 * Math.atan2(this._roateVec3.z, this._roateVec3.x) / Math.PI;
			var a = n * Math.PI / 180;
			n < 40 && n > -40 && (n = 40, a = .7), (n < -140 || n > 140) && (n = 140, a = 2.44);
			let o = 1,
				s = Ni.app.sceneRoot && Ni.app.sceneRoot.mainPlayer ? Ni.app.sceneRoot.mainPlayer.playerScript : null;
			s && (o = s.isAttacking || Ni.app.sceneRoot.inSlowing || s.isPush ? .3 : s.isBeatening ? .5 : 1), this._runVec3.x = Math.cos(a) * this.moveSpeed * o, this._angle = n
		}
	}
	class Ni {
		constructor() {
			this._isBlur = !1, this._isPause = !1, this._nextTime = 0, Ni.app = this, this._uiMgr = new ln, this.tc = new Di, Laya.stage.on(Laya.Event.BLUR, this, this.onBlur), Laya.stage.on(Laya.Event.FOCUS, this, this.onFocus), Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.onVisibleChange)
		}
		get sceneRoot() {
			return this._sceneRoot
		}
		get uiMgr() {
			return this._uiMgr
		}
		get isPause() {
			return this._isPause
		}
		startGame() {
			this.mapDatas = JSON.parse(Laya.loader.getRes(te.TEMPDATA_MAP)), Laya.timer.frameLoop(1, this, this.onUpdate), Laya.SoundManager.setMusicVolume(1 == J.I.bgm ? .8 : 0), Ni.app.uiMgr.showHud(), this.initScene()
		}
		initScene() {
			this._sceneRoot = new Mi(this), this._sceneRoot.init(), this._sceneRoot.resize(Mn.width, Laya.stage.height), Laya.stage.addChildAt(this._sceneRoot, 0), this.tc.initScene(this._sceneRoot)
		}
		onBlur() {
			Laya.Browser.onPC || (this._isBlur = !0)
		}
		onFocus() {
			Laya.Browser.onPC || (this._isBlur = !1, J.I.playMusicContinue())
		}
		onVisibleChange() {
			this._isBlur = !Laya.stage.renderingEnabled
		}
		pauseGame(e = !1) {
			this._isPause = !0, e || console.log("pauseGame")
		}
		playGame(e = !1) {
			this._isPause = !1, e || console.log("playGame")
		}
		onUpdate() {
			if (this._isBlur || this._isPause) return;
			let e = Laya.timer.delta;
			e > 3e3 && (e = 0), this._sceneRoot && this._sceneRoot.onUpdate(e), this._uiMgr && this._uiMgr.onUpdate(e), ye.update(e);
			let t = Laya.timer.currTimer;
			this._nextTime < t && (de.sendGameRunTime(), this._nextTime = t + 3e4)
		}
	}
	Ni.evt = new class {
		constructor() {
			this._eventsMap = null
		}
		addEventListener(e, t, i) {
			this._eventsMap || (this._eventsMap = new Object);
			let n = this._eventsMap[e];
			n || (n = this._eventsMap[e] = []);
			let a = {
				listener: t,
				thisObject: i
			};
			for (let e = 0; e < n.length; e++) {
				let a = n[e];
				if (a.listener == t && a.thisObject == i) return
			}
			n.push(a)
		}
		hasEventListener(e) {
			return this._eventsMap && null != this._eventsMap[e]
		}
		removeEventListener(e, t, i) {
			if (null == this._eventsMap) return;
			let n = this._eventsMap[e];
			for (let e = 0; n && e < n.length; e++) {
				let a = n[e];
				if (a.listener == t && a.thisObject._id == i._id) return void n.splice(e, 1)
			}
		}
		removeEventListenerByName(e) {
			if (null == this._eventsMap) return;
			let t = this._eventsMap[e];
			t && (t.length = 0)
		}
		removeEventListenerByTarget(e) {
			if (null != this._eventsMap)
				for (let t in this._eventsMap) {
					let i = this._eventsMap[t];
					if (i)
						for (let t = 0; i && t < i.length; t++)
							if (i[t].thisObject == e) return void i.splice(t, 1)
				}
		}
		removeEventListenerByNameAndTarget(e, t) {
			if (null == this._eventsMap) return;
			let i = this._eventsMap[e];
			if (i)
				for (let e = 0; i && e < i.length; e++)
					if (i[e].thisObject == t) return void i.splice(e, 1)
		}
		dispatchEvent(e) {
			let t = this._eventsMap;
			if (!t) return !0;
			let i = t[e.type];
			if (!i) return !0;
			let n = i.length;
			if (0 == n) return !0;
			e.target = this;
			let a = [].concat(...i);
			for (let t = 0; t < n; t++) {
				let i = a[t];
				i && i.listener.call(i.thisObject, e)
			}
		}
	};
	var Pi, Vi, ki, Bi, Gi, Fi = Laya.View,
		zi = Laya.Dialog,
		Xi = Laya.Scene,
		Yi = Laya.ClassUtils.regClass;
	! function (e) {
		! function (e) {
			class t extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(t.uiView)
				}
			}
			t.uiView = {
				type: "View",
				props: {
					width: 150,
					height: 80
				},
				compId: 2,
				child: [{
					type: "Sprite",
					props: {
						y: 0,
						x: 0,
						texture: "gongyong/sign_coin1.png"
					},
					compId: 3
				}, {
					type: "FontClip",
					props: {
						y: 21,
						x: 114,
						var: "labelcoin",
						value: "5",
						skin: "gongyong/shuzi.png",
						sheet: "+0123456789"
					},
					compId: 5
				}, {
					type: "FontClip",
					props: {
						y: 21,
						x: 81,
						value: "+",
						skin: "gongyong/shuzi.png",
						sheet: "+0123456789"
					},
					compId: 7
				}],
				loadList: ["gongyong/sign_coin1.png", "gongyong/shuzi.png"],
				loadList3D: []
			}, e.CoinItemUI = t, Yi("ui.box.CoinItemUI", t);
			class i extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(i.uiView)
				}
			}
			i.uiView = {
				type: "View",
				props: {
					width: 346,
					height: 77
				},
				compId: 2,
				child: [{
					type: "Image",
					props: {
						var: "bar_di",
						skin: "gongyong/pro_sub.png"
					},
					compId: 3
				}, {
					type: "Image",
					props: {
						y: 0,
						x: 0,
						var: "bar_jindu",
						skin: "gongyong/pro_sub$bar.png",
						sizeGrid: "0,100,0,120",
						scaleX: 1
					},
					compId: 4
				}],
				loadList: ["gongyong/pro_sub.png", "gongyong/pro_sub$bar.png"],
				loadList3D: []
			}, e.jinduUI = i, Yi("ui.box.jinduUI", i);
			class n extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(n.uiView)
				}
			}
			n.uiView = {
				type: "View",
				props: {
					width: 398,
					height: 82
				},
				compId: 2,
				child: [{
					type: "Image",
					props: {
						width: 398,
						var: "bar_di",
						skin: "gongyong/progress_1.png",
						height: 82
					},
					compId: 3
				}, {
					type: "Image",
					props: {
						y: 0,
						x: 0,
						width: 398,
						var: "bar_jindu",
						skin: "gongyong/progress_1$bar.png",
						sizeGrid: "0,46,0,90",
						scaleX: 1,
						height: 82
					},
					compId: 4
				}, {
					type: "Sprite",
					props: {
						y: 26,
						x: 93,
						var: "sptXie",
						texture: "gongyong/game_bossbar_top1.png"
					},
					compId: 8
				}],
				loadList: ["gongyong/progress_1.png", "gongyong/progress_1$bar.png", "gongyong/game_bossbar_top1.png"],
				loadList3D: []
			}, e.jindu1UI = n, Yi("ui.box.jindu1UI", n);
			class a extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(a.uiView)
				}
			}
			a.uiView = {
				type: "View",
				props: {
					width: 330,
					height: 27
				},
				compId: 2,
				child: [{
					type: "Image",
					props: {
						var: "bar_di",
						skin: "wxlocal/progress.png"
					},
					compId: 3
				}, {
					type: "Image",
					props: {
						var: "bar_jindu",
						skin: "wxlocal/progress$bar.png",
						sizeGrid: "0,40,0,20",
						scaleX: 1
					},
					compId: 4
				}],
				loadList: ["wxlocal/progress.png", "wxlocal/progress$bar.png"],
				loadList3D: []
			}, e.jindu11UI = a, Yi("ui.box.jindu11UI", a);
			class o extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(o.uiView)
				}
			}
			o.uiView = {
				type: "View",
				props: {
					width: 184,
					runtime: "script/gui/box/PifuBox.ts",
					height: 184
				},
				compId: 2,
				child: [{
					type: "Sprite",
					props: {
						y: 0,
						x: 0,
						texture: "gongyong/store_base.png"
					},
					compId: 24
				}, {
					type: "Sprite",
					props: {
						x: 3,
						var: "imgShow",
						texture: "gongyong/store_motor8.png",
						scaleY: .48,
						scaleX: .48
					},
					compId: 25
				}, {
					type: "Sprite",
					props: {
						y: 114,
						x: 113,
						var: "imgGold",
						texture: "gongyong/game_coin.png"
					},
					compId: 26
				}, {
					type: "Image",
					props: {
						x: 0,
						width: 176,
						var: "imgLock",
						top: 0,
						skin: "gongyong/common_bg.png",
						sizeGrid: "1,1,1,1",
						height: 173
					},
					compId: 27,
					child: [{
						type: "Image",
						props: {
							skin: "gongyong/store_lock.png",
							centerY: 0,
							centerX: 0
						},
						compId: 30
					}]
				}, {
					type: "Label",
					props: {
						y: 127,
						x: 0,
						width: 105,
						var: "lblCost",
						text: "1000",
						height: 30,
						fontSize: 30,
						color: "#3079be",
						bold: !0,
						align: "right"
					},
					compId: 28
				}, {
					type: "Sprite",
					props: {
						y: -3,
						x: -3,
						var: "imgSelect",
						texture: "gongyong/store_choose.png"
					},
					compId: 29
				}],
				loadList: ["gongyong/store_base.png", "gongyong/store_motor8.png", "gongyong/game_coin.png", "gongyong/common_bg.png", "gongyong/store_lock.png", "gongyong/store_choose.png"],
				loadList3D: []
			}, e.PifuBoxUI = o, Yi("ui.box.PifuBoxUI", o);
			class s extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(s.uiView)
				}
			}
			s.uiView = {
				type: "View",
				props: {
					width: 65,
					height: 25
				},
				compId: 2,
				child: [{
					type: "Label",
					props: {
						y: -1,
						x: -1,
						width: 65,
						var: "lblRank",
						valign: "middle",
						text: "第1名",
						height: 25,
						fontSize: 20,
						color: "#ffffff",
						bold: !0,
						anchorY: 0,
						anchorX: 0,
						align: "center"
					},
					compId: 8
				}],
				loadList: [],
				loadList3D: []
			}, e.RankBoxUI = s, Yi("ui.box.RankBoxUI", s)
		}(e.box || (e.box = {}))
	}(Pi || (Pi = {})),
		function (e) {
			class t extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(t.uiView)
				}
			}
			t.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 494,
						x: 89
					},
					compId: 12,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							skin: "gongyong/jld_2.png"
						},
						compId: 13
					}, {
						type: "Button",
						props: {
							y: 65,
							x: 537,
							var: "btnClose",
							stateNum: 1,
							skin: "gongyong/mission_close.png",
							runtime: "script/gui/ScaleButton.ts",
							anchorY: .5,
							anchorX: .5
						},
						compId: 15
					}, {
						type: "Image",
						props: {
							y: 68,
							x: 45,
							skin: "gongyong/trial_light.png"
						},
						compId: 16
					}, {
						type: "Image",
						props: {
							y: 318,
							x: 292,
							var: "imgShow",
							skin: "gongyong/store_motor6.png",
							scaleY: 2,
							scaleX: 2,
							anchorY: .5,
							anchorX: .5
						},
						compId: 17
					}, {
						type: "Button",
						props: {
							y: 571,
							x: 295,
							width: 330,
							var: "btnTiyan",
							stateNum: 1,
							skin: "gongyong/store_button2.png",
							labelSize: 50,
							labelColors: "#ffffff",
							labelBold: !0,
							label: "免费体验更多",
							height: 120,
							anchorY: .5,
							anchorX: .5
						},
						compId: 18,
						child: [{
							type: "Sprite",
							props: {
								y: 30,
								x: 26,
								var: "spVideo",
								texture: "gongyong/end_pk.png"
							},
							compId: 23
						}]
					}, {
						type: "Label",
						props: {
							y: 37,
							x: 6,
							width: 512,
							var: "lblTitle",
							text: "更多精彩尽在完整版",
							height: 60,
							fontSize: 51,
							color: "#4d5583",
							bold: !0,
							align: "center"
						},
						compId: 19
					}, {
						type: "Box",
						props: {
							y: 157,
							x: 44,
							var: "boxTui"
						},
						compId: 20,
						child: [{
							type: "Image",
							props: {
								skin: "gongyong/trial_recommend.png"
							},
							compId: 21
						}, {
							type: "Label",
							props: {
								y: 39,
								x: 22,
								text: "推荐",
								fontSize: 32,
								color: "#ffffff",
								bold: !0
							},
							compId: 22
						}]
					}]
				}],
				animations: [{
					nodes: [{
						target: 18,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/jld_2.png", "gongyong/mission_close.png", "gongyong/trial_light.png", "gongyong/store_motor6.png", "gongyong/store_button2.png", "gongyong/end_pk.png", "gongyong/trial_recommend.png"],
				loadList3D: []
			}, e.downloadappUI = t, Yi("ui.downloadappUI", t);
			class i extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(i.uiView)
				}
			}
			i.uiView = {
				type: "View",
				props: {
					width: 550,
					height: 119
				},
				compId: 2,
				child: [{
					type: "Image",
					props: {
						y: 17,
						x: 25,
						width: 500,
						var: "imgGuideDi",
						skin: "gongyong/guide_base.png",
						sizeGrid: "0,20,0,19",
						height: 60
					},
					compId: 6
				}, {
					type: "Sprite",
					props: {
						y: 18,
						x: 245,
						visible: !1,
						texture: "gongyong/yingdaodian.png",
						scaleY: 1,
						scaleX: 1
					},
					compId: 3
				}, {
					type: "Image",
					props: {
						y: 28,
						x: 254,
						var: "imgGuideHand",
						skin: "gongyong/guide_hand.png",
						scaleY: 1,
						scaleX: 1
					},
					compId: 7
				}, {
					type: "Label",
					props: {
						y: -81,
						text: "Slide to begin",
						fontSize: 60,
						font: "SimHei",
						color: "#ffffff",
						centerX: 0,
						bold: !0,
						align: "center"
					},
					compId: 8
				}],
				animations: [{
					nodes: [{
						target: 7,
						keyframes: {
							y: [{
								value: 20,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "y",
								index: 0
							}, {
								value: 28,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "y",
								index: 10
							}, {
								value: 20,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "y",
								index: 11
							}],
							x: [{
								value: 254,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 0
							}, {
								value: 254,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 10
							}, {
								value: 10,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 20
							}, {
								value: 485,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 30
							}, {
								value: 10,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 40
							}, {
								value: 254,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "x",
								index: 50
							}],
							scaleY: [{
								value: 1.3,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 0
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 10
							}, {
								value: 1.3,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1.3,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 0
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 10
							}, {
								value: 1.3,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 20
							}]
						}
					}, {
						target: 3,
						keyframes: {
							x: [{
								value: 245,
								tweenMethod: "linearNone",
								tween: !0,
								target: 3,
								key: "x",
								index: 0
							}, {
								value: 245,
								tweenMethod: "linearNone",
								tween: !0,
								target: 3,
								key: "x",
								index: 50
							}],
							visible: [{
								value: !1,
								tweenMethod: "linearNone",
								tween: !1,
								target: 3,
								key: "visible",
								index: 0
							}, {
								value: !0,
								tweenMethod: "linearNone",
								tween: !1,
								target: 3,
								key: "visible",
								index: 10
							}, {
								value: !1,
								tweenMethod: "linearNone",
								tween: !1,
								target: 3,
								key: "visible",
								index: 15
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 20,
					action: 0
				}],
				loadList: ["gongyong/guide_base.png", "gongyong/yingdaodian.png", "gongyong/guide_hand.png"],
				loadList3D: []
			}, e.GuideUI = i, Yi("ui.GuideUI", i);
			class n extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(n.uiView)
				}
			}
			n.uiView = {
				type: "View",
				props: {
					y: 1,
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: -1,
						x: 1,
						width: 768,
						var: "boxReady",
						height: 1663
					},
					compId: 248,
					child: [{
						type: "Button",
						props: {
							y: 95,
							x: 70,
							var: "Btn_Sound",
							top: 50,
							stateNum: 1,
							skin: "gongyong/btn_shengyin.png",
							runtime: "script/gui/ScaleButton.ts",
							left: 30,
							label: "label",
							anchorY: .5,
							anchorX: .5
						},
						compId: 307,
						child: [{
							type: "Image",
							props: {
								var: "Img_LockSound",
								skin: "gongyong/btn_shengyin_guanbi.png",
								label: "label",
								centerY: 0,
								centerX: 0
							},
							compId: 308
						}]
					}, {
						type: "Box",
						props: {
							y: 225,
							width: 514,
							var: "boxMap",
							height: 116,
							centerX: 0
						},
						compId: 204,
						child: [{
							type: "Image",
							props: {
								y: 8,
								x: 5,
								width: 501,
								skin: "gongyong/hud_map_bg.png",
								sizeGrid: "0,227,0,219"
							},
							compId: 211
						}, {
							type: "Image",
							props: {
								y: 9,
								x: 407,
								skin: "gongyong/hud_icon_2.png"
							},
							compId: 212
						}, {
							type: "Image",
							props: {
								y: 9,
								x: 8,
								skin: "gongyong/hud_icon_1.png"
							},
							compId: 213
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 115,
								skin: "gongyong/st_1.png"
							},
							compId: 214
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 145,
								skin: "gongyong/st_1.png"
							},
							compId: 215
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 175,
								skin: "gongyong/st_1.png"
							},
							compId: 216
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 206,
								skin: "gongyong/st_1.png"
							},
							compId: 217
						}, {
							type: "Image",
							props: {
								y: 56,
								x: 236,
								skin: "gongyong/st_d1.png"
							},
							compId: 218
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 266,
								skin: "gongyong/st_1.png"
							},
							compId: 219
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 296,
								skin: "gongyong/st_1.png"
							},
							compId: 220
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 327,
								skin: "gongyong/st_1.png"
							},
							compId: 221
						}, {
							type: "Image",
							props: {
								y: 66,
								x: 357,
								skin: "gongyong/st_1.png"
							},
							compId: 222
						}, {
							type: "Image",
							props: {
								y: 56,
								x: 387,
								skin: "gongyong/st_d1.png"
							},
							compId: 228
						}, {
							type: "Image",
							props: {
								y: 11,
								x: 374,
								width: 36,
								skin: "gongyong/home_levelboss.png",
								height: 34
							},
							compId: 229
						}, {
							type: "Image",
							props: {
								y: 15,
								x: 226,
								width: 62,
								visible: !1,
								skin: "gongyong/game_coin1.png",
								scaleY: .5,
								scaleX: .5,
								height: 64
							},
							compId: 231
						}]
					}, {
						type: "Label",
						props: {
							y: 123,
							width: 279,
							var: "lblLevel",
							text: "Level X",
							height: 60,
							fontSize: 60,
							color: "#ffffff",
							centerX: 0,
							bold: !0,
							align: "center"
						},
						compId: 205
					}, {
						type: "Box",
						props: {
							y: 130,
							var: "boxGold",
							right: 10
						},
						compId: 206,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 0,
								texture: "gongyong/common_jb_bg.png"
							},
							compId: 292
						}, {
							type: "Sprite",
							props: {
								y: 3,
								x: 3,
								var: "imgGold",
								texture: "gongyong/game_coin.png",
								scaleY: 1.1,
								scaleX: 1.1
							},
							compId: 293
						}, {
							type: "Label",
							props: {
								y: 2,
								x: -25,
								width: 203,
								var: "lblGold",
								text: "1.25K",
								height: 50,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 294
						}]
					}, {
						type: "Image",
						props: {
							y: 981,
							width: 130,
							visible: !1,
							var: "imgGames",
							skin: "gongyong/btn-entrance-nogift.png",
							runtime: "script/gui/ScaleButton.ts",
							right: 26,
							height: 130,
							anchorY: .5,
							anchorX: .5
						},
						compId: 302
					}, {
						type: "Box",
						props: {
							width: 678,
							var: "boxBtns",
							height: 137,
							centerX: 0,
							bottom: 332
						},
						compId: 209,
						child: [{
							type: "Image",
							props: {
								y: -233,
								width: 380,
								skin: "gongyong/img_hub_start.png",
								height: 135,
								centerX: 0,
								anchorY: .5,
								anchorX: .5
							},
							compId: 290,
							child: [{
								type: "Label",
								props: {
									text: "Tap to start",
									fontSize: 50,
									color: "#ffffff",
									centerY: -14,
									centerX: 0,
									bold: !0
								},
								compId: 291
							}]
						}, {
							type: "Button",
							props: {
								y: 25,
								var: "btnWeapon",
								stateNum: 1,
								skin: "gongyong/btn_hud_wuqi.png",
								runtime: "script/gui/ScaleButton.ts",
								left: 65,
								labelSize: 60,
								labelPadding: "0,0,0,55",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								anchorY: .5,
								anchorX: .5
							},
							compId: 239
						}, {
							type: "Button",
							props: {
								y: 25,
								var: "btnShop",
								stateNum: 1,
								skin: "gongyong/btn_hub_shop.png",
								runtime: "script/gui/ScaleButton.ts",
								right: 65,
								labelSize: 60,
								labelPadding: "0,0,0,60",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								anchorY: .5,
								anchorX: .5
							},
							compId: 241
						}]
					}, {
						type: "Box",
						props: {
							x: 183,
							width: 400,
							var: "boxBoss0",
							height: 250,
							bottom: 470
						},
						compId: 210,
						child: [{
							type: "Image",
							props: {
								y: 64,
								x: 0,
								skin: "gongyong/btmdi1.png"
							},
							compId: 243
						}, {
							type: "Image",
							props: {
								y: 158,
								x: -34,
								skin: "gongyong/rocket.png",
								scaleY: .5,
								scaleX: .5,
								rotation: -45
							},
							compId: 244
						}, {
							type: "Label",
							props: {
								y: 113,
								x: 185,
								width: 200,
								text: "Pick RPG",
								height: 42,
								fontSize: 38,
								color: "#ffffff",
								bold: !0,
								align: "left"
							},
							compId: 245
						}, {
							type: "Label",
							props: {
								y: 173,
								x: 156,
								width: 165,
								text: "Defeat BOSS",
								height: 42,
								fontSize: 38,
								color: "#ffffff",
								bold: !0,
								align: "left"
							},
							compId: 246
						}, {
							type: "Label",
							props: {
								y: 0,
								x: 27,
								width: 345,
								text: "Tap to start",
								height: 41,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 247
						}]
					}]
				}, {
					type: "Box",
					props: {
						y: 0,
						x: 1,
						width: 768,
						var: "boxStart",
						height: 1663
					},
					compId: 281,
					child: [{
						type: "Box",
						props: {
							y: 116,
							x: 10,
							width: 768,
							var: "boxNormal"
						},
						compId: 249,
						child: [{
							type: "jindu",
							props: {
								y: 0,
								var: "barPro",
								centerX: 0,
								runtime: "ui.box.jinduUI"
							},
							compId: 282,
							child: [{
								type: "Label",
								props: {
									y: 4,
									x: 4,
									width: 67,
									var: "lblLevelN",
									text: "5",
									height: 49,
									fontSize: 45,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 253
							}]
						}, {
							type: "Label",
							props: {
								y: 92.5,
								width: 382,
								var: "lblRank",
								text: "第8名",
								height: 60,
								fontSize: 60,
								color: "#ffffff",
								centerX: 0,
								bold: !0,
								align: "center"
							},
							compId: 264
						}, {
							type: "Label",
							props: {
								y: 179.5,
								var: "lblAttackTip",
								text: "close to the opponent to attack",
								fontSize: 45,
								color: "#ffffff",
								centerX: 0,
								bold: !0
							},
							compId: 265
						}]
					}, {
						type: "Box",
						props: {
							y: -109,
							x: -176.5,
							var: "boxJInbi"
						},
						compId: 250,
						child: [{
							type: "ProgressBar",
							props: {
								y: 110.5,
								x: 176.5,
								skin: "gongyong/progress_3.png",
								sizeGrid: "0,65,0,104"
							},
							compId: 266,
							child: [{
								type: "Sprite",
								props: {
									y: 8,
									x: 21,
									texture: "gongyong/game_coin1.png",
									scaleY: .7,
									scaleX: .7
								},
								compId: 267
							}]
						}, {
							type: "Label",
							props: {
								y: 209,
								x: 299,
								text: "金币关",
								fontSize: 60,
								font: "SimHei",
								color: "#fd9f19",
								bold: !0
							},
							compId: 268
						}]
					}, {
						type: "Box",
						props: {
							y: 115,
							x: 9,
							width: 768,
							var: "boxBoss1"
						},
						compId: 251,
						child: [{
							type: "Label",
							props: {
								y: 20,
								x: 298.98046875,
								text: "BOSS",
								fontSize: 60,
								color: "#ffffff",
								bold: !0
							},
							compId: 279
						}, {
							type: "jindu1",
							props: {
								y: 80,
								x: 185,
								var: "bossPro",
								runtime: "ui.box.jindu1UI"
							},
							compId: 289
						}]
					}, {
						type: "Box",
						props: {
							y: 122,
							var: "boxLifes",
							right: 5
						},
						compId: 254,
						child: [{
							type: "Box",
							props: {
								x: -50,
								var: "boxXin2"
							},
							compId: 255,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									skin: "gongyong/game_hp_base.png"
								},
								compId: 256
							}, {
								type: "Image",
								props: {
									y: 2,
									x: -1,
									var: "imgXin2",
									skin: "gongyong/game_hp_top.png"
								},
								compId: 257
							}]
						}, {
							type: "Box",
							props: {
								x: 15,
								var: "boxXin1"
							},
							compId: 258,
							child: [{
								type: "Image",
								props: {
									x: 0,
									skin: "gongyong/game_hp_base.png"
								},
								compId: 259
							}, {
								type: "Image",
								props: {
									y: 2,
									x: -1,
									var: "imgXin1",
									skin: "gongyong/game_hp_top.png"
								},
								compId: 260
							}]
						}, {
							type: "Box",
							props: {
								x: 80,
								var: "boxXin0"
							},
							compId: 261,
							child: [{
								type: "Image",
								props: {
									skin: "gongyong/game_hp_base.png"
								},
								compId: 262
							}, {
								type: "Image",
								props: {
									y: 2,
									x: -1,
									var: "imgXin0",
									skin: "gongyong/game_hp_top.png"
								},
								compId: 263
							}]
						}]
					}, {
						type: "Button",
						props: {
							y: 145,
							x: 65,
							width: 126,
							visible: !1,
							var: "btnLuzhi",
							stateNum: 1,
							skin: "gongyong/end_button4.png",
							runtime: "script/gui/ScaleButton.ts",
							left: 2,
							height: 134,
							anchorY: .5,
							anchorX: .5
						},
						compId: 286,
						child: [{
							type: "Sprite",
							props: {
								y: 18,
								x: 37,
								texture: "gongyong/game_video2.png"
							},
							compId: 287
						}, {
							type: "Label",
							props: {
								y: 72,
								x: 0,
								width: 127,
								var: "lblLuzhi",
								text: "录制",
								height: 42,
								fontSize: 35,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 288
						}]
					}, {
						type: "Image",
						props: {
							y: 1569,
							x: 384,
							width: 702,
							visible: !0,
							skin: "gongyong/touxiangdi.png",
							height: 188,
							centerX: 0,
							bottom: 0,
							anchorY: .5,
							anchorX: .5,
							alpha: 0
						},
						compId: 301
					}]
				}],
				animations: [{
					nodes: [{
						target: 290,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 290,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/btn_shengyin.png", "gongyong/btn_shengyin_guanbi.png", "gongyong/hud_map_bg.png", "gongyong/hud_icon_2.png", "gongyong/hud_icon_1.png", "gongyong/st_1.png", "gongyong/st_d1.png", "gongyong/home_levelboss.png", "gongyong/game_coin1.png", "gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/btn-entrance-nogift.png", "gongyong/img_hub_start.png", "gongyong/btn_hud_wuqi.png", "gongyong/btn_hub_shop.png", "gongyong/btmdi1.png", "gongyong/rocket.png", "gongyong/progress_3.png", "gongyong/game_hp_base.png", "gongyong/game_hp_top.png", "gongyong/end_button4.png", "gongyong/game_video2.png", "gongyong/touxiangdi.png"],
				loadList3D: []
			}, e.HudViewUI = n, Yi("ui.HudViewUI", n);
			class a extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(a.uiView)
				}
			}
			a.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 115,
						x: 0,
						width: 768,
						var: "boxContent",
						height: 1434
					},
					compId: 49,
					child: [{
						type: "Label",
						props: {
							y: 129,
							x: 298.98046875,
							text: "BOSS",
							fontSize: 60,
							color: "#ffffff",
							bold: !0
						},
						compId: 30
					}, {
						type: "Box",
						props: {
							y: 127,
							right: 37
						},
						compId: 47,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 0,
								texture: "gongyong/common_jb_bg.png"
							},
							compId: 76
						}, {
							type: "Sprite",
							props: {
								y: 3,
								x: 3,
								var: "imgGold",
								texture: "gongyong/game_coin.png",
								scaleY: 1.1,
								scaleX: 1.1
							},
							compId: 77
						}, {
							type: "Label",
							props: {
								y: 4,
								x: -19,
								width: 203,
								var: "lblGold",
								text: "1.25K",
								height: 50,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 78
						}]
					}, {
						type: "jindu1",
						props: {
							y: 210,
							x: 159,
							var: "barPro",
							runtime: "ui.box.jindu1UI"
						},
						compId: 60
					}, {
						type: "Image",
						props: {
							skin: "gongyong/jld_2.png",
							centerY: 56,
							centerX: 8
						},
						compId: 61,
						child: [{
							type: "Image",
							props: {
								y: -129,
								skin: "gongyong/end_fail_title.png",
								centerX: 0
							},
							compId: 62
						}, {
							type: "Box",
							props: {
								y: 178,
								x: 143,
								width: 237,
								height: 241
							},
							compId: 63,
							child: [{
								type: "Image",
								props: {
									x: 0,
									skin: "gongyong/end_bar_base.png"
								},
								compId: 64
							}, {
								type: "Image",
								props: {
									y: 115,
									x: 116,
									width: 236,
									var: "imgQuan",
									skin: "gongyong/end_bar_top.png",
									rotation: 0,
									height: 236,
									anchorY: .5,
									anchorX: .5
								},
								compId: 65
							}, {
								type: "Sprite",
								props: {
									y: 77,
									x: 32,
									texture: "gongyong/end_xin.png"
								},
								compId: 66
							}]
						}, {
							type: "Button",
							props: {
								y: 557,
								x: 273,
								var: "btnRelive",
								stateNum: 1,
								skin: "gongyong/com_btn_b.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 72,
							child: [{
								type: "Sprite",
								props: {
									y: 24.5,
									x: 23,
									texture: "gongyong/end_pk.png"
								},
								compId: 73
							}, {
								type: "Label",
								props: {
									y: 12,
									x: 71,
									width: 99,
									text: "continue",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 74
							}]
						}, {
							type: "Label",
							props: {
								y: 632,
								x: 102,
								width: 342,
								var: "btnClose",
								valign: "middle",
								underline: !0,
								text: "No thanks",
								height: 82,
								fontSize: 40,
								color: "#7f8082",
								bold: !0,
								align: "center"
							},
							compId: 75
						}]
					}]
				}, {
					type: "Button",
					props: {
						y: 1110,
						x: 400,
						visible: !1,
						var: "btnTiyan",
						stateNum: 1,
						skin: "gongyong/store_button2.png",
						scaleY: 1,
						scaleX: 1,
						labelSize: 45,
						labelColors: "#ffffff",
						labelBold: !0,
						label: "体验完成版",
						anchorY: .5,
						anchorX: .5
					},
					compId: 58
				}],
				animations: [{
					nodes: [{
						target: 58,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 58,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/jld_2.png", "gongyong/end_fail_title.png", "gongyong/end_bar_base.png", "gongyong/end_bar_top.png", "gongyong/end_xin.png", "gongyong/com_btn_b.png", "gongyong/end_pk.png", "gongyong/store_button2.png"],
				loadList3D: []
			}, e.jiesuan_bossUI = a, Yi("ui.jiesuan_bossUI", a);
			class o extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(o.uiView)
				}
			}
			o.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 155,
						x: 0,
						width: 768,
						var: "boxContent",
						height: 1353
					},
					compId: 72,
					child: [{
						type: "Box",
						props: {
							y: 146,
							right: 12
						},
						compId: 47,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 0,
								texture: "gongyong/common_jb_bg.png"
							},
							compId: 73
						}, {
							type: "Sprite",
							props: {
								y: 3,
								x: 3,
								var: "imgGold",
								texture: "gongyong/game_coin.png",
								scaleY: 1.1,
								scaleX: 1.1
							},
							compId: 74
						}, {
							type: "Label",
							props: {
								y: 4,
								x: -25,
								width: 203,
								var: "lblGold",
								text: "1.25K",
								height: 50,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 75
						}]
					}, {
						type: "Image",
						props: {
							skin: "gongyong/img_js_10.png",
							centerY: -265,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 100
					}, {
						type: "Image",
						props: {
							y: 356,
							x: 125,
							skin: "gongyong/jld_2.png",
							centerY: 0,
							centerX: 0
						},
						compId: 76,
						child: [{
							type: "Image",
							props: {
								y: -180,
								skin: "gongyong/end_suc_title.png",
								centerX: 0
							},
							compId: 77
						}, {
							type: "Sprite",
							props: {
								y: 91,
								x: 140,
								texture: "gongyong/remind_coin.png"
							},
							compId: 55
						}, {
							type: "Image",
							props: {
								y: 269,
								skin: "gongyong/end_suc_line.png",
								centerX: 0
							},
							compId: 86
						}, {
							type: "Box",
							props: {
								y: 305,
								x: 109,
								width: 300,
								height: 153,
								centerX: 0
							},
							compId: 87,
							child: [{
								type: "Label",
								props: {
									text: "Total：",
									fontSize: 38,
									color: "#ffffff",
									centerX: 0,
									bold: !0
								},
								compId: 88
							}, {
								type: "Label",
								props: {
									y: 47,
									var: "lblAddGold",
									text: "99",
									height: 95,
									fontSize: 80,
									color: "#ffffff",
									centerX: -40,
									bold: !0,
									align: "right"
								},
								compId: 98,
								child: [{
									type: "Image",
									props: {
										y: 6,
										skin: "gongyong/game_coin.png",
										scaleY: 1.5,
										scaleX: 1.5,
										right: -76
									},
									compId: 99
								}]
							}]
						}, {
							type: "Button",
							props: {
								y: 557,
								x: 273,
								var: "btnVideo",
								stateNum: 1,
								skin: "gongyong/com_btn_b.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 91,
							child: [{
								type: "Sprite",
								props: {
									y: 22,
									x: 13,
									texture: "gongyong/end_pk.png"
								},
								compId: 92
							}, {
								type: "Label",
								props: {
									y: 16,
									x: 62.5,
									width: 99,
									var: "lblVideoGold",
									text: "324",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 93
							}, {
								type: "Sprite",
								props: {
									y: 20,
									x: 160,
									texture: "gongyong/game_coin.png"
								},
								compId: 94
							}, {
								type: "Sprite",
								props: {
									y: -6,
									x: 216,
									visible: !1,
									texture: "gongyong/img_sd_03.png"
								},
								compId: 95,
								child: [{
									type: "Label",
									props: {
										y: 9,
										x: 3,
										var: "lblBei",
										text: "X3",
										fontSize: 32,
										color: "#ffd800",
										bold: !0
									},
									compId: 96
								}]
							}]
						}, {
							type: "Label",
							props: {
								y: 650,
								width: 342,
								var: "btnClose",
								valign: "middle",
								underline: !0,
								text: "No thanks",
								height: 73,
								fontSize: 40,
								color: "#7f8082",
								centerX: 0,
								bold: !0,
								align: "center"
							},
							compId: 97
						}]
					}]
				}, {
					type: "Button",
					props: {
						y: 1242,
						x: 324,
						width: 205,
						visible: !1,
						var: "btnTiyan",
						stateNum: 1,
						skin: "gongyong/end_button3.png",
						labelSize: 45,
						labelFont: "SimHei",
						labelColors: "#ffffff",
						labelBold: !0,
						anchorY: .5,
						anchorX: .5
					},
					compId: 60,
					child: [{
						type: "Label",
						props: {
							y: 63,
							x: 0,
							wordWrap: !0,
							width: 205,
							text: "full ver",
							height: 52,
							fontSize: 45,
							color: "#ffffff",
							bold: !0,
							align: "center"
						},
						compId: 64
					}, {
						type: "Label",
						props: {
							y: 12,
							x: 0,
							wordWrap: !0,
							width: 205,
							text: "get",
							height: 52,
							fontSize: 45,
							color: "#ffffff",
							bold: !0,
							align: "center"
						},
						compId: 65
					}]
				}, {
					type: "Button",
					props: {
						y: 1242,
						x: 505,
						width: 126,
						visible: !1,
						var: "btnShare",
						stateNum: 1,
						skin: "gongyong/end_button4.png",
						runtime: "script/gui/ScaleButton.ts",
						height: 134,
						anchorY: .5,
						anchorX: .5
					},
					compId: 62,
					child: [{
						type: "Sprite",
						props: {
							y: 18,
							x: 37,
							texture: "gongyong/game_video2.png"
						},
						compId: 70
					}, {
						type: "Label",
						props: {
							y: 72,
							x: 0,
							width: 127,
							text: "share",
							height: 42,
							fontSize: 35,
							color: "#ffffff",
							bold: !0,
							align: "center"
						},
						compId: 71
					}]
				}],
				animations: [{
					nodes: [{
						target: 60,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 60,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}, {
					nodes: [{
						target: 100,
						keyframes: {
							rotation: [{
								value: 0,
								tweenMethod: "linearNone",
								tween: !0,
								target: 100,
								key: "rotation",
								index: 0
							}, {
								value: 360,
								tweenMethod: "linearNone",
								tween: !0,
								target: 100,
								key: "rotation",
								index: 20
							}]
						}
					}],
					name: "ani2",
					id: 2,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/img_js_10.png", "gongyong/jld_2.png", "gongyong/end_suc_title.png", "gongyong/remind_coin.png", "gongyong/end_suc_line.png", "gongyong/com_btn_b.png", "gongyong/end_pk.png", "gongyong/img_sd_03.png", "gongyong/end_button3.png", "gongyong/end_button4.png", "gongyong/game_video2.png"],
				loadList3D: []
			}, e.jiesuan_boss_winUI = o, Yi("ui.jiesuan_boss_winUI", o);
			class s extends Xi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(s.uiView)
				}
			}
			s.uiView = {
				type: "Scene",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 0,
						x: 0
					},
					compId: 49,
					child: [{
						type: "Image",
						props: {
							y: 464,
							x: 81,
							width: 610,
							skin: "gongyong/end_suc_line.png",
							sizeGrid: "0,10,0,10"
						},
						compId: 32
					}, {
						type: "Label",
						props: {
							y: 251,
							x: 181.1875,
							text: "BonusLevel",
							fontSize: 80,
							font: "SimHei",
							color: "#ff9f1a",
							bold: !0
						},
						compId: 33
					}, {
						type: "Button",
						props: {
							y: 1195,
							x: 245.125,
							stateNum: 1,
							skin: "gongyong/store_button2.png",
							labelSize: 45,
							labelFont: "SimHei",
							labelColors: "#ffffff",
							labelBold: !0,
							label: "体验完成版"
						},
						compId: 40
					}, {
						type: "Button",
						props: {
							y: 1345,
							x: 245,
							stateNum: 1,
							skin: "gongyong/store_button3.png",
							labelSize: 55,
							labelPadding: "0,0,0,100",
							labelFont: "SimHei",
							labelColors: "#ffffff",
							labelBold: !0,
							labelAlign: "left",
							label: "324"
						},
						compId: 41,
						child: [{
							type: "Sprite",
							props: {
								y: 30,
								x: 13,
								texture: "gongyong/end_pk.png"
							},
							compId: 42
						}, {
							type: "Sprite",
							props: {
								y: 0,
								x: 234,
								texture: "gongyong/end_x3.png"
							},
							compId: 53
						}, {
							type: "Label",
							props: {
								y: 12.5,
								x: 243.594970703125,
								text: "X3",
								fontSize: 35,
								font: "SimHei",
								color: "#ffd800",
								bold: !0
							},
							compId: 54
						}]
					}, {
						type: "Label",
						props: {
							y: 1533,
							x: 316.96484375,
							text: "No,thanks",
							fontSize: 40,
							font: "SimHei",
							color: "#7f8082",
							bold: !0
						},
						compId: 44
					}, {
						type: "Box",
						props: {
							y: 128,
							x: 591
						},
						compId: 47,
						child: [{
							type: "Label",
							props: {
								y: 1,
								text: "12.5K",
								fontSize: 45,
								font: "SimHei",
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 45
						}, {
							type: "Sprite",
							props: {
								x: 124,
								texture: "gongyong/game_coin.png"
							},
							compId: 46
						}]
					}, {
						type: "Label",
						props: {
							y: 341,
							x: 189,
							width: 404,
							valign: "middle",
							text: "Complete！",
							height: 85,
							fontSize: 60,
							font: "SimHei",
							color: "#ff9f1a",
							bold: !0,
							align: "center"
						},
						compId: 52
					}, {
						type: "Sprite",
						props: {
							y: 837,
							x: 288.98046875,
							texture: "gongyong/remind_coin.png"
						},
						compId: 55
					}, {
						type: "Label",
						props: {
							y: 502,
							x: 264,
							text: "collect：",
							fontSize: 60,
							font: "SimHei",
							color: "#ffffff",
							bold: !0
						},
						compId: 56
					}, {
						type: "Box",
						props: {
							y: 587,
							x: 263
						},
						compId: 57,
						child: [{
							type: "Sprite",
							props: {
								y: 7,
								x: 175,
								texture: "gongyong/sign_coin1.png"
							},
							compId: 58
						}, {
							type: "Label",
							props: {
								y: 0,
								x: 0,
								width: 159,
								text: "99",
								height: 95,
								fontSize: 90,
								font: "SimHei",
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 59
						}]
					}, {
						type: "ProgressBar",
						props: {
							y: 121,
							x: 186,
							skin: "gongyong/progress_3.png",
							sizeGrid: "0,65,0,104"
						},
						compId: 60,
						child: [{
							type: "Sprite",
							props: {
								y: 8,
								x: 21,
								texture: "gongyong/game_coin1.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 61
						}]
					}]
				}],
				loadList: ["gongyong/end_suc_line.png", "gongyong/store_button2.png", "gongyong/store_button3.png", "gongyong/end_pk.png", "gongyong/end_x3.png", "gongyong/game_coin.png", "gongyong/remind_coin.png", "gongyong/sign_coin1.png", "gongyong/progress_3.png", "gongyong/game_coin1.png"],
				loadList3D: []
			}, e.jiesuan_jinbi_winUI = s, Yi("ui.jiesuan_jinbi_winUI", s);
			class r extends Xi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(r.uiView)
				}
			}
			r.uiView = {
				type: "Scene",
				props: {
					width: 768,
					runtime: "script/gui/LoadingView.ts",
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: -117,
						x: -178.5,
						width: 1125,
						var: "imgBg",
						height: 1897,
						bgColor: "#ffffff"
					},
					compId: 19
				}, {
					type: "Image",
					props: {
						var: "imgLogo",
						skin: "wxlocal/bg_l_01.jpg",
						centerY: 0,
						centerX: 0
					},
					compId: 22
				}, {
					type: "Box",
					props: {
						centerX: 0,
						bottom: 150
					},
					compId: 12,
					child: [{
						type: "jindu11",
						props: {
							y: 48,
							var: "progress",
							centerX: 0,
							runtime: "ui.box.jindu11UI"
						},
						compId: 21
					}, {
						type: "Label",
						props: {
							y: 8,
							var: "lblState",
							text: "loading...(40%)",
							fontSize: 26,
							color: "#ffffff",
							centerX: 0,
							bold: !0
						},
						compId: 14
					}]
				}, {
					type: "Box",
					props: {
						visible: !1,
						var: "boxKp",
						centerY: 0,
						centerX: 0
					},
					compId: 26,
					child: [{
						type: "Label",
						props: {
							y: 0,
							x: 109,
							text: "健康游戏忠告",
							fontSize: 50,
							color: "#ffffff",
							bold: !0
						},
						compId: 23
					}, {
						type: "Label",
						props: {
							y: 138,
							x: 0,
							text: "抵制不良游戏，拒绝盗版游戏。",
							fontSize: 40,
							color: "#ffffff",
							bold: !0
						},
						compId: 24
					}, {
						type: "Label",
						props: {
							y: 268,
							x: 0,
							text: "适度游戏益脑，沉迷游戏伤身。",
							fontSize: 40,
							color: "#ffffff",
							bold: !0
						},
						compId: 25
					}, {
						type: "Label",
						props: {
							y: 203,
							x: 0,
							text: "注意自我保护，谨防受骗上当。",
							fontSize: 40,
							color: "#ffffff",
							bold: !0
						},
						compId: 28
					}, {
						type: "Label",
						props: {
							y: 333,
							x: 0,
							text: "合理安排时间，享受健康生活。",
							fontSize: 40,
							color: "#ffffff",
							bold: !0
						},
						compId: 29
					}, {
						type: "Label",
						props: {
							y: 689,
							x: 29,
							text: "游戏内危险动作，请勿模仿！",
							fontSize: 40,
							color: "#ffffff",
							bold: !0
						},
						compId: 32
					}]
				}],
				loadList: ["wxlocal/bg_l_01.jpg"],
				loadList3D: []
			}, e.LoadingViewUI = r, Yi("ui.LoadingViewUI", r);
			class l extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(l.uiView)
				}
			}
			l.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 115,
						x: 0,
						width: 768,
						var: "boxContent",
						height: 1434
					},
					compId: 86,
					child: [{
						type: "Box",
						props: {
							right: 10,
							centerY: -544
						},
						compId: 110,
						child: [{
							type: "Sprite",
							props: {
								texture: "gongyong/common_jb_bg.png"
							},
							compId: 111
						}, {
							type: "Sprite",
							props: {
								y: 3,
								x: 3,
								var: "imgGold",
								texture: "gongyong/game_coin.png",
								scaleY: 1.1,
								scaleX: 1.1
							},
							compId: 112
						}, {
							type: "Label",
							props: {
								y: 2,
								x: -25,
								width: 203,
								var: "lblGold",
								text: "1.25K",
								height: 50,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 113
						}]
					}, {
						type: "jindu",
						props: {
							x: 196,
							var: "barPro",
							centerY: -544,
							runtime: "ui.box.jinduUI"
						},
						compId: 83,
						child: [{
							type: "Label",
							props: {
								y: 4,
								x: 5,
								width: 65,
								var: "lblLevel1",
								text: "5",
								height: 45,
								fontSize: 45,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 80
						}]
					}, {
						type: "Image",
						props: {
							y: 396,
							x: 125,
							skin: "gongyong/jld_2.png",
							centerY: 0,
							centerX: 0
						},
						compId: 87,
						child: [{
							type: "Image",
							props: {
								y: -180,
								skin: "gongyong/end_fail_title.png",
								centerX: 0
							},
							compId: 88
						}, {
							type: "Box",
							props: {
								y: 51,
								width: 237,
								height: 241,
								centerX: 0
							},
							compId: 67,
							child: [{
								type: "Image",
								props: {
									x: 0,
									skin: "gongyong/end_bar_base.png"
								},
								compId: 75
							}, {
								type: "Image",
								props: {
									y: 115,
									x: 116,
									width: 236,
									var: "imgQuan",
									skin: "gongyong/end_bar_top.png",
									rotation: 0,
									height: 236,
									anchorY: .5,
									anchorX: .5
								},
								compId: 76
							}, {
								type: "Sprite",
								props: {
									y: 77,
									x: 32,
									texture: "gongyong/end_xin.png"
								},
								compId: 109
							}]
						}, {
							type: "Image",
							props: {
								y: 298,
								skin: "gongyong/end_suc_line.png",
								centerX: 0
							},
							compId: 97
						}, {
							type: "Box",
							props: {
								y: 347,
								x: 109,
								width: 300,
								height: 135,
								centerX: 0
							},
							compId: 98,
							child: [{
								type: "Label",
								props: {
									text: "Total：",
									fontSize: 38,
									color: "#ffffff",
									centerX: 0,
									bold: !0
								},
								compId: 99
							}, {
								type: "Label",
								props: {
									y: 47,
									var: "lblAddGold",
									text: "99",
									height: 95,
									fontSize: 80,
									color: "#ffffff",
									centerX: -40,
									bold: !0,
									align: "right"
								},
								compId: 114,
								child: [{
									type: "Image",
									props: {
										y: 21,
										skin: "gongyong/game_coin.png",
										scaleY: 1.5,
										scaleX: 1.5,
										right: -87
									},
									compId: 115
								}]
							}]
						}, {
							type: "Button",
							props: {
								y: 557,
								x: 273,
								var: "btnRelive",
								stateNum: 1,
								skin: "gongyong/com_btn_b.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 102,
							child: [{
								type: "Sprite",
								props: {
									y: 23,
									x: 31,
									texture: "gongyong/end_pk.png"
								},
								compId: 103
							}, {
								type: "Label",
								props: {
									y: 12,
									x: 96,
									width: 99,
									text: "revive",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 104
							}]
						}, {
							type: "Box",
							props: {
								y: 450,
								x: 0,
								width: 512,
								visible: !1,
								var: "boxOppo",
								left: 0,
								height: 160
							},
							compId: 118,
							child: [{
								type: "Button",
								props: {
									y: 83,
									x: 149,
									width: 230,
									var: "btnRelive1",
									stateNum: 1,
									skin: "gongyong/com_btn_b.png",
									runtime: "script/gui/ScaleButton.ts",
									labelSize: 55,
									labelPadding: "0,0,0,100",
									labelFont: "SimHei",
									labelColors: "#ffffff",
									labelBold: !0,
									labelAlign: "left",
									anchorY: .5,
									anchorX: .5
								},
								compId: 127,
								child: [{
									type: "Sprite",
									props: {
										y: 23,
										x: 31,
										texture: "gongyong/end_pk.png"
									},
									compId: 128
								}, {
									type: "Label",
									props: {
										y: 23,
										x: 88,
										width: 99,
										text: "revive",
										height: 55,
										fontSize: 40,
										color: "#ffffff",
										bold: !0,
										align: "center"
									},
									compId: 129
								}]
							}, {
								type: "Button",
								props: {
									y: 83,
									x: 386,
									width: 230,
									var: "btnJixu",
									stateNum: 1,
									skin: "gongyong/com_btn_b.png",
									runtime: "script/gui/ScaleButton.ts",
									labelSize: 55,
									labelPadding: "0,0,0,100",
									labelFont: "SimHei",
									labelColors: "#ffffff",
									labelBold: !0,
									labelAlign: "left",
									anchorY: .5,
									anchorX: .5
								},
								compId: 125,
								child: [{
									type: "Label",
									props: {
										y: 24.5,
										x: 27,
										width: 99,
										text: "continue",
										height: 55,
										fontSize: 40,
										color: "#ffffff",
										bold: !0,
										align: "center"
									},
									compId: 126
								}]
							}]
						}, {
							type: "Label",
							props: {
								y: 642,
								width: 342,
								var: "btnClose",
								valign: "middle",
								underline: !0,
								text: "No thanks",
								height: 82,
								fontSize: 40,
								color: "#ffffff",
								centerX: 0,
								bold: !0,
								align: "center"
							},
							compId: 108
						}]
					}]
				}],
				loadList: ["gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/jld_2.png", "gongyong/end_fail_title.png", "gongyong/end_bar_base.png", "gongyong/end_bar_top.png", "gongyong/end_xin.png", "gongyong/end_suc_line.png", "gongyong/com_btn_b.png", "gongyong/end_pk.png"],
				loadList3D: []
			}, e.ReLiveViewUI = l, Yi("ui.ReLiveViewUI", l);
			class d extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(d.uiView)
				}
			}
			d.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					runtime: "script/gui/ScaleButton.ts",
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 115,
						width: 768,
						var: "boxContent",
						height: 1434
					},
					compId: 90,
					child: [{
						type: "ProgressBar",
						props: {
							x: 187,
							value: 1,
							skin: "gongyong/pro_sub.png",
							sizeGrid: "0,46,0,90",
							centerY: -544
						},
						compId: 77,
						child: [{
							type: "Label",
							props: {
								y: 4,
								x: 8,
								width: 58,
								var: "lblLevel1",
								text: "5",
								height: 45,
								fontSize: 45,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 78
						}]
					}, {
						type: "Box",
						props: {
							right: 12,
							centerY: -544
						},
						compId: 68,
						child: [{
							type: "Sprite",
							props: {
								texture: "gongyong/common_jb_bg.png"
							},
							compId: 100
						}, {
							type: "Sprite",
							props: {
								y: 3,
								x: 3,
								var: "imgGold",
								texture: "gongyong/game_coin.png",
								scaleY: 1.1,
								scaleX: 1.1
							},
							compId: 102
						}, {
							type: "Label",
							props: {
								y: 4,
								x: -25,
								width: 203,
								var: "lblGold",
								text: "1.25K",
								height: 50,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "right"
							},
							compId: 101
						}]
					}, {
						type: "Image",
						props: {
							y: 452,
							x: 384,
							skin: "gongyong/img_js_10.png",
							centerY: -265,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 103
					}, {
						type: "Image",
						props: {
							skin: "gongyong/jld_2.png",
							centerY: 0,
							centerX: 0
						},
						compId: 96,
						child: [{
							type: "Image",
							props: {
								y: -180,
								skin: "gongyong/end_suc_title.png",
								centerX: 0
							},
							compId: 97
						}, {
							type: "Sprite",
							props: {
								y: 113,
								x: 83,
								texture: "gongyong/end_rank.png"
							},
							compId: 72
						}, {
							type: "Label",
							props: {
								y: 108,
								x: 170,
								width: 100,
								var: "lblRank",
								text: "1st",
								height: 50,
								fontSize: 40,
								color: "#b3b3b3",
								bold: !0
							},
							compId: 81
						}, {
							type: "Label",
							props: {
								y: 108,
								x: 285,
								width: 100,
								var: "lblAddGold0",
								text: "108",
								height: 50,
								fontSize: 40,
								color: "#b3b3b3",
								bold: !0,
								align: "right"
							},
							compId: 82
						}, {
							type: "Sprite",
							props: {
								y: 109,
								x: 403,
								texture: "gongyong/game_coin.png"
							},
							compId: 84
						}, {
							type: "Sprite",
							props: {
								y: 180,
								x: 75,
								texture: "gongyong/end_motor.png"
							},
							compId: 80
						}, {
							type: "Label",
							props: {
								y: 172,
								x: 170,
								width: 100,
								var: "lblAttack",
								text: "x3",
								height: 50,
								fontSize: 40,
								color: "#b3b3b3",
								bold: !0
							},
							compId: 83
						}, {
							type: "Label",
							props: {
								y: 172,
								x: 285,
								width: 100,
								var: "lblAddGold1",
								text: "108",
								height: 50,
								fontSize: 40,
								color: "#b3b3b3",
								bold: !0,
								align: "right"
							},
							compId: 85
						}, {
							type: "Sprite",
							props: {
								y: 178,
								x: 403,
								texture: "gongyong/game_coin.png"
							},
							compId: 86
						}, {
							type: "Image",
							props: {
								y: 269,
								skin: "gongyong/end_suc_line.png",
								centerX: 0
							},
							compId: 98
						}, {
							type: "Box",
							props: {
								y: 305,
								x: 109,
								width: 300,
								height: 153,
								centerX: 0
							},
							compId: 74,
							child: [{
								type: "Label",
								props: {
									text: "Total：",
									fontSize: 38,
									color: "#ffffff",
									centerX: 0,
									bold: !0
								},
								compId: 73
							}, {
								type: "Label",
								props: {
									y: 47,
									var: "lblAddGold",
									text: "99",
									height: 95,
									fontSize: 80,
									color: "#ffffff",
									centerX: -40,
									bold: !0,
									align: "right"
								},
								compId: 76,
								child: [{
									type: "Image",
									props: {
										y: 21,
										skin: "gongyong/game_coin.png",
										scaleY: 1.5,
										scaleX: 1.5,
										right: -83
									},
									compId: 75
								}]
							}]
						}, {
							type: "Button",
							props: {
								y: 557,
								x: 273,
								visible: !1,
								var: "btnVideo",
								stateNum: 1,
								skin: "gongyong/com_btn_b.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 63,
							child: [{
								type: "Sprite",
								props: {
									y: 22,
									x: 13,
									texture: "gongyong/end_pk.png"
								},
								compId: 64
							}, {
								type: "Label",
								props: {
									y: 12,
									x: 65,
									width: 99,
									var: "lblVideoGold",
									text: "324",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 87
							}, {
								type: "Sprite",
								props: {
									y: 20,
									x: 160,
									texture: "gongyong/game_coin.png"
								},
								compId: 99
							}, {
								type: "Sprite",
								props: {
									y: -6,
									x: 216,
									visible: !1,
									texture: "gongyong/img_sd_03.png"
								},
								compId: 65,
								child: [{
									type: "Label",
									props: {
										y: 9,
										x: 3,
										var: "lblBei",
										text: "X3",
										fontSize: 32,
										color: "#ffd800",
										bold: !0
									},
									compId: 66
								}]
							}]
						}, {
							type: "Box",
							props: {
								y: 450,
								width: 512,
								visible: !1,
								var: "boxOppo",
								left: 0,
								height: 160
							},
							compId: 106,
							child: [{
								type: "Button",
								props: {
									y: 83,
									x: 149,
									width: 230,
									var: "btnVideo1",
									stateNum: 1,
									skin: "gongyong/com_btn_b.png",
									runtime: "script/gui/ScaleButton.ts",
									labelSize: 55,
									labelPadding: "0,0,0,100",
									labelFont: "SimHei",
									labelColors: "#ffffff",
									labelBold: !0,
									labelAlign: "left",
									anchorY: .5,
									anchorX: .5
								},
								compId: 107,
								child: [{
									type: "Sprite",
									props: {
										y: 22,
										x: 13,
										texture: "gongyong/end_pk.png"
									},
									compId: 108
								}, {
									type: "Label",
									props: {
										y: 23,
										x: 59,
										width: 99,
										var: "lblVideoGold1",
										text: "324",
										height: 55,
										fontSize: 40,
										color: "#ffffff",
										bold: !0,
										align: "center"
									},
									compId: 109
								}, {
									type: "Sprite",
									props: {
										y: 20,
										x: 160,
										texture: "gongyong/game_coin.png"
									},
									compId: 110
								}, {
									type: "Sprite",
									props: {
										y: -6,
										x: 192,
										visible: !1,
										texture: "gongyong/img_sd_03.png"
									},
									compId: 111,
									child: [{
										type: "Label",
										props: {
											y: 9,
											x: 3,
											var: "lblBei1",
											text: "X3",
											fontSize: 32,
											color: "#ffd800",
											bold: !0
										},
										compId: 112
									}]
								}]
							}, {
								type: "Button",
								props: {
									y: 83,
									x: 386,
									width: 230,
									var: "btnJixu",
									stateNum: 1,
									skin: "gongyong/com_btn_b.png",
									runtime: "script/gui/ScaleButton.ts",
									labelSize: 55,
									labelPadding: "0,0,0,100",
									labelFont: "SimHei",
									labelColors: "#ffffff",
									labelBold: !0,
									labelAlign: "left",
									anchorY: .5,
									anchorX: .5
								},
								compId: 113,
								child: [{
									type: "Label",
									props: {
										y: 24.5,
										x: 33,
										width: 99,
										text: "continue",
										height: 55,
										fontSize: 40,
										color: "#ffffff",
										bold: !0,
										align: "center"
									},
									compId: 115
								}]
							}]
						}, {
							type: "Label",
							props: {
								y: 642,
								width: 342,
								var: "btnClose",
								valign: "middle",
								underline: !0,
								text: "No thanks",
								height: 73,
								fontSize: 40,
								color: "#ffffff",
								centerX: 0,
								bold: !0,
								align: "center"
							},
							compId: 67
						}]
					}, {
						type: "Button",
						props: {
							y: 1104,
							x: 330,
							width: 205,
							visible: !1,
							var: "btnTiyan",
							stateNum: 1,
							skin: "gongyong/end_button3.png",
							labelSize: 45,
							labelFont: "SimHei",
							labelColors: "#ffffff",
							labelBold: !0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 62,
						child: [{
							type: "Label",
							props: {
								y: 63,
								x: 0,
								wordWrap: !0,
								width: 205,
								text: "full ver",
								height: 52,
								fontSize: 45,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 91
						}, {
							type: "Label",
							props: {
								y: 12,
								x: 0,
								wordWrap: !0,
								width: 205,
								text: "get",
								height: 52,
								fontSize: 45,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 92
						}]
					}, {
						type: "Button",
						props: {
							y: 1104,
							x: 508,
							width: 126,
							visible: !1,
							var: "btnShare",
							stateNum: 1,
							skin: "gongyong/end_button4.png",
							runtime: "script/gui/ScaleButton.ts",
							height: 134,
							anchorY: .5,
							anchorX: .5
						},
						compId: 93,
						child: [{
							type: "Sprite",
							props: {
								y: 18,
								x: 37,
								texture: "gongyong/game_video2.png"
							},
							compId: 94
						}, {
							type: "Label",
							props: {
								y: 72,
								x: 0,
								width: 127,
								text: "share",
								height: 42,
								fontSize: 35,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 95
						}]
					}]
				}],
				animations: [{
					nodes: [{
						target: 62,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 62,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}, {
					nodes: [{
						target: 63,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 63,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani2",
					id: 2,
					frameRate: 24,
					action: 0
				}, {
					nodes: [{
						target: 103,
						keyframes: {
							rotation: [{
								value: 0,
								tweenMethod: "linearNone",
								tween: !0,
								target: 103,
								key: "rotation",
								index: 0
							}, {
								value: 360,
								tweenMethod: "linearNone",
								tween: !0,
								target: 103,
								key: "rotation",
								index: 15
							}]
						}
					}],
					name: "ani3",
					id: 3,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/pro_sub.png", "gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/img_js_10.png", "gongyong/jld_2.png", "gongyong/end_suc_title.png", "gongyong/end_rank.png", "gongyong/end_motor.png", "gongyong/end_suc_line.png", "gongyong/com_btn_b.png", "gongyong/end_pk.png", "gongyong/img_sd_03.png", "gongyong/end_button3.png", "gongyong/end_button4.png", "gongyong/game_video2.png"],
				loadList3D: []
			}, e.RewardUI = d, Yi("ui.RewardUI", d);
			class h extends Xi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(h.uiView)
				}
			}
			h.uiView = {
				type: "Scene",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Image",
					props: {
						top: -28,
						skin: "gongyong/store_bg.png",
						scaleY: 2,
						scaleX: 2,
						right: 0,
						left: 0,
						bottom: 950
					},
					compId: 63
				}, {
					type: "Box",
					props: {
						top: 120,
						right: 10
					},
					compId: 25,
					child: [{
						type: "Sprite",
						props: {
							texture: "gongyong/common_jb_bg.png"
						},
						compId: 67
					}, {
						type: "Sprite",
						props: {
							y: 3,
							x: 3,
							texture: "gongyong/game_coin.png",
							scaleY: 1.1,
							scaleX: 1.1
						},
						compId: 23
					}, {
						type: "Label",
						props: {
							y: 4,
							x: -25,
							width: 203,
							var: "lblGold",
							text: "1.25K",
							height: 50,
							fontSize: 40,
							color: "#ffffff",
							bold: !0,
							align: "right"
						},
						compId: 24
					}]
				}, {
					type: "Box",
					props: {
						width: 768,
						var: "boxCenter",
						height: 1390,
						centerX: 0,
						bottom: 53
					},
					compId: 64,
					child: [{
						type: "Box",
						props: {
							y: 364,
							centerX: 0
						},
						compId: 21,
						child: [{
							type: "Image",
							props: {
								y: 0,
								width: 763,
								var: "bgShop",
								skin: "gongyong/store_bg_1.png",
								sizeGrid: "467,0,473,0",
								height: 1093,
								centerX: 0
							},
							compId: 65,
							child: [{
								type: "Image",
								props: {
									y: 28,
									var: "ImgIcon",
									skin: "gongyong/store_moto.png",
									centerX: -68
								},
								compId: 66
							}, {
								type: "Label",
								props: {
									y: 13,
									width: 102,
									var: "lblTitle",
									text: "moto",
									height: 50,
									fontSize: 40,
									color: "#ffffff",
									centerX: 22,
									bold: !0
								},
								compId: 22
							}]
						}]
					}, {
						type: "List",
						props: {
							y: 478,
							width: 668,
							var: "list",
							spaceY: 30,
							spaceX: 60,
							repeatY: 3,
							repeatX: 3,
							height: 680,
							centerX: 0
						},
						compId: 13,
						child: [{
							type: "PifuBox",
							props: {
								name: "render",
								runtime: "script/gui/box/PifuBox.ts"
							},
							compId: 60
						}]
					}, {
						type: "Image",
						props: {
							var: "imgShow",
							skin: "gongyong/store_motor6.png",
							centerX: 0
						},
						compId: 27
					}, {
						type: "Button",
						props: {
							y: 1154,
							width: 254,
							var: "btnVideo",
							stateNum: 1,
							skin: "gongyong/btn_hd_01.png",
							runtime: "script/gui/ScaleButton.ts",
							labelSize: 55,
							labelPadding: "0,0,0,100",
							labelFont: "SimHei",
							labelColors: "#ffffff",
							labelBold: !0,
							labelAlign: "left",
							height: 104,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 68,
						child: [{
							type: "Sprite",
							props: {
								y: 22,
								x: 13,
								texture: "gongyong/end_pk.png"
							},
							compId: 69
						}, {
							type: "Label",
							props: {
								y: 14,
								x: 61,
								width: 99,
								var: "lblVideoGold",
								text: "1000",
								height: 55,
								fontSize: 40,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 70
						}, {
							type: "Sprite",
							props: {
								y: 20,
								x: 160,
								texture: "gongyong/game_coin.png"
							},
							compId: 71
						}, {
							type: "Sprite",
							props: {
								y: -6,
								x: 216,
								visible: !1,
								texture: "gongyong/img_sd_03.png"
							},
							compId: 72,
							child: [{
								type: "Label",
								props: {
									y: 9,
									x: 3,
									var: "lblBei",
									text: "X3",
									fontSize: 32,
									color: "#ffd800",
									bold: !0
								},
								compId: 73
							}]
						}]
					}]
				}, {
					type: "Button",
					props: {
						var: "btnClose",
						top: 130,
						stateNum: 1,
						skin: "gongyong/end_back.png",
						runtime: "script/gui/ScaleButton.ts",
						name: "close",
						left: 60,
						labelStrokeColor: "#ffffff",
						anchorY: .5
					},
					compId: 6
				}, {
					type: "Image",
					props: {
						width: 702,
						visible: !0,
						skin: "gongyong/touxiangdi.png",
						height: 188,
						centerX: 0,
						bottom: -10,
						anchorY: .5,
						anchorX: .5,
						alpha: .5
					},
					compId: 78
				}],
				loadList: ["gongyong/store_bg.png", "gongyong/common_jb_bg.png", "gongyong/game_coin.png", "gongyong/store_bg_1.png", "gongyong/store_moto.png", "gongyong/store_motor6.png", "gongyong/btn_hd_01.png", "gongyong/end_pk.png", "gongyong/img_sd_03.png", "gongyong/end_back.png", "gongyong/touxiangdi.png"],
				loadList3D: []
			}, e.shopUI = h, Yi("ui.shopUI", h);
			class c extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(c.uiView)
				}
			}
			c.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 494,
						width: 519,
						centerX: 0
					},
					compId: 3,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							skin: "gongyong/jld_2.png"
						},
						compId: 4
					}, {
						type: "Sprite",
						props: {
							y: 25,
							x: 9,
							texture: "gongyong/bg_hd_02.png"
						},
						compId: 13
					}, {
						type: "Image",
						props: {
							y: 104,
							var: "imgWuti",
							skin: "gongyong/store_motor1.png",
							scaleY: .8,
							scaleX: .8,
							centerX: 0
						},
						compId: 5
					}, {
						type: "Button",
						props: {
							y: 521,
							x: 268,
							var: "btnGet",
							stateNum: 1,
							skin: "gongyong/btn_hd_01.png",
							labelSize: 46,
							labelPadding: "-8",
							labelColors: "#ffffff",
							labelBold: !0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 7,
						child: [{
							type: "Label",
							props: {
								y: 0,
								x: 10,
								width: 234,
								valign: "middle",
								text: "Buy",
								height: 68,
								fontSize: 50,
								color: "#ffffff",
								align: "center"
							},
							compId: 28
						}]
					}, {
						type: "Box",
						props: {
							y: 450,
							x: 0,
							width: 512,
							visible: !1,
							var: "boxOppo",
							left: 0,
							height: 160
						},
						compId: 18,
						child: [{
							type: "Button",
							props: {
								y: 83,
								x: 149,
								width: 230,
								var: "btnGet1",
								stateNum: 1,
								skin: "gongyong/btn_hd_01.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 19,
							child: [{
								type: "Label",
								props: {
									y: 15,
									x: 65.5,
									width: 99,
									text: "Buy",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 21
							}]
						}, {
							type: "Button",
							props: {
								y: 83,
								x: 386,
								width: 230,
								var: "btnJixu",
								stateNum: 1,
								skin: "gongyong/btn_hd_01.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "center",
								anchorY: .5,
								anchorX: .5
							},
							compId: 25,
							child: [{
								type: "Label",
								props: {
									y: 19,
									x: 27.5,
									width: 175,
									text: "Continue",
									height: 41,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 26
							}]
						}]
					}, {
						type: "Image",
						props: {
							y: -67,
							var: "imgTitle",
							skin: "gongyong/img_sy_04.png",
							centerX: 0
						},
						compId: 12
					}, {
						type: "Sprite",
						props: {
							y: 367,
							x: 297,
							texture: "gongyong/game_coin.png"
						},
						compId: 10
					}, {
						type: "Label",
						props: {
							y: 343.5,
							x: 23,
							width: 255,
							var: "lblGold",
							text: "1000",
							height: 50,
							fontSize: 50,
							color: "#ffffff",
							bold: !0,
							align: "right"
						},
						compId: 11
					}, {
						type: "Label",
						props: {
							y: 635,
							width: 342,
							var: "btnClose",
							valign: "middle",
							underline: !0,
							text: "No thanks",
							height: 73,
							fontSize: 40,
							color: "#ffffff",
							centerX: 8,
							bold: !0,
							align: "center"
						},
						compId: 14
					}]
				}],
				animations: [{
					nodes: [{
						target: 7,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/jld_2.png", "gongyong/bg_hd_02.png", "gongyong/store_motor1.png", "gongyong/btn_hd_01.png", "gongyong/img_sy_04.png", "gongyong/game_coin.png"],
				loadList3D: []
			}, e.shop_tanchuanUI = c, Yi("ui.shop_tanchuanUI", c);
			class p extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(p.uiView)
				}
			}
			p.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 494,
						width: 519,
						centerX: 0
					},
					compId: 3,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							skin: "gongyong/jld_2.png"
						},
						compId: 4
					}, {
						type: "Sprite",
						props: {
							y: 25,
							x: 9,
							texture: "gongyong/bg_hd_02.png"
						},
						compId: 13
					}, {
						type: "Image",
						props: {
							y: 165,
							x: 145,
							skin: "gongyong/remind_coin.png"
						},
						compId: 5
					}, {
						type: "Button",
						props: {
							y: 521,
							x: 268,
							var: "btnGet",
							stateNum: 1,
							skin: "gongyong/btn_hd_01.png",
							labelSize: 46,
							labelPadding: "-20,0,0,35",
							labelColors: "#ffffff",
							labelBold: !0,
							label: "Claim",
							anchorY: .5,
							anchorX: .5
						},
						compId: 7,
						child: [{
							type: "Sprite",
							props: {
								y: 25,
								x: 41,
								texture: "gongyong/end_pk.png"
							},
							compId: 8
						}]
					}, {
						type: "Box",
						props: {
							y: 450,
							x: 0,
							width: 512,
							visible: !1,
							var: "boxOppo",
							left: 0,
							height: 160
						},
						compId: 16,
						child: [{
							type: "Button",
							props: {
								y: 83,
								x: 149,
								width: 230,
								var: "btnGet1",
								stateNum: 1,
								skin: "gongyong/btn_hd_01.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 40,
								labelPadding: "-8,0,0,35",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "center",
								anchorY: .5,
								anchorX: .5
							},
							compId: 17,
							child: [{
								type: "Sprite",
								props: {
									y: 25,
									x: 41,
									texture: "gongyong/end_pk.png"
								},
								compId: 23
							}, {
								type: "Label",
								props: {
									y: 23,
									x: 90,
									width: 99,
									text: "获取",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 25
							}]
						}, {
							type: "Button",
							props: {
								y: 83,
								x: 386,
								width: 230,
								var: "btnJixu",
								stateNum: 1,
								skin: "gongyong/btn_hd_01.png",
								runtime: "script/gui/ScaleButton.ts",
								labelSize: 55,
								labelPadding: "0,0,0,100",
								labelFont: "SimHei",
								labelColors: "#ffffff",
								labelBold: !0,
								labelAlign: "left",
								anchorY: .5,
								anchorX: .5
							},
							compId: 19,
							child: [{
								type: "Label",
								props: {
									y: 23,
									x: 61,
									width: 99,
									text: "继续",
									height: 55,
									fontSize: 40,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 20
							}]
						}]
					}, {
						type: "Image",
						props: {
							y: -78,
							x: -36,
							skin: "gongyong/img_gold_title.png"
						},
						compId: 12
					}, {
						type: "Sprite",
						props: {
							y: 367,
							x: 297,
							texture: "gongyong/game_coin.png"
						},
						compId: 10
					}, {
						type: "Label",
						props: {
							y: 364,
							x: 22,
							width: 255,
							var: "lblGold",
							text: "135",
							height: 50,
							fontSize: 50,
							color: "#ffffff",
							bold: !0,
							align: "right"
						},
						compId: 11
					}, {
						type: "Label",
						props: {
							y: 636,
							width: 342,
							var: "btnClose",
							valign: "middle",
							underline: !0,
							text: "No thanks",
							height: 73,
							fontSize: 40,
							color: "#ffffff",
							centerX: 0,
							bold: !0,
							align: "center"
						},
						compId: 24
					}]
				}, {
					type: "Box",
					props: {
						y: 0,
						x: 0,
						right: 0,
						left: 0,
						height: 300,
						bottom: 0
					},
					compId: 14,
					child: [{
						type: "Image",
						props: {
							y: 250,
							x: 384,
							visible: !1,
							var: "AdBottom",
							runtime: "script/gui/ScaleButton.ts",
							centerX: 0,
							bottom: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 15
					}]
				}],
				animations: [{
					nodes: [{
						target: 7,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 7,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/jld_2.png", "gongyong/bg_hd_02.png", "gongyong/remind_coin.png", "gongyong/btn_hd_01.png", "gongyong/end_pk.png", "gongyong/img_gold_title.png", "gongyong/game_coin.png"],
				loadList3D: []
			}, e.tongyong_tangchuan1UI = p, Yi("ui.tongyong_tangchuan1UI", p);
			class g extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(g.uiView)
				}
			}
			g.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 494,
						x: 89
					},
					compId: 12,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							skin: "gongyong/jld_2.png"
						},
						compId: 13
					}, {
						type: "Button",
						props: {
							y: 65,
							x: 528,
							var: "btnClose",
							stateNum: 1,
							skin: "gongyong/mission_close.png",
							runtime: "script/gui/ScaleButton.ts",
							anchorY: .5,
							anchorX: .5
						},
						compId: 15
					}, {
						type: "Image",
						props: {
							y: 68,
							x: 45,
							skin: "gongyong/trial_light.png"
						},
						compId: 16
					}, {
						type: "Image",
						props: {
							y: 318,
							x: 292,
							var: "imgShow",
							skin: "gongyong/store_motor6.png",
							anchorY: .5,
							anchorX: .5
						},
						compId: 17
					}, {
						type: "Button",
						props: {
							y: 571,
							x: 295,
							var: "btnTiyan",
							stateNum: 1,
							skin: "gongyong/store_button2.png",
							labelSize: 50,
							labelColors: "#ffffff",
							labelBold: !0,
							label: "体验完整版",
							height: 120,
							anchorY: .5,
							anchorX: .5
						},
						compId: 18,
						child: [{
							type: "Sprite",
							props: {
								y: 30,
								x: 26,
								var: "spVideo",
								texture: "gongyong/end_pk.png"
							},
							compId: 23
						}]
					}, {
						type: "Label",
						props: {
							y: 37,
							x: 6,
							width: 562,
							var: "lblTitle",
							text: "畅玩所有摩托",
							height: 60,
							fontSize: 60,
							color: "#4d5583",
							bold: !0,
							align: "center"
						},
						compId: 19
					}, {
						type: "Box",
						props: {
							y: 157,
							x: 44,
							var: "boxTui"
						},
						compId: 20,
						child: [{
							type: "Image",
							props: {
								skin: "gongyong/trial_recommend.png"
							},
							compId: 21
						}, {
							type: "Label",
							props: {
								y: 39,
								x: 22,
								text: "推荐",
								fontSize: 32,
								color: "#ffffff",
								bold: !0
							},
							compId: 22
						}]
					}]
				}],
				animations: [{
					nodes: [{
						target: 18,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/jld_2.png", "gongyong/mission_close.png", "gongyong/trial_light.png", "gongyong/store_motor6.png", "gongyong/store_button2.png", "gongyong/end_pk.png", "gongyong/trial_recommend.png"],
				loadList3D: []
			}, e.tongyong_tangchuan2UI = g, Yi("ui.tongyong_tangchuan2UI", g);
			class m extends zi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(m.uiView)
				}
			}
			m.uiView = {
				type: "Dialog",
				props: {
					width: 768,
					height: 1663
				},
				compId: 2,
				child: [{
					type: "Box",
					props: {
						y: 494,
						width: 519,
						centerX: 0
					},
					compId: 12,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							skin: "gongyong/jld_2.png"
						},
						compId: 13,
						child: [{
							type: "Image",
							props: {
								y: -62,
								var: "ImgTitle",
								skin: "gongyong/try_moto.png",
								centerX: 0
							},
							compId: 24
						}, {
							type: "Image",
							props: {
								y: 64,
								x: 43,
								skin: "gongyong/try_tuijian.png"
							},
							compId: 21
						}]
					}, {
						type: "Image",
						props: {
							y: 267,
							x: 259,
							skin: "gongyong/try_guang.png",
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 16
					}, {
						type: "Image",
						props: {
							var: "imgShow",
							skin: "gongyong/store_motor6.png",
							centerY: -104,
							centerX: 7,
							anchorY: .5,
							anchorX: .5
						},
						compId: 17
					}, {
						type: "Button",
						props: {
							y: 524,
							var: "btnTiyan",
							stateNum: 1,
							skin: "gongyong/com_btn_b.png",
							labelSize: 46,
							labelColors: "#ffffff",
							labelBold: !0,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 18,
						child: [{
							type: "Sprite",
							props: {
								y: 24,
								x: 52,
								var: "spVideo",
								texture: "gongyong/end_pk.png"
							},
							compId: 23
						}, {
							type: "Text",
							props: {
								y: 12,
								x: 105,
								text: "Trial",
								fontSize: 44,
								color: "#ffffff",
								bold: !0,
								runtime: "Laya.Text"
							},
							compId: 26
						}]
					}, {
						type: "Label",
						props: {
							y: 651,
							width: 342,
							var: "btnClose",
							valign: "middle",
							underline: !0,
							text: "No thanks",
							height: 73,
							fontSize: 40,
							color: "#ffffff",
							centerX: 0,
							bold: !0,
							align: "center"
						},
						compId: 29
					}]
				}],
				animations: [{
					nodes: [{
						target: 18,
						keyframes: {
							scaleY: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleY",
								index: 20
							}],
							scaleX: [{
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 0
							}, {
								value: .7,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 10
							}, {
								value: 1,
								tweenMethod: "linearNone",
								tween: !0,
								target: 18,
								key: "scaleX",
								index: 20
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}, {
					nodes: [{
						target: 16,
						keyframes: {
							rotation: [{
								value: 0,
								tweenMethod: "linearNone",
								tween: !0,
								target: 16,
								key: "rotation",
								index: 0
							}, {
								value: 360,
								tweenMethod: "linearNone",
								tween: !0,
								target: 16,
								key: "rotation",
								index: 20
							}]
						}
					}],
					name: "ani2",
					id: 2,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/jld_2.png", "gongyong/try_moto.png", "gongyong/try_tuijian.png", "gongyong/try_guang.png", "gongyong/store_motor6.png", "gongyong/com_btn_b.png", "gongyong/end_pk.png"],
				loadList3D: []
			}, e.tongyong_tangchuan3UI = m, Yi("ui.tongyong_tangchuan3UI", m);
			class u extends Fi {
				constructor() {
					super()
				}
				createChildren() {
					super.createChildren(), this.createView(u.uiView)
				}
			}
			u.uiView = {
				type: "View",
				props: {
					width: 80,
					height: 80
				},
				compId: 2,
				child: [{
					type: "Sprite",
					props: {
						y: 0,
						x: 0,
						texture: "gongyong/zaizaidi.png",
						alpha: .5
					},
					compId: 5
				}, {
					type: "Image",
					props: {
						y: 40,
						x: 40,
						skin: "gongyong/zaijiazhong.png",
						anchorY: .5,
						anchorX: .5
					},
					compId: 4
				}],
				animations: [{
					nodes: [{
						target: 4,
						keyframes: {
							rotation: [{
								value: 0,
								tweenMethod: "linearNone",
								tween: !0,
								target: 4,
								key: "rotation",
								index: 0
							}, {
								value: -180,
								tweenMethod: "linearNone",
								tween: !0,
								target: 4,
								key: "rotation",
								index: 25
							}, {
								value: -360,
								tweenMethod: "linearNone",
								tween: !0,
								target: 4,
								key: "rotation",
								index: 50
							}]
						}
					}],
					name: "ani1",
					id: 1,
					frameRate: 24,
					action: 0
				}],
				loadList: ["gongyong/zaizaidi.png", "gongyong/zaijiazhong.png"],
				loadList3D: []
			}, e.WaitingUI = u, Yi("ui.WaitingUI", u)
		}(Pi || (Pi = {})),
		function (e) {
			! function (e) {
				class t extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(t.uiView)
					}
				}
				t.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 20
					}, {
						type: "Box",
						props: {
							y: 0,
							x: 10,
							width: 799,
							var: "boxDrouble",
							height: 550,
							centerY: 0,
							centerX: 0
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								y: -47,
								x: 66,
								width: 666,
								skin: "activity/nn1.png",
								sizeGrid: "58,58,58,58",
								height: 689,
								centerY: 22,
								centerX: 0
							},
							compId: 4
						}, {
							type: "Image",
							props: {
								y: -36,
								x: 77,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 665
							},
							compId: 26
						}, {
							type: "Label",
							props: {
								y: -14,
								x: 164,
								width: 473,
								var: "txt_title",
								text: "每日金币",
								height: 47,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 6
						}, {
							type: "Button",
							props: {
								y: 114,
								width: 590,
								var: "btnGetCoin1",
								stateNum: 1,
								skin: "activity/common_btn3.png",
								sizeGrid: "42,42,42,42",
								height: 130,
								centerX: 0
							},
							compId: 7,
							child: [{
								type: "Label",
								props: {
									y: 30,
									x: 140,
									width: 280,
									var: "it021",
									valign: "middle",
									text: "普通领取9.6k",
									strokeColor: "#326636",
									stroke: 3,
									height: 67,
									fontSize: 40,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 8
							}, {
								type: "Image",
								props: {
									skin: "activity/icon_gold.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -5,
									centerX: 199
								},
								compId: 9
							}]
						}, {
							type: "Button",
							props: {
								y: 426,
								x: 105,
								width: 590,
								var: "btnGetCoin3",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								height: 130,
								centerX: 0
							},
							compId: 10,
							child: [{
								type: "Label",
								props: {
									y: 25,
									x: 140,
									width: 280,
									var: "it022",
									valign: "middle",
									text: "看视频领取4倍",
									strokeColor: "#7a5620",
									stroke: 3,
									height: 67,
									fontSize: 40,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 12
							}, {
								type: "Image",
								props: {
									y: -280,
									skin: "activity/icon_gold.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -5,
									centerX: 199
								},
								compId: 13
							}]
						}, {
							type: "Button",
							props: {
								y: 271,
								width: 590,
								var: "btnGetShare",
								stateNum: 1,
								skin: "activity/common_btn3.png",
								sizeGrid: "42,42,42,42",
								height: 130,
								centerX: 0
							},
							compId: 16,
							child: [{
								type: "Label",
								props: {
									y: 31.5,
									x: 130,
									width: 280,
									var: "it023",
									valign: "middle",
									text: "分享领取4倍",
									strokeColor: "#326636",
									stroke: 3,
									height: 67,
									fontSize: 40,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 17
							}, {
								type: "Image",
								props: {
									skin: "activity/icon_gold.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -5,
									centerX: 199
								},
								compId: 18
							}]
						}, {
							type: "Sprite",
							props: {
								y: -74,
								x: 150,
								texture: "activity/nn5.png"
							},
							compId: 29
						}, {
							type: "Sprite",
							props: {
								y: -24,
								x: 639,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 30
						}, {
							type: "Sprite",
							props: {
								y: -74,
								x: 574,
								texture: "activity/nn5.png"
							},
							compId: 34
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_btn3.png", "activity/icon_gold.png", "activity/common_btn1.png", "activity/nn5.png", "activity/btn_close.png"],
					loadList3D: []
				}, e.MoonBoxDoubleUI = t, Yi("ui.view.MoonBoxDoubleUI", t);
				class i extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(i.uiView)
					}
				}
				i.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							height: 1089,
							centerY: 6,
							centerX: 5
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								y: 8,
								x: 12,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 1066
							},
							compId: 5,
							child: [{
								type: "Label",
								props: {
									y: 21,
									x: 4,
									width: 638,
									text: "收藏有礼指南",
									height: 52,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 6
							}]
						}, {
							type: "Image",
							props: {
								y: 128,
								width: 597,
								skin: "activity/common_bg2.png",
								sizeGrid: "30,21,20,31",
								height: 66,
								centerX: 2
							},
							compId: 7,
							child: [{
								type: "Label",
								props: {
									y: 15,
									x: 38,
									width: 513,
									var: "txt_getInfo",
									height: 38,
									fontSize: 32,
									font: "黑体",
									color: "#ffffff",
									align: "center"
								},
								compId: 8
							}, {
								type: "Image",
								props: {
									y: 0,
									x: 516,
									width: 76,
									skin: "activity/icon_diamond.png",
									scaleY: .8,
									scaleX: .8,
									height: 80
								},
								compId: 9
							}]
						}, {
							type: "Sprite",
							props: {
								y: -25,
								x: 84,
								texture: "activity/nn5.png"
							},
							compId: 38
						}, {
							type: "Sprite",
							props: {
								y: 20,
								x: 574,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 39
						}, {
							type: "Sprite",
							props: {
								y: -25,
								x: 509,
								texture: "activity/nn5.png"
							},
							compId: 40
						}, {
							type: "Image",
							props: {
								y: 505,
								x: 27,
								width: 602,
								skin: "share/collect1.png",
								height: 204,
								centerX: 0
							},
							compId: 30
						}, {
							type: "Image",
							props: {
								y: 856,
								x: 27,
								width: 602,
								skin: "share/collect3.png",
								height: 170,
								centerX: 0
							},
							compId: 33
						}, {
							type: "Image",
							props: {
								y: 255,
								x: 27,
								width: 602,
								skin: "share/collect2.png",
								height: 170,
								centerX: 0
							},
							compId: 27
						}, {
							type: "Label",
							props: {
								y: 201,
								x: 35,
								width: 331,
								text: "第一步: 点击右上角",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: -313,
								centerX: -128,
								align: "left"
							},
							compId: 25
						}, {
							type: "Label",
							props: {
								y: 201,
								x: 369,
								width: 180,
								text: "三角标识",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: -313,
								centerX: 131,
								align: "left"
							},
							compId: 26
						}, {
							type: "Label",
							props: {
								y: 437,
								x: 35,
								width: 225,
								text: "第二步: 点击",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: -77,
								centerX: -181,
								align: "left"
							},
							compId: 28
						}, {
							type: "Label",
							props: {
								y: 437,
								x: 262,
								width: 201,
								text: "添加到桌面",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: -77,
								centerX: 34,
								align: "left"
							},
							compId: 29
						}, {
							type: "Label",
							props: {
								y: 725,
								x: 34,
								wordWrap: !0,
								width: 578,
								text: "第三步：关闭游戏，在                     找到 “完美投篮”并进入，就可以获得钻石 奖励啦！",
								height: 145,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: 259,
								centerX: -5,
								align: "left"
							},
							compId: 31
						}, {
							type: "Label",
							props: {
								y: 724,
								x: 399,
								width: 211,
								text: "我的小程序",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: 210,
								centerX: 176,
								align: "left"
							},
							compId: 32
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_bg2.png", "activity/icon_diamond.png", "activity/nn5.png", "activity/btn_close.png", "share/collect1.png", "share/collect3.png", "share/collect2.png"],
					loadList3D: []
				}, e.MoonCollectAndUI = i, Yi("ui.view.MoonCollectAndUI", i);
				class n extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(n.uiView)
					}
				}
				n.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							height: 1089,
							centerY: 5,
							centerX: 4
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								y: 12,
								x: 11,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 1066
							},
							compId: 5,
							child: [{
								type: "Label",
								props: {
									y: 20,
									x: 4,
									width: 638,
									text: "收藏有礼指南",
									height: 52,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 6
							}]
						}, {
							type: "Image",
							props: {
								y: 132,
								width: 597,
								skin: "activity/common_bg2.png",
								sizeGrid: "30,21,20,31",
								height: 66,
								centerX: 2
							},
							compId: 7,
							child: [{
								type: "Label",
								props: {
									y: 15,
									x: 38,
									width: 513,
									var: "txt_getInfo",
									height: 38,
									fontSize: 32,
									font: "黑体",
									color: "#ffffff",
									align: "center"
								},
								compId: 8
							}, {
								type: "Image",
								props: {
									y: 0,
									x: 516,
									width: 76,
									skin: "activity/icon_diamond.png",
									scaleY: .8,
									scaleX: .8,
									height: 80
								},
								compId: 9
							}]
						}, {
							type: "Image",
							props: {
								y: 258,
								x: 32,
								width: 602,
								skin: "share/collect2.png",
								height: 170,
								centerX: 0
							},
							compId: 13
						}, {
							type: "Image",
							props: {
								y: 507,
								x: 32,
								width: 602,
								skin: "share/collect4.png",
								height: 204,
								centerX: 0
							},
							compId: 16
						}, {
							type: "Sprite",
							props: {
								y: -24,
								x: 84,
								texture: "activity/nn5.png"
							},
							compId: 38
						}, {
							type: "Image",
							props: {
								y: 858,
								x: 32,
								width: 602,
								skin: "share/collect5.png",
								height: 170,
								centerX: 0
							},
							compId: 19
						}, {
							type: "Sprite",
							props: {
								y: 20,
								x: 574,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 39
						}, {
							type: "Sprite",
							props: {
								y: -23,
								x: 509,
								texture: "activity/nn5.png"
							},
							compId: 40
						}, {
							type: "Label",
							props: {
								x: 41,
								width: 363,
								text: "第一步: 点击右上角",
								height: 44,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: -317,
								centerX: -111,
								align: "left"
							},
							compId: 11
						}, {
							type: "Label",
							props: {
								x: 353,
								width: 166,
								text: "三角标识",
								height: 39,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: -317,
								centerX: 103,
								align: "left"
							},
							compId: 12
						}, {
							type: "Label",
							props: {
								x: 41,
								width: 205,
								text: "第二步: 点击",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: -75,
								centerX: -190,
								align: "left"
							},
							compId: 14
						}, {
							type: "Label",
							props: {
								x: 246,
								width: 190,
								text: "添加到桌面",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: -75,
								centerX: 8,
								align: "left"
							},
							compId: 15
						}, {
							type: "Label",
							props: {
								x: 41,
								wordWrap: !0,
								width: 584,
								text: "第三步：关闭游戏，在                 找到 “完美投篮”并进入，就可以获得钻石 奖励啦！",
								height: 145,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: 259,
								centerX: 0,
								align: "left"
							},
							compId: 17
						}, {
							type: "Label",
							props: {
								x: 405,
								width: 211,
								text: "手机桌面",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: 208,
								centerX: 177,
								align: "left"
							},
							compId: 18
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_bg2.png", "activity/icon_diamond.png", "share/collect2.png", "share/collect4.png", "activity/nn5.png", "share/collect5.png", "activity/btn_close.png"],
					loadList3D: []
				}, e.MoonCollectiOSUI = n, Yi("ui.view.MoonCollectiOSUI", n);
				class a extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(a.uiView)
					}
				}
				a.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 3
					}, {
						type: "Box",
						props: {
							width: 744,
							var: "pDuiHuan",
							height: 639,
							centerY: 0,
							centerX: 0
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								y: 1,
								x: 42,
								width: 666,
								var: "winBg",
								skin: "activity/nn1.png",
								sizeGrid: "58,58,58,58",
								height: 638
							},
							compId: 5
						}, {
							type: "Image",
							props: {
								y: 13,
								x: 52,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 491
							},
							compId: 6
						}, {
							type: "Image",
							props: {
								y: 354,
								x: 77,
								width: 596,
								skin: "activity/common_bg2.png",
								sizeGrid: "25,26,28,27",
								height: 93
							},
							compId: 7
						}, {
							type: "Image",
							props: {
								y: 159,
								width: 549,
								skin: "activity/777.png",
								sizeGrid: "0,62,0,69",
								scaleY: 1.1,
								scaleX: 1.1,
								height: 131,
								centerX: 0
							},
							compId: 8
						}, {
							type: "Sprite",
							props: {
								y: -29.5,
								x: 124.5,
								texture: "activity/nn5.png"
							},
							compId: 23
						}, {
							type: "Sprite",
							props: {
								y: 21,
								x: 616,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 24
						}, {
							type: "Sprite",
							props: {
								y: -24,
								x: 551,
								texture: "activity/nn5.png"
							},
							compId: 25
						}, {
							type: "Button",
							props: {
								y: 514,
								width: 308,
								var: "btn_exchangeAll",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								right: 60,
								height: 108
							},
							compId: 29,
							child: [{
								type: "Label",
								props: {
									y: 21.5,
									width: 280,
									var: "txt_exchangeAll",
									valign: "middle",
									text: "全部兑换",
									strokeColor: "#9e5410",
									stroke: 3,
									height: 67,
									fontSize: 40,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 30
							}]
						}, {
							type: "Button",
							props: {
								y: 514,
								width: 308,
								var: "btnDuiHuan",
								stateNum: 1,
								skin: "activity/common_btn3.png",
								sizeGrid: "42,42,42,42",
								left: 60,
								height: 108
							},
							compId: 9,
							child: [{
								type: "Label",
								props: {
									y: 21.5,
									width: 280,
									var: "txt_exchange",
									valign: "middle",
									text: "兑换",
									strokeColor: "#9e5410",
									stroke: 3,
									height: 67,
									fontSize: 40,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 26
							}]
						}, {
							type: "Image",
							props: {
								y: 237,
								x: 145,
								var: "btnJian",
								skin: "activity/888.png",
								sizeGrid: "18,18,18,18",
								pivotY: 64,
								pivotX: 50
							},
							compId: 11,
							child: [{
								type: "Image",
								props: {
									y: 55,
									x: 39,
									width: 40,
									skin: "activity/jj.png",
									height: 11
								},
								compId: 12
							}]
						}, {
							type: "Image",
							props: {
								y: 237,
								x: 586,
								var: "btnJia",
								skin: "activity/888.png",
								sizeGrid: "18,18,18,18",
								pivotY: 64,
								pivotX: 50
							},
							compId: 13,
							child: [{
								type: "Image",
								props: {
									y: 34,
									x: 37,
									skin: "activity/pp.png"
								},
								compId: 14
							}]
						}, {
							type: "Box",
							props: {
								y: 354,
								x: 77,
								width: 597,
								var: "labelBox",
								height: 94
							},
							compId: 15,
							child: [{
								type: "Image",
								props: {
									y: 6.5,
									x: 200.5,
									width: 77,
									var: "exchangeGold",
									skin: "activity/icon_diamond.png",
									height: 73
								},
								compId: 16
							}, {
								type: "Image",
								props: {
									y: 12,
									x: 520,
									var: "icRes",
									skin: "activity/icon_gold.png",
									scaleY: .6,
									scaleX: .6
								},
								compId: 17
							}, {
								type: "Image",
								props: {
									y: 28,
									x: 277.5,
									skin: "activity/999.png"
								},
								compId: 18
							}, {
								type: "Label",
								props: {
									y: 5,
									x: 19,
									width: 186,
									var: "itNumZuan",
									valign: "middle",
									text: "利用 1",
									height: 86,
									fontSize: 36,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 19
							}, {
								type: "Label",
								props: {
									y: 4,
									x: 324,
									width: 200,
									var: "itNumResult",
									valign: "middle",
									text: "获得 3K",
									height: 86,
									fontSize: 36,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 20
							}]
						}, {
							type: "Label",
							props: {
								y: 26,
								x: 130.5,
								width: 489,
								var: "exchangeTitle",
								valign: "middle",
								text: "兑换金币",
								height: 63,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 21
						}, {
							type: "Label",
							props: {
								y: 190,
								x: 259,
								width: 232,
								var: "itNum",
								valign: "middle",
								text: "99",
								height: 86,
								fontSize: 60,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 22
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_bg2.png", "activity/777.png", "activity/nn5.png", "activity/btn_close.png", "activity/common_btn1.png", "activity/common_btn3.png", "activity/888.png", "activity/jj.png", "activity/pp.png", "activity/icon_diamond.png", "activity/icon_gold.png", "activity/999.png"],
					loadList3D: []
				}, e.MoonExchangeUI = a, Yi("ui.view.MoonExchangeUI", a);
				class o extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(o.uiView)
					}
				}
				o.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							mouseThrough: !1,
							height: 1160,
							centerY: -1,
							centerX: 0
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 894,
								centerY: -123,
								centerX: 2
							},
							compId: 7,
							child: [{
								type: "List",
								props: {
									y: 118,
									width: 622,
									var: "list",
									spaceY: 5,
									spaceX: 30,
									repeatX: 1,
									name: "render",
									height: 738,
									centerX: -1
								},
								compId: 9,
								child: [{
									type: "Box",
									props: {
										y: 0,
										x: 4,
										width: 618,
										renderType: "render",
										height: 143
									},
									compId: 53,
									child: [{
										type: "Image",
										props: {
											width: 613,
											skin: "activity/common_bg2.png",
											sizeGrid: "19,16,18,21",
											height: 137
										},
										compId: 40
									}, {
										type: "Image",
										props: {
											width: 100,
											var: "img_icon",
											sizeGrid: "7,7,8,5",
											scaleY: 1,
											scaleX: 1,
											name: "img_icon",
											height: 100,
											centerY: -3,
											centerX: -234
										},
										compId: 41
									}, {
										type: "Image",
										props: {
											y: 65,
											x: 464,
											width: 235,
											visible: !0,
											var: "btn_try",
											skin: "activity/common_btn1.png",
											sizeGrid: "42,42,42,42",
											pivotY: 46.5,
											pivotX: 107,
											name: "btn_try",
											height: 96
										},
										compId: 42,
										child: [{
											type: "Label",
											props: {
												y: 26,
												width: 157,
												valign: "middle",
												text: "试玩",
												strokeColor: "#c85d21",
												stroke: 3,
												scaleY: 1,
												scaleX: 1,
												height: 40,
												fontSize: 32,
												font: "黑体",
												color: "#ffffff",
												centerX: 0,
												bold: !0,
												align: "center"
											},
											compId: 47
										}, {
											type: "Image",
											props: {
												y: 4,
												x: 148,
												visible: !1,
												skin: "activity/icon_diamond.png",
												scaleY: .7,
												scaleX: .7
											},
											compId: 48
										}]
									}, {
										type: "Label",
										props: {
											y: 43.5,
											x: 165,
											width: 209,
											var: "txt_name",
											valign: "middle",
											text: "游戏名字",
											scaleY: 1,
											scaleX: 1,
											name: "txt_name",
											height: 50,
											fontSize: 32,
											font: "黑体",
											color: "#ffffff",
											bold: !0,
											align: "left"
										},
										compId: 43
									}, {
										type: "Image",
										props: {
											y: 86,
											x: 480,
											width: 235,
											var: "btn_got",
											skin: "activity/common_btn1.png",
											sizeGrid: "42,42,42,42",
											pivotY: 46.5,
											pivotX: 107,
											name: "btn_got",
											height: 96
										},
										compId: 44,
										child: [{
											type: "Label",
											props: {
												y: 23.5,
												width: 157,
												valign: "middle",
												text: "已领取",
												strokeColor: "#cf802e",
												scaleY: 1,
												scaleX: 1,
												height: 45,
												fontSize: 32,
												font: "黑体",
												color: "#a3621c",
												centerX: 0,
												bold: !0,
												align: "center"
											},
											compId: 49
										}]
									}, {
										type: "Image",
										props: {
											y: 80,
											x: 480,
											width: 235,
											visible: !1,
											var: "btn_tryed",
											skin: "activity/common_btn1.png",
											sizeGrid: "42,42,42,42",
											pivotY: 46.5,
											pivotX: 107,
											name: "btn_tryed",
											height: 96
										},
										compId: 45,
										child: [{
											type: "Label",
											props: {
												y: 47,
												width: 171,
												valign: "middle",
												text: "立即试玩",
												strokeColor: "#b97022",
												stroke: 3,
												scaleY: 1,
												scaleX: 1,
												pivotY: 21,
												pivotX: 86,
												height: 41,
												fontSize: 32,
												font: "黑体",
												color: "#ffffff",
												centerX: 0,
												bold: !0,
												align: "center"
											},
											compId: 50
										}]
									}, {
										type: "Image",
										props: {
											width: 235,
											visible: !1,
											var: "btn_get",
											skin: "activity/common_btn3.png",
											sizeGrid: "42,42,42,42",
											right: 107,
											pivotY: 46.5,
											pivotX: 107,
											name: "btn_get",
											height: 96,
											centerY: -5
										},
										compId: 46,
										child: [{
											type: "Label",
											props: {
												y: 29,
												width: 124,
												valign: "middle",
												text: "领取10",
												strokeColor: "#cf802e",
												scaleY: 1,
												scaleX: 1,
												height: 35,
												fontSize: 32,
												font: "黑体",
												color: "#ffffff",
												centerX: -34,
												bold: !0,
												align: "center"
											},
											compId: 51
										}, {
											type: "Image",
											props: {
												y: 4.5,
												x: 139,
												visible: !0,
												skin: "activity/icon_diamond.png",
												scaleY: .7,
												scaleX: .7
											},
											compId: 52
										}]
									}]
								}]
							}]
						}, {
							type: "Sprite",
							props: {
								y: -28,
								x: 87.5,
								texture: "activity/nn5.png"
							},
							compId: 24
						}, {
							type: "Sprite",
							props: {
								y: 22,
								x: 576,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 25
						}, {
							type: "Sprite",
							props: {
								y: -28,
								x: 511,
								texture: "activity/nn5.png"
							},
							compId: 26
						}, {
							type: "Label",
							props: {
								y: 32,
								x: 100,
								width: 467,
								text: "新游试玩",
								height: 47,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 6
						}, {
							type: "Label",
							props: {
								y: 1105,
								width: 329,
								text: "猜你喜欢",
								height: 40,
								fontSize: 36,
								font: "黑体",
								color: "#77f9ff",
								centerX: 0,
								align: "center"
							},
							compId: 11
						}, {
							type: "Image",
							props: {
								y: 912,
								width: 150,
								var: "btn_guess0",
								skin: "activity/common_bg4.png",
								sizeGrid: "24,25,23,22",
								height: 175,
								centerX: -238
							},
							compId: 12,
							child: [{
								type: "Image",
								props: {
									x: 340,
									width: 100,
									var: "img_icon0",
									scaleY: 1,
									scaleX: 1,
									height: 100,
									centerY: -21,
									centerX: 0
								},
								compId: 13
							}, {
								type: "Label",
								props: {
									width: 149,
									var: "txt_name0",
									text: "游戏名字",
									height: 36,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerY: 62,
									centerX: 0,
									bold: !1,
									align: "center"
								},
								compId: 14
							}]
						}, {
							type: "Image",
							props: {
								y: 912,
								width: 150,
								var: "btn_guess1",
								skin: "activity/common_bg4.png",
								sizeGrid: "24,25,23,22",
								height: 175,
								centerX: -79
							},
							compId: 15,
							child: [{
								type: "Image",
								props: {
									y: 23,
									x: -160,
									width: 100,
									var: "img_icon1",
									scaleY: 1,
									scaleX: 1,
									height: 100,
									centerY: -21,
									centerX: 0
								},
								compId: 16
							}, {
								type: "Label",
								props: {
									y: 138,
									x: -184,
									width: 149,
									var: "txt_name1",
									text: "游戏名字",
									height: 36,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerY: 62,
									centerX: 0,
									align: "center"
								},
								compId: 17
							}]
						}, {
							type: "Image",
							props: {
								y: 912,
								width: 150,
								var: "btn_guess2",
								skin: "activity/common_bg4.png",
								sizeGrid: "24,25,23,22",
								height: 175,
								centerX: 80
							},
							compId: 18,
							child: [{
								type: "Image",
								props: {
									y: 23,
									x: -160,
									width: 100,
									var: "img_icon2",
									scaleY: 1,
									scaleX: 1,
									height: 100,
									centerY: -21,
									centerX: 0
								},
								compId: 19
							}, {
								type: "Label",
								props: {
									y: 138,
									x: -184,
									width: 149,
									var: "txt_name2",
									text: "游戏名字",
									height: 36,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerY: 62,
									centerX: 0,
									align: "center"
								},
								compId: 20
							}]
						}, {
							type: "Image",
							props: {
								y: 912,
								width: 150,
								var: "btn_guess3",
								skin: "activity/common_bg4.png",
								sizeGrid: "24,25,23,22",
								height: 175,
								centerX: 239
							},
							compId: 21,
							child: [{
								type: "Image",
								props: {
									y: 27,
									x: -160,
									width: 100,
									var: "img_icon3",
									scaleY: 1,
									scaleX: 1,
									height: 100,
									centerY: -21,
									centerX: 0
								},
								compId: 22
							}, {
								type: "Label",
								props: {
									y: 142,
									x: -184,
									width: 149,
									var: "txt_name3",
									text: "游戏名字",
									height: 36,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerY: 62,
									centerX: 0,
									align: "center"
								},
								compId: 23
							}]
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_bg2.png", "activity/common_btn1.png", "activity/icon_diamond.png", "activity/common_btn3.png", "activity/nn5.png", "activity/btn_close.png", "activity/common_bg4.png"],
					loadList3D: []
				}, e.MoonGameUI = o, Yi("ui.view.MoonGameUI", o);
				class s extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(s.uiView)
					}
				}
				s.uiView = {
					type: "View",
					props: {
						width: 769,
						name: "bg",
						height: 1663
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							width: 560,
							skin: "gongyong/xiaojiemian.png",
							scaleY: 1,
							scaleX: 1,
							height: 584,
							centerY: -205,
							centerX: 0
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								width: 52,
								var: "btn_close",
								top: 0,
								skin: "gongyong/mission_close.png",
								scaleY: 2,
								scaleX: 2,
								right: 7,
								height: 51
							},
							compId: 16
						}, {
							type: "Image",
							props: {
								y: 0,
								x: -33,
								skin: "gongyong/jinpingtuij.png"
							},
							compId: 19
						}, {
							type: "Image",
							props: {
								width: 473,
								skin: "gongyong/touxiangdi.png",
								height: 425,
								centerX: -16,
								bottom: 45
							},
							compId: 22,
							child: [{
								type: "List",
								props: {
									width: 437,
									var: "list",
									top: 19,
									spaceY: 10,
									spaceX: 10,
									runtime: "moon/core/ui/extension/ListEx.ts",
									repeatX: 4,
									left: 9,
									height: 390
								},
								compId: 10,
								child: [{
									type: "Box",
									props: {
										y: 0,
										x: 0,
										width: 100,
										scaleY: 1,
										scaleX: 1,
										name: "render",
										height: 100
									},
									compId: 11,
									child: [{
										type: "Image",
										props: {
											width: 100,
											visible: !0,
											skin: "gongyong/1.png",
											scaleY: 1,
											scaleX: 1,
											name: "img_icon",
											left: 5,
											height: 100
										},
										compId: 13
									}, {
										type: "Label",
										props: {
											y: 114,
											x: 64,
											width: 140,
											visible: !1,
											valign: "middle",
											text: "我是弹弹高手",
											strokeColor: "#ffffff",
											stroke: 1,
											name: "name",
											fontSize: 22,
											font: "Arial",
											color: "#000000",
											centerX: 0,
											bold: !0,
											anchorY: .5,
											anchorX: .5,
											align: "center"
										},
										compId: 14
									}]
								}]
							}]
						}]
					}],
					loadList: ["gongyong/xiaojiemian.png", "gongyong/mission_close.png", "gongyong/jinpingtuij.png", "gongyong/touxiangdi.png", "gongyong/1.png"],
					loadList3D: []
				}, e.MoonGameBoxUI = s, Yi("ui.view.MoonGameBoxUI", s);
				class r extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(r.uiView)
					}
				}
				r.uiView = {
					type: "View",
					props: {
						width: 750,
						mouseThrough: !0,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Box",
						props: {
							y: 415,
							width: 523,
							var: "newgame",
							right: -366,
							height: 660
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								width: 523,
								var: "bg",
								skin: "activity/newgame_frame1.png",
								sizeGrid: "28,17,16,33",
								right: 0,
								height: 660,
								centerY: 0
							},
							compId: 4,
							child: [{
								type: "Image",
								props: {
									y: -31,
									x: 14,
									width: 136,
									var: "img_text",
									skin: "activity/newgame_text.png",
									height: 40
								},
								compId: 22
							}]
						}, {
							type: "Image",
							props: {
								y: 571,
								x: -42,
								width: 47,
								var: "btn_open",
								skin: "activity/newgame_frame2.png",
								height: 90
							},
							compId: 5,
							child: [{
								type: "Image",
								props: {
									y: 65,
									x: 34,
									var: "img_arrow",
									skin: "activity/999.png",
									rotation: -180,
									centerY: 0,
									centerX: 0,
									anchorY: .5,
									anchorX: .5
								},
								compId: 6
							}]
						}, {
							type: "List",
							props: {
								width: 501,
								var: "list",
								spaceY: 10,
								spaceX: 10,
								repeatY: 4,
								repeatX: 4,
								name: "render",
								height: 621,
								centerY: 0,
								centerX: 0
							},
							compId: 7,
							child: [{
								type: "Box",
								props: {
									renderType: "render"
								},
								compId: 23,
								child: [{
									type: "Image",
									props: {
										width: 117,
										skin: "activity/common_bg2.png",
										sizeGrid: "25,26,28,27",
										name: "btn_game",
										height: 148,
										centerY: 1,
										centerX: 4
									},
									compId: 24,
									child: [{
										type: "Image",
										props: {
											width: 84,
											name: "img_icon",
											height: 84,
											centerY: -19,
											centerX: 0
										},
										compId: 25
									}, {
										type: "Label",
										props: {
											y: 109,
											x: 9.5,
											width: 98,
											overflow: "hidden",
											name: "txt_name",
											height: 27,
											fontSize: 24,
											color: "#ffffff",
											align: "center"
										},
										compId: 26
									}]
								}]
							}]
						}, {
							type: "Box",
							props: {
								y: 16,
								x: 21,
								width: 129,
								var: "box",
								height: 628
							},
							compId: 9,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 3,
									width: 117,
									var: "btn_game0",
									skin: "activity/common_bg2.png",
									sizeGrid: "25,26,28,27",
									height: 148
								},
								compId: 10,
								child: [{
									type: "Image",
									props: {
										width: 84,
										var: "img_icon0",
										height: 84,
										centerY: -19,
										centerX: 0
									},
									compId: 11
								}, {
									type: "Label",
									props: {
										y: 107,
										x: 10,
										width: 98,
										var: "txt_name0",
										overflow: "hidden",
										height: 27,
										fontSize: 24,
										color: "#ffffff",
										align: "center"
									},
									compId: 12
								}]
							}, {
								type: "Image",
								props: {
									y: 160,
									x: 3,
									width: 117,
									var: "btn_game1",
									skin: "activity/common_bg2.png",
									sizeGrid: "25,26,28,27",
									height: 148
								},
								compId: 13,
								child: [{
									type: "Image",
									props: {
										width: 84,
										var: "img_icon1",
										height: 84,
										centerY: -19,
										centerX: 0
									},
									compId: 14
								}, {
									type: "Label",
									props: {
										y: 107,
										x: 10,
										width: 98,
										var: "txt_name1",
										overflow: "hidden",
										height: 27,
										fontSize: 24,
										color: "#ffffff",
										align: "center"
									},
									compId: 15
								}]
							}, {
								type: "Image",
								props: {
									y: 320,
									x: 3,
									width: 117,
									var: "btn_game2",
									skin: "activity/common_bg2.png",
									sizeGrid: "25,26,28,27",
									height: 148
								},
								compId: 16,
								child: [{
									type: "Image",
									props: {
										width: 84,
										var: "img_icon2",
										height: 84,
										centerY: -19,
										centerX: 0
									},
									compId: 17
								}, {
									type: "Label",
									props: {
										y: 107,
										x: 10,
										width: 98,
										var: "txt_name2",
										overflow: "hidden",
										height: 27,
										fontSize: 24,
										color: "#ffffff",
										align: "center"
									},
									compId: 18
								}]
							}, {
								type: "Image",
								props: {
									y: 480,
									x: 3,
									width: 117,
									var: "btn_game3",
									skin: "activity/common_bg2.png",
									sizeGrid: "25,26,28,27",
									height: 148
								},
								compId: 19,
								child: [{
									type: "Image",
									props: {
										width: 84,
										var: "img_icon3",
										height: 84,
										centerY: -21,
										centerX: 0
									},
									compId: 20
								}, {
									type: "Label",
									props: {
										y: 107,
										x: 10,
										width: 98,
										var: "txt_name3",
										overflow: "hidden",
										height: 27,
										fontSize: 24,
										color: "#ffffff",
										align: "center"
									},
									compId: 21
								}]
							}]
						}]
					}],
					loadList: ["activity/newgame_frame1.png", "activity/newgame_text.png", "activity/newgame_frame2.png", "activity/999.png", "activity/common_bg2.png"],
					loadList3D: []
				}, e.MoonGameSideBarUI = r, Yi("ui.view.MoonGameSideBarUI", r);
				class l extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(l.uiView)
					}
				}
				l.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 4
					}, {
						type: "Box",
						props: {
							centerY: -145,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 6,
						child: [{
							type: "Animation",
							props: {
								y: -1,
								x: 0,
								var: "getAni",
								source: "animation/fx_glow.ani"
							},
							compId: 3
						}]
					}, {
						type: "Image",
						props: {
							width: 179,
							var: "img_ball",
							skin: "gskin/Ball0.png",
							height: 179,
							centerY: -147,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 5,
						child: [{
							type: "Image",
							props: {
								y: 0,
								x: 0,
								width: 179,
								visible: !1,
								var: "img_basket",
								skin: "gskin/Basket6_1.png",
								height: 179
							},
							compId: 10
						}]
					}, {
						type: "Label",
						props: {
							y: 851,
							x: 375,
							width: 389,
							text: "恭喜获得新的皮肤!",
							height: 70,
							fontSize: 50,
							color: "#ffffff",
							centerY: 184,
							centerX: 0,
							anchorY: .5,
							anchorX: .5,
							align: "center"
						},
						compId: 7
					}, {
						type: "Image",
						props: {
							var: "img_gx",
							skin: "activity-i/z9.png",
							centerY: -447,
							centerX: 0
						},
						compId: 8
					}, {
						type: "Button",
						props: {
							width: 310,
							var: "btn",
							stateNum: 1,
							skin: "activity/common_btn1.png",
							sizeGrid: "42,42,42,42",
							height: 95,
							centerY: 300,
							centerX: 0
						},
						compId: 11,
						child: [{
							type: "Label",
							props: {
								y: 38,
								width: 156,
								valign: "middle",
								text: "立刻使用",
								strokeColor: "#c06c1e",
								stroke: 3,
								pivotY: 26,
								height: 61,
								fontSize: 38,
								font: "黑体",
								color: "#ffffff",
								centerX: 0,
								bold: !0,
								align: "left"
							},
							compId: 13
						}]
					}],
					animations: [{
						nodes: [{
							target: 5,
							keyframes: {
								skewY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewY",
									index: 13
								}],
								skewX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewX",
									index: 13
								}],
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 17
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									label: null,
									key: "scaleY",
									index: 20
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 17
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									label: null,
									key: "scaleX",
									index: 20
								}],
								rotation: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 17
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 20
								}, {
									value: -30,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 24
								}, {
									value: 30,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 29
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 34
								}]
							}
						}, {
							target: 7,
							keyframes: {
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 17
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 17
								}]
							}
						}],
						name: "ani1",
						id: 1,
						frameRate: 30,
						action: 0
					}],
					loadList: ["activity/common_bg5.png", "animation/fx_glow.ani", "gskin/Ball0.png", "gskin/Basket6_1.png", "activity-i/z9.png", "activity/common_btn1.png"],
					loadList3D: []
				}, e.MoonGetSkinUI = l, Yi("ui.view.MoonGetSkinUI", l);
				class d extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(d.uiView)
					}
				}
				d.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							y: 812,
							x: 130.5,
							skin: "common/mugen_001.png"
						},
						compId: 36
					}, {
						type: "Image",
						props: {
							y: 939,
							x: 118,
							skin: "common/hand_001.png",
							scaleY: .15,
							scaleX: .15
						},
						compId: 35
					}],
					animations: [{
						nodes: [{
							target: 35,
							keyframes: {
								y: [{
									value: 936,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 0
								}, {
									value: 999,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 3
								}, {
									value: 1042,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 6
								}, {
									value: 1004,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 9
								}, {
									value: 936,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 12
								}, {
									value: 852,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 15
								}, {
									value: 822,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 18
								}, {
									value: 853,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 21
								}, {
									value: 936,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 24
								}, {
									value: 980,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 27
								}, {
									value: 1041,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 30
								}, {
									value: 1001,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 33
								}, {
									value: 936,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 36
								}, {
									value: 847,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 39
								}, {
									value: 822,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 42
								}, {
									value: 864,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 45
								}, {
									value: 936,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "y",
									index: 48
								}],
								x: [{
									value: 121,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 0
								}, {
									value: 145,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 3
								}, {
									value: 227,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 6
								}, {
									value: 308,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 9
								}, {
									value: 350,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 12
								}, {
									value: 392,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 15
								}, {
									value: 469,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 18
								}, {
									value: 544,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 21
								}, {
									value: 581,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 24
								}, {
									value: 566.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 27
								}, {
									value: 473,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 30
								}, {
									value: 385,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 33
								}, {
									value: 350,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 36
								}, {
									value: 295,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 39
								}, {
									value: 228,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 42
								}, {
									value: 150,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 45
								}, {
									value: 120,
									tweenMethod: "linearNone",
									tween: !0,
									target: 35,
									key: "x",
									index: 48
								}]
							}
						}],
						name: "Ani_Gesture",
						id: 1,
						frameRate: 24,
						action: 0
					}],
					loadList: ["common/mugen_001.png", "common/hand_001.png"],
					loadList3D: []
				}, e.MoonGuideGestureViewUI = d, Yi("ui.view.MoonGuideGestureViewUI", d);
				class h extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(h.uiView)
					}
				}
				h.uiView = {
					type: "View",
					props: {
						width: 750,
						top: 0,
						right: 0,
						mouseThrough: !0,
						left: 0,
						height: 1334,
						bottom: 0
					},
					compId: 2,
					child: [{
						type: "Button",
						props: {
							var: "btn_shake",
							stateNum: 1,
							skin: "activity/vibrate_on.png",
							pivotY: 47,
							pivotX: 47,
							mouseThrough: !1,
							left: 23,
							height: 94,
							bottom: 328
						},
						compId: 5
					}, {
						type: "Button",
						props: {
							width: 94,
							var: "btn_sound",
							stateNum: 1,
							skin: "activity/sound_on.png",
							pivotY: 47,
							pivotX: 47,
							left: 23,
							height: 94,
							bottom: 438
						},
						compId: 6
					}, {
						type: "Button",
						props: {
							width: 123,
							var: "btn_gift",
							top: 450,
							stateNum: 1,
							skin: "activity/giftbox2.png",
							left: 23
						},
						compId: 85,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 88,
								var: "red_gift",
								texture: "activity/icon_red_point.png"
							},
							compId: 97
						}]
					}, {
						type: "Button",
						props: {
							width: 94,
							var: "btn_rank",
							stateNum: 1,
							skin: "activity/rank.png",
							pivotY: 47,
							pivotX: 47,
							left: 23,
							height: 94,
							bottom: 219
						},
						compId: 8
					}, {
						type: "Box",
						props: {
							width: 131,
							visible: !1,
							var: "gameGround",
							top: 143,
							mouseThrough: !1,
							left: 23,
							hitTestPrior: !0,
							height: 127
						},
						compId: 35,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 0,
								var: "btnGameGround",
								texture: "activity/game_ground.png"
							},
							compId: 36,
							child: [{
								type: "Sprite",
								props: {
									y: 0,
									x: 104,
									var: "groundTip",
									texture: "activity/icon_red_point.png"
								},
								compId: 37
							}]
						}]
					}, {
						type: "Box",
						props: {
							width: 123,
							var: "addFriend",
							top: 294,
							right: 23,
							height: 127
						},
						compId: 47,
						child: [{
							type: "Sprite",
							props: {
								y: 0,
								x: 0,
								var: "friendBtn",
								texture: "activity/addFriend.png"
							},
							compId: 48,
							child: [{
								type: "Sprite",
								props: {
									y: 0,
									x: 88,
									var: "friendTip",
									texture: "activity/icon_red_point.png"
								},
								compId: 49
							}]
						}]
					}, {
						type: "Box",
						props: {
							width: 154,
							var: "coin",
							right: 36,
							height: 216,
							bottom: 245
						},
						compId: 50,
						child: [{
							type: "Image",
							props: {
								y: 5,
								x: 3.15771484375,
								width: 147,
								skin: "activity/plate.png",
								height: 209
							},
							compId: 51
						}, {
							type: "Label",
							props: {
								y: 144,
								x: 32.15771484375,
								width: 89,
								var: "itCoinVal",
								text: "0",
								height: 32,
								fontSize: 32,
								color: "#fffb8a",
								bold: !0,
								align: "center"
							},
							compId: 54
						}, {
							type: "Image",
							props: {
								y: -2,
								x: -4,
								var: "pgsCoin",
								skin: "activity/coinLight.png"
							},
							compId: 86,
							child: [{
								type: "Sprite",
								props: {
									y: 81,
									x: 80,
									width: 61.6,
									visible: !1,
									name: "sp",
									height: 16,
									alpha: 1
								},
								compId: 87
							}]
						}, {
							type: "Sprite",
							props: {
								y: 19,
								x: 17,
								visible: !0,
								var: "btn_coin",
								texture: "activity/icon_gold.png"
							},
							compId: 53
						}]
					}, {
						type: "Box",
						props: {
							width: 123,
							var: "btnGem",
							top: 450,
							right: 23,
							height: 124
						},
						compId: 58,
						child: [{
							type: "Sprite",
							props: {
								var: "imgSupply",
								texture: "activity/supply.png"
							},
							compId: 59
						}, {
							type: "Sprite",
							props: {
								y: 0,
								x: 88,
								var: "gemTip",
								texture: "activity/icon_red_point2.png"
							},
							compId: 62,
							child: [{
								type: "Label",
								props: {
									y: 12.25,
									x: 13.3125,
									width: 30,
									var: "supply_num",
									text: "10",
									strokeColor: "#8e3b30",
									stroke: 3,
									fontSize: 26,
									font: "黑体",
									color: "#ffffff",
									bold: !0
								},
								compId: 63
							}]
						}, {
							type: "Image",
							props: {
								x: -276,
								width: 268,
								var: "supply_remind",
								skin: "activity/supply_fra.png",
								height: 72,
								centerY: 0
							},
							compId: 69,
							child: [{
								type: "Label",
								props: {
									y: 22,
									text: "大量补给箱来袭!",
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0
								},
								compId: 61
							}]
						}]
					}, {
						type: "Box",
						props: {
							visible: !1,
							var: "box_games",
							top: 294,
							left: 23
						},
						compId: 38,
						child: [{
							type: "Button",
							props: {
								var: "btn_games",
								stateNum: 1,
								skin: "activity/btn_games.png"
							},
							compId: 71,
							child: [{
								type: "Sprite",
								props: {
									y: 0,
									x: 88,
									var: "red_games",
									texture: "activity/icon_red_point.png"
								},
								compId: 40
							}]
						}]
					}, {
						type: "Box",
						props: {
							width: 123,
							var: "box_service",
							top: 143,
							right: 23,
							height: 124
						},
						compId: 32,
						child: [{
							type: "Sprite",
							props: {
								var: "btn_service",
								texture: "activity/btn_kefu.png"
							},
							compId: 33,
							child: [{
								type: "Sprite",
								props: {
									y: 0,
									x: 88,
									var: "red_service",
									texture: "activity/icon_red_point.png"
								},
								compId: 34
							}]
						}]
					}],
					animations: [{
						nodes: [],
						name: "shakeBall",
						id: 1,
						frameRate: 30,
						action: 0
					}, {
						nodes: [],
						name: "beginFont",
						id: 2,
						frameRate: 24,
						action: 0
					}, {
						nodes: [{
							target: 69,
							keyframes: {
								x: [{
									value: -276,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									key: "x",
									index: 0
								}, {
									value: -293,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									key: "x",
									index: 5
								}, {
									value: -276,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									key: "x",
									index: 10
								}, {
									value: -293,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									key: "x",
									index: 15
								}, {
									value: -276,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									key: "x",
									index: 20
								}, {
									value: -276,
									tweenMethod: "linearNone",
									tween: !0,
									target: 69,
									label: null,
									key: "x",
									index: 35
								}]
							}
						}],
						name: "ani_shakeBox",
						id: 3,
						frameRate: 24,
						action: 0
					}],
					loadList: ["activity/vibrate_on.png", "activity/sound_on.png", "activity/giftbox2.png", "activity/icon_red_point.png", "activity/rank.png", "activity/game_ground.png", "activity/addFriend.png", "activity/plate.png", "activity/coinLight.png", "activity/icon_gold.png", "activity/supply.png", "activity/icon_red_point2.png", "activity/supply_fra.png", "activity/btn_games.png", "activity/btn_kefu.png"],
					loadList3D: []
				}, e.MoonIndexUI = h, Yi("ui.view.MoonIndexUI", h);
				class c extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(c.uiView)
					}
				}
				c.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							height: 1065,
							centerY: -12,
							centerX: 0
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 875,
								centerY: -83,
								centerX: 0
							},
							compId: 7,
							child: [{
								type: "Text",
								props: {
									y: 22,
									x: 3,
									width: 642,
									var: "txt_title",
									text: "邀请好友领钻石",
									height: 48,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center",
									runtime: "Laya.Text"
								},
								compId: 8
							}]
						}, {
							type: "Sprite",
							props: {
								y: -28.5,
								x: 86,
								texture: "activity/nn5.png"
							},
							compId: 32
						}, {
							type: "Sprite",
							props: {
								y: 22,
								x: 575,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 33
						}, {
							type: "Sprite",
							props: {
								y: -28,
								x: 510,
								texture: "activity/nn5.png"
							},
							compId: 34
						}, {
							type: "Label",
							props: {
								width: 626,
								var: "txt_info",
								text: "新用户通过您的邀请来到游戏，即可获得钻石",
								height: 35,
								fontSize: 28,
								font: "黑体",
								color: "#ffffff",
								centerY: 382,
								centerX: 2,
								align: "center"
							},
							compId: 10
						}, {
							type: "Button",
							props: {
								width: 509,
								var: "btn_share",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								height: 104,
								centerY: 461,
								centerX: 2
							},
							compId: 11,
							child: [{
								type: "Image",
								props: {
									skin: "activity/icon_diamond.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -4,
									centerX: 190
								},
								compId: 12
							}, {
								type: "Label",
								props: {
									y: 28,
									x: 90,
									width: 347,
									var: "txt_shareBtn",
									text: "邀请好友领钻石",
									strokeColor: "#783d20",
									stroke: 3,
									height: 48,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0
								},
								compId: 13
							}]
						}, {
							type: "Label",
							props: {
								width: 494,
								visible: !1,
								var: "lbl_id",
								text: "我的ID:",
								overflow: "hidden",
								height: 45,
								fontSize: 36,
								font: "黑体",
								color: "#5cacff",
								centerY: 515,
								centerX: 0,
								align: "center"
							},
							compId: 17
						}, {
							type: "Image",
							props: {
								y: 118,
								width: 641,
								var: "img_rank",
								height: 755,
								centerX: 0
							},
							compId: 5,
							child: [{
								type: "List",
								props: {
									width: 616,
									var: "list",
									spaceY: 5,
									spaceX: 30,
									repeatY: 0,
									repeatX: 1,
									name: "render",
									height: 717,
									centerY: -7,
									centerX: 1
								},
								compId: 18,
								child: [{
									type: "Box",
									props: {
										y: -1,
										width: 617,
										renderType: "render",
										height: 116,
										centerX: 0
									},
									compId: 19,
									child: [{
										type: "Image",
										props: {
											y: -1,
											width: 617,
											skin: "activity/common_bg2.png",
											sizeGrid: "19,16,18,21",
											name: "img_bg",
											height: 116,
											centerX: 0
										},
										compId: 20,
										child: [{
											type: "Label",
											props: {
												y: 38,
												x: 3,
												width: 75,
												valign: "middle",
												text: "999",
												scaleY: 1,
												scaleX: 1,
												name: "lbl_index",
												height: 39,
												fontSize: 36,
												color: "#ffffff",
												align: "center"
											},
											compId: 25
										}, {
											type: "Image",
											props: {
												x: 84,
												width: 68,
												skin: "activity/icon4.png",
												sizeGrid: "7,7,8,5",
												name: "img_head",
												height: 68,
												centerY: 0
											},
											compId: 21
										}, {
											type: "Label",
											props: {
												y: 36,
												x: 166,
												width: 275,
												visible: !1,
												valign: "middle",
												text: "XXX",
												scaleY: 1,
												scaleX: 1,
												overflow: "hidden",
												name: "lbl_name",
												height: 40,
												fontSize: 36,
												color: "#ffffff",
												align: "left"
											},
											compId: 26
										}, {
											type: "Label",
											props: {
												y: 41,
												x: 163,
												width: 209,
												visible: !1,
												var: "lbl_info",
												valign: "middle",
												text: "邀请+200",
												scaleY: 1,
												scaleX: 1,
												name: "lbl_info",
												height: 39,
												fontSize: 36,
												font: "黑体",
												color: "#ffffff",
												align: "left"
											},
											compId: 30,
											child: [{
												type: "Image",
												props: {
													y: -6,
													x: 163,
													skin: "activity/icon_diamond.png",
													scaleY: .5,
													scaleX: .5
												},
												compId: 31
											}]
										}]
									}, {
										type: "Image",
										props: {
											y: 23,
											x: 449,
											width: 244,
											skin: "activity/common_btn1.png",
											sizeGrid: "50,50,48,50",
											scaleY: .6,
											scaleX: .6,
											name: "btn_get",
											height: 113
										},
										compId: 22,
										child: [{
											type: "Image",
											props: {
												y: 16,
												x: 159,
												width: 102,
												skin: "activity/icon_diamond.png",
												scaleY: .7,
												scaleX: .7,
												height: 102
											},
											compId: 23
										}, {
											type: "Label",
											props: {
												y: 35,
												x: 45,
												width: 95,
												text: "领取",
												strokeColor: "#af6018",
												stroke: 4,
												height: 44,
												fontSize: 36,
												font: "黑体",
												color: "#ffffff",
												align: "center"
											},
											compId: 24
										}]
									}, {
										type: "Image",
										props: {
											y: 22,
											x: 449,
											width: 244,
											visible: !1,
											skin: "activity/common_btn1.png",
											scaleY: .6,
											scaleX: .6,
											name: "btn_not",
											height: 113,
											gray: !0
										},
										compId: 28,
										child: [{
											type: "Label",
											props: {
												y: 32.5,
												x: 52,
												width: 140,
												text: "未邀请",
												height: 40,
												fontSize: 36,
												font: "黑体",
												color: "#ffffff",
												align: "center"
											},
											compId: 29
										}]
									}, {
										type: "Label",
										props: {
											x: 472,
											width: 75,
											visible: !1,
											valign: "middle",
											text: "已领取",
											scaleY: 1,
											scaleX: 1,
											name: "lbl_has",
											height: 25,
											fontSize: 36,
											color: "#024181",
											centerY: 2,
											align: "center"
										},
										compId: 27
									}]
								}]
							}]
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/nn5.png", "activity/btn_close.png", "activity/common_btn1.png", "activity/icon_diamond.png", "activity/common_bg2.png", "activity/icon4.png"],
					loadList3D: []
				}, e.MoonInviteUI = c, Yi("ui.view.MoonInviteUI", c);
				class p extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(p.uiView)
					}
				}
				p.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 1,
					child: [{
						type: "Box",
						props: {
							y: 0,
							x: 383,
							width: 523,
							var: "levelbox",
							scaleY: .7,
							scaleX: .7,
							pivotX: 262,
							height: 284
						},
						compId: 44,
						child: [{
							type: "Image",
							props: {
								y: 172,
								x: 259.4,
								width: 185,
								visible: !0,
								skin: "activity/z3.png",
								scaleY: 1,
								scaleX: 1,
								pivotY: 84,
								pivotX: 92,
								height: 185,
								alpha: 1
							},
							compId: 4
						}, {
							type: "Image",
							props: {
								y: 171,
								x: 459.4,
								visible: !0,
								skin: "activity/z3.png",
								scaleY: .6,
								scaleX: .6,
								pivotY: 84,
								pivotX: 92,
								alpha: 0
							},
							compId: 16
						}, {
							type: "Image",
							props: {
								y: 174,
								x: 259.4,
								scaleY: 1,
								scaleX: 1,
								pivotY: 91,
								pivotX: 99
							},
							compId: 3,
							child: [{
								type: "Image",
								props: {
									y: 98,
									x: 98,
									var: "romateImg1",
									skin: "activity/z2.png",
									rotation: 0,
									pivotY: 97,
									pivotX: 98.5
								},
								compId: 37
							}, {
								type: "Image",
								props: {
									y: 99,
									x: 98,
									width: 163,
									var: "romateImg2",
									skin: "activity/z6.png",
									rotation: 0,
									pivotY: 82,
									pivotX: 82,
									height: 163
								},
								compId: 33
							}, {
								type: "Image",
								props: {
									y: -83,
									x: 60,
									var: "b1",
									skin: "activity/boss.png"
								},
								compId: 5
							}, {
								type: "Label",
								props: {
									y: 99,
									x: 99,
									width: 167,
									var: "it1",
									valign: "middle",
									text: "100",
									pivotY: 60,
									pivotX: 86,
									height: 111,
									fontSize: 80,
									color: "#93ffff",
									bold: !0,
									align: "center"
								},
								compId: 38
							}]
						}, {
							type: "Image",
							props: {
								y: 157,
								x: 343.4,
								visible: !0,
								skin: "activity/z5.png",
								scaleY: .8,
								scaleX: .8,
								pivotY: 27,
								pivotX: 15
							},
							compId: 7
						}, {
							type: "Image",
							props: {
								y: 172,
								x: 459.4,
								skin: "activity/z2.png",
								scaleY: .6,
								scaleX: .6,
								pivotY: 91,
								pivotX: 99
							},
							compId: 9,
							child: [{
								type: "Image",
								props: {
									y: -83,
									x: 60,
									var: "b2",
									skin: "activity/boss.png"
								},
								compId: 8
							}, {
								type: "Image",
								props: {
									y: 16,
									x: 17,
									skin: "activity/z6.png"
								},
								compId: 36
							}, {
								type: "Label",
								props: {
									y: 104,
									x: 100,
									width: 190,
									var: "it2",
									valign: "middle",
									text: "100",
									pivotY: 79,
									pivotX: 97,
									height: 137,
									fontSize: 80,
									color: "#93ffff",
									bold: !0,
									align: "center"
								},
								compId: 40
							}]
						}, {
							type: "Image",
							props: {
								y: 172,
								x: 59.39999999999998,
								visible: !0,
								var: "l",
								skin: "activity/z2.png",
								scaleY: .6,
								scaleX: .6,
								pivotY: 91,
								pivotX: 99,
								alpha: 1
							},
							compId: 10,
							child: [{
								type: "Image",
								props: {
									y: -83,
									x: 60,
									var: "b0",
									skin: "activity/boss.png"
								},
								compId: 12
							}, {
								type: "Image",
								props: {
									y: 15,
									x: 17,
									skin: "activity/z6.png"
								},
								compId: 34
							}, {
								type: "Label",
								props: {
									y: 87,
									x: 99,
									width: 182,
									var: "it0",
									valign: "middle",
									text: "100",
									pivotY: 61,
									pivotX: 93,
									height: 135,
									fontSize: 80,
									color: "#93ffff",
									bold: !0,
									align: "center"
								},
								compId: 39
							}]
						}, {
							type: "Image",
							props: {
								y: 152,
								x: 512.4,
								skin: "activity/z2.png",
								scaleY: .4,
								scaleX: .4,
								pivotY: 91,
								pivotX: 99,
								alpha: 0
							},
							compId: 13,
							child: [{
								type: "Sprite",
								props: {
									y: 91,
									x: 99,
									var: "it3"
								},
								compId: 17
							}, {
								type: "Image",
								props: {
									y: -83,
									x: 60,
									var: "b3",
									skin: "activity/boss.png"
								},
								compId: 14
							}, {
								type: "Text",
								props: {
									y: 73,
									x: 66,
									width: 69,
									text: "text",
									height: 42,
									fontSize: 40,
									runtime: "Laya.Text"
								},
								compId: 41
							}]
						}, {
							type: "Image",
							props: {
								y: 172,
								x: 419.4,
								visible: !0,
								skin: "activity/z5.png",
								scaleY: 0,
								scaleX: 0,
								pivotY: 27,
								pivotX: 15
							},
							compId: 15
						}, {
							type: "Box",
							props: {
								y: 75,
								x: 155.39999999999998,
								width: 210,
								var: "area",
								mouseEnabled: !0,
								height: 196
							},
							compId: 20
						}, {
							type: "Image",
							props: {
								y: 157,
								x: 105.39999999999998,
								visible: !0,
								var: "dotInLeft",
								skin: "activity/z4.png",
								scaleY: .8,
								scaleX: .8,
								pivotY: 22,
								pivotX: 12
							},
							compId: 42
						}]
					}],
					animations: [{
						nodes: [{
							target: 9,
							keyframes: {
								y: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "y",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "y",
									index: 30
								}],
								x: [{
									value: 200,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "x",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "x",
									index: 30
								}],
								scaleY: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 30
								}]
							}
						}, {
							target: 3,
							keyframes: {
								y: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "y",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "y",
									index: 30
								}],
								x: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "x",
									index: 0
								}, {
									value: -200,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "x",
									index: 30
								}],
								scaleY: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 30
								}]
							}
						}, {
							target: 10,
							keyframes: {
								y: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "y",
									index: 0
								}, {
									value: -20,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "y",
									index: 30
								}],
								x: [{
									value: -200,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "x",
									index: 0
								}, {
									value: -253,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 10,
									key: "visible",
									index: 0
								}, {
									value: !1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 10,
									key: "visible",
									index: 30
								}],
								scaleY: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 0
								}, {
									value: .4,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 0
								}, {
									value: .4,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 30
								}],
								alpha: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "alpha",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "alpha",
									index: 30
								}]
							}
						}, {
							target: 15,
							keyframes: {
								x: [{
									value: 160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "x",
									index: 0
								}, {
									value: 160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "x",
									index: 20
								}, {
									value: 120,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 15,
									key: "visible",
									index: 0
								}, {
									value: !1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 15,
									key: "visible",
									index: 30
								}],
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 15,
									key: "scaleY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "scaleY",
									index: 20
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 15,
									key: "scaleX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "scaleX",
									index: 20
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 15,
									key: "scaleX",
									index: 30
								}]
							}
						}, {
							target: 4,
							keyframes: {
								x: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "x",
									index: 0
								}, {
									value: -200,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 4,
									key: "visible",
									index: 0
								}, {
									value: !1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 4,
									key: "visible",
									index: 30
								}],
								scaleY: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleY",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleX",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleX",
									index: 30
								}],
								alpha: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "alpha",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "alpha",
									index: 30
								}]
							}
						}, {
							target: 16,
							keyframes: {
								y: [{
									value: 5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "y",
									index: 0
								}],
								x: [{
									value: 138,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "x",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 16,
									key: "visible",
									index: 0
								}],
								scaleY: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "scaleX",
									index: 30
								}],
								alpha: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "alpha",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 16,
									key: "alpha",
									index: 30
								}]
							}
						}, {
							target: 17,
							keyframes: {
								var: [{
									value: "t3",
									tweenMethod: "linearNone",
									tween: !1,
									target: 17,
									key: "var",
									index: 0
								}, {
									value: "it3",
									tweenMethod: "linearNone",
									tween: !1,
									target: 17,
									key: "var",
									index: 30
								}]
							}
						}, {
							target: 7,
							keyframes: {
								y: [{
									value: -11,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "y",
									index: 0
								}, {
									value: -10,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "y",
									index: 30
								}],
								x: [{
									value: 82.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "x",
									index: 0
								}, {
									value: 123.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "visible",
									index: 0
								}, {
									value: !1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "visible",
									index: 1
								}, {
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "visible",
									index: 30
								}]
							}
						}, {
							target: 42,
							keyframes: {
								y: [{
									value: -21,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "y",
									index: 0
								}],
								x: [{
									value: -160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "x",
									index: 0
								}, {
									value: 120,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "x",
									index: 1
								}, {
									value: -160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "x",
									index: 30
								}],
								visible: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 42,
									key: "visible",
									index: 0
								}, {
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 42,
									key: "visible",
									index: 30
								}]
							}
						}],
						name: "animLevel",
						id: 1,
						frameRate: 60,
						action: 0
					}, {
						nodes: [{
							target: 10,
							keyframes: {
								scaleY: [{
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 20
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 0
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 20
								}]
							}
						}, {
							target: 3,
							keyframes: {
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 3,
									key: "scaleY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 10
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 30
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 3,
									key: "scaleX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 10
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 30
								}]
							}
						}, {
							target: 9,
							keyframes: {
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 9,
									key: "scaleY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 20
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 40
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 9,
									key: "scaleX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "backOut",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 20
								}, {
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 40
								}]
							}
						}, {
							target: 4,
							keyframes: {
								alpha: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "alpha",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "alpha",
									index: 10
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "alpha",
									index: 30
								}]
							}
						}, {
							target: 42,
							keyframes: {
								x: [{
									value: -160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "x",
									index: 0
								}]
							}
						}],
						name: "animLevelShow",
						id: 2,
						frameRate: 60,
						action: 0
					}, {
						nodes: [{
							target: 10,
							keyframes: {
								scaleY: [{
									value: .6,
									tweenMethod: "backIn",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleY",
									index: 15
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "backIn",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 10,
									key: "scaleX",
									index: 15
								}]
							}
						}, {
							target: 9,
							keyframes: {
								scaleY: [{
									value: .6,
									tweenMethod: "backIn",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleY",
									index: 15
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "backIn",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 9,
									key: "scaleX",
									index: 15
								}]
							}
						}, {
							target: 3,
							keyframes: {
								scaleY: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 3,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "backIn",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleY",
									index: 35
								}],
								scaleX: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 3,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "backIn",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 3,
									key: "scaleX",
									index: 35
								}]
							}
						}, {
							target: 4,
							keyframes: {
								scaleY: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 4,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "backIn",
									tween: !0,
									target: 4,
									key: "scaleY",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleY",
									index: 35
								}],
								scaleX: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 4,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "backIn",
									tween: !0,
									target: 4,
									key: "scaleX",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 4,
									key: "scaleX",
									index: 35
								}]
							}
						}, {
							target: 42,
							keyframes: {
								x: [{
									value: -160,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "x",
									index: 0
								}],
								scaleY: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleY",
									index: 5
								}, {
									value: .9,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleY",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleY",
									index: 35
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleX",
									index: 5
								}, {
									value: .9,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleX",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 42,
									key: "scaleX",
									index: 35
								}]
							}
						}, {
							target: 7,
							keyframes: {
								x: [{
									value: 120,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "x",
									index: 0
								}, {
									value: 120,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "x",
									index: 5
								}],
								scaleY: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 5
								}, {
									value: .9,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 35
								}],
								scaleX: [{
									value: .6,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 5
								}, {
									value: .9,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 35
								}]
							}
						}],
						name: "animLevelHide",
						id: 3,
						frameRate: 60,
						action: 0
					}],
					loadList: ["activity/z3.png", "activity/z2.png", "activity/z6.png", "activity/boss.png", "activity/z5.png", "activity/z4.png"],
					loadList3D: []
				}, e.MoonLevelUI = p, Yi("ui.view.MoonLevelUI", p);
				class g extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(g.uiView)
					}
				}
				g.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 10
					}, {
						type: "Image",
						props: {
							top: 0,
							skin: "wxlocal/bg0.png",
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 11
					}, {
						type: "List",
						props: {
							width: 715,
							var: "listguan",
							top: 230,
							spaceY: 30,
							spaceX: 30,
							right: 16,
							repeatY: 15,
							repeatX: 3,
							name: "render",
							left: 19,
							height: 1104,
							bottom: 0
						},
						compId: 13,
						child: [{
							type: "Box",
							props: {
								y: 0,
								x: 0,
								renderType: "render"
							},
							compId: 14,
							child: [{
								type: "Sprite",
								props: {
									y: 0,
									x: 0,
									texture: "gui/bg_002.png"
								},
								compId: 21
							}, {
								type: "Label",
								props: {
									y: 11,
									x: 10,
									width: 197,
									valign: "middle",
									text: "99",
									name: "lab",
									height: 194,
									fontSize: 100,
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 17
							}]
						}]
					}, {
						type: "Sprite",
						props: {
							y: 184,
							x: 0,
							width: 750,
							texture: "activity/bg_006.png",
							height: 30
						},
						compId: 18
					}, {
						type: "Button",
						props: {
							y: 59,
							x: 28,
							stateNum: 1,
							skin: "activity/btn_close.png"
						},
						compId: 20
					}, {
						type: "Sprite",
						props: {
							y: 45,
							x: 600,
							var: "btn_status",
							texture: "activity/vibrate_on.png"
						},
						compId: 22
					}, {
						type: "Button",
						props: {
							y: 52,
							x: 207,
							width: 130,
							var: "btn_cn",
							stateNum: 1,
							skin: "gui/btn_002.png",
							height: 80
						},
						compId: 23,
						child: [{
							type: "Label",
							props: {
								y: 19,
								x: 17.5,
								width: 95,
								valign: "middle",
								text: "中文",
								height: 42,
								fontSize: 35,
								color: "#ffffff",
								align: "center"
							},
							compId: 24
						}]
					}, {
						type: "Button",
						props: {
							y: 52,
							x: 399,
							width: 130,
							var: "btn_en",
							stateNum: 1,
							skin: "gui/btn_003.png",
							height: 80
						},
						compId: 25,
						child: [{
							type: "Label",
							props: {
								y: 19,
								x: 17.5,
								width: 95,
								valign: "middle",
								text: "英文",
								height: 42,
								fontSize: 35,
								color: "#ffffff",
								align: "center"
							},
							compId: 26
						}]
					}],
					loadList: ["activity/common_bg5.png", "wxlocal/bg0.png", "gui/bg_002.png", "activity/bg_006.png", "activity/btn_close.png", "activity/vibrate_on.png", "gui/btn_002.png", "gui/btn_003.png"],
					loadList3D: []
				}, e.MoonLevelShowUI = g, Yi("ui.view.MoonLevelShowUI", g);
				class m extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(m.uiView)
					}
				}
				m.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 1,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 4
					}, {
						type: "Image",
						props: {
							width: 666,
							var: "bg",
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							height: 777,
							centerY: 37,
							centerX: 0
						},
						compId: 5,
						child: [{
							type: "Image",
							props: {
								y: 13,
								x: 10,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 749
							},
							compId: 127
						}, {
							type: "Label",
							props: {
								y: 38,
								x: 34,
								width: 583,
								var: "txt_title",
								text: "免费宝石",
								height: 42,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 52
						}, {
							type: "Sprite",
							props: {
								y: -24,
								x: 83.5,
								texture: "activity/nn5.png"
							},
							compId: 128
						}, {
							type: "Sprite",
							props: {
								y: 26,
								x: 572,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 129
						}, {
							type: "Sprite",
							props: {
								y: -24,
								x: 507,
								texture: "activity/nn5.png"
							},
							compId: 130
						}, {
							type: "Image",
							props: {
								y: 139,
								x: 43,
								var: "img0",
								skin: "activity/01.png"
							},
							compId: 6,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg1",
									skin: "activity/05.png"
								},
								compId: 56
							}, {
								type: "Image",
								props: {
									y: 69,
									x: 88.5,
									var: "pz1",
									skin: "activity/icon_diamond.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 29
							}, {
								type: "Label",
								props: {
									y: 142,
									x: 88.5,
									width: 158,
									var: "dt1",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt1",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 131
							}]
						}, {
							type: "Image",
							props: {
								y: 139,
								x: 247,
								var: "img1",
								skin: "activity/01.png"
							},
							compId: 7,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg2",
									skin: "activity/05.png"
								},
								compId: 57
							}, {
								type: "Image",
								props: {
									y: 68,
									x: 88.5,
									var: "pz2",
									skin: "activity/icon_diamond.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 32
							}, {
								type: "Label",
								props: {
									y: 142,
									x: 90,
									width: 157,
									var: "dt2",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt2",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 19
							}]
						}, {
							type: "Image",
							props: {
								y: 139,
								x: 450,
								skin: "activity/01.png"
							},
							compId: 8,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg3",
									skin: "activity/05.png"
								},
								compId: 58
							}, {
								type: "Image",
								props: {
									y: 68,
									x: 88.5,
									var: "pz3",
									skin: "activity/shop2.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 35
							}, {
								type: "Label",
								props: {
									y: 141,
									x: 89,
									width: 158,
									var: "dt3",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt3",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 20
							}]
						}, {
							type: "Image",
							props: {
								y: 344,
								x: 450,
								skin: "activity/01.png"
							},
							compId: 9,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg4",
									skin: "activity/05.png"
								},
								compId: 59
							}, {
								type: "Image",
								props: {
									y: 69,
									x: 88.5,
									var: "pz4",
									skin: "activity/shop2.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 38
							}, {
								type: "Label",
								props: {
									y: 141,
									x: 89,
									width: 157,
									var: "dt4",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt4",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 21
							}]
						}, {
							type: "Image",
							props: {
								y: 551,
								x: 450,
								skin: "activity/01.png"
							},
							compId: 10,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg5",
									skin: "activity/05.png"
								},
								compId: 60
							}, {
								type: "Image",
								props: {
									y: 68,
									x: 88.5,
									var: "pz5",
									skin: "activity/icon_diamond.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 41
							}, {
								type: "Label",
								props: {
									y: 142,
									x: 90,
									width: 157,
									var: "dt5",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt5",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 22
							}]
						}, {
							type: "Image",
							props: {
								y: 551,
								x: 247,
								skin: "activity/01.png"
							},
							compId: 11,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg6",
									skin: "activity/05.png"
								},
								compId: 61
							}, {
								type: "Image",
								props: {
									y: 69,
									x: 88.5,
									var: "pz6",
									skin: "activity/icon_diamond.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 44
							}, {
								type: "Label",
								props: {
									y: 142,
									x: 88,
									width: 157,
									var: "dt6",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt6",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 23
							}]
						}, {
							type: "Image",
							props: {
								y: 551,
								x: 43,
								skin: "activity/01.png"
							},
							compId: 12,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg7",
									skin: "activity/05.png"
								},
								compId: 62
							}, {
								type: "Image",
								props: {
									y: 68.5,
									x: 88.5,
									var: "pz7",
									skin: "activity/shop2.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 47
							}, {
								type: "Label",
								props: {
									y: 141,
									x: 88,
									width: 158,
									var: "dt7",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt7",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 24
							}]
						}, {
							type: "Image",
							props: {
								y: 343,
								x: 43,
								skin: "activity/01.png"
							},
							compId: 13,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									visible: !1,
									var: "choosebg8",
									skin: "activity/05.png"
								},
								compId: 63
							}, {
								type: "Image",
								props: {
									y: 69,
									x: 88.5,
									var: "pz8",
									skin: "activity/shop4.png",
									pivotY: 59,
									pivotX: 59
								},
								compId: 50
							}, {
								type: "Label",
								props: {
									y: 142,
									x: 88,
									width: 158,
									var: "dt8",
									valign: "middle",
									text: "99",
									pivotY: 20,
									pivotX: 79,
									name: "dt8",
									height: 40,
									fontSize: 40,
									font: "SimHei",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 25
							}]
						}, {
							type: "Image",
							props: {
								y: 434.5,
								x: 336.5,
								width: 203,
								var: "huxi",
								skin: "activity/bth_011.png",
								pivotY: 102,
								pivotX: 102,
								height: 203,
								alpha: .6
							},
							compId: 53
						}, {
							type: "Image",
							props: {
								y: 435.5,
								x: 337.5,
								width: 165,
								var: "startBtn",
								skin: "activity/bth_022.png",
								scaleY: 1,
								scaleX: 1,
								pivotY: 84,
								pivotX: 83,
								height: 167
							},
							compId: 14
						}, {
							type: "Image",
							props: {
								y: 131,
								x: 37,
								width: 191,
								var: "highLight",
								skin: "activity/04.png",
								height: 191
							},
							compId: 16
						}, {
							type: "Label",
							props: {
								y: 768,
								x: 3,
								width: 665,
								visible: !1,
								var: "chance",
								valign: "middle",
								text: "可用次数:4",
								strokeColor: "#ffffff",
								stroke: 0,
								height: 42,
								fontSize: 32,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 17
						}, {
							type: "Label",
							props: {
								y: 837,
								x: 336.5,
								width: 555,
								visible: !1,
								var: "tip",
								valign: "middle",
								pivotY: 21,
								pivotX: 278,
								height: 42,
								fontSize: 32,
								color: "#dac8ff",
								align: "center"
							},
							compId: 51
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/nn5.png", "activity/btn_close.png", "activity/01.png", "activity/05.png", "activity/icon_diamond.png", "activity/shop2.png", "activity/shop4.png", "activity/bth_011.png", "activity/bth_022.png", "activity/04.png"],
					loadList3D: []
				}, e.MoonLuckyDrawUI = m, Yi("ui.view.MoonLuckyDrawUI", m);
				class u extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(u.uiView)
					}
				}
				u.uiView = {
					type: "View",
					props: {
						width: 768,
						mouseThrough: !0,
						height: 1663
					},
					compId: 2,
					child: [{
						type: "Panel",
						props: {
							var: "bg",
							top: 0,
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 16
					}, {
						type: "List",
						props: {
							width: 136,
							var: "List_Game1",
							top: 250,
							spaceY: 10,
							runtime: "moon/core/ui/extension/ListEx.ts",
							repeatX: 1,
							left: 18,
							height: 390
						},
						compId: 3,
						child: [{
							type: "Box",
							props: {
								y: 0,
								width: 120,
								name: "render",
								height: 120,
								centerX: 0
							},
							compId: 5,
							child: [{
								type: "Image",
								props: {
									width: 120,
									skin: "moon/ad/icon/bg_bubble.png",
									height: 120,
									centerY: 0,
									centerX: 0
								},
								compId: 10
							}, {
								type: "Image",
								props: {
									width: 100,
									skin: "moon/1.png",
									name: "Img_Game",
									height: 100,
									centerY: 0,
									centerX: 0
								},
								compId: 6,
								child: [{
									type: "Image",
									props: {
										top: -3,
										skin: "moon/ad/icon/bg_bubble_up.png",
										right: -3
									},
									compId: 11
								}, {
									type: "Image",
									props: {
										skin: "moon/ad/icon/bg_bubble_down.png",
										left: -3,
										bottom: -3
									},
									compId: 12
								}]
							}]
						}]
					}, {
						type: "List",
						props: {
							width: 136,
							var: "List_Game2",
							top: 250,
							spaceY: 10,
							runtime: "moon/core/ui/extension/ListEx.ts",
							right: 18,
							repeatX: 1,
							height: 390
						},
						compId: 4,
						child: [{
							type: "Box",
							props: {
								y: 0,
								width: 120,
								name: "render",
								height: 120,
								centerX: 0
							},
							compId: 7,
							child: [{
								type: "Image",
								props: {
									width: 120,
									skin: "moon/ad/icon/bg_bubble.png",
									height: 120,
									centerY: 0,
									centerX: 0
								},
								compId: 13
							}, {
								type: "Image",
								props: {
									width: 100,
									skin: "moon/1.png",
									name: "Img_Game",
									height: 100,
									centerY: 0,
									centerX: 0
								},
								compId: 8,
								child: [{
									type: "Image",
									props: {
										top: -3,
										skin: "moon/ad/icon/bg_bubble_up.png",
										right: -3
									},
									compId: 14
								}, {
									type: "Image",
									props: {
										skin: "moon/ad/icon/bg_bubble_down.png",
										left: -3,
										bottom: -3
									},
									compId: 15
								}]
							}]
						}]
					}],
					loadList: ["moon/ad/icon/bg_bubble.png", "moon/1.png", "moon/ad/icon/bg_bubble_up.png", "moon/ad/icon/bg_bubble_down.png"],
					loadList3D: []
				}, e.MoonMainAdUI = u, Yi("ui.view.MoonMainAdUI", u);
				class f extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(f.uiView)
					}
				}
				f.uiView = {
					type: "View",
					props: {
						width: 1920,
						mouseThrough: !0,
						height: 1080
					},
					compId: 2,
					child: [{
						type: "Panel",
						props: {
							width: 1920,
							var: "bg",
							top: 0,
							left: -11,
							height: 1080
						},
						compId: 16
					}, {
						type: "List",
						props: {
							y: 180,
							width: 136,
							var: "List_Game1",
							top: 180,
							spaceY: 10,
							runtime: "moon/core/ui/extension/ListEx.ts",
							repeatX: 1,
							left: 60,
							height: 565
						},
						compId: 17,
						child: [{
							type: "Box",
							props: {
								y: 0,
								width: 132,
								name: "render",
								height: 132,
								centerX: 0
							},
							compId: 20,
							child: [{
								type: "Image",
								props: {
									width: 132,
									skin: "moon/ad/icon/bg_bubble.png",
									height: 132,
									centerY: 0,
									centerX: 0
								},
								compId: 21
							}, {
								type: "Image",
								props: {
									width: 112,
									name: "Img_Game",
									height: 112,
									centerY: 0,
									centerX: 0
								},
								compId: 22,
								child: [{
									type: "Image",
									props: {
										top: -3,
										skin: "moon/ad/icon/bg_bubble_up.png",
										right: -3
									},
									compId: 23
								}, {
									type: "Image",
									props: {
										skin: "moon/ad/icon/bg_bubble_down.png",
										left: -3,
										bottom: -3
									},
									compId: 24
								}]
							}]
						}]
					}, {
						type: "List",
						props: {
							y: 180,
							x: 1748,
							width: 132,
							var: "List_Game2",
							top: 180,
							spaceY: 10,
							runtime: "moon/core/ui/extension/ListEx.ts",
							right: 40,
							repeatX: 1,
							height: 566
						},
						compId: 18,
						child: [{
							type: "Box",
							props: {
								y: 0,
								width: 132,
								name: "render",
								height: 132,
								centerX: 0
							},
							compId: 25,
							child: [{
								type: "Image",
								props: {
									width: 132,
									skin: "moon/ad/icon/bg_bubble.png",
									height: 132,
									centerY: 0,
									centerX: 0
								},
								compId: 26
							}, {
								type: "Image",
								props: {
									width: 112,
									name: "Img_Game",
									height: 112,
									centerY: 0,
									centerX: 0
								},
								compId: 27,
								child: [{
									type: "Image",
									props: {
										top: -3,
										skin: "moon/ad/icon/bg_bubble_up.png",
										right: -3
									},
									compId: 28
								}, {
									type: "Image",
									props: {
										skin: "moon/ad/icon/bg_bubble_down.png",
										left: -3,
										bottom: -3
									},
									compId: 29
								}]
							}]
						}]
					}, {
						type: "List",
						props: {
							y: 0,
							x: 0,
							width: 762,
							var: "List_Game3",
							top: 37,
							spaceX: 10,
							runtime: "moon/core/ui/extension/ListEx.ts",
							right: 250,
							repeatY: 1,
							height: 136
						},
						compId: 19,
						child: [{
							type: "Box",
							props: {
								y: 0,
								x: 10,
								width: 132,
								name: "render",
								height: 132
							},
							compId: 30,
							child: [{
								type: "Image",
								props: {
									width: 132,
									skin: "moon/ad/icon/bg_bubble.png",
									height: 132,
									centerY: 0,
									centerX: 0
								},
								compId: 31
							}, {
								type: "Image",
								props: {
									width: 112,
									name: "Img_Game",
									height: 112,
									centerY: 0,
									centerX: 0
								},
								compId: 32,
								child: [{
									type: "Image",
									props: {
										top: -3,
										skin: "moon/ad/icon/bg_bubble_up.png",
										right: -3
									},
									compId: 33
								}, {
									type: "Image",
									props: {
										skin: "moon/ad/icon/bg_bubble_down.png",
										left: -3,
										bottom: -3
									},
									compId: 34
								}]
							}]
						}]
					}, {
						type: "Box",
						props: {
							width: 176,
							var: "ov_native2",
							top: 218,
							left: 132,
							height: 172
						},
						compId: 35,
						child: [{
							type: "Image",
							props: {
								top: 0,
								right: 0,
								name: "icon",
								left: 0,
								bottom: 0,
								alpha: .8
							},
							compId: 37
						}, {
							type: "Box",
							props: {
								width: 87,
								var: "ov_native_close",
								top: -30,
								right: 88,
								height: 30
							},
							compId: 38,
							child: [{
								type: "Box",
								props: {
									top: 0,
									right: 0,
									left: -3,
									bottom: 0,
									bgColor: "#1b1b1b",
									alpha: .7
								},
								compId: 39
							}, {
								type: "Label",
								props: {
									text: "广告 X",
									fontSize: 30,
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									bold: !0,
									alpha: .8
								},
								compId: 40
							}]
						}]
					}, {
						type: "Box",
						props: {
							width: 800,
							var: "ov_native",
							top: 16,
							height: 178,
							centerX: 310
						},
						compId: 36,
						child: [{
							type: "Image",
							props: {
								width: 684,
								top: 0,
								right: 0,
								name: "icon",
								left: 0,
								height: 178,
								bottom: 0,
								alpha: .8
							},
							compId: 41
						}, {
							type: "Image",
							props: {
								y: 0,
								x: 0,
								var: "btn_close",
								skin: "moon/ad/results2/btn_close.png",
								name: "btn_close"
							},
							compId: 42
						}, {
							type: "Box",
							props: {
								y: 118,
								x: 585,
								width: 99,
								right: 0,
								height: 60,
								bottom: 0
							},
							compId: 43,
							child: [{
								type: "Box",
								props: {
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
									bgColor: "#1b1b1b",
									alpha: .7
								},
								compId: 44
							}, {
								type: "Label",
								props: {
									text: "广告",
									fontSize: 40,
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									bold: !0,
									alpha: .8
								},
								compId: 45
							}]
						}]
					}],
					loadList: ["moon/ad/icon/bg_bubble.png", "moon/ad/icon/bg_bubble_up.png", "moon/ad/icon/bg_bubble_down.png", "moon/ad/results2/btn_close.png"],
					loadList3D: []
				}, e.MoonMainAd2UI = f, Yi("ui.view.MoonMainAd2UI", f);
				class _ extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(_.uiView)
					}
				}
				_.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							y: 0,
							x: 0,
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							x: 55,
							width: 667,
							var: "bg",
							skin: "activity/nn1.png",
							height: 544,
							centerY: 0
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								y: 12,
								x: 11,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 386
							},
							compId: 5,
							child: [{
								type: "Label",
								props: {
									y: 12,
									x: 86.5,
									width: 473,
									var: "txt_title",
									valign: "middle",
									text: "离线收益",
									height: 64,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									align: "center"
								},
								compId: 6
							}]
						}, {
							type: "Button",
							props: {
								y: 408,
								x: 79,
								width: 509,
								var: "btn_double",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								height: 117
							},
							compId: 33,
							child: [{
								type: "Label",
								props: {
									y: 37,
									x: 201,
									var: "lbl_double",
									text: "双倍领取",
									strokeColor: "#a86013",
									stroke: 3,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 34
							}, {
								type: "Sprite",
								props: {
									y: 22,
									x: 75,
									texture: "activity/icvideo2.png",
									scaleY: 1.3,
									scaleX: 1.3
								},
								compId: 35
							}]
						}, {
							type: "Sprite",
							props: {
								y: 24,
								x: 574,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 14
						}, {
							type: "Image",
							props: {
								width: 613,
								skin: "activity/common_bg2.png",
								sizeGrid: "19,16,18,21",
								height: 172,
								centerY: 1,
								centerX: 1
							},
							compId: 22,
							child: [{
								type: "Sprite",
								props: {
									y: 27,
									x: 461,
									texture: "activity/icon_gold.png"
								},
								compId: 30
							}]
						}, {
							type: "Label",
							props: {
								y: 132,
								x: 85,
								width: 486,
								var: "txt_title2",
								valign: "middle",
								text: "离线期间的收益",
								strokeColor: "#a86013",
								height: 48,
								fontSize: 36,
								font: "黑体",
								color: "#8271b7",
								bold: !0,
								align: "center"
							},
							compId: 28
						}, {
							type: "Label",
							props: {
								y: 212,
								x: 154,
								width: 357,
								var: "coin",
								valign: "middle",
								text: "123",
								strokeColor: "#a86013",
								height: 117,
								fontSize: 55,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 29
						}, {
							type: "Label",
							props: {
								y: 576,
								x: 254.5,
								var: "get_reward",
								valign: "middle",
								text: "普通领取",
								name: "get_reward",
								fontSize: 40,
								font: "黑体",
								color: "#fbf8f8",
								bold: !0,
								align: "center"
							},
							compId: 32
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_btn1.png", "activity/icvideo2.png", "activity/btn_close.png", "activity/common_bg2.png", "activity/icon_gold.png"],
					loadList3D: []
				}, e.MoonOffLineUI = _, Yi("ui.view.MoonOffLineUI", _);
				class y extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(y.uiView)
					}
				}
				y.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334,
						centerY: 0,
						centerX: 0
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 50
					}, {
						type: "Box",
						props: {
							width: 717,
							height: 860,
							centerY: 0,
							centerX: 0
						},
						compId: 5,
						child: [{
							type: "Image",
							props: {
								y: 24,
								x: 26,
								width: 666,
								skin: "activity/nn1.png",
								height: 831
							},
							compId: 6,
							child: [{
								type: "Image",
								props: {
									y: 8,
									x: 10,
									width: 646,
									skin: "localext/bg_nn2.png",
									height: 707
								},
								compId: 9
							}, {
								type: "WXOpenDataViewer",
								props: {
									y: 122,
									x: 43,
									width: 582,
									var: "img_rank",
									iconSign: "wx",
									height: 563,
									runtime: "Laya.WXOpenDataViewer"
								},
								compId: 51
							}]
						}, {
							type: "Label",
							props: {
								y: 51,
								x: 155,
								width: 393,
								var: "txt_title",
								valign: "middle",
								text: "天梯好友排行",
								height: 53,
								fontSize: 40,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 10
						}, {
							type: "Button",
							props: {
								y: 749,
								x: 116.5,
								width: 485,
								var: "btn_share",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								height: 95
							},
							compId: 11,
							child: [{
								type: "Image",
								props: {
									y: 16,
									x: 114,
									width: 55,
									skin: "activity/icshare.png",
									height: 55
								},
								compId: 12
							}, {
								type: "Label",
								props: {
									y: 47.5,
									x: 200,
									width: 207,
									var: "txt_share",
									valign: "middle",
									text: "邀请好友",
									strokeColor: "#c06c1e",
									stroke: 3,
									pivotY: 26,
									height: 51,
									fontSize: 38,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "left"
								},
								compId: 14
							}]
						}, {
							type: "Label",
							props: {
								y: 879,
								x: 359,
								width: 556,
								var: "txt_info",
								valign: "middle",
								text: "邀请好友得钻石",
								pivotY: 22,
								pivotX: 278,
								height: 44,
								fontSize: 32,
								font: "黑体",
								color: "#5af1ff",
								align: "center"
							},
							compId: 15
						}, {
							type: "Sprite",
							props: {
								y: -7.5,
								x: 108,
								texture: "activity/nn5.png"
							},
							compId: 47
						}, {
							type: "Sprite",
							props: {
								y: 44,
								x: 597,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 48
						}, {
							type: "Sprite",
							props: {
								y: -6,
								x: 532,
								texture: "activity/nn5.png"
							},
							compId: 49
						}, {
							type: "Image",
							props: {
								y: 157,
								x: 79,
								width: 560,
								visible: !1,
								skin: "activity/common_bg2.png",
								sizeGrid: "25,24,22,27",
								height: 90
							},
							compId: 18,
							child: [{
								type: "Label",
								props: {
									y: 19,
									x: 10,
									width: 56,
									valign: "middle",
									text: "1",
									height: 51,
									fontSize: 36,
									color: "#f9f4f4",
									bold: !0,
									align: "center"
								},
								compId: 19
							}, {
								type: "Label",
								props: {
									y: 45,
									x: 158,
									width: 148,
									valign: "middle",
									text: "只是拿来看UI的",
									pivotY: 21,
									height: 42,
									fontSize: 32,
									font: "黑体",
									color: "#ffffff",
									align: "left"
								},
								compId: 20
							}, {
								type: "Label",
								props: {
									y: 45,
									x: 463,
									width: 73,
									valign: "middle",
									text: "43关",
									pivotY: 21,
									height: 42,
									fontSize: 32,
									font: "黑体",
									color: "#ffffff",
									align: "right"
								},
								compId: 23
							}, {
								type: "Image",
								props: {
									y: 10,
									x: 74,
									width: 70,
									height: 70
								},
								compId: 24
							}]
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "localext/bg_nn2.png", "activity/common_btn1.png", "activity/icshare.png", "activity/nn5.png", "activity/btn_close.png", "activity/common_bg2.png"],
					loadList3D: []
				}, e.MoonRankUI = y, Yi("ui.view.MoonRankUI", y);
				class I extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(I.uiView)
					}
				}
				I.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334,
						bottom: 50
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							width: 355,
							visible: !1,
							var: "btn_reward5",
							skin: "activity/common_btn1.png",
							sizeGrid: "42,42,42,42",
							height: 136,
							centerY: -80,
							centerX: 0
						},
						compId: 7,
						child: [{
							type: "Image",
							props: {
								x: 129,
								width: 83,
								var: "img",
								skin: "activity/icon_gold.png",
								scaleY: .7,
								scaleX: .7,
								height: 81,
								centerY: 27
							},
							compId: 8
						}, {
							type: "Label",
							props: {
								y: 56,
								x: 194,
								width: 166,
								var: "itCCoin1",
								valign: "middle",
								text: "0",
								height: 80,
								fontSize: 42,
								color: "#ffffff",
								bold: !0,
								align: "left"
							},
							compId: 9
						}, {
							type: "Label",
							props: {
								y: -10,
								x: 141,
								width: 170,
								var: "txt_five",
								valign: "middle",
								text: "5倍领取",
								strokeColor: "#c37d14",
								stroke: 4,
								height: 99,
								fontSize: 45,
								font: "黑体",
								color: "#ffffff",
								bold: !1,
								align: "center"
							},
							compId: 10
						}, {
							type: "Image",
							props: {
								x: 29,
								var: "img_video",
								skin: "activity/icvideo2.png",
								scaleY: 1.5,
								scaleX: 1.5,
								centerY: 2
							},
							compId: 52
						}]
					}, {
						type: "Image",
						props: {
							width: 355,
							visible: !1,
							var: "btn_reward1",
							skin: "activity/common_btn3.png",
							sizeGrid: "42,42,42,42",
							height: 136,
							centerY: 145,
							centerX: 0
						},
						compId: 55,
						child: [{
							type: "Image",
							props: {
								x: 136,
								width: 83,
								skin: "activity/icon_gold.png",
								scaleY: .7,
								scaleX: .7,
								height: 81,
								centerY: -2
							},
							compId: 56
						}, {
							type: "Label",
							props: {
								y: 25,
								x: 202.5,
								width: 112,
								var: "com",
								valign: "middle",
								text: "500",
								strokeColor: "#479722",
								stroke: 4,
								height: 86,
								fontSize: 50,
								color: "#ffffff",
								bold: !0,
								align: "left"
							},
							compId: 57
						}, {
							type: "Label",
							props: {
								y: 68,
								x: 123.5,
								width: 191,
								var: "txt_get",
								valign: "middle",
								text: "领取",
								strokeColor: "#479722",
								stroke: 4,
								pivotY: 37,
								pivotX: 151,
								height: 73,
								fontSize: 45,
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 62
						}]
					}, {
						type: "Button",
						props: {
							width: 355,
							var: "btn_skip",
							stateNum: 1,
							skin: "activity/common_btn1.png",
							sizeGrid: "42,42,42,42",
							height: 136,
							centerY: -80,
							centerX: 0
						},
						compId: 16,
						child: [{
							type: "Sprite",
							props: {
								y: 33,
								x: 30,
								width: 70,
								texture: "activity/icvideo2.png",
								height: 70
							},
							compId: 51
						}, {
							type: "Label",
							props: {
								y: 19,
								x: 119,
								width: 197,
								var: "txt_skip",
								valign: "middle",
								text: "跳过本关",
								strokeColor: "#c37d14",
								stroke: 4,
								height: 99,
								fontSize: 50,
								font: "黑体",
								color: "#ffffff",
								bold: !1,
								align: "center"
							},
							compId: 63
						}]
					}, {
						type: "Button",
						props: {
							width: 355,
							var: "btn_back",
							stateNum: 1,
							skin: "activity/common_btn3.png",
							sizeGrid: "42,42,42,42",
							height: 136,
							centerY: 145,
							centerX: 0
						},
						compId: 64,
						child: [{
							type: "Label",
							props: {
								width: 267,
								var: "txt_back",
								valign: "middle",
								text: "返回首页",
								strokeColor: "#c37d14",
								stroke: 4,
								height: 99,
								fontSize: 50,
								color: "#ffffff",
								centerY: 0,
								centerX: 0,
								bold: !1,
								align: "center"
							},
							compId: 69
						}]
					}, {
						type: "Box",
						props: {
							width: 485,
							var: "box_bar",
							height: 82,
							centerX: 0,
							bottom: 40
						},
						compId: 76,
						child: [{
							type: "Sprite",
							props: {
								texture: "activity/z15.png"
							},
							compId: 77
						}, {
							type: "Sprite",
							props: {
								y: 7.5,
								x: 8,
								width: 10,
								var: "bar",
								texture: "activity/z16.png"
							},
							compId: 78
						}, {
							type: "Sprite",
							props: {
								y: -28.5,
								x: 454,
								texture: "activity/z14.png"
							},
							compId: 79,
							child: [{
								type: "Sprite",
								props: {
									y: 48,
									x: 49,
									var: "Lucky",
									texture: "activity/z13.png",
									scaleY: 1,
									scaleX: 1,
									rotation: 0,
									pivotY: 43,
									pivotX: 41
								},
								compId: 80
							}]
						}]
					}],
					animations: [{
						nodes: [{
							target: 80,
							keyframes: {
								y: [{
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "y",
									index: 0
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 5
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 10
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 15
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 20
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 25
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 30
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 35
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 40
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 45
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 50
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 55
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 60
								}, {
									value: 48,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "y",
									index: 75
								}],
								x: [{
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "x",
									index: 0
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 5
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 10
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 15
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 20
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 25
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 30
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 35
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 40
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 45
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 50
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 55
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 60
								}, {
									value: 49,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "x",
									index: 75
								}],
								scaleY: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "scaleY",
									index: 0
								}, {
									value: 1.2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "scaleY",
									index: 5
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 10
								}, {
									value: 1.2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 15
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 20
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 25
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 30
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 35
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 40
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 45
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 50
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 55
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 60
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleY",
									index: 75
								}],
								scaleX: [{
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "scaleX",
									index: 0
								}, {
									value: 1.2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "scaleX",
									index: 5
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 10
								}, {
									value: 1.2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 15
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 20
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 25
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 30
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 35
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 40
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 45
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 50
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 55
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 60
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "scaleX",
									index: 75
								}],
								rotation: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 5
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 10
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 15
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 20
								}, {
									value: -25,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "rotation",
									index: 25
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 30
								}, {
									value: 15,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 35
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 40
								}, {
									value: -15,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 45
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 50
								}, {
									value: 15,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 55
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 60
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "rotation",
									index: 75
								}],
								pivotY: [{
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "pivotY",
									index: 0
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 5
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 10
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 15
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 20
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 25
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 30
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 35
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 40
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 45
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 50
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 55
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 60
								}, {
									value: 43,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotY",
									index: 75
								}],
								pivotX: [{
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									key: "pivotX",
									index: 0
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 5
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 10
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 15
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 20
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 25
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 30
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 35
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 40
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 45
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 50
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 55
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 60
								}, {
									value: 41,
									tweenMethod: "linearNone",
									tween: !0,
									target: 80,
									label: null,
									key: "pivotX",
									index: 75
								}]
							}
						}],
						name: "barShake",
						id: 1,
						frameRate: 24,
						action: 0
					}],
					loadList: ["activity/common_btn1.png", "activity/icon_gold.png", "activity/icvideo2.png", "activity/common_btn3.png", "activity/z15.png", "activity/z16.png", "activity/z14.png", "activity/z13.png"],
					loadList3D: []
				}, e.MoonResultPanelUI = I, Yi("ui.view.MoonResultPanelUI", I);
				class w extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(w.uiView)
					}
				}
				w.uiView = {
					type: "View",
					props: {
						width: 768,
						height: 1663
					},
					compId: 2,
					child: [{
						type: "Panel",
						props: {
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
							bgColor: "#000000",
							alpha: .6
						},
						compId: 17
					}, {
						type: "List",
						props: {
							var: "hgamelist",
							top: 205,
							spaceX: 20,
							runtime: "moon/core/ui/extension/ListEx.ts",
							right: 40,
							repeatY: 1,
							left: 40
						},
						compId: 4,
						child: [{
							type: "Box",
							props: {
								y: 0,
								x: 0,
								name: "render"
							},
							compId: 7,
							child: [{
								type: "Image",
								props: {
									width: 128,
									skin: "moon/1.png",
									name: "Img_Game",
									left: 10,
									height: 128
								},
								compId: 6
							}]
						}]
					}, {
						type: "List",
						props: {
							width: 716,
							var: "vgamelist",
							top: 411,
							spaceY: 28,
							spaceX: 16,
							runtime: "moon/core/ui/extension/ListEx.ts",
							repeatX: 2,
							height: 1242,
							centerX: 0
						},
						compId: 5,
						child: [{
							type: "Box",
							props: {
								y: 0,
								x: 0,
								width: 350,
								name: "render",
								height: 250
							},
							compId: 9,
							child: [{
								type: "Image",
								props: {
									width: 350,
									skin: "moon/2.png",
									name: "Img_Game",
									left: 10,
									height: 250,
									centerY: 0
								},
								compId: 8
							}]
						}]
					}, {
						type: "Button",
						props: {
							width: 280,
							var: "goon",
							stateNum: 1,
							skin: "moon/ad/results/common_btn1.png",
							sizeGrid: "42,42,42,42",
							labelStrokeColor: "#c37d14",
							labelStroke: 4,
							labelSize: 50,
							labelFont: "SimHei",
							labelColors: "#ffffff",
							labelAlign: "center",
							label: "继续游戏",
							height: 120,
							centerY: 200,
							centerX: 0
						},
						compId: 10
					}, {
						type: "Image",
						props: {
							top: 160,
							skin: "moon/ad/results/bg_start.png",
							left: 40
						},
						compId: 11
					}, {
						type: "Image",
						props: {
							x: 584,
							top: 160,
							skin: "moon/ad/results/bg_start.png",
							rotation: 180,
							right: 40,
							pivotY: 11,
							pivotX: 126
						},
						compId: 12
					}, {
						type: "Image",
						props: {
							top: 150,
							skin: "moon/ad/results/img_friend.png",
							centerX: 0
						},
						compId: 13
					}, {
						type: "Image",
						props: {
							top: 350,
							skin: "moon/ad/results/img_push.png",
							centerX: 0
						},
						compId: 14
					}, {
						type: "Image",
						props: {
							x: 0,
							top: 360,
							skin: "moon/ad/results/bg_start.png",
							left: 40
						},
						compId: 15
					}, {
						type: "Image",
						props: {
							x: 584,
							top: 360,
							skin: "moon/ad/results/bg_start.png",
							rotation: 180,
							right: 40,
							pivotY: 11,
							pivotX: 126
						},
						compId: 16
					}],
					loadList: ["moon/1.png", "moon/2.png", "moon/ad/results/common_btn1.png", "moon/ad/results/bg_start.png", "moon/ad/results/img_friend.png", "moon/ad/results/img_push.png"],
					loadList3D: []
				}, e.MoonResultsUI = w, Yi("ui.view.MoonResultsUI", w);
				class S extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(S.uiView)
					}
				}
				S.uiView = {
					type: "View",
					props: {
						width: 768,
						mouseThrough: !0,
						height: 1663
					},
					compId: 2,
					child: [{
						type: "Box",
						props: {
							visible: !1
						},
						compId: 29,
						child: [{
							type: "Panel",
							props: {
								y: -60,
								x: -34,
								width: 704,
								top: 60,
								height: 162,
								centerX: 2
							},
							compId: 12,
							child: [{
								type: "List",
								props: {
									width: 659,
									var: "hgamelist",
									top: 22,
									spaceY: 10,
									spaceX: 8,
									runtime: "moon/core/ui/extension/ListEx.ts",
									right: 11,
									repeatX: 5,
									left: 10,
									height: 130,
									bottom: 11
								},
								compId: 4,
								child: [{
									type: "Box",
									props: {
										name: "render"
									},
									compId: 7,
									child: [{
										type: "Image",
										props: {
											width: 128,
											skin: "moon/1.png",
											name: "Img_Game",
											left: 6,
											height: 128
										},
										compId: 6
									}]
								}]
							}, {
								type: "Image",
								props: {
									width: 684,
									var: "hgamebox",
									skin: "moon/ad/results2/bg_frame.png",
									height: 150,
									centerY: 3,
									centerX: 0,
									sizeGrid: "30,30,30,30"
								},
								compId: 13
							}]
						}, {
							type: "Box",
							props: {
								y: -60,
								x: -34,
								width: 684,
								var: "ov_native",
								top: 44,
								height: 178,
								centerX: 12
							},
							compId: 14,
							child: [{
								type: "Image",
								props: {
									top: 0,
									right: 0,
									name: "icon",
									left: 0,
									bottom: 0,
									alpha: .8
								},
								compId: 15
							}, {
								type: "Image",
								props: {
									var: "btn_close",
									skin: "moon/ad/results2/btn_close.png",
									name: "btn_close"
								},
								compId: 16
							}, {
								type: "Box",
								props: {
									width: 99,
									right: 0,
									height: 60,
									bottom: 0
								},
								compId: 20,
								child: [{
									type: "Box",
									props: {
										top: 0,
										right: 0,
										left: 0,
										bottom: 0,
										bgColor: "#1b1b1b",
										alpha: .7
									},
									compId: 21
								}, {
									type: "Label",
									props: {
										text: "广告",
										fontSize: 40,
										color: "#ffffff",
										centerY: 0,
										centerX: 0,
										bold: !0,
										alpha: .8
									},
									compId: 19
								}]
							}]
						}, {
							type: "Box",
							props: {
								y: -60,
								x: -34,
								width: 128,
								var: "ov_native2",
								top: 500,
								left: 580,
								height: 128
							},
							compId: 22,
							child: [{
								type: "Image",
								props: {
									top: 0,
									right: 0,
									name: "icon",
									left: 0,
									bottom: 0,
									alpha: .8
								},
								compId: 23
							}, {
								type: "Box",
								props: {
									width: 87,
									var: "ov_native_close",
									top: -30,
									right: 41,
									height: 30
								},
								compId: 25,
								child: [{
									type: "Box",
									props: {
										top: 0,
										right: 0,
										left: -3,
										bottom: 0,
										bgColor: "#1b1b1b",
										alpha: .7
									},
									compId: 26
								}, {
									type: "Label",
									props: {
										text: "广告 X",
										fontSize: 30,
										color: "#ffffff",
										centerY: 0,
										centerX: 0,
										bold: !0,
										alpha: .8
									},
									compId: 27
								}]
							}]
						}]
					}],
					loadList: ["moon/1.png", "moon/ad/results2/bg_frame.png", "moon/ad/results2/btn_close.png"],
					loadList3D: []
				}, e.MoonResults2UI = S, Yi("ui.view.MoonResults2UI", S);
				class v extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(v.uiView)
					}
				}
				v.uiView = {
					type: "View",
					props: {
						width: 750,
						mouseThrough: !0,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Button",
						props: {
							width: 384,
							visible: !0,
							var: "btn_revive",
							stateNum: 1,
							skin: "activity/common_btn1.png",
							pivotY: 51,
							pivotX: 191,
							labelStrokeColor: "#a35b19",
							labelStroke: 3,
							labelSize: 42,
							labelPadding: "0,0,0,0",
							labelFont: "黑体",
							labelColors: "#ffffff",
							labelBold: !0,
							height: 93,
							centerY: 3,
							centerX: 0
						},
						compId: 5,
						child: [{
							type: "Image",
							props: {
								y: 18,
								x: 22,
								visible: !0,
								var: "reskin",
								skin: "activity/icvideo2.png"
							},
							compId: 9
						}, {
							type: "Label",
							props: {
								y: 25.5,
								x: 121,
								var: "txt_revive",
								text: "看视频复活",
								strokeColor: "#a35b19",
								stroke: 3,
								padding: "0,0,0,0",
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 20
						}]
					}, {
						type: "Button",
						props: {
							width: 200,
							visible: !1,
							var: "btn_giveup",
							stateNum: 1,
							labelStrokeColor: "#95531f",
							labelStroke: 3,
							labelSize: 30,
							labelFont: "黑体",
							labelColors: "#ffffff",
							labelBold: !0,
							hitTestPrior: !0,
							height: 75,
							centerY: 100,
							centerX: 0
						},
						compId: 6,
						child: [{
							type: "Label",
							props: {
								width: 200,
								var: "txt_giveup",
								valign: "middle",
								text: "放弃复活",
								strokeColor: "#95531f",
								stroke: 3,
								height: 75,
								fontSize: 30,
								color: "#ffffff",
								align: "center"
							},
							compId: 27
						}]
					}],
					animations: [{
						nodes: [{
							target: 9,
							keyframes: {
								var: [{
									value: "reviveskin",
									tweenMethod: "linearNone",
									tween: !1,
									target: 9,
									key: "var",
									index: 0
								}]
							}
						}],
						name: "gamePause",
						id: 1,
						frameRate: 24,
						action: 0
					}],
					loadList: ["activity/common_btn1.png", "activity/icvideo2.png"],
					loadList3D: []
				}, e.MoonReviveOneUI = v, Yi("ui.view.MoonReviveOneUI", v);
				class E extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(E.uiView)
					}
				}
				E.uiView = {
					type: "View",
					props: {
						width: 750,
						mouseThrough: !0,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Button",
						props: {
							width: 200,
							visible: !1,
							var: "btn_giveup",
							stateNum: 1,
							labelStrokeColor: "#95531f",
							labelStroke: 3,
							labelSize: 30,
							labelFont: "黑体",
							labelColors: "#ffffff",
							labelBold: !0,
							hitTestPrior: !0,
							height: 75,
							centerY: 100,
							centerX: 0
						},
						compId: 6,
						child: [{
							type: "Label",
							props: {
								var: "txt_giveup",
								valign: "middle",
								text: "分享复活",
								strokeColor: "#95531f",
								stroke: 3,
								fontSize: 30,
								color: "#ffffff",
								centerY: 0,
								centerX: 0,
								align: "center"
							},
							compId: 27
						}]
					}, {
						type: "Button",
						props: {
							width: 327,
							visible: !1,
							var: "btn_share",
							stateNum: 1,
							skin: "activity/common_btn1.png",
							pivotY: 51,
							pivotX: 191,
							labelStrokeColor: "#a35b19",
							labelStroke: 3,
							labelSize: 42,
							labelPadding: "0,0,0,0",
							labelFont: "黑体",
							labelColors: "#ffffff",
							labelBold: !0,
							height: 93,
							centerY: -126,
							centerX: 0
						},
						compId: 21,
						child: [{
							type: "Image",
							props: {
								y: 18,
								x: 13,
								visible: !0,
								skin: "activity/icshare.png"
							},
							compId: 22
						}, {
							type: "Label",
							props: {
								y: 25.5,
								x: 104,
								var: "txt_share",
								text: "分享复活",
								strokeColor: "#a35b19",
								stroke: 3,
								padding: "0,0,0,0",
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0
							},
							compId: 23
						}]
					}, {
						type: "Button",
						props: {
							width: 327,
							visible: !0,
							var: "btn_diamond",
							stateNum: 1,
							skin: "activity/common_btn3.png",
							pivotY: 51,
							pivotX: 191,
							labelStrokeColor: "#a35b19",
							labelStroke: 3,
							labelSize: 42,
							labelPadding: "0,0,0,0",
							labelFont: "黑体",
							labelColors: "#ffffff",
							labelBold: !0,
							height: 93,
							centerY: 3,
							centerX: 0
						},
						compId: 16,
						child: [{
							type: "Image",
							props: {
								y: 0,
								x: 10,
								width: 118,
								visible: !0,
								skin: "activity/icon_diamond.png",
								scaleY: .7,
								scaleX: .7,
								height: 118
							},
							compId: 18
						}, {
							type: "Label",
							props: {
								y: 25.5,
								x: 88,
								var: "lab_diamond",
								text: "10 钻石复活",
								strokeColor: "#a35b19",
								stroke: 3,
								padding: "0,0,0,0",
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0
							},
							compId: 19
						}]
					}],
					animations: [{
						nodes: [{
							target: 9,
							keyframes: {
								var: [{
									value: "reviveskin",
									tweenMethod: "linearNone",
									tween: !1,
									target: 9,
									key: "var",
									index: 0
								}]
							}
						}],
						name: "gamePause",
						id: 1,
						frameRate: 24,
						action: 0
					}],
					loadList: ["activity/common_btn1.png", "activity/icshare.png", "activity/common_btn3.png", "activity/icon_diamond.png"],
					loadList3D: []
				}, e.MoonReviveTwoUI = E, Yi("ui.view.MoonReviveTwoUI", E);
				class L extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(L.uiView)
					}
				}
				L.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 1,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 2
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							sizeGrid: "58,58,58,58",
							height: 1054,
							centerY: 0,
							centerX: 0
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 870,
								centerY: -82,
								centerX: 0
							},
							compId: 4
						}, {
							type: "Label",
							props: {
								y: 24,
								x: 91.5,
								width: 479,
								var: "txt_title",
								valign: "middle",
								text: "每日钻石",
								height: 65,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 21
						}, {
							type: "Sprite",
							props: {
								y: -26.5,
								x: 80,
								texture: "activity/nn5.png"
							},
							compId: 23
						}, {
							type: "Sprite",
							props: {
								y: 22,
								x: 573,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 24
						}, {
							type: "Sprite",
							props: {
								y: -23,
								x: 508,
								texture: "activity/nn5.png"
							},
							compId: 25
						}, {
							type: "Image",
							props: {
								width: 602,
								skin: "activity/common_bg2.png",
								sizeGrid: "26,23,25,24",
								height: 64,
								centerY: -366,
								centerX: 0
							},
							compId: 6
						}, {
							type: "Image",
							props: {
								y: 199,
								x: 512,
								skin: "activity/icon_diamond.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 8
						}, {
							type: "Label",
							props: {
								width: 602,
								var: "txt_title2",
								valign: "middle",
								text: "完成任务可获400钻石",
								height: 63,
								fontSize: 38,
								font: "黑体",
								color: "#ffffff",
								centerY: -367,
								centerX: 0,
								bold: !1,
								alpha: 87,
								align: "center"
							},
							compId: 7
						}, {
							type: "Label",
							props: {
								width: 563,
								text: "第一步: 点击         进入会话",
								height: 46,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: -284,
								centerX: 4,
								bold: !1,
								align: "left"
							},
							compId: 9
						}, {
							type: "Label",
							props: {
								width: 101,
								text: "确认",
								height: 38,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: -288,
								centerX: -37,
								bold: !1,
								align: "center"
							},
							compId: 10
						}, {
							type: "Label",
							props: {
								width: 470,
								text: "第二步: 点击",
								height: 71,
								fontSize: 36,
								font: "黑体",
								color: "#925c3e",
								centerY: 59,
								centerX: -39,
								align: "left"
							},
							compId: 11
						}, {
							type: "Label",
							props: {
								width: 293,
								text: "发送小程序",
								height: 42,
								fontSize: 36,
								font: "黑体",
								color: "#ff6c34",
								centerY: 45,
								centerX: 98,
								bold: !1,
								align: "left"
							},
							compId: 12
						}, {
							type: "Image",
							props: {
								width: 509,
								var: "btnGet",
								skin: "activity/common_btn1.png",
								height: 128,
								centerY: 438,
								centerX: 2
							},
							compId: 13,
							child: [{
								type: "Label",
								props: {
									y: 37,
									x: 100,
									width: 249,
									var: "txt_btnGet",
									valign: "middle",
									text: "立即领钻石",
									strokeColor: "#bb6a13",
									stroke: 3,
									height: 54,
									fontSize: 48,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 22
							}, {
								type: "Image",
								props: {
									y: 8,
									x: 349,
									skin: "activity/icon_diamond.png",
									scaleY: .9,
									scaleX: .9
								},
								compId: 17
							}]
						}, {
							type: "Image",
							props: {
								y: 402,
								x: 333,
								width: 708,
								skin: "share/service1.png",
								scaleY: .85,
								scaleX: .85,
								pivotY: 150,
								pivotX: 354,
								height: 300
							},
							compId: 14
						}, {
							type: "Image",
							props: {
								y: 722,
								x: 333,
								width: 708,
								skin: "share/service2.png",
								scaleY: .85,
								scaleX: .85,
								pivotY: 141,
								pivotX: 354,
								height: 300
							},
							compId: 15
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/nn5.png", "activity/btn_close.png", "activity/common_bg2.png", "activity/icon_diamond.png", "activity/common_btn1.png", "share/service1.png", "share/service2.png"],
					loadList3D: []
				}, e.MoonServiceUI = L, Yi("ui.view.MoonServiceUI", L);
				class A extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(A.uiView)
					}
				}
				A.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 1,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 31
					}, {
						type: "Image",
						props: {
							width: 666,
							skin: "activity/nn1.png",
							height: 1001,
							centerY: -71,
							centerX: 0
						},
						compId: 2,
						child: [{
							type: "Image",
							props: {
								y: 11,
								x: 10,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 833
							},
							compId: 3
						}, {
							type: "Sprite",
							props: {
								y: -26.5,
								x: 83.5,
								texture: "activity/nn5.png"
							},
							compId: 95
						}, {
							type: "Sprite",
							props: {
								y: 21,
								x: 573,
								visible: !1,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 96
						}, {
							type: "Sprite",
							props: {
								y: -28,
								x: 508,
								texture: "activity/nn5.png"
							},
							compId: 97
						}, {
							type: "Label",
							props: {
								y: 25,
								x: 96.5,
								width: 473,
								var: "txt_title",
								valign: "middle",
								text: "签到奖励",
								height: 64,
								fontSize: 42,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								align: "center"
							},
							compId: 67
						}, {
							type: "Image",
							props: {
								y: 134,
								x: 39,
								width: 183,
								var: "img_0",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								height: 213,
								gray: !1
							},
							compId: 6,
							child: [{
								type: "Label",
								props: {
									y: 11,
									width: 172,
									var: "txt_day1",
									valign: "middle",
									text: "第1天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: -1,
									align: "center"
								},
								compId: 12
							}, {
								type: "Label",
								props: {
									width: 122,
									var: "txt_num0",
									valign: "middle",
									text: "x20K",
									height: 37,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									centerY: 71,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 13
							}, {
								type: "Image",
								props: {
									width: 118,
									var: "icon0",
									skin: "activity/icon_diamond.png",
									scaleY: 1,
									scaleX: 1,
									pivotY: 59,
									pivotX: 59,
									height: 118,
									centerY: 8,
									centerX: 0
								},
								compId: 14
							}]
						}, {
							type: "Image",
							props: {
								y: 269,
								x: 130.5,
								visible: !1,
								var: "img0",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 56
						}, {
							type: "Image",
							props: {
								y: 134,
								x: 241,
								width: 183,
								var: "img_1",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								height: 213,
								gray: !1
							},
							compId: 32,
							child: [{
								type: "Label",
								props: {
									y: 11,
									width: 172,
									var: "txt_day2",
									valign: "middle",
									text: "第2天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 33
							}, {
								type: "Label",
								props: {
									width: 162,
									var: "txt_num1",
									valign: "middle",
									text: "x10 ",
									pivotY: 22,
									pivotX: 81,
									height: 43,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									centerY: 75,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 34
							}, {
								type: "Image",
								props: {
									var: "icon1",
									skin: "activity/icon_diamond.png",
									scaleY: 1,
									scaleX: 1,
									centerY: 7,
									centerX: 0
								},
								compId: 35
							}]
						}, {
							type: "Image",
							props: {
								y: 269,
								x: 332.5,
								visible: !1,
								var: "img1",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 57
						}, {
							type: "Image",
							props: {
								y: 134,
								x: 443,
								width: 183,
								var: "img_2",
								skin: "activity/nn3.png",
								sizeGrid: "77,72,64,69",
								height: 213,
								gray: !1
							},
							compId: 36,
							child: [{
								type: "Label",
								props: {
									y: 12,
									width: 172,
									var: "txt_day3",
									valign: "middle",
									text: "第3天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 37
							}, {
								type: "Label",
								props: {
									width: 169,
									var: "txt_num2",
									valign: "middle",
									text: "x50K",
									height: 43,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									centerY: 75,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 38
							}, {
								type: "Image",
								props: {
									y: 109.5,
									x: 92,
									width: 118,
									var: "icon2",
									skin: "activity/icon_gold.png",
									scaleY: .9,
									scaleX: .9,
									pivotY: 59,
									pivotX: 59,
									height: 118
								},
								compId: 39
							}]
						}, {
							type: "Image",
							props: {
								y: 269,
								x: 536.5,
								visible: !1,
								var: "img2",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 58
						}, {
							type: "Image",
							props: {
								y: 365,
								x: 39,
								width: 183,
								var: "img_3",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								height: 213,
								gray: !1
							},
							compId: 40,
							child: [{
								type: "Label",
								props: {
									y: 10,
									width: 172,
									var: "txt_day4",
									valign: "middle",
									text: "第4天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 41
							}, {
								type: "Label",
								props: {
									width: 122,
									var: "txt_num3",
									valign: "middle",
									text: "x100K",
									height: 43,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									centerY: 76,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 42
							}, {
								type: "Image",
								props: {
									y: 59,
									x: 38,
									var: "icon3",
									skin: "activity/icon_gold.png",
									scaleY: .9,
									scaleX: .9
								},
								compId: 43
							}]
						}, {
							type: "Image",
							props: {
								y: 502,
								x: 130.5,
								visible: !1,
								var: "img3",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 59
						}, {
							type: "Image",
							props: {
								y: 365,
								width: 183,
								var: "img_4",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								height: 213,
								gray: !1,
								centerX: -3
							},
							compId: 44,
							child: [{
								type: "Label",
								props: {
									y: 12,
									width: 172,
									var: "txt_day5",
									valign: "middle",
									text: "第5天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 45
							}, {
								type: "Label",
								props: {
									y: 179,
									x: 92,
									width: 122,
									var: "txt_num4",
									valign: "middle",
									text: "x20 ",
									pivotY: 22,
									pivotX: 61,
									height: 43,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									bold: !0,
									align: "center"
								},
								compId: 46
							}, {
								type: "Image",
								props: {
									y: 54.5,
									x: 32.5,
									var: "icon4",
									skin: "activity/icon_diamond.png",
									scaleY: 1,
									scaleX: 1
								},
								compId: 47
							}]
						}, {
							type: "Image",
							props: {
								y: 502,
								x: 328,
								visible: !1,
								var: "img4",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 60
						}, {
							type: "Image",
							props: {
								y: 365,
								width: 183,
								var: "img_5",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								right: 40,
								height: 213,
								gray: !1
							},
							compId: 48,
							child: [{
								type: "Label",
								props: {
									y: 11,
									width: 172,
									var: "txt_day6",
									valign: "middle",
									text: "第6天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 49
							}, {
								type: "Label",
								props: {
									y: 179,
									x: 92,
									width: 122,
									var: "txt_num5",
									valign: "middle",
									text: "x200K",
									pivotY: 22,
									pivotX: 61,
									height: 43,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									bold: !0,
									align: "center"
								},
								compId: 50
							}, {
								type: "Image",
								props: {
									y: 57,
									x: 40,
									var: "icon5",
									skin: "activity/icon_gold.png",
									scaleY: .9,
									scaleX: .9
								},
								compId: 51
							}]
						}, {
							type: "Image",
							props: {
								y: 502,
								x: 534.5,
								visible: !1,
								var: "img5",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 61
						}, {
							type: "Image",
							props: {
								y: 601,
								x: 41,
								width: 585,
								var: "img_6",
								skin: "activity/nn3.png",
								sizeGrid: "86,65,53,65",
								height: 213,
								gray: !1
							},
							compId: 52,
							child: [{
								type: "Label",
								props: {
									y: 11,
									width: 563,
									var: "txt_day7",
									valign: "middle",
									text: "第7天",
									height: 43,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									centerX: 0,
									align: "center"
								},
								compId: 53
							}, {
								type: "Label",
								props: {
									width: 122,
									var: "txt_num6",
									text: "x30",
									height: 48,
									fontSize: 32,
									font: "黑体",
									color: "#8d5f43",
									centerY: 77,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 54
							}, {
								type: "Image",
								props: {
									width: 118,
									var: "icon6",
									skin: "activity/shop4.png",
									scaleY: 1,
									scaleX: 1,
									height: 118,
									centerY: 0,
									centerX: 0
								},
								compId: 55
							}]
						}, {
							type: "Image",
							props: {
								y: 735,
								x: 534,
								visible: !1,
								var: "img6",
								skin: "activity/hook.png",
								scaleY: .7,
								scaleX: .7
							},
							compId: 62
						}, {
							type: "Button",
							props: {
								width: 360,
								visible: !0,
								var: "btn_get",
								height: 69,
								centerY: 553,
								centerX: 11
							},
							compId: 23,
							child: [{
								type: "Label",
								props: {
									width: 498,
									var: "lbl_get",
									text: "直接领取",
									height: 39,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									align: "center"
								},
								compId: 26
							}, {
								type: "Image",
								props: {
									y: 0,
									x: 295,
									visible: !0,
									var: "img_get_coin",
									skin: "activity/icon_gold.png",
									scaleY: .5,
									scaleX: .5
								},
								compId: 63
							}, {
								type: "Image",
								props: {
									y: 0,
									x: 295,
									visible: !0,
									var: "img_get_zs",
									skin: "activity/icon_diamond.png",
									scaleY: .5,
									scaleX: .5
								},
								compId: 65
							}]
						}, {
							type: "Button",
							props: {
								y: 918,
								x: 334,
								width: 508,
								var: "btn_one",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								height: 120,
								anchorY: .5,
								anchorX: .5
							},
							compId: 98,
							child: [{
								type: "Label",
								props: {
									width: 407,
									var: "lab_one",
									valign: "middle",
									text: "观看视频领取",
									strokeColor: "#b47516",
									stroke: 3,
									pivotY: 24,
									pivotX: 234,
									height: 47,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 99
							}, {
								type: "Image",
								props: {
									x: 406,
									visible: !1,
									var: "imgcoin",
									skin: "activity/icon_gold.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -4
								},
								compId: 100
							}, {
								type: "Image",
								props: {
									x: 406,
									visible: !1,
									var: "imgdia",
									skin: "activity/icon_diamond.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -4
								},
								compId: 101
							}]
						}, {
							type: "Button",
							props: {
								y: 918,
								x: 334,
								width: 508,
								visible: !1,
								var: "btn_share",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								sizeGrid: "42,42,42,42",
								height: 120,
								anchorY: .5,
								anchorX: .5
							},
							compId: 24,
							child: [{
								type: "Label",
								props: {
									width: 407,
									var: "lbl_share",
									valign: "middle",
									text: "双倍领取",
									strokeColor: "#b47516",
									stroke: 3,
									pivotY: 24,
									pivotX: 249,
									height: 47,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									bold: !0,
									align: "center"
								},
								compId: 28
							}, {
								type: "Image",
								props: {
									x: 407,
									visible: !1,
									var: "img_share_coin",
									skin: "activity/icon_gold.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -3
								},
								compId: 64
							}, {
								type: "Image",
								props: {
									x: 407,
									visible: !1,
									var: "img_share_zs",
									skin: "activity/icon_diamond.png",
									scaleY: .7,
									scaleX: .7,
									centerY: -3
								},
								compId: 66
							}]
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/nn5.png", "activity/btn_close.png", "activity/nn3.png", "activity/icon_diamond.png", "activity/hook.png", "activity/icon_gold.png", "activity/shop4.png", "activity/common_btn1.png"],
					loadList3D: []
				}, e.MoonSigninUI = A, Yi("ui.view.MoonSigninUI", A);
				class T extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(T.uiView)
					}
				}
				T.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334,
						centerY: 0,
						centerX: 0
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							top: 0,
							skin: "wxlocal/bg0.png",
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 602,
							var: "b",
							top: 0,
							left: 148,
							height: 187
						},
						compId: 4
					}, {
						type: "Sprite",
						props: {
							y: 233,
							x: 0,
							width: 750,
							texture: "activity/bg_006.png",
							height: 51
						},
						compId: 65
					}, {
						type: "List",
						props: {
							width: 715,
							var: "listskin",
							top: 330,
							spaceY: 30,
							spaceX: 30,
							repeatX: 3,
							name: "render",
							left: 19,
							height: 1005,
							bottom: 0
						},
						compId: 31,
						child: [{
							type: "Box",
							props: {
								y: 0,
								x: 0,
								renderType: "render"
							},
							compId: 62,
							child: [{
								type: "Image",
								props: {
									y: 0,
									x: 0,
									skin: "activity/bg_003.png"
								},
								compId: 60
							}, {
								type: "Image",
								props: {
									y: 41,
									x: 39,
									width: 140,
									var: "img",
									skin: "gskin/Ball11.png",
									name: "img",
									height: 140
								},
								compId: 61
							}, {
								type: "Box",
								props: {
									y: 41,
									x: 45,
									visible: !1,
									var: "basket",
									scaleY: 1.3,
									scaleX: 1.3,
									name: "basket"
								},
								compId: 106,
								child: [{
									type: "Image",
									props: {
										var: "one",
										skin: "gskin/Basket0_0.png",
										name: "one"
									},
									compId: 107
								}, {
									type: "Image",
									props: {
										var: "two",
										skin: "gskin/Basket0_1.png",
										name: "two"
									},
									compId: 108
								}]
							}, {
								type: "Image",
								props: {
									y: 11.5,
									x: 7.5,
									width: 202,
									var: "skinbg",
									skin: "activity/z8.png",
									name: "skinbg",
									height: 194
								},
								compId: 75
							}, {
								type: "Image",
								props: {
									y: 141,
									x: 121,
									visible: !1,
									var: "imgxuan",
									skin: "activity/hook.png",
									scaleY: .7,
									scaleX: .7,
									name: "imgxuan"
								},
								compId: 115
							}, {
								type: "Text",
								props: {
									y: 161,
									x: 8,
									width: 202,
									valign: "middle",
									text: "20关解锁",
									strokeColor: "#b22724",
									stroke: 4,
									name: "txt_lock",
									height: 32,
									fontSize: 28,
									font: "黑体",
									color: "#ffffff",
									align: "center",
									runtime: "Laya.Text"
								},
								compId: 116
							}, {
								type: "Button",
								props: {
									y: 137,
									x: 16,
									width: 183,
									stateNum: 1,
									skin: "activity/common_btn1.png",
									name: "btn_video",
									height: 78
								},
								compId: 117,
								child: [{
									type: "Label",
									props: {
										y: 23,
										x: 68,
										width: 94,
										text: "解锁",
										name: "txt_video",
										height: 30,
										fontSize: 30,
										font: "黑体",
										color: "#ffffff",
										bold: !0,
										align: "center"
									},
									compId: 119
								}, {
									type: "Sprite",
									props: {
										y: 14.5,
										x: 14,
										texture: "activity/icvideo2.png",
										scaleY: .8,
										scaleX: .8
									},
									compId: 118
								}]
							}]
						}]
					}, {
						type: "Sprite",
						props: {
							y: 68,
							x: 232.5,
							texture: "gui/bg_004.png"
						},
						compId: 63
					}, {
						type: "Button",
						props: {
							y: 60,
							x: 35,
							width: 82,
							var: "btn_jiesu",
							stateNum: 1,
							skin: "activity/btn_close.png",
							height: 82
						},
						compId: 64
					}, {
						type: "Button",
						props: {
							y: 198,
							x: 13,
							var: "btn_ball",
							stateNum: 1,
							skin: "gui/btn_002.png"
						},
						compId: 66,
						child: [{
							type: "Label",
							props: {
								y: 40,
								x: 11.5,
								width: 155,
								var: "lab_ball",
								valign: "middle",
								text: "球",
								height: 40,
								fontSize: 35,
								font: "黑体",
								color: "#ffffd4",
								bold: !0,
								align: "center"
							},
							compId: 56
						}]
					}, {
						type: "Button",
						props: {
							y: 198,
							x: 195,
							var: "btn_wings",
							stateNum: 1,
							skin: "gui/btn_003.png"
						},
						compId: 67,
						child: [{
							type: "Label",
							props: {
								y: 60,
								x: 89,
								width: 158,
								var: "lab_wings",
								valign: "middle",
								text: "翅膀",
								pivotY: 22,
								pivotX: 79,
								height: 43,
								fontSize: 35,
								font: "黑体",
								color: "#ffffd4",
								bold: !0,
								align: "center"
							},
							compId: 52
						}]
					}, {
						type: "Button",
						props: {
							y: 198,
							x: 377,
							var: "btn_basket",
							stateNum: 1,
							skin: "gui/btn_003.png"
						},
						compId: 68,
						child: [{
							type: "Label",
							props: {
								y: 60,
								x: 89,
								width: 156,
								var: "lab_basket",
								valign: "middle",
								text: "篮圈",
								pivotY: 19,
								pivotX: 78,
								height: 38,
								fontSize: 35,
								font: "黑体",
								color: "#ffffd4",
								bold: !0,
								align: "center"
							},
							compId: 54
						}]
					}, {
						type: "Button",
						props: {
							y: 198,
							x: 559,
							var: "btn_flame",
							stateNum: 1,
							skin: "gui/btn_003.png"
						},
						compId: 69,
						child: [{
							type: "Label",
							props: {
								y: 60,
								x: 89,
								width: 156,
								var: "lab_flame",
								valign: "middle",
								text: "火焰",
								pivotY: 18,
								pivotX: 78,
								height: 35,
								fontSize: 35,
								font: "黑体",
								color: "#ffffd4",
								bold: !0,
								align: "center"
							},
							compId: 53
						}]
					}, {
						type: "Image",
						props: {
							y: 0,
							x: 0,
							visible: !1,
							var: "dialogb",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 111
					}, {
						type: "Box",
						props: {
							y: 329.5,
							x: 40,
							width: 674,
							visible: !1,
							var: "check",
							height: 675
						},
						compId: 76,
						child: [{
							type: "Image",
							props: {
								y: 0,
								x: 0,
								width: 668,
								visible: !0,
								skin: "activity/nn1.png",
								height: 648
							},
							compId: 89,
							child: [{
								type: "Image",
								props: {
									y: 12,
									x: 11,
									width: 646,
									skin: "activity/bg_nn2.png",
									height: 488
								},
								compId: 90,
								child: [{
									type: "Label",
									props: {
										y: 12,
										x: 86.5,
										width: 473,
										var: "txt_title",
										valign: "middle",
										text: "解锁条件",
										height: 64,
										fontSize: 42,
										font: "黑体",
										color: "#ffffff",
										align: "center"
									},
									compId: 91
								}]
							}, {
								type: "Button",
								props: {
									y: 512,
									x: 78.5,
									width: 509,
									var: "btn_check",
									stateNum: 1,
									skin: "activity/common_btn1.png",
									height: 117
								},
								compId: 92,
								child: [{
									type: "Label",
									props: {
										y: 35.5,
										x: 208,
										var: "txt_check",
										text: "确定",
										strokeColor: "#a86013",
										stroke: 3,
										fontSize: 42,
										font: "黑体",
										color: "#ffffff",
										bold: !0
									},
									compId: 94
								}]
							}, {
								type: "Image",
								props: {
									width: 185,
									var: "buy",
									skin: "gskin/Ball0.png",
									height: 185,
									centerY: -57,
									centerX: 0
								},
								compId: 95
							}, {
								type: "Label",
								props: {
									y: 410,
									x: 16,
									wordWrap: !0,
									width: 636,
									var: "lbl_cost",
									valign: "middle",
									text: "花费100金币购买",
									height: 55,
									fontSize: 34,
									font: "黑体",
									color: "#8e4f25",
									bold: !0,
									align: "center"
								},
								compId: 96
							}, {
								type: "Image",
								props: {
									y: 28,
									x: 554.5,
									var: "btn_close",
									skin: "activity/btn_close.png"
								},
								compId: 102
							}, {
								type: "Box",
								props: {
									y: 206,
									x: 267,
									visible: !1,
									var: "diabas",
									scaleY: 1.4,
									scaleX: 1.4
								},
								compId: 112,
								child: [{
									type: "Image",
									props: {
										var: "first",
										skin: "gskin/Basket0_0.png",
										name: "first"
									},
									compId: 113
								}, {
									type: "Image",
									props: {
										var: "second",
										skin: "gskin/Basket0_1.png",
										name: "second"
									},
									compId: 114
								}]
							}]
						}]
					}],
					loadList: ["wxlocal/bg0.png", "activity/bg_006.png", "activity/bg_003.png", "gskin/Ball11.png", "gskin/Basket0_0.png", "gskin/Basket0_1.png", "activity/z8.png", "activity/hook.png", "activity/common_btn1.png", "activity/icvideo2.png", "gui/bg_004.png", "activity/btn_close.png", "gui/btn_002.png", "gui/btn_003.png", "activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "gskin/Ball0.png"],
					loadList3D: []
				}, e.MoonSkinUI = T, Yi("ui.view.MoonSkinUI", T);
				class x extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(x.uiView)
					}
				}
				x.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 4
					}, {
						type: "Box",
						props: {
							centerY: -145,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 6,
						child: [{
							type: "Animation",
							props: {
								var: "getAni",
								source: "animation/fx_unlock.ani"
							},
							compId: 21
						}]
					}, {
						type: "Image",
						props: {
							y: 548,
							x: 401,
							width: 179,
							var: "img_ball",
							skin: "gskin/Ball0.png",
							height: 179,
							centerY: -145,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 5,
						child: [{
							type: "Image",
							props: {
								y: -1,
								x: 0,
								width: 179,
								visible: !1,
								var: "img_basket",
								skin: "gskin/Basket5_1.png",
								height: 179
							},
							compId: 10
						}]
					}, {
						type: "Box",
						props: {
							y: 377,
							x: 375,
							centerY: -145,
							centerX: 0,
							anchorY: .5,
							anchorX: .5
						},
						compId: 25,
						child: [{
							type: "Animation",
							props: {
								var: "lockAni",
								source: "animation/fx_glow.ani"
							},
							compId: 27
						}]
					}, {
						type: "Box",
						props: {
							y: 167,
							width: 570,
							var: "lock_normal",
							height: 847,
							centerX: 0
						},
						compId: 29,
						child: [{
							type: "Image",
							props: {
								var: "tip1",
								skin: "activity/z11.png",
								centerY: -424,
								centerX: 0
							},
							compId: 24
						}, {
							type: "Label",
							props: {
								wordWrap: !0,
								width: 389,
								var: "lab_dialog1",
								text: "恭喜解锁新皮肤!点击购买",
								leading: 10,
								height: 70,
								fontSize: 50,
								color: "#ffffff",
								centerY: 236,
								centerX: 0,
								anchorY: .5,
								anchorX: .5,
								align: "center"
							},
							compId: 7
						}, {
							type: "Button",
							props: {
								y: 754,
								width: 385,
								var: "btn_check",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								height: 117,
								centerX: 0
							},
							compId: 11,
							child: [{
								type: "Label",
								props: {
									y: 32.5,
									x: 159,
									width: 182,
									var: "lab_coin",
									valign: "middle",
									text: "50000",
									strokeColor: "#a86013",
									stroke: 3,
									height: 52,
									fontSize: 52,
									font: "黑体",
									color: "#ffffff",
									bold: !0,
									align: "center"
								},
								compId: 12
							}, {
								type: "Sprite",
								props: {
									y: 17,
									x: 64,
									width: 106,
									texture: "activity/icon_gold.png",
									scaleY: .8,
									scaleX: .8,
									height: 108
								},
								compId: 13
							}]
						}]
					}, {
						type: "Box",
						props: {
							y: 191,
							width: 571,
							visible: !1,
							var: "lock_video",
							height: 835,
							centerX: 0
						},
						compId: 30,
						child: [{
							type: "Button",
							props: {
								y: 730,
								width: 385,
								visible: !0,
								var: "btn_video",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								height: 117,
								centerX: 0
							},
							compId: 14,
							child: [{
								type: "Label",
								props: {
									y: 30,
									x: 145,
									text: "免费获得",
									strokeColor: "#a86013",
									stroke: 3,
									fontSize: 52,
									font: "黑体",
									color: "#ffffff",
									bold: !0
								},
								compId: 15
							}, {
								type: "Sprite",
								props: {
									y: 11,
									x: 41,
									width: 106,
									texture: "activity/icvideo2.png",
									scaleY: .8,
									scaleX: .8,
									height: 108
								},
								compId: 16
							}]
						}, {
							type: "Label",
							props: {
								wordWrap: !0,
								width: 389,
								visible: !0,
								var: "lab_dialog2",
								valign: "middle",
								text: "哇噢,爆出了绝版皮肤!",
								strokeColor: "#235cef",
								stroke: 2,
								height: 90,
								fontSize: 32,
								font: "SimHei",
								color: "#ffffff",
								centerY: 216,
								centerX: 0,
								bold: !0,
								anchorY: .5,
								anchorX: .5,
								align: "center"
							},
							compId: 20
						}, {
							type: "Image",
							props: {
								y: -181,
								visible: !0,
								var: "tip2",
								skin: "activity/z10.png",
								centerY: -447,
								centerX: 0
							},
							compId: 23
						}]
					}, {
						type: "Label",
						props: {
							wordWrap: !0,
							width: 389,
							text: "点击任意区域关闭",
							leading: 10,
							height: 70,
							fontSize: 30,
							color: "#ffffff",
							centerY: 441,
							centerX: 0,
							anchorY: .5,
							anchorX: .5,
							align: "center"
						},
						compId: 31
					}],
					animations: [{
						nodes: [{
							target: 5,
							keyframes: {
								skewY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewY",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewY",
									index: 13
								}],
								skewX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewX",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "skewX",
									index: 13
								}],
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleY",
									index: 17
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									label: null,
									key: "scaleY",
									index: 20
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "scaleX",
									index: 17
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									label: null,
									key: "scaleX",
									index: 20
								}],
								rotation: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 17
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 20
								}, {
									value: -30,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 24
								}, {
									value: 30,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 29
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 5,
									key: "rotation",
									index: 34
								}]
							}
						}, {
							target: 7,
							keyframes: {
								wordWrap: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "wordWrap",
									index: 0
								}, {
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "wordWrap",
									index: 34
								}],
								strokeColor: [{
									value: "#235cef",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "strokeColor",
									index: 0
								}, {
									value: "#235cef",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "strokeColor",
									index: 13
								}, {
									value: "#235cef",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "strokeColor",
									index: 33
								}],
								stroke: [{
									value: 2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "stroke",
									index: 0
								}, {
									value: 2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "stroke",
									index: 13
								}, {
									value: 2,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "stroke",
									index: 33
								}],
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleY",
									index: 17
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 13
								}, {
									value: .8,
									tweenMethod: "linearNone",
									tween: !0,
									target: 7,
									key: "scaleX",
									index: 17
								}],
								font: [{
									value: "SimSun",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "font",
									index: 0
								}, {
									value: "SimSun",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "font",
									index: 13
								}, {
									value: "SimSun",
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "font",
									index: 33
								}],
								bold: [{
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "bold",
									index: 0
								}, {
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "bold",
									index: 13
								}, {
									value: !0,
									tweenMethod: "linearNone",
									tween: !1,
									target: 7,
									key: "bold",
									index: 33
								}]
							}
						}, {
							target: 25,
							keyframes: {
								visible: [{
									value: !1,
									tweenMethod: "linearNone",
									tween: !1,
									target: 25,
									key: "visible",
									index: 0
								}]
							}
						}, {
							target: 20,
							keyframes: {
								y: [{
									value: 654,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "y",
									index: 0
								}],
								x: [{
									value: 285,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "x",
									index: 0
								}],
								width: [{
									value: 389,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "width",
									index: 0
								}, {
									value: 445,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "width",
									index: 10
								}],
								text: [{
									value: "哇噢,爆出了绝版皮肤!",
									tweenMethod: "linearNone",
									tween: !1,
									target: 20,
									key: "text",
									index: 0
								}, {
									value: "哇噢,爆出了绝版皮肤!",
									tweenMethod: "linearNone",
									tween: !1,
									target: 20,
									key: "text",
									index: 10
								}],
								scaleY: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "scaleY",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "scaleY",
									index: 10
								}],
								scaleX: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "scaleX",
									index: 0
								}, {
									value: 1,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "scaleX",
									index: 10
								}],
								leading: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "leading",
									index: 0
								}, {
									value: 10,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "leading",
									index: 10
								}],
								fontSize: [{
									value: 32,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "fontSize",
									index: 0
								}, {
									value: 46,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "fontSize",
									index: 10
								}],
								anchorY: [{
									value: .5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "anchorY",
									index: 0
								}],
								anchorX: [{
									value: .5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 20,
									key: "anchorX",
									index: 0
								}],
								align: [{
									value: "center",
									tweenMethod: "linearNone",
									tween: !1,
									target: 20,
									key: "align",
									index: 0
								}, {
									value: "center",
									tweenMethod: "linearNone",
									tween: !1,
									target: 20,
									key: "align",
									index: 10
								}]
							}
						}],
						name: "ani1",
						id: 1,
						frameRate: 30,
						action: 0
					}],
					loadList: ["activity/common_bg5.png", "animation/fx_unlock.ani", "gskin/Ball0.png", "gskin/Basket5_1.png", "animation/fx_glow.ani", "activity/z11.png", "activity/common_btn1.png", "activity/icon_gold.png", "activity/icvideo2.png", "activity/z10.png"],
					loadList3D: []
				}, e.MoonSkinTipUI = x, Yi("ui.view.MoonSkinTipUI", x);
				class b extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(b.uiView)
					}
				}
				b.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "b",
							top: 0,
							skin: "activity/common_bg5.png",
							sizeGrid: "2,2,2,2",
							right: 0,
							left: 0,
							bottom: 0,
							alpha: 1
						},
						compId: 3
					}, {
						type: "Image",
						props: {
							width: 670,
							skin: "activity/nn1.png",
							height: 648,
							centerY: 0,
							centerX: 5
						},
						compId: 4,
						child: [{
							type: "Image",
							props: {
								y: 12,
								x: 11,
								width: 646,
								skin: "activity/bg_nn2.png",
								height: 488
							},
							compId: 5,
							child: [{
								type: "Label",
								props: {
									y: 12,
									x: 86.5,
									width: 473,
									var: "txt_title",
									valign: "middle",
									text: "空投补给箱",
									height: 64,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									align: "center"
								},
								compId: 6
							}]
						}, {
							type: "Button",
							props: {
								y: 512,
								x: 78.5,
								width: 509,
								var: "btn_play",
								stateNum: 1,
								skin: "activity/common_btn1.png",
								height: 117
							},
							compId: 7,
							child: [{
								type: "Image",
								props: {
									y: 27,
									x: 138,
									width: 57,
									skin: "activity/icvideo2.png",
									height: 57
								},
								compId: 8
							}, {
								type: "Label",
								props: {
									y: 35.5,
									x: 208,
									var: "txt_open",
									text: "立即打开",
									strokeColor: "#a86013",
									stroke: 3,
									fontSize: 42,
									font: "黑体",
									color: "#ffffff",
									bold: !0
								},
								compId: 9
							}]
						}, {
							type: "Image",
							props: {
								y: 140,
								x: 146.5,
								skin: "activity/supply_img.png"
							},
							compId: 10
						}, {
							type: "Label",
							props: {
								y: 379,
								x: 15.5,
								wordWrap: !0,
								width: 636,
								var: "txt_info1",
								valign: "middle",
								text: "发现大量空投补给箱!",
								height: 55,
								fontSize: 34,
								font: "黑体",
								color: "#8e4f25",
								bold: !0,
								align: "center"
							},
							compId: 11
						}, {
							type: "Label",
							props: {
								y: 429,
								x: 16.5,
								wordWrap: !0,
								width: 636,
								var: "txt_info2",
								valign: "middle",
								text: "打开可获得大量钻石和金币",
								height: 55,
								fontSize: 34,
								font: "黑体",
								color: "#8e4f25",
								bold: !0,
								align: "center"
							},
							compId: 12
						}, {
							type: "Sprite",
							props: {
								y: -25,
								x: 85.5,
								texture: "activity/nn5.png"
							},
							compId: 13
						}, {
							type: "Sprite",
							props: {
								y: 24,
								x: 574,
								var: "btn_close",
								texture: "activity/btn_close.png"
							},
							compId: 14
						}, {
							type: "Sprite",
							props: {
								y: -26,
								x: 509,
								texture: "activity/nn5.png"
							},
							compId: 15
						}]
					}],
					loadList: ["activity/common_bg5.png", "activity/nn1.png", "activity/bg_nn2.png", "activity/common_btn1.png", "activity/icvideo2.png", "activity/supply_img.png", "activity/nn5.png", "activity/btn_close.png"],
					loadList3D: []
				}, e.MoonSupplyUI = b, Yi("ui.view.MoonSupplyUI", b);
				class C extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(C.uiView)
					}
				}
				C.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							width: 100,
							var: "bg",
							skin: "common/common_bg3.png",
							sizeGrid: "18,14,18,16",
							height: 100,
							centerY: 0,
							centerX: 0,
							alpha: .7
						},
						compId: 7,
						child: [{
							type: "Box",
							props: {
								visible: !1,
								var: "box_txt",
								top: 0,
								right: 0,
								left: 0,
								bottom: 0
							},
							compId: 9,
							child: [{
								type: "Label",
								props: {
									y: 0,
									x: -325,
									width: 750,
									var: "content",
									valign: "middle",
									text: "show me the money",
									height: 100,
									fontSize: 40,
									color: "#ffffff",
									centerY: 0,
									centerX: 0,
									align: "center"
								},
								compId: 4
							}]
						}, {
							type: "Box",
							props: {
								y: 0,
								x: 0,
								visible: !1,
								var: "box_icon",
								top: 0,
								right: 0,
								left: 0,
								bottom: 0
							},
							compId: 10,
							child: [{
								type: "Image",
								props: {
									y: 26,
									width: 48,
									var: "img_icon",
									left: 20,
									height: 48,
									centerY: 0
								},
								compId: 8
							}, {
								type: "Label",
								props: {
									y: 0,
									var: "lbl_icon",
									valign: "middle",
									text: "show me the money",
									right: 0,
									left: 80,
									height: 100,
									fontSize: 40,
									color: "#ffffff",
									centerY: 0,
									align: "center"
								},
								compId: 11
							}]
						}]
					}],
					loadList: ["common/common_bg3.png"],
					loadList3D: []
				}, e.MoonTipUI = C, Yi("ui.view.MoonTipUI", C);
				class R extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(R.uiView)
					}
				}
				R.uiView = {
					type: "View",
					props: {
						width: 750,
						mouseThrough: !0,
						height: 1336
					},
					compId: 2,
					child: [{
						type: "Box",
						props: {
							var: "money",
							top: 65,
							left: 45,
							height: 56
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								y: 0,
								x: -27,
								width: 178,
								skin: "activity/add_top_bg.png",
								height: 41
							},
							compId: 4
						}, {
							type: "Image",
							props: {
								y: 20,
								x: -8,
								var: "img_money",
								skin: "activity/icon_gold.png",
								anchorY: .5,
								anchorX: .5
							},
							compId: 6
						}, {
							type: "Label",
							props: {
								y: 21,
								x: 64,
								var: "txt_money",
								valign: "middle",
								text: "999.9K",
								fontSize: 28,
								font: "黑体",
								color: "#ffffff",
								bold: !0,
								anchorY: .5,
								anchorX: .5,
								align: "center"
							},
							compId: 7
						}, {
							type: "Box",
							props: {
								y: -18.5,
								x: 89,
								width: 83,
								var: "btn_addmoney",
								height: 79
							},
							compId: 14,
							child: [{
								type: "Image",
								props: {
									y: 22.5,
									x: 24.5,
									width: 34,
									var: "btn",
									skin: "activity/plus.png",
									height: 34
								},
								compId: 5
							}]
						}]
					}, {
						type: "Box",
						props: {
							y: 0,
							x: 0,
							width: 226,
							visible: !1,
							var: "gem",
							top: 44,
							left: 268,
							height: 56
						},
						compId: 8,
						child: [{
							type: "Image",
							props: {
								skin: "activity/add_top_bg.png"
							},
							compId: 9
						}, {
							type: "Image",
							props: {
								y: 25,
								x: 31,
								width: 60,
								var: "img_gem",
								skin: "activity/icon_diamond.png",
								pivotY: 30,
								pivotX: 30,
								height: 60
							},
							compId: 11
						}, {
							type: "Label",
							props: {
								y: 5,
								x: 52,
								width: 126,
								var: "txt_gem",
								valign: "middle",
								text: "9999",
								height: 42,
								fontSize: 36,
								font: "黑体",
								color: "#7b3d1f",
								bold: !0,
								align: "center"
							},
							compId: 12
						}, {
							type: "Box",
							props: {
								y: -17,
								x: 129,
								width: 110,
								var: "btn_addgem",
								height: 85
							},
							compId: 15,
							child: [{
								type: "Image",
								props: {
									y: 25.5,
									x: 47,
									skin: "activity/plus.png"
								},
								compId: 10
							}]
						}]
					}],
					loadList: ["activity/add_top_bg.png", "activity/icon_gold.png", "activity/plus.png", "activity/icon_diamond.png"],
					loadList3D: []
				}, e.MoonTopBarUI = R, Yi("ui.view.MoonTopBarUI", R);
				class M extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(M.uiView)
					}
				}
				M.uiView = {
					type: "View",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Box",
						props: {
							y: 329,
							x: 40,
							width: 674,
							visible: !1,
							var: "check",
							height: 675
						},
						compId: 3,
						child: [{
							type: "Image",
							props: {
								y: 0,
								x: 0,
								width: 668,
								visible: !0,
								skin: "activity/nn1.png",
								height: 648
							},
							compId: 4,
							child: [{
								type: "Image",
								props: {
									y: 12,
									x: 11,
									width: 646,
									skin: "activity/bg_nn2.png",
									height: 488
								},
								compId: 5,
								child: [{
									type: "Label",
									props: {
										y: 12,
										x: 86.5,
										width: 473,
										valign: "middle",
										text: "解锁条件",
										height: 64,
										fontSize: 42,
										font: "黑体",
										color: "#ffffff",
										align: "center"
									},
									compId: 6
								}]
							}, {
								type: "Button",
								props: {
									y: 512,
									x: 78.5,
									width: 509,
									var: "btn_check",
									stateNum: 1,
									skin: "activity/common_btn1.png",
									height: 117
								},
								compId: 7,
								child: [{
									type: "Label",
									props: {
										y: 35.5,
										x: 208,
										text: "确定",
										strokeColor: "#a86013",
										stroke: 3,
										fontSize: 42,
										font: "黑体",
										color: "#ffffff",
										bold: !0
									},
									compId: 8
								}]
							}, {
								type: "Image",
								props: {
									var: "buy",
									skin: "gskin/Ball0.png",
									centerY: -40,
									centerX: 0
								},
								compId: 9
							}, {
								type: "Label",
								props: {
									y: 410,
									x: 16,
									wordWrap: !0,
									width: 636,
									var: "lbl_cost",
									valign: "middle",
									text: "花费100金币购买",
									height: 55,
									fontSize: 34,
									font: "黑体",
									color: "#8e4f25",
									bold: !0,
									align: "center"
								},
								compId: 10
							}, {
								type: "Image",
								props: {
									y: 28,
									x: 554.5,
									var: "btn_close",
									skin: "activity/btn_close.png"
								},
								compId: 11
							}, {
								type: "Box",
								props: {
									y: 169,
									x: 247,
									visible: !1,
									var: "diabas",
									scaleY: .7,
									scaleX: .7
								},
								compId: 12,
								child: [{
									type: "Image",
									props: {
										var: "first",
										skin: "gskin/Basket0_0.png",
										name: "first"
									},
									compId: 13
								}, {
									type: "Image",
									props: {
										var: "second",
										skin: "gskin/Basket0_1.png",
										name: "second"
									},
									compId: 14
								}]
							}]
						}]
					}],
					loadList: ["activity/nn1.png", "activity/bg_nn2.png", "activity/common_btn1.png", "gskin/Ball0.png", "activity/btn_close.png", "gskin/Basket0_0.png", "gskin/Basket0_1.png"],
					loadList3D: []
				}, e.UnlockInfoUI = M, Yi("ui.view.UnlockInfoUI", M)
			}(e.view || (e.view = {}))
		}(Pi || (Pi = {})),
		function (e) {
			! function (e) {
				class t extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(t.uiView)
					}
				}
				t.uiView = {
					type: "View",
					props: {
						width: 1334,
						top: 0,
						right: 0,
						left: 0,
						height: 750,
						bottom: 0
					},
					compId: 2,
					child: [{
						type: "Box",
						props: {
							y: 10,
							x: 10,
							var: "panel_close",
							top: -1,
							right: 0,
							left: 0,
							bottom: 0,
							bgColor: "#000000",
							alpha: .7
						},
						compId: 252
					}, {
						type: "Image",
						props: {
							y: 20,
							x: 20,
							skin: "diy/bg_diy_01.png",
							centerY: 7,
							centerX: 0
						},
						compId: 254,
						child: [{
							type: "Image",
							props: {
								y: -16,
								x: 178,
								skin: "diy/img_diy_07.png",
								centerY: -276,
								centerX: 0
							},
							compId: 255,
							child: [{
								type: "Label",
								props: {
									y: 42,
									x: 190,
									text: "提示",
									fontSize: 46,
									color: "#0198E1",
									bold: !0,
									anchorY: .5,
									anchorX: .5
								},
								compId: 256
							}]
						}, {
							type: "Label",
							props: {
								y: 144,
								x: 107,
								width: 503,
								var: "lbl_content",
								text: "网络状况不佳，请检查网络后\\n重新进入游戏",
								leading: 15,
								height: 153,
								fontSize: 39,
								color: "#3f94be"
							},
							compId: 259
						}, {
							type: "Button",
							props: {
								y: 434,
								x: 242.5,
								var: "btn_try",
								stateNum: 1,
								skin: "diy/btn_diy_05.png",
								labelSize: 40,
								labelPadding: "0,0,10,0",
								labelColors: "#20902d",
								labelBold: !0,
								label: "重试"
							},
							compId: 260
						}]
					}],
					animations: [{
						nodes: [{
							target: 229,
							keyframes: {
								y: [{
									value: 458,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "y",
									index: 0
								}, {
									value: 464,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "y",
									index: 10
								}, {
									value: 443,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "y",
									index: 20
								}, {
									value: 447,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "y",
									index: 30
								}, {
									value: 458,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 1015,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "x",
									index: 0
								}, {
									value: 997,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "x",
									index: 10
								}, {
									value: 993,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "x",
									index: 20
								}, {
									value: 1018,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "x",
									index: 30
								}, {
									value: 1015,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									label: null,
									key: "x",
									index: 40
								}],
								rotation: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									key: "rotation",
									index: 0
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 229,
									label: null,
									key: "rotation",
									index: 40
								}]
							}
						}, {
							target: 234,
							keyframes: {
								y: [{
									value: 375,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									key: "y",
									index: 0
								}, {
									value: 364,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									key: "y",
									index: 10
								}, {
									value: 375,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									label: null,
									key: "y",
									index: 20
								}, {
									value: 394,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									key: "y",
									index: 30
								}, {
									value: 375,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 91.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									key: "x",
									index: 0
								}, {
									value: 91.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									label: null,
									key: "x",
									index: 20
								}, {
									value: 91.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 234,
									label: null,
									key: "x",
									index: 40
								}]
							}
						}, {
							target: 230,
							keyframes: {
								y: [{
									value: 570,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									key: "y",
									index: 0
								}, {
									value: 560,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									key: "y",
									index: 10
								}, {
									value: 570,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									label: null,
									key: "y",
									index: 20
								}, {
									value: 580,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									key: "y",
									index: 30
								}, {
									value: 570,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 284,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									key: "x",
									index: 0
								}, {
									value: 284,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									label: null,
									key: "x",
									index: 20
								}, {
									value: 284,
									tweenMethod: "linearNone",
									tween: !0,
									target: 230,
									label: null,
									key: "x",
									index: 40
								}]
							}
						}, {
							target: 231,
							keyframes: {
								y: [{
									value: 327,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									key: "y",
									index: 0
								}, {
									value: 316,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									key: "y",
									index: 10
								}, {
									value: 327,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									label: null,
									key: "y",
									index: 20
								}, {
									value: 337,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									key: "y",
									index: 30
								}, {
									value: 327,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 1202,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									key: "x",
									index: 0
								}, {
									value: 1202,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									label: null,
									key: "x",
									index: 20
								}, {
									value: 1202.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									key: "x",
									index: 30
								}, {
									value: 1202,
									tweenMethod: "linearNone",
									tween: !0,
									target: 231,
									label: null,
									key: "x",
									index: 40
								}]
							}
						}, {
							target: 232,
							keyframes: {
								y: [{
									value: 166,
									tweenMethod: "linearNone",
									tween: !0,
									target: 232,
									key: "y",
									index: 0
								}, {
									value: 151,
									tweenMethod: "linearNone",
									tween: !0,
									target: 232,
									key: "y",
									index: 10
								}, {
									value: 166,
									tweenMethod: "linearNone",
									tween: !0,
									target: 232,
									label: null,
									key: "y",
									index: 20
								}, {
									value: 175,
									tweenMethod: "linearNone",
									tween: !0,
									target: 232,
									key: "y",
									index: 30
								}, {
									value: 166,
									tweenMethod: "linearNone",
									tween: !0,
									target: 232,
									label: null,
									key: "y",
									index: 40
								}]
							}
						}, {
							target: 236,
							keyframes: {
								y: [{
									value: 39.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "y",
									index: 0
								}, {
									value: 33,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "y",
									index: 20
								}, {
									value: 15.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "y",
									index: 30
								}, {
									value: 39.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 1176.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "x",
									index: 0
								}, {
									value: 1188,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "x",
									index: 10
								}, {
									value: 1186,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "x",
									index: 20
								}, {
									value: 1167,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									key: "x",
									index: 30
								}, {
									value: 1176.5,
									tweenMethod: "linearNone",
									tween: !0,
									target: 236,
									label: null,
									key: "x",
									index: 40
								}]
							}
						}, {
							target: 233,
							keyframes: {
								y: [{
									value: 127,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "y",
									index: 0
								}, {
									value: 105,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "y",
									index: 20
								}, {
									value: 127,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									label: null,
									key: "y",
									index: 40
								}],
								x: [{
									value: 288,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "x",
									index: 0
								}, {
									value: 271,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "x",
									index: 10
								}, {
									value: 260,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "x",
									index: 20
								}, {
									value: 284,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									key: "x",
									index: 30
								}, {
									value: 288,
									tweenMethod: "linearNone",
									tween: !0,
									target: 233,
									label: null,
									key: "x",
									index: 40
								}]
							}
						}, {
							target: 235,
							keyframes: {
								x: [{
									value: 119,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "x",
									index: 0
								}, {
									value: 119,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "x",
									index: 40
								}],
								rotation: [{
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "rotation",
									index: 0
								}, {
									value: 16,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "rotation",
									index: 10
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "rotation",
									index: 20
								}, {
									value: 16,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "rotation",
									index: 30
								}, {
									value: 0,
									tweenMethod: "linearNone",
									tween: !0,
									target: 235,
									key: "rotation",
									index: 40
								}]
							}
						}],
						name: "ani1",
						id: 1,
						frameRate: 24,
						action: 0
					}],
					loadList: ["diy/bg_diy_01.png", "diy/img_diy_07.png", "diy/btn_diy_05.png"],
					loadList3D: []
				}, e.MoonConfirmUI = t, Yi("ui.wxlocal.MoonConfirmUI", t);
				class i extends Fi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(i.uiView)
					}
				}
				i.uiView = {
					type: "View",
					props: {
						width: 750,
						top: 0,
						right: 0,
						left: 0,
						height: 1334,
						bottom: 0
					},
					compId: 2,
					child: [{
						type: "Image",
						props: {
							var: "img_bg",
							top: 0,
							skin: "wxlocal/bg0.png",
							right: 0,
							left: 0,
							bottom: 0
						},
						compId: 4
					}, {
						type: "Image",
						props: {
							var: "img_logo",
							skin: "wxlocal/bg_l_01.png",
							centerY: 0,
							centerX: 0
						},
						compId: 8
					}, {
						type: "Box",
						props: {
							var: "activity_box",
							right: 0,
							left: 0,
							height: 480,
							centerY: 80
						},
						compId: 33
					}, {
						type: "Box",
						props: {
							width: 750,
							height: 200,
							centerX: 0,
							bottom: 260
						},
						compId: 19,
						child: [{
							type: "Image",
							props: {
								width: 463,
								skin: "wxlocal/loadBg.png",
								sizeGrid: "0,1,0,1",
								height: 18,
								centerX: 0,
								bottom: 0
							},
							compId: 13
						}, {
							type: "Image",
							props: {
								width: 463,
								skin: "wxlocal/loadBar.png",
								sizeGrid: "0,1,0,1",
								height: 18,
								centerX: 0,
								bottom: 0
							},
							compId: 15,
							child: [{
								type: "Image",
								props: {
									width: 463,
									var: "bar",
									skin: "wxlocal/loadBar.png",
									sizeGrid: "0,1,0,1",
									renderType: "mask",
									height: 18,
									centerY: 0,
									centerX: 0
								},
								compId: 16
							}]
						}, {
							type: "Text",
							props: {
								y: 145,
								x: 540,
								var: "tPgs",
								valign: "middle",
								text: "100%",
								fontSize: 25,
								font: "Microsoft YaHei",
								color: "#000000",
								bold: !0,
								align: "center",
								runtime: "Laya.Text"
							},
							compId: 17
						}, {
							type: "Label",
							props: {
								width: 250,
								var: "loadinglbl",
								valign: "middle",
								text: "加载中...",
								left: 185,
								fontSize: 25,
								font: "Microsoft YaHei",
								color: "#000000",
								bottom: 30,
								align: "left"
							},
							compId: 24
						}, {
							type: "Animation",
							props: {
								y: 157.5,
								x: 157,
								var: "loadcricle",
								source: "wxlocal/loadcricle.ani",
								autoPlay: !0
							},
							compId: 32
						}]
					}, {
						type: "Box",
						props: {
							right: 0,
							left: 0,
							height: 200,
							bottom: 0
						},
						compId: 27,
						child: [{
							type: "Label",
							props: {
								wordWrap: !1,
								width: 134,
								valign: "top",
								text: "version:",
								right: 50,
								overflow: "scroll",
								height: 46,
								fontSize: 25,
								font: "Microsoft YaHei",
								color: "#000000",
								bottom: 10,
								bold: !0,
								align: "left"
							},
							compId: 22
						}, {
							type: "Label",
							props: {
								wordWrap: !1,
								width: 107,
								var: "version",
								valign: "top",
								text: "10",
								right: -37,
								overflow: "scroll",
								height: 46,
								fontSize: 25,
								font: "Microsoft YaHei",
								color: "#000000",
								bottom: 10,
								bold: !0,
								align: "left"
							},
							compId: 23
						}, {
							type: "Label",
							props: {
								width: 750,
								visible: !1,
								valign: "middle",
								top: 30,
								text: "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。",
								fontSize: 23,
								color: "#000000",
								centerX: 0,
								align: "center"
							},
							compId: 25
						}, {
							type: "Label",
							props: {
								width: 750,
								visible: !1,
								valign: "middle",
								top: 65,
								text: "适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。",
								fontSize: 23,
								color: "#000000",
								centerX: 0,
								align: "center"
							},
							compId: 28
						}]
					}],
					loadList: ["wxlocal/bg0.png", "wxlocal/bg_l_01.png", "wxlocal/loadBg.png", "wxlocal/loadBar.png", "wxlocal/loadcricle.ani"],
					loadList3D: []
				}, e.MoonLoadingUI = i, Yi("ui.wxlocal.MoonLoadingUI", i);
				class n extends Xi {
					constructor() {
						super()
					}
					createChildren() {
						super.createChildren(), this.createView(n.uiView)
					}
				}
				n.uiView = {
					type: "Scene",
					props: {
						width: 750,
						height: 1334
					},
					compId: 2,
					child: [{
						type: "Script",
						props: {
							runtime: "moon/Start.ts"
						},
						compId: 8
					}],
					loadList: [],
					loadList3D: []
				}, e.StartUI = n, Yi("ui.wxlocal.StartUI", n)
			}(e.wxlocal || (e.wxlocal = {}))
		}(Pi || (Pi = {}));
	class Ui extends Pi.GuideUI {
		constructor() {
			super(), this.bottom = 180, this.centerX = 0
		}
		show(e) {
			this.ani1.play(0, !0), Ni.app.pauseGame(!0), this.parent || e.addChild(this)
		}
		hide() {
			this.parent && (this.ani1.stop(), this.removeSelf(), Ni.app.playGame(!0))
		}
	}
	class Hi {
		constructor(e, t, i, n = 75, a = .45, o = .72) {
			this._value = 0, this._maxWidth = 0, this._rateH = .45, this._rateW = .72, this._startX = 75, this._owner = e, this._startX = n, this._rateH = a, this._rateW = o, this.setSize(t, i)
		}
		setSize(e, t) {
			this._owner && (this._owner.size(e, t), this._owner.bar_di.size(e, t), this._owner.bar_jindu.height = t * this._rateH, this._owner.bar_jindu.y = (t - this._owner.bar_jindu.height) / 2, this._maxWidth = this._owner.width * this._rateW, this._owner.bar_jindu.width = this._maxWidth * this._value, this._owner.bar_jindu.x = this._startX)
		}
		set value(e) {
			this._owner && (this._value = e, this._owner.bar_jindu.width = this._maxWidth * e)
		}
		get value() {
			return this._value
		}
	}
	class Wi {
		constructor() {
			this.isLoad = !1, this.isShow = !1, this.support = !1, this.gamePortalAd = null, this.support = Laya.Browser.onQGMiniGame && qg.getSystemInfoSync().platformVersionCode >= 1076, this.initDrawerGameAd()
		}
		static get I() {
			return h.get(Wi)
		}
		isSupport() {
			return this.support
		}
		initDrawerGameAd() {
			if (!this.support) return;
			if (0 == U.I.getConf().ad.gameportal.length || null == U.I.getConf().ad.gameportal[0]) return;
			this.gamePortalAd = qg.createGamePortalAd({
				adUnitId: U.I.getConf().ad.gameportal[0]
			});
			let e = this;
			this.gamePortalAd.onLoad(() => {
				console.error("onLoad", "互推盒子九宫格广告加载成功 this.isLoad:" + e.isShow), e.isLoad = !0, e.isShow && e.gamePortalAd.show().then(() => {
					console.error("gamePortalAd show success")
				}).catch(t => {
					console.error("gamePortalAd show fail with:" + t.errCode + "," + t.errMsg), e.onClose()
				})
			}), this.gamePortalAd.onClose(() => {
				e.onClose(), console.error("互推盒子九宫格广告关闭")
			}), this.gamePortalAd.onError(t => {
				e.onClose(), console.error("互推盒子九宫格广告出错"), console.error(t)
			})
		}
		showPlatformDrawerGameAd(e, t) {
			if (!this.support) return;
			e && (this.mCloseCaller = e), t && (this.mCloseFunc = t);
			let i = this;
			this.isShow = !0, this.isLoad ? this.gamePortalAd.show().then(() => { }).catch(e => {
				i.onClose()
			}) : this.gamePortalAd.load().then(() => { }).catch(e => {
				i.onClose()
			})
		}
		onClose() {
			this.mCloseCaller && this.mCloseFunc && this.mCloseFunc.call(this.mCloseCaller), this.mCloseCaller = null, this.mCloseFunc = null, this.isLoad = !1, this.isShow = !1, this.gamePortalAd.load().then(() => { }).catch(e => { })
		}
	}
	class Ki extends Pi.HudViewUI {
		constructor() {
			super(), this._inGame = !1, this._lifeCount = 0, this._isBossGuan = !1, this.isRelive = !1, this.height = this.boxReady.height = this.boxStart.height = Laya.stage.height, this.width = this.boxNormal.width = this.boxReady.width = this.boxStart.width = Laya.stage.width, Ni.evt.addEventListener(ce.SCORE_CHANGE, this.scoreChange, this), Ni.evt.addEventListener(ce.MONEY_CHANGE, this.moneyChange, this), Ni.evt.addEventListener(ce.LIFE_CHANGE, this.lifeChange, this), Ni.evt.addEventListener(ce.ATTACK_CHANGE, this.attackChange, this), Ni.evt.addEventListener(ce.BOSSHP_CHANGE, this.bossHpChange, this), Ni.evt.addEventListener(ce.GAME_START, this.gameStart, this), this.btnLuzhi.mouseEnabled = !1, this.boxReady.mouseThrough = !0, this.boxStart.mouseThrough = !0, this.on(Laya.Event.MOUSE_DOWN, this, this.onStartGame), this.btnShop.on(Laya.Event.CLICK, this, this.onOpenMoto), this.btnWeapon.on(Laya.Event.CLICK, this, this.onOpenWeapon), this.Btn_Sound.on(Laya.Event.CLICK, this, this.onSoundEvent), this.imgGames.on(Laya.Event.CLICK, this, this.onMoreGameClick), this._barPro = new Hi(this.barPro, 346, 77, 68, .38, .69), this._bossPro = new Hi(this.bossPro, 398, 82, 78, .38, .79), ht.I.statisticsReport(f.VIEW_INDEX), this.updateSoundShow()
		}
		initHud() {
			this._inGame = !1, this.mouseThrough = !1, this.boxReady.visible = !0, this.boxStart.visible = !1, this.boxBoss0.visible = !1, this._isBossGuan = !1, this.lblGold.text = ln.getMoneyShowStr(J.I.money);
			let e = J.I.getLevel();
			this.lblLevel.text = q.substitute("Level{0}", e), e <= 1 ? (this.showGuide(), this.imgGames.visible = !1, this.boxBtns.visible = !1) : (this._isBossGuan = J.I.isBossGuan(e), this._isBossGuan ? (this.boxBtns.visible = !1, this.boxBoss0.visible = !0, this.ani1.stop()) : (this.boxBtns.visible = !0, this.ani1.play(0, !0), this.boxBoss0.visible = !1), Laya.Browser.onMiniGame && (this.imgGames.visible = !0, Mt.instance.show(bt.MoonMainAdPanel, {
				adEnum: I.AD_BANNER_BOX
			}), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null)))
		}
		scoreChange(e) {
			if (!e.data) return;
			let t = e.data.score / e.data.goal;
			t = t < 0 ? 0 : t > 1 ? 1 : t, this._barPro.value = t;
			let i = Ni.app.sceneRoot && Ni.app.sceneRoot.mainPlayer ? Ni.app.sceneRoot.mainPlayer.playerScript : null;
			i && (this.lblRank.text = q.substitute("NO.{0}", i.rank))
		}
		setRank(e) {
			this.lblRank.text = q.substitute("NO.{0}", e)
		}
		lifeChange(e) {
			e.data && (this.lifeCount = e.data.hp)
		}
		set lifeCount(e) {
			this._lifeCount = e, this.updateLifeData(this._lifeCount)
		}
		updateLifeData(e) {
			for (let t = 0; t < 3; t++) this["imgXin" + t].visible = t < e
		}
		bossHpChange(e) {
			e.data && (this._bossPro.value = e.data.hp / j.MAX_BOSS_HP)
		}
		attackChange(e) {
			e.data && e.data > 0 && (this.lblAttackTip.visible = !1)
		}
		moneyChange(e) {
			e.data ? this.addCoinPlay(e.data.pos, e.data.add) : this.lblGold.text = ln.getMoneyShowStr(J.I.money)
		}
		addCoinPlay(e, t) {
			let i = Laya.Pool.getItemByClass("coinitem", Pi.box.CoinItemUI);
			i.labelcoin.value = t.toString(), this.addChild(i);
			let n = (e.x - 40) / Laya.stage.clientScaleX,
				a = (e.y - 125) / Laya.stage.clientScaleY;
			i.pos(n, a);
			let o = a - 200;
			Laya.Tween.to(i, {
				y: o,
				alpha: .7
			}, 500, Laya.Ease.quartOut, Laya.Handler.create(this, this.playCoinEnd, [i]))
		}
		playCoinEnd(e) {
			e && (e.removeSelf(), this.lblGold.text = ln.getMoneyShowStr(J.I.money), Laya.Pool.recover("coinitem", e))
		}
		onStartGame(e) {
			if (e.target instanceof Oi || e.target instanceof Laya.Button || e.target instanceof Laya.Box) return;
			if (this._inGame) return void this.hideGuide();
			Laya.Browser.onMiniGame && (Ci.I.checkSkip(), Mt.instance.hide(bt.MoonMainAdPanel)), J.hideLoading(), this._inGame = !0, this.boxReady.visible = !1, this.boxStart.visible = !0, this.ani1.stop(), this._isBossGuan ? (this.boxBoss1.visible = !0, this.boxNormal.visible = this.boxJInbi.visible = !1, this._bossPro.value = 1) : (this.boxNormal.visible = !0, this.boxBoss1.visible = this.boxJInbi.visible = !1), this.mouseThrough = !0, this.hideGuide();
			let t = J.I.getLevel();
			this.lblLevelN.text = t.toString(), this.lblRank.text = "", this.lifeCount = j.MAX_LIFE, this.lblAttackTip.visible = 1 == t, t > 0 && !this._isBossGuan ? Laya.Browser.onVVMiniGame ? t > 1 ? ln.showDialog(ln.FREEUSEVIEW, !1, !0) : Ni.app.sceneRoot && Ni.app.sceneRoot.readyGo() : ln.showDialog(ln.FREEUSEVIEW, !1, !0) : Ni.app.sceneRoot && Ni.app.sceneRoot.readyGo(), J.I.gameStart(), ht.I.statisticsReport(f.LV_START, t)
		}
		showGuide(e = !1) {
			this.isRelive = e, this._guide || (this._guide = new Ui), this._guide.show(e ? Laya.stage : this)
		}
		hideGuide() {
			this._guide && this._guide.hide(), this.isRelive && (Ni.app.sceneRoot && Ni.app.sceneRoot.relive(1e3, 3e3), this.isRelive = !1)
		}
		onOpenWeapon(e) {
			Laya.Browser.onMiniGame && Mt.instance.hide(bt.MoonMainAdPanel), J.hideLoading();
			let t = Ni.app.uiMgr.openPage(ln.SHOPVIEW, !1);
			t && (t.curTab = j.TYPE_WEAPON)
		}
		onOpenMoto() {
			Laya.Browser.onMiniGame && Mt.instance.hide(bt.MoonMainAdPanel), J.hideLoading();
			let e = Ni.app.uiMgr.openPage(ln.SHOPVIEW, !1);
			e && (e.curTab = j.TYPE_MOTO)
		}
		onMoreGameClick(e) {
			let t = {};
			if (t.adEnum = I.AD_BANNER_BOX, Laya.Browser.onMiniGame) {
				let e = Ci.I.getMatrixByPosition(ct.BOX_AD);
				null == e || e.length <= 0 ? (Mt.instance.hide(bt.MoonMainAdPanel), Ri.I.showCustom(b.AD_CUSTOM_MAIN_MATRIX, 250, 1, this, this.onErrorCoustBoxAd, this, this.onHideCoustBoxAd)) : (Mt.instance.show(bt.MoonGameBoxPanel, t), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null))
			} else if (Laya.Browser.onVVMiniGame) {
				let e = this;
				qg.hasShortcutInstalled({
					success: function (t) {
						t ? console.log("已创建") : (console.log("未创建"), qg.installShortcut({
							success: function () {
								console.log("创建成功"), e.imgGames.visible = !1
							}
						}))
					}
				})
			} else Laya.Browser.onQGMiniGame && Wi.I.showPlatformDrawerGameAd()
		}
		onErrorCoustBoxAd(e) {
			Mt.instance.show(bt.MoonTipPanel, "加载数据失败,请稍后重试."), Laya.Browser.onMiniGame && Mt.instance.show(bt.MoonMainAdPanel, {
				adEnum: I.AD_BANNER_BOX
			})
		}
		onHideCoustBoxAd(e) {
			Laya.Browser.onMiniGame && Mt.instance.show(bt.MoonMainAdPanel, {
				adEnum: I.AD_BANNER_BOX
			})
		}
		gameStart(e) {
			if (Laya.Browser.onMiniGame) {
				let e = Ci.I.getAdSwitchByPosition(gt.BATTLE_AD);
				null != e && 1 == e.state && Ri.I.showCustom(b.AD_CUSTOM_SINGLE_LEFT, e.topMargin, e.leftMargin), xi.I.showBannerAd(I.AD_BANNER_BOX)
			}
			Laya.Render.isConchApp && xi.I.showBannerAd(I.AD_BANNER_BOX)
		}
		onSoundEvent() {
			J.I.isMusicMute = !J.I.isMusicMute, J.I.isSoundMute = !J.I.isSoundMute, J.I.isMusicMute ? (J.I.playMusicContinue(), Laya.SoundManager.setSoundVolume(1 == J.I.bgm ? .8 : 0), Laya.SoundManager.setMusicVolume(1 == J.I.bgm ? .8 : 0)) : (Laya.SoundManager.stopAllSound(), Laya.SoundManager.setSoundVolume(0), Laya.SoundManager.setMusicVolume(0)), J.I.save(), this.updateSoundShow()
		}
		updateSoundShow() {
			this.Img_LockSound.visible = !J.I.isSoundMute
		}
	}
	class Zi extends Pi.ReLiveViewUI {
		constructor() {
			super(), this._isReLive = !1, this._reliveT = -1, this._time = 0, this.max_time = 1e4, this._addGold = 0, this._isOpened = !1, this._killNum = 0, this._runPro = 0, this._rank = 0, this._deathType = "none", this._behavior = "", this._failTimes = 0, this._adTimes = 0, this._oldCenterH = 0, this.height = Laya.stage.height, this.btnRelive.on(Laya.Event.CLICK, this, this.onReLive), this.btnClose.on(Laya.Event.CLICK, this, this.noThanksClick), this._barPro = new Hi(this.barPro, 346, 77, 68, .38, .69), this._oldCenterH = this.boxContent.height
		}
		open(e, t) {
			if (Laya.stage.height < this._oldCenterH) {
				let e = Laya.stage.height / this._oldCenterH;
				this.boxContent.scale(e, e), this.boxContent.pos((this.width - this.boxContent.width * e) / 2, (this.height - this.boxContent.height * e) / 2)
			} else this.boxContent.pos((this.width - this.boxContent.width) / 2, (this.height - this.boxContent.height) / 2);
			this.btnClose && (this.btnClose.visible = !1), super.open(e, t)
		}
		onOpened(e) {
			this._isOpened = !0, super.onOpened(e), this._behavior = de.BEHAVIOR_0, this.btnClose.mouseEnabled = !0;
			let t = J.I.getLevel();
			this.lblLevel1.text = t.toString();
			let i = J.I.failTimes[Ni.app.sceneRoot.level];
			i ? i++ : i = 1, J.I.failTimes[Ni.app.sceneRoot.level] = i, this._failTimes = i, Ni.app.uiMgr.hideHud(), this.btnClose.visible = !1;
			Laya.timer.once(1500, this, () => {
				this.btnClose.visible = !0
			}), this.btnClose.mouseEnabled = !0, this.btnRelive.mouseEnabled = !0, this.lblGold.text = ln.getMoneyShowStr(J.I.money), this._killNum = Ni.app.sceneRoot.mainPlayer.playerScript.attackCount, this._addGold = 10 * this._killNum, this.lblAddGold.text = this._addGold.toString();
			let n = Ni.app.sceneRoot.score / Ni.app.sceneRoot.goalScore;
			n = n < 0 ? 0 : n > 1 ? 1 : n, this._runPro = Math.floor(100 * n), this._barPro.value = n, Ni.evt.dispatchEvent(new ce(ce.GAME_SCORE, Ni.app.sceneRoot.score)), this._rank = Ni.app.sceneRoot.mainPlayer.playerScript.rank, this._rank = this._rank <= 0 ? 1 : this._rank, this._deathType = Ni.app.sceneRoot.mainPlayer.playerScript.deathType, this.btnRelive.visible = !0, this.boxOppo.visible = !1, Laya.Browser.onVVMiniGame && (this.btnRelive.visible = !1, this.boxOppo.visible = !0), Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame || this.startTime(), Mt.instance.show(bt.MoonResults2Panel, {
				adEnum: I.AD_BANNER_BOX
			}), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null), J.I.playSound("fail.mp3")
		}
		drawTimerMask(e) {
			this._quanMask || (this._quanMask = new Laya.Sprite, this._quanMask.pos(this.imgQuan.x, this.imgQuan.y), this._quanMask.rotation = -90, this.imgQuan.mask = this._quanMask), this._quanMask.graphics.clear();
			let t = this.max_time - e,
				i = 360 / this.max_time;
			this._quanMask.graphics.drawPie(0, 0, this.imgQuan.width / 2, t * i, 360, "#0")
		}
		startTime() {
			this._time = Laya.timer.currTimer + this.max_time, this.drawTimerMask(this.max_time), Laya.timer.frameLoop(2, this, this.onTimer)
		}
		onTimer() {
			let e = this._time - Laya.timer.currTimer;
			if (e <= 0) return this._behavior = de.BEHAVIOR_2, void this.toClose();
			this.drawTimerMask(e)
		}
		onReLive() {
			Mt.instance.hide(bt.MoonResults2Panel), this._isReLive = !0, Laya.timer.clear(this, this.onTimer);
			let e = this;
			xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, t => {
				t ? e.relive() : (e._isReLive = !1, e.startTime())
			}), this.btnClose.mouseEnabled = !1, this.btnRelive.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtns)
		}
		resetBtns() {
			this.btnClose.mouseEnabled = !0, this.btnRelive.mouseEnabled = !0
		}
		relive() {
			if (this._isReLive) {
				let e = J.I.adTimes[Ni.app.sceneRoot.level];
				e ? e++ : e = 1, J.I.adTimes[Ni.app.sceneRoot.level] = e, this._adTimes = e, Ni.app.sceneRoot && Ni.app.sceneRoot.addHpFull(), ht.I.statisticsReport(f.LV_RELIVE, J.I.level)
			}
			this.close()
		}
		noThanksClick() {
			if (Mt.instance.hide(bt.MoonResults2Panel), Laya.timer.clear(this, this.onTimer), this.btnClose.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtnClose), Laya.Browser.onMiniGame) {
				Ci.I.checkSkip();
				let e = Ci.I.getMatrixByPosition(ct.RESULT_HOT_AD),
					t = Ci.I.getMatrixByPosition(ct.RESULT_FRIEND_AD);
				if (null != t && t.length > 0 || null != e && e.length > 0) {
					let e = {};
					e.mgoonCaller = this, e.mgoonFunc = this.toClose, e.adEnum = I.AD_BANNER_BOX, Mt.instance.show(bt.MoonResultsPanel, e)
				} else this.toClose()
			} else this.toClose()
		}
		resetBtnClose() {
			this.btnClose.mouseEnabled = !0
		}
		toClose() {
			J.I.makemoney += this._addGold, J.I.setMakemoney(1), J.I.save(), ht.I.statisticsReport(f.LV_END, J.I.level, 0), this.close()
		}
		close(e) {
			clearTimeout(this._reliveT), J.I.playSound("close.mp3"), Laya.timer.clearAll(this), super.close(e)
		}
		onClosed(e) {
			this._isOpened && (this.btnClose.visible = !1, this._isReLive ? (Ni.app.uiMgr.showHud(!0), Ni.app.uiMgr.hudView.showGuide(!0)) : (Ni.app.sceneRoot && Ni.app.sceneRoot.reset(), Ni.app.uiMgr.showHud()), this._isReLive = !1, J.hideLoading()), super.onClosed(e), this._isOpened = !1
		}
	}
	class ji extends Pi.tongyong_tangchuan1UI {
		constructor() {
			super(), this._gold = 1e3, this.btnClose.on(Laya.Event.CLICK, this, this.onCancel), this.btnGet.on(Laya.Event.CLICK, this, this.onSure.bind(this)), this.lblGold.text = this._gold.toString()
		}
		open(e, t) {
			this.btnClose && (this.btnClose.visible = !1), super.open(e, t)
		}
		onOpened(e) {
			super.onOpened(e), this.btnClose.visible = !1;
			Laya.timer.once(1500, this, () => {
				this.btnClose.visible = !0
			}), this.ani1.play(0, !0)
		}
		setData(e) {
			e ? (this._data = e, this._sure = e.onSure, this._cancel = e.onCancel) : (this._data = null, this._sure = null, this._cancel = null)
		}
		close(e) {
			this.ani1.stop(), super.close(e), J.I.playSound("close.mp3")
		}
		onSure(e) {
			xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, e => {
				e ? (J.I.makemoney += this._gold, J.I.setMakemoney(1), Ni.evt.dispatchEvent(new ce(ce.MONEY_CHANGE)), J.I.save(), this._sure && this._sure(), this.close()) : this.close()
			})
		}
		onCancel(e) {
			this._cancel && this._cancel(), this.close()
		}
	}
	class qi {
		constructor(e) {
			this._coins = new Array, this._target = e
		}
		showCoin(e, t, i, n, a) {
			for (var o = 10 == e ? 120 : 150, s = 10 == e ? 80 : 100; e > 0;) {
				var r = Laya.Pool.getItemByClass("image", Laya.Image);
				r.skin = "gongyong/game_coin.png", this._coins.push(r), this._target.addChild(r), r.x = 363 + Q.randomRange(-o, o), r.y = 543 + Q.randomRange(-s, s), e--
			}
			Laya.timer.frameLoop(3, this, (e, t) => {
				for (var i = 2; i > 0;) {
					if (i--, this._coins.length <= 0) return void Laya.timer.clearAll(this);
					var o = this._coins.pop();
					Laya.Tween.to(o, {
						x: e,
						y: t
					}, 1500, Laya.Ease.backIn, Laya.Handler.create(this, (e, t) => {
						e.removeSelf(), Laya.Pool.recover("image", e), n && n(t), 0 == t && a && a()
					}, [o, this._coins.length]))
				}
			}, [t, i])
		}
	}
	class Qi {
		constructor() {
			Laya.Browser.onMiniGame ? "object" == typeof tt && (this.sdk = window.tt) : Laya.Browser.onTTMiniGame && (this.sdk = window.tt), this.init()
		}
		static get I() {
			return h.get(Qi)
		}
		isWait() {
			return this.mIsWait
		}
		canRecord() {
			return null !== this.recorder && void 0 !== this.recorder
		}
		isRecording() {
			return null !== this.recorder && void 0 !== this.recorder && this.recorder._recording
		}
		existRecPath() {
			return "" !== this.mRecPath
		}
		clearRec() {
			this.mRecPath = ""
		}
		startRecorder(e) {
			if (this.mIsWait) return;
			if (null === this.recorder || void 0 === this.recorder || this.recorder._recording) return !1;
			null == e && (e = 6e4), this.mIsWait = !0;
			return this.recorder.start({
				duration: e
			}), !0
		}
		getRecorderTime() {
			return null === this.recorder || void 0 === this.recorder ? 0 : (this.recorder._recording && (this.mTotalTime = Laya.timer.currTimer - this.mStartTime), this.mTotalTime)
		}
		stopRecorder() {
			this.mIsWait || null !== this.recorder && void 0 !== this.recorder && this.recorder._recording && (this.mIsWait = !0, this.mTotalTime = Laya.timer.currTimer - this.mStartTime, this.recorder.stop())
		}
		shareVideo(e) {
			this.sdk.shareVideo({
				videoPath: this.mRecPath,
				title: e,
				success() {
					Re.instance.triggerListener(Qi.RecShareResult, !0)
				},
				fail(e) {
					Re.instance.triggerListener(Qi.RecShareResult, !1)
				}
			})
		}
		init() {
			null !== this.sdk && void 0 !== this.sdk && "undefined" !== this.sdk && (this.recorder = this.sdk.getGameRecorderManager(), this.recorder.onStart(e => {
				this.mIsWait = !1, this.mStartTime = Laya.timer.currTimer, Re.instance.triggerListener(Qi.RecordingStart)
			}), this.recorder.onStop(e => {
				this.mIsWait = !1, this.mTotalTime > 3e3 && (this.mRecPath = e.videoPath), Re.instance.triggerListener(Qi.RecordingResult)
			}), this.recorder.onPause(() => { }), this.recorder.onResume(() => { }), this.recorder.onError(e => { }), this.recorder.onInterruptionBegin(e => {
				this.recorder.pause()
			}), this.recorder.onInterruptionEnd(e => {
				this.recorder.resume()
			}))
		}
	}
	Qi.RecordingStart = "RecordingStart", Qi.RecordingResult = "RecordingResult", Qi.RecShareResult = "RecShareResult";
	class $i extends Pi.RewardUI {
		constructor() {
			super(), this._level = 0, this._beiRate = 3, this._isOpened = !1, this._killNum = 0, this._rank = 0, this._behavior = "", this._failTimes = 0, this._adTimes = 0, this._addGold = 0, this._addBei = 1, this._oldCenterH = 0, this._rate = 1, this.height = Laya.stage.height, this.lblGold.text = this.lblAddGold.text = this.lblAddGold0.text = this.lblAddGold1.text = this.lblLevel1.text = "0", this.lblRank.text = this.lblAttack.text = "", this._coinEff = new qi(this), this.btnClose.on(Laya.Event.CLICK, this, this.noThanksClick), this.btnVideo.on(Laya.Event.CLICK, this, this.on3Reward), this.btnClose.visible = !1, this.lblVideoGold.text = "", this._oldCenterH = this.boxContent.height
		}
		open(e, t) {
			this._rate = 1, Laya.stage.height < this._oldCenterH ? (this._rate = Laya.stage.height / this._oldCenterH, this.boxContent.scale(this._rate, this._rate), this.boxContent.pos((this.width - this.boxContent.width * this._rate) / 2, (this.height - this.boxContent.height * this._rate) / 2)) : this.boxContent.pos((this.width - this.boxContent.width) / 2, (this.height - this.boxContent.height) / 2), this.btnClose && (this.btnClose.visible = !1), this.lblVideoGold && (this.lblVideoGold.text = ""), super.open(e, t)
		}
		onOpened(e) {
			super.onOpened(e), this.btnClose.mouseEnabled = !0, this._addBei = 1, this._behavior = de.BEHAVIOR_0, this._isOpened = !0, Ni.app.uiMgr.hideHud(), this.btnClose.visible = !1;
			Laya.timer.once(1500, this, () => {
				this.btnClose.visible = !0
			}), this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !0, this.lblGold.text = ln.getMoneyShowStr(J.I.money);
			let t = Ni.app.sceneRoot.mainPlayer.playerScript.attackCount;
			this._killNum = t, this.lblAttack.text = "x" + t;
			let i = 10 * t;
			this.lblAddGold1.text = i.toString();
			let n = J.I.failTimes[Ni.app.sceneRoot.level];
			n || (n = 0), this._failTimes = n;
			let a = J.I.adTimes[Ni.app.sceneRoot.level];
			a || (a = 0), this._adTimes = a;
			let o = Ni.app.sceneRoot.mainPlayer.playerScript.rank,
				s = 200 * (Ni.app.sceneRoot.getTotalCount() - o) + 20;
			o = o <= 0 ? 1 : o, this._rank = o, this.lblRank.text = q.substitute("{0}st", o), this.lblAddGold0.text = s.toString();
			let r = s + i;
			J.I.makemoney = r, this._addGold = r, this.lblAddGold.text = r.toString(), this.lblVideoGold.text = (r * this._beiRate).toString(), this.lblVideoGold1.text = (r * this._beiRate).toString(), this.lblBei.text = "X" + this._beiRate, this.lblBei1.text = "X" + this._beiRate, this._level = J.I.getCurLevel(), this.lblLevel1.text = this._level.toString(), this.ani2.play(0, !0), this.ani3.play(0, !0), J.I.playSound("succeed.mp3"), this.btnVideo.visible = !0, xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null)
		}
		noThanksClick() {
			if (Mt.instance.hide(bt.MoonResults2Panel), Laya.Browser.onMiniGame) {
				Ci.I.checkSkip();
				let e = Ci.I.getMatrixByPosition(ct.RESULT_HOT_AD),
					t = Ci.I.getMatrixByPosition(ct.RESULT_FRIEND_AD);
				if (null != t && t.length > 0 || null != e && e.length > 0) {
					let e = {};
					e.mgoonCaller = this, e.mgoonFunc = this.on1Reward, e.adEnum = I.AD_BANNER_BOX, Mt.instance.show(bt.MoonResultsPanel, e)
				} else this.on1Reward()
			} else this.on1Reward();
			this.btnClose.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtnClose)
		}
		resetBtnClose() {
			this.btnClose.mouseEnabled = !0
		}
		on1Reward() {
			let e = this;
			this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !1;
			let t = this.lblGold.y + this.lblGold.parent.y + this.lblGold.parent.parent.y + this.y,
				i = this.lblGold.x + this.lblGold.parent.x + this.lblGold.parent.parent.x + this.x;
			1 == this._rate && (i = this.imgGold.x + this.imgGold.parent.x + this.imgGold.parent.parent.x + this.x), this._coinEff.showCoin(10, i, t, e => {
				e % 2 == 0 && J.I.playSound("getdiamond.mp3")
			}, () => {
				J.I.setMakemoney(1), e.close()
			}), Laya.timer.once(3e3, this, this.resetBtns)
		}
		resetBtns() {
			this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !0
		}
		on3Reward() {
			this._behavior = de.BEHAVIOR_3, this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !1, xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, e => {
				e ? this.threeReward() : this.on1Reward()
			}), Laya.timer.once(3e3, this, this.resetBtns)
		}
		threeReward() {
			let e = this,
				t = this.lblGold.y + this.lblGold.parent.y + this.lblGold.parent.parent.y + this.y,
				i = this.lblGold.x + this.lblGold.parent.x + this.lblGold.parent.parent.x + this.x;
			1 == this._rate && (i = this.imgGold.x + this.imgGold.parent.x + this.imgGold.parent.parent.x + this.x), this._coinEff.showCoin(30, i, t, e => {
				e % 2 == 0 && J.I.playSound("getdiamond.mp3")
			}, () => {
				this._addBei = this._beiRate, J.I.setMakemoney(this._beiRate), e.close()
			}), this._rewardT && clearTimeout(this._rewardT), this._bannerT && clearTimeout(this._bannerT)
		}
		onShare() {
			Qi.I.shareVideo("邀请好友一起来吧！")
		}
		close(e) {
			this._rewardT && clearTimeout(this._rewardT), clearTimeout(this._t2), this._bannerT && clearTimeout(this._bannerT), J.I.playSound("close.mp3"), this.btnClose.visible = !1, Laya.timer.clearAll(this), super.close(e)
		}
		onClosed(e) {
			this._isOpened && (J.I.save(), this.ani2.stop(), this.ani3.stop(), Ni.app.sceneRoot && Ni.app.sceneRoot.reset(), Ni.app.uiMgr.showHud(), J.hideLoading()), super.onClosed(e), this._isOpened = !1
		}
	}
	class Ji extends Pi.tongyong_tangchuan3UI {
		constructor() {
			super(), this._type = 0, this._freeMoto = 0, this._freeWeapon = 0, this._freeIndex = 0, this.btnTiyan.on(Laya.Event.CLICK, this, this.onUse), this.btnClose.on(Laya.Event.CLICK, this, this.close), this.btnClose.visible = !1
		}
		open(e, t) {
			this.btnClose && (this.btnClose.visible = !1), this.imgShow && (this.imgShow.visible = !1), super.open(e, t), Ni.app.pauseGame(!0)
		}
		onOpened(e) {
			super.onOpened(e), J.I.freeMoto = J.I.freeWeapon = 0, this._freeMoto = this._freeWeapon = 0, this._type = J.I.freeType, this._type == j.TYPE_WEAPON ? (J.I.freeType = j.TYPE_MOTO, this.ImgTitle.skin = "gongyong/try_wuqi.png") : (J.I.freeType = j.TYPE_WEAPON, this.ImgTitle.skin = "gongyong/try_moto.png"), this.showFree(), this.btnClose.mouseEnabled = !0, this.btnTiyan.mouseEnabled = !0;
			this._closeT = setTimeout(() => {
				this.btnClose.visible = !0
			}, 2e3), this.ani1.play(0, !0), this.ani2.play(0, !0), xi.I.showBannerAd(I.AD_BANNER_BOX), Laya.Render.isConchApp && !xi.I.getInterstitialAd(0) || xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null)
		}
		showFree() {
			var e = J.I.getUnLock(this._type),
				t = e[this._freeIndex];
			this._freeIndex++, this._freeIndex >= e.length && (this._freeIndex = 0), t && (this._type != j.TYPE_WEAPON || t.id != j.ROCKET_ID) ? (this._type == j.TYPE_WEAPON ? this._freeWeapon = t.id : this._freeMoto = t.id, this.imgShow.skin = t.icon, this.imgShow.visible = !0, this._pifuEvent = new ce(this._type == j.TYPE_WEAPON ? ce.WEAPON_CHANGE : ce.MOTO_CHANGE), this._pifuEvent.data = {
				id: t.id,
				free: !0
			}) : this.close()
		}
		onUse(e) {
			let t = this;
			if (Laya.Render.isConchApp && !xi.I.getVideoAd(0)) return xi.I.getVideoAd(0), void Mt.instance.show(bt.MoonTipPanel, "Ad loading failed");
			xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, e => {
				e ? (this._pifuEvent && (Ni.evt.dispatchEvent(this._pifuEvent), J.I.freeWeapon = this._freeWeapon, J.I.freeMoto = this._freeMoto), t.close()) : t.close()
			}), this.btnClose.mouseEnabled = !1, this.btnTiyan.mouseEnabled = !1, Laya.timer.clear(this, this.resetBtnState), Laya.timer.once(1e3, this, this.resetBtnState)
		}
		resetBtnState() {
			this.btnClose.mouseEnabled = !0, this.btnTiyan.mouseEnabled = !0
		}
		close(e) {
			Laya.Browser.onMiniGame && Ci.I.checkSkip(), Ni.app.uiMgr.hideWaiting(), clearTimeout(this._closeT), Laya.timer.clearAll(this), super.close(e), J.I.playSound("close.mp3")
		}
		onClosed(e) {
			this.ani1.stop(), this.ani2.stop(), super.onClosed(e), this.btnClose.visible = !1, Ni.app.playGame(!0), xi.I.hideBannerAd(I.AD_BANNER_BOX), Ni.app.sceneRoot && Ni.app.sceneRoot.readyGo()
		}
	}
	class en extends Pi.WaitingUI {
		constructor() {
			super(), this.centerX = 0, this.centerY = 0
		}
		show(e) {
			e && (e.addChild(this), this.ani1.play(0, !0))
		}
		hide() {
			this.removeSelf(), this.ani1.stop()
		}
	}
	class tn extends Pi.LoadingViewUI {
		constructor() {
			super(), this._oldBgH = 0, this._oldBgW = 0, this._isLoadOver = !1, this.preloadCount = 0, this.subPackName = ["gongyong", "res", "scenes", "sounds"], this.subPackNameOV = ["gongyong", "res", "sounds", "scenes"], this.curValue = 0, this._barPro = new Hi(this.progress, 330, 27, 3, .8, 1), this._barPro.value = 0, this._oldBgH = this.imgBg.height, this._oldBgW = this.imgBg.width
		}
		layout() {
			this.height = Laya.stage.height, this.width = Laya.stage.width, this.imgBg.height = this.height;
			let e = this.height / this._oldBgH;
			this.imgBg.width = this._oldBgW * e, this.imgBg.pos((Laya.stage.width - this.imgBg.width) / 2, (Laya.stage.height - this.imgBg.height) / 2), this.boxKp.visible && this.drawKpBlack()
		}
		showKaiping() {
			this.drawKpBlack(), this.boxKp.visible = !0
		}
		drawKpBlack() {
			this._kpBlack || (this._kpBlack = new Laya.Sprite, this.addChildAt(this._kpBlack, this.getChildIndex(this.boxKp))), this._kpBlack.graphics.clear(), this._kpBlack.pos(0, 0), this._kpBlack.size(this.width, this.height), this._kpBlack.graphics.drawRect(0, 0, this.width, this.height, "#000000")
		}
		hideKaiping() {
			this.boxKp.visible = !1, this._kpBlack && this._kpBlack.removeSelf(), this._isLoadOver && this.loadOver()
		}
		onOpened(e) {
			this.layout(), Laya.stage.on(Laya.Event.RESIZE, this, this.layout), Laya.Browser.onQGMiniGame && (console.error("LoadingView setLoadingProgress 0"), window.qg.setLoadingProgress({
				progress: 0
			})), Laya.Browser.onMiniGame || Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame ? (Laya.Browser.onQGMiniGame && this.subPackNameOV && this.subPackNameOV.length > 0 && (this.subPackName = this.subPackNameOV), this.loadSubPackage()) : this.loadRes(), Laya.timer.once(2e3, this, this.hideKaiping)
		}
		loadSubPackage() {
			this.preloadCount = 0, this.loadAsynSubPackage(this.subPackName[this.preloadCount]), Laya.timer.frameLoop(10, this, this.animPro)
		}
		animPro() {
			this.curValue > 100 && (this.curValue = 0), this.lblState.text = q.substitute("loading...({0}%)", this.curValue), this._barPro.value = this.curValue / 100, this.curValue += 2
		}
		loadAsynSubPackage(e) {
			let t;
			console.log("loadAsynSubPackage:" + e), t = Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame ? qg : wx;
			let i = this;
			t.loadSubpackage({
				name: e,
				success: function (e) {
					i.preloadCount == i.subPackName.length - 1 ? (console.error("load"), Laya.timer.clear(i, i.animPro), i.curValue = 100, i.animPro(), i.loadRes()) : (i.preloadCount++, i.loadAsynSubPackage(i.subPackName[i.preloadCount]))
				},
				fail: function (t) {
					i.loadAsynSubPackage(e)
				}
			}).onProgressUpdate(e => {
				console.log("下载进度", e.progress), console.log("下载进度", e.progress / 100), console.log("已经下载的数据长度", e.totalBytesWritten), console.log("预期需要下载的数据总长度", e.totalBytesExpectedToWrite)
			})
		}
		loadRes() {
			te.initPreloads(), this.lblState.text = q.substitute("loading...({0}%)", 0);
			let e = te.preloads && te.preloads.length ? .1 : 1;
			this._isLoadOver = !1, Laya.Sprite3D.load(te.scpath + "baozha.lh", null), Laya.loader.load(["res/atlas/gongyong.atlas"], Laya.Handler.create(this, () => {
				te.preloads && te.preloads.length ? Laya.loader.create(te.preloads, Laya.Handler.create(this, () => {
					this.loadOver()
				}), Laya.Handler.create(this, t => {
					this._barPro.value = t * (1 - e) + e, this.lblState.text = q.substitute("loading...({0}%)", (100 * this._barPro.value).toFixed(0)), Laya.Browser.onQGMiniGame && window.qg.setLoadingProgress({
						progress: (100 * this._barPro.value).toFixed(0)
					})
				})) : this.loadOver()
			}), Laya.Handler.create(this, t => {
				this._barPro.value = t * e, this.lblState.text = q.substitute("loading...({0}%)", (100 * this._barPro.value).toFixed(0))
			}), Laya.Loader.ATLAS, 0, !0, null, !1, !0)
		}
		loadOver() {
			this._isLoadOver = !0, this.boxKp.visible || (Laya.Browser.onQGMiniGame && window.qg.loadingComplete({
				success: () => { },
				complete: e => { }
			}), Laya.Render.isConchApp && (xi.I.getVideoAd(0), xi.I.getInterstitialAd(0), xi.I.isNativeADLoaded()), Ni.app.uiMgr.showWaiting(this), Ni.app.startGame(), this.close())
		}
		close(e) {
			Laya.timer.clearAll(this), this._closeT && clearTimeout(this._closeT), Ni.app.uiMgr.hideWaiting(), Laya.stage.off(Laya.Event.RESIZE, this, this.layout), super.close(e)
		}
	}
	class nn extends Pi.shopUI {
		constructor() {
			super(), this._curTab = -1, this._selectIdx = -1, this._isOpened = !1, this.drawBlack(), this.height = Laya.stage.height, this.width = this.boxCenter.width = this.bgShop.width = Laya.stage.width, this.list.renderHandler = Laya.Handler.create(this, this.onRenderHandler, null, !1), this.list.selectHandler = Laya.Handler.create(this, this.onSelectHandler, null, !1), this.list.selectEnable = !0, this.btnClose.on(Laya.Event.CLICK, this, this.close), this.btnVideo.on(Laya.Event.CLICK, this, this.onGetCoin), Ni.evt.addEventListener(ce.MONEY_CHANGE, this.moneyChange, this)
		}
		onGetCoin() {
			var e = ln.getDialog(ln.ALERTVIEW);
			e.setData(null), e.popup(!1, !0)
		}
		drawBlack() {
			this._blackSprite || (this._blackSprite = new Laya.Sprite), this._blackSprite.size(Laya.stage.width, Laya.stage.height), this._blackSprite.pos(0, 0), this._blackSprite.parent || this.addChildAt(this._blackSprite, 0), this._blackSprite.graphics.clear(), this._blackSprite.graphics.drawRect(0, 0, this._blackSprite.width, this._blackSprite.height, "#ffffff")
		}
		onOpened(e) {
			if (super.onOpened(e), this._isOpened = !0, this.moneyChange(null), this.selectTab(this._curTab), Ni.evt.dispatchEvent(new ce(ce.MONEY_CHANGE)), Laya.Browser.onMiniGame) {
				let e = Ci.I.getAdSwitchByPosition(w.AD_CUSTOM_PIFU);
				null != e && 1 == e.state && Ri.I.showCustom(w.AD_CUSTOM_PIFU, e.topMargin, e.leftMargin), Laya.Browser.height > 1330 && xi.I.showBannerAd(I.AD_BANNER_BOX), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null)
			}
		}
		moneyChange(e) {
			this.lblGold.text = ln.getMoneyShowStr(J.I.money)
		}
		set curTab(e) {
			e != this._curTab && (this._curTab = e, this.selectTab(e))
		}
		selectTab(e) {
			this._isOpened && (this._listData = this.getDataByType(e), this.list.array = this._listData, this.list.refresh(), this.lblTitle.text = e == j.TYPE_MOTO ? "motor" : "wpns", this.ImgIcon.skin = e == j.TYPE_MOTO ? "gongyong/store_moto.png" : "gongyong/store_wuqi.png", this._selectIdx = -1, this.list.selectedIndex = -1, e == j.TYPE_WEAPON ? this.list.selectedIndex = J.I.weapon - 1 : this.list.selectedIndex = J.I.moto - 1)
		}
		getDataByType(e) {
			let t = [];
			return e == j.TYPE_MOTO ? j.MotoTemp.forEach(e => {
				-1 !== e.price && t.push(e)
			}) : j.WeaponTemp.forEach(e => {
				-1 !== e.price && t.push(e)
			}), t
		}
		onRenderHandler(e, t) {
			let i = this._listData[t];
			e.setData(i, this._curTab, t, this.list.selectedIndex == t)
		}
		onSelectHandler(e) {
			if (this._selectIdx == e) return;
			this._selectIdx = e, this._selectItem && (this._selectItem.isSelected = !1);
			let t = this.list.selectedItem;
			t && (t.isSelected = !0, this._selectItem = t, this.imgShow.skin = t.icon)
		}
		close(e) {
			if (this._curTab = -1, this._selectIdx = -1, super.close(e), J.I.playSound("close.mp3"), J.I.save(), Laya.Browser.onMiniGame) {
				Laya.Browser.height > 1330 && xi.I.hideBannerAd(I.AD_BANNER_BOX);
				let e = Ci.I.getAdSwitchByPosition(w.AD_CUSTOM_PIFU);
				null != e && 1 == e.state && Ri.I.hideCustom(w.AD_CUSTOM_PIFU), Mt.instance.show(bt.MoonMainAdPanel, {
					adEnum: I.AD_BANNER_BOX
				})
			}
		}
		onClosed(e) {
			J.hideLoading(), this._isOpened = !1, super.onClosed(e)
		}
	}
	class an extends Pi.jiesuan_bossUI {
		constructor() {
			super(), this._isReLive = !1, this._reliveT = -1, this._time = 0, this.max_time = 1e4, this._addGold = 0, this._isOpened = !1, this._killNum = 0, this._runPro = 0, this._rank = 0, this._deathType = "none", this._behavior = "", this._failTimes = 0, this._adTimes = 0, this._oldCenterH = 0, this.height = Laya.stage.height, this.btnRelive.on(Laya.Event.CLICK, this, this.onReLive), this.btnClose.on(Laya.Event.CLICK, this, this.noThanksClick), this._barPro = new Hi(this.barPro, 398, 82, 78, .38, .79), this._oldCenterH = this.boxContent.height
		}
		open(e, t) {
			if (Laya.stage.height < this._oldCenterH) {
				let e = Laya.stage.height / this._oldCenterH;
				this.boxContent.scale(e, e), this.boxContent.pos((this.width - this.boxContent.width * e) / 2, (this.height - this.boxContent.height * e) / 2)
			} else this.boxContent.pos((this.width - this.boxContent.width) / 2, (this.height - this.boxContent.height) / 2);
			this.btnClose && (this.btnClose.visible = !1), super.open(e, t)
		}
		onOpened(e) {
			this._isOpened = !0, super.onOpened(e), this._behavior = de.BEHAVIOR_0, this.btnClose.mouseEnabled = !0;
			let t = J.I.failTimes[Ni.app.sceneRoot.level];
			t ? t++ : t = 1, J.I.failTimes[Ni.app.sceneRoot.level] = t, this._failTimes = t, Ni.app.uiMgr.hideHud(), this.btnClose.visible = !1, Laya.timer.once(1500, this, () => {
				this.btnClose.visible = !0
			}), this.btnClose.mouseEnabled = !0, this.btnRelive.mouseEnabled = !0, this.lblGold.text = ln.getMoneyShowStr(J.I.money), this._killNum = Ni.app.sceneRoot.mainPlayer.playerScript.attackCount, this._addGold = 10 * this._killNum + 50;
			let i = Ni.app.sceneRoot.mapMgr.bossObj.curHp / j.MAX_BOSS_HP;
			i = i < 0 ? 0 : i > 1 ? 1 : i, this._runPro = Math.floor(100 * i), this._barPro.value = i, this._rank = Ni.app.sceneRoot.mainPlayer.playerScript.rank, this._rank = this._rank <= 0 ? 1 : this._rank, this._deathType = Ni.app.sceneRoot.mainPlayer.playerScript.deathType, this.startTime(), Mt.instance.show(bt.MoonResults2Panel, {
				adEnum: I.AD_BANNER_BOX
			}), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null), J.I.playSound("fail.mp3")
		}
		drawTimerMask(e) {
			this._quanMask || (this._quanMask = new Laya.Sprite, this._quanMask.pos(this.imgQuan.x, this.imgQuan.y), this._quanMask.rotation = -90, this.imgQuan.mask = this._quanMask), this._quanMask.graphics.clear();
			let t = this.max_time - e,
				i = 360 / this.max_time;
			this._quanMask.graphics.drawPie(0, 0, this.imgQuan.width / 2, t * i, 360, "#0")
		}
		startTime() {
			this._time = Laya.timer.currTimer + this.max_time, this.drawTimerMask(this.max_time), Laya.timer.frameLoop(2, this, this.onTimer)
		}
		onTimer() {
			let e = this._time - Laya.timer.currTimer;
			if (e <= 0) return this._behavior = de.BEHAVIOR_2, void this.toClose();
			this.drawTimerMask(e)
		}
		onReLive() {
			Mt.instance.hide(bt.MoonResults2Panel), this._isReLive = !0, Laya.timer.clear(this, this.onTimer);
			let e = this;
			xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, t => {
				t ? e.relive() : (e._isReLive = !1, e.startTime())
			}), this.btnClose.mouseEnabled = !1, this.btnRelive.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtns)
		}
		resetBtns() {
			this.btnClose.mouseEnabled = !0, this.btnRelive.mouseEnabled = !0
		}
		relive() {
			if (this._isReLive) {
				this._behavior = de.BEHAVIOR_1;
				let e = J.I.adTimes[Ni.app.sceneRoot.level];
				e ? e++ : e = 1, J.I.adTimes[Ni.app.sceneRoot.level] = e, this._adTimes = e, Ni.app.sceneRoot && Ni.app.sceneRoot.addHpFull(), ht.I.statisticsReport(f.LV_RELIVE, J.I.level)
			}
			this.close()
		}
		noThanksClick() {
			if (Mt.instance.hide(bt.MoonResults2Panel), Laya.timer.clear(this, this.onTimer), this.btnClose.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtnClose), Laya.Browser.onMiniGame) {
				Ci.I.checkSkip();
				let e = Ci.I.getMatrixByPosition(ct.RESULT_HOT_AD),
					t = Ci.I.getMatrixByPosition(ct.RESULT_FRIEND_AD);
				if (null != t && t.length > 0 || null != e && e.length > 0) {
					let e = {};
					e.mgoonCaller = this, e.mgoonFunc = this.toClose, e.adEnum = I.AD_BANNER_BOX, Mt.instance.show(bt.MoonResultsPanel, e)
				} else this.toClose()
			} else this.toClose()
		}
		resetBtnClose() {
			this.btnClose.mouseEnabled = !0
		}
		toClose() {
			J.I.makemoney += this._addGold, J.I.setMakemoney(1), J.I.save(), ht.I.statisticsReport(f.LV_END, J.I.level, 0), this.close()
		}
		close(e) {
			clearTimeout(this._reliveT), Laya.timer.clear(this, this.onTimer), J.I.playSound("close.mp3"), Laya.timer.clearAll(this), super.close(e)
		}
		onClosed(e) {
			this._isOpened && (this.btnClose.visible = !1, this._isReLive ? (Ni.app.uiMgr.showHud(!0), Ni.app.uiMgr.hudView.showGuide(!0)) : (Ni.app.sceneRoot && Ni.app.sceneRoot.reset(), Ni.app.uiMgr.showHud()), this._isReLive = !1, J.hideLoading()), super.onClosed(e), this._isOpened = !1
		}
	}
	class on extends Pi.jiesuan_boss_winUI {
		constructor() {
			super(), this._level = 0, this._beiRate = 3, this._isOpened = !1, this._killNum = 0, this._rank = 1, this._behavior = "", this._failTimes = 0, this._adTimes = 0, this._addGold = 0, this._addBei = 1, this._oldCenterH = 0, this._rate = 1, this.height = Laya.stage.height, this.lblGold.text = this.lblAddGold.text = "0", this._coinEff = new qi(this), this.btnClose.on(Laya.Event.CLICK, this, this.noThanksClick), this.btnVideo.on(Laya.Event.CLICK, this, this.on3Reward), this.btnClose.visible = !1, this.lblVideoGold.text = "", this._oldCenterH = this.boxContent.height
		}
		open(e, t) {
			this._rate = 1, Laya.stage.height < this._oldCenterH ? (this._rate = Laya.stage.height / this._oldCenterH, this.boxContent.scale(this._rate, this._rate), this.boxContent.pos((this.width - this.boxContent.width * this._rate) / 2, (this.height - this.boxContent.height * this._rate) / 2)) : this.boxContent.pos((this.width - this.boxContent.width) / 2, (this.height - this.boxContent.height) / 2), this.btnClose && (this.btnClose.visible = !1), this.lblVideoGold && (this.lblVideoGold.text = ""), super.open(e, t)
		}
		onOpened(e) {
			super.onOpened(e), this.btnClose.mouseEnabled = !0, this._addBei = 1, this._behavior = de.BEHAVIOR_0, this._isOpened = !0, Ni.app.uiMgr.hideHud(), this.btnClose.visible = !1, Laya.timer.once(2e3, this, () => {
				this.btnClose.visible = !0
			}), this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !0, this.lblGold.text = ln.getMoneyShowStr(J.I.money);
			let t = Ni.app.sceneRoot.mainPlayer.playerScript.attackCount;
			this._killNum = t;
			let i = J.I.failTimes[Ni.app.sceneRoot.level];
			i || (i = 0), this._failTimes = i;
			let n = J.I.adTimes[Ni.app.sceneRoot.level];
			n || (n = 0), this._adTimes = n, this._addGold = 1e3, J.I.makemoney = this._addGold, this.lblAddGold.text = this._addGold.toString(), this.lblVideoGold.text = (this._addGold * this._beiRate).toString(), this.lblBei.text = "X" + this._beiRate, this._level = J.I.getCurLevel(), this.ani2.play(0, !0), Mt.instance.show(bt.MoonResults2Panel, {
				adEnum: I.AD_BANNER_BOX
			}), xi.I.showInterstitialAd(v.AD_INTERSTITIAL_COMMON, null, null), J.I.playSound("succeed.mp3")
		}
		noThanksClick() {
			if (Mt.instance.hide(bt.MoonResults2Panel), Laya.Browser.onMiniGame) {
				Ci.I.checkSkip();
				let e = Ci.I.getMatrixByPosition(ct.RESULT_HOT_AD),
					t = Ci.I.getMatrixByPosition(ct.RESULT_FRIEND_AD);
				if (null != t && t.length > 0 || null != e && e.length > 0) {
					let e = {};
					e.mgoonCaller = this, e.mgoonFunc = this.on1Reward, e.adEnum = I.AD_BANNER_BOX, Mt.instance.show(bt.MoonResultsPanel, e)
				} else this.on1Reward()
			} else this.on1Reward();
			this.btnClose.mouseEnabled = !1, Laya.timer.once(1e3, this, this.resetBtnClose)
		}
		resetBtnClose() {
			this.btnClose.mouseEnabled = !0
		}
		on1Reward() {
			this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !1;
			let e = this.lblGold.y + this.lblGold.parent.y + this.lblGold.parent.parent.y + this.y,
				t = this.lblGold.x + this.lblGold.parent.x + this.lblGold.parent.parent.x + this.x;
			1 == this._rate && (t = this.imgGold.x + this.imgGold.parent.x + this.imgGold.parent.parent.x + this.x), this._coinEff.showCoin(10, t, e, e => {
				e % 2 == 0 && J.I.playSound("getdiamond.mp3")
			}, () => {
				J.I.setMakemoney(1), this.close()
			}), Laya.timer.once(3e3, this, this.resetBtns)
		}
		resetBtns() {
			this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !0
		}
		on3Reward() {
			Mt.instance.hide(bt.MoonResults2Panel), this._behavior = de.BEHAVIOR_3, this.btnClose.mouseEnabled = this.btnVideo.mouseEnabled = !1, xi.I.showVideoAd(y.AD_VIDEO_REWARD, this, e => {
				e ? this.threeReward() : this.on1Reward()
			}), Laya.timer.once(3e3, this, this.resetBtns)
		}
		threeReward() {
			let e = this.lblGold.y + this.lblGold.parent.y + this.lblGold.parent.parent.y + this.y,
				t = this.lblGold.x + this.lblGold.parent.x + this.lblGold.parent.parent.x + this.x;
			1 == this._rate && (t = this.imgGold.x + this.imgGold.parent.x + this.imgGold.parent.parent.x + this.x), this._coinEff.showCoin(30, t, e, e => {
				e % 2 == 0 && J.I.playSound("getdiamond.mp3")
			}, () => {
				this._addBei = this._beiRate, J.I.setMakemoney(this._beiRate), this.close()
			}), this._rewardT && clearTimeout(this._rewardT), this._bannerT && clearTimeout(this._bannerT)
		}
		close(e) {
			this._rewardT && clearTimeout(this._rewardT), clearTimeout(this._t2), this._bannerT && clearTimeout(this._bannerT), J.I.playSound("close.mp3"), this.btnClose.visible = !1, Laya.timer.clearAll(this), super.close(e)
		}
		onClosed(e) {
			this._isOpened && (J.I.save(), this.ani2.stop(), Ni.app.sceneRoot && Ni.app.sceneRoot.reset(), Ni.app.uiMgr.showHud(), J.hideLoading()), super.onClosed(e), this._isOpened = !1
		}
	} ! function (e) {
		e.banner = "banner", e.jili = "jili", e.chaping = "chaping", e.gezi = "gezi"
	}(Vi || (Vi = {})),
		function (e) {
			e.bannerAdId = "adunit-banner", e.videoReward = "adunit-f7f8cd8c6b2c9e02", e.videoRelive = "adunit-61af2dd605f78289", e.videoFreeSkin = "adunit-f7f8cd8c6b2c9e02", e.videoGetCoin = "adunit-14a4db0fe502d916", e.videoChapinId0 = "adunit-bfde35efcdd2d87d", e.videoChapinId1 = "adunit-9db81b3afe8e5924", e.videoChapinId2 = "adunit-56b010d830dc2a26", e.videoChapinId3 = "adunit-455b12f43548567b", e.vedeoGeziId = "adunit-9ab1efe62a8e55e2"
		}(ki || (ki = {}));
	class sn {
		static isDouyin() {
			return window.tt && "DOUYIN" === sn.sysInfo.appName.toUpperCase()
		}
		static isToutiao() {
			return window.tt && "TOUTIAO" === sn.sysInfo.appName.toUpperCase()
		}
		static isXiGua() {
			return window.tt && "XIGUAN" === sn.sysInfo.appName.toUpperCase()
		}
		static news_article_lite() {
			return window.tt && "NEWS_ARTICLE_LITE" === sn.sysInfo.appName.toUpperCase()
		}
		static zhiChiChaPin() {
			return sn.isDouyin()
		}
		static init() {
			if (U.I.getConf().ad.video && U.I.getConf().ad.video.length > 0)
				for (let e = 0; e < U.I.getConf().ad.video.length; e++) {
					let t = U.I.getConf().ad.video[e];
					xi.I.getVideoAd(t)
				}
		}
		static clickBanner(e) {
			null != e && (console.log("======clickBanner====", e), (8 == e.targetAction || 9 == e.targetAction || 10 == e.targetAction) && e.targetPagePath.length > 50 && (sn.bannerClick = !0))
		}
		static addAdv(e, t) { }
		static showBanner(e = 0) {
			if (!sn.isDouyin()) {
				var t = sn.getNextBaner(),
					i = sn._banners[t],
					n = sn._advs[i];
				n && (sn.hideBanner(), n.setPos(), console.log("show banner"), de.adShow(de.AD_TYPE_2, 1, 0, i), n.show()), sn._bannerIndex++, sn._bannerIndex >= sn._banners.length && (sn._bannerIndex = 0);
				t = sn.getNextBaner();
				var a = sn._banners[t],
					o = sn._advs[a];
				o && o.show(null, null, !0)
			}
		}
		static getPreBaner() {
			var e = sn._bannerIndex - 1;
			return e < 0 && (e = sn._banners.length - 1), e
		}
		static getNextBaner() {
			var e = sn._bannerIndex + 1;
			return e >= sn._banners.length && (e = 0), e
		}
		static hideBanner() {
			for (const e in sn._advs)
				if (sn._advs.hasOwnProperty(e)) {
					const t = sn._advs[e];
					t._advType == Vi.banner && (t.hide(), de.adShowEnd(de.AD_TYPE_2, 6, 0, de.AD_WATCH_SKIP, t._advId))
				}
		}
		static showAdv(e, t, i, n = 0) { }
		static hideAdv(e) { }
		static getAdv(e) {
			return sn._advs ? sn._advs[e] : null
		}
	}
	sn._advs = {}, sn._advarr = [], sn._bannerIndex = 0, sn._banners = ["adunit-e97ef73210b6bcfb"], sn._isIpx = !1, sn.bannerClick = !1;
	class rn extends Pi.shop_tanchuanUI {
		constructor() {
			super(), this._gold = 100, this.btnClose.on(Laya.Event.CLICK, this, this.onCancel), this.btnGet.on(Laya.Event.CLICK, this, this.onSure.bind(this)), this.lblGold.text = this._gold.toString()
		}
		open(e, t) {
			this.btnClose && (this.btnClose.visible = !1), super.open(e, t)
		}
		onOpened(e) {
			super.onOpened(e), this.btnClose.visible = !1;
			Laya.timer.once(2e3, this, () => {
				this.btnClose.visible = !0
			}), this.ani1.play(0, !0)
		}
		setData(e) {
			e ? (this._data = e, this._sure = e.onSure, this._cancel = e.onCancel, this.lblGold.text = e.data.price.toString(), this.imgWuti.skin = e.data.icon, this.imgTitle.skin = "gongyong/img_sy_04.png", e.data.type == j.TYPE_WEAPON && (this.imgTitle.skin = "gongyong/img_sy_05.png")) : (this._data = null, this._sure = null, this._cancel = null)
		}
		close(e) {
			this.ani1.stop(), super.close(e), J.I.playSound("close.mp3")
		}
		onSure(e) {
			this._sure && this._sure(), this.close()
		}
		onCancel(e) {
			this._cancel && this._cancel(), this.close()
		}
	}
	class ln {
		constructor() {
			ln._uiClasses[ln.LOADING] = tn, ln._uiClasses[ln.RELIVEVIEW] = Zi, ln._uiClasses[ln.ALERTVIEW] = ji, ln._uiClasses[ln.REWARDVIEW] = $i, ln._uiClasses[ln.FREEUSEVIEW] = Ji, ln._uiClasses[ln.RELIVEBOSSVIEW] = an, ln._uiClasses[ln.REWARDBOSSVIEW] = on, ln._uiClasses[ln.SHOPVIEW] = nn, ln._uiClasses[ln.SHOPITEMVIEW] = rn, Ct.instance.getLayer(M.Normal).addChild(Laya.Dialog.manager), this.openPage(ln.LOADING)
		}
		getLoadIdx() {
			let e = ln._uiCache[ln.LOADING];
			return e && e.parent ? e.parent.getChildIndex(e) : -1
		}
		showHud(e = !1) {
			if (e || (this._hudView || (this._hudView = new Ki), this._hudView.initHud()), J.I.isMusicMute ? J.I.playMusic("mainbg.mp3") : (Laya.SoundManager.stopAllSound(), Laya.SoundManager.setSoundVolume(0), Laya.SoundManager.setMusicVolume(0)), this._hudView && !this._hudView.parent) {
				let e = this.getLoadIdx();
				e < 0 ? Laya.Scene.root.addChild(this._hudView) : Laya.Scene.root.addChildAt(this._hudView, e <= 0 ? 0 : e - 1)
			}
		}
		hideHud() {
			this._hudView && this._hudView.removeSelf()
		}
		get hudView() {
			return this._hudView
		}
		showWaiting(e) {
			this._waiting || (this._waiting = new en), this._waiting.show(e)
		}
		hideWaiting() {
			this._waiting && this._waiting.hide()
		}
		openPage(e, t = !1, i = !0) {
			let n = ln._uiCache[e];
			if (!n) {
				n = new (0, ln._uiClasses[e]), ln._uiCache[e] = n
			}
			let a = n.parent;
			return a ? i && a.setChildIndex(n, a.numChildren - 1) : n.open(t), n
		}
		closePage(e) {
			let t = ln._uiCache[e];
			t && t.close()
		}
		static showDialog(e, t = !1, i = !1) {
			this._lastDialog = e;
			var n = ln.getDialog(e);
			return i ? n.popup(t, !0) : n.show(t, !1), n
		}
		static closeDialog(e, t = !1) {
			var i = ln._uiCache[e];
			i && (i.close(), this._lastDialog == e && (this._lastDialog = ""))
		}
		static getDialog(e) {
			var t = ln._uiCache[e];
			t || (t = new (0, ln._uiClasses[e]), ln._uiCache[e] = t);
			return t
		}
		static haveBannerPage() {
			if (sn.isDouyin()) return !1;
			switch (this._lastDialog) {
				case ln.RELIVEVIEW:
				case ln.REWARDBOSSVIEW:
				case ln.RELIVEBOSSVIEW:
				case ln.REWARDVIEW:
				case ln.FREEUSEVIEW:
					return !0
			}
			return !1
		}
		onUpdate(e) { }
		static getMoneyShowStr(e) {
			let t = "";
			return t = e > 1e5 ? Math.floor(e / 1e3) + "K" : e.toString()
		}
		showCar(e, t, i = 0, n = -.1, a = 0, o = 0) { }
		onLoadCarSkinEnd(e, t, i, n = -.1, a = 0, o = 0, s) {
			if (t || this.hideWaiting(), !s) return;
			this._autoR && this._autoR.stop(), e.removeChildren(), s.removeSelf();
			let r = s.numChildren - 1,
				l = s.getChildAt(r);
			l.getComponent(Laya.Animator).play("stand");
			let d = l.getChildByName("speed");
			d && (d.active = !1);
			let h = l.getChildByName("tongyong");
			h && (h.active = !1);
			let c = l.getChildByName("taillight");
			c && (c.active = !1);
			let p = e.y / 140;
			l.transform.position.y = i + p, l.transform.position.x = n, l.transform.position = l.transform.position, l.transform.localRotationEulerY = 140, l.transform.localScaleX = l.transform.localScaleY = l.transform.localScaleZ = 2, e.addChild(s), this.loadCarGlow(s, a, o, p)
		}
		stopCarLoop() {
			this._autoR && this._autoR.stop()
		}
		loadCarGlow(e, t, i, n) {
			let a = te.scpath + "carglowui.lh",
				o = Laya.Loader.getRes(a);
			o ? this.onLoadCarGlowUIEnd(e, t, i, n, o) : Laya.Sprite3D.load(a, Laya.Handler.create(this, this.onLoadCarGlowUIEnd, [e, t, i, n]))
		}
		onLoadCarGlowUIEnd(e, t, i, n, a) {
			e && a && (a.removeSelf(), Laya.stage.height > 1285 && (a.transform.localScaleX = a.transform.localScaleY = a.transform.localScaleZ = .55, i -= .38), a.transform.position.x = t, a.transform.position.y = i + n, a.transform.position = a.transform.position, e.addChildAt(a, 2))
		}
	}
	ln.LOADING = "LoadingView", ln.RELIVEVIEW = "ReliveView", ln.ALERTVIEW = "alertView", ln.REWARDVIEW = "rewardView", ln.FREEUSEVIEW = "freeUseView", ln.WAITINGVIEW = "waitingview", ln.SHOPVIEW = "shopview", ln.REWARDBOSSVIEW = "RewardBossView", ln.RELIVEBOSSVIEW = "ReliveBossView", ln.SHOPITEMVIEW = "ShopItemView", ln._uiClasses = {}, ln._uiCache = {}, ln._lastDialog = "";
	class dn extends Pi.box.PifuBoxUI {
		constructor() {
			super(), this._isSelected = !1, this._index = -1, this._type = 0, this._isLocked = !1, this._isGeted = !1, this.on(Laya.Event.CLICK, this, this.onActivePifu)
		}
		onActivePifu(e) {
			if (this._isGeted) this.switchPifu();
			else if (this._isLocked) console.log("体验完整版");
			else {
				let e = J.I.money - this.dataSource.price >= 0;
				if (e) {
					if (e) {
						this.dataSource.type = this._type;
						var t = ln.getDialog(ln.SHOPITEMVIEW);
						t.setData({
							data: this.dataSource,
							onSure: () => {
								this.activePifu()
							},
							onCancel: null
						}), t.popup(!1, !0)
					}
				} else {
					var i = ln.getDialog(ln.ALERTVIEW);
					i.setData({
						data: this.dataSource,
						onSure: () => { },
						onCancel: null
					}), i.popup(!1, !0)
				}
			}
		}
		switchPifu() {
			let e;
			this.dataSource.price;
			switch (this._type) {
				case j.TYPE_WEAPON:
					J.I.weapons[this._index] = -1, (e = new ce(ce.WEAPON_CHANGE)).data = {
						id: this.dataSource.id,
						free: !1
					}, de.getEquip(this.dataSource.id, de.EQUIP_WEAPON);
					break;
				case j.TYPE_MOTO:
					J.I.motos[this._index] = -1, (e = new ce(ce.MOTO_CHANGE)).data = {
						id: this.dataSource.id,
						free: !1
					}, de.getEquip(this.dataSource.id, de.EQUIP_MOTOR)
			}
			Ni.evt.dispatchEvent(e), this.updateView(), J.I.playSound("levelup.mp3")
		}
		activePifu() {
			let e, t = this.dataSource.price;
			switch (!this._isLocked && t > 0 && (J.I.money -= t), this._type) {
				case j.TYPE_WEAPON:
					J.I.weapons[this._index] = -1, (e = new ce(ce.WEAPON_CHANGE)).data = {
						id: this.dataSource.id,
						free: !1
					}, de.getEquip(this.dataSource.id, de.EQUIP_WEAPON);
					break;
				case j.TYPE_MOTO:
					J.I.motos[this._index] = -1, (e = new ce(ce.MOTO_CHANGE)).data = {
						id: this.dataSource.id,
						free: !1
					}
			}
			Ni.evt.dispatchEvent(e), Ni.evt.dispatchEvent(new ce(ce.MONEY_CHANGE)), this.updateView(), J.I.playSound("levelup.mp3")
		}
		setData(e, t, i, n) {
			if (!e) return this.clear(), void (this.dataSource = null);
			this._index = i, this._type = t, this.dataSource = e, this.imgShow.texture = e.icon, this.updateView(), this.isSelected = n
		}
		updateView() {
			switch (this._isGeted = !1, this._type) {
				case j.TYPE_WEAPON:
					this._isGeted = -1 == J.I.weapons[this._index];
					break;
				case j.TYPE_MOTO:
					this._isGeted = -1 == J.I.motos[this._index]
			}
			let e = this.dataSource.price;
			this._isLocked = !1, e < 0 ? (this._isLocked = !0, this.lblCost.text = "", this.imgGold.visible = !1) : 0 == e || this._isGeted ? (this.lblCost.text = "", this.imgGold.visible = !1) : (this.lblCost.text = e.toString(), this.imgGold.visible = !0), this.imgLock.visible = this._isLocked
		}
		set isSelected(e) {
			this._isSelected = e, this.imgSelect.visible = e
		}
		clear() {
			this.isSelected = !1, this.lblCost.text = ""
		}
	}
	class hn extends Laya.List {
		constructor() {
			super(), this.mIsAutoScroll = !1, this.mAutoScrollSpeed = 0, this.mAutoScrollDir = 1, this.mAutoWaitTime = 500
		}
		onEnable() {
			super.onEnable(), Laya.timer.frameLoop(1, this, this.onAutoScroll)
		}
		onDisable() {
			super.onDisable(), Laya.timer.clear(this, this.onAutoScroll)
		}
		setAutoScroll(e, t, i) {
			this.scrollBar.max < 50 ? this.mAutoScrollSpeed = 0 : (this.mAutoScrollSpeed = e, this.mAutoScrollDir = t, this.mAutoWaitTime = i)
		}
		onAutoScroll() {
			if (0 == this.mAutoScrollSpeed) return;
			if (this.mAutoWaitTime > 0) return void (this.mAutoWaitTime -= Laya.timer.delta);
			let e = this.scrollBar,
				t = e.value + 1 * this.mAutoScrollDir;
			e.value = t, t >= e.max ? this.mAutoScrollDir > 0 && (this.mAutoWaitTime = 500, this.mAutoScrollDir = -1) : t <= e.min && this.mAutoScrollDir < 0 && (this.mAutoWaitTime = 500, this.mAutoScrollDir = 1)
		}
	}
	class cn {
		constructor() {
			this.handlers = new Array
		}
		init(e, t, i, n, a) {
			this.eName = e, this.target = t, this.caller = i, this.func = n, this.target.on(e, this, this.invoke, [t, a])
		}
		invoke(e, t) {
			this.func && this.func.call(this.caller, ...t), Re.instance.triggerListener(cn.TriggerEvent, e)
		}
		equals(e) {
			return this.target == e
		}
		dispose() {
			this.target.off(this.eName, this, this.invoke), this.eName = null, this.target = null, this.caller = null, this.func = null
		}
		static create() {
			return Laya.Pool.getItemByClass("ButtonTrigger", cn)
		}
		static recycle(e) {
			Laya.Pool.recover("ButtonTrigger", e)
		}
	}
	cn.TriggerEvent = 9999;
	class pn {
		constructor() {
			this.assetList = [], this.uiLayer = M.Normal, this.showSound = "res/audios/sound/showPanel.mp3", this.hideSound = "res/audios/sound/hidePanel.mp3"
		}
		get view() {
			return this.mView
		}
		prepare(e, t) {
			this.proxy = e, this.func = t, this.assetList.length > 0 ? Laya.loader.load(this.assetList, Laya.Handler.create(this, this.onPrepareComplete)) : (this.onPrepareComplete(!0), xe.warn("this panel dont have assetlist,%s", this.mView.name))
		}
		onPrepareComplete(e) {
			e ? (this.mView = this.createView(), Laya.loader.off(Laya.Event.ERROR, this, this.onPrepareError), this.func.call(this.proxy, !0, this.mView, this.uiLayer)) : xe.error("onPrepareComplete: but is fail")
		}
		onPrepareError(e) {
			xe.error("UI OnPrepareError: %s", e), this.assetList.indexOf(e) >= 0 && this.func.call(this.proxy, !1)
		}
		update(e) { }
		resize() { }
		initial() {
			Laya.loader.on(Laya.Event.ERROR, this, this.onPrepareError), this.clicks = new a
		}
		start() { }
		show(e) {
			this.content = this.findChild(this.mView, "content");
			let t = this.mView.getChildByName("box");
			this.addClickListener(t, this.closeSelf);
			let i = this.findChild(this.mView, "content/close");
			this.addClickListener(i, this.closeSelf), this.showAnimation()
		}
		hide() {
			for (let e of this.clicks.array) e.dispose(), cn.recycle(e);
			this.clicks.clear()
		}
		end() { }
		dispose() {
			if (Laya.loader.off(Laya.Event.ERROR, this, this.onPrepareError), this.mView)
				for (let e of this.assetList) Laya.loader.clearRes(e)
		}
		showAnimation() {
			this.content && (this.content.scale(0, 0), Laya.Tween.to(this.content, {
				scaleX: 1,
				scaleY: 1
			}, 350, Laya.Ease.backOut, Laya.Handler.create(this, this.showAnimationComplete)))
		}
		showAnimationComplete() { }
		showPanel(e, t) {
			Mt.instance.show(e, t)
		}
		hidePanel(e) {
			Mt.instance.hide(e)
		}
		destroyPanel(e) {
			Mt.instance.destroy(e)
		}
		closeSelf() {
			this.hidePanel(this.proxy.path)
		}
		destroySelf() {
			this.destroyPanel(this.proxy.path)
		}
		addClickListener(e, t, i, n) {
			if (!e) return null;
			let a = Laya.Event.CLICK;
			n && (a = n);
			let o = [];
			i && (o = i);
			let s = cn.create();
			return s.init(a, e, this, t, o), this.clicks.add(s), e
		}
		setVerticalListAttribute(e) {
			e instanceof Laya.List && (e.vScrollBarSkin = "", e.scrollBar.elasticBackTime = 300, e.scrollBar.elasticDistance = 120), e instanceof Laya.Panel && (e.vScrollBarSkin = "", e.vScrollBar.elasticBackTime = 300, e.vScrollBar.elasticDistance = 120)
		}
		setHorizontalListAttribute(e) {
			e instanceof Laya.List && (e.hScrollBarSkin = "", e.scrollBar.elasticBackTime = 300, e.scrollBar.elasticDistance = 120), e instanceof Laya.Panel && (e.hScrollBarSkin = "", e.hScrollBar.elasticBackTime = 300, e.hScrollBar.elasticDistance = 120)
		}
		findChild(e, t) {
			return Mt.instance.findChild(e, t)
		}
		playSound(e) {
			Fe.isNullOrEmpty(e) || Laya.SoundManager.playSound(e)
		}
	}
	class gn extends pn {
		constructor() {
			super(...arguments), this.assetList = ["view/MoonGuideGestureView.json"]
		}
		createView() {
			return new Pi.view.MoonGuideGestureViewUI
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height), this.view.Ani_Gesture.play(0, !0)
		}
	}
	class mn extends pn {
		constructor() {
			super(...arguments), this.animTime = 1e3, this.widthOff = 20, this.fontWidth = 40, this.iconWidth = 110, this.assetList = ["view/MoonTip.json"]
		}
		createView() {
			return new Pi.view.MoonTipUI
		}
		initial() {
			super.initial(), this.uiLayer = M.Waiting
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height), this.view.bg.visible = !0, this.view.bg.y = .5 * Laya.stage.height, "string" == typeof e ? (this.view.box_txt.visible = !0, this.view.content.text = e, this.view.bg.width = this.view.content.text.length * this.fontWidth + this.widthOff) : (this.view.box_icon.visible = !0, this.view.lbl_icon.text = e[0], this.view.img_icon.skin = e[1], this.view.bg.width = this.view.lbl_icon.text.length * this.fontWidth + this.iconWidth), Laya.Tween.to(this.view.bg, {
				y: .3 * Laya.stage.height
			}, this.animTime, Laya.Ease.circOut, Laya.Handler.create(this, this.onMoveFinished))
		}
		onMoveFinished() {
			this.view.box_txt.visible = !1, this.view.box_icon.visible = !1, this.view.bg.width = 0, this.closeSelf()
		}
	}
	class un extends pn {
		constructor() {
			super(...arguments), this.adEnum = -1, this.showGames = !0, this.gamekeys = [], this.showMain = !0, this.assetList = ["view/MoonMainAd.json"]
		}
		createView() {
			return new Pi.view.MoonMainAdUI
		}
		initial() {
			super.initial(), this.uiLayer = M.Dialog
		}
		start() {
			super.start()
		}
		end() {
			super.end()
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height);
			let t = 0;
			e && e.top && (this.view.List_Game1.top = e.top, this.view.List_Game2.top = e.top, t = e.top), null != e && null != e.adEnum && e.adEnum >= 0 && (this.adEnum = e.adEnum, xe.log("MoonMainAdPanel-showBannerAd"), xi.I.showBannerAd(this.adEnum)), null != e && null != e.isMain && (this.showMain = e.isMain), Re.instance.addListener(Wt.MOOM_MAINAD_CLICK, this, this.onClickL);
			let i = U.I.getConf();
			this.view.List_Game1.visible = this.showGames, this.view.List_Game2.visible = this.showGames, this.gamekeys = [];
			let n = Ci.I.getMatrixByPosition(ct.MAIN_LEFT_AD);
			if (null == n || n.length <= 0) {
				if (this.view.List_Game1.visible = !1, Laya.Browser.onMiniGame) {
					let e = Ci.I.getAdSwitchByPosition(gt.MAIN_LEFT_AD);
					if (null != e && 1 == e.state) {
						let i = t > 0 ? t : e.topMargin;
						Ri.I.showCustom(b.AD_CUSTOM_MAIN_SINGLE_LEFT, i, e.leftMargin, this, this.onErrorLeftCoustAd)
					}
				}
			} else {
				for (const e of n) this.gamekeys.push(e.tgamekey);
				this.view.List_Game1.vScrollBarSkin = "", this.view.List_Game1.elasticEnabled = !1, this.view.List_Game1.scrollBar.rollRatio = 0, this.view.List_Game1.renderHandler = new Laya.Handler(this, this.cellsForLeftGame), this.view.List_Game1.array = n, this.view.List_Game1.setAutoScroll(1, 1, 500), this.gamekeys.length > 0 && Ci.I.jumpStatistics(i, c.instance.openid, bi.MATRIX_TYPE_SHOW, this.gamekeys.join(","), ct.MAIN_LEFT_AD)
			}
			this.gamekeys = [];
			let a = Ci.I.getMatrixByPosition(ct.MAIN_RIGHT_AD);
			if (null == a || a.length <= 0) {
				if (this.view.List_Game2.visible = !1, Laya.Browser.onMiniGame) {
					let e = Ci.I.getAdSwitchByPosition(gt.MAIN_RIGHT_AD);
					if (null != e && 1 == e.state) {
						let i = t > 0 ? t : e.topMargin;
						Ri.I.showCustom(b.AD_CUSTOM_MAIN_RIGHT, i, e.leftMargin, this, this.onErrorRightCoustAd)
					}
				}
			} else {
				for (const e of a) this.gamekeys.push(e.tgamekey);
				this.view.List_Game2.vScrollBarSkin = "", this.view.List_Game2.elasticEnabled = !1, this.view.List_Game2.scrollBar.rollRatio = 0, this.view.List_Game2.renderHandler = new Laya.Handler(this, this.cellsForRightGame), this.view.List_Game2.array = a, this.view.List_Game2.setAutoScroll(1, 1, 500), this.gamekeys.length > 0 && Ci.I.jumpStatistics(i, c.instance.openid, bi.MATRIX_TYPE_SHOW, this.gamekeys.join(","), ct.MAIN_RIGHT_AD)
			}
			if (Laya.Browser.onMiniGame && this.showMain) {
				let e = Ci.I.getAdSwitchByPosition(gt.MAIN_ICON_AD);
				null != e && 1 == e.state && Ri.I.showCustom(b.AD_CUSTOM_MAIN, e.topMargin, e.leftMargin, this, null)
			}
		}
		onErrorLeftCoustAd(e) {
			xe.log("MoonMainAdPanel--onErrorLeftCoustAd---", e)
		}
		onErrorRightCoustAd(e) {
			xe.log("MoonMainAdPanel--onErrorRightCoustAd---", e)
		}
		onClickL(e) {
			this.view.List_Game1.visible = !1, this.view.List_Game2.visible = !1, Laya.Browser.onMiniGame && (Ri.I.hideCustom(b.AD_CUSTOM_MAIN_RIGHT), Ri.I.hideCustom(b.AD_CUSTOM_MAIN_SINGLE_LEFT), this.showMain && Ri.I.hideCustom(b.AD_CUSTOM_MAIN))
		}
		cellsForLeftGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.MAIN_LEFT_AD])
		}
		cellsForRightGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.MAIN_RIGHT_AD])
		}
		hide() {
			null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonMainAdPanel-hideBannerAd", this.adEnum), xi.I.hideBannerAd(this.adEnum)), Laya.Browser.onMiniGame && (Ri.I.hideCustom(b.AD_CUSTOM_MAIN_RIGHT), Ri.I.hideCustom(b.AD_CUSTOM_MAIN_SINGLE_LEFT), Ri.I.hideCustom(b.AD_CUSTOM_MAIN)), Re.instance.removeListener(Wt.MOOM_MAINAD_CLICK, this, this.onClickL), super.hide()
		}
	}
	class fn extends pn {
		constructor() {
			super(...arguments), this.adEnum = -1, this.assetList = ["view/MoonResults.json"]
		}
		createView() {
			return new Pi.view.MoonResultsUI
		}
		initial() {
			super.initial(), this.uiLayer = M.Dialog
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height), this.mgoonCaller = e.mgoonCaller, this.mgoonFunc = e.mgoonFunc, this.adEnum = e.adEnum, null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonResultsPanel-showBannerAd"), xi.I.showBannerAd(this.adEnum)), this.addClickListener(this.view.goon, this.onClickL);
			let t = [],
				i = [],
				n = (U.I.getConf(), Ci.I.getMatrixByPosition(ct.RESULT_HOT_AD)),
				a = Ci.I.getMatrixByPosition(ct.RESULT_FRIEND_AD),
				o = [];
			if (null != n && n.length > 0) {
				for (const e of n) t.push(e.tgamekey);
				for (let e = 0; e < n.length; e++) {
					let t = n[e];
					o.push(t)
				}
			}
			o.length <= 0 ? this.view.hgamelist.visible = !1 : (this.view.hgamelist.hScrollBarSkin = "", this.view.hgamelist.elasticEnabled = !1, this.view.hgamelist.scrollBar.rollRatio = 0, this.view.hgamelist.renderHandler = new Laya.Handler(this, this.cellsForGame), this.view.hgamelist.array = o, this.view.hgamelist.setAutoScroll(1, 1, 500), Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_SHOW, t.join(","), ct.RESULT_HOT_AD));
			let s = [];
			if (null != a && a.length > 0) {
				for (const e of a) i.push(e.tgamekey);
				for (let e = 0; e < a.length; e++) {
					let t = a[e];
					s.push(t)
				}
			}
			s.length <= 0 ? this.view.vgamelist.visible = !1 : (this.view.vgamelist.vScrollBarSkin = "", this.view.vgamelist.elasticEnabled = !1, this.view.vgamelist.scrollBar.rollRatio = 0, this.view.vgamelist.renderHandler = new Laya.Handler(this, this.cellsForGame2), this.view.vgamelist.array = s, this.view.vgamelist.setAutoScroll(1, 1, 500), Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_SHOW, i.join(","), ct.RESULT_FRIEND_AD))
		}
		hide() {
			null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonResultsPanel-hideBannerAd", this.adEnum), xi.I.hideBannerAd(this.adEnum)), super.hide()
		}
		onClickL(e) {
			Laya.Browser.onMiniGame && Ci.I.checkSkip(), this.closeSelf(), this.mgoonCaller && this.mgoonFunc && this.mgoonFunc.call(this.mgoonCaller)
		}
		cellsForGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.RESULT_HOT_AD])
		}
		cellsForGame2(e, t) {
			let i = e.dataSource,
				n = e.getChildByName("Img_Game"),
				a = i.appname;
			a.length > 6 && (a = i.appname[0] + i.appname[1] + i.appname[2] + "..."), n.skin = i.banner, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.RESULT_FRIEND_AD])
		}
	}
	class _n {
		constructor() {
			this.itemMap = {}
		}
		static get I() {
			return h.get(_n)
		}
		init() { }
		setDataGameToList(e, t) {
			let i = U.I.getConf();
			if (i.bbbsReportItemMap.hasOwnProperty(e)) {
				const n = i.bbbsReportItemMap[e];
				if (n && n.id) {
					xe.log("BBBSUniomHelper setDataGameToList element.id:", n.id);
					let e = _n.I.getDataGameList(n.id);
					if (xe.log("BBBSUniomHelper setDataGameToList rlist:", e), e && e.length > 0)
						for (let i = 0; i < e.length; i++) {
							let n = e[i];
							n && t.push(n)
						}
				}
			}
		}
		getDataGameList(e) {
			xe.log("BBBSUniomHelper getDataGameList flowType:", e);
			let t = this.getData(e),
				i = [];
			if (t)
				for (let n = 0; n < t.length; n++) {
					const a = t[n];
					if (a && a.logo && a.programName && a.appID && a.maxPic && a.defaultUrl) {
						xe.log("!!!BBBSUniomHelper getDataGameList:", a);
						let t = {};
						t.index = n + 1, t.icon = a.logo, t.appName = a.programName, t.appId = a.appID, t.banner = a.maxPic, t.path = a.defaultUrl, t.flowType = e, t.isBBBS = !0, i.push(t)
					}
				}
			return i
		}
		getData(e) {
			xe.log("BBBSUniomHelper getData flowType:", e);
			let t = unionapi.getData(e);
			if (t)
				for (let i = 0; i < t.length; i++) {
					let n = t[i];
					n && n.appID ? (xe.debug("BBBSUniomHelper getData:", n), this.itemMap[`${e}-${n.appID}`] = n) : xe.warn("BBBSUniomHelper getData data is null")
				} else xe.warn("unionapi.getData arr is null");
			return xe.log("BBBSUniomHelper itemMap:", this.itemMap), t
		}
		reportByAppId(e, t, i, n) {
			let a = this.itemMap[`${t}-${e}`];
			a && this.report(a, t, i, n)
		}
		report(e, t, i, n) {
			unionapi.report(e, t, i, n)
		}
	}
	class yn {
		constructor() {
			this.TIME = 4e4, this.mAdMap = {}, this.mLastData = {}
		}
		static get I() {
			return h.get(yn)
		}
		createNativeAd(e, t, i) {
			if (!Laya.Browser.onVVMiniGame) return;
			let n = U.I.getConf().ad.gameportal[e];
			i.visible = !1;
			let a = this;
			if (xe.log("创建原生广告", e, a.mAdMap), null != a.mAdMap[e.toString()] && null != a.mAdMap[e.toString()] && this.mAdMap[e.toString()].skip && (a.mLastData[e.toString()] = a.mAdMap[e.toString()], a.mAdMap[e.toString()].nativeAd.offLoad(null), a.mAdMap[e.toString()].nativeAd.offError(null), a.mAdMap[e.toString()] = null), null != a.mAdMap[e.toString()] && null != a.mAdMap[e.toString()] || !n || "" == n) xe.log("本地有数据", e, a.mAdMap), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i), a.AddFreshAd(e, t, i);
			else {
				xe.log("创建原生广告", e);
				let o = qg.createNativeAd({
					adUnitId: n
				});
				o.offLoad(null), o.offError(null), o.onLoad(function (n) {
					let s;
					xe.log("原生广告加载完成-onload触发", e), xe.log(n), n && n.adList && n.adList.length > 0 ? (s = n.adList.pop(), i && (a.showNativeInfo(s, t, i), a.reportAdShow(o, s.adId.toString())), a.mAdMap[e.toString()] = {
						nativeAd: o,
						view: i,
						nativeCurrentAd: s,
						skip: !1
					}, a.AddFreshAd(e, t, i)) : i && null != a.mLastData[e.toString()] && null != a.mLastData[e.toString()] && (a.mAdMap[e.toString()] = a.mLastData[e.toString()], xe.log("原生广告为空-使用旧的", e, a.mAdMap[e.toString()]), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i), a.AddFreshAd(e, t, i))
				}), o.onError(n => {
					xe.log("原生广告加载异常", e, n), i && null != a.mLastData[e.toString()] && null != a.mLastData[e.toString()] && (a.mAdMap[e.toString()] = a.mLastData[e.toString()], xe.log("原生广告加载异常-使用旧的", e, a.mAdMap[e.toString()]), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i)), a.AddFreshAd(e, t, i)
				}), o.load()
			}
		}
		showNativeInfo(e, t, i) {
			xe.log("展示原生广告", t, e), t == C.IMG ? (i.skin = e.imgUrlList[0], i.visible = !0) : (i.skin = e.icon ? e.icon : e.imgUrlList[0], i.visible = !0)
		}
		reportAdShow(e, t) {
			xe.log("上报广告曝光", t), e.reportAdShow({
				adId: t
			})
		}
		reportAdClick(e, t) {
			return !Laya.Browser.onVVMiniGame || (xe.log("上报广告点击1", e, this.mAdMap), null == this.mAdMap[e.toString()] || null == this.mAdMap[e.toString()] || null == this.mAdMap[e.toString()].nativeAd || this.mAdMap[e.toString()].skip ? (xe.log("不需要点击上报", this.mAdMap[e.toString()]), !1) : (this.mAdMap[e.toString()].nativeAd.reportAdClick({
				adId: this.mAdMap[e.toString()].nativeCurrentAd.adId
			}), this.mAdMap[e.toString()].skip = !0, xe.log("上报广告点击", this.mAdMap[e.toString()].nativeCurrentAd.adId), xe.log("重新加载一次原生广告", e), this.createNativeAd(e, t, this.mAdMap[e.toString()].view), !0))
		}
		AddFreshAd(e, t, i) {
			t == C.IMG ? (Laya.timer.clear(this, this.loopCompleteAd), Laya.timer.loop(this.TIME, this, this.loopCompleteAd, [e, t, i])) : (Laya.timer.clear(this, this.loopCompleteAd2), Laya.timer.loop(this.TIME, this, this.loopCompleteAd2, [e, t, i]))
		}
		loopCompleteAd(e, t, i) {
			xe.log("广告换一个", e), null != this.mAdMap[e.toString()] && null != this.mAdMap[e.toString()] && (this.mAdMap[e.toString()].skip = !0), this.createNativeAd(e, t, i)
		}
		loopCompleteAd2(e, t, i) {
			xe.log("广告换一个", e), this.mAdMap[e.toString()] && null != this.mAdMap[e.toString()] && (this.mAdMap[e.toString()].skip = !0), this.createNativeAd(e, t, i)
		}
	}
	class In {
		constructor() {
			this.TIME = 4e4, this.mAdMap = {}, this.mLastData = {}
		}
		static get I() {
			return h.get(In)
		}
		createNativeAd(e, t, i) {
			if (!Laya.Browser.onQGMiniGame) return;
			let n = U.I.getConf().ad.gameportal[e];
			i.visible = !1;
			let a = this;
			if (xe.log("创建原生广告", e, i), null != a.mAdMap[e.toString()] && null != a.mAdMap[e.toString()] && this.mAdMap[e.toString()].skip && (a.mLastData[e.toString()] = a.mAdMap[e.toString()], a.mAdMap[e.toString()].nativeAd.offLoad(null), a.mAdMap[e.toString()].nativeAd.offError(null), a.mAdMap[e.toString()].nativeAd.destroy(), a.mAdMap[e.toString()] = null), null != a.mAdMap[e.toString()] && null != a.mAdMap[e.toString()] || !n || "" == n) xe.log("本地有数据", e, a.mAdMap), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i), a.AddFreshAd(e, t, i);
			else {
				xe.log("创建原生广告", e);
				let o = qg.createNativeAd({
					adUnitId: n
				});
				o.offLoad(null), o.offError(null), o.onLoad(function (n) {
					let s;
					xe.log("原生广告加载完成-onload触发", e), xe.log(n), n && n.adList && n.adList.length > 0 ? (s = n.adList.pop(), i && (a.showNativeInfo(s, t, i), a.reportAdShow(o, s.adId.toString())), a.mAdMap[e.toString()] = {
						nativeAd: o,
						view: i,
						nativeCurrentAd: s,
						skip: !1
					}, a.AddFreshAd(e, t, i)) : i && null != a.mLastData[e.toString()] && null != a.mLastData[e.toString()] && (a.mAdMap[e.toString()] = a.mLastData[e.toString()], xe.log("原生广告为空-使用旧的", e, a.mAdMap[e.toString()]), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i), a.AddFreshAd(e, t, i))
				}), o.onError(n => {
					xe.log("原生广告加载异常", e, n), i && null != a.mLastData[e.toString()] && null != a.mLastData[e.toString()] && (a.mAdMap[e.toString()] = a.mLastData[e.toString()], xe.log("原生广告加载异常-使用旧的", e, a.mAdMap[e.toString()]), a.mAdMap[e.toString()].view = i, a.showNativeInfo(a.mAdMap[e.toString()].nativeCurrentAd, t, i)), a.AddFreshAd(e, t, i)
				}), o.load()
			}
		}
		showNativeInfo(e, t, i) {
			xe.log("展示原生广告", t, i), t == C.IMG ? (i.skin = e.imgUrlList.length > 0 ? e.imgUrlList[0] : e.icon, i.visible = !0) : (i.skin = e.icon ? e.icon : e.imgUrlList[0], i.visible = !0)
		}
		reportAdShow(e, t) {
			xe.log("上报广告曝光", t), e.reportAdShow({
				adId: t
			})
		}
		reportAdClick(e, t) {
			return !Laya.Browser.onQGMiniGame || (xe.log("上报广告点击1", e, this.mAdMap), null == this.mAdMap[e.toString()] || null == this.mAdMap[e.toString()] || null == this.mAdMap[e.toString()].nativeAd || this.mAdMap[e.toString()].skip ? (xe.log("不需要点击上报", this.mAdMap[e.toString()]), !1) : (this.mAdMap[e.toString()].nativeAd.reportAdClick({
				adId: this.mAdMap[e.toString()].nativeCurrentAd.adId
			}), this.mAdMap[e.toString()].skip = !0, xe.log("上报广告点击", this.mAdMap[e.toString()].nativeCurrentAd.adId), xe.log("重新加载一次原生广告", e), this.createNativeAd(e, t, this.mAdMap[e.toString()].view), !0))
		}
		AddFreshAd(e, t, i) {
			t == C.IMG ? (Laya.timer.clear(this, this.loopCompleteAd), Laya.timer.loop(this.TIME, this, this.loopCompleteAd, [e, t, i])) : (Laya.timer.clear(this, this.loopCompleteAd2), Laya.timer.loop(this.TIME, this, this.loopCompleteAd2, [e, t, i]))
		}
		loopCompleteAd(e, t, i) {
			xe.log("广告换一个", e), null != this.mAdMap[e.toString()] && null != this.mAdMap[e.toString()] && (this.mAdMap[e.toString()].skip = !0), this.createNativeAd(e, t, i)
		}
		loopCompleteAd2(e, t, i) {
			xe.log("广告换一个", e), this.mAdMap[e.toString()] && null != this.mAdMap[e.toString()] && (this.mAdMap[e.toString()].skip = !0), this.createNativeAd(e, t, i)
		}
	}
	class wn extends pn {
		constructor() {
			super(...arguments), this.adEnum = -1, this.adTop = 0, this.assetList = ["view/MoonResults2.json"]
		}
		createView() {
			return new Pi.view.MoonResults2UI
		}
		initial() {
			super.initial(), this.uiLayer = M.Dialog
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height), null != e && void 0 !== this.adEnum && (this.adEnum = e.adEnum, this.adTop = e.adTop);
			let t = [],
				i = U.I.getConf();
			if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
				this.view.hgamebox.visible = !1, this.view.hgamelist.visible = !1;
				let e = Ci.I.getAdSwitchByPosition(pt.MAIN_TOP_AD);
				if (null == e || 0 == e.state);
				else {
					let e = this.view.ov_native.getChildByName("icon");
					Laya.Browser.onVVMiniGame ? yn.I.createNativeAd(x.AD_GAME_NATIVE, C.IMG, e) : In.I.createNativeAd(x.AD_GAME_NATIVE, C.IMG, e), e.on(Laya.Event.MOUSE_OVER, this, () => {
						Laya.Browser.onVVMiniGame ? yn.I.reportAdClick(x.AD_GAME_NATIVE, C.IMG) : In.I.reportAdClick(x.AD_GAME_NATIVE, C.IMG)
					})
				}
				if (null == (e = Ci.I.getAdSwitchByPosition(pt.MAIN_RIGHT_AD)) || 0 == e.state) this.view.ov_native2.visible = !1;
				else {
					this.view.ov_native2.visible = !0;
					let e = this.view.ov_native2.getChildByName("icon");
					Laya.Browser.onVVMiniGame ? yn.I.createNativeAd(x.AD_GAME_SINGLE_NATIVE, C.ICON, e) : In.I.createNativeAd(x.AD_GAME_SINGLE_NATIVE, C.ICON, e), e.on(Laya.Event.MOUSE_OVER, this, () => {
						Laya.Browser.onVVMiniGame ? yn.I.reportAdClick(x.AD_GAME_SINGLE_NATIVE, C.ICON) : In.I.reportAdClick(x.AD_GAME_SINGLE_NATIVE, C.ICON)
					}), this.view.ov_native_close.on(Laya.Event.CLICK, this, () => {
						this.view.ov_native2.visible = !1
					})
				}
			} else {
				this.view.ov_native2.visible = !1;
				let e = [],
					n = Ci.I.getMatrixByPosition(ct.RESULT_PASS_AD);
				if (null != n && n.length > 0) {
					for (const t of n) e.push(t.tgamekey);
					for (let e = 0; e < n.length; e++) {
						let a = n[e];
						t.push(a);
						let o = {
							"坑位": a.index,
							"游戏": a.appName
						};
						(a.isBBBS || i.games_ald_ouku) && H.I.sendEvent(`${a.icon}-${W.RESAULT2_SHOW}`, o)
					}
				}
				if (t.length <= 0) {
					if (this.view.hgamebox.visible = !1, this.view.hgamelist.visible = !1, Laya.Browser.onMiniGame) {
						let e = Ci.I.getAdSwitchByPosition(gt.RESULT_TOP_AD);
						null != e && 1 == e.state && Ri.I.showCustom(b.AD_CUSTOM_TOP, e.topMargin, e.leftMargin, this, this.onErrorCoustAd)
					}
				} else this.view.hgamebox.visible = !0, this.view.hgamelist.visible = !0, this.view.hgamelist.vScrollBarSkin = "", this.view.hgamelist.elasticEnabled = !1, this.view.hgamelist.scrollBar.rollRatio = 0, this.view.hgamelist.renderHandler = new Laya.Handler(this, this.cellsForGame), this.view.hgamelist.mouseHandler = new Laya.Handler(this, this.onGameCellEvent), this.view.hgamelist.array = t, this.view.hgamelist.setAutoScroll(1, 1, 500), Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_SHOW, e.join(","), ct.RESULT_PASS_AD)
			}
			if (null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0)
				if (Laya.Browser.onMiniGame) {
					let e = Ci.I.getAdSwitchByPosition(gt.RESULT_TOP_AD),
						t = Ci.I.getMatrixByPosition(ct.RESULT_PASS_AD);
					null != t && t.length > 0 || null == e || 0 == e.state ? (xe.log("MoonResults2Panel-show-showBannerAd"), null !== this.adTop && void 0 !== this.adTop && this.adTop > 0 ? xi.I.showBannerAd(this.adEnum, this.adTop) : xi.I.showBannerAd(this.adEnum)) : (xe.log("MoonResults2Panel-show-hideBannerAd"), xi.I.hideBannerAd(this.adEnum))
				} else xe.log("MoonResults2Panel-show-showBannerAd"), null !== this.adTop && void 0 !== this.adTop && this.adTop > 0 ? xi.I.showBannerAd(this.adEnum, this.adTop) : xi.I.showBannerAd(this.adEnum);
			if (Laya.Browser.onMiniGame) {
				let e = Ci.I.getAdSwitchByPosition(gt.RESULT_RIGHT_AD);
				null != e && 1 == e.state && Ri.I.showCustom(b.AD_CUSTOM_SINGLE_RIFHT2, e.topMargin, e.leftMargin, this, null)
			}
		}
		onErrorCoustAd(e) {
			xe.log("MoonResults2Panel--onErrorTopCoustAd---"), null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonResults2Panel-onErrorCoustAd-showBannerAd"), null !== this.adTop && void 0 !== this.adTop && this.adTop > 0 ? xi.I.showBannerAd(this.adEnum, this.adTop) : xi.I.showBannerAd(this.adEnum))
		}
		hide() {
			null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonResults2Panel-hide-hideBannerAd"), xi.I.hideBannerAd(this.adEnum)), Laya.Browser.onMiniGame && (Ri.I.hideCustom(b.AD_CUSTOM_TOP), Ri.I.hideCustom(b.AD_CUSTOM_SINGLE_RIFHT2)), super.hide()
		}
		cellsForGame(e, t) {
			let i = e.dataSource,
				n = e.getChildByName("Img_Game");
			if (null == i.statistics && i.icon) n.skin = i.icon;
			else {
				let e = U.I.getConf();
				n.skin = `${e.gamesBasePath}/icon/${i.icon}.png`
			}
			e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.RESULT_PASS_AD])
		}
		onGameCellEvent(e) {
			if (e.type != Laya.Event.CLICK) return;
			let t;
			if (Oe.I.isWxMiniGame() ? t = window.wx : Oe.I.isQQMiniGame() && (t = window.qq), null == t) return;
			let i = U.I.getConf(),
				n = e.currentTarget.dataSource,
				a = {
					"坑位": n.index,
					"游戏": n.appName
				};
			(n.isBBBS || i.games_ald_ouku) && H.I.sendEvent(`${n.icon}-${W.RESAULT2_CLICK}`, a), t.navigateToMiniProgram({
				appId: n.appId,
				path: "",
				success: function (e) {
					let t = {
						"坑位": n.index,
						"游戏": n.appName
					};
					(n.isBBBS || i.games_ald_ouku) && H.I.sendEvent(`${n.icon}-${W.RESAULT2_ACT}`, t), n.isBBBS && _n.I.reportByAppId(n.appId, n.flowType, n.index, !0), xe.log("MoonResults2Panel success jump to res:", e), xe.log("MoonResults2Panel success jump to appName", n.appName), xe.log("MoonResults2Panel success jump to flowType", n.flowType), xe.log("MoonResults2Panel success jump to appId", n.appId)
				},
				fail: function (e) {
					xe.log("MoonResults2Panel fail jump to res:", e), xe.log("MoonResults2Panel fail jump to appName", n.appName), xe.log("MoonResults2Panel fail jump to flowType", n.flowType), xe.log("MoonResults2Panel fail jump to appId", n.appId), n.isBBBS && _n.I.reportByAppId(n.appId, n.flowType, n.index, !1)
				}
			})
		}
	}
	class Sn extends pn {
		constructor() {
			super(...arguments), this.adEnum = -1, this.assetList = ["view/MoonGameBox.json"]
		}
		createView() {
			return new Pi.view.MoonGameBoxUI
		}
		initial() {
			super.initial(), this.uiLayer = M.Dialog
		}
		show(e) {
			super.show(e), this.mgoonCaller = e.mgoonCaller, this.mgoonFunc = e.mgoonFunc;
			let t = [],
				i = Ci.I.getMatrixByPosition(ct.BOX_AD);
			for (const e of i) t.push(e.tgamekey);
			this.view.size(Laya.stage.width, Laya.stage.height), this.addClickListener(this.view.btn_close, this.onClick), this.view.list.vScrollBarSkin = "", this.view.list.elasticEnabled = !1, this.view.list.scrollBar.rollRatio = 0, this.view.list.renderHandler = new Laya.Handler(this, this.onRenderItem), this.view.list.array = i, this.view.list.setAutoScroll(1, 1, 500), this.view.btn_close.visible = !1, this.addClickListener(this.view.btn_close, this.onClick), Laya.timer.once(3e3, this, this.showCloseBtn), Ci.I.jumpStatistics(U.I.getConf(), c.instance.openid, bi.MATRIX_TYPE_SHOW, t.join(","), ct.BOX_AD), Laya.Browser.onMiniGame && Mt.instance.hide(bt.MoonMainAdPanel), null != e && null != e.adEnum && e.adEnum >= 0 && (this.adEnum = e.adEnum, xe.log("MoonGameBoxPanel-showBannerAd"), xi.I.showBannerAd(this.adEnum))
		}
		showCloseBtn() {
			this.view.btn_close.visible = !0
		}
		hide() {
			null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonGameBoxPanel-hideBannerAd"), xi.I.hideBannerAd(this.adEnum)), Laya.timer.clearAll(this), super.hide()
		}
		onClick(e) {
			this.closeSelf(), this.mgoonCaller && this.mgoonFunc ? this.mgoonFunc.call(this.mgoonCaller) : Laya.Browser.onMiniGame && Mt.instance.show(bt.MoonMainAdPanel, {
				adEnum: this.adEnum
			})
		}
		onRenderItem(e, t) {
			let i = e.dataSource;
			e.getChildByName("img_icon").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.BOX_AD])
		}
	}
	class vn extends pn {
		constructor() {
			super(...arguments), this.assetList = ["wxlocal/MoonConfirm.json"]
		}
		createView() {
			return new Pi.wxlocal.MoonConfirmUI
		}
		initial() {
			super.initial(), this.uiLayer = M.Normal
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height), this.view.lbl_content.text = e[0], this.mCaller = e[1], this.mCallFunc = e[2], this.addClickListener(this.view.btn_try, this.onTryEvent)
		}
		hide() {
			super.hide()
		}
		onTryEvent() {
			let e = this.mCaller,
				t = this.mCallFunc;
			this.closeSelf(), t && e && t.call(e)
		}
	}
	class En extends pn {
		constructor() {
			super(...arguments), this.adEnum = -1, this.showGames = !0, this.gamekeys = [], this.assetList = ["view/MoonMainAd2.json"]
		}
		createView() {
			return new Pi.view.MoonMainAd2UI
		}
		initial() {
			super.initial(), this.uiLayer = M.Dialog
		}
		start() {
			super.start()
		}
		end() {
			super.end()
		}
		show(e) {
			super.show(e), this.view.size(Laya.stage.width, Laya.stage.height);
			let t = 0;
			e && e.top && (this.view.List_Game1.top = e.top, this.view.List_Game2.top = e.top, t = e.top), null != e && null != e.adEnum && e.adEnum >= 0 && (this.adEnum = e.adEnum, xe.log("MoonMainAd2Panel-showBannerAd"), xi.I.showBannerAd(this.adEnum));
			let i = U.I.getConf();
			if (this.view.List_Game1.visible = this.showGames, this.view.List_Game2.visible = this.showGames, this.view.List_Game3.visible = this.showGames, Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
				this.view.List_Game1.visible = !1, this.view.List_Game2.visible = !1, this.view.List_Game3.visible = !1;
				let e = Ci.I.getAdSwitchByPosition(pt.MAIN_TOP_AD);
				if (null == e || 0 == e.state);
				else {
					let e = this.view.ov_native.getChildByName("icon");
					Laya.Browser.onVVMiniGame ? yn.I.createNativeAd(x.AD_GAME_NATIVE, C.IMG, e) : In.I.createNativeAd(x.AD_GAME_NATIVE, C.IMG, e), e.on(Laya.Event.MOUSE_OVER, this, () => {
						Laya.Browser.onVVMiniGame ? yn.I.reportAdClick(x.AD_GAME_NATIVE, C.IMG) : In.I.reportAdClick(x.AD_GAME_NATIVE, C.IMG)
					}), this.view.btn_close.on(Laya.Event.CLICK, this, () => { })
				}
				if (null == (e = Ci.I.getAdSwitchByPosition(pt.MAIN_RIGHT_AD)) || 0 == e.state) this.view.ov_native2.visible = !1;
				else {
					this.view.ov_native2.visible = !0;
					let e = this.view.ov_native2.getChildByName("icon");
					Laya.Browser.onVVMiniGame ? yn.I.createNativeAd(x.AD_GAME_SINGLE_NATIVE, C.ICON, e) : In.I.createNativeAd(x.AD_GAME_SINGLE_NATIVE, C.ICON, e), e.on(Laya.Event.MOUSE_OVER, this, () => {
						Laya.Browser.onVVMiniGame ? yn.I.reportAdClick(x.AD_GAME_SINGLE_NATIVE, C.ICON) : In.I.reportAdClick(x.AD_GAME_SINGLE_NATIVE, C.ICON)
					}), this.view.ov_native_close.on(Laya.Event.CLICK, this, () => {
						this.view.ov_native2.visible = !1
					})
				}
			} else {
				this.view.ov_native2.visible = !1, this.gamekeys = [];
				let e = Ci.I.getMatrixByPosition(ct.MAIN_LEFT_AD);
				if (null == e || e.length <= 0) {
					if (this.view.List_Game1.visible = !1, Laya.Browser.onMiniGame) {
						let e = Ci.I.getAdSwitchByPosition(gt.MAIN_LEFT_AD);
						if (null != e && 1 == e.state) {
							let i = t > 0 ? t : e.topMargin;
							Ri.I.showCustom(b.AD_CUSTOM_MAIN_SINGLE_LEFT, i, e.leftMargin, this, this.onErrorLeftCoustAd)
						}
					}
				} else {
					for (const t of e) this.gamekeys.push(t.tgamekey);
					this.view.List_Game1.vScrollBarSkin = "", this.view.List_Game1.elasticEnabled = !1, this.view.List_Game1.scrollBar.rollRatio = 0, this.view.List_Game1.renderHandler = new Laya.Handler(this, this.cellsForLeftGame), this.view.List_Game1.array = e, this.view.List_Game1.setAutoScroll(1, 1, 500), this.gamekeys.length > 0 && Ci.I.jumpStatistics(i, c.instance.openid, bi.MATRIX_TYPE_SHOW, this.gamekeys.join(","), ct.MAIN_LEFT_AD)
				}
				this.gamekeys = [];
				let n = Ci.I.getMatrixByPosition(ct.MAIN_RIGHT_AD);
				if (null == n || n.length <= 0) {
					if (this.view.List_Game2.visible = !1, Laya.Browser.onMiniGame) {
						let e = Ci.I.getAdSwitchByPosition(gt.MAIN_RIGHT_AD);
						if (null != e && 1 == e.state) {
							let i = t > 0 ? t : e.topMargin;
							Ri.I.showCustom(b.AD_CUSTOM_MAIN_RIGHT, i, e.leftMargin, this, this.onErrorRightCoustAd)
						}
					}
				} else {
					for (const e of n) this.gamekeys.push(e.tgamekey);
					this.view.List_Game2.vScrollBarSkin = "", this.view.List_Game2.elasticEnabled = !1, this.view.List_Game2.scrollBar.rollRatio = 0, this.view.List_Game2.renderHandler = new Laya.Handler(this, this.cellsForRightGame), this.view.List_Game2.array = n, this.view.List_Game2.setAutoScroll(1, 1, 500), this.gamekeys.length > 0 && Ci.I.jumpStatistics(i, c.instance.openid, bi.MATRIX_TYPE_SHOW, this.gamekeys.join(","), ct.MAIN_RIGHT_AD)
				}
				this.gamekeys = [];
				let a = Ci.I.getMatrixByPosition(ct.RESULT_PASS_AD);
				if (null == a || a.length <= 0) {
					if (this.view.List_Game3.visible = !1, Laya.Browser.onMiniGame) {
						let e = Ci.I.getAdSwitchByPosition(gt.RESULT_TOP_AD);
						if (null != e && 1 == e.state) {
							let i = t > 0 ? t : e.topMargin;
							Ri.I.showCustom(b.AD_CUSTOM_TOP, i, e.leftMargin, this, this.onErrorTopCoustAd)
						}
					}
				} else {
					for (const e of a) this.gamekeys.push(e.tgamekey);
					this.view.List_Game3.hScrollBarSkin = "", this.view.List_Game3.elasticEnabled = !1, this.view.List_Game3.scrollBar.rollRatio = 0, this.view.List_Game3.renderHandler = new Laya.Handler(this, this.cellsForTopGame), this.view.List_Game3.array = a, this.view.List_Game3.setAutoScroll(1, 1, 500), this.gamekeys.length > 0 && Ci.I.jumpStatistics(i, c.instance.openid, bi.MATRIX_TYPE_SHOW, this.gamekeys.join(","), ct.RESULT_PASS_AD)
				}
			}
		}
		onErrorLeftCoustAd(e) {
			xe.log("MoonMainAd2Panel--onErrorLeftCoustAd---", e)
		}
		onErrorRightCoustAd(e) {
			xe.log("MoonMainAd2Panel--onErrorRightCoustAd---", e)
		}
		onErrorTopCoustAd(e) {
			xe.log("MoonMainAd2Panel--onErrorTopCoustAd---", e)
		}
		cellsForLeftGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.MAIN_LEFT_AD])
		}
		cellsForRightGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.MAIN_RIGHT_AD])
		}
		cellsForTopGame(e, t) {
			let i = e.dataSource;
			e.getChildByName("Img_Game").skin = i.icon, e.off(Laya.Event.CLICK, this, Ci.I.openGame), e.on(Laya.Event.CLICK, this, Ci.I.openGame, [i, ct.RESULT_PASS_AD])
		}
		hide() {
			null !== this.adEnum && void 0 !== this.adEnum && this.adEnum >= 0 && (xe.log("MoonMainAd2Panel-hideBannerAd", this.adEnum), xi.I.hideBannerAd(this.adEnum)), Laya.Browser.onMiniGame && (Ri.I.hideCustom(b.AD_CUSTOM_MAIN_RIGHT), Ri.I.hideCustom(b.AD_CUSTOM_MAIN_SINGLE_LEFT), Ri.I.hideCustom(b.AD_CUSTOM_TOP)), super.hide()
		}
	}
	class Ln {
		createPanel(e) {
			switch (e) {
				case xt.MoonGameBoxPanel:
					return new Sn;
				case xt.MoonGuideGesturePanel:
					return new gn;
				case xt.MoonTipPanel:
					return new mn;
				case xt.MoonMainAdPanel:
					return new un;
				case xt.MoonMainAd2Panel:
					return new En;
				case xt.MoonResultsPanel:
					return new fn;
				case xt.MoonResults2Panel:
					return new wn;
				case xt.MoonConfirmPanel:
					return new vn
			}
			return null
		}
	}
	class An {
		constructor() {
			this.sdk = Me.I.getSDK()
		}
		static get I() {
			return h.get(An)
		}
		checkUpdate() {
			if (this.sdk && this.sdk != window.qg) {
				this.updateManager = this.sdk.getUpdateManager(), this.updateManager.onCheckForUpdate(function (e) {
					xe.log(e.hasUpdate)
				});
				let e = this;
				this.updateManager.onUpdateReady(function () {
					e.sdk.showModal({
						title: "更新提示",
						content: "新版本已经准备好，是否重启应用?",
						success: function (t) {
							t.confirm && e.updateManager.applyUpdate()
						}
					})
				}), this.updateManager.onUpdateFailed(function () { })
			}
		}
	}
	class Tn {
		static get I() {
			return h.get(Tn)
		}
		constructor() { }
		init() {
			Me.I.getSDK() && Me.I.getSDK().setKeepScreenOn({
				keepScreenOn: !0,
				success: () => { },
				fail: () => { },
				complete: () => { }
			})
		}
	} ! function (e) {
		e[e.Data = 0] = "Data", e[e.ResLoading = 1] = "ResLoading", e[e.Res3dLoading = 2] = "Res3dLoading", e[e.ResSingle = 3] = "ResSingle", e[e.ResCache = 4] = "ResCache"
	}(Bi || (Bi = {}));
	class xn extends pn {
		constructor() {
			super(...arguments), this.assetList = ["wxlocal/MoonLoading.json"], this.loadinglbl_load2D = "loading 2d...", this.loadinglbl_load3D = "loading 3d...", this.loadinglbl_Single = "laoding game info...", this.loadinglbl_SubPkg = "download source...", this.preloadCount = 0, this.subPackWx = [], this.subPackOppo = [], this.subPackQQ = [], this.subPackTT = [], this.subPackVivo = [], this.loadCount = 0, this.cdnNum = 30, this.resLoading = [], this.res3dLoading = [], this.resSingle = [], this.nativefiles = []
		}
		gameInitComplete() { }
		createView() {
			return new Pi.wxlocal.MoonLoadingUI
		}
		start() {
			super.start()
		}
		show(e) {
			super.show(e), xe.info("展示+++++"), rt.I.onWeidu({
				weidu: 1
			}), this.view.version.text = U.I.getConf().version.toString(), this.nativefiles.length > 0 && (Oe.I.isWxMiniGame() || Oe.I.isTTMiniGame() ? Laya.MiniAdpter.nativefiles = this.nativefiles : Oe.I.isQQMiniGame() && (Laya.QQMiniAdapter.nativefiles = this.nativefiles));
			let t = U.I.getConf();
			if (rt.I.getSaleData(), t.needGetGamelist && Ci.I.getMatrixList(t), t.needGetSwitchList && (Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onMiniGame) && Ci.I.getAdSwitchList(t), An.I.checkUpdate(), Laya.Browser.onQGMiniGame) window.qg.setLoadingProgress({
				progress: 0
			});
			else if (Oe.I.isOPPOH5Game()) {
				window.OPPO.getAppVersion() >= 1200 && window.OPPO.setLoadingProgress(0)
			}
			if (Tn.I.init(), this.view.loadcricle.play(), rt.I.onEvent({
				event: "load_gameres_start",
				time: Date.now(),
				scene: "load_scene"
			}), Oe.I.isWxMiniGame() && this.subPackWx.length > 0) {
				this.mCurPro = 0, this.updateProgressView(), this.view.loadinglbl.text = this.loadinglbl_SubPkg;
				for (let e = 0; e < this.subPackWx.length; e++) this.loadAsynSubPackage(this.subPackWx[e])
			} else if (Laya.Browser.onQGMiniGame && this.subPackOppo.length > 0) {
				xe.info("oppo loadAsynSubPackage"), this.mCurPro = 0, this.updateProgressView(), this.view.loadinglbl.text = this.loadinglbl_SubPkg;
				for (let e = 0; e < this.subPackOppo.length; e++) this.loadAsynSubPackage(this.subPackOppo[e])
			} else if (Laya.Browser.onVVMiniGame && this.subPackVivo.length > 0) {
				xe.info("vivo loadAsynSubPackage"), this.mCurPro = 0, this.updateProgressView(), this.view.loadinglbl.text = this.loadinglbl_SubPkg;
				for (let e = 0; e < this.subPackVivo.length; e++) this.loadAsynSubPackage(this.subPackVivo[e])
			} else if (Laya.Browser.onQQMiniGame && this.subPackQQ.length > 0) {
				xe.info("qq loadAsynSubPackage"), this.mCurPro = 0, this.updateProgressView(), this.view.loadinglbl.text = this.loadinglbl_SubPkg;
				for (let e = 0; e < this.subPackQQ.length; e++) this.loadAsynSubPackage(this.subPackQQ[e])
			} else if (Laya.Browser.onTTMiniGame && this.subPackTT.length > 0) {
				xe.info("tt loadAsynSubPackage"), this.mCurPro = 0, this.updateProgressView(), this.view.loadinglbl.text = this.loadinglbl_SubPkg;
				for (let e = 0; e < this.subPackTT.length; e++) this.loadAsynSubPackage(this.subPackTT[e])
			} else xe.info("no SubPackage"), this.startGame();
			ht.I.statisticsReport(f.VIEW_LOADING), Me.I.registerBGEvent()
		}
		startGame() {
			this.mAddPro = this.mCurPro = this.mTargetPro = 0, Laya.timer.frameLoop(1, this, this.onFrameUpdate), this.loadRecord()
		}
		loadAsynSubPackage(e) {
			let t = this;
			if (Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame) {
				qg.loadSubpackage({
					name: e,
					success: function (i) {
						xe.info(e + "加载成功"), t.ovSubPkgLoadFinish()
					},
					fail: function (t) {
						xe.info(e + "加载失败")
					}
				})
			} else if (Laya.Browser.onQQMiniGame) {
				qq.loadSubpackage({
					name: e,
					success: function (e) {
						t.subQQPkgLoadFinish()
					},
					fail: function (e) { }
				})
			} else if (Laya.Browser.onTTMiniGame) {
				tt.loadSubpackage({
					name: e,
					success: function (e) {
						t.preloadCount < t.subPackTT.length ? (t.loadAsynSubPackage(t.subPackTT[t.preloadCount]), t.preloadCount++) : t.subTTPkgLoadFinish()
					},
					fail: function (e) { }
				})
			} else {
				wx.loadSubpackage({
					name: e,
					success: function (e) {
						t.subPkgLoadFinish()
					},
					fail: function (e) { }
				})
			}
		}
		subPkgLoadFinish() {
			xe.info("wx subPkgLoadFinish"), this.preloadCount++, this.mCurPro = this.preloadCount / this.subPackWx.length, this.updateProgressView(), this.preloadCount >= this.subPackWx.length && this.startGame()
		}
		subQQPkgLoadFinish() {
			xe.info("qq subPkgLoadFinish"), this.preloadCount++, this.mCurPro = this.preloadCount / this.subPackQQ.length, this.updateProgressView(), this.preloadCount >= this.subPackQQ.length && this.startGame()
		}
		subTTPkgLoadFinish() {
			xe.info("tt subPkgLoadFinish"), this.preloadCount++, this.mCurPro = this.preloadCount / this.subPackTT.length, this.updateProgressView(), this.preloadCount >= this.subPackTT.length && this.startGame()
		}
		ovSubPkgLoadFinish() {
			xe.info("ov subPkgLoadFinish"), this.preloadCount++;
			let e = !1;
			Laya.Browser.onQGMiniGame ? (this.mCurPro = this.preloadCount / this.subPackOppo.length, e = this.preloadCount >= this.subPackOppo.length) : (this.mCurPro = this.preloadCount / this.subPackVivo.length, e = this.preloadCount >= this.subPackVivo.length), this.updateProgressView(), e && this.startGame()
		}
		hide() {
			Laya.timer.clearAll(this), dt.I.removeListener(dt.LoginApp, this, this.onLoginComplete), super.hide()
		}
		setTargetPro(e) {
			this.mTargetPro = e, this.mCurPro >= this.mTargetPro ? (this.mCurPro = this.mTargetPro, this.mAddPro = 0, this.updateProgressView()) : this.mAddPro = (this.mTargetPro - this.mCurPro) / 20
		}
		onFrameUpdate() {
			if (this.mAddPro > 0 && (this.mCurPro += this.mAddPro, this.mCurPro >= this.mTargetPro && (this.mCurPro = this.mTargetPro, this.mAddPro = 0), this.updateProgressView()), this.mIsStepDone && this.mCurPro >= this.mTargetPro)
				if (this.mIsStepDone = !1, this.mLoadingStep == Bi.ResLoading) this.loadRes3d();
				else if (this.mLoadingStep == Bi.Res3dLoading) this.onLoadedComplete();
				else if (this.mLoadingStep == Bi.ResSingle) this.mLoadingStep = Bi.ResCache, this.onResCache();
				else if (this.mLoadingStep == Bi.ResCache)
					if (rt.I.onEvent({
						event: "load_gameres_p100",
						time: Date.now(),
						scene: "load_scene"
					}), rt.I.onEvent({
						event: "game_init_start",
						time: Date.now(),
						scene: "home_scene"
					}), this.gameInitComplete(), rt.I.onWeidu({
						weidu: 105
					}), Laya.Browser.onQGMiniGame) window.qg.loadingComplete({
						complete: function (e) { }
					});
					else if (Oe.I.isOPPOH5Game()) {
						window.OPPO.getAppVersion() >= 1200 && window.OPPO.loadingComplete()
					}
		}
		onResCache() {
			this.setTargetPro(1), this.mIsStepDone = !0
		}
		loadRes() {
			this.mLoadingStep = Bi.ResLoading, this.view.loadinglbl.text = this.loadinglbl_load2D, this.setTargetPro(0), U.I.getConf().basePath.length > 0 && (Laya.URL.basePath = `${U.I.getConf().basePath[this.loadCount % 3]}${U.I.getConf().version}/`), xe.info("Laya.URL.basePath:", Laya.URL.basePath), rt.I.onEvent({
				event: "load_gameres_p20",
				time: Date.now(),
				scene: "load_scene"
			}), this.resLoading.length > 0 ? Laya.loader.load(this.resLoading, Laya.Handler.create(this, this.onLoadResComplete), Laya.Handler.create(this, this.setTargetPro, null, !1)) : this.onLoadResComplete(!0)
		}
		onLoadResComplete(e) {
			e ? (this.mIsStepDone = !0, this.setTargetPro(1)) : this.loadResError()
		}
		loadResError() {
			this.loadCount++, (Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame || Laya.Browser.onQGMiniGame) && Laya.MiniAdpter.removeAll(), Laya.Browser.onVVMiniGame && Laya.VVMiniAdapter.removeAll(), this.loadCount < this.cdnNum && Laya.timer.once(500, this, this.loadRes)
		}
		loadRes3d() {
			this.view.loadinglbl.text = this.loadinglbl_load3D, this.mLoadingStep = Bi.Res3dLoading, this.setTargetPro(0), this.initRes3dArray(), rt.I.onEvent({
				event: "load_gameres_p40",
				time: Date.now(),
				scene: "load_scene"
			}), this.res3dLoading.length > 0 ? Laya.loader.create(this.res3dLoading, Laya.Handler.create(this, this.onLoadRes3dComplete), Laya.Handler.create(this, this.setTargetPro, null, !1)) : this.onLoadRes3dComplete(!0)
		}
		onLoadRes3dComplete(e) {
			e ? (this.mIsStepDone = !0, this.setTargetPro(1)) : this.loadResError()
		}
		initRes3dArray() { }
		updateProgressView() {
			if (this.view.bar.x = -this.view.bar.width * (1 - this.mCurPro), this.view.tPgs.text = Math.round(100 * this.mCurPro) + "%", this.updateProgressChild(), Laya.Browser.onQGMiniGame) window.qg.setLoadingProgress({
				progress: 100 * this.mCurPro
			});
			else if (Oe.I.isOPPOH5Game()) {
				window.OPPO.getAppVersion() >= 1200 && window.OPPO.setLoadingProgress(100 * this.mCurPro)
			}
		}
		updateProgressChild() { }
		loadRecord() {
			if (this.mLoadingStep = Bi.Data, this.view.loadinglbl.text = this.loadinglbl_Single, this.setTargetPro(0), u.dont == U.I.getConf().loginLevel ? this.loadRecordNoData() : (dt.I.addListener(dt.LoginApp, this, this.onLoginComplete), dt.I.login()), rt.I.load(), U.I.getConf().ad.video.length > 0)
				for (let e = 0; e < U.I.getConf().ad.video.length; e++) xi.I.getVideoAd(e)
		}
		loadRecordNoData() {
			J.I.readLocal(), ht.I.statisticsReport(f.LOGIN_SUCCESS), this.loadRes()
		}
		onLoginComplete(e) {
			e.result ? (dt.I.removeListener(dt.LoginApp, this, this.onLoginComplete), c.instance.uid = e.res.openid, this.loadRecordNoData()) : u.must == U.I.getConf().loginLevel ? Mt.instance.show(xt.MoonConfirmPanel, ["网络状况不佳，请检查网络后\n重新进入游戏", this, () => {
				dt.I.login()
			}]) : this.loadRecordNoData(), this.onExtendLoginComplete()
		}
		onExtendLoginComplete() { }
		onLoadedComplete() {
			this.mLoadingStep = Bi.ResSingle, this.setTargetPro(0), rt.I.onEvent({
				event: "load_gameres_p60",
				time: Date.now(),
				scene: "load_scene"
			}), this.resSingle.length > 0 ? Laya.loader.create(this.resSingle, Laya.Handler.create(this, this.onResSingleComplete), Laya.Handler.create(this, this.setTargetPro)) : this.onResSingleComplete(!0)
		}
		onResSingleComplete(e) {
			this.mIsStepDone = !0, this.setTargetPro(1)
		}
		dispose() {
			this.view.img_logo.dispose(), this.view.img_bg.dispose(), super.dispose()
		}
	}
	class bn extends xn {
		constructor() {
			super(...arguments), this.resLoading = [], this.subPackWx = ["gongyong", "res", "scenes", "sounds", "moon"]
		}
		show(e) {
			this.loadinglbl_load2D = "checking engine...", this.loadinglbl_load3D = "weapons being inspected...", this.loadinglbl_Single = "ready to go!...", super.show(e)
		}
		gameInitComplete() {
			St.I.setMusicVolume(.2), new Ni, this.closeSelf()
		}
		createAnimation(e) {
			var t = null;
			return Fe.isNullOrEmpty(e) || ((t = new Laya.Animation).loadAnimation(e), this.view.activity_box.addChild(t), t.pos(.5 * this.view.activity_box.width, .5 * this.view.activity_box.height), t.autoPlay = !0, this.stopAnimation(t)), t
		}
		playAnimation(e, t = !1) {
			e && (e.visible = !0, e.play(0, t))
		}
		disposeAnimation(e) {
			e && (this.stopAnimation(e), e.destroy(!0))
		}
		stopAnimation(e) {
			e && (e.stop(), e.visible = !1)
		}
	}
	class Cn extends Ln {
		createPanel(e) {
			switch (e) {
				case bt.LoadingPanel:
					return new bn
			}
			return super.createPanel(e)
		}
	}
	class Rn extends Laya.Script {
		constructor() {
			super()
		}
		onAwake() {
			console.log("进入start"), Ct.instance.init(Laya.stage), Mt.instance.init(new Cn), this.onResize(), Laya.stage.on(Laya.Event.RESIZE, this, this.onResize)
		}
		onEnable() {
			Mt.instance.show(bt.LoadingPanel)
		}
		onDisable() { }
		onResize() {
			Mt.instance.resize()
		}
		onDestroy() {
			Laya.stage.off(Laya.Event.RESIZE, this, this.onResize)
		}
	}
	class Mn {
		constructor() { }
		static init() {
			var e = Laya.ClassUtils.regClass;
			e("script/gui/box/PifuBox.ts", dn), e("script/gui/ScaleButton.ts", Oi), e("script/gui/LoadingView.ts", tn), e("moon/core/ui/extension/ListEx.ts", hn), e("moon/Start.ts", Rn)
		}
	}
	Mn.width = 768, Mn.height = 1663, Mn.scaleMode = "fixedheight", Mn.screenMode = "none", Mn.alignV = "middle", Mn.alignH = "center", Mn.startScene = "box/CoinItem.scene", Mn.sceneRoot = "", Mn.debug = !1, Mn.stat = !1, Mn.physicsDebug = !1, Mn.exportSceneToJson = !0, Mn.init();
	class On {
		static formatPrefab(e, t = "3d/prefab") {
			if (this.isVip) {
				if (e && "" !== e && void 0 !== e && "object" != typeof tt) {
					if (Laya.Browser.onIOS && Laya.Browser.onMiniGame) return `${t}/iOS/${e}`;
					if ((Laya.Browser.onMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && Laya.Browser.onAndroid) return `${t}/Android/${e}`
				}
				if (Laya.Render.isConchApp) {
					if (Laya.Browser.onAndroid) return `${t}/Android/${e}`;
					if (Laya.Browser.onIOS) return `${t}/iOS/${e}`
				}
			}
			return `${t}/Conventional/${e}`
		}
		static formatRes(e, t = "3d/res", i = Gi.Image) {
			let n = "Conventional";
			switch (this.isVip && (e && "" !== e && void 0 !== e && "object" != typeof tt && (Laya.Browser.onIOS && Laya.Browser.onMiniGame ? n = "iOS" : (Laya.Browser.onMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && Laya.Browser.onAndroid && (n = "Android")), Laya.Render.isConchApp && (Laya.Browser.onAndroid ? n = "Android" : Laya.Browser.onIOS && (n = "iOS"))), i) {
				case Gi.Image:
					return `${t}/${n}/img/${e}`
			}
			return ""
		}
		static formatScene(e) {
			if (this.isVip) {
				if (e && "" !== e && void 0 !== e && "object" != typeof tt) {
					if (Laya.Browser.onIOS && Laya.Browser.onMiniGame) return `3d/scene/iOS/${e}`;
					if ((Laya.Browser.onMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && Laya.Browser.onAndroid) return `3d/scene/Android/${e}`
				}
				if (Laya.Render.isConchApp) {
					if (Laya.Browser.onAndroid) return `3d/scene/Android/${e}`;
					if (Laya.Browser.onIOS) return `3d/scene/iOS/${e}`
				}
			}
			return `3d/scene/Conventional/${e}`
		}
		static newFormatScene(e) {
			if (this.isVip) {
				if (e && "" !== e && void 0 !== e && "object" != typeof tt) {
					if (Laya.Browser.onIOS && Laya.Browser.onMiniGame) return `3d/scene/${e}/iOS/${e}.ls`;
					if ((Laya.Browser.onMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && Laya.Browser.onAndroid) return `3d/scene/${e}/Android/${e}.ls`
				}
				if (Laya.Render.isConchApp) {
					if (Laya.Browser.onAndroid) return `3d/scene/${e}/Android/${e}.ls`;
					if (Laya.Browser.onIOS) return `3d/scene/${e}/iOS/${e}.ls`
				}
			}
			return `3d/scene/${e}/Conventional/${e}.ls`
		}
		static formatUiScene(e) {
			if (this.isVip) {
				if (e && "" !== e && void 0 !== e && "object" != typeof tt) {
					if (Laya.Browser.onIOS && Laya.Browser.onMiniGame) return `3d/uiscene/iOS/${e}`;
					if ((Laya.Browser.onMiniGame || Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) && Laya.Browser.onAndroid) return `3d/uiscene/Android/${e}`
				}
				if (Laya.Render.isConchApp) {
					if (Laya.Browser.onAndroid) return `3d/uiscene/Android/${e}`;
					if (Laya.Browser.onIOS) return `3d/uiscene/iOS/${e}`
				}
			}
			return `3d/uiscene/Conventional/${e}`
		}
		static formatLoadPrefab(e) {
			for (let t in e) e[t] = On.formatPrefab(e[t]);
			return e
		}
		static formatLoadScene(e) {
			for (let t in e) e[t] = On.formatScene(e[t]);
			return e
		}
	}
	On.isVip = !0,
		function (e) {
			e[e.Image = 0] = "Image"
		}(Gi || (Gi = {}));
	new class {
		constructor() {
			window.Laya3D ? Laya3D.init(768, 1663) : Laya.init(768, 1663, Laya.WebGL), Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), Laya.stage.screenMode = Laya.Stage.SCREEN_NONE, Laya.stage.alignV = Laya.Stage.ALIGN_CENTER, Laya.stage.alignH = Laya.Stage.ALIGN_MIDDLE, Laya.Render.isConchApp ? Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH : Laya.Browser.onPC ? Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL : Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, Laya.URL.exportSceneToJson = Mn.exportSceneToJson, Laya.MouseManager.multiTouchEnabled = !0, (Mn.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(), Mn.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(), Mn.stat && Laya.Stat.show(), Laya.alertGlobalError(!0), On.isVip = !1, ht.I.statisticsReport(f.INIT), Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION), Laya.Render.isConchApp && xi.I
		}
		onVersionLoaded() {
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
		}
		onConfigLoaded() {
			Config.isAntialias = !0, Laya.loader.create([{
				url: "wxlocal/Start.json",
				type: Laya.Loader.JSON
			}, {
				url: "wxlocal/MoonLoading.json",
				type: Laya.Loader.JSON
			}], Laya.Handler.create(this, this.onPrepareComplete))
		}
		onPrepareComplete() {
			if ("undefined" == typeof minigame) On.isVip = !1, J.ProductName = "moto2", Laya.Scene.open("wxlocal/Start.scene");
			else {
				let e = this;
				minigame.initializeAsync().then(function () {
					console.log("FB initializeAsync"), minigame.getEntryPointAsync().then(function (e) {
						console.info("Entry Point: ", e)
					});
					const t = minigame.context.getType();
					console.info("Context Type: ", t), e.startMiniGameSDK()
				})
			}
		}
		startMiniGameSDK() {
			"undefined" != typeof minigame && (minigame.setLoadingProgress(100), minigame.startGameAsync().then(function () {
				On.isVip = !1, J.ProductName = "moto2", Laya.Scene.open("wxlocal/Start.scene")
			}).catch(function (e) {
				console.info("startGameAsync error: " + e)
			}))
		}
	}
}();