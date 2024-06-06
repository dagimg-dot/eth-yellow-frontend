<script setup>
import { ref } from 'vue';
import { useLogin } from '@/composables/login';

const form = ref({
	email: '',
	password: '',
})

const isPasswordVisible = ref(false)
const { login, loading, error, user } = useLogin();

const loginHandler = async () => {
	console.log(form.value)
	try {
		const response = await login(form.value);
		if (response.success) {

			console.log('Login successful:', user.value);
		} else {
			// Handle login failure (e.g., show an error message)
			console.log('Login failed:', response.message);
		}
	} catch (err) {
		console.log('An error occurred during login:', err);
	}
};
</script>

<template>
	<div class="d-flex h-screen align-center">
		<VContainer>
			<VRow justify="center">
				<VCol cols="5">
					<VCard>
						<VCardTitle>
							ethyellow.
						</VCardTitle>
						<VCardText>
							<VForm @submit.prevent="loginHandler">
								<VTextField v-model="form.email" label="Email" required />
								<VTextField v-model="form.password" label="Password" placeholder="············"
									:type="isPasswordVisible ? 'text' : 'password'"
									:append-inner-icon="isPasswordVisible ? 'mdi-hide' : 'mdi-show'"
									@click:append-inner="isPasswordVisible = !isPasswordVisible" />
								<VAlert v-if="error" type="error" dismissible>
									{{ error }}
								</VAlert>
								<VBtn block type="submit" elevation="0" :loading="loading">
									<span class="text-white"> Login</span>
								</VBtn>
							</VForm>
						</VCardText>
					</VCard>
				</VCol>
			</VRow>
		</VContainer>
	</div>
</template>
