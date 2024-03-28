export const useUserStore = defineStore('user', {
    state: () => ({
        posts: [],
        isMenuOverlay: false,
        isLogoutOverlay: false,
    })
})