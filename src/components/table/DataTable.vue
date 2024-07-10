<template>
  <BaseCard>
    <DataTableAltStatus
      v-if="dataTableStatus !== 'idle'"
      :status="dataTableStatus"
    />
    <table
      v-else
      class="min-w-full divide-y divide-gray-200"
    >
      <thead>
        <tr class="rounded-t-lg">
          <template
            v-for="parsedHeader in parsedHeaders"
            :key="parsedHeader"
          >
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ parsedHeader }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(item, itemIndex) in filteredItems"
          :key="itemIndex"
        >
          <tr class="odd:bg-primary-50 hover:bg-primary-100 group">
            <template
              v-for="header in headers"
              :key="`${itemIndex}${header}`"
            >
              <td
                class="px-6 py-4 whitespace-nowrap group-last:first:rounded-bl-lg group-last:last:rounded-br-lg"
              >
                <slot
                  :name="`item.${String(header)}`"
                  :item="item"
                  :index="itemIndex"
                >
                  {{ item[header] }}
                </slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </BaseCard>
</template>

<script setup lang='ts' generic="TDataTableItem extends {[key: string]: any}">
import DataTableAltStatus from '~/components/table/DataTableAltStatus.vue'
import BaseCard from '~/components/BaseCard.vue'
import { toNaturalCase } from '~/utils'

export type DataTableStatus = 'loading' | 'error' | 'empty' | 'idle'
export type DataTableFilters<T> = Partial<Record<keyof T, string | undefined>>

defineComponent({ name: 'DataTable' })

type DataTableSlots<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T as `item.${string & K}`]: (p: { item: T, index: number }) => any
}

defineSlots<DataTableSlots<TDataTableItem>>()

  type DataTableProps<T extends object> = {
    items: T[]
    loading?: boolean
    error?: boolean
    headersMapper?: (itemText: string) => string
    hiddenColumns?: (keyof T)[]
    filterBy?: DataTableFilters<TDataTableItem>
  }
const props = withDefaults(defineProps<DataTableProps<TDataTableItem>>(), {
  headersMapper: (itemText: string) => toNaturalCase(itemText),
})

const headers = computed<(keyof TDataTableItem)[]>(() => Object.keys(props.items[0] ?? {})
  .filter(key => !props.hiddenColumns?.includes(key)) as (keyof TDataTableItem)[])
const parsedHeaders = computed<string[]>(() => headers.value
  .map(header => props.headersMapper(header.toString())))

const dataTableStatus = computed<DataTableStatus>(() => {
  if (props.error) return 'error'
  if (props.loading) return 'loading'
  if (props.items.length === 0) return 'empty'
  return 'idle'
})

const filteredItems = computed<TDataTableItem[]>(() => {
  if (!props.filterBy) return props.items
  console.log(props.filterBy)
  const searchCriteria = Object.entries(props.filterBy).map(([key, value]) => ({
    key,
    value: (value ?? '').toLowerCase(),
  }))

  return props.items.filter(item => Object.values(item).some((value) => {
    if (typeof value !== 'string') return false
    return searchCriteria.some(({ value: searchValue }) => value.toLowerCase().includes(searchValue))
  }))
})
</script>
