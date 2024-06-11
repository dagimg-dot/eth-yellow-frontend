<script setup>
import { ref } from 'vue'

const form = ref({
    location: '',
    searchQuery: '',
})

const mockLocations = ref([
    'Current Location', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Enugu', 'Benin', 'Jos', 'Sokoto', 'Warri', 'Onitsha', 'Calabar', 'Uyo', 'Owerri', 'Aba', 'Akure', 'Makurdi', 'Minna', 'Ilorin', 'Katsina', 'Ado Ekiti', 'Bauchi', 'Yola', 'Gombe', 'Awka', 'Lafia', 'Jalingo', 'Dutse', 'Birnin Kebbi', 'Gusau', 'Yenagoa', 'Asaba', 'Umuahia', 'Oshogbo', 'Abeokuta', 'Ijebu Ode', 'Ife', 'Ilesha', 'Ondo', 'Ikare', 'Owo', 'Ijero', 'Iloro'
])

const search = () => {
    console.log(form.value)
}

</script>

<template>
    <VContainer class="search-wrapper pa-6">
        <VForm class="d-flex ga-4" @submit.prevent="search">
            <VSelect  placeholder="Where" label="Where" v-model="form.location" :items="mockLocations" dense class="w-25" prepend-inner-icon="bx-map" />
            <VTextField v-model="form.searchQuery" label="Search" placeholder="What do you need . . ."
                prepend-inner-icon="bx-search" dense class="w-75" />
            <VBtn type="submit" variant="flat" density>
                Search
            </VBtn>
        </VForm>
    </VContainer>
</template>

<style scoped>
.search-wrapper {
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>