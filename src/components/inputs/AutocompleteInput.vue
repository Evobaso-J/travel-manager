<template>
  <div class="relative">
    <input
      v-model="inputValue"
      :required
      class="hidden"
      :min="0"
    >
    <TextInput
      v-model="searchModel"
      v-bind="$props"
      @focus="showDropdown = true"
      @blur="hideDropdown"
      @input="(event) => { showDropdown = true; emit('input', event) }"
      @clear="clearInput"
    />
    <ul
      v-if="showDropdown && filteredOptions.length > 0"
      class="absolute z-30 mt-1 max-h-52 w-full overflow-x-auto rounded-md border border-gray-300 bg-white shadow-lg"
    >
      <li
        v-for="option in filteredOptions"
        :key="option.text"
        class="p-4 cursor-pointer hover:bg-primary-50"
        @click.stop="selectOption(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts' generic="TInput">
import { defineComponent, ref } from 'vue'
import type { SelectOption } from './SelectInput.vue'
import TextInput from './TextInput.vue'
import type { BaseInputEmits, BaseInputProps } from './BaseInput.vue'

defineComponent({ name: 'AutocompleteInput' })

type AutocompleteInputProps<T> = {
  options: SelectOption<T>[]
  required?: boolean
} & Omit<BaseInputProps, 'type'>

const props = defineProps<AutocompleteInputProps<TInput>>()
const emit = defineEmits<BaseInputEmits>()

const showDropdown = ref(false)

const filteredOptions = computed(() => props.options.filter(option => option.text.toLowerCase().includes(searchModel.value?.toLowerCase() ?? '')))

const selectOption = (option: SelectOption<TInput>) => {
  inputValue.value = option.value
  searchModel.value = option.text
  showDropdown.value = false
}

const hideDropdown = async () => {
  // Wait for the click event to fire before hiding the dropdown
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
const clearInput = () => {
  inputValue.value = undefined
  searchModel.value = undefined
  emit('clear')
}
</script>
