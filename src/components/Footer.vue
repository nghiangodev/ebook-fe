<template>
	<footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
		<div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
			<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ currentYear }} <a href="" class="hover:underline"></a> All Rights Reserved.</span>
		</div>
	</footer>
</template>
<script>
	export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      }
    },
  };
</script>
<style lang=""></style>
