# Windows 12 for Web
This file outlines instructions for the Gemini CLI.

## Code
Code style and instructions.
### Syntax
- Use TypeScript
  - Do not use semicolons unless strictly necessary.
- Use Vue
  - Indent styles, template content, and script.
  - Always go in this order: <script setup lang="ts">, <template>, then <style scoped lang="sass">

### Example Code
```vue
<script setup lang="sass">
  import Something from '@/somewhere'
  
  const someOutput = ref<string>()
  
  function doSomething(
    something: Something
  ) {
    do(something)
  }
  
  onMounted(() =>
    someOutput.value = doSomething(something)
  )
</script>

<template>
  <div 
    class="somethingContainer"
    id="something"
  >
    {{ someOutput }}
  </div>
</template>

<style scoped lang="sass">
  .somethingContainer
    background: red
    color: #6618f1
</style>
```
