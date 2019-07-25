import { action, computed, observable } from "mobx";

export class CourseClassPlayerController {
	private video: HTMLVideoElement | null = null;
	private videoWrapper: HTMLDivElement | null = null;
	private removeListeners: () => void | undefined;

	@observable protected _buffered: TimeRanges | undefined = undefined;
	@observable protected _currentTime: number = NaN;
	@observable protected _defaultMuted: boolean = false;
	@observable protected _defaultPlaybackRate: number = 1;
	@observable protected _duration: number = NaN;
	@observable protected _ended: boolean = false;
	@observable protected _error: MediaError | null = null;
	@observable protected _loop: boolean = false;
	@observable protected _muted: boolean = false;
	@observable protected _networkState: 0 | 1 | 2 | 3 = 0;
	@observable protected _paused: boolean = false;
	@observable protected _playbackRate: number = 1;
	@observable protected _played: TimeRanges | undefined = undefined;
	@observable protected _readyState: 0 | 1 | 2 | 3 | 4 = 0;
	@observable protected _seeking: boolean = false;
	@observable protected _volume: number = 1;

	@observable protected _isFullscreen: boolean = false;
	@observable protected blockControlsIds: string[] = [];

	@computed public get buffered() {
		return this._buffered;
	}

	@computed public get currentTime() {
		return this._currentTime;
	}

	@action public setCurrentTime(time: number) {
		const { video } = this;
		if (!video) return;

		time = Math.max(0, Math.min(this.duration, time));

		video.currentTime = time;
		this._currentTime = time;
	}

	@computed public get defaultMuted() {
		return this._defaultMuted;
	}

	@action public setDefaultMuted(defaultMuted: boolean) {
		const { video } = this;

		if (!video) return;

		video.defaultMuted = this._defaultMuted = defaultMuted;
	}

	@computed public get defaultPlaybackRate() {
		return this._defaultPlaybackRate;
	}

	@action public setDefaultPlaybackRate(defaultPlaybackRate: number) {
		const { video } = this;

		if (!video) return;

		video.defaultPlaybackRate = this._defaultPlaybackRate = defaultPlaybackRate;
	}

	@computed public get duration() {
		return this._duration;
	}

	@computed public get ended() {
		return this._ended;
	}

	@computed public get error() {
		return this._error;
	}

	@computed public get loop() {
		return this._loop;
	}

	@action public setLoop(loop: boolean) {
		const { video } = this;

		if (!video) return;

		video.loop = this._loop = loop;
	}

	@computed public get muted() {
		return this._muted;
	}

	@action public setMuted(muted: boolean) {
		const { video } = this;

		if (!video) return;

		video.muted = this._muted = muted;
	}

	@computed public get networkState() {
		return this._networkState;
	}

	@computed public get paused() {
		return this._paused;
	}

	@computed public get playbackRate() {
		return this._playbackRate;
	}

	@action public setPlaybackRate(playbackRate: number) {
		const { video } = this;

		if (!video) return;

		video.playbackRate = this._playbackRate = Math.max(0.25, Math.min(10, playbackRate));
	}

	@computed public get played() {
		return this._played;
	}

	@computed public get readyState() {
		return this._readyState;
	}

	@computed public get seeking() {
		return this._seeking;
	}

	@computed public get volume() {
		return this._volume;
	}

	@action public setVolume(volume: number) {
		const { video } = this;

		if (!video) return;

		video.volume = this._volume = volume;
	}

	@computed public get blockControls(): boolean {
		return this.blockControlsIds.length > 0;
	}

	@action.bound public addBlockControls(id: string) {
		this.blockControlsIds.push(id);
	}

	@action.bound public removeBlockControls(id: string): boolean {
		const index = this.blockControlsIds.indexOf(id);

		if (index < 0) return false;

		this.blockControlsIds.splice(index, 1);
		return true;
	}

	@computed public get isPlaying(): boolean {
		const { paused, readyState, ended, error } = this;

		return !paused && readyState > 2 && !ended && !error;
	}

