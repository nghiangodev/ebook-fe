<template class="flex">
	<Sidebar ref="sideBar" id="sideBar" />
	<section class='w-full' :style="{ 'padding-left': sideBarWidth + 'px' }">
		<div class="container mx-auto">
			<Header></Header>
			<main :page="this.$route.name">
				<RouterView />
				<CurrentPlayAudio></CurrentPlayAudio>
			</main>
		</div>
	</section>
</template>
<script>
	import Header from "@/components/Header.vue";
	import Footer from "@/components/Footer.vue";
	import Sidebar from "@/components/common/Sidebar.vue";
	import CurrentPlayAudio from "./components/common/CurrentPlayAudio.vue";
	export default {
		components: {
			Header,
			Footer,
			Sidebar,
			CurrentPlayAudio,
		},
		data() {
			return {
				sideBarWidth: "",
			};
		},
		updated() {
			this.sideBarWidth = this.$refs.sideBar.$el.clientWidth;
		},
	};
</script>
<style scoped></style>
