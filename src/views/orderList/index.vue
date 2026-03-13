<template>
    <div class="orderList">
        <div class="order_box">
            <div class="list" v-for="(item,index) in orderList" :key="index">
                <div class="top">
                    <div class="name">{{item.name}}</div>
                    <div class="date_of">{{item.regdate}}</div>
                    <div class="project">{{item.companyname}}</div>
                    <div class="report" v-if="item.reportprintflag == 0">未报告</div>
                    <div class="report" v-if="item.reportprintflag == 1">已报告</div>
                </div>
                <div class="floor">
                    <div></div>
                    <div class="operation">
                        <button class="examine" @click="goOrderMsg(item.regid)">查看报告</button>
                        <button class="download_no"
                        v-if="item.reportprintflag == 1"
                        :disable="item.reportprintflag == 0">报告下载</button>
                        <button class="download"
                        v-if="item.reportprintflag == 0" @click="reportDownload(item.regid)">报告下载</button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script src="./index.vue.js" lang="js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.vue.scss" lang="scss" scoped></style>
