"use strict";

{
  const INITIAL_WINDOW_WIDTH  = window.innerWidth;
  const INITIAL_WINDOW_HEIGHT = window.innerHeight;
const DEFAULT_XSTEP_LENGTH = 16 + 7 / 1508 * (INITIAL_WINDOW_WIDTH - 412);                         //16px at 412px of width  && 23px at 1920px of width 
const DEFAULT_YSTEP_LENGTH = Math.max(1, Math.abs(38 - 20 / 140 * (INITIAL_WINDOW_HEIGHT - 789))); //38px at 789px of height && 22px at 1920px of height
const DEFAULT_MIN_ANIMATION_FRAMES = INITIAL_WINDOW_HEIGHT / DEFAULT_YSTEP_LENGTH;                 //51 frames at 929px of height
const DEFAULT_FRAME_TIME = 16.6; //in ms
const DEFAULT_XSTEP_LENGTH_CALCULATOR = (remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container) => {
  const _stepLength = total / bss._minAnimationFrame;
  if(_stepLength < 1) return 1;
  if(_stepLength > bss._xStepLength) return bss._xStepLength;
  return _stepLength;
}

const DEFAULT_YSTEP_LENGTH_CALCULATOR = (remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container) => {
  const _stepLength = total / bss._minAnimationFrame;
  if(_stepLength < 1) return 1;
  if(_stepLength > bss._yStepLength) return bss._yStepLength;
  return _stepLength;
}

const DEFAULT_ERROR_LOGGER = (functionName, expectedValue, receivedValue) => {
  if(/disabled/i.test(bss._debugMode)) return;
  
  //Convert to a string and eventually trim the receivedValue.
  const _receivedValueIsString = typeof receivedValue === "string";
  if(!_receivedValueIsString) {
    if(receivedValue === null || receivedValue === undefined) receivedValue = String(receivedValue);
    else if(receivedValue === window) receivedValue = "window";
    else if(Array.isArray(receivedValue)) receivedValue = "[" + receivedValue.toString() + "]"; 
    else if(receivedValue instanceof Element) {
      const _id = receivedValue.id ? "#" + receivedValue.id : "";
      const _className = receivedValue.className ? "." + receivedValue.className : "";
      receivedValue = receivedValue.tagName.toLowerCase() + _id + _className;
    } else {
      receivedValue = receivedValue.name || 
      receivedValue
      .toString()
      .replace(new RegExp("\n", "g"), "");
    } 
  }

  if(receivedValue.length > 40) receivedValue = receivedValue.slice(0, 40) + " ...";
  if(_receivedValueIsString) receivedValue = "\"" + receivedValue + "\"";

  if(/legacy/i.test(bss._debugMode)) {
    console.log("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)\n");
    console.error("BSS ERROR\n", functionName, "was expecting", expectedValue + ", but received", receivedValue + ".");
    throw "BSS fatal error (execution stopped)";
  }

  console.group("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)");

  console.log("%cBSS ERROR", "font-family:system-ui; font-weight:800; font-size:40px; background:#eb445a; color:black; border-radius:5px; padding:0.4vh 0.5vw; margin:1vh 0");
  console.log("%c" + functionName + "%cwas expecting " + expectedValue,
    "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#2dd36f; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
    "font-family:system-ui; font-weight:600; font-size:17px; background:#2dd36f; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
    );
  console.log("%cBut received%c" + receivedValue,
    "font-family:system-ui; font-weight:600; font-size:17px; background:#eb445a; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
    "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#eb445a; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
    );

  console.groupCollapsed("%cStack Trace", "font-family:system-ui; font-weight:500; font-size:17px; background:#3171e0; color:#f5f6f9; border-radius:5px; padding:0.3vh 0.5vw; margin-left:13px");
  console.trace("");
  console.groupEnd("Stack Trace");

  console.groupEnd("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)");
  throw "BSS fatal error (execution stopped)";
}

const DEFAULT_WARNING_LOGGER = (subject, message, keepQuotesForString = true) => {
  if(/disabled/i.test(bss._debugMode)) return;

  //Convert to a string and eventually trim the subject.
  const _subjectIsString = typeof subject === "string";
  if(!_subjectIsString) {
    if(subject === null || subject === undefined) subject = String(subject);
    else if(subject === window) subject = "window";
    else if(Array.isArray(subject)) subject = "[" + subject.toString() + "]"; 
    else if(subject instanceof Element) {
      const _id = subject.id ? "#" + subject.id : "";
      const _className = subject.className ? "." + subject.className : "";
      subject = subject.tagName.toLowerCase() + _id + _className;
    } else {
      subject = subject.name || 
      subject
      .toString()
      .replace(new RegExp("\n", "g"), "");
    }
  }

  if(subject.length > 40) subject = subject.slice(0, 40) + " ...";
  if(_subjectIsString && keepQuotesForString) subject = "\"" + subject + "\"";

  if(/legacy/i.test(bss._debugMode)) {
    console.log("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)\n");
    console.warn("BSS WARNING\n", subject, message + ".");
    return;
  }

  console.groupCollapsed("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)");

  console.log("%cBSS WARNING", "font-family:system-ui; font-weight:800; font-size:40px; background:#fcca03; color:black; border-radius:5px; padding:0.4vh 0.5vw; margin:1vh 0");
  console.log("%c" + subject + "%c" + message,
    "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#fcca03; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
    "font-family:system-ui; font-weight:600; font-size:17px; background:#fcca03; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
    );

  console.groupCollapsed("%cStack Trace", "font-family:system-ui; font-weight:500; font-size:17px; background:#3171e0; color:#f5f6f9; border-radius:5px; padding:0.3vh 0.5vw; margin-left:13px");
  console.trace("");
  console.groupEnd("Stack Trace");

  console.groupEnd("BetterSmoothScroll API (documentation at: https://bettersmoothscroll.web.app)");
}

window.bss = {
  _containersData: new Map(),
  _xStepLength: DEFAULT_XSTEP_LENGTH,
  _yStepLength: DEFAULT_YSTEP_LENGTH,
  _minAnimationFrame: DEFAULT_MIN_ANIMATION_FRAMES,
  _windowWidth:  INITIAL_WINDOW_WIDTH,
  _windowHeight: INITIAL_WINDOW_HEIGHT,
  _scrollbarsMaxDimension: null,
  _framesTime: DEFAULT_FRAME_TIME,
  _pageScroller: null,
  _reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches,
  _onResizeEndCallbacks: [],
  _debugMode: "",
  _errorLogger: DEFAULT_ERROR_LOGGER,
  _warningLogger: DEFAULT_WARNING_LOGGER,
  isXScrolling: (container = bss._pageScroller, options = {debugString: "isXScrolling"}) => {
    if(container === window || container instanceof Element) {
      const _containerData = bss._containersData.get(container) || [];
      return !!_containerData[0];
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  isYScrolling: (container = bss._pageScroller, options = {debugString: "isYScrolling"}) => {
    if(container === window || container instanceof Element) {
      const _containerData = bss._containersData.get(container) || [];
      return !!_containerData[1];
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  isScrolling: (container = bss._pageScroller, options = {debugString: "isScrolling"}) => {
    if(container === window || container instanceof Element) { 
      const _containerData = bss._containersData.get(container) || [];
      return !!_containerData[0] || !!_containerData[1];
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getFinalXPosition: (container = bss._pageScroller, options = {debugString: "getFinalXPosition"}) => {
    //If there's no scroll-animation on the x-axis, the current position is returned instead.
    const _containerData = bss._containersData.get(container) || [];
    return _containerData[2] === 0 ? 0 : _containerData[2] || bss.getScrollXCalculator(container, options)();
  },
  getFinalYPosition: (container = bss._pageScroller, options = {debugString: "getFinalYPosition"}) => {
    //If there's no scroll-animation on the y-axis, the current position is returned instead.
    const _containerData = bss._containersData.get(container) || [];
    return _containerData[3] === 0 ? 0 : _containerData[3] || bss.getScrollYCalculator(container, options)();
  },
  getScrollXDirection: (container = bss._pageScroller, options = {debugString: "getScrollXDirection"}) => {
    if(container === window || container instanceof Element) { 
      //If there's no scroll-animation on the x-axis, 0 is returned instead.
      const _containerData = bss._containersData.get(container) || [];
      return _containerData[4] || 0;
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getScrollYDirection: (container = bss._pageScroller, options = {debugString: "getScrollYDirection"}) => {
    if(container === window || container instanceof Element) { 
      //If there's no scroll-animation on the y-axis, 0 is returned instead.
      const _containerData = bss._containersData.get(container) || [];
      return _containerData[5] || 0;
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);  
  },
  getXStepLengthCalculator: (container = bss._pageScroller, getTemporary = false, options = {debugString: "getXStepLengthCalculator"}) => {
    if(container === window || container instanceof Element) { 
      const _containerData = bss._containersData.get(container) || [];
      return getTemporary ? _containerData[14] : _containerData[12];
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getYStepLengthCalculator: (container = bss._pageScroller, getTemporary = false, options = {debugString: "getYStepLengthCalculator"}) => {    
    if(container === window || container instanceof Element) { 
      const _containerData = bss._containersData.get(container) || [];
      return getTemporary ? _containerData[15] : _containerData[13];
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getXStepLength: () => bss._xStepLength,
  getYStepLength: () => bss._yStepLength,
  getMinAnimationFrame: () => bss._minAnimationFrame,
  getWindowWidth:  () => bss._windowWidth,
  getWindowHeight: () => bss._windowHeight,
  getScrollbarsMaxDimension: (forceCalculation = false) => {
    //Calculate the maximum sizes of scrollbars on the webpage by:
    // - creating a <div> with id = "__bssScrollBox".
    // - giving that <div> a mini-stylesheet that forces it to show the scrollbars.
    if(forceCalculation || !Number.isFinite(bss._scrollbarsMaxDimension)) {
      const __scrollBoxStyle = document.createElement("style");
      const __scrollBox = document.createElement("div");
      __scrollBox.id = "__bss-ScrollBox";
      __scrollBoxStyle.appendChild(
        document.createTextNode(
          "#__bss-ScrollBox { display:block; width:100px; height:100px; overflow-x:scroll; border:none; padding:0px; }"  + 
          "#__bss-ScrollBox::-webkit-scrollbar { display:block; width:initial; height:initial; }"
          )
        );
      document.head.appendChild(__scrollBoxStyle);
      document.body.appendChild(__scrollBox);
      bss._scrollbarsMaxDimension = __scrollBox.offsetHeight - __scrollBox.clientHeight;
      document.body.removeChild(__scrollBox);
      document.head.removeChild(__scrollBoxStyle);
    }

    return bss._scrollbarsMaxDimension;
  },
  getPageScroller: (forceCalculation = false, options = {debugString: "getPageScroller"}) => {
    //Check if the pageScroller has already been calculated.
    if(!forceCalculation && bss._pageScroller) {
      return bss._pageScroller;
    }
    
    //The _pageScroller is the element that can scroll the further between document.documentElement and document.body.
    //If there's a tie or neither of those can scroll, it's defaulted to the 
    //the document.scrollingElement (if supported) or the Window.
    const _htmlMaxScrollX = bss.getMaxScrollX(document.documentElement, true, options);
    const _htmlMaxScrollY = bss.getMaxScrollY(document.documentElement, true, options);
    const _bodyMaxScrollX = bss.getMaxScrollX(document.body, true, options);
    const _bodyMaxScrollY = bss.getMaxScrollY(document.body, true, options);

    //Cache the _pageScroller for later use.
    if(
      (_htmlMaxScrollX >  _bodyMaxScrollX && _htmlMaxScrollY >= _bodyMaxScrollY) ||
      (_htmlMaxScrollX >= _bodyMaxScrollX && _htmlMaxScrollY >  _bodyMaxScrollY)
      ) {
      bss._pageScroller = document.documentElement;
  } else if(
    (_bodyMaxScrollX >  _htmlMaxScrollX && _bodyMaxScrollY >= _htmlMaxScrollY) || 
    (_bodyMaxScrollX >= _htmlMaxScrollX && _bodyMaxScrollY >  _htmlMaxScrollY) 
    ) {
    bss._pageScroller = document.body;
  } else {
    bss._pageScroller = document.scrollingElement || window;
  }

  return bss._pageScroller;
},
getReducedMotionState: () => bss._reducedMotion,
getOnResizeEndCallbacks: () => bss._onResizeEndCallbacks,
getDebugMode: () => bss._debugMode, 
setXStepLengthCalculator: (newCalculator = DEFAULT_XSTEP_LENGTH_CALCULATOR, container = bss._pageScroller, isTemporary = false, options = {debugString: "setXStepLengthCalculator"}) => {
  if(typeof newCalculator !== "function") {
    bss._errorLogger(options.debugString, "the newCalculator to be a function", newCalculator);
    return;
  }
  if(container !== window && !(container instanceof Element)) {
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
    return;
  }
  const _oldData = bss._containersData.get(container);
  const _containerData = _oldData || [];
  if(isTemporary) _containerData[14] = newCalculator;
  else {
    _containerData[12] = newCalculator;
      if(!!_containerData[14]) _containerData[14] = null; //Setting a non-temporary StepLengthCalculator will unset the temporary one
    }
    if(!_oldData) bss._containersData.set(container, _containerData);
  },
  setYStepLengthCalculator: (newCalculator = DEFAULT_YSTEP_LENGTH_CALCULATOR, container = bss._pageScroller, isTemporary = false, options = {debugString: "setYStepLengthCalculator"}) => {
    if(typeof newCalculator !== "function") {
      bss._errorLogger(options.debugString, "the newCalculator to be a function", newCalculator);
      return;
    }
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(isTemporary) _containerData[15] = newCalculator;
    else {
      _containerData[13] = newCalculator;
      if(!!_containerData[15]) _containerData[15] = null; //Setting a non-temporary StepLengthCalculator will unset the temporary one
    }
    if(!_oldData) bss._containersData.set(container, _containerData);
  },
  setStepLengthCalculator: (newCalculator, container = bss._pageScroller, isTemporary = false, options = {debugString: "setStepLengthCalculator"}) => {
    if(typeof newCalculator !== "function") {
      bss._errorLogger(options.debugString, "the newCalculator to be a function", newCalculator);
      return;
    }
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(isTemporary) {
      _containerData[14] = newCalculator;
      _containerData[15] = newCalculator;
    } else {
      _containerData[12] = newCalculator;
      _containerData[13] = newCalculator;

      //Setting a non-temporary StepLengthCalculators will unset the temporary ones.
      if(!!_containerData[14]) _containerData[14] = null;
      if(!!_containerData[15]) _containerData[15] = null;
    }
    if(!_oldData) bss._containersData.set(container, _containerData);
  },
  setXStepLength: (newXStepLength = DEFAULT_XSTEP_LENGTH, options = {debugString: "setXStepLength"}) => {
    if(!Number.isFinite(newXStepLength) || newXStepLength <= 0) {
      bss._errorLogger(options.debugString, "the newXStepLength to be a positive number", newXStepLength);
      return;
    }
    bss._xStepLength = newXStepLength;
  },
  setYStepLength: (newYStepLength = DEFAULT_YSTEP_LENGTH, options = {debugString: "setYStepLength"}) => {
    if(!Number.isFinite(newYStepLength) || newYStepLength <= 0) {
      bss._errorLogger(options.debugString, "the newYStepLength to be a positive number", newYStepLength);
      return;
    }
    bss._yStepLength = newYStepLength;
  },
  setStepLength: (newStepLength, options = {debugString: "setStepLength"}) => {
    if(!Number.isFinite(newStepLength) || newStepLength <= 0) {
      bss._errorLogger(options.debugString, "the newStepLength to be a positive number", newStepLength);
      return;
    }
    bss._xStepLength = newStepLength;
    bss._yStepLength = newStepLength;
  },
  setMinAnimationFrame: (newMinAnimationFrame = DEFAULT_MIN_ANIMATION_FRAMES, options = {debugString: "setMinAnimationFrame"}) => {
    if(!Number.isFinite(newMinAnimationFrame) || newMinAnimationFrame <= 0) {
      bss._errorLogger(options.debugString, "the newMinAnimationFrame to be a positive number", newMinAnimationFrame);
      return;
    }
    bss._minAnimationFrame = newMinAnimationFrame;
  },
  setPageScroller: (newPageScroller, options = {debugString: "setPageScroller"}) => {
    if(newPageScroller !== window && !(newPageScroller instanceof Element)) {
      bss._errorLogger(options.debugString, "the newPageScroller to be an Element or the Window", newPageScroller);
      return;
    }
    bss._pageScroller = newPageScroller;
  },
  addOnResizeEndCallback: (newCallback, options = {debugString: "addOnResizeEndCallback"}) => {
    if(typeof newCallback !== "function") {
      bss._errorLogger(options.debugString, "the newCallback to be a function", newCallback);
      return;
    }
    bss._onResizeEndCallbacks.push(newCallback);
  },
  setDebugMode: (newDebugMode = "", options = {debugString: "setDebugMode"}) => {
    if(typeof newDebugMode === "string") {
      bss._debugMode = newDebugMode;
      return;
    }
    console.error("BSS ERROR\n", 
      options.debugString, 
      "was expecting the newDebugMode to be \"disabled\", \"legacy\" or any other string, but received", newDebugMode + "."
      );
  },
  setErrorLogger: (newErrorLogger = DEFAULT_ERROR_LOGGER, options = {debugString: "setErrorLogger"}) => {
    if(typeof newErrorLogger !== "function") {
      bss._errorLogger(options.debugString, "the newErrorLogger to be a function", newErrorLogger);
      return;
    }
    bss._errorLogger = newErrorLogger;
  }, 
  setWarningLogger: (newWarningLogger = DEFAULT_WARNING_LOGGER, options = {debugString: "setWarningLogger"}) => {
    if(typeof newWarningLogger !== "function") {
      bss._errorLogger(options.debugString, "the newWarningLogger to be a function", newWarningLogger);
      return;
    }
    bss._warningLogger = newWarningLogger;
  }, 
  calcXScrollbarDimension: (container, forceCalculation = false, options = {debugString: "calcXScrollbarDimension"}) => {
    if(container !== window && !(container instanceof HTMLElement || container instanceof SVGElement)) {
      bss._errorLogger(options.debugString, "the container to be an HTMLElement, an SVGElement or the Window", container);
      return;
    }

    //Check if the scrollbarDimension on the x-axis of the passed container have already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && Number.isFinite(_containerData[18])) {
      return _containerData[18]; //Vertical scrollbar's width
    }

    let _scrollbarDimension;

    //The scrollbars can only be 0px on this webpage.
    if(bss.getScrollbarsMaxDimension(false) === 0) {
      _scrollbarDimension = 0;
    } else if(container === window) { 
      options.debugString = "calcXScrollbarDimension(bss.getPageScroller())";
      _scrollbarDimension = bss.getPageScroller(false) === window ? 0 : bss.calcXScrollbarDimension(bss.getPageScroller(false), forceCalculation, options);
    } else {
      const _style = window.getComputedStyle(container);
      const _originalWidth  = Number.parseInt(_style.width);
      const _clientWidth  = container.clientWidth;
      const _originalOverflowY = container.style.overflowY;
      const _originalScrollLeft = container.scrollLeft;

      //The properties of _style are automatically updated whenever the style is changed.
      container.style.overflowY = "hidden"; //The container is forced to hide its vertical scrollbars
      
      //When the vertical scrollbar is hidden the container's width increases only if 
      //it was originally showing a scrollbar, otherwise it remains the same. 
      _scrollbarDimension = Number.parseInt(_style.width) - _originalWidth; //Vertical scrollbar's width

      //If the container is not scrollable but has "overflow:scroll"
      //the dimensions can only be calculated by using clientWidth.
      //If the overflow is "visible" the dimensions are < 0.
      if(_scrollbarDimension === 0)    _scrollbarDimension = container.clientWidth - _clientWidth;
      else if(_scrollbarDimension < 0) _scrollbarDimension = 0;
      
      container.style.overflowY = _originalOverflowY;
      container.scrollLeft = _originalScrollLeft;
    }

    //Cache the value for later use.
    _containerData[18] = _scrollbarDimension;
    if(!_oldData) bss._containersData.set(container, _containerData);

    return _scrollbarDimension;
  },
  calcYScrollbarDimension: (container, forceCalculation = false, options = {debugString: "calcYScrollbarDimension"}) => {
    if(container !== window && !(container instanceof HTMLElement || container instanceof SVGElement)) {
      bss._errorLogger(options.debugString, "the container to be an HTMLElement, an SVGElement or the Window", container);
      return;
    }

    //Check if the scrollbarDimension on the y-axis of the passed container have already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && Number.isFinite(_containerData[19])) {
      return _containerData[19]; //Horizontal scrollbar's height
    }

    let _scrollbarDimension;

    //The scrollbars can only be 0px on this webpage.
    if(bss.getScrollbarsMaxDimension(false) === 0) {
      _scrollbarDimension = 0;
    } else if(container === window) { 
      options.debugString = "calcYScrollbarDimension(bss.getPageScroller())";
      _scrollbarDimension = bss.getPageScroller(false) === window ? 0 : bss.calcYScrollbarDimension(bss.getPageScroller(false), forceCalculation, options);
    } else {
      const _style = window.getComputedStyle(container);
      const _originalHeight = Number.parseInt(_style.height);   
      const _clientHeight = container.clientHeight;
      const _originalOverflowX = container.style.overflowX;
      const _originalScrollTop  = container.scrollTop;

      //The properties of _style are automatically updated whenever the style is changed.
      container.style.overflowX = "hidden"; //The container is forced to hide its horizontal scrollbars
      
      //When the horizontal scrollbar is hidden the container's height increases only if 
      //it was originally showing a scrollbar, otherwise it remains the same. 
      _scrollbarDimension = Number.parseInt(_style.height) - _originalHeight; //Horizontal scrollbar's height

      //If the container is not scrollable but has "overflow:scroll"
      //the dimensions can only be calculated by using clientHeight.
      //If the overflow is "visible" the dimensions are < 0.
      if(_scrollbarDimension === 0)    _scrollbarDimension = container.clientHeight - _clientHeight;
      else if(_scrollbarDimension < 0) _scrollbarDimension = 0;
      
      container.style.overflowX = _originalOverflowX;
      container.scrollTop = _originalScrollTop;
    }

    //Cache the value for later use.
    _containerData[19] = _scrollbarDimension;
    if(!_oldData) bss._containersData.set(container, _containerData);

    return _scrollbarDimension;
  },
  calcScrollbarsDimensions: (container, forceCalculation = false, options = {debugString: "calcScrollbarsDimensions"}) => {
    if(container !== window && !(container instanceof HTMLElement || container instanceof SVGElement)) {
      bss._errorLogger(options.debugString, "the container to be an HTMLElement, an SVGElement or the Window", container);
      return;
    }

    //Check if the scrollbarsDimensions of the passed container have already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && Number.isFinite(_containerData[18]) && Number.isFinite(_containerData[19])) {
      return [
        _containerData[18], //Vertical scrollbar's width
        _containerData[19]  //Horizontal scrollbar's height
        ];
    }

    let _scrollbarsDimensions;

    //The scrollbars can only be 0px on this webpage.
    if(bss.getScrollbarsMaxDimension(false) === 0) {
      _scrollbarsDimensions = [0,0];
    } else if(container === window) { 
      options.debugString = "calcScrollbarsDimensions(bss.getPageScroller())";
      _scrollbarsDimensions = bss.getPageScroller(false) === window ? [0,0] : bss.calcScrollbarsDimensions(bss.getPageScroller(false), forceCalculation, options);
    } else {
      _scrollbarsDimensions = [];
      const _style = window.getComputedStyle(container);
      const _originalWidth  = Number.parseInt(_style.width);
      const _originalHeight = Number.parseInt(_style.height);   
      const _clientWidth  = container.clientWidth;
      const _clientHeight = container.clientHeight;
      const _originalOverflowX = container.style.overflowX;
      const _originalOverflowY = container.style.overflowY;
      const _originalScrollLeft = container.scrollLeft;
      const _originalScrollTop  = container.scrollTop;

      //The properties of _style are automatically updated whenever the style is changed.
      container.style.overflowX = "hidden"; //The container is forced to hide its horizontal scrollbars
      container.style.overflowY = "hidden"; //The container is forced to hide its vertical scrollbars
      
      //When the scrollbars are hidden the container's width/height increase only if 
      //it was originally showing scrollbars, otherwise they remain the same. 
      _scrollbarsDimensions[0] = Number.parseInt(_style.width)  - _originalWidth;  //Vertical scrollbar's width
      _scrollbarsDimensions[1] = Number.parseInt(_style.height) - _originalHeight; //Horizontal scrollbar's height

      //If the container is not scrollable but has "overflow:scroll"
      //the dimensions can only be calculated by using clientWidth/clientHeight.
      //If the overflow is "visible" the dimensions are < 0.
      if(_scrollbarsDimensions[0] === 0)    _scrollbarsDimensions[0] = container.clientWidth - _clientWidth;
      else if(_scrollbarsDimensions[0] < 0) _scrollbarsDimensions[0] = 0;
      
      if(_scrollbarsDimensions[1] === 0)    _scrollbarsDimensions[1] = container.clientHeight - _clientHeight;
      else if(_scrollbarsDimensions[1] < 0) _scrollbarsDimensions[1] = 0;
      
      container.style.overflowX = _originalOverflowX;
      container.style.overflowY = _originalOverflowY;
      container.scrollLeft = _originalScrollLeft;
      container.scrollTop  = _originalScrollTop;
    }

    //Cache the values for later use.
    _containerData[18] = _scrollbarsDimensions[0];
    _containerData[19] = _scrollbarsDimensions[1];
    if(!_oldData) bss._containersData.set(container, _containerData);
    
    return _scrollbarsDimensions;
  },
  calcBordersDimensions: (container, forceCalculation = false, options = {debugString: "calcBordersDimensions"}) => {
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element the Window", container);
      return;
    }

    //Check if the bordersDimensions of the passed container have already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && 
      Number.isFinite(_containerData[20]) && 
      Number.isFinite(_containerData[21]) &&
      Number.isFinite(_containerData[22]) && 
      Number.isFinite(_containerData[23])
      ) {
      return [
        _containerData[20], //top
        _containerData[21], //right
        _containerData[22], //bottom
        _containerData[23], //left
        ];
  }

  let _bordersDimensions;

  if(container === window) { 
    options.debugString = "calcBordersDimensions(bss.getPageScroller())";
    _bordersDimensions = bss.getPageScroller(false) === window ? [0,0,0,0] : bss.calcBordersDimensions(bss.getPageScroller(false), forceCalculation, options);
  } else {
    const _style = window.getComputedStyle(container);
    _bordersDimensions = [
      Number.parseInt(_style.borderTopWidth),
      Number.parseInt(_style.borderRightWidth),
      Number.parseInt(_style.borderBottomWidth),
      Number.parseInt(_style.borderLeftWidth)
      ];
  }

    //Cache the values for later use.
    _containerData[20] = _bordersDimensions[0]; //top
    _containerData[21] = _bordersDimensions[1]; //right
    _containerData[22] = _bordersDimensions[2]; //bottom
    _containerData[23] = _bordersDimensions[3]; //left
    if(!_oldData) bss._containersData.set(container, _containerData);

    return _bordersDimensions;
  },
  getScrollXCalculator: (container = bss._pageScroller, options = {debugString: "getScrollXCalculator"}) => {
    if(container === window)         return () => window.scrollX;
    if(container instanceof Element) return () => container.scrollLeft;
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);                                       
  },
  getScrollYCalculator: (container = bss._pageScroller, options = {debugString: "getScrollYCalculator"}) => {
    if(container === window)         return () => window.scrollY;
    if(container instanceof Element) return () => container.scrollTop;
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getMaxScrollX: (container = bss._pageScroller, forceCalculation = false, options = {debugString: "getMaxScrollX"}) => {
    //Check if the maxScrollX value for the passed container has already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && Number.isFinite(_containerData[16])) return _containerData[16];

    if(container === window) {
      const _originalXPosition = window.scrollX;
      container.scroll(1073741824, window.scrollY); //highest safe scroll value: 2^30 = 1073741824
      const _maxScroll = window.scrollX;
      container.scroll(_originalXPosition, window.scrollY);

      //Cache the value for later use.
      _containerData[16] = _maxScroll;
      if(!_oldData) bss._containersData.set(container, _containerData);

      return _maxScroll;
    }
    if(container instanceof Element) {
      const _originalXPosition = container.scrollLeft;
      container.scrollLeft = 1073741824; //highest safe scroll value: 2^30 = 1073741824
      const _maxScroll = container.scrollLeft;
      container.scrollLeft = _originalXPosition;

      //Cache the value for later use.
      _containerData[16] = _maxScroll;
      if(!_oldData) bss._containersData.set(container, _containerData);
      
      return _maxScroll;
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getMaxScrollY: (container = bss._pageScroller, forceCalculation = false, options = {debugString: "getMaxScrollY"}) => {
    //Check if the maxScrollY value for the passed container has already been calculated. 
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    if(!forceCalculation && Number.isFinite(_containerData[17])) return _containerData[17];

    if(container === window) {
      const _originalYPosition = window.scrollY;
      container.scroll(window.scrollX, 1073741824); //highest safe scroll value: 2^30 = 1073741824
      const _maxScroll = window.scrollY;
      container.scroll(window.scrollX, _originalYPosition);
      
      //Cache the value for later use.
      _containerData[17] = _maxScroll;
      if(!_oldData) bss._containersData.set(container, _containerData);

      return _maxScroll;
    }
    if(container instanceof Element) {
      const _originalYPosition = container.scrollTop;
      container.scrollTop = 1073741824; //highest safe scroll value: 2^30 = 1073741824
      const _maxScroll = container.scrollTop;
      container.scrollTop = _originalYPosition;
      
      //Cache the value for later use.
      _containerData[17] = _maxScroll;
      if(!_oldData) bss._containersData.set(container, _containerData);

      return _maxScroll;
    }
    bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
  },
  getXScrollableParent: (element, includeHiddenParents = false, options = {debugString: "getXScrollableParent"}) => {
    if(element === window) return null;
    if(!(element instanceof Element)) {
      bss._errorLogger(options.debugString, "the element to be an Element or the Window", element);
      return;
    }
    
    //If the element has position:fixed,  
    //it has no scrollable parent
    let _style = window.getComputedStyle(element);
    if(_style.position === "fixed") return null;

    const _body = document.body;
    const _html = document.documentElement; 
    const _overflowRegex = includeHiddenParents ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
    const _relativePositioned = _style.position !== "absolute";
    const _isScrollable = (el) => bss.getMaxScrollX(el) >= 1; 
    element = element.parentElement;

    //Test if the any parent (up to the body) of the passed element 
    //is scrollable on the x-axis
    while(element && element !== _body && element !== _html) {
      _style = window.getComputedStyle(element);
      if((_relativePositioned || _style.position !== "static") && 
        _overflowRegex.test(_style.overflowX) && 
        _isScrollable(element)) {
        return element;
    }
      //If this parent is fixed, no other parent can scroll the element
    if(_style.position === "fixed") return null;
    element = element.parentElement;
  }

  const _overflowRegexWithVisible = includeHiddenParents ? /(visible|auto|scroll|hidden)/ : /(visible|auto|scroll)/;
  if(element === _body && _overflowRegexWithVisible.test(window.getComputedStyle(_body).overflowX) && _isScrollable(_body)) return _body; 
  if(element           && _overflowRegexWithVisible.test(window.getComputedStyle(_html).overflowX) && _isScrollable(_html)) return _html; 
  if(_isScrollable(window)) return window;
  return null; 
},   
getYScrollableParent: (element, includeHiddenParents = false, options = {debugString: "getYScrollableParent"}) => {
  if(element === window) return null;
  if(!(element instanceof Element)) {
    bss._errorLogger(options.debugString, "the element to be an Element or the Window", element);
    return;
  }
  
    //If the element has position:fixed,  
    //it has no scrollable parent
  let _style = window.getComputedStyle(element);
  if(_style.position === "fixed") return null;

  const _body = document.body;
  const _html = document.documentElement; 
  const _overflowRegex = includeHiddenParents ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
  const _relativePositioned = _style.position !== "absolute";
  const _isScrollable = (el) => bss.getMaxScrollY(el) >= 1; 
  element = element.parentElement;

    //Test if the any parent (up to the body) of the passed element 
    //is scrollable on the y-axis
  while(element && element !== _body && element !== _html) {
    _style = window.getComputedStyle(element);
    if((_relativePositioned || _style.position !== "static") && 
      _overflowRegex.test(_style.overflowY) && 
      _isScrollable(element)) {
      return element;
  }
      //If this parent is fixed, no other parent can scroll the element
  if(_style.position === "fixed") return null;
  element = element.parentElement;
}

const _overflowRegexWithVisible = includeHiddenParents ? /(visible|auto|scroll|hidden)/ : /(visible|auto|scroll)/;
if(element === _body && _overflowRegexWithVisible.test(window.getComputedStyle(_body).overflowY) && _isScrollable(_body)) return _body; 
if(element           && _overflowRegexWithVisible.test(window.getComputedStyle(_html).overflowY) && _isScrollable(_html)) return _html; 
if(_isScrollable(window)) return window;
return null; 
},     
getScrollableParent: (element, includeHiddenParents = false, options = {debugString: "getScrollableParent"}) => {
  if(element === window) return null;
  if(!(element instanceof Element)) {
    bss._errorLogger(options.debugString, "the element to be an Element or the Window", element);
    return;
  }
  
    //If the element has position:fixed,  
    //it has no scrollable parent
  let _style = window.getComputedStyle(element);
  if(_style.position === "fixed") return null;

  const _body = document.body;
  const _html = document.documentElement; 
  const _overflowRegex = includeHiddenParents ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
  const _relativePositioned = _style.position !== "absolute";
  const _isScrollable = (el) => bss.getMaxScrollX(el) >= 1 || bss.getMaxScrollY(el) >= 1; 
  element = element.parentElement;

    //Test if the any parent (up to the body) of the passed element 
    //is scrollable on both the x and y axes
  while(element && element !== _body && element !== _html) {
    _style = window.getComputedStyle(element);
    if((_relativePositioned || _style.position !== "static") && 
      _overflowRegex.test(_style.overflow) && 
      _isScrollable(element)) {
      return element;
  }
      //If this parent is fixed, no other parent can scroll the element
  if(_style.position === "fixed") return null;
  element = element.parentElement;
}

const _overflowRegexWithVisible = includeHiddenParents ? /(visible|auto|scroll|hidden)/ : /(visible|auto|scroll)/;
if(element === _body && _overflowRegexWithVisible.test(window.getComputedStyle(_body).overflow) && _isScrollable(_body)) return _body; 
if(element           && _overflowRegexWithVisible.test(window.getComputedStyle(_html).overflow) && _isScrollable(_html)) return _html; 
if(_isScrollable(window)) return window;
return null; 
},    
getAllScrollableParents: (element, includeHiddenParents = false, callback, options = {debugString: "getAllScrollableParents"}) => {
  if(element === window) return [];
  if(!(element instanceof Element)) {
    bss._errorLogger(options.debugString, "the element to be an Element or the Window", element);
    return;
  }
  
    //If the element has position:fixed,  
    //it has no scrollable parent
  let _style = window.getComputedStyle(element);
  if(_style.position === "fixed") return [];

  const _body = document.body;
  const _html = document.documentElement; 
  const _scrollableParents = [];
  const _overflowRegex = includeHiddenParents ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
  const _relativePositioned = _style.position !== "absolute";
  const _callback = typeof callback === "function" ? callback : () => {};
  const _isScrollable = (el) => bss.getMaxScrollX(el) >= 1 || bss.getMaxScrollY(el) >= 1;
  const _scrollableParentFound = (el) => {
    _scrollableParents.push(el);
    _callback(el);
  }
  element = element.parentElement;

    //Test if the any parent (up to the body) of the passed element 
    //is scrollable on both the x and y axes
  while(element && element !== _body && element !== _html) {
    _style = window.getComputedStyle(element);
    if((_relativePositioned || _style.position !== "static") && 
      _overflowRegex.test(_style.overflow) && 
      _isScrollable(element)) {
      _scrollableParentFound(element);
  }
      //If this parent is fixed, no other parent can scroll the element
  if(_style.position === "fixed") return _scrollableParents;
  element = element.parentElement;
}

const _overflowRegexWithVisible = includeHiddenParents ? /(visible|auto|scroll|hidden)/ : /(visible|auto|scroll)/;
if(element === _body && _overflowRegexWithVisible.test(window.getComputedStyle(_body).overflow) && _isScrollable(_body)) _scrollableParentFound(_body); 
if(element           && _overflowRegexWithVisible.test(window.getComputedStyle(_html).overflow) && _isScrollable(_html)) _scrollableParentFound(_html); 
if(_isScrollable(window)) _scrollableParentFound(window);
return _scrollableParents; 
},
scrollXTo: (finalXPosition, container = bss._pageScroller, callback, options = {debugString: "scrollXTo"}) => {
  if(!Number.isFinite(finalXPosition)) {
    bss._errorLogger(options.debugString, "the finalXPosition to be a number", finalXPosition);
    return;
  }

    //The container cannot be scrolled on the x-axis.
  if(bss.getMaxScrollX(container, false, options) < 1) {
    bss._warningLogger(container, "is not scrollable on the x-axis", false);
    bss.stopScrollingX(container, callback);
    return; 
  }

  const _scrollXCalculator = bss.getScrollXCalculator(container);
  let _totalScrollAmount = finalXPosition - _scrollXCalculator();
  const _direction = _totalScrollAmount > 0 ? 1 : -1;
  _totalScrollAmount *= _direction;

    //If the final position has already been reached,
    //or the scroll amount is less than 1px: no scroll-animation is performed.
  if(_totalScrollAmount < 1) {
    bss.stopScrollingX(container, callback);
    return;
  }
  const _scroll = container !== window ? finalPos => container.scrollLeft = finalPos : finalPos => container.scroll(finalPos, window.scrollY);

    //If user prefers reduced motion
    //the API rolls back to the default "jump-to-position" behavior.
  if(bss._reducedMotion) {
    _scroll(finalXPosition);
    bss.stopScrollingX(container, callback);
    return;
  }

    //At this point we know the container has to be scrolled by a certain amount with smooth scroll.
    //Two possible cases:
    //  1) A scroll-animation is already being performed and it can be repurposed.
    //  2) No scroll-animations are being performed, no optimization can be done.
  const _oldData = bss._containersData.get(container);
  const _containerData = _oldData || [];
    _containerData[2]  = finalXPosition;     //finalXPosition
    _containerData[4]  = _direction;         //direction
    _containerData[6]  = _totalScrollAmount; //totalScrollAmount
    _containerData[8]  = null;               //originalTimestamp
    _containerData[10] = callback;           //callback

    //A scroll-animation is already being performed and
    //the scroll-animation's informations have already been updated.
    if(!!_containerData[0]) return;

    //No scroll-animation is being performed so a new one is created.
    _containerData[0] = window.requestAnimationFrame(_stepX);
    if(!_oldData) bss._containersData.set(container, _containerData);

    function _stepX(timestamp) {
      const _finalXPosition = _containerData[2];
      const _direction = _containerData[4];
      const _currentXPosition = _scrollXCalculator();
      const _remaningScrollAmount = (_finalXPosition - _currentXPosition) * _direction;
      
      if(_remaningScrollAmount < 1) {
        bss.stopScrollingX(container, _containerData[10]);
        return;
      }
      
      //The originalTimeStamp is null at the beginning of a scroll-animation.
      if(!_containerData[8]) _containerData[8] = timestamp;
      
      const _scrollID = _containerData[0];  
      let _stepLength = !!_containerData[14] ? _containerData[14](_remaningScrollAmount, _containerData[8], timestamp, _containerData[6], _currentXPosition, _finalXPosition, container) :
      !!_containerData[12] ? _containerData[12](_remaningScrollAmount, _containerData[8], timestamp, _containerData[6], _currentXPosition, _finalXPosition, container) :
      DEFAULT_XSTEP_LENGTH_CALCULATOR(_remaningScrollAmount, _containerData[8], timestamp, _containerData[6], _currentXPosition, _finalXPosition, container);
      
      //The current scroll-animation has been aborted by the stepLengthCalculator.
      if(_scrollID !== _containerData[0]) return; 

      //The current scroll-animation has been altered by the stepLengthCalculator.
      if(_finalXPosition !== _containerData[2]) {  
        _containerData[0] = window.requestAnimationFrame(_stepX); 
        return;
      } 

      //The stepLengthCalculator returned an invalid stepLength.
      if(!Number.isFinite(_stepLength)) {
        bss._warningLogger(_stepLength, "is not a valid step length", true);
        _stepLength = DEFAULT_XSTEP_LENGTH_CALCULATOR(_remaningScrollAmount, _containerData[8], timestamp, _containerData[6], _currentXPosition, _finalXPosition, container);
      }

      if(_remaningScrollAmount <= _stepLength) {
        _scroll(_finalXPosition);
        bss.stopScrollingX(container, _containerData[10]);
        return;
      }

      _scroll(_currentXPosition + _stepLength * _direction);

      //The API tried to scroll but the finalXPosition was beyond the scroll limit of the container.
      if(_stepLength !== 0 && _currentXPosition === _scrollXCalculator()) {
        bss.stopScrollingX(container, _containerData[10]);
        return;
      }

      _containerData[0] = window.requestAnimationFrame(_stepX);
    }
  },
  scrollYTo: (finalYPosition, container = bss._pageScroller, callback, options = {debugString: "scrollYTo"}) => {
    if(!Number.isFinite(finalYPosition)) {
      bss._errorLogger(options.debugString, "the finalYPosition to be a number", finalYPosition);
      return;
    }

    //The container cannot be scrolled on the y-axis.
    if(bss.getMaxScrollY(container, false, options) < 1) {
      bss._warningLogger(container, "is not scrollable on the y-axis", false);
      bss.stopScrollingY(container, callback);
      return;
    }

    const _scrollYCalculator = bss.getScrollYCalculator(container);
    let _totalScrollAmount = finalYPosition - _scrollYCalculator();
    const _direction = _totalScrollAmount > 0 ? 1 : -1;
    _totalScrollAmount *= _direction;

    //If the final position has already been reached,
    //or the scroll amount is less than 1px: no scroll-animation is performed.
    if(_totalScrollAmount < 1) {
      bss.stopScrollingY(container, callback);
      return;
    }
    const _scroll = container !== window ? finalPos => container.scrollTop = finalPos : finalPos => container.scroll(window.scrollX, finalPos);

    //If user prefers reduced motion
    //the API rolls back to the default "jump-to-position" behavior.
    if(bss._reducedMotion) {
      _scroll(finalYPosition);
      bss.stopScrollingY(container, callback);
      return;
    }

    //At this point we know the container has to be scrolled by a certain amount with smooth scroll.
    //Two possible cases:
    //  1) A scroll-animation is already being performed and it can be repurposed.
    //  2) No scroll-animations are being performed, no optimization can be done.
    const _oldData = bss._containersData.get(container);
    const _containerData = _oldData || [];
    _containerData[3]  = finalYPosition;     //finalYPosition
    _containerData[5]  = _direction;         //direction
    _containerData[7]  = _totalScrollAmount; //totalScrollAmount
    _containerData[9]  = null;               //originalTimestamp
    _containerData[11] = callback;           //callback

    //A scroll-animation is already being performed and
    //the scroll-animation's informations have already been updated.
    if(!!_containerData[1]) return;

    //No scroll-animation is being performed so a new one is created.
    _containerData[1] = window.requestAnimationFrame(_stepY);
    if(!_oldData) bss._containersData.set(container, _containerData);
    
    function _stepY(timestamp) {
      const _finalYPosition = _containerData[3];
      const _direction = _containerData[5];
      const _currentYPosition = _scrollYCalculator();
      const _remaningScrollAmount = (_finalYPosition - _currentYPosition) * _direction;

      if(_remaningScrollAmount < 1) {
        bss.stopScrollingY(container, _containerData[11]);
        return;
      }

      //The originalTimeStamp is null at the beginning of a scroll-animation.
      if(!_containerData[9]) _containerData[9] = timestamp;

      const _scrollID = _containerData[1];
      let _stepLength = !!_containerData[15] ? _containerData[15](_remaningScrollAmount, _containerData[9], timestamp, _containerData[7], _currentYPosition, _finalYPosition, container) :
      !!_containerData[13] ? _containerData[13](_remaningScrollAmount, _containerData[9], timestamp, _containerData[7], _currentYPosition, _finalYPosition, container) :
      DEFAULT_YSTEP_LENGTH_CALCULATOR(_remaningScrollAmount, _containerData[9], timestamp, _containerData[7], _currentYPosition, _finalYPosition, container);
      
      //The current scroll-animation has been aborted by the stepLengthCalculator.
      if(_scrollID !== _containerData[1]) return; 

      //The current scroll-animation has been altered by the stepLengthCalculator.
      if(_finalYPosition !== _containerData[3]) {  
        _containerData[1] = window.requestAnimationFrame(_stepY); 
        return;
      } 
      
      //The stepLengthCalculator returned an invalid stepLength.
      if(!Number.isFinite(_stepLength)) {
        bss._warningLogger(_stepLength, "is not a valid step length", true);
        _stepLength = DEFAULT_YSTEP_LENGTH_CALCULATOR(_remaningScrollAmount, _containerData[9], timestamp, _containerData[7], _currentYPosition, _finalYPosition, container);
      }

      if(_remaningScrollAmount <= _stepLength) {
        _scroll(_finalYPosition);
        bss.stopScrollingY(container, _containerData[11]);
        return;
      }

      _scroll(_currentYPosition + _stepLength * _direction);

      //The API tried to scroll but the finalYPosition was beyond the scroll limit of the container.
      if(_stepLength !== 0 && _currentYPosition === _scrollYCalculator()) {
        bss.stopScrollingY(container, _containerData[11]);
        return;
      }

      _containerData[1] = window.requestAnimationFrame(_stepY);
    }
  },
  scrollXBy: (deltaX, container = bss._pageScroller, callback, stillStart = true, options = {debugString: "scrollXBy"}) => {
    if(!Number.isFinite(deltaX)) {
      bss._errorLogger(options.debugString, "the deltaX to be a number", deltaX);
      return;
    }

    const _currentXPosition = bss.getScrollXCalculator(container, options)();
    if(!stillStart) {
      const _containerData = bss._containersData.get(container) || [];

      //A scroll-animation on the x-axis is already being performed and can be repurposed.
      if(!!_containerData[0]) {     

        //An actual scroll has been requested.   
        if(deltaX !== 0) { 
          const _finalXPosition = _containerData[2] + deltaX;
          const _remaningScrollAmount = (_finalXPosition - _currentXPosition) * _containerData[4];
          
          //The scroll-animation has to scroll less than 1px.
          if(_remaningScrollAmount * _remaningScrollAmount < 1) { 
            bss.stopScrollingX(container, callback);
            return;
          }

          //Thanks to the new deltaX, the current scroll-animation 
          //has already surpassed the old finalXPosition.
          if(_remaningScrollAmount < 0) {
            bss.scrollXTo(_finalXPosition, container, callback);
            return;
          }
          
          const _totalScrollAmount = _containerData[6] * _containerData[4] + deltaX; 
          _containerData[2] = _finalXPosition;                        //finalXPosition
          _containerData[4] = _totalScrollAmount > 0 ? 1 : -1;        //direction
          _containerData[6] = _totalScrollAmount * _containerData[4]; //totalScrollAmount (always positive)
        }
        _containerData[8]  = null;                                    //originalTimestamp
        _containerData[10] = callback;                                //callback
        return;
      }
    }

    bss.scrollXTo(_currentXPosition + deltaX, container, callback);
  },
  scrollYBy: (deltaY, container = bss._pageScroller, callback, stillStart = true, options = {debugString: "scrollYBy"}) => {
    if(!Number.isFinite(deltaY)) {
      bss._errorLogger(options.debugString, "the deltaY to be a number", deltaY);
      return;
    }

    const _currentYPosition = bss.getScrollYCalculator(container, options)();
    if(!stillStart) {
      const _containerData = bss._containersData.get(container) || [];

      //A scroll-animation on the y-axis is already being performed and can be repurposed.
      if(!!_containerData[1]) {     

        //An actual scroll has been requested.   
        if(deltaY !== 0) { 
          const _finalYPosition = _containerData[3] + deltaY;
          const _remaningScrollAmount = (_finalYPosition - _currentYPosition) * _containerData[5];
          
          //The scroll-animation has to scroll less than 1px. 
          if(_remaningScrollAmount * _remaningScrollAmount < 1) { 
            bss.stopScrollingY(container, callback);
            return;
          }

          //Thanks to the new deltaY, the current scroll-animation 
          //has already surpassed the old finalYPosition. 
          if(_remaningScrollAmount < 0) {
            bss.scrollYTo(_finalYPosition, container, callback);
            return;
          }
          
          const _totalScrollAmount = _containerData[7] * _containerData[5] + deltaY; 
          _containerData[3] = _finalYPosition;                        //finalYPosition
          _containerData[5] = _totalScrollAmount > 0 ? 1 : -1;        //direction
          _containerData[7] = _totalScrollAmount * _containerData[5]; //totalScrollAmount (always positive)
        }
        _containerData[9]  = null;                                    //originalTimestamp
        _containerData[11] = callback;                                //callback
        return;
      }
    }

    bss.scrollYTo(_currentYPosition + deltaY, container, callback);
  },
  scrollTo: (finalXPosition, finalYPosition, container = bss._pageScroller, callback, options = {debugString: "scrollTo"}) => {
    if(typeof callback !== "function") {
      bss.scrollXTo(finalXPosition, container, null, options);
      bss.scrollYTo(finalYPosition, container, null, options);
      return;
    }
    //Execute the callback only if the initialization has finished and 
    //the scroll-animation on the y-axis has finished too or it has been altered.
    const _scrollXCallback = () => {
      const _containerData = bss._containersData.get(container) || [];
      if(!_initPhase && _containerData[11] !== _scrollYCallback) callback();
    }
    //Execute the callback only if the initialization has finished and 
    //the scroll-animation on the x-axis has finished too or it has been altered.
    const _scrollYCallback = () => {
      const _containerData = bss._containersData.get(container) || [];
      if(!_initPhase && _containerData[10] !== _scrollXCallback) callback();
    }

    let _initPhase = true;
    bss.scrollXTo(finalXPosition, container, _scrollXCallback, options);
    _initPhase = false;
    bss.scrollYTo(finalYPosition, container, _scrollYCallback, options);
  },
  scrollBy: (deltaX, deltaY, container = bss._pageScroller, callback, stillStart = true, options = {debugString: "scrollBy"}) => {
    if(typeof callback !== "function") {
      bss.scrollXBy(deltaX, container, null, stillStart, options);
      bss.scrollYBy(deltaY, container, null, stillStart, options);
      return;
    }
    //Execute the callback only if the initialization has finished and 
    //the scroll-animation on the y-axis has finished too or it has been altered.
    const _scrollXCallback = () => {
      const _containerData = bss._containersData.get(container) || [];
      if(!_initPhase && _containerData[11] !== _scrollYCallback) callback();
    }
    //Execute the callback only if the initialization has finished and 
    //the scroll-animation on the x-axis has finished too or it has been altered.
    const _scrollYCallback = () => {
      const _containerData = bss._containersData.get(container) || [];
      if(!_initPhase && _containerData[10] !== _scrollXCallback) callback();
    }

    let _initPhase = true;
    bss.scrollXBy(deltaX, container, _scrollXCallback, stillStart, options);
    _initPhase = false;
    bss.scrollYBy(deltaY, container, _scrollYCallback, stillStart, options);
  },
  scrollIntoView: (element, alignToLeft = true, alignToTop = true, callback, includeHiddenParents = false, options = {debugString: "scrollIntoView"}) => {
    let _containerIndex = -1;
    const _containers = bss.getAllScrollableParents(element, includeHiddenParents, () => _containerIndex++, options);
    
    //The element cannot be scrolled into view
    if(_containerIndex < 0) { 
      if(typeof callback === "function") callback();
      return;
    }
    
    //If the Window and the html/body elements are scrollable parents of the passed element, 
    //scrolling the Window can actually scroll the other two.
    //If this is the case remove the redundant html/body element.
    if(_containers[_containerIndex] === window) {
      const _html = document.documentElement;
      const _body = document.body;
      
      if(_containers[_containerIndex - 1] === _html && _canWindowScrollElement(_html)) {
        _containerIndex--;
        _containers.splice(_containerIndex, 1);
      }

      if(_containers[_containerIndex - 1] === _body && _canWindowScrollElement(_body)) {
        _containerIndex--;
        _containers.splice(_containerIndex, 1);
      }
    }

    let _alignToLeft = alignToLeft;
    let _alignToTop  = alignToTop;
    let _currentContainer = _containers[_containerIndex];
    let _currentElement = _containers[_containerIndex - 1] || element;

    const _callback = () => {
      if(_containerIndex < 1) {
        if(typeof callback === "function") callback();
        return;
      } 
      _containerIndex--;
      _currentContainer = _containers[_containerIndex];
      _currentElement   = _containers[_containerIndex - 1] || element;
      _scrollContainer();
    };

    _scrollContainer();

    //Tests if scrolling the Window also scrolls the passed element.
    function _canWindowScrollElement(element) {
      //Save the original scroll positions of the Window and the element.
      const _originalWindowXPosition = window.scrollX;
      const _originalWindowYPosition = window.scrollY; 
      const _originalElementXPosition = element.scrollLeft;
      const _originalElementYPosition = element.scrollTop; 

      //Scroll the Window and the element to a known initial position.
      window.scroll(0,0);
      element.scroll(0,0);

      //Scroll the Window and test if the element has the same scroll positions.
      window.scroll(100, 100);
      const _windowScrollsElement = element.scrollLeft === window.scrollX && 
      element.scrollTop === window.scrollY;
      
      //Restore the original scroll positions of the Window and the element.
      if(!_windowScrollsElement) {
        element.scroll(_originalElementXPosition, _originalElementYPosition);
      }
      window.scroll(_originalWindowXPosition, _originalWindowYPosition);
      
      return _windowScrollsElement;
    }

    //Execute all the calculations needed for scrolling an element into view.
    function _scrollContainer() {   
      //_scrollbarsDimensions[0] = _currentContainer's vertical scrollbar's width
      //_scrollbarsDimensions[1] = _currentContainer's horizontal scrollbar's height
      const _scrollbarsDimensions = bss.calcScrollbarsDimensions(_currentContainer, false);

      //_bordersDimensions[0] = _currentContainer's top border size
      //_bordersDimensions[1] = _currentContainer's right border size
      //_bordersDimensions[2] = _currentContainer's bottom border size
      //_bordersDimensions[3] = _currentContainer's left border size
      const _bordersDimensions = bss.calcBordersDimensions(_currentContainer, false);   

      const _containerRect = _currentContainer !== window ? _currentContainer.getBoundingClientRect() : {left: 0, top: 0, width: bss._windowWidth, height: bss._windowHeight};
      const _containerWidth  = _containerRect.width;
      const _containerHeight = _containerRect.height;

      const _elementRect = _currentElement.getBoundingClientRect(); //_currentElement can never be the Window
      const _elementWidth  = _elementRect.width;
      const _elementHeight = _elementRect.height;
      const _elementInitialX = _elementRect.left - _containerRect.left; //_currentElement's x-coordinate relative to it's container
      const _elementInitialY = _elementRect.top  - _containerRect.top;  //_currentElement's y-coordinate relative to it's container

      //Align to "nearest" is an indirect way to say: Align to "top" / "bottom" / "center".
      if(/nearest/i.test(alignToLeft)) {
        const _leftDelta   = _elementInitialX > 0 ? _elementInitialX : -_elementInitialX;  //distance from left border    (container<-element  container)
        const _rightDelta  = Math.abs(_containerWidth - _elementInitialX - _elementWidth); //distance from right border   (container  element->container)
        const _centerDelta = Math.abs(0.5 * (_containerWidth - _elementWidth) - _elementInitialX); //distance from center (container->element<-container)
        _alignToLeft = _leftDelta < _centerDelta ? true : _rightDelta < _centerDelta ? false : null;
      }

      if(/nearest/i.test(alignToTop)) {
        const _topDelta    = _elementInitialY > 0 ? _elementInitialY : -_elementInitialY;    //distance from top border     (container↑↑element  container)
        const _bottomDelta = Math.abs(_containerHeight - _elementInitialY - _elementHeight); //distance from bottom border  (container  element↓↓container)
        const _centerDelta = Math.abs(0.5 * (_containerHeight - _elementHeight) - _elementInitialY); //distance from center (container↓↓element↑↑container)
        _alignToTop = _topDelta < _centerDelta ? true : _bottomDelta < _centerDelta ? false : null;
      }
      
      const _elementFinalX = _alignToLeft === true  ? _bordersDimensions[3] : 
      _alignToLeft === false ? _containerWidth  - _elementWidth  - _scrollbarsDimensions[0] - _bordersDimensions[1] : 
      (_containerWidth  - _elementWidth  - _scrollbarsDimensions[0] - _bordersDimensions[1] + _bordersDimensions[3]) * 0.5;
      const _elementFinalY = _alignToTop  === true  ? _bordersDimensions[0] : 
      _alignToTop  === false ? _containerHeight - _elementHeight - _scrollbarsDimensions[1] - _bordersDimensions[2] : 
      (_containerHeight - _elementHeight - _scrollbarsDimensions[1] - _bordersDimensions[2] + _bordersDimensions[0]) * 0.5;
      
      const _deltaX = Math.round(_elementInitialX - _elementFinalX);
      const _deltaY = Math.round(_elementInitialY - _elementFinalY);
      const _scrollContainerX = _deltaX !== 0 && bss.getMaxScrollX(_currentContainer) >= 1;
      const _scrollContainerY = _deltaY !== 0 && bss.getMaxScrollY(_currentContainer) >= 1;

      if(_scrollContainerX && _scrollContainerY) bss.scrollBy(_deltaX, _deltaY, _currentContainer, _callback);
      else if(_scrollContainerX) bss.scrollXBy(_deltaX, _currentContainer, _callback);
      else if(_scrollContainerY) bss.scrollYBy(_deltaY, _currentContainer, _callback);
      else _callback();
    }
  },
  scrollIntoViewIfNeeded: (element, alignToCenter = true, callback, includeHiddenParents = false, options = {debugString: "scrollIntoViewIfNeeded"}) => {
    let _containerIndex = -1;
    const _containers = bss.getAllScrollableParents(element, includeHiddenParents, () => _containerIndex++, options);
    
    //The element cannot be scrolled into view
    if(_containerIndex < 0) { 
      if(typeof callback === "function") callback();
      return;
    }
    
    //If the Window and the html/body elements are scrollable parents of the passed element, 
    //scrolling the Window can actually scroll the other two.
    //If this is the case remove the redundant html/body element.
    if(_containers[_containerIndex] === window) {
      const _html = document.documentElement;
      const _body = document.body;
      
      if(_containers[_containerIndex - 1] === _html && _canWindowScrollElement(_html)) {
        _containerIndex--;
        _containers.splice(_containerIndex, 1);
      }

      if(_containers[_containerIndex - 1] === _body && _canWindowScrollElement(_body)) {
        _containerIndex--;
        _containers.splice(_containerIndex, 1);
      }
    }

    let _alignToLeft = null;
    let _alignToTop  = null;
    let _currentContainer = _containers[_containerIndex];
    let _currentElement = _containers[_containerIndex - 1] || element;
    
    const _callback = () => {
      if(_containerIndex < 1) {
        if(typeof callback === "function") callback();
        return;
      } 
      _containerIndex--;
      _currentContainer = _containers[_containerIndex];
      _currentElement   = _containers[_containerIndex - 1] || element;
      _scrollContainer();
    };

    _scrollContainer();

    //Tests if scrolling the Window also scrolls the passed element.
    function _canWindowScrollElement(element) {
      //Save the original scroll positions of the Window and the element.
      const _originalWindowXPosition = window.scrollX;
      const _originalWindowYPosition = window.scrollY; 
      const _originalElementXPosition = element.scrollLeft;
      const _originalElementYPosition = element.scrollTop; 

      //Scroll the Window and the element to a known initial position.
      window.scroll(0,0);
      element.scroll(0,0);

      //Scroll the Window and test if the element has the same scroll positions.
      window.scroll(100, 100);
      const _windowScrollsElement = element.scrollLeft === window.scrollX && 
      element.scrollTop === window.scrollY;
      
      //Restore the original scroll positions of the Window and the element.
      if(!_windowScrollsElement) {
        element.scroll(_originalElementXPosition, _originalElementYPosition);
      }
      window.scroll(_originalWindowXPosition, _originalWindowYPosition);
      
      return _windowScrollsElement;
    }

    //Execute all the calculations needed for scrolling an element into view.
    function _scrollContainer() {   
      //_scrollbarsDimensions[0] = _currentContainer's vertical scrollbar's width
      //_scrollbarsDimensions[1] = _currentContainer's horizontal scrollbar's height
      const _scrollbarsDimensions = bss.calcScrollbarsDimensions(_currentContainer, false);

      //_bordersDimensions[0] = _currentContainer's top border size
      //_bordersDimensions[1] = _currentContainer's right border size
      //_bordersDimensions[2] = _currentContainer's bottom border size
      //_bordersDimensions[3] = _currentContainer's left border size
      const _bordersDimensions = bss.calcBordersDimensions(_currentContainer, false);   

      const _containerRect = _currentContainer !== window ? _currentContainer.getBoundingClientRect() : {left: 0, top: 0, width: bss._windowWidth, height: bss._windowHeight};
      const _containerWidth  = _containerRect.width;
      const _containerHeight = _containerRect.height;

      const _elementRect = _currentElement.getBoundingClientRect(); //_currentElement can never be the Window
      const _elementWidth  = _elementRect.width;
      const _elementHeight = _elementRect.height;
      const _elementInitialX = _elementRect.left - _containerRect.left; //_currentElement's x-coordinate relative to it's container
      const _elementInitialY = _elementRect.top  - _containerRect.top;  //_currentElement's y-coordinate relative to it's container
      
      const _elementIntoViewX = _elementInitialX > -1 && _elementInitialX + _elementWidth  - _containerWidth  + _scrollbarsDimensions[0] < 1;  //Checks if the element is already in the viewport on the x-axis
      const _elementIntoViewY = _elementInitialY > -1 && _elementInitialY + _elementHeight - _containerHeight + _scrollbarsDimensions[1] < 1;  //Checks if the element is already in the viewport on the y-axis    
      const _elementOverflowX = _elementInitialX <= 0 && _elementInitialX + _elementWidth  - _containerWidth  + _scrollbarsDimensions[0] >= 0; //Checks if the element's width is bigger than its container's width
      const _elementOverflowY = _elementInitialY <= 0 && _elementInitialY + _elementHeight - _containerHeight + _scrollbarsDimensions[1] >= 0; //Checks if the element's height is bigger than its container's height
      const _isOriginalElement = _currentElement === element;
      let _scrollNotNeededX = _elementIntoViewX || (_isOriginalElement && _elementOverflowX);
      let _scrollNotNeededY = _elementIntoViewY || (_isOriginalElement && _elementOverflowY);

      if(_scrollNotNeededX && _scrollNotNeededY) { 
        if(_isOriginalElement) {
          if(typeof callback === "function") callback();
        } else {
          _containerIndex--;
          _currentContainer = _containers[_containerIndex];
          _currentElement   = _containerIndex < 1 ? element : _containers[_containerIndex - 1];
          _scrollContainer();
        }
        return;
      } 
      
      //Possible alignments for the original element: center or nearest.
      //Possible alignments for its containers: nearest.
      if(_isOriginalElement && alignToCenter === true) { 
        _scrollNotNeededX = false;
        _scrollNotNeededY = false;
      } else {
        if(!_scrollNotNeededX) { //Scroll needed on x-axis
          const _leftDelta   = _elementInitialX > 0 ? _elementInitialX : -_elementInitialX;  //distance from left border    (container<-element  container)
          const _rightDelta  = Math.abs(_containerWidth - _elementInitialX - _elementWidth); //distance from right border   (container  element->container)
          const _centerDelta = Math.abs(0.5 * (_containerWidth - _elementWidth) - _elementInitialX); //distance from center (container->element<-container)
          _alignToLeft = _leftDelta < _centerDelta ? true : _rightDelta < _centerDelta ? false : null;
        }

        if(!_scrollNotNeededY) { //Scroll needed on y-axis
          const _topDelta    = _elementInitialY > 0 ? _elementInitialY : -_elementInitialY;    //distance from top border     (container↑↑element  container)
          const _bottomDelta = Math.abs(_containerHeight - _elementInitialY - _elementHeight); //distance from bottom border  (container  element↓↓container)
          const _centerDelta = Math.abs(0.5 * (_containerHeight - _elementHeight) - _elementInitialY); //distance from center (container↓↓element↑↑container)
          _alignToTop = _topDelta < _centerDelta ? true : _bottomDelta < _centerDelta ? false : null;
        }
      } 

      const _elementFinalX = _scrollNotNeededX ? _elementInitialX : 
      _alignToLeft === true  ? _bordersDimensions[3] : 
      _alignToLeft === false ? _containerWidth  - _elementWidth  - _scrollbarsDimensions[0] - _bordersDimensions[1] : 
      (_containerWidth  - _elementWidth  - _scrollbarsDimensions[0] - _bordersDimensions[1] + _bordersDimensions[3]) * 0.5;
      const _elementFinalY = _scrollNotNeededY ? _elementInitialY : 
      _alignToTop  === true  ? _bordersDimensions[0] :
      _alignToTop  === false ? _containerHeight - _elementHeight - _scrollbarsDimensions[1] - _bordersDimensions[2] : 
      (_containerHeight - _elementHeight - _scrollbarsDimensions[1] - _bordersDimensions[2] + _bordersDimensions[0]) * 0.5;
      
      const _deltaX = Math.round(_elementInitialX - _elementFinalX);
      const _deltaY = Math.round(_elementInitialY - _elementFinalY);
      const _scrollContainerX = _deltaX !== 0 && bss.getMaxScrollX(_currentContainer) >= 1;
      const _scrollContainerY = _deltaY !== 0 && bss.getMaxScrollY(_currentContainer) >= 1;

      if(_scrollContainerX && _scrollContainerY) bss.scrollBy(_deltaX, _deltaY, _currentContainer, _callback);
      else if(_scrollContainerX) bss.scrollXBy(_deltaX, _currentContainer, _callback);
      else if(_scrollContainerY) bss.scrollYBy(_deltaY, _currentContainer, _callback);
      else _callback();
    }
  },
  stopScrollingX: (container = bss._pageScroller, callback, options = {debugString: "stopScrollingX"}) => {
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }
    const _containerData = bss._containersData.get(container) || [];
    window.cancelAnimationFrame(_containerData[0]); 
    _containerData[0] = null;  //scrollID on x-axis
    _containerData[10] = null; //callback on x-axis

    //No scroll-animation on the y-axis is being performed.
    if(!_containerData[1]) { 
      const _newData = [];
      if(!!_containerData[12]) _newData[12] = _containerData[12];
      if(!!_containerData[13]) _newData[13] = _containerData[13];
      
      //Cached values.
      if(Number.isFinite(_containerData[16])) _newData[16] = _containerData[16]; //maxScrollX
      if(Number.isFinite(_containerData[17])) _newData[17] = _containerData[17]; //maxScrollY
      if(Number.isFinite(_containerData[18])) _newData[18] = _containerData[18]; //vertical scrollbar's width
      if(Number.isFinite(_containerData[19])) _newData[19] = _containerData[19]; //horizontal scrollbar's height
      if(Number.isFinite(_containerData[20])) _newData[20] = _containerData[20]; //top border's height
      if(Number.isFinite(_containerData[21])) _newData[21] = _containerData[21]; //right border's width
      if(Number.isFinite(_containerData[22])) _newData[22] = _containerData[22]; //bottom border's height
      if(Number.isFinite(_containerData[23])) _newData[23] = _containerData[23]; //left border's width
      bss._containersData.set(container, _newData);
    }

    if(typeof callback === "function") callback();
  },
  stopScrollingY: (container = bss._pageScroller, callback, options = {debugString: "stopScrollingY"}) => {
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }
    const _containerData = bss._containersData.get(container) || [];
    window.cancelAnimationFrame(_containerData[1]);
    _containerData[1] = null; //scrollID on y-axis
    _containerData[11] = null; //callback on x-axis
    
    //No scroll-animation on the x-axis is being performed.
    if(!_containerData[0]) { 
      const _newData = [];
      if(!!_containerData[12]) _newData[12] = _containerData[12];
      if(!!_containerData[13]) _newData[13] = _containerData[13];
      
      //Cached values.
      if(Number.isFinite(_containerData[16])) _newData[16] = _containerData[16]; //maxScrollX
      if(Number.isFinite(_containerData[17])) _newData[17] = _containerData[17]; //maxScrollY
      if(Number.isFinite(_containerData[18])) _newData[18] = _containerData[18]; //vertical scrollbar's width
      if(Number.isFinite(_containerData[19])) _newData[19] = _containerData[19]; //horizontal scrollbar's height
      if(Number.isFinite(_containerData[20])) _newData[20] = _containerData[20]; //top border's height
      if(Number.isFinite(_containerData[21])) _newData[21] = _containerData[21]; //right border's width
      if(Number.isFinite(_containerData[22])) _newData[22] = _containerData[22]; //bottom border's height
      if(Number.isFinite(_containerData[23])) _newData[23] = _containerData[23]; //left border's width
      bss._containersData.set(container, _newData);
    }

    if(typeof callback === "function") callback();
  },
  stopScrolling: (container = bss._pageScroller, callback, options = {debugString: "stopScrolling"}) => {
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }
    const _containerData = bss._containersData.get(container) || [];
    window.cancelAnimationFrame(_containerData[0]);
    window.cancelAnimationFrame(_containerData[1]);
    _containerData[0] = null;  //scrollID on x-axis
    _containerData[1] = null;  //scrollID on y-axis
    _containerData[10] = null; //callback on x-axis
    _containerData[11] = null; //callback on y-axis
    
    const _newData = [];
    if(!!_containerData[12]) _newData[12] = _containerData[12];
    if(!!_containerData[13]) _newData[13] = _containerData[13];

    //Cached values.  
    if(Number.isFinite(_containerData[16])) _newData[16] = _containerData[16]; //maxScrollX
    if(Number.isFinite(_containerData[17])) _newData[17] = _containerData[17]; //maxScrollY
    if(Number.isFinite(_containerData[18])) _newData[18] = _containerData[18]; //vertical scrollbar's width
    if(Number.isFinite(_containerData[19])) _newData[19] = _containerData[19]; //horizontal scrollbar's height
    if(Number.isFinite(_containerData[20])) _newData[20] = _containerData[20]; //top border's height
    if(Number.isFinite(_containerData[21])) _newData[21] = _containerData[21]; //right border's width
    if(Number.isFinite(_containerData[22])) _newData[22] = _containerData[22]; //bottom border's height
    if(Number.isFinite(_containerData[23])) _newData[23] = _containerData[23]; //left border's width
    bss._containersData.set(container, _newData);

    if(typeof callback === "function") callback();
  },
  stopScrollingAll: (callback) => {
    for(const [_container, _containerData] of bss._containersData.entries()) {
      window.cancelAnimationFrame(_containerData[0]);
      window.cancelAnimationFrame(_containerData[1]);
      _containerData[0] = null;  //scrollID on x-axis
      _containerData[1] = null;  //scrollID on y-axis
      _containerData[10] = null; //callback on x-axis
      _containerData[11] = null; //callback on y-axis

      const _newData = [];
      if(!!_containerData[12]) _newData[12] = _containerData[12];
      if(!!_containerData[13]) _newData[13] = _containerData[13];
      
      //Cached values.
      if(Number.isFinite(_containerData[16])) _newData[16] = _containerData[16]; //maxScrollX
      if(Number.isFinite(_containerData[17])) _newData[17] = _containerData[17]; //maxScrollY
      if(Number.isFinite(_containerData[18])) _newData[18] = _containerData[18]; //vertical scrollbar's width
      if(Number.isFinite(_containerData[19])) _newData[19] = _containerData[19]; //horizontal scrollbar's height
      if(Number.isFinite(_containerData[20])) _newData[20] = _containerData[20]; //top border's height
      if(Number.isFinite(_containerData[21])) _newData[21] = _containerData[21]; //right border's width
      if(Number.isFinite(_containerData[22])) _newData[22] = _containerData[22]; //bottom border's height
      if(Number.isFinite(_containerData[23])) _newData[23] = _containerData[23]; //left border's width
      bss._containersData.set(_container, _newData)
    }

    if(typeof callback === "function") callback();
  },
  hrefSetup: (alignToLeft = true, alignToTop = true, init, callback, includeHiddenParents = false, updateHistory = false) => {
    const _init = typeof init === "function" ? init : () => {};
    const _pageURL = window.location.href.split("#")[0]; //location.href = optionalURL#fragment
    const _updateHistory = updateHistory && 
    !!(window.history && 
      window.history.pushState && 
                              window.history.scrollRestoration); //Check if histoy manipulation is supported
    
    if(_updateHistory) {
      window.history.scrollRestoration = "manual";       
      window.addEventListener("popstate", _smoothHistoryNavigation, {passive:true}); 
      window.addEventListener("unload", (event) => event.preventDefault(), {passive:false, once:true});

      //Prevents the browser to jump-to-position,
      //when a user navigates through history.
      function _smoothHistoryNavigation() {
        const _fragment = window.location.hash.slice(1, -1);
        
        //The URL is just "URL/#" or "URL/" 
        if(!_fragment) {
          if(_init(null, bss._pageScroller) !== false) {
            bss.scrollTo(0, 0, bss._pageScroller, callback);
          }
          return;
        } 

        const _elementToReach = document.getElementById(_fragment) || document.querySelector("a[name='" + _fragment + "']");
        if(_elementToReach && _init(null, _elementToReach) !== false) {
          bss.scrollIntoView(_elementToReach, alignToLeft, alignToTop, callback, includeHiddenParents);
        }
      }
      //Checks if the page initially have a URL containing 
      //a valid fragment and scrolls to it if necessary.
      if(document.readyState === "complete") _smoothHistoryNavigation();
      else window.addEventListener("load", _smoothHistoryNavigation, {passive:true, once:true});
    }

    for(const _pageLink of document.links) {
      const _optionalURL = _pageLink.href.split("#")[0]; //_pageLink.href = optionalURL#fragment

      //This pageLink refers to another webpage, 
      //no need to smooth scroll.
      if(_optionalURL !== _pageURL) continue;
      
      const _fragment = _pageLink.hash.substring(1);
      
      //href="#" scrolls the _pageScroller to its top left.
      if(_fragment === "") { 
        _pageLink.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();

          //False means the scroll-animation has been prevented by the user.
          if(_init(_pageLink, bss._pageScroller) === false) return; 
          if(_updateHistory && window.history.state !== "") {
            window.history.pushState("", "", "#");
          }

          bss.scrollTo(0, 0, bss._pageScroller, callback);
        }, {passive:false});
        continue;
      }

      //Look for elements with the corresponding id or "name" attribute.
      const _elementToReach = document.getElementById(_fragment) || document.querySelector("a[name='" + _fragment + "']");
      if(!_elementToReach) {
        bss._warningLogger("#" + _fragment, "is not a valid anchor's destination", true);
        continue;
      }

      //href="#fragment" scrolls the element associated with the fragment into view.
      _pageLink.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        //False means the scroll-animation has been prevented by the user.
        //The extra "." at the end of the fragment is used to prevent Safari from restoring 
        //the scrol position before the popstate event (it won't recognize the fragment). 
        if(_init(_pageLink, _elementToReach) === false) return; 
        if(_updateHistory && window.history.state !== _fragment) {
          window.history.pushState(_fragment, "", "#" + _fragment + ".");
        }

        bss.scrollIntoView(_elementToReach, alignToLeft, alignToTop, callback, includeHiddenParents);
      }, {passive:false});
    }
  }
}



function onResize() {
  window.removeEventListener("pointerover", onResize, {passive:true});
  window.removeEventListener("pointerdown", onResize, {passive:true});
  window.removeEventListener("touchstart", onResize, {passive:true});
  window.removeEventListener("mousemove", onResize, {passive:true});
  window.removeEventListener("keydown", onResize, {passive:true});
  window.removeEventListener("focus", onResize, {passive:true});
  _resizeHandled = false;
  
  //Update the internal Window sizes.
  bss._windowWidth = window.innerWidth;
  bss._windowHeight = window.innerHeight; 

  //Flush the internal caches.
  for(const dataArray of bss._containersData.values()) {
    dataArray[16] = null;
    dataArray[17] = null; 
    dataArray[18] = null; //Perhaps use a mutation observer
    dataArray[19] = null; //Perhaps use a mutation observer
    dataArray[20] = null; //Perhaps use a resize observer 
    dataArray[21] = null; //Perhaps use a resize observer 
    dataArray[22] = null; //Perhaps use a resize observer 
    dataArray[23] = null; //Perhaps use a resize observer 
  }

  for(const callback of bss._onResizeEndCallbacks) callback();
}

let _resizeHandled = false;  
window.addEventListener("resize", () => {
  if(_resizeHandled) return;
  
  window.addEventListener("pointerover", onResize, {passive:true});
  window.addEventListener("pointerdown", onResize, {passive:true});
  window.addEventListener("touchstart", onResize, {passive:true});
  window.addEventListener("mousemove", onResize, {passive:true});
  window.addEventListener("keydown", onResize, {passive:true});
  window.addEventListener("focus", onResize, {passive:true});
  _resizeHandled = true;

}, {passive:true});

function __bssInit() {
  //Force the calculation of the _pageScroller.
  bss.getPageScroller(true);

  //Force the calculation of the _scrollbarsMaxDimension at the startup.
  bss.getScrollbarsMaxDimension(true);

  //Calculate the average frames' time of the user's screen. 
  //(and the corresponding minAnimationFrame.) //<---------------------------------------------------------------------TO LOOK MORE INTO
  const __totalMeasurementsNumber = 3;
  const __totalFramesInMeasurement = 60; //How many frames are considered in a single measurement 
  let __totalFramesTime = 0;
  let __currentMeasurementsLeft = __totalMeasurementsNumber; 
  let __currentFrameCount = __totalFramesInMeasurement;
  let __originalTimestamp = performance.now();
  window.requestAnimationFrame(function __calcFrameTime(_currentTimestamp) {
    __currentFrameCount--;
    if(__currentFrameCount > 0) {
      window.requestAnimationFrame(__calcFrameTime);
      return;
    }

    __currentMeasurementsLeft--;
    __totalFramesTime += (_currentTimestamp - __originalTimestamp) / __totalFramesInMeasurement;

    //Start a new measurement.
    if(__currentMeasurementsLeft > 0) {
      __currentFrameCount = __totalFramesInMeasurement;
      __originalTimestamp = performance.now();
      window.requestAnimationFrame(__calcFrameTime);
      return;
    }

    //All the measurements have been completed.
    bss._framesTime = Math.min(DEFAULT_FRAME_TIME, __totalFramesTime / __totalMeasurementsNumber); //At least 60fps.
    //bss._minAnimationFrame = 1000 / bss._framesTime; //<---------------------------------------------------------------------TO LOOK MORE INTO
  });
}

if(document.readyState === "complete") __bssInit();
else window.addEventListener("load", __bssInit, {passive:true, once:true});

try { //Chrome, Firefox & Safari >= 14
  window.matchMedia("(prefers-reduced-motion)").addEventListener("change", () => {
    bss._reducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;
    bss.stopScrollingAll();
  }, {passive:true});
} catch(e) { //Safari < 14
  window.matchMedia("(prefers-reduced-motion)").addListener(() => {
    bss._reducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;
    bss.stopScrollingAll();
  }, {passive:true});
}
}

"use strict";

/**
 * Internally used to define the standard behavior of a stepLengthCalculator.
 * The progressEvaluator parameter defines at which % of the total duration the scroll-animation is at.
 * The duration is the total amount in ms the scroll-animation should last.
 * The callback is a function that is executed every time the stepLengthCalculator is invoked.  
 */
const _DEFAULT_STEP_LENGTH_CALCULATOR = (progressEvaluator, duration, callback) => {
  const _callback = typeof callback === "function" ? callback : () => {};
  let _startingPos = 0;
  return (remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container) => {
    _callback(remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container);

    let _progress = (timestamp - originalTimestamp) / duration; //elapsed / duration

    if(_progress >= 1) return remaning;
    if(_progress <= 0) {
      //The elapsed time of a scroll-animation is always >= bss._frameTime / 2 
      //because the first step length is always 0 at elapsed time = 0 and this would break
      //scroll-animations with stillStart = true on touchpad enabled devices.
      _startingPos = 1 - remaning / total;
      _progress = 0.5 * bss._framesTime / duration; 
    }
    const _nextPos = (progressEvaluator(_progress) * (1 - _startingPos) + _startingPos) * (total - 1);
    return Math.ceil(remaning - total + _nextPos);
  }
}  

/*
 * Internally used to setup the control points' arrays for bounce-type StepLengthCalculators.
 * Do not use it directly for setting a StepLengthCalculator.
 */
const _CUSTOM_BOUNCE = (xs, ys, arrInserter, startBouncesNumber, endBouncesNumber) => {
  const _bounceDeltaX = 1 / endBouncesNumber;
  const _bounceDeltaXHalf = _bounceDeltaX * 0.5; 
  const _bounceCorrectionDelta = _bounceDeltaXHalf * 0.001;

  /**
   * These functions define:
   * - The pattern of the control points' x coordinates (same for bounces and peaks)
   * - The pattern of the control points' y coordinates (2 different ones for bounces and peaks)
   */
  const _bounceXCalc = x => 1 - Math.pow(1 - x, 1.6);
  const _bounceYCalc = x => x * 0.005 + 0.995;
  const _peakYCalc   = x => x > 0.6 ? x * 0.35 + 0.64 : 1 - (1 - x) * (1 - x);
  
  const initPointsNum = 10;
  const arrLen = initPointsNum + (endBouncesNumber - 1) * 5 + 1 
  let arrIndex = 0;
  let i;

  if(startBouncesNumber !== 1) arrIndex = initPointsNum + (startBouncesNumber - 1) * 5;
  else {
    //Force an ease-in pattern for the first initPointsNum control points.
    const _initBounceDeltaX = (_bounceDeltaX - _bounceCorrectionDelta) / initPointsNum;
    const _closeToBounceDeltaX = _bounceDeltaX - 2 * _bounceCorrectionDelta;
    for (i = 0; i < _closeToBounceDeltaX; i += _initBounceDeltaX) {
      arrInserter(xs, _bounceXCalc(i),                 arrIndex, arrLen);
      arrInserter(ys,  Math.pow(i * endBouncesNumber, 2), arrIndex, arrLen);
      arrIndex++;
    }
  }

  //Defines the control points of the spline between the first and the last bounce.
  for(i = startBouncesNumber; i < endBouncesNumber; i++) {
    const _originalBounceX = _bounceDeltaX * i;
    const _calcBounceX = _bounceXCalc(_originalBounceX);
    const _calcBounceY = _bounceYCalc(_calcBounceX);
    const _nextPeakX   = _bounceXCalc(_originalBounceX + _bounceDeltaXHalf);
    const _nextPeakY   = _peakYCalc(_nextPeakX);
    const _nextSlopeY  = _nextPeakY * 0.65 + 0.35 * _calcBounceY;

    arrInserter(xs, _calcBounceX,                                            arrIndex,    arrLen);
    arrInserter(xs, _bounceXCalc(_originalBounceX + _bounceCorrectionDelta), arrIndex + 1, arrLen);

    arrInserter(xs, _bounceXCalc(_originalBounceX + _bounceDeltaXHalf * 0.35), arrIndex + 2, arrLen);
    arrInserter(xs, _nextPeakX,                                                arrIndex + 3, arrLen);
    arrInserter(xs, _bounceXCalc(_originalBounceX + _bounceDeltaXHalf * 1.65), arrIndex + 4, arrLen);
    
    arrInserter(ys, _calcBounceY, arrIndex,     arrLen); 
    arrInserter(ys, _calcBounceY, arrIndex + 1, arrLen); 

    arrInserter(ys, _nextSlopeY, arrIndex + 2, arrLen);
    arrInserter(ys, _nextPeakY,  arrIndex + 3, arrLen);
    arrInserter(ys, _nextSlopeY, arrIndex + 4, arrLen);
    
    arrIndex += 5;
  }

  //Defines the control points of the spline at (1,1).
  arrInserter(xs, 1, arrIndex, arrLen);      
  arrInserter(ys, 1, arrIndex, arrLen);    
}

const CUSTOM_CUBIC_HERMITE_SPLINE = (xs, ys, tension = 0, duration = 500, callback, options = {debugString: "CUSTOM_CUBIC_HERMITE_SPLINE"}) => {
  if(!Array.isArray(xs)) {bss._errorLogger(options.debugString, "xs to be an array", xs); return;}
  if(!Array.isArray(ys)) {bss._errorLogger(options.debugString, "ys to be an array", ys); return;}
  if(xs.length !== ys.length) {bss._errorLogger(options.debugString, "xs and ys to have the same length", "xs.length = " + xs.length + " and ys.length = " + ys.length); return;}
  if(!Number.isFinite(duration) || duration <= 0) {bss._errorLogger(options.debugString, "the duration to be a positive number", duration); return;}
  
  let _isXDefinedIn0 = false;
  let _isXDefinedIn1 = false;
  let xsCurrMax = null;
  const _xsLen = xs.length;

  for(let i = 0; i < _xsLen; i++) {
    if(!Number.isFinite(xs[i]) || xs[i] < 0 || xs[i] > 1) {bss._errorLogger(options.debugString, "xs[" + i + "] to be a number between 0 and 1 (inclusive)", xs[i]); return;}
    if(!Number.isFinite(ys[i]) || ys[i] < 0 || ys[i] > 1) {bss._errorLogger(options.debugString, "ys[" + i + "] to be a number between 0 and 1 (inclusive)", ys[i]); return;}
    
    //Checks if the passed points are sorted.
    if(!xsCurrMax || xsCurrMax < xs[i]) xsCurrMax = xs[i]; 
    else {
      bss._errorLogger(options.debugString, "the xs array to be sorted", xs[i].toFixed(2) + " (xs[" + i + "]) after " + xs[i - 1].toFixed(2) +  " (xs[" + (i - 1) + "])"); 
      return;
    } 
    if(!_isXDefinedIn0) _isXDefinedIn0 = xs[i] === 0; 
    if(!_isXDefinedIn1) _isXDefinedIn1 = xs[i] === 1; 
  } 

  //The control points must be defined at x = 0 and x = 1.
  if(!_isXDefinedIn0) {xs.unshift(0); ys.unshift(0);}
  if(!_isXDefinedIn1) {xs.push(1); ys.push(1);}

  const c = 1 - tension;
  const n = xs.length - 1;
  const nHalf = Math.round(0.5 * n);
  
  //Cubic Hermite-Spline definition:
  //p(x) = h00(t) * p_k + h10(t) * (x_k+1 - x_k) * m_k + h01(t) * p_k+1 + h11(t) * (x_k+1 - x_k) * m_k+1 
  function _evalSpline(x) {
    //if(x === 0) x = 0.5 * bss._framesTime;
    let binaryMin = 0; //binary search lower bound
    let binaryMax = n; //binary search upper bound
    let k = nHalf;     //binary search iteration index
    let t; 
    
    //Find t corresponding to the given x (binary search).
    do {
      if(x >= xs[k] && x <= xs[k + 1]) {
        t = (x - xs[k]) / (xs[k + 1] - xs[k]); //t of the given x
        break;
      }
      if(xs[k] > x) {
        binaryMax = k;
        k = Math.floor((binaryMin + k) / 2);
      } else {
        binaryMin = k;
        k = Math.floor((binaryMax + k) / 2);
      }
    } while(binaryMin !== binaryMax);    

    const h_00 = +2 * t * t * t - 3 * t * t + 1;
    const h_10 =      t * t * t - 2 * t * t + t;
    const h_01 = -2 * t * t * t + 3 * t * t;
    const h_11 =      t * t * t -     t * t;

    const p_k0 = ys[k - 1] || ys[0];
    const p_k1 = ys[k];
    const p_k2 = ys[k + 1];
    const p_k3 = ys[k + 2] || ys[n];

    const x_k0 = xs[k - 1] || xs[0];
    const x_k1 = xs[k];
    const x_k2 = xs[k + 1];
    const x_k3 = xs[k + 2] || xs[n];
    
    const m_k0 = c * (p_k2 - p_k0) / (x_k2 - x_k0); 
    const m_k1 = c * (p_k3 - p_k1) / (x_k3 - x_k1); 

    return h_00 * p_k1 + h_10 * (x_k2 - x_k1) * m_k0 + h_01 * p_k2 + h_11 * (x_k2 - x_k1) * m_k1; //The y of the Cubic Hermite-Spline at the given x
  }

  return _DEFAULT_STEP_LENGTH_CALCULATOR(_evalSpline, duration, callback);
}

const CUSTOM_BEZIER_CURVE = (xs, ys, duration = 500, callback, options = {debugString: "CUSTOM_BEZIER_CURVE"}) => {
  if(!Array.isArray(xs)) {bss._errorLogger(options.debugString, "xs to be an array", xs); return;}
  if(!Array.isArray(ys)) {bss._errorLogger(options.debugString, "ys to be an array", ys); return;}
  if(xs.length !== ys.length) {bss._errorLogger(options.debugString, "xs and ys to have the same length", "xs.length = " + xs.length + " and ys.length = " + ys.length); return;}
  if(!Number.isFinite(duration) || duration <= 0) {bss._errorLogger(options.debugString, "the duration to be a positive number", duration); return;}

  let _isXDefinedIn0 = false;
  let _isXDefinedIn1 = false;
  const _xsLen = xs.length;

  for(let i = 0; i < _xsLen; i++) {
    if(!Number.isFinite(xs[i]) || xs[i] < 0 || xs[i] > 1) {bss._errorLogger(options.debugString, "xs[" + i + "] to be a number between 0 and 1 (inclusive)", xs[i]); return;}
    if(!Number.isFinite(ys[i]) || ys[i] < 0 || ys[i] > 1) {bss._errorLogger(options.debugString, "ys[" + i + "] to be a number between 0 and 1 (inclusive)", ys[i]); return;}
    if(!_isXDefinedIn0) _isXDefinedIn0 = xs[i] === 0; 
    if(!_isXDefinedIn1) _isXDefinedIn1 = xs[i] === 1; 
  }

  //The control points must be defined at x = 0 and x = 1.
  if(!_isXDefinedIn0) {xs.unshift(0); ys.unshift(0);}
  if(!_isXDefinedIn1) {xs.push(1); ys.push(1);}
  
  const n = xs.length - 1;
  const nFact = _factorial(n);
  
  function _factorial(num) {
    let fact = 1;
    for (let i = 1; i <= num; i++) fact *= i;
      return fact;
  }

  //Returns B'(t): the first derivative of B(t).
  function _derivativeBt(t) {
    let _derivativeBt = 0;
    for(let i = 0; i <= n; i++) {
      _derivativeBt += nFact / (_factorial(i) * _factorial(n - i)) * xs[i] * Math.pow(1 - t, n - i - 1) * Math.pow(t, i - 1) * (i - n * t) ;
    }
    return _derivativeBt;
  }

  //Returns B(t): the parametric form of a n-th degree bezier curve.
  function _getBt(arr, t) {
    let _Bt = 0;
    for (let i = 0; i <= n; i++) {
      _Bt += nFact / (_factorial(i) * _factorial(n - i)) * arr[i] * Math.pow(1 - t, n - i) * Math.pow(t, i);      
    }
    return _Bt;
  }

  function _newtonRapson(x) {
    //if(x === 0) x = 0.5 * bss._framesTime;
    let prev;
    let t = x;
    do {
      prev = t;
      t -= (_getBt(xs, t) - x) / _derivativeBt(t);
    } while (Math.abs(t - prev) > 0.001);   //Precision of 1^(-3)
    
    return _getBt(ys, t);
  }

  return _DEFAULT_STEP_LENGTH_CALCULATOR(_newtonRapson, duration, callback);
}

const CUSTOM_CUBIC_BEZIER = (x1 = 0, y1 = 0, x2 = 1, y2 = 1, duration = 500, callback, options = {debugString: "CUSTOM_CUBIC_BEZIER"}) => {
  if(!Number.isFinite(duration) || duration <= 0) {bss._errorLogger(options.debugString, "the duration to be a positive number", duration); return;}
  if(!Number.isFinite(x1) || x1 < 0 || x1 > 1) {bss._errorLogger(options.debugString, "x1 to be a number between 0 and 1 (inclusive)", x1); return;}
  if(!Number.isFinite(y1) || y1 < 0 || y1 > 1) {bss._errorLogger(options.debugString, "y1 to be a number between 0 and 1 (inclusive)", y1); return;}
  if(!Number.isFinite(x2) || x2 < 0 || x2 > 1) {bss._errorLogger(options.debugString, "x2 to be a number between 0 and 1 (inclusive)", x2); return;}
  if(!Number.isFinite(y2) || y2 < 0 || y2 > 1) {bss._errorLogger(options.debugString, "y2 to be a number between 0 and 1 (inclusive)", y2); return;}

  const aX = 1 + 3 * (x1 - x2);
  const aY = 1 + 3 * (y1 - y2);
  const bX = 3 * (x2 - 2 * x1);
  const bY = 3 * (y2 - 2 * y1);
  const cX = 3 * x1;
  const cY = 3 * y1;
  
  function _newtonRapson(x) {
    //if(x === 0) x = 0.5 * bss._framesTime;
    let prev;
    let t = x;
    do {
      prev = t;
      t -= ((t * (cX + t * (bX + t * aX)) - x) / (cX + t * (2 * bX + 3 * aX * t)));
    } while (Math.abs(t - prev) > 0.001);   //Precision of 1^(-3)

    return t * ( cY + t * ( bY + t * aY )); //This is y given t on the bezier curve (0 <= y <= 1 && 0 <= t <= 1)
  }

  return _DEFAULT_STEP_LENGTH_CALCULATOR(_newtonRapson, duration, callback);
}

const EASE_LINEAR = (duration, callback) => CUSTOM_CUBIC_BEZIER(0, 0, 1, 1, duration, callback, {debugString: "EASE_LINEAR"});

const EASE_IN_SINE  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.12, 0, 0.39, 0, duration, callback, {debugString: "EASE_IN_SINE"});
const EASE_IN_QUAD  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.11, 0, 0.5,  0, duration, callback, {debugString: "EASE_IN_QUAD"});
const EASE_IN_CUBIC = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.32, 0, 0.67, 0, duration, callback, {debugString: "EASE_IN_CUBIC"});
const EASE_IN_QUART = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.5,  0, 0.75, 0, duration, callback, {debugString: "EASE_IN_QUART"});
const EASE_IN_QUINT = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.64, 0, 0.78, 0, duration, callback, {debugString: "EASE_IN_QUINT"});
const EASE_IN_EXPO  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.7,  0, 0.84, 0, duration, callback, {debugString: "EASE_IN_EXPO"});
const EASE_IN_CIRC  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.55, 0, 1, 0.45, duration, callback, {debugString: "EASE_IN_CIRC"});

