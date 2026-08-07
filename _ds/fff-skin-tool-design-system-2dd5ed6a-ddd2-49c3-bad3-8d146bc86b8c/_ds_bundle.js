/* @ds-bundle: {"format":4,"namespace":"FFFSkinToolDesignSystem_2dd5ed","components":[{"name":"DiamondPill","sourcePath":"components/catalog/DiamondPill.jsx"},{"name":"ItemCard","sourcePath":"components/catalog/ItemCard.jsx"},{"name":"RARITIES","sourcePath":"components/catalog/RarityBadge.jsx"},{"name":"RarityBadge","sourcePath":"components/catalog/RarityBadge.jsx"},{"name":"StatBar","sourcePath":"components/catalog/StatBar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"ICONS","sourcePath":"components/icons/Icon.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/catalog/DiamondPill.jsx":"2c8397a31ced","components/catalog/ItemCard.jsx":"30989dff803b","components/catalog/RarityBadge.jsx":"c161c5ecff2a","components/catalog/StatBar.jsx":"30fd52f91d5b","components/core/Badge.jsx":"6e2067664ced","components/core/Button.jsx":"49947bd2bc16","components/core/Card.jsx":"3b87ad8858ab","components/core/IconButton.jsx":"a5d4e33a9aef","components/core/Tag.jsx":"60ede6e24f15","components/feedback/Banner.jsx":"484fae50a2a6","components/feedback/EmptyState.jsx":"aeed46e3e811","components/feedback/ProgressBar.jsx":"ed7c4fbd46e2","components/forms/Input.jsx":"534cc2513d3d","components/forms/SearchField.jsx":"b5ee7c0c698a","components/forms/SegmentedControl.jsx":"3636c8b343db","components/forms/Switch.jsx":"314100569a7d","components/icons/Icon.jsx":"b5794d32c449","components/navigation/AppHeader.jsx":"f7bfd931ff5f","components/navigation/TabBar.jsx":"6ceb42cfd174","ui_kits/fff-app/App.jsx":"39132a7930ac","ui_kits/fff-app/CatalogScreen.jsx":"2cf45b154edb","ui_kits/fff-app/DetailSheet.jsx":"de110db0a951","ui_kits/fff-app/DiamondScreen.jsx":"84cc17a94352","ui_kits/fff-app/HomeScreen.jsx":"45529b50d387","ui_kits/fff-app/MeScreen.jsx":"d3a4deb8dade","ui_kits/fff-app/data.js":"33c714b1384b","ui_kits/fff-app/parts.jsx":"c324f21577dc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FFFSkinToolDesignSystem_2dd5ed = window.FFFSkinToolDesignSystem_2dd5ed || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/catalog/RarityBadge.jsx
try { (() => {
const RARITIES = {
  common: {
    label: 'Common',
    color: 'var(--rarity-common)'
  },
  rare: {
    label: 'Rare',
    color: 'var(--rarity-rare)'
  },
  epic: {
    label: 'Epic',
    color: 'var(--rarity-epic)'
  },
  legendary: {
    label: 'Legendary',
    color: 'var(--rarity-legendary)'
  },
  mythic: {
    label: 'Mythic',
    color: 'var(--rarity-mythic)'
  }
};
function hexToRgba(v, a) {
  // supports var() by falling back to color-mix
  return v.startsWith('var') ? `color-mix(in srgb, ${v} ${a * 100}%, transparent)` : v;
}

/** Rarity chip for skins/pets. Sharp shard corner on one side for the brand's angular motif. */
function RarityBadge({
  rarity = 'common',
  size = 'md',
  style
}) {
  const r = RARITIES[rarity] || RARITIES.common;
  const h = size === 'sm' ? 18 : 22;
  const fs = size === 'sm' ? 9 : 10;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      height: h,
      padding: '0 9px 0 8px',
      fontFamily: 'var(--font-display)',
      fontSize: fs,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      lineHeight: 1,
      color: r.color,
      background: `color-mix(in srgb, ${r.color} 16%, transparent)`,
      border: `1px solid color-mix(in srgb, ${r.color} 55%, transparent)`,
      clipPath: 'polygon(7px 0,100% 0,100% 100%,0 100%,0 7px)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: r.color,
      transform: 'rotate(45deg)',
      flexShrink: 0
    }
  }), r.label);
}
Object.assign(__ds_scope, { RARITIES, RarityBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/RarityBadge.jsx", error: String((e && e.message) || e) }); }

// components/catalog/StatBar.jsx
try { (() => {
/** Labeled stat meter for pet/skin attributes (e.g. Rarity, Popularity, Value). */
function StatBar({
  label,
  value,
  max = 100,
  display,
  tone = 'crystal',
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    crystal: 'var(--grad-crystal)',
    premium: 'var(--grad-premium)',
    violet: 'var(--grad-mythic)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "fff-num",
    style: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, display ?? value)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--r-pill)',
      background: 'var(--ink-800)',
      border: '1px solid var(--border)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fills[tone],
      borderRadius: 'var(--r-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { StatBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/StatBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    bg: 'rgba(255,255,255,0.07)',
    fg: 'var(--text-secondary)',
    bd: 'var(--border-strong)'
  },
  brand: {
    bg: 'rgba(31,205,245,0.14)',
    fg: 'var(--crystal-300)',
    bd: 'var(--line-crystal)'
  },
  premium: {
    bg: 'rgba(245,184,51,0.14)',
    fg: 'var(--gold-300)',
    bd: 'rgba(245,184,51,0.4)'
  },
  success: {
    bg: 'rgba(51,224,160,0.14)',
    fg: 'var(--success)',
    bd: 'rgba(51,224,160,0.4)'
  },
  danger: {
    bg: 'rgba(255,92,119,0.14)',
    fg: 'var(--danger)',
    bd: 'rgba(255,92,119,0.4)'
  },
  violet: {
    bg: 'rgba(138,92,255,0.16)',
    fg: 'var(--violet-400)',
    bd: 'rgba(138,92,255,0.4)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  solid = false,
  icon,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      height: '22px',
      padding: '0 9px',
      borderRadius: 'var(--r-sm)',
      fontFamily: 'var(--font-display)',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      lineHeight: 1,
      background: solid ? t.fg : t.bg,
      color: solid ? 'var(--ink-950)' : t.fg,
      border: `1px solid ${solid ? 'transparent' : t.bd}`,
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  letterSpacing: '0.02em',
  border: '1px solid transparent',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
  userSelect: 'none',
  textDecoration: 'none'
};
const sizes = {
  sm: {
    height: '36px',
    padding: '0 14px',
    fontSize: '13px',
    borderRadius: 'var(--r-sm)'
  },
  md: {
    height: '44px',
    padding: '0 20px',
    fontSize: '15px',
    borderRadius: 'var(--r-control)'
  },
  lg: {
    height: '52px',
    padding: '0 28px',
    fontSize: '16px',
    borderRadius: 'var(--r-control)'
  }
};
const variants = {
  primary: {
    background: 'var(--grad-crystal)',
    color: 'var(--on-brand)',
    boxShadow: '0 4px 16px rgba(31,205,245,0.28)'
  },
  premium: {
    background: 'var(--grad-premium)',
    color: 'var(--on-premium)',
    boxShadow: '0 4px 16px rgba(245,184,51,0.28)'
  },
  secondary: {
    background: 'var(--surface-3)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderColor: 'transparent'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-brand)',
    borderColor: 'var(--line-crystal)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  disabled = false,
  fullWidth = false,
  as = 'button',
  style,
  ...rest
}) {
  const Tag = as;
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: s,
    disabled: as === 'button' ? disabled : undefined,
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(var(--press-scale))';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = '';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
    }
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Base surface container. Elevation via lighter surface + hairline, not heavy shadow. */
function Card({
  children,
  elevated = false,
  interactive = false,
  glow,
  padding = '16px',
  style,
  ...rest
}) {
  const glowMap = {
    crystal: 'var(--glow-crystal)',
    gold: 'var(--glow-gold)',
    violet: 'var(--glow-violet)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--grad-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-card)',
      padding,
      boxShadow: glow ? glowMap[glow] : elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.borderColor = 'var(--line-crystal)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.borderColor = 'var(--border)';
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 36,
  md: 44,
  lg: 52
};
const variants = {
  solid: {
    background: 'var(--surface-3)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent'
  },
  brand: {
    background: 'var(--grad-crystal)',
    color: 'var(--on-brand)',
    border: '1px solid transparent'
  },
  glass: {
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    backdropFilter: 'blur(8px)'
  }
};
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  rounded = false,
  disabled = false,
  style,
  ...rest
}) {
  const d = sizes[size];
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      borderRadius: rounded ? 'var(--r-pill)' : 'var(--r-control)',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'transform var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out)',
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(0.92)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = '';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Selectable filter chip (skins/pets category filters, sort, etc). */
function Tag({
  children,
  active = false,
  icon,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      height: '34px',
      padding: '0 14px',
      borderRadius: 'var(--r-pill)',
      fontFamily: 'var(--font-display)',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.01em',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all var(--dur-fast) var(--ease-out)',
      background: active ? 'rgba(31,205,245,0.14)' : 'var(--surface-2)',
      color: active ? 'var(--crystal-300)' : 'var(--text-secondary)',
      border: `1px solid ${active ? 'var(--line-crystal)' : 'var(--border)'}`,
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
const tones = {
  info: {
    bg: 'rgba(31,205,245,0.1)',
    bd: 'var(--line-crystal)',
    fg: 'var(--crystal-300)'
  },
  premium: {
    bg: 'rgba(245,184,51,0.1)',
    bd: 'rgba(245,184,51,0.4)',
    fg: 'var(--gold-300)'
  },
  success: {
    bg: 'rgba(51,224,160,0.1)',
    bd: 'rgba(51,224,160,0.4)',
    fg: 'var(--success)'
  },
  danger: {
    bg: 'rgba(255,92,119,0.1)',
    bd: 'rgba(255,92,119,0.4)',
    fg: 'var(--danger)'
  }
};

/** Inline informational banner — tips, alerts, guide callouts. */
function Banner({
  tone = 'info',
  icon,
  title,
  children,
  action,
  style
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      padding: '14px 16px',
      borderRadius: 'var(--r-md)',
      background: t.bg,
      border: `1px solid ${t.bd}`,
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg,
      display: 'flex',
      flexShrink: 0,
      marginTop: '1px'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--text-primary)',
      marginBottom: children ? '3px' : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, children)), action);
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/** Empty / zero-result state for catalogs, favorites, search. */
function EmptyState({
  icon,
  title,
  description,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
      padding: '40px 24px',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--r-lg)',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      color: 'var(--text-tertiary)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '18px',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '14px',
      color: 'var(--text-tertiary)',
      maxWidth: 280,
      lineHeight: 1.5
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '4px'
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
/** Progress / meter bar. Used for diamond goals, download progress, stat fills. */
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'crystal',
  size = 'md',
  showLabel = false,
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const h = size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
  const fills = {
    crystal: 'var(--grad-crystal)',
    premium: 'var(--grad-premium)',
    violet: 'var(--grad-mythic)',
    success: 'linear-gradient(90deg,#33E0A0,#12A9CE)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: h,
      borderRadius: 'var(--r-pill)',
      background: 'var(--ink-800)',
      border: '1px solid var(--border)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fills[tone],
      borderRadius: 'var(--r-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    className: "fff-num",
    style: {
      fontSize: '12px',
      color: 'var(--text-secondary)',
      minWidth: 38,
      textAlign: 'right'
    }
  }, Math.round(pct), "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--crystal-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    className: "fff-label",
    style: {
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      height: '46px',
      padding: '0 14px',
      borderRadius: 'var(--r-control)',
      background: 'var(--ink-900)',
      border: `1px solid ${borderColor}`,
      boxShadow: focus ? '0 0 0 3px rgba(31,205,245,0.15)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      display: 'flex'
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'none',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      ...style
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      display: 'flex'
    }
  }, trailingIcon)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: error ? 'var(--danger)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/** Segmented control — top-level view switcher (e.g. Skins / Pets / Bundles). */
function SegmentedControl({
  options,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4px',
      padding: '4px',
      borderRadius: 'var(--r-control)',
      background: 'var(--ink-900)',
      border: '1px solid var(--border)',
      ...style
    }
  }, options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => onChange && onChange(val),
      style: {
        flex: 1,
        height: '38px',
        padding: '0 14px',
        borderRadius: 'var(--r-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        border: 'none',
        whiteSpace: 'nowrap',
        transition: 'all var(--dur-fast) var(--ease-out)',
        background: active ? 'var(--grad-crystal)' : 'transparent',
        color: active ? 'var(--on-brand)' : 'var(--text-secondary)',
        boxShadow: active ? '0 2px 10px rgba(31,205,245,0.25)' : 'none'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** On/off toggle. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: '46px',
      height: '26px',
      borderRadius: 'var(--r-pill)',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      flexShrink: 0,
      padding: 0,
      background: checked ? 'var(--grad-crystal)' : 'var(--ink-700)',
      boxShadow: checked ? '0 0 12px rgba(31,205,245,0.35)' : 'inset 0 0 0 1px var(--border-strong)',
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '3px',
      left: checked ? '23px' : '3px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Curated Lucide (ISC) 24px outline paths — the FFF Skin Tool icon set.
 * SUBSTITUTION: no brand glyphs were provided; Lucide is the chosen system
 * (2px stroke, rounded caps) as the closest premium/technical match. */
const ICONS = {
  search: 'M21 21l-4.34-4.34M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  home: 'M3 9.5 12 3l9 6.5M5 21V11l7-5 7 5v10H5Z',
  gem: 'M6 3h12l4 6-10 12L2 9l4-6ZM2 9h20M12 3 8 9l4 12 4-12-4-6Z',
  heart: 'M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1Z',
  star: 'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3Z',
  crown: 'M3 7l4 4 5-7 5 7 4-4v10H3V7ZM3 19h18',
  paw: 'M11 14c-2 0-3.5 1.8-3.5 3.4 0 1.2 1 2 2.2 2 .9 0 1.4-.5 2.3-.5s1.4.5 2.3.5c1.2 0 2.2-.8 2.2-2C16.5 15.8 15 14 13 14h-2ZM6.5 7.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM17.5 7.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM10 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM14 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  filter: 'M3 5h18l-7 8v6l-4 2v-8L3 5Z',
  sparkles: 'M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5L12 3ZM19 14l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7L19 14Z',
  chevronRight: 'M9 6l6 6-6 6',
  chevronLeft: 'M15 6l-6 6 6 6',
  chevronDown: 'M6 9l6 6 6-6',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9ZM13.7 21a2 2 0 0 1-3.4 0',
  user: 'M20 21a8 8 0 1 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  bookOpen: 'M12 7v14M12 7C10.5 5.5 8 5 3 5v13c5 0 7.5.5 9 2 1.5-1.5 4-2 9-2V5c-5 0-7.5.5-9 2Z',
  zap: 'M13 2 3 14h8l-1 8 10-12h-8l1-8Z',
  lock: 'M5 11h14v10H5V11ZM8 11V7a4 4 0 0 1 8 0v4',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4M12 8h.01',
  grid: 'M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  copy: 'M9 9h11v11H9V9ZM5 15H4V4h11v1',
  flame: 'M12 2s5 4 5 9a5 5 0 0 1-10 0c0-1.5.7-2.8 1.5-3.5C8.5 10 9 12 9 12s-.5-4 3-10Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'
};
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
  className,
  ...rest
}) {
  const d = ICONS[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true"
  }, rest), d ? /*#__PURE__*/React.createElement("path", {
    d: d
  }) : null);
}
Object.assign(__ds_scope, { ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/catalog/DiamondPill.jsx
try { (() => {
/** Diamond currency pill — the app's core cosmetic price / balance token. */
function DiamondPill({
  amount,
  size = 'md',
  variant = 'tinted',
  style
}) {
  const map = {
    sm: {
      h: 22,
      fs: 12,
      ic: 12,
      pad: '0 8px'
    },
    md: {
      h: 28,
      fs: 14,
      ic: 15,
      pad: '0 10px'
    },
    lg: {
      h: 34,
      fs: 17,
      ic: 18,
      pad: '0 13px'
    }
  };
  const s = map[size];
  const solid = variant === 'solid';
  const formatted = typeof amount === 'number' ? amount.toLocaleString('en-US') : amount;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      height: s.h,
      padding: s.pad,
      borderRadius: 'var(--r-pill)',
      background: solid ? 'rgba(31,205,245,0.16)' : 'var(--ink-900)',
      border: `1px solid ${solid ? 'var(--line-crystal)' : 'var(--border-strong)'}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "gem",
    size: s.ic,
    color: "var(--crystal-400)",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("span", {
    className: "fff-num",
    style: {
      fontSize: s.fs,
      fontWeight: 600,
      color: 'var(--text-primary)',
      letterSpacing: '0.01em'
    }
  }, formatted));
}
Object.assign(__ds_scope, { DiamondPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/DiamondPill.jsx", error: String((e && e.message) || e) }); }

// components/catalog/ItemCard.jsx
try { (() => {
/** Catalog item tile for a skin or pet. Rarity drives the accent glow behind the artwork. */
function ItemCard({
  name,
  category,
  rarity = 'common',
  price,
  image,
  favorite = false,
  onFavorite,
  badge,
  onClick,
  style
}) {
  const r = __ds_scope.RARITIES[rarity] || __ds_scope.RARITIES.common;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--grad-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-card)',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = `color-mix(in srgb, ${r.color} 55%, transparent)`;
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.borderColor = 'var(--border)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      background: `radial-gradient(120% 100% at 50% 15%, color-mix(in srgb, ${r.color} 26%, transparent) 0%, var(--ink-900) 70%)`,
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center'
    }
  }, image), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      left: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.RarityBadge, {
    rarity: rarity,
    size: "sm"
  })), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8
    }
  }, badge), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onFavorite && onFavorite();
    },
    style: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 'var(--r-pill)',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: 'rgba(5,7,15,0.6)',
      backdropFilter: 'blur(6px)',
      border: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "heart",
    size: 16,
    color: favorite ? 'var(--danger)' : 'var(--text-secondary)',
    style: favorite ? {
      fill: 'var(--danger)'
    } : undefined
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 12px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, category && /*#__PURE__*/React.createElement("span", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)'
    }
  }, category), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--text-primary)',
      lineHeight: 1.2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), price != null && /*#__PURE__*/React.createElement(__ds_scope.DiamondPill, {
    amount: price,
    size: "sm"
  })));
}
Object.assign(__ds_scope, { ItemCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/ItemCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Search bar — the primary way to find skins/pets. */
function SearchField({
  value,
  onChange,
  placeholder = 'Search skins, pets, bundles…',
  onClear,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      height: '44px',
      padding: '0 14px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--ink-900)',
      border: `1px solid ${focus ? 'var(--crystal-500)' : 'var(--border-strong)'}`,
      boxShadow: focus ? '0 0 0 3px rgba(31,205,245,0.15)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'none',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: '15px'
    }
  }, rest)), value ? /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      display: 'flex',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16,
    color: "var(--text-tertiary)"
  })) : null);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
/** App top bar. Optional back button, title, and trailing actions. Sticky on dark. */
function AppHeader({
  title,
  subtitle,
  leading,
  actions,
  transparent = false,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      height: 'var(--header-h)',
      padding: '0 16px',
      background: transparent ? 'transparent' : 'rgba(10,14,27,0.85)',
      backdropFilter: transparent ? 'none' : 'blur(12px)',
      borderBottom: transparent ? '1px solid transparent' : '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      ...style
    }
  }, leading, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '18px',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '0.01em',
      lineHeight: 1.1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-tertiary)',
      lineHeight: 1.2
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, actions));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
/** Bottom tab bar — the app's primary navigation. */
function TabBar({
  items,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      height: 'var(--tabbar-h)',
      padding: '0 6px',
      background: 'rgba(10,14,27,0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border)',
      ...style
    }
  }, items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: '8px 0',
        color: active ? 'var(--crystal-400)' : 'var(--text-tertiary)',
        transition: 'color var(--dur-fast) var(--ease-out)'
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        width: '28px',
        height: '3px',
        borderRadius: '0 0 3px 3px',
        background: 'var(--grad-crystal)',
        boxShadow: '0 0 10px rgba(31,205,245,0.6)'
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22,
      strokeWidth: active ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/App.jsx
try { (() => {
// App shell — phone frame, tab routing, shared favorite/toast state
const {
  TabBar
} = window.FFFSkinToolDesignSystem_2dd5ed;
function App() {
  const [tab, setTab] = React.useState('home');
  const [detail, setDetail] = React.useState(null);
  const [favs, setFavs] = React.useState(() => {
    const f = {};
    window.FFFData.skins.concat(window.FFFData.pets).forEach(i => {
      if (i.fav) f[i.id] = true;
    });
    return f;
  });
  const [toast, setToast] = React.useState(null);
  const toggleFav = id => setFavs(s => ({
    ...s,
    [id]: !s[id]
  }));
  const fireToast = msg => {
    setToast(msg);
    clearTimeout(window.__t);
    window.__t = setTimeout(() => setToast(null), 1900);
  };
  const onOpen = it => {
    if (it) setDetail(it);else setTab('skins');
  };
  const onBuy = () => {
    setDetail(null);
    fireToast('Added to cart');
  };
  const screens = {
    home: /*#__PURE__*/React.createElement(HomeScreen, {
      onOpen: onOpen,
      onBuy: () => setTab('diamonds'),
      onSettings: () => setTab('settings'),
      favs: favs,
      toggleFav: toggleFav
    }),
    skins: /*#__PURE__*/React.createElement(CatalogScreen, {
      kind: "skins",
      onOpen: onOpen,
      favs: favs,
      toggleFav: toggleFav
    }),
    characters: /*#__PURE__*/React.createElement(CatalogScreen, {
      kind: "characters",
      onOpen: onOpen,
      favs: favs,
      toggleFav: toggleFav
    }),
    pets: /*#__PURE__*/React.createElement(CatalogScreen, {
      kind: "pets",
      onOpen: onOpen,
      favs: favs,
      toggleFav: toggleFav
    }),
    diamonds: /*#__PURE__*/React.createElement(DiamondScreen, {
      onBuy: onBuy
    }),
    settings: /*#__PURE__*/React.createElement(MeScreen, {
      favCount: Object.values(favs).filter(Boolean).length
    })
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 412,
      height: 844,
      background: 'var(--bg-canvas)',
      borderRadius: 30,
      overflow: 'hidden',
      border: '1px solid var(--border-strong)',
      boxShadow: '0 40px 100px rgba(0,0,0,.6)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      background: 'var(--grad-glow)'
    },
    key: tab
  }, screens[tab]), /*#__PURE__*/React.createElement(TabBar, {
    value: tab,
    onChange: t => {
      setTab(t);
      setDetail(null);
    },
    items: [{
      value: 'home',
      label: 'Home',
      icon: 'home'
    }, {
      value: 'skins',
      label: 'Skins',
      icon: 'sparkles'
    }, {
      value: 'characters',
      label: 'Characters',
      icon: 'user'
    }, {
      value: 'pets',
      label: 'Pets',
      icon: 'paw'
    }, {
      value: 'diamonds',
      label: 'Guide',
      icon: 'gem'
    }]
  }), /*#__PURE__*/React.createElement(DetailSheet, {
    item: detail,
    onClose: () => setDetail(null),
    favs: favs,
    toggleFav: toggleFav,
    onBuy: onBuy
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: tab && toast ? 86 : 60,
      transform: `translateX(-50%) translateY(${toast ? 0 : 12}px)`,
      opacity: toast ? 1 : 0,
      transition: 'all var(--dur-base) var(--ease-out)',
      zIndex: 60,
      pointerEvents: 'none',
      background: 'var(--ink-700)',
      border: '1px solid var(--line-crystal)',
      borderRadius: 'var(--r-pill)',
      padding: '10px 18px',
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--crystal-200,#8FF0FF)',
      boxShadow: 'var(--glow-crystal)',
      whiteSpace: 'nowrap'
    }
  }, toast));
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/CatalogScreen.jsx
try { (() => {
// Skins catalog screen
const {
  AppHeader,
  IconButton,
  Icon,
  SearchField,
  Tag,
  ItemCard,
  DiamondPill
} = window.FFFSkinToolDesignSystem_2dd5ed;
function CatalogScreen({
  kind = 'skins',
  onOpen,
  favs,
  toggleFav
}) {
  const items = window.FFFData[kind];
  const [q, setQ] = React.useState('');
  const [rarity, setRarity] = React.useState('all');
  const rarities = ['all', 'legendary', 'mythic', 'epic', 'rare'];
  const filtered = items.filter(it => (rarity === 'all' || it.rarity === rarity) && it.name.toLowerCase().includes(q.toLowerCase().trim()));
  const meta = {
    skins: {
      title: 'Skins',
      icon: 'gem'
    },
    pets: {
      title: 'Pets',
      icon: 'paw'
    },
    characters: {
      title: 'Characters',
      icon: 'user'
    }
  }[kind] || {
    title: 'Skins',
    icon: 'gem'
  };
  const title = meta.title;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppHeader, {
    title: title,
    subtitle: `${items.length} items · Season 12`,
    actions: /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "filter",
        size: 20
      })
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: `Search ${title.toLowerCase()}…`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 2
    }
  }, rarities.map(r => /*#__PURE__*/React.createElement(Tag, {
    key: r,
    active: rarity === r,
    onClick: () => setRarity(r),
    icon: r === 'legendary' ? /*#__PURE__*/React.createElement(Icon, {
      name: "crown",
      size: 14
    }) : undefined,
    style: {
      textTransform: 'capitalize',
      flexShrink: 0
    }
  }, r))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, filtered.map(it => /*#__PURE__*/React.createElement(ItemCard, {
    key: it.id,
    name: it.name,
    category: it.category,
    rarity: it.rarity,
    price: it.price,
    image: /*#__PURE__*/React.createElement(Artwork, {
      hue: it.hue,
      icon: meta.icon
    }),
    badge: it.disc ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 700,
        padding: '3px 7px',
        borderRadius: 6,
        background: 'var(--danger)',
        color: '#1A0308'
      }
    }, "-", it.disc, "%") : undefined,
    favorite: !!favs[it.id],
    onFavorite: () => toggleFav(it.id),
    onClick: () => onOpen(it)
  })))));
}
Object.assign(window, {
  CatalogScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/CatalogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/DetailSheet.jsx
try { (() => {
// Item detail — slide-up sheet for a skin or pet
const {
  Icon,
  IconButton,
  DiamondPill,
  Button,
  RarityBadge,
  StatBar,
  Badge
} = window.FFFSkinToolDesignSystem_2dd5ed;
function DetailSheet({
  item,
  onClose,
  favs,
  toggleFav,
  onBuy
}) {
  const open = !!item;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(2,3,10,.66)',
      backdropFilter: 'blur(2px)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-out)',
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 41,
      background: 'var(--surface-1)',
      borderTop: '1px solid var(--border-strong)',
      borderRadius: '22px 22px 0 0',
      boxShadow: '0 -20px 50px rgba(0,0,0,.6)',
      transform: open ? 'translateY(0)' : 'translateY(102%)',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      maxHeight: '88%',
      overflow: 'auto'
    }
  }, item && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: 'var(--ink-600)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 18
    }),
    variant: "glass",
    rounded: true,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 180,
      display: 'grid',
      placeItems: 'center',
      background: `radial-gradient(90% 90% at 50% 30%, color-mix(in srgb, var(--rarity-${item.rarity}) 26%, transparent), transparent 70%)`
    }
  }, /*#__PURE__*/React.createElement(Artwork, {
    hue: item.hue,
    size: "46%",
    icon: item.skill ? 'paw' : 'gem'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(RarityBadge, {
    rarity: item.rarity
  }), /*#__PURE__*/React.createElement("span", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)'
    }
  }, item.category)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--text-primary)',
      lineHeight: 1.05
    }
  }, item.name), item.skill && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--crystal-300)'
    }
  }, "Skill:"), " ", item.skill), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      margin: '18px 0'
    }
  }, item.stats.map(([l, v, m, d]) => /*#__PURE__*/React.createElement(StatBar, {
    key: l,
    label: l,
    value: v,
    max: m,
    display: d,
    tone: item.rarity === 'legendary' ? 'premium' : 'crystal'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: item.rarity === 'legendary' ? 'premium' : 'primary',
    size: "lg",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "gem",
      size: 18
    }),
    onClick: onBuy
  }, "Unlock \xB7 ", item.price.toLocaleString()), /*#__PURE__*/React.createElement(IconButton, {
    size: "lg",
    variant: "solid",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 20,
      color: favs[item.id] ? 'var(--danger)' : 'var(--text-secondary)',
      style: favs[item.id] ? {
        fill: 'var(--danger)'
      } : undefined
    }),
    onClick: () => toggleFav(item.id)
  }))))));
}
Object.assign(window, {
  DetailSheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/DetailSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/DiamondScreen.jsx
try { (() => {
// Diamond Guide screen — top-up packs + value guidance
const {
  AppHeader,
  Icon,
  DiamondPill,
  Card,
  Button,
  Badge,
  Banner,
  ProgressBar
} = window.FFFSkinToolDesignSystem_2dd5ed;
function DiamondScreen({
  onBuy
}) {
  const {
    packs,
    balance
  } = window.FFFData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppHeader, {
    title: "Diamond Guide",
    subtitle: "Best-value top-ups"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    glow: "crystal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)'
    }
  }, "Your balance"), /*#__PURE__*/React.createElement("div", {
    className: "fff-num",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--crystal-300)',
      lineHeight: 1.1
    }
  }, balance.toLocaleString())), /*#__PURE__*/React.createElement(Icon, {
    name: "gem",
    size: 40,
    color: "var(--crystal-400)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'var(--text-tertiary)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "Cryo Vanguard bundle"), /*#__PURE__*/React.createElement("span", {
    className: "fff-num"
  }, "12,340 / 1,499")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 100,
    tone: "crystal"
  }))), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 18
    }),
    title: "When to buy"
  }, "Diamond value peaks during Double-Diamond weekends and Season launches. Avoid single-tap top-ups \u2014 larger packs carry the biggest bonus."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, "Top-up packs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, packs.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.id,
    padding: "12px",
    interactive: true,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 12,
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      background: p.best ? 'var(--grad-premium)' : 'rgba(31,205,245,.12)',
      border: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gem",
    size: 22,
    color: p.best ? '#1A1203' : 'var(--crystal-300)'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fff-num",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, p.diamonds.toLocaleString()), p.best && /*#__PURE__*/React.createElement(Badge, {
    tone: "premium",
    solid: true
  }, "Best value"), p.value && /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Whale pick")), p.bonus > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--success)'
    }
  }, "+", p.bonus, " bonus diamonds")), /*#__PURE__*/React.createElement(Button, {
    variant: p.best ? 'premium' : 'secondary',
    size: "sm",
    onClick: onBuy
  }, p.price))))));
}
Object.assign(window, {
  DiamondScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/DiamondScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/HomeScreen.jsx
try { (() => {
// Home / featured screen
const {
  AppHeader,
  IconButton,
  DiamondPill,
  Icon,
  Card,
  Button,
  RarityBadge,
  ItemCard,
  Badge,
  Banner,
  Tag
} = window.FFFSkinToolDesignSystem_2dd5ed;
function HomeScreen({
  onOpen,
  onBuy,
  onSettings,
  favs,
  toggleFav
}) {
  const {
    skins,
    pets,
    balance
  } = window.FFFData;
  const featured = skins[0];
  const hot = [skins[1], skins[2], pets[0]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppHeader, {
    leading: /*#__PURE__*/React.createElement("img", {
      src: "../../assets/app-icon.png",
      width: "30",
      height: "30",
      style: {
        borderRadius: 8
      }
    }),
    title: "FFF Skin Tool",
    subtitle: "Season 12 \xB7 Live",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DiamondPill, {
      amount: balance,
      size: "sm"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "settings",
        size: 20
      }),
      onClick: onSettings
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    glow: "gold",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '16px',
      background: 'radial-gradient(120% 120% at 80% 0%, color-mix(in srgb, var(--gold-500) 24%, transparent), transparent 60%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "premium",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "crown",
      size: 12
    })
  }, "Drop of the week"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--text-primary)',
      lineHeight: 1.05,
      margin: '10px 0 4px'
    }
  }, featured.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, featured.category, " \xB7 Limited time"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "premium",
    size: "sm",
    onClick: () => onOpen(featured)
  }, "View bundle"), /*#__PURE__*/React.createElement(DiamondPill, {
    amount: featured.price,
    size: "sm"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 118,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Artwork, {
    hue: featured.hue,
    size: "100%"
  }))))), /*#__PURE__*/React.createElement(Banner, {
    tone: "premium",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "zap",
      size: 18
    }),
    title: "Double Diamonds \u2014 2 days left",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: onBuy
    }, "Top up")
  }, "Earn 2\xD7 bonus on every diamond pack this weekend."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionTitle, {
    action: /*#__PURE__*/React.createElement("a", {
      style: {
        fontSize: 13,
        fontFamily: 'var(--font-display)',
        fontWeight: 600
      },
      onClick: () => onOpen(null)
    }, "See all")
  }, "Trending now"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 10
    }
  }, hot.map(it => /*#__PURE__*/React.createElement(ItemCard, {
    key: it.id,
    name: it.name,
    category: it.category,
    rarity: it.rarity,
    price: it.price,
    image: /*#__PURE__*/React.createElement(Artwork, {
      hue: it.hue,
      icon: it.skill ? 'paw' : 'gem'
    }),
    favorite: !!favs[it.id],
    onFavorite: () => toggleFav(it.id),
    onClick: () => onOpen(it)
  })), /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    style: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 150,
      cursor: 'pointer'
    },
    onClick: () => onOpen(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grid",
    size: 26,
    color: "var(--crystal-400)",
    style: {
      margin: '0 auto 8px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "Browse full catalog")))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/MeScreen.jsx
try { (() => {
// Me / profile + settings screen
const {
  AppHeader,
  Icon,
  Card,
  Switch,
  Badge,
  DiamondPill
} = window.FFFSkinToolDesignSystem_2dd5ed;
function Row({
  icon,
  label,
  sub,
  right,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      background: 'rgba(31,205,245,.1)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: "var(--crystal-300)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, sub)), right);
}
function MeScreen({
  favCount = 0
}) {
  const [alerts, setAlerts] = React.useState(true);
  const [reduce, setReduce] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppHeader, {
    title: "Settings",
    subtitle: "Profile & preferences"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    glow: "crystal",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--r-pill)',
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--grad-crystal)',
      boxShadow: 'var(--glow-crystal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 26,
    color: "var(--on-brand)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, "Player_2481"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "premium",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "crown",
      size: 12
    })
  }, "VIP"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, favCount, " favorites"))), /*#__PURE__*/React.createElement(DiamondPill, {
    amount: 12340,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)',
      marginBottom: 6
    }
  }, "Account"), /*#__PURE__*/React.createElement(Card, {
    padding: "0 16px"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "shield",
    label: "Linked game account",
    sub: "Free Fire \xB7 UID 51xxxx81"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "gem",
    label: "Diamond history",
    sub: "Purchases & bonuses"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "heart",
    label: "Favorites",
    sub: `${favCount} saved items`,
    last: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fff-label",
    style: {
      color: 'var(--text-tertiary)',
      marginBottom: 6
    }
  }, "Settings"), /*#__PURE__*/React.createElement(Card, {
    padding: "0 16px"
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "settings",
    label: "Drop alerts",
    sub: "New legendary skins & events",
    right: /*#__PURE__*/React.createElement(Switch, {
      checked: alerts,
      onChange: setAlerts
    })
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "zap",
    label: "Reduce motion",
    sub: "Minimize animations",
    right: /*#__PURE__*/React.createElement(Switch, {
      checked: reduce,
      onChange: setReduce
    })
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "info",
    label: "About FFF Skin Tool",
    sub: "Version 2.4.0",
    last: true
  })))));
}
Object.assign(window, {
  MeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/MeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/data.js
try { (() => {
// FFF Skin Tool — mock catalog data (UI kit only; not production data)
window.FFFData = {
  balance: 12340,
  skins: [{
    id: 'skn-01',
    name: 'Cryo Vanguard',
    category: 'Bundle',
    rarity: 'legendary',
    price: 1499,
    disc: 25,
    hue: 'var(--grad-premium)',
    fav: true,
    stats: [['Popularity', 88, 100, '88%'], ['Collector value', 5, 5, '5.0 / 5'], ['Release', 60, 100, 'Season 12']]
  }, {
    id: 'skn-02',
    name: 'Void Reaper',
    category: 'Weapon',
    rarity: 'mythic',
    price: 1200,
    hue: 'var(--grad-mythic)',
    stats: [['Popularity', 94, 100, '94%'], ['Collector value', 4.5, 5, '4.5 / 5'], ['Release', 30, 100, 'Season 11']]
  }, {
    id: 'skn-03',
    name: 'Circuit Runner',
    category: 'Outfit',
    rarity: 'epic',
    price: 720,
    hue: 'var(--grad-crystal)',
    stats: [['Popularity', 71, 100, '71%'], ['Collector value', 4, 5, '4.0 / 5'], ['Release', 80, 100, 'Season 12']]
  }, {
    id: 'skn-04',
    name: 'Ember Wolf',
    category: 'Outfit',
    rarity: 'legendary',
    price: 1350,
    hue: 'linear-gradient(135deg,#FF8A4C,#FF5C77)',
    stats: [['Popularity', 82, 100, '82%'], ['Collector value', 4.5, 5, '4.5 / 5'], ['Release', 20, 100, 'Season 10']]
  }, {
    id: 'skn-05',
    name: 'Neon Katana',
    category: 'Weapon',
    rarity: 'rare',
    price: 480,
    hue: 'linear-gradient(135deg,#4C86FF,#2B63F5)',
    stats: [['Popularity', 64, 100, '64%'], ['Collector value', 3, 5, '3.0 / 5'], ['Release', 90, 100, 'Season 12']]
  }, {
    id: 'skn-06',
    name: 'Frost Sentinel',
    category: 'Bundle',
    rarity: 'epic',
    price: 990,
    hue: 'linear-gradient(135deg,#8FF0FF,#4FE3FF)',
    stats: [['Popularity', 77, 100, '77%'], ['Collector value', 4, 5, '4.0 / 5'], ['Release', 50, 100, 'Season 11']]
  }],
  pets: [{
    id: 'pet-01',
    name: 'Cryo Drake',
    category: 'Companion',
    rarity: 'legendary',
    price: 899,
    hue: 'var(--grad-mythic)',
    skill: 'Reveals nearby loot chests',
    stats: [['Popularity', 80, 100, '80%'], ['Skill tier', 5, 5, 'S']]
  }, {
    id: 'pet-02',
    name: 'Volt Fox',
    category: 'Companion',
    rarity: 'epic',
    price: 560,
    hue: 'var(--grad-crystal)',
    skill: '+8% movement in zone',
    stats: [['Popularity', 72, 100, '72%'], ['Skill tier', 4, 5, 'A']]
  }, {
    id: 'pet-03',
    name: ' Shard Owl',
    category: 'Companion',
    rarity: 'rare',
    price: 320,
    hue: 'linear-gradient(135deg,#8A5CFF,#6C3FE0)',
    skill: 'Marks enemies on scan',
    stats: [['Popularity', 60, 100, '60%'], ['Skill tier', 3, 5, 'B']]
  }, {
    id: 'pet-04',
    name: 'Aegis Turtle',
    category: 'Companion',
    rarity: 'legendary',
    price: 930,
    hue: 'var(--grad-premium)',
    skill: 'Shields on revive',
    stats: [['Popularity', 75, 100, '75%'], ['Skill tier', 5, 5, 'S']]
  }],
  characters: [{
    id: 'chr-01',
    name: 'Alok',
    category: 'Character',
    rarity: 'legendary',
    price: 499,
    hue: 'var(--grad-crystal)',
    skill: 'Drop the Beat — +heal & speed aura',
    stats: [['Popularity', 96, 100, '96%'], ['Skill tier', 5, 5, 'S']]
  }, {
    id: 'chr-02',
    name: 'Chrono',
    category: 'Character',
    rarity: 'mythic',
    price: 599,
    hue: 'var(--grad-mythic)',
    skill: 'Time Turner — deploys force field',
    stats: [['Popularity', 90, 100, '90%'], ['Skill tier', 5, 5, 'S']]
  }, {
    id: 'chr-03',
    name: 'K',
    category: 'Character',
    rarity: 'legendary',
    price: 499,
    hue: 'linear-gradient(135deg,#FFD264,#F5B833)',
    skill: 'Master of All — EP conversion',
    stats: [['Popularity', 88, 100, '88%'], ['Skill tier', 5, 5, 'S']]
  }, {
    id: 'chr-04',
    name: 'Skyler',
    category: 'Character',
    rarity: 'epic',
    price: 399,
    hue: 'linear-gradient(135deg,#4C86FF,#2B63F5)',
    skill: 'Riptide Rhythm — sonic wave',
    stats: [['Popularity', 79, 100, '79%'], ['Skill tier', 4, 5, 'A']]
  }, {
    id: 'chr-05',
    name: 'Dimitri',
    category: 'Character',
    rarity: 'epic',
    price: 399,
    hue: 'linear-gradient(135deg,#8A5CFF,#6C3FE0)',
    skill: 'Healing Heartbeat — self revive',
    stats: [['Popularity', 74, 100, '74%'], ['Skill tier', 4, 5, 'A']]
  }, {
    id: 'chr-06',
    name: 'Nairi',
    category: 'Character',
    rarity: 'rare',
    price: 299,
    hue: 'linear-gradient(135deg,#8FF0FF,#4FE3FF)',
    skill: 'Ice Iron — gloo wall shield',
    stats: [['Popularity', 66, 100, '66%'], ['Skill tier', 3, 5, 'B']]
  }],
  packs: [{
    id: 'p1',
    diamonds: 100,
    price: '$0.99',
    bonus: 0
  }, {
    id: 'p2',
    diamonds: 520,
    price: '$4.99',
    bonus: 20
  }, {
    id: 'p3',
    diamonds: 1080,
    price: '$9.99',
    bonus: 80,
    best: true
  }, {
    id: 'p4',
    diamonds: 2200,
    price: '$19.99',
    bonus: 200
  }, {
    id: 'p5',
    diamonds: 5600,
    price: '$49.99',
    bonus: 600,
    value: true
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/fff-app/parts.jsx
try { (() => {
// Shared UI-kit parts: branded artwork placeholder + small helpers
const {
  Icon
} = window.FFFSkinToolDesignSystem_2dd5ed;

/* Branded placeholder artwork — a faceted crystal. Replace with real skin/pet renders. */
function Artwork({
  hue,
  size = '68%',
  icon = 'gem'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      aspectRatio: '1',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '10%',
      background: hue,
      borderRadius: '22%',
      transform: 'rotate(45deg)',
      boxShadow: '0 12px 30px rgba(0,0,0,.55), inset 0 2px 12px rgba(255,255,255,.35)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '26%',
      borderRadius: '18%',
      transform: 'rotate(45deg)',
      border: '1px solid rgba(255,255,255,.35)',
      background: 'linear-gradient(135deg,rgba(255,255,255,.28),transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26,
    color: "rgba(255,255,255,.92)",
    strokeWidth: 1.6,
    style: {
      position: 'relative',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.4))'
    }
  }));
}
function SectionTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '4px 0 2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '.01em'
    }
  }, children), action);
}
Object.assign(window, {
  Artwork,
  SectionTitle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fff-app/parts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DiamondPill = __ds_scope.DiamondPill;

__ds_ns.ItemCard = __ds_scope.ItemCard;

__ds_ns.RARITIES = __ds_scope.RARITIES;

__ds_ns.RarityBadge = __ds_scope.RarityBadge;

__ds_ns.StatBar = __ds_scope.StatBar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.ICONS = __ds_scope.ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
