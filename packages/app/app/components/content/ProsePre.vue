<template>
  <ProseCodeBlock
    :code="code"
    :language="language"
    :filename="filename"
    :highlights="highlights"
    :meta="meta"
  >
    <pre class="px-2" :class="$props.class" :style="style"><slot /></pre>
  </ProseCodeBlock>
</template>

<script setup lang="ts">
import type { BuiltinLanguage } from "shiki";

defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String as PropType<BuiltinLanguage>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  style: {
    type: [String, Object],
    default: null,
  },
});
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
