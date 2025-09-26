(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const r of i.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = s(o);
    fetch(o.href, i);
  }
})();
function Ps(e, t) {
  const s = Object.create(null),
    n = e.split(",");
  for (let o = 0; o < n.length; o++) s[n[o]] = !0;
  return t ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
}
const U = {},
  Ve = [],
  he = () => {},
  Fo = () => !1,
  Ro = /^on[^a-z]/,
  Wt = (e) => Ro.test(e),
  $s = (e) => e.startsWith("onUpdate:"),
  X = Object.assign,
  As = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  So = Object.prototype.hasOwnProperty,
  S = (e, t) => So.call(e, t),
  P = Array.isArray,
  Ze = (e) => zt(e) === "[object Map]",
  Rn = (e) => zt(e) === "[object Set]",
  M = (e) => typeof e == "function",
  V = (e) => typeof e == "string",
  Ms = (e) => typeof e == "symbol",
  k = (e) => e !== null && typeof e == "object",
  Sn = (e) => k(e) && M(e.then) && M(e.catch),
  Nn = Object.prototype.toString,
  zt = (e) => Nn.call(e),
  No = (e) => zt(e).slice(8, -1),
  jn = (e) => zt(e) === "[object Object]",
  Fs = (e) => V(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Rt = Ps(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  qt = (e) => {
    const t = Object.create(null);
    return (s) => t[s] || (t[s] = e(s));
  },
  jo = /-(\w)/g,
  Ge = qt((e) => e.replace(jo, (t, s) => (s ? s.toUpperCase() : ""))),
  Ho = /\B([A-Z])/g,
  We = qt((e) => e.replace(Ho, "-$1").toLowerCase()),
  Hn = qt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ls = qt((e) => (e ? `on${Hn(e)}` : "")),
  pt = (e, t) => !Object.is(e, t),
  St = (e, t) => {
    for (let s = 0; s < e.length; s++) e[s](t);
  },
  Ut = (e, t, s) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s });
  },
  _s = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let en;
const ms = () =>
  en ||
  (en =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Jt(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s],
        o = V(n) ? Bo(n) : Jt(n);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else {
    if (V(e)) return e;
    if (k(e)) return e;
  }
}
const Lo = /;(?![^(]*\))/g,
  Uo = /:([^]+)/,
  Ko = /\/\*[^]*?\*\//g;
function Bo(e) {
  const t = {};
  return (
    e
      .replace(Ko, "")
      .split(Lo)
      .forEach((s) => {
        if (s) {
          const n = s.split(Uo);
          n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
      }),
    t
  );
}
function Yt(e) {
  let t = "";
  if (V(e)) t = e;
  else if (P(e))
    for (let s = 0; s < e.length; s++) {
      const n = Yt(e[s]);
      n && (t += n + " ");
    }
  else if (k(e)) for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
const Do =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ko = Ps(Do);
function Ln(e) {
  return !!e || e === "";
}
const Z = (e) =>
    V(e)
      ? e
      : e == null
      ? ""
      : P(e) || (k(e) && (e.toString === Nn || !M(e.toString)))
      ? JSON.stringify(e, Un, 2)
      : String(e),
  Un = (e, t) =>
    t && t.__v_isRef
      ? Un(e, t.value)
      : Ze(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (s, [n, o]) => ((s[`${n} =>`] = o), s),
            {}
          ),
        }
      : Rn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : k(t) && !P(t) && !jn(t)
      ? String(t)
      : t;
let fe;
class Wo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = fe),
      !t && fe && (this.index = (fe.scopes || (fe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = fe;
      try {
        return (fe = this), t();
      } finally {
        fe = s;
      }
    }
  }
  on() {
    fe = this;
  }
  off() {
    fe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function zo(e, t = fe) {
  t && t.active && t.effects.push(e);
}
function qo() {
  return fe;
}
const Rs = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Kn = (e) => (e.w & Me) > 0,
  Bn = (e) => (e.n & Me) > 0,
  Jo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Me;
  },
  Yo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let s = 0;
      for (let n = 0; n < t.length; n++) {
        const o = t[n];
        Kn(o) && !Bn(o) ? o.delete(e) : (t[s++] = o),
          (o.w &= ~Me),
          (o.n &= ~Me);
      }
      t.length = s;
    }
  },
  gs = new WeakMap();
let ft = 0,
  Me = 1;
const bs = 30;
let ue;
const Be = Symbol(""),
  vs = Symbol("");
class Ss {
  constructor(t, s = null, n) {
    (this.fn = t),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      zo(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ue,
      s = $e;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ue),
        (ue = this),
        ($e = !0),
        (Me = 1 << ++ft),
        ft <= bs ? Jo(this) : tn(this),
        this.fn()
      );
    } finally {
      ft <= bs && Yo(this),
        (Me = 1 << --ft),
        (ue = this.parent),
        ($e = s),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ue === this
      ? (this.deferStop = !0)
      : this.active &&
        (tn(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function tn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++) t[s].delete(e);
    t.length = 0;
  }
}
let $e = !0;
const Dn = [];
function nt() {
  Dn.push($e), ($e = !1);
}
function ot() {
  const e = Dn.pop();
  $e = e === void 0 ? !0 : e;
}
function oe(e, t, s) {
  if ($e && ue) {
    let n = gs.get(e);
    n || gs.set(e, (n = new Map()));
    let o = n.get(s);
    o || n.set(s, (o = Rs())), kn(o);
  }
}
function kn(e, t) {
  let s = !1;
  ft <= bs ? Bn(e) || ((e.n |= Me), (s = !Kn(e))) : (s = !e.has(ue)),
    s && (e.add(ue), ue.deps.push(e));
}
function Ie(e, t, s, n, o, i) {
  const r = gs.get(e);
  if (!r) return;
  let c = [];
  if (t === "clear") c = [...r.values()];
  else if (s === "length" && P(e)) {
    const u = Number(n);
    r.forEach((a, m) => {
      (m === "length" || m >= u) && c.push(a);
    });
  } else
    switch ((s !== void 0 && c.push(r.get(s)), t)) {
      case "add":
        P(e)
          ? Fs(s) && c.push(r.get("length"))
          : (c.push(r.get(Be)), Ze(e) && c.push(r.get(vs)));
        break;
      case "delete":
        P(e) || (c.push(r.get(Be)), Ze(e) && c.push(r.get(vs)));
        break;
      case "set":
        Ze(e) && c.push(r.get(Be));
        break;
    }
  if (c.length === 1) c[0] && xs(c[0]);
  else {
    const u = [];
    for (const a of c) a && u.push(...a);
    xs(Rs(u));
  }
}
function xs(e, t) {
  const s = P(e) ? e : [...e];
  for (const n of s) n.computed && sn(n);
  for (const n of s) n.computed || sn(n);
}
function sn(e, t) {
  (e !== ue || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Vo = Ps("__proto__,__v_isRef,__isVue"),
  Wn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ms)
  ),
  Zo = Ns(),
  Xo = Ns(!1, !0),
  Qo = Ns(!0),
  nn = Go();
function Go() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...s) {
        const n = N(this);
        for (let i = 0, r = this.length; i < r; i++) oe(n, "get", i + "");
        const o = n[t](...s);
        return o === -1 || o === !1 ? n[t](...s.map(N)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...s) {
        nt();
        const n = N(this)[t].apply(this, s);
        return ot(), n;
      };
    }),
    e
  );
}
function ei(e) {
  const t = N(this);
  return oe(t, "has", e), t.hasOwnProperty(e);
}
function Ns(e = !1, t = !1) {
  return function (n, o, i) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && i === (e ? (t ? mi : Vn) : t ? Yn : Jn).get(n))
      return n;
    const r = P(n);
    if (!e) {
      if (r && S(nn, o)) return Reflect.get(nn, o, i);
      if (o === "hasOwnProperty") return ei;
    }
    const c = Reflect.get(n, o, i);
    return (Ms(o) ? Wn.has(o) : Vo(o)) || (e || oe(n, "get", o), t)
      ? c
      : ee(c)
      ? r && Fs(o)
        ? c
        : c.value
      : k(c)
      ? e
        ? Zn(c)
        : Ls(c)
      : c;
  };
}
const ti = zn(),
  si = zn(!0);
