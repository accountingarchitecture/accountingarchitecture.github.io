// Default slide settings
Reveal.initialize({
	// The "normal" size of the presentation, aspect ratio will be preserved
	// when the presentation is scaled to fit different resolutions
	width: 1150,
	height: 700,

	// Factor of the display size that should remain empty around the content
	margin: 0.1,

	// Bounds for smallest/largest possible scale to apply to content
	minScale: 0.2,
	maxScale: 1.5,

	// Display presentation control arrows
	controls: true,

	// Help the user learn the controls by providing hints, for example by
	// bouncing the down arrow when they first encounter a vertical slide
	controlsTutorial: true,

	// Determines where controls appear, "edges" or "bottom-right"
	controlsLayout: 'edges',

	// Visibility rule for backwards navigation arrows; "faded", "hidden"
	// or "visible"
	controlsBackArrows: 'visible',

	// Display a presentation progress bar
	progress: true,

	// Display the page number of the current slide
	slideNumber: true,

	// Determine which displays to show the slide number on
	showSlideNumber: 'all',

	// Push each slide change to the browser history
	history: false,

	// Enable keyboard shortcuts for navigation
	keyboard: true,

	// Optional function that blocks keyboard events when retuning false
	keyboardCondition: null,

	// Enable the slide overview mode
	overview: false,

	// Vertical centering of slides
	center: true,

	// Enables touch navigation on devices with touch input
	touch: true,

	// Loop the presentation
	loop: false,

	// Change the presentation direction to be RTL
	rtl: false,

	// Randomizes the order of slides each time the presentation loads
	shuffle: false,

	// Turns fragments on and off globally
	fragments: true,

	// Flags if the presentation is running in an embedded mode,
	// i.e. contained within a limited portion of the screen
	embedded: false,

	// Flags if we should show a help overlay when the question-mark
	// key is pressed
	help: true,

	// Flags if it should be possible to pause the presentation (blackout)
	pause: true,

	// Flags if speaker notes should be visible to all viewers
	showNotes: false,

	// Global override for autolaying embedded media (video/audio/iframe)
	// - null:   Media will only autoplay if data-autoplay is present
	// - true:   All media will autoplay, regardless of individual setting
	// - false:  No media will autoplay, regardless of individual setting
	autoPlayMedia: null,

	// Controls automatic progression to the next slide
	// - 0:      Auto-sliding only happens if the data-autoslide HTML attribute
	//           is present on the current slide or fragment
	// - 1+:     All slides will progress automatically at the given interval
	// - false:  No auto-sliding, even if data-autoslide is present
	autoSlide: 0,

	// Stop auto-sliding after user input
	autoSlideStoppable: true,

	// Use this method for navigation when auto-sliding (defaults to navigateNext)
	autoSlideMethod: null,

	// Enable slide navigation via mouse wheel
	mouseWheel: true,

	// Apply a 3D roll to links on hover
	rollingLinks: false,

	// Hides the address bar on mobile devices
	hideAddressBar: true,

	// Opens links in an iframe preview overlay
	previewLinks: false,

	// Exposes the reveal.js API through window.postMessage
	postMessage: true,

	// Dispatches all reveal.js events to the parent window through postMessage
	postMessageEvents: false,

	// Focuses body when page changes visibility to ensure keyboard shortcuts work
	focusBodyOnPageVisibilityChange: true,

	// Transition style
	transition: 'none', // none/fade/slide/convex/concave/zoom

	// Transition speed
	transitionSpeed: 'default', // default/fast/slow

	// Transition style for full page slide backgrounds
	backgroundTransition: 'none', // none/fade/slide/convex/concave/zoom

	// Parallax background image
	parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"

	// Parallax background size
	parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"

	// Amount of pixels to move the parallax background per slide step
	parallaxBackgroundHorizontal: null,
	parallaxBackgroundVertical: null,

	// The maximum number of pages a single slide can expand onto when printing
	// to PDF, unlimited by default
	pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,

	// Offset used to reduce the height of content within exported PDF pages.
	// This exists to account for environment differences based on how you
	// print to PDF. CLI printing options, like phantomjs and wkpdf, can end
	// on precisely the total height of the document whereas in-browser
	// printing has to end one pixel before.
	pdfPageHeightOffset: -1,

	// Number of slides away from the current that are visible
	viewDistance: 3,

	// The display mode that will be used to show slides
	display: 'block',

	// Script dependencies to load
	dependencies: []
});
