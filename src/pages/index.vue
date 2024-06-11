<script setup>
</script>

<template>
	<VApp>
		<VMain>
			<VLayout max-width="1400px" class="mx-auto">
				<Navigation />
				<HomeSection />
			</VLayout>
		</VMain>
	</VApp>
</template>

<style scoped>
.v-main {
	background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url('../assets/images/aa_sun_set.jpeg') no-repeat center center;
	background-size: cover;
	background-position: center;
	height: 100vh;
	width: 100vw;
}
</style>
