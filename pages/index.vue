<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] max-auto">
                    <div class="text-white" v-if="isPosts" v-for="(post, index) in posts" :key="post">
                        <Post :post="post" @isDeleted="posts = []" />
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
import Post from '~/components/Post.vue';

const userStore = useUserStore()
const user = useSupabaseUser()
const posts = ref([]);
const isPosts = ref(true);
const isLoading = ref(false);

watchEffect(() => {
    console.log(user.value, 'this is log')
    if (!user.value) {
        return navigateTo('/auth')
    }
})

onBeforeMount(() => {
    posts.value = [
        {
            name: 'Vien Huynh',
            image: "https://randomuser.me/api/portraits",
            text: "This is title",
            picture: 'https://placehold.co/500'

        }
    ]
})

</script>