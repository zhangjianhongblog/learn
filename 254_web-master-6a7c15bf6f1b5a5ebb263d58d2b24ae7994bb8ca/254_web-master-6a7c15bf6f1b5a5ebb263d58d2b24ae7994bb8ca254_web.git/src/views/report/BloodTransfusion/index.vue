<template>
  <div>
    <div>
      <h2 align="center" style="margin-top: 0px">医院输血不良反应回报单</h2>
      <el-form  :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm" size="mini" float="left">
        <el-row>
          <el-col :span="5">
            <el-form-item label="受血者姓名" prop="paymentMethod">
              _______
              <!--<el-select v-model="formInline.paymentMethod" :disabled="true">-->
              <!--<el-option label="城镇职工基本医疗保险" value="1"></el-option>-->
              <!--<el-option label="城镇居民基本医疗保险" value="2"></el-option>-->
              <!--<el-option label="新型农村合作医疗" value="3"></el-option>-->
              <!--<el-option label="贫困救助" value="4"></el-option>-->
              <!--<el-option label="商业医疗保险" value="5"></el-option>-->
              <!--<el-option label="全公费" value="6"></el-option>-->
              <!--<el-option label="全自费" value="7"></el-option>-->
              <!--<el-option label="其他社会保险" value="8"></el-option>-->
              <!--<el-option label="其他" value="8"></el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="性别" prop="healthCard">
