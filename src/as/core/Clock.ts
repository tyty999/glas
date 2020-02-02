/**
 * @author alteredq / http://alteredqualia.com/
 * @author Joe Pea / http://github.com/trusktr
 */

function getTime(): i64 {
	return Date.now()
}

/**
 * Object for keeping track of time.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js">src/core/Clock.js</a>
 */
export class Clock {
	/**
	 * If set, starts the clock automatically when the first update is called.
	 */
	autoStart: boolean

	/**
	 * When the clock is running, It holds the starttime of the clock.
	 * This counted from the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 */
	startTime: i64 = 0

	/**
	 * When the clock is running, It holds the previous time from a update.
	 * This counted from the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 */
	oldTime: i64 = 0

	/**
	 * When the clock is running, It holds the time elapsed between the start of the clock to the previous update.
	 * This parameter is in seconds of three decimal places.
	 */
	elapsedTime: f64 = 0

	/**
	 * This property keeps track whether the clock is running or not.
	 */
	running: boolean = false

	getNow: () => i64

	/**
	 * @param autoStart Automatically start the clock.
	 */
	constructor(autoStart: boolean = true, getNow: () => i64 = getTime) {
		this.getNow = getNow
		this.autoStart = autoStart
	}

	/**
	 * Starts clock.
	 */
	start(): void {
		this.startTime = this.getNow() // see #10732

		this.oldTime = this.startTime
		this.elapsedTime = 0.0
		this.running = true
	}

	/**
	 * Stops clock.
	 */
	stop(): void {
		this.getElapsedTime()
		this.running = false
		this.autoStart = false
	}

	/**
	 * Get the seconds passed since the clock started.
	 */
	getElapsedTime(): f64 {
		this.getDelta()
		return this.elapsedTime
	}

	/**
	 * Get the seconds passed since the last call to this method.
	 */
	getDelta(): f64 {
		var diff: f64 = 0.0

		if (this.autoStart && !this.running) {
			this.start()
			return 0
		}

		if (this.running) {
			var newTime = this.getNow()

			diff = ((newTime - this.oldTime) as f64) / 1000
			this.oldTime = newTime

			this.elapsedTime += diff
		}

		return diff
	}
}