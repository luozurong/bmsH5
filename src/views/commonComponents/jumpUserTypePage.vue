<template>
    <!-- 跳转到不同角色的弹窗 -->
    <div v-wechat-title="$route.meta.title">  
        <div v-if="wrapShow" class="businessManager-fixed">
            <div class="businessManager-wrap">
                <div class="businessManager-wrap-hread">
                    <span>请选择</span>
                    <img @click="wrapClose()" :src="close_btn" alt="">
                </div>
                <div v-if="userTypeMy == 49 || userTypeMy == 55 || userTypeMy == 56">
                    <div class="businessManager-wrap-item">
                        <span class="guan">业务管理员：</span>
                        <div @click="clickTypeFunc(49,0)" v-text="businessManager"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>业务组织管理员：</span>
                        <div @click="clickTypeFunc(50,1)" v-text="businessOrganizationManager"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>业务员：</span>
                        <div @click="clickTypeFunc(51,2)" v-text="business"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药企：</span>
                        <div @click="clickTypeFunc(22,3)" v-text="drugCompany"></div>
                    </div>
                    <div  class="businessManager-wrap-item">
                        <span>药店：</span>
                        <div @click="clickTypeFunc(19,4)" v-text="druggist"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药店店员：</span>
                        <div @click="clickTypeFunc(52,5)" v-text="drugStoreClerk"></div>
                    </div>
                </div>
                <div v-if="userTypeMy == 50">
                     <div class="businessManager-wrap-item">
                        <span>业务组织管理员：</span>
                        <div @click="clickTypeFunc(50,0)" v-text="businessOrganizationManager"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>业务员：</span>
                        <div @click="clickTypeFunc(51,1)" v-text="business"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药企：</span>
                        <div @click="clickTypeFunc(22,2)" v-text="drugCompany"></div>
                    </div>
                    <div  class="businessManager-wrap-item">
                        <span>药店：</span>
                        <div @click="clickTypeFunc(19,3)" v-text="druggist"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药店店员：</span>
                        <div @click="clickTypeFunc(52,4)" v-text="drugStoreClerk"></div>
                    </div>
                </div>
                <div v-if="userTypeMy == 51">
                    <div class="businessManager-wrap-item">
                        <span>业务员：</span>
                        <div @click="clickTypeFunc(51,0)" v-text="business"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药企：</span>
                        <div @click="clickTypeFunc(22,1)" v-text="drugCompany"></div>
                    </div>
                    <div  class="businessManager-wrap-item">
                        <span>药店：</span>
                        <div @click="clickTypeFunc(19,2)" v-text="druggist"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药店店员：</span>
                        <div @click="clickTypeFunc(52,3)" v-text="drugStoreClerk"></div>
                    </div>
                </div>
                <div v-if="userTypeMy == 22">
                    <div class="businessManager-wrap-item">
                        <span>药企：</span>
                        <div @click="clickTypeFunc(22,0)" v-text="drugCompany"></div>
                    </div>
                    <div  class="businessManager-wrap-item">
                        <span>药店：</span>
                        <div @click="clickTypeFunc(19,1)" v-text="druggist"></div>
                    </div>
                    <div class="businessManager-wrap-item">
                        <span>药店店员：</span>
                        <div @click="clickTypeFunc(52,2)" v-text="drugStoreClerk"></div>
                    </div>
                </div>
                 <div v-if="userTypeMy == 19">
                    <div class="businessManager-wrap-item">
                        <span>药店店员：</span>
                        <div @click="clickTypeFunc(52,0)" v-text="drugStoreClerk"></div>
                    </div>
                </div>
                <div class="businessManager-sure" @click="jumpOtherRole()">确定</div>
            </div>
        </div>
        <div class="businessManager-select-div"  v-if="selectShow">
            <div class="businessManager-select-fixed">
              
                <div class="businessManager-wrap-hread">
                    <div class="businessManager-wrap-hread-title">
                        <span  v-text="hreadTitleWord"></span>
                        <img @click="selectHide()" :src="close_btn" alt=""/>
                    </div>
                    <div class="businessManager-wrap-item-div" >
                        <div v-for="(item,index) in selectClassify" :key="index" @click="selectClassifyFunc(index)"
                            :class="{'businessManager-wrap-hread-active':item.status}">{{(index + 1) +'级'}}</div>
                    </div>
                </div>
                <div class="businessManager-select-auto">
                    <div class="businessManager-select-height"></div>
                     <div :class="{'businessManager-select-item':true, 'businessManager-select-active':selectNum == -1}" @click="selectPlease(-1)">
                        <span>请选择</span>
                    </div>
                    <div :class="{'businessManager-select-item':true, 'businessManager-select-active':(index == selectNum && item.morLevel == 0)}"  
                        v-for="(item,index) in selectAttr" 
                        :key="index" 
                        @click="selectUserName(index,item.userAccount,item.userType,item.morLevel)">
                        <span v-text="item.userName"></span>
                    </div>
                    <span v-if="moreFlag" class="click-more" @click="clickMoreFunc()">点击加载更多</span>
                </div>
                <div class="businessManager-select-height"></div>
                <div class="businessManager-select-sure" @click="selectSure()">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'