	@action.bound public setIsPlaying(isPlaying: boolean) {
		const { video } = this;
		if (!video) return;

		if (isPlaying) video.play();
		else video.pause();
	}

	@computed public get loadedPercentage(): number {
		const { buffered, currentTime, duration } = this;

		if (!buffered || Number.isNaN(currentTime) || Number.isNaN(duration)) return NaN;

		if (buffered.length === 0) return 0;

		let i;
		let bufferedEnd = buffered.end(0);

		for (
			i = 0;
			i < buffered.length - 1 && !(buffered.start(i) <= currentTime && currentTime <= buffered.end(i));
			i++
		)
			i++;
		if (i < buffered.length) bufferedEnd = buffered.end(i);

		return (bufferedEnd * 100) / duration || 0;
	}

	@computed public get isFullscreen() {
		return this._isFullscreen;
	}

	@action.bound public setFullscreen(fullscreen: boolean) {
		if (!fullscreen) document.exitFullscreen();
		else if (this.videoWrapper) this.videoWrapper.requestFullscreen();
	}

	@computed public get showControls(): boolean {
		return this.loaded && this.blockControls;
	}

	protected setShowControlsTimeout: number | undefined;

	@action public setShowControls(timeout: number): string {
		const id = uuid();

		this.addBlockControls(id);

		this.setShowControlsTimeout = setTimeout(() => this.removeBlockControls(id), timeout);

		return id;
	}

	@computed public get loaded() {
		return this.readyState > 0;
	}

	@computed public get waiting() {
		return this.readyState < 3;
	}

	protected removeFullscreenListener: (() => void) | undefined;

	@action public setVideoWrapperInstance(videoWrapper: HTMLDivElement | null) {
		this.videoWrapper = videoWrapper;

		if (this.removeFullscreenListener) this.removeFullscreenListener();

		const syncFullscreenState = () => (this._isFullscreen = this.videoWrapper === document.fullscreenElement);
		syncFullscreenState();

		document.addEventListener("fullscreenchange", syncFullscreenState);

		this.removeFullscreenListener = () => document.removeEventListener("fullscreenchange", syncFullscreenState);
	}

	@action.bound protected syncVideoState(
		video: Pick<
			HTMLVideoElement,
			| "buffered"
			| "currentTime"
			| "defaultMuted"
			| "defaultPlaybackRate"
			| "duration"
			| "ended"
			| "error"
			| "loop"
			| "muted"
			| "networkState"
			| "paused"
			| "playbackRate"
			| "played"
			| "readyState"
			| "seeking"
			| "volume"
		> | null,
		eventName?: string
	) {
		// if (eventName) console.log(eventName);

		if (!video) {
			video = {
				buffered: undefined as any,
				currentTime: NaN,
				defaultMuted: false,
				defaultPlaybackRate: 1,
				duration: NaN,
				ended: false,
				error: null,
				loop: false,
				muted: false,
				networkState: 0,
				paused: false,
				playbackRate: 1,
				played: undefined as any,
				readyState: 0,
				seeking: false,
				volume: 1,
			};
		}

		const {
			currentTime,
			defaultMuted,
			defaultPlaybackRate,
			duration,
			ended,
			error,
			loop,
			muted,
			networkState,
			paused,
			playbackRate,
			played,
			readyState,
			seeking,
			volume,
		} = video;

		this._currentTime = currentTime;
		this._defaultMuted = defaultMuted;
		this._defaultPlaybackRate = defaultPlaybackRate;
		this._duration = duration;
		this._ended = ended;
		this._error = error;
		this._loop = loop;
		this._muted = muted;
		this._networkState = networkState as any;
		this._paused = paused;
		this._playbackRate = playbackRate;
		this._played = played;
		this._readyState = readyState as any;
		this._seeking = seeking;
		this._volume = volume;

		// this._isPlaying = !paused && readyState > 2 && !ended && !error;
		// this._currentTime = currentTime || 0;
		// this._duration = duration || 0;
		// this._loadedPercentage = 0; // TODO
		// this._waiting = false; // TODO
		// this._playbackRate = playbackRate || this.playbackRate;
		// this._loaded = readyState > 0;
		// this._volume = volume;
		// this._readyState = readyState;

		// this._duration = Number.isNaN(duration) ? 0 : duration;
		// this._currentTime = Number.isNaN(currentTime) ? 0 : currentTime;

		// this._playbackRate = playbackRate;
	}

