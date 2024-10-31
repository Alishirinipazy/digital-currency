<template>
  <div v-if="pending">
    pending
  </div>
  <table class="table table-striped table-hover border rounded" v-else>
    <thead>

    <tr>

      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Handle</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item,index) in pageHandler" :key="index">
      <RowTable :data-coin="item" :data-coin-index="index"/>

    </template>

    </tbody>
  </table>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item " :class="route.query.id === '1' ?'disabled':''"><a class="page-link" @click="prePage"
                                                                                 >Previous</a></li>
        <li class="page-item "  :class="route.query.id === '10'?'disabled':''"><a class="page-link"
                                                                                             @click="nextPage"   >Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
import axios from 'axios'

const router = useRouter();
const route = useRoute()
const cryptoData = ref(null)
const loading = ref(false)
const intervalId = ref(null)
const pageHandler = ref(null);
const {public: {apiBase}} = useRuntimeConfig();

router.push(`?id=1`);

function chunkArray(array, chunkSize) {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get(apiBase)
    cryptoData.value = chunkArray(response?.data?.data, 10)
    if (route.query.id === "1") {
      pageHandler.value = cryptoData.value[0]
    }
  } catch (error) {
    console.error('خطا در دریافت داده:', error)
  } finally {
    loading.value = false
  }
}

// بارگذاری اولیه داده‌ها
fetchData()


onMounted(() => {
  intervalId.value = setInterval(fetchData, 10000)
})


onUnmounted(() => {
  clearInterval(intervalId.value)
})

function prePage() {
  router.push(`?id=${Number(route.query.id) - 1}`);
}

function nextPage() {
  router.push(`?id=${Number(route.query.id) + 1}`);

}

watch(() => route.query.id, (item) =>{
  pageHandler.value = cryptoData.value[Number(route.query.id)-1]
  })

</script>
<style>
a {
  cursor: pointer;
}
</style>