const EASE_OUT_SINE  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.61, 1, 0.88, 1, duration, callback, {debugString: "EASE_OUT_SINE"});
const EASE_OUT_QUAD  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.5,  1, 0.89, 1, duration, callback, {debugString: "EASE_OUT_QUAD"});
const EASE_OUT_CUBIC = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.33, 1, 0.68, 1, duration, callback, {debugString: "EASE_OUT_CUBIC"});
const EASE_OUT_QUART = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.25, 1, 0.5,  1, duration, callback, {debugString: "EASE_OUT_QUART"});
const EASE_OUT_QUINT = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.22, 1, 0.36, 1, duration, callback, {debugString: "EASE_OUT_QUINT"});
const EASE_OUT_EXPO  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.16, 1, 0.3,  1, duration, callback, {debugString: "EASE_OUT_EXPO"});
const EASE_OUT_CIRC  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0, 0.55, 0.45, 1, duration, callback, {debugString: "EASE_OUT_CIRC"});

const EASE_IN_OUT_SINE  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.37, 0, 0.63, 1, duration, callback, {debugString: "EASE_IN_OUT_SINE"});
const EASE_IN_OUT_QUAD  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.45, 0, 0.55, 1, duration, callback, {debugString: "EASE_IN_OUT_QUAD"});
const EASE_IN_OUT_CUBIC = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.65, 0, 0.35, 1, duration, callback, {debugString: "EASE_IN_OUT_CUBIC"});
const EASE_IN_OUT_QUART = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.76, 0, 0.24, 1, duration, callback, {debugString: "EASE_IN_OUT_QUART"});
const EASE_IN_OUT_QUINT = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.83, 0, 0.17, 1, duration, callback, {debugString: "EASE_IN_OUT_QUINT"});
const EASE_IN_OUT_EXPO  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.87, 0, 0.13, 1, duration, callback, {debugString: "EASE_IN_OUT_EXPO"});
const EASE_IN_OUT_CIRC  = (duration, callback) => CUSTOM_CUBIC_BEZIER(0.85, 0, 0.15, 1, duration, callback, {debugString: "EASE_IN_OUT_CIRC"});