<!--              <el-input v-model="formInline.healthCard" :disabled="true"></el-input>-->
              _______
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年龄" prop="visitId">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="科别" prop="inpNo">
              _______
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="床号" prop="NAME">
              _______
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="5">
            <el-form-item label="ID号" prop="sex">
              _______
              </el-select>
              <!--<el-select v-model="formInline.sex" placeholder="男" :disabled="true">-->
              <!--<el-option label="男" value="1"></el-option>-->
              <!--<el-option label="女" value="2"></el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="病案号" prop="dateOfBirth">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="临床诊断" prop="age">
              ______________________________________________________________________________________
            </el-form-item>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="血型" prop="citienship">
              _______&nbsp;RH(D)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
          </el-col>
          <!--<el-col :span="5">-->
          <!--<el-form-item label="（年龄不足一周岁的）年龄（月）" >-->
          <!--<el-input v-model="formInline.monthAge" :disabled="true"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="5">
            <el-form-item label="" prop="firstNeonatalWeight">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="既往输液史：" prop="admissionneonatalWeight">
              <el-checkbox  label="" true-label="1"/>&nbsp;有

            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="" prop="admissionneonatalWeight">
              <el-checkbox  label="" true-label="1"/>&nbsp;无
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="孕" prop="admissionneonatalWeight">
              _______&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="产" prop="admissionneonatalWeight">
              _______
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="发血时间" prop="birthProvince">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="birthCountry">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="nation">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="时" prop="nation">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="输血时间" prop="birthProvince">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="birthCity">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="birthCountry">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="nation">
              _______
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="时" prop="nation">
              _______
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
          <el-form-item label="供血血型" >
            _______
          </el-form-item>
          </el-col>
          <el-col :span="5">
          <el-form-item label="血袋储血号" >
            _______
          </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="输血种类:" prop="idNo">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="全血" prop="idNo">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="occupation">
              _______
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item label="袋" prop="maritalStatus">
              _______ ml
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="悬浮红细胞" prop="occupation">
              _______
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="袋" prop="maritalStatus">
              _______ ml
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="nowAddress">

            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="洗涤红细胞" prop="nowAddress">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="occupation">
              _______
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item label="袋" prop="maritalStatus">
              _______ ml
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="机采血小板" prop="occupation">
              _______
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="袋" prop="maritalStatus">
              _______ ml
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="nowAddress">

            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="血浆" prop="nowAddress">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" prop="occupation">
              _______
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item label="袋" prop="maritalStatus">
              _______ ml
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他" prop="occupation">
              _________________________________________________
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="输液前用药" prop="phone">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="情况：" prop="phone">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="(名称、计量" prop="nowZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="、给药时间)" prop="nowZipCode">
              _________________________________________________
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="输液反应" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="症状：" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="发热：" prop="registeredZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="输液前：" prop="registeredZipCode">
              _______℃，
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="输血后：" prop="registeredZipCode">
              _______℃，
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="寒战" prop="registeredZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="恶寒" prop="registeredZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="头痛" prop="registeredZipCode">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="血压：" prop="workAdress">
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="输液前：" prop="registeredZipCode">
              _______/_______mmHg，
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="输液后：" prop="registeredZipCode">
              _______/_______mmHg，
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="皮肤：" prop="workAdress">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="潮红" prop="registeredZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="红斑" prop="registeredZipCode">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="瘙痒" prop="registeredZipCode">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="荨麻疹" prop="registeredZipCode">

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="溶血：" prop="workAdress">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="腰痛" prop="registeredZipCode">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="血红蛋白尿" prop="registeredZipCode">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="呼吸困难" prop="registeredZipCode">

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="黄疸" prop="registeredZipCode">

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="其他：" prop="workAdress">
            </el-form-item>
          </el-col>

        </el-row>



        <el-row>
          <el-col :span="1">
            <el-form-item label="输液反应" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="诊断：" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="输液反应" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="处理：" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
          <el-form-item label="" prop="registeredAddress">
          </el-form-item>
        </el-col>
          <el-col :span="3">
            <el-form-item label="填报人" prop="registeredAddress">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="职务" prop="registeredAddress">
              ______________
            </el-form-item>
          </el-col>
          <el-col :span="3">
          <el-form-item label="填报时间" prop="registeredAddress">
            ______________
          </el-form-item>
        </el-col>
          <el-col :span="2">
            <el-form-item label="年" prop="registeredAddress">
              _________
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="月" prop="registeredAddress">
              _________
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="日" prop="registeredAddress">
              _________
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="" prop="registeredAddress">
            </el-form-item>
          </el-col><el-col :span="2">
          <el-form-item label="" prop="registeredAddress">

          </el-form-item>
        </el-col><el-col :span="2">
          <el-form-item label="" prop="registeredAddress">
          </el-form-item>
        </el-col>
        </el-row>










      </el-form>
      <div style="font-weight: bold;position: relative;left: 20px;line-height: 40px">1、如有输血反应，请逐项填写，一式两份；<br>
           2、一份在24小时内回报输血科，同时填写血袋上输血反应卡，将血袋及时送回输血科。<br>
           3、另一份科室自行保存，发生不良后果24小时内报护理部。
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "",
    data() {
      return {
        formInline: {
          diagnosisCode: ' '
        },
        options: [{
          value: '1',
          label: '城镇职工基本医疗保险'
        }, {
          value: '2',
          label: '城镇居民基本医疗保险'
        },{
          value: '3',
          label: '新型农村合作医疗'
        },{
          value: '4',
          label: '贫困救助'
        },
          {
            value: '5',
            label: '商业医疗保险'
          },
          {
            value: '6',
            label: '全公费'
          },
          {
            value: '7',
            label: '全自费'
          },
          {
            value: '8',
            label: '其他社会保险'
          },
          {
            value: '9',
            label: '其他'
          }],
        paymentMethod:null,
        optionSex:[{
          value:'1',
          label:'男'
        },{
          value:'2',
          label:'女'
        }],
        optionMartial:[{
          value: '1',
          label: '未婚'
        }, {
          value: '2',
          label: '已婚'
        },{
          value: '3',
          label: '丧偶'
        },{
          value: '4',
          label: '离婚'
        },{
          value: '5',
          label: '其他'
        }],
        optionClass:[{
          value: '1',
          label: '急诊'
        }, {
          value: '2',
          label: '门诊'
        },{
          value: '3',
          label: '其他医疗机构转入'
        },{
          value: '4',
          label: '其他'
        }]
      }
    },
    methods:{
    }
  }
</script>

<style scoped>

</style>
