<template>
  <div>
    <h2 align="center" style="margin-top: 0px">983医院住院患者管路滑脱登记上报表</h2>

    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="患者姓名："
        width="300">
        <el-table-column
          prop="id"
          label="诊断："
          width="300">

        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="name"
        label="性别：">
        <el-table-column
          prop="id"
          label=""
          width="180">

        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="年龄：">
        <el-table-column
          prop="amount2"
          label="">

        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="病案号：">
        <el-table-column
          prop="amount2"
          label="填表人：">

        </el-table-column>
      </el-table-column>
    </el-table>
      <el-form :model="form" ref="form" label-width="100px" size="">
        <el-row>
          <el-col  :span="8">
            <el-form-item label="一、导管类型" prop="nl">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="0">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
            <el-checkbox  label="胃管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="尿管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="引流管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="PICC"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="胸腔引流管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
          <el-form-item>
            <el-checkbox  label="透析管路"  true-label="1"/>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="气插管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="中心静脉亚导管（CVP）"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item>
              <el-checkbox  label="桡动脉"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item>
              <el-checkbox  label="气囊漂浮导管（Swan-Ganz）"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="其他" >
              ______________
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="2">
            <el-form-item label="二、发生时间" prop="birthProvince">
              :_______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="时" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="分" prop="birthCity">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="2">
            <el-form-item label="三、置管时间" prop="birthProvince">
              :_______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="birthCity">
            </el-form-item>
          </el-col>

        </el-row>
        <el-row >
          <el-col :span="2">
            <el-form-item label="手术日期" prop="birthProvince">
              :_______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="birthCity">
            </el-form-item>
          </el-col>

        </el-row>
        <el-row >
          <el-col :span="1">
            <el-form-item label="四、患者身体" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="状况" prop="birthProvince">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="护理级别：" >
              <el-checkbox  label="特级护理"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="一级护理"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="二级护理"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="三级护理"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="意识状态：" >
              <el-checkbox  label="清醒"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="嗜睡"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="朦胧"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="躁动"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="昏迷"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="精神状态：" >
              <el-checkbox  label="平静"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="烦躁"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="焦虑"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="恐惧"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="其他" >
              _______
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="意识状态：" >
              <el-checkbox  label="清醒"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="嗜睡"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="朦胧"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="躁动"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="昏迷"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col  :span="1">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="活动能力：" >
              <el-checkbox  label="行动正常"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="使用助听器"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="残肢"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="" >
              <el-checkbox  label="无法行动"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="3">
            <el-form-item label="其他" >
              _______
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="五、脱管原因" prop="birthProvince">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="患者自拔"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="患者自己活动时滑脱"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="医护人员操作时滑脱"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="家属协助患者活动时滑脱"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="与操作无关的滑脱"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="六、 固 定 法" prop="birthProvince">
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
        <el-col :span="3">
          <el-form-item label="" prop="birthProvince">
            <el-checkbox  label="缝合"  true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="" prop="birthProvince">
            <el-checkbox  label="胶布固定"  true-label="1"/>
          </el-form-item>
        </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="水囊固定"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="其他" prop="birthProvince">
              _______
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="七、相关因素" prop="birthProvince">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="健康宣教" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="已做"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="未做"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="约束带使用" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="有"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="无"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="管路滑脱时" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="工作人员" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="在患者身边"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="未在患者身边"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="其他" prop="birthProvince">
              _______
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="八、处理" prop="birthProvince">
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="立即通知医生"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="重新置管"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="观察病情"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="脱管部位处理"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="记录病情"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="用药（药物名称_____________）"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="1">
          <el-form-item label="九 、 并 发 症" prop="birthProvince">
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="出血________ml"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="气栓"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="血栓"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="窒息"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="感染"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="气胸"  true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="birthProvince">
              <el-checkbox  label="吻合口瘘"  true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="3">
          <el-form-item label="其他" prop="birthProvince">
            ________
          </el-form-item>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="科室" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="护士长" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="填表日期" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="年" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="月" prop="birthProvince">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="birthProvince">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="日" prop="birthProvince">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: null,
          name: null,
          amount1: null,
          amount2: null,
          amount3: null
        }]
      };
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      }
    }
  };
</script>