const EASE_IN_BOUNCE = (duration = 900, callback, bouncesNumber = 3) => {
  if(!Number.isFinite(bouncesNumber) || bouncesNumber <= 0) {bss._errorLogger("EASE_IN_BOUNCE", "bouncesNumber to be a positive number", bouncesNumber); return;}
  
  const _xs = [];
  const _ys = [];
  const _inserter = (arr, el, currI, len) => arr[len - currI - 1] = 1 - el;
  
  _CUSTOM_BOUNCE(_xs, _ys, _inserter, 1, bouncesNumber + 1);
  
  return CUSTOM_CUBIC_HERMITE_SPLINE(_xs, _ys, 0, duration, callback, {debugString: "EASE_IN_BOUNCE"});
}

const EASE_OUT_BOUNCE = (duration = 900, callback, bouncesNumber = 3) => {
  if(!Number.isFinite(bouncesNumber) || bouncesNumber <= 0) {bss._errorLogger("EASE_OUT_BOUNCE", "bouncesNumber to be a positive number", bouncesNumber); return;}

  const _xs = [];
  const _ys = [];
  const _inserter = (arr, el, currI) => arr[currI] = el;
  
  _CUSTOM_BOUNCE(_xs, _ys, _inserter, 1, bouncesNumber + 1);
  
  return CUSTOM_CUBIC_HERMITE_SPLINE(_xs, _ys, 0, duration, callback, {debugString: "EASE_OUT_BOUNCE"});
}

