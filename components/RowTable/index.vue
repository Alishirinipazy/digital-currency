<template>
  <tr>
    <td>{{dataCoin?.baseSymbol}}</td>
    <td>${{ numberFormat(dataCoin?.priceUsd) }}</td>
    <td>{{dataCoin?.quoteId}}</td>
  </tr>

</template>
<script setup>
import {numberFormat} from "~/utils/helper.js";

const props = defineProps(['dataCoin','dataCoinIndex'])

watch(props?.dataCoin?.priceUsd ,(item)=> {
  console.log(item,'new')
})

</script>