export const useUserStore = defineStore('user', {
    state: () => ({
        posts: [],
        isMenuOverlay: false,
        isLogoutOverlay: false,
    }),
    actions: {
        async getPosts() {
            const posts = await useFetch('/api/get-posts')
            this.posts = posts.data
            return posts.data
        }
    }
})