const EASE_IN_OUT_BOUNCE = (duration = 1200, callback, bouncesNumber = 6) => {
  if(!Number.isFinite(bouncesNumber) || bouncesNumber <= 1) {bss._errorLogger("EASE_IN_OUT_BOUNCE", "bouncesNumber to be a number >= 2", bouncesNumber); return;}
  if(bouncesNumber === 2) {
    return CUSTOM_CUBIC_HERMITE_SPLINE(
      [0, 0.04, 0.14, 0.24, 0.3000, 0.3001, 0.40, 0.60, 0.7000, 0.7001, 0.76, 0.86, 0.96, 1], 
      [0, 0.07, 0.13, 0.07, 0.0001, 0.0001, 0.46, 0.64, 0.9999, 0.9999, 0.93, 0.87, 0.93, 1], 
      0, duration, callback, {debugString: "EASE_IN_OUT_BOUNCE"}
      );
  }

  const _xs = [];
  const _ys = [];
  const _initPointsNum = 10;
  const _startBouncesNumberEaseIn  = Math.max(Math.floor(0.5 * (bouncesNumber - 1)), 1);
  const _startBouncesNumberEaseOut = Math.max(Math.floor(0.5 * bouncesNumber), 2);

  const _inserterEaseIn  = (arr, el, currI, len) => arr[len - currI - 1] = 1 - el;
  const _inserterEaseOut = (arr, el, currI)      => arr[currI - 2] = el; 
  
  _CUSTOM_BOUNCE(_xs, _ys, _inserterEaseIn,  _startBouncesNumberEaseIn,  bouncesNumber);
  _CUSTOM_BOUNCE(_xs, _ys, _inserterEaseOut, _startBouncesNumberEaseOut, bouncesNumber);
  
  //Force an ease-in-out transition between ease-in-bounce and the ease-out-bounce.
  const transitionPoint = _initPointsNum + (_startBouncesNumberEaseOut - 1) * 5 - 3;
  _xs[transitionPoint - 1] = 0.75 * _xs[transitionPoint] + 0.25 * _xs[transitionPoint + 1];
  _xs[transitionPoint]     = 0.25 * _xs[transitionPoint] + 0.75 * _xs[transitionPoint + 1];
  _ys[transitionPoint -1] = 0.47;
  _ys[transitionPoint]    = 0.63;

  //Remove the duplicate definitions of the control points at (1,1).
  _xs.pop(); _xs.pop();
  _ys.pop(); _ys.pop();
  return CUSTOM_CUBIC_HERMITE_SPLINE(_xs, _ys, 0, duration, callback, {debugString: "EASE_IN_OUT_BOUNCE"});
}

