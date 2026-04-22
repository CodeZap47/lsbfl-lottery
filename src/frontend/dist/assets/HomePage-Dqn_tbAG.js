import { c as createLucideIcon, r as reactExports, u as useNavigate, a as useLanguage, j as jsxRuntimeExports, b as cn, G as Globe, T as Ticket, M as MapPin, U as Users, L as Link } from "./index-6HgylvRh.js";
import { C as CountdownTimer } from "./CountdownTimer-BuCJa6Ia.js";
import { G as GlowButton } from "./GlowButton-Duv2phZR.js";
import { u as useMockData } from "./useMockData-BjtQoZZA.js";
import { i as isEasingArray, a as interpolate, V as VisualElement, c as createBox, u as useConstant, b as motionValue, M as MotionConfigContext, d as useIsomorphicLayoutEffect, e as cancelFrame, f as frame, g as collectMotionValues, r as resolveElements, h as mixNumber, j as removeItem, k as isMotionValue, l as defaultOffset, n as createGeneratorEasing, o as fillOffset, p as isGenerator, s as secondsToMilliseconds, q as progress, t as isSVGElement, v as isSVGSVGElement, S as SVGVisualElement, H as HTMLVisualElement, w as visualElementStore, x as animateSingleValue, y as animateTarget, z as spring, m as motion } from "./proxy-HmngNdo3.js";
import { C as ChevronRight } from "./chevron-right-DL0xpuSd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }]
];
const TvMinimal = createLucideIcon("tv-minimal", __iconNode);
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
class GroupAnimation {
  constructor(animations) {
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time) {
    this.setAll("time", time);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function getMax(animations, propName) {
  let max = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}
class GroupAnimationWithThen extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function isDOMKeyframes(keyframes) {
  return typeof keyframes === "object" && !Array.isArray(keyframes);
}
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (subject == null) {
    return [];
  }
  if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject.filter((s) => s != null);
  } else {
    return [subject];
  }
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}
function calcNextTime(current, next, prev, labels) {
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else if (next.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next.slice(1)));
  } else {
    return labels.get(next) ?? current;
  }
}
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators == null ? void 0 : generators[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...defaultTransition,
          ...remainingTransition
        };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease = Array.isArray(ease) ? [...ease] : [ease];
        const originalEase = [...ease];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes = keyframes;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes) {
          resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes;
      const { type: _type, ...remainingDefaultTransition } = defaultTransition;
      definition.transition[key] = {
        ...remainingDefaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes) {
  return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
function isSingleValue(subject, keyframes) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes);
}
function animateSubject(subject, keyframes, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    if (subject == null) {
      return animations;
    }
    const subjects = resolveSubjects(subject, keyframes, scope);
    const numSubjects = subjects.length;
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
    }
  }
  return animations;
}
function animateSequence(sequence, options, scope) {
  const animations = [];
  const processedSequence = sequence.map((segment) => {
    if (Array.isArray(segment) && typeof segment[0] === "function") {
      const callback = segment[0];
      const mv = motionValue(0);
      mv.on("change", callback);
      if (segment.length === 1) {
        return [mv, [0, 1]];
      } else if (segment.length === 2) {
        return [mv, [0, 1], segment[1]];
      } else {
        return [mv, segment[1], segment[2]];
      }
    }
    return segment;
  });
  const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes, transition));
  });
  return animations;
}
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(options = {}) {
  const { scope, reduceMotion } = options;
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
    let animations = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSequence(subjectOrSequence, reduceMotion !== void 0 ? { reduceMotion, ...sequenceOptions } : sequenceOptions, scope);
    } else {
      const { onComplete, ...rest } = options2 || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, reduceMotion !== void 0 ? { reduceMotion, ...rest } : rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
const animate = createScopedAnimate();
function LotteryCard({ lottery, className }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handleBuy = () => {
    navigate({ to: "/purchase/$lotteryId", params: { lotteryId: lottery.id } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "ticket-card relative overflow-hidden cursor-pointer group w-full text-left",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "border border-border/60 hover:border-primary/40",
        "hover:shadow-glow-gold hover:-translate-y-1",
        className
      ),
      style: {
        background: `linear-gradient(145deg, ${lottery.coverColor} 0%, #0d0d0d 100%)`
      },
      onClick: handleBuy,
      "aria-label": t(
        `Ver lotería ${lottery.nameEs}`,
        `View lottery ${lottery.name}`
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0 opacity-[0.06] pointer-events-none",
            style: {
              backgroundImage: `radial-gradient(circle at 20% 50%, ${lottery.accentColor}55 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${lottery.accentColor}33 0%, transparent 50%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: lottery.logoEmoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs uppercase tracking-[0.2em] text-white/60", children: "LSBFL" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-white leading-tight", children: t(lottery.nameEs, lottery.name) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-white/50 uppercase tracking-wider mb-0.5", children: t("Precio", "Price") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-display text-lg font-bold",
                  style: { color: lottery.accentColor },
                  children: [
                    "$",
                    lottery.price
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-center py-3 rounded-xl border border-white/10 bg-black/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-white/50 uppercase tracking-widest mb-1", children: t("Premio Mayor", "Jackpot") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-3xl font-black",
                style: {
                  color: lottery.accentColor,
                  textShadow: `0 0 20px ${lottery.accentColor}88`
                },
                children: lottery.jackpotFormatted
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-white/50 mb-1 uppercase tracking-wider", children: t("Próximo sorteo", "Next draw") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CountdownTimer,
                {
                  targetDate: lottery.drawDate,
                  compact: true,
                  className: "text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-white/50 mb-0.5 uppercase tracking-wider", children: t("Probabilidades", "Odds") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/70", children: lottery.odds })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex px-4 py-2 rounded-xl font-body font-semibold text-sm transition-smooth hover:brightness-110 active:scale-95",
              style: { background: lottery.accentColor, color: "#0d0d0d" },
              "aria-hidden": "true",
              children: t("Comprar", "Buy")
            }
          ) })
        ] })
      ]
    }
  );
}
function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1.8
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (v) => Math.round(v).toLocaleString("en-US")
  );
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut"
    });
    return controls.stop;
  }, [count, target, duration]);
  const reserveText = prefix + target.toLocaleString("en-US") + suffix;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      ref,
      className: "inline-grid grid-cols-1 justify-items-center whitespace-nowrap",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "col-start-1 row-start-1 invisible select-none",
            "aria-hidden": true,
            children: reserveText
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "col-start-1 row-start-1", children: [
          prefix,
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "tabular-nums", children: rounded }),
          suffix
        ] })
      ]
    }
  );
}
function QuickNavItem({ icon, label, to, ocid, accent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      "data-ocid": ocid,
      className: "flex flex-col items-center gap-1.5 min-w-[72px] group focus-visible:outline-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-14 h-14 rounded-2xl flex items-center justify-center transition-smooth group-hover:-translate-y-0.5 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring ${accent ? "bg-primary/20 border border-primary/40 text-primary group-hover:shadow-glow-gold" : "bg-card border border-border/60 text-foreground group-hover:border-primary/30"}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground text-center leading-tight", children: label })
      ]
    }
  );
}
function MiniTicketCard({ ticket, index }) {
  const { t } = useLanguage();
  const statusColor = {
    Active: "text-secondary",
    InDraw: "text-primary animate-pulse",
    Winner: "text-yellow-400",
    Lost: "text-muted-foreground",
    Unclaimed: "text-muted-foreground"
  };
  const statusLabel = {
    Active: ["Activo", "Active"],
    InDraw: ["En sorteo", "In Draw"],
    Winner: ["¡Ganador!", "Winner!"],
    Lost: ["Perdido", "Lost"],
    Unclaimed: ["Sin reclamar", "Unclaimed"]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.1, duration: 0.4 },
      "data-ocid": `home.ticket_preview.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-card bg-card border border-border/60 hover:border-primary/30 p-4 flex items-center gap-4 transition-smooth hover:-translate-y-0.5 hover:shadow-glow-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 18, className: "text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground truncate", children: t(ticket.lotteryNameEs, ticket.lotteryName) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground truncate mt-0.5", children: ticket.serialCode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: ticket.numbers.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-mono w-6 h-6 rounded-full bg-muted flex items-center justify-center text-foreground",
              children: n
            },
            n
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-body text-xs font-semibold ${statusColor[ticket.status] ?? "text-muted-foreground"}`,
              children: t(...statusLabel[ticket.status] ?? ["Desconocido", "Unknown"])
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1", children: new Date(ticket.drawDate).toLocaleDateString("es", {
            day: "2-digit",
            month: "short"
          }) })
        ] })
      ] })
    }
  );
}
function HomePage() {
  const { t } = useLanguage();
  const { lotteries, tickets } = useMockData();
  const navigate = useNavigate();
  const megaJackpot = 1233e6;
  const megaLottery = lotteries[0];
  const upcomingTickets = tickets.filter(
    (tk) => tk.status === "Active" || tk.status === "InDraw"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden px-4 pt-8 pb-12",
        "data-ocid": "home.hero_section",
        style: {
          background: "radial-gradient(ellipse at 50% -10%, oklch(0.22 0.07 80 / 0.55) 0%, transparent 68%), oklch(var(--background))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 pointer-events-none overflow-hidden",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 right-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary/10 blur-3xl" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, ease: "easeOut" },
              className: "ticket-card relative overflow-hidden border border-primary/40 p-6 mb-6",
              style: {
                background: "radial-gradient(ellipse at 60% 20%, oklch(0.25 0.08 80 / 0.7) 0%, #0d0d0d 70%)",
                boxShadow: "0 0 0 1px oklch(0.72 0.18 80 / 0.25), 0 0 40px oklch(0.72 0.18 80 / 0.18), 0 20px 60px oklch(0 0 0 / 0.5)"
              },
              "data-ocid": "home.mega_jackpot_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 pointer-events-none opacity-[0.07]",
                    style: {
                      backgroundImage: "linear-gradient(45deg, transparent 40%, oklch(0.72 0.18 80 / 0.8) 50%, transparent 60%), linear-gradient(-45deg, transparent 40%, oklch(0.72 0.18 80 / 0.5) 50%, transparent 60%)",
                      backgroundSize: "80px 80px"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: "🎰" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs uppercase tracking-[0.25em] text-primary/80", children: "LSBFL" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-body font-bold uppercase tracking-wider",
                      style: {
                        background: "oklch(0.72 0.18 80 / 0.2)",
                        border: "1px solid oklch(0.72 0.18 80 / 0.5)",
                        color: "oklch(0.85 0.16 80)"
                      },
                      children: "✦ Mega Jackpot"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-[0.2em] text-white/50 mb-2", children: t("Premio Mayor", "Grand Prize") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display font-black leading-none",
                      style: {
                        fontSize: "clamp(2.4rem, 8vw, 3.6rem)",
                        color: "oklch(0.85 0.18 80)",
                        textShadow: "0 0 30px oklch(0.72 0.18 80 / 0.6), 0 0 80px oklch(0.72 0.18 80 / 0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { target: megaJackpot, prefix: "$", suffix: " USD" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-white/40 mt-2", children: [
                    t("Participantes", "Participants"),
                    ":",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white/70", children: "342,891" }),
                    " · ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 11, className: "inline mb-0.5", "aria-hidden": "true" }),
                    " 23 ",
                    t("países", "countries")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-black/30 border border-white/10 px-4 py-3 mb-5 flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-white/40 uppercase tracking-widest mb-2", children: t("Próximo sorteo", "Next draw") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CountdownTimer,
                    {
                      targetDate: megaLottery.drawDate,
                      className: "text-white"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlowButton,
                  {
                    variant: "gold",
                    size: "xl",
                    shimmer: true,
                    className: "w-full",
                    type: "button",
                    "data-ocid": "home.hero_buy_button",
                    onClick: () => navigate({
                      to: "/purchase/$lotteryId",
                      params: { lotteryId: "classic-645" }
                    }),
                    children: [
                      "🎟️ ",
                      t("Comprar boleto", "Buy ticket")
                    ]
                  }
                )
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 py-5 bg-card border-y border-border/60",
        "data-ocid": "home.quick_nav_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex justify-center gap-3 overflow-x-auto pb-1 scrollbar-none",
            style: { scrollbarWidth: "none" },
            "aria-label": t("Acciones rápidas", "Quick actions"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavItem,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 22 }),
                  label: t("Mis boletos", "My tickets"),
                  to: "/wallet",
                  ocid: "home.quick_nav.wallet",
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavItem,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TvMinimal, { size: 22 }),
                  label: t("Sorteo en vivo", "Live draw"),
                  to: "/draw/draw-001",
                  ocid: "home.quick_nav.draw"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavItem,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 22 }),
                  label: t("Tiendas", "Stores"),
                  to: "/map",
                  ocid: "home.quick_nav.map"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavItem,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22 }),
                  label: t("Comunidad", "Community"),
                  to: "/community",
                  ocid: "home.quick_nav.community"
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-7 bg-background",
        "data-ocid": "home.lotteries_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto lg:max-w-none lg:mx-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 lg:px-6 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground", children: [
              "✦ ",
              t("Sorteos activos", "Active draws")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/wallet",
                className: "text-xs font-body text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors",
                "data-ocid": "home.view_all_link",
                children: [
                  t("Ver todos", "See all"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              className: "flex gap-4 overflow-x-auto px-4 lg:px-6 pb-2 scrollbar-none snap-x snap-mandatory list-none",
              style: { scrollbarWidth: "none" },
              "aria-label": t("Carrusel de sorteos", "Lottery carousel"),
              children: lotteries.map((lottery, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.li,
                {
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.08, duration: 0.4 },
                  className: "min-w-[300px] max-w-[320px] snap-start",
                  "data-ocid": `home.lottery_carousel_item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LotteryCard,
                    {
                      lottery,
                      className: lottery.type === "NoLoss" ? "border-secondary/40" : ""
                    }
                  )
                },
                lottery.id
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 py-7 bg-muted/30 border-t border-border/60",
        "data-ocid": "home.tickets_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground", children: [
              "🎟️ ",
              t("Mis próximos sorteos", "My upcoming draws")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/wallet",
                className: "text-xs font-body text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors",
                "data-ocid": "home.view_all_tickets_link",
                children: [
                  t("Ver todos", "See all"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                ]
              }
            )
          ] }),
          upcomingTickets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "ticket-card bg-card border border-border/50 p-8 text-center",
              "data-ocid": "home.tickets_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-3", children: "🎫" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold text-foreground mb-1", children: t("No tienes boletos activos", "No active tickets yet") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-4", children: t(
                  "¡Compra tu primer boleto y entra al sorteo!",
                  "Buy your first ticket and join the draw!"
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GlowButton,
                  {
                    variant: "outline",
                    size: "md",
                    type: "button",
                    "data-ocid": "home.tickets_empty_buy_button",
                    onClick: () => navigate({
                      to: "/purchase/$lotteryId",
                      params: { lotteryId: lotteries[0].id }
                    }),
                    children: t("Comprar ahora", "Buy now")
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            upcomingTickets.slice(0, 2).map((ticket, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MiniTicketCard, { ticket, index: i }, ticket.id)),
            upcomingTickets.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.25 },
                className: "text-center pt-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/wallet",
                    className: "font-body text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1",
                    "data-ocid": "home.see_more_tickets_link",
                    children: [
                      t(
                        `+${upcomingTickets.length - 2} boletos más`,
                        `+${upcomingTickets.length - 2} more tickets`
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 pt-8 pb-6 bg-card border-t border-border",
        "data-ocid": "home.footer_cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-2xl font-black mb-1",
              style: { color: "oklch(0.85 0.16 80)" },
              children: t("La suerte como un derecho,", "Luck as a right,")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-black text-foreground mb-4", children: t("no como un privilegio.", "not a privilege.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-6", children: t(
            "Desde $1 USD · Sin comisiones ocultas · 23 países",
            "From $1 USD · No hidden fees · 23 countries"
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowButton,
            {
              variant: "gold",
              size: "lg",
              shimmer: true,
              type: "button",
              className: "w-full max-w-xs mx-auto",
              "data-ocid": "home.footer_buy_button",
              onClick: () => navigate({
                to: "/purchase/$lotteryId",
                params: { lotteryId: lotteries[0].id }
              }),
              children: [
                "🎟️ ",
                t("Comprar boleto", "Buy ticket")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-xs text-muted-foreground font-body", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hover:text-primary transition-colors",
                children: "Built with love using caffeine.ai"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
