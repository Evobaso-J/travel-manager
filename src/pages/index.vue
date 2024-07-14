<template>
  <div>
    <section>
      <PageTitle
        :title
      />
    </section>
    <section>
      <DashboardRow>
        <LoadScoreWidget
          :load-score-percentage="67"
        />
        <DashboardWidgetContainer>
          <StandardInfoWidget
            title="Total Sales"
            :value="323"
            :percentage-growth="11"
          />
          <StandardInfoWidget
            title="New Users"
            :value="3"
            :percentage-growth="5"
          />
        </DashboardWidgetContainer>
        <DashboardWidgetContainer>
          <StandardInfoWidget
            title="Total Revenue"
            :value="723"
            :value-formatter="formatPrice"
            :percentage-growth="5"
          />
          <StandardInfoWidget
            title="Total Customers"
            :value="3278"
            :percentage-growth="4"
            growth-direction="down"
          />
        </DashboardWidgetContainer>
        <DashboardWidgetContainer>
          <StandardInfoWidget
            title="Booked Travels"
            :value="100"
            :value-formatter="(val) => `${val} %`"
          />
          <StandardInfoWidget
            title="Platform Usage"
            :value="81"
            :value-formatter="(val) => `${val} %`"
            :percentage-growth="9"
          />
        </DashboardWidgetContainer>
        <DashboardWidgetContainer>
          <StandardInfoWidget
            title="Canceled Travels"
            :value="9"
            growth-direction="down"
            :percentage-growth="1"
          />
          <StandardInfoWidget
            title="New / Returning ratio"
            :value="3"
            :value-formatter="(val) => `${val} / 312`"
          />
        </DashboardWidgetContainer>
        <DashboardWidgetContainer>
          <StandardInfoWidget
            title="New Destinations"
            :value="30"
            :percentage-growth="25"
          />
          <StandardInfoWidget
            title="Margin Rate"
            :value="12"
            :value-formatter="(val) => `${val} %`"
            :percentage-growth="3"
          />
        </DashboardWidgetContainer>
      </DashboardRow>
    </section>
  </div>
</template>

<script lang="ts" setup>
import DashboardRow from '~/components/dashboard-widgets/DashboardRow.vue'
import LoadScoreWidget from '~/components/dashboard-widgets/LoadScoreWidget.vue'
import StandardInfoWidget from '~/components/dashboard-widgets/StandardInfoWidget.vue'
import PageTitle from '~/components/PageTitle.vue'
import { formatPrice } from '~/utils'
import DashboardWidgetContainer from '~/components/dashboard-widgets/DashboardWidgetContainer.vue'

const title = 'Dashboard'
useHead({
  title,
})
</script>
