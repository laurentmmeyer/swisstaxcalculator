<template>
  <div>
    <FormKit type="group" name="deductions">
      <div class="grid grid-cols-1 gap-4">
        <template v-for="deduction in deductionKeys" :key="deduction">
          <FormKit
            :id="deduction"
            :name="deduction"
            :label="props.deductions[deduction].label.de"
            wrapper-class="flex items-center"
            label-class="flex-1 mr-4"
            inner-class="flex-1"
            type="numberSuffix"
            suffix="CHF"
            :value="getDefaultValue(deduction)"
            :placeholder="getPlaceholder(deduction)"
            validation="min:0"
            :min="0"
          />
        </template>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { TaxDeductionFieldConfigs } from '~/lib/taxes/typesClient';

const props = defineProps<{ deductions: TaxDeductionFieldConfigs; childrenCount?: number }>();

const deductionKeys = computed(() =>
  Object.keys(props.deductions).filter(
    (deduction) =>
      props.deductions[deduction].withChildrenOnly !== true || (props.childrenCount ?? 0) > 0
  )
);

const getDefaultValue = (deduction: string) => {
  const deductionConfig = props.deductions[deduction];
  if (deductionConfig.defaultFlatRate) {
    return undefined;
  }
  if (deductionConfig.default !== undefined) return deductionConfig.default;

  if (deductionConfig.defaultPerChild !== undefined && props.childrenCount !== undefined) {
    return deductionConfig.defaultPerChild * props.childrenCount;
  }

  return undefined;
};

const getPlaceholder = (deduction: string) => {
  const deductionConfig = props.deductions[deduction];
  if (deductionConfig.defaultFlatRate) {
    return 'pauschal';
  }
  if (deductionConfig.default !== undefined) return deductionConfig.default;

  if (deductionConfig.defaultPerChild !== undefined && props.childrenCount !== undefined) {
    return deductionConfig.defaultPerChild * props.childrenCount;
  }

  return 0;
};
</script>
