<template lang="">
	<div
		v-if="currentPlaylist"
		:class="{ hidden: isHidden }"
		class="preview shadow-[0px_2px_13.1px_0px_rgba(0,0,0,0.1)] bg-white bottom-0 right-0 left-0 fixed py-4 sm:px-5 md:px-10 px-1 flex justify-between items-center">
		<div class="flex gap-2 items-center sm:min-w-[250px]">
			<img v-if="currentPlaylist" :src="currentPlaylist.track.image" class="md:w-[80px] md:h-[80px] sm:w-[60px] sm:h-[60px] w-[30px] h-[30px] object-cover rounded-lg" :alt="'Playlist Image ' + currentPlaylist.track.id" />
			<div class="sm:flex flex-col hidden">
				<span class="w-100 overflow-hidden whitespace-nowrap text-black font-bold" v-if="currentPlaylist">{{ currentPlaylist.track.title }}</span>
				<span class="w-100 overflow-hidden whitespace-nowrap text-black font-medium" v-if="currentPlaylist">{{ currentPlaylist.track.description }}</span>
			</div>
		</div>

		<div class="grow mb-0 gap-2 flex items-center justify-center flex-col">
			<div class="flex gap-2">
				<button @click="toggleShuffle" class="!bg-none !bg-transparent !px-1">
					<font-awesome-icon class="text-black" :class="{ 'text-yellow-200': isShuffle }" size="lg" icon="shuffle" />
				</button>
				<button @click="playPrevious" class="!bg-none !bg-transparent !px-1">
					<svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.957031 0.25V16.75" stroke="black" />
						<path d="M1.95703 8.75L10.957 0.75V16.75L1.95703 8.75Z" fill="black" />
					</svg>
				</button>
				<button @click="togglePlayPause" class="">
					<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="isPlay === true">
						<rect x="-0.581081" y="0.581081" width="41.8378" height="41.8378" rx="20.9189" transform="matrix(-1 0 0 1 42.7949 0)" stroke="black" stroke-width="1.16216" />
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M16.5678 14C16.3685 14 16.207 14.1615 16.207 14.3607V28.6393C16.207 28.8385 16.3685 29 16.5678 29H20.8463C21.0455 29 21.207 28.8385 21.207 28.6393V14.3607C21.207 14.1615 21.0455 14 20.8463 14H16.5678ZM24.0678 14C23.8685 14 23.707 14.1615 23.707 14.3607V28.6393C23.707 28.8385 23.8685 29 24.0678 29H28.3463C28.5455 29 28.707 28.8385 28.707 28.6393V14.3607C28.707 14.1615 28.5455 14 28.3463 14H24.0678Z"
							fill="black" />
					</svg>
					<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
						<rect x="-0.581081" y="0.581081" width="41.8378" height="41.8378" rx="20.9189" transform="matrix(-1 0 0 1 42.7949 0)" stroke="black" stroke-width="1.16216" />
						<path d="M27.6865 21.5001L17.2271 12.2028V30.7974L27.6865 21.5001Z" fill="black" />
					</svg>
				</button>
				<button @click="playNext" class="!bg-none !bg-transparent !px-1">
					<svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.957 0.25V16.75" stroke="black" />
						<path d="M9.95703 8.75L0.957031 0.75V16.75L9.95703 8.75Z" fill="black" />
					</svg>
				</button>

				<button @click="toggleRepeat" class="!bg-none !bg-transparent !px-1">
					<font-awesome-icon class="text-black" :class="{ 'text-yellow-200': isRepeat }" size="lg" icon="repeat" />
				</button>
			</div>
			<div class="w-full flex justify-center gap-3 items-center">
				<span class="text-black">{{ formatTime(currentTime) }}</span>
				<div class="audio-player relative w-2/3">
					<div class="time-play-indicator absolute bottom-0 left-0 right-0">
						<div class="progress-bar relative h-2 bg-gray-300 rounded" @click="seekTo">
							<div class="progress h-full bg-[#00C8C8] rounded" :style="{ width: progressBarWidth }"></div>
						</div>
					</div>
				</div>
				<span class="text-black">{{ formatTime(totalLength) }}</span>
			</div>
		</div>

		<div class="flex gap-3 items-center" @mouseleave="hideVolumeSlider">
			<button @mouseover="showVolumeSlider = true" @mousefocus="showVolumeSlider = true" @blur="hideVolumeSlider" tabindex="0" @click="toggleMute" class="min-w-6 relative">
				<font-awesome-icon class="text-black" size="lg" :icon="showSoundIcon" />
			</button>
			<div @mouseover="cancelHideVolumeSlider" @mouseleave="scheduleHideVolumeSlider" class="">
				<input
					type="range"
					@mouseover="cancelHideVolumeSlider"
					@blur="hideVolumeSlider"
					@mouseleave="scheduleHideVolumeSlider"
					@mousefocus="cancelHideVolumeSlider"
					tabindex="0"
					min="0"
					max="1"
					step="0.01"
					v-model="volume"
					@input="updateAudioVolume"
					class="vertical-range max-w-[50px] sm:max-w-max"/>
			</div>
		</div>
	</div>