	@action public setVideoInstance(video: HTMLVideoElement | null) {
		if (this.removeListeners) this.removeListeners();

		const eventMap: Partial<Record<keyof HTMLVideoElementEventMap, undefined | ((e: Event) => boolean)>> = {
			// MSVideoFormatChanged: undefined,
			// MSVideoFrameStepCompleted: undefined,
			// MSVideoOptimalLayoutChanged: undefined,
			encrypted: undefined,
			// msneedkey: undefined,
			// waitingforkey: undefined,
			fullscreenchange: undefined,
			fullscreenerror: undefined,
			abort: undefined,
			animationcancel: undefined,
			animationend: undefined,
			animationiteration: undefined,
			animationstart: undefined,
			auxclick: undefined,
			blur: undefined,
			cancel: undefined,
			canplay: undefined,
			canplaythrough: undefined,
			change: undefined,
			// click: undefined,
			close: undefined,
			contextmenu: undefined,
			cuechange: undefined,
			dblclick: undefined,
			drag: undefined,
			dragend: undefined,
			dragenter: undefined,
			dragexit: undefined,
			dragleave: undefined,
			dragover: undefined,
			dragstart: undefined,
			drop: undefined,
			durationchange: undefined,
			emptied: undefined,
			ended: undefined,
			error: undefined,
			focus: undefined,
			gotpointercapture: undefined,
			input: undefined,
			invalid: undefined,
			keydown: undefined,
			keypress: undefined,
			keyup: undefined,
			load: undefined,
			loadeddata: undefined,
			loadedmetadata: undefined,
			loadend: undefined,
			loadstart: undefined,
			lostpointercapture: undefined,
			// mousedown: undefined,
			// mouseenter: undefined,
			// mouseleave: undefined,
			// mousemove: undefined,
			// mouseout: undefined,
			// mouseover: undefined,
			// mouseup: undefined,
			pause: undefined,
			play: undefined,
			playing: undefined,
			// pointercancel: undefined,
			// pointerdown: undefined,
			// pointerenter: undefined,
			// pointerleave: undefined,
			// pointermove: undefined,
			// pointerout: undefined,
			// pointerover: undefined,
			// pointerup: undefined,
			progress: undefined,
			ratechange: undefined,
			reset: undefined,
			// resize: undefined,
			scroll: undefined,
			// securitypolicyviolation: undefined,
			seeked: undefined,
			seeking: undefined,
			select: undefined,
			selectionchange: undefined,
			selectstart: undefined,
			stalled: undefined,
			submit: undefined,
			suspend: undefined,
			timeupdate: undefined,
			toggle: undefined,
			// touchcancel: undefined,
			// touchend: undefined,
			// touchmove: undefined,
			// touchstart: undefined,
			transitioncancel: undefined,
			transitionend: undefined,
			transitionrun: undefined,
			transitionstart: undefined,
			volumechange: undefined,
			waiting: undefined,
			wheel: undefined,
			copy: undefined,
			cut: undefined,
			paste: undefined,
		};

		this.video = video;
		this.syncVideoState(video);

		if (!video) return;

		const eventListeners: Record<keyof HTMLVideoElementEventMap, (e: Event) => void> = {} as any;

		for (const key in eventMap) {
			const typedKey = key as keyof HTMLVideoElementEventMap;

			eventListeners[typedKey] = (e: Event) => {
				const value = eventMap[key as keyof HTMLVideoElementEventMap];

				if (!value || value(e)) this.syncVideoState(e.currentTarget as HTMLVideoElement, typedKey);
			};
		}

		for (const key in eventListeners) video.addEventListener(key, eventListeners[key]);

		this.removeListeners = () => {
			for (const key in eventListeners) video.removeEventListener(key, eventListeners[key]);
		};
	}
}
