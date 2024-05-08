<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script>
import { onBeforeUnmount, ref, shallowRef, onMounted, defineEmits, defineProps } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// 获取从父组件传过来的数据
const propsFromParents = defineProps({
  content: String,
});

export default {
  components: { Editor, Toolbar },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    // const emit = defineEmits(['event'])
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      props.content && (valueHtml._value = props.content)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const handleChange = (editor) => {
        context.emit('event', valueHtml._value)
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange
    };
  }
}
</script>

<style lang="scss" scoped>

</style>