</template>
<script>
	import { ref, inject, onBeforeUnmount } from "vue";
	const isPlaying = ref(false);
	const isPlay = ref(false);

	export default {
		data() {
			return {
				playlists: [],
				player: null,
				progressBarMargin: 0,
				currentTime: 0,
				totalLength: 0,
				isIdPlay: 0,
				audioPlayers: [],
				currentPlaylistId: null,
				isShuffle: false,
				isRepeat: false,
				isCurrentPlaylistId: 0,
				volume: 1,
				isMuted: false,
				showVolumeToolbar: false,
				showVolumeSlider: false,
				showSoundIcon: "volume-high",
				hideVolumeTimeout: null,
				activeIndex: null,
				isHidden: false,
			};
		},
		computed: {
			progressBarWidth() {
				return `${(this.currentTime / this.totalLength) * 100}%`;
			},
			playIndicatorPosition() {
				return `${(this.currentTime / this.totalLength) * 100}%`;
			},
			currentPlaylist() {
				return this.playlists.find((playlist) => playlist.id === this.currentPlaylistId);
			},
		},
		setup() {
			return {
				isPlaying,
				isPlay,
			};
		},

		methods: {
			playAudio(playlistId) {
				if (this.currentPlaylistId !== playlistId) {
					this.stopCurrentPlaylist();
					this.initPlayer(playlistId);
				}
				this.isIdPlay = playlistId;

				const audioPlayer = this.audioPlayers[playlistId];

				if (audioPlayer) {
					if (audioPlayer.paused) {
						this.isPlay = true;
						audioPlayer.play();
						this.$eventBus.$emit("isPlaying", {});
						this.isCurrentPlaylistId = playlistId;
					} else {
						this.isPlay = false;
						audioPlayer.pause();
						this.$eventBus.$emit("isPaused", {});
					}
					this.currentPlaylistId = playlistId;
				}
			},
			stopCurrentPlaylist() {
				const currentAudioPlayer = this.audioPlayers[this.currentPlaylistId];
				this.$eventBus.$emit("stopCurrentPlaylist", {
					currentAudioPlayer: currentAudioPlayer,
				});
				//
				// this.$eventBus.$on('stopCurrentPlaylist', (data) => {
				// });
				if (currentAudioPlayer) {
					currentAudioPlayer.pause();
					currentAudioPlayer.currentTime = 0;
				}
			},
			initPlayer(playlistId) {
				this.audioPlayers[playlistId] = new Audio(this.playlists.find((p) => p.id === playlistId).track.audioSrc);
				this.audioPlayers[playlistId].addEventListener("timeupdate", () => this.timeCal(playlistId));
				this.audioPlayers[playlistId].addEventListener("ended", () => {
					this.isPlaying = false;
					if (this.isRepeat && this.isShuffle) {
						return false;
					}
					this.playNext();
				});

				this.setupAudioEventListener(playlistId);
			},
			togglePlayPause() {
				const audioPlayer = this.audioPlayers[this.currentPlaylistId];
				if (audioPlayer) {
					if (audioPlayer.paused) {
						this.isPlay = true;
						audioPlayer.play();
					} else {
						this.isPlay = false;
						audioPlayer.pause();
					}
					this.isPlaying = !this.isPlaying;
				}
				this.$eventBus.$emit("audioPlaybackChanged", { audioId: this.currentPlaylistId, playing: this.isPlay });
			},

			formatTime(seconds) {
				const minutes = Math.floor(seconds / 60);
				const secondsInt = Math.floor(seconds % 60);
				return `${String(minutes).padStart(2, "0")}:${String(secondsInt).padStart(2, "0")}`;
			},
			timeCal(playlistId) {
				const audioPlayer = this.audioPlayers[playlistId];

				if (audioPlayer) {
					this.currentTime = audioPlayer.currentTime;
					this.totalLength = audioPlayer.duration;
					this.progressBarMargin = `${(this.currentTime / this.totalLength) * 100}%`;
				}
			},
			toggleShuffle() {
				this.isShuffle = !this.isShuffle;
			},
			toggleRepeat() {
				this.isShuffle = false;
				this.isRepeat = !this.isRepeat;
			},
			playNext() {
				this.stopCurrentPlaylist();
				const currentIndex = this.playlists.findIndex((playlist) => playlist.id === this.currentPlaylistId);
				let nextIndex;

				if (this.isRepeat) {
					nextIndex = currentIndex;
				} else {
					nextIndex = (currentIndex + 1) % this.playlists.length;
				}

				this.currentPlaylistId = this.playlists[nextIndex].id;
				this.initPlayer(this.currentPlaylistId);

				this.playAudio(this.currentPlaylistId);
				this.$eventBus.$emit("nextAudio", { audioId: this.currentPlaylistId, playing: this.isPlay });
			},
			playPrevious() {
				this.stopCurrentPlaylist();
				const currentIndex = this.playlists.findIndex((playlist) => playlist.id === this.currentPlaylistId);
				let previousIndex;

				if (this.isRepeat) {
					previousIndex = currentIndex;
				} else {
					previousIndex = (currentIndex - 1 + this.playlists.length) % this.playlists.length;
				}

				this.currentPlaylistId = this.playlists[previousIndex].id;
				this.playAudio(this.currentPlaylistId);
				this.initPlayer(this.currentPlaylistId);
				this.$eventBus.$emit("prevAudio", { audioId: this.currentPlaylistId, playing: this.isPlay });
			},
			seekTo(event) {
				const progressBar = event.currentTarget;
				const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
				const totalWidth = progressBar.clientWidth;
				const seekPercentage = clickPosition / totalWidth;
				const seekTime = seekPercentage * this.totalLength;

				const audioPlayer = this.audioPlayers[this.currentPlaylistId];
				if (audioPlayer) {
					audioPlayer.currentTime = seekTime;
				}
			},
			setupAudioEventListener(playlistId) {
				const audioPlayer = this.audioPlayers[playlistId];

				if (audioPlayer && audioPlayer.addEventListener) {
					const checkEnded = () => {
						this.checkEnded(playlistId);
						return false;
					};

					audioPlayer.addEventListener("timeupdate", checkEnded);

					onBeforeUnmount(() => {
						audioPlayer.removeEventListener("timeupdate", checkEnded);
					});
				} else {
					console.error("Unable to add event listener: audioPlayer not found or does not support addEventListener.");
				}
			},
			checkEnded(playlistId) {
				const audioPlayer = this.audioPlayers[playlistId];

				if (audioPlayer.currentTime === audioPlayer.duration) {
					if (this.repeat) {
						audioPlayer.currentTime = 0;
					} else {
						audioPlayer.pause();
						this.isPlaying = false;
						return false;
					}
				}
			},
			toggleMute() {
				this.isMuted = !this.isMuted;
				if (this.isMuted) {
					this.volume = 0;
				} else {
					this.volume = 1;
				}
				this.updateAudioVolume();
				this.trackingIconSound();
			},
			updateAudioVolume() {
				const audioPlayer = this.audioPlayers[this.currentPlaylistId];
				if (audioPlayer) {
					audioPlayer.volume = this.isMuted ? 0 : this.volume;
				}
				this.trackingIconSound();
			},
			trackingIconSound() {
				switch (this.volume * 1) {
					case 1:
						this.showSoundIcon = "volume-high";
						break;
					case 0:
						this.showSoundIcon = "volume-xmark";
						break;
					default:
						this.showSoundIcon = "volume-low";
						break;
				}
			},
			hideVolumeSlider() {
				this.hideVolumeTimeout = setTimeout(() => {
					this.showVolumeSlider = false;
				}, 100); // Adjust the delay as needed
			},
			cancelHideVolumeSlider() {
				clearTimeout(this.hideVolumeTimeout);
			},
			scheduleHideVolumeSlider() {
				this.hideVolumeTimeout = setTimeout(() => {
					this.hideVolumeSlider();
				}, 100);
			},
		},
		mounted() {
			this.$eventBus.$on("updatePlaylist", (data) => {
				this.playlists = data.playlists;
			});
			this.$eventBus.$on("initPlayer", (data) => {
				this.initPlayer(data.playlistId);
			});
			this.$eventBus.$on("playAudio", (data) => {
				this.isPlay = data.play;
				this.playAudio(data.playlistId);
			});

			this.$eventBus.$on("stopCurrentPlaylist", (data) => {});
		},
	};
</script>
<style lang=""></style>
