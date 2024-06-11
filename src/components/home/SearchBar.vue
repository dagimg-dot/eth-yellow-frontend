<script setup>
import { computed, ref, watch } from 'vue'
import { toast } from 'vue3-toastify';

const CUR_LOCATION = "Current Location"

const form = ref({
    location: '',
    searchQuery: '',
})

const locationChoice = computed(() => form.value.location)

const mockFetchedCityList = ref(['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Enugu', 'Benin', 'Jos', 'Sokoto', 'Warri', 'Onitsha', 'Calabar', 'Uyo', 'Owerri', 'Aba', 'Akure', 'Makurdi', 'Minna', 'Ilorin', 'Katsina', 'Ado Ekiti', 'Bauchi', 'Yola', 'Gombe', 'Awka', 'Lafia', 'Jalingo', 'Dutse', 'Birnin Kebbi', 'Gusau', 'Yenagoa', 'Asaba', 'Umuahia', 'Oshogbo', 'Abeokuta', 'Ijebu Ode', 'Ife', 'Ilesha', 'Ondo', 'Ikare', 'Owo', 'Ijero', 'Iloro'])

const mockLocations = ref([
    CUR_LOCATION, ...mockFetchedCityList.value
])

const search = () => {
    console.log(form.value)
}

watch(locationChoice, () => {
    if (form.value.location === CUR_LOCATION) {
        locateUser()
    }
})

const locateUser = () => {
    console.log('Locating user . . .')

    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            form.value.location = `${position.coords.latitude}, ${position.coords.longitude}`
        },
        error => {
            toast.error('Location access denied. Please enable location access to use this feature.')
        }
    );
}

</script>

<template>
    <VContainer class="search-wrapper pa-6">
        <VForm class="d-flex ga-4" @submit.prevent="search">
            <VRow>
                <VCol cols="12" md="4">
                    <VSelect v-model="form.location" :items="mockLocations" dense prepend-inner-icon="bx-map"
                        @click:prepend-inner="locateUser" label="Location" />
                </VCol>
                <VCol cols="12" md="6">
                    <VTextField v-model="form.searchQuery" label="Search" placeholder="What do you need . . ."
                        prepend-inner-icon="bx-search" dense />
                </VCol>
                <VCol cols="12" md="2" width="40">
                    <VBtn type="submit" width="100%" height="100%" density="default" >
                        Search
                    </VBtn>
                </VCol>
            </VRow>
        </VForm>
    </VContainer>
</template>

<style scoped>
.search-wrapper {
    border-radius: 12px;
    backdrop-filter: blur(15px);
    background-color: #62752227;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>