const EASE_ELASTIC_X = (forwardEasing, backwardEasing, elasticPointCalculator = () => 50, debounceTime = 0) => {
  if(typeof forwardEasing  !== "function") {bss._errorLogger("EASE_ELASTIC_X", "the forwardEasing to be a function", forwardEasing);  return;}
  if(typeof backwardEasing !== "function") {bss._errorLogger("EASE_ELASTIC_X", "the backwardEasing to be a function", backwardEasing); return;}
  if(typeof elasticPointCalculator !== "function") {bss._errorLogger("EASE_ELASTIC_X", "the elasticPointCalculator to be a function", elasticPointCalculator); return;}
  if(!Number.isFinite(debounceTime)) {bss._errorLogger("EASE_ELASTIC_X", "the debounceTime to be a number", debounceTime); return;}

  let _finalXPositionBackwardPhase = null;
  let _scrollCalculator;
  let _debounceTimeout;

  function init(originalTimestamp, timestamp, container) {
    const _oldData = bss._containersData.get(container) || [];

    //The init function has been triggered by the backward phase
    //of this scroll-animation (or by one that has same final position), 
    //no action required.
    if(_finalXPositionBackwardPhase === _oldData[2]) {
      _finalXPositionBackwardPhase = null;
      return;
    }
    
    //Avoid setting up the backward phase if the container is not actually scrolling.
    _scrollCalculator = forwardEasing;
    _finalXPositionBackwardPhase = null;
    if(!_oldData[0]) return;

    //Avoid double-triggering the backward phase.
    clearTimeout(_debounceTimeout);
    
    const _originalCallback = typeof _oldData[10] === "function" ? _oldData[10] : () => {};
    _oldData[10] = () => {
      _debounceTimeout = setTimeout(() => {
        const _currentPos    = container === window ? window.scrollX : container.scrollLeft;
        const _oldDirection  = _oldData[4];
        const _elasticAmount = elasticPointCalculator(originalTimestamp, timestamp, _currentPos, _oldDirection, container);
        
        if(!Number.isFinite(_elasticAmount)) {
          bss._warningLogger(_elasticAmount, "is not a valid elastic amount");
          _originalCallback();
        } else if(_elasticAmount === 0) {
          _originalCallback();
        } else {
          //The backward easing is used only if the new scroll-animations goes backward.
          if(_elasticAmount > 0) _scrollCalculator = backwardEasing; 
          bss.scrollXTo(_currentPos - _elasticAmount * _oldDirection, container, _originalCallback);
          _finalXPositionBackwardPhase = bss._containersData.get(container)[2]
        }
      }, debounceTime);
    }
  }

  return (remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container) => {
    if(originalTimestamp === timestamp) init(originalTimestamp, timestamp, container);
    return _scrollCalculator(remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container);
  }
}

