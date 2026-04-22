import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, e as Trophy, f as ue } from "./index-6HgylvRh.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { B as Badge } from "./badge-D5-aCfvX.js";
import { B as Button, C as Card } from "./card-BBUTJoby.js";
import { u as useControllableState, a as useId, P as Presence, b as Primitive, c as composeEventHandlers, d as Portal$1, h as hideOthers, e as createContextScope, R as ReactRemoveScroll, f as useFocusGuards, F as FocusScope, D as DismissableLayer, g as createSlot, i as createContext2 } from "./index-F7ce7qDU.js";
import { u as useComposedRefs } from "./index-DVd-QpaJ.js";
import { X } from "./x-gBBbqBmc.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { S as ShoppingCart } from "./shopping-cart-D-fehQPQ.js";
import { T as Trash2 } from "./trash-2-DrQ-5xAX.js";
import "./index-NwINJ8tx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const MOCK_SALES = [
  {
    id: "s-001",
    storeId: "store-001",
    ticketId: "t-001",
    amount: 5,
    currency: "USD",
    soldAt: "2026-04-22T15:30:00Z",
    customerRef: "C-001",
    lotteryName: "Clásico 6/45"
  },
  {
    id: "s-002",
    storeId: "store-001",
    ticketId: "t-002",
    amount: 5,
    currency: "USD",
    soldAt: "2026-04-22T14:10:00Z",
    customerRef: "C-002",
    lotteryName: "Clásico 6/45"
  },
  {
    id: "s-003",
    storeId: "store-001",
    ticketId: "t-003",
    amount: 1,
    currency: "USD",
    soldAt: "2026-04-22T13:45:00Z",
    customerRef: "C-003",
    lotteryName: "Sorteo Diario"
  },
  {
    id: "s-004",
    storeId: "store-001",
    ticketId: "t-004",
    amount: 15,
    currency: "USD",
    soldAt: "2026-04-22T12:00:00Z",
    customerRef: "C-004",
    lotteryName: "Rifa NFT"
  },
  {
    id: "s-005",
    storeId: "store-001",
    ticketId: "t-005",
    amount: 5,
    currency: "USD",
    soldAt: "2026-04-21T17:30:00Z",
    customerRef: "C-005",
    lotteryName: "Clásico 6/45"
  },
  {
    id: "s-006",
    storeId: "store-001",
    ticketId: "t-006",
    amount: 50,
    currency: "USD",
    soldAt: "2026-04-21T16:00:00Z",
    customerRef: "C-006",
    lotteryName: "Sin Pérdida"
  },
  {
    id: "s-007",
    storeId: "store-001",
    ticketId: "t-007",
    amount: 1,
    currency: "USD",
    soldAt: "2026-04-20T11:20:00Z",
    customerRef: "C-007",
    lotteryName: "Sorteo Diario"
  },
  {
    id: "s-008",
    storeId: "store-001",
    ticketId: "t-008",
    amount: 5,
    currency: "USD",
    soldAt: "2026-04-20T10:00:00Z",
    customerRef: "C-008",
    lotteryName: "Clásico 6/45"
  },
  {
    id: "s-009",
    storeId: "store-001",
    ticketId: "t-009",
    amount: 15,
    currency: "USD",
    soldAt: "2026-04-19T14:45:00Z",
    customerRef: "C-009",
    lotteryName: "Rifa NFT"
  },
  {
    id: "s-010",
    storeId: "store-001",
    ticketId: "t-010",
    amount: 5,
    currency: "USD",
    soldAt: "2026-04-18T09:15:00Z",
    customerRef: "C-010",
    lotteryName: "Clásico 6/45"
  }
];
function fmt(amount) {
  return `$${amount.toFixed(2)}`;
}
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function randomNumbers(count, max) {
  const nums = /* @__PURE__ */ new Set();
  while (nums.size < count) nums.add(Math.floor(Math.random() * max) + 1);
  return Array.from(nums).sort((a, b) => a - b);
}
function NumberCircle({
  value,
  index,
  onChange
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [input, setInput] = reactExports.useState("");
  function commit(raw) {
    const n = Number.parseInt(raw);
    if (!Number.isNaN(n) && n >= 1 && n <= 45) onChange(index, n);
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "aria-label": `Número ${index + 1}: ${value ?? "vacío"}`,
      onClick: () => {
        if (!editing) {
          setEditing(true);
          setInput("");
        }
      },
      "data-ocid": `pos.number_circle.${index + 1}`,
      className: cn(
        "relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none",
        "border-2 transition-smooth text-lg font-mono font-bold",
        value !== null ? "border-primary bg-primary/10 text-primary glow-gold" : "border-border bg-muted/40 text-muted-foreground hover:border-primary/50"
      ),
      children: [
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: (el) => {
              if (el) el.focus();
            },
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === "Tab") commit(input);
              if (e.key === "Escape") setEditing(false);
            },
            onBlur: () => commit(input),
            className: "w-10 text-center bg-transparent text-foreground font-mono text-sm focus:outline-none",
            maxLength: 2,
            "aria-label": `Número ${index + 1}`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value ?? "—" }),
        value !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onChange(index, null);
            },
            className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-xs flex items-center justify-center hover:bg-destructive",
            "aria-label": "Limpiar",
            children: "×"
          }
        )
      ]
    }
  );
}
function LotteryCard({
  lottery,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onSelect,
      "data-ocid": `pos.lottery_card.${lottery.id}`,
      className: cn(
        "w-full rounded-2xl p-4 text-left transition-smooth border-2 cursor-pointer flex flex-col gap-1.5",
        selected ? "border-primary bg-primary/10 glow-gold shadow-md" : "border-border bg-card hover:border-primary/40 hover:bg-muted/20"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: lottery.logoEmoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: lottery.nameEs }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: lottery.jackpotFormatted })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: lottery.drawDateFormatted }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: selected ? "default" : "outline", className: "text-xs", children: fmt(lottery.price) })
        ] })
      ]
    }
  );
}
function CartRow({
  item,
  index,
  onRemove
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `pos.cart.item.${index + 1}`,
      className: "flex items-center gap-3 py-3 border-b border-border/50 last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: item.lottery.logoEmoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.lottery.nameEs }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: item.numbers.join(" · ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary font-mono", children: fmt(item.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "data-ocid": `pos.cart.delete_button.${index + 1}`,
            "aria-label": "Eliminar",
            className: "w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        )
      ]
    }
  );
}
function SellTab({ lotteries }) {
  const [selectedLottery, setSelectedLottery] = reactExports.useState(lotteries[0]);
  const [numbers, setNumbers] = reactExports.useState(
    Array(6).fill(null)
  );
  const [cart, setCart] = reactExports.useState([]);
  const [selling, setSelling] = reactExports.useState(false);
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const maxNums = selectedLottery.numbersToSelect;
  const activeNums = numbers.slice(0, maxNums);
  const filled = activeNums.filter((n) => n !== null).length;
  const canAdd = filled === maxNums;
  function handleNumberChange(idx, val) {
    setNumbers((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }
  function handleRandom() {
    const rand = randomNumbers(maxNums, selectedLottery.maxNumber);
    setNumbers([...rand, ...Array(6 - rand.length).fill(null)]);
  }
  function handleLotterySelect(lottery) {
    setSelectedLottery(lottery);
    setNumbers(Array(6).fill(null));
  }
  function handleAddToCart() {
    const filledNums = numbers.slice(0, maxNums).filter((n) => n !== null);
    if (filledNums.length < maxNums) {
      ue.error("Completa todos los números");
      return;
    }
    setCart((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}`,
        lottery: selectedLottery,
        numbers: filledNums,
        price: selectedLottery.price
      }
    ]);
    setNumbers(Array(6).fill(null));
    ue.success("Boleto agregado al carrito 🎟️");
  }
  async function handleSell() {
    if (cart.length === 0) {
      ue.error("El carrito está vacío");
      return;
    }
    setSelling(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSelling(false);
    setCart([]);
    setNumbers(Array(6).fill(null));
    setConfirmed(true);
  }
  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const commission = subtotal * 0.05;
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-6 py-16 text-center",
        "data-ocid": "pos.sale_confirmed.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center glow-green", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "✅" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "¡Venta confirmada!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Sale confirmed · Los boletos fueron emitidos exitosamente" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlowButton,
              {
                type: "button",
                variant: "outline",
                size: "md",
                onClick: () => window.print(),
                "data-ocid": "pos.print_receipt_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                  "Imprimir voucher / Print receipt"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                type: "button",
                variant: "gold",
                size: "md",
                onClick: () => setConfirmed(false),
                "data-ocid": "pos.new_sale_button",
                children: "Nueva venta / New sale"
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Seleccionar lotería / Select lottery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "pos.lottery_grid", children: lotteries.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LotteryCard,
          {
            lottery: l,
            selected: selectedLottery.id === l.id,
            onSelect: () => handleLotterySelect(l)
          },
          l.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Números del cliente / Customer numbers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              filled,
              "/",
              maxNums,
              " del 1 al ",
              selectedLottery.maxNumber
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleRandom,
              "data-ocid": "pos.random_button",
              className: "gap-1.5 text-xs h-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                "Aleatorio"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-3 justify-center py-2",
            "data-ocid": "pos.numbers_section",
            children: ["n0", "n1", "n2", "n3", "n4", "n5"].slice(0, maxNums).map((slotKey, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              NumberCircle,
              {
                value: activeNums[idx] ?? null,
                index: idx,
                onChange: handleNumberChange
              },
              slotKey
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowButton,
          {
            type: "button",
            variant: canAdd ? "green" : "ghost",
            size: "lg",
            onClick: handleAddToCart,
            disabled: !canAdd,
            className: "w-full mt-4",
            "data-ocid": "pos.add_to_cart_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
              "+ Agregar / Add to cart"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-card border-border flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Carrito / Cart" }),
          cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: cart.length })
        ] }),
        cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 gap-2 text-center",
            "data-ocid": "pos.cart.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl opacity-40", children: "🎟️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "El carrito está vacío",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Cart is empty" })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "pos.cart.list", children: cart.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartRow,
          {
            item,
            index: idx,
            onRemove: () => setCart((prev) => prev.filter((_, i) => i !== idx))
          },
          item.id
        )) }),
        cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 pt-4 border-t border-border space-y-1.5",
            "data-ocid": "pos.cart.summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: fmt(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-medium text-secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Comisión (5%) / Commission" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  "+",
                  fmt(commission)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold text-foreground pt-1 border-t border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: fmt(subtotal) })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlowButton,
        {
          type: "button",
          variant: "gold",
          size: "xl",
          className: "w-full",
          loading: selling,
          shimmer: true,
          onClick: handleSell,
          disabled: cart.length === 0,
          "data-ocid": "pos.sell_button",
          children: [
            !selling && "🎟️ ",
            "Vender boletos / Sell tickets"
          ]
        }
      )
    ] })
  ] });
}
function CommissionsTab() {
  const [payoutOpen, setPayoutOpen] = reactExports.useState(false);
  const [payoutDone, setPayoutDone] = reactExports.useState(false);
  async function handlePayout() {
    await new Promise((r) => setTimeout(r, 900));
    setPayoutDone(true);
    setPayoutOpen(false);
    ue.success("Solicitud de liquidación enviada ✅");
  }
  const todaySales = MOCK_SALES.filter(
    (s) => s.soldAt.startsWith("2026-04-22")
  );
  const todayTotal = todaySales.reduce((s, i) => s + i.amount, 0);
  const monthTotal = MOCK_SALES.reduce((s, i) => s + i.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        "data-ocid": "pos.commissions.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Hoy / Today" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: fmt(todayTotal * 0.05) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              todaySales.length,
              " boletos · ",
              fmt(todayTotal),
              " ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-medium", children: "comisión" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Este mes / This month" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-secondary", children: fmt(monthTotal * 0.05) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              MOCK_SALES.length,
              " boletos · ",
              fmt(monthTotal),
              " total"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20",
        "data-ocid": "pos.ranking_badge",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Tienda #12 en México" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Top 15% de vendedores este mes · Top seller this month" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "ml-auto shrink-0", children: "Top 15%" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Últimas ventas / Recent sales" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "pos.sales_table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-muted-foreground font-medium", children: "Fecha / Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-muted-foreground font-medium", children: "Lotería" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-xs text-muted-foreground font-medium", children: "Cant." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-xs text-muted-foreground font-medium", children: "Monto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-xs text-muted-foreground font-medium", children: "Comisión" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_SALES.map((sale, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `pos.sales_table.row.${idx + 1}`,
            className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap", children: fmtDate(sale.soldAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-medium", children: sale.lotteryName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-medium text-foreground", children: fmt(sale.amount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-medium text-secondary", children: fmt(sale.amount * 0.05) })
            ]
          },
          sale.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlowButton,
      {
        type: "button",
        variant: "green",
        size: "lg",
        onClick: () => setPayoutOpen(true),
        disabled: payoutDone,
        shimmer: !payoutDone,
        "data-ocid": "pos.payout_button",
        children: payoutDone ? "✅ Solicitud enviada" : "💳 Solicitar liquidación / Request payout"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: payoutOpen, onOpenChange: setPayoutOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "pos.payout_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Solicitar liquidación / Request Payout" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Recibirás",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-semibold text-base", children: fmt(monthTotal * 0.05) }),
          " ",
          "de comisión acumulada este mes."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "El pago se procesará en 1–3 días hábiles. / Payment processed in 1–3 business days." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setPayoutOpen(false),
            "data-ocid": "pos.payout_dialog.cancel_button",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlowButton,
          {
            type: "button",
            variant: "green",
            size: "md",
            onClick: handlePayout,
            "data-ocid": "pos.payout_dialog.confirm_button",
            children: "Confirmar / Confirm"
          }
        )
      ] })
    ] }) })
  ] });
}
function POSPage() {
  const { lotteries } = useMockData();
  const [activeTab, setActiveTab] = reactExports.useState("sell");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-ceremonial flex flex-col",
      "data-ocid": "pos.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border shadow-subtle sticky top-0 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-xl font-bold text-foreground leading-tight", children: [
                "Portal de Tienda",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-base", children: "/ Store Portal" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary mt-0.5", children: "🍀 Tienda El Trébol · Ciudad de México" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5 text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Cajero: María González" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Turno: 08:00 – 16:00" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "gap-1.5 h-7 px-2 text-muted-foreground hover:text-destructive mt-1",
                  "data-ocid": "pos.logout_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                    "Salir"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-1 mt-4 bg-muted/40 p-1 rounded-xl w-fit",
              role: "tablist",
              children: ["sell", "commissions"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeTab === tab,
                  onClick: () => setActiveTab(tab),
                  "data-ocid": tab === "sell" ? "pos.sell_tab" : "pos.commissions_tab",
                  className: cn(
                    "px-5 py-2 rounded-lg text-sm font-medium transition-smooth",
                    activeTab === tab ? "bg-card text-foreground shadow-subtle border border-primary/20" : "text-muted-foreground hover:text-foreground"
                  ),
                  children: tab === "sell" ? "🎟️ Vender / Sell" : "💰 Mis comisiones / My commissions"
                },
                tab
              ))
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 max-w-5xl mx-auto w-full px-4 py-6", children: activeTab === "sell" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SellTab, { lotteries }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionsTab, {}) })
      ]
    }
  );
}
export {
  POSPage as default
};
