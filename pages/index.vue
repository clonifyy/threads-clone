<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] max-auto">
                    <div class="text-white" v-if="isPosts" v-for="(post, index) in posts" :key="post">
                        <Post :post="post" @isDeleted="onDelete" />
                    </div>
                    <div v-else>
                        <client-only>
                            <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="eos-icons:bubble-loading" size="50" color="#ffffff" />
                                    <div class="w-full mt-1">Loading...</div>
                                </div>
                            </div>
                            <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                                    <div class="w-full">Make the first post!</div>
                                </div>
                            </div>
                        </client-only>
                    </div>
                    <div class="mt-60" />

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
const isPosts = ref(false);
const isLoading = ref(false);

watchEffect(() => {
    console.log(user.value, 'this is log')
    if (!user.value) {
        return navigateTo('/auth')
    }
})

onBeforeMount(async () => {
    try {
        isLoading.value = true
        await userStore.getPosts()
        isLoading.value = false
    } catch (error) {
        console.log(error)
    }
})

onMounted(() => {
    watchEffect(() => {
        if (userStore.posts && userStore.posts.length >= 1) {
            posts.value = userStore.posts
            isPosts.value = true
        } else {
            isPosts.value = false
        }
    })
})

watch(() => posts.value, () => {
    if (userStore.posts && userStore.posts.length >= 1) {
        posts.value = userStore.posts
        isPosts.value = true
    }
}, { deep: true })


const onDelete = async () => {
    posts.value = await userStore.getPosts()

}
</script>