function zn(e = !1) {
  return function (s, n, o, i) {
    let r = s[n];
    if (et(r) && ee(r) && !ee(o)) return !1;
    if (
      !e &&
      (!Kt(o) && !et(o) && ((r = N(r)), (o = N(o))), !P(s) && ee(r) && !ee(o))
    )
      return (r.value = o), !0;
    const c = P(s) && Fs(n) ? Number(n) < s.length : S(s, n),
      u = Reflect.set(s, n, o, i);
    return (
      s === N(i) && (c ? pt(o, r) && Ie(s, "set", n, o) : Ie(s, "add", n, o)), u
    );
  };
}
function ni(e, t) {
  const s = S(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && s && Ie(e, "delete", t, void 0), n;
}
function oi(e, t) {
  const s = Reflect.has(e, t);
  return (!Ms(t) || !Wn.has(t)) && oe(e, "has", t), s;
}
function ii(e) {
  return oe(e, "iterate", P(e) ? "length" : Be), Reflect.ownKeys(e);
}
const qn = { get: Zo, set: ti, deleteProperty: ni, has: oi, ownKeys: ii },
  ri = {
    get: Qo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  li = X({}, qn, { get: Xo, set: si }),
  js = (e) => e,
  Vt = (e) => Reflect.getPrototypeOf(e);
function Ct(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const o = N(e),
    i = N(t);
  s || (t !== i && oe(o, "get", t), oe(o, "get", i));
  const { has: r } = Vt(o),
    c = n ? js : s ? Ks : _t;
  if (r.call(o, t)) return c(e.get(t));
  if (r.call(o, i)) return c(e.get(i));
  e !== o && e.get(t);
}
function Pt(e, t = !1) {
  const s = this.__v_raw,
    n = N(s),
    o = N(e);
  return (
    t || (e !== o && oe(n, "has", e), oe(n, "has", o)),
    e === o ? s.has(e) : s.has(e) || s.has(o)
  );
}
function $t(e, t = !1) {
  return (
    (e = e.__v_raw), !t && oe(N(e), "iterate", Be), Reflect.get(e, "size", e)
  );
}
function on(e) {
  e = N(e);
  const t = N(this);
  return Vt(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function rn(e, t) {
  t = N(t);
  const s = N(this),
    { has: n, get: o } = Vt(s);
  let i = n.call(s, e);
  i || ((e = N(e)), (i = n.call(s, e)));
  const r = o.call(s, e);
  return (
    s.set(e, t), i ? pt(t, r) && Ie(s, "set", e, t) : Ie(s, "add", e, t), this
  );
}
function ln(e) {
  const t = N(this),
    { has: s, get: n } = Vt(t);
  let o = s.call(t, e);
  o || ((e = N(e)), (o = s.call(t, e))), n && n.call(t, e);
  const i = t.delete(e);
  return o && Ie(t, "delete", e, void 0), i;
}
function cn() {
  const e = N(this),
    t = e.size !== 0,
    s = e.clear();
  return t && Ie(e, "clear", void 0, void 0), s;
}
function At(e, t) {
  return function (n, o) {
    const i = this,
      r = i.__v_raw,
      c = N(r),
      u = t ? js : e ? Ks : _t;
    return (
      !e && oe(c, "iterate", Be), r.forEach((a, m) => n.call(o, u(a), u(m), i))
    );
  };
}
function Mt(e, t, s) {
  return function (...n) {
    const o = this.__v_raw,
      i = N(o),
      r = Ze(i),
      c = e === "entries" || (e === Symbol.iterator && r),
      u = e === "keys" && r,
      a = o[e](...n),
      m = s ? js : t ? Ks : _t;
    return (
      !t && oe(i, "iterate", u ? vs : Be),
      {
        next() {
          const { value: y, done: E } = a.next();
          return E
            ? { value: y, done: E }
            : { value: c ? [m(y[0]), m(y[1])] : m(y), done: E };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ce(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ci() {
  const e = {
      get(i) {
        return Ct(this, i);
      },
      get size() {
        return $t(this);
      },
      has: Pt,
      add: on,
      set: rn,
      delete: ln,
      clear: cn,
      forEach: At(!1, !1),
    },
    t = {
      get(i) {
        return Ct(this, i, !1, !0);
      },
      get size() {
        return $t(this);
      },
      has: Pt,
      add: on,
      set: rn,
      delete: ln,
      clear: cn,
      forEach: At(!1, !0),
    },
    s = {
      get(i) {
        return Ct(this, i, !0);
      },
      get size() {
        return $t(this, !0);
      },
      has(i) {
        return Pt.call(this, i, !0);
      },
      add: Ce("add"),
      set: Ce("set"),
      delete: Ce("delete"),
      clear: Ce("clear"),
      forEach: At(!0, !1),
    },
    n = {
      get(i) {
        return Ct(this, i, !0, !0);
      },
      get size() {
        return $t(this, !0);
      },
      has(i) {
        return Pt.call(this, i, !0);
      },
      add: Ce("add"),
      set: Ce("set"),
      delete: Ce("delete"),
      clear: Ce("clear"),
      forEach: At(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = Mt(i, !1, !1)),
        (s[i] = Mt(i, !0, !1)),
        (t[i] = Mt(i, !1, !0)),
        (n[i] = Mt(i, !0, !0));
    }),
    [e, s, t, n]
  );
}
const [fi, ui, ai, di] = ci();
function Hs(e, t) {
  const s = t ? (e ? di : ai) : e ? ui : fi;
  return (n, o, i) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? n
      : Reflect.get(S(s, o) && o in n ? s : n, o, i);
}
const hi = { get: Hs(!1, !1) },
  pi = { get: Hs(!1, !0) },
  _i = { get: Hs(!0, !1) },
  Jn = new WeakMap(),
  Yn = new WeakMap(),
  Vn = new WeakMap(),
  mi = new WeakMap();
function gi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function bi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : gi(No(e));
}
function Ls(e) {
  return et(e) ? e : Us(e, !1, qn, hi, Jn);
}
function vi(e) {
  return Us(e, !1, li, pi, Yn);
}
function Zn(e) {
  return Us(e, !0, ri, _i, Vn);
}
function Us(e, t, s, n, o) {
  if (!k(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = o.get(e);
  if (i) return i;
  const r = bi(e);
  if (r === 0) return e;
  const c = new Proxy(e, r === 2 ? n : s);
  return o.set(e, c), c;
}
function Xe(e) {
  return et(e) ? Xe(e.__v_raw) : !!(e && e.__v_isReactive);
}
function et(e) {
  return !!(e && e.__v_isReadonly);
}
function Kt(e) {
  return !!(e && e.__v_isShallow);
}
function Xn(e) {
  return Xe(e) || et(e);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function Qn(e) {
  return Ut(e, "__v_skip", !0), e;
}
const _t = (e) => (k(e) ? Ls(e) : e),
  Ks = (e) => (k(e) ? Zn(e) : e);
function Gn(e) {
  $e && ue && ((e = N(e)), kn(e.dep || (e.dep = Rs())));
}
function eo(e, t) {
  e = N(e);
  const s = e.dep;
  s && xs(s);
}
function ee(e) {
  return !!(e && e.__v_isRef === !0);
}
function cs(e) {
  return xi(e, !1);
}
function xi(e, t) {
  return ee(e) ? e : new yi(e, t);
}
class yi {
  constructor(t, s) {
    (this.__v_isShallow = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = s ? t : N(t)),
      (this._value = s ? t : _t(t));
  }
  get value() {
    return Gn(this), this._value;
  }
  set value(t) {
    const s = this.__v_isShallow || Kt(t) || et(t);
    (t = s ? t : N(t)),
      pt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = s ? t : _t(t)), eo(this));
  }
}
function mt(e) {
  return ee(e) ? e.value : e;
}
const wi = {
  get: (e, t, s) => mt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return ee(o) && !ee(s) ? ((o.value = s), !0) : Reflect.set(e, t, s, n);
  },
};
function to(e) {
  return Xe(e) ? e : new Proxy(e, wi);
}
class Ei {
  constructor(t, s, n, o) {
    (this._setter = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ss(t, () => {
        this._dirty || ((this._dirty = !0), eo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = N(this);
    return (
      Gn(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ii(e, t, s = !1) {
  let n, o;
  const i = M(e);
  return (
    i ? ((n = e), (o = he)) : ((n = e.get), (o = e.set)),
    new Ei(n, o, i || !o, s)
  );
}
function Ae(e, t, s, n) {
  let o;
  try {
    o = n ? e(...n) : e();
  } catch (i) {
    Zt(i, t, s);
  }
  return o;
}
function pe(e, t, s, n) {
  if (M(e)) {
    const i = Ae(e, t, s, n);
    return (
      i &&
        Sn(i) &&
        i.catch((r) => {
          Zt(r, t, s);
        }),
      i
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(pe(e[i], t, s, n));
  return o;
}
function Zt(e, t, s, n = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const r = t.proxy,
      c = s;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let m = 0; m < a.length; m++) if (a[m](e, r, c) === !1) return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ae(u, null, 10, [e, r, c]);
      return;
    }
  }
  Oi(e, s, o, n);
}
function Oi(e, t, s, n = !0) {
  console.error(e);
}
let gt = !1,
  ys = !1;
const Q = [];
let ve = 0;
const Qe = [];
let we = null,
  Le = 0;
const so = Promise.resolve();
let Bs = null;
function Ti(e) {
  const t = Bs || so;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ci(e) {
  let t = ve + 1,
    s = Q.length;
  for (; t < s; ) {
    const n = (t + s) >>> 1;
    bt(Q[n]) < e ? (t = n + 1) : (s = n);
  }
  return t;
}
function Ds(e) {
  (!Q.length || !Q.includes(e, gt && e.allowRecurse ? ve + 1 : ve)) &&
    (e.id == null ? Q.push(e) : Q.splice(Ci(e.id), 0, e), no());
}
function no() {
  !gt && !ys && ((ys = !0), (Bs = so.then(io)));
}
function Pi(e) {
  const t = Q.indexOf(e);
  t > ve && Q.splice(t, 1);
}
function $i(e) {
  P(e)
    ? Qe.push(...e)
    : (!we || !we.includes(e, e.allowRecurse ? Le + 1 : Le)) && Qe.push(e),
    no();
}
function fn(e, t = gt ? ve + 1 : 0) {
  for (; t < Q.length; t++) {
    const s = Q[t];
    s && s.pre && (Q.splice(t, 1), t--, s());
  }
}
function oo(e) {
  if (Qe.length) {
    const t = [...new Set(Qe)];
    if (((Qe.length = 0), we)) {
      we.push(...t);
      return;
    }
    for (we = t, we.sort((s, n) => bt(s) - bt(n)), Le = 0; Le < we.length; Le++)
      we[Le]();
    (we = null), (Le = 0);
  }
}
const bt = (e) => (e.id == null ? 1 / 0 : e.id),
  Ai = (e, t) => {
    const s = bt(e) - bt(t);
    if (s === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return s;
  };
function io(e) {
  (ys = !1), (gt = !0), Q.sort(Ai);
  const t = he;
  try {
    for (ve = 0; ve < Q.length; ve++) {
      const s = Q[ve];
      s && s.active !== !1 && Ae(s, null, 14);
    }
  } finally {
    (ve = 0),
      (Q.length = 0),
      oo(),
      (gt = !1),
      (Bs = null),
      (Q.length || Qe.length) && io();
  }
}
function Mi(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || U;
  let o = s;
  const i = t.startsWith("update:"),
    r = i && t.slice(7);
  if (r && r in n) {
    const m = `${r === "modelValue" ? "model" : r}Modifiers`,
      { number: y, trim: E } = n[m] || U;
    E && (o = s.map(($) => (V($) ? $.trim() : $))), y && (o = s.map(_s));
  }
  let c,
    u = n[(c = ls(t))] || n[(c = ls(Ge(t)))];
  !u && i && (u = n[(c = ls(We(t)))]), u && pe(u, e, 6, o);
  const a = n[c + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), pe(a, e, 6, o);
  }
}
function ro(e, t, s = !1) {
  const n = t.emitsCache,
    o = n.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let r = {},
    c = !1;
  if (!M(e)) {
    const u = (a) => {
      const m = ro(a, t, !0);
      m && ((c = !0), X(r, m));
    };
    !s && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !i && !c
    ? (k(e) && n.set(e, null), null)
    : (P(i) ? i.forEach((u) => (r[u] = null)) : X(r, i),
      k(e) && n.set(e, r),
      r);
}
function Xt(e, t) {
  return !e || !Wt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      S(e, t[0].toLowerCase() + t.slice(1)) || S(e, We(t)) || S(e, t));
}
let ae = null,
  Qt = null;
function Bt(e) {
  const t = ae;
  return (ae = e), (Qt = (e && e.type.__scopeId) || null), t;
}
function lo(e) {
  Qt = e;
}
function co() {
  Qt = null;
}
function Fi(e, t = ae, s) {
  if (!t || e._n) return e;
  const n = (...o) => {
    n._d && vn(-1);
    const i = Bt(t);
    let r;
    try {
      r = e(...o);
    } finally {
      Bt(i), n._d && vn(1);
    }
    return r;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function fs(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    props: i,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: a,
    render: m,
    renderCache: y,
    data: E,
    setupState: $,
    ctx: K,
    inheritAttrs: F,
  } = e;
  let W, q;
  const J = Bt(e);
  try {
    if (s.shapeFlag & 4) {
      const A = o || n;
      (W = be(m.call(A, A, y, i, $, E, K))), (q = u);
    } else {
      const A = t;
      (W = be(
        A.length > 1 ? A(i, { attrs: u, slots: c, emit: a }) : A(i, null)
      )),
        (q = t.props ? u : Ri(u));
    }
  } catch (A) {
    (dt.length = 0), Zt(A, e, 1), (W = le(ke));
  }
  let Y = W;
  if (q && F !== !1) {
    const A = Object.keys(q),
      { shapeFlag: Te } = Y;
    A.length && Te & 7 && (r && A.some($s) && (q = Si(q, r)), (Y = tt(Y, q)));
  }
  return (
    s.dirs && ((Y = tt(Y)), (Y.dirs = Y.dirs ? Y.dirs.concat(s.dirs) : s.dirs)),
    s.transition && (Y.transition = s.transition),
    (W = Y),
    Bt(J),
    W
  );
}
const Ri = (e) => {
    let t;
    for (const s in e)
      (s === "class" || s === "style" || Wt(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  Si = (e, t) => {
    const s = {};
    for (const n in e) (!$s(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
    return s;
  };
function Ni(e, t, s) {
  const { props: n, children: o, component: i } = e,
    { props: r, children: c, patchFlag: u } = t,
    a = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return n ? un(n, r, a) : !!r;
    if (u & 8) {
      const m = t.dynamicProps;
      for (let y = 0; y < m.length; y++) {
        const E = m[y];
        if (r[E] !== n[E] && !Xt(a, E)) return !0;
      }
    }
  } else
    return (o || c) && (!c || !c.$stable)
      ? !0
      : n === r
      ? !1
      : n
      ? r
        ? un(n, r, a)
        : !0
      : !!r;
  return !1;
}
function un(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (t[i] !== e[i] && !Xt(s, i)) return !0;
  }
  return !1;
}
function ji({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = s), (t = t.parent);
}
const Hi = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch
    ? P(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : $i(e);
}
const Ft = {};
function us(e, t, s) {
  return fo(e, t, s);
}
function fo(
  e,
  t,
  { immediate: s, deep: n, flush: o, onTrack: i, onTrigger: r } = U
) {
  var c;
  const u = qo() === ((c = G) == null ? void 0 : c.scope) ? G : null;
  let a,
    m = !1,
    y = !1;
  if (
    (ee(e)
      ? ((a = () => e.value), (m = Kt(e)))
      : Xe(e)
      ? ((a = () => e), (n = !0))
      : P(e)
      ? ((y = !0),
        (m = e.some((A) => Xe(A) || Kt(A))),
        (a = () =>
          e.map((A) => {
            if (ee(A)) return A.value;
            if (Xe(A)) return Ke(A);
            if (M(A)) return Ae(A, u, 2);
          })))
      : M(e)
      ? t
        ? (a = () => Ae(e, u, 2))
        : (a = () => {
            if (!(u && u.isUnmounted)) return E && E(), pe(e, u, 3, [$]);
          })
      : (a = he),
    t && n)
  ) {
    const A = a;
    a = () => Ke(A());
  }
  let E,
    $ = (A) => {
      E = J.onStop = () => {
        Ae(A, u, 4);
      };
    },
    K;
  if (yt)
    if (
      (($ = he),
      t ? s && pe(t, u, 3, [a(), y ? [] : void 0, $]) : a(),
      o === "sync")
    ) {
      const A = Mr();
      K = A.__watcherHandles || (A.__watcherHandles = []);
    } else return he;
  let F = y ? new Array(e.length).fill(Ft) : Ft;
  const W = () => {
    if (J.active)
      if (t) {
        const A = J.run();
        (n || m || (y ? A.some((Te, it) => pt(Te, F[it])) : pt(A, F))) &&
          (E && E(),
          pe(t, u, 3, [A, F === Ft ? void 0 : y && F[0] === Ft ? [] : F, $]),
          (F = A));
      } else J.run();
  };
  W.allowRecurse = !!t;
  let q;
  o === "sync"
    ? (q = W)
    : o === "post"
    ? (q = () => ne(W, u && u.suspense))
    : ((W.pre = !0), u && (W.id = u.uid), (q = () => Ds(W)));
  const J = new Ss(a, q);
  t
    ? s
      ? W()
      : (F = J.run())
    : o === "post"
    ? ne(J.run.bind(J), u && u.suspense)
    : J.run();
  const Y = () => {
    J.stop(), u && u.scope && As(u.scope.effects, J);
  };
  return K && K.push(Y), Y;
}
function Ui(e, t, s) {
  const n = this.proxy,
    o = V(e) ? (e.includes(".") ? uo(n, e) : () => n[e]) : e.bind(n, n);
  let i;
  M(t) ? (i = t) : ((i = t.handler), (s = t));
  const r = G;
  st(this);
  const c = fo(o, i.bind(n), s);
  return r ? st(r) : De(), c;
}
function uo(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++) n = n[s[o]];
    return n;
  };
}
function Ke(e, t) {
  if (!k(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ee(e))) Ke(e.value, t);
  else if (P(e)) for (let s = 0; s < e.length; s++) Ke(e[s], t);
  else if (Rn(e) || Ze(e))
    e.forEach((s) => {
      Ke(s, t);
    });
  else if (jn(e)) for (const s in e) Ke(e[s], t);
  return e;
}
function Ki(e, t) {
  const s = ae;
  if (s === null) return e;
  const n = ss(s) || s.proxy,
    o = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, c, u, a = U] = t[i];
    r &&
      (M(r) && (r = { mounted: r, updated: r }),
      r.deep && Ke(c),
      o.push({
        dir: r,
        instance: n,
        value: c,
        oldValue: void 0,
        arg: u,
        modifiers: a,
      }));
  }
  return e;
}
function je(e, t, s, n) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const c = o[r];
    i && (c.oldValue = i[r].value);
    let u = c.dir[n];
    u && (nt(), pe(u, s, 8, [e.el, c, e, t]), ot());
  }
}
const Nt = (e) => !!e.type.__asyncLoader,
  ao = (e) => e.type.__isKeepAlive;
function Bi(e, t) {
  ho(e, "a", t);
}
function Di(e, t) {
  ho(e, "da", t);
}
function ho(e, t, s = G) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let o = s;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Gt(t, n, s), s)) {
    let o = s.parent;
    for (; o && o.parent; )
      ao(o.parent.vnode) && ki(n, t, s, o), (o = o.parent);
  }
}
function ki(e, t, s, n) {
  const o = Gt(t, e, n, !0);
  _o(() => {
    As(n[t], o);
  }, s);
}
function Gt(e, t, s = G, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...r) => {
          if (s.isUnmounted) return;
          nt(), st(s);
          const c = pe(t, s, e, r);
          return De(), ot(), c;
        });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const Oe =
    (e) =>
    (t, s = G) =>
      (!yt || e === "sp") && Gt(e, (...n) => t(...n), s),
  Wi = Oe("bm"),
  po = Oe("m"),
  zi = Oe("bu"),
  qi = Oe("u"),
  Ji = Oe("bum"),
  _o = Oe("um"),
  Yi = Oe("sp"),
  Vi = Oe("rtg"),
  Zi = Oe("rtc");
function Xi(e, t = G) {
  Gt("ec", e, t);
}
const Qi = Symbol.for("v-ndc"),
  ws = (e) => (e ? (Co(e) ? ss(e) || e.proxy : ws(e.parent)) : null),
  at = X(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ws(e.parent),
    $root: (e) => ws(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ds(e.update)),
    $nextTick: (e) => e.n || (e.n = Ti.bind(e.proxy)),
    $watch: (e) => Ui.bind(e),
  }),
  as = (e, t) => e !== U && !e.__isScriptSetup && S(e, t),
  Gi = {
    get({ _: e }, t) {
      const {
        ctx: s,
        setupState: n,
        data: o,
        props: i,
        accessCache: r,
        type: c,
        appContext: u,
      } = e;
      let a;
      if (t[0] !== "$") {
        const $ = r[t];
        if ($ !== void 0)
          switch ($) {
            case 1:
              return n[t];
            case 2:
              return o[t];
            case 4:
              return s[t];
            case 3:
              return i[t];
          }
        else {
          if (as(n, t)) return (r[t] = 1), n[t];
          if (o !== U && S(o, t)) return (r[t] = 2), o[t];
          if ((a = e.propsOptions[0]) && S(a, t)) return (r[t] = 3), i[t];
          if (s !== U && S(s, t)) return (r[t] = 4), s[t];
          Es && (r[t] = 0);
        }
      }
      const m = at[t];
      let y, E;
      if (m) return t === "$attrs" && oe(e, "get", t), m(e);
      if ((y = c.__cssModules) && (y = y[t])) return y;
      if (s !== U && S(s, t)) return (r[t] = 4), s[t];
      if (((E = u.config.globalProperties), S(E, t))) return E[t];
    },
    set({ _: e }, t, s) {
      const { data: n, setupState: o, ctx: i } = e;
      return as(o, t)
        ? ((o[t] = s), !0)
        : n !== U && S(n, t)
        ? ((n[t] = s), !0)
        : S(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = s), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: s,
          ctx: n,
          appContext: o,
          propsOptions: i,
        },
      },
      r
    ) {
      let c;
      return (
        !!s[r] ||
        (e !== U && S(e, r)) ||
        as(t, r) ||
        ((c = i[0]) && S(c, r)) ||
        S(n, r) ||
        S(at, r) ||
        S(o.config.globalProperties, r)
      );
    },
    defineProperty(e, t, s) {
      return (
        s.get != null
          ? (e._.accessCache[t] = 0)
          : S(s, "value") && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      );
    },
  };
function an(e) {
  return P(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let Es = !0;
function er(e) {
  const t = ks(e),
    s = e.proxy,
    n = e.ctx;
  (Es = !1), t.beforeCreate && dn(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: r,
    watch: c,
    provide: u,
    inject: a,
    created: m,
    beforeMount: y,
    mounted: E,
    beforeUpdate: $,
    updated: K,
    activated: F,
    deactivated: W,
    beforeDestroy: q,
    beforeUnmount: J,
    destroyed: Y,
    unmounted: A,
    render: Te,
    renderTracked: it,
    renderTriggered: wt,
    errorCaptured: Fe,
    serverPrefetch: ns,
    expose: Re,
    inheritAttrs: rt,
    components: Et,
    directives: It,
    filters: os,
  } = t;
  if ((a && tr(a, n, null), r))
    for (const D in r) {
      const H = r[D];
      M(H) && (n[D] = H.bind(s));
    }
  if (o) {
    const D = o.call(s, s);
    k(D) && (e.data = Ls(D));
  }
  if (((Es = !0), i))
    for (const D in i) {
      const H = i[D],
        Se = M(H) ? H.bind(s, s) : M(H.get) ? H.get.bind(s, s) : he,
        Ot = !M(H) && M(H.set) ? H.set.bind(s) : he,
        Ne = ht({ get: Se, set: Ot });
      Object.defineProperty(n, D, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (_e) => (Ne.value = _e),
      });
    }
  if (c) for (const D in c) mo(c[D], n, s, D);
  if (u) {
    const D = M(u) ? u.call(s) : u;
    Reflect.ownKeys(D).forEach((H) => {
      lr(H, D[H]);
    });
  }
  m && dn(m, e, "c");
  function te(D, H) {
    P(H) ? H.forEach((Se) => D(Se.bind(s))) : H && D(H.bind(s));
  }
  if (
    (te(Wi, y),
    te(po, E),
    te(zi, $),
    te(qi, K),
    te(Bi, F),
    te(Di, W),
    te(Xi, Fe),
    te(Zi, it),
    te(Vi, wt),
    te(Ji, J),
    te(_o, A),
    te(Yi, ns),
    P(Re))
  )
    if (Re.length) {
      const D = e.exposed || (e.exposed = {});
      Re.forEach((H) => {
        Object.defineProperty(D, H, {
          get: () => s[H],
          set: (Se) => (s[H] = Se),
        });
      });
    } else e.exposed || (e.exposed = {});
  Te && e.render === he && (e.render = Te),
    rt != null && (e.inheritAttrs = rt),
    Et && (e.components = Et),
    It && (e.directives = It);
}
function tr(e, t, s = he) {
  P(e) && (e = Is(e));
  for (const n in e) {
    const o = e[n];
    let i;
    k(o)
      ? "default" in o
        ? (i = jt(o.from || n, o.default, !0))
        : (i = jt(o.from || n))
      : (i = jt(o)),
      ee(i)
        ? Object.defineProperty(t, n, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (r) => (i.value = r),
          })
        : (t[n] = i);
  }
}
function dn(e, t, s) {
  pe(P(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function mo(e, t, s, n) {
  const o = n.includes(".") ? uo(s, n) : () => s[n];
  if (V(e)) {
    const i = t[e];
    M(i) && us(o, i);
  } else if (M(e)) us(o, e.bind(s));
  else if (k(e))
    if (P(e)) e.forEach((i) => mo(i, t, s, n));
    else {
      const i = M(e.handler) ? e.handler.bind(s) : t[e.handler];
      M(i) && us(o, i, e);
    }
}
function ks(e) {
  const t = e.type,
    { mixins: s, extends: n } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: r },
    } = e.appContext,
    c = i.get(t);
  let u;
  return (
    c
      ? (u = c)
      : !o.length && !s && !n
      ? (u = t)
      : ((u = {}), o.length && o.forEach((a) => Dt(u, a, r, !0)), Dt(u, t, r)),
    k(t) && i.set(t, u),
    u
  );
}
function Dt(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && Dt(e, i, s, !0), o && o.forEach((r) => Dt(e, r, s, !0));
  for (const r in t)
    if (!(n && r === "expose")) {
      const c = sr[r] || (s && s[r]);
      e[r] = c ? c(e[r], t[r]) : t[r];
    }
  return e;
}
const sr = {
  data: hn,
  props: pn,
  emits: pn,
  methods: ut,
  computed: ut,
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  components: ut,
  directives: ut,
  watch: or,
  provide: hn,
  inject: nr,
};
function hn(e, t) {
  return t
    ? e
      ? function () {
          return X(
            M(e) ? e.call(this, this) : e,
            M(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function nr(e, t) {
  return ut(Is(e), Is(t));
}
function Is(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ut(e, t) {
  return e ? X(Object.create(null), e, t) : t;
}
function pn(e, t) {
  return e
    ? P(e) && P(t)
      ? [...new Set([...e, ...t])]
      : X(Object.create(null), an(e), an(t ?? {}))
    : t;
}
function or(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = X(Object.create(null), e);
  for (const n in t) s[n] = se(e[n], t[n]);
  return s;
}
function go() {
  return {
    app: null,
    config: {
      isNativeTag: Fo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let ir = 0;
function rr(e, t) {
  return function (n, o = null) {
    M(n) || (n = X({}, n)), o != null && !k(o) && (o = null);
    const i = go(),
      r = new Set();
    let c = !1;
    const u = (i.app = {
      _uid: ir++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Fr,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...m) {
        return (
          r.has(a) ||
            (a && M(a.install)
              ? (r.add(a), a.install(u, ...m))
              : M(a) && (r.add(a), a(u, ...m))),
          u
        );
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, m) {
        return m ? ((i.components[a] = m), u) : i.components[a];
      },
      directive(a, m) {
        return m ? ((i.directives[a] = m), u) : i.directives[a];
      },
      mount(a, m, y) {
        if (!c) {
          const E = le(n, o);
          return (
            (E.appContext = i),
            m && t ? t(E, a) : e(E, a, y),
            (c = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            ss(E.component) || E.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, m) {
        return (i.provides[a] = m), u;
      },
      runWithContext(a) {
        kt = u;
        try {
          return a();
        } finally {
          kt = null;
        }
      },
    });
    return u;
  };
}
let kt = null;
function lr(e, t) {
  if (G) {
    let s = G.provides;
    const n = G.parent && G.parent.provides;
    n === s && (s = G.provides = Object.create(n)), (s[e] = t);
  }
}
function jt(e, t, s = !1) {
  const n = G || ae;
  if (n || kt) {
    const o = n
      ? n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides
      : kt._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return s && M(t) ? t.call(n && n.proxy) : t;
  }
}
function cr(e, t, s, n = !1) {
  const o = {},
    i = {};
  Ut(i, ts, 1), (e.propsDefaults = Object.create(null)), bo(e, t, o, i);
  for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
  s ? (e.props = n ? o : vi(o)) : e.type.props ? (e.props = o) : (e.props = i),
    (e.attrs = i);
}
function fr(e, t, s, n) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: r },
    } = e,
    c = N(o),
    [u] = e.propsOptions;
  let a = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const m = e.vnode.dynamicProps;
      for (let y = 0; y < m.length; y++) {
        let E = m[y];
        if (Xt(e.emitsOptions, E)) continue;
        const $ = t[E];
        if (u)
          if (S(i, E)) $ !== i[E] && ((i[E] = $), (a = !0));
          else {
            const K = Ge(E);
            o[K] = Os(u, c, K, $, e, !1);
          }
        else $ !== i[E] && ((i[E] = $), (a = !0));
      }
    }
  } else {
    bo(e, t, o, i) && (a = !0);
    let m;
    for (const y in c)
      (!t || (!S(t, y) && ((m = We(y)) === y || !S(t, m)))) &&
        (u
          ? s &&
            (s[y] !== void 0 || s[m] !== void 0) &&
            (o[y] = Os(u, c, y, void 0, e, !0))
          : delete o[y]);
    if (i !== c) for (const y in i) (!t || !S(t, y)) && (delete i[y], (a = !0));
  }
  a && Ie(e, "set", "$attrs");
}
function bo(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1,
    c;
  if (t)
    for (let u in t) {
      if (Rt(u)) continue;
      const a = t[u];
      let m;
      o && S(o, (m = Ge(u)))
        ? !i || !i.includes(m)
          ? (s[m] = a)
          : ((c || (c = {}))[m] = a)
        : Xt(e.emitsOptions, u) ||
          ((!(u in n) || a !== n[u]) && ((n[u] = a), (r = !0)));
    }
  if (i) {
    const u = N(s),
      a = c || U;
    for (let m = 0; m < i.length; m++) {
      const y = i[m];
      s[y] = Os(o, u, y, a[y], e, !S(a, y));
    }
  }
  return r;
}
function Os(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const c = S(r, "default");
    if (c && n === void 0) {
      const u = r.default;
      if (r.type !== Function && !r.skipFactory && M(u)) {
        const { propsDefaults: a } = o;
        s in a ? (n = a[s]) : (st(o), (n = a[s] = u.call(null, t)), De());
      } else n = u;
    }
    r[0] &&
      (i && !c ? (n = !1) : r[1] && (n === "" || n === We(s)) && (n = !0));
  }
  return n;
}
function vo(e, t, s = !1) {
  const n = t.propsCache,
    o = n.get(e);
  if (o) return o;
  const i = e.props,
    r = {},
    c = [];
  let u = !1;
  if (!M(e)) {
    const m = (y) => {
      u = !0;
      const [E, $] = vo(y, t, !0);
      X(r, E), $ && c.push(...$);
    };
    !s && t.mixins.length && t.mixins.forEach(m),
      e.extends && m(e.extends),
      e.mixins && e.mixins.forEach(m);
  }
  if (!i && !u) return k(e) && n.set(e, Ve), Ve;
  if (P(i))
    for (let m = 0; m < i.length; m++) {
      const y = Ge(i[m]);
      _n(y) && (r[y] = U);
    }
  else if (i)
    for (const m in i) {
      const y = Ge(m);
      if (_n(y)) {
        const E = i[m],
          $ = (r[y] = P(E) || M(E) ? { type: E } : X({}, E));
        if ($) {
          const K = bn(Boolean, $.type),
            F = bn(String, $.type);
          ($[0] = K > -1),
            ($[1] = F < 0 || K < F),
            (K > -1 || S($, "default")) && c.push(y);
        }
      }
    }
  const a = [r, c];
  return k(e) && n.set(e, a), a;
}
function _n(e) {
  return e[0] !== "$";
}
function mn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function gn(e, t) {
  return mn(e) === mn(t);
}
function bn(e, t) {
  return P(t) ? t.findIndex((s) => gn(s, e)) : M(t) && gn(t, e) ? 0 : -1;
}
const xo = (e) => e[0] === "_" || e === "$stable",
  Ws = (e) => (P(e) ? e.map(be) : [be(e)]),
  ur = (e, t, s) => {
    if (t._n) return t;
    const n = Fi((...o) => Ws(t(...o)), s);
    return (n._c = !1), n;
  },
  yo = (e, t, s) => {
    const n = e._ctx;
    for (const o in e) {
      if (xo(o)) continue;
      const i = e[o];
      if (M(i)) t[o] = ur(o, i, n);
      else if (i != null) {
        const r = Ws(i);
        t[o] = () => r;
      }
    }
  },
  wo = (e, t) => {
    const s = Ws(t);
    e.slots.default = () => s;
  },
  ar = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? ((e.slots = N(t)), Ut(t, "_", s)) : yo(t, (e.slots = {}));
    } else (e.slots = {}), t && wo(e, t);
    Ut(e.slots, ts, 1);
  },
  dr = (e, t, s) => {
    const { vnode: n, slots: o } = e;
    let i = !0,
      r = U;
    if (n.shapeFlag & 32) {
      const c = t._;
      c
        ? s && c === 1
          ? (i = !1)
          : (X(o, t), !s && c === 1 && delete o._)
        : ((i = !t.$stable), yo(t, o)),
        (r = t);
    } else t && (wo(e, t), (r = { default: 1 }));
    if (i) for (const c in o) !xo(c) && !(c in r) && delete o[c];
  };
function Ts(e, t, s, n, o = !1) {
  if (P(e)) {
    e.forEach((E, $) => Ts(E, t && (P(t) ? t[$] : t), s, n, o));
    return;
  }
  if (Nt(n) && !o) return;
  const i = n.shapeFlag & 4 ? ss(n.component) || n.component.proxy : n.el,
    r = o ? null : i,
    { i: c, r: u } = e,
    a = t && t.r,
    m = c.refs === U ? (c.refs = {}) : c.refs,
    y = c.setupState;
  if (
    (a != null &&
      a !== u &&
      (V(a)
        ? ((m[a] = null), S(y, a) && (y[a] = null))
        : ee(a) && (a.value = null)),
    M(u))
  )
    Ae(u, c, 12, [r, m]);
  else {
    const E = V(u),
      $ = ee(u);
    if (E || $) {
      const K = () => {
        if (e.f) {
          const F = E ? (S(y, u) ? y[u] : m[u]) : u.value;
          o
            ? P(F) && As(F, i)
            : P(F)
            ? F.includes(i) || F.push(i)
            : E
            ? ((m[u] = [i]), S(y, u) && (y[u] = m[u]))
            : ((u.value = [i]), e.k && (m[e.k] = u.value));
        } else
          E
            ? ((m[u] = r), S(y, u) && (y[u] = r))
            : $ && ((u.value = r), e.k && (m[e.k] = r));
      };
      r ? ((K.id = -1), ne(K, s)) : K();
    }
  }
}
const ne = Li;
function hr(e) {
  return pr(e);
}
function pr(e, t) {
  const s = ms();
  s.__VUE__ = !0;
  const {
      insert: n,
      remove: o,
      patchProp: i,
      createElement: r,
      createText: c,
      createComment: u,
      setText: a,
      setElementText: m,
      parentNode: y,
      nextSibling: E,
      setScopeId: $ = he,
      insertStaticContent: K,
    } = e,
    F = (
      l,
      f,
      d,
      _ = null,
      h = null,
      v = null,
      w = !1,
      b = null,
      x = !!f.dynamicChildren
    ) => {
      if (l === f) return;
      l && !ct(l, f) && ((_ = Tt(l)), _e(l, h, v, !0), (l = null)),
        f.patchFlag === -2 && ((x = !1), (f.dynamicChildren = null));
      const { type: g, ref: O, shapeFlag: I } = f;
      switch (g) {
        case es:
          W(l, f, d, _);
          break;
        case ke:
          q(l, f, d, _);
          break;
        case ds:
          l == null && J(f, d, _, w);
          break;
        case Ee:
          Et(l, f, d, _, h, v, w, b, x);
          break;
        default:
          I & 1
            ? Te(l, f, d, _, h, v, w, b, x)
            : I & 6
            ? It(l, f, d, _, h, v, w, b, x)
            : (I & 64 || I & 128) && g.process(l, f, d, _, h, v, w, b, x, ze);
      }
      O != null && h && Ts(O, l && l.ref, v, f || l, !f);
    },
    W = (l, f, d, _) => {
      if (l == null) n((f.el = c(f.children)), d, _);
      else {
        const h = (f.el = l.el);
        f.children !== l.children && a(h, f.children);
      }
    },
    q = (l, f, d, _) => {
      l == null ? n((f.el = u(f.children || "")), d, _) : (f.el = l.el);
    },
    J = (l, f, d, _) => {
      [l.el, l.anchor] = K(l.children, f, d, _, l.el, l.anchor);
    },
    Y = ({ el: l, anchor: f }, d, _) => {
      let h;
      for (; l && l !== f; ) (h = E(l)), n(l, d, _), (l = h);
      n(f, d, _);
    },
    A = ({ el: l, anchor: f }) => {
      let d;
      for (; l && l !== f; ) (d = E(l)), o(l), (l = d);
      o(f);
    },
    Te = (l, f, d, _, h, v, w, b, x) => {
      (w = w || f.type === "svg"),
        l == null ? it(f, d, _, h, v, w, b, x) : ns(l, f, h, v, w, b, x);
    },
    it = (l, f, d, _, h, v, w, b) => {
      let x, g;
      const { type: O, props: I, shapeFlag: T, transition: C, dirs: R } = l;
      if (
        ((x = l.el = r(l.type, v, I && I.is, I)),
        T & 8
          ? m(x, l.children)
          : T & 16 &&
            Fe(l.children, x, null, _, h, v && O !== "foreignObject", w, b),
        R && je(l, null, _, "created"),
        wt(x, l, l.scopeId, w, _),
        I)
      ) {
        for (const j in I)
          j !== "value" &&
            !Rt(j) &&
            i(x, j, null, I[j], v, l.children, _, h, ye);
        "value" in I && i(x, "value", null, I.value),
          (g = I.onVnodeBeforeMount) && ge(g, _, l);
      }
      R && je(l, null, _, "beforeMount");
      const L = (!h || (h && !h.pendingBranch)) && C && !C.persisted;
      L && C.beforeEnter(x),
        n(x, f, d),
        ((g = I && I.onVnodeMounted) || L || R) &&
          ne(() => {
            g && ge(g, _, l), L && C.enter(x), R && je(l, null, _, "mounted");
          }, h);
    },
    wt = (l, f, d, _, h) => {
      if ((d && $(l, d), _)) for (let v = 0; v < _.length; v++) $(l, _[v]);
      if (h) {
        let v = h.subTree;
        if (f === v) {
          const w = h.vnode;
          wt(l, w, w.scopeId, w.slotScopeIds, h.parent);
        }
      }
    },
    Fe = (l, f, d, _, h, v, w, b, x = 0) => {
      for (let g = x; g < l.length; g++) {
        const O = (l[g] = b ? Pe(l[g]) : be(l[g]));
        F(null, O, f, d, _, h, v, w, b);
      }
    },
    ns = (l, f, d, _, h, v, w) => {
      const b = (f.el = l.el);
      let { patchFlag: x, dynamicChildren: g, dirs: O } = f;
      x |= l.patchFlag & 16;
      const I = l.props || U,
        T = f.props || U;
      let C;
      d && He(d, !1),
        (C = T.onVnodeBeforeUpdate) && ge(C, d, f, l),
        O && je(f, l, d, "beforeUpdate"),
        d && He(d, !0);
      const R = h && f.type !== "foreignObject";
      if (
        (g
          ? Re(l.dynamicChildren, g, b, d, _, R, v)
          : w || H(l, f, b, null, d, _, R, v, !1),
        x > 0)
      ) {
        if (x & 16) rt(b, f, I, T, d, _, h);
        else if (
          (x & 2 && I.class !== T.class && i(b, "class", null, T.class, h),
          x & 4 && i(b, "style", I.style, T.style, h),
          x & 8)
        ) {
          const L = f.dynamicProps;
          for (let j = 0; j < L.length; j++) {
            const z = L[j],
              ce = I[z],
              qe = T[z];
            (qe !== ce || z === "value") &&
              i(b, z, ce, qe, h, l.children, d, _, ye);
          }
        }
        x & 1 && l.children !== f.children && m(b, f.children);
      } else !w && g == null && rt(b, f, I, T, d, _, h);
      ((C = T.onVnodeUpdated) || O) &&
        ne(() => {
          C && ge(C, d, f, l), O && je(f, l, d, "updated");
        }, _);
    },
    Re = (l, f, d, _, h, v, w) => {
      for (let b = 0; b < f.length; b++) {
        const x = l[b],
          g = f[b],
          O =
            x.el && (x.type === Ee || !ct(x, g) || x.shapeFlag & 70)
              ? y(x.el)
              : d;
        F(x, g, O, null, _, h, v, w, !0);
      }
    },
    rt = (l, f, d, _, h, v, w) => {
      if (d !== _) {
        if (d !== U)
          for (const b in d)
            !Rt(b) && !(b in _) && i(l, b, d[b], null, w, f.children, h, v, ye);
        for (const b in _) {
          if (Rt(b)) continue;
          const x = _[b],
            g = d[b];
          x !== g && b !== "value" && i(l, b, g, x, w, f.children, h, v, ye);
        }
        "value" in _ && i(l, "value", d.value, _.value);
      }
    },
    Et = (l, f, d, _, h, v, w, b, x) => {
      const g = (f.el = l ? l.el : c("")),
        O = (f.anchor = l ? l.anchor : c(""));
      let { patchFlag: I, dynamicChildren: T, slotScopeIds: C } = f;
      C && (b = b ? b.concat(C) : C),
        l == null
          ? (n(g, d, _), n(O, d, _), Fe(f.children, d, O, h, v, w, b, x))
          : I > 0 && I & 64 && T && l.dynamicChildren
          ? (Re(l.dynamicChildren, T, d, h, v, w, b),
            (f.key != null || (h && f === h.subTree)) && Eo(l, f, !0))
          : H(l, f, d, O, h, v, w, b, x);
    },
    It = (l, f, d, _, h, v, w, b, x) => {
      (f.slotScopeIds = b),
        l == null
          ? f.shapeFlag & 512
            ? h.ctx.activate(f, d, _, w, x)
            : os(f, d, _, h, v, w, x)
          : Ys(l, f, x);
    },
    os = (l, f, d, _, h, v, w) => {
      const b = (l.component = Ir(l, _, h));
      if ((ao(l) && (b.ctx.renderer = ze), Or(b), b.asyncDep)) {
        if ((h && h.registerDep(b, te), !l.el)) {
          const x = (b.subTree = le(ke));
          q(null, x, f, d);
        }
        return;
      }
      te(b, l, f, d, h, v, w);
    },
    Ys = (l, f, d) => {
      const _ = (f.component = l.component);
      if (Ni(l, f, d))
        if (_.asyncDep && !_.asyncResolved) {
          D(_, f, d);
          return;
        } else (_.next = f), Pi(_.update), _.update();
      else (f.el = l.el), (_.vnode = f);
    },
    te = (l, f, d, _, h, v, w) => {
      const b = () => {
          if (l.isMounted) {
            let { next: O, bu: I, u: T, parent: C, vnode: R } = l,
              L = O,
              j;
            He(l, !1),
              O ? ((O.el = R.el), D(l, O, w)) : (O = R),
              I && St(I),
              (j = O.props && O.props.onVnodeBeforeUpdate) && ge(j, C, O, R),
              He(l, !0);
            const z = fs(l),
              ce = l.subTree;
            (l.subTree = z),
              F(ce, z, y(ce.el), Tt(ce), l, h, v),
              (O.el = z.el),
              L === null && ji(l, z.el),
              T && ne(T, h),
              (j = O.props && O.props.onVnodeUpdated) &&
                ne(() => ge(j, C, O, R), h);
          } else {
            let O;
            const { el: I, props: T } = f,
              { bm: C, m: R, parent: L } = l,
              j = Nt(f);
            if (
              (He(l, !1),
              C && St(C),
              !j && (O = T && T.onVnodeBeforeMount) && ge(O, L, f),
              He(l, !0),
              I && rs)
            ) {
              const z = () => {
                (l.subTree = fs(l)), rs(I, l.subTree, l, h, null);
              };
              j
                ? f.type.__asyncLoader().then(() => !l.isUnmounted && z())
                : z();
            } else {
              const z = (l.subTree = fs(l));
              F(null, z, d, _, l, h, v), (f.el = z.el);
            }
            if ((R && ne(R, h), !j && (O = T && T.onVnodeMounted))) {
              const z = f;
              ne(() => ge(O, L, z), h);
            }
            (f.shapeFlag & 256 ||
              (L && Nt(L.vnode) && L.vnode.shapeFlag & 256)) &&
              l.a &&
              ne(l.a, h),
              (l.isMounted = !0),
              (f = d = _ = null);
          }
        },
        x = (l.effect = new Ss(b, () => Ds(g), l.scope)),
        g = (l.update = () => x.run());
      (g.id = l.uid), He(l, !0), g();
    },
    D = (l, f, d) => {
      f.component = l;
      const _ = l.vnode.props;
      (l.vnode = f),
        (l.next = null),
        fr(l, f.props, _, d),
        dr(l, f.children, d),
        nt(),
        fn(),
        ot();
    },
    H = (l, f, d, _, h, v, w, b, x = !1) => {
      const g = l && l.children,
        O = l ? l.shapeFlag : 0,
        I = f.children,
        { patchFlag: T, shapeFlag: C } = f;
      if (T > 0) {
        if (T & 128) {
          Ot(g, I, d, _, h, v, w, b, x);
          return;
        } else if (T & 256) {
          Se(g, I, d, _, h, v, w, b, x);
          return;
        }
      }
      C & 8
        ? (O & 16 && ye(g, h, v), I !== g && m(d, I))
        : O & 16
        ? C & 16
          ? Ot(g, I, d, _, h, v, w, b, x)
          : ye(g, h, v, !0)
        : (O & 8 && m(d, ""), C & 16 && Fe(I, d, _, h, v, w, b, x));
    },
    Se = (l, f, d, _, h, v, w, b, x) => {
      (l = l || Ve), (f = f || Ve);
      const g = l.length,
        O = f.length,
        I = Math.min(g, O);
      let T;
      for (T = 0; T < I; T++) {
        const C = (f[T] = x ? Pe(f[T]) : be(f[T]));
        F(l[T], C, d, null, h, v, w, b, x);
      }
      g > O ? ye(l, h, v, !0, !1, I) : Fe(f, d, _, h, v, w, b, x, I);
    },
    Ot = (l, f, d, _, h, v, w, b, x) => {
      let g = 0;
      const O = f.length;
      let I = l.length - 1,
        T = O - 1;
      for (; g <= I && g <= T; ) {
        const C = l[g],
          R = (f[g] = x ? Pe(f[g]) : be(f[g]));
        if (ct(C, R)) F(C, R, d, null, h, v, w, b, x);
        else break;
        g++;
      }
      for (; g <= I && g <= T; ) {
        const C = l[I],
          R = (f[T] = x ? Pe(f[T]) : be(f[T]));
        if (ct(C, R)) F(C, R, d, null, h, v, w, b, x);
        else break;
        I--, T--;
      }
      if (g > I) {
        if (g <= T) {
          const C = T + 1,
            R = C < O ? f[C].el : _;
          for (; g <= T; )
            F(null, (f[g] = x ? Pe(f[g]) : be(f[g])), d, R, h, v, w, b, x), g++;
        }
      } else if (g > T) for (; g <= I; ) _e(l[g], h, v, !0), g++;
      else {
        const C = g,
          R = g,
          L = new Map();
        for (g = R; g <= T; g++) {
          const ie = (f[g] = x ? Pe(f[g]) : be(f[g]));
          ie.key != null && L.set(ie.key, g);
        }
        let j,
          z = 0;
        const ce = T - R + 1;
        let qe = !1,
          Xs = 0;
        const lt = new Array(ce);
        for (g = 0; g < ce; g++) lt[g] = 0;
        for (g = C; g <= I; g++) {
          const ie = l[g];
          if (z >= ce) {
            _e(ie, h, v, !0);
            continue;
          }
          let me;
          if (ie.key != null) me = L.get(ie.key);
          else
            for (j = R; j <= T; j++)
              if (lt[j - R] === 0 && ct(ie, f[j])) {
                me = j;
                break;
              }
          me === void 0
            ? _e(ie, h, v, !0)
            : ((lt[me - R] = g + 1),
              me >= Xs ? (Xs = me) : (qe = !0),
              F(ie, f[me], d, null, h, v, w, b, x),
              z++);
        }
        const Qs = qe ? _r(lt) : Ve;
        for (j = Qs.length - 1, g = ce - 1; g >= 0; g--) {
          const ie = R + g,
            me = f[ie],
            Gs = ie + 1 < O ? f[ie + 1].el : _;
          lt[g] === 0
            ? F(null, me, d, Gs, h, v, w, b, x)
            : qe && (j < 0 || g !== Qs[j] ? Ne(me, d, Gs, 2) : j--);
        }
      }
    },
    Ne = (l, f, d, _, h = null) => {
      const { el: v, type: w, transition: b, children: x, shapeFlag: g } = l;
      if (g & 6) {
        Ne(l.component.subTree, f, d, _);
        return;
      }
      if (g & 128) {
        l.suspense.move(f, d, _);
        return;
      }
      if (g & 64) {
        w.move(l, f, d, ze);
        return;
      }
      if (w === Ee) {
        n(v, f, d);
        for (let I = 0; I < x.length; I++) Ne(x[I], f, d, _);
        n(l.anchor, f, d);
        return;
      }
      if (w === ds) {
        Y(l, f, d);
        return;
      }
      if (_ !== 2 && g & 1 && b)
        if (_ === 0) b.beforeEnter(v), n(v, f, d), ne(() => b.enter(v), h);
        else {
          const { leave: I, delayLeave: T, afterLeave: C } = b,
            R = () => n(v, f, d),
            L = () => {
              I(v, () => {
                R(), C && C();
              });
            };
          T ? T(v, R, L) : L();
        }
      else n(v, f, d);
    },
    _e = (l, f, d, _ = !1, h = !1) => {
      const {
        type: v,
        props: w,
        ref: b,
        children: x,
        dynamicChildren: g,
        shapeFlag: O,
        patchFlag: I,
        dirs: T,
      } = l;
      if ((b != null && Ts(b, null, d, l, !0), O & 256)) {
        f.ctx.deactivate(l);
        return;
      }
      const C = O & 1 && T,
        R = !Nt(l);
      let L;
      if ((R && (L = w && w.onVnodeBeforeUnmount) && ge(L, f, l), O & 6))
        Mo(l.component, d, _);
      else {
        if (O & 128) {
          l.suspense.unmount(d, _);
          return;
        }
        C && je(l, null, f, "beforeUnmount"),
          O & 64
            ? l.type.remove(l, f, d, h, ze, _)
            : g && (v !== Ee || (I > 0 && I & 64))
            ? ye(g, f, d, !1, !0)
            : ((v === Ee && I & 384) || (!h && O & 16)) && ye(x, f, d),
          _ && Vs(l);
      }
      ((R && (L = w && w.onVnodeUnmounted)) || C) &&
        ne(() => {
          L && ge(L, f, l), C && je(l, null, f, "unmounted");
        }, d);
    },
    Vs = (l) => {
      const { type: f, el: d, anchor: _, transition: h } = l;
      if (f === Ee) {
        Ao(d, _);
        return;
      }
      if (f === ds) {
        A(l);
        return;
      }
      const v = () => {
        o(d), h && !h.persisted && h.afterLeave && h.afterLeave();
      };
      if (l.shapeFlag & 1 && h && !h.persisted) {
        const { leave: w, delayLeave: b } = h,
          x = () => w(d, v);
        b ? b(l.el, v, x) : x();
      } else v();
    },
    Ao = (l, f) => {
      let d;
      for (; l !== f; ) (d = E(l)), o(l), (l = d);
      o(f);
    },
    Mo = (l, f, d) => {
      const { bum: _, scope: h, update: v, subTree: w, um: b } = l;
      _ && St(_),
        h.stop(),
        v && ((v.active = !1), _e(w, l, f, d)),
        b && ne(b, f),
        ne(() => {
          l.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    ye = (l, f, d, _ = !1, h = !1, v = 0) => {
      for (let w = v; w < l.length; w++) _e(l[w], f, d, _, h);
    },
    Tt = (l) =>
      l.shapeFlag & 6
        ? Tt(l.component.subTree)
        : l.shapeFlag & 128
        ? l.suspense.next()
        : E(l.anchor || l.el),
    Zs = (l, f, d) => {
      l == null
        ? f._vnode && _e(f._vnode, null, null, !0)
        : F(f._vnode || null, l, f, null, null, null, d),
        fn(),
        oo(),
        (f._vnode = l);
    },
    ze = {
      p: F,
      um: _e,
      m: Ne,
      r: Vs,
      mt: os,
      mc: Fe,
      pc: H,
      pbc: Re,
      n: Tt,
      o: e,
    };
  let is, rs;
  return (
    t && ([is, rs] = t(ze)), { render: Zs, hydrate: is, createApp: rr(Zs, is) }
  );
}
function He({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function Eo(e, t, s = !1) {
  const n = e.children,
    o = t.children;
  if (P(n) && P(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let c = o[i];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = o[i] = Pe(o[i])), (c.el = r.el)),
        s || Eo(r, c)),
        c.type === es && (c.el = r.el);
    }
}
function _r(e) {
  const t = e.slice(),
    s = [0];
  let n, o, i, r, c;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const a = e[n];
    if (a !== 0) {
      if (((o = s[s.length - 1]), e[o] < a)) {
        (t[n] = o), s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        (c = (i + r) >> 1), e[s[c]] < a ? (i = c + 1) : (r = c);
      a < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; ) (s[i] = r), (r = t[r]);
  return s;
}
const mr = (e) => e.__isTeleport,
  Ee = Symbol.for("v-fgt"),
  es = Symbol.for("v-txt"),
  ke = Symbol.for("v-cmt"),
  ds = Symbol.for("v-stc"),
  dt = [];
let de = null;
function re(e = !1) {
  dt.push((de = e ? null : []));
}
function gr() {
  dt.pop(), (de = dt[dt.length - 1] || null);
}
let vt = 1;
function vn(e) {
  vt += e;
}
function Io(e) {
  return (
    (e.dynamicChildren = vt > 0 ? de || Ve : null),
    gr(),
    vt > 0 && de && de.push(e),
    e
  );
}
function xe(e, t, s, n, o, i) {
  return Io(p(e, t, s, n, o, i, !0));
}
function Oo(e, t, s, n, o) {
  return Io(le(e, t, s, n, o, !0));
}
function br(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ts = "__vInternal",
  To = ({ key: e }) => e ?? null,
  Ht = ({ ref: e, ref_key: t, ref_for: s }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? V(e) || ee(e) || M(e)
        ? { i: ae, r: e, k: t, f: !!s }
        : e
      : null
  );
function p(
  e,
  t = null,
  s = null,
  n = 0,
  o = null,
  i = e === Ee ? 0 : 1,
  r = !1,
  c = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && To(t),
    ref: t && Ht(t),
    scopeId: Qt,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ae,
  };
  return (
    c
      ? (zs(u, s), i & 128 && e.normalize(u))
      : s && (u.shapeFlag |= V(s) ? 8 : 16),
    vt > 0 &&
      !r &&
      de &&
      (u.patchFlag > 0 || i & 6) &&
      u.patchFlag !== 32 &&
      de.push(u),
    u
  );
}
const le = vr;
function vr(e, t = null, s = null, n = 0, o = null, i = !1) {
  if (((!e || e === Qi) && (e = ke), br(e))) {
    const c = tt(e, t, !0);
    return (
      s && zs(c, s),
      vt > 0 &&
        !i &&
        de &&
        (c.shapeFlag & 6 ? (de[de.indexOf(e)] = c) : de.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if (($r(e) && (e = e.__vccOpts), t)) {
    t = xr(t);
    let { class: c, style: u } = t;
    c && !V(c) && (t.class = Yt(c)),
      k(u) && (Xn(u) && !P(u) && (u = X({}, u)), (t.style = Jt(u)));
  }
  const r = V(e) ? 1 : Hi(e) ? 128 : mr(e) ? 64 : k(e) ? 4 : M(e) ? 2 : 0;
  return p(e, t, s, n, o, r, i, !0);
}
function xr(e) {
  return e ? (Xn(e) || ts in e ? X({}, e) : e) : null;
}
function tt(e, t, s = !1) {
  const { props: n, ref: o, patchFlag: i, children: r } = e,
    c = t ? yr(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && To(c),
    ref:
      t && t.ref ? (s && o ? (P(o) ? o.concat(Ht(t)) : [o, Ht(t)]) : Ht(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ee ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && tt(e.ssContent),
    ssFallback: e.ssFallback && tt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function xt(e = " ", t = 0) {
  return le(es, null, e, t);
}
function Lt(e = "", t = !1) {
  return t ? (re(), Oo(ke, null, e)) : le(ke, null, e);
}
function be(e) {
  return e == null || typeof e == "boolean"
    ? le(ke)
    : P(e)
    ? le(Ee, null, e.slice())
    : typeof e == "object"
    ? Pe(e)
    : le(es, null, String(e));
}
function Pe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : tt(e);
}
function zs(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (P(t)) s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), zs(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !(ts in t)
        ? (t._ctx = ae)
        : o === 3 &&
          ae &&
          (ae.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    M(t)
      ? ((t = { default: t, _ctx: ae }), (s = 32))
      : ((t = String(t)), n & 64 ? ((s = 16), (t = [xt(t)])) : (s = 8));
  (e.children = t), (e.shapeFlag |= s);
}
function yr(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = Yt([t.class, n.class]));
      else if (o === "style") t.style = Jt([t.style, n.style]);
      else if (Wt(o)) {
        const i = t[o],
          r = n[o];
        r &&
          i !== r &&
          !(P(i) && i.includes(r)) &&
          (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function ge(e, t, s, n = null) {
  pe(e, t, 7, [s, n]);
}
const wr = go();
let Er = 0;
function Ir(e, t, s) {
  const n = e.type,
    o = (t ? t.appContext : e.appContext) || wr,
    i = {
      uid: Er++,
      vnode: e,
      type: n,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Wo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: vo(n, o),
      emitsOptions: ro(n, o),
      emit: null,
      emitted: null,
      propsDefaults: U,
      inheritAttrs: n.inheritAttrs,
      ctx: U,
      data: U,
      props: U,
      attrs: U,
      slots: U,
      refs: U,
      setupState: U,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Mi.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let G = null,
  qs,
  Je,
  xn = "__VUE_INSTANCE_SETTERS__";
(Je = ms()[xn]) || (Je = ms()[xn] = []),
  Je.push((e) => (G = e)),
  (qs = (e) => {
    Je.length > 1 ? Je.forEach((t) => t(e)) : Je[0](e);
  });
const st = (e) => {
    qs(e), e.scope.on();
  },
  De = () => {
    G && G.scope.off(), qs(null);
  };
function Co(e) {
  return e.vnode.shapeFlag & 4;
}
let yt = !1;
function Or(e, t = !1) {
  yt = t;
  const { props: s, children: n } = e.vnode,
    o = Co(e);
  cr(e, s, o, t), ar(e, n);
  const i = o ? Tr(e, t) : void 0;
  return (yt = !1), i;
}
function Tr(e, t) {
  const s = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Qn(new Proxy(e.ctx, Gi)));
  const { setup: n } = s;
  if (n) {
    const o = (e.setupContext = n.length > 1 ? Pr(e) : null);
    st(e), nt();
    const i = Ae(n, e, 0, [e.props, o]);
    if ((ot(), De(), Sn(i))) {
      if ((i.then(De, De), t))
        return i
          .then((r) => {
            yn(e, r, t);
          })
          .catch((r) => {
            Zt(r, e, 0);
          });
      e.asyncDep = i;
    } else yn(e, i, t);
  } else Po(e, t);
}
function yn(e, t, s) {
  M(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : k(t) && (e.setupState = to(t)),
    Po(e, s);
}
let wn;
function Po(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && wn && !n.render) {
      const o = n.template || ks(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config,
          { delimiters: c, compilerOptions: u } = n,
          a = X(X({ isCustomElement: i, delimiters: c }, r), u);
        n.render = wn(o, a);
      }
    }
    e.render = n.render || he;
  }
  st(e), nt(), er(e), ot(), De();
}
function Cr(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, s) {
        return oe(e, "get", "$attrs"), t[s];
      },
    }))
  );
}
function Pr(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return Cr(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ss(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(to(Qn(e.exposed)), {
        get(t, s) {
          if (s in t) return t[s];
          if (s in at) return at[s](e);
        },
        has(t, s) {
          return s in t || s in at;
        },
      }))
    );
}
function $r(e) {
  return M(e) && "__vccOpts" in e;
}
const ht = (e, t) => Ii(e, t, yt),
  Ar = Symbol.for("v-scx"),
  Mr = () => jt(Ar),
  Fr = "3.3.4",
  Rr = "http://www.w3.org/2000/svg",
  Ue = typeof document < "u" ? document : null,
  En = Ue && Ue.createElement("template"),
  Sr = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, n) => {
      const o = t
        ? Ue.createElementNS(Rr, e)
        : Ue.createElement(e, s ? { is: s } : void 0);
      return (
        e === "select" &&
          n &&
          n.multiple != null &&
          o.setAttribute("multiple", n.multiple),
        o
      );
    },
    createText: (e) => Ue.createTextNode(e),
    createComment: (e) => Ue.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ue.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, s, n, o, i) {
      const r = s ? s.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), s),
            !(o === i || !(o = o.nextSibling));

        );
      else {
        En.innerHTML = n ? `<svg>${e}</svg>` : e;
        const c = En.content;
        if (n) {
          const u = c.firstChild;
          for (; u.firstChild; ) c.appendChild(u.firstChild);
          c.removeChild(u);
        }
        t.insertBefore(c, s);
      }
      return [
        r ? r.nextSibling : t.firstChild,
        s ? s.previousSibling : t.lastChild,
      ];
    },
  };
function Nr(e, t, s) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : s
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function jr(e, t, s) {
  const n = e.style,
    o = V(s);
  if (s && !o) {
    if (t && !V(t)) for (const i in t) s[i] == null && Cs(n, i, "");
    for (const i in s) Cs(n, i, s[i]);
  } else {
    const i = n.display;
    o ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"),
      "_vod" in e && (n.display = i);
  }
}
const In = /\s*!important$/;
function Cs(e, t, s) {
  if (P(s)) s.forEach((n) => Cs(e, t, n));
  else if ((s == null && (s = ""), t.startsWith("--"))) e.setProperty(t, s);
  else {
    const n = Hr(e, t);
    In.test(s)
      ? e.setProperty(We(n), s.replace(In, ""), "important")
      : (e[n] = s);
  }
}
const On = ["Webkit", "Moz", "ms"],
  hs = {};
function Hr(e, t) {
  const s = hs[t];
  if (s) return s;
  let n = Ge(t);
  if (n !== "filter" && n in e) return (hs[t] = n);
  n = Hn(n);
  for (let o = 0; o < On.length; o++) {
    const i = On[o] + n;
    if (i in e) return (hs[t] = i);
  }
  return t;
}
const Tn = "http://www.w3.org/1999/xlink";
function Lr(e, t, s, n, o) {
  if (n && t.startsWith("xlink:"))
    s == null
      ? e.removeAttributeNS(Tn, t.slice(6, t.length))
      : e.setAttributeNS(Tn, t, s);
  else {
    const i = ko(t);
    s == null || (i && !Ln(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : s);
  }
}
function Ur(e, t, s, n, o, i, r) {
  if (t === "innerHTML" || t === "textContent") {
    n && r(n, o, i), (e[t] = s ?? "");
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
    e._value = s;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value,
      m = s ?? "";
    a !== m && (e.value = m), s == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (s = Ln(s))
      : s == null && a === "string"
      ? ((s = ""), (u = !0))
      : a === "number" && ((s = 0), (u = !0));
  }
  try {
    e[t] = s;
  } catch {}
  u && e.removeAttribute(t);
}
function Ye(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Kr(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
function Br(e, t, s, n, o = null) {
  const i = e._vei || (e._vei = {}),
    r = i[t];
  if (n && r) r.value = n;
  else {
    const [c, u] = Dr(t);
    if (n) {
      const a = (i[t] = zr(n, o));
      Ye(e, c, a, u);
    } else r && (Kr(e, c, r, u), (i[t] = void 0));
  }
}
const Cn = /(?:Once|Passive|Capture)$/;
function Dr(e) {
  let t;
  if (Cn.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Cn)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : We(e.slice(2)), t];
}
let ps = 0;
const kr = Promise.resolve(),
  Wr = () => ps || (kr.then(() => (ps = 0)), (ps = Date.now()));
function zr(e, t) {
  const s = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= s.attached) return;
    pe(qr(n, s.value), t, 5, [n]);
  };
  return (s.value = e), (s.attached = Wr()), s;
}
function qr(e, t) {
  if (P(t)) {
    const s = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        s.call(e), (e._stopped = !0);
      }),
      t.map((n) => (o) => !o._stopped && n && n(o))
    );
  } else return t;
}
const Pn = /^on[a-z]/,
  Jr = (e, t, s, n, o = !1, i, r, c, u) => {
    t === "class"
      ? Nr(e, n, o)
      : t === "style"
      ? jr(e, s, n)
      : Wt(t)
      ? $s(t) || Br(e, t, s, n, r)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Yr(e, t, n, o)
        )
      ? Ur(e, t, n, i, r, c, u)
      : (t === "true-value"
          ? (e._trueValue = n)
          : t === "false-value" && (e._falseValue = n),
        Lr(e, t, n, o));
  };
function Yr(e, t, s, n) {
  return n
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Pn.test(t) && M(s))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Pn.test(t) && V(s))
    ? !1
    : t in e;
}
const $n = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (s) => St(t, s) : t;
};
function Vr(e) {
  e.target.composing = !0;
}
function An(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Zr = {
    created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
      e._assign = $n(o);
      const i = n || (o.props && o.props.type === "number");
      Ye(e, t ? "change" : "input", (r) => {
        if (r.target.composing) return;
        let c = e.value;
        s && (c = c.trim()), i && (c = _s(c)), e._assign(c);
      }),
        s &&
          Ye(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (Ye(e, "compositionstart", Vr),
          Ye(e, "compositionend", An),
          Ye(e, "change", An));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: s, trim: n, number: o } },
      i
    ) {
      if (
        ((e._assign = $n(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (s ||
              (n && e.value.trim() === t) ||
              ((o || e.type === "number") && _s(e.value) === t))))
      )
        return;
      const r = t ?? "";
      e.value !== r && (e.value = r);
    },
  },
  Xr = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Qr = (e, t) => (s) => {
    if (!("key" in s)) return;
    const n = We(s.key);
    if (t.some((o) => o === n || Xr[o] === n)) return e(s);
  },
  Gr = X({ patchProp: Jr }, Sr);
let Mn;
function el() {
  return Mn || (Mn = hr(Gr));
}
const tl = (...e) => {
  const t = el().createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = (n) => {
      const o = sl(n);
      if (!o) return;
      const i = t._component;
      !M(i) && !i.render && !i.template && (i.template = o.innerHTML),
        (o.innerHTML = "");
      const r = s(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        r
      );
    }),
    t
  );
};
function sl(e) {
  return V(e) ? document.querySelector(e) : e;
}
const nl = "449aa65b2dd4d9bacf7a54bb60433592",
  ol = "https://api.openweathermap.org/data/2.5/weather",
  il = 0.750062,
  $o = (e) => (e == null ? "" : e.charAt(0).toLocaleUpperCase() + e.slice(1)),
  rl = (e) => Math.round(e * il),
  Fn = (e) =>
    new Date(e * 1e3).toLocaleTimeString("ru-RU", {
      timeZone: "Atlantic/Reykjavik",
    });
const Js = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [n, o] of t) s[n] = o;
    return s;
  },
  ll = { class: "summary" },
  cl = { class: "weather" },
  fl = { class: "temp" },
  ul = { class: "weather-desc text-block" },
  al = { class: "city text-block" },
  dl = { class: "date text-block" },
  hl = {
    __name: "WeatherSummary",
    props: { weatherInfo: { type: [Object, null], required: !0 } },
    setup(e) {
      const t = new Date().toLocaleString("en-EN", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (s, n) => {
        var o, i, r, c, u, a, m;
        return (
          re(),
          xe("div", ll, [
            p(
              "div",
              {
                style: Jt(
                  `background-image: url('./weather-main/${
                    (o = e.weatherInfo) == null
                      ? void 0
                      : o.weather[0].description
                  }.png');`
                ),
                class: "pic-main",
              },
              null,
              4
            ),
            p("div", cl, [
              p(
                "div",
                fl,
                Z(
                  Math.round(
                    (r = (i = e.weatherInfo) == null ? void 0 : i.main) == null
                      ? void 0
                      : r.temp
                  )
                ) + " °C ",
                1
              ),
              p(
                "div",
                ul,
                Z(
                  mt($o)(
                    (c = e.weatherInfo) == null
                      ? void 0
                      : c.weather[0].description
                  )
                ),
                1
              ),
            ]),
            p(
              "div",
              al,
              Z((u = e.weatherInfo) == null ? void 0 : u.name) +
                ", " +
                Z(
                  (m = (a = e.weatherInfo) == null ? void 0 : a.sys) == null
                    ? void 0
                    : m.country
                ),
              1
            ),
            p("div", dl, Z(mt(t)), 1),
          ])
        );
      };
    },
  },
  pl = Js(hl, [["__scopeId", "data-v-67cd0822"]]);
const B = (e) => (lo("data-v-a88d6e1f"), (e = e()), co(), e),
  _l = { class: "section highlights" },
  ml = B(() => p("div", { class: "title" }, " Today's Highlights ", -1)),
  gl = { class: "highlights-wrapper" },
  bl = { class: "highlight" },
  vl = { class: "card" },
  xl = B(() => p("div", { class: "card-title" }, " Wind ", -1)),
  yl = B(() => p("div", { class: "card-pic card-pic--wind" }, null, -1)),
  wl = { class: "card-info" },
  El = { class: "card-justify" },
  Il = { class: "info-main" },
  Ol = { class: "info-main-num" },
  Tl = B(() => p("div", { class: "info-main-text" }, " m/s ", -1)),
  Cl = { class: "info-main" },
  Pl = { class: "info-main-num" },
  $l = B(() => p("div", { class: "info-main-text" }, " deg ", -1)),
  Al = { class: "card-small" },
  Ml = B(() => p("div", { class: "card-small-title" }, " Wind gusts ", -1)),
  Fl = { class: "card-small-info" },
  Rl = { key: 0, class: "card-small-data" },
  Sl = { class: "info-main-num" },
  Nl = B(() => p("div", { class: "info-main-text" }, " m/s ", -1)),
  jl = B(() =>
    p(
      "div",
      { class: "card-small-hint" },
      [
        p("div", { class: "card-small-pic card-small-pic--wind" }),
        p("div", { class: "card-small-text text-egorova" }, [
          xt(" Learn "),
          p(
            "a",
            {
              href: "https://www.windy.com/articles/weather-phenomena-what-s-the-difference-between-sustained-winds-and-wind-gusts-10390?satellite,7.787,115.115,5",
              target: "_blank",
            },
            "more"
          ),
          xt(" about gusts "),
        ]),
      ],
      -1
    )
  ),
  Hl = { class: "highlight" },
  Ll = { class: "card" },
  Ul = B(() => p("div", { class: "card-title" }, " Pressure ", -1)),
  Kl = B(() => p("div", { class: "card-pic card-pic--pressure" }, null, -1)),
  Bl = { class: "card-info" },
  Dl = { class: "card-centered" },
  kl = { class: "info-main" },
  Wl = { class: "info-main-num" },
  zl = B(() => p("div", { class: "info-main-text" }, " mm ", -1)),
  ql = { class: "card-small" },
  Jl = B(() => p("div", { class: "card-small-title" }, " Feels like ", -1)),
  Yl = { class: "card-small-info" },
  Vl = { class: "card-small-data" },
  Zl = { class: "info-main-num" },
  Xl = B(() => p("div", { class: "info-main-text" }, " °C ", -1)),
  Ql = B(() =>
    p(
      "div",
      { class: "card-small-hint" },
      [
        p("div", {
          class:
            "card-small-pic card-small-pic--margin card-small-pic--pressure",
        }),
        p(
          "div",
          { class: "card-small-text" },
          " How hot or cold it really feels "
        ),
      ],
      -1
    )
  ),
  Gl = { class: "highlight" },
  ec = { class: "card" },
  tc = B(() => p("div", { class: "card-title" }, " Sunrise and sunset ", -1)),
  sc = B(() => p("div", { class: "card-pic card-pic--sun" }, null, -1)),
  nc = { class: "card-info" },
  oc = { class: "states" },
  ic = { class: "state" },
  rc = B(() => p("div", { class: "state-pic" }, null, -1)),
  lc = B(() => p("div", { class: "state-title" }, " Sunrise ", -1)),
  cc = { class: "state-time" },
  fc = { class: "state" },
  uc = B(() => p("div", { class: "state-pic state-pic--flipped" }, null, -1)),
  ac = B(() => p("div", { class: "state-title" }, " Sunset ", -1)),
  dc = { class: "state-time" },
  hc = { class: "card-small" },
  pc = B(() => p("div", { class: "card-small-title" }, " Cloudiness ", -1)),
  _c = { class: "card-small-info" },
  mc = { class: "card-small-data" },
  gc = { class: "info-main-num" },
  bc = B(() => p("div", { class: "info-main-text" }, " % ", -1)),
  vc = B(() =>
    p(
      "div",
      { class: "card-small-hint" },
      [
        p("div", { class: "card-small-pic card-small-pic--sun" }),
        p(
          "div",
          { class: "card-small-text" },
          " The sky fraction obscured by clouds "
        ),
      ],
      -1
    )
  ),
  xc = {
    __name: "Highlights",
    props: { weatherInfo: { type: [Object, null], required: !0 } },
    setup(e) {
      const t = e,
        s = ht(() => {
          var i;
          return (i = t.weatherInfo) == null ? void 0 : i.timezone;
        }),
        n = ht(() => {
          var i, r;
          return Fn(
            ((r = (i = t.weatherInfo) == null ? void 0 : i.sys) == null
              ? void 0
              : r.sunrise) + s.value
          );
        }),
        o = ht(() => {
          var i, r;
          return Fn(
            ((r = (i = t.weatherInfo) == null ? void 0 : i.sys) == null
              ? void 0
              : r.sunset) + s.value
          );
        });
      return (i, r) => {
        var c, u, a, m, y, E, $, K, F, W, q, J, Y, A;
        return (
          re(),
          xe("div", _l, [
            ml,
            p("div", gl, [
              p("div", bl, [
                p("div", vl, [
                  xl,
                  yl,
                  p("div", wl, [
                    p("div", El, [
                      p("div", Il, [
                        p(
                          "div",
                          Ol,
                          Z(
                            (u =
                              (c = e.weatherInfo) == null ? void 0 : c.wind) ==
                              null
                              ? void 0
                              : u.speed
                          ),
                          1
                        ),
                        Tl,
                      ]),
                      p("div", Cl, [
                        p(
                          "div",
                          Pl,
                          Z(
                            (m =
                              (a = e.weatherInfo) == null ? void 0 : a.wind) ==
                              null
                              ? void 0
                              : m.deg
                          ),
                          1
                        ),
                        $l,
                      ]),
                    ]),
                  ]),
                ]),
                p("div", Al, [
                  Ml,
                  p("div", Fl, [
                    (E = (y = e.weatherInfo) == null ? void 0 : y.wind) !=
                      null && E.gust
                      ? (re(),
                        xe("div", Rl, [
                          p(
                            "div",
                            Sl,
                            Z(
                              Math.round(
                                (K =
                                  ($ = e.weatherInfo) == null
                                    ? void 0
                                    : $.wind) == null
                                  ? void 0
                                  : K.gust
                              )
                            ),
                            1
                          ),
                          Nl,
                        ]))
                      : Lt("", !0),
                    jl,
                  ]),
                ]),
              ]),
              p("div", Hl, [
                p("div", Ll, [
                  Ul,
                  Kl,
                  p("div", Bl, [
                    p("div", Dl, [
                      p("div", kl, [
                        p(
                          "div",
                          Wl,
                          Z(
                            mt(rl)(
                              (W =
                                (F = e.weatherInfo) == null
                                  ? void 0
                                  : F.main) == null
                                ? void 0
                                : W.pressure
                            )
                          ),
                          1
                        ),
                        zl,
                      ]),
                    ]),
                  ]),
                ]),
                p("div", ql, [
                  Jl,
                  p("div", Yl, [
                    p("div", Vl, [
                      p(
                        "div",
                        Zl,
                        Z(
                          Math.round(
                            (J =
                              (q = e.weatherInfo) == null ? void 0 : q.main) ==
                              null
                              ? void 0
                              : J.feels_like
                          )
                        ),
                        1
                      ),
                      Xl,
                    ]),
                    Ql,
                  ]),
                ]),
              ]),
              p("div", Gl, [
                p("div", ec, [
                  tc,
                  sc,
                  p("div", nc, [
                    p("div", oc, [
                      p("div", ic, [rc, lc, p("div", cc, Z(n.value), 1)]),
                      p("div", fc, [uc, ac, p("div", dc, Z(o.value), 1)]),
                    ]),
                  ]),
                ]),
                p("div", hc, [
                  pc,
                  p("div", _c, [
                    p("div", mc, [
                      p(
                        "div",
                        gc,
                        Z(
                          (A =
                            (Y = e.weatherInfo) == null ? void 0 : Y.clouds) ==
                            null
                            ? void 0
                            : A.all
                        ),
                        1
                      ),
                      bc,
                    ]),
                    vc,
                  ]),
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  },
  yc = Js(xc, [["__scopeId", "data-v-a88d6e1f"]]),
  wc = { class: "section-bottom right" },
  Ec = { class: "block-bottom" },
  Ic = { class: "block-bottom-inner" },
  Oc = p("div", { class: "block-bottom-pic pic-coords" }, null, -1),
  Tc = { class: "block-bottom-texts" },
  Cc = { class: "block-bottom-text-block" },
  Pc = { class: "block-bottom-text-block-title" },
  $c = p(
    "div",
    { class: "block-bottom-text-block-desc" },
    " Longitude measures distance east or west of the prime meridian. ",
    -1
  ),
  Ac = { class: "block-bottom-text-block" },
  Mc = { class: "block-bottom-text-block-title" },
  Fc = p(
    "div",
    { class: "block-bottom-text-block-desc" },
    " Latitude lines start at the equator (0 degrees latitude) and run east and west, parallel to the equator. ",
    -1
  ),
  Rc = {
    __name: "Coords",
    props: { coord: { type: Object, required: !0 } },
    setup(e) {
      return (t, s) => {
        var n, o;
        return (
          re(),
          xe("section", wc, [
            p("div", Ec, [
              p("div", Ic, [
                Oc,
                p("div", Tc, [
                  p("div", Cc, [
                    p(
                      "div",
                      Pc,
                      " Longitude: " +
                        Z((n = e.coord) == null ? void 0 : n.lon),
                      1
                    ),
                    $c,
                  ]),
                  p("div", Ac, [
                    p(
                      "div",
                      Mc,
                      " Latitude: " + Z((o = e.coord) == null ? void 0 : o.lat),
                      1
                    ),
                    Fc,
                  ]),
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  },
  Sc = { class: "section-bottom" },
  Nc = { class: "block-bottom" },
  jc = { class: "block-bottom-inner" },
  Hc = p("div", { class: "block-bottom-pic pic-humidity" }, null, -1),
  Lc = { class: "block-bottom-texts" },
  Uc = { class: "block-bottom-text-block" },
  Kc = { class: "block-bottom-text-block-title" },
  Bc = p(
    "div",
    { class: "block-bottom-text-block-desc" },
    [
      xt(
        " Humidity is the concentration of water vapor present in the air. Water vapor, the gaseous state of water, is generally invisible to the human eye. "
      ),
      p("br"),
      p("br"),
      xt(
        " The same amount of water vapor results in higher relative humidity in cool air than warm air. "
      ),
    ],
    -1
  ),
  Dc = {
    __name: "Humidity",
    props: { humidity: { type: Number, required: !0 } },
    setup(e) {
      return (t, s) => (
        re(),
        xe("section", Sc, [
          p("div", Nc, [
            p("div", jc, [
              Hc,
              p("div", Lc, [
                p("div", Uc, [
                  p("div", Kc, " Humidity: " + Z(e.humidity) + " % ", 1),
                  Bc,
                ]),
              ]),
            ]),
          ]),
        ])
      );
    },
  };
const kc = (e) => (lo("data-v-5cecd7a4"), (e = e()), co(), e),
  Wc = { class: "page" },
  zc = ["src"],
  qc = { class: "main" },
  Jc = { class: "container" },
  Yc = { class: "laptop" },
  Vc = { class: "sections" },
  Zc = { class: "info" },
  Xc = { class: "city-inner" },
  Qc = ["onKeyup"],
  Gc = { key: 1, class: "error" },
  ef = kc(() =>
    p("div", { class: "error-title" }, " Oops! Something went wrong ", -1)
  ),
  tf = { key: 0, class: "error-message" },
  sf = { key: 0, class: "section section-right" },
  nf = { key: 0, class: "sections" },
  of = {
    __name: "App",
    setup(e) {
      const t = cs("Paris"),
        s = cs(null),
        n = ht(() => {
          var c;
          return ((c = s.value) == null ? void 0 : c.cod) !== 200;
        }),
        o = cs(""),
        i = async () => {
          try {
            const u = await (
              await fetch(`${ol}?q=${t.value}&units=metric&appid=${nl}`)
            ).json();
            (s.value = u), r(s.value.weather[0].main);
          } catch {
            n.value = !0;
          }
        },
        r = (c) => {
          (c = c.toLowerCase()),
            c === "clear"
              ? (o.value = "./videos/clear sky.mp4")
              : c === "clouds"
              ? (o.value = "./videos/clouds.mp4")
              : c === "rain"
              ? (o.value = "./videos/rain.mp4")
              : c === "snow"
              ? (o.value = "./videos/snow.mp4")
              : (o.value = "./videos/trees.mp4");
        };
      return (
        po(i),
        (c, u) => {
          var a, m;
          return (
            re(),
            xe("div", Wc, [
              p(
                "video",
                {
                  src: o.value,
                  autoplay: "",
                  loop: "",
                  muted: "",
                  playsinline: "",
                  class: "video-background",
                },
                null,
                8,
                zc
              ),
              p("main", qc, [
                p("div", Jc, [
                  p("div", Yc, [
                    p("div", Vc, [
                      p(
                        "section",
                        {
                          class: Yt([
                            "section",
                            "section-left",
                            { "section-error": n.value },
                          ]),
                        },
                        [
                          p("div", Zc, [
                            p("div", Xc, [
                              Ki(
                                p(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      u[0] || (u[0] = (y) => (t.value = y)),
                                    type: "text",
                                    class: "search",
                                    onKeyup: Qr(i, ["enter"]),
                                  },
                                  null,
                                  40,
                                  Qc
                                ),
                                [[Zr, t.value]]
                              ),
                            ]),
                            n.value
                              ? (re(),
                                xe("div", Gc, [
                                  ef,
                                  (a = s.value) != null && a.message
                                    ? (re(),
                                      xe(
                                        "div",
                                        tf,
                                        Z(
                                          mt($o)(
                                            (m = s.value) == null
                                              ? void 0
                                              : m.message
                                          )
                                        ),
                                        1
                                      ))
                                    : Lt("", !0),
                                ]))
                              : (re(),
                                Oo(
                                  pl,
                                  { key: 0, weatherInfo: s.value },
                                  null,
                                  8,
                                  ["weatherInfo"]
                                )),
                          ]),
                        ],
                        2
                      ),
                      n.value
                        ? Lt("", !0)
                        : (re(),
                          xe("section", sf, [
                            le(yc, { weatherInfo: s.value }, null, 8, [
                              "weatherInfo",
                            ]),
                          ])),
                    ]),
                    n.value
                      ? Lt("", !0)
                      : (re(),
                        xe("div", nf, [
                          le(Rc, { coord: s.value.coord }, null, 8, ["coord"]),
                          le(Dc, { humidity: s.value.main.humidity }, null, 8, [
                            "humidity",
                          ]),
                        ])),
                  ]),
                ]),
              ]),
            ])
          );
        }
      );
    },
  },
  rf = Js(of, [["__scopeId", "data-v-5cecd7a4"]]);
tl(rf).mount("#app");
