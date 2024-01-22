<template>
	<div class="min-h-screen bg-[#FFD799]/[0.2] pt-10 fixed sm:block hidden">
		<router-link to="/" class="flex items-center gap-3 px-4">
			<img src="/images/common/logo.png " alt="" />
			<span class="text-[#626262] text-base font-bold"> Hệ thống thông tin <br />Ebook </span>
		</router-link>

		<div class="flex items-center gap-2 mt-4 py-1 px-4 side-item">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M1.5 10.25C1.5 5.41751 5.41751 1.5 10.25 1.5C15.0825 1.5 19 5.41751 19 10.25C19 15.0825 15.0825 19 10.25 19C5.41751 19 1.5 15.0825 1.5 10.25ZM10.25 0C4.58908 0 0 4.58908 0 10.25C0 15.9109 4.58908 20.5 10.25 20.5C15.9109 20.5 20.5 15.9109 20.5 10.25C20.5 4.58908 15.9109 0 10.25 0ZM7.5 10.25C7.5 8.7312 8.7312 7.5 10.25 7.5C11.7688 7.5 13 8.7312 13 10.25C13 11.7688 11.7688 13 10.25 13C8.7312 13 7.5 11.7688 7.5 10.25ZM10.25 6C7.90279 6 6 7.90279 6 10.25C6 12.5972 7.90279 14.5 10.25 14.5C12.5972 14.5 14.5 12.5972 14.5 10.25C14.5 7.90279 12.5972 6 10.25 6Z"
					fill="black"
					fill-opacity="0.8" />
			</svg>
			<span class="text-[#626262] font-medium">Thư viên</span>
		</div>
		<div class="flex items-center gap-2 mt-4 py-1 px-4 side-item">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M1.5 10.25C1.5 5.41751 5.41751 1.5 10.25 1.5C15.0825 1.5 19 5.41751 19 10.25C19 15.0825 15.0825 19 10.25 19C5.41751 19 1.5 15.0825 1.5 10.25ZM10.25 0C4.58908 0 0 4.58908 0 10.25C0 15.9109 4.58908 20.5 10.25 20.5C15.9109 20.5 20.5 15.9109 20.5 10.25C20.5 4.58908 15.9109 0 10.25 0ZM7.5 10.25C7.5 8.7312 8.7312 7.5 10.25 7.5C11.7688 7.5 13 8.7312 13 10.25C13 11.7688 11.7688 13 10.25 13C8.7312 13 7.5 11.7688 7.5 10.25ZM10.25 6C7.90279 6 6 7.90279 6 10.25C6 12.5972 7.90279 14.5 10.25 14.5C12.5972 14.5 14.5 12.5972 14.5 10.25C14.5 7.90279 12.5972 6 10.25 6Z"
					fill="black"
					fill-opacity="0.8" />
			</svg>
			<span class="text-[#626262] font-medium">Liên hệ</span>
		</div>
	</div>
</template>
<script>
	export default {};
</script>
<style>
	@import url("@/assets/common/sidebar.scss");
</style>