const EASE_ELASTIC_Y = (forwardEasing, backwardEasing, elasticPointCalculator = () => 50, debounceTime = 0) => {
  if(typeof forwardEasing  !== "function") {bss._errorLogger("EASE_ELASTIC_Y", "the forwardEasing to be a function", forwardEasing);  return;}
  if(typeof backwardEasing !== "function") {bss._errorLogger("EASE_ELASTIC_Y", "the backwardEasing to be a function", backwardEasing); return;}
  if(typeof elasticPointCalculator !== "function") {bss._errorLogger("EASE_ELASTIC_Y", "the elasticPointCalculator to be a function", elasticPointCalculator); return;}
  if(!Number.isFinite(debounceTime)) {bss._errorLogger("EASE_ELASTIC_Y", "the debounceTime to be a number", debounceTime); return;}

  let _finalYPositionBackwardPhase = null;
  let _scrollCalculator;
  let _debounceTimeout;

  function init(originalTimestamp, timestamp, container) {
    const _oldData = bss._containersData.get(container) || [];

    //The init function has been triggered by the backward phase
    //of this scroll-animation (or by one that has same final position), 
    //no action required.
    if(_finalYPositionBackwardPhase === _oldData[3]) {
      _finalYPositionBackwardPhase = null;
      return;
    }
    
    //Avoid setting up the backward phase if the container is not actually scrolling.
    _scrollCalculator = forwardEasing;
    _finalYPositionBackwardPhase = null;
    if(!_oldData[1]) return;

    //Avoid double-triggering the backward phase.
    clearTimeout(_debounceTimeout);
    
    const _originalCallback = typeof _oldData[11] === "function" ? _oldData[11] : () => {};
    _oldData[11] = () => {
      _debounceTimeout = setTimeout(() => {
        const _currentPos    = container === window ? window.scrollY : container.scrollTop;
        const _oldDirection  = _oldData[5];
        const _elasticAmount = elasticPointCalculator(originalTimestamp, timestamp, _currentPos, _oldDirection, container);
        
        if(!Number.isFinite(_elasticAmount)) {
          bss._warningLogger(_elasticAmount, "is not a valid elastic amount");
          _originalCallback();
        } else if(_elasticAmount === 0) {
          _originalCallback();
        } else {
          //The backward easing is used only if the new scroll-animations goes backward.
          if(_elasticAmount > 0) _scrollCalculator = backwardEasing; 
          bss.scrollYTo(_currentPos - _elasticAmount * _oldDirection, container, _originalCallback);
          _finalYPositionBackwardPhase = bss._containersData.get(container)[3]
        }
      }, debounceTime);
    }
  }

  return (remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container) => {
    if(originalTimestamp === timestamp) init(originalTimestamp, timestamp, container);
    return _scrollCalculator(remaning, originalTimestamp, timestamp, total, currentPos, finalPos, container);
  }
}

/**
 * TODO: 
 * - Move to Object based architecture
 * - add speedModifiers to momentumElasticScrolling without breaking the scrolling
 * - smooth scrolling with animation allowed
 * - smooth scrolling for carousels (perhaps leave this implementation to the developer?)
 * - when scrollbars are one on top of each other the active state and the clicks of the bottom ones should be ignored.
 */


/**
 * Each of this functions should have an input interface that:
 *  - has the container as the first parameter
 *  - has an "options" object as the second parameter
 *  - every function-specific input should be a property of the "options" parameter
 * 
 * Each of this functions should dispatch the custom "bssmoverequest" 
 * to their container whenever they directly use:
 *  - the bss.scrollXTo/bss.scrollXBy functions
 *  - the bss.scrollYTo/bss.scrollYBy functions
 *  - the bss.scrollTo/bss.scrollBy functions
 * This event is used to request the container's controllers (e.g. its smooth scrollbars)
 * to scroll it whenever it's ok to do so (e.g. scroll only when the user isn't holding down the scrollbar). 
 */