import close_btn from '@/common/images/close_btn.png'
import caution_icon from '@/common/images/caution_icon.png'

import {getRoleJlData,getRoleJlDataForMoreLevel} from '@/common/js/resource.js'
import {getSessionStorage,cookie} from '@/common/js/common.js'

export default {
    name: 'businessOrganizationManagerIndex',
    data(){
        return{
           close_btn: close_btn,
           caution_icon: caution_icon,
           userTypeMy: this.$store.state.userTypeMy,
           wrapShow: false,
           selectShow: false,
           selectAttr: [],
           selectNum: null,
           clickType: '',
           preUserName: '',
           preSelectAccount: '',
           preSelectUserType: '',
           isSettlement: null,
           business: '请选择',
           businessManager: '请选择',
           businessOrganizationManager: '请选择',
           drugStoreClerk: '请选择',
           druggist: '请选择',
           drugCompany: '请选择',
           hreadTitleWord: '',
           selectRoleObj: {},  //选中的对象
           selectAttrRole: [],
           selectClassify: [{userAccount:'',userType: '',status:true}],
           selectClassifyIndex: 0,
           clickNum: 0,    //点击的选项
           rolePageNum: 1,
           levelFlag: 0,   //1子级，0还是一级
           moreFlag: false,
           scrollTop: 0,
           isShowFixed: true
        }
    },
    components:{
       templates
    },
    computed: {
        businessManagerShowFlag() {
            return this.$store.state.businessManagerShowFlag;
        }
    },
    methods:{
       wrapClose(){
           this.wrapShow = false;
           this.bodyAuto();
       },
       closeChooseRole(){

       },
       clickMoreFunc(){  //点击加载更多
        console.log(this.levelFlag);
            if(this.levelFlag == 0){
                if(this.clickNum > 0){
                    var selectAttrRoleTemp = this.selectAttrRole.slice(0,this.clickNum);
                    for(var k = selectAttrRoleTemp.length-1; k >=0; k--){
                        if(selectAttrRoleTemp[k].preSelectAccount != ''){
                            this.getRoleJlDataAjax(10,this.rolePageNum,this.clickType,selectAttrRoleTemp[k].preSelectAccount,selectAttrRoleTemp[k].preSelectUserType);
                            return false;
                        }
                    }
                }
                this.getRoleJlDataAjax(10,this.rolePageNum,this.clickType,'','');
            }else{
                getRoleJlDataForMoreLevelAjax(10,this.rolePageNum,preSelectAccount,preSelectUserType)
            }
            
       },
       clickTypeFunc(type,i){//选择类型
            if(!this.isShowFixed){
                return false;
            }

            this.headTitleWordFunc(type);

            this.selectClassify.length = 1;
            this.selectClassify[0].status = true;

            this.levelFlag = 0;
            this.isShowFixed = false;
            this.selectNum = null;
            this.clickType = type;   
            this.clickNum = i;
            this.rolePageNum = 1;
            this.selectAttr = [];
            if(i>0){
                var selectAttrRoleTemp = this.selectAttrRole.slice(0,i);
                for(var k = selectAttrRoleTemp.length-1; k >=0; k--){
                    if(selectAttrRoleTemp[k].preSelectAccount != ''){
                        this.getRoleJlDataAjax(10,1,this.clickType,selectAttrRoleTemp[k].preSelectAccount,selectAttrRoleTemp[k].preSelectUserType);
                        return false;
                    }
                }
            }
            this.getRoleJlDataAjax(10,1,this.clickType,'','');   
            for(var y = 0; y < this.selectAttrRole.length; y++){
               if(y >= this.clickNum){
                    this.selectAttrRole[y].preSelectAccount = '';
                    this.selectAttrRole[y].preSelectUserType = '';
               } 
           }
          this.bodyHidden();
       },
       headTitleWordFunc(type){
           console.log(type);
           switch(Number(type)){
                case 49:
                    this.hreadTitleWord = '业务管理员';
                    break;
                case 50:
                    this.hreadTitleWord = '业务组织管理员';
                    break;
                case 51:
                    this.hreadTitleWord = '业务员';
                    break;
                case 22:
                    this.hreadTitleWord = '药企';
                    break;
                case 19:
                    this.hreadTitleWord = '药店';
                    break;
                case 52:
                    this.hreadTitleWord = '药店店员';
                    break;
                default:
                    this.hreadTitleWord = '请选择';
           }
       },
       selectHide(){       //隐藏选择
           this.selectShow = false;
           this.selectPlease();
       },
       selectPlease(){
           this.selectNum = -1;
           if(this.selectNum == -1){
                this.selectShow = false;
           }
           if(this.clickType == 49){
               this.businessManager = '请选择';    
               this.businessOrganizationManager = '请选择';
               this.business = '请选择';
               this.drugCompany = '请选择';
               this.druggist = '请选择';
               this.drugStoreClerk = '请选择';
           }
           if(this.clickType == 50){
               this.businessOrganizationManager = '请选择';
               this.business = '请选择';
               this.drugCompany = '请选择';
               this.druggist = '请选择';
               this.drugStoreClerk = '请选择';
           }
           if(this.clickType == 51){
                this.business = '请选择';
                this.drugCompany = '请选择';
                this.druggist = '请选择';
                this.drugStoreClerk = '请选择';
           }
           if(this.clickType == 22){
                this.drugCompany = '请选择';
                this.druggist = '请选择';
                this.drugStoreClerk = '请选择';
           }
           if(this.clickType == 19){
                this.druggist = '请选择';
                this.drugStoreClerk = '请选择';
           }
           if(this.clickType == 52){
                this.drugStoreClerk = '请选择';
                this.drugStoreClerk = '请选择';
           }
       },
       selectUserName(i,userAccount,userType,morelevel){  //选择类型名称
            this.selectNum = i;
            var selectAttrObj = {
                 preSelectAccount: this.selectAttr[i].userAccount,
                 preSelectUserType: this.selectAttr[i].userType
            }
            this.selectAttrRole[this.clickNum] = selectAttrObj;

            if( this.clickType == 49){
                this.businessManager = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
                this.business = '请选择';
                this.businessOrganizationManager = '请选择';
                this.drugStoreClerk = '请选择';
                this.druggist = '请选择';
                this.drugCompany = '请选择';
            }
            if( this.clickType == 50){
                this.businessOrganizationManager = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
                this.business = '请选择';
                this.drugStoreClerk = '请选择';
                this.druggist = '请选择';
                this.drugCompany = '请选择';
            }

            if( this.clickType == 51){
                this.business = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
                this.drugStoreClerk = '请选择';
                this.druggist = '请选择';
                this.drugCompany = '请选择';
            }

            if( this.clickType == 22){
                this.drugCompany = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
                this.drugStoreClerk = '请选择';
                this.druggist = '请选择';
            }

            if( this.clickType == 19){
                this.druggist = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
                this.drugStoreClerk = '请选择';
            }
            if( this.clickType == 52){
                this.drugStoreClerk = this.selectAttr[i].userName;
                this.preUserName  = this.selectAttr[i].userName;
                this.preSelectAccount  = this.selectAttr[i].userAccount;
                this.preSelectUserType  = this.selectAttr[i].userType;
                this.isSettlement = this.selectAttr[i].isSettlement;
            }
            
            
            this.selectClassify[this.selectClassify.length - 1].userAccount = userAccount;
            this.selectClassify[this.selectClassify.length - 1].userType = userType;

            if(morelevel == '1'){
                this.levelFlag = 1;
                this.selectAttr = [];
                this.rolePageNum = 1;

                for(var i = 0; i < this.selectClassify.length;i++){
                    this.selectClassify[i].status = false;
                }
                
                var selectAttrObj = {userAccount:'',userType: '',status:true}
                this.selectClassify.push(selectAttrObj);
                this.getRoleJlDataForMoreLevelAjax(10,1,userAccount,userType)
            }
       },
       selectSure(){  //确定选中
            
            this.selectShow = false;
       },
       getRoleJlDataAjax(pageSize,pageNum,selectUserType,preSelectAccount,preSelectUserType){
            var params = {
                body:{
                    pageSize: pageSize,
                    pageNum: pageNum,
                    account: this.$store.state.accountMy,
                    selectUserType: selectUserType,
                    preSelectAccount: preSelectAccount,
                    preSelectUserType: preSelectUserType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            Object.assign(this.selectRoleObj,{
                account:this.$store.state.accountMy,
                selectUserType,
                preSelectAccount,
                preSelectUserType
            });
            getRoleJlData(params).then(res =>{
                this.isShowFixed = true;     
                if(res.result == 0){
                    if(res.totalCount > 10){  //显示点击加载更多
                        this.moreFlag = true;
                    }
                    if(res.list.length < 10){
                        this.moreFlag = false;
                    }else{
                        this.moreFlag = true;
                    }

                    this.rolePageNum ++;
                    this.selectNum = null;

                    for(var i = 0; i < res.list.length; i++ ){
                        this.selectAttr.push(res.list[i]);
                    }
                    
                    //判断一级无数据时的提示
                    if(this.selectAttr.length == 0 && this.levelFlag == 0){
                        lxjTip.msg('暂无该选项数据');
                    }else{
                       this.selectShow = true;
                    }
                }
            });
       },
       getRoleJlDataForMoreLevelAjax(pageSize,pageNum,preSelectAccount,preSelectUserType){
           var params = {
                body:{
                    pageSize: pageSize,
                    pageNum: pageNum,
                    preSelectAccount: preSelectAccount,
                    preSelectUserType: preSelectUserType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            getRoleJlDataForMoreLevel(params).then((res) =>{
                if(res.result == 0){
                    this.selectAttr = res.list;
                    this.selectNum = null;
                }

                if(res.list.length < 10){
                    this.moreFlag = false;
                }else{
                     this.moreFlag = true;
                     this.rolePageNum += 1;
                }   
            })
       },
       jumpOtherRole(){ //跳转到不同角色页面
            var jumpFlag = false;
            console.log(this.selectAttrRole);
            for(var i = 0; i < this.selectAttrRole.length; i++){
                if(this.selectAttrRole[i].preSelectAccount != ''){
                    jumpFlag = true;
                }
            }
            if(!jumpFlag){
                this.$store.commit("userType",this.$store.state.userTypeMy);
                this.$store.commit("userName",this.$store.state.userNameMy);
                this.$store.commit("account",this.$store.state.accountMy);
                this.$store.commit("isSettlement",this.$store.state.isSettlementMy);
                this.$store.commit("isLoad",true); 

                this.wrapShow = false;
                sessionStorage.setItem('tabIndex',1);  //实时数据
                cookie.setCookie('userName',this.$store.state.userNameMy,1);
                cookie.setCookie('account',this.$store.state.accountMy,1);
                cookie.setCookie('userType',this.$store.state.userTypeMy,1);
                cookie.setCookie ('isSettlement',this.$store.state.isSettlementMy,1);
                this.bodyAuto();
            }else{
                this.$store.commit("userType",this.preSelectUserType);
                this.$store.commit("userName",this.preUserName);
                this.$store.commit("account",this.preSelectAccount);
                this.$store.commit("isSettlement",this.isSettlement);
                this.$store.commit("isLoad",true); 

                this.wrapShow = false;
                sessionStorage.setItem('tabIndex',1);  //实时数据
                cookie.setCookie('userName',this.preUserName,1);
                cookie.setCookie('account',this.preSelectAccount,1);
                cookie.setCookie('userType',this.preSelectUserType,1);
                cookie.setCookie ('isSettlement',this.isSettlement,1);
                this.bodyAuto();
            }

            this.selectAttrFunc();

            this.business = '请选择';
            this.businessManager =  '请选择';
            this.businessOrganizationManager =  '请选择';
            this.drugStoreClerk =  '请选择';
            this.druggist =  '请选择';
            this.drugCompany =  '请选择';
           
            
       },
       selectAttrFunc(){
           var selectAttrObj = {
               preSelectAccount: '',
               preSelectUserType: ''
           }
           var selectAttrLength = 0;
           if(this.userTypeMy == 49 || this.userTypeMy == 56){
               selectAttrLength = 6;
           }
           if(this.userTypeMy == 50){
               selectAttrLength = 5;
           }
           if(this.userTypeMy == 51){
               selectAttrLength = 4;
           }
           if(this.userTypeMy == 22){
               selectAttrLength = 3;
           }
           if(this.userTypeMy == 19){
               selectAttrLength = 1;
           }
           for(var i = 0; i < selectAttrLength; i++){
               this.selectAttrRole[i] = selectAttrObj
           }
       },
       selectClassifyFunc(index){
            //选择选中的级别
            for(var i = 0; i < index+1; i++){
                if(i == index){
                    this.selectClassifyIndex = index;
                    this.selectClassify[index].status = true;
                }else{
                    this.selectClassify[i].status = false;
                } 
            }
           this.selectClassify.length = index + 1;

           if(index > 0){
               this.getRoleJlDataForMoreLevelAjax(10,1,this.selectClassify[index-1].userAccount,this.selectClassify[index-1].userType)
           }else{
               this.selectAttr = [];
               this.levelFlag = 0;
               this.getRoleJlDataAjax(10,1,this.selectRoleObj.selectUserType,this.selectRoleObj.preSelectAccount,this.selectRoleObj.preSelectUserType)
           } 
       },
       bodyAuto(){
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
            try {
                document.scrollingElement.scrollTop = this.scrollTop;
            } catch(e) {
                document.documentElement.scrollTop = this.scrollTop;
            }
       },
       bodyHidden(){
            try {
				this.scrollTop = document.scrollingElement.scrollTop;
			} catch(e) {
				this.scrollTop = document.documentElement.scrollTop;
			}
			document.body.style.top = -(this.scrollTop) + "px";
			document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
       }
    },
    watch:{
        businessManagerShowFlag(newVal){
            if(newVal){
                this.wrapShow = true;
                this.bodyHidden();
            }
            this.$store.commit('businessManagerShowFlag',false);
        }
    },
    mounted() {
       this.selectAttrFunc();
    },
}
</script>
<style scoped>
    .businessManager-fixed{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        z-index: 10;
        background: rgba(0,0,0,0.2);
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }
    .businessManager-wrap{
        width: 3rem;
        background: #fff;
        border-radius: 0.08rem;
        padding-bottom: 0.2rem;
    }
    .businessManager-wrap-hread{
        line-height: 0.4rem;
        text-align: center;
        border-bottom: 1px solid #ededed;
        position: relative;
        width: 100%;
        overflow-x: auto;
        box-sizing: border-box;
    }
    .businessManager-wrap-hread .businessManager-wrap-hread-active{
        color: #3081f2;
        border-bottom: 1px solid  #3081f2;
    }
    .businessManager-wrap-hread > div{
        
         white-space: nowrap;
    }
    .businessManager-wrap-hread > div div{
        display: inline-block;
        padding: 0 0.2rem; 
    }
    .businessManager-wrap-hread img{
        position: absolute;
        width: 0.12rem;
        top: 0.13rem;
        right:0.13rem;
        z-index: 1;
    }
    .businessManager-wrap-item {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-top: 0.1rem;
    }
    .businessManager-wrap-item span{
        display: inline-block;
        width: 1.28rem;
        text-align: right;
        color: #333;
    }
    .businessManager-wrap-item div{
        display: inline-block;
        width: 1.5rem;
        height: 0.32rem;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        border-radius: 0.04rem;
        background-image: url(../../common/images/select_icom.png);
        background-position: 1.27rem 0.12rem; 
        background-repeat: no-repeat; 
        background-size: 0.12rem; 
        line-height: 0.32rem;
        color: #999;
        padding-left: 0.05rem;
        box-sizing: border-box;
        overflow: hidden;
        padding-right: 0.25rem;
    }
    .businessManager-sure{
        height: 0.32rem;
        line-height: 0.32rem;
        width: 1.8rem;
        background: #3081f2;
        margin: 0.2rem auto 0;
        text-align: center;
        border-radius: 0.04rem;
        color: #fff;
    }
    .businessManager-select-div{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 11;
        width: 100%;
        height: 100%;
        background: transparent; 
        overflow: auto;
    }
    .businessManager-select-fixed{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 12;
        width: 100%;
        background: #fff; 
        overflow: auto;
    }
    .businessManager-select-fixed .businessManager-wrap-hread{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        text-align: center;
        background: #fff;
        width: 100%;
    }
    .businessManager-select-auto{
        height: 4.9rem;
        overflow: auto;
    }
    .businessManager-select-item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-left: 0.15rem;
        height: 0.4rem;
        border-bottom: 1px solid #ededed;
    }
    .businessManager-select-item img{
        width: 0.18rem;
        height: 0.18rem;
        margin-left: 0.1rem;
    }
    .businessManager-select-active{
        background-image: url(../../common/images/selected_icon.png);
        background-position: 3.33rem 0.15rem; 
        background-repeat: no-repeat; 
        background-size: 0.12rem; 
    }
    .businessManager-select-height{
        height: 0.4rem;
    }
    .businessManager-select-sure{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 12;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: #fff;
        background: #3081f2;
    }
    .click-more{
        display: block;
        line-height: 0.4rem;
        text-align: center;
        color: #999;
    }
    .businessManager-wrap-hread-title{
        width: 100%;
        border-bottom: 1px solid #eee;
    }
    .businessManager-wrap-item-div{
        text-align: left;
    }
</style>
