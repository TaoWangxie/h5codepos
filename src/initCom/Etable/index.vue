<template>
  <div
    class="Etable"
    :style="{ height: isMaxH && maxH > 0 ? `${maxH}px` : '100%' }"
  >
    <el-form
      ref="formTableRef"
      style="width: 100%; margin: 0 !important"
      :model="tableFrom"
      :rules="tableFrom.rules"
    >
      <el-table v-bind="bindTable" :data="tableFrom.data">
        <!-- 多选 -->
        <template v-if="!hideConfig.includes('checkbox')">
          <el-table-column
            :type="isType"
            width="55"
            fixed="left"
            :align="'center'"
          />
        </template>
        <!-- 序号 -->
        <template v-if="!hideConfig.includes('serial')">
          <el-table-column
            type="index"
            :align="'center'"
            width="55"
            fixed="left"
            label="序号"
          />
        </template>
        <el-table-column
          v-for="(colItem, index) in columns"
          :key="colItem.label + index"
          :prop="colItem.prop"
          v-bind="colItem"
          min-width="120px"
          show-overflow-tooltip
        >
          <template #default="scope">
            <template v-if="colItem.colType === 'slot'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <slot :name="colItem.prop" :scope="scope" />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'select'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-select
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  v-bind="colItem.col"
                  :value-key="colItem?.option?.valueKey"
                  :disabled="scope.row?.isDisabled?.includes(colItem.prop)"
                  @change="dataChange($event, colItem, scope)"
                >
                  <el-option
                    v-for="it in listTypeInfo[colItem?.list]"
                    :key="it.value"
                    :label="
                      it[
                        colItem.option && colItem.option.label
                          ? colItem.option.label
                          : 'name'
                      ]
                    "
                    :value="
                      colItem.option && colItem.option.valueKey
                        ? it
                        : it[
                            colItem.option && colItem.option.value
                              ? colItem.option.value
                              : 'id'
                          ]
                    "
                  />
                </el-select>
                <template v-else>
                  {{ scope.row[colItem.prop] ? getLabel(colItem, scope) : "-" }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'relationSelect'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-select
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  v-bind="colItem.col"
                  :value-key="colItem?.option?.valueKey"
                  :disabled="scope.row?.isDisabled?.includes(colItem.prop)"
                  @change="dataChange($event, colItem, scope)"
                >
                  <el-option
                    v-for="it in colItem.list
                      ? scope.row.listTypeInfo[colItem.list]
                      : []"
                    :key="it.value"
                    :label="
                      it[colItem.option.label ? colItem.option.label : 'name']
                    "
                    :value="
                      colItem.option.valueKey
                        ? it
                        : it[colItem.option.value ? colItem.option.value : 'id']
                    "
                    :disabled="it.disabled"
                  />
                </el-select>
                <template v-else>
                  {{
                    scope.row[colItem.prop]
                      ? getRelationLabel(colItem, scope)
                      : "-"
                  }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'cascader'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-cascader
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  v-bind="colItem.col"
                  :options="listTypeInfo[colItem.list]"
                  @change="dataChange($event, colItem, scope.$index)"
                />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'inputNumber'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-input-number
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  v-bind="colItem.col"
                />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'input'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-input
                  v-model="scope.row[colItem.prop]"
                  placeholder="请输入"
                  v-bind="colItem.col"
                  @focus="inputFocus($event, colItem, scope.$index)"
                  @input="dataChange($event, colItem, scope.$index)"
                />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'date'">
              <!-- 日期选择框 -->
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-date-picker
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  placeholder="请选择"
                  v-bind="colItem.col"
                />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'time'">
              <!-- 时间选择框 -->
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-time-picker
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  placeholder="请选择时间"
                  v-bind="colItem.col"
                />
              </el-form-item>
            </template>
            <!-- 普通列 -->
            <template v-else>
              {{ scope.row[colItem.prop] ? scope.row[colItem.prop] : "-" }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import {
  ref,
  getCurrentInstance,
  watch,
  onMounted,
  nextTick,
  computed,
  onActivated,
} from "vue";
const { proxy } = getCurrentInstance() as any;

//props
interface Props {
  rowKey?: string; //对于列表中唯一的字段rowKey默认为id
  data: any; //列表的数据
  columns: any[]; //传过来的表头信息
  loading?: boolean; // 表格加载动画开关
  isType?: string; //单多选
  listTypeInfo?: any; //选择项值列表
  rules?: any; //校验
  isView?: boolean; //查看模式
  hideConfig?: string[]; // 隐藏配置项，用于隐藏部分功能 可用值['checkbox', 'serial'] 默认隐藏序号列
  maxH?: number;
}
const props = withDefaults(defineProps<Props>(), {
  rowKey: "",
  data: () => [],
  columns: () => [],
  loading: false,
  isType: "selection",
  listTypeInfo: () => {},
  rules: () => {},
  hideConfig: () => [],
  isView: false,
  maxH: 3000,
});

let isMaxH: any = ref(false);

//form实例
let formTableRef: any = ref(null);

//data
let tableData: any = ref([]);

//computed
const bindTable = computed(() => {
  return {
    ref: "table",
    "highlight-current-row": true,
    stripe: false,
    border: true,
    loading: props.loading || false,
    "max-height": 3000,
    ...proxy.$attrs,
  };
});
const tableFrom = computed(() => {
  return {
    data: tableData.value,
    rules: props.rules,
  };
});
const setMaxH = () => {
  nextTick(() => {
    let box: any = document.querySelector(".Etable .el-scrollbar__view");
    let hei = box?.offsetHeight;
    if (hei > props.maxH && props.maxH > 0) {
      isMaxH.value = true;
    } else {
      isMaxH.value = false;
    }
  });
};
//watch
watch(
  () => props.data,
  (val) => {
    tableData.value = val;
    setMaxH();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  nextTick(() => {
    let box: any = document.querySelector(".Etable .el-scrollbar__view");
    watch(
      () => box.offsetHeight,
      (val) => {
        setMaxH();
      },
      { deep: true, immediate: true }
    );
  });
});

//select
const getLabel = (val: any, scope: any) => {
  let data = props.listTypeInfo[val.list].filter((item: any) => {
    return item[val.option?.value] == scope.row[val.prop];
  });
  let res = data.length ? data[0][val.option?.label] : "-";
  return res;
};
const getRelationLabel = (val: any, scope: any) => {
  if (scope.row.listTypeInfo) {
    let data = scope.row.listTypeInfo[val.list].filter((item: any) => {
      return item[val.option?.value] == scope.row[val.prop];
    });
    let res = data.length ? data[0][val.option?.label] : "-";
    return res;
  } else {
    return "-";
  }
};
const getVal = (val: any, scope: any) => {
  let data = props.listTypeInfo[val.list].filter((item: any) => {
    return item[val.option?.value] == scope.row[val.prop];
  });
  let res = data.length ? data[0] : [];
  return res;
};

//methods
//校验
const confirmRule = async (mustData: boolean = false) => {
  if (mustData && !tableData.value.length) return false;
  if (!mustData && !tableData.value.length)
    return Promise.resolve(tableData.value);
  const valid = await new Promise((resolve) =>
    formTableRef.value.validate(resolve)
  );
  console.log(valid);
  if (!valid) return false;

  return Promise.resolve(tableData.value);
};
//数据变化触发
const dataChange = (val: any, columns: any, scope: any) => {
  let currentVal = val;
  nextTick(() => {
    if (columns.colType == "cascader" && columns.col.ref) {
      let data = proxy.refs[columns.col.ref].getCheckedNodes();
      currentVal = data[0]?.data;
    }
    let res;
    if (columns.colType == "select") {
      res = getVal(columns, scope);
    }
    proxy.$emit("dataChangefn", columns, res, scope.$index);
  });
};
//聚焦
const inputFocus = (val: any, columns: any, index: any) => {
  proxy.$emit("inputFocus", columns, index);
};

//暴露方法给父组件
defineExpose({ confirmRule });
</script>
<style lang="scss" scoped>
//element-plus

.Etable ::v-deep .el-checkbox {
  margin: 0 auto !important;
}
.Etable ::v-deep .el-radio {
  margin-top: 5px;
}
.Etable ::v-deep .el-radio .el-radio__label {
  display: none;
}
.Etable ::v-deep .el-form .el-form-item {
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.Etable ::v-deep .el-table,
.Etable ::v-deep .el-form,
.Etable ::v-deep .el-table__inner-wrapper {
  height: 100%;
}
.Etable ::v-deep .el-table .el-table-hisColumn .el-table__header-wrapper {
  height: auto !important;
}
.Etable ::v-deep .el-table .el-table__header-wrapper {
  height: auto !important;
}
.Etable ::v-deep .el-table__body-wrapper {
  overflow: auto;
  height: calc(100% - 32px) !important;
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-table {
  .el-table__header-wrapper,
  .el-table__fixed,
  .el-table__fixed-right {
    .el-table__header {
      th {
        font-weight: bold !important;
        color: #222;
        padding: 0 !important;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        letter-spacing: 1px;
        text-align: center;
        background: #f8f8f9;
        border-right: none;
      }

      .el-table--border th {
        border-right: none;
      }
    }
  }
}

// 滚动条的宽度
::v-deep ::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep ::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

//
.Etable {
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  // todo
  padding: 0;
}

.tag-box {
  width: 100%;
  display: flex;
  padding: 8px 0;
  .tag-option {
    width: 25px;
    height: 100%;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .tagBox {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .tagItem {
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 5px;
      float: left;
    }
  }
}
</style>
