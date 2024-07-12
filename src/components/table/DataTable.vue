<template>
  <BaseCard>
    <div class="overflow-scroll">
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
            <th
              v-if="parsedHeaders.length > 0"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-white"
            >
              <div>
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(item, itemIndex) in filteredItems"
            :key="itemIndex"
          >
            <tr
              class="group odd:bg-primary-50 hover:bg-primary-100 cursor-pointer"
              @click="goToEdit(item.id)"
            >
              <template
                v-for="header in headers"
                :key="`${itemIndex}${header}`"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap group-last:first:rounded-bl-lg"
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
              <td
                v-if="parsedHeaders.length > 0"
                class="px-6 py-4 whitespace-nowrap group-last:last:rounded-br-lg sticky right-0 group-odd:bg-primary-50 group-even:bg-white group-hover:bg-primary-100"
              >
                <div class="flex justify-around items-center">
                  <DeleteButton
                    :id="item.id"
                    :client="resourceClient"
                  />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script setup lang='ts' generic="TDataTableItem extends {[key: string]: any}, TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId">
import DataTableAltStatus from '~/components/table/DataTableAltStatus.vue'
import BaseCard from '~/components/BaseCard.vue'
import { toNaturalCase } from '~/utils'
import DeleteButton from '~/components/buttons/DeleteButton.vue'
import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'

export type DataTableStatus = 'loading' | 'error' | 'empty' | 'idle'
export type DataTableFilters<T> = Partial<Record<keyof T, string | undefined>>

defineComponent({ name: 'DataTable' })

type DataTableSlots<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T as `item.${string & K}`]: (p: { item: T, index: number }) => any
}

defineSlots<DataTableSlots<TDataTableItem>>()

  type DataTableProps<T extends object, I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> = {
    items: T[]
    loading?: boolean
    error?: boolean
    headersMapper?: (itemText: string) => string
    hiddenColumns?: (keyof T)[]
    filterBy?: DataTableFilters<TDataTableItem>
    resourceClient: ResourceClient<I, Res, Req>
  }
const props = withDefaults(defineProps<DataTableProps<TDataTableItem, TInternal, TResponse, TRequest>>(), {
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
  const searchCriteria = Object.entries(props.filterBy).map(([key, value]) => ({
    key,
    value: (value ?? '').toLowerCase(),
  }))

  return props.items.filter(item => Object.values(item).some((value) => {
    if (typeof value !== 'string') return false
    return searchCriteria.some(({ value: searchValue }) => value.toLowerCase().includes(searchValue))
  }))
})

const route = useRoute()
const goToEdit = (id: number) => {
  navigateTo(`${route.path}/${id}/edit`)
}
</script>