function __testImports() {
    //Test if the bettersmoothscroll library has been imported.
  try {
    !!bss;
  } catch(e) {
    throw "You must import the bettersmoothscroll library in order to use this function";
  }

    //Test if the bettersmoothscroll-ease-functions library has been imported.
  try {
        return !!EASE_LINEAR; //full API and libraries support
      } catch(e) {
        return false; //full API support but no libraries support
      }
    }

    function addMomentumScrolling(
      container, 
      options = {
        onXAxis: false,
        onYAxis: false,
        callback,
        speedModifierX,
        speedModifierY,
        momentumEasingX,
        momentumEasingY,
        debugString: "addMomentumScrolling"
      }
      ) {
      __testImports();

    //Check if the options parameter is a valid object.
      if (options === null || typeof options !== "object" || Array.isArray(options)) {
        bss._errorLogger("addMomentumScrolling", "the options parameter to be an object", options);
        return;
      }

      const _onXAxis = options.onXAxis;
      const _onYAxis = options.onYAxis;
      options.debugString = options.debugString || "addMomentumScrolling";

    //Check if at least one axis was requested to be momentum-scrolled.
      if(!_onXAxis && !_onYAxis) {
        bss._warningLogger(options.debugString, "was invoked but neither onXAxis or onYAxis were set");
      }

    //If needed, check if the x-axis of the passed container is actually scrollable. 
      if(_onXAxis && bss.getMaxScrollX(container, false, options) < 1) {
        bss._errorLogger(options.debugString, "a container that can be scrolled on the x-axis", container);
        return;
      }

    //If needed, check if the y-axis of the passed container is actually scrollable. 
      if(_onYAxis && bss.getMaxScrollY(container, false, options) < 1) {
        bss._errorLogger(options.debugString, "a container that can be scrolled on the y-axis", container);
        return;
      }

      const _speedModifierX = typeof options.speedModifierX === "function" ? options.speedModifierX : (deltaX, deltaY) => deltaX;
      const _speedModifierY = typeof options.speedModifierY === "function" ? options.speedModifierY : (deltaX, deltaY) => deltaY;

    //Default easing behaviors: ease-out.
    const _easingX = options.momentumEasingX || function(remaning) {return remaning / 25 + 1}; //TODO Not good for touch-driven scrolling
    const _easingY = options.momentumEasingY || function(remaning) {return remaning / 25 + 1};

    let _pointersDownIds = [];
    let _onPointerUpCallback = false;
    let _touchScrollExtender,
    _momentumScrolling,
    _axisNumber;

    //Execute the options.callback only if it's a function and the user  
    //is not holding the pointer down. Wait for the pointerup event otherwise.
    const _callback = typeof options.callback === "function" ? () => {
      if(_pointersDownIds.length > 0) {
        _onPointerUpCallback = true;
        return;
      } 
      options.callback();
    } : null;

    if(_onXAxis && !_onYAxis) {
      _touchScrollExtender = () => {
        const __currentPos = bss.getScrollXCalculator(container)();
        const __finalPos = bss.getFinalXPosition(container);
            const __delta = __finalPos - __currentPos; //TODO FIND WHAT EASING/PATTERN IS THE BEST FOR THIS SCROLL-EXTENSION
            
            _scrollContainer(__delta, 0);
          }
          _momentumScrolling = (deltaX, deltaY) => { 
            bss.setXStepLengthCalculator(_easingX, container, true, options);
            bss.scrollXBy(_speedModifierX(deltaX, deltaY), container, _callback, false, options);
          }
          _axisNumber = 0;
        } else if(!_onXAxis && _onYAxis) {
          _touchScrollExtender = () => {
            const __currentPos = bss.getScrollYCalculator(container)();
            const __finalPos = bss.getFinalYPosition(container);
            const __delta = __finalPos - __currentPos;

            _scrollContainer(0, __delta);
          }
          _momentumScrolling = (deltaX, deltaY) => {
            bss.setYStepLengthCalculator(_easingY, container, true, options);
            bss.scrollYBy(_speedModifierY(deltaX, deltaY), container, _callback, false, options);                                                            
          } 
          _axisNumber = 1;
        } else {
          _touchScrollExtender = () => {
            const __currentPosX = bss.getScrollXCalculator(container)();
            const __currentPosY = bss.getScrollYCalculator(container)();
            const __finalPosX = bss.getFinalXPosition(container);
            const __finalPosY = bss.getFinalYPosition(container);
            const __deltaX = __finalPosX - __currentPosX;
            const __deltaY = __finalPosY - __currentPosY;

            _scrollContainer(__deltaX, __deltaY);
          }
          _momentumScrolling = (deltaX, deltaY) => {
            bss.setXStepLengthCalculator(_easingX, container, true, options);
            bss.setYStepLengthCalculator(_easingY, container, true, options);
            bss.scrollBy(
              _speedModifierX(deltaX, deltaY), 
              _speedModifierY(deltaX, deltaY), 
              container, 
              _callback, 
              false, 
              options
              );
          }
          _axisNumber = 2;
        }

        const _scrollContainer = (deltaX, deltaY, event) => {
          if(event) {
            event.preventDefault();
            event.stopPropagation();
          }

          const __scrollRequest = new CustomEvent(
            "bssmoverequest", 
            { 
              cancelable: true,
              detail: {
                axis: _axisNumber,
                scroller: () => _momentumScrolling(deltaX, deltaY),
              }
            }
            );
          container.dispatchEvent(__scrollRequest);

        //If no one has handled the scroll request yet.
          if(!__scrollRequest.defaultPrevented) {
            _momentumScrolling(deltaX, deltaY);
          }
        } 

        const _handlePointerMoveEvent = (event) => {
          _onPointerUpCallback = false;

          const __deltaY = Math.abs(event.movementY);
          const __deltaX = Math.abs(event.movementX);
          const __delta = __deltaX + __deltaY;
          const __directionX = -event.movementX > 0 ? 1 : -1;
          const __directionY = -event.movementY > 0 ? 1 : -1;
          
          if(__deltaX > __deltaY) {
            _scrollContainer(__directionX * __delta, 0, event);
            return;
          } 
          
          if(__deltaY > __deltaX) {
            _scrollContainer(0, __directionY * __delta, event);
            return;
          }
          
          _scrollContainer(__directionX * __delta, __directionY * __delta, event);
        }

        const _handlePointerUpEvent = (event) => {
        //The pointerup event was triggered by a pointer not related with this container.
          const _pointerIdIndex = _pointersDownIds.indexOf(event.pointerId);
          if(_pointerIdIndex < 0) return;

          _pointersDownIds.splice(_pointerIdIndex, 1);
          if(_pointersDownIds.length === 0) {
            container.removeEventListener("pointermove", _handlePointerMoveEvent, {passive:false});
            window.removeEventListener("pointerup", _handlePointerUpEvent, {passive:true});

            if(_onPointerUpCallback) {
              options.callback();
              _onPointerUpCallback = false;
              return;
            }

            _touchScrollExtender();
            console.log("current->", bss.getScrollYCalculator(container)(), "final->", bss.getFinalYPosition(container))
          }
        } 
        
        container.style.touchAction = "none";
        
        container.addEventListener("pointerdown", (event) => {
        //The pointerdown event is not relevant for scrolling if the pointer is a mouse.
          if(event.pointerType === "mouse") return;

          event.preventDefault();
          event.stopPropagation();

          if(_pointersDownIds.length === 0) {
            window.addEventListener("pointerup", _handlePointerUpEvent, {passive:true});
            container.addEventListener("pointermove", _handlePointerMoveEvent, {passive:false});
          }
          _pointersDownIds.push(event.pointerId);
        }, {passive:false});

        container.addEventListener("wheel", (event) => _scrollContainer(event.deltaX, event.deltaY, event), {passive:false});
      }

      function addMomentumSnapScrolling(
        container, 
        options = {
          onXAxis,
          onYAxis,
          callback,
          speedModifierX,
          speedModifierY,
          momentumEasingX,
          momentumEasingY,
          snapEasingX,
          snapEasingY,
          snapDelay: 0,
          children: [],
          debugString: "addMomentumSnapScrolling"
        }, 
        ) {
    //console.time("init");
        __testImports();

    //Check if the options parameter is a valid object.
        if (options === null || typeof options !== "object" || Array.isArray(options)) {
          bss._errorLogger("addMomentumSnapScrolling", "the options parameter to be an object", options);
          return;
        }

        options.debugString = options.debugString || "addMomentumSnapScrolling";

    //Check if the container is a valid container.
        if(container !== window && !(container instanceof Element)) {
          bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
          return;
        }

    //Check if the options.children parameter is an array.
        if(!Array.isArray(options.children)) {
          bss._errorLogger(options.debugString, "the options.children parameter to be an array", options.children);
          return;
        }

    //Check the elements of the options.children parameter are valid.
        const _childrenNum = options.children.length;
        for(let i = 0; i < _childrenNum; i++) {
          const _child = options.children[i];
          
        //Check if the child is an object.
          if (_child === null || typeof _child !== "object" || Array.isArray(_child)) {
            bss._errorLogger(options.debugString, "the elements of options.children to be objects", _child);
            return;
          }

        //Check if child.element is an Element.
          if(!(_child.element instanceof Element)) {
            bss._errorLogger(options.debugString, "the element parameter of each options.children object to be an Element", _child.element);
            return;
          }

        //Remove children that cannot be snap-scrolled by scrolling the passed container. 
          if(_child.element.dataset.bss || bss.getScrollableParent(_child.element, true, options) !== container) {
            bss._warningLogger(_child.element, "can't be scrolled into view by scrolling the passed container");
          }
        }

    const _onXAxis = /mandatory/.test(options.onXAxis) ? 1 : // 1 === "mandatory"
                     /proximity/.test(options.onXAxis) ? 0 : // 0 === "proximity"
                                                        -1;  //-1 === no snap on x-axis
    const _onYAxis = /mandatory/.test(options.onYAxis) ? 1 : // 1 === "mandatory"
                     /proximity/.test(options.onYAxis) ? 0 : // 0 === "proximity"
                                                        -1;  //-1 === no snap on y-axis

                                                        const _callback = typeof options.callback === "function" ? options.callback : () => {};

                                                        options.onXAxis = _onXAxis > -1;
                                                        options.onYAxis = _onYAxis > -1;
                                                        options.callback = snapScrolling;

                                                        addMomentumScrolling(container, options);

    //Default easing behaviors: ease-in.
                                                        const _easingX = options.snapEasingX || function(remaning, ot, t, total) {return (total - remaning) / 25 + 1};
                                                        const _easingY = options.snapEasingY || function(remaning, ot, t, total) {return (total - remaning) / 25 + 1};
                                                        
                                                        let _calcDistances, 
                                                        _calcEuclideanDistance, 
                                                        _snapScroll,
                                                        _axis;

    if(_onXAxis > -1 && _onYAxis < 0) { //Momentum-snap on the x-axis only. 
      _calcDistances = (containerPos, containerBorders, childPos, align) => {
        const _distance =  /start/.test(align) ? childPos.left - containerPos.left - containerBorders[3] :  
        /end/.test(align) ? childPos.right - containerPos.right + bss.calcXScrollbarDimension(container, false, options) + containerBorders[1] :
        (childPos.left + childPos.right 
          - containerPos.left - containerPos.right 
          + bss.calcXScrollbarDimension(container, false, options)
          - containerBorders[1]
          + containerBorders[3]
          ) * 0.5;

            //The snap-scroll is required on proximity (_onXAxis === 0), 
            //check if the container and the child are not too far away.
        return _onXAxis === 0 && Math.abs(_distance) - 1 > childPos.width * 0.5 ? null : [_distance, 0];
      }

        //The euclidean distance is just the |deltaX|.
      _calcEuclideanDistance = (deltas) => Math.abs(deltas[0]);

      _snapScroll = (deltas) => {
        bss.setXStepLengthCalculator(_easingX, container, true, options);
        bss.scrollXBy(Math.round(deltas[0]), container, _callback, true, options);
      }
      _axis = 0;
    } else if(_onXAxis < 0 && _onYAxis > -1) { //Momentum-snap on the y-axis only.
      _calcDistances = (containerPos, containerBorders, childPos, align) => {
        const _distance = /start/.test(align) ? childPos.top - containerPos.top - containerBorders[0] : 
        /end/.test(align) ? childPos.bottom - containerPos.bottom + bss.calcYScrollbarDimension(container, false, options) + containerBorders[2] :
        (childPos.top + childPos.bottom 
          - containerPos.top - containerPos.bottom 
          + bss.calcYScrollbarDimension(container, false, options)
          - containerBorders[0]
          + containerBorders[2]
          ) * 0.5;     
        
            //The snap-scroll is required on proximity (_onYAxis === 0), 
            //check if the container and the child are not too far away.
        return _onYAxis === 0 && Math.abs(_distance) - 1 > childPos.height * 0.5 ? null : [0, _distance];
      }

        //The euclidean distance is just the |deltaY|.
      _calcEuclideanDistance = (deltas) => Math.abs(deltas[1]);

      _snapScroll = (deltas) => {
        bss.setYStepLengthCalculator(_easingY, container, true, options);
        bss.scrollYBy(Math.round(deltas[1]), container, _callback, true, options);
      }
      _axis = 1;
    } else { //Momentum-snap on both axes.
      _calcDistances = (containerPos, containerBorders, childPos, align) => {
        const _distanceX =  /start/.test(align) ? childPos.left - containerPos.left - containerBorders[3] :  
        /end/.test(align) ? childPos.right - containerPos.right + bss.calcXScrollbarDimension(container, false, options) + containerBorders[1] :
        (childPos.left + childPos.right 
         - containerPos.left - containerPos.right 
         + bss.calcXScrollbarDimension(container, false, options)
         - containerBorders[1]
         + containerBorders[3]
         ) * 0.5;

        const _distanceY = /start/.test(align) ? childPos.top - containerPos.top - containerBorders[0] : 
        /end/.test(align) ? childPos.bottom - containerPos.bottom + bss.calcYScrollbarDimension(container, false, options) + containerBorders[2] :
        (childPos.top + childPos.bottom 
         - containerPos.top - containerPos.bottom 
         + bss.calcYScrollbarDimension(container, false, options)
         - containerBorders[0]
         + containerBorders[2]
         ) * 0.5;  

            //If the snap-scroll is required on proximity (_onXAxis === 0 && _onYAxis === 0), 
            //check if the container and the child are not too far away.
        const _xTooFar = _onXAxis === 0 && Math.abs(_distanceX) - 1 > childPos.width * 0.5;
        const _yTooFar = _onYAxis === 0 && Math.abs(_distanceY) - 1 > childPos.height * 0.5;

        return _xTooFar && _yTooFar  ? null : 
        _xTooFar && !_yTooFar ? [null, _distanceY, _distanceX] :
        !_xTooFar && _yTooFar ? [_distanceX, null, _distanceY] :
        [_distanceX, _distanceY];
      }

        //The euclidean distance is calculated by using the pythagoras theorem.
      _calcEuclideanDistance = (deltas) => {
        return deltas[0] === null ? Math.sqrt(deltas[2] * deltas[2] + deltas[1] * deltas[1]) :
        deltas[1] === null ? Math.sqrt(deltas[0] * deltas[0] + deltas[2] * deltas[2]) :
        Math.sqrt(deltas[0] * deltas[0] + deltas[1] * deltas[1]);
      }

      _snapScroll = (deltas) => {            
            //Note: Math.round(null) === 0
        bss.setXStepLengthCalculator(_easingX, container, true, options);
        bss.setYStepLengthCalculator(_easingY, container, true, options);
        bss.scrollBy(Math.round(deltas[0]), Math.round(deltas[1]), container, _callback, true, options);
      }
      _axis = 2;
    }

    //console.timeEnd("init");

    //This function finds which of the passed options.children is the closest to a snap-point
    //and snaps it into view with a smooth scroll-animation. 
    let _snapScrollingTimeout;
    function snapScrolling() {        
      window.clearTimeout(_snapScrollingTimeout);
      _snapScrollingTimeout = window.setTimeout(() => {
        if(options.children.length < 1) {
          _callback();
          return;
        }  

            //console.time("main");
        const _containerPos = container.getBoundingClientRect();
        const _containerBorders = bss.calcBordersDimensions(container, false, options);

        let _minEuclideanDistance = Infinity;
        let _minDistances = Infinity;

            /**
             * Find the element to snap-align within the passed children parameter.
             * The performance of this search-method is fine with up to 10.000 children. 
             */
        for(const child of options.children) {
          const _childPos = child.element.getBoundingClientRect();
          const _requestedAlignment = child.align;

          const _distances = _calcDistances(_containerPos, _containerBorders, _childPos, _requestedAlignment);
                if(!_distances) continue; //In normal conditions _distances is an array
                const _euclideanDistance = _calcEuclideanDistance(_distances);

                if(_euclideanDistance <= _minEuclideanDistance) {
                  _minEuclideanDistance = _euclideanDistance;
                  _minDistances = _distances;
                }
              }
            //console.timeEnd("main");
            //console.time("scroll")
              if(_minDistances === Infinity) {
                _callback();
                return;
              } 

              const __scrollRequest = new CustomEvent(
                "bssmoverequest", 
                { 
                  cancelable: true,
                  detail: {
                    axis: _axis,
                    scroller: () => _snapScroll(_minDistances),
                  }
                }
                );
              container.dispatchEvent(__scrollRequest);
              
            //If no one has handled the scroll request yet.
              if(!__scrollRequest.defaultPrevented) {
                _snapScroll(_minDistances);
              }
              
            //console.timeEnd("scroll")
            }, options.snapDelay);
    }

    return snapScrolling;
  }

  function addElasticMomentumScrolling(
    container, 
    options = {
      onXAxis: false,
      onYAxis: false,
      callback,
      momentumEasingX,
      momentumEasingY,
      elasticEasingX, 
      elasticEasingY, 
      elasticAmount: 100,
      children: [],
      debugString: "addElasticMomentumScrolling"
    }, 
    ) {
    __testImports();

    //Check if the options parameter is a valid object.
    if (options === null || typeof options !== "object" || Array.isArray(options)) {
      bss._errorLogger("addElasticMomentumScrolling", "the options parameter to be an object", options);
      return;
    }

    options.debugString = options.debugString || "addElasticMomentumScrolling";

    //Check if the container is a valid container.
    if(container !== window && !(container instanceof Element)) {
      bss._errorLogger(options.debugString, "the container to be an Element or the Window", container);
      return;
    }

    const _elasticAmount = options.elasticAmount;    
    if(!Number.isFinite(_elasticAmount)) {
      bss._errorLogger(options.debugString, "the options.elasticAmount to be finite number", container);
      return;
    }

    const _children = options.children;
    const _childrenNum = _children.length;

    //Check if the options.children parameter is an array.
    if(!Array.isArray(_children)) {
      bss._errorLogger(options.debugString, "the options.children parameter to be an array", _children);
      return;
    }

    //Check if the options.children parameter has at most 2 elements.
    if(_childrenNum < 1 || _childrenNum > 2) {
      bss._errorLogger(options.debugString, "the options.children parameter to have 1 or 2 elements.", _children);
      return;
    }

    //Check if the first element of the options.children parameter is a valid object.
    if(_children[0] === null || typeof _children[0] !== "object" || Array.isArray(_children[0])) {
      bss._errorLogger(options.debugString, "the elements of options.children to be objects", _children[0]);
      return;
    }

    //When the options.children of addMomentumSnapScrolling will contain only  
    //this.options.children[0], its alignment will be mandatory-start.
    _children[0].align = "start";

    //Check if the second element of the options.children parameter is a valid object.
    if(_childrenNum > 1) {
      if(_children[1] === null || typeof _children[1] !== "object" || Array.isArray(_children[1])) {
        bss._errorLogger(options.debugString, "the elements of options.children to be objects", _children[1]);
        return;
      }
      
        //When the options.children of addMomentumSnapScrolling will contain only  
        //this.options.children[1], its alignment will be mandatory-end.
      _children[1].align = "end";
    }

    const _onXAxis = options.onXAxis;
    const _onYAxis = options.onYAxis;
    if(_onXAxis) options.onXAxis = "mandatory";
    if(_onYAxis) options.onYAxis = "mandatory";

    const _elasticSpeedModifier = (delta, finalPos, getMaxScroll) => {
      const __nextFinalPos = finalPos + delta;
      if(__nextFinalPos <= _elasticAmount) {
            //We're at the left of the passed container, the snap scrolling
            //will be triggered on _children[0] with align = "start".
        if(_children[0]) options.children = [_children[0]];

            //If the user scrolls in the same direction as the elastic part of
            //this scroll-animation, it won't encounter resistance. 
        if(delta > 0) return delta; 

            //Mathematical explanation of the below delta's easing: 
            //finalPos => f1 = -x + k   //f1 in [0.._elasticAmount]
            //_progress => f2 = f1 / k  //f2 in [1..0]
            //easing    => f3 = f2^(3)  //f3 in [0..1]
            //Since the result will be a negative number, Math.floor is used to round its |value|.
        const __progress = finalPos / _elasticAmount;
        if(__progress > 1) return _elasticAmount - finalPos;
        if(__progress < 0) return 0; 
            return Math.floor(delta * Math.pow(__progress, 3)); //delta * f3
          }
          
          const __maxScroll = getMaxScroll(container, false, options);
          if(__nextFinalPos >= __maxScroll - _elasticAmount) {
            //We're at the bottom of the passed container, the snap scrolling
            //will be triggered on _children[1] with align = "end".
            if(_children[1]) options.children = [_children[1]];

            //If the user scrolls in the same direction as the elastic part of
            //this scroll-animation, it won't encounter resistance. 
            if(delta < 0) return delta; 
            
            //Mathematical explanation of the below delta's easing: 
            //finalPos => f1 = -x + k   //f1 in [_maxScroll - _elasticAmount.._maxScroll]
            //_progress => f2 = f1 / k  //f2 in [1..0]
            //easing    => f3 = f2^(3)  //f3 in [0..1]
            //Since the result will be a positive number, Math.ceil is used to round its |value|.
            const __progress = (__maxScroll - finalPos) / _elasticAmount;
            if(__progress > 1) return __maxScroll - _elasticAmount - finalPos;
            if(__progress < 0) return 0; 
            return Math.ceil(delta * Math.pow(__progress, 3)); //delta * f3
          }
          
        //The snap scrolling won't be triggered because we're not 
        //at any end of the passed container.
          options.children = [];
          return delta;
        }

        if(_onXAxis) {
          options.speedModifierX = (deltaX, deltaY) => {
            return _elasticSpeedModifier(deltaX, bss.getFinalXPosition(container, options), bss.getMaxScrollX);
          }
        }
        
        if(_onYAxis) {
          options.speedModifierY = (deltaX, deltaY) => {
            return _elasticSpeedModifier(deltaY, bss.getFinalYPosition(container, options), bss.getMaxScrollY);
          }
        }

    //Default easing behaviors: ease-out-like.
        options.snapEasingX = options.elasticEasingX || function(remaning) {return Math.ceil(bss._framesTime * remaning / 110)};
        options.snapEasingY = options.elasticEasingY || function(remaning) {return Math.ceil(bss._framesTime * remaning / 110)};

        options.elasticEasingX = undefined;
        options.elasticEasingY = undefined;
    options.snapDelay = 60; //Debounce time

    const _elasticScroll = addMomentumSnapScrolling(container, options);
    _elasticScroll();
    
    return _elasticScroll; 
  }

  function addSmoothScrollbar(
    container,
    options = {
      onXAxis: false,
      onYAxis: false,
      hideScrollbarX: false,
      hideScrollbarY: false,
      thumbSize: 17,
      transitionDurationX: "0.2s",     
      transitionDurationY: "0.2s",      
      debugString: "addSmoothScrollbar",
    }
    ) {
    __testImports();

    //Check if the options parameter is a valid object.
    if (options === null || typeof options !== "object" || Array.isArray(options)) {
      bss._errorLogger("addSmoothScrollbar", "the options parameter to be an object", options);
      return;
    }

    options.debugString = options.debugString || "addSmoothScrollbar";

    //Check if the container is a valid container.
    const _containerIsElement = container instanceof Element;
    if(!_containerIsElement) {
      bss._errorLogger(options.debugString, "the container to be an Element", container);
      return;
    }
    
    //Check if the thumb size is a finite number.
    const _scrollbarThumbSize = options.thumbSize || 17;
    if(!Number.isFinite(_scrollbarThumbSize)) {
      bss._errorLogger(options.debugString, "the options.thumbSize to be a finite number", options.thumbSize);
      return;
    }
    
    const _onXAxis = options.onXAxis;
    const _onYAxis = options.onYAxis;
    let _scrollbars = [];
    
    //Check if at least one axis was requested to be momentum-scrolled.
    if(!_onXAxis && !_onYAxis) {
      bss._warningLogger(options.debugString, "was invoked but neither onXAxis or onYAxis were set");
      return _scrollbars;
    }

    //Check if the parent node has position:static because it breaks the scrollbars positions. 
    if(container !== document.body && 
     container !== document.documentElement &&
     window.getComputedStyle(container.parentNode).position === "static"
     ) {
      bss._warningLogger(container.parentNode, "has position:static which may affect the scrollbars positioning")
  }
  
    //Any bssmoverequest is handled by the scrollbars not by the container itself.
  container.addEventListener("bssmoverequest", (event) => {
    const __newEvent = new CustomEvent(
      "bssmoverequest", 
      {
        cancelable: true,
        detail: event.detail
      }
      );
    for(const scrollbar of _scrollbars) {
      scrollbar.thumb.dispatchEvent(__newEvent);
      if(__newEvent.defaultPrevented) event.preventDefault();
    }
  }, {passive:false});

    //Modify the container overflow's styles before caching the maxScrollX/Y values.
  if(_onXAxis) container.style.overflowX = "hidden";
  if(_onYAxis) container.style.overflowY = "hidden";

  if(_onXAxis) {
        //Check if the x-axis of the passed container is actually scrollable. 
    if(bss.getMaxScrollX(container, true, options) < 1) {
      bss._errorLogger(options.debugString, "a container that can be scrolled on the x-axis", container);
      return;
    }

    const _offset = _onYAxis ? _scrollbarThumbSize : 0;
    const _scrollbar = {
      track: document.createElement("div"),
      thumb: document.createElement("div"),
      pointerId: null,
      delayedScroller: null,
    }

        //Default dataset.
    _scrollbar.track.dataset.bss = "scrollbar-track-x";
    _scrollbar.thumb.dataset.bss = "scrollbar-thumb-x";

        //Scrollbar track visibility styles.
    _scrollbar.track.style = `
    contain: style paint;
    touch-action: none;
    position: absolute;
    z-index: 1;
    bottom: 0px;
    left: 0px;
    width: calc(100% - ${_offset}px);
    height: ${_scrollbarThumbSize}px;
    `

        //Scrollbar thumb visibility styles.
    _scrollbar.thumb.style = `
    position: absolute;
    touch-action: none;
    width: 25%;
    height: 100%;
    `

        //Accessibility styles.
    _scrollbar.track.tabIndex = -1;
    _scrollbar.thumb.tabIndex = -1;
    
        //Scroll the container on a pointermove event by the correspoing amount.
    let _selfMoveRequest = false;
    const _scrollContainer = (event) => { 
            //Only one pointer at a time can control the scrollbar.
      if(_scrollbar.pointerId !== event.pointerId) return;

      const __delta = event.movementX; 
      if(__delta === 0) return; 
      
      event.preventDefault();
      event.stopPropagation();

      const __containerScrollSize = bss.getMaxScrollX(container, false, options);
      const __trackSize = _scrollbar.track.clientWidth;
      
      const __scrollMultiplier = __containerScrollSize / __trackSize * 1.3325581395348836;
      const __finalDelta = __delta * __scrollMultiplier; 

      _selfMoveRequest = true;
      _scrollbar.delayedScroller = null;

            //Synchronous call that will execute _moveScrollbar after it.
      container.dispatchEvent(
        new WheelEvent(
          "wheel", 
          {
            deltaX: __finalDelta,
            deltaY: 0,
          }
          )
        );
    }

        //Handle a bssmoverequest event by moving the scrollbar to the correct position.
    const _moveScrollbar = (event) => {
            //The event will be handled by the other scrollbar.
      if(event.detail.axis === 1) return;

            //Check if the scroll position of the container has already been updated,
            //if not use the scroller property of this event to update it. 
      const __scrollPositionAlreadyUpdated = event.defaultPrevented;
      event.preventDefault();

            //The user is still holding down the scrollbar, 
            //this request will be handled on the pointerup event if needed. 
      if(!_selfMoveRequest && _scrollbar.pointerId !== null) {
        _scrollbar.delayedScroller = event.detail.scroller;
        return;
      }
      
            //Update the container's final positions. 
      if(!__scrollPositionAlreadyUpdated) event.detail.scroller();

      const __thumbSize = _scrollbar.thumb.clientWidth;
      const __trackSize = _scrollbar.track.clientWidth;

      let __scrolledPercentage = bss.getFinalXPosition(container, options) / bss.getMaxScrollX(container, false, options);
      __scrolledPercentage = __scrolledPercentage > 1 ? 1 :
      __scrolledPercentage < 0 ? 0 : 
      __scrolledPercentage;

      const __translateAmount = __scrolledPercentage * (__trackSize - __thumbSize);
      
      _scrollbar.thumb.style.transitionDuration = _scrollbar.pointerId !== null ? "0s" : options.transitionDurationX || "0.2s";
      _scrollbar.thumb.style.transform = "translateX(" + __translateAmount + "px)";
      _selfMoveRequest = false;
    }

    const _handlePointerDownOnTrack = (event) => {
      event.preventDefault();
      event.stopPropagation();

            //Trigger this move-to-position behavior only if the user
            //is not controlling the scrollbar with a pointer.
      if(_scrollbar.pointerId !== null) return;

            //The final scroll-position of container is proportional to  
            //where the user has clicked inside the scrollbar track.
      const __currentFinalPos = bss.getFinalXPosition(container);
      const __containerScrollSize = bss.getMaxScrollX(container, false, options);
      const __trackSize = _scrollbar.track.clientWidth;
      const __finalPos = event.offsetX / __trackSize * __containerScrollSize; 

            //The scrollbar will already be in the right position, no action needed.
      if(__currentFinalPos === __finalPos) return;

            //Scroll the container to the calculated position, inform the container that
            //it's being scrolled so that any effect (snap, elastic, etc...) is applied
            //and update the scrollbar position.
      bss.scrollXTo(__finalPos, container);
      _scrollbar.updatePosition();
    }

    _scrollbarSetup(_scrollbar, _scrollContainer, _moveScrollbar, _handlePointerDownOnTrack, options.hideScrollbarX);

        //Add the scrollbar to the container.
    _scrollbar.track.appendChild(_scrollbar.thumb);
    container.insertBefore(_scrollbar.track, container.firstChild);
    
    _scrollbars.push(_scrollbar);

    bss.addOnResizeEndCallback(_scrollbar.updatePosition);
  }

  if(_onYAxis) {
        //Check if the y-axis of the passed container is actually scrollable. 
    if(bss.getMaxScrollY(container, true, options) < 1) {
      bss._errorLogger(options.debugString, "a container that can be scrolled on the y-axis", container);
      return;
    }

    const _scrollbar = {
      track: document.createElement("div"),
      thumb: document.createElement("div"),
      pointerId: null,
      delayedScroller: null,
    }
    
        //Default dataset.
    _scrollbar.track.dataset.bss = "scrollbar-track-y";
    _scrollbar.thumb.dataset.bss = "scrollbar-thumb-y";

        //Scrollbar track visibility styles.
    _scrollbar.track.style = `
    contain: style paint;
    touch-action: none;
    position: absolute;
    z-index: 1;
    top: 0px;
    right: 0px;
    width: ${_scrollbarThumbSize}px;
    height: 100%;
    `

        //Scrollbar thumb visibility styles.
    _scrollbar.thumb.style = `
    position: absolute;
    touch-action: none;
    width: 100%;
    height: 25%;
    `

        //Accessibility styles.
    _scrollbar.track.tabIndex = -1;
    _scrollbar.thumb.tabIndex = -1;
    
        //Scroll the container on a pointermove event by the correspoing amount.
    let _selfMoveRequest = false;
    const _scrollContainer = (event) => {  
            //Only one pointer at a time can control the scrollbar.
      if(_scrollbar.pointerId !== event.pointerId) return;
      
      const __delta = event.movementY; 
      if(__delta === 0) return; 

      event.preventDefault();
      event.stopPropagation();       

      const __containerScrollSize = bss.getMaxScrollY(container, false, options);
      const __trackSize = _scrollbar.track.clientHeight;
      
      const __scrollMultiplier = __containerScrollSize / __trackSize * 1.3325581395348836;
      const __finalDelta = __delta * __scrollMultiplier; 

      _selfMoveRequest = true;
      _scrollbar.delayedScroller = null;

            //Synchronous call that will execute _moveScrollbar after it.
      container.dispatchEvent(
        new WheelEvent(
          "wheel", 
          {
            deltaX: 0,
            deltaY: __finalDelta,
          }
          )
        );
    }

        //Handle a bssmoverequest event by moving the scrollbar to the correct position.
    const _moveScrollbar = (event) => {
            //The event will be handled by the other scrollbar.
      if(event.detail.axis === 0) return;

            //Check if the scroll position of the container has already been updated,
            //if not use the scroller property of this event to update it. 
      const __scrollPositionAlreadyUpdated = event.defaultPrevented;
      event.preventDefault();

            //The user is still holding down the scrollbar, 
            //this request will be handled on the pointerup event if needed. 
      if(!_selfMoveRequest && _scrollbar.pointerId !== null) {
        _scrollbar.delayedScroller = event.detail.scroller;
        return;
      }

            //Update the container's final positions. 
      if(!__scrollPositionAlreadyUpdated) event.detail.scroller();

      const __thumbSize = _scrollbar.thumb.clientHeight;
      const __trackSize = _scrollbar.track.clientHeight;

      let __scrolledPercentage = bss.getFinalYPosition(container, options) / bss.getMaxScrollY(container, false, options);
      __scrolledPercentage = __scrolledPercentage > 1 ? 1 :
      __scrolledPercentage < 0 ? 0 : 
      __scrolledPercentage;

      const __translateAmount = __scrolledPercentage * (__trackSize - __thumbSize);
      
      _scrollbar.thumb.style.transitionDuration = _scrollbar.pointerId !== null ? "0s" : options.transitionDurationY || "0.2s";
      _scrollbar.thumb.style.transform = "translateY(" + __translateAmount + "px)";
      _selfMoveRequest = false;
    }

    const _handlePointerDownOnTrack = (event) => {
      event.preventDefault();
      event.stopPropagation();

            //Trigger this move-to-position behavior only if the user
            //is not controlling the scrollbar with a pointer.
      if(_scrollbar.pointerId !== null) return;

            //The final scroll-position of container is proportional to  
            //where the user has clicked inside the scrollbar track.
      const __currentFinalPos = bss.getFinalYPosition(container);
      const __containerScrollSize = bss.getMaxScrollY(container, false, options);
      const __trackSize = _scrollbar.track.clientHeight;
      const __finalPos = event.offsetY / __trackSize * __containerScrollSize; 

            //The scrollbar will already be in the right position, no action needed.
      if(__currentFinalPos === __finalPos) return;

            //Scroll the container to the calculated position, inform the container that
            //it's being scrolled so that any effect (snap, elastic, etc...) is applied
            //and update the scrollbar position.
      bss.scrollYTo(__finalPos, container);
      _scrollbar.updatePosition();
    }

    _scrollbarSetup(_scrollbar, _scrollContainer, _moveScrollbar, _handlePointerDownOnTrack, options.hideScrollbarY);

        //Add the scrollbar to the container.
    _scrollbar.track.appendChild(_scrollbar.thumb);
    container.insertBefore(_scrollbar.track, container.firstChild);
    
    _scrollbars.push(_scrollbar);
    
    bss.addOnResizeEndCallback(_scrollbar.updatePosition);
  }

  function _scrollbarSetup(scrollbar, scrollContainer, moveScrollbar, handlePointerDownOnTrack, hideScrollbar) {
    scrollbar.updatePosition = () => {
      container.dispatchEvent(
        new WheelEvent(
          "wheel",
          {
            deltaX: 0, 
            deltaY: 0,
          }
          )
        );
    }

    let __hideScrollbarIfNeeded = () => {};

        //Set the scrollbar status to engaged/disengaged by saving the id of
        //the pointer that is controlling it.
    const __setScrollbarEngagement = (event, id) => {
      event.preventDefault();
      event.stopPropagation();
      scrollbar.pointerId = id;
    } 

        //Disengage the scrollbar and handle any previous delayed scroll request.
    const __disengageScrollbar = (event) => {    
            //Wait for the initial pointer to leave the touch-surface.
      if(event.pointerId !== scrollbar.pointerId) return;

      __setScrollbarEngagement(event, null);  
      window.removeEventListener("pointermove", scrollContainer, {passive:false});     
      window.removeEventListener("pointerup", __disengageScrollbar, {passive:false});   

            //Handle any delayed scroll request if any.
      if(scrollbar.delayedScroller) {
        scrollbar.delayedScroller();
        scrollbar.updatePosition();
      }
      __hideScrollbarIfNeeded();
    }

        //If the user clicks the scrollbar track, the container should be scrolled to
        //the corresponding position and the scrollbar thumb should be moved accordingly.
    scrollbar.track.addEventListener("pointerdown", handlePointerDownOnTrack, {passive:false});

        //Engage the scrollbar.
    scrollbar.thumb.addEventListener("pointerdown", (event) => {
            //Only one pointer at a time can control the scrollbar.
      if(scrollbar.pointerId !== null) return;
      
      __setScrollbarEngagement(event, event.pointerId);     
      window.addEventListener("pointerup", __disengageScrollbar, {passive:false});
      window.addEventListener("pointermove", scrollContainer, {passive:false});   
    }, {passive:false});
    
        //Make the scrollbar listen for events that makes it move.
    scrollbar.thumb.addEventListener("bssmoverequest", moveScrollbar, {passive:false});

        //If requested, keep track of the scrollbar's hidden status.
    if(hideScrollbar) {
      let __pointerIsHoveringTrack = false;
      
            //The scrollbar's status is never set to hidden if the pointer is on it.
      scrollbar.track.addEventListener("pointerenter", () => {
        __pointerIsHoveringTrack = true;
        if(scrollbar.pointerId !== null) return;
        scrollbar.track.dataset.bssScrollbarHidden = false; 
      }, {passive:true});
      
            //The scrollbar's status is set to hidden if the pointer  
            //is not hovering it and the scrollbar thumb isn't being used.
      scrollbar.track.addEventListener("pointerleave", () => {
        __pointerIsHoveringTrack = false;
        if(scrollbar.pointerId !== null) return;
        scrollbar.thumb.style.transitionDuration = "";
        scrollbar.track.dataset.bssScrollbarHidden = true; 
      }, {passive:true});
      
            //Whenever the scrollbar is disengaged, check if  
            //its status should be set to hidden.
      __hideScrollbarIfNeeded = () => {
        if(__pointerIsHoveringTrack) return;
        scrollbar.thumb.style.transitionDuration = "";
        scrollbar.track.dataset.bssScrollbarHidden = true; 
      }

            //The scrollbar is initially hidden.
      scrollbar.track.dataset.bssScrollbarHidden = true; 
    }
  }

  return _scrollbars;
}

window.addEventListener("load", () => {
 let lastAnchorPressed = null;
 function setEasingsBody(easingX, easingY) {
  _bodyMomentumScrollingOptions.momentumEasingX = easingX;
  _bodyMomentumScrollingOptions.momentumEasingY = easingY;
}

let bezierTitleTimeout = 0;

const _bodyMomentumScrollingOptions = {
  onYAxis: true,
  momentumEasingY: EASE_LINEAR()
};

addMomentumScrolling(
  bss.getPageScroller(),
  _bodyMomentumScrollingOptions
  );

const _bodyScrollbars = addSmoothScrollbar(
  document.body, 
  {
   onYAxis:true,
   transitionDurationX: "0.6s",
   transitionDurationY: "0.6s",
   hideScrollbarY: true
 }
 );
document.getElementById('scrollbar-track-y').remove();

}, {passive:true}, {once:true});