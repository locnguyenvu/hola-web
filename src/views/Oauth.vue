<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: "Oauth",
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    store.dispatch('setToken', route.params.token).then(() => {
        router.push('/')
      })
  }
